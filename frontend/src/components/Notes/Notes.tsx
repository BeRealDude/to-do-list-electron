import React from "react";

interface NewNoteProps {
    value: string,
    updateText: (str: string) => void,
    handleAction: () => void,
}

const Notes: React.FC<NewNoteProps> = ({ value, updateText, handleAction }) => {
   
    return (
      <label>
        <input type="text" 
        placeholder='new note'
        value={value}
        onChange={(e) => updateText(e.target.value)}
        />
      <button onClick={handleAction}>Add note</button>
      </label>
    )
}

export default Notes;