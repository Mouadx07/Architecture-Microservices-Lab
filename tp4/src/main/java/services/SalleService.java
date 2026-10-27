package services;

import dao.IDao;
import dao.SalleDao;
import entities.Salle;

import java.util.Collections;
import java.util.List;

/**
 * Couche service métier pour la gestion des salles.
 * Implémente le contrat IDao<Salle> pour exposer les fonctionnalités CRUD
 * tout en découplant les couches via l'injection de dépendances.
 */
public class SalleService implements IDao<Salle> {

    private final IDao<Salle> dao;

    /**
     * Constructeur par défaut utilisant l'implémentation standard SalleDao.
     */
    public SalleService() {
        this(new SalleDao());
    }

    /**
     * Constructeur avec injection du DAO pour faciliter les tests et le découplage.
     *
     * @param dao Implémentation du contrat IDao pour Salle
     */
    public SalleService(IDao<Salle> dao) {
        this.dao = dao;
    }

    @Override
    public boolean create(Salle salle) {
        if (salle == null) {
            System.err.println("Avertissement : Tentative de création d'une salle nulle.");
            return false;
        }
        return dao.create(salle);
    }

    @Override
    public boolean delete(Salle salle) {
        if (salle == null) {
            System.err.println("Avertissement : Tentative de suppression d'une salle nulle.");
            return false;
        }
        return dao.delete(salle);
    }

    @Override
    public boolean update(Salle salle) {
        if (salle == null) {
            System.err.println("Avertissement : Tentative de modification d'une salle nulle.");
            return false;
        }
        return dao.update(salle);
    }

    @Override
    public Salle getById(int id) {
        if (id <= 0) {
            return null;
        }
        return dao.getById(id);
    }

    @Override
    public List<Salle> getAll() {
        List<Salle> list = dao.getAll();
        return list != null ? list : Collections.emptyList();
    }

    /**
     * Recherche une salle par son code via le DAO spécifique.
     *
     * @param code Le code recherché
     * @return Salle correspondante ou null
     */
    public Salle findByCode(String code) {
        if (dao instanceof SalleDao) {
            return ((SalleDao) dao).findByCode(code);
        }
        return null;
    }
}
