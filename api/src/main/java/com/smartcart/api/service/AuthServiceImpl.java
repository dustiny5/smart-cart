package com.smartcart.api.service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.smartcart.api.model.dto.CognitoJwtResponse;
import com.smartcart.api.model.dto.CognitoUserResponse;

@Service
public class AuthServiceImpl implements AuthService {

    @Value("${aws.cognito.client-id}")
    private String clientId;

    @Value("${aws.cognito.client-secret}")
    private String clientSecret;

    @Value("${aws.cognito.token-uri}")
    private String tokenUri;

    @Value("${aws.cognito.redirect-uri}")
    private String redirectUri;

    @Override
    public CognitoUserResponse getCurrentUser(JwtAuthenticationToken token) {
        Jwt jwt = token.getToken();
        CognitoUserResponse cognitoUser = new CognitoUserResponse();
        cognitoUser.setUsername(jwt.getClaimAsString("cognito:username"));
        cognitoUser.setEmail(jwt.getClaimAsString("email"));
        cognitoUser.setGroups(jwt.getClaimAsString("cognito:groups"));
        return cognitoUser;
    }

    /*
     * Code can ONLY be exchanged once.
     */
    @Override
    public CognitoJwtResponse exchangeCodeForToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String auth = clientId + ":" + clientSecret;
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8));
        headers.set("Authorization", "Basic " + encodedAuth);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "authorization_code");
        form.add("code", code);
        form.add("redirect_uri", redirectUri);
        form.add("client_id", clientId);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(form, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<CognitoJwtResponse> response = restTemplate.postForEntity(tokenUri, request, CognitoJwtResponse.class);
        return response.getBody();
    }
}
