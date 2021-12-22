package com.example.book.metier;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.example.book.entity.Book;

public interface IGestionBook {
	
	public void save(Book b);
	public Book getById(int id);
	public List<Book> getAll();
	public Page<Book> getAllPagin(Pageable pageable);
	public List<Book> getByKeyword(String keyword);
	public List<Book> getByCategory(String keyword);
	public void delete(int id);
	public byte[] getImage(int id) throws IOException;
	public void saveImage(MultipartFile imageFile) throws IOException;

}
