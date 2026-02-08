import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { GeometricBorder } from "./IslamicPattern";
import { 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Edit,
  Trash2,
  Filter
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";
import { getAssignmentsForProgram } from "../utils/programSpecificAcademicData";

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

interface ToDoScreenProps {
  userData?: any;
}

export function ToDoScreen({ userData }: ToDoScreenProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("active");
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    subject: "",
    dueDate: "",
    priority: "medium" as "high" | "medium" | "low"
  });

  // Load assignments from localStorage
  useEffect(() => {
    // Get program-specific assignments if userData is available
    const programCode = userData?.programCode || userData?.profile?.programCode;
    
    if (programCode) {
      // Load program-specific assignments
      const programAssignments = getAssignmentsForProgram(programCode);
      
      // Convert to expected format
      const formattedAssignments: Assignment[] = programAssignments.map(assignment => {
        // Determine priority based on marks
        let priority: "high" | "medium" | "low" = "medium";
        if (assignment.totalMarks >= 30) {
          priority = "high";
        } else if (assignment.totalMarks < 20) {
          priority = "low";
        }
        
        return {
          id: assignment.id,
          title: assignment.title,
          description: assignment.description,
          subject: assignment.courseName,
          dueDate: assignment.dueDate,
          priority,
          completed: assignment.submitted,
        };
      });
      
      setAssignments(formattedAssignments);
      return;
    }
    
    // Fallback to localStorage
    const storedAssignments = localStorage.getItem("amu_assignments");
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    } else {
      // Set initial sample assignments
      const sampleAssignments: Assignment[] = [
        {
          id: "1",
          title: "Complete OOP Assignment",
          description: "Implement inheritance and polymorphism examples with documentation",
          subject: "Object-Oriented Programming",
          dueDate: "2025-10-15",
          priority: "high",
          completed: false
        },
        {
          id: "2",
          title: "Data Structures Lab Report",
          description: "Write report on binary tree implementation",
          subject: "Data Structures",
          dueDate: "2025-10-10",
          priority: "medium",
          completed: false
        },
        {
          id: "3",
          title: "DBMS Project Submission",
          description: "Complete database design and normalization project",
          subject: "Database Management",
          dueDate: "2025-10-20",
          priority: "high",
          completed: false
        }
      ];
      setAssignments(sampleAssignments);
      localStorage.setItem("amu_assignments", JSON.stringify(sampleAssignments));
    }
  }, [userData]);

  // Save assignments to localStorage
  useEffect(() => {
    if (assignments.length > 0 || localStorage.getItem("amu_assignments")) {
      localStorage.setItem("amu_assignments", JSON.stringify(assignments));
    }
  }, [assignments]);

  const handleAddAssignment = () => {
    if (!newAssignment.title || !newAssignment.subject || !newAssignment.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingAssignment) {
      // Update existing assignment
      setAssignments(prev => prev.map(assignment =>
        assignment.id === editingAssignment.id
          ? { ...assignment, ...newAssignment }
          : assignment
      ));
      toast.success("Assignment updated successfully");
    } else {
      // Add new assignment
      const assignment: Assignment = {
        id: Date.now().toString(),
        ...newAssignment,
        completed: false
      };
      setAssignments(prev => [...prev, assignment]);
      toast.success("Assignment added successfully");
    }

    setIsAddDialogOpen(false);
    setEditingAssignment(null);
    setNewAssignment({ title: "", description: "", subject: "", dueDate: "", priority: "medium" });
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setNewAssignment({
      title: assignment.title,
      description: assignment.description,
      subject: assignment.subject,
      dueDate: assignment.dueDate,
      priority: assignment.priority
    });
    setIsAddDialogOpen(true);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    setAssignments(prev => prev.filter(a => a.id !== assignmentId));
    toast.success("Assignment deleted successfully");
  };

  const handleToggleComplete = (assignmentId: string) => {
    setAssignments(prev => prev.map(assignment =>
      assignment.id === assignmentId
        ? { ...assignment, completed: !assignment.completed }
        : assignment
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" };
      case "medium":
        return { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200" };
      case "low":
        return { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200" };
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Filter assignments
  const filteredAssignments = assignments
    .filter(assignment => {
      if (filterStatus === "active" && assignment.completed) return false;
      if (filterStatus === "completed" && !assignment.completed) return false;
      if (filterPriority !== "all" && assignment.priority !== filterPriority) return false;
      return true;
    })
    .sort((a, b) => {
      // Sort by due date
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return dateA - dateB;
    });

  const activeAssignments = assignments.filter(a => !a.completed);
  const completedAssignments = assignments.filter(a => a.completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="mb-1">Assignments Tracker</h2>
          <p className="text-muted-foreground">Manage your assignments and deadlines</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) {
            setEditingAssignment(null);
            setNewAssignment({ title: "", description: "", subject: "", dueDate: "", priority: "medium" });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingAssignment ? "Edit Assignment" : "Add New Assignment"}</DialogTitle>
              <DialogDescription>
                Add a new assignment or task to track
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Complete OOP Assignment"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Computer Science"
                  value={newAssignment.subject}
                  onChange={(e) => setNewAssignment(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the assignment..."
                  rows={3}
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={newAssignment.priority} onValueChange={(value: any) => setNewAssignment(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAssignment} className="bg-primary">
                {editingAssignment ? "Update" : "Add"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground">Active</p>
                <p className="text-primary">{activeAssignments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-muted-foreground">Completed</p>
                <p className="text-green-700">{completedAssignments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 md:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="w-5 h-5 text-red-700" />
              </div>
              <div>
                <p className="text-muted-foreground">Due Soon</p>
                <p className="text-red-700">
                  {assignments.filter(a => !a.completed && getDaysUntilDue(a.dueDate) <= 3).length} assignments
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignments</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="sm:w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">No assignments found</h3>
              <p className="text-muted-foreground">
                {filterStatus === "completed" 
                  ? "Complete some assignments to see them here"
                  : "Add your first assignment to get started"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAssignments.map((assignment) => {
            const daysUntil = getDaysUntilDue(assignment.dueDate);
            const priorityColors = getPriorityColor(assignment.priority);
            const isOverdue = daysUntil < 0 && !assignment.completed;
            const isDueSoon = daysUntil <= 3 && daysUntil >= 0 && !assignment.completed;

            return (
              <Card
                key={assignment.id}
                className={`border-border group hover:shadow-md transition-all ${
                  assignment.completed ? 'opacity-60' : ''
                } ${isOverdue ? 'border-l-4 border-l-red-500' : ''} ${
                  isDueSoon ? 'border-l-4 border-l-yellow-500' : ''
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="pt-1">
                      <Checkbox
                        checked={assignment.completed}
                        onCheckedChange={() => handleToggleComplete(assignment.id)}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h4 className={assignment.completed ? 'line-through text-muted-foreground' : ''}>
                            {assignment.title}
                          </h4>
                          <Badge variant="secondary" className="mt-1">
                            {assignment.subject}
                          </Badge>
                        </div>
                        <Badge className={`${priorityColors.bg} ${priorityColors.text} border ${priorityColors.border}`}>
                          {assignment.priority}
                        </Badge>
                      </div>

                      {assignment.description && (
                        <p className={`mb-3 ${assignment.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                          {assignment.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDueDate(assignment.dueDate)}</span>
                        </div>
                        {!assignment.completed && (
                          <div className={`flex items-center gap-2 ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                            <Clock className="w-4 h-4" />
                            <span>
                              {isOverdue
                                ? `Overdue by ${Math.abs(daysUntil)} ${Math.abs(daysUntil) === 1 ? 'day' : 'days'}`
                                : daysUntil === 0
                                ? 'Due today'
                                : `${daysUntil} ${daysUntil === 1 ? 'day' : 'days'} left`}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditAssignment(assignment)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive border-destructive"
                          onClick={() => handleDeleteAssignment(assignment.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}