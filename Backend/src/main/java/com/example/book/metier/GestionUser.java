package com.example.book.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.book.dao.UserRepository;
import com.example.book.entity.User;

@Service
public class GestionUser implements IGestionUser {

	@Autowired
	UserRepository ur;
	
	@Override
	public void save(User u) {		
		ur.save(u);
	}

	@Override
	public User getById(int id) {
		return ur.findById(id).get();
	}

	@Override
	public List<User> getAll() {
		return ur.findAll();
	}

	@Override
	public List<User> getByKeyword(String keyword) {
		return ur.findByUsernameContains(keyword);
	}

	@Override
	public void delete(int id) {
		ur.deleteById(id);
	}

	@Override
	public User getByEmail(User user) {
		if (user != null) {
			User u = ur.findByEmail(user.getEmail());
			if (u != null && u.getPassword().equals(user.getPassword())) {
				return u;		
			}
		}
		return null;
	}

}
