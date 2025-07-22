package com.smartcart.api.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.smartcart.api.exception.InternalServerException;
import com.smartcart.api.exception.NotFoundException;

@RestControllerAdvice
public class ApiExceptionHandler {
    
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public String handleNotFoundException(NotFoundException e) {
        return "Resource not found: " + e.getMessage();
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(InternalServerException.class)
    public String handleInternalServerException(Exception e) {
        return "An unexpected error occurred: " + e.getMessage();
    }
}
