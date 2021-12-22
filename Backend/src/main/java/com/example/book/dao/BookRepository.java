package com.example.book.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import com.example.book.entity.Book;

@Repository
public interface BookRepository extends PagingAndSortingRepository<Book, Integer> {

	@RestResource(path = "/findBookbykeyword")
	public List<Book> findByNameContains(String keyword);
	
	@RestResource(path = "/finfByCategory")
	@Query("select b from Book b where b.category.name=:x")
	public List<Book> getByCategory(@Param(value = "x") String keyword);
	
}
