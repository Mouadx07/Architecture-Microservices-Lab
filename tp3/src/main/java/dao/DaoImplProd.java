package dao;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Profile-specific DAO activated <b>only</b> when the
 * {@code prod} Spring profile is active.
 * Demonstrates the profile-based bean selection strategy.
 */
@Component("daoProd")
@Profile("prod")
public class DaoImplProd implements IDao {

    private static final double PROD_PROFILE_VALUE = 100.0;

    @Override
    public double getValue() {
        System.out.println("[DAO-PROD-PROFILE] Value from production profile bean");
        return PROD_PROFILE_VALUE;
    }
}
