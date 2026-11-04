package org.example.service;

import org.example.dao.ProductDAO;
import org.example.entities.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional // chaque methode publique s'execute dans une transaction
public class ProductService {

    private final ProductDAO productDAO;

    public ProductService(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    public void ajouter(Product product) {
        productDAO.save(product);
    }

    public Product chercher(Long id) {
        return productDAO.findById(id);
    }

    public List<Product> lister() {
        return productDAO.findAll();
    }

    public void supprimer(Long id) {
        productDAO.delete(id);
    }
}
