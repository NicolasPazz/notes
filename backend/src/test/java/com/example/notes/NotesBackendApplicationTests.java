package com.example.notes;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class NotesBackendApplicationTests {

    private static final String FRONTEND = "http://localhost:5173";

    @Autowired
    private MockMvc mockMvc;

    @Test
    void healthEndpointReturnsOk() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(content().string("OK"));
    }

    @Test
    void requestsFromUnknownOriginsAreRejected() throws Exception {
        mockMvc.perform(get("/api/categories"))
                .andExpect(status().isForbidden());
    }

    @Test
    void createdCategoryIsListed() throws Exception {
        mockMvc.perform(post("/api/categories")
                        .header("Origin", FRONTEND)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Work\"}"))
                .andExpect(status().is2xxSuccessful());

        mockMvc.perform(get("/api/categories").header("Origin", FRONTEND))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.name == 'Work')]").exists());
    }
}
