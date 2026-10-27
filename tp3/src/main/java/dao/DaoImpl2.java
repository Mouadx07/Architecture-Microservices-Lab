package dao;

import org.springframework.stereotype.Component;

/**
 * Simulates reading data from a <b>development</b> database.
 * Returns a slightly higher value to make it easy to
 * distinguish from the production DAO during testing.
 */
@Component("dao2")
public class DaoImpl2 implements IDao {

    private static final double DEV_VALUE = 150.0;

    @Override
    public double getValue() {
        System.out.println("[DAO-DEV] Fetching value from development database");
        return DEV_VALUE;
    }
}
