package com.insurance.backend.service;

import com.insurance.backend.dto.ClaimRequest;
import com.insurance.backend.dto.ClaimResponse;
import com.insurance.backend.entity.Claim;
import com.insurance.backend.entity.Policy;
import com.insurance.backend.repository.ClaimRepository;
import com.insurance.backend.repository.PolicyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClaimService {

    private final ClaimRepository claimRepository;
    private final PolicyRepository policyRepository;

    public ClaimResponse submitClaim(ClaimRequest request) {
        Policy policy = policyRepository.findById(request.getPolicyId())
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        if (!policy.getStatus().equals("ACTIVE")) {
            throw new RuntimeException("Cannot submit claim for a non-active policy");
        }

        Claim claim = new Claim();
        claim.setPolicy(policy);
        claim.setClaimAmount(request.getClaimAmount());
        claim.setReason(request.getReason());
        claim.setStatus("PENDING");
        claim.setSubmissionDate(LocalDate.now());

        Claim saved = claimRepository.save(claim);
        return toResponse(saved);
    }

    public List<ClaimResponse> getAllClaims() {
        return claimRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ClaimResponse> getClaimsByPolicy(Long policyId) {
        return claimRepository.findByPolicyId(policyId).stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ClaimResponse> getClaimsByStatus(String status) {
        return claimRepository.findByStatus(status).stream()
                .map(this::toResponse)
                .toList();
    }

    public ClaimResponse approveClaim(Long id) {
        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found"));
        claim.setStatus("APPROVED");
        return toResponse(claimRepository.save(claim));
    }

    public ClaimResponse rejectClaim(Long id) {
        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found"));
        claim.setStatus("REJECTED");
        return toResponse(claimRepository.save(claim));
    }

    private ClaimResponse toResponse(Claim claim) {
        return new ClaimResponse(
                claim.getId(),
                claim.getPolicy().getId(),
                claim.getPolicy().getPolicyNumber(),
                claim.getClaimAmount(),
                claim.getReason(),
                claim.getStatus(),
                claim.getSubmissionDate()
        );
    }

    public org.springframework.data.domain.Page<ClaimResponse> getAllClaimsPaginated(int page, int size) {
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);
        return claimRepository.findAll(pageable).map(this::toResponse);
    }
}