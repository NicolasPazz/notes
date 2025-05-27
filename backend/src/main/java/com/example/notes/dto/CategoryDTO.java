package com.example.notes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@AllArgsConstructor
@Data
public class CategoryDTO {
  private Long id;

  @NotBlank
  @Size(max = 50)
  @Pattern(regexp = "^[\\p{L}\\p{N} \\-_'!@#&()\\[\\]{}:;,.?/\\\\*]+$", message = "Invalid characters in category name")
  private String name;
}