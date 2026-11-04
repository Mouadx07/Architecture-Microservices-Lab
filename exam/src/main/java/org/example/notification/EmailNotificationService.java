package org.example.notification;

import org.springframework.stereotype.Service;

// "email" = nom du bean, utilisé ensuite par @Qualifier
@Service("email")
public class EmailNotificationService implements NotificationService {

    @Override
    public void envoyer(String message) {
        System.out.println("[EMAIL] " + message);
    }
}
