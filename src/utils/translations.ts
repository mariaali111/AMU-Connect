/**
 * Comprehensive Translation Dictionary for AMU StudySphere
 * Supports English, Hindi, and Urdu (mock translations)
 */

export type Language = 'english' | 'hindi' | 'urdu';

export interface Translation {
  english: string;
  hindi: string;
  urdu: string;
}

// UI Text Translations
export const UI_TRANSLATIONS: Record<string, Translation> = {
  // Navigation
  dashboard: {
    english: 'Dashboard',
    hindi: 'डैशबोर्ड',
    urdu: 'ڈیش بورڈ',
  },
  courses: {
    english: 'Courses',
    hindi: 'पाठ्यक्रम',
    urdu: 'کورسز',
  },
  notes: {
    english: 'Notes',
    hindi: 'नोट्स',
    urdu: 'نوٹس',
  },
  assignments: {
    english: 'Assignments',
    hindi: 'असाइनमेंट',
    urdu: 'اسائنمنٹس',
  },
  profile: {
    english: 'Profile',
    hindi: 'प्रोफ़ाइल',
    urdu: 'پروفائل',
  },
  settings: {
    english: 'Settings',
    hindi: 'सेटिंग्स',
    urdu: 'ترتیبات',
  },
  logout: {
    english: 'Logout',
    hindi: 'लॉग आउट',
    urdu: 'لاگ آؤٹ',
  },

  // Common Actions
  edit: {
    english: 'Edit',
    hindi: 'संपादित करें',
    urdu: 'ترمیم',
  },
  save: {
    english: 'Save',
    hindi: 'सहेजें',
    urdu: 'محفوظ کریں',
  },
  cancel: {
    english: 'Cancel',
    hindi: 'रद्द करें',
    urdu: 'منسوخ کریں',
  },
  delete: {
    english: 'Delete',
    hindi: 'हटाएं',
    urdu: 'حذف کریں',
  },
  submit: {
    english: 'Submit',
    hindi: 'जमा करें',
    urdu: 'جمع کروائیں',
  },
  download: {
    english: 'Download',
    hindi: 'डाउनलोड',
    urdu: 'ڈاؤن لوڈ',
  },
  upload: {
    english: 'Upload',
    hindi: 'अपलोड',
    urdu: 'اپ لوڈ',
  },
  search: {
    english: 'Search',
    hindi: 'खोजें',
    urdu: 'تلاش کریں',
  },
  view: {
    english: 'View',
    hindi: 'देखें',
    urdu: 'دیکھیں',
  },
  open: {
    english: 'Open',
    hindi: 'खोलें',
    urdu: 'کھولیں',
  },
  close: {
    english: 'Close',
    hindi: 'बंद करें',
    urdu: 'بند کریں',
  },

  // Academic
  semester: {
    english: 'Semester',
    hindi: 'सेमेस्टर',
    urdu: 'سمسٹر',
  },
  year: {
    english: 'Year',
    hindi: 'वर्ष',
    urdu: 'سال',
  },
  cgpa: {
    english: 'CGPA',
    hindi: 'सीजीपीए',
    urdu: 'سی جی پی اے',
  },
  department: {
    english: 'Department',
    hindi: 'विभाग',
    urdu: 'شعبہ',
  },
  program: {
    english: 'Program',
    hindi: 'प्रोग्राम',
    urdu: 'پروگرام',
  },
  specialization: {
    english: 'Specialization',
    hindi: 'विशेषज्ञता',
    urdu: 'خصوصیت',
  },

  // Personal Info
  name: {
    english: 'Name',
    hindi: 'नाम',
    urdu: 'نام',
  },
  email: {
    english: 'Email',
    hindi: 'ईमेल',
    urdu: 'ای میل',
  },
  phone: {
    english: 'Phone',
    hindi: 'फ़ोन',
    urdu: 'فون',
  },
  address: {
    english: 'Address',
    hindi: 'पता',
    urdu: 'پتہ',
  },
  dateOfBirth: {
    english: 'Date of Birth',
    hindi: 'जन्म तिथि',
    urdu: 'تاریخ پیدائش',
  },
  gender: {
    english: 'Gender',
    hindi: 'लिंग',
    urdu: 'جنس',
  },

  // Hostel
  hostel: {
    english: 'Hostel',
    hindi: 'छात्रावास',
    urdu: 'ہاسٹل',
  },
  hosteller: {
    english: 'Hosteller',
    hindi: 'छात्रावासी',
    urdu: 'ہاسٹلر',
  },
  dayScholar: {
    english: 'Day Scholar',
    hindi: 'दिन विद्वान',
    urdu: 'ڈے اسکالر',
  },
  roomNumber: {
    english: 'Room Number',
    hindi: 'कमरा नंबर',
    urdu: 'کمرہ نمبر',
  },

  // Fees
  fees: {
    english: 'Fees',
    hindi: 'शुल्क',
    urdu: 'فیسیں',
  },
  totalFee: {
    english: 'Total Fee',
    hindi: 'कुल शुल्क',
    urdu: 'کل فیس',
  },
  paidAmount: {
    english: 'Paid Amount',
    hindi: 'भुगतान की गई राशि',
    urdu: 'ادا شدہ رقم',
  },
  pendingAmount: {
    english: 'Pending Amount',
    hindi: 'बकाया राशि',
    urdu: 'باقی رقم',
  },
  payNow: {
    english: 'Pay Now',
    hindi: 'अभी भुगतान करें',
    urdu: 'ابھی ادا کریں',
  },
  paymentHistory: {
    english: 'Payment History',
    hindi: 'भुगतान इतिहास',
    urdu: 'ادائیگی کی تاریخ',
  },

  // Notices
  notices: {
    english: 'Notices',
    hindi: 'सूचनाएं',
    urdu: 'نوٹسز',
  },
  newNotice: {
    english: 'New Notice',
    hindi: 'नई सूचना',
    urdu: 'نیا نوٹس',
  },
  important: {
    english: 'Important',
    hindi: 'महत्वपूर्ण',
    urdu: 'اہم',
  },

  // Academic Content
  lectures: {
    english: 'Lectures',
    hindi: 'व्याख्यान',
    urdu: 'لیکچرز',
  },
  studyMaterial: {
    english: 'Study Material',
    hindi: 'अध्ययन सामग्री',
    urdu: 'مطالعاتی مواد',
  },
  syllabus: {
    english: 'Syllabus',
    hindi: 'पाठ्यक्रम',
    urdu: 'نصاب',
  },
  attendance: {
    english: 'Attendance',
    hindi: 'उपस्थिति',
    urdu: 'حاضری',
  },
  grades: {
    english: 'Grades',
    hindi: 'ग्रेड',
    urdu: 'گریڈز',
  },
  timetable: {
    english: 'Timetable',
    hindi: 'समय सारणी',
    urdu: 'ٹائم ٹیبل',
  },

  // Messages
  welcome: {
    english: 'Welcome',
    hindi: 'स्वागत',
    urdu: 'خوش آمدید',
  },
  welcomeBack: {
    english: 'Welcome Back',
    hindi: 'वापसी पर स्वागत है',
    urdu: 'واپس آمدید',
  },
  success: {
    english: 'Success',
    hindi: 'सफलता',
    urdu: 'کامیابی',
  },
  error: {
    english: 'Error',
    hindi: 'त्रुटि',
    urdu: 'خرابی',
  },
  loading: {
    english: 'Loading...',
    hindi: 'लोड हो रहा है...',
    urdu: 'لوڈ ہو رہا ہے...',
  },

  // Faculty specific
  students: {
    english: 'Students',
    hindi: 'छात्र',
    urdu: 'طلباء',
  },
  enrolledStudents: {
    english: 'Enrolled Students',
    hindi: 'नामांकित छात्र',
    urdu: 'اندراج شدہ طلباء',
  },
  uploadNotes: {
    english: 'Upload Notes',
    hindi: 'नोट्स अपलोड करें',
    urdu: 'نوٹس اپ لوڈ کریں',
  },
  createQuiz: {
    english: 'Create Quiz',
    hindi: 'प्रश्नोत्तरी बनाएं',
    urdu: 'کوئز بنائیں',
  },
  postNotice: {
    english: 'Post Notice',
    hindi: 'सूचना पोस्ट करें',
    urdu: 'نوٹس پوسٹ کریں',
  },

  // Admin specific
  analytics: {
    english: 'Analytics',
    hindi: 'विश्लेषण',
    urdu: 'تجزیات',
  },
  totalStudents: {
    english: 'Total Students',
    hindi: 'कुल छात्र',
    urdu: 'کل طلباء',
  },
  hostelCapacity: {
    english: 'Hostel Capacity',
    hindi: 'छात्रावास क्षमता',
    urdu: 'ہاسٹل صلاحیت',
  },
  pendingRequests: {
    english: 'Pending Requests',
    hindi: 'लंबित अनुरोध',
    urdu: 'زیر التواء درخواستیں',
  },
  
  // Additional UI elements
  overview: {
    english: 'Overview',
    hindi: 'अवलोकन',
    urdu: 'جائزہ',
  },
  home: {
    english: 'Home',
    hindi: 'होम',
    urdu: 'گھر',
  },
  schedule: {
    english: 'Schedule',
    hindi: 'समय सारणी',
    urdu: 'ٹائم ٹیبل',
  },
  campusMap: {
    english: 'Campus Map',
    hindi: 'कैंपस मानचित्र',
    urdu: 'کیمپس نقشہ',
  },
  aboutAMU: {
    english: 'About AMU',
    hindi: 'AMU के बारे में',
    urdu: 'AMU کے بارے میں',
  },
  mentorship: {
    english: 'Mentorship',
    hindi: 'मार्गदर्शन',
    urdu: 'رہنمائی',
  },

  // Dashboard specific
  academicPerformance: {
    english: 'Academic Performance',
    hindi: 'शैक्षणिक प्रदर्शन',
    urdu: 'تعلیمی کارکردگی',
  },
  upcomingClasses: {
    english: 'Upcoming Classes',
    hindi: 'आगामी कक्षाएं',
    urdu: 'آنے والی کلاسیں',
  },
  recentNotes: {
    english: 'Recent Notes',
    hindi: 'हाल के नोट्स',
    urdu: 'حالیہ نوٹس',
  },
  pendingAssignments: {
    english: 'Pending Assignments',
    hindi: 'लंबित असाइनमेंट',
    urdu: 'زیر التواء اسائنمنٹس',
  },
  quickActions: {
    english: 'Quick Actions',
    hindi: 'त्वरित क्रियाएं',
    urdu: 'فوری اعمال',
  },
  viewAll: {
    english: 'View All',
    hindi: 'सभी देखें',
    urdu: 'سب دیکھیں',
  },
  today: {
    english: 'Today',
    hindi: 'आज',
    urdu: 'آج',
  },
  tomorrow: {
    english: 'Tomorrow',
    hindi: 'कल',
    urdu: 'کل',
  },
  thisWeek: {
    english: 'This Week',
    hindi: 'इस सप्ताह',
    urdu: 'اس ہفتے',
  },
  nextWeek: {
    english: 'Next Week',
    hindi: 'अगले सप्ताह',
    urdu: 'اگلے ہفتے',
  },
  dueDate: {
    english: 'Due Date',
    hindi: 'नियत तिथि',
    urdu: 'آخری تاریخ',
  },
  status: {
    english: 'Status',
    hindi: 'स्थिति',
    urdu: 'حیثیت',
  },
  completed: {
    english: 'Completed',
    hindi: 'पूर्ण',
    urdu: 'مکمل',
  },
  pending: {
    english: 'Pending',
    hindi: 'लंबित',
    urdu: 'زیر التواء',
  },
  inProgress: {
    english: 'In Progress',
    hindi: 'प्रगति में',
    urdu: 'جاری',
  },

  // Faculty Directory
  facultyDirectory: {
    english: 'Faculty Directory',
    hindi: 'संकाय निर्देशिका',
    urdu: 'فیکلٹی ڈائریکٹری',
  },
  contactFaculty: {
    english: 'Contact Faculty',
    hindi: 'संकाय से संपर्क करें',
    urdu: 'فیکلٹی سے رابطہ کریں',
  },
  officeHours: {
    english: 'Office Hours',
    hindi: 'कार्यालय समय',
    urdu: 'دفتری اوقات',
  },
  designation: {
    english: 'Designation',
    hindi: 'पदनाम',
    urdu: 'عہدہ',
  },
  office: {
    english: 'Office',
    hindi: 'कार्यालय',
    urdu: 'دفتر',
  },

  // AI Assistant
  aiAssistant: {
    english: 'AI Assistant',
    hindi: 'AI सहायक',
    urdu: 'AI اسسٹنٹ',
  },
  askMeAnything: {
    english: 'Ask me anything...',
    hindi: 'मुझसे कुछ भी पूछें...',
    urdu: 'مجھ سے کچھ بھی پوچھیں...',
  },
  alwaysHereToHelp: {
    english: 'Always here to help',
    hindi: 'मदद के लिए हमेशा यहाँ',
    urdu: 'مدد کے لیے ہمیشہ یہاں',
  },
  myAssignments: {
    english: 'My Assignments',
    hindi: 'मेरे असाइनमेंट',
    urdu: 'میری اسائنمنٹس',
  },
  todaysClasses: {
    english: "Today's Classes",
    hindi: 'आज की कक्षाएं',
    urdu: 'آج کی کلاسیں',
  },
  upcomingDeadlines: {
    english: 'Upcoming Deadlines',
    hindi: 'आगामी समय सीमा',
    urdu: 'آنے والی آخری تاریخیں',
  },
  recentNotesLabel: {
    english: 'Recent Notes',
    hindi: 'हाल के नोट्स',
    urdu: 'حالیہ نوٹس',
  },
  listening: {
    english: 'Listening...',
    hindi: 'सुन रहा है...',
    urdu: 'سن رہا ہے...',
  },
  speaking: {
    english: 'Speaking...',
    hindi: 'बोल रहा है...',
    urdu: 'بول رہا ہے...',
  },
  copy: {
    english: 'Copy',
    hindi: 'कॉपी करें',
    urdu: 'کاپی کریں',
  },
  read: {
    english: 'Read',
    hindi: 'पढ़ें',
    urdu: 'پڑھیں',
  },
  stop: {
    english: 'Stop',
    hindi: 'रोकें',
    urdu: 'رکیں',
  },

  // Notes
  uploadedBy: {
    english: 'Uploaded by',
    hindi: 'द्वारा अपलोड किया गया',
    urdu: 'اپ لوڈ کیا',
  },
  fileSize: {
    english: 'File Size',
    hindi: 'फाइल का आकार',
    urdu: 'فائل سائز',
  },
  lastModified: {
    english: 'Last Modified',
    hindi: 'अंतिम संशोधित',
    urdu: 'آخری ترمیم',
  },
  courseCode: {
    english: 'Course Code',
    hindi: 'पाठ्यक्रम कोड',
    urdu: 'کورس کوڈ',
  },

  // Time related
  monday: {
    english: 'Monday',
    hindi: 'सोमवार',
    urdu: 'پیر',
  },
  tuesday: {
    english: 'Tuesday',
    hindi: 'मंगलवार',
    urdu: 'منگل',
  },
  wednesday: {
    english: 'Wednesday',
    hindi: 'बुधवार',
    urdu: 'بدھ',
  },
  thursday: {
    english: 'Thursday',
    hindi: 'गुरुवार',
    urdu: 'جمعرات',
  },
  friday: {
    english: 'Friday',
    hindi: 'शुक्रवार',
    urdu: 'جمعہ',
  },
  saturday: {
    english: 'Saturday',
    hindi: 'शनिवार',
    urdu: 'ہفتہ',
  },
  sunday: {
    english: 'Sunday',
    hindi: 'रविवार',
    urdu: 'اتوار',
  },

  // Campus Map
  locations: {
    english: 'Locations',
    hindi: 'स्थान',
    urdu: 'مقامات',
  },
  directions: {
    english: 'Directions',
    hindi: 'दिशा-निर्देश',
    urdu: 'ہدایات',
  },
  getDirections: {
    english: 'Get Directions',
    hindi: 'दिशा प्राप्त करें',
    urdu: 'ہدایات حاصل کریں',
  },
  nearbyFacilities: {
    english: 'Nearby Facilities',
    hindi: 'पास की सुविधाएं',
    urdu: 'قریبی سہولیات',
  },

  // Mentorship
  findMentor: {
    english: 'Find Mentor',
    hindi: 'मेंटर खोजें',
    urdu: 'رہنما تلاش کریں',
  },
  connectWithMentor: {
    english: 'Connect with Mentor',
    hindi: 'मेंटर से जुड़ें',
    urdu: 'رہنما سے جڑیں',
  },
  availability: {
    english: 'Availability',
    hindi: 'उपलब्धता',
    urdu: 'دستیابی',
  },
  available: {
    english: 'Available',
    hindi: 'उपलब्ध',
    urdu: 'دستیاب',
  },
  notAvailable: {
    english: 'Not Available',
    hindi: 'उपलब्ध नहीं',
    urdu: 'دستیاب نہیں',
  },
  batch: {
    english: 'Batch',
    hindi: 'बैच',
    urdu: 'بیچ',
  },
  currentRole: {
    english: 'Current Role',
    hindi: 'वर्तमान भूमिका',
    urdu: 'موجودہ کردار',
  },
  expertise: {
    english: 'Expertise',
    hindi: 'विशेषज्ञता',
    urdu: 'مہارت',
  },
  sessions: {
    english: 'sessions',
    hindi: 'सत्र',
    urdu: 'سیشنز',
  },

  // Filters & Sorting
  filterBy: {
    english: 'Filter by',
    hindi: 'फिल्टर करें',
    urdu: 'فلٹر کریں',
  },
  sortBy: {
    english: 'Sort by',
    hindi: 'क्रमबद्ध करें',
    urdu: 'ترتیب دیں',
  },
  all: {
    english: 'All',
    hindi: 'सभी',
    urdu: 'سب',
  },
  subjects: {
    english: 'Subjects',
    hindi: 'विषय',
    urdu: 'مضامین',
  },
  recent: {
    english: 'Recent',
    hindi: 'हाल',
    urdu: 'حالیہ',
  },
  oldest: {
    english: 'Oldest',
    hindi: 'सबसे पुराना',
    urdu: 'قدیم ترین',
  },

  // Settings
  preferences: {
    english: 'Preferences',
    hindi: 'प्राथमिकताएं',
    urdu: 'ترجیحات',
  },
  language: {
    english: 'Language',
    hindi: 'भाषा',
    urdu: 'زبان',
  },
  theme: {
    english: 'Theme',
    hindi: 'थीम',
    urdu: 'تھیم',
  },
  darkMode: {
    english: 'Dark Mode',
    hindi: 'डार्क मोड',
    urdu: 'ڈارک موڈ',
  },
  lightMode: {
    english: 'Light Mode',
    hindi: 'लाइट मोड',
    urdu: 'لائٹ موڈ',
  },
  notifications: {
    english: 'Notifications',
    hindi: 'सूचनाएं',
    urdu: 'اطلاعات',
  },
  privacy: {
    english: 'Privacy',
    hindi: 'गोपनीयता',
    urdu: 'رازداری',
  },
  security: {
    english: 'Security',
    hindi: 'सुरक्षा',
    urdu: 'سیکیورٹی',
  },
  changePassword: {
    english: 'Change Password',
    hindi: 'पासवर्ड बदलें',
    urdu: 'پاس ورڈ تبدیل کریں',
  },
  accountSettings: {
    english: 'Account Settings',
    hindi: 'खाता सेटिंग्स',
    urdu: 'اکاؤنٹ کی ترتیبات',
  },

  // Profile
  editProfile: {
    english: 'Edit Profile',
    hindi: 'प्रोफाइल संपादित करें',
    urdu: 'پروفائل میں ترمیم کریں',
  },
  personalInformation: {
    english: 'Personal Information',
    hindi: 'व्यक्तिगत जानकारी',
    urdu: 'ذاتی معلومات',
  },
  academicInformation: {
    english: 'Academic Information',
    hindi: 'शैक्षणिक जानकारी',
    urdu: 'تعلیمی معلومات',
  },
  contactInformation: {
    english: 'Contact Information',
    hindi: 'संपर्क जानकारी',
    urdu: 'رابطہ کی معلومات',
  },
  registrationNumber: {
    english: 'Registration Number',
    hindi: 'पंजीकरण संख्या',
    urdu: 'رجسٹریشن نمبر',
  },
  studentId: {
    english: 'Student ID',
    hindi: 'छात्र आईडी',
    urdu: 'طالب علم آئی ڈی',
  },
  enrollmentYear: {
    english: 'Enrollment Year',
    hindi: 'नामांकन वर्ष',
    urdu: 'اندراج کا سال',
  },

  // Error messages
  errorOccurred: {
    english: 'An error occurred',
    hindi: 'एक त्रुटि हुई',
    urdu: 'ایک خرابی واقع ہوئی',
  },
  tryAgain: {
    english: 'Try Again',
    hindi: 'पुनः प्रयास करें',
    urdu: 'دوبارہ کوشش کریں',
  },
  noDataAvailable: {
    english: 'No data available',
    hindi: 'कोई डेटा उपलब्ध नहीं',
    urdu: 'کوئی ڈیٹا دستیاب نہیں',
  },
  noResultsFound: {
    english: 'No results found',
    hindi: 'कोई परिणाम नहीं मिला',
    urdu: 'کوئی نتیجہ نہیں ملا',
  },

  // Success messages
  savedSuccessfully: {
    english: 'Saved successfully',
    hindi: 'सफलतापूर्वक सहेजा गया',
    urdu: 'کامیابی سے محفوظ ہو گیا',
  },
  uploadedSuccessfully: {
    english: 'Uploaded successfully',
    hindi: 'सफलतापूर्वक अपलोड किया गया',
    urdu: 'کامیابی سے اپ لوڈ ہو گیا',
  },
  deletedSuccessfully: {
    english: 'Deleted successfully',
    hindi: 'सफलतापूर्वक हटाया गया',
    urdu: 'کامیابی سے حذف ہو گیا',
  },

  // Miscellaneous
  more: {
    english: 'More',
    hindi: 'अधिक',
    urdu: 'مزید',
  },
  less: {
    english: 'Less',
    hindi: 'कम',
    urdu: 'کم',
  },
  showMore: {
    english: 'Show More',
    hindi: 'अधिक दिखाएं',
    urdu: 'مزید دکھائیں',
  },
  showLess: {
    english: 'Show Less',
    hindi: 'कम दिखाएं',
    urdu: 'کم دکھائیں',
  },
  confirm: {
    english: 'Confirm',
    hindi: 'पुष्टि करें',
    urdu: 'تصدیق کریں',
  },
  back: {
    english: 'Back',
    hindi: 'वापस',
    urdu: 'واپس',
  },
  next: {
    english: 'Next',
    hindi: 'अगला',
    urdu: 'اگلا',
  },
  previous: {
    english: 'Previous',
    hindi: 'पिछला',
    urdu: 'پچھلا',
  },
  finish: {
    english: 'Finish',
    hindi: 'समाप्त',
    urdu: 'ختم',
  },
  refresh: {
    english: 'Refresh',
    hindi: 'ताज़ा करें',
    urdu: 'تازہ کریں',
  },
  print: {
    english: 'Print',
    hindi: 'प्रिंट करें',
    urdu: 'پرنٹ کریں',
  },
  share: {
    english: 'Share',
    hindi: 'साझा करें',
    urdu: 'شیئر کریں',
  },
  exportData: {
    english: 'Export Data',
    hindi: 'डेटा निर्यात करें',
    urdu: 'ڈیٹا برآمد کریں',
  },
};

/**
 * Translate a key to the specified language
 */
export function translate(key: string, language: Language = 'english'): string {
  return UI_TRANSLATIONS[key]?.[language] || key;
}

/**
 * Translate course/subject names (mock translation)
 */
export function translateCourseName(courseName: string, language: Language): string {
  if (language === 'english') return courseName;
  
  // Mock translations for common subjects
  const courseTranslations: Record<string, Translation> = {
    'Data Structures': {
      english: 'Data Structures',
      hindi: 'डेटा संरचनाएं',
      urdu: 'ڈیٹا سٹرکچرز',
    },
    'Database Management': {
      english: 'Database Management',
      hindi: 'डेटाबेस प्रबंधन',
      urdu: 'ڈیٹا بیس مینجمنٹ',
    },
    'Financial Accounting': {
      english: 'Financial Accounting',
      hindi: 'वित्तीय लेखांकन',
      urdu: 'مالیاتی اکاؤنٹنگ',
    },
    'Business Economics': {
      english: 'Business Economics',
      hindi: 'व्यावसायिक अर्थशास्त्र',
      urdu: 'کاروباری معاشیات',
    },
    'Calculus': {
      english: 'Calculus',
      hindi: 'कलन',
      urdu: 'کیلکولس',
    },
    'Algebra': {
      english: 'Algebra',
      hindi: 'बीजगणित',
      urdu: 'الجبرا',
    },
    'Organic Chemistry': {
      english: 'Organic Chemistry',
      hindi: 'कार्बनिक रसायन',
      urdu: 'نامیاتی کیمسٹری',
    },
    'Physical Chemistry': {
      english: 'Physical Chemistry',
      hindi: 'भौतिक रसायन',
      urdu: 'طبیعی کیمسٹری',
    },
    'Inorganic Chemistry': {
      english: 'Inorganic Chemistry',
      hindi: 'अकार्बनिक रसायन',
      urdu: 'غیر نامیاتی کیمسٹری',
    },
    'Biochemistry': {
      english: 'Biochemistry',
      hindi: 'जैव रसायन',
      urdu: 'حیاتیاتی کیمسٹری',
    },
    'Cell Biology': {
      english: 'Cell Biology',
      hindi: 'कोशिका जीव विज्ञान',
      urdu: 'خلیاتی حیاتیات',
    },
    'Genetics': {
      english: 'Genetics',
      hindi: 'आनुवंशिकी',
      urdu: 'جینیات',
    },
    'Classical Urdu': {
      english: 'Classical Urdu',
      hindi: 'शास्त्रीय उर्दू',
      urdu: 'کلاسیکی اردو',
    },
    'Modern Urdu': {
      english: 'Modern Urdu',
      hindi: 'आधुनिक उर्दू',
      urdu: 'جدید اردو',
    },
    'Urdu Poetry': {
      english: 'Urdu Poetry',
      hindi: 'उर्दू कविता',
      urdu: 'اردو شاعری',
    },
    'Programming': {
      english: 'Programming',
      hindi: 'प्रोग्रामिंग',
      urdu: 'پروگرامنگ',
    },
    'Computer Networks': {
      english: 'Computer Networks',
      hindi: 'कंप्यूटर नेटवर्क',
      urdu: 'کمپیوٹر نیٹ ورکس',
    },
    'Web Development': {
      english: 'Web Development',
      hindi: 'वेब विकास',
      urdu: 'ویب ڈیولپمنٹ',
    },
  };

  return courseTranslations[courseName]?.[language] || courseName;
}

/**
 * Translate notice/content (mock translation)
 */
export function translateContent(content: string, language: Language): string {
  if (language === 'english') return content;
  
  // Mock translation - in production, use translation API
  return `[${language.toUpperCase()}] ${content}`;
}