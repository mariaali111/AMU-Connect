import { Button } from "./ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export function AudioModeToggle() {
  const { audioEnabled, setAudioEnabled } = useLanguage();

  return (
    <Button
      onClick={() => setAudioEnabled(!audioEnabled)}
      className={`w-12 h-12 rounded-full shadow-lg p-0 ${
        audioEnabled 
          ? "bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
          : "bg-gradient-to-br from-muted to-muted-foreground hover:from-muted-foreground hover:to-muted"
      }`}
      title={audioEnabled ? "Disable Audio Mode" : "Enable Audio Mode"}
    >
      {audioEnabled ? (
        <Volume2 className="w-5 h-5 text-white" />
      ) : (
        <VolumeX className="w-5 h-5 text-white" />
      )}
    </Button>
  );
}