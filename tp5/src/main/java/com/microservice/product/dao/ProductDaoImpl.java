package com.microservice.product.dao;

import com.microservice.product.entity.Product;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

/**
 * Implementation specifique a l'entite Product utilisant Hibernate SessionFactory.
 */
@Repository("productDao")
public class ProductDaoImpl implements IDao<Product> {

    private final SessionFactory sessionFactory;

    @Autowired
    public ProductDaoImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    private Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    @Override
    public void save(Product product) {
        Objects.requireNonNull(product, "L'objet Product a persister ne peut pas etre nul");
        getSession().save(product);
    }

    @Override
    public void update(Product product) {
        Objects.requireNonNull(product, "L'objet Product a mettre a jour ne peut pas etre nul");
        getSession().update(product);
    }

    @Override
    public void delete(Product product) {
        Objects.requireNonNull(product, "L'objet Product a supprimer ne peut pas etre nul");
        getSession().delete(product);
    }

    @Override
    public Product findById(Long id) {
        if (id == null) {
            return null;
        }
        return getSession().get(Product.class, id);
    }

    @Override
    public List<Product> findAll() {
        String hqlQuery = "SELECT p FROM Product p ORDER BY p.id ASC";
        return getSession().createQuery(hqlQuery, Product.class).getResultList();
    }
}
