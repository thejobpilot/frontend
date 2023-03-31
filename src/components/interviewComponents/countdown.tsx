import React, { useEffect, useState } from "react";
import { LinearProgress, Typography } from "@mui/material";

interface CountdownProps {
  totalTimeMinutes: number;
}

const Countdown: React.FC<CountdownProps> = ({ totalTimeMinutes }) => {
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const savedEndTime =
      typeof window !== "undefined" && localStorage.getItem("end_time");
    const now = new Date();
    const initialEndTime = savedEndTime
      ? new Date(savedEndTime)
      : new Date(now.getTime() + totalTimeMinutes * 60 * 1000);
    setEndTime(initialEndTime);
    localStorage.setItem("end_time", initialEndTime.toISOString());
  }, [totalTimeMinutes]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeLeft = Math.max(
        Math.round((endTime.getTime() - now.getTime()) / 1000),
        0
      );
      setRemainingTime(timeLeft);
      if (timeLeft === 0) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div>
      <Typography color="black" variant="h6">
        Time remaining: {remainingTime} seconds
      </Typography>
      <LinearProgress
        variant="determinate"
        value={100 - (remainingTime / (totalTimeMinutes * 60)) * 100}
      />
    </div>
  );
};

export default Countdown;
