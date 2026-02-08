import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Footer } from "./Footer";
import { IslamicPattern } from "./IslamicPattern";
import {
  GraduationCap,
  BookOpen,
  MessageSquare,
  Users,
  Globe,
  ListChecks,
  Bell,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

// Import actual AMU campus images
import clockTowerImg from "figma:asset/9bf4b717bce84dd651b3be0a69e18d208717c845.png";
import campusBuildingImg from "figma:asset/93f14d528c01d924601017ea47e56d704a9ca7ff.png";
import kennedyAuditoriumImg from "figma:asset/5f7bb67aa6cf4ae58a2d6cadd905bae7fd7bf286.png";
import culturalEventImg from "figma:asset/8472fbe1f1642effdd5f1a0d74f8121e9053493c.png";
import campusArchitectureImg from "figma:asset/8b3f8aa072d8557de21b3a8af21589d650df409c.png";
import historicBuildingImg from "figma:asset/2621a555870e50a82c338cf8718eb50e08058f1c.png";
import backgroundImg from "figma:asset/8b3f8aa072d8557de21b3a8af21589d650df409c.png";

export function LandingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const campusImages = [
    { url: clockTowerImg, caption: "Iconic AMU Clock Tower" },
    { url: campusBuildingImg, caption: "Indo-Islamic Architecture" },
    { url: kennedyAuditoriumImg, caption: "Kennedy Auditorium & Cultural Center" },
    { url: culturalEventImg, caption: "Cultural Education Centre - AMU" },
    { url: campusArchitectureImg, caption: "Historic AMU Campus Architecture" },
    { url: historicBuildingImg, caption: "AMU's Architectural Heritage" },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Admissions & Enrollment",
      description:
        "Streamlined admissions process with automatic enrollment number and roll number generation",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: GraduationCap,
      title: "Academic Management",
      description:
        "Course registration, attendance tracking, exam schedules, and results in one place",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Users,
      title: "Hostel Management",
      description:
        "Automatic hostel allocation, room assignments, and comprehensive hostel information",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      icon: Globe,
      title: "Trilingual Support",
      description:
        "Access the platform in English, Hindi, and Urdu with seamless language switching",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Calendar,
      title: "Timetable & Scheduling",
      description:
        "Dynamic timetables, class schedules, and smart reminders for upcoming sessions",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: ListChecks,
      title: "Fees & Payments",
      description:
        "View fee structure, payment status, and financial records at a glance",
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      icon: Bell,
      title: "Audit Logs & Activity",
      description:
        "Activity tracking and audit trails for transparency and accountability",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: MessageSquare,
      title: "Role-based Dashboards",
      description:
        "Customized interfaces for Students, Faculty, and Administrators",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campusImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [campusImages.length]);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src={backgroundImg}
          alt="AMU Campus Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/70 to-black/65" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-accent via-primary to-secondary rounded-lg flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-white">AMU Connect</h2>
            <p className="text-white/70">Aligarh Muslim University</p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center z-10">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <IslamicPattern opacity={0.1} />
        </div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-accent/20 rounded-full border border-accent/40">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-accent">Smart Campus Platform</span>
            </div>

            <h1 className="text-white mb-4">Welcome to AMU Connect</h1>

            <p className="text-white/90 mb-8 max-w-xl">
              Your complete campus ecosystem for learning, collaboration, and
              growth at Aligarh Muslim University
            </p>

            <Button
              size="lg"
              onClick={() => navigate("/roles")}
              className="bg-gradient-to-r from-accent via-primary to-secondary h-14 px-8"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="overflow-hidden bg-white/10 backdrop-blur-md">
              <CardContent className="p-0 relative h-[400px]">
                {campusImages.map((img, i) => (
                  <motion.img
                    key={i}
                    src={img.url}
                    alt={img.caption}
                    className={`absolute inset-0 w-full h-full object-cover ${
                      i === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background z-10 relative">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i} className="hover:shadow-lg">
                <CardContent className="p-6">
                  <div
                    className={`w-14 h-14 ${f.bgColor} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-7 h-7 ${f.color}`} />
                  </div>
                  <h3 className="mb-2">{f.title}</h3>
                  <p className="text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
