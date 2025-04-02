
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

  const textColorStyle = { 
    color: 'var(--timer-text, #ffffff)'
  };
  
  const textFadedStyle = { 
    color: 'var(--timer-text, #ffffff)', 
    opacity: 0.7
  };

  if (!isActive) {
    return (
      <div 
        className="flex flex-col items-center justify-center opacity-50 transition-all duration-500"
        style={textColorStyle}
      >
        <p className="text-xl mb-4">Please set a target time</p>
        <p className="text-sm">Use the form in the bottom right or add "?time=3:30PM" to the URL</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center transition-all duration-500">
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="flex flex-col items-center">
          <div 
            className="text-5xl md:text-8xl lg:text-9xl font-bold animate-pulse-subtle transition-all duration-500"
            style={textColorStyle}
          >
            {formatTimeUnit(timeLeft.hours)}
          </div>
          <div 
            className="text-xs md:text-sm mt-2 transition-all duration-500"
            style={textFadedStyle}
          >
            HOURS
          </div>
        </div>
        
        <div 
          className="text-4xl md:text-7xl lg:text-8xl font-bold transition-all duration-500"
          style={textColorStyle}
        >
          :
        </div>
        
        <div className="flex flex-col items-center">
          <div 
            className="text-5xl md:text-8xl lg:text-9xl font-bold animate-pulse-subtle transition-all duration-500"
            style={textColorStyle}
          >
            {formatTimeUnit(timeLeft.minutes)}
          </div>
          <div 
            className="text-xs md:text-sm mt-2 transition-all duration-500"
            style={textFadedStyle}
          >
            MINUTES
          </div>
        </div>
        
        <div 
          className="text-4xl md:text-7xl lg:text-8xl font-bold transition-all duration-500"
          style={textColorStyle}
        >
          :
        </div>
        
        <div className="flex flex-col items-center">
          <div 
            className="text-5xl md:text-8xl lg:text-9xl font-bold animate-pulse-subtle transition-all duration-500"
            style={textColorStyle}
          >
            {formatTimeUnit(timeLeft.seconds)}
          </div>
          <div 
            className="text-xs md:text-sm mt-2 transition-all duration-500"
            style={textFadedStyle}
          >
            SECONDS
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
