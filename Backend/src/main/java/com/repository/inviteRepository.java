package com.repository;

import com.entity.Invites;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface inviteRepository extends CrudRepository<Invites, String> {

}

