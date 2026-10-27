package org.example.service;

import org.example.dao.ProductDAO;
import org.example.model.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductService {

    private final ProductDAO productDAO;

    // Injection de dépendance par constructeur
    public ProductService(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    public void save(Product product) {
        productDAO.save(product);
    }

    @Transactional(readOnly = true)
    public Product findById(Long id) {
        return productDAO.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Product> findAll() {
        return productDAO.findAll();
    }

    public void delete(Long id) {
        productDAO.delete(id);
    }
}
