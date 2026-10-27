package metier;

/**
 * Contract for the business layer.
 * Any service that performs a computation using
 * data-access objects should implement this.
 */
public interface IMetier {

    /**
     * Runs the core business calculation.
     *
     * @return the computed result
     */
    double calcul();
}
