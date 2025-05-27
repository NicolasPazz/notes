import { useEffect, useState } from "react";
import { note as noteAPI } from "../api/note";
import { category as categoryAPI } from "../api/category";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import CategoryFilter from "../components/CategoryFilter.tsx";
import PageHeader from "../components/PageHeader";
import type { NoteDTO } from "../types/NoteDTO";
import type { CategoryDTO } from "../types/CategoryDTO";

const NotesPage = () => {
    const [notes, setNotes] = useState<NoteDTO[]>([]);
    const [archived, setArchived] = useState(false);
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [noteToEdit, setNoteToEdit] = useState<NoteDTO | null>(null);

    const fetchNotes = () => {
        noteAPI
            .getAll(archived, categoryId)
            .then((res) => {
                setNotes(res.data);

                if (
                    categoryId !== undefined &&
                    !res.data.some((note) =>
                        note.categoryIds.includes(categoryId)
                    )
                ) {
                    setCategoryId(undefined);
                }
            })
            .catch((err) => console.error("Error fetching notes", err));
    };

    const fetchCategories = () => {
        categoryAPI
            .getAll()
            .then((res) => setCategories(res.data))
            .catch((err) => console.error("Error fetching categories", err));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchNotes();
    }, [archived, categoryId]);

    const handleNoteCreatedOrUpdated = () => {
        fetchNotes();
        fetchCategories();
        setNoteToEdit(null);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this note?")) {
            await noteAPI.delete(id);
            if (noteToEdit?.id === id) {
                setNoteToEdit(null);
            }
            fetchNotes();
        }
    };

    const relatedCategoryIds = new Set(
        notes.flatMap((note) => note.categoryIds)
    );
    const relatedCategories = categories.filter((cat) =>
        relatedCategoryIds.has(cat.id)
    );

    return (
        <div className="p-6">
            <CategoryFilter
                selectedCategoryId={categoryId}
                onChange={setCategoryId}
                categories={relatedCategories}
            />

            <PageHeader
                archived={archived}
                onToggle={() => setArchived((prev) => !prev)}
            />

            {!archived && !noteToEdit && (
                <NoteForm
                    onSubmit={handleNoteCreatedOrUpdated}
                    onCategoryChange={fetchCategories}
                    categories={categories}
                />
            )}

            {noteToEdit && (
                <NoteForm
                    onSubmit={handleNoteCreatedOrUpdated}
                    onCategoryChange={fetchCategories}
                    note={noteToEdit}
                    categories={categories}
                />
            )}

            <NoteList
                notes={notes}
                archived={archived}
                onEdit={setNoteToEdit}
                onDelete={handleDelete}
                onToggleArchive={async (note) => {
                    const updated = { ...note, archived: !note.archived };
                    await noteAPI.update(note.id, updated);
                    fetchNotes();
                }}
            />
        </div>
    );
};

export default NotesPage;