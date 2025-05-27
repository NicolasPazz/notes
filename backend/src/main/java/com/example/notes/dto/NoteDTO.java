package com.example.notes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteDTO {
  private Long id;
  private String title;
  private String content;
  private boolean archived;
  private Set<Long> categoryIds;
}