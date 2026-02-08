import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner@2.0.3";
import { getDepartments, getPrograms } from "../utils/supabaseClient";
import { Loader2, GraduationCap } from "lucide-react";

interface CourseSelectionModalProps {
  isOpen: boolean;
  onComplete: (departmentId: string, programId: string) => void;
  userRole: "student" | "professor";
}

interface Department {
  department_id: string;
  name: string;
  code: string;
}

interface Program {
  program_id: string;
  name: string;
  code: string;
  degree_type: string;
}

export function CourseSelectionModal({
  isOpen,
  onComplete,
  userRole,
}: CourseSelectionModalProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      setIsFetching(true);
      const result = await getDepartments();
      if (result.success && result.data.departments) {
        setDepartments(result.data.departments);
      } else {
        toast.error("Failed to load departments");
      }
      setIsFetching(false);
    };

    if (isOpen) {
      fetchDepartments();
    }
  }, [isOpen]);

  // Fetch programs when department changes
  useEffect(() => {
    const fetchPrograms = async () => {
      if (!selectedDepartment) {
        setPrograms([]);
        return;
      }

      setIsFetching(true);
      const result = await getPrograms(selectedDepartment);
      if (result.success && result.data.programs) {
        setPrograms(result.data.programs);
      } else {
        toast.error("Failed to load programs");
        setPrograms([]);
      }
      setIsFetching(false);
    };

    fetchPrograms();
  }, [selectedDepartment]);

  const handleSubmit = async () => {
    if (!selectedDepartment || !selectedProgram) {
      toast.error("Please select both department and program");
      return;
    }

    setIsLoading(true);
    try {
      // Here you would typically update the user's profile with the selected course
      // For now, we'll just complete the flow
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      onComplete(selectedDepartment, selectedProgram);
    } catch (error: any) {
      toast.error("Failed to save selection");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            {userRole === "student" ? "Select Your Program" : "Select Your Department"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {userRole === "student"
              ? "Choose your department and program to personalize your dashboard"
              : "Choose your department to access relevant courses and students"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Department Selection */}
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={selectedDepartment}
              onValueChange={(value) => {
                setSelectedDepartment(value);
                setSelectedProgram(""); // Reset program when department changes
              }}
              disabled={isFetching}
            >
              <SelectTrigger id="department">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.department_id} value={dept.department_id}>
                    {dept.name} ({dept.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Program Selection (only for students) */}
          {userRole === "student" && (
            <div className="space-y-2">
              <Label htmlFor="program">Program</Label>
              <Select
                value={selectedProgram}
                onValueChange={setSelectedProgram}
                disabled={!selectedDepartment || isFetching}
              >
                <SelectTrigger id="program">
                  <SelectValue placeholder="Select a program" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((program) => (
                    <SelectItem key={program.program_id} value={program.program_id}>
                      {program.name} ({program.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Information Box */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
            <p className="text-sm text-muted-foreground">
              {userRole === "student"
                ? "This will be used to filter courses, assignments, and timetables relevant to your program."
                : "This will be used to display courses and students under your department."}
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            onClick={handleSubmit}
            disabled={
              isLoading ||
              !selectedDepartment ||
              (userRole === "student" && !selectedProgram)
            }
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Continue to Dashboard"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
