
import { useState, useEffect } from "react";
import { calculateTimeDifference, formatTimeUnit } from "@/utils/timeUtils";

interface CountdownTimerProps {
  targetDate: Date | null;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!targetDate) return;
    
    setIsActive(true);
    
    // Initial calculation
    setTimeLeft(calculateTimeDifference(targetDate));
    
    // Update every second
    const intervalId = setInterval(() => {
      const newTimeLeft = calculateTimeDifference(targetDate);
      setTimeLeft(newTimeLeft);
      
      // Stop when countdown reaches zero
      if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [targetDate]);

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center text-timer-text opacity-50 theme-transition">
        <p className="text-xl mb-4">Please set a target time</p>
        <p className="text-sm">Use the form in the bottom right or add "?time=3:30PM" to the URL</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center theme-transition">
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="flex flex-col items-center">
          <div className="text-5xl md:text-8xl lg:text-9xl font-bold text-timer-text animate-pulse-subtle theme-transition">
            {formatTimeUnit(timeLeft.hours)}
          </div>
          <div className="text-xs md:text-sm text-timer-text/70 mt-2 theme-transition">HOURS</div>
        </div>
        
        <div className="text-4xl md:text-7xl lg:text-8xl font-bold text-timer-text theme-transition">:</div>
        
        <div className="flex flex-col items-center">
          <div className="text-5xl md:text-8xl lg:text-9xl font-bold text-timer-text animate-pulse-subtle theme-transition">
            {formatTimeUnit(timeLeft.minutes)}
          </div>
          <div className="text-xs md:text-sm text-timer-text/70 mt-2 theme-transition">MINUTES</div>
        </div>
        
        <div className="text-4xl md:text-7xl lg:text-8xl font-bold text-timer-text theme-transition">:</div>
        
        <div className="flex flex-col items-center">
          <div className="text-5xl md:text-8xl lg:text-9xl font-bold text-timer-text animate-pulse-subtle theme-transition">
            {formatTimeUnit(timeLeft.seconds)}
          </div>
          <div className="text-xs md:text-sm text-timer-text/70 mt-2 theme-transition">SECONDS</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
