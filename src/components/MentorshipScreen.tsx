import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { UserPlus, Star, BookOpen, Code, Briefcase, Search, GraduationCap, Stethoscope, Scale, Building2 } from "lucide-react";
import { useState, useMemo } from "react";
import { useLanguage } from "./LanguageContext";
import { translate, UI_TRANSLATIONS } from "../utils/translations";

export function MentorshipScreen() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string>("All");

  const mentors = [
    // Software Engineering & Tech
    {
      id: 1,
      name: "Dr. Divya Jain",
      role: "Director of Machine Learning",
      company: "Adobe Inc.",
      department: "Computer Science",
      expertise: ["ML/AI", "Tech Leadership", "Software Engineering"],
      rating: 4.9,
      sessions: 52,
      available: true,
      field: "Software Engineering",
      graduationYear: "2012"
    },
    {
      id: 2,
      name: "Mohd Salim Alam",
      role: "Senior Associate",
      company: "Capgemini Pvt. Ltd",
      department: "IT Consulting",
      expertise: ["IT Consulting", "Career Growth", "Cloud Solutions"],
      rating: 4.7,
      sessions: 38,
      available: true,
      field: "Software Engineering",
      graduationYear: "2015"
    },
    {
      id: 3,
      name: "Adil Shamim",
      role: "Process Developer",
      company: "Genpact",
      department: "Operations",
      expertise: ["Operations", "Corporate Skills", "Process Optimization"],
      rating: 4.8,
      sessions: 45,
      available: true,
      field: "Software Engineering",
      graduationYear: "2016"
    },
    // Biotechnology & Life Sciences
    {
      id: 4,
      name: "Dr. Asad Ullah Khan",
      role: "Professor",
      company: "Interdisciplinary Biotechnology Unit, AMU",
      department: "Biotechnology",
      expertise: ["Biotech Research", "Microbiology", "Academic Mentoring"],
      rating: 4.9,
      sessions: 67,
      available: true,
      field: "Biotechnology",
      graduationYear: "2008"
    },
    {
      id: 5,
      name: "Dr. Mohammad Fazle Alam",
      role: "Biotech Researcher",
      company: "University of Illinois College of Medicine",
      department: "Biotechnology",
      expertise: ["Biotechnology", "Research Leadership", "Medical Research"],
      rating: 4.9,
      sessions: 41,
      available: true,
      field: "Biotechnology",
      graduationYear: "2010"
    },
    // Business & Finance
    {
      id: 6,
      name: "Altamash Vakil",
      role: "Reward Manager",
      company: "Travelex India",
      department: "B.Com. Hons.",
      expertise: ["Business Operations", "Finance", "Rewards Management"],
      rating: 4.8,
      sessions: 34,
      available: true,
      field: "Business & Finance",
      graduationYear: "2014"
    },
    {
      id: 7,
      name: "Ateeq Siddiqui",
      role: "Manager",
      company: "Saudi Arabia",
      department: "Commerce",
      expertise: ["Management", "International Business", "Operations"],
      rating: 4.7,
      sessions: 29,
      available: false,
      field: "Business & Finance",
      graduationYear: "2013"
    },
    {
      id: 8,
      name: "Imranul Haque",
      role: "Finance Officer",
      company: "ABM Aviation",
      department: "Finance",
      expertise: ["Finance", "Aviation Industry", "Financial Management"],
      rating: 4.8,
      sessions: 36,
      available: true,
      field: "Business & Finance",
      graduationYear: "2015"
    },
    {
      id: 9,
      name: "Dr. Sumbul Kabir",
      role: "Entrepreneur",
      company: "Abu Dhabi",
      department: "Ph.D. Commerce",
      expertise: ["Entrepreneurship", "Business Strategy", "Startup Guidance"],
      rating: 4.9,
      sessions: 48,
      available: true,
      field: "Business & Finance",
      graduationYear: "2011"
    },
    // Civil Services & Public Administration
    {
      id: 10,
      name: "Manoj Yadav",
      role: "IPS Officer",
      company: "Indian Police Service",
      department: "Economics",
      expertise: ["Public Service", "Governance", "UPSC Preparation"],
      rating: 4.9,
      sessions: 56,
      available: true,
      field: "Civil Services",
      graduationYear: "2009"
    },
    {
      id: 11,
      name: "Md. Nazmuddin",
      role: "IES Officer",
      company: "Indian Engineering Services",
      department: "Engineering",
      expertise: ["Engineering Services", "Government Careers", "Technical Leadership"],
      rating: 4.8,
      sessions: 42,
      available: true,
      field: "Civil Services",
      graduationYear: "2010"
    }
  ];

  // Get unique fields for filter buttons
  const uniqueFields = useMemo(() => {
    const fields = new Set(mentors.map(m => m.field));
    return ["All", ...Array.from(fields)];
  }, []);

  // Filter mentors based on search query and selected field
  const filteredMentors = useMemo(() => {
    return mentors.filter(mentor => {
      // Filter by field
      const fieldMatch = selectedField === "All" || mentor.field === selectedField;
      
      // Filter by search query
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = searchQuery === "" || 
        mentor.name.toLowerCase().includes(searchLower) ||
        mentor.role.toLowerCase().includes(searchLower) ||
        mentor.company.toLowerCase().includes(searchLower) ||
        mentor.department.toLowerCase().includes(searchLower) ||
        mentor.expertise.some(exp => exp.toLowerCase().includes(searchLower));
      
      return fieldMatch && searchMatch;
    });
  }, [searchQuery, selectedField]);

  const myMentor = mentors[0];

  const t = (key: string) => translate(key, language);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="mb-1">
          {language === "english" && "Mentorship Program"}
          {language === "hindi" && "मार्गदर्शन कार्यक्रम"}
          {language === "urdu" && "رہنمائی پروگرام"}
        </h2>
        <p className="text-muted-foreground">
          {language === "english" && "Connect with alumni and industry experts"}
          {language === "hindi" && "पूर्व छात्रों और उद्योग विशेषज्ञों से जुड़ें"}
          {language === "urdu" && "سابق طلباء اور صنعتی ماہرین سے جڑیں"}
        </p>
      </div>

      {/* My Mentor Card */}
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="w-5 h-5 text-primary" />
            <h4>
              {language === "english" && "Your Mentor"}
              {language === "hindi" && "आपके मार्गदर्शक"}
              {language === "urdu" && "آپ کے رہنما"}
            </h4>
          </div>
          
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16 bg-primary text-white">
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h4 className="mb-1">{myMentor.name}</h4>
              <p className="text-muted-foreground mb-2">{myMentor.role} at {myMentor.company}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {myMentor.expertise.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-4 text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span>{myMentor.rating}</span>
                </div>
                <span>•</span>
                <span>{myMentor.sessions} {t("sessions")}</span>
              </div>
              
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                {language === "english" && "Schedule Session"}
                {language === "hindi" && "सत्र शेड्यूल करें"}
                {language === "urdu" && "سیشن شیڈول کریں"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder={
            language === "english" ? "Search mentors by name, expertise, company, or department..." :
            language === "hindi" ? "नाम, विशेषज्ञता, कंपनी या विभाग द्वारा मेंटर खोजें..." :
            "نام، مہارت، کمپنی یا شعبہ کے ذریعے رہنما تلاش کریں..."
          }
          className="pl-10 border-border bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Buttons */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium">
            {language === "english" && "Filter by Field:"}
            {language === "hindi" && "क्षेत्र के अनुसार फ़िल्टर करें:"}
            {language === "urdu" && "شعبہ کے لحاظ سے فلٹر کریں:"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {uniqueFields.map((field) => (
            <Button
              key={field}
              variant={selectedField === field ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedField(field)}
              className={selectedField === field ? "bg-primary hover:bg-primary/90" : ""}
            >
              {field}
            </Button>
          ))}
        </div>
      </div>

      {/* Available Mentors */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3>
            {language === "english" && "Available Mentors"}
            {language === "hindi" && "उपलब्ध मार्गदर्शक"}
            {language === "urdu" && "دستیاب رہنما"}
          </h3>
          <span className="text-sm text-muted-foreground">
            {filteredMentors.length} {language === "english" ? "mentors found" : language === "hindi" ? "मेंटर मिले" : "رہنما ملے"}
          </span>
        </div>

        {filteredMentors.length === 0 ? (
          <Card className="border-border">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                {language === "english" && "No mentors found. Try adjusting your search or filter."}
                {language === "hindi" && "कोई मेंटर नहीं मिला। अपनी खोज या फ़िल्टर समायोजित करने का प्रयास करें।"}
                {language === "urdu" && "کوئی رہنما نہیں ملا۔ اپنی تلاش یا فلٹر کو ایڈجسٹ کرنے کی کوشش کریں۔"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredMentors.map((mentor) => (
              <Card 
                key={mentor.id} 
                className={`border-border hover:shadow-md transition-shadow ${!mentor.available && 'opacity-60'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12 bg-secondary text-white">
                      <AvatarFallback>
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <h4 className="mb-1 line-clamp-1">{mentor.name}</h4>
                          <p className="text-muted-foreground line-clamp-1">
                            {mentor.role} at {mentor.company}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {mentor.department} • AMU {mentor.graduationYear}
                          </p>
                        </div>
                        {mentor.available ? (
                          <Badge className="bg-green-100 text-green-700 shrink-0">
                            {language === "english" && "Available"}
                            {language === "hindi" && "उपलब्ध"}
                            {language === "urdu" && "دستیاب"}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="shrink-0">
                            {language === "english" && "Busy"}
                            {language === "hindi" && "व्यस्त"}
                            {language === "urdu" && "مصروف"}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {mentor.expertise.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Star className="w-3 h-3 fill-accent text-accent" />
                          <span>{mentor.rating}</span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{mentor.sessions} sessions</span>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      disabled={!mentor.available}
                      className="shrink-0"
                    >
                      {language === "english" && "Connect"}
                      {language === "hindi" && "जुड़ें"}
                      {language === "urdu" && "جڑیں"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <Card className="border-border">
        <CardContent className="p-6">
          <h4 className="mb-4">
            {language === "english" && "Program Benefits"}
            {language === "hindi" && "कार्यक्रम लाभ"}
            {language === "urdu" && "پروگرام کے فوائد"}
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="bg-primary/10 text-primary p-3 rounded-lg mb-2 mx-auto w-fit">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-primary mb-1">
                {language === "english" && "Career"}
                {language === "hindi" && "करियर"}
                {language === "urdu" && "کیریئر"}
              </div>
              <p className="text-muted-foreground">
                {language === "english" && "Guidance"}
                {language === "hindi" && "मार्गदर्शन"}
                {language === "urdu" && "رہنمائی"}
              </p>
            </div>
            <div>
              <div className="bg-secondary/10 text-secondary p-3 rounded-lg mb-2 mx-auto w-fit">
                <Code className="w-5 h-5" />
              </div>
              <div className="text-secondary mb-1">
                {language === "english" && "Skill"}
                {language === "hindi" && "कौशल"}
                {language === "urdu" && "مہارت"}
              </div>
              <p className="text-muted-foreground">
                {language === "english" && "Development"}
                {language === "hindi" && "विकास"}
                {language === "urdu" && "ترقی"}
              </p>
            </div>
            <div>
              <div className="bg-accent/20 text-accent p-3 rounded-lg mb-2 mx-auto w-fit">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-accent mb-1">
                {language === "english" && "Industry"}
                {language === "hindi" && "उद्योग"}
                {language === "urdu" && "صنعت"}
              </div>
              <p className="text-muted-foreground">
                {language === "english" && "Insights"}
                {language === "hindi" && "अंतर्दृष्टि"}
                {language === "urdu" && "بصیرت"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}