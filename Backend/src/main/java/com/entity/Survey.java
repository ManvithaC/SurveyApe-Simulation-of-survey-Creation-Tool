package com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Survey {

    public Integer getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(Integer surveyId) {
        this.surveyId = surveyId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer surveyId;

    public String getSurveyType() {
        return surveyType;
    }

    public void setSurveyType(String surveyType) {
        this.surveyType = surveyType;
    }

    public List<Questions> getQuestionEntityList() {
        return questionEntityList;
    }

    public void setQuestionEntityList(List<Questions> questionEntityList) {
        this.questionEntityList = questionEntityList;
    }

    public List<Invites> getInvitesEntities() {
        return invitesEntities;
    }

    public void setInvitesEntities(List<Invites> invitesEntities) {
        this.invitesEntities = invitesEntities;
    }

    public Integer getIsPublished() {
        return isPublished;
    }

    public void setIsPublished(Integer isPublished) {
        this.isPublished = isPublished;
    }

    public Integer getIsOpen() {
        return isOpen;
    }

    public void setIsOpen(Integer isOpen) {
        this.isOpen = isOpen;
    }

    public Date getExpiry() {
        return expiry;
    }

    public void setExpiry(Date expiry) {
        this.expiry = expiry;
    }


    public List<User> getUserEntities() {
        return userEntities;
    }

    public void setUserEntities(List<User> userEntities) {
        this.userEntities = userEntities;
    }

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    private List<User> userEntities;


    private String surveyType;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "surveyEntity")
    private List<Questions> questionEntityList =new ArrayList<>();


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "surveyEntity")
    private List<Invites> invitesEntities=new ArrayList<>();

    private Integer isPublished;

    private Integer isOpen;

    private Date expiry;

}