package com.example.book.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import com.example.book.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
	@RestResource(path = "/findCategorybykeyword")
	public List<Category> findByNameContains(String keyword);

}
