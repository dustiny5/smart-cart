package com.smartcart.api.service;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import com.smartcart.api.model.dto.CognitoJwtResponse;
import com.smartcart.api.model.dto.CognitoUserResponse;

public interface AuthService {

    CognitoUserResponse getCurrentUser(JwtAuthenticationToken token);

    CognitoJwtResponse exchangeCodeForToken(String code);
}
