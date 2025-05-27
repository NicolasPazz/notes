package com.example.notes.controller;

import com.example.notes.dto.NoteDTO;
import com.example.notes.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

  private final NoteService noteService;

  @PostMapping
  public ResponseEntity<NoteDTO> create(@RequestBody NoteDTO note) {
    return ResponseEntity.ok(noteService.create(note));
  }

  @PutMapping("/{id}")
  public ResponseEntity<NoteDTO> update(@PathVariable Long id, @RequestBody NoteDTO note) {
    return ResponseEntity.ok(noteService.update(id, note));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    noteService.delete(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping
  public ResponseEntity<List<NoteDTO>> getAll(
      @RequestParam(defaultValue = "false") boolean archived,
      @RequestParam(required = false) Long categoryId
  ) {
    return ResponseEntity.ok(noteService.getAll(archived, categoryId));
  }

  @GetMapping("/{id}")
  public ResponseEntity<NoteDTO> getById(@PathVariable Long id) {
    return ResponseEntity.ok(noteService.getById(id));
  }
}