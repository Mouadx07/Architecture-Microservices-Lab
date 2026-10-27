package org.example.dao;

import org.example.model.Product;
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

    private Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    @Override
    public void save(Product product) {
        Session session = getSession();
        session.persist(product);
    }

    @Override
    public Product findById(Long id) {
        Session session = getSession();
        return session.get(Product.class, id);
    }

    @Override
    public List<Product> findAll() {
        Session session = getSession();
        return session.createQuery("from Product", Product.class).getResultList();
    }

    @Override
    public void delete(Long id) {
        Session session = getSession();
        Product product = session.get(Product.class, id);
        if (product != null) {
            session.remove(product);
        }
    }
}
