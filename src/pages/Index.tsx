
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import CountdownTimer from "@/components/CountdownTimer";
import TimeInput from "@/components/TimeInput";
import { parseTimeStringToDate } from "@/utils/timeUtils";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const { toast } = useToast();
  
  // Handle initial URL parameters and changes
  useEffect(() => {
    const timeParam = searchParams.get("time");
    if (timeParam) {
      const parsedDate = parseTimeStringToDate(timeParam);
      if (parsedDate) {
        setTargetDate(parsedDate);
      } else {
        toast({
          title: "Invalid Time Format",
          description: "Please use format like '3:30PM' or '11:15AM'",
          variant: "destructive",
        });
      }
    }
  }, [searchParams, toast]);
  
  // Handle manual time update
  const handleTimeSet = (timeString: string) => {
    const parsedDate = parseTimeStringToDate(timeString);
    if (parsedDate) {
      setTargetDate(parsedDate);
      setSearchParams({ time: timeString });
      toast({
        title: "Countdown Started",
        description: `Timer set for ${timeString}`,
      });
    }
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-timer-background to-timer-background/80">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-xl md:text-2xl font-light text-timer-text/80 mb-12">
          Time to go
        </h1>
        
        <div className="flex-1 flex items-center justify-center w-full">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div>
      
      <TimeInput onTimeSet={handleTimeSet} />
    </div>
  );
};

export default Index;
