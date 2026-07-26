package com.insurance.backend.service;

import com.insurance.backend.dto.CustomerRequest;
import com.insurance.backend.dto.CustomerResponse;
import com.insurance.backend.entity.Customer;
import com.insurance.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerResponse createCustomer(CustomerRequest request) {
        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Customer with this email already exists");
        }

        Customer customer = new Customer();
        customer.setName(request.getName());
        customer.setDob(request.getDob());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setEmail(request.getEmail());

        Customer saved = customerRepository.save(customer);
        return toResponse(saved);
    }

    public CustomerResponse getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return toResponse(customer);
    }

    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public List<CustomerResponse> searchByName(String name) {
        return customerRepository.findByNameContainingIgnoreCase(name).stream()
                .map(this::toResponse)
                .toList();
    }

    public CustomerResponse updateCustomer(Long id, CustomerRequest request) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setName(request.getName());
        customer.setDob(request.getDob());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setEmail(request.getEmail());

        Customer updated = customerRepository.save(customer);
        return toResponse(updated);
    }

    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer not found");
        }
        customerRepository.deleteById(id);
    }

    private CustomerResponse toResponse(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getName(),
                customer.getDob(),
                customer.getPhone(),
                customer.getAddress(),
                customer.getEmail()
        );
    }
}