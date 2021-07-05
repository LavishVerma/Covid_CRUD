package com.example.User_CRUD_SpringBoot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.User_CRUD_SpringBoot.service.FillService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FillController {

	@Autowired
	FillService service;

	@GetMapping("/fill/{id}")
	public ResponseEntity<Map<String, String>> viewUserData(@PathVariable("id") Integer id) {

		service.fillDummyUserData(id);
		Map<String, String> response = new HashMap<>();
		response.put("message", "Data saved successfully");
		response.put("success", "true");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
