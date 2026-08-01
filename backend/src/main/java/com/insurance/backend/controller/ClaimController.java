package com.insurance.backend.controller;

import com.insurance.backend.dto.ClaimRequest;
import com.insurance.backend.dto.ClaimResponse;
import com.insurance.backend.service.ClaimService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@RequiredArgsConstructor
public class ClaimController {

    private final ClaimService claimService;

    @PostMapping
    public ResponseEntity<ClaimResponse> submitClaim(@Valid @RequestBody ClaimRequest request) {
        return ResponseEntity.ok(claimService.submitClaim(request));
    }

    @GetMapping
    public ResponseEntity<List<ClaimResponse>> getAllClaims() {
        return ResponseEntity.ok(claimService.getAllClaims());
    }

    @GetMapping("/policy/{policyId}")
    public ResponseEntity<List<ClaimResponse>> getClaimsByPolicy(@PathVariable Long policyId) {
        return ResponseEntity.ok(claimService.getClaimsByPolicy(policyId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ClaimResponse>> getClaimsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(claimService.getClaimsByStatus(status));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<ClaimResponse> approveClaim(@PathVariable Long id) {
        return ResponseEntity.ok(claimService.approveClaim(id));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<ClaimResponse> rejectClaim(@PathVariable Long id) {
        return ResponseEntity.ok(claimService.rejectClaim(id));
    }
}