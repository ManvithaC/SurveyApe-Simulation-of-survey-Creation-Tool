package com.controller;


import com.service.InviteService;
import com.service.surveyService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
public class InviteController {

    @Autowired
    private InviteService inviteService;


    @ResponseBody
    @PostMapping(path = "/addInvites/{surveyId}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public String addInvite(@PathVariable("surveyId") Integer surveyId, @RequestBody String  inviteDetails) {
        System.out.println("addInvite");
        JSONObject invitation = new JSONObject(inviteDetails);
        String output=inviteService.addInvite(surveyId,invitation);
        return output;
    }

    @ResponseBody
    @GetMapping(path = "/getSurveyURL/{surveyId}")
    public String getSurveyURL(@PathVariable("surveyId") Integer surveyId) {
        System.out.println("getSurveyURL");

        String output=inviteService.getSurveyURL(surveyId);
        return output;
    }


}
