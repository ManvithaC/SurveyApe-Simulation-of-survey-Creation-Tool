package com.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Questions {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer questionId;

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public List<Options> getOptionsEntities() {
        return optionsEntities;
    }

    public void setOptionsEntities(List<Options> optionsEntities) {
        this.optionsEntities = optionsEntities;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public com.entity.Survey getSurveyEntity() {
        return surveyEntity;
    }

    public void setSurveyEntity(com.entity.Survey surveyEntity) {
        this.surveyEntity = surveyEntity;
    }

    @JsonIgnore
    @ManyToOne
    private Survey surveyEntity;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "questionEntity")
    private List<Options> optionsEntities=new ArrayList<>();


    public List<Answer> getAnswerEntities() {
        return answerEntities;
    }

    public void setAnswerEntities(List<Answer> answerEntities) {
        this.answerEntities = answerEntities;
    }

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy="questionEntity")
    private List<Answer> answerEntities;

    private String type;

    private String description;
}
