package com.example.User_CRUD_SpringBoot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.User_CRUD_SpringBoot.entity.User;
import com.example.User_CRUD_SpringBoot.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService service;
	
	
	@PostMapping("/save")
	public ResponseEntity<Map<String,String>> saveUserData(@RequestBody User user){
		System.out.println("User ===" +user);
		service.saveUserData(user);
		Map<String,String> response = new HashMap<>();
		response.put("message","Data saved successfully");
		response.put("success", "true");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/view")
	public ResponseEntity<List<User>> viewUserData(){
		
		List<User> userList=service.viewAllUserData();
		Map<String,String> response = new HashMap<>();
		response.put("message","Data saved successfully");
		return new ResponseEntity<>(userList, HttpStatus.OK);
	}
	
	@DeleteMapping("/save/{id}")
	public ResponseEntity<Map<String,String>> deleteUserData(@PathVariable("id") Long id){
		service.deleteUserData(id);
		Map<String,String> response = new HashMap<>();
		response.put("message","Data deleted successfully");
		response.put("success", "true");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PutMapping("/save")
	public ResponseEntity<Map<String,String>> editUserData(@RequestBody User user){
		
		service.editUserData(user);
		Map<String,String> response = new HashMap<>();
		response.put("message","Data deleted successfully");
		response.put("success", "true");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/viewPage")
	public ResponseEntity<List<User>> viewPageData(@RequestParam(defaultValue = "0") Integer pageIndex, @RequestParam(defaultValue = "5") Integer pageSize) {
		System.out.println(); 
		List<User> reponseList = service.viewPageData(pageIndex,pageSize).getContent();
		
		
		return new ResponseEntity<List<User>>(reponseList,HttpStatus.OK) ;
	}
}
