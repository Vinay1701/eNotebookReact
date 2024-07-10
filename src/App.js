import './App.css';
import About from './components/About'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom";
import NoteState from './context/notes/noteState';
import YourNotes from './components/YourNotes';
import AddNote from './components/AddNote';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Alert from './components/Alert'
import AlertState from './context/Alerts/AlertState';

function App() {

  return (
    <>
      <AlertState>
        <Navbar title="eNoteBook" />
        <div style={{height: '40px'}}>
          <Alert/>
        </div>
        <NoteState>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/yourNotes" element={<YourNotes />} />
              <Route path="/addNote" element={<AddNote />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </NoteState>
      </AlertState>
    </>
  );
}

export default App;
