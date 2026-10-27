package org.example.dao;

import org.example.model.Product;
import java.util.List;

public interface ProductDAO {
    void save(Product product);
    Product findById(Long id);
    List<Product> findAll();
    void delete(Long id);
}
