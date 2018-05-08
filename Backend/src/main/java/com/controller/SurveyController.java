package com.controller;


import com.entity.User;
import com.service.surveyService;
import org.hibernate.query.criteria.internal.CriteriaSubqueryImpl;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.http.HttpSession;


@RestController    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping(path = "/")
public class SurveyController {


    @Autowired
    private surveyService surveyService;


    @PostMapping(path = "/survey", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    // Map ONLY POST Requests
    public @ResponseBody
    ResponseEntity<?> createSurvey(@RequestBody String surveyrequest, HttpSession session) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        //System.out.println(surveyrequest);
        //System.out.println(session.getAttribute("username"));
        JSONObject survey = new JSONObject(surveyrequest);
        //System.out.println(survey);
        int surveyId = surveyService.createSuvey(survey, session);
        JSONObject message = new JSONObject();
        message.put("surveyId", surveyId);
        return new ResponseEntity<>(message.toString(), HttpStatus.OK);
    }

    @PostMapping(path = "/uploadImage",produces = MediaType.APPLICATION_JSON_VALUE)
    // Map ONLY POST Requests
    public @ResponseBody
    ResponseEntity<?> UploadImages(@RequestParam(name="file", required=false) MultipartFile file, HttpSession session) throws IOException {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        //System.out.println(surveyrequest);
        System.out.println(session.getAttribute("username")+"--------");
        if (file.isEmpty()) {
            System.out.println("Empty File");
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        else {
            //String userInsession = (String) session.getAttribute("username");
            //System.out.println("User Session " + userInsession);
            System.out.println("File name in body ----" + file);

            System.out.println("File name " + file.getOriginalFilename());
            byte[] bytes = file.getBytes();
            System.out.println("Working Directory = " +
                    System.getProperty("user.dir"));

            String UPLOADED_FOLDER = System.getProperty("user.dir")+"\\public\\";
            long timestamp = System.currentTimeMillis() / 1000L;
            System.out.println("Timestamp"+timestamp);
            Path path = Paths.get(UPLOADED_FOLDER + timestamp+file.getOriginalFilename());
            System.out.println("path to upload the file " + path);
            String UploadedFilePath = path.toString();
            Files.write(path, bytes);
            JSONObject message = new JSONObject();
            message.put("UploadedFilePath", UploadedFilePath);
            System.out.println("Message "+message.toString());
            return new ResponseEntity<>(message,HttpStatus.CREATED);
        }
        }



    @PostMapping(path = "/generalSurvey", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    ResponseEntity<?> generalSurvey(@RequestBody String surveyrequest, HttpSession session) {
        JSONObject survey = new JSONObject(surveyrequest);
        //System.out.println(survey);
        return surveyService.generalSurvey(survey);
    }


    @PostMapping(path = "/closedSurvey", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    ResponseEntity<?> closedSurvey(@RequestBody String surveyrequest, HttpSession session) {
        JSONObject survey = new JSONObject(surveyrequest);
        System.out.println(survey);
        return surveyService.closedSurvey(survey);
    }


    @PostMapping(path = "/renderSurvey", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    // Map ONLY POST Requests
    public @ResponseBody
    ResponseEntity<?> rendersurvey(@RequestBody String surveyrequest, HttpSession session) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        System.out.println(surveyrequest);
        JSONObject survey = new JSONObject(surveyrequest);
        return surveyService.renderQuestions(survey.getInt("surveyId"));
    }


    @PostMapping(path = "/submitsurvey/{surveyId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    // Map ONLY POST Requests
    public @ResponseBody
    ResponseEntity<?> submitsurvey(@RequestBody String surveyrequest,@PathVariable("surveyId") Integer surveyId, HttpSession session) {
         // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        //System.out.println(surveyrequest);
        JSONObject survey=new JSONObject(surveyrequest);
        JSONObject temp=new JSONObject();
        temp.put("questions",survey.getJSONArray("data"));
        String output = surveyService.submitSurvey(temp, surveyId);
        return null;
    }



    @ResponseBody
    @GetMapping(path = "/surveys") // Map ONLY POST Requests
    public ResponseEntity<?> fetchcreatedsubmittedSurveys(HttpSession session) {
        // //if(session.getAttribute("email")!=null){

        return surveyService.fetchcreatedsubmittedSurveys(session);
    }

    @ResponseBody
    @GetMapping(path = "/survey/{surveyId}") // Map ONLY POST Requests
    public ResponseEntity<?> fetchSurvey(@PathVariable("surveyId") Integer surveyId) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        System.out.println("ffffkkkkk");

        return surveyService.fetchSurvey(surveyId);
    }


    @ResponseBody
    @PostMapping(path = "/Unpublish/{surveyId}") // Map ONLY POST Requests
    public ResponseEntity<?> unPublishSurvey(@PathVariable("surveyId") Integer surveyId) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        return surveyService.unPublishSurvey(surveyId);

    }

    @ResponseBody
    @PostMapping(path = "/publish/{surveyId}") // Map ONLY POST Requests
    public ResponseEntity<?> PublishSurvey(@PathVariable("surveyId") Integer surveyId) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        return surveyService.PublishSurvey(surveyId);

    }

    @ResponseBody
    @PostMapping(path = "/Close/{surveyId}") // Map ONLY POST Requests
    public ResponseEntity<?> closeSurvey(@PathVariable("surveyId") Integer surveyId) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        return surveyService.closeSurvey(surveyId);

    }


}
