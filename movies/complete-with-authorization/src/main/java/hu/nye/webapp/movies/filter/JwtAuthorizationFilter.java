package hu.nye.webapp.movies.filter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import hu.nye.webapp.movies.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * HTTP filter for handling JWT based authorization.
 */
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthorizationFilter.class);

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtAuthorizationFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            doAuthorization(request);
        } catch (Exception e) {
            LOGGER.error("Authorization error", e);
        }

        filterChain.doFilter(request, response);
    }

    private void doAuthorization(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        // Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtb3ZpZXMiLCJleHAiOjE2Nzk1MDI1NjYsInVzZXJuYW1lIjoidGVzdCJ9.5eo6O30fJpIDp96oA5hZjzZTvgtnhpEo4esJByy-r3k

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.split(" ")[1];
            // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtb3ZpZXMiLCJleHAiOjE2Nzk1MDI1NjYsInVzZXJuYW1lIjoidGVzdCJ9.5eo6O30fJpIDp96oA5hZjzZTvgtnhpEo4esJByy-r3k

            String username = jwtUtil.verifyAndDecodeToken(jwt);

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, Collections.emptyList()
            );

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            // We can add additional details to the request object, that we might retrieve and user later on,
            // in different filters or controllers.
            request.setAttribute("authorizedUsername", username);
        }
    }

}
