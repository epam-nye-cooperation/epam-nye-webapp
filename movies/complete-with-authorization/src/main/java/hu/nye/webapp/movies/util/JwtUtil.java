package hu.nye.webapp.movies.util;

import java.time.temporal.ChronoUnit;
import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import hu.nye.webapp.movies.configuration.JwtConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Helper component for JWT related operations.
 */
@Component
public class JwtUtil {

    private static final String USERNAME_CLAIM = "username";

    private final Algorithm algorithm;
    private final JWTVerifier jwtVerifier;
    private final DateUtil dateUtil;
    private final JwtConfigurationProperties jwtConfigurationProperties;

    public JwtUtil(Algorithm algorithm, JWTVerifier jwtVerifier, DateUtil dateUtil,
                   JwtConfigurationProperties jwtConfigurationProperties) {
        this.algorithm = algorithm;
        this.jwtVerifier = jwtVerifier;
        this.dateUtil = dateUtil;
        this.jwtConfigurationProperties = jwtConfigurationProperties;
    }

    /**
     * Creates and signs a new JWT with the provided username in it.
     *
     * @param username the username which will be the part of the JWT as a claim
     * @return a new signed JWT
     */
    public String createAndSignToken(String username) {
        return JWT.create()
            .withIssuer(jwtConfigurationProperties.getIssuer())
            .withClaim(USERNAME_CLAIM, username)
            .withExpiresAt(createExpirationDate())
            .sign(algorithm);
    }

    /**
     * Verifies the provided JWT and decodes it.
     *
     * If the JWT is valid, then the value of the 'username' claim will be returned from it.
     * If the JWT is not valid, a {@link JWTVerificationException} might be thrown.
     *
     * @param token the JWT to be verified and decoded
     * @return the 'username' claim from the JWT if it was valid
     * @throws JWTVerificationException when the JWT is not valid
     */
    public String verifyAndDecodeToken(String token) {
        DecodedJWT decodedJWT = jwtVerifier.verify(token);
        return decodedJWT.getClaim(USERNAME_CLAIM).asString();
    }

    private Date createExpirationDate() {
        return Date.from(
            dateUtil.now().toInstant().plus(jwtConfigurationProperties.getTokenValidityInMinutes(), ChronoUnit.MINUTES)
        );
    }

}
