import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { GeometricBorder } from "./IslamicPattern";
import { Palette, Sun, Moon, Contrast, ZoomIn } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeCustomizer() {
  const [isDark, setIsDark] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#006838");
  const [secondaryColor, setSecondaryColor] = useState("#8B1538");
  const [accentColor, setAccentColor] = useState("#D4AF37");
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", primaryColor);
    document.documentElement.style.setProperty("--secondary", secondaryColor);
    document.documentElement.style.setProperty("--accent", accentColor);
    document.documentElement.style.setProperty("--font-size", `${fontSize}px`);
  }, [primaryColor, secondaryColor, accentColor, fontSize]);

  const presets = [
    {
      name: "AMU Classic",
      primary: "#006838",
      secondary: "#8B1538",
      accent: "#D4AF37"
    },
    {
      name: "Ocean Blue",
      primary: "#0077BE",
      secondary: "#003D5B",
      accent: "#00A8E8"
    },
    {
      name: "Royal Purple",
      primary: "#6A0DAD",
      secondary: "#4B0082",
      accent: "#9370DB"
    },
    {
      name: "Forest Green",
      primary: "#228B22",
      secondary: "#006400",
      accent: "#90EE90"
    }
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
    setAccentColor(preset.accent);
  };

  const resetToDefaults = () => {
    setPrimaryColor("#006838");
    setSecondaryColor("#8B1538");
    setAccentColor("#D4AF37");
    setFontSize(16);
    setIsDark(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1">Theme Customization</h2>
        <p className="text-muted-foreground">Personalize your StudySphere experience</p>
      </div>

      {/* Dark Mode */}
      <Card className="border-border relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0">
          <GeometricBorder className="text-primary" />
        </div>
        <CardHeader className="pt-6">
          <CardTitle className="flex items-center gap-2">
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            Appearance Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Dark Mode</Label>
              <p className="text-muted-foreground">
                Switch between light and dark themes
              </p>
            </div>
            <Switch checked={isDark} onCheckedChange={setIsDark} />
          </div>
        </CardContent>
      </Card>

      {/* Color Presets */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Color Presets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {presets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                className="h-auto p-3 flex-col items-start hover:shadow-md transition-all"
                onClick={() => applyPreset(preset)}
              >
                <div className="flex gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: preset.secondary }}
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: preset.accent }}
                  />
                </div>
                <span>{preset.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Colors */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Contrast className="w-5 h-5" />
            Custom Colors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="primary-color">Primary Color (Green)</Label>
            <div className="flex gap-3 mt-2">
              <input
                id="primary-color"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-16 h-10 rounded border-2 border-border cursor-pointer"
              />
              <Input
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 border-border bg-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="secondary-color">Secondary Color (Maroon)</Label>
            <div className="flex gap-3 mt-2">
              <input
                id="secondary-color"
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-16 h-10 rounded border-2 border-border cursor-pointer"
              />
              <Input
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="flex-1 border-border bg-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="accent-color">Accent Color (Gold)</Label>
            <div className="flex gap-3 mt-2">
              <input
                id="accent-color"
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-16 h-10 rounded border-2 border-border cursor-pointer"
              />
              <Input
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="flex-1 border-border bg-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Font Size */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ZoomIn className="w-5 h-5" />
            Accessibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Font Size</Label>
              <span className="text-muted-foreground">{fontSize}px</span>
            </div>
            <Slider
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
              min={12}
              max={24}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-muted-foreground mt-2">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button className="bg-primary hover:bg-primary/90">Primary Button</Button>
            <Button className="bg-secondary hover:bg-secondary/90">Secondary</Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Accent</Button>
          </div>
          <Card className="border-border">
            <CardContent className="p-4">
              <h4 className="mb-2">Sample Card</h4>
              <p className="text-muted-foreground">
                This is how your content will look with the selected theme settings.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <Button variant="outline" className="w-full" onClick={resetToDefaults}>
        Reset to AMU Defaults
      </Button>
    </div>
  );
}