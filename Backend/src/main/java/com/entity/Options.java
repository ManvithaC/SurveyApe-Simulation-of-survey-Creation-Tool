package com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Options {


    public Integer getOptionId() {
        return optionId;
    }

    public void setOptionId(Integer optionId) {
        this.optionId = optionId;
    }

    public String getOptionValue() {
        return optionValue;
    }

    public void setOptionValue(String optionValue) {
        this.optionValue = optionValue;
    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer optionId;

    private String optionValue;

    public Questions getQuestionEntity() {
        return questionEntity;
    }

    public void setQuestionEntity(com.entity.Questions questionEntity) {
        this.questionEntity = questionEntity;
    }

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    private Questions questionEntity;

}
