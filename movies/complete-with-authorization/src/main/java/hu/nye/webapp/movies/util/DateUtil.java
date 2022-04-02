package hu.nye.webapp.movies.util;

import java.util.Date;

import org.springframework.stereotype.Component;

/**
 * Helper component for date related operations.
 */
@Component
public class DateUtil {

    /**
     * Returns the current date.
     *
     * @return the current date
     */
    public Date now() {
        return new Date();
    }

}
