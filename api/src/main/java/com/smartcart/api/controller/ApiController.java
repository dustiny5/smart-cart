package com.smartcart.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartcart.api.model.dto.CategoryDTO;
import com.smartcart.api.service.CategoryService;

// https://www.baeldung.com/spring-rest-openapi-documentation
@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private CategoryService categoryService;
    
    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello, World!";
    }

    @GetMapping("/category/products")
    public List<CategoryDTO> getAllCategoryProducts() {
        return categoryService.getAllCategoryProducts();
    }
    
}
