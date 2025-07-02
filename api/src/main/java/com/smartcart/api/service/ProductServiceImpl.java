package com.smartcart.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartcart.api.exception.NotFoundException;
import com.smartcart.api.model.dto.ProductDTO;
import com.smartcart.api.model.entity.Product;
import com.smartcart.api.model.mapper.ProductMapper;
import com.smartcart.api.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private ProductMapper productMapper;

    @Override
    public List<ProductDTO> getProductsIsBestSeller() {
        List<Product> products = productRepository.findByIsBestSellerTrue();
        if (products.isEmpty()) {
            throw new NotFoundException("No products found");
        }
        return productMapper.toDTOs(products);
    }
}
