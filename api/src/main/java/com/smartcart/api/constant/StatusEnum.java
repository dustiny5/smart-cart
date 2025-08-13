package com.smartcart.api.constant;

public enum StatusEnum {

    OPEN("Open"),
    COMPLETED("Completed"),
    CANCELLED("Cancelled");

    private final String status;

    StatusEnum(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

}
