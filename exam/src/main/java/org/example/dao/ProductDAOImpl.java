package org.example.dao;

import org.example.entities.Product;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductDAOImpl implements ProductDAO {

    private final SessionFactory sessionFactory;

    public ProductDAOImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    // Session liee a la transaction ouverte par @Transactional dans le service
    private Session session() {
        return sessionFactory.getCurrentSession();
    }

    @Override
    public void save(Product product) {
        session().persist(product);
    }

    @Override
    public Product findById(Long id) {
        return session().get(Product.class, id);
    }

    @Override
    public List<Product> findAll() {
        // HQL : on interroge l'entite Product, pas la table
        return session().createQuery("from Product p order by p.id", Product.class).getResultList();
    }

    @Override
    public void delete(Long id) {
        Product product = session().get(Product.class, id);
        if (product != null) {
            session().remove(product);
        }
    }
}
