package com.example.notes.repository;

import com.example.notes.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
  List<Note> findByArchived(boolean archived);
  List<Note> findByArchivedAndCategories_Id(boolean archived, Long categoryId);
}