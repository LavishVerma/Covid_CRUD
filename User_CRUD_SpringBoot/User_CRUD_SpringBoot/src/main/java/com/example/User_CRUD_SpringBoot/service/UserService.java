package com.example.User_CRUD_SpringBoot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.User_CRUD_SpringBoot.entity.User;
import com.example.User_CRUD_SpringBoot.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository repository;
	
	public void saveUserData(User user) {
		if(!user.getIsvaccinated())
		{
			user.setNoofdoses(0);
			user.setVaccinename("");
		}
		repository.save(user);
		
	}

	public List<User> viewAllUserData() {
		
		return (List<User>) repository.findAll();
	}

	public void deleteUserData(Long id) {
		repository.deleteById(id);
		
	}

	public void editUserData(User user) {
		this.repository.save(user);
		
	}

}
