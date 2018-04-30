package com.service;

import com.entity.*;
import com.repository.optionRepository;
import com.repository.questionRepository;
import com.repository.surveyRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
    public com.repository.answerRepository answerRepository;

    public String createSuvey(JSONObject survey) {
        //userEntity owner = userRepository.findByEmail(survey.getString("surveyorId"));
        Survey surveyEntity = new Survey();
        surveyEntity.setSurveyType(survey.getString("surveyType"));
        surveyEntity.setIsOpen(survey.getInt("isOpen"));
        // surveyEntity.setExpiry((Date) survey.get("expiry"));
        surveyEntity.setIsPublished(survey.getInt("isPublished"));
        //surveyEntity.setSurveyorId(owner.getEmail());
        List<Questions> questionEntityList = new ArrayList<>();
        JSONArray questionArray = survey.getJSONArray("questions");
        List<Questions> questionEntities;
        surveyrepository.save(surveyEntity);
        for (int i = 0; i < questionArray.length(); i++) {
            Questions questionEntity = new Questions();
            JSONObject temp = (JSONObject) questionArray.get(i);
            questionEntity.setType(temp.getString("questionType"));
            questionEntity.setDescription(temp.getString("questionDescription"));
            JSONArray optionsArray = temp.getJSONArray("options");
            List<Options> optionsEntities;
            questionEntity.setSurveyEntity(surveyEntity);
            for (int j = 0; j < optionsArray.length(); j++) {
                Options optionsEntity = new Options();
                JSONObject temp2 = (JSONObject) optionsArray.get(j);
                optionsEntity.setOptionValue(temp2.getString("value"));
                optionsEntity.setQuestionEntity(questionEntity);
                optionrepository.save(optionsEntity);
                questionEntity.getOptionsEntities().add(optionsEntity);
            }

            questionrepository.save(questionEntity);
            surveyEntity.getQuestionEntityList().add(questionEntity);
        }
        surveyrepository.save(surveyEntity);
        return "sanjay";
    }




    public String submitSurvey(JSONObject survey, Integer surveyId) {
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        surveyEntity.setIsPublished(1);
        surveyrepository.save(surveyEntity);
        String userId = survey.getString("userId");
        User userEntity = userRepository.findByEmail(userId);
        userEntity.getSurveyEntities().add(surveyEntity);
        JSONArray questionsArray = survey.getJSONArray("questions");
        List<Questions> questionEntities = surveyEntity.getQuestionEntityList();
        for (int i = 0; i < questionsArray.length(); i++) {
            JSONObject temp = questionsArray.getJSONObject(i);
            JSONArray answerArray = temp.getJSONArray("answers");
            Answer answerEntity = new Answer();
            answerEntity.setQuestionEntity(questionEntities.get(i));
            for (int j = 0; j < answerArray.length(); j++) {
                JSONObject temp1 = answerArray.getJSONObject(j);
                System.out.println(temp1);
                ValuesEntity valuesEntity = new ValuesEntity();
                valuesEntity.setValue(temp1.getString("value"));
                answerEntity.getValuesEntity().add(valuesEntity);
                answerEntity.setUserEntity(userEntity);
                valuesEntity.setAnswerEntity(answerEntity);
            }
            userEntity.getAnswerEntities().add(answerEntity);
            answerRepository.save(answerEntity);
            userRepository.save(userEntity);
            userEntity.getSurveyEntities().add(surveyEntity);
            surveyEntity.getUserEntities().add(userEntity);
            questionEntities.get(i).getAnswerEntities().add(answerEntity);
            questionrepository.save(questionEntities.get(i));
        }

        return "asdasd";
    }


    public ResponseEntity<?> fetchSurvey(Integer surveyId) {
        System.out.println("ffffffffff");
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        System.out.println(surveyEntity);
        JSONObject message = new JSONObject();
        message.put("surveyType",surveyEntity.getSurveyType());
        message.put("isOpen",surveyEntity.getIsOpen());
        message.put("expiray",surveyEntity.getExpiry());
        message.put("isPublished",surveyEntity.getIsPublished());
        message.put("surveyorId",surveyEntity.getSurveyId());




        return new ResponseEntity<>(message.toString(), HttpStatus.OK);

        }
}
