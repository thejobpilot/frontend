import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

interface CountdownProps {
  seconds: number;
  onCountdownUpdate: (progress: number) => void;
}

const Countdown: React.FC<CountdownProps> = ({
  seconds,
  onCountdownUpdate,
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    onCountdownUpdate((timeLeft / seconds) * 100);
  }, [timeLeft, seconds, onCountdownUpdate]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <Typography variant="h6" component="div">
      Time left: {formatTime(timeLeft)}
    </Typography>
  );
};

export default Countdown;
