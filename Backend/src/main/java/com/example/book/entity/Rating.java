package com.example.book.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;


@Entity
public class Rating {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private int rate;
	
	@NotEmpty(message = "Message cannot be empty")
	private String message;
	
	@OneToOne
	@JoinColumn(name = "user_rating_id", referencedColumnName = "id")
	private User user;
	
	@OneToOne
	@JoinColumn(name = "book_rating_id", referencedColumnName = "id")
	private Book book;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getRate() {
		return rate;
	}

	public void setRate(int rate) {
		this.rate = rate;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Rating() {
		super();
	}

	public Rating(int rate, String message, User user, Book book) {
		super();
		this.rate = rate;
		this.message = message;
		this.user = user;
		this.book = book;
	}

	public Rating(int id, int rate, String message, User user, Book book) {
		super();
		this.id = id;
		this.rate = rate;
		this.message = message;
		this.user = user;
		this.book = book;
	}

	@Override
	public String toString() {
		return "Rating [id=" + id + ", rate=" + rate + ", message=" + message + ", user=" + user + ", book=" + book + "]";
	}
	
}
