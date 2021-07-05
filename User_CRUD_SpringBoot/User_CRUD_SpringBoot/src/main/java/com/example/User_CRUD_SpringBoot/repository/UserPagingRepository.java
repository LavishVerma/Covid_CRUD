package com.example.User_CRUD_SpringBoot.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.User_CRUD_SpringBoot.entity.User;

@Repository
public interface UserPagingRepository extends PagingAndSortingRepository<User,Long>{

	
}
