package com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class ValuesEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer valueId;

    public Integer getValueId() {
        return valueId;
    }

    public void setValueId(Integer valueId) {
        this.valueId = valueId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    private String value;

    public com.entity.Answer getAnswerEntity() {
        return answerEntity;
    }

    public void setAnswerEntity(com.entity.Answer answerEntity) {
        this.answerEntity = answerEntity;
    }

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    private Answer answerEntity;

}
