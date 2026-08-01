package com.insurance.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class DocumentResponse {

    private Long id;
    private Long customerId;
    private String fileName;
    private LocalDateTime uploadedAt;
}