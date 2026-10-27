package dao;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

/**
 * Simulates reading data from the <b>production</b> database.
 * Marked as {@code @Primary} so Spring picks it by default
 * whenever multiple IDao candidates exist (Strategy A).
 */
@Primary
@Component("dao")
public class DaoImpl implements IDao {

    private static final double PROD_VALUE = 100.0;

    @Override
    public double getValue() {
        System.out.println("[DAO-PROD] Fetching value from production database");
        return PROD_VALUE;
    }
}
