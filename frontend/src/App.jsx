import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import StudentDetails from './components/StudentDetails';
function App() {
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/student-details/:rollNo" element={<StudentDetails />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
