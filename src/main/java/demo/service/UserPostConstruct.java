package demo.service;

import demo.model.Role;
import demo.model.User;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
public class UserPostConstruct {

    private final UserService userService;
    private final RoleService roleService;

    private UserPostConstruct(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

//    public User(String username, String password, Set<Role> roles, String firstName,
//    String lastName, String email)

    @PostConstruct
    private void postConstruct() {
        roleService.saveRole(new Role(1L, "ADMIN"));
        roleService.saveRole(new Role(2L, "USER"));
        userService.saveUser(new User("admin@mail.ru", "admin",
                new ArrayList<>(roleService.findAll()),
                "Vasya", "Pupkin", 35));
        userService.saveUser(new User("user@mail.ru", "user",
                roleService.findAll().stream().filter(e -> e.getRoleName()
                        .contains("USER")).collect(Collectors.toList()),
                "Merlin", "Monroe", 28));
        userService.saveUser(new User("test@mail.ru", "test",
                roleService.findAll().stream().filter(e -> e.getRoleName()
                        .contains("USER")).collect(Collectors.toList()),
                "Test", "Testov", 99));
    }
}
