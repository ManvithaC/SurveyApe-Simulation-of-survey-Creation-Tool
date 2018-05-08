package com.repository;

import com.entity.Invites;
import com.entity.Survey;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface inviteRepository extends CrudRepository<Invites, String> {
    List<Invites> findBySurveyEntity(Survey survey);
    List<Invites> findByemailId(String email);
    Invites findByInviteid(int p);
}

