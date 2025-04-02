
/**
 * Parse a time string in 12-hour format (e.g., "3:30PM") to a target Date object
 */
export function parseTimeStringToDate(timeString: string): Date | null {
  // Validate the format with regex (e.g., "3:30PM", "12:00AM")
  const regex = /^(1[0-2]|0?[1-9]):([0-5][0-9])([AP]M)$/i;
  const match = timeString?.match(regex);
  
  if (!match) return null;
  
  // Extract hours, minutes, and AM/PM
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const isPM = match[3].toUpperCase() === 'PM';
  
  // Convert to 24-hour format
  if (isPM && hours < 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;
  
  // Create target date for today
  const now = new Date();
  const targetDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0
  );
  
  // If the target time is in the past today, move to tomorrow
  if (targetDate < now) {
    targetDate.setDate(targetDate.getDate() + 1);
  }
  
  return targetDate;
}

/**
 * Calculate the time difference between now and a target date
 */
export function calculateTimeDifference(targetDate: Date): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();
  
  // Convert to hours, minutes, seconds
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
}

/**
 * Format a 12-hour time string
 */
export function formatTime(hours: number, minutes: number): string {
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${displayHours}:${displayMinutes}${period}`;
}

/**
 * Format hours, minutes, seconds with leading zeros
 */
export function formatTimeUnit(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}
