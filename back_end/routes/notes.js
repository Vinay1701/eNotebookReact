const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetch_user = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')
const { findById, findByIdAndUpdate } = require('../models/User')

// Fetching all notes of a user end-point "/api/notes/fetchallnotes" 
router.get('/fetchallnotes', fetch_user, async (req, res) => {
    try {
        let userid = req.user.id
        const notes = await Notes.find({ userid })
        res.json(notes)
    }
    catch(err) {
        console.log(err.message)
        res.status(500).send("Internal server error")
    }
})

// Add(create) notes of a user "POST" end-point "/api/notes/addnote" 
router.post('/addnote', fetch_user, [
    body('title', 'Title must be atleast 3 charecters long').isLength({min: 3}),
    body('description', 'Description must be atleast 5 charecters long').isLength({min: 5}),
    body('author', 'Author name must be atleast 3 charecters long').isLength({min: 3})
], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let userid = req.user.id
        // Store the user-input(req.body) using Destructuring in the respective names
        const { title, author, description } = req.body

        const note = new Notes({ userid, title, author, description })
        const savedNotes = await note.save() // Adding the created-notes in our DataBase
        res.send(savedNotes)
    }
    catch(err) {
        console.log(err.message) 
        res.status(500).send("Internal server error")
    }
})

// Update an existing notes of a user "PUT" end-point "/api/notes/updatenotes/:id" . Login required
router.put('/updatenotes/:id',  fetch_user, [
    body('title', 'Title must be atleast 3 charecters long').isLength({min: 3}),
    body('description', 'Description must be atleast 5 charecters long').isLength({min: 5}),
    body('author', 'Author name must be atleast 3 charecters long').isLength({min: 3})
], async (req, res) => { 

    try {
        let userIdFromAuthToken = req.user.id

        const { title, author, description } = req.body
        // Create a newNote obj

        // We cannot create in this way as it generates the new _id of the new obj
        //      and the id of an object is immutable
        // const newNote = new Notes({}) 

        // juz create a blank const
        const newNote = {}

        // If user updated then set those values in respective feilds
        if(title) newNote.title = title
        if(author) newNote.author = author
        if(description) newNote.description = description

        let note = await Notes.findById(req.params.id)

        if(!note) { return res.status(404).send("Notes not found") }

        // Check whether the loggedin user is updating only his notes
        if(note.userid.toString() !== userIdFromAuthToken) { return res.status(401).send("Access Denied!") }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})

        res.json({ note })
    }
    catch(err) {
        console.log(err.message) 
        res.status(500).send("Internal server error")
    }
})

// Delete an existing notes of a user "DELETE" end-point "/api/notes/deletenotes/:id" . Login required
router.delete('/deletenotes/:id',  fetch_user, async (req, res) => { 

    try {
        let userIdFromAuthToken = req.user.id

        let note = await Notes.findById(req.params.id)

        if(!note) { return res.status(404).send("Notes not found") }

        // Check whether the loggedin user is deleting only his notes
        if(note.userid.toString() !== userIdFromAuthToken) { return res.status(401).send("Access Denied!") }

        note = await Notes.findByIdAndDelete(req.params.id)

        res.json({ success: "The node is deleted" })
    }
    catch(err) {
        console.log(err.message) 
        res.status(500).send("Internal server error")
    }
})

module.exports = router
