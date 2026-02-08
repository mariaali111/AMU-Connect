import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { FileText, BookOpen, Users, Shield, AlertTriangle, Award, Briefcase } from "lucide-react";
import { Separator } from "./ui/separator";

export function AMUGuidelines() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-primary/10 via-green-500/10 to-primary/10 border border-primary/20 rounded-xl p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3 text-foreground">AMU Guidelines</h1>
            <p className="text-lg text-muted-foreground">
              Student conduct and university regulations
            </p>
          </div>
        </div>
      </div>

      <Card className="shadow-md">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Student Code of Conduct</CardTitle>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-base leading-relaxed text-foreground">
            Students of Aligarh Muslim University are expected to uphold the values of 
            academic integrity, discipline, respect, and responsibility. Students must 
            adhere to university rules, maintain decorum within hostels and academic spaces, 
            and actively participate in academic and co-curricular activities.
          </p>
          <p className="text-base leading-relaxed text-foreground">
            Respect for faculty, staff, fellow students, and university property is mandatory. 
            Any form of misconduct, academic dishonesty, or violation of university regulations 
            may result in disciplinary action as per AMU statutes.
          </p>
          <p className="text-base leading-relaxed text-foreground">
            Students are encouraged to represent the university with dignity and commitment, 
            both within and outside the campus.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Core Values and Expectations</CardTitle>
          </div>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-5 py-2">
              <h4 className="font-semibold text-lg mb-3 text-foreground">Academic Integrity</h4>
              <p className="text-base leading-relaxed text-muted-foreground">
                Maintain honesty in all academic work, including examinations, assignments, 
                and research. Plagiarism and cheating are strictly prohibited.
              </p>
            </div>
            
            <Separator className="my-2" />
            
            <div className="border-l-4 border-primary pl-5 py-2">
              <h4 className="font-semibold text-lg mb-3 text-foreground">Discipline and Punctuality</h4>
              <p className="text-base leading-relaxed text-muted-foreground">
                Attend classes regularly, submit assignments on time, and follow the 
                university academic calendar and schedule.
              </p>
            </div>
            
            <Separator className="my-2" />
            
            <div className="border-l-4 border-primary pl-5 py-2">
              <h4 className="font-semibold text-lg mb-3 text-foreground">Respectful Behavior</h4>
              <p className="text-base leading-relaxed text-muted-foreground">
                Treat all members of the university community with respect and courtesy. 
                Discriminatory behavior of any kind will not be tolerated.
              </p>
            </div>
            
            <Separator className="my-2" />
            
            <div className="border-l-4 border-primary pl-5 py-2">
              <h4 className="font-semibold text-lg mb-3 text-foreground">Campus and Hostel Decorum</h4>
              <p className="text-base leading-relaxed text-muted-foreground">
                Maintain cleanliness and orderliness in all university spaces. Follow 
                hostel rules and respect the rights of fellow residents.
              </p>
            </div>
            
            <Separator className="my-2" />
            
            <div className="border-l-4 border-primary pl-5 py-2">
              <h4 className="font-semibold text-lg mb-3 text-foreground">Active Participation</h4>
              <p className="text-base leading-relaxed text-muted-foreground">
                Engage in academic discussions, co-curricular activities, and university 
                events to enhance personal growth and contribute to campus life.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Student Responsibilities</CardTitle>
          </div>
          <Separator />
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Comply with all university regulations, policies, and academic requirements</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Preserve and protect university property, facilities, and resources</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Award className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Represent AMU with honor and dignity in all external engagements</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <AlertTriangle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Report any incidents of misconduct, harassment, or safety concerns to appropriate authorities</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Foster an inclusive environment that promotes mutual respect and understanding</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Briefcase className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Uphold the rich heritage and traditions of Aligarh Muslim University</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-2 border-orange-500/30 bg-orange-500/5 shadow-md">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <CardTitle className="text-2xl text-orange-600 dark:text-orange-500">Disciplinary Action</CardTitle>
          </div>
          <Separator className="bg-orange-500/20" />
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed text-foreground">
            Violations of university guidelines may result in disciplinary action ranging from 
            warnings and fines to suspension or expulsion, depending on the severity of the offense. 
            All disciplinary proceedings will be conducted in accordance with AMU statutes and 
            regulations, ensuring fair and transparent processes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
