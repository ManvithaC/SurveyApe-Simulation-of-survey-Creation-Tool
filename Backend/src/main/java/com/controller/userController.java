package com.controller;

import com.service.userService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;


@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping(path = "/") // This means URL's start with /demo (after Application path)
public class userController {


    @Autowired
    private userService userService;

    @ResponseBody
    @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    // Map ONLY POST Requests
    public ResponseEntity<?> registerUser(@RequestBody String userDetails) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        System.out.println("inside register");
        JSONObject user = new JSONObject(userDetails);
        return userService.register(user.getString("email"), user.getString("password"), user.getString("firstname"), user.getString("lastname"));
    }


    @ResponseBody
    @PostMapping(path = "/verifyaccount") // Map ONLY POST Requests
    public ResponseEntity<?> verifyaccount(@RequestBody String code) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        JSONObject verifycode = new JSONObject(code);
        return userService.verifyAccount(verifycode.getString("code"));
    }

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    ResponseEntity<?> Login(@RequestBody String userDetails, HttpSession session) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        JSONObject user = new JSONObject(userDetails);
        session.setAttribute("username", user.getString("email"));
        System.out.println(session.getId());
        return userService.login(user.getString("email"), user.getString("password"), session);
    }

    @PostMapping(value = "/logout",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    ResponseEntity<?> logout(HttpSession session) {
        System.out.println(session.getAttribute("username"));
        session.invalidate();
        JSONObject message = new JSONObject();
        message.put("code", 200);
        message.put("msg", "Login Successful");
        return new ResponseEntity<>(message.toString(), HttpStatus.OK);
    }


    @ResponseBody
    @GetMapping(path = "/session")
    public ResponseEntity<?> fetchSession(HttpSession session){
        JSONObject message = new JSONObject();
        System.out.println(session.getAttribute("username"));
       if(session.getAttribute("username")!=null){
           message.put("code", 200);
           message.put("msg", "Session exists");
       }
       else
       {
           message.put("code", 400);
           message.put("msg", "Not in session");
       }
        return new ResponseEntity<>(message.toString(), HttpStatus.OK);
    }
}