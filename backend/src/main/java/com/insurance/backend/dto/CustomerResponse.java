package com.insurance.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class CustomerResponse {

    private Long id;
    private String name;
    private LocalDate dob;
    private String phone;
    private String address;
    private String email;
}