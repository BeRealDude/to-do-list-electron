import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/hook';
import Notes from '../Notes/Notes';
import { fetchNotesAsync, addNoteAsync } from '../../services/noteSlice';
import NotesList from '../NotesList/NotesList';
import './App.css';


function App() {
  
const [text, setText] = useState('');
const dispatch = useAppDispatch();

useEffect(() => {
  dispatch(fetchNotesAsync());
}, [dispatch]);

const handleAction = () => {

  console.log("handleAction вызван"); 
    
  if (text.trim().length) {
    console.log("Отправляем в Redux:", text);
    const data = {
      title: text,
      text,
      completed: false,
      importance: false,
      synced: false
    };
    console.log(data, 'data')
    dispatch(addNoteAsync(data));
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
