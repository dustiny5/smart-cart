package com.smartcart.api.advice;

import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.smartcart.api.exception.ApiError;
import com.smartcart.api.exception.InternalServerException;
import com.smartcart.api.exception.NotFoundException;

import jakarta.servlet.http.HttpServletRequest;

/*
 * Custom definition of errors
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    @Value("${server.error.include-message}")
    private String includeMessage;

    @Value("${server.error.include-stacktrace}")
    private String includeStacktrace;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public String handleNotFoundException(MethodArgumentNotValidException e) {
        return "Bad Inputs: " + e.getMessage();
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({NotFoundException.class})
    public String handleNotFoundException(NotFoundException e) {
        return "Resource not found: " + e.getMessage();
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler({PSQLException.class, DataIntegrityViolationException.class})
    public ResponseEntity<ApiError> handleDataIntegrityViolation(Exception e, HttpServletRequest request) {
        String path = request.getRequestURI();
        ApiError apiError = new ApiError();
        apiError.setStatus(HttpStatus.CONFLICT.value());
        apiError.setError("Conflict");
        apiError.setPath(path);

        if ("always".equals(includeMessage)) {
            apiError.setMessage(e.getMessage());
        }
        if ("always".equals(includeStacktrace)) {
            apiError.setTrace(e.getStackTrace());
        }
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(apiError);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(InternalServerException.class)
    public String handleInternalServerException(Exception e) {
        return "An unexpected error occurred: " + e.getMessage();
    }
}
