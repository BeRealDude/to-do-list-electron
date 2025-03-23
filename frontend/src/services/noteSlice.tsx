import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note, ListState } from "../utils/types";
import { v4 as uuidv4 } from "uuid";
import { addNoteToDB, getNotesFromDB, removeNoteFromDB } from "../utils/db";

const initialState: ListState = {
  list: [],
};

const strDate = () => {
  const date = new Date();
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

// Загрузка заметок из БД
export const fetchNotesAsync = createAsyncThunk("notes/fetch", async () => {
  return await getNotesFromDB();
});
// Добавление заметки в БД
export const addNoteAsync = createAsyncThunk(
  "notes/add",
  async (note: Omit<Note, "id" | "date">) => {
    const newNote: Note = {
      id: uuidv4(),
      date: strDate(),
      ...note,
    };

    await addNoteToDB(newNote);
    return newNote;
  }
);

// Удаление заметки
export const removeNoteAsync = createAsyncThunk(
  "notes/remove",
  async (id: string) => {
    await removeNoteFromDB(id);
    return id;
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    removeNote: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((n) => n.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const toggledNote = state.list.find((n) => n.id === action.payload);
      if (toggledNote) {
        toggledNote.completed = !toggledNote.completed;
      }
    },
    toggleImportant: (state, action: PayloadAction<string>) => {
      const toggledNote = state.list.find((n) => n.id === action.payload);
      if (toggledNote) {
        toggledNote.importance = !toggledNote.importance;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesAsync.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeNoteAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((n) => n.id !== action.payload);
      });
  },
});

export const { removeNote, toggleComplete, toggleImportant } = noteSlice.actions;
export default noteSlice.reducer;