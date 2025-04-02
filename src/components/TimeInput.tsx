
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Clock } from "lucide-react";
import { formatTime } from "@/utils/timeUtils";

interface TimeInputProps {
  onTimeSet: (timeString: string) => void;
}

const TimeInput = ({ onTimeSet }: TimeInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState<number>(12);
  const [minutes, setMinutes] = useState<number>(0);
  const [period, setPeriod] = useState<"AM" | "PM">("PM");
  
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 12) {
      setHours(value);
    }
  };
  
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 59) {
      setMinutes(value);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert to correct format for the URL (e.g., "3:30PM")
    const formattedTime = formatTime(
      period === "PM" && hours < 12 ? hours + 12 : period === "AM" && hours === 12 ? 0 : hours, 
      minutes
    );
    
    onTimeSet(formattedTime);
    setIsOpen(false);
  };
  
  return (
    <div className="fixed bottom-4 right-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-timer-accent/20 text-timer-text border-timer-accent/30 hover:bg-timer-accent/30 theme-transition"
          >
            <Clock className="h-4 w-4 mr-2" />
            Set Time
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-medium text-center">Set Target Time</h3>
            
            <div className="flex items-center space-x-2">
              <div className="grid gap-1">
                <label htmlFor="hours" className="text-xs">Hours</label>
                <Input
                  id="hours"
                  type="number"
                  min={1}
                  max={12}
                  value={hours}
                  onChange={handleHoursChange}
                  className="w-20"
                />
              </div>
              
              <span className="mt-6">:</span>
              
              <div className="grid gap-1">
                <label htmlFor="minutes" className="text-xs">Minutes</label>
                <Input
                  id="minutes"
                  type="number"
                  min={0}
                  max={59}
                  value={minutes}
                  onChange={handleMinutesChange}
                  className="w-20"
                />
              </div>
              
              <div className="grid gap-1 mt-1">
                <label className="text-xs">Period</label>
                <div className="flex">
                  <Button
                    type="button"
                    variant={period === "AM" ? "default" : "outline"}
                    size="sm"
                    className="rounded-r-none"
                    onClick={() => setPeriod("AM")}
                  >
                    AM
                  </Button>
                  <Button
                    type="button"
                    variant={period === "PM" ? "default" : "outline"}
                    size="sm"
                    className="rounded-l-none"
                    onClick={() => setPeriod("PM")}
                  >
                    PM
                  </Button>
                </div>
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Start Countdown
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeInput;
