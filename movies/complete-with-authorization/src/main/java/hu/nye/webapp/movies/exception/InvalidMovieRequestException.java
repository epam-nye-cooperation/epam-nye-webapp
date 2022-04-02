package hu.nye.webapp.movies.exception;

import java.util.List;

/**
 * Exception that can be thrown upon an invalid movie request.
 */
public class InvalidMovieRequestException extends RuntimeException {

    private final List<String> errors;

    public InvalidMovieRequestException(String message, List<String> errors) {
        super(message);
        this.errors = errors;
    }

    public List<String> getErrors() {
        return errors;
    }

}
