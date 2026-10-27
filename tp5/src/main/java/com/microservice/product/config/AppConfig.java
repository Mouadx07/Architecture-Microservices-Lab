package com.microservice.product.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Contexte applicatif racine activant l'auto-detection des composants Spring (@Repository, @Service, @Configuration).
 */
@Configuration
@ComponentScan(basePackages = "com.microservice.product")
public class AppConfig {
}
