package hu.nye.webapp.movies.exception;

/**
 * Exception that can be thrown when a movie is not found.
 */
public class MovieNotFoundException extends RuntimeException {

    public MovieNotFoundException(String message) {
        super(message);
    }

}
