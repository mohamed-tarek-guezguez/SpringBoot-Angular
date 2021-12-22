package com.example.book.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.book.dao.CategoryRepository;
import com.example.book.entity.Book;
import com.example.book.entity.Category;

@Service
public class GestionCategory implements IGestionCategory {
	
	@Autowired
	CategoryRepository cr;

	@Override
	public void save(Category c) {
		cr.save(c);
	}

	@Override
	public Category getById(int id) {
		return cr.findById(id).get();
	}

	@Override
	public List<Category> getAll() {
		return cr.findAll();
	}

	@Override
	public List<Category> getByKeyword(String keyword) {
		return cr.findByNameContains(keyword);
	}

	@Override
	public void delete(int id) {
		Category c = getById(id);
		for (Book b : c.getBook_list()) {
			b.setCategory(null);
		}
		cr.delete(c);
	}

}
