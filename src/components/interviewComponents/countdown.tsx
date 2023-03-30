import React, { useEffect, useState } from "react";
import { LinearProgress, Typography } from "@mui/material";

interface CountdownProps {
    totalTime: number;
}

const Countdown: React.FC<CountdownProps> = ({ totalTime }) => {
    const [timeLeft, setTimeLeft] = useState(totalTime);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    return (
        <div>
            <Typography variant="subtitle2">Time remaining: {timeLeft} seconds</Typography>
            <LinearProgress variant="determinate" value={(timeLeft / totalTime) * 100} />
        </div>
    );
};

export default Countdown;
