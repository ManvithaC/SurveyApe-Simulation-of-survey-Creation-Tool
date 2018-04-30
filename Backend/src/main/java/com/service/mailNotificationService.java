package com.service;

import com.entity.User;
import com.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.UUID;


@Service
public class mailNotificationService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    public userRepository userRepository;

    public String sendEmailVerificationCode(User userEntity) throws MailException {

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            // System.out.println(message.toString());
            message.setTo(userEntity.getEmail());
            message.setFrom("surveycmpe275@gmail.com");
            message.setSubject("Account Verification Code from SurveyApe");
            UUID uuid = UUID.randomUUID();
            String generatedString = uuid.toString();
            userEntity.setCode(generatedString.substring(0, 6));
            message.setText(
                    "This is an automated Message from SurveyApe. Please Do not reply to this mail. \nUse this code for verification:"
                            + generatedString.substring(0, 6));
            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "created account";
    }

    public void sendWelcomeEmail(User userEntity) throws MailException {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(userEntity.getEmail());
            message.setFrom("surveycmpe275@gmail.com");
            message.setSubject("Welcome to SurveyApe");
            message.setText("Thanks for registering with Us");
            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
