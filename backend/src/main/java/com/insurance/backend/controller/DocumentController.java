package com.insurance.backend.controller;

import com.insurance.backend.dto.DocumentResponse;
import com.insurance.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/upload/{customerId}")
    public ResponseEntity<DocumentResponse> uploadDocument(
            @PathVariable Long customerId,
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(documentService.uploadDocument(customerId, file));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<DocumentResponse>> getDocumentsByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(documentService.getDocumentsByCustomer(customerId));
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id) {
        Resource resource = documentService.downloadDocument(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}