package com.smartcart.api.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;

public class JwtCookieToHeaderFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String jwtToken = null;
        if (request.getCookies() != null) {
            Optional<Cookie> jwtCookie = Arrays.stream(request.getCookies())
                    .filter(c -> "jwt".equals(c.getName()))
                    .findFirst();

            if (jwtCookie.isPresent()) {
                jwtToken = jwtCookie.get().getValue();
            }
        }

        if (jwtToken != null && request.getHeader("Authorization") == null) {
            final String token = jwtToken;

            HttpServletRequest wrappedRequest = new HttpServletRequestWrapper(request) {
                @Override
                public String getHeader(String name) {
                    if ("Authorization".equalsIgnoreCase(name)) {
                        return "Bearer " + token;
                    }

                    return super.getHeader(name);
                }

                @Override
                public Enumeration<String> getHeaders(String name) {
                    if ("Authorization".equalsIgnoreCase(name)) {
                        return Collections.enumeration(List.of("Bearer " + token));
                    }
                    return super.getHeaders(name);
                }

                @Override
                public Enumeration<String> getHeaderNames() {
                    List<String> names = Collections.list(super.getHeaderNames());
                    if (!names.contains("Authorization")) {
                        names.add("Authorization");
                    }
                    return Collections.enumeration(names);
                }
            };
            filterChain.doFilter(wrappedRequest, response);
            return;
        }
        filterChain.doFilter(request, response);
    }
}
