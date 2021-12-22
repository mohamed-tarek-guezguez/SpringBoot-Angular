package com.example.book.metier;

import java.util.List;

import com.example.book.entity.Contact;

public interface IGestionContact {
	
	public void save(Contact c);
	public Contact getById(int id);
	public List<Contact> getAll();
	public List<Contact> getByKeyword(String keyword);
	public void delete(int id);

}
