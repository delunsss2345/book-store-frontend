// ─── Note Types ───────────────────────────────────────────────────────────────

export type NoteType = "page_mark" | "quote" | "other";

export interface BookNote {
  id: string;
  bookId: string;
  type: NoteType;
  content: string;
  /** For page_mark: the page number (stored as string for flexibility) */
  pageNumber?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// ─── Library Book Entry ────────────────────────────────────────────────────────

/** A book in the user's personal library (derived from purchased orders) */
export interface LibraryBook {
  bookId: string;
  title: string;
  coverImageUrl: string | null;
  slug: string | null;
}

// ─── Note Service Interface ────────────────────────────────────────────────────
// Abstraction layer: swap localStorage ↔ API without changing hooks

export interface NoteServiceAdapter {
  getAll: (bookId: string) => Promise<BookNote[]>;
  create: (
    bookId: string,
    payload: Omit<BookNote, "id" | "bookId" | "createdAt" | "updatedAt">,
  ) => Promise<BookNote>;
  update: (
    noteId: string,
    payload: Partial<Pick<BookNote, "content" | "pageNumber">>,
  ) => Promise<BookNote>;
  remove: (noteId: string) => Promise<void>;
}
