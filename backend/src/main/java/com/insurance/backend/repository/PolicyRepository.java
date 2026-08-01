package com.insurance.backend.repository;

import com.insurance.backend.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PolicyRepository extends JpaRepository<Policy, Long> {

    List<Policy> findByCustomerId(Long customerId);

    List<Policy> findByStatus(String status);

    boolean existsByPolicyNumber(String policyNumber);

    long countByStatus(String status);
}