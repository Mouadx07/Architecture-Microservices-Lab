package dao;

/**
 * Abstraction representing any data source capable of
 * providing a numeric value. Every concrete data-access
 * class must implement this contract so the business layer
 * stays decoupled from the persistence details.
 */
public interface IDao {

    /**
     * Fetches a numeric measurement from the underlying
     * data source (database, file, remote service, etc.).
     *
     * @return the retrieved value
     */
    double getValue();
}
