import { useEffect, useState } from "react";
import { note as noteAPI } from "../api/note";
import { category as categoryAPI } from "../api/category";
import type { NoteDTO } from "../types/NoteDTO";
import type { CategoryDTO } from "../types/CategoryDTO";
import CategoryInput from "./CategoryInput";
import CategoryBadges from "./CategoryBadges";

type Props = {
  onSubmit: () => void;
  onCategoryChange: () => void;
  note?: NoteDTO;
  categories: CategoryDTO[];
};

const NoteForm = ({ onSubmit, onCategoryChange, note, categories }: Props) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(note?.categoryIds || []);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setSelectedCategoryIds(note?.categoryIds || []);
  }, [note]);

  const handleCategoryAdd = async () => {
    const name = categoryName.trim();
    if (!name) return;

    let existing = categories.find((c) => c.name.toLowerCase() === name.toLowerCase());

    if (!existing) {
      try {
        const res = await categoryAPI.create(name);
        existing = res.data;
        onCategoryChange();
      } catch (err) {
        console.error("Error creating category", err);
        return;
      }
    }

    if (existing && !selectedCategoryIds.includes(existing.id)) {
      setSelectedCategoryIds((prev) => [...prev, existing!.id]);
    }

    setCategoryName("");
  };

  const handleCategoryRemove = (id: number) => {
    setSelectedCategoryIds((prev) => prev.filter((catId) => catId !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Omit<NoteDTO, "id"> = {
      title,
      content,
      categoryIds: selectedCategoryIds,
      archived: note?.archived ?? false,
    };

    try {
      if (note) {
        await noteAPI.update(note.id, { ...note, ...payload });
      } else {
        await noteAPI.create(payload);
      }
      setTitle("");
      setContent("");
      setCategoryName("");
      setSelectedCategoryIds([]);
      onSubmit();
    } catch (err) {
      console.error("Error saving note", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4 space-y-4">
      <h3 className="text-lg font-semibold">{note ? "Edit Note" : "Create Note"}</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <CategoryInput
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        handleCategoryAdd={handleCategoryAdd}
      />

      <CategoryBadges
        selectedCategoryIds={selectedCategoryIds}
        categories={categories}
        onRemove={handleCategoryRemove}
      />

      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900">
        {note ? "Update Note" : "Create Note"}
      </button>
    </form>
  );
};

export default NoteForm;