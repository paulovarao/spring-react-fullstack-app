package com.spring.fullstack.app.Todos.todo;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class TodoResourceTest {

    @Mock
    private TodoRepository repository;

    @InjectMocks
    private TodoResource resource;

    private String username = "testUser";

    @Test
    void getAllTodos() {
        List<Todo> todos = List.of(
                new Todo(1, username, "fake description 1", LocalDate.now(), false),
                new Todo(2, username, "fake description 2", LocalDate.now(), false),
                new Todo(3, username, "fake description 3", LocalDate.now(), false)
        );

        when(repository.findByUsername(username)).thenReturn(todos);

        List<Todo> result = resource.retrieveTodos(username);

        assertEquals(todos, result);
    }

}
