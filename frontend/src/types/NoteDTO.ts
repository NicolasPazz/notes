export type NoteDTO = {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  categoryIds: number[];
};