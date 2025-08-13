package com.smartcart.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartcart.api.model.dto.CognitoUserInfoResponse;
import com.smartcart.api.service.AuthService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public CognitoUserInfoResponse getCurrentUser(@CookieValue(value = "jwt") String jwt) {
        return authService.getCurrentUser(jwt);
    }

    @PostMapping("/code/token")
    public ResponseEntity<CognitoUserInfoResponse> exchangeCodeForToken(@RequestParam String code, HttpServletResponse response) {
        return authService.exchangeCodeForToken(code, response);
    }

}
