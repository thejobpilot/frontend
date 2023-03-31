import React, { useEffect, useState } from "react";
import { LinearProgress, Typography } from "@mui/material";

interface CountdownProps {
  totalTime: number;
}

const Countdown: React.FC<CountdownProps> = ({ totalTime }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const savedTimeLeft = typeof window !== 'undefined' && localStorage.getItem("time_left");
    const initialTimeLeft = savedTimeLeft ? parseInt(savedTimeLeft, 10) : totalTime;
    setTimeLeft(initialTimeLeft);
  }, []);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        localStorage.setItem("time_left", JSON.stringify(timeLeft - 1));
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      localStorage.removeItem("time_left");
    }
  }, [timeLeft]);

  return (
    <div>
      <Typography variant="h6">Time remaining: {timeLeft ? timeLeft : 0} seconds</Typography>
      <LinearProgress variant="determinate" value={timeLeft ? (timeLeft / totalTime) * 100 : 0} />
    </div>
  );
};

export default Countdown;
