package com.insurance.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CustomerRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Date of birth is required")
    private LocalDate dob;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
}