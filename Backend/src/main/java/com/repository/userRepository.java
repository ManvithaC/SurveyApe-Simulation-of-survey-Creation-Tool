package com.repository;


import com.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepository extends CrudRepository<User, String> {

    public User findByEmail(String email);
    public User findBycode(String code);


}
