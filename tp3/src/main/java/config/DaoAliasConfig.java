package config;

import dao.DaoApi;
import dao.IDao;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * <b>Strategy B</b> — Alias via {@code @Bean}.
 *
 * <p>Instead of adding {@code @Primary} on a DAO class
 * itself, we create a factory method here that returns
 * whichever implementation we want.  To switch targets
 * we only modify this single class — the DAO classes and
 * the business layer stay untouched.</p>
 *
 * <p><strong>Note:</strong> Only one {@code @Primary} bean
 * of type IDao may be active at a time.  If you enable
 * this configuration, remove or comment out the
 * {@code @Primary} on {@code DaoImpl}.</p>
 */
// @Configuration   // <-- uncomment to activate Strategy B
public class DaoAliasConfig {

    @Bean
    @Primary
    public IDao daoAlias() {
        // Switch the return statement to redirect injection
        return new DaoApi();
    }
}
