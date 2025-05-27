package com.example.notes.service.impl;

import com.example.notes.dto.NoteDTO;
import com.example.notes.model.Category;
import com.example.notes.model.Note;
import com.example.notes.repository.CategoryRepository;
import com.example.notes.repository.NoteRepository;
import com.example.notes.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

  private final NoteRepository noteRepository;
  private final CategoryRepository categoryRepository;

  @Override
  public NoteDTO create(NoteDTO noteDTO) {
    Note note = new Note();
    note.setTitle(noteDTO.getTitle());
    note.setContent(noteDTO.getContent());
    note.setArchived(noteDTO.isArchived());
    note.setCategories(fetchCategories(noteDTO.getCategoryIds()));
    Note saved = noteRepository.save(note);
    return toDTO(saved);
  }

  @Override
  public NoteDTO update(Long id, NoteDTO noteDTO) {
    Note note = noteRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Note not found"));
    note.setTitle(noteDTO.getTitle());
    note.setContent(noteDTO.getContent());
    note.setArchived(noteDTO.isArchived());
    note.setCategories(fetchCategories(noteDTO.getCategoryIds()));
    Note updated = noteRepository.save(note);
    return toDTO(updated);
  }

  @Override
  public void delete(Long id) {
    noteRepository.deleteById(id);
  }

  @Override
  public List<NoteDTO> getAll(boolean archived, Long categoryId) {
    List<Note> notes;

    if (categoryId != null) {
      notes = noteRepository.findByArchivedAndCategories_Id(archived, categoryId);
    } else {
      notes = noteRepository.findByArchived(archived);
    }

    return notes.stream()
        .map(this::toDTO)
        .toList();
  }


  @Override
  public NoteDTO getById(Long id) {
    Note note = noteRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Note not found"));
    return toDTO(note);
  }

  private NoteDTO toDTO(Note note) {
    Set<Long> categoryIds = note.getCategories()
        .stream()
        .map(Category::getId)
        .collect(Collectors.toSet());
    return new NoteDTO(note.getId(), note.getTitle(), note.getContent(), note.isArchived(), categoryIds);
  }

  private Set<Category> fetchCategories(Set<Long> ids) {
    return new HashSet<>(categoryRepository.findAllById(ids));
  }
}