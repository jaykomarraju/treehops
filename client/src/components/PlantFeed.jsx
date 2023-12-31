import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  margin-bottom: 150px;
`;

const PlantCard = styled.div`
  background-color: #fff;
  border: 2px solid #111;
  border-radius: 8px;
  margin: 20px;
  overflow: hidden;
  width: 300px;
`;

const Heading = styled.h3`
  font-family: "Rethink Sans", sans-serif;
  font-size: 36px;
  margin: 20px;
  margin-bottom: 40px;
  text-align: center;
  color: #111;
`;

const PlantImage = styled.img`
  width: 100%;
  height: auto;
`;

const PlantInfo = styled.div`
  padding: 20px;
`;

const PlantName = styled.h3`
  color: #111;
  font-family: "Rethink Sans", sans-serif;
  font-size: 18px;
  margin: 0 0 10px 0;
`;

const PlantDetails = styled.p`
  color: #666;
  font-family: "Rethink Sans", sans-serif;
  font-size: 16px;
  margin: 0;
`;

const ReportButton = styled.button`
  background-color: #ff6347; /* Tomato color for visibility */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ff4c20; /* Darker shade for hover effect */
  }
`;

const PlantFeed = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const plantDocs = await getDocs(collection(db, "Plants"));
      const plantDataPromises = plantDocs.docs.map(async (docSnapshot) => {
        const plantData = docSnapshot.data();
        const userRef = doc(db, "Users", plantData.uploaderId);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();

        return {
          id: docSnapshot.id,
          imageUrl: plantData.imageURL,
          name: plantData.description,
          uploadDate: plantData.uploadDate.toDate(), // Assuming uploadDate is a Firestore Timestamp
          uploaderName: userData.name, // Assuming 'name' is a field in the Users collection
        };
      });

      const plantData = await Promise.all(plantDataPromises);

      // Sort plants by upload date in descending order
      plantData.sort((a, b) => b.uploadDate - a.uploadDate);

      setPlants(plantData);
    };

    fetchPlants();
  }, []);

    const reportPlant = async (plantId) => {
        // const plantRef = doc(db, 'Plants', plantId);
        // const plantDoc = await getDoc(plantRef);
        // const plantData = plantDoc.data();
        // const newReportCount = plantData.reportCount + 1;
        // await updateDoc(plantRef, { reportCount: newReportCount });
        console.log(`Reported plant with ID: ${plantId}`);
    }

  return (
    <FeedContainer>
      <h3>Ideas Feed</h3>
      {plants.map((plant) => (
        <PlantCard key={plant.id}>
          <PlantImage src={plant.imageUrl} alt={plant.name} />
          <PlantInfo>
            <h3>{plant.name}</h3>
            <p>Uploaded by: {plant.uploaderName}</p>
            <p>Uploaded on: {plant.uploadDate.toDateString()}</p>
            <ReportButton onClick={() => reportPlant(plant.id)}>Report</ReportButton>
          </PlantInfo>
        </PlantCard>
      ))}
    </FeedContainer>
  );
};

export default PlantFeed;
