package com.insurance.backend.service;

import com.insurance.backend.dto.PolicyRequest;
import com.insurance.backend.dto.PolicyResponse;
import com.insurance.backend.entity.Customer;
import com.insurance.backend.entity.Policy;
import com.insurance.backend.repository.CustomerRepository;
import com.insurance.backend.repository.PolicyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PolicyService {

    private final PolicyRepository policyRepository;
    private final CustomerRepository customerRepository;

    public PolicyResponse createPolicy(PolicyRequest request) {
        if (policyRepository.existsByPolicyNumber(request.getPolicyNumber())) {
            throw new RuntimeException("Policy number already exists");
        }

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Policy policy = new Policy();
        policy.setCustomer(customer);
        policy.setPolicyType(request.getPolicyType());
        policy.setPolicyNumber(request.getPolicyNumber());
        policy.setPremiumAmount(request.getPremiumAmount());
        policy.setStartDate(request.getStartDate());
        policy.setEndDate(request.getEndDate());
        policy.setStatus("ACTIVE");

        Policy saved = policyRepository.save(policy);
        return toResponse(saved);
    }

    public PolicyResponse getPolicyById(Long id) {
        Policy policy = policyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy not found"));
        return toResponse(policy);
    }

    public List<PolicyResponse> getAllPolicies() {
        return policyRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public List<PolicyResponse> getPoliciesByCustomer(Long customerId) {
        return policyRepository.findByCustomerId(customerId).stream()
                .map(this::toResponse)
                .toList();
    }

    public List<PolicyResponse> getActivePolicies() {
        return policyRepository.findByStatus("ACTIVE").stream()
                .map(this::toResponse)
                .toList();
    }

    public PolicyResponse renewPolicy(Long id, LocalDate newEndDate) {
        Policy policy = policyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        policy.setEndDate(newEndDate);
        policy.setStatus("ACTIVE");

        Policy updated = policyRepository.save(policy);
        return toResponse(updated);
    }

    public PolicyResponse cancelPolicy(Long id) {
        Policy policy = policyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        policy.setStatus("CANCELLED");

        Policy updated = policyRepository.save(policy);
        return toResponse(updated);
    }

    private PolicyResponse toResponse(Policy policy) {
        return new PolicyResponse(
                policy.getId(),
                policy.getCustomer().getId(),
                policy.getCustomer().getName(),
                policy.getPolicyType(),
                policy.getPolicyNumber(),
                policy.getPremiumAmount(),
                policy.getStartDate(),
                policy.getEndDate(),
                policy.getStatus()
        );
    }
}