package demo.service;

import demo.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> findAll();

    Role getById(Long id);

    void saveRole(Role role);


}
