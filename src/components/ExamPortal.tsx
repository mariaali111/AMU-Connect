import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AlertCircle, ExternalLink, FileText, Calendar, BookOpen, Info } from "lucide-react";
import { Separator } from "./ui/separator";

export function ExamPortal() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-primary/10 via-green-500/10 to-primary/10 border border-primary/20 rounded-xl p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3 text-foreground">Exam Portal</h1>
            <p className="text-lg text-muted-foreground">
              Access your examination results and related information
            </p>
          </div>
        </div>
      </div>

      <Card className="border-orange-500/30 shadow-md">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 p-2 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-500" />
            </div>
            <CardTitle className="text-2xl">Portal Status</CardTitle>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-orange-500/5 border-2 border-orange-500/30 rounded-xl p-6">
            <Badge className="bg-orange-500 text-white mb-4 text-sm px-4 py-1.5">Currently Closed</Badge>
            <p className="font-semibold text-xl mb-3 text-foreground">The exam portal is currently closed.</p>
          </div>
          
          <div className="space-y-4 text-base leading-relaxed">
            <p className="text-foreground">
              The examination portal will be activated during official university examination periods. 
              Once opened, students will be able to access their semester results through the Computer 
              Centre portal using the link provided below.
            </p>
            
            <p className="text-muted-foreground">
              Internal assessment marks will be updated and managed by the respective course instructors 
              and will be reflected separately.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <ExternalLink className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Official Portal Access</CardTitle>
              <CardDescription className="text-base mt-1">
                When active, access your results through the university's Computer Centre portal
              </CardDescription>
            </div>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            asChild
            size="lg"
            className="w-full sm:w-auto text-base px-8 py-6 shadow-sm"
          >
            <a 
              href="https://ccae-amucoe.com/index.php" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <ExternalLink className="w-5 h-5" />
              View Results on Official Portal
            </a>
          </Button>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Info className="w-4 h-4" />
            This link will open in a new tab
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Important Information</CardTitle>
          </div>
          <Separator />
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Results are published according to the university academic calendar</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Check official notifications for result declaration dates</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Contact your department for queries regarding internal assessment marks</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Keep your registration number and credentials ready when the portal opens</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
