package com.example.notes.service;

import com.example.notes.dto.NoteDTO;
import java.util.List;

public interface NoteService {
  NoteDTO create(NoteDTO noteDTO);
  NoteDTO update(Long id, NoteDTO noteDTO);
  void delete(Long id);
  List<NoteDTO> getAll(boolean archived, Long categoryId);
  NoteDTO getById(Long id);
}