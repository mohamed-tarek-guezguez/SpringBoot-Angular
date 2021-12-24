package com.example.book.web;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.example.book.entity.User;
import com.example.book.metier.IGestionUser;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	IGestionUser gestionUser;
	
	@GetMapping("")
	public List<User> getAll() {
		return gestionUser.getAll();
	}
	
	@GetMapping("{id}")
	public User getById(@PathVariable("id") int id) {
		return gestionUser.getById(id);
	}
	
	@GetMapping("keyword/{keyword}")
	public List<User> getByKeyword(@PathVariable("keyword") String keyword) {
		return gestionUser.getByKeyword(keyword);
	}
	
	@PostMapping("")
	public void add(@Valid @RequestBody User u) {
		gestionUser.save(u);
	}
	
	@PostMapping("test")
	public ResponseEntity<String> test(@Valid @RequestBody User u) {
		if (gestionUser.getByEmail(u) != null) {
			return new ResponseEntity<>("email already exist!", HttpStatus.OK);
		}
		// crypt pass
		gestionUser.save(u);
		System.out.println(u);
		return new ResponseEntity<>("User has been successfully added", HttpStatus.OK);
	}
	
	@PutMapping("{id}")
	public void update(@Valid @RequestBody User u, @PathVariable("id") int id) {
		u.setId(id);
		gestionUser.save(u);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") int id) {	
		gestionUser.delete(id);
	}
	
	@PostMapping("login")
	public User login(@RequestBody User u) {
		return gestionUser.getByEmail(u);
	}
}
