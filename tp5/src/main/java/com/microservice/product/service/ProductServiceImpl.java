package com.microservice.product.service;

import com.microservice.product.dao.IDao;
import com.microservice.product.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Implementation metier assurant les validations de regles de gestion
 * et la delegation vers la couche d'acces aux donnees.
 */
@Service("productService")
public class ProductServiceImpl implements ProductService {

    private final IDao<Product> productDao;

    @Autowired
    public ProductServiceImpl(IDao<Product> productDao) {
        this.productDao = productDao;
    }

    @Override
    @Transactional
    public void addProduct(Product product) {
        if (product == null) {
            throw new IllegalArgumentException("Impossible d'ajouter une reference produit nulle.");
        }
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Le nom du produit ne peut pas etre vide.");
        }
        if (product.getPrice() < 0) {
            throw new IllegalArgumentException("Le prix ne peut pas être négatif");
        }

        productDao.save(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Product getProductById(Long id) {
        if (id == null) {
            return null;
        }
        return productDao.findById(id);
    }

    @Override
    @Transactional
    public void updateProduct(Product product) {
        if (product == null || product.getId() == null) {
            throw new IllegalArgumentException("Produit invalide pour mise a jour.");
        }
        if (product.getPrice() < 0) {
            throw new IllegalArgumentException("Le prix ne peut pas être négatif");
        }
        productDao.update(product);
    }

    @Override
    @Transactional
    public void removeProduct(Long id) {
        Product target = getProductById(id);
        if (target != null) {
            productDao.delete(target);
        }
    }
}
