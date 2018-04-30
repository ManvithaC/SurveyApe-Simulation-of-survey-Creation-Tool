package com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
class Invites{

@Id
@GeneratedValue(strategy= GenerationType.IDENTITY)
private Integer inviteid;

public Integer getInviteid() {
        return inviteid;
        }

public void setInviteid(Integer inviteid) {
        this.inviteid = inviteid;
        }

public Integer getIsAccessed() {
        return isAccessed;
        }

public void setIsAccessed(Integer isAccessed) {
        this.isAccessed = isAccessed;
        }

public String getEmailId() {
        return emailId;
        }

public void setEmailId(String emailId) {
        this.emailId = emailId;
        }

public com.entity.Survey getSurveyEntity() {
        return surveyEntity;
        }

public void setSurveyEntity(com.entity.Survey surveyEntity) {
        this.surveyEntity = surveyEntity;
        }

@JsonIgnore
@ManyToOne(cascade = CascadeType.ALL)
private Survey surveyEntity;

private Integer isAccessed;

private String emailId;

        }
