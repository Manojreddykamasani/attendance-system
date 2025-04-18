import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, CheckSquare, Users, MessageSquare } from 'lucide-react';

const StudentDetails = () => {
  const { rollNo } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.post("http://localhost:3000/getsinglestudent", {
          roll: rollNo
        });
        setStudent(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudent();
  }, [rollNo]);

  if (!student) {
    return <div className="text-center p-6 text-xl">Loading...</div>;
  }

  const infoCards = [
    {
      label: 'Attendance',
      icon: <CheckSquare className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      onClick: () => navigate(`/student/${rollNo}/attendance`)
    },
    {
      label: 'Grades',
      icon: <BookOpen className="w-6 h-6 text-sky-600" />,
      bg: 'bg-sky-100',
      text: 'text-sky-600',
      onClick: () => navigate(`/student/${rollNo}/grades`)
    },
    {
      label: 'Clubs',
      icon: <Users className="w-6 h-6 text-gray-700" />,
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      onClick: null
    },
    {
      label: 'Remarks',
      icon: <MessageSquare className="w-6 h-6 text-gray-700" />,
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      onClick: null
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main content area */}
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-2xl rounded-3xl">
          <h1 className="text-4xl font-bold text-sky-600 mb-2">{student.name}</h1>
          <p className="text-lg text-gray-700 mb-8">
            Roll No: {student.rollno} | Section: {student.section}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {infoCards.map((card, index) => (
              <div
                key={index}
                onClick={card.onClick}
                className={`flex items-center p-5 rounded-2xl transition shadow-md hover:shadow-lg ${card.bg} ${
                  card.onClick ? 'cursor-pointer' : 'opacity-60 cursor-default'
                }`}
              >
                <div className="p-3 bg-white rounded-full mr-4 shadow-inner">
                  {card.icon}
                </div>
                <span className={`font-semibold text-lg ${card.text}`}>{card.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="bg-sky-600 text-white text-center py-4">
        <p className="text-sm">© 2025 Your School Management System</p>
      </footer>
    </div>
  );
};

export default StudentDetails;
