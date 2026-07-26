package com.insurance.backend.repository;

import com.insurance.backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByNameContainingIgnoreCase(String name);

    boolean existsByEmail(String email);
}