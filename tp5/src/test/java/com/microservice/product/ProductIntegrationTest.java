package com.microservice.product;

import com.microservice.product.config.TestHibernateConfig;
import com.microservice.product.entity.Product;
import com.microservice.product.service.ProductService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = TestHibernateConfig.class)
class ProductIntegrationTest {

    @Autowired
    private ProductService productService;

    @Test
    @DisplayName("Test d'integration complet : persistence, relecture et mise a jour d'un produit")
    void testEndToEndProductFlow() {
        // 1. Creation et sauvegarde
        Product item = new Product("Serveur Microservice", 1290.00);
        productService.addProduct(item);

        assertNotNull(item.getId(), "L'identifiant genere par la base ne doit pas etre null");

        // 2. Consultation
        Product fetched = productService.getProductById(item.getId());
        assertNotNull(fetched);
        assertEquals("Serveur Microservice", fetched.getName());
        assertEquals(1290.00, fetched.getPrice());

        // 3. Liste des produits
        List<Product> allProducts = productService.getAllProducts();
        assertFalse(allProducts.isEmpty());

        // 4. Mise a jour
        fetched.setPrice(1150.00);
        productService.updateProduct(fetched);

        Product updated = productService.getProductById(item.getId());
        assertEquals(1150.00, updated.getPrice());
    }
}
