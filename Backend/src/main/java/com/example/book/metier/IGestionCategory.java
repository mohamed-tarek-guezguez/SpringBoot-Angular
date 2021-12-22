package com.example.book.metier;

import java.util.List;

import com.example.book.entity.Category;


public interface IGestionCategory {
	
	public void save(Category c);
	public Category getById(int id);
	public List<Category> getAll();
	public List<Category> getByKeyword(String keyword);
	public void delete(int id);

}
