package com.microservice.product.service;

import com.microservice.product.dao.IDao;
import com.microservice.product.entity.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private IDao<Product> productDao;

    @InjectMocks
    private ProductServiceImpl productService;

    private Product validProduct;

    @BeforeEach
    void setUp() {
        validProduct = new Product("Ecran Ultra HD 4K", 399.99);
    }

    @Test
    @DisplayName("Devrait sauvegarder un produit valide avec succes")
    void testAddProductSuccess() {
        productService.addProduct(validProduct);
        verify(productDao, times(1)).save(validProduct);
    }

    @Test
    @DisplayName("Devrait rejeter un produit avec un prix negatif")
    void testAddProductNegativePriceThrowsException() {
        Product invalidProduct = new Product("Souris Gamer", -15.50);

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> productService.addProduct(invalidProduct)
        );

        assertEquals("Le prix ne peut pas être négatif", exception.getMessage());
        verify(productDao, never()).save(any(Product.class));
    }

    @Test
    @DisplayName("Devrait rejeter un produit ayant un nom vide ou nul")
    void testAddProductBlankNameThrowsException() {
        Product productWithoutName = new Product("   ", 49.00);

        assertThrows(
                IllegalArgumentException.class,
                () -> productService.addProduct(productWithoutName)
        );

        verify(productDao, never()).save(any(Product.class));
    }

    @Test
    @DisplayName("Devrait recuperer tous les produits enregistres")
    void testGetAllProducts() {
        List<Product> mockCatalog = Arrays.asList(
                new Product(1L, "Clavier Mecanique", 89.90),
                new Product(2L, "Casque Audio", 120.00)
        );

        when(productDao.findAll()).thenReturn(mockCatalog);

        List<Product> result = productService.getAllProducts();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Clavier Mecanique", result.get(0).getName());
        verify(productDao, times(1)).findAll();
    }
}
