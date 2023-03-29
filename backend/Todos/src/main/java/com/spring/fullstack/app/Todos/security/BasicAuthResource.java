package com.spring.fullstack.app.Todos.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BasicAuthResource {

    @GetMapping("/basicauth")
    public String basicAuthentication() {
        return "Success";
    }

}
