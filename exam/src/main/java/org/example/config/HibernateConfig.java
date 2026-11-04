package org.example.config;

import org.hibernate.SessionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableTransactionManagement // active @Transactional
public class HibernateConfig {

    // Le DataSource est cree par Spring Boot depuis application.properties
    @Bean
    public LocalSessionFactoryBean sessionFactory(DataSource dataSource) {
        LocalSessionFactoryBean factory = new LocalSessionFactoryBean();
        factory.setDataSource(dataSource);
        factory.setPackagesToScan("org.example.entities"); // ou chercher les @Entity

        Properties props = new Properties();
        // "create" : la table est recreee a chaque lancement -> les id repartent de 1
        props.setProperty("hibernate.hbm2ddl.auto", "create");
        props.setProperty("hibernate.show_sql", "false");
        factory.setHibernateProperties(props);

        return factory;
    }

    // Ouvre / valide / annule les transactions Hibernate pour @Transactional
    @Bean
    public HibernateTransactionManager transactionManager(SessionFactory sessionFactory) {
        return new HibernateTransactionManager(sessionFactory);
    }
}
