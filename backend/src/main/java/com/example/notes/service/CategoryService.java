package com.example.notes.service;

import com.example.notes.dto.CategoryDTO;
import java.util.List;

public interface CategoryService {
  List<CategoryDTO> findAll();
  CategoryDTO findById(Long id);
  CategoryDTO save(CategoryDTO categoryDTO);
  CategoryDTO update(Long id, CategoryDTO categoryDTO);
  void delete(Long id);
}