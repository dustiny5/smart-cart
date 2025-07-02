package com.smartcart.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartcart.api.model.dto.CategoryDTO;
import com.smartcart.api.service.CategoryService;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

// https://www.baeldung.com/spring-rest-openapi-documentation
@OpenAPIDefinition(
    info = @Info(
        title = "SmartCart API",
        version = "1.0",
        description = "API for SmartCart application"
    )
)
@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private CategoryService categoryService;

    @Operation(summary = "Find all categories with their products", 
        description = "Retrieves a list of all categories along with their associated products.")
    @ApiResponses(value = { 
    @ApiResponse(responseCode = "200", description = "Found all categories with their products", 
        content = { @Content(mediaType = "application/json") }),
    @ApiResponse(responseCode = "404", description = "Categories not found", 
        content = @Content), 
    @ApiResponse(responseCode = "500", description = "Server error", 
        content = @Content) })
    @GetMapping("/category/products")
    public List<CategoryDTO> getAllCategoryProducts() {
        return categoryService.getAllCategoryProducts();
    }
    
}
