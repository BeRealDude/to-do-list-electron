export type Note = {
    id: string;
    date: string;
    title: string;
    text: string;
    completed: boolean;
    importance: boolean;
    synced: boolean;
}

export type ListState = {
    list: Note[];
  };