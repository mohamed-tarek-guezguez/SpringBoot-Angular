package com.example.book;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import com.example.book.entity.Book;
import com.example.book.entity.Category;
import com.example.book.entity.Contact;
import com.example.book.entity.User;

@SpringBootApplication
@ComponentScan({"com.example.book", "web"})
public class BookStoreApplication implements CommandLineRunner {

	public static void main(String[] args) {
		String uploadDirectory = System.getProperty("user.dir") + "/images/";
		new File(uploadDirectory).mkdir();
		SpringApplication.run(BookStoreApplication.class, args);
	}
	
	@Autowired
	RepositoryRestConfiguration rrc;
	
	@Override
	public void run(String... args) throws Exception {
		rrc.exposeIdsFor(User.class);
		rrc.exposeIdsFor(Category.class);
		rrc.exposeIdsFor(Book.class);	
		rrc.exposeIdsFor(Contact.class);
	}

}
