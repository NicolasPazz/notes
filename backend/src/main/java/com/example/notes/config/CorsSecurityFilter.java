package com.example.notes.config;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;

@Component
public class CorsSecurityFilter implements Filter {

    @Value("${FRONTEND_URL:http://localhost:5173}")
    private String allowedOrigin;

    private boolean isProd() {
        File localConfig = new File("src/main/resources/application-local.properties");
        return !localConfig.exists();
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        if (req.getRequestURI().equals("/api/health")) {
            chain.doFilter(request, response);
            return;
        }

        if (isProd()) {
            String referer = req.getHeader("Referer");
            String origin = req.getHeader("Origin");

            boolean allowed = false;

            if (referer != null && referer.startsWith(allowedOrigin)) {
                allowed = true;
            } else if (origin != null && origin.startsWith(allowedOrigin)) {
                allowed = true;
            }

            if (!allowed) {
                res.sendError(HttpServletResponse.SC_FORBIDDEN, "Access denied from unknown origin.");
                return;
            }
        }

        chain.doFilter(request, response);
    }
}