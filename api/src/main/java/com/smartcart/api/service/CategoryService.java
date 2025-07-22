package com.smartcart.api.service;

import java.util.List;

import com.smartcart.api.model.dto.CategoryDTO;

public interface CategoryService {
    List<CategoryDTO> getAllCategoryProducts();
}
