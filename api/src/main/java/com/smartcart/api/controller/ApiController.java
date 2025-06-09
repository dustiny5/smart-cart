package com.smartcart.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// https://www.baeldung.com/spring-rest-openapi-documentation
@RestController
@RequestMapping("/api")
public class ApiController {
    
    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello, World!";
    }
    
}
