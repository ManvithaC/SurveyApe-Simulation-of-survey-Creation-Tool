package com.controller;


import com.entity.Survey;
import com.service.surveyService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping(path = "/")
public class SurveyController {


    @Autowired
    private surveyService surveyService;


    @ResponseBody
    @PostMapping(path = "/survey",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public String createSurvey(@RequestBody String  surveyrequest,HttpSession session) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request


        JSONObject survey = new JSONObject(surveyrequest);
        String output=surveyService.createSuvey(survey,session);
        return "sanjya";
    }


    @ResponseBody
    @PostMapping(path = "/survey/{surveyId}",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public String submitSurvey(@RequestBody String  surveyrequest,@PathVariable("surveyId") Integer surveyId) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        JSONObject survey = new JSONObject(surveyrequest);
        String output=surveyService.submitSurvey(survey,surveyId);
        return "sanjya";
    }

    @ResponseBody
    @GetMapping(path = "/survey/{surveyId}") // Map ONLY POST Requests
    public ResponseEntity<?> fetchSurvey(@PathVariable("surveyId") Integer surveyId) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        System.out.println("ffffkkkkk");
        return surveyService.fetchSurvey(surveyId);


    }




}
