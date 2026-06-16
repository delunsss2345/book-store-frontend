import type { BookNote, NoteServiceAdapter } from "@/types/library";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── State ────────────────────────────────────────────────────────────────────

interface LibraryState {
  /** notes keyed by bookId for O(1) lookup */
  notesByBook: Record<string, BookNote[]>;
}

interface LibraryActions {
  addNote: (
    bookId: string,
    payload: Omit<BookNote, "id" | "bookId" | "createdAt" | "updatedAt">,
  ) => BookNote;
  updateNote: (
    noteId: string,
    bookId: string,
    payload: Partial<Pick<BookNote, "content" | "pageNumber">>,
  ) => void;
  deleteNote: (noteId: string, bookId: string) => void;
  getNotesByBookId: (bookId: string) => BookNote[];
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useLibraryStore = create<LibraryState & LibraryActions>()(
  persist(
    (set, get) => ({
      notesByBook: {},

      addNote: (bookId, payload) => {
        const now = new Date().toISOString();
        const newNote: BookNote = {
          id: crypto.randomUUID(),
          bookId,
          createdAt: now,
          updatedAt: now,
          ...payload,
        };

        set((state) => ({
          notesByBook: {
            ...state.notesByBook,
            [bookId]: [...(state.notesByBook[bookId] ?? []), newNote],
          },
        }));

        return newNote;
      },

      updateNote: (noteId, bookId, payload) => {
        set((state) => ({
          notesByBook: {
            ...state.notesByBook,
            [bookId]: (state.notesByBook[bookId] ?? []).map((note) =>
              note.id === noteId
                ? { ...note, ...payload, updatedAt: new Date().toISOString() }
                : note,
            ),
          },
        }));
      },

      deleteNote: (noteId, bookId) => {
        set((state) => ({
          notesByBook: {
            ...state.notesByBook,
            [bookId]: (state.notesByBook[bookId] ?? []).filter(
              (note) => note.id !== noteId,
            ),
          },
        }));
      },

      getNotesByBookId: (bookId) => get().notesByBook[bookId] ?? [],
    }),
    {
      name: "library-notes-storage",
      // When migrating to API: remove persist middleware, inject NoteServiceAdapter
    },
  ),
);

// ─── localStorage Adapter (implements NoteServiceAdapter) ─────────────────────
// To switch to API: create an `apiNoteAdapter` and replace this in hooks.

export const localStorageNoteAdapter: NoteServiceAdapter = {
  getAll: async (bookId) => {
    return useLibraryStore.getState().getNotesByBookId(bookId);
  },
  create: async (bookId, payload) => {
    return useLibraryStore.getState().addNote(bookId, payload);
  },
  update: async (noteId, payload) => {
    // We need bookId — callers must pass it; adapter is used via hooks that carry bookId
    // This is a thin wrapper; hooks call store actions directly for perf.
    throw new Error("Use store actions directly for updateNote");
  },
  remove: async (noteId) => {
    throw new Error("Use store actions directly for deleteNote");
  },
};
