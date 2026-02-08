import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { LanguageSelector } from "./LanguageSelector";
import { AudioPlayer } from "./AudioPlayer";
import { useLanguage } from "./LanguageContext";
import { Megaphone, Calendar, Users, Sparkles, Pin, Volume2, Instagram, ExternalLink } from "lucide-react";
import { useState } from "react";

export function NoticesScreen() {
  const [activeTab, setActiveTab] = useState("all");
  const [audioPlaying, setAudioPlaying] = useState<{ text: string; title: string } | null>(null);
  const [expandedNotice, setExpandedNotice] = useState<number | null>(null);
  const { language, audioEnabled } = useLanguage();

  const noticesData = [
    {
      id: 1,
      title: {
        english: "AMU Hackathon 2026",
        urdu: "اے ایم یو ہیکاتھون 2026",
        hindi: "एएमयू हैकथॉन 2026"
      },
      category: "Hackathons",
      date: "7-8 February 2026",
      time: "Two-day event",
      description: {
        english: "Innovation Council and University Incubation Centre, in collaboration with AMU Innovation Foundation (AMUIF), presents a two-day hackathon for AMU students. Team size: 1-5 members. Focus areas: Campus security, Energy saving, Waste management, Digital campus services.",
        urdu: "انوویشن کونسل اور یونیورسٹی انکیوبیشن سنٹر، AMU انوویشن فاؤنڈیشن (AMUIF) کے تعاون سے، AMU طلباء کے لیے دو روزہ ہیکاتھون پیش کرتے ہیں۔ ٹیم کا سائز: 1-5 اراکین۔ توجہ کے شعبے: کیمپس سیکیورٹی، توانائی کی بچت، فضلہ کا انتظام، ڈیجیٹل کیمپس خدمات۔",
        hindi: "इनोवेशन काउंसिल और विश्वविद्यालय इनक्यूबेशन सेंटर, एएमयू इनोवेशन फाउंडेशन (AMUIF) के सहयोग से, एएमयू छात्रों के लिए दो दिवसीय हैकथॉन प्रस्तुत करते हैं। टीम का आकार: 1-5 सदस्य। फोकस क्षेत्र: कैंपस सुरक्षा, ऊर्जा बचत, कचरा प्रबंधन, डिजिटल कैंपस सेवाएं।"
      },
      isPinned: true,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      id: 2,
      title: {
        english: "AMU Hacks 5.0",
        urdu: "اے ایم یو ہیکس 5.0",
        hindi: "एएमयू हैक्स 5.0"
      },
      category: "Hackathons",
      date: "9 February 2026",
      time: "National-level event",
      description: {
        english: "National-level hackathon organized by the Computer Science Society, AMU. Join us for innovation and technology.",
        urdu: "کمپیوٹر سائنس سوسائٹی، اے ایم یو کی جانب سے قومی سطح کا ہیکاتھون۔ جدت اور ٹیکنالوجی کے لیے ہمارے ساتھ شامل ہوں۔",
        hindi: "कंप्यूटर साइंस सोसाइटी, एएमयू द्वारा आयोजित राष्ट्रीय स्तर का हैकथॉन। नवाचार और प्रौद्योगिकी के लिए हमसे जुड़ें।"
      },
      isPinned: true,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: 3,
      title: {
        english: "TEDx AMU 2026",
        urdu: "ٹیڈ ایکس اے ایم یو 2026",
        hindi: "TEDx AMU 2026"
      },
      category: "Events",
      date: "28-29 January 2026",
      time: "University flagship",
      description: {
        english: "University flagship event with 12 speakers across domains. Experience thought-provoking talks and inspiring ideas.",
        urdu: "مختلف شعبوں میں 12 اسپیکرز کے ساتھ یونیورسٹی کا سب سے بڑا پروگرام۔ فکر انگیز گفتگو اور حوصلہ افزا خیالات کا تجربہ کریں۔",
        hindi: "विभिन्न क्षेत्रों के 12 वक्ताओं के साथ विश्वविद्यालय का प्रमुख कार्यक्रम। विचारोत्तेजक वार्ता और प्रेरणादायक विचारों का अनुभव करें।"
      },
      isPinned: true,
      icon: Megaphone,
      color: "text-primary",
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20"
    },
    {
      id: 4,
      title: {
        english: "ROVAC 2026",
        urdu: "روواک 2026",
        hindi: "ROVAC 2026"
      },
      category: "Technical",
      date: "7-8 February 2026",
      time: "Robotics challenge",
      description: {
        english: "Robotics & autonomous challenge in collaboration with IEEE RAS, AUV & ZHCET. Showcase your robotics skills.",
        urdu: "IEEE RAS، AUV اور ZHCET کے تعاون سے روبوٹکس اور خود مختار چیلنج۔ اپنی روبوٹکس مہارت کا مظاہرہ کریں۔",
        hindi: "IEEE RAS, AUV और ZHCET के सहयोग से रोबोटिक्स और स्वायत्त चुनौती। अपने रोबोटिक्स कौशल का प्रदर्शन करें।"
      },
      isPinned: true,
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30"
    },
    {
      id: 5,
      title: {
        english: "Code O' Fiesta",
        urdu: "کوڈ او' فیئسٹا",
        hindi: "कोड ओ' फिएस्टा"
      },
      category: "Hackathons",
      date: "TBA",
      time: "IEEE Collaboration",
      description: {
        english: "Coding competition in collaboration with IEEE Computer Society & IEEE Women in Engineering. Open to all students.",
        urdu: "IEEE کمپیوٹر سوسائٹی اور IEEE ویمن ان انجینئرنگ کے تعاون سے کوڈنگ مقابلہ۔ تمام طلباء کے لیے کھلا۔",
        hindi: "IEEE कंप्यूटर सोसायटी और IEEE वीमेन इन इंजीनियरिंग के सहयोग से कोडिंग प्रतियोगिता। सभी छात्रों के लिए खुली।"
      },
      isPinned: false,
      icon: Megaphone,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 6,
      title: {
        english: "IEEE WIE × LedBy Foundation",
        urdu: "IEEE WIE × لیڈ بائی فاؤنڈیشن",
        hindi: "IEEE WIE × LedBy Foundation"
      },
      category: "Events",
      date: "17 February 2026",
      time: "Leadership talk",
      description: {
        english: "A conversation that challenges perspectives and sparks growth by Dr. Ruha Shadab. Join us for an inspiring session.",
        urdu: "ڈاکٹر رہا شاداب کی جانب سے نقطہ نظر کو چیلنج کرنے اور ترقی کو جنم دینے والی گفتگو۔ حوصلہ افزا سیشن کے لیے ہمارے ساتھ شامل ہوں۔",
        hindi: "डॉ. रूहा शादब द्वारा परिप्रेक्ष्य को चुनौती देने और विकास को प्रेरित करने वाली बातचीत। प्रेरक सत्र के लिए हमसे जुड़ें।"
      },
      isPinned: false,
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/5",
      borderColor: "border-secondary/20"
    }
  ];

  const handlePlayAudio = (notice: typeof noticesData[0]) => {
    setAudioPlaying({
      title: notice.title[language],
      text: notice.description[language]
    });
  };

  const filteredNotices = activeTab === "all" 
    ? noticesData 
    : noticesData.filter(n => n.category.toLowerCase() === activeTab);

  return (
    <div className="space-y-6">
      {/* Header with Language Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="mb-1">Notices & Events</h2>
          <p className="text-muted-foreground">Stay updated with campus activities</p>
        </div>
        <LanguageSelector />
      </div>

      {/* Filters */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 h-auto">
          <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
          <TabsTrigger value="hackathons" className="text-xs sm:text-sm">Hackathons</TabsTrigger>
          <TabsTrigger value="events" className="text-xs sm:text-sm">Events</TabsTrigger>
          <TabsTrigger value="technical" className="text-xs sm:text-sm">Technical</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => {
          const Icon = notice.icon;
          return (
            <Card 
              key={notice.id} 
              className={`border ${notice.borderColor} hover:shadow-lg transition-shadow relative overflow-hidden`}
            >
              {notice.isPinned && (
                <div className="absolute top-3 right-3">
                  <Pin className="w-4 h-4 text-primary fill-primary" />
                </div>
              )}
              
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className={`${notice.bgColor} ${notice.color} p-3 rounded-lg h-fit`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      <h4 className="flex-1 line-clamp-1">{notice.title[language]}</h4>
                      {audioEnabled && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-7 w-7 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 shrink-0"
                          onClick={() => handlePlayAudio(notice)}
                          title="Play audio"
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-3 text-muted-foreground">
                      <Badge variant="secondary" className={`${notice.bgColor} ${notice.color} border-0`}>
                        {notice.category}
                      </Badge>
                      <span>•</span>
                      <Calendar className="w-3 h-3" />
                      <span>{notice.date}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">{notice.time}</span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {expandedNotice === notice.id ? notice.description[language] : notice.description[language].split('. ').slice(0, 2).join('. ') + '...'}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className={`${notice.color} border-current`}
                        onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
                      >
                        {expandedNotice === notice.id ? "Show Less" : "Read More"}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-primary hover:text-primary/80"
                        onClick={() => {
                          // Show AI summary
                          alert(`AI Summary: ${notice.title[language]} - Key points include upcoming ${notice.category.toLowerCase()} event on ${notice.date}. Registration/participation encouraged.`);
                        }}
                      >
                        <Sparkles className="w-4 h-4 mr-1" />
                        AI Summarize
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {/* Instagram Follow Card */}
        <Card className="border-2 border-gradient-to-r from-purple-500/30 via-pink-500/30 to-orange-500/30 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-orange-50/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-3 rounded-lg">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Follow for AMU Updates</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Stay connected with the latest university news, notices, events, and important announcements on our official Instagram page.
                </p>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90"
                  onClick={() => window.open('https://www.instagram.com/amutestinfo', '_blank')}
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Follow @amutestinfo
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audio Player */}
      {audioPlaying && (
        <AudioPlayer
          text={audioPlaying.text}
          title={audioPlaying.title}
          language={language}
          onClose={() => setAudioPlaying(null)}
        />
      )}
    </div>
  );
}