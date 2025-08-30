package com.smartcart.api.controller;

import java.net.URI;
import java.util.List;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.smartcart.api.model.dto.PageResponse;
import com.smartcart.api.model.dto.ProductDTO;
import com.smartcart.api.service.CategoryService;
import com.smartcart.api.service.OrderService;
import com.smartcart.api.service.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

// https://www.baeldung.com/spring-rest-openapi-documentation
@RestController
@RequestMapping("/api")
public class SmartCartController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrderService orderService;

    @Operation(
            summary = "Find all categories with their products",
            description = "Retrieves a list of all categories along with their associated products.",
            responses = {
        @ApiResponse(responseCode = "200", description = "Found all categories with their products",
                content = {
                            @Content(
                                    mediaType = "application/json",
                                    array = @ArraySchema(
                                            schema = @Schema(implementation = CategoryDTO.class)
                                    )
                            )
                        }
                ),
        @ApiResponse(responseCode = "404", description = "Categories not found",
                content = @Content),
        @ApiResponse(responseCode = "500", description = "Server error",
                content = @Content)})
    @GetMapping("/category/products")
    public List<CategoryDTO> getAllCategoryProducts() {
        return categoryService.getAllCategoryProducts();
    }

    @Operation(
            summary = "Find page(s) of best seller products",
            description = "Retrieves page(s) of best selling products.",
            responses = {
        @ApiResponse(responseCode = "200", description = "Find page(s) of best selling products",
                content = {
                    @Content(mediaType = "application/json")}),
        @ApiResponse(responseCode = "404", description = "Products not found",
                content = @Content),
        @ApiResponse(responseCode = "500", description = "Server error",
                content = @Content)})
    @GetMapping("/products/bestSeller")
    public PageResponse<ProductDTO> getProductsIsBestSeller(@ParameterObject Pageable pageable) {
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

    @Operation(
            summary = "Read an order of products.",
            security = {
                @SecurityRequirement(name = "bearerAuth")},
            description = "Read an order of products. This is also used as the shopping cart.",
            responses = {
        @ApiResponse(responseCode = "201", description = "Read successfully",
                content = {
                    @Content(mediaType = "application/json")}),
        @ApiResponse(responseCode = "500", description = "Server error",
                        content = @Content)}
    )
    @GetMapping("/order")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PageResponse<OrderDTO>> getOrder(@ParameterObject Pageable pageable, Long orderId) {
        return ResponseEntity.ok().body(orderService.getOrderById(pageable, orderId));
    }

    @Operation(
            summary = "Create an order of products.",
            security = {
                @SecurityRequirement(name = "bearerAuth")},
            description = "Create an order of products. This is also used as the shopping cart.",
            responses = {
                @ApiResponse(responseCode = "201", description = "Order created successfully",
                content = {
                    @Content(mediaType = "application/json")}),
        @ApiResponse(responseCode = "500", description = "Server error",
                content = @Content)})
    @PostMapping("/order")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<OrderDTO> createOrder(@RequestBody @Valid OrderRequest orderProductRequest, HttpServletRequest request) {
        return ResponseEntity.created(URI.create(request.getRequestURI()))
                .body(orderService.createOrder(orderProductRequest));
    }

    @Operation(
            summary = "Update an order of products.",
            security = {
                @SecurityRequirement(name = "bearerAuth")},
            description = "Update an order of products.",
            responses = {
                @ApiResponse(responseCode = "200", description = "Order updated successfully",
                content = {
                    @Content(mediaType = "application/json")}),
        @ApiResponse(responseCode = "500", description = "Server error",
                content = @Content)})
    @PutMapping("/order")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<OrderDTO> updateOrder(@RequestBody @Valid OrderRequest orderProductRequest) {
        return ResponseEntity.ok()
                .body(orderService.updateOrder(orderProductRequest));
    }

    @Operation(
            summary = "Delete an order of products.",
            security = {
                @SecurityRequirement(name = "bearerAuth")},
            description = "Delete an order of products.",
            responses = {
                @ApiResponse(responseCode = "200", description = "Order deleted successfully",
                        content = {
                            @Content}),
                @ApiResponse(responseCode = "500", description = "Server error",
                        content = @Content)}
    )
    @DeleteMapping("/order/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Boolean> deleteOrder(@PathVariable @Min(1) Long id) {
        return ResponseEntity.ok().body(orderService.deleteOrder(id));
    }

}
