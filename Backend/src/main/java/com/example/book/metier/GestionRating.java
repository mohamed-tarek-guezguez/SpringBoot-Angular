package com.example.book.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.book.dao.RatingRepository;
import com.example.book.entity.Rating;

@Service
public class GestionRating implements IGestionRating {
	
	@Autowired
	RatingRepository rr;

	@Override
	public void save(Rating r) {
		rr.save(r);
	}

	@Override
	public Rating getById(int id) {
		return rr.findById(id).get();
	}

	@Override
	public List<Rating> getAll() {
		return rr.findAll();
	}

	@Override
	public void delete(int id) {
		Rating r = getById(id);
		rr.delete(r);
	}

	@Override
	public List<Rating> getByBook(int id) {
		return rr.getByBook(id);
	}

}
