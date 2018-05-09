package com.service;

import com.entity.*;
import com.repository.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;


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
    public InviteService inviteService;

    @Autowired
    public com.repository.answerRepository answerRepository;

    @Autowired
    public inviteRepository inviteRepository;



    public ResponseEntity<?> renderopenQuestions(int surveyID,int inviteID) {

    Invites invites=inviteRepository.findByInviteid(inviteID);
    if(invites.getIsAccessed()==1){
        JSONObject messagee=new JSONObject();
        messagee.put("message","alreadycompleted");
        return new ResponseEntity<>(messagee.toString(), HttpStatus.NOT_FOUND);
    }
        Survey survey = surveyrepository.findBySurveyId(surveyID);
        JSONArray questions = new JSONArray();
        JSONObject output = new JSONObject();
        List<Questions> questionsList = survey.getQuestionEntityList();
        for (int i = 0; i < questionsList.size(); i++) {
            Questions questions1 = questionsList.get(i);
            JSONObject temp = new JSONObject();
            temp.put("type", questions1.getType());
            temp.put("label", questions1.getDescription());
            Random rand = new Random();
            int n = rand.nextInt(500) + 1;
            temp.put("name", "temporary" + String.valueOf(n));
            System.out.println("--------------------------------inisde surveaaaaaaaaaaa");
            System.out.println(temp.get("name"));
            System.out.println("--------------------------------inisde surveaaaaaaaaaaa");
            List<Options> options = questions1.getOptionsEntities();
            JSONArray values = new JSONArray();
            if (!questions1.getType().equals("text") && !questions1.getType().equals("textarea") && !questions1.getType().equals("date")) {
                for (int j = 0; j < options.size(); j++) {
                    Options options1 = options.get(j);
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("label", options1.getOptionValue());
                    jsonObject.put("value", options1.getOptionValue() + "asd");
                    values.put(jsonObject);
                }
                temp.put("values", values);
            }
            questions.put(temp);
        }
        System.out.println(questions);
        return new ResponseEntity<>(questions.toString(), HttpStatus.OK);
    }






















    // questions rendering
    public ResponseEntity<?> renderQuestions(int surveyID) {
        System.out.println("inside Questions rendering");
        Survey survey = surveyrepository.findBySurveyId(surveyID);
        JSONArray questions = new JSONArray();
        JSONObject output = new JSONObject();
        List<Questions> questionsList = survey.getQuestionEntityList();
        for (int i = 0; i < questionsList.size(); i++) {
            Questions questions1 = questionsList.get(i);
            JSONObject temp = new JSONObject();
            temp.put("type", questions1.getType());
            temp.put("label", questions1.getDescription());
            Random rand = new Random();
            int n = rand.nextInt(500) + 1;
            temp.put("name", "temporary" + String.valueOf(n));
            List<Options> options = questions1.getOptionsEntities();
            JSONArray values = new JSONArray();
            if ( !questions1.getType().equals("starRating") &&  !questions1.getType().equals("text") && !questions1.getType().equals("textarea") && !questions1.getType().equals("date")) {
                for (int j = 0; j < options.size(); j++) {
                    Options options1 = options.get(j);
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("label", options1.getOptionValue());
                    jsonObject.put("value", options1.getOptionValue() + "asd");
                    values.put(jsonObject);
                }
                temp.put("values", values);
            }
            questions.put(temp);
        }

        System.out.println("---------------------SENDING THIS DATA-------------");
        System.out.println(questions);
        System.out.println("---------------------SENDING THIS DATA-------------");
//        JSONObject expiray=new JSONObject();
//        expiray.put("expiray",survey.getExpiry());
//        questions.put(expiray);
//
        return new ResponseEntity<>(questions.toString(), HttpStatus.OK);
    }


    public ResponseEntity<?> renderForm(int surveyID, HttpSession session) {
        System.out.println("inside render form");
        Survey survey = surveyrepository.findBySurveyId(surveyID);
        User user = userRepository.findByEmail(session.getAttribute("username").toString());
        JSONArray questions = new JSONArray();
        JSONObject output = new JSONObject();
        List<Questions> questionsList = survey.getQuestionEntityList();
        for (int i = 0; i < questionsList.size(); i++) {
            Questions questions1 = questionsList.get(i);
            JSONObject temp = new JSONObject();
            temp.put("type", questions1.getType());
            temp.put("label", questions1.getDescription());
            Random rand = new Random();
            int n = rand.nextInt(500) + 1;
            temp.put("name", "temporary" + String.valueOf(n));
            List<Options> options = questions1.getOptionsEntities();
            JSONArray values = new JSONArray();
            // System.out.println(questions1.getQuestionId());
            //System.out.println(user.getId());
            //Answer answer = answerRepository.findByQuestionEntityQuestionIdAndUserEntityId(questions1.getQuestionId(), user.getId());
            Answer answer = answerRepository.findByQuestionEntityQuestionIdAndUserEntityId(questions1.getQuestionId(), user.getId());
            List<ValuesEntity> valuesEntities = answer.getValuesEntity();
            if (!questions1.getType().equals("text") && !questions1.getType().equals("textarea") && !questions1.getType().equals("date")) {
                for (int j = 0; j < options.size(); j++) {
                    Options options1 = options.get(j);
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("label", options1.getOptionValue());
                    for (int k = 0; k < valuesEntities.size(); k++) {
                        if (valuesEntities.get(k).getValue().equals(options1.getOptionValue()))
                            jsonObject.put("selected", true);
                    }
                    values.put(jsonObject);
                }
                temp.put("values", values);
            } else {
                if(questions1.getDescription().contains("firstname") && session.getAttribute("username")!=null)
                    temp.put("value",user.getFirstname());
                else if(questions1.getDescription().contains("lastname") && session.getAttribute("username")!=null)
                    temp.put("value",user.getLastname());
                else if(questions1.getDescription().contains("email") && session.getAttribute("username")!=null)
                    temp.put("value",user.getEmail());
                else
                temp.put("value", valuesEntities.get(0).getValue());
            }
            questions.put(temp);
        }
        //System.out.println(questions);
        return new ResponseEntity<>(questions.toString(), HttpStatus.OK);
    }


    public int createSuvey(JSONObject survey, HttpSession session) {
        if (survey.has("surveyId")) {
            // delete that survey
            System.out.println("inside delete survey");
            JSONObject jsonObject = survey.getJSONObject("surveyId");
            Survey survey1 = surveyrepository.findBySurveyId(jsonObject.getInt("surveyId"));
            User user = survey1.getOwner();
            user.getSurveys().remove(survey1);
            survey1.setOwner(null);
            surveyrepository.delete(survey1);
        }
        System.out.println(session.getAttribute("username"));
        Survey surveyEntity = new Survey();
        surveyEntity.setSurveyType("general");
        User user = userRepository.findByEmail(session.getAttribute("username").toString());
        user.getSurveys().add(surveyEntity);
        surveyEntity.setOwner(user);
        surveyEntity.setSurveyName(survey.getString("surveyName"));
        surveyEntity.setIsOpen(survey.getInt("isOpen"));
        surveyEntity.setIsPublished(survey.getInt("isPublished"));

        surveyEntity.setExpiry(survey.getLong("expiry"));


        List<Questions> questionEntityList = new ArrayList<>();
        JSONArray questionArray = survey.getJSONArray("questions");
        for (int i = 0; i < questionArray.length(); i++) {
            Questions questionEntity = new Questions();
            JSONObject temp = (JSONObject) questionArray.get(i);
            questionEntity.setType(temp.getString("type"));
            questionEntity.setDescription(temp.getString("label"));
            questionEntity.setSurveyEntity(surveyEntity);
            if (questionEntity.getType().equals("date") ||
                    questionEntity.getType().equals("text") || questionEntity.getType().equals("textarea")
                    ||questionEntity.getType().equals("starRating")) {
                Options optionsEntity = new Options();
                if (questionEntity.getType().equals("date"))
                    optionsEntity.setOptionValue("date");
                else if (questionEntity.getType().equals("text"))
                    optionsEntity.setOptionValue("text");
                else if(questionEntity.getType().equals("textarea"))
                    optionsEntity.setOptionValue("textarea");
                else
                    optionsEntity.setOptionValue("starRating");


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

        return surveyEntity.getSurveyId();
    }


    public String submitSurvey(JSONObject survey, Integer surveyId, HttpSession session) {

        System.out.println("-----------------------------BACK ENDIN IN SBM");

        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        //String userId = survey.getString("userId");
        User userEntity;
        if (surveyEntity.getSurveyType().equals("General")) {
            userEntity = userRepository.findByEmail("defaultuser@gmail.com");
        } else {
            userEntity = userRepository.findByEmail(session.getAttribute("username").toString());
            List<Invites> invites = surveyEntity.getInvitesEntities();

            System.out.println("inside invites");
            System.out.println(invites.size());
            for (int k = 0; k < invites.size(); k++) {
                if (invites.get(k).getEmailId().equals(userEntity.getEmail())) {
                    invites.get(k).setIsAccessed(1);
                    inviteRepository.save(invites.get(k));
                    System.out.println(invites.get(k).getIsAccessed());
                    break;
                }
            }
        }
        JSONArray questionsArray = survey.getJSONArray("questions");
        List<Questions> questionEntities = surveyEntity.getQuestionEntityList();
        List<Answer> answers = new ArrayList<>();
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
                JSONArray p = temp.getJSONArray("value");
                valuesEntity.setValue((String) p.get(0));
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
            answers.add(answer);
            questionrepository.save(questionEntities.get(i));
        }
        userEntity.getSurveyEntities().add(surveyEntity);
        userEntity.setAnswerEntities(answers);
        surveyEntity.getUserEntities().add(userEntity);
        surveyEntity.getQuestionEntityList().addAll(questionEntities);
        surveyrepository.save(surveyEntity);
        return "asdasd";
    }


//
//    public String saveopensurvey(JSONObject survey, Integer surveyId, HttpSession session) {
//
//        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
//        JSONArray questionsArray = survey.getJSONArray("questions");
//        List<Questions> questionEntities = surveyEntity.getQuestionEntityList();
//        List<Answer> answers = new ArrayList<>();
//        return "asdasd";
//    }




    public String submitopenSurvey(JSONObject survey, Integer surveyId, HttpSession session) {
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        //String userId = survey.getString("userId");
        User userEntity=userRepository.findByEmail("defaultuser@gmail.com");;
              Invites invites = inviteRepository.findByInviteid(survey.getInt("inviteId"));
              invites.setIsAccessed(1);
              inviteRepository.save(invites);
        JSONArray questionsArray = survey.getJSONArray("questions");
        List<Questions> questionEntities = surveyEntity.getQuestionEntityList();
        List<Answer> answers = new ArrayList<>();
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
                JSONArray p = temp.getJSONArray("value");
                valuesEntity.setValue((String) p.get(0));
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
            answers.add(answer);
            questionrepository.save(questionEntities.get(i));
        }
        userEntity.getSurveyEntities().add(surveyEntity);
        userEntity.setAnswerEntities(answers);
        surveyEntity.getUserEntities().add(userEntity);
        surveyEntity.getQuestionEntityList().addAll(questionEntities);
        surveyrepository.save(surveyEntity);
        return "asdasd";
    }












    public String saveSurvey(JSONObject survey, Integer surveyId, HttpSession session) {
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        //String userId = survey.getString("userId");
        User userEntity;
        if (surveyEntity.getSurveyType().equals("General")) {
            userEntity = userRepository.findByEmail("defaultuser@gmail.com");

        }
        else {
            userEntity = userRepository.findByEmail(session.getAttribute("username").toString());

            int p = 0;
            //if already exist remove the asnwers add new one.
            List<Questions> questions = surveyEntity.getQuestionEntityList();
            for (int i = 0; i < questions.size(); i++) {
                Answer answer = answerRepository.findByQuestionEntityQuestionIdAndUserEntityId(questions.get(i).getQuestionId(), userEntity.getId());
                if (answer != null) {
                    p = 1;
                    break;
                }
            }
            if (p == 1) {
                //remove all answers
                for (int j = 0; j < questions.size(); j++) {
                    Answer answer = answerRepository.findByQuestionEntityQuestionIdAndUserEntityId(questions.get(j).getQuestionId(), userEntity.getId());
                    userEntity.getAnswerEntities().remove(answer);
                    answer.setUserEntity(null);
                    questions.get(j).getAnswerEntities().remove(answer);
                    questionrepository.save(questions.get(j));
                    answerRepository.save(answer);
                    userRepository.save(userEntity);
                    answerRepository.delete(answer);
                }
            }
        }

        JSONArray questionsArray = survey.getJSONArray("questions");
        List<Questions> questionEntities = surveyEntity.getQuestionEntityList();
        List<Answer> answers = new ArrayList<>();
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
                JSONArray p = temp.getJSONArray("value");
                valuesEntity.setValue((String) p.get(0));
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
            answers.add(answer);
            questionrepository.save(questionEntities.get(i));
        }

        //System.out.println(userEntity.getSurveyEntities().size());
        //userEntity.getSurveyEntities().add(surveyEntity);
        userEntity.setAnswerEntities(answers);
        //surveyEntity.getUserEntities().add(userEntity);
        surveyEntity.getQuestionEntityList().addAll(questionEntities);
        surveyrepository.save(surveyEntity);
        return "asdasd";
    }

    public ResponseEntity<?> generalSurvey(JSONObject survey) {
        Survey surveyEntity = surveyrepository.findBySurveyId(survey.getInt("surveyId"));
        surveyEntity.setSurveyType("General");
        surveyEntity.setIsPublished(0);
        surveyEntity.setStartDate(new Date());
        surveyrepository.save(surveyEntity);
        String output = inviteService.addInvite(survey.getInt("surveyId"), survey);
        System.out.println("----------------------------");
        System.out.println("inside general survey");
        System.out.println("----------------------------");
        return null;
    }


    public ResponseEntity<?> closedSurvey(JSONObject survey, HttpSession session) {
        Survey surveyEntity = surveyrepository.findBySurveyId(survey.getInt("surveyId"));
        surveyEntity.setSurveyType("Closed");
        surveyEntity.setIsPublished(1);
        surveyEntity.setStartDate(new Date());
        surveyrepository.save(surveyEntity);
        String output = inviteService.addInvite(survey.getInt("surveyId"), survey);
        System.out.println("inside closed survey");
        return null;
    }


    public ResponseEntity<?> openSurvey(JSONObject survey) {
        System.out.println("inside OPne unique survey");
        Survey surveyEntity = surveyrepository.findBySurveyId(survey.getInt("surveyId"));
        surveyEntity.setSurveyType("Open");
        surveyEntity.setIsPublished(1);
        surveyEntity.setStartDate(new Date());
        surveyrepository.save(surveyEntity);
        String output = inviteService.addInvite(survey.getInt("surveyId"), survey);
        return null;
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
        if (surveyEntity.getIsPublished() == 1) {
            return new ResponseEntity<>(message.toString(), HttpStatus.OK);
        } else {
            error.put("code", 400);
            error.put("msg", "No right to access this survey");
            return new ResponseEntity<>(error.toString(), HttpStatus.BAD_REQUEST);
        }

    }


    public ResponseEntity<?> unPublishSurvey(JSONObject survey) {
        Integer surveyId = survey.getInt("surveyId");
        System.out.println(surveyId);
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        JSONObject message = new JSONObject();
        if (surveyEntity != null) {
            if (surveyEntity.getUserEntities().size() == 0) {
                surveyEntity.setIsPublished(0);
                surveyrepository.save(surveyEntity);
                message.put("code", 200);
                message.put("msg", "Survey UnPublished");
            }
        } else {
            message.put("code", 404);
            message.put("msg", "Survey does not exist");
        }
        return new ResponseEntity<>(message.toString(), HttpStatus.OK);
    }

    public ResponseEntity<?> PublishSurvey(Integer surveyId) {
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        JSONObject message = new JSONObject();
        if (surveyEntity != null) {
            surveyEntity.setIsPublished(1);
            surveyEntity.setStartDate(new Date());
            surveyrepository.save(surveyEntity);
            message.put("code", 200);
            message.put("msg", "Survey Published");
            return new ResponseEntity<>(message.toString(), HttpStatus.OK);
        } else {
            message.put("code", 404);
            message.put("msg", "Survey does not exist");
            return new ResponseEntity<>(message.toString(), HttpStatus.NOT_FOUND);
        }
    }


    public ResponseEntity<?> fetchcreatedsubmittedSurveys(HttpSession session) {
        // String usermail = session.getAttribute("email").toString();
        //  System.out.println("asdddddddddddddd"+session.getAttribute("username"));
        String usermail = (String) session.getAttribute("username");
        User user = userRepository.findByEmail(usermail);
        JSONArray output = new JSONArray();
        JSONArray output1 = new JSONArray();
        JSONArray finaloutput = new JSONArray();
        for (int i = 0; i < user.getSurveys().size(); i++) {
            JSONObject message = new JSONObject();
            message.put("name", user.getSurveys().get(i).getSurveyName());
            message.put("id", user.getSurveys().get(i).getSurveyId());
            if (user.getSurveys().get(i).getIsPublished() == 1) {
                message.put("status", "published");
            } else {
                message.put("status", "Saved");
            }

            if(user.getSurveys().get(i).getExpiry()!=999999999  ) {
                Date currentTime = new Date(user.getSurveys().get(i).getExpiry() * 1000);
                SimpleDateFormat formatter = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss");
                String dateString = formatter.format(currentTime);
                message.put("expiryDate", dateString);
            }
            else
            {
                message.put("expiryDate", "");

            }
            //System.out.println(dateString);
            output.put(message);
        }
        //System.out.println(user.getSurveyEntities());
//        for (int i = 0; i < user.getSurveyEntities().size(); i++) {
//            JSONObject message2 = new JSONObject();
//            message2.put("id", user.getSurveyEntities().get(i).getSurveyId());
//            message2.put("name", user.getSurveyEntities().get(i).getSurveyName());
//            message2.put("status", "Submitted");
//            Date currentTime = new Date(user.getSurveys().get(i).getExpiry() * 1000);
//            SimpleDateFormat formatter = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss");
//            String dateString = formatter.format(currentTime);
//            System.out.println(dateString);
//            message2.put("expiryDate", dateString);
//            output1.put(message2);
//        }
        List<Invites> invites = inviteRepository.findByemailId(usermail);
        for (int j = 0; j < invites.size(); j++) {
            if (invites.get(j).getSurveyEntity().getIsPublished() == 1) {
                JSONObject message3 = new JSONObject();
                message3.put("id", invites.get(j).getSurveyEntity().getSurveyId());
                message3.put("name", invites.get(j).getSurveyEntity().getSurveyName());

                if (invites.get(j).getIsAccessed() == 0) {
                    message3.put("status", "To be Submitted");
                } else {
                    message3.put("status", "Submitted");
                }
                Date currentTime = new Date(invites.get(j).getSurveyEntity().getExpiry() * 1000);
                SimpleDateFormat formatter = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss");
                String dateString = formatter.format(currentTime);
                System.out.println(dateString);
                message3.put("expiryDate", dateString);
                output1.put(message3);
            } else {
                //do nothing
            }
        }


        finaloutput.put(output);
        finaloutput.put(output1);

        return new ResponseEntity<>(finaloutput.toString(), HttpStatus.OK);
    }


    public ResponseEntity<?> closeSurvey(Integer surveyId) {
        Survey surveyEntity = surveyrepository.findBySurveyId(surveyId);
        JSONObject message = new JSONObject();
        if (surveyEntity != null) {
            surveyEntity.setIsOpen(0);
            surveyrepository.save(surveyEntity);
            message.put("code", 200);
            message.put("msg", "Survey Closed");
            return new ResponseEntity<>(message.toString(), HttpStatus.OK);
        } else {
            message.put("code", 404);
            message.put("msg", "Survey does not exist");
            return new ResponseEntity<>(message.toString(), HttpStatus.NOT_FOUND);
        }
    }


    public ResponseEntity<?> openSendEmail(JSONObject survey) {
        String temp = survey.getString("surveyID");
        String[] sarray = temp.split("_");
        Survey surveyEntity = surveyrepository.findBySurveyId((Integer.valueOf(sarray[0])));
        Invites invites = inviteRepository.findByInviteid((Integer.valueOf(sarray[1])));
        System.out.println("-------------------------------");
        invites.setEmailId(survey.getString("email"));
        invites.setSurveyURL(invites.getSurveyURL().replaceFirst("open", "open_send"));
        inviteRepository.save(invites);
        inviteService.sendEmailInvitations(invites.getEmailId(), invites.getSurveyURL());
        System.out.println("-------------------------------");
        return null;
    }
}
