package com.smartcart.api.service;

import org.springframework.http.ResponseEntity;

import com.smartcart.api.model.dto.CognitoUserInfoResponse;

import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

    CognitoUserInfoResponse getCurrentUser(String jwt);

    ResponseEntity<CognitoUserInfoResponse> exchangeCodeForToken(String code, HttpServletResponse response);
}
