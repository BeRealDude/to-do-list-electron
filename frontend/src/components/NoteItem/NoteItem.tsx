import React from "react";
import { useAppDispatch } from "../../hooks/hook";
import { toggleComplete, toggleImportant, removeNote } from "../../services/noteSlice.tsx";

interface NoteItemProps {
    id: string,
    date: string,
    title: string,
    text: string,
    completed: boolean,
    importance: boolean,
}

const NoteItem: React.FC<NoteItemProps> = ({ id, date, title, text, completed, importance }) => {

    const dispatch = useAppDispatch();

    return (
        <li  key={id} >
        <div>
            <h3>{title}</h3>
            <span>{date}</span>
        <input 
        type='checkbox'
        checked = { completed }
        onChange = {() => dispatch(toggleComplete(id))}
       />
        <input 
        type='checkbox'
        checked = { importance }
        onChange = {() => dispatch(toggleImportant(id))}
       />
    <div>{text}</div>
    </div>
    <button onClick={() => dispatch(removeNote(id))}>Delete</button>
    </li>
        
    )
}

export default NoteItem;