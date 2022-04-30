package ru.kata.spring.boot_rest.demo.service;

import ru.kata.spring.boot_rest.demo.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> findAll();

    Role getById(Long id);

    void saveRole(Role role);


}
