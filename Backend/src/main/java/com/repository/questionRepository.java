package com.repository;

import com.entity.Questions;
import com.entity.Survey;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface questionRepository extends CrudRepository<Questions, String> {
    List<Questions> findBySurveyEntity(Survey survey);

}
