import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Plus, BookOpen, Edit, Trash2, FileText, Upload, X } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import { useStudentContext } from "./StudentContext";

interface Note {
  id: string;
  title: string;
  courseName: string;
  content: string;
  fileName?: string;
  createdAt: string;
}

interface NotesViewProps {
  searchQuery: string;
}

export function NotesView({ searchQuery }: NotesViewProps) {
  const { contextData } = useStudentContext();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    courseName: "",
    content: "",
    fileName: ""
  });
  const isDark = document.documentElement.classList.contains("dark");

  // Generate student-specific storage key
  const getStorageKey = () => {
    const studentId = contextData.registrationNumber || contextData.studentId || "default";
    return `studysphere_notes_${studentId}`;
  };

  useEffect(() => {
    loadNotes();
  }, [contextData.registrationNumber, contextData.studentId]);

  const loadNotes = () => {
    const storageKey = getStorageKey();
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setNotes(saved);
  };

  const saveNotes = (updatedNotes: Note[]) => {
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.courseName) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingNote) {
      // Update existing note
      const updatedNotes = notes.map(note =>
        note.id === editingNote.id
          ? { ...note, ...formData }
          : note
      );
      saveNotes(updatedNotes);
      toast.success("Note updated successfully!");
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      saveNotes([...notes, newNote]);
      toast.success("Note added successfully!");
    }

    resetForm();
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      courseName: note.courseName,
      content: note.content,
      fileName: note.fileName || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
    toast.success("Note deleted successfully!");
  };

  const resetForm = () => {
    setFormData({ title: "", courseName: "", content: "", fileName: "" });
    setEditingNote(null);
    setIsDialogOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload PDF or DOCX files only");
        return;
      }
      setFormData({ ...formData, fileName: file.name });
      toast.success(`File "${file.name}" ready to upload`);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={isDark ? "text-white" : "text-slate-900"}>
            Study Notes
          </h2>
          <p className={`mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Organize and manage your course notes
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
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent className={isDark ? "bg-slate-800 border-slate-700" : "bg-white"}>
            <DialogHeader>
              <DialogTitle className={isDark ? "text-white" : "text-slate-900"}>
                {editingNote ? "Edit Note" : "Add New Note"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className={isDark ? "text-slate-300" : "text-slate-700"}>
                  Note Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Chapter 5: Data Structures"
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
                <Label htmlFor="content" className={isDark ? "text-slate-300" : "text-slate-700"}>
                  Notes Content
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Add your notes here..."
                  rows={5}
                  className={`mt-1 transition-all duration-300 focus:ring-2 focus:ring-primary ${
                    isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300"
                  }`}
                />
              </div>

              <div>
                <Label htmlFor="file" className={isDark ? "text-slate-300" : "text-slate-700"}>
                  Upload Document (PDF, DOCX)
                </Label>
                <div className="mt-1">
                  <label className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 hover:border-primary ${
                    isDark 
                      ? "border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-400" 
                      : "border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-600"
                  }`}>
                    <Upload className="w-4 h-4" />
                    <span>{formData.fileName || "Choose file"}</span>
                    <input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.fileName && (
                    <div className="flex items-center justify-between mt-2 p-2 rounded bg-primary/10">
                      <span className={`text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        {formData.fileName}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, fileName: "" })}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-secondary">
                  {editingNote ? "Update Note" : "Add Note"}
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

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group ${
                isDark 
                  ? "bg-slate-800/50 border-slate-700/50 hover:border-primary" 
                  : "bg-white/80 backdrop-blur-sm border-slate-200 hover:border-primary hover:shadow-primary/10"
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className={`mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                        {note.title}
                      </CardTitle>
                      <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        {note.courseName}
                      </p>
                    </div>
                    <div className={`p-2 rounded-lg ${isDark ? "bg-blue-500/10" : "bg-blue-50"}`}>
                      <BookOpen className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {note.content && (
                    <p className={`text-sm line-clamp-3 mb-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {note.content}
                    </p>
                  )}
                  {note.fileName && (
                    <div className={`flex items-center gap-2 p-2 rounded mb-4 ${
                      isDark ? "bg-slate-900/50" : "bg-slate-50"
                    }`}>
                      <FileText className={`w-4 h-4 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
                      <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        {note.fileName}
                      </span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(note)}
                      className={`flex-1 transition-all ${
                        isDark 
                          ? "border-slate-700 hover:bg-slate-700 hover:text-white" 
                          : "hover:bg-primary hover:text-white hover:border-primary"
                      }`}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(note.id)}
                      className="border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
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
            <BookOpen className={`w-16 h-16 mx-auto mb-4 ${isDark ? "text-slate-600" : "text-slate-300"}`} />
            <h3 className={`mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              {searchQuery ? "No notes found" : "No notes yet"}
            </h3>
            <p className={isDark ? "text-slate-500" : "text-slate-400"}>
              {searchQuery 
                ? "Try adjusting your search query" 
                : "Start adding your study notes to get organized!"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}