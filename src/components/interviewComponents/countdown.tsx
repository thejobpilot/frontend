import React, { useEffect, useState } from "react";
import { LinearProgress, Typography } from "@mui/material";

interface CountdownProps {
  totalMinutes: number;
  startTime: number;
  endTime: number;
  onEnd: any;
  message?: any;
}

export default function Countdown(props: CountdownProps) {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = Math.max(props.endTime - now, -1);
      setRemainingTime(timeLeft);
      if (timeLeft === 0) {
        console.log("TIMER DONE");
        clearInterval(timer);
        props.onEnd();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [props.endTime]);

  return (
    <div>
      <Typography color="black" variant="h6">
        {props.message ? props.message : "Time remaining"}:
      </Typography>
      <Typography
        color="grey.600"
        variant="subtitle1"
        sx={{ mb: 0.5 }}
        fontFamily="Orbitron, Roboto"
      >
        {props.startTime === props.endTime
          ? `UNLIMITED`
          : `${Math.floor(remainingTime / 60).toFixed(0)} MINUTES : 
            ${(remainingTime % 60).toFixed(0)} SECONDS`}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={
          props.startTime === props.endTime
            ? 100
            : 100 - (remainingTime / (props.totalMinutes * 60)) * 100
        }
        sx={{ mb: 2 }}
      />
    </div>
  );
}
