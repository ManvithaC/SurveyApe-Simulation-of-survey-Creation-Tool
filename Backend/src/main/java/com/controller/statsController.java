package com.controller;

import com.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class statsController {
    @Autowired
    private StatsService statsService;

    @ResponseBody
    @PostMapping(path = "/getStats/{surveyId}")
    public ResponseEntity<?> getStats(@PathVariable("surveyId") Integer surveyId) {
        System.out.println("getStats");
        return statsService.getStats(surveyId);
    }
}
