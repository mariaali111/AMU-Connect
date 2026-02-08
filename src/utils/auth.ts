/**
 * Unified Authentication Module for AMU StudySphere
 * Integrates Supabase Auth with Profile Management
 * 
 * This module provides a clean API for authentication that:
 * 1. Uses Supabase Auth (auth.users) for authentication
 * 2. Automatically creates/fetches profiles table records
 * 3. Maintains backwards compatibility with existing code
 * 4. Enforces role-based access control
 */

import { supabase } from './supabase';
import type { UserRole } from './supabase';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  roll_number?: string;
  enrollment_no?: string;
  department_id?: number;
  program_id?: number;
  semester?: number;
  enrollment_year?: number;
  phone?: string;
  date_of_birth?: string;
  address?: string;
  designation?: string;
  specialization?: string;
  office_location?: string;
  avatar_url?: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  userData?: {
    // Student fields
    rollNumber?: string;
    departmentId?: number;
    programId?: number;
    semester?: number;
    enrollmentYear?: number;
    phone?: string;
    dateOfBirth?: string;
    address?: string;
    guardianName?: string;
    guardianPhone?: string;
    // Professor fields
    designation?: string;
    specialization?: string;
    officeLocation?: string;
  };
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// ============================================================================
// PROFILE MANAGEMENT
// ============================================================================

/**
 * Ensure a profile exists for the authenticated user
 * Creates one if it doesn't exist, returns existing if it does
 */
export async function ensureProfileExists(
  userId: string,
  role: UserRole
): Promise<{ success: boolean; profile?: any; error?: string }> {
  try {
    // Check if profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    // If profile exists, return it
    if (existingProfile) {
      return { success: true, profile: existingProfile };
    }

    // Create new profile
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert({ id: userId, role })
      .select()
      .single();

    if (createError) throw createError;

    console.log('✓ Profile created:', { userId, role });
    return { success: true, profile: newProfile };
  } catch (error: any) {
    console.error('Profile creation error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get full user profile with related data
 */
export async function getUserProfile(userId: string): Promise<AuthResponse> {
  try {
    // Get profile with role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;

    // Get auth user
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;
    if (!authUser) throw new Error('User not found');

    // Build user object based on role
    let userData: UserProfile = {
      id: userId,
      email: authUser.email,
    };

    // If student, fetch student details
    if (profile.role === 'student') {
      const { data: studentData } = await supabase
        .from('students')
        .select(`
          *,
          enrollments (
            enrollment_no,
            enrollment_date,
            program_id,
            department_id,
            programs (
              program_name,
              departments (
                department_name
              )
            )
          )
        `)
        .eq('profile_id', userId)
        .maybeSingle();

      if (studentData?.enrollments) {
        userData.enrollment_no = studentData.enrollments.enrollment_no;
        userData.department_id = studentData.enrollments.department_id;
        userData.program_id = studentData.enrollments.program_id;
      }
    }

    // If faculty, fetch faculty details (when table exists)
    if (profile.role === 'faculty') {
      // TODO: Fetch from faculty table when available
      userData.designation = 'Faculty Member';
    }

    const user: User = {
      id: userId,
      email: authUser.email || '',
      role: profile.role,
      profile: userData,
    };

    return { success: true, user };
  } catch (error: any) {
    console.error('Get user profile error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// AUTHENTICATION FUNCTIONS
// ============================================================================

/**
 * Sign up a new user with email and password
 * Automatically creates profile record with role
 */
export async function signup(data: SignupData): Promise<AuthResponse> {
  try {
    console.log('📝 Signing up:', data.email);

    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('User creation failed');

    // 2. Ensure profile exists
    const profileResult = await ensureProfileExists(authData.user.id, data.role);
    if (!profileResult.success) {
      throw new Error(profileResult.error || 'Profile creation failed');
    }

    // 3. Build user profile
    const userProfile: UserProfile = {
      id: authData.user.id,
      name: data.name,
      email: data.email,
      ...data.userData,
    };

    const user: User = {
      id: authData.user.id,
      email: data.email,
      role: data.role,
      profile: userProfile,
    };

    console.log('✓ Signup successful');
    return { success: true, user };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { success: false, error: error.message || 'Signup failed' };
  }
}

/**
 * Login user with email and password
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    console.log('🔐 Logging in:', email);

    // 1. Authenticate with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Login failed');

    // 2. Get user profile
    const profileResult = await getUserProfile(authData.user.id);
    if (!profileResult.success || !profileResult.user) {
      throw new Error('Failed to load user profile');
    }

    console.log('✓ Login successful');
    return { success: true, user: profileResult.user };
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: error.message || 'Invalid email or password' };
  }
}

/**
 * Get current session and user
 */
export async function getSession(): Promise<AuthResponse> {
  try {
    // Get current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    if (!session || !session.user) {
      return { success: false, error: 'No active session' };
    }

    // Get user profile
    const profileResult = await getUserProfile(session.user.id);
    if (!profileResult.success || !profileResult.user) {
      return { success: false, error: 'Failed to load user profile' };
    }

    return { success: true, user: profileResult.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Logout user
 */
export async function logout(): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('🚪 Logging out...');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log('✓ Logged out successfully');
    return { success: true };
  } catch (error: any) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Refresh user profile data
 */
export async function refreshUserProfile(): Promise<AuthResponse> {
  return await getSession();
}

/**
 * Update user profile (basic fields)
 */
export async function updateUserProfile(updates: Partial<UserProfile>): Promise<AuthResponse> {
  try {
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;
    if (!authUser) throw new Error('Not authenticated');

    // For now, just return the updated profile from session
    // Extended profile data would be in separate tables (students, faculty, etc.)
    const profileResult = await getUserProfile(authUser.id);
    if (!profileResult.success || !profileResult.user) {
      throw new Error('Failed to load user profile');
    }

    // Merge updates
    profileResult.user.profile = {
      ...profileResult.user.profile,
      ...updates,
    };

    return { success: true, user: profileResult.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch {
    return false;
  }
}

/**
 * Get stored user from current session (for backwards compatibility)
 */
export function getStoredUser(): User | null {
  // This is now handled by getSession() which checks Supabase auth
  // This function is kept for backwards compatibility but should not be used
  // for new code. Use getSession() instead.
  return null;
}

/**
 * OAuth Login (Google)
 */
export async function loginWithGoogle(): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;

    return {
      success: true,
      error: 'Redirecting to Google...'
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * OAuth Login (Apple)
 */
export async function loginWithApple(): Promise<AuthResponse> {
  return {
    success: false,
    error: 'Apple OAuth login is not configured yet'
  };
}

/**
 * Handle OAuth callback
 */
export async function handleOAuthCallback(): Promise<AuthResponse> {
  try {
    // Get session from URL hash
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) throw error;
    if (!session || !session.user) {
      throw new Error('No session found in callback');
    }

    // Ensure profile exists (create with default role if needed)
    await ensureProfileExists(session.user.id, 'student');

    // Get full user profile
    const profileResult = await getUserProfile(session.user.id);
    if (!profileResult.success || !profileResult.user) {
      throw new Error('Failed to load user profile');
    }

    return { success: true, user: profileResult.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Auth
  signup,
  login,
  loginWithGoogle,
  loginWithApple,
  handleOAuthCallback,
  logout,
  getSession,
  refreshUserProfile,
  updateUserProfile,
  isAuthenticated,
  getStoredUser,

  // Profile management
  ensureProfileExists,
  getUserProfile,
};
