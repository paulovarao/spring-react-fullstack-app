package com.spring.fullstack.app.Todos.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

// @Configuration
public class BasicAuthenticationConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http
            .authorizeHttpRequests(
                    auth -> auth
                            // enable preflight requests (no authentication required)
                            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                            // all other requests must be authenticated
                            .anyRequest().authenticated()
            )
            // set basic authentication method
            .httpBasic(Customizer.withDefaults())

            // stateless rest api (not suitable for session apis)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // disable CSRF to allow POST and PUT requests
            .csrf().disable()

            // build chain with configuration settings
            .build();
    }
}
