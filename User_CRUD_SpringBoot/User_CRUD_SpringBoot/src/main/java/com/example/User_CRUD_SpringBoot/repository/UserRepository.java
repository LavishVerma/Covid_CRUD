package com.example.User_CRUD_SpringBoot.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.User_CRUD_SpringBoot.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

}
