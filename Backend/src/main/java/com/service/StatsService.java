package com.service;


import com.entity.Invites;
import com.entity.Survey;
import com.repository.inviteRepository;
import com.repository.surveyRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsService {


    @Autowired
    public surveyRepository surveyrepository;

    @Autowired
    public inviteRepository inviteRepository;

    public ResponseEntity<?> getStats(Integer surveyId) {
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        JSONObject message = new JSONObject();
        if(surveyEntity!=null){

           List<Invites> invs  = inviteRepository.findBySurveyEntity(surveyEntity);
           int answered = 0;
           for(Invites i: invs){
               if(i.getIsAccessed() ==1)
                   answered++;
           }

           message.put("startDate",surveyEntity.getStartDate());
           message.put("endDate",surveyEntity.getExpiry());
           message.put("InvitationCount",invs.size());
           message.put("SubmissionsCount",answered);
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
