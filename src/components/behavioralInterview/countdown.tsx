// Countdown.tsx
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

interface CountdownProps {
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
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

  return (
    <Typography variant="h6">
      Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}
    </Typography>
  );
};

export default Countdown;