import { useState } from 'react';
import { useAppDispatch } from '../../hooks/hook';
import Notes from '../Notes/Notes';
import { addNote } from '../../services/noteSlice';
import NotesList from '../NotesList/NotesList';
import './App.css';


function App() {
  
const [text, setText] = useState('');
const dispatch = useAppDispatch();

const handleAction = () => {
  if (text.trim().length) {
    dispatch(addNote(text));
    setText('');
  }
}

  return (
    <>
      <Notes 
      value={text}
      updateText={setText}
      handleAction={handleAction}
      />
      <NotesList />
    </>
  )
}

export default App
