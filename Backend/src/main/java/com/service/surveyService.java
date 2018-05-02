package com.service;

import com.entity.*;
import com.repository.optionRepository;
import com.repository.questionRepository;
import com.repository.surveyRepository;
import com.repository.valueRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;


@Service
public class surveyService {

    @Autowired
    private com.repository.userRepository userRepository;

    @Autowired
    public optionRepository optionrepository;

    @Autowired
    public questionRepository questionrepository;

    @Autowired
    public surveyRepository surveyrepository;

    @Autowired
    public valueRepository valueRepository;


    @Autowired
    public com.repository.answerRepository answerRepository;

    public String createSuvey(JSONObject survey, HttpSession session) {
        Survey surveyEntity = new Survey();
        surveyEntity.setSurveyType(survey.getString("surveyType"));
        User user = userRepository.findByEmail(survey.getString("surveyorId"));
        user.getSurveyEntities().add(surveyEntity);
        surveyEntity.setOwner(user);
        surveyEntity.setIsOpen(survey.getInt("isOpen"));
        surveyEntity.setIsPublished(survey.getInt("isPublished"));
        List<Questions> questionEntityList = new ArrayList<>();
        JSONArray questionArray = survey.getJSONArray("questions");
        if (surveyEntity.getSurveyType().equals("general")) {
            for (int i = 0; i < questionArray.length(); i++) {
                Questions questionEntity = new Questions();
                JSONObject temp = (JSONObject) questionArray.get(i);
                questionEntity.setType(temp.getString("type"));
                questionEntity.setDescription(temp.getString("label"));
                questionEntity.setSurveyEntity(surveyEntity);
                if (questionEntity.getType().equals("date") ||
                        questionEntity.getType().equals("text") || questionEntity.getType().equals("textarea")) {
                    Options optionsEntity = new Options();
                    optionsEntity.setOptionValue("TEXT");
                    optionsEntity.setQuestionEntity(questionEntity);
                    optionrepository.save(optionsEntity);
                    questionEntity.getOptionsEntities().add(optionsEntity);
                } else {
                    JSONArray optionsArray = temp.getJSONArray("values");
                    List<Options> optionsEntities;
                    for (int j = 0; j < optionsArray.length(); j++) {
                        Options optionsEntity = new Options();
                        JSONObject temp2 = (JSONObject) optionsArray.get(j);
                        optionsEntity.setOptionValue(temp2.getString("label"));
                        optionsEntity.setQuestionEntity(questionEntity);
                        optionrepository.save(optionsEntity);
                        questionEntity.getOptionsEntities().add(optionsEntity);
                    }
                }
                questionrepository.save(questionEntity);
                surveyEntity.getQuestionEntityList().add(questionEntity);
            }
            surveyrepository.save(surveyEntity);
            userRepository.save(user);
        }
        return "sanjay";
    }


    public String submitSurvey(JSONObject survey, Integer surveyId) {
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        String userId = survey.getString("userId");
        User userEntity = userRepository.findByEmail(userId);

        JSONArray questionsArray = survey.getJSONArray("questions");
        List<Questions> questionEntities = surveyEntity.getQuestionEntityList();
        for (int i = 0; i < questionsArray.length(); i++) {
            Answer answer = new Answer();
            answer.setUserEntity(userEntity);
            answer.setQuestionEntity(questionEntities.get(i));
            questionEntities.get(i).getAnswerEntities().add(answer);
            JSONObject temp = (JSONObject) questionsArray.get(i);
            if (questionEntities.get(i).getType().equals("date") ||
                    questionEntities.get(i).getType().equals("text") || questionEntities.get(i).getType().equals("textarea")) {
                ValuesEntity valuesEntity = new ValuesEntity();
                valuesEntity.setAnswerEntity(answer);
                valuesEntity.setValue(temp.getString("value"));
                answer.getValuesEntity().add(valuesEntity);
                valueRepository.save(valuesEntity);
            } else {
                JSONArray optionsArray = temp.getJSONArray("values");
                for (int j = 0; j < optionsArray.length(); j++) {
                    JSONObject temp1 = (JSONObject) optionsArray.get(j);
                    //   System.out.println(temp1);
                    if (temp1.has("selected")) {
                        //     System.out.println(temp1);
                        ValuesEntity valuesEntity = new ValuesEntity();
                        valuesEntity.setAnswerEntity(answer);
                        valuesEntity.setValue(temp1.getString("label"));
                        answer.getValuesEntity().add(valuesEntity);
                        valueRepository.save(valuesEntity);
                    }
                }
            }
            answerRepository.save(answer);
            questionrepository.save(questionEntities.get(i));
        }
        surveyEntity.getQuestionEntityList().addAll(questionEntities);
        surveyrepository.save(surveyEntity);
        return "asdasd";
    }


    public ResponseEntity<?> fetchSurvey(Integer surveyId) {
        System.out.println("ffffffffff");
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        System.out.println(surveyEntity);
        JSONObject message = new JSONObject();
        JSONObject error = new JSONObject();
        message.put("surveyType", surveyEntity.getSurveyType());
        message.put("isOpen", surveyEntity.getIsOpen());
        message.put("expiray", surveyEntity.getExpiry());
        message.put("isPublished", surveyEntity.getIsPublished());
        message.put("surveyorId", surveyEntity.getSurveyId());


        if(surveyEntity.getIsPublished()==1) {
            return new ResponseEntity<>(message.toString(), HttpStatus.OK);
        }
        else
        {
            error.put("code",400);
            error.put("msg","No right to access this survey");
            return new ResponseEntity<>(error.toString(), HttpStatus.BAD_REQUEST);
        }

    }


    public ResponseEntity<?> unPublishSurvey(Integer surveyId) {
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        JSONObject message = new JSONObject();
        if(surveyEntity!=null){
            //check here if survey has anyy responses yet and unpublish
            surveyEntity.setIsPublished(0);
            surveyrepository.save(surveyEntity);
            message.put("code",200);
            message.put("msg", "Survey UnPublished");
            return new ResponseEntity<>(message.toString(), HttpStatus.OK);
        }
        else
        {
            message.put("code",404);
            message.put("msg", "Survey does not exist");
            return new ResponseEntity<>(message.toString(), HttpStatus.NOT_FOUND);
        }



    }


    public ResponseEntity<?> PublishSurvey(Integer surveyId) {
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        JSONObject message = new JSONObject();
        if(surveyEntity!=null){
            surveyEntity.setIsPublished(1);
            surveyrepository.save(surveyEntity);
            message.put("code",200);
            message.put("msg", "Survey Published");
            return new ResponseEntity<>(message.toString(), HttpStatus.OK);
        }
        else
        {
            message.put("code",404);
            message.put("msg", "Survey does not exist");
            return new ResponseEntity<>(message.toString(), HttpStatus.NOT_FOUND);
        }

    }

    public ResponseEntity<?> closeSurvey(Integer surveyId) {
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        JSONObject message = new JSONObject();
        if(surveyEntity!=null){
            surveyEntity.setIsOpen(0);
            surveyrepository.save(surveyEntity);
            message.put("code",200);
            message.put("msg", "Survey Closed");
            return new ResponseEntity<>(message.toString(), HttpStatus.OK);
        }
        else
        {
            message.put("code",404);
            message.put("msg", "Survey does not exist");
            return new ResponseEntity<>(message.toString(), HttpStatus.NOT_FOUND);
        }

    }


}
