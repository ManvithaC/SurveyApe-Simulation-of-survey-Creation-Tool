package com.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer answerId;

    public Integer getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Integer answerId) {
        this.answerId = answerId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }


    private String value;

    public com.entity.Questions getQuestionEntity() {
        return questionEntity;
    }

    public void setQuestionEntity(com.entity.Questions questionEntity) {
        this.questionEntity = questionEntity;
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private Questions questionEntity;

    public com.entity.User getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(com.entity.User userEntity) {
        this.userEntity = userEntity;
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private User userEntity;

    public List<ValuesEntity> getValuesEntity() {
        return valuesEntity;
    }

    public void setValuesEntity(List<ValuesEntity> valuesEntity) {
        this.valuesEntity = valuesEntity;
    }

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "answerEntity")
    private List<ValuesEntity> valuesEntity=new ArrayList<>();

}
