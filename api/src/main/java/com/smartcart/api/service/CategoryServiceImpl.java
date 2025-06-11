package com.smartcart.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartcart.api.model.dto.CategoryDTO;
import com.smartcart.api.model.mapper.CategoryMapper;
import com.smartcart.api.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public List<CategoryDTO> getAllCategoryProducts() {
        return categoryMapper.toDTOs(categoryRepository.findAll());
    }
}
