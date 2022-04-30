package ru.kata.spring.boot_rest.demo.dao;

import ru.kata.spring.boot_rest.demo.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDao extends JpaRepository<Role, Long> {

}
