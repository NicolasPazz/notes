package com.example.notes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteDTO {
  private Long id;

  @NotBlank
  @Size(max = 100)
  @Pattern(regexp = "^[\\p{L}\\p{N} \\-_'!@#&()\\[\\]{}:;,.?/\\\\*]+$", message = "Invalid characters in title")
  private String title;

  @Size(max = 1000)
  @Pattern(regexp = "^[\\p{L}\\p{N} \\-_'!@#&()\\[\\]{}:;,.?/\\\\*]+$", message = "Invalid characters in content")
  private String content;

  private boolean archived;
  private Set<Long> categoryIds;
}