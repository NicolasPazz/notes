import type { NoteDTO } from '../types/NoteDTO';

type Props = {
  note: NoteDTO;
  archived: boolean;
  onToggleArchive: (note: NoteDTO) => void;
  onEdit: (note: NoteDTO) => void;
  onDelete: (id: number) => void;
};

const NoteItem = ({ note, archived, onToggleArchive, onEdit, onDelete }: Props) => (
  <li className="p-4 bg-white rounded shadow flex justify-between items-center">
    <div>
      <strong className="text-lg block">{note.title}</strong>
      <span className="text-gray-700 block">{note.content}</span>
    </div>
    <div className="flex gap-2 items-center ml-4">
      <label className="text-sm">
        <input
          type="checkbox"
          checked={note.archived}
          onChange={() => onToggleArchive(note)}
        />
        <span className="ml-1">Archived</span>
      </label>
      {!archived && (
        <button
          onClick={() => onEdit(note)}
          className="bg-yellow-500 text-black px-2 py-1 rounded"
        >
          Edit
        </button>
      )}
      <button
        onClick={() => onDelete(note.id)}
        className="bg-red-600 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </div>
  </li>
);

export default NoteItem;
