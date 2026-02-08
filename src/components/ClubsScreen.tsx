import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Camera, 
  Code, 
  Palette, 
  Music, 
  Drama, 
  Lightbulb,
  Users,
  Calendar,
  Heart
} from "lucide-react";
import { useState } from "react";

export function ClubsScreen() {
  const [selectedClub, setSelectedClub] = useState<number | null>(null);

  const clubs = [
    {
      id: 1,
      name: "GDGC AMU",
      description: "Google Developer Group",
      icon: Code,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      members: 450,
      category: "Tech"
    },
    {
      id: 2,
      name: "Computer Science Society",
      description: "Capture moments",
      icon: Camera,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      members: 320,
      category: "Arts"
    },
    {
      id: 3,
      name: "Roboclub AMU",
      description: "Build & innovate",
      icon: Lightbulb,
      color: "text-primary",
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
      members: 280,
      category: "Tech"
    },
    {
      id: 4,
      name: "Kurtosis Club",
      description: "Creative expressions",
      icon: Palette,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
      members: 390,
      category: "Arts"
    },
    {
      id: 5,
      name: "IEEE CS",
      description: "Melody & harmony",
      icon: Music,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      members: 410,
      category: "Arts"
    },
    {
      id: 6,
      name: "Drama Club",
      description: "Stage & theater",
      icon: Drama,
      color: "text-secondary",
      bgColor: "bg-secondary/5",
      borderColor: "border-secondary/20",
      members: 260,
      category: "Arts"
    }
  ];

  const clubPosts = [
    {
      id: 1,
      title: "Workshop: Introduction to React & TypeScript",
      club: "GDGC AMU",
      date: "Oct 5, 2025",
      time: "4:00 PM",
      venue: "CS Lab 2",
      likes: 45
    },
    {
      id: 2,
      title: "Open Innovation: Hackathon",
      club: "GDGC AMU",
      date: "Oct 3, 2025",
      time: "6:00 PM",
      venue: "Seminar Hall",
      likes: 32
    },
    {
      id: 3,
      title: "Announcement: New Leadership Team Selected",
      club: "GDGC AMU",
      date: "Sep 28, 2025",
      time: "",
      venue: "",
      likes: 67
    }
  ];

  if (selectedClub) {
    const club = clubs.find(c => c.id === selectedClub);
    const Icon = club?.icon || Code;

    return (
      <div className="space-y-6">
        {/* Club Header */}
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedClub(null)}
            className="mb-4"
          >
            ← Back to Clubs
          </Button>
          
          <Card className={`border ${club?.borderColor} ${club?.bgColor}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`${club?.color} bg-white p-4 rounded-xl shadow-sm`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-1">{club?.name}</h2>
                  <p className="text-muted-foreground mb-3">{club?.description}</p>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{club?.members} members</span>
                    </div>
                    <Badge variant="secondary">{club?.category}</Badge>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  Join Club
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Club Feed */}
        <div>
          <h3 className="mb-4">Recent Posts & Events</h3>
          <div className="space-y-3">
            {clubPosts.map((post) => (
              <Card key={post.id} className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="mb-3">{post.title}</h4>
                  
                  {post.venue && (
                    <div className="flex flex-wrap items-center gap-3 text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date} • {post.time}</span>
                      </div>
                      <span>•</span>
                      <span>{post.venue}</span>
                    </div>
                  )}
                  
                  {!post.venue && (
                    <p className="text-muted-foreground mb-3">{post.date}</p>
                  )}
                  
                  <div className="flex items-center gap-4 pt-3 border-t">
                    <Button size="sm" variant="ghost" className="text-muted-foreground">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-muted-foreground">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="mb-1">Club Communities</h2>
        <p className="text-muted-foreground">Join clubs and connect with peers</p>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {clubs.map((club) => {
          const Icon = club.icon;
          return (
            <Card 
              key={club.id}
              className={`border ${club.borderColor} bg-gradient-to-br ${club.bgColor} cursor-pointer hover:shadow-lg transition-all group`}
              onClick={() => setSelectedClub(club.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-3">
                  <div className={`${club.color} p-4 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                </div>
                <h4 className="mb-1 line-clamp-1">{club.name}</h4>
                <p className="text-muted-foreground mb-3">{club.description}</p>
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>{club.members}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Suggested */}
      <Card className="border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6 text-center">
          <Users className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="mb-2">Can't find your club?</h4>
          <p className="text-muted-foreground mb-4">Request to create a new community</p>
          <Button variant="outline" className="border-primary text-primary">
            Request New Club
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}