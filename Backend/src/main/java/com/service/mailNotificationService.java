package com.service;

import com.entity.User;
import com.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

import javax.mail.internet.MimeMessage;
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

            /*MimeMessage---------------

            import javax.mail.internet.MimeMessage;
            import org.springframework.mail.javamail.MimeMessageHelper;

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "utf-8");
            String htmlMsg = "<head>" +
                    "<style type=\"text/css\">" +
                    "  .font { color: #ba68c8; font-size: 50px}" +
                    "</style>" +
                    "</head>" +
                    "<h1 class=\"font\">" + Survey Ape + "</h1>" +
                    "<p>" +
                    "We're excited to have you get started. First, you need to confirm your account.</p>"+
                    "<br/><p>Use this code for verification:</p><br/><br/>"+
                    "<p><strong class=\"font\">" + generatedString.substring(0, 6)) +"</strong>.</p><br/><br/>"
                    "This is an automated Message from SurveyApe. Please Do not reply to this mail.";
            mimeMessage.setContent(htmlMsg, "text/html");
            helper.setTo(userEntity.getEmail());
            helper.setSubject("Account Verification Code from SurveyApe");
            helper.setFrom("SurveyApe@no-reply.com");
            mailSender.send(mimeMessage);

            MimeMessage---------------*/

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

            /*MimeMessage---------------

            import javax.mail.internet.MimeMessage;
            import org.springframework.mail.javamail.MimeMessageHelper;

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "utf-8");
            String htmlMsg = "<head>" +
                    "<style type=\"text/css\">" +
                    "  .font { color: #ba68c8; font-size: 50px}" +
                    "</style>" +
                    "</head>" +
                    "<h1 class=\"font\">" + Survey Ape + "</h1>" +
                    "<p>" +
                    "Welcome to Survey Ape. Your account has been confirmed.</p><br/><br/>"+

                    "This is an automated Message from SurveyApe. Please Do not reply to this mail."
            mimeMessage.setContent(htmlMsg, "text/html");
            helper.setTo(userEntity.getEmail());
            helper.setSubject("Thanks for registering with SurveyApe");
            helper.setFrom("SurveyApe@no-reply.com");
            mailSender.send(mimeMessage);

            MimeMessage---------------*/

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void sendThanksEmail(User userEntity) throws MailException {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(userEntity.getEmail());
            message.setFrom("surveycmpe275@gmail.com");
            message.setSubject("Thanks for the response");
            message.setText("Hello there! Thank you for taking the survey. The survey will stay anonymous.");
            javaMailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }



    /*MimeMessage to send after a user has submitted the survey

            import javax.mail.internet.MimeMessage;
            import org.springframework.mail.javamail.MimeMessageHelper;

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "utf-8");
            String htmlMsg = "<head>" +
                    "<style type=\"text/css\">" +
                    "  .font { color: #ba68c8; font-size: 50px}" +
                    "</style>" +
                    "</head>" +
                    "<h1 class=\"font\">" + Survey Ape + "</h1>" +
                    "<p>" +
                    "Hello there! Thank you for taking the survey. The survey will stay anonymous.<br/>"+
                    "Thank you for using SurveyApe<br/><br/>"+
                    "This is an automated Message from SurveyApe. Please Do not reply to this mail.</p>"
            mimeMessage.setContent(htmlMsg, "text/html");
            helper.setTo(userEntity.getEmail());
            helper.setSubject("Thanks for registering with SurveyApe");
            helper.setFrom("SurveyApe@no-reply.com");
            mailSender.send(mimeMessage);

            MimeMessage---------------*/
}
