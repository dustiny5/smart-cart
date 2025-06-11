package com.smartcart.api.model.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.smartcart.api.model.dto.CategoryDTO;
import com.smartcart.api.model.entity.Category;

@Mapper(componentModel = "spring", uses = ProductMapper.class)
public interface CategoryMapper {

    CategoryDTO toDTO(Category category);
    Category toEntity(CategoryDTO categoryDTO);

    List<CategoryDTO> toDTOs(List<Category> categories);
    List<Category> toEntities(List<CategoryDTO> categoryDTOs);

}
