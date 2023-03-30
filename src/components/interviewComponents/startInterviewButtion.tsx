import React from 'react';

const StartInterviewButton = () => {
    const handleClick = () => {
        // Add code to navigate to the interview start page
    };

    return (
        <button
            style={{
                position: 'fixed',
                bottom: '200px',
                right: '250px',
                backgroundColor: '#111E31',
                color: '#fff',
                borderRadius: '5px',
                padding: '20px 30px',
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
