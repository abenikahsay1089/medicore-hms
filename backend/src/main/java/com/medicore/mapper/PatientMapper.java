package com.medicore.mapper;

import com.medicore.domain.entity.Patient;
import com.medicore.dto.request.PatientRequest;
import com.medicore.dto.response.PatientResponse;
import org.springframework.stereotype.Component;

@Component
public class PatientMapper {

    public Patient toEntity(PatientRequest request) {
        return Patient.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .bloodGroup(request.getBloodGroup())
                .phone(request.getPhone())
                .email(request.getEmail())
                .address(request.getAddress())
                .emergencyContact(request.getEmergencyContact())
                .insuranceProvider(request.getInsuranceProvider())
                .insuranceNumber(request.getInsuranceNumber())
                .build();
    }

    public void updateEntity(Patient patient, PatientRequest request) {
        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setGender(request.getGender());
        patient.setBloodGroup(request.getBloodGroup());
        patient.setPhone(request.getPhone());
        patient.setEmail(request.getEmail());
        patient.setAddress(request.getAddress());
        patient.setEmergencyContact(request.getEmergencyContact());
        patient.setInsuranceProvider(request.getInsuranceProvider());
        patient.setInsuranceNumber(request.getInsuranceNumber());
    }

    public PatientResponse toResponse(Patient patient) {
        return PatientResponse.builder()
                .id(patient.getId())
                .patientNumber(patient.getPatientNumber())
                .firstName(patient.getFirstName())
                .lastName(patient.getLastName())
                .dateOfBirth(patient.getDateOfBirth())
                .gender(patient.getGender())
                .bloodGroup(patient.getBloodGroup())
                .phone(patient.getPhone())
                .email(patient.getEmail())
                .address(patient.getAddress())
                .emergencyContact(patient.getEmergencyContact())
                .insuranceProvider(patient.getInsuranceProvider())
                .insuranceNumber(patient.getInsuranceNumber())
                .createdAt(patient.getCreatedAt())
                .updatedAt(patient.getUpdatedAt())
                .build();
    }
}
