package com.service;


import com.entity.Survey;
import com.entity.User;
import com.repository.inviteRepository;
import com.repository.surveyRepository;
import com.repository.userRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;


import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import com.entity.Invites;


import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;

@Service

public class InviteService {

    @Autowired
    public inviteRepository inviteRepository;
    @Autowired
    public surveyRepository surveyrepository;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    public userRepository userRepository;

    public String addInvite(Integer surveyId, JSONObject inviteDetails) {
     //   System.out.println("addInvite 1");

        JSONArray emails = inviteDetails.getJSONArray("SurveyeesEmail");
        String  sendvia  =  inviteDetails.getString("SendVia");
        List<String> emailIds = new ArrayList<String>();
        for (int i = 0; i < emails.length(); i++) {
            emailIds.add((String) emails.get(i));
        }
        Survey s = surveyrepository.findBySurveyId(surveyId);
        String surveyType = s.getSurveyType();

        if (surveyType.equals("General")) {
            System.out.println("addInvite 1");
            String surveylink = "http://localhost:3000/takeSurvey/u/" + surveyId;
            String imagePath = "" + surveyId + ".png";
            saveQRImage(surveylink, imagePath);
            for (String e : emailIds) {
                Invites i = new Invites();
                i.setEmailId(e);
                i.setSurveyEntity(s);
                i.setIsAccessed(0);
                i.setSurveyURL(surveylink);
                i.setQRImagePath(imagePath);
                inviteRepository.save(i);
                if(sendvia.equals("link"))
                   sendEmailInvitations(e, surveylink);
                if(sendvia.equals("QRCode"))
                   sendEmailWithQRImage(e, imagePath);
            }

        } else if (surveyType.equals("Closed")) {
            for (String e : emailIds) {
                Invites i = new Invites();
                i.setEmailId(e);
                i.setSurveyEntity(s);
                i.setIsAccessed(0);
                Invites invitationAfterSaving = inviteRepository.save(i);
                int id = invitationAfterSaving.getInviteid();
                String surveylink = "http://localhost:3000/takeSurvey/closed/" + surveyId + "_" + id;
                String imagePath = "" + surveyId + "_" + id + ".png";
                invitationAfterSaving.setSurveyURL(surveylink);
                invitationAfterSaving.setQRImagePath(imagePath);
                inviteRepository.save(invitationAfterSaving);
                if(sendvia.equals("link")) {
                    User userEntity = userRepository.findByEmail(e);
                    if(userEntity!=null) {
                        sendEmailInvitations(e, surveylink);
                    }
                }
//                if(sendvia.equals("QRCode"))
//                    sendEmailWithQRImage(e, imagePath);
            }

        } else if (surveyType.equals("Open")) {
            for (String e : emailIds) {
                Invites i = new Invites();
                i.setEmailId(e);
                i.setSurveyEntity(s);
                i.setIsAccessed(0);
                Invites invitationAfterSaving = inviteRepository.save(i);
                int id = invitationAfterSaving.getInviteid();
                String surveylink = "http://localhost:3000/takeSurvey/open/" + surveyId + "_" + id;
                String imagePath = "" + surveyId + "_" + id + ".png";
                invitationAfterSaving.setSurveyURL(surveylink);
                invitationAfterSaving.setQRImagePath(imagePath);
                inviteRepository.save(invitationAfterSaving);
                if(sendvia.equals("link"))
                    sendEmailInvitations(e, surveylink);
//                if(sendvia.equals("QRCode"))
//                    sendEmailWithQRImage(e, imagePath);

            }

        }
        return "Invitations sent";
    }

    public void sendEmailInvitations(String emailID, String surveyLink){

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(emailID);
            message.setFrom("surveycmpe275@gmail.com");
            message.setSubject("Invitation to Survey");
            message.setText("Please take the survey using the link "+surveyLink);
            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public void saveQRImage(String surveyLink, String imagePath){

        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(surveyLink, BarcodeFormat.QR_CODE, 350, 350);

            Path path = FileSystems.getDefault().getPath(imagePath);
            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
        }catch (WriterException e) {
            System.out.println("Could not generate QR Code, WriterException :: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Could not generate QR Code, IOException :: " + e.getMessage());
        }
    }

    public void sendEmailWithQRImage(String emailID, String imagePath){
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());
            helper.addAttachment("QRImg.png", new File(imagePath));
            String inlineImage = "<img src=\"cid:QRImg.png\"></img><br/>";

            helper.setText(inlineImage + "", true);
            helper.setSubject("Invitation to Survey");
            helper.setTo(emailID);
            message.setFrom("surveycmpe275@gmail.com");


            javaMailSender.send(message);
        }catch(Exception e){
            System.out.println("Unable to send QRImage in mail "+e.getMessage());
        }


    }


    public String getSurveyURL(Integer surveyID){
        System.out.println("getSurveyURL");
        Survey s =  surveyrepository.findBySurveyId(surveyID);
        String surveyType =  s.getSurveyType();
        if(surveyType.equals("General")) {
            return "http://localhost:3000/takeSurvey/general/"+surveyID;
        }else if (surveyType.equals("Open")) {
            return "http://localhost:3000/takeSurvey/open/" + surveyID;
        }else {
            return "no unique survey link";
        }
    }
}
