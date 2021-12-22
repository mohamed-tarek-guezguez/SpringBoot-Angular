package com.example.book.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import com.example.book.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
	@RestResource(path = "/findUserbykeyword")
	public List<User> findByUsernameContains(String keyword);
	
	@RestResource(path = "/findUserbyEmail")
	public User findByEmail(String email);
	
}
