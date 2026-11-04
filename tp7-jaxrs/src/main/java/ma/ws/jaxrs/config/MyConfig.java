package ma.ws.jaxrs.config;

import io.swagger.v3.jaxrs2.integration.resources.OpenApiResource;
import io.swagger.v3.oas.integration.SwaggerConfiguration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import jakarta.ws.rs.ApplicationPath;
import ma.ws.jaxrs.controllers.CompteRestJaxRSAPI;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.Set;

@Configuration
public class MyConfig {
    @Bean
    public ResourceConfig resourceConfig() {
        ResourceConfig jerseyServlet = new ResourceConfig();
        jerseyServlet.register(CompteRestJaxRSAPI.class);

        // Expose la documentation OpenAPI sur /openapi.json pour Swagger UI
        OpenApiResource openApiResource = new OpenApiResource();
        openApiResource.setOpenApiConfiguration(new SwaggerConfiguration()
                .resourceClasses(Set.of(CompteRestJaxRSAPI.class.getName()))
                .openAPI(new OpenAPI().info(new Info()
                        .title("API Banque - JAX-RS")
                        .description("Gestion des comptes bancaires (JSON et XML)")
                        .version("1.0"))));
        jerseyServlet.register(openApiResource);

        // Les URLs inconnues de Jersey (ex: /swagger-ui) sont transmises à Spring MVC
        jerseyServlet.property(ServletProperties.FILTER_FORWARD_ON_404, true);
        return jerseyServlet;
    }
}
