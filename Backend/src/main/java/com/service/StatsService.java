package com.service;


import com.entity.*;
import com.repository.inviteRepository;
import com.repository.questionRepository;
import com.repository.surveyRepository;
import com.repository.answerRepository;
import com.repository.valueRepository;
import com.repository.optionRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class StatsService {


    @Autowired
    public surveyRepository surveyrepository;

    @Autowired
    public inviteRepository inviteRepository;

    @Autowired
    public questionRepository  questionRepository;

    @Autowired
    public answerRepository answerRepository;

    @Autowired
    public optionRepository optionRepository;

    @Autowired
    public valueRepository valueRepository;

    public ResponseEntity<?> getStats(Integer surveyId) {
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        JSONObject message = new JSONObject();
        if(surveyEntity!=null){

            if(surveyEntity.getUserEntities().size() >=2) {
                List<Invites> invs = inviteRepository.findBySurveyEntity(surveyEntity);
                int answered = 0;
                for (Invites i : invs) {
                    if (i.getIsAccessed() == 1)
                        answered++;
                }

                List<Questions> ques = questionRepository.findBySurveyEntity(surveyEntity);

                JSONObject allques[] = new JSONObject[ques.size()];
                int j = 0;

                for (Questions q : ques) {

                    if (q.getType().equals("checkbox-group") ||
                            q.getType().equals("select") || q.getType().equals("radio-group")) {


                        List<Options> options = q.getOptionsEntities();
                        Map<String, Integer> map = new HashMap<String, Integer>();
                        for (Options o : options) {
                            map.put(o.getOptionValue(), 0);
                        }

                        List<Answer> answers = q.getAnswerEntities();
                        for (Answer a : answers) {
                            List<ValuesEntity> vals = a.getValuesEntity();
                            for (ValuesEntity v : vals) {
                                map.put(v.getValue(), map.get(v.getValue()) + 1);
                            }

                        }

                        JSONObject eachques = new JSONObject();
                        eachques.put("QuestionDesc", q.getDescription());
                        eachques.put("QuestionType", q.getType());

                        JSONObject alloptions[] = new JSONObject[map.size()];
                        int i = 0;

                        for (String key : map.keySet()) {
                            JSONObject eachOption = new JSONObject();
                            eachOption.put("label", key);
                            eachOption.put("count", map.get(key));
                            alloptions[i] = eachOption;
                            i++;

                        }
                        eachques.put("Answers", alloptions);
                        allques[j] = eachques;
                        j++;
                    }else if(q.getType().equals("text") || q.getType().equals("textarea")){
                        List<Answer> answers = q.getAnswerEntities();
                        JSONObject eachques = new JSONObject();
                        eachques.put("QuestionDesc", q.getDescription());
                        eachques.put("QuestionType", q.getType());

                        String allanwsers[] = new String[answers.size()];
                        int i = 0;
                        for (Answer a : answers) {
                            List<ValuesEntity> vals = a.getValuesEntity();
                            for (ValuesEntity v : vals) {
                                allanwsers[i] = v.getValue();
                                i++;
                            }

                        }
                        eachques.put("Answers", allanwsers);
                        allques[j] = eachques;
                        j++;

                    }

                }

                message.put("Questions", allques);
                message.put("Startime", surveyEntity.getStartDate());
                String dateString = "";

                if(surveyEntity.getExpiry()!=null && surveyEntity.getExpiry()!= 999999999){
                    Date currentTime = new Date(surveyEntity.getExpiry() * 1000);
                    SimpleDateFormat formatter = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss");
                    dateString = formatter.format(currentTime);

                }


                message.put("Endtime", dateString);
                message.put("NumberofInvitees", invs.size());
                message.put("NumberofRespondents", surveyEntity.getUserEntities().size());
                message.put("code", 200);
                message.put("surveyName", surveyEntity.getSurveyName());
                return new ResponseEntity<>(message.toString(), HttpStatus.OK);
            }else{
                message.put("code",404);
                message.put("msg", "Respondents Count is less than 2");
                return new ResponseEntity<>(message.toString(), HttpStatus.NOT_FOUND);
            }
        }
        else
        {
            message.put("code",404);
            message.put("msg", "Survey does not exist");
            return new ResponseEntity<>(message.toString(), HttpStatus.NOT_FOUND);
        }
    }
}
