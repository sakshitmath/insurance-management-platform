package com.insurance.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class PremiumPaymentResponse {

    private Long id;
    private Long policyId;
    private String policyNumber;
    private LocalDate paymentDate;
    private BigDecimal amount;
    private String paymentStatus;
}