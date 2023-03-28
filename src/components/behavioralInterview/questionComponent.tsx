// QuestionComponent.tsx
import React from 'react';

interface QuestionComponentProps {
  currentQuestion: number;
  totalQuestions: number;
  prompt: string;
}

const questionComponent: React.FC<QuestionComponentProps> = ({
  currentQuestion,
  totalQuestions,
  prompt,
}) => {
  return (
    <div>
      <h1>
        Question {currentQuestion} of {totalQuestions}
      </h1>
      <h3> <br /> {prompt}</h3>
    </div>
  );
};

export default questionComponent;