"use client";

import { useLibraryStore } from "@/features/library/store/library.store";
import useTranslator from "@/hooks/use-translator";
import { Button } from "@/src/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import type { BookNote, NoteType } from "@/types/library";
import { BookmarkCheck, Pencil, Quote, StickyNote, Trash2 } from "lucide-react";
import { useState } from "react";
import { NoteForm } from "../NoteForm";

interface NoteListProps {
  bookId: string;
}

const NOTE_ICONS: Record<NoteType, React.ReactNode> = {
  page_mark: <BookmarkCheck className="h-3.5 w-3.5" />,
  quote: <Quote className="h-3.5 w-3.5" />,
  other: <StickyNote className="h-3.5 w-3.5" />,
};

// ─── Single Note Card ─────────────────────────────────────────────────────────

function NoteCard({
  note,
  bookId,
  onEdit,
}: {
  note: BookNote;
  bookId: string;
  onEdit: (note: BookNote) => void;
}) {
  const { t } = useTranslator();
  const { deleteNote } = useLibraryStore();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const date = new Date(note.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group relative rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Header row */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {note.pageNumber && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              {NOTE_ICONS.page_mark}
              {t("library.detail.noteCard.page", { page: note.pageNumber })}
            </span>
          )}
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {confirmDelete ? (
            <>
              <Button
                variant="destructive"
                size="sm"
                className="h-7 text-xs"
                onClick={() => deleteNote(note.id, bookId)}
              >
                {t("library.detail.noteCard.deleteConfirm")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setConfirmDelete(false)}
              >
                {t("library.detail.form.cancel")}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onEdit(note)}
                aria-label={t("library.detail.noteCard.edit")}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => setConfirmDelete(true)}
                aria-label={t("library.detail.noteCard.delete")}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
        {note.content}
      </p>
    </article>
  );
}

// ─── Tab Panel ────────────────────────────────────────────────────────────────

function TabPanel({
  notes,
  bookId,
  emptyText,
  editingNote,
  onEdit,
}: {
  notes: BookNote[];
  bookId: string;
  emptyText: string;
  editingNote: BookNote | null;
  onEdit: (note: BookNote | null) => void;
}) {
  if (notes.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground italic">
        {emptyText}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((note) =>
        editingNote?.id === note.id ? (
          <NoteForm
            key={note.id}
            bookId={bookId}
            editingNote={note}
            onCancelEdit={() => onEdit(null)}
          />
        ) : (
          <NoteCard
            key={note.id}
            note={note}
            bookId={bookId}
            onEdit={onEdit}
          />
        ),
      )}
    </div>
  );
}

// ─── Main NoteList ────────────────────────────────────────────────────────────

export const NoteList = ({ bookId }: NoteListProps) => {
  const { t } = useTranslator();
  const notes = useLibraryStore((s) => s.notesByBook[bookId]) ?? [];
  const [editingNote, setEditingNote] = useState<BookNote | null>(null);

  const byType = (type: NoteType) =>
    notes.filter((n) => n.type === type).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

  const NOTE_TYPES: NoteType[] = ["page_mark", "quote", "other"];

  const tabLabel = (type: NoteType) => {
    const key = `library.detail.tabs.${type}` as const;
    const count = byType(type).length;
    return `${t(key)}${count > 0 ? ` (${count})` : ""}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-base font-semibold tracking-tight text-foreground">
        {t("library.detail.notesTitle")}
      </h2>

      <Tabs defaultValue="page_mark" className="w-full">
        <TabsList className="mb-4 h-auto flex-wrap gap-1 p-1">
          {NOTE_TYPES.map((type) => (
            <TabsTrigger key={type} value={type} className="flex items-center gap-1.5 text-xs">
              {NOTE_ICONS[type]}
              {tabLabel(type)}
            </TabsTrigger>
          ))}
        </TabsList>

        {NOTE_TYPES.map((type) => (
          <TabsContent key={type} value={type}>
            <TabPanel
              notes={byType(type)}
              bookId={bookId}
              emptyText={t("library.detail.notesEmpty")}
              editingNote={editingNote}
              onEdit={setEditingNote}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
