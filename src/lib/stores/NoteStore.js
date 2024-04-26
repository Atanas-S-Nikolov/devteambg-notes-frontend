import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useNoteStore = create(
  devtools(
    persist(
      (set, get) => ({
        notes: [],
        addNote: (note) => set({ notes: [...get().notes, note] }),
        getNote: (id) => get().notes.find((note) => note.id === id),
        updateNote: (note) => {
          if (note) {
            const notes = [...get().notes];
            const index = notes.findIndex((n) => n.id === note.id);
            const existing = notes[index];
            note.id = existing.id;
            notes.splice(index, 1, note);
            set({ notes: [...notes] });
          }
        },
        removeNote: (note) => {
          if (note) {
            const notes = [...get().notes];
            const index = notes.indexOf(note);
            notes.splice(index, 1);
            set({ notes: [...notes] });
          }
        },
      }),
      {
        name: "note-storage",
      }
    )
  )
);
