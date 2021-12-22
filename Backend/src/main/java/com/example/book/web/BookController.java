package com.example.book.web;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.book.entity.Book;
import com.example.book.metier.IGestionBook;

import lombok.extern.slf4j.Slf4j;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/api/book")
@Slf4j
public class BookController {
	
	@Autowired
	IGestionBook gestionBook;
	
	@GetMapping("")
	public List<Book> getAll() {
		return gestionBook.getAll();
	}
	
	@GetMapping("{id}")
	public Book getById(@PathVariable("id") int id) {
		return gestionBook.getById(id);
	}
	
	@GetMapping("keyword/{keyword}")
	public List<Book> getByKeyword(@PathVariable("keyword") String keyword) {
		return gestionBook.getByKeyword(keyword);
	}
	
	@GetMapping("byCategory/{keyword}")
	public List<Book> getByCategory(@PathVariable("keyword") String keyword) {
		return gestionBook.getByCategory(keyword);
	}
	
	@PostMapping("")
	public void add(@Valid @RequestBody Book b) {
		gestionBook.save(b);
	}
	
	@PutMapping("{id}")
	public void update(@Valid @RequestBody Book b, @PathVariable("id") int id) {
		Book old = gestionBook.getById(id);
		
		if (!(b.getImage().equals(old.getImage()))) {
			String uploadDirectory = System.getProperty("user.dir") + "/images/" + old.getImage();
			try {
				File f = new File(uploadDirectory);
				f.delete();				
			} catch(Exception e) {
				e.printStackTrace(); 
			}
		} 
		
		gestionBook.save(b);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") int id) {		
		gestionBook.delete(id);
	}
	
	@GetMapping(path="getImage/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
	public byte[] getImage(@PathVariable("id") int id) throws IOException {
		return gestionBook.getImage(id);
	}
	
	@GetMapping("pagin")
	public Page<Book> getAll(@RequestParam(defaultValue = "0") Integer pageNo) {
		Pageable paging = PageRequest.of(pageNo, 12);
		return gestionBook.getAllPagin(paging);
	}

	@ResponseBody
	@RequestMapping(value="upload", method=RequestMethod.POST, headers="Content-Type= multipart/form-data", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
	public void uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
		gestionBook.saveImage(file);
	}

}
