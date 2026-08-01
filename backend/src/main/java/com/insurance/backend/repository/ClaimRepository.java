package com.insurance.backend.repository;

import com.insurance.backend.entity.Claim;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Long> {

    List<Claim> findByPolicyId(Long policyId);

    List<Claim> findByStatus(String status);
}