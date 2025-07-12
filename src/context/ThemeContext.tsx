import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type Language = 'ar' | 'en';

interface ThemeContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Arabic translations (primary language)
const translations = {
  ar: {
    // App Name
    appName: 'ربط الدم',
    appTagline: 'ربط القلوب، إنقاذ الأرواح',
    
    // Authentication
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    enterEmail: 'أدخل بريدك الإلكتروني',
    enterPassword: 'أدخل كلمة المرور',
    donateBlood: 'التبرع بالدم',
    requestBlood: 'طلب الدم',
    iWantTo: 'أريد أن:',
    noAccount: 'ليس لديك حساب؟ سجل الآن',
    haveAccount: 'لديك حساب بالفعل؟ سجل الدخول',
    
    // Navigation
    dashboard: 'لوحة التحكم',
    profile: 'الملف الشخصي',
    newRequest: 'طلب جديد',
    logout: 'تسجيل الخروج',
    
    // Profile Forms
    completeDonorProfile: 'أكمل ملف المتبرع',
    completeRecipientProfile: 'أكمل ملف المستقبل',
    helpConnectDonors: 'ساعدنا في ربطك بالمرضى المحتاجين',
    helpDonorsFind: 'ساعد المتبرعين في العثور عليك ومساعدتك',
    fullName: 'الاسم الكامل',
    enterFullName: 'أدخل اسمك الكامل',
    age: 'العمر',
    yourAge: 'عمرك',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    bloodType: 'فصيلة الدم',
    phoneNumber: 'رقم الهاتف',
    yourPhone: 'رقم هاتفك',
    city: 'المدينة',
    yourCity: 'مدينتك',
    lastDonationDate: 'تاريخ آخر تبرع (اختياري)',
    currentlyAvailable: 'متاح حالياً للتبرع بالدم',
    completeProfile: 'إكمال الملف الشخصي',
    contactName: 'اسم جهة الاتصال',
    hospitalName: 'اسم المستشفى/المركز الطبي',
    hospitalCity: 'مدينة المستشفى',
    patientCondition: 'حالة المريض (اختياري)',
    patientConditionDesc: 'وصف موجز لحالة المريض أو الوضع الطبي',
    contactNumber: 'رقم الاتصال',
    
    // Blood Request
    createBloodRequest: 'إنشاء طلب دم',
    helpConnectDonors2: 'ساعدنا في ربطك بالمتبرعين المتاحين',
    bloodTypeNeeded: 'فصيلة الدم المطلوبة',
    unitsNeeded: 'عدد الوحدات المطلوبة',
    urgencyLevel: 'مستوى الإلحاح',
    lowPriority: 'أولوية منخفضة',
    mediumPriority: 'أولوية متوسطة',
    highPriority: 'أولوية عالية',
    criticalEmergency: 'حرج/طوارئ',
    additionalNotes: 'ملاحظات إضافية (اختياري)',
    additionalNotesDesc: 'أي معلومات إضافية قد تساعد المتبرعين (مثل حالة طبية محددة، وقت التبرع المفضل، إلخ)',
    createRequest: 'إنشاء الطلب',
    
    // Dashboard
    welcomeBack: 'مرحباً بعودتك',
    readyToSave: 'مستعد لإنقاذ الأرواح اليوم؟',
    welcome: 'مرحباً',
    location: 'الموقع',
    available: 'متاح',
    notAvailable: 'غير متاح',
    filterRequests: 'تصفية الطلبات',
    urgencyLevel2: 'مستوى الإلحاح',
    allUrgencyLevels: 'جميع مستويات الإلحاح',
    showOnlyMyCity: 'إظهار الطلبات في مدينتي فقط',
    matchingRequests: 'الطلبات المطابقة',
    noMatchingRequests: 'لا توجد طلبات مطابقة',
    noRequestsDesc: 'لا توجد حالياً طلبات دم تطابق فصيلة دمك وموقعك.',
    noRequestsFilters: 'لا توجد طلبات تطابق المرشحات الحالية. جرب تعديل إعدادات المرشح.',
    activeRequests: 'الطلبات النشطة',
    fulfilled: 'مكتملة',
    totalRequests: 'إجمالي الطلبات',
    noActiveRequests: 'لا توجد طلبات نشطة',
    noActiveRequestsDesc: 'ليس لديك أي طلبات دم نشطة في الوقت الحالي.',
    createFirstRequest: 'إنشاء طلبك الأول',
    requestHistory: 'تاريخ الطلبات',
    
    // Request Card
    unitsNeeded2: 'وحدة مطلوبة',
    posted: 'تم النشر',
    contact: 'جهة الاتصال',
    donorsResponded: 'متبرع استجاب',
    willingToDonate: 'أنا مستعد للتبرع',
    alreadyResponded: 'تم الرد بالفعل',
    donorsWhoResponded: 'المتبرعين الذين استجابوا',
    respondedOn: 'استجاب في',
    contactDirectly: 'اتصل مباشرة',
    
    // Profile Display
    donorProfile: 'ملف المتبرع',
    recipientProfile: 'ملف المستقبل',
    name: 'الاسم',
    hospital: 'المستشفى',
    phone: 'الهاتف',
    availability: 'التوفر',
    lastDonation: 'آخر تبرع',
    
    // Common
    low: 'منخفض',
    medium: 'متوسط',
    high: 'عالي',
    critical: 'حرج',
    units: 'وحدات',
    unit: 'وحدة',
    
    // Validation
    authFailed: 'فشل في المصادقة. يرجى المحاولة مرة أخرى.',
    errorOccurred: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    completeProfileFirst: 'يرجى إكمال ملفك الشخصي أولاً.',
    
    // Theme
    darkMode: 'الوضع المظلم',
    lightMode: 'الوضع الفاتح',
    language: 'اللغة',
    arabic: 'العربية',
    english: 'English'
  },
  en: {
    // App Name
    appName: 'BloodConnect',
    appTagline: 'Connecting hearts, saving lives',
    
    // Authentication
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email Address',
    password: 'Password',
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    donateBlood: 'Donate Blood',
    requestBlood: 'Request Blood',
    iWantTo: 'I want to:',
    noAccount: "Don't have an account? Sign up",
    haveAccount: 'Already have an account? Sign in',
    
    // Navigation
    dashboard: 'Dashboard',
    profile: 'Profile',
    newRequest: 'New Request',
    logout: 'Logout',
    
    // Profile Forms
    completeDonorProfile: 'Complete Your Donor Profile',
    completeRecipientProfile: 'Complete Your Recipient Profile',
    helpConnectDonors: 'Help us connect you with patients in need',
    helpDonorsFind: 'Help donors find and assist you',
    fullName: 'Full Name',
    enterFullName: 'Enter your full name',
    age: 'Age',
    yourAge: 'Your age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    bloodType: 'Blood Type',
    phoneNumber: 'Phone Number',
    yourPhone: 'Your phone number',
    city: 'City',
    yourCity: 'Your city',
    lastDonationDate: 'Last Donation Date (Optional)',
    currentlyAvailable: 'I am currently available to donate blood',
    completeProfile: 'Complete Profile',
    contactName: 'Contact Name',
    hospitalName: 'Hospital/Medical Center',
    hospitalCity: 'Hospital city',
    patientCondition: 'Patient Condition (Optional)',
    patientConditionDesc: 'Brief description of patient condition or medical situation',
    contactNumber: 'Your contact number',
    
    // Blood Request
    createBloodRequest: 'Create Blood Request',
    helpConnectDonors2: 'Help us connect you with available donors',
    bloodTypeNeeded: 'Blood Type Needed',
    unitsNeeded: 'Units Needed',
    urgencyLevel: 'Urgency Level',
    lowPriority: 'Low Priority',
    mediumPriority: 'Medium Priority',
    highPriority: 'High Priority',
    criticalEmergency: 'Critical/Emergency',
    additionalNotes: 'Additional Notes (Optional)',
    additionalNotesDesc: 'Any additional information that might help donors (e.g., specific medical condition, preferred donation time, etc.)',
    createRequest: 'Create Request',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    readyToSave: 'Ready to save lives today?',
    welcome: 'Welcome',
    location: 'Location',
    available: 'Available',
    notAvailable: 'Not Available',
    filterRequests: 'Filter Requests',
    urgencyLevel2: 'Urgency Level',
    allUrgencyLevels: 'All Urgency Levels',
    showOnlyMyCity: 'Show only requests in my city',
    matchingRequests: 'Matching Requests',
    noMatchingRequests: 'No matching requests',
    noRequestsDesc: 'There are currently no blood requests matching your blood type and location.',
    noRequestsFilters: 'No requests match your current filters. Try adjusting your filter settings.',
    activeRequests: 'Active Requests',
    fulfilled: 'Fulfilled',
    totalRequests: 'Total Requests',
    noActiveRequests: 'No active requests',
    noActiveRequestsDesc: "You don't have any active blood requests at the moment.",
    createFirstRequest: 'Create Your First Request',
    requestHistory: 'Request History',
    
    // Request Card
    unitsNeeded2: 'unit(s) needed',
    posted: 'Posted',
    contact: 'Contact',
    donorsResponded: 'donor(s) have responded',
    willingToDonate: "I'm willing to donate",
    alreadyResponded: 'Already Responded',
    donorsWhoResponded: 'Donors who responded',
    respondedOn: 'Responded on',
    contactDirectly: 'Contact directly',
    
    // Profile Display
    donorProfile: 'Donor Profile',
    recipientProfile: 'Recipient Profile',
    name: 'Name',
    hospital: 'Hospital',
    phone: 'Phone',
    availability: 'Availability',
    lastDonation: 'Last Donation',
    
    // Common
    low: 'low',
    medium: 'medium',
    high: 'high',
    critical: 'critical',
    units: 'units',
    unit: 'unit',
    
    // Validation
    authFailed: 'Authentication failed. Please try again.',
    errorOccurred: 'An error occurred. Please try again.',
    completeProfileFirst: 'Please complete your profile first.',
    
    // Theme
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    arabic: 'العربية',
    english: 'English'
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('ar'); // Default to Arabic

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', (savedTheme || 'light') === 'dark');
    
    // Apply RTL for Arabic
    document.documentElement.dir = (savedLanguage || 'ar') === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage || 'ar';
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      language,
      toggleTheme,
      toggleLanguage,
      t
    }}>
      {children}
    </ThemeContext.Provider>
  );
};