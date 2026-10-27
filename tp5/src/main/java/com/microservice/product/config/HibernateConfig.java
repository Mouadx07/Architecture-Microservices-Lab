package com.microservice.product.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

import javax.sql.DataSource;
import java.util.Properties;

/**
 * Configuration principale de la couche de persistance (DataSource et SessionFactory Hibernate).
 */
@Configuration
@PropertySource("classpath:application.properties")
public class HibernateConfig {

    private final Environment environment;

    @Autowired
    public HibernateConfig(Environment environment) {
        this.environment = environment;
    }

    /**
     * Source de donnees basee sur les proprietes chargees depuis application.properties.
     */
    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName(environment.getRequiredProperty("jdbc.driver"));
        ds.setUrl(environment.getRequiredProperty("jdbc.url"));
        ds.setUsername(environment.getRequiredProperty("jdbc.username"));
        ds.setPassword(environment.getProperty("jdbc.password", ""));
        return ds;
    }

    /**
     * Fabrique de sessions Hibernate (LocalSessionFactoryBean) assurant
     * l'integration avec l'ecosysteme Spring ORM.
     */
    @Bean
    public LocalSessionFactoryBean sessionFactory() {
        LocalSessionFactoryBean factoryBean = new LocalSessionFactoryBean();
        factoryBean.setDataSource(dataSource());
        factoryBean.setPackagesToScan("com.microservice.product.entity");

        Properties hibernateProperties = new Properties();
        hibernateProperties.put("hibernate.dialect", environment.getProperty("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect"));
        hibernateProperties.put("hibernate.show_sql", environment.getProperty("hibernate.show_sql", "true"));
        hibernateProperties.put("hibernate.format_sql", environment.getProperty("hibernate.format_sql", "true"));
        hibernateProperties.put("hibernate.hbm2ddl.auto", environment.getProperty("hibernate.hbm2ddl.auto", "update"));

        factoryBean.setHibernateProperties(hibernateProperties);
        return factoryBean;
    }
}
