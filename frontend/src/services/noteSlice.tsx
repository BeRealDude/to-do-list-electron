import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

type Note = {
    id: string;
    date: string;
    title: string;
    text: string;
    completed: boolean;
    importance: boolean;
}

type ListState = {
    list: Note[];
}

const initialState: ListState = {
    list: [],
};

const strDate = () => {
    const date = new Date();
    return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
}

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<string>) => {
            state.list.push({
                id: uuidv4(),
                date: strDate(),
                title: action.payload,
                text: action.payload,
                completed: false,
                importance: false,
            });
        },
        removeNote: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(n => n.id !== action.payload)
        },
        toggleComplete: (state, action: PayloadAction<string>) => {
            const toggledNote = state.list.find(n => n.id === action.payload);
            if (toggledNote) {
                toggledNote.completed = !toggledNote.completed;
            }
        },
        toggleImportant: (state, action: PayloadAction<string>) => {
            const toggledNote = state.list.find(n => n.id === action.payload);
            if (toggledNote) {
                toggledNote.importance = !toggledNote.importance;
            }
        },
    }
});

export const { addNote, removeNote, toggleComplete, toggleImportant } = noteSlice.actions;
export default noteSlice.reducer;