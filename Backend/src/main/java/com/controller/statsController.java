package com.controller;

import com.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class statsController {
    @Autowired
    private StatsService statsService;

    @ResponseBody
    @GetMapping(path = "/getStats/{surveyId}")
    public ResponseEntity<?> getStats(@PathVariable("surveyId") Integer surveyId) {
        System.out.println("getStats");
        return statsService.getStats(surveyId);
    }
}
