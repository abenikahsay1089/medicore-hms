package com.medicore.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    @Value("${medicore.frontend-url:http://localhost:5173}")
    private String frontendUrl;

    public void sendVerificationEmail(String to, String token) {
        String subject = "Verify your MediCore account";
        String body = String.format(
                "Welcome to MediCore HMS!\n\nPlease verify your email by clicking the link below:\n%s/verify-email?token=%s\n\nThis link expires in 24 hours.",
                frontendUrl, token);
        sendEmail(to, subject, body);
    }

    public void sendPasswordResetEmail(String to, String token) {
        String subject = "Reset your MediCore password";
        String body = String.format(
                "You requested a password reset.\n\nClick the link below to reset your password:\n%s/reset-password?token=%s\n\nThis link expires in 1 hour.\n\nIf you did not request this, please ignore this email.",
                frontendUrl, token);
        sendEmail(to, subject, body);
    }

    private void sendEmail(String to, String subject, String body) {
        if (fromEmail == null || fromEmail.isBlank()) {
            log.info("Email not configured. Would send to {}: {}", to, subject);
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            log.info("Email sent to {}", to);
        } catch (Exception e) {
            log.error("Failed to send email to {}", to, e);
        }
    }
}
