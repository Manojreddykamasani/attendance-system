import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const StudentDetails = () => {
  const { rollNo } = useParams();  // Get the roll number from the URL
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // This is where you would fetch student details using the rollNo
    // For now, we're using hardcoded data
    const fetchstudent=async ()=>{
        try{
            const res=await axios.post("http://localhost:3000/getsinglestudent",{
                "roll":rollNo
            })
            setStudent(res.data)
        }
        catch(error){
            console.log(error)
        }

    }
    fetchstudent()
    // Set the student data for the corresponding rollNo
  }, [rollNo]); // Re-run whenever rollNo changes

  if (!student) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-sky-500 mb-4">{student.name}</h1>
      <p className="text-xl text-gray-700">Roll No: {student.rollno}</p>
      <p className="text-xl text-gray-700">Section: {student.section}</p>
      {/* You can add more data or details you want to show */}
    </div>
  );
};

export default StudentDetails;
