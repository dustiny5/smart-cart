package com.smartcart.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<ProductDTO> getProductsIsBestSeller(Pageable pageable) {
        Page<Product> productPage = productRepository.findByIsBestSellerTrue(pageable);
        if (productPage.getContent().isEmpty()) {
            throw new NotFoundException("No products found");
        }
        return productPage.map(productMapper::toDTO);
    }

    @Override
    public List<ProductDTO> getProductsSimilarName(String name) {
        List<Product> productsSimilarNames = productRepository.findBySimilarName(name);
        if (productsSimilarNames.isEmpty()) {
            throw new NotFoundException("No products found");
        }
        return productMapper.toDTOs(productsSimilarNames);
    }
}
