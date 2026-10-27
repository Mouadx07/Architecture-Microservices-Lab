package dao;

import org.springframework.stereotype.Component;

/**
 * Simulates calling an <b>external REST API</b> to obtain data.
 * In production this would use RestTemplate or WebClient to
 * hit a remote endpoint.
 */
@Component("daoApi")
public class DaoApi implements IDao {

    private static final double API_VALUE = 220.0;

    @Override
    public double getValue() {
        System.out.println("[DAO-API] Calling external REST API");
        return API_VALUE;
    }
}
