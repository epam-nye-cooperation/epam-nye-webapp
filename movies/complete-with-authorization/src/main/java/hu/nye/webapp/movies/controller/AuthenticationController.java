package hu.nye.webapp.movies.controller;

import hu.nye.webapp.movies.request.AuthenticationRequest;
import hu.nye.webapp.movies.util.JwtUtil;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for authenticating and retrieving a JWT.
 */
@RestController
@RequestMapping(path = "/authentication")
public class AuthenticationController {

    private final JwtUtil jwtUtil;

    public AuthenticationController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @RequestMapping(method = RequestMethod.POST)
    public String authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        // This is a dummy implementation of a user authentication.
        // You should place a valid implementation here, which queries a user from the database and validates
        // if the username and the password are correct!
        authenticateUser(authenticationRequest);

        String username = "test";
        return jwtUtil.createAndSignToken(username);
    }

    private void authenticateUser(AuthenticationRequest authenticationRequest) {
        if (!"test".equals(authenticationRequest.getUsername()) || !"password".equals(authenticationRequest.getPassword())) {
            throw new RuntimeException("Authentication failed");
        }
    }

}
