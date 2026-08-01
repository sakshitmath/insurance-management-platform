package com.insurance.backend.controller;

import com.insurance.backend.dto.PolicyRequest;
import com.insurance.backend.dto.PolicyResponse;
import com.insurance.backend.service.PolicyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/policies")
@RequiredArgsConstructor
public class PolicyController {

    private final PolicyService policyService;

    @PostMapping
    public ResponseEntity<PolicyResponse> createPolicy(@Valid @RequestBody PolicyRequest request) {
        return ResponseEntity.ok(policyService.createPolicy(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PolicyResponse> getPolicy(@PathVariable Long id) {
        return ResponseEntity.ok(policyService.getPolicyById(id));
    }

    @GetMapping
    public ResponseEntity<List<PolicyResponse>> getAllPolicies() {
        return ResponseEntity.ok(policyService.getAllPolicies());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<PolicyResponse>> getPoliciesByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(policyService.getPoliciesByCustomer(customerId));
    }

    @GetMapping("/active")
    public ResponseEntity<List<PolicyResponse>> getActivePolicies() {
        return ResponseEntity.ok(policyService.getActivePolicies());
    }

    @PutMapping("/{id}/renew")
    public ResponseEntity<PolicyResponse> renewPolicy(@PathVariable Long id, @RequestParam LocalDate newEndDate) {
        return ResponseEntity.ok(policyService.renewPolicy(id, newEndDate));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<PolicyResponse> cancelPolicy(@PathVariable Long id) {
        return ResponseEntity.ok(policyService.cancelPolicy(id));
    }

    @GetMapping("/paginated")
    public ResponseEntity<org.springframework.data.domain.Page<PolicyResponse>> getPoliciesPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(policyService.getAllPoliciesPaginated(page, size));
    }
}