package com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Invites{

@Id
@GeneratedValue(strategy= GenerationType.IDENTITY)
private Integer inviteid;

@JsonIgnore
@ManyToOne(cascade = CascadeType.ALL)
private Survey surveyEntity;

private Integer isAccessed;

private String emailId;

private String surveyURL;

private String QRImagePath;


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

        public String getSurveyURL() {
                return surveyURL;
        }

        public void setSurveyURL(String surveyURL) {
                this.surveyURL = surveyURL;
        }

        public String getQRImagePath() {
                return QRImagePath;
        }

        public void setQRImagePath(String QRImagePath) {
                this.QRImagePath = QRImagePath;
        }
}
