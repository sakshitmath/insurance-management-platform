package com.insurance.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class ClaimResponse {

    private Long id;
    private Long policyId;
    private String policyNumber;
    private BigDecimal claimAmount;
    private String reason;
    private String status;
    private LocalDate submissionDate;
}