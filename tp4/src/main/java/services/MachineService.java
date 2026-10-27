package services;

import dao.IDao;
import dao.MachineDao;
import entities.Machine;
import entities.Salle;

import java.util.Collections;
import java.util.List;

/**
 * Service métier gérant les opérations sur les machines et l'exécution
 * de requêtes avancées (filtrage par marque, affectation par salle).
 */
public class MachineService implements IDao<Machine> {

    private final MachineDao machineDao;

    /**
     * Initialisation par défaut avec MachineDao.
     */
    public MachineService() {
        this.machineDao = new MachineDao();
    }

    /**
     * Initialisation avec DAO personnalisé.
     *
     * @param machineDao Instance du DAO machine
     */
    public MachineService(MachineDao machineDao) {
        this.machineDao = machineDao;
    }

    @Override
    public boolean create(Machine machine) {
        if (machine == null) {
            System.err.println("Avertissement : Tentative de création d'une machine nulle.");
            return false;
        }
        return machineDao.create(machine);
    }

    @Override
    public boolean delete(Machine machine) {
        if (machine == null) {
            System.err.println("Avertissement : Tentative de suppression d'une machine nulle.");
            return false;
        }
        return machineDao.delete(machine);
    }

    @Override
    public boolean update(Machine machine) {
        if (machine == null) {
            System.err.println("Avertissement : Tentative de mise à jour d'une machine nulle.");
            return false;
        }
        return machineDao.update(machine);
    }

    @Override
    public Machine getById(int id) {
        if (id <= 0) {
            return null;
        }
        return machineDao.getById(id);
    }

    @Override
    public List<Machine> getAll() {
        List<Machine> list = machineDao.getAll();
        return list != null ? list : Collections.emptyList();
    }

    /**
     * Recherche des machines en fonction de leur marque via HQL.
     *
     * @param marque Marque recherchée
     * @return Liste des machines correspondantes
     */
    public List<Machine> findByMarque(String marque) {
        if (marque == null || marque.trim().isEmpty()) {
            return Collections.emptyList();
        }
        return machineDao.findByMarque(marque.trim());
    }

    /**
     * Récupère toutes les machines assignées à une salle donnée.
     *
     * @param salle Salle concernée
     * @return Liste des machines
     */
    public List<Machine> findBySalle(Salle salle) {
        if (salle == null) {
            return Collections.emptyList();
        }
        return machineDao.findBySalle(salle);
    }

    /**
     * Recherche une machine par sa référence.
     *
     * @param ref Référence matérielle
     * @return Machine trouvée ou null
     */
    public Machine findByRef(String ref) {
        if (ref == null || ref.trim().isEmpty()) {
            return null;
        }
        return machineDao.findByRef(ref.trim());
    }
}
