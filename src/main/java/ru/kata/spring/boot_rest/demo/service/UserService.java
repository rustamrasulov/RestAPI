package ru.kata.spring.boot_rest.demo.service;

import ru.kata.spring.boot_rest.demo.model.User;

import java.util.List;

public interface UserService {
    void saveUser(User user);

    void deleteById(Long id);

    void updateUser(User user);

    User getById(Long id);

    User findByUsername(String username);

    List<User> findAll();

}
