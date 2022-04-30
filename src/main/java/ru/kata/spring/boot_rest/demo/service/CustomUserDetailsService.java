package ru.kata.spring.boot_rest.demo.service;

import ru.kata.spring.boot_rest.demo.dao.UserDao;
import ru.kata.spring.boot_rest.demo.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    private static UserDao userDao;

    public CustomUserDetailsService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User doesn't exist!");
        }
        return new org.springframework.security.core.userdetails
                .User(user.getUsername(),user.getPassword(),user.getAuthorities());
    }
}
