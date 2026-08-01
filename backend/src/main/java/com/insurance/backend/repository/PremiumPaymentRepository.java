package com.insurance.backend.repository;

import com.insurance.backend.entity.PremiumPayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PremiumPaymentRepository extends JpaRepository<PremiumPayment, Long> {

    List<PremiumPayment> findByPolicyId(Long policyId);

    List<PremiumPayment> findByPaymentStatus(String paymentStatus);

    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM PremiumPayment p WHERE p.paymentStatus = 'PAID'")
    BigDecimal getTotalPaidAmount();
}