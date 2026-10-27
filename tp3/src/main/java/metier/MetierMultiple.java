package metier;

import dao.IDao;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Advanced service that aggregates <b>all</b> registered
 * {@link IDao} beans.  Spring automatically collects every
 * bean of type IDao into the {@code daoList} and maps them
 * by bean-name into {@code daoMap}.
 *
 * <p>This demonstrates multi-injection — useful for
 * fan-out strategies, voting, or data aggregation.</p>
 */
@Service("metierMultiple")
public class MetierMultiple implements IMetier {

    private final List<IDao> daoList;
    private final Map<String, IDao> daoMap;

    public MetierMultiple(List<IDao> daoList,
                          Map<String, IDao> daoMap) {
        this.daoList = daoList;
        this.daoMap = daoMap;
    }

    /**
     * Sums the values returned by every registered DAO.
     */
    @Override
    public double calcul() {
        double total = daoList.stream()
                .mapToDouble(IDao::getValue)
                .sum();
        System.out.println("[METIER-MULTI] Aggregated total = " + total);
        return total;
    }

    /** Exposes the map for logging / debugging. */
    public Map<String, IDao> getDaoMap() {
        return daoMap;
    }
}
