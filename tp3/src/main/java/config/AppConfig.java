package config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * Root Spring configuration.
 *
 * <ul>
 *   <li>{@code @ComponentScan} tells the container which
 *       packages to scan for annotated beans.</li>
 *   <li>{@code @PropertySource} loads the external
 *       properties file so that {@code @Value} bindings
 *       can resolve.</li>
 * </ul>
 */
@Configuration
@ComponentScan(basePackages = {"dao", "metier"})
@PropertySource("classpath:app.properties")
public class AppConfig {
    // Bean definitions live in dedicated config classes
    // to keep each file focused on a single concern.
}
