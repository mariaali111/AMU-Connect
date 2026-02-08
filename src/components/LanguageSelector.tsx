import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Languages } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export function LanguageSelector({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
      <SelectTrigger className={`w-[160px] border-border bg-white ${className}`}>
        <Languages className="w-4 h-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="english">
          <div className="flex items-center gap-2">
            <span>🇬🇧</span>
            <span>English</span>
          </div>
        </SelectItem>
        <SelectItem value="urdu">
          <div className="flex items-center gap-2">
            <span>🇵🇰</span>
            <span>اردو (Urdu)</span>
          </div>
        </SelectItem>
        <SelectItem value="hindi">
          <div className="flex items-center gap-2">
            <span>🇮🇳</span>
            <span>हिंदी (Hindi)</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}