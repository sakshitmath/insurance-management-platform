package com.insurance.backend.repository;

import com.insurance.backend.entity.PremiumPayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PremiumPaymentRepository extends JpaRepository<PremiumPayment, Long> {

    List<PremiumPayment> findByPolicyId(Long policyId);

    List<PremiumPayment> findByPaymentStatus(String paymentStatus);
}