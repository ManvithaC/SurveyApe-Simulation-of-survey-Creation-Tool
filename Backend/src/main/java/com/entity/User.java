package com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Answer> getAnswerEntities() {
        return answerEntities;
    }

    public void setAnswerEntities(List<Answer> answerEntities) {
        this.answerEntities = answerEntities;
    }

    public List<Survey> getSurveyEntities() {
        return surveyEntities;
    }

    public void setSurveyEntities(List<Survey> surveyEntities) {
        this.surveyEntities = surveyEntities;
    }

    @JsonIgnore

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "userEntity")
    private List<Answer> answerEntities=new ArrayList<>();

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String email;
    private String password;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    private String code;


    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    private String firstname;
    private String lastname;

    public int getEnable() {
        return enable;
    }

    public void setEnable(int enable) {
        this.enable = enable;
    }

    private int enable;

    public List<Survey> getSurveys() {
        return surveys;
    }

    public void setSurveys(List<Survey> surveys) {
        this.surveys = surveys;
    }

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy ="owner")
    private List<Survey> surveys;


    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL,mappedBy = "userEntities")
    private List<Survey> surveyEntities=new ArrayList<>();
}
