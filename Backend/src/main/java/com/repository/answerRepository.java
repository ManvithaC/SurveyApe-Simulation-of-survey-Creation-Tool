package com.repository;

import com.entity.Answer;
import com.entity.Questions;
import com.entity.User;
import org.aspectj.weaver.patterns.TypePatternQuestions;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface answerRepository extends CrudRepository<Answer, String> {


    Answer findByQuestionEntityQuestionIdAndUserEntityId(int questionid,int answerid);


}
