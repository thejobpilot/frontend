import React from "react";
import { Typography } from "@mui/material";

interface QuestionProps {
    question: string;
    questionNumber: number;
}

const Question: React.FC<QuestionProps> = ({ question, questionNumber }) => {
    return (
        <div>
            <Typography variant="h6">Question {questionNumber}</Typography>
            <Typography>{question}</Typography>
        </div>
    );
};

export default Question;
