import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
    const[data,setdata]=useState([])
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      try {
        const res = await axios.post("http://localhost:3000/getstudentdetails", {
          query: searchTerm
        });

        if (res.status === 200) {
          setdata(res.data);
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]); 

  // Filter data based on the search term
  const filteredData = data

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      {/* Search Section */}
      <section className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl font-bold text-sky-500 mb-6">Welcome to EduPulse</h1>
        <p className="text-lg mb-8 text-gray-700">Search for your details here!</p>
        
        <div className="relative max-w-xl mx-auto mb-8">
          <input 
            type="text" 
            placeholder="Search by name or roll number..." 
            value={searchTerm} 
            onChange={handleSearch}
            className="w-full p-4 border-2 border-sky-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300 transition duration-300"
          />
          <button className="absolute right-3 top-3 text-sky-500">
            🔍
          </button>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="space-y-4">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <Link 
                  key={item.rollNo} 
                  to={`/student-details/${item.rollno}`} // Link to student details page
                  className="block bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer transition-all"
                >
                  <p className="text-xl font-medium text-sky-500">{item.name}</p>
                  <p className="text-sm text-gray-600">Roll No: {item.rollno}</p>
                  <p className="text-sm text-gray-600">Section: {item.section}</p>
                </Link>
              ))
            ) : (
              <p className="text-xl text-gray-600">No results found for "{searchTerm}"</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
