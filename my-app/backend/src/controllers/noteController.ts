import type { Request, Response } from "express";
import * as noteService from "../services/noteService.js";

export const fetchNotes = async (req: Request, res: Response) => {
    try {
        const { sectionId } = req.body;
        const notes = await noteService.fetchAllNotes(sectionId);
        res.status(200).json({ notes });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};

export const createNote = async (req: Request, res: Response) => {
    try {
        const {userId, sectionId} = req.body;
        const newNote = await noteService.createNewNote(userId, sectionId);

        res.status(200).json({ message: "New note created", note: newNote });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};