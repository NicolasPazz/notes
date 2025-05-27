import api from './axios';
import type { CategoryDTO } from '../types/CategoryDTO';

export const category = {
  getAll: () => api.get<CategoryDTO[]>('/categories'),
  create: (name: string) => api.post<CategoryDTO>('/categories', { name }),
};