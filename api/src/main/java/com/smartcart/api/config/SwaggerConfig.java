package com.smartcart.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

// https://www.baeldung.com/springdoc-openapi-form-login-and-basic-authentication
@Configuration
public class SwaggerConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/api/hello").permitAll()
                        .anyRequest().authenticated());
        return http.build();
    }
}
