package com.controller;

import com.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller    // This means that this class is a Controller
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/") // This means URL's start with /demo (after Application path)
public class userController {


    @Autowired
    private userService userService;

    @ResponseBody
    @PostMapping(path = "/register") // Map ONLY POST Requests
    public String registerUser(@RequestParam String email, @RequestParam String password, @RequestParam String firstname, @RequestParam String lastname) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        userService.register(email, password, firstname, lastname);
        return "sanjya";
    }

    @ResponseBody
    @PostMapping(path = "/verifyaccount") // Map ONLY POST Requests
    public String verifyaccount(@RequestParam String email,@RequestParam String code) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        return userService.verifyAccount(email, code);
    }


    @PostMapping(path = "/login") // Map ONLY POST Requests
    public @ResponseBody
    ResponseEntity<?> Login(@RequestParam String email, @RequestParam String password) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        return userService.login(email, password);
    }
}