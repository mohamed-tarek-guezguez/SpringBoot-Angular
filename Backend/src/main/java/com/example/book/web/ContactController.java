package com.example.book.web;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.book.entity.Contact;
import com.example.book.metier.IGestionContact;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/api/contact")
public class ContactController {
	
	@Autowired
	IGestionContact gestionContact;
	
	@GetMapping("")
	public List<Contact> getAll() {
		return gestionContact.getAll();
	}
	
	@GetMapping("{id}")
	public Contact getById(@PathVariable("id") int id) {
		return gestionContact.getById(id);
	}
	
	@GetMapping("keyword/{keyword}")
	public List<Contact> getByKeyword(@PathVariable("keyword") String keyword) {
		return gestionContact.getByKeyword(keyword);
	}
	
	@PostMapping("")
	public void add(@Valid @RequestBody Contact c) {
		gestionContact.save(c);
	}
	
	@PutMapping("{id}")
	public void update(@Valid @RequestBody Contact c, @PathVariable("id") int id) {
		c.setId(id);
		gestionContact.save(c);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") int id) {		
		gestionContact.delete(id);
	}

}
