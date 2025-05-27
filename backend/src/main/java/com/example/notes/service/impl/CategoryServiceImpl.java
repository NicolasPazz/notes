package com.example.notes.service.impl;

import com.example.notes.dto.CategoryDTO;
import com.example.notes.model.Category;
import com.example.notes.repository.CategoryRepository;
import com.example.notes.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

  private final CategoryRepository categoryRepository;

  @Override
  public List<CategoryDTO> findAll() {
    return categoryRepository.findAll()
        .stream()
        .map(c -> new CategoryDTO(c.getId(), c.getName()))
        .toList();
  }

  @Override
  public CategoryDTO findById(Long id) {
    Category category = categoryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Category not found"));
    return new CategoryDTO(category.getId(), category.getName());
  }

  @Override
  public CategoryDTO save(CategoryDTO categoryDTO) {
    Category category = new Category();
    category.setName(categoryDTO.getName());
    Category saved = categoryRepository.save(category);
    return new CategoryDTO(saved.getId(), saved.getName());
  }

  @Override
  public CategoryDTO update(Long id, CategoryDTO categoryDTO) {
    Category category = categoryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Category not found"));
    category.setName(categoryDTO.getName());
    Category updated = categoryRepository.save(category);
    return new CategoryDTO(updated.getId(), updated.getName());
  }

  @Override
  public void delete(Long id) {
    categoryRepository.deleteById(id);
  }
}