import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { GeometricBorder } from "./IslamicPattern";
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  Download,
  X,
  Gauge
} from "lucide-react";
import { useState, useEffect } from "react";

interface AudioPlayerProps {
  text: string;
  title: string;
  language: "english" | "urdu" | "hindi";
  onClose: () => void;
}

export function AudioPlayer({ text, title, language, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(80);

  // Simulate audio playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + (1 * speed);
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress, speed]);

  const handlePlayPause = () => {
    if (progress >= 100) {
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleDownload = () => {
    alert(`📥 Audio Download Started!\n\nFile: ${title}.mp3\nLanguage: ${language}\n\nThe audio file will be saved to your device.`);
  };

  const formatTime = (percent: number) => {
    const totalSeconds = Math.floor((percent / 100) * 180); // Assume 3 min max
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getLanguageName = () => {
    switch (language) {
      case "urdu": return "اردو";
      case "hindi": return "हिंदी";
      default: return "English";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <Card className="w-full md:w-[500px] border-primary/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0">
          <GeometricBorder className="text-primary" />
        </div>

        <CardContent className="p-6 pt-8 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Volume2 className="w-5 h-5 text-primary" />
                <h3 className="line-clamp-1">Audio Player</h3>
              </div>
              <h4 className="line-clamp-2 mb-2">{title}</h4>
              <div className="flex items-center gap-2">
                <Badge className="bg-primary">{getLanguageName()}</Badge>
                <Badge variant="outline">AI Generated</Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[progress]}
              onValueChange={(value) => setProgress(value[0])}
              max={100}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-muted-foreground">
              <span>{formatTime(progress)}</span>
              <span>3:00</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleStop}
              className="h-12 w-12 rounded-full"
            >
              <Square className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              onClick={handlePlayPause}
              className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownload}
              className="h-12 w-12 rounded-full"
            >
              <Download className="w-5 h-5" />
            </Button>
          </div>

          {/* Speed Control */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-muted-foreground" />
                <label className="text-muted-foreground">Playback Speed</label>
              </div>
              <Badge variant="secondary">{speed}x</Badge>
            </div>
            <div className="flex gap-2">
              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                <Button
                  key={s}
                  variant={speed === s ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSpeed(s)}
                  className={`flex-1 h-8 ${speed === s ? "bg-primary" : ""}`}
                >
                  {s}x
                </Button>
              ))}
            </div>
          </div>

          {/* Volume Control */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <label className="text-muted-foreground">Volume</label>
              <Badge variant="secondary">{volume}%</Badge>
            </div>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
            />
          </div>

          {/* Info */}
          <div className="text-center text-muted-foreground pt-2 border-t border-border">
            <p>Clear, natural-sounding AI voice</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}