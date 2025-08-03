package com.smartcart.api.model.dto;

import lombok.Data;

@Data
public class CognitoJwtResponse {

    private String access_token;
    private String id_token;
    private String refresh_token;
    private String token_type;
    private Long expires_in;
}
