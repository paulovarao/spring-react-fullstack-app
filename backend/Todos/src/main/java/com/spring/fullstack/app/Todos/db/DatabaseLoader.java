package com.spring.fullstack.app.Todos.db;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseLoader(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS todo (id INT, description VARCHAR(255), done BOOLEAN, target_date DATE, username VARCHAR(255))");
    }
}
