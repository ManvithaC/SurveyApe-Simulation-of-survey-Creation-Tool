package com.repository;


import com.entity.User;
import com.entity.ValuesEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface valueRepository extends CrudRepository<ValuesEntity, String> {


}
