import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ApplicantList = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  width: 30%;
`;

const ApplicantHeader = styled.h2`
  background-color: #111e31;
  color: #fff;
  padding: 8px;
  margin: 0;
  border-radius: 4px 4px 0 0;
`;

const ApplicantItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 8px;
  cursor: move;
`;

const ApplicantRank = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ApplicantName = styled.div`
  flex: 1;
  margin-left: 8px;
`;

const ApplicantListContainer = () => {
    const [applicants, setApplicants] = useState([    { id: 1, name: "Applicant 1", rank: 1 },    { id: 2, name: "Applicant 2", rank: 2 },    { id: 3, name: "Applicant 3", rank: 3 },    { id: 4, name: "Applicant 4", rank: 4 },    { id: 5, name: "Applicant 5", rank: 5 }  ]);

    const handleDrag = (e, index) => {
        e.dataTransfer.setData("text/plain", index);
    };

    const handleDrop = (e, newIndex) => {
        const oldIndex = e.dataTransfer.getData("text/plain");
        const newApplicants = [...applicants];
        const [removed] = newApplicants.splice(oldIndex, 1);
        newApplicants.splice(newIndex, 0, removed);
        setApplicants(newApplicants);
    };

    return (
        <Container>
            <ApplicantList>
                <ApplicantHeader>Applicants</ApplicantHeader>
                {applicants.map((applicant, index) => (
                    <ApplicantItem
                        key={applicant.id}
                        draggable
                        onDragStart={(e) => handleDrag(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <ApplicantRank>{applicant.rank}</ApplicantRank>
                        <ApplicantName>{applicant.name}</ApplicantName>
                    </ApplicantItem>
                ))}
            </ApplicantList>
        </Container>
    );
};

export default ApplicantListContainer;
