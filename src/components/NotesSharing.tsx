import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { AIStudyTools } from "./AIStudyTools";
import { LanguageSelector } from "./LanguageSelector";
import { AudioPlayer } from "./AudioPlayer";
import { useLanguage } from "./LanguageContext";
import { FileText, Download, Search, Plus, Filter, Sparkles, Volume2, Upload, Eye, Trash2, FileIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";
import { getNotesForProgram } from "../utils/programSpecificAcademicData";

interface Note {
  id: string;
  title: string;
  subject: string;
  description: string;
  uploadedBy: string;
  date: string;
  fileName?: string;
  fileType?: string;
  fileContent?: string;
  pages?: number;
}

interface NotesSharingProps {
  userData?: any;
}

export function NotesSharing({ userData }: NotesSharingProps) {
  const [showAITools, setShowAITools] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState<{ text: string; title: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const { language, audioEnabled } = useLanguage();

  // Form state for uploading new notes
  const [newNote, setNewNote] = useState({
    title: "",
    subject: "",
    description: "",
    uploadedBy: "Current User"
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    // Get program-specific notes if userData is available
    const programCode = userData?.programCode || userData?.profile?.programCode;
    
    if (programCode) {
      // Load program-specific notes
      const programNotes = getNotesForProgram(programCode);
      
      // Convert to expected format
      const formattedNotes: Note[] = programNotes.map(note => ({
        id: note.id,
        title: note.title,
        subject: note.courseName,
        description: note.content,
        uploadedBy: 'Faculty',
        date: new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        fileName: note.fileName,
        pages: Math.floor(Math.random() * 30) + 10,
      }));
      
      setNotes(formattedNotes);
      return;
    }
    
    // Fallback to localStorage
    const storedNotes = localStorage.getItem("amu_notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      // Set initial sample notes
      const sampleNotes: Note[] = [
        {
          id: "1",
          title: "Introduction to Data Structures",
          subject: "Data Structures",
          uploadedBy: "Dr. Farhan Khan",
          date: "Sep 28, 2025",
          pages: 24,
          description: "Comprehensive introduction to fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs."
        },
        {
          id: "2",
          title: "Object-Oriented Programming Concepts",
          subject: "OOP",
          uploadedBy: "Prof. Ayesha Rahman",
          date: "Sep 25, 2025",
          pages: 32,
          description: "Detailed coverage of OOP principles: encapsulation, inheritance, polymorphism, and abstraction."
        },
        {
          id: "3",
          title: "Computer Networks - OSI Model",
          subject: "Computer Networks",
          uploadedBy: "Dr. Mohd. Sami",
          date: "Sep 22, 2025",
          pages: 18,
          description: "Complete explanation of the OSI seven-layer model with protocols and data encapsulation."
        }
      ];
      setNotes(sampleNotes);
      localStorage.setItem("amu_notes", JSON.stringify(sampleNotes));
    }
  }, [userData]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("amu_notes", JSON.stringify(notes));
    }
  }, [notes]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'text/plain'
      ];
      
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload PDF, DOCX, or TXT files only");
        return;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }

      setSelectedFile(file);
      
      // Read file content for preview
      const reader = new FileReader();
      reader.onload = (event) => {
        // For text files, we can store the content
        if (file.type === 'text/plain') {
          const content = event.target?.result as string;
          // Store first 500 characters as preview
          setNewNote(prev => ({ ...prev, description: content.substring(0, 500) }));
        }
      };
      
      if (file.type === 'text/plain') {
        reader.readAsText(file);
      }
    }
  };

  const handleUploadNote = () => {
    if (!newNote.title || !newNote.subject) {
      toast.error("Please fill in all required fields");
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      subject: newNote.subject,
      description: newNote.description,
      uploadedBy: newNote.uploadedBy,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      fileName: selectedFile?.name,
      fileType: selectedFile?.type,
      pages: Math.floor(Math.random() * 30) + 5 // Mock page count
    };

    setNotes(prev => [note, ...prev]);
    setIsUploadDialogOpen(false);
    setNewNote({ title: "", subject: "", description: "", uploadedBy: "Current User" });
    setSelectedFile(null);
    toast.success("Note uploaded successfully!");
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
    toast.success("Note deleted successfully");
  };

  const handlePlayAudio = (note: Note) => {
    setAudioPlaying({
      title: note.title,
      text: note.description
    });
  };

  // Filter notes based on search and subject
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === "all" || note.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  // Get unique subjects for filter
  const subjects = Array.from(new Set(notes.map(n => n.subject)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-primary">Notes Hub</h2>
          <p className="text-muted-foreground">Share and access study materials</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Button 
            onClick={() => setShowAITools(true)}
            variant="outline"
            className="border-accent text-accent"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Tools
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search notes by title, subject, or content..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="sm:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Note
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload New Note</DialogTitle>
                  <DialogDescription>
                    Share your notes with fellow students. Supports PDF, DOCX, and TXT files.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Introduction to Algorithms"
                      value={newNote.title}
                      onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Computer Science"
                      value={newNote.subject}
                      onChange={(e) => setNewNote(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the content..."
                      rows={3}
                      value={newNote.description}
                      onChange={(e) => setNewNote(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file">Upload File (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileSelect}
                        className="cursor-pointer"
                      />
                    </div>
                    {selectedFile && (
                      <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-md">
                        <FileIcon className="w-4 h-4 text-primary" />
                        <span className="flex-1">{selectedFile.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedFile(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUploadNote} className="bg-primary">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredNotes.length === 0 ? (
          <Card className="md:col-span-2">
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">No notes found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || subjectFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Be the first to upload a note!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotes.map((note) => (
            <Card
              key={note.id}
              className="border-border hover:shadow-lg transition-all cursor-pointer group"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="mb-1 group-hover:text-primary transition-colors">
                      {note.title}
                    </h4>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {note.subject}
                    </Badge>
                  </div>
                  {note.fileName && (
                    <FileText className="w-5 h-5 text-primary" />
                  )}
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {note.description}
                </p>

                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">
                      By {note.uploadedBy}
                    </p>
                    <p className="text-muted-foreground">
                      {note.date}
                    </p>
                  </div>
                  {note.pages && (
                    <div className="text-right">
                      <p className="text-primary">{note.pages} pages</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setViewingNote(note)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  {note.fileName && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary text-primary"
                      onClick={() => toast.success("Download started")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                  {audioEnabled && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePlayAudio(note)}
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-destructive text-destructive"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* View Note Dialog */}
      {viewingNote && (
        <Dialog open={!!viewingNote} onOpenChange={() => setViewingNote(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{viewingNote.title}</DialogTitle>
              <DialogDescription>
                {viewingNote.subject} • Uploaded by {viewingNote.uploadedBy} on {viewingNote.date}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="whitespace-pre-wrap">{viewingNote.description}</p>
              {viewingNote.fileName && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileIcon className="w-5 h-5 text-primary" />
                    <span>{viewingNote.fileName}</span>
                  </div>
                  <Button className="w-full bg-primary" onClick={() => toast.success("Download started")}>
                    <Download className="w-4 h-4 mr-2" />
                    Download File
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* AI Study Tools Modal */}
      {showAITools && <AIStudyTools onClose={() => setShowAITools(false)} userData={userData} />}

      {/* Audio Player */}
      {audioPlaying && (
        <AudioPlayer
          text={audioPlaying.text}
          title={audioPlaying.title}
          language={language}
          onClose={() => setAudioPlaying(null)}
        />
      )}
    </div>
  );
}