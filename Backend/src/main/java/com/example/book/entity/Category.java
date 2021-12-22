package com.example.book.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotEmpty(message = "Name cannot be empty")
	@Size(min = 4, max = 255, message = "Please enter name between {min} and {max} characters.")
	private String name;
	
	@OneToMany(mappedBy = "category")
	@JsonProperty(access=Access.WRITE_ONLY)
	private List<Book> book_list = new ArrayList<Book>();
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public List<Book> getBook_list() {
		return book_list;
	}

	public void setBook_list(List<Book> book_list) {
		this.book_list = book_list;
	}

	public Category() {
		super();
	}

	public Category(String name, List<Book> book_list) {
		super();
		this.name = name;
		this.book_list = book_list;
	}

	public Category(int id, String name, List<Book> book_list) {
		super();
		this.id = id;
		this.name = name;
		this.book_list = book_list;
	}

	@Override 
	public String toString() {
		return "Category [id=" + id + ", name=" + name + "]";
	}

}
