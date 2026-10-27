import config.AppConfig;
import metier.IMetier;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * Application entry point.
 *
 * Bootstraps the Spring IoC container, fetches the
 * business-layer bean, runs the computation, and
 * prints the outcome before shutting down cleanly.
 */
public class Main {

    public static void main(String[] args) {

        System.out.println("=== Spring IoC / OCP Demo ===\n");

        // 1. Boot the container using Java-based config
        AnnotationConfigApplicationContext ctx =
                new AnnotationConfigApplicationContext(AppConfig.class);

        // 2. Retrieve the primary IMetier implementation
        IMetier metier = ctx.getBean(IMetier.class);

        // 3. Execute and display
        double outcome = metier.calcul();
        System.out.println("\n>> Final result : " + outcome);

        // 4. Graceful shutdown
        ctx.close();
    }
}
