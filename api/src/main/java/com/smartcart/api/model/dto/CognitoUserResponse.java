package com.smartcart.api.model.dto;

import lombok.Data;

@Data
public class CognitoUserResponse {
    private String username;
    private String email;
    private String groups;
}
