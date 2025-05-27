import NoteItem from './NoteItem';
import type { NoteDTO } from '../types/NoteDTO';

type Props = {
  notes: NoteDTO[];
  archived: boolean;
  onToggleArchive: (note: NoteDTO) => void;
  onEdit: (note: NoteDTO) => void;
  onDelete: (id: number) => void;
};

const NoteList = ({ notes, archived, onToggleArchive, onEdit, onDelete }: Props) => {
  if (notes.length === 0) {
    return <p>No notes to display.</p>;
  }

  return (
    <ul className="space-y-3 mt-6">
      {notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          archived={archived}
          onToggleArchive={onToggleArchive}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default NoteList;
