import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  MapPin, 
  Search, 
  Navigation, 
  Building2, 
  BookOpen, 
  Utensils, 
  Home, 
  GraduationCap,
  Phone,
  Mail,
  Clock,
  Users
} from "lucide-react";

interface Building {
  id: string;
  name: string;
  type: "academic" | "library" | "cafeteria" | "hostel" | "admin";
  description: string;
  location: { x: number; y: number };
  contact?: string;
  hours?: string;
  googleMapsUrl?: string;
}

interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  specialization: string[];
}

const buildings: Building[] = [
  {
    id: "1",
    name: "Strachey Hall",
    type: "academic",
    description: "Main Administrative Building",
    location: { x: 50, y: 30 },
    contact: "+91-571-2702016",
    hours: "9:00 AM - 5:00 PM",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=27.8974,78.0880&destination_place_id=ChIJgUbEaMkDDTkRv_5MRTPfdcY"
  },
  {
    id: "2",
    name: "Maulana Azad Library",
    type: "library",
    description: "Central Library with 1.5 million books",
    location: { x: 30, y: 50 },
    contact: "+91-571-2700920",
    hours: "8:00 AM - 11:00 PM",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=27.8974,78.0830&destination_place_id=ChIJkS_rVZsDDTkR9XqxYVCMI2E"
  },
  {
    id: "3",
    name: "Faculty of Engineering & Technology",
    type: "academic",
    description: "Engineering Departments",
    location: { x: 70, y: 40 },
    contact: "+91-571-2703084",
    hours: "9:00 AM - 5:00 PM",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=27.8980,78.0900&destination_place_id=ChIJ5cZ2M7kDDTkRV-UbQaM3C1M"
  },
  {
    id: "4",
    name: "Zakir Hussain College of Engineering",
    type: "academic",
    description: "ZHCET - Premier Engineering College",
    location: { x: 65, y: 60 },
    contact: "+91-571-2720104",
    hours: "9:00 AM - 5:00 PM",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=27.8968,78.0825&destination_place_id=ChIJYS_gUskDDTkRYjrHzZJ1iNA"
  },
  {
    id: "5",
    name: "Students' Union Cafeteria",
    type: "cafeteria",
    description: "Main campus cafeteria",
    location: { x: 45, y: 45 },
    hours: "7:00 AM - 10:00 PM",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=27.8974,78.0850&destination_place_id=ChIJXwbhT8kDDTkRl4RzRCMlJCY"
  },
  {
    id: "6",
    name: "Sir Syed Hall",
    type: "hostel",
    description: "Boys' Hostel",
    location: { x: 25, y: 70 },
    contact: "+91-571-2700751",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=27.8960,78.0805&destination_place_id=ChIJp8VvPMkDDTkRUz14PaM3C1M"
  },
  {
    id: "7",
    name: "Abdullah Hall",
    type: "hostel",
    description: "Boys' Hostel",
    location: { x: 35, y: 75 },
    contact: "+91-571-2700752",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=27.8955,78.0815&destination_place_id=ChIJk8VxPMkDDTkRV-UbQaM3C1M"
  },
  {
    id: "8",
    name: "Faculty of Science",
    type: "academic",
    description: "Science Departments",
    location: { x: 55, y: 25 },
    contact: "+91-571-2703515",
    hours: "9:00 AM - 5:00 PM",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=27.8985,78.0870&destination_place_id=ChIJmcZ4M7kDDTkRl4RzRCMlJCY"
  },
  {
    id: "9",
    name: "Jama Masjid",
    type: "admin",
    description: "Historic Mosque",
    location: { x: 50, y: 55 },
    hours: "Open 24/7",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=27.8972,78.0855&destination_place_id=ChIJbwbIT8kDDTkRYjrHzZJ1iNA"
  },
  {
    id: "10",
    name: "Kennedy Auditorium",
    type: "admin",
    description: "Main Auditorium for Events",
    location: { x: 40, y: 35 },
    contact: "+91-571-2700920",
    hours: "Event-based",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=27.8976,78.0840&destination_place_id=ChIJXwbgT8kDDTkRUz14PaM3C1M"
  }
];

const facultyMembers: Faculty[] = [
  {
    id: "1",
    name: "Prof. Arman Rasool Faridi",
    designation: "Chairperson & Professor",
    department: "Computer Science",
    email: "ar.faridi.cs@amu.ac.in",
    phone: "+91-81928-65250",
    office: "Aligarh Muslim University",
    specialization: ["Computer Science research & academics"]
  },
  {
    id: "2",
    name: "Prof. Mirza Mohd. Mohsin",
    designation: "Chairman & Professor",
    department: "Electrical Engineering (ZHCET)",
    email: "rpunit@zhcet.ac.in",
    phone: "+91-571-2700042",
    office: "Zakir Husain College of Engineering & Technology, AMU",
    specialization: ["Electrical Engineering systems & research"]
  },
  {
    id: "3",
    name: "Prof. Mohammad Arif",
    designation: "Chairman & Professor",
    department: "Civil Engineering (ZHCET)",
    email: "rpunit@zhcet.ac.in",
    phone: "+91-571-2700042",
    office: "Zakir Husain College of Engineering & Technology, AMU",
    specialization: ["Structural & Civil Engineering education"]
  },
  {
    id: "4",
    name: "Prof. Shakeel Ahmad",
    designation: "Dean & Professor",
    department: "Faculty of Law",
    email: "law@amu.ac.in",
    phone: "+91-571-2700920",
    office: "Faculty of Law, Aligarh Muslim University",
    specialization: ["Criminal Law", "International Law", "Legal Education"]
  },
  {
    id: "5",
    name: "Prof. Shah Alam",
    designation: "Chairman & Professor",
    department: "Psychology",
    email: "psychology@amu.ac.in",
    phone: "+91-94124-44574",
    office: "Department of Psychology, AMU",
    specialization: ["Clinical & Behavioural Psychology"]
  },
  {
    id: "6",
    name: "Prof. F.S. Sherani",
    designation: "Chairman & Professor",
    department: "Kulliyat (Hindi/Urdu/Literature)",
    email: "drsherani@gmail.com",
    phone: "+91-98372-42498",
    office: "Faculty of Arts, AMU",
    specialization: ["Indian languages and literature studies"]
  }
];

const buildingTypeConfig = {
  academic: { icon: Building2, color: "text-primary", bgColor: "bg-primary/10" },
  library: { icon: BookOpen, color: "text-blue-600", bgColor: "bg-blue-100" },
  cafeteria: { icon: Utensils, color: "text-orange-600", bgColor: "bg-orange-100" },
  hostel: { icon: Home, color: "text-secondary", bgColor: "bg-secondary/10" },
  admin: { icon: GraduationCap, color: "text-accent", bgColor: "bg-accent/10" }
};

export function CampusMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [activeTab, setActiveTab] = useState<"map" | "directory">("map");
  const [facultySearch, setFacultySearch] = useState("");

  const filteredBuildings = buildings.filter(
    (building) =>
      building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFaculty = facultyMembers.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(facultySearch.toLowerCase()) ||
      faculty.department.toLowerCase().includes(facultySearch.toLowerCase()) ||
      faculty.specialization.some(spec => spec.toLowerCase().includes(facultySearch.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-primary">Campus Map & Directory</h1>
          <p className="text-muted-foreground">
            Explore AMU campus and find faculty members
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "map" | "directory")}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="map">
            <MapPin className="w-4 h-4 mr-2" />
            Campus Map
          </TabsTrigger>
          <TabsTrigger value="directory">
            <Users className="w-4 h-4 mr-2" />
            Faculty Directory
          </TabsTrigger>
        </TabsList>

        {/* Campus Map Tab */}
        <TabsContent value="map" className="space-y-4">
          {/* Search Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search buildings, departments, facilities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Interactive Map */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-primary" />
                  Interactive Campus Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border-2 border-border overflow-hidden">
                  {/* Map Background */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                  </div>

                  {/* Campus Boundary */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <path
                      d="M 15 15 L 85 15 L 85 85 L 15 85 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeDasharray="2,2"
                      className="text-primary/30"
                    />
                  </svg>

                  {/* Building Markers */}
                  {filteredBuildings.map((building) => {
                    const config = buildingTypeConfig[building.type];
                    const Icon = config.icon;
                    return (
                      <button
                        key={building.id}
                        className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full ${config.bgColor} ${config.color} flex items-center justify-center border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer ${
                          selectedBuilding?.id === building.id ? "ring-4 ring-primary scale-125" : ""
                        }`}
                        style={{
                          left: `${building.location.x}%`,
                          top: `${building.location.y}%`
                        }}
                        onClick={() => setSelectedBuilding(building)}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {Object.entries(buildingTypeConfig).map(([type, config]) => {
                    const Icon = config.icon;
                    return (
                      <div key={type} className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded ${config.bgColor} ${config.color} flex items-center justify-center`}>
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="capitalize">{type}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Building Details */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Building Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedBuilding ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      {(() => {
                        const config = buildingTypeConfig[selectedBuilding.type];
                        const Icon = config.icon;
                        return (
                          <div className={`w-12 h-12 rounded-lg ${config.bgColor} ${config.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-6 h-6" />
                          </div>
                        );
                      })()}
                      <div className="flex-1">
                        <h3 className="text-primary">{selectedBuilding.name}</h3>
                        <p className="text-muted-foreground">{selectedBuilding.description}</p>
                        <Badge className="mt-2 capitalize">{selectedBuilding.type}</Badge>
                      </div>
                    </div>

                    <div className="space-y-3 border-t pt-4">
                      {selectedBuilding.contact && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedBuilding.contact}</span>
                        </div>
                      )}
                      {selectedBuilding.hours && (
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedBuilding.hours}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>Aligarh Muslim University Campus</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => {
                        if (selectedBuilding.googleMapsUrl) {
                          window.open(selectedBuilding.googleMapsUrl, '_blank');
                        }
                      }}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Click on a building marker to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Buildings List */}
          <Card>
            <CardHeader>
              <CardTitle>All Buildings ({filteredBuildings.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredBuildings.map((building) => {
                  const config = buildingTypeConfig[building.type];
                  const Icon = config.icon;
                  return (
                    <button
                      key={building.id}
                      onClick={() => setSelectedBuilding(building)}
                      className={`p-3 rounded-lg border-2 text-left transition-all hover:border-primary ${
                        selectedBuilding?.id === building.id ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${config.bgColor} ${config.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="truncate">{building.name}</h4>
                          <p className="text-muted-foreground line-clamp-1">{building.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Faculty Directory Tab */}
        <TabsContent value="directory" className="space-y-4">
          {/* Search Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, department, or specialization..."
                  value={facultySearch}
                  onChange={(e) => setFacultySearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Faculty List */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredFaculty.map((faculty) => (
              <Card key={faculty.id} className="hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white flex-shrink-0">
                      {faculty.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-primary">{faculty.name}</CardTitle>
                      <p className="text-muted-foreground">{faculty.designation}</p>
                      <Badge variant="secondary" className="mt-1">{faculty.department}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <a href={`mailto:${faculty.email}`} className="hover:text-primary truncate">
                        {faculty.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{faculty.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{faculty.office}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <p className="text-muted-foreground mb-2">Specialization:</p>
                    <div className="flex flex-wrap gap-2">
                      {faculty.specialization.map((spec, index) => (
                        <Badge key={index} variant="outline">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full mt-3" variant="outline" asChild>
                    <a href={`mailto:${faculty.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Faculty
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFaculty.length === 0 && (
            <Card>
              <CardContent className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No faculty members found matching your search</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}