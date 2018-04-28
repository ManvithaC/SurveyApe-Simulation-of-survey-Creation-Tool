package com.repository;


import com.entity.userEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepository extends CrudRepository<userEntity, String> {

    public userEntity findByEmail(String email);


}
