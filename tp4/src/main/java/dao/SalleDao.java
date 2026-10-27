package dao;

import entities.Salle;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import util.HibernateUtil;

import java.util.Collections;
import java.util.List;

/**
 * Implémentation de la couche d'accès aux données pour l'entité Salle.
 */
public class SalleDao implements IDao<Salle> {

    @Override
    public boolean create(Salle salle) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.save(salle);
            tx.commit();
            return true;
        } catch (Exception ex) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
            System.err.println("Erreur lors de la persistance de la salle : " + ex.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(Salle salle) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.delete(salle);
            tx.commit();
            return true;
        } catch (Exception ex) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
            System.err.println("Erreur lors de la suppression de la salle : " + ex.getMessage());
            return false;
        }
    }

    @Override
    public boolean update(Salle salle) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.update(salle);
            tx.commit();
            return true;
        } catch (Exception ex) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
            System.err.println("Erreur lors de la mise à jour de la salle : " + ex.getMessage());
            return false;
        }
    }

    @Override
    public Salle getById(int id) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.get(Salle.class, id);
        } catch (Exception ex) {
            System.err.println("Erreur lors de la recherche de la salle par ID (" + id + ") : " + ex.getMessage());
            return null;
        }
    }

    @Override
    public List<Salle> getAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Query<Salle> query = session.createQuery("from Salle", Salle.class);
            return query.list();
        } catch (Exception ex) {
            System.err.println("Erreur lors de la récupération de la liste des salles : " + ex.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * Recherche une salle par son code unique en utilisant une requête HQL paramétrée.
     *
     * @param code Le code de la salle recherchée
     * @return L'instance de Salle trouvée, ou null sinon
     */
    public Salle findByCode(String code) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Query<Salle> query = session.createQuery("from Salle s where s.code = :code", Salle.class);
            query.setParameter("code", code);
            return query.uniqueResult();
        } catch (Exception ex) {
            System.err.println("Erreur lors de la recherche par code (" + code + ") : " + ex.getMessage());
            return null;
        }
    }
}
