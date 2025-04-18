import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs from 'dayjs';
import axios from 'axios';

const StudentAttendance = () => {
  const { rollNo } = useParams();
  const [attendanceData, setAttendanceData] = useState({});
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.post('http://localhost:3000/getattendance', {
          roll: rollNo,
        });
        setAttendanceData(res.data.data);
        setAttendancePercentage(res.data.attendance);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAttendance();
  }, [rollNo]);

  const daysInMonth = currentMonth.daysInMonth();
  const startDay = currentMonth.startOf('month').day();

  const getStatusIcon = (dateStr) => {
    const status = attendanceData[dateStr];
    if (status === 'present') return <Check className="w-5 h-5 text-green-500" />;
    if (status === 'absent') return <X className="w-5 h-5 text-red-500" />;
    return null;
  };

  const generateCalendarCells = () => {
    const cells = [];

    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`empty-${i}`} className="p-4 border rounded-lg bg-gray-100" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = currentMonth.format(`YYYY-MM-${day.toString().padStart(2, '0')}`);
      const status = attendanceData[dateStr];

      cells.push(
        <div
          key={day}
          className={`flex flex-col items-center justify-center p-4 border rounded-lg ${
            status === 'present'
              ? 'bg-green-100'
              : status === 'absent'
              ? 'bg-red-100'
              : 'bg-gray-100'
          } hover:shadow transition`}
        >
          <span className="font-semibold text-gray-700">{day}</span>
          {getStatusIcon(dateStr)}
        </div>
      );
    }

    return cells;
  };

  const getPercentageColor = () => {
    if (attendancePercentage > 75) return 'bg-green-500';
    if (attendancePercentage >= 65) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevMonth}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <ChevronLeft />
            </button>
            <h2 className="text-3xl font-bold text-sky-600">
              Attendance for {currentMonth.format('MMMM YYYY')}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Attendance Percentage */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Attendance Percentage</h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {attendancePercentage.toFixed(2)}%
                </span>
              </div>
              <div className="flex mb-2 items-center justify-between">
                <div className={`w-full bg-gray-300 rounded-full`}>
                  <div
                    className={`h-2 rounded-full ${getPercentageColor()}`}
                    style={{ width: `${attendancePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-medium text-gray-500">
                {day}
              </div>
            ))}

            {generateCalendarCells()}
          </div>
        </div>
      </main>

      <footer className="bg-sky-600 text-white text-center py-4">
        <p className="text-sm">© 2025 Your School Management System</p>
      </footer>
    </div>
  );
};

export default StudentAttendance;
