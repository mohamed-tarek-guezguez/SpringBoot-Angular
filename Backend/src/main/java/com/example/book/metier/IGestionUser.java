package com.example.book.metier;

import java.util.List;

import com.example.book.entity.User;

public interface IGestionUser {
	
	public void save(User u);
	public User getById(int id);
	public List<User> getAll();
	public List<User> getByKeyword(String keyword);
	public void delete(int id);
	public User getByEmail(User user);

}
