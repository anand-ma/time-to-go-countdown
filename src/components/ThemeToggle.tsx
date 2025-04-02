import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Define a set of beautiful theme combinations
const themes = [
  {
    name: "Midnight Blue",
    background: "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]",
    text: "text-white",
    accent: "#33C3F0"
  },
  {
    name: "Sunset Vibes",
    background: "bg-gradient-to-br from-[#ff9966] to-[#ff5e62]",
    text: "text-gray-900",
    accent: "#2C3E50"
  },
  {
    name: "Emerald Dream",
    background: "bg-gradient-to-br from-[#134E5E] to-[#71B280]",
    text: "text-white",
    accent: "#F39C12"
  },
  {
    name: "Twilight Purple",
    background: "bg-gradient-to-br from-[#4A00E0] to-[#8E2DE2]",
    text: "text-white",
    accent: "#FFC300"
  },
  {
    name: "Peachy Dawn",
    background: "bg-gradient-to-br from-[#F2994A] to-[#F2C94C]",
    text: "text-gray-900",
    accent: "#2D3436"
  },
  {
    name: "Ocean Breeze",
    background: "bg-gradient-to-br from-[#2980B9] to-[#6DD5FA]",
    text: "text-gray-900",
    accent: "#FF5252"
  },
  {
    name: "Forest Mist",
    background: "bg-gradient-to-br from-[#3C8D2F] to-[#56Ab2F]",
    text: "text-white",
    accent: "#FFD700"
  },
  {
    name: "Cherry Blossom",
    background: "bg-gradient-to-br from-[#FFC0CB] to-[#FF69B4]",
    text: "text-gray-900",
    accent: "#6A0572"
  }
];

// Keep track of the current theme in local storage
const THEME_KEY = "countdown-timer-theme-index";

export interface ThemeContextType {
  background: string;
  text: string;
  accent: string;
}

const ThemeToggle = () => {
  const [themeIndex, setThemeIndex] = useState<number>(0);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load theme preference from localStorage on initial render
    const savedThemeIndex = localStorage.getItem(THEME_KEY);
    if (savedThemeIndex) {
      setThemeIndex(parseInt(savedThemeIndex));
    }
  }, []);

  useEffect(() => {
    // Apply theme CSS variables when theme changes
    document.documentElement.style.setProperty('--timer-background-start', themes[themeIndex].background.split('from-')[1].split(' ')[0]);
    document.documentElement.style.setProperty('--timer-background-end', themes[themeIndex].background.split('to-')[1]);
    document.documentElement.style.setProperty('--timer-text', themes[themeIndex].text === "text-white" ? "#ffffff" : "#1A1F2C");
    document.documentElement.style.setProperty('--timer-accent', themes[themeIndex].accent);
    
    // Save to localStorage
    localStorage.setItem(THEME_KEY, themeIndex.toString());
  }, [themeIndex]);
  
  const changeTheme = () => {
    // Get a random theme index that's different from the current one
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * themes.length);
    } while (newIndex === themeIndex && themes.length > 1);
    
    setThemeIndex(newIndex);
    
    toast({
      title: `Theme: ${themes[newIndex].name}`,
      description: "The theme has been updated!",
      duration: 2000,
    });
  };
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button 
        onClick={changeTheme}
        size="icon" 
        variant="outline"
        className="rounded-full bg-opacity-20 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/20"
      >
        <Palette className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default ThemeToggle;
