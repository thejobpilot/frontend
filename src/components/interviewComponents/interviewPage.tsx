import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Question from "@/components/interviewComponents/questions";
import Countdown from "@/components/interviewComponents/countdown";

interface QuestionData {
    question: string;
    answer: string;
}

const InterviewPage: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<QuestionData[]>([
        { question: "What is your favorite color?", answer: "" },
        { question: "How old are you?", answer: "" },
        { question: "Why us?", answer: "" },
        // Add more questions here
    ]);

    const handleSave = () => {
        // Save the answer
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    const handleSubmit = () => {
        // Submit the answers
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswer = e.target.value;
        setQuestions((prevQuestions) =>
            prevQuestions.map((q, idx) =>
                idx === currentQuestionIndex ? { ...q, answer: newAnswer } : q
            )
        );
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Box style={{ marginTop: '80px' }}>
            <Countdown totalTime={500} />
            <Question question={currentQuestion.question} questionNumber={currentQuestionIndex + 1} />
            <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={currentQuestion.answer}
                onChange={handleChange}
            />

            <Box display="flex" justifyContent="space-between">
                {currentQuestionIndex > 0 && (
                    <Button variant="contained" onClick={handlePrevious}>
                        Previous
                    </Button>
                )}
                {currentQuestionIndex < questions.length - 1 && (
                    <Button variant="contained" onClick={handleNext} style={{ marginLeft: 'auto' }}>
                        Next
                    </Button>
                )}
                {currentQuestionIndex === questions.length - 1 && (
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default InterviewPage;
