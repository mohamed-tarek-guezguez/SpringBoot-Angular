package com.example.book.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
public class Book {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotEmpty(message = "Name cannot be empty")
	@Size(min = 4, max = 255, message = "Please enter name between {min} and {max} characters.")
	private String name;
	
	@NotEmpty(message = "Author cannot be empty")
	@Size(min = 4, max = 255, message = "Please enter author between {min} and {max} characters.")
	private String author;
	
	@NotEmpty(message = "Image cannot be empty")
	private String image;
	
	private String description;
	
	private String language;
	
	private int pages;
	
	private int year;
	
	@ManyToOne
	private Category category;
	
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

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public int getPages() {
		return pages;
	}

	public void setPages(int pages) {
		this.pages = pages;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Book() {
		super();
	}

	public Book(String name, String author, String image, String description, String language, int pages, int year, Category category) {
		super();
		this.name = name;
		this.author = author;
		this.image = image;
		this.description = description;
		this.language = language;
		this.pages = pages;
		this.year = year;
		this.category = category;
	}

	public Book(int id, String name, String author, String image, String description, String language, int pages, int year, Category category) {
		super();
		this.id = id;
		this.name = name;
		this.author = author;
		this.image = image;
		this.description = description;
		this.language = language;
		this.pages = pages;
		this.year = year;
		this.category = category;
	}

	@Override
	public String toString() {
		return "Book [id=" + id + ", name=" + name + ", author=" + author + ", image=" + image + ", description="
				+ description + ", language=" + language + ", pages=" + pages + ", year=" + year + ", category="
				+ category + "]";
	}
	
}
