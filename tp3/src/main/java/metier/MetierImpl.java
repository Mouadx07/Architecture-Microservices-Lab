package metier;

import dao.IDao;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

/**
 * Primary business service.  It receives an {@link IDao}
 * through <b>constructor injection</b> — the recommended
 * injection style because it makes the dependency explicit,
 * enforces immutability, and simplifies testing.
 *
 * <p>This class must <em>never</em> be edited to swap the
 * data source; the Open/Closed Principle (OCP) requires us
 * to reconfigure Spring instead.</p>
 */
@Primary
@Service
public class MetierImpl implements IMetier {

    private final IDao dao;

    /**
     * Spring will resolve the appropriate IDao bean and
     * pass it here at application startup.
     *
     * @param dao the data-access dependency
     */
    public MetierImpl(IDao dao) {
        this.dao = dao;
    }

    /**
     * Doubles the raw value obtained from the DAO.
     * The multiplication factor is intentionally simple
     * so we can focus on the injection mechanism.
     */
    @Override
    public double calcul() {
        double rawValue = dao.getValue();
        double result = rawValue * 2.0;
        System.out.println("[METIER] Raw = " + rawValue
                + " | Computed = " + result);
        return result;
    }
}
