package com.microservice.product.config;

import org.hibernate.SessionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Configuration declarative des transactions avec Spring Transaction Management.
 */
@Configuration
@EnableTransactionManagement(proxyTargetClass = true)
public class TransactionConfig {

    /**
     * Gestionnaire de transactions deleguant a la SessionFactory Hibernate.
     *
     * @param sessionFactory instance configuree dans HibernateConfig
     * @return gestionnaire de transactions pour Spring
     */
    @Bean
    public PlatformTransactionManager transactionManager(SessionFactory sessionFactory) {
        HibernateTransactionManager transactionManager = new HibernateTransactionManager();
        transactionManager.setSessionFactory(sessionFactory);
        return transactionManager;
    }
}
