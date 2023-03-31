import React, { useEffect, useState } from "react";
import { LinearProgress, Typography } from "@mui/material";

interface CountdownProps {
  totalTimeMinutes: any;
  interview: any;
  updater: any;
  message: any;
}

export default function Countdown(props: CountdownProps) {
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const storage = `end_time_${props.interview?.id}-${props.interview?.interviewLength}`;
    const savedEndTime =
      typeof window !== "undefined" && localStorage.getItem(storage);
    const now = new Date();
    console.log("savedEndTime")
    console.log(props.totalTimeMinutes)
    const initialEndTime = savedEndTime
      ? new Date(savedEndTime)
      : new Date(now.getTime() + props.totalTimeMinutes * 60 * 1000);
    setEndTime(initialEndTime);
    localStorage.setItem(storage, initialEndTime.toISOString());
  }, [props.totalTimeMinutes]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeLeft = Math.max(
        Math.round((endTime.getTime() - now.getTime()) / 1000),
        0
      );
      setRemainingTime(timeLeft);
      if (timeLeft === 0) {
        props.updater(0);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div>
      <Typography color="black" variant="h6">
        {props.message ? props.message : "Time remaining"}: {Math.floor(remainingTime / 60).toFixed(0)} minutes :{" "}
        {(remainingTime % 60).toFixed(0)} seconds
      </Typography>
      <LinearProgress
        variant="determinate"
        value={100 - (remainingTime / (props.totalTimeMinutes * 60)) * 100}
      />
    </div>
  );
}
