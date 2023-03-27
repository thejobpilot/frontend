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
      <h2>
        Question {currentQuestion} of {totalQuestions}
      </h2>
      <p>{prompt}</p>
    </div>
  );
};

export default questionComponent;