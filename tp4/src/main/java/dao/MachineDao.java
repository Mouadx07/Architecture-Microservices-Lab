package dao;

import entities.Machine;
import entities.Salle;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import util.HibernateUtil;

import java.util.Collections;
import java.util.List;

/**
 * Implémentation du DAO pour l'entité Machine avec opérations CRUD
 * et requêtes personnalisées HQL.
 */
public class MachineDao implements IDao<Machine> {

    @Override
    public boolean create(Machine machine) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.save(machine);
            tx.commit();
            return true;
        } catch (Exception ex) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
            System.err.println("Erreur lors de l'enregistrement de la machine : " + ex.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(Machine machine) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.delete(machine);
            tx.commit();
            return true;
        } catch (Exception ex) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
            System.err.println("Erreur lors de la suppression de la machine : " + ex.getMessage());
            return false;
        }
    }

    @Override
    public boolean update(Machine machine) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.update(machine);
            tx.commit();
            return true;
        } catch (Exception ex) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
            System.err.println("Erreur lors de la mise à jour de la machine : " + ex.getMessage());
            return false;
        }
    }

    @Override
    public Machine getById(int id) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.get(Machine.class, id);
        } catch (Exception ex) {
            System.err.println("Erreur lors de la recherche de la machine par ID (" + id + ") : " + ex.getMessage());
            return null;
        }
    }

    @Override
    public List<Machine> getAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Query<Machine> query = session.createQuery("from Machine", Machine.class);
            return query.list();
        } catch (Exception ex) {
            System.err.println("Erreur lors de la récupération de la liste des machines : " + ex.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * Recherche des machines par leur marque via une requête HQL nommée.
     *
     * @param marque La marque ciblée (ex: "Dell", "HP")
     * @return Liste des machines correspondant au critère
     */
    public List<Machine> findByMarque(String marque) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Query<Machine> query = session.createQuery(
                    "from Machine m where m.marque = :marque",
                    Machine.class
            );
            query.setParameter("marque", marque);
            return query.list();
        } catch (Exception ex) {
            System.err.println("Erreur lors de la recherche par marque (" + marque + ") : " + ex.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * Recherche des machines rattachées à une salle spécifique via HQL.
     *
     * @param salle Salle dont on souhaite lister les équipements
     * @return Liste des machines associées
     */
    public List<Machine> findBySalle(Salle salle) {
        if (salle == null) {
            return Collections.emptyList();
        }
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Query<Machine> query = session.createQuery(
                    "from Machine m where m.salle = :salle",
                    Machine.class
            );
            query.setParameter("salle", salle);
            return query.list();
        } catch (Exception ex) {
            System.err.println("Erreur lors de la recherche par salle : " + ex.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * Recherche d'une machine selon sa référence matérielle.
     *
     * @param ref Référence recherchée
     * @return Machine trouvée ou null
     */
    public Machine findByRef(String ref) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Query<Machine> query = session.createQuery(
                    "from Machine m where m.ref = :ref",
                    Machine.class
            );
            query.setParameter("ref", ref);
            return query.uniqueResult();
        } catch (Exception ex) {
            System.err.println("Erreur lors de la recherche par référence (" + ref + ") : " + ex.getMessage());
            return null;
        }
    }
}
