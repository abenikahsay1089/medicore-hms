package com.medicore.controller;

import com.medicore.dto.request.PatientRequest;
import com.medicore.dto.response.ApiResponse;
import com.medicore.dto.response.PageResponse;
import com.medicore.dto.response.PatientResponse;
import com.medicore.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
@Tag(name = "Patients", description = "Patient management endpoints")
@SecurityRequirement(name = "Bearer Authentication")
public class PatientController {

    private final PatientService patientService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'NURSE', 'RECEPTIONIST')")
    @Operation(summary = "Register a new patient")
    public ResponseEntity<ApiResponse<PatientResponse>> create(@Valid @RequestBody PatientRequest request) {
        PatientResponse response = patientService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Patient registered", response));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST')")
    @Operation(summary = "List and search patients")
    public ResponseEntity<ApiResponse<PageResponse<PatientResponse>>> findAll(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PageResponse<PatientResponse> response = patientService.findAll(search,
                PageRequest.of(page, size, Sort.by("createdAt").descending()));
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST')")
    @Operation(summary = "Get patient by ID")
    public ResponseEntity<ApiResponse<PatientResponse>> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(patientService.findById(id)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'NURSE', 'RECEPTIONIST')")
    @Operation(summary = "Update patient")
    public ResponseEntity<ApiResponse<PatientResponse>> update(
            @PathVariable UUID id, @Valid @RequestBody PatientRequest request) {
        PatientResponse response = patientService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("Patient updated", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete patient")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        patientService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Patient deleted"));
    }

    @PostMapping("/{id}/documents")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST')")
    @Operation(summary = "Upload patient document")
    public ResponseEntity<ApiResponse<String>> uploadDocument(
            @PathVariable UUID id,
            @RequestParam MultipartFile file,
            @RequestParam String documentType) {
        String fileUrl = patientService.uploadDocument(id, file, documentType);
        return ResponseEntity.ok(ApiResponse.success("Document uploaded", fileUrl));
    }
}
