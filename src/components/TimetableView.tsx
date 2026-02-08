import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Plus, Calendar, Clock, MapPin, Edit, Trash2, BookMarked } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import { useStudentContext } from "./StudentContext";

interface TimetableEvent {
  id: string;
  courseName: string;
  day: string;
  time: string;
  location: string;
  instructor: string;
  date: string;
}

interface TimetableViewProps {
  searchQuery: string;
}

export function TimetableView({ searchQuery }: TimetableViewProps) {
  const { contextData } = useStudentContext();
  const [events, setEvents] = useState<TimetableEvent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimetableEvent | null>(null);
  const [formData, setFormData] = useState({
    courseName: "",
    day: "",
    time: "",
    location: "",
    instructor: "",
    date: ""
  });
  const isDark = document.documentElement.classList.contains("dark");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Generate student-specific storage key
  const getStorageKey = () => {
    const studentId = contextData.registrationNumber || contextData.studentId || "default";
    return `studysphere_timetable_${studentId}`;
  };

  useEffect(() => {
    loadEvents();
  }, [contextData.registrationNumber, contextData.studentId]);

  const loadEvents = () => {
    const storageKey = getStorageKey();
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setEvents(saved);
  };

  const saveEvents = (updatedEvents: TimetableEvent[]) => {
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.courseName || !formData.day || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingEvent) {
      const updatedEvents = events.map(event =>
        event.id === editingEvent.id ? { ...event, ...formData } : event
      );
      saveEvents(updatedEvents);
      toast.success("Class updated successfully!");
    } else {
      const newEvent: TimetableEvent = {
        id: Date.now().toString(),
        ...formData
      };
      saveEvents([...events, newEvent]);
      toast.success("Class added successfully!");
    }

    resetForm();
  };

  const handleEdit = (event: TimetableEvent) => {
    setEditingEvent(event);
    setFormData({
      courseName: event.courseName,
      day: event.day,
      time: event.time,
      location: event.location,
      instructor: event.instructor,
      date: event.date
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    saveEvents(updatedEvents);
    toast.success("Class deleted successfully!");
  };

  const resetForm = () => {
    setFormData({ courseName: "", day: "", time: "", location: "", instructor: "", date: "" });
    setEditingEvent(null);
    setIsDialogOpen(false);
  };

  const filteredEvents = events.filter(event =>
    event.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedByDay = days.reduce((acc, day) => {
    acc[day] = filteredEvents.filter(event => event.day === day);
    return acc;
  }, {} as Record<string, TimetableEvent[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={isDark ? "text-white" : "text-slate-900"}>
            Class Schedule
          </h2>
          <p className={`mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Manage your weekly class timetable
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
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className={isDark ? "bg-slate-800 border-slate-700" : "bg-white"}>
            <DialogHeader>
              <DialogTitle className={isDark ? "text-white" : "text-slate-900"}>
                {editingEvent ? "Edit Class" : "Add New Class"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="courseName" className={isDark ? "text-slate-300" : "text-slate-700"}>
                  Course Name *
                </Label>
                <Input
                  id="courseName"
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  placeholder="e.g., Data Structures"
                  required
                  className={`mt-1 transition-all duration-300 focus:ring-2 focus:ring-primary ${
                    isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="day" className={isDark ? "text-slate-300" : "text-slate-700"}>
                    Day *
                  </Label>
                  <Select value={formData.day} onValueChange={(value) => setFormData({ ...formData, day: value })}>
                    <SelectTrigger className={`mt-1 ${isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white"}`}>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent className={isDark ? "bg-slate-800 border-slate-700" : "bg-white"}>
                      {days.map(day => (
                        <SelectItem key={day} value={day} className={isDark ? "text-white" : ""}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="time" className={isDark ? "text-slate-300" : "text-slate-700"}>
                    Time *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                    className={`mt-1 ${isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white"}`}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location" className={isDark ? "text-slate-300" : "text-slate-700"}>
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Room 201, Engineering Block"
                  className={`mt-1 ${isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white"}`}
                />
              </div>

              <div>
                <Label htmlFor="instructor" className={isDark ? "text-slate-300" : "text-slate-700"}>
                  Instructor
                </Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  placeholder="e.g., Dr. Ahmed Khan"
                  className={`mt-1 ${isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white"}`}
                />
              </div>

              <div>
                <Label htmlFor="date" className={isDark ? "text-slate-300" : "text-slate-700"}>
                  Date (Optional)
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`mt-1 ${isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white"}`}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-secondary">
                  {editingEvent ? "Update Class" : "Add Class"}
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

      {/* Timetable */}
      {filteredEvents.length > 0 ? (
        <div className="space-y-4">
          {days.map((day, dayIndex) => {
            const dayEvents = groupedByDay[day];
            if (dayEvents.length === 0) return null;

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.05 }}
              >
                <Card className={`border ${
                  isDark 
                    ? "bg-slate-800/50 border-slate-700/50" 
                    : "bg-white/80 backdrop-blur-sm border-slate-200"
                }`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                      <Calendar className="w-5 h-5 text-primary" />
                      {day}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dayEvents.map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                            isDark 
                              ? "bg-slate-900/50 border-slate-700 hover:border-primary" 
                              : "bg-slate-50 border-slate-200 hover:border-primary hover:shadow-primary/10"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg mt-1 ${isDark ? "bg-green-500/10" : "bg-green-50"}`}>
                                  <BookMarked className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="flex-1">
                                  <h4 className={`mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                                    {event.courseName}
                                  </h4>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <Clock className={`w-3 h-3 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
                                      <span className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                        {event.time}
                                      </span>
                                    </div>
                                    {event.location && (
                                      <div className="flex items-center gap-2">
                                        <MapPin className={`w-3 h-3 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
                                        <span className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                          {event.location}
                                        </span>
                                      </div>
                                    )}
                                    {event.instructor && (
                                      <div className="flex items-center gap-2">
                                        <span className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                          👨‍🏫 {event.instructor}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(event)}
                                className={`transition-all ${
                                  isDark ? "border-slate-700 hover:bg-slate-700" : "hover:bg-primary hover:text-white"
                                }`}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(event.id)}
                                className="border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card className={`border ${
          isDark ? "bg-slate-800/50 border-slate-700/50" : "bg-white/80 backdrop-blur-sm border-slate-200"
        }`}>
          <CardContent className="py-16 text-center">
            <Calendar className={`w-16 h-16 mx-auto mb-4 ${isDark ? "text-slate-600" : "text-slate-300"}`} />
            <h3 className={`mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              {searchQuery ? "No classes found" : "No classes scheduled"}
            </h3>
            <p className={isDark ? "text-slate-500" : "text-slate-400"}>
              {searchQuery 
                ? "Try adjusting your search query" 
                : "Start adding your class schedule!"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}