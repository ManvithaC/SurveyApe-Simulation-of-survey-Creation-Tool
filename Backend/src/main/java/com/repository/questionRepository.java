package com.repository;

import com.entity.Questions;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface questionRepository extends CrudRepository<Questions, String> {

}
