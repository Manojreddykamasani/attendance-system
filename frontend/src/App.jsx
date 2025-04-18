import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import StudentDetails from './components/StudentDetails';
import StudentAttendance from './components/StudentAttendance';
function App() {
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/student-details/:rollNo" element={<StudentDetails  />} />
        <Route path="/student/:rollNo/attendance" element={<StudentAttendance  />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
