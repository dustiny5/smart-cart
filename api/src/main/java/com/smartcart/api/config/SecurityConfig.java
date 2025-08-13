package com.smartcart.api.config;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimValidator;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtIssuerValidator;
import org.springframework.security.oauth2.jwt.JwtTimestampValidator;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.web.authentication.BearerTokenAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// https://www.baeldung.com/springdoc-openapi-form-login-and-basic-authentication
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${aws.cognito.user-pool-id}")
    private String userPoolId;

    @Value("${aws.cognito.region}")
    private String region;

    @Value("${aws.cognito.client-id}")
    private String clientId;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .addFilterBefore(new JwtCookieToHeaderFilter(), BearerTokenAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/order/**", "/api/user").hasRole("USER")
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**",
                        "/swagger-ui.html", "/actuator/health", "/api/category/**",
                        "/api/products/**", "/api/code/token", "api/create/checkout-session")
                .permitAll().anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.decoder(jwtDecoder())
                .jwtAuthenticationConverter(jwtAuthenticationConverter())
                )
                );
        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        String issuerUri = String.format("https://cognito-idp.%s.amazonaws.com/%s", region, userPoolId);
        NimbusJwtDecoder decoder = NimbusJwtDecoder.withIssuerLocation(issuerUri).build();
        decoder.setJwtValidator(jwtValidator());
        return decoder;
    }

    @Bean
    public Converter<Jwt, ? extends AbstractAuthenticationToken> jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            List<String> groups = jwt.getClaimAsStringList("cognito:groups");
            if (groups == null) {
                groups = Collections.emptyList();
            }

            return groups.stream()
                    .map(group -> new SimpleGrantedAuthority("ROLE_" + group.toUpperCase()))
                    .collect(Collectors.toList());
        });
        return converter;
    }

    @Bean
    public OAuth2TokenValidator<Jwt> jwtValidator() {
        String issuer = String.format("https://cognito-idp.%s.amazonaws.com/%s", region, userPoolId);

        OAuth2TokenValidator<Jwt> withIssuer = new JwtIssuerValidator(issuer);
        OAuth2TokenValidator<Jwt> withTimestamp = new JwtTimestampValidator();
        OAuth2TokenValidator<Jwt> withAudience = new JwtClaimValidator<List<String>>("aud", aud -> aud != null && aud.contains(clientId));

        return new DelegatingOAuth2TokenValidator<>(withIssuer, withTimestamp, withAudience);
    }

    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "https://smart-cart-webapp.netlify.app"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
