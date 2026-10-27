package dao;

import org.springframework.stereotype.Component;

/**
 * Simulates fetching data from a <b>local file</b>.
 * In a real project this would read from CSV, JSON, or
 * another flat-file format stored on the server.
 */
@Component("daoFile")
public class DaoFile implements IDao {

    private static final double FILE_VALUE = 180.0;

    @Override
    public double getValue() {
        System.out.println("[DAO-FILE] Reading value from local file system");
        return FILE_VALUE;
    }
}
