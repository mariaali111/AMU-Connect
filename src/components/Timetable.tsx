import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { GeometricBorder } from "./IslamicPattern";
import { Clock, MapPin, Plus, Edit, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";
import { getTimetableForProgram } from "../utils/programSpecificAcademicData";

interface ClassEvent {
  id: string;
  day: string;
  time: string;
  subject: string;
  room: string;
  professor: string;
  type: "Lecture" | "Lab" | "Tutorial";
}

interface TimetableProps {
  userData?: any;
}

export function Timetable({ userData }: TimetableProps) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [schedule, setSchedule] = useState<ClassEvent[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ClassEvent | null>(null);
  const [newEvent, setNewEvent] = useState({
    day: "Monday",
    time: "",
    subject: "",
    room: "",
    professor: "",
    type: "Lecture" as "Lecture" | "Lab" | "Tutorial"
  });

  // Get current day
  const currentDayIndex = new Date().getDay();
  const currentDay = currentDayIndex === 0 ? "Sunday" : days[currentDayIndex - 1];

  // Load schedule from localStorage
  useEffect(() => {
    // Get program-specific timetable if userData is available
    const programCode = userData?.programCode || userData?.profile?.programCode;
    
    if (programCode) {
      // Load program-specific timetable
      const programTimetable = getTimetableForProgram(programCode);
      
      // Convert to expected format
      const formattedSchedule: ClassEvent[] = programTimetable.map(event => {
        // Convert 24h time to 12h format
        const [hours, minutes] = event.startTime.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        const time12 = `${hour12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
        
        return {
          id: event.id,
          day: event.day,
          time: time12,
          subject: event.courseName,
          room: event.room,
          professor: event.instructor,
          type: event.type,
        };
      });
      
      setSchedule(formattedSchedule);
      return;
    }
    
    // Fallback to localStorage
    const storedSchedule = localStorage.getItem("amu_timetable");
    if (storedSchedule) {
      setSchedule(JSON.parse(storedSchedule));
    } else {
      // Set initial sample schedule
      const sampleSchedule: ClassEvent[] = [
        { id: "1", day: "Monday", time: "09:00 AM", subject: "Data Structures", room: "Room 301", professor: "Dr. Khan", type: "Lecture" },
        { id: "2", day: "Monday", time: "11:00 AM", subject: "OOP Lab", room: "Lab 2", professor: "Prof. Rahman", type: "Lab" },
        { id: "3", day: "Monday", time: "02:00 PM", subject: "Computer Networks", room: "Room 205", professor: "Dr. Sami", type: "Lecture" },
        { id: "4", day: "Tuesday", time: "09:00 AM", subject: "DBMS", room: "Room 302", professor: "Prof. Ali", type: "Lecture" },
        { id: "5", day: "Tuesday", time: "11:00 AM", subject: "Algorithms", room: "Room 201", professor: "Dr. Ansari", type: "Lecture" },
        { id: "6", day: "Wednesday", time: "10:00 AM", subject: "Data Structures Lab", room: "Lab 1", professor: "Dr. Khan", type: "Lab" },
        { id: "7", day: "Thursday", time: "09:00 AM", subject: "Computer Networks", room: "Room 205", professor: "Dr. Sami", type: "Lecture" },
        { id: "8", day: "Friday", time: "09:00 AM", subject: "OOP", room: "Room 303", professor: "Prof. Rahman", type: "Lecture" }
      ];
      setSchedule(sampleSchedule);
      localStorage.setItem("amu_timetable", JSON.stringify(sampleSchedule));
    }
  }, [userData]);

  // Save schedule to localStorage
  useEffect(() => {
    if (schedule.length > 0) {
      localStorage.setItem("amu_timetable", JSON.stringify(schedule));
    }
  }, [schedule]);

  const handleAddEvent = () => {
    if (!newEvent.time || !newEvent.subject || !newEvent.room || !newEvent.professor) {
      toast.error("Please fill in all fields");
      return;
    }

    if (editingEvent) {
      // Update existing event
      setSchedule(prev => prev.map(event =>
        event.id === editingEvent.id
          ? { ...event, ...newEvent, id: editingEvent.id }
          : event
      ));
      toast.success("Class updated successfully");
    } else {
      // Add new event
      const event: ClassEvent = {
        id: Date.now().toString(),
        ...newEvent
      };
      setSchedule(prev => [...prev, event]);
      toast.success("Class added successfully");
    }

    setIsAddDialogOpen(false);
    setEditingEvent(null);
    setNewEvent({ day: "Monday", time: "", subject: "", room: "", professor: "", type: "Lecture" });
  };

  const handleEditEvent = (event: ClassEvent) => {
    setEditingEvent(event);
    setNewEvent({
      day: event.day,
      time: event.time,
      subject: event.subject,
      room: event.room,
      professor: event.professor,
      type: event.type
    });
    setIsAddDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setSchedule(prev => prev.filter(e => e.id !== eventId));
    toast.success("Class deleted successfully");
  };

  const getScheduleForDay = (day: string) => {
    return schedule.filter(event => event.day === day).sort((a, b) => {
      const timeA = new Date(`2000-01-01 ${a.time}`).getTime();
      const timeB = new Date(`2000-01-01 ${b.time}`).getTime();
      return timeA - timeB;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2>Class Timetable</h2>
          <p className="text-muted-foreground">Your weekly class schedule</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) {
            setEditingEvent(null);
            setNewEvent({ day: "Monday", time: "", subject: "", room: "", professor: "", type: "Lecture" });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "Edit Class" : "Add New Class"}</DialogTitle>
              <DialogDescription>
                Add a new class or event to your timetable
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Day</Label>
                <Select value={newEvent.day} onValueChange={(value) => setNewEvent(prev => ({ ...prev, day: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time.split(' ')[0] || ''}
                  onChange={(e) => {
                    const time24 = e.target.value;
                    const [hours, minutes] = time24.split(':');
                    const hour = parseInt(hours);
                    const ampm = hour >= 12 ? 'PM' : 'AM';
                    const hour12 = hour % 12 || 12;
                    const time12 = `${hour12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
                    setNewEvent(prev => ({ ...prev, time: time12 }));
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Data Structures"
                  value={newEvent.subject}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Room *</Label>
                <Input
                  id="room"
                  placeholder="e.g., Room 301"
                  value={newEvent.room}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, room: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="professor">Professor *</Label>
                <Input
                  id="professor"
                  placeholder="e.g., Dr. Khan"
                  value={newEvent.professor}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, professor: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={newEvent.type} onValueChange={(value: any) => setNewEvent(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lecture">Lecture</SelectItem>
                    <SelectItem value="Lab">Lab</SelectItem>
                    <SelectItem value="Tutorial">Tutorial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent} className="bg-primary">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {editingEvent ? "Update" : "Add"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Current Day Highlight */}
      {days.includes(currentDay) && (
        <Card className="border-primary bg-primary/5 overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0">
            <GeometricBorder className="text-primary" />
          </div>
          <CardContent className="p-4 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary">Today's Classes - {currentDay}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Schedule */}
      <div className="space-y-6">
        {days.map((day) => {
          const daySchedule = getScheduleForDay(day);
          
          return (
            <div key={day}>
              <div className="flex items-center gap-3 mb-3">
                <h3>{day}</h3>
                {day === currentDay && (
                  <Badge className="bg-primary">Today</Badge>
                )}
                <span className="text-muted-foreground">
                  ({daySchedule.length} {daySchedule.length === 1 ? 'class' : 'classes'})
                </span>
              </div>
              
              <div className="space-y-3">
                {daySchedule.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="p-4 text-center text-muted-foreground">
                      No classes scheduled for this day
                    </CardContent>
                  </Card>
                ) : (
                  daySchedule.map((classItem) => (
                    <Card 
                      key={classItem.id} 
                      className={`border-border ${day === currentDay ? 'border-l-4 border-l-primary' : ''} group hover:shadow-md transition-shadow`}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex items-center gap-3 min-w-[120px]">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{classItem.time}</span>
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="mb-1">{classItem.subject}</h4>
                            <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                              <span>{classItem.professor}</span>
                              <span className="hidden sm:inline">•</span>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{classItem.room}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="self-start sm:self-center">
                              {classItem.type}
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditEvent(classItem)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleDeleteEvent(classItem.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}