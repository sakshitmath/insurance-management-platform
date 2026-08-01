package com.insurance.backend.controller;

import com.insurance.backend.dto.PremiumPaymentRequest;
import com.insurance.backend.dto.PremiumPaymentResponse;
import com.insurance.backend.service.PremiumPaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/premiums")
@RequiredArgsConstructor
public class PremiumPaymentController {

    private final PremiumPaymentService premiumPaymentService;

    @PostMapping
    public ResponseEntity<PremiumPaymentResponse> recordPayment(@Valid @RequestBody PremiumPaymentRequest request) {
        return ResponseEntity.ok(premiumPaymentService.recordPayment(request));
    }

    @GetMapping
    public ResponseEntity<List<PremiumPaymentResponse>> getAllPayments() {
        return ResponseEntity.ok(premiumPaymentService.getAllPayments());
    }

    @GetMapping("/policy/{policyId}")
    public ResponseEntity<List<PremiumPaymentResponse>> getPaymentsByPolicy(@PathVariable Long policyId) {
        return ResponseEntity.ok(premiumPaymentService.getPaymentsByPolicy(policyId));
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<PremiumPaymentResponse>> getOverduePayments() {
        return ResponseEntity.ok(premiumPaymentService.getOverduePayments());
    }
}