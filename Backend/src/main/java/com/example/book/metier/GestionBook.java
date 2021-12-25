package com.example.book.metier;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.book.dao.BookRepository;
import com.example.book.entity.Book;

@Service
public class GestionBook implements IGestionBook {
	
	@Autowired
	BookRepository br;

	@Override
	public void save(Book b) {
		br.save(b);
	}

	@Override
	public Book getById(int id) {
		return br.findById(id).get();
	}

	@Override
	public List<Book> getAll() {
		return (List<Book>) br.findAll();
	}

	@Override
	public Page<Book> getByKeyword(String keyword, Pageable pageable) {
		return br.findByNameContains(keyword, pageable);
	}
	
	@Override
	public List<Book> getByCategory(String keyword) {
		return br.getByCategory(keyword);
	}

	@Override
	public void delete(int id) {
		Book b = br.findById(id).get();
		
		if (b.getImage() != null) {
			String uploadDirectory = System.getProperty("user.dir") + "/images/" + b.getImage();
			try {
				File f = new File(uploadDirectory);
				f.delete();				
			} catch(Exception e) {
				e.printStackTrace(); 
			}
		} 
		
		br.deleteById(id);
	}
	
	@Override
	public byte[] getImage(int id) throws IOException {	
		String photo = getById(id).getImage();
		File f = new File(System.getProperty("user.dir"));
		Path p = Paths.get(f + "/images/" + photo);
		return Files.readAllBytes(p);
	}

	@Override
	public Page<Book> getAllPagin(Pageable pageable) {
		return br.findAll(pageable);
	}

	@Override
	public void saveImage(MultipartFile imageFile) throws IOException {		
		String uploadDirectory = System.getProperty("user.dir") + "/images/";
		byte[] bytes = imageFile.getBytes();
		Path path = Paths.get(uploadDirectory + imageFile.getOriginalFilename());
		Files.write(path, bytes);
	}

}
