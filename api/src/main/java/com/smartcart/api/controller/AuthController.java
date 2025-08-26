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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Operation(
            summary = "Get the current user.",
            description = "Extracts the jwt value from the cookie and returns the user info.",
            responses = {
                @ApiResponse(responseCode = "200", description = "User successfully found.",
                        content = {
                            @Content(mediaType = "application/json")}),
                @ApiResponse(responseCode = "404", description = "User not found.",
                        content = @Content),
                @ApiResponse(responseCode = "400", description = "Please check your inputs.",
                        content = @Content),
                @ApiResponse(responseCode = "500", description = "Server error",
                        content = @Content)})
    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public CognitoUserInfoResponse getCurrentUser(@CookieValue(value = "jwt") String jwt) {
        return authService.getCurrentUser(jwt);
    }

    @Operation(
            summary = "Exchange the code for the token.",
            description = "After logging in from AWS's hosted login a code will be appended to the URL. Use that code to exchange for a token.",
            responses = {
                @ApiResponse(responseCode = "200", description = "Successfully exchange the code for the token.",
                        content = {
                            @Content(mediaType = "application/json")}),
                @ApiResponse(responseCode = "404", description = "Code not found.",
                        content = @Content),
                @ApiResponse(responseCode = "400", description = "Please check your inputs.",
                        content = @Content),
                @ApiResponse(responseCode = "500", description = "Server error",
                        content = @Content)})
    @PostMapping("/code/token")
    public ResponseEntity<CognitoUserInfoResponse> exchangeCodeForToken(@RequestParam String code, HttpServletResponse response) {
        return authService.exchangeCodeForToken(code, response);
    }

}
