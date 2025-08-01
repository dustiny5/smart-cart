package com.smartcart.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartcart.api.model.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @EntityGraph(value = "Category.products", type = EntityGraph.EntityGraphType.LOAD)
    List<Category> findAll();
}
