import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertCircle, IndianRupee, Calendar, Info, Clock, Building2 } from "lucide-react";
import { Separator } from "./ui/separator";

export function FeePortal() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-primary/10 via-green-500/10 to-primary/10 border border-primary/20 rounded-xl p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <IndianRupee className="w-10 h-10 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3 text-foreground">Fee Portal</h1>
            <p className="text-lg text-muted-foreground">
              Academic fee payment and submission information
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
            <p className="font-semibold text-xl mb-3 text-foreground">The fee portal is currently closed.</p>
          </div>
          
          <div className="space-y-4 text-base leading-relaxed">
            <p className="text-foreground">
              The academic fee payment process for the current semester has been completed. 
              The fee portal will reopen prior to the commencement of the next semester, 
              in accordance with the university schedule.
            </p>
            
            <p className="text-muted-foreground">
              Students are advised to check official notifications for updated fee submission timelines.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Info className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Fee Payment Information</CardTitle>
              <CardDescription className="text-base mt-1">
                Important guidelines for fee submission
              </CardDescription>
            </div>
          </div>
          <Separator />
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Fee payment deadlines are announced through official university notifications</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Late fee penalties apply after the designated due date</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Payment receipts should be retained for record purposes</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <IndianRupee className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Fee waivers and scholarships are processed separately by the relevant departments</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Building2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base leading-relaxed">Contact the Finance Office for fee-related queries and clarifications</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-md bg-primary/5">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Next Fee Submission Period</CardTitle>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-base text-muted-foreground leading-relaxed">
            The fee portal will be activated before the start of the upcoming semester. 
            Please monitor official announcements for:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-2 border-primary/20 rounded-xl p-5 bg-background shadow-sm">
              <p className="font-semibold text-lg mb-2 text-foreground">Portal Opening Date</p>
              <p className="text-base text-muted-foreground">To be announced</p>
            </div>
            <div className="border-2 border-primary/20 rounded-xl p-5 bg-background shadow-sm">
              <p className="font-semibold text-lg mb-2 text-foreground">Last Date for Payment</p>
              <p className="text-base text-muted-foreground">To be announced</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
