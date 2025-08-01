package com.smartcart.api.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.smartcart.api.model.dto.ProductDTO;

public interface ProductService {

    Page<ProductDTO> getProductsIsBestSeller(Pageable pageable);

    List<ProductDTO> getProductsSimilarName(String name);
}
