import React from 'react';

const StartInterviewButton = () => {
  const handleClick = () => {
    // Add code to navigate to the interview start page
  };

  return (
    <button
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '5px',
        padding: '10px 15px',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      Start Interview
    </button>
  );
};

export default StartInterviewButton;
