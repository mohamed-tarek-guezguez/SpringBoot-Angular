package com.example.book.metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.book.dao.ContactRepository;
import com.example.book.entity.Contact;

@Service
public class GestionContact implements IGestionContact {
	
	@Autowired
	ContactRepository cr;

	@Override
	public void save(Contact c) {
		cr.save(c);
	}

	@Override
	public Contact getById(int id) {
		return cr.findById(id).get();
	}

	@Override
	public List<Contact> getAll() {
		return cr.findAll();
	}

	@Override
	public List<Contact> getByKeyword(String keyword) {
		return cr.findByNameContains(keyword);
	}

	@Override
	public void delete(int id) {
		Contact c = getById(id);
		cr.delete(c);
	}

}
