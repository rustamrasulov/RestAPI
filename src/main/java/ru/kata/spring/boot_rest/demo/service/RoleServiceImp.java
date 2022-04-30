package ru.kata.spring.boot_rest.demo.service;

import ru.kata.spring.boot_rest.demo.dao.RoleDao;
import ru.kata.spring.boot_rest.demo.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImp implements RoleService{

    private final RoleDao roleDao;

    @Autowired
    public RoleServiceImp(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public List<Role> findAll() {
        return roleDao.findAll();
    }

    @Override
    public Role getById(Long id) {
        return roleDao.getById(id);
    }

    @Override
    public void saveRole(Role role) {
        roleDao.save(role);
    }

}
