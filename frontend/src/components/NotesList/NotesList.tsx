import React from "react";
import { useAppSelector } from "../../hooks/hook";
import NoteItem from "../NoteItem/NoteItem";



const NotesList: React.FC = () => {

    const notes = useAppSelector(state => state.notes.list);
    console.log(notes, 'notes')
    return (
       <ul>
        {notes.map((note) => (
            <NoteItem
            key={note.id}
            {...note}
            />
        ))}
       </ul>
    
        
    )
}

export default NotesList;