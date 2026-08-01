package com.insurance.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ClaimRequest {

    @NotNull(message = "Policy ID is required")
    private Long policyId;

    @NotNull(message = "Claim amount is required")
    private BigDecimal claimAmount;

    @NotBlank(message = "Reason is required")
    private String reason;
}