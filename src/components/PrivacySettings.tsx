/**
 * Privacy & Role-Based Access Settings
 * 
 * Demonstrates privacy controls and role-based data visibility.
 * This is conceptual/mock-based to show how data access would work.
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import {
  Shield,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Users,
  UserCheck,
  Database,
  FileText,
  AlertTriangle,
  Info,
  CheckCircle,
  Download,
  FileDown,
} from 'lucide-react';
import { useStudentContext } from './StudentContext';
import { Alert, AlertDescription } from './ui/alert';
import { useLanguage } from './LanguageContext';
import { translate } from '../utils/translations';
import { toast } from 'sonner';

interface DataCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  accessLevel: 'public' | 'internal' | 'private';
  canEdit: boolean;
  sharedWith: string[];
}

export function PrivacySettings() {
  const { contextData } = useStudentContext();
  const { language } = useLanguage();
  
  const [dataCategories, setDataCategories] = useState<DataCategory[]>([
    {
      id: 'personal',
      name: 'Personal Information',
      description: 'Name, email, phone, address',
      icon: UserCheck,
      accessLevel: 'private',
      canEdit: true,
      sharedWith: ['University Administration', 'Department'],
    },
    {
      id: 'academic',
      name: 'Academic Records',
      description: 'Grades, attendance, exam scores',
      icon: FileText,
      accessLevel: 'internal',
      canEdit: false,
      sharedWith: ['Faculty', 'Department', 'Examination Office'],
    },
    {
      id: 'financial',
      name: 'Financial Information',
      description: 'Fee payments, scholarships',
      icon: Database,
      accessLevel: 'private',
      canEdit: false,
      sharedWith: ['Accounts Office', 'Department'],
    },
    {
      id: 'hostel',
      name: 'Hostel Details',
      description: 'Room allocation, mess records',
      icon: Shield,
      accessLevel: 'internal',
      canEdit: false,
      sharedWith: ['Hostel Administration', 'Warden'],
    },
    {
      id: 'clubs',
      name: 'Club Memberships',
      description: 'Clubs and societies joined',
      icon: Users,
      accessLevel: 'public',
      canEdit: true,
      sharedWith: ['All Students', 'Faculty Advisors'],
    },
  ]);

  const [privacySettings, setPrivacySettings] = useState({
    showProfileToOthers: true,
    showEmailToStudents: false,
    showPhoneToStudents: false,
    allowFacultyMessages: true,
    allowStudentMessages: true,
    shareAttendanceWithParents: true,
    shareGradesWithParents: true,
  });

  const updatePrivacySetting = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    // Mock data export functionality
    const exportData = {
      personalInfo: {
        name: contextData.name || "Student",
        role: contextData.role,
        email: "student@amu.ac.in"
      },
      privacySettings,
      dataCategories: dataCategories.map(cat => ({
        category: cat.name,
        accessLevel: cat.accessLevel,
        sharedWith: cat.sharedWith
      })),
      exportedAt: new Date().toISOString(),
      exportVersion: "1.0"
    };

    // Create a blob and download
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `amu-studysphere-data-export-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(
      language === 'english' ? 'Your data has been exported successfully!' :
      language === 'hindi' ? 'आपका डेटा सफलतापूर्वक निर्यात किया गया है!' :
      'آپ کا ڈیٹا کامیابی سے برآمد ہو گیا ہے!'
    );
  };

  const t = (key: string) => translate(key, language);

  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case 'public':
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">Public</Badge>;
      case 'internal':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">Internal</Badge>;
      case 'private':
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/20">Private</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Privacy & Data Access</h2>
        <p className="text-muted-foreground">
          Manage who can see your information and how your data is used
        </p>
      </div>

      {/* Current Role Info */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold">Your Role: {contextData.role}</p>
              <p className="text-sm text-muted-foreground">
                Role-based access controls determine what data you can view and modify
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Categories & Access Levels */}
      <Card>
        <CardHeader>
          <CardTitle>Data Categories & Access Control</CardTitle>
          <CardDescription>
            View who has access to different categories of your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {dataCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          </div>
                        </div>
                        {getAccessLevelBadge(category.accessLevel)}
                      </div>

                      <Separator className="my-3" />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Can Edit:</span>
                          <span className="flex items-center">
                            {category.canEdit ? (
                              <>
                                <Unlock className="w-4 h-4 text-green-500 mr-1" />
                                Yes
                              </>
                            ) : (
                              <>
                                <Lock className="w-4 h-4 text-orange-500 mr-1" />
                                Read-Only
                              </>
                            )}
                          </span>
                        </div>

                        <div className="mt-3">
                          <p className="text-sm font-medium mb-2">Shared With:</p>
                          <div className="flex flex-wrap gap-2">
                            {category.sharedWith.map((entity) => (
                              <Badge key={entity} variant="secondary" className="text-xs">
                                {entity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {category.accessLevel === 'public' && (
                        <Alert className="mt-3 bg-blue-500/10 border-blue-500/20">
                          <Info className="h-4 w-4 text-blue-500" />
                          <AlertDescription className="text-xs text-blue-600 dark:text-blue-400">
                            This information is visible to all university members
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Privacy Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Preferences</CardTitle>
          <CardDescription>
            Control what information you share with others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="show-profile" className="font-medium">Show Profile to Other Students</Label>
                <p className="text-sm text-muted-foreground">
                  Allow other students to view your basic profile
                </p>
              </div>
              <Switch
                id="show-profile"
                checked={privacySettings.showProfileToOthers}
                onCheckedChange={(checked) => updatePrivacySetting('showProfileToOthers', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="show-email" className="font-medium">Show Email to Students</Label>
                <p className="text-sm text-muted-foreground">
                  Make your email visible to other students
                </p>
              </div>
              <Switch
                id="show-email"
                checked={privacySettings.showEmailToStudents}
                onCheckedChange={(checked) => updatePrivacySetting('showEmailToStudents', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="show-phone" className="font-medium">Show Phone to Students</Label>
                <p className="text-sm text-muted-foreground">
                  Make your phone number visible to other students
                </p>
              </div>
              <Switch
                id="show-phone"
                checked={privacySettings.showPhoneToStudents}
                onCheckedChange={(checked) => updatePrivacySetting('showPhoneToStudents', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="faculty-msg" className="font-medium">Allow Faculty Messages</Label>
                <p className="text-sm text-muted-foreground">
                  Receive direct messages from faculty members
                </p>
              </div>
              <Switch
                id="faculty-msg"
                checked={privacySettings.allowFacultyMessages}
                onCheckedChange={(checked) => updatePrivacySetting('allowFacultyMessages', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="student-msg" className="font-medium">Allow Student Messages</Label>
                <p className="text-sm text-muted-foreground">
                  Receive direct messages from other students
                </p>
              </div>
              <Switch
                id="student-msg"
                checked={privacySettings.allowStudentMessages}
                onCheckedChange={(checked) => updatePrivacySetting('allowStudentMessages', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="parent-attendance" className="font-medium">Share Attendance with Parents</Label>
                <p className="text-sm text-muted-foreground">
                  Allow parents to view your attendance records
                </p>
              </div>
              <Switch
                id="parent-attendance"
                checked={privacySettings.shareAttendanceWithParents}
                onCheckedChange={(checked) => updatePrivacySetting('shareAttendanceWithParents', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="parent-grades" className="font-medium">Share Grades with Parents</Label>
                <p className="text-sm text-muted-foreground">
                  Allow parents to view your exam results and grades
                </p>
              </div>
              <Switch
                id="parent-grades"
                checked={privacySettings.shareGradesWithParents}
                onCheckedChange={(checked) => updatePrivacySetting('shareGradesWithParents', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Source Info */}
      <Alert>
        <Database className="h-4 w-4" />
        <AlertDescription>
          <strong>Data Source:</strong> Currently using mock data. In production, this will be integrated 
          with the University ERP system with proper authentication and authorization controls.
        </AlertDescription>
      </Alert>

      {/* Consent Info */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Consent-Based Data Usage</h3>
              <p className="text-sm text-muted-foreground">
                AMU StudySphere follows strict consent-based data policies. Your personal information 
                is only used for academic purposes and shared only with authorized university personnel. 
                You have the right to request data deletion or export at any time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button className="flex-1">Save Preferences</Button>
        <Button variant="outline" onClick={handleExportData}>Export My Data</Button>
      </div>
    </div>
  );
}