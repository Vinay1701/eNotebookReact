import { useState } from "react";
import NoteContext from "./noteContext";

export default function NoteState(props) {
    const host = "http://localhost:5000/"

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Get all notes
    const getNotes = async () => {
      const url = `${host}api/notes/fetchallnotes`
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken')
        }
      });
      const json = await response.json()
      setNotes(json)
    }

    // Add a note
    const addNote = async (title, author, description) => {
      const url = `${host}api/notes/addnote`
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken')
        },
        body: JSON.stringify( {title, author, description} )
      });
      const note = await response.json()
      setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id) => {
      const url = `${host}api/notes/deletenotes/${id}`
      await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken')
        }
      });
      const newNotes = notes.filter((note) => {return note._id !== id})
      setNotes(newNotes)
    }

    // Read a note
    const readNote = async (id) => {
      const url = `${host}api/notes/updatenotes/${id}`
      await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken')
        }
      });
    }

    // Update/Edit a Note
    const updateNote = async (id, title, author, description) => {
      const url = `${host}api/notes/updatenotes/${id}`
      await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken')
        },
        body: JSON.stringify( {title, author, description} ) // body data type must match "Content-Type" header
      });
      // const json = response.json();

      for (let i = 0; i < notes.length; i++) {
        const element = notes[i];
        if(element._id === id) {
          element.title = title
          element.author = author
          element.description = description
          break
        }
      }
    }

    return ( 
      <NoteContext.Provider value={ {notes, addNote, deleteNote, updateNote, getNotes, readNote} }>
        {props.children}
      </NoteContext.Provider>
    )
}