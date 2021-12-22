package com.example.book.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import com.example.book.entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {

	@RestResource(path = "/findContactbykeyword")
	public List<Contact> findByNameContains(String keyword);
	
}
