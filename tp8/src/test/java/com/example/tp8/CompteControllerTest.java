package com.example.tp8;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Tests d'intégration du CompteController.
 * Les 3 comptes insérés par le CommandLineRunner (ids 1, 2, 3) servent de données de départ.
 */
@SpringBootTest
@AutoConfigureMockMvc
class CompteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    /** Affiche la requête, le statut et le corps de la réponse dans la console. */
    private ResultActions log(String requete, ResultActions actions) throws Exception {
        MvcResult r = actions.andReturn();
        System.out.println(requete + " -> " + r.getResponse().getStatus()
                + " " + r.getResponse().getContentAsString());
        return actions;
    }

    @Test
    void getComptesJson() throws Exception {
        log("GET /banque/comptes (JSON)", mockMvc.perform(get("/banque/comptes").accept(MediaType.APPLICATION_JSON)))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").exists());
    }

    @Test
    void getComptesXml() throws Exception {
        log("GET /banque/comptes (XML)", mockMvc.perform(get("/banque/comptes").accept(MediaType.APPLICATION_XML)))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_XML))
                .andExpect(xpath("//solde").exists());
    }

    @Test
    void getCompteParIdJson() throws Exception {
        log("GET /banque/comptes/1 (JSON)", mockMvc.perform(get("/banque/comptes/1").accept(MediaType.APPLICATION_JSON)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void getCompteParIdXml() throws Exception {
        log("GET /banque/comptes/1 (XML)", mockMvc.perform(get("/banque/comptes/1").accept(MediaType.APPLICATION_XML)))
                .andExpect(status().isOk())
                .andExpect(xpath("/Compte/id").string("1"));
    }

    @Test
    void getCompteInexistant() throws Exception {
        log("GET /banque/comptes/999", mockMvc.perform(get("/banque/comptes/999").accept(MediaType.APPLICATION_JSON)))
                .andExpect(status().isNotFound());
    }

    @Test
    void postCompteJson() throws Exception {
        String body = "{\"solde\":7500.0,\"dateCreation\":\"2026-11-04\",\"type\":\"COURANT\"}";
        log("POST /banque/comptes (JSON)", mockMvc.perform(post("/banque/comptes")
                        .contentType(MediaType.APPLICATION_JSON).content(body)
                        .accept(MediaType.APPLICATION_JSON)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.solde").value(7500.0))
                .andExpect(jsonPath("$.type").value("COURANT"));
    }

    @Test
    void postCompteXml() throws Exception {
        String body = "<Compte><solde>3000.0</solde><type>EPARGNE</type></Compte>";
        log("POST /banque/comptes (XML)", mockMvc.perform(post("/banque/comptes")
                        .contentType(MediaType.APPLICATION_XML).content(body)
                        .accept(MediaType.APPLICATION_XML)))
                .andExpect(status().isOk())
                .andExpect(xpath("/Compte/solde").string("3000.0"))
                .andExpect(xpath("/Compte/type").string("EPARGNE"));
    }

    @Test
    void putCompte() throws Exception {
        String body = "{\"solde\":9999.0,\"dateCreation\":\"2026-11-04\",\"type\":\"COURANT\"}";
        log("PUT /banque/comptes/1", mockMvc.perform(put("/banque/comptes/1")
                        .contentType(MediaType.APPLICATION_JSON).content(body)
                        .accept(MediaType.APPLICATION_JSON)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.solde").value(9999.0))
                .andExpect(jsonPath("$.type").value("COURANT"));
    }

    @Test
    void deleteCompte() throws Exception {
        log("DELETE /banque/comptes/2", mockMvc.perform(delete("/banque/comptes/2")))
                .andExpect(status().isOk());
        log("GET /banque/comptes/2", mockMvc.perform(get("/banque/comptes/2").accept(MediaType.APPLICATION_JSON)))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteCompteInexistant() throws Exception {
        log("DELETE /banque/comptes/999", mockMvc.perform(delete("/banque/comptes/999")))
                .andExpect(status().isNotFound());
    }
}
