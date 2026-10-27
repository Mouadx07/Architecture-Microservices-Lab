package test;

import config.AppConfig;
import metier.IMetier;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 * Non-regression test that validates the OCP contract:
 * the expected output must match the currently configured
 * DAO without modifying {@code MetierImpl} source code.
 *
 * <p>With the default configuration (Strategy A — DaoImpl
 * is {@code @Primary}), the result should be
 * {@code 100.0 * 2 = 200.0}.</p>
 */
public class OcpSelectionTest {

    private AnnotationConfigApplicationContext ctx;

    @Before
    public void setUp() {
        ctx = new AnnotationConfigApplicationContext(AppConfig.class);
    }

    @After
    public void tearDown() {
        if (ctx != null) {
            ctx.close();
        }
    }

    @Test
    public void defaultDaoShouldReturnExpectedResult() {
        IMetier metier = ctx.getBean(IMetier.class);
        assertNotNull("IMetier bean must be present", metier);

        // DaoImpl (prod, @Primary) returns 100.0
        // MetierImpl doubles it → 200.0
        double expected = 200.0;
        assertEquals(expected, metier.calcul(), 0.001);
    }
}
