import { useState, useEffect } from 'react';

export default function CountdownTimer({ 
  deadlineKey = 'apl_offer_deadline', 
  durationMinutes = 60, 
  onExpire = () => {}, 
  className = '' 
}) {
  const [remaining, setRemaining] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Get or set deadline in localStorage
    const key = deadlineKey;
    let deadline = localStorage.getItem(key);
    
    if (!deadline) {
      deadline = String(Date.now() + durationMinutes * 60 * 1000);
      localStorage.setItem(key, deadline);
    }

    const getRemainingMs = () => {
      const now = Date.now();
      const deadlineMs = parseInt(deadline);
      return Math.max(0, deadlineMs - now);
    };

    const updateTimer = () => {
      const remainingMs = getRemainingMs();
      setRemaining(remainingMs);
      
      if (remainingMs <= 0 && !isExpired) {
        setIsExpired(true);
        onExpire();
      }
    };

    // Initial update
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [deadlineKey, durationMinutes, onExpire, isExpired]);

  if (remaining === null) {
    return <span className={className}>Loading...</span>;
  }

  if (isExpired) {
    return <span className={className}>Offer Expired</span>;
  }

  // Format as HH:MM:SS
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <span className={`font-mono font-bold ${className}`}>
      {formatted}
    </span>
  );
}
