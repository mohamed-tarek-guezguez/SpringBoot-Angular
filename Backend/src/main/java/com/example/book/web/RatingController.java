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

import com.example.book.entity.Rating;
import com.example.book.metier.IGestionRating;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/api/rating")
public class RatingController {
	
	@Autowired
	IGestionRating gestionRating;
	
	@GetMapping("")
	public List<Rating> getAll() {
		return gestionRating.getAll();
	}
	
	@GetMapping("{id}")
	public Rating getById(@PathVariable("id") int id) {
		return gestionRating.getById(id);
	}
	
	@PostMapping("")
	public void add(@Valid @RequestBody Rating r) {
		
		Rating updateR = null;
		List<Rating> ratings = getAll();
		
		for (Rating item : ratings) {
			if(
				item.getBook().getId() == r.getBook().getId() & 
				item.getUser().getId() == r.getUser().getId()) {
				updateR = item;
				updateR.setRate(r.getRate());
				updateR.setMessage(r.getMessage());;
				break;
			}
		}
		
		if (updateR != null) {
			gestionRating.save(updateR);			
		} else {
			gestionRating.save(r);			
		}		
	}
	
	@PutMapping("{id}")
	public void update(@Valid @RequestBody Rating r, @PathVariable("id") int id) {
		r.setId(id);
		gestionRating.save(r);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") int id) {		
		gestionRating.delete(id);
	}
	
	@GetMapping("byBook/{id}")
	public List<Rating> getByRating(@PathVariable("id") int id) {
		return gestionRating.getByBook(id);
	}

}
