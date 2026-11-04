package org.example.notification;

import org.springframework.stereotype.Service;

@Service("sms")
public class SmsNotificationService implements NotificationService {

    @Override
    public void envoyer(String message) {
        System.out.println("[SMS] " + message);
    }
}
