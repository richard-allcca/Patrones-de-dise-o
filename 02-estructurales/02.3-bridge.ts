/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from '../helpers/colors.ts';

/**
 * En este ejemplo, tenemos un sistema de notificaciones que puede enviar
 * notificaciones a través de diferentes canales (correo electrónico, SMS,
 * notificaciones push). El patrón Bridge se utiliza para separar la lógica
 * de la notificación de los canales de comunicación.
 */

// 1. Interfaz NotificationChannel
// Define el método `send`, que cada canal de comunicación implementará.
interface NotificationChannel {
  send(message: string): void;
}

// ==================================================
// Definimos las clases para cada canal de comunicación (correo electrónico, SMS y notificaciones push).
// Estas clases implementan la interfaz `NotificationChannel` y proporcionan
// su propia implementación del método `send`.

class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

// ==================================================
// 3. Clase Abstracta Notification
// Define la propiedad `channel` y el método `notify`

abstract class Notification {
  protected channels: NotificationChannel[];

  constructor(channels: NotificationChannel[]) {
    this.channels = channels;
  }

  abstract notify(message: string): void;
  abstract addChannel(channel: NotificationChannel): void;
}

// ==================================================
// 4. Clase concreta AlertNotification
class AlertNotification extends Notification {
  override notify(message: string): void {
    console.log('\n%cNotificación de alerta', COLORS.red);
    this.channels.forEach((channel) => channel.send(message));
  }

  override addChannel(channel: NotificationChannel): void {
    this.channels.push(channel);
  }
}

// ==================================================
function main() {
  const channels = [
    new EmailChannel(),
    new SMSChannel(),
    new PushNotificationChannel(),
    new PushNotificationChannel(),
    new PushNotificationChannel(),
    new SMSChannel(),
    new EmailChannel(),
  ];

  const alert = new AlertNotification(channels);

  alert.notify('Alguien en frente de la casa');

  console.log('\n');
}

main();
