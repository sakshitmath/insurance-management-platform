package com.insurance.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class DashboardStatsResponse {

    private long totalCustomers;
    private long activePolicies;
    private long expiredPolicies;
    private long cancelledPolicies;
    private long pendingClaims;
    private long approvedClaims;
    private long rejectedClaims;
    private BigDecimal totalPremiumCollected;
}