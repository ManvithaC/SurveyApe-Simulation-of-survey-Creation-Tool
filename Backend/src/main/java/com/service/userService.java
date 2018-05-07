package com.service;

import com.entity.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.repository.userRepository;

import javax.servlet.http.HttpSession;

@Service
public class userService {

    @Autowired
    public userRepository userRepository;

    @Autowired
    public mailNotificationService mailNotificationService;

    @Autowired
    public surveyService surveyService;

    public ResponseEntity<?> register(String email, String password, String firstname, String lastname) {
        User userEntity = userRepository.findByEmail(email);
        JSONObject message = new JSONObject();
       // System.out.println(session.getAttribute("username"));
        if (userEntity != null) {
            message.put("message","Username Already Registered");
            message.put("code",400);
            return new ResponseEntity<>(message.toString(), HttpStatus.OK);
        } else {
            userEntity = new User();
            userEntity.setEmail(email);
            userEntity.setFirstname(firstname);
            userEntity.setLastname(lastname);
            userEntity.setPassword(new BCryptPasswordEncoder().encode(password));
            userEntity.setEnable(0);
            String code = mailNotificationService.sendEmailVerificationCode(userEntity);
            userRepository.save(userEntity);
            message.put("msg","Succefully account created");
            message.put("code",200);
            return new ResponseEntity<>(message.toString(), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> verifyAccount(String code) {
        User userEntity = userRepository.findBycode(code);
        JSONObject message = new JSONObject();
        if(userEntity==null){
            message.put("code", 404);
            message.put("msg", "User doesn't exists");

        }
        else
        {
            if (userEntity.getEnable() == 1) {
                message.put("code", 400);
                message.put("msg", "Account Already Verified");

            }
            else if (userEntity.getCode().equals(code) && userEntity.getEnable() == 0) {
                userEntity.setEnable(1);
                mailNotificationService.sendWelcomeEmail(userEntity);
                userRepository.save(userEntity);
                message.put("code", 200);
                message.put("msg", "Account Verified");

            }
        }
        return new ResponseEntity<>(message.toString(), HttpStatus.OK);


    }


    public ResponseEntity<?> login(String email, String password,HttpSession session) {
        User userEntity = userRepository.findByEmail(email);
        JSONObject message = new JSONObject();
        if(userEntity==null){
            message.put("code",404);
            message.put("msg", "Please Register");

        }
        else {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(password, userEntity.getPassword()) && userEntity.getEnable() == 1) {

                message.put("code", 200);
                message.put("msg", "Login Successful");
                session.setAttribute("username",userEntity.getEmail());
                System.out.println(session.getAttribute("username"));
                System.out.println(session.getId());
                //return new ResponseEntity<>(message.toString(), HttpStatus.OK);
            } else if (passwordEncoder.matches(password, userEntity.getPassword()) && userEntity.getEnable() == 0) {
                message.put("code", 400);
                message.put("msg", "Please Verify your account");
                //return new ResponseEntity<>(message.toString(), HttpStatus.OK);
            } else if (!passwordEncoder.matches(password, userEntity.getPassword())) {
                message.put("code", 401);
                message.put("msg", "Password Incorrect");
                //return new ResponseEntity<>(message.toString(), HttpStatus.OK);
            } else {
                message.put("code", 404);
                message.put("msg", "Login failed");
                //return new ResponseEntity<>(message.toString(), HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(message.toString(), HttpStatus.OK);
    }
}
