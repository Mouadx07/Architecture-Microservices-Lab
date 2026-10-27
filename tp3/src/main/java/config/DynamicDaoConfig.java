package config;

import dao.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * <b>Strategy C</b> — Runtime selection driven by an
 * external property ({@code dao.target} in
 * {@code app.properties}).
 *
 * <p>This is the most flexible approach: changing the
 * property value and restarting the application is enough
 * to swap the data source — no recompilation required.</p>
 */
// @Configuration   // <-- uncomment to activate Strategy C
public class DynamicDaoConfig {

    @Value("${dao.target:dao}")
    private String daoTarget;

    @Bean
    @Primary
    public IDao dynamicDao() {
        return switch (daoTarget) {
            case "dao"     -> new DaoImpl();
            case "dao2"    -> new DaoImpl2();
            case "daoFile" -> new DaoFile();
            case "daoApi"  -> new DaoApi();
            default -> throw new IllegalArgumentException(
                    "Unknown DAO target: " + daoTarget);
        };
    }
}
