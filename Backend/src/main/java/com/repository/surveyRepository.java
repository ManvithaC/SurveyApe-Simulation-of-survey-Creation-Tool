package com.repository;

import com.entity.Survey;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface surveyRepository extends CrudRepository<Survey, String> {

    public Survey findBySurveyId(Integer id);



}
