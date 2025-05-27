import api from './axios';
import type { NoteDTO } from '../types/NoteDTO';


export const note = {
  getAll: (archived: boolean = false, categoryId?: number) => {
    const query = new URLSearchParams({ archived: String(archived) });
    if (categoryId !== undefined) query.append('categoryId', String(categoryId));
    return api.get<NoteDTO[]>(`/notes?${query.toString()}`);
  },
  getById: (id: number) => api.get<NoteDTO>(`/notes/${id}`),
  create: (data: Omit<NoteDTO, 'id'>) => api.post<NoteDTO>('/notes', { ...data, archived: false }),
  update: (id: number, data: NoteDTO) => api.put<NoteDTO>(`/notes/${id}`, data),
  delete: (id: number) => api.delete(`/notes/${id}`),
};