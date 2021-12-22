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

import com.example.book.entity.Category;
import com.example.book.metier.IGestionCategory;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/api/category")
public class CategoryController {
	
	@Autowired
	IGestionCategory gestionCategory;
	
	@GetMapping("")
	public List<Category> getAll() {
		return gestionCategory.getAll();
	}
	
	@GetMapping("{id}")
	public Category getById(@PathVariable("id") int id) {
		return gestionCategory.getById(id);
	}
	
	@GetMapping("keyword/{keyword}")
	public List<Category> getByKeyword(@PathVariable("keyword") String keyword) {
		return gestionCategory.getByKeyword(keyword);
	}
	
	@PostMapping("")
	public void add(@Valid @RequestBody Category c) {
		gestionCategory.save(c);
	}
	
	@PutMapping("{id}")
	public void update(@Valid @RequestBody Category c, @PathVariable("id") int id) {
		c.setId(id);
		gestionCategory.save(c);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") int id) {		
		gestionCategory.delete(id);
	}

}
