import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { IslamicPattern } from "./IslamicPattern";
import { GraduationCap, BookOpen, Award, Users, Building2, Globe } from "lucide-react";
import sirSyedPortrait from "figma:asset/c75611db4e7f05d2da98c7b8878d7b5a190c21cd.png";

export function AMUHeritagePage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 via-green-500/10 to-maroon/10 border border-primary/20 rounded-lg p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <IslamicPattern />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <GraduationCap className="w-16 h-16 text-primary" />
            <div>
              <h1 className="text-4xl font-bold mb-2">Aligarh Muslim University</h1>
              <p className="text-xl text-muted-foreground">A Legacy of Excellence Since 1920</p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sir Syed Ahmad Khan - The Visionary Founder</CardTitle>
          <CardDescription>1817 - 1898</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden shadow-lg border-4 border-gold/30">
                <img 
                  src={sirSyedPortrait} 
                  alt="Sir Syed Ahmad Khan" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-3 italic">
                Sir Syed Ahmad Khan (1817-1898)
              </p>
            </div>
            <div className="md:col-span-2 space-y-4">
              <p className="leading-relaxed">
                Sir Syed Ahmad Khan (1817-1898) stands as one of the most influential figures in Indian Muslim 
                history, distinguished as a pioneering reformer, visionary educator, and progressive thinker. 
                Witnessing the decline of Muslim political power and the educational backwardness of his community, 
                he became convinced that regeneration could only be achieved through modern scientific knowledge 
                combined with a rational, progressive mindset.
              </p>
              <p className="leading-relaxed">
                In 1875, Sir Syed founded the Muhammadan Anglo-Oriental College in Aligarh with a revolutionary 
                vision: to create a synthesis between traditional Islamic learning and contemporary Western education. 
                This pioneering institution equipped Muslim youth with the intellectual tools necessary to compete 
                in the modern world while remaining rooted in their cultural and religious heritage. His educational 
                philosophy went beyond academic instruction—he envisioned fostering scientific temper, rational 
                thinking, critical inquiry, and moral character development.
              </p>
              <p className="leading-relaxed">
                In 1920, fulfilling Sir Syed's cherished dream, the college was elevated to the status of Aligarh 
                Muslim University through an Act of the Indian Legislature. Today, AMU stands as a premier Central 
                University upholding the principles of academic excellence, communal harmony, and national integration 
                that Sir Syed championed. His legacy continues to inspire educators and reformers globally, 
                particularly his emphasis on the compatibility of Islam with modern science, promotion of interfaith 
                understanding, and commitment to the intellectual and moral development of youth.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                <Badge>Reformer</Badge>
                <Badge>Educator</Badge>
                <Badge>Social Activist</Badge>
                <Badge>Writer</Badge>
                <Badge>Visionary</Badge>
                <Badge>Nation Builder</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History & Philosophy */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Historical Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold">1875</p>
                <p className="text-sm text-muted-foreground">
                  Muhammadan Anglo-Oriental College founded by Sir Syed Ahmad Khan
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold">1920</p>
                <p className="text-sm text-muted-foreground">
                  Upgraded to Aligarh Muslim University by an Act of Indian Legislature
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold">1965</p>
                <p className="text-sm text-muted-foreground">
                  Became a Central University under the Ministry of Education
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold">Present Day</p>
                <p className="text-sm text-muted-foreground">
                  One of India's premier institutions with over 30,000 students
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Educational Philosophy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Core Values</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                    <span className="text-sm">Synthesis of traditional Islamic learning and modern scientific knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                    <span className="text-sm">Promotion of scientific and rational thinking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                    <span className="text-sm">Fostering communal harmony and national integration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                    <span className="text-sm">Excellence in academics, research, and character building</span>
                  </li>
                </ul>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm italic">
                  "Education is that which makes a man self-reliant and self-less." - Sir Syed Ahmad Khan
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* University Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            University at a Glance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center border rounded-lg p-4">
              <Users className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="text-3xl font-bold">30,000+</p>
              <p className="text-sm text-muted-foreground">Students</p>
            </div>
            <div className="text-center border rounded-lg p-4">
              <Building2 className="w-8 h-8 mx-auto text-maroon mb-2" />
              <p className="text-3xl font-bold">20+</p>
              <p className="text-sm text-muted-foreground">Faculties</p>
            </div>
            <div className="text-center border rounded-lg p-4">
              <BookOpen className="w-8 h-8 mx-auto text-gold mb-2" />
              <p className="text-3xl font-bold">250+</p>
              <p className="text-sm text-muted-foreground">Courses</p>
            </div>
            <div className="text-center border rounded-lg p-4">
              <Globe className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <p className="text-3xl font-bold">80+</p>
              <p className="text-sm text-muted-foreground">Countries</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notable Alumni */}
      <Card>
        <CardHeader>
          <CardTitle>Notable Alumni</CardTitle>
          <CardDescription>Distinguished individuals who have shaped history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Politics & Governance</h4>
              <ul className="space-y-2 text-sm">
                <li>• Liaquat Ali Khan - First Prime Minister of Pakistan</li>
                <li>• Maulana Abul Kalam Azad - Freedom Fighter & Education Minister</li>
                <li>• Zakir Husain - President of India (1967-1969)</li>
                <li>• Fakhruddin Ali Ahmed - President of India (1974-1977)</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Science & Medicine</h4>
              <ul className="space-y-2 text-sm">
                <li>• Salimuzzaman Siddiqui - Organic Chemist</li>
                <li>• Hamied Yusuf - Pharmaceutical Entrepreneur</li>
                <li>• Syed Zahoor Qasim - Marine Biologist</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Arts & Literature</h4>
              <ul className="space-y-2 text-sm">
                <li>• Firaq Gorakhpuri - Urdu Poet</li>
                <li>• Majrooh Sultanpuri - Lyricist</li>
                <li>• Kaifi Azmi - Poet & Lyricist</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vision for Future */}
      <Card>
        <CardHeader>
          <CardTitle>Vision for the Future</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed mb-4">
            AMU continues to uphold Sir Syed's vision of combining traditional values with modern education. 
            The university strives to be a global center of excellence in teaching, research, and character formation.
          </p>
          <p className="leading-relaxed">
            With AMU Connect, we are digitizing the student experience while preserving the rich heritage 
            and values that have defined this institution for over a century. We aim to create a unified digital 
            ecosystem that serves the entire student lifecycle - from admission to alumni engagement.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}