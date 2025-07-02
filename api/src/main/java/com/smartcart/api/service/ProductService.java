package com.smartcart.api.service;

import java.util.List;

import com.smartcart.api.model.dto.ProductDTO;

public interface ProductService {
    List<ProductDTO> getProductsIsBestSeller();
}
