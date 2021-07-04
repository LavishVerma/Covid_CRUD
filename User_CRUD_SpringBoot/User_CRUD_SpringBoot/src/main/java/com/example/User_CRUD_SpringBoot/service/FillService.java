package com.example.User_CRUD_SpringBoot.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.User_CRUD_SpringBoot.entity.User;
import com.example.User_CRUD_SpringBoot.repository.UserRepository;

@Service
public class FillService {

	@Autowired
	UserRepository repository;
	
	public void fillDummyUserData(Integer id) {
		List<User> userList = new ArrayList<>();
		
		for(int i= 0;i<id;i++) {
			User user = new User();
			String email = getCapitalAlphaString(1)+getSmallAlphaString(5)+getNumericString(2)+"@"+getSmallAlphaString(4)+"."+getSmallAlphaString(3);
			String mobile = getNumericString(10);
			String name = getCapitalAlphaString(1)+getSmallAlphaString(5)+" "+getSmallAlphaString(6);
			Boolean isvaccinated = new Random().nextBoolean();
			
			user.setEmail(email);
			user.setMobile(mobile);
			user.setName(name);
			user.setIsvaccinated(isvaccinated);
			
			if(isvaccinated) {
				user.setVaccinename(getRandomVaccineName());
				user.setNoofdoses((int)(Math.random()*2)+1);
			}
			else {
				user.setVaccinename("");
				user.setNoofdoses(0);
			}
			
			userList.add(user);
			
		}
		
		repository.saveAll(userList);
	}
	
	public static String getRandomVaccineName() {

		List<String> vaccineList = Arrays.asList("Moderna","Sputnik","Covishield","Covaxine","Pfizer");
		return vaccineList.get((int)(Math.random()*vaccineList.size()));
		
	}
	

	static String getCapitalAlphaString(int n) {

		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		StringBuilder sb = new StringBuilder(n);

		for (int i = 0; i < n; i++) {
			int index = (int) (AlphaNumericString.length() * Math.random());
			sb.append(AlphaNumericString.charAt(index));
		}
		return sb.toString();
	}
	
	static String getSmallAlphaString(int n) {
		String AlphaNumericString = "abcdefghijklmnopqrstuvxyz";
		StringBuilder sb = new StringBuilder(n);

		for (int i = 0; i < n; i++) {
			int index = (int) (AlphaNumericString.length() * Math.random());
			sb.append(AlphaNumericString.charAt(index));
		}
		return sb.toString();
	}
	
	static String getNumericString(int n) {
		String NumericString = "123456789";
		StringBuilder sb = new StringBuilder(n);

		for (int i = 0; i < n; i++) {
			int index = (int) (NumericString.length() * Math.random());
			sb.append(NumericString.charAt(index));
		}
		return sb.toString();
	}


}
