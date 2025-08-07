package com.smartcart.api.controller;

import java.net.URI;
import java.util.List;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartcart.api.model.dto.CategoryDTO;
import com.smartcart.api.model.dto.OrderDTO;
import com.smartcart.api.model.dto.OrderRequest;
import com.smartcart.api.model.dto.ProductDTO;
import com.smartcart.api.service.CategoryService;
import com.smartcart.api.service.OrderService;
import com.smartcart.api.service.ProductService;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

// https://www.baeldung.com/spring-rest-openapi-documentation
@OpenAPIDefinition(
        info = @Info(
                title = "SmartCart API",
                version = "1.0",
                description = "API for SmartCart Application"
        )
)
@RestController
@RequestMapping("/api")
public class SmartCartController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrderService orderService;

    @Operation(summary = "Find all categories with their products",
            description = "Retrieves a list of all categories along with their associated products.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Found all categories with their products",
                content = {
                    @Content(mediaType = "application/json")}),
        @ApiResponse(responseCode = "404", description = "Categories not found",
                content = @Content),
        @ApiResponse(responseCode = "500", description = "Server error",
                content = @Content)})
    @GetMapping("/category/products")
    public List<CategoryDTO> getAllCategoryProducts() {
        return categoryService.getAllCategoryProducts();
    }

    @Operation(summary = "Find page(s) of best seller products",
            description = "Retrieves page(s) of best selling products.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Find page(s) of best selling products",
                content = {
                    @Content(mediaType = "application/json")}),
        @ApiResponse(responseCode = "404", description = "Products not found",
                content = @Content),
        @ApiResponse(responseCode = "500", description = "Server error",
                content = @Content)})
    @GetMapping("/products/bestSeller")
    public Page<ProductDTO> getProductsIsBestSeller(@ParameterObject Pageable pageable) {
        return productService.getProductsIsBestSeller(pageable);
    }

    @Operation(summary = "Search for similar named products.",
            description = "Search for similar named products.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Find similar named products",
                content = {
                    @Content(mediaType = "application/json")}),
        @ApiResponse(responseCode = "404", description = "Products not found",
                content = @Content),
        @ApiResponse(responseCode = "500", description = "Server error",
                content = @Content)})
    @GetMapping("/products/similar/{name}")
    public List<ProductDTO> getProductsSimilarName(@PathVariable @NotBlank String name) {
        return productService.getProductsSimilarName(name);
    }

    // TODO: Add RBAC for logged in users
    @Operation(summary = "Read an order of products.",
            description = "Read an order of products. This is also used as the shopping cart.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Read successfully",
                content = {
                    @Content(mediaType = "application/json")}),
        @ApiResponse(responseCode = "500", description = "Server error",
                content = @Content)})
    @GetMapping("/order")
    public ResponseEntity<Page<OrderDTO>> getOrder(@ParameterObject Pageable pageable, Long orderId) {
        return ResponseEntity.ok().body(orderService.getOrderById(pageable, orderId));
    }

    // TODO: Add RBAC for logged in users
    @Operation(summary = "Create an order of products.",
            description = "Create an order of products. This is also used as the shopping cart.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Order created successfully",
                content = {
                    @Content(mediaType = "application/json")}),
        @ApiResponse(responseCode = "500", description = "Server error",
                content = @Content)})
    @PostMapping("/order")
    public ResponseEntity<OrderDTO> createOrder(@RequestBody @Valid OrderRequest orderProductRequest, HttpServletRequest request) {
        return ResponseEntity.created(URI.create(request.getRequestURI()))
                .body(orderService.createOrder(orderProductRequest));
    }

    // TODO: Add RBAC for logged in users
    @Operation(summary = "Update an order of products.",
            description = "Update an order of products.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Order updated successfully",
                content = {
                    @Content(mediaType = "application/json")}),
        @ApiResponse(responseCode = "500", description = "Server error",
                content = @Content)})
    @PutMapping("/order")
    public ResponseEntity<OrderDTO> updateOrder(@RequestBody @Valid OrderRequest orderProductRequest) {
        return ResponseEntity.ok()
                .body(orderService.updateOrder(orderProductRequest));
    }

    // TODO: Add RBAC for logged in users
    @Operation(summary = "Delete an order of products.",
            description = "Delete an order of products.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Order deleted successfully",
                content = {
                    @Content}),
        @ApiResponse(responseCode = "500", description = "Server error",
                content = @Content)})
    @DeleteMapping("/order/{id}")

    public ResponseEntity<Boolean> deleteOrder(@PathVariable @Min(1) Long id) {
        return ResponseEntity.ok().body(orderService.deleteOrder(id));
    }

}
