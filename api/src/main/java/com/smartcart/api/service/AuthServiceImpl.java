package com.smartcart.api.service;

import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.nimbusds.jwt.SignedJWT;
import com.smartcart.api.exception.InternalServerException;
import com.smartcart.api.model.dto.CognitoJwtResponse;
import com.smartcart.api.model.dto.CognitoUserInfoResponse;

import jakarta.servlet.http.HttpServletResponse;

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

    @Value("${cookie.secure}")
    private Boolean cookieSecure;

    @Value("${cookie.same-site}")
    private String cookieSameSite;

    @Autowired
    private JwtDecoder jwtDecoder;

    @Override
    public CognitoUserInfoResponse getCurrentUser(String jwt) {
        Jwt jwtDecoded = jwtDecoder.decode(jwt);
        CognitoUserInfoResponse cognitoUser = new CognitoUserInfoResponse();
        cognitoUser.setGivenName(jwtDecoded.getClaimAsString("given_name"));
        return cognitoUser;
    }

    /*
     * Code can ONLY be exchanged once.
     */
    @Override
    public ResponseEntity<CognitoUserInfoResponse> exchangeCodeForToken(String code, HttpServletResponse response) {
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

        HttpEntity<MultiValueMap<String, String>> jwtRequest = new HttpEntity<>(form, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<CognitoJwtResponse> jwtResponse = restTemplate.postForEntity(tokenUri, jwtRequest, CognitoJwtResponse.class);

        if (jwtResponse.getStatusCode().is2xxSuccessful() && jwtResponse.getBody() != null) {
            String idToken = jwtResponse.getBody().getId_token();

            try {
                SignedJWT signedJWT = SignedJWT.parse(idToken);
                String givenName = signedJWT.getJWTClaimsSet().getStringClaim("given_name");
                Long expiresIn = (signedJWT.getJWTClaimsSet().getExpirationTime().getTime() - signedJWT.getJWTClaimsSet().getIssueTime().getTime()) / 1000;
                ResponseCookie jwtCookie = ResponseCookie.from("jwt", idToken)
                        .httpOnly(true)
                        .secure(cookieSecure)
                        .path("/")
                        .maxAge(expiresIn)
                        .sameSite(cookieSameSite)
                        .build();
                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                        .body(new CognitoUserInfoResponse(givenName));

            } catch (ParseException ex) {
                throw new InternalServerException("Failed to parse JWT token");
            }

        }
        throw new InternalServerException("Failed to exchange code for token or token is null");
    }
}
