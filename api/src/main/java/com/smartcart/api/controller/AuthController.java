package com.smartcart.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartcart.api.model.dto.CognitoJwtResponse;
import com.smartcart.api.model.dto.CognitoUserResponse;
import com.smartcart.api.service.AuthService;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/user")
    public CognitoUserResponse getCurrentUser(JwtAuthenticationToken token) {
        return authService.getCurrentUser(token);
    }

    @PostMapping("/code/token")
    public CognitoJwtResponse exchangeCodeForToken(@RequestParam String code) {
        return authService.exchangeCodeForToken(code);
    }

}
