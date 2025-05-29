package com.example.notes.repository;

import com.example.notes.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {

  @Query("SELECT DISTINCT n FROM Note n LEFT JOIN FETCH n.categories WHERE n.archived = :archived")
  List<Note> findByArchivedWithCategories(@Param("archived") boolean archived);

  @Query("SELECT DISTINCT n FROM Note n LEFT JOIN FETCH n.categories c WHERE n.archived = :archived AND c.id = :categoryId")
  List<Note> findByArchivedAndCategoryIdWithCategories(@Param("archived") boolean archived, @Param("categoryId") Long categoryId);
}