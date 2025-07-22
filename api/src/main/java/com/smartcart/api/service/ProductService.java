package com.smartcart.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.smartcart.api.model.dto.ProductDTO;

public interface ProductService {
    Page<ProductDTO> getProductsIsBestSeller(Pageable pageable);
}
