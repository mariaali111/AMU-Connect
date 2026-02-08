import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { Plus, ClipboardList, Edit, Trash2, CheckCircle2, Circle, Calendar as CalendarIcon } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import { useStudentContext } from "./StudentContext";

interface Assignment {
  id: string;
  title: string;
  courseName: string;
  description: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

interface AssignmentsViewProps {
  searchQuery: string;
}

export function AssignmentsView({ searchQuery }: AssignmentsViewProps) {
  const { contextData } = useStudentContext();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    courseName: "",
    description: "",
    dueDate: ""
  });
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const isDark = document.documentElement.classList.contains("dark");

  // Generate student-specific storage key
  const getStorageKey = () => {
    const studentId = contextData.registrationNumber || contextData.studentId || "default";
    return `studysphere_assignments_${studentId}`;
  };

  useEffect(() => {
    loadAssignments();
  }, [contextData.registrationNumber, contextData.studentId]);

  const loadAssignments = () => {
    const storageKey = getStorageKey();
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setAssignments(saved);
  };

  const saveAssignments = (updatedAssignments: Assignment[]) => {
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(updatedAssignments));
    setAssignments(updatedAssignments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.courseName || !formData.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingAssignment) {
      const updatedAssignments = assignments.map(assignment =>
        assignment.id === editingAssignment.id
          ? { ...assignment, ...formData }
          : assignment
      );
      saveAssignments(updatedAssignments);
      toast.success("Assignment updated successfully!");
    } else {
      const newAssignment: Assignment = {
        id: Date.now().toString(),
        ...formData,
        completed: false,
        createdAt: new Date().toISOString()
      };
      saveAssignments([...assignments, newAssignment]);
      toast.success("Assignment added successfully!");
    }

    resetForm();
  };

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      title: assignment.title,
      courseName: assignment.courseName,
      description: assignment.description,
      dueDate: assignment.dueDate
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const updatedAssignments = assignments.filter(assignment => assignment.id !== id);
    saveAssignments(updatedAssignments);
    toast.success("Assignment deleted successfully!");
  };

  const toggleComplete = (id: string) => {
    const updatedAssignments = assignments.map(assignment =>
      assignment.id === id
        ? { ...assignment, completed: !assignment.completed }
        : assignment
    );
    saveAssignments(updatedAssignments);
    
    const assignment = updatedAssignments.find(a => a.id === id);
    if (assignment?.completed) {
      toast.success("Assignment marked as completed! 🎉");
    } else {
      toast.info("Assignment marked as pending");
    }
  };

  const resetForm = () => {
    setFormData({ title: "", courseName: "", description: "", dueDate: "" });
    setEditingAssignment(null);
    setIsDialogOpen(false);
  };

  let filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filter === "pending") {
    filteredAssignments = filteredAssignments.filter(a => !a.completed);
  } else if (filter === "completed") {
    filteredAssignments = filteredAssignments.filter(a => a.completed);
  }

  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => !a.completed).length,
    completed: assignments.filter(a => a.completed).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={isDark ? "text-white" : "text-slate-900"}>
            Assignments Tracker
          </h2>
          <p className={`mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Track and manage your assignments
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className={isDark ? "bg-slate-800 border-slate-700" : "bg-white"}>
            <DialogHeader>
              <DialogTitle className={isDark ? "text-white" : "text-slate-900"}>
                {editingAssignment ? "Edit Assignment" : "Add New Assignment"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className={isDark ? "text-slate-300" : "text-slate-700"}>
                  Assignment Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Research Paper on AI"
                  required
                  className={`mt-1 transition-all duration-300 focus:ring-2 focus:ring-primary ${
                    isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300"
                  }`}
                />
              </div>

              <div>
                <Label htmlFor="courseName" className={isDark ? "text-slate-300" : "text-slate-700"}>
                  Course Name *
                </Label>
                <Input
                  id="courseName"
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  placeholder="e.g., Computer Science 101"
                  required
                  className={`mt-1 transition-all duration-300 focus:ring-2 focus:ring-primary ${
                    isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300"
                  }`}
                />
              </div>

              <div>
                <Label htmlFor="description" className={isDark ? "text-slate-300" : "text-slate-700"}>
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add assignment details..."
                  rows={4}
                  className={`mt-1 transition-all duration-300 focus:ring-2 focus:ring-primary ${
                    isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300"
                  }`}
                />
              </div>

              <div>
                <Label htmlFor="dueDate" className={isDark ? "text-slate-300" : "text-slate-700"}>
                  Due Date *
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                  className={`mt-1 ${isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white"}`}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-secondary">
                  {editingAssignment ? "Update Assignment" : "Add Assignment"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                  className={isDark ? "border-slate-700 hover:bg-slate-700" : ""}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: stats.total, color: "blue" },
          { label: "Pending", value: stats.pending, color: "orange" },
          { label: "Completed", value: stats.completed, color: "green" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border text-center transition-all duration-300 hover:shadow-lg ${
              isDark 
                ? "bg-slate-800/50 border-slate-700/50" 
                : "bg-white/80 backdrop-blur-sm border-slate-200"
            }`}>
              <CardContent className="p-4">
                <div className={`text-2xl mb-1 ${
                  stat.color === "blue" ? "text-blue-500" :
                  stat.color === "orange" ? "text-orange-500" :
                  "text-green-500"
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[
          { id: "all", label: "All" },
          { id: "pending", label: "Pending" },
          { id: "completed", label: "Completed" }
        ].map(f => (
          <Button
            key={f.id}
            variant="outline"
            size="sm"
            onClick={() => setFilter(f.id as any)}
            className={`transition-all ${
              filter === f.id
                ? isDark
                  ? "bg-primary text-white border-primary"
                  : "bg-primary text-white border-primary"
                : isDark
                  ? "border-slate-700 hover:bg-slate-700"
                  : "hover:bg-slate-100"
            }`}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Assignments List */}
      {filteredAssignments.length > 0 ? (
        <div className="space-y-3">
          {filteredAssignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`border transition-all duration-300 hover:shadow-lg ${
                assignment.completed
                  ? isDark
                    ? "bg-green-500/5 border-green-500/30"
                    : "bg-green-50/50 border-green-200"
                  : isDark
                    ? "bg-slate-800/50 border-slate-700/50 hover:border-primary"
                    : "bg-white/80 backdrop-blur-sm border-slate-200 hover:border-primary"
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleComplete(assignment.id)}
                      className="mt-1 transition-transform hover:scale-110"
                    >
                      {assignment.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className={`w-6 h-6 ${isDark ? "text-slate-600" : "text-slate-300"}`} />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <h4 className={`mb-1 ${
                        assignment.completed 
                          ? isDark ? "text-slate-500 line-through" : "text-slate-400 line-through"
                          : isDark ? "text-white" : "text-slate-900"
                      }`}>
                        {assignment.title}
                      </h4>
                      <p className={`text-sm mb-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        {assignment.courseName}
                      </p>
                      {assignment.description && (
                        <p className={`text-sm mb-2 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                          {assignment.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <CalendarIcon className={`w-3 h-3 ${
                          new Date(assignment.dueDate) < new Date() && !assignment.completed
                            ? "text-red-500"
                            : isDark ? "text-slate-400" : "text-slate-500"
                        }`} />
                        <span className={`text-xs ${
                          new Date(assignment.dueDate) < new Date() && !assignment.completed
                            ? "text-red-500"
                            : isDark ? "text-slate-400" : "text-slate-600"
                        }`}>
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(assignment)}
                        className={`transition-all ${
                          isDark ? "border-slate-700 hover:bg-slate-700" : "hover:bg-primary hover:text-white"
                        }`}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(assignment.id)}
                        className="border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className={`border ${
          isDark ? "bg-slate-800/50 border-slate-700/50" : "bg-white/80 backdrop-blur-sm border-slate-200"
        }`}>
          <CardContent className="py-16 text-center">
            <ClipboardList className={`w-16 h-16 mx-auto mb-4 ${isDark ? "text-slate-600" : "text-slate-300"}`} />
            <h3 className={`mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              {searchQuery ? "No assignments found" : "No assignments yet"}
            </h3>
            <p className={isDark ? "text-slate-500" : "text-slate-400"}>
              {searchQuery 
                ? "Try adjusting your search query" 
                : "Start adding your assignments to stay organized!"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}