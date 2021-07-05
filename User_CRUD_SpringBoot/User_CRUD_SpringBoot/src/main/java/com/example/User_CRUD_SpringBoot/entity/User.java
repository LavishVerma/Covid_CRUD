package com.example.User_CRUD_SpringBoot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.ToString;

@Entity
@Table(name = "Users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name="Name")
	private String name;
	
	@Column(name="Mobile")
	private String mobile;
	
	@Column(name="Email")
	private String email;
	
	@Column(name="VaccineName")
	private String vaccinename;
	
	@Column(name="IsVaccinated")
	private Boolean isvaccinated;
	
	@Column(name="NoOfDoses")
	private Integer noofdoses;

	public User(){
		
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getVaccinename() {
		return vaccinename;
	}

	public void setVaccinename(String vaccinename) {
		this.vaccinename = vaccinename;
	}

	public Boolean getIsvaccinated() {
		return isvaccinated;
	}

	public void setIsvaccinated(Boolean isvaccinated) {
		this.isvaccinated = isvaccinated;
	}

	public Integer getNoofdoses() {
		return noofdoses;
	}

	public void setNoofdoses(Integer noofdoses) {
		this.noofdoses = noofdoses;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", mobile=" + mobile + ", email=" + email + ", vaccinename="
				+ vaccinename + ", isvaccinated=" + isvaccinated + ", noofdoses=" + noofdoses + "]";
	}
	
   
    
    
	
}
