package com.insurance.backend.service;

import com.insurance.backend.dto.DocumentResponse;
import com.insurance.backend.entity.Customer;
import com.insurance.backend.entity.Document;
import com.insurance.backend.repository.CustomerRepository;
import com.insurance.backend.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final CustomerRepository customerRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public DocumentResponse uploadDocument(Long customerId, MultipartFile file) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath);

            Document document = new Document();
            document.setCustomer(customer);
            document.setFileName(file.getOriginalFilename());
            document.setFilePath(filePath.toString());
            document.setUploadedAt(LocalDateTime.now());

            Document saved = documentRepository.save(document);
            return toResponse(saved);

        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + e.getMessage());
        }
    }

    public List<DocumentResponse> getDocumentsByCustomer(Long customerId) {
        return documentRepository.findByCustomerId(customerId).stream()
                .map(this::toResponse)
                .toList();
    }

    public Resource downloadDocument(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        try {
            Path filePath = Paths.get(document.getFilePath());
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                throw new RuntimeException("File not found on server");
            }
            return resource;

        } catch (MalformedURLException e) {
            throw new RuntimeException("File path error: " + e.getMessage());
        }
    }

    private DocumentResponse toResponse(Document document) {
        return new DocumentResponse(
                document.getId(),
                document.getCustomer().getId(),
                document.getFileName(),
                document.getUploadedAt()
        );
    }
}