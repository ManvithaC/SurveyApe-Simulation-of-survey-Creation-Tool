package com.repository;

import com.entity.Answer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface answerRepository extends CrudRepository<Answer, String> {

}
