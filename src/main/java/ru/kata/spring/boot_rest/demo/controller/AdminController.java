package ru.kata.spring.boot_rest.demo.controller;

import ru.kata.spring.boot_rest.demo.model.Role;
import ru.kata.spring.boot_rest.demo.model.User;
import ru.kata.spring.boot_rest.demo.service.RoleService;
import ru.kata.spring.boot_rest.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import java.util.stream.Collectors;

@Controller
@RequestMapping(value = "/admin")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(value = "")
    public String showUsers(@AuthenticationPrincipal UserDetails user, Model model) {
        model.addAttribute("users", userService.findAll());
        model.addAttribute("currentuser", user);
        model.addAttribute("roles", roleService.findAll());
        return "admin";
    }

    @GetMapping(value = "/new")
    public String newUser(@AuthenticationPrincipal UserDetails user, Model model) {
        model.addAttribute("currentuser", user);
        model.addAttribute("roles", roleService.findAll());
        return "/new";
    }

    @PostMapping(value = "/new")
    public String saveNewUser(@ModelAttribute("user") User user, BindingResult result) {
        if (result.hasErrors()) {
            return "redirect:/new";
        }
        getUserRoles(user);
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PutMapping(value = "/edit/{id}")
    public String updateUser(@PathVariable("id") Long id, @ModelAttribute("user") User user, BindingResult result) {
        if (result.hasErrors()) {
            return "redirect:/edit/{id}";
        }
        getUserRoles(user);
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping(value = "/delete/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteById(id);
        return "redirect:/admin";
    }

    private void getUserRoles(User user) {
        user.setRoles(user.getRoles().stream()
                .map(this::applyRoles).collect(Collectors.toList()));
    }

    private Role applyRoles(Role role) {
        return roleService.getById(role.getId());
    }
}
