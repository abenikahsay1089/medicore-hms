package com.medicore.service;

import com.medicore.domain.entity.Patient;
import com.medicore.domain.entity.PatientDocument;
import com.medicore.domain.entity.User;
import com.medicore.dto.request.PatientRequest;
import com.medicore.dto.response.PageResponse;
import com.medicore.dto.response.PatientResponse;
import com.medicore.exception.ResourceNotFoundException;
import com.medicore.mapper.PatientMapper;
import com.medicore.repository.PatientDocumentRepository;
import com.medicore.repository.PatientRepository;
import com.medicore.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Year;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final PatientDocumentRepository patientDocumentRepository;
    private final PatientMapper patientMapper;
    private final AuditService auditService;
    private final FileStorageService fileStorageService;

    @Transactional
    public PatientResponse create(PatientRequest request) {
        Patient patient = patientMapper.toEntity(request);
        patient.setPatientNumber(generatePatientNumber());
        patient = patientRepository.save(patient);
        auditService.log("PATIENT_CREATED", "Patient", patient.getId(),
                "Patient " + patient.getPatientNumber() + " registered");
        return patientMapper.toResponse(patient);
    }

    @Transactional(readOnly = true)
    public PageResponse<PatientResponse> findAll(String search, Pageable pageable) {
        Page<Patient> page;
        if (search != null && !search.isBlank()) {
            page = patientRepository.search(search.trim(), pageable);
        } else {
            page = patientRepository.findAll(pageable);
        }
        return PageResponse.<PatientResponse>builder()
                .content(page.getContent().stream().map(patientMapper::toResponse).toList())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }

    @Transactional(readOnly = true)
    public PatientResponse findById(UUID id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", id));
        return patientMapper.toResponse(patient);
    }

    @Transactional
    public PatientResponse update(UUID id, PatientRequest request) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", id));
        patientMapper.updateEntity(patient, request);
        patient = patientRepository.save(patient);
        auditService.log("PATIENT_UPDATED", "Patient", patient.getId(), "Patient record updated");
        return patientMapper.toResponse(patient);
    }

    @Transactional
    public void delete(UUID id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", id));
        patientRepository.delete(patient);
        auditService.log("PATIENT_DELETED", "Patient", id, "Patient record deleted");
    }

    @Transactional
    public String uploadDocument(UUID patientId, MultipartFile file, String documentType) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", patientId));

        String fileUrl = fileStorageService.uploadFile(file, "patients/" + patientId);

        User uploadedBy = new User();
        uploadedBy.setId(getCurrentUserId());

        PatientDocument document = PatientDocument.builder()
                .patient(patient)
                .fileName(file.getOriginalFilename())
                .fileUrl(fileUrl)
                .documentType(documentType)
                .uploadedBy(uploadedBy)
                .build();

        patientDocumentRepository.save(document);
        auditService.log("DOCUMENT_UPLOADED", "PatientDocument", document.getId(),
                "Document uploaded for patient " + patient.getPatientNumber());
        return fileUrl;
    }

    private String generatePatientNumber() {
        long count = patientRepository.count() + 1;
        return String.format("PAT-%d-%05d", Year.now().getValue(), count);
    }

    private UUID getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserPrincipal userPrincipal) {
            return userPrincipal.getId();
        }
        return null;
    }
}
