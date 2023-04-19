import React, {useState} from 'react';
import { Box, Typography, Paper, Divider, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const MainContainer = styled(Box)({
    display: 'flex',
    height: '100vh',
    background: '#111E31',
    color: 'white',
    marginTop: '60px',
});

const LeftContainer = styled(Paper)({
    flex: '1',
    margin: '1rem',
    padding: '1rem',
    background: '#111E31',
    color: 'white',
    overflowY: 'auto',
});

const RightContainer = styled(Paper)({
    flex: '1',
    margin: '1rem',
    padding: '1rem',
    background: '#111E31',
    color: 'white',
});

const IDEInput = styled(TextField)({
    background: 'white',
    color: '#111E31',
    width: '100%',
    height: '100%',
});

const NavigationButton = styled(Button)({
    margin: '0.5rem',
    background: 'white',
    color: '#111E31',
});

interface CodingQuestion {
    title: string;
    description: string;
    code: string;
}

const CodingInterviewPage = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<CodingQuestion[]>([
        {title: "Question 1", description: "", code: "Code Here"},
        {title: "Question 2", description: "", code: "Code Here"},
    ]);

    const onChange = (value: any) => {
        const newAnswer = value;
        setQuestions((prevQuestions) =>
            prevQuestions.map((q, idx) => {
                    return idx === questionIndex ? {...q, code: newAnswer} : q;
                }
            )
        );
    };

    const isLastQuestion = questionIndex === questions.length - 1;
    const isFirstQuestion = questionIndex === 0;
    console.log(questions)
    return (
        <MainContainer>
            <LeftContainer>
                <Typography variant="h5" gutterBottom>
                    {questions[questionIndex].title}
                </Typography>
                <Typography variant="body1">
                    {questions[questionIndex].description}
                </Typography>
            </LeftContainer>
            <RightContainer>
                <CodeMirror
                    value={questions[questionIndex].code}
                    height="500px"
                    theme="dark"
                    extensions={[javascript({ jsx: true })]}
                    onChange={onChange}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {!isFirstQuestion && (
                        <NavigationButton
                            variant="contained"
                            onClick={() => setQuestionIndex(questionIndex - 1)}
                        >
                            Previous
                        </NavigationButton>
                    )}
                    {isLastQuestion ? (
                        <NavigationButton variant="contained">Submit</NavigationButton>
                    ) : (
                        <NavigationButton
                            variant="contained"
                            onClick={() => setQuestionIndex(questionIndex + 1)}
                        >Next
                        </NavigationButton>
                    )}
                </Box>
            </RightContainer>
        </MainContainer>
    );
};

export default CodingInterviewPage;
