package com.example.book.metier;

import java.util.List;

import com.example.book.entity.Rating;

public interface IGestionRating {
	
	public void save(Rating r);
	public Rating getById(int id);
	public List<Rating> getAll();
	public void delete(int id);
	public List<Rating> getByBook(int id);
}
