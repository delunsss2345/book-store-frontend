"use client";

import { useLibraryStore } from "@/features/library/store/library.store";
import useTranslator from "@/hooks/use-translator";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import type { BookNote, NoteType } from "@/types/library";
import { Plus, X } from "lucide-react";
import { useState } from "react";

const NOTE_TYPES: NoteType[] = ["page_mark", "quote", "other"];

interface NoteFormProps {
  bookId: string;
  /** When provided, the form is in edit mode */
  editingNote?: BookNote | null;
  onCancelEdit?: () => void;
}

const PLACEHOLDER_MAP: Record<NoteType, string> = {
  page_mark: "library.detail.form.contentPlaceholder.page_mark",
  quote: "library.detail.form.contentPlaceholder.quote",
  other: "library.detail.form.contentPlaceholder.other",
};

export const NoteForm = ({ bookId, editingNote, onCancelEdit }: NoteFormProps) => {
  const { t } = useTranslator();
  const { addNote, updateNote } = useLibraryStore();

  const isEditing = !!editingNote;

  const [noteType, setNoteType] = useState<NoteType>(editingNote?.type ?? "page_mark");
  const [content, setContent] = useState(editingNote?.content ?? "");
  const [pageNumber, setPageNumber] = useState(editingNote?.pageNumber ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(isEditing);

  const resetForm = () => {
    setNoteType("page_mark");
    setContent("");
    setPageNumber("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      if (isEditing && editingNote) {
        updateNote(editingNote.id, bookId, {
          content: content.trim(),
          pageNumber: noteType === "page_mark" ? pageNumber : undefined,
        });
        onCancelEdit?.();
      } else {
        addNote(bookId, {
          type: noteType,
          content: content.trim(),
          pageNumber: noteType === "page_mark" ? pageNumber : undefined,
        });
        resetForm();
        setIsOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isEditing && !isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full border-dashed border-border/70 hover:border-primary/40 hover:bg-primary/5 transition-all"
      >
        <Plus className="mr-2 h-4 w-4" />
        {t("library.detail.form.title")}
      </Button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border/60 bg-card p-4 shadow-sm space-y-4"
      aria-label={isEditing ? t("library.detail.form.editTitle") : t("library.detail.form.title")}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          {isEditing ? t("library.detail.form.editTitle") : t("library.detail.form.title")}
        </h3>
        {!isEditing && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => { setIsOpen(false); resetForm(); }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Note Type Select */}
      <div className="space-y-1.5">
        <Label htmlFor={`note-type-${bookId}`} className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {t("library.detail.form.typeLabel")}
        </Label>
        <Select value={noteType} onValueChange={(v) => setNoteType(v as NoteType)} disabled={isEditing}>
          <SelectTrigger id={`note-type-${bookId}`} className="h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {NOTE_TYPES.map((type) => (
              <SelectItem key={type} value={type} className="text-sm">
                {t(`library.detail.form.types.${type}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Page Number (only for page_mark) */}
      {noteType === "page_mark" && (
        <div className="space-y-1.5">
          <Label htmlFor={`page-num-${bookId}`} className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {t("library.detail.form.pageNumberLabel")}
          </Label>
          <Input
            id={`page-num-${bookId}`}
            type="number"
            min={1}
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value)}
            placeholder={t("library.detail.form.pageNumberPlaceholder")}
            className="h-9 text-sm"
          />
        </div>
      )}

      {/* Content */}
      <div className="space-y-1.5">
        <Label htmlFor={`note-content-${bookId}`} className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {t("library.detail.form.contentLabel")}
        </Label>
        <Textarea
          id={`note-content-${bookId}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t(PLACEHOLDER_MAP[noteType])}
          rows={4}
          className="resize-none text-sm leading-relaxed"
          required
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          type="submit"
          size="sm"
          disabled={isSubmitting || !content.trim()}
          className="flex-1"
        >
          {isSubmitting
            ? t("library.detail.form.submitting")
            : isEditing
              ? t("library.detail.form.update")
              : t("library.detail.form.submit")}
        </Button>
        {isEditing && onCancelEdit && (
          <Button type="button" variant="outline" size="sm" onClick={onCancelEdit}>
            {t("library.detail.form.cancel")}
          </Button>
        )}
      </div>
    </form>
  );
};
