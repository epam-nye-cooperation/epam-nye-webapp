package hu.nye.webapp.movies.security;

import java.util.Collections;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Custom implementation of {@link UserDetailsService} to retrieve a given user by its name.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Dummy implementation of a user look-up.
        // You should place a valid implementation here, which queries a user from the database, then
        // populate the result of this method with the correct values.
        findUser(username);

        return new User("test", "password", Collections.emptyList());
    }

    private void findUser(String username) {
        if (!"test".equals(username)) {
            throw new RuntimeException("User not found");
        }
    }

}
