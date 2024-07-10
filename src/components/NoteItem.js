import React, {useContext} from 'react'
import NoteContext from "../context/notes/noteContext";
import AlertContext from '../context/Alerts/AlertContext';

export default function NoteItem(props) {
  const {note, updateNote, readNote} = props
  const {deleteNote} = useContext(NoteContext)
  const {showAlert} = useContext(AlertContext)

  const onDeleteClick = () => {
    showAlert("Deleted Successfully!", "success")
    deleteNote(note._id)
  }

  return (
    <div className="col-md-4">    
      <div className="card my-3">
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}.</p>
            <i className="fa-solid fa-trash mx-2" onClick={onDeleteClick}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{ updateNote(note)} }></i>
            <i className="fa-solid fa-eye mx-2" onClick={()=>{ readNote(note) } } ></i>
        </div>
      </div>
    </div>
  )
}
