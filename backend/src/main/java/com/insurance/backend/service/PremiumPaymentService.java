package com.insurance.backend.service;

import com.insurance.backend.dto.PremiumPaymentRequest;
import com.insurance.backend.dto.PremiumPaymentResponse;
import com.insurance.backend.entity.Policy;
import com.insurance.backend.entity.PremiumPayment;
import com.insurance.backend.repository.PolicyRepository;
import com.insurance.backend.repository.PremiumPaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PremiumPaymentService {

    private final PremiumPaymentRepository premiumPaymentRepository;
    private final PolicyRepository policyRepository;

    public PremiumPaymentResponse recordPayment(PremiumPaymentRequest request) {
        Policy policy = policyRepository.findById(request.getPolicyId())
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        PremiumPayment payment = new PremiumPayment();
        payment.setPolicy(policy);
        payment.setPaymentDate(request.getPaymentDate());
        payment.setAmount(request.getAmount());
        payment.setPaymentStatus("PAID");

        PremiumPayment saved = premiumPaymentRepository.save(payment);
        return toResponse(saved);
    }

    public List<PremiumPaymentResponse> getPaymentsByPolicy(Long policyId) {
        return premiumPaymentRepository.findByPolicyId(policyId).stream()
                .map(this::toResponse)
                .toList();
    }

    public List<PremiumPaymentResponse> getAllPayments() {
        return premiumPaymentRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public List<PremiumPaymentResponse> getOverduePayments() {
        return premiumPaymentRepository.findByPaymentStatus("OVERDUE").stream()
                .map(this::toResponse)
                .toList();
    }

    public void markOverduePayments() {
        List<PremiumPayment> pending = premiumPaymentRepository.findByPaymentStatus("PENDING");
        for (PremiumPayment payment : pending) {
            if (payment.getPaymentDate().isBefore(LocalDate.now())) {
                payment.setPaymentStatus("OVERDUE");
                premiumPaymentRepository.save(payment);
            }
        }
    }

    private PremiumPaymentResponse toResponse(PremiumPayment payment) {
        return new PremiumPaymentResponse(
                payment.getId(),
                payment.getPolicy().getId(),
                payment.getPolicy().getPolicyNumber(),
                payment.getPaymentDate(),
                payment.getAmount(),
                payment.getPaymentStatus()
        );
    }
}