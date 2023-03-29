import React from 'react';

// @ts-ignore
const InterviewBox = ({ position, about, type }) => {
    return (
        <div style={{
            backgroundColor: 'white',
            color: 'black',
            position: 'fixed',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70%',
            height: '20%',
            overflow: 'auto',
        }}>
            <div style={{ backgroundColor: '#111E31', color: 'white', padding: '10px' }}>
                <h2>{position}</h2>
                <p>{type} Interview</p>
            </div>
            <div style={{ padding: '20px' }}>
                <p>{about}</p>
            </div>
        </div>
    );
};

export default InterviewBox;
