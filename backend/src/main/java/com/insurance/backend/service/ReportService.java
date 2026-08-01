package com.insurance.backend.service;

import com.insurance.backend.dto.DashboardStatsResponse;
import com.insurance.backend.repository.ClaimRepository;
import com.insurance.backend.repository.CustomerRepository;
import com.insurance.backend.repository.PolicyRepository;
import com.insurance.backend.repository.PremiumPaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final CustomerRepository customerRepository;
    private final PolicyRepository policyRepository;
    private final ClaimRepository claimRepository;
    private final PremiumPaymentRepository premiumPaymentRepository;

    public DashboardStatsResponse getDashboardStats() {
        return new DashboardStatsResponse(
                customerRepository.count(),
                policyRepository.countByStatus("ACTIVE"),
                policyRepository.countByStatus("EXPIRED"),
                policyRepository.countByStatus("CANCELLED"),
                claimRepository.countByStatus("PENDING"),
                claimRepository.countByStatus("APPROVED"),
                claimRepository.countByStatus("REJECTED"),
                premiumPaymentRepository.getTotalPaidAmount()
        );
    }
}