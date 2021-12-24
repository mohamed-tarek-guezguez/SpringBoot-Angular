package com.example.book.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import com.example.book.entity.Rating;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {
	
	@RestResource(path = "/findByBook")
	@Query("select r from Rating r where r.book.id=:x")
	public List<Rating> getByBook(@Param(value = "x") int id);
	
}
