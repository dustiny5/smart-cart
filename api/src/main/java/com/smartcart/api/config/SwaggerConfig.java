package com.smartcart.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.OAuthFlow;
import io.swagger.v3.oas.models.security.OAuthFlows;
import io.swagger.v3.oas.models.security.Scopes;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

    @Value("${aws.cognito.domain}")
    private String domain;

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Paste your JWT token here")
                        )
                        .addSecuritySchemes("cognito-oauth2",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.OAUTH2)
                                        .flows(new OAuthFlows()
                                                .authorizationCode(new OAuthFlow()
                                                        .authorizationUrl(String.format("%s/oauth2/authorize", domain))
                                                        .tokenUrl(String.format("%s/oauth2/token", domain))
                                                        .scopes(new Scopes()
                                                                .addString("openid", "OpenID")
                                                                .addString("email", "Email")
                                                                .addString("profile", "Profile")
                                                        )
                                                )
                                        )
                        )
                )
                .info(new Info()
                        .title("Smart Cart API")
                        .version("1.0")
                        .description("Authorize API with AWS Cognito")
                )
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .addSecurityItem(new SecurityRequirement().addList("cognito-oauth2"));
    }
}
