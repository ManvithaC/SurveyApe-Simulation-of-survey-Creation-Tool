package com.repository;

import com.entity.Options;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface optionRepository extends CrudRepository<Options, String> {


}
