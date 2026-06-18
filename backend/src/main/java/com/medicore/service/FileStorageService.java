package com.medicore.service;

import com.medicore.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
public class FileStorageService {

    @Value("${medicore.aws.access-key:}")
    private String accessKey;

    @Value("${medicore.aws.secret-key:}")
    private String secretKey;

    @Value("${medicore.aws.bucket:medicore-files}")
    private String bucket;

    @Value("${medicore.aws.region:us-east-1}")
    private String region;

    public String uploadFile(MultipartFile file, String folder) {
        if (file == null || file.isEmpty()) {
            throw new BusinessException("File is empty");
        }

        String fileName = folder + "/" + UUID.randomUUID() + "_" + file.getOriginalFilename();

        if (accessKey == null || accessKey.isBlank()) {
            log.info("S3 not configured. File would be stored at: {}", fileName);
            return "local://" + fileName;
        }

        try {
            S3Client s3Client = S3Client.builder()
                    .region(Region.of(region))
                    .credentialsProvider(StaticCredentialsProvider.create(
                            AwsBasicCredentials.create(accessKey, secretKey)))
                    .build();

            s3Client.putObject(
                    PutObjectRequest.builder().bucket(bucket).key(fileName).build(),
                    RequestBody.fromBytes(file.getBytes()));

            return String.format("https://%s.s3.%s.amazonaws.com/%s", bucket, region, fileName);
        } catch (IOException e) {
            throw new BusinessException("Failed to upload file: " + e.getMessage());
        }
    }
}
