import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Question from "@/components/interviewComponents/questions";
import VideoRecorder from "@/components/interviewComponents/videoBoxForApplicantRecordingThemselves";

interface QuestionData {
    question: string;
}

const RecordedInterviewPage: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions] = useState<QuestionData[]>([
        { question: 'Question 1' },
        { question: 'Question 2' },
        // Add more questions here
    ]);

    const handleNext = () => {
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    const handleRecordingComplete = (blob: Blob) => {
        // Save the recorded video
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Box style={{ marginTop: '80px' }}>
            <Question question={currentQuestion.question} questionNumber={currentQuestionIndex + 1} />
            <VideoRecorder onRecordingComplete={handleRecordingComplete}  reset currentQuestionIndex={currentQuestionIndex}/>
            {currentQuestionIndex < questions.length - 1 && (
                <Button variant="contained" onClick={handleNext} style={{ float: 'right' }}>
                    Next
                </Button>
            )}
        </Box>
    );
};

export default RecordedInterviewPage;
