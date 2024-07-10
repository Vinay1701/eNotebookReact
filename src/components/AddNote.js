import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from "../context/notes/noteContext";
import AlertContext from '../context/Alerts/AlertContext';

export default function AddNote() {

    const {addNote} = useContext(NoteContext)
    const {showAlert} = useContext(AlertContext)

    const [note, setNote] = useState( {title: "", author: "", description: ""} )

    const navigate = useNavigate()
    const onAddClick = (event) => {
        event.preventDefault()
        addNote(note.title, note.author, note.description)
        showAlert("Notes Added Successfully!", "success")
        navigate('/yourNotes')
    }

    const onChange = (event) => { // Keeping other key values unchanged, only changing the key values of the event fired input name
        setNote( {...note, [event.target.name]: event.target.value} )
    }

    return (
    <div className="container">
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={onChange} minLength={3} required />
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Author</label>
                <input type="text" className="form-control" id="author" name="author" onChange={onChange} minLength={3} required />
            </div>
            <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" name="description" rows="5" onChange={onChange} minLength={5} required ></textarea>
            </div>
            <button disabled={note.title.length < 3 || note.author.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary mx-2" onClick={onAddClick} >Add</button>
        </form>
    </div>

    )
}
