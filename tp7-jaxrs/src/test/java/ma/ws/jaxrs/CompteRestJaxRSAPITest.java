package ma.ws.jaxrs;

import ma.ws.jaxrs.entities.Compte;
import ma.ws.jaxrs.entities.TypeCompte;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CompteRestJaxRSAPITest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private org.springframework.context.ApplicationContext applicationContext;

    @Test
    void testPutCompteXml() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", MediaType.APPLICATION_XML_VALUE);
        headers.set("Accept", MediaType.APPLICATION_XML_VALUE);

        String xmlBody = "<compte><solde>9999.0</solde><type>COURANT</type></compte>";
        HttpEntity<String> request = new HttpEntity<>(xmlBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:" + port + "/banque/comptes/1",
                HttpMethod.PUT,
                request,
                String.class
        );

        System.out.println("PUT /banque/comptes/1 response status: " + response.getStatusCode());
        System.out.println("PUT /banque/comptes/1 response body: " + response.getBody());
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("9999.0");
    }

    @Test
    void testDeleteCompte() {
        ResponseEntity<Void> response = restTemplate.exchange(
                "http://localhost:" + port + "/banque/comptes/2",
                HttpMethod.DELETE,
                null,
                Void.class
        );

        System.out.println("DELETE /banque/comptes/2 response status: " + response.getStatusCode());
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

    @Test
    void testGetCompteJson() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:" + port + "/banque/comptes/1",
                HttpMethod.GET,
                request,
                String.class
        );

        System.out.println("GET /banque/comptes/1 JSON response: " + response.getBody());
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("\"solde\":");
    }

    @Test
    void testGetCompteXml() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_XML_VALUE);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:" + port + "/banque/comptes/1",
                HttpMethod.GET,
                request,
                String.class
        );

        System.out.println("GET /banque/comptes/1 response status: " + response.getStatusCode());
        System.out.println("GET /banque/comptes/1 response body: " + response.getBody());
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("<compte>");
    }

    @Test
    void testGetComptesXml() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_XML_VALUE);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:" + port + "/banque/comptes",
                HttpMethod.GET,
                request,
                String.class
        );

        System.out.println("GET /banque/comptes response status: " + response.getStatusCode());
        System.out.println("GET /banque/comptes response body: " + response.getBody());
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    void testPostCompteXml() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", MediaType.APPLICATION_XML_VALUE);
        headers.set("Accept", MediaType.APPLICATION_XML_VALUE);

        String xmlBody = "<compte><solde>5000.0</solde><type>COURANT</type></compte>";
        HttpEntity<String> request = new HttpEntity<>(xmlBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:" + port + "/banque/comptes",
                HttpMethod.POST,
                request,
                String.class
        );

        System.out.println("POST /banque/comptes response status: " + response.getStatusCode());
        System.out.println("POST /banque/comptes response body: " + response.getBody());
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("<compte>");
    }
}
