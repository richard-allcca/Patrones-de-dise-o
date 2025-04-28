/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
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

// ===========================================================
// 2. SECTION - Implementaciones de Canales de Comunicación

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

// ===========================================================
// 3. SECTION - Clase Abstracta Notification
// Define la propiedad `channel` y el método `notify`

abstract class Notification {

  protected channel: NotificationChannel;

  constructor(channel: NotificationChannel) {
    this.channel = channel; // Asignar el canal al canal de la notificación
  }

  abstract setChannel(channel: NotificationChannel): void;
  abstract notify(message: string): void;
}

// ===========================================================
// 4. SECTION - Clases Concretas de Notificaciones

class AlertNotification extends Notification {
  notify(message: string): void {
    console.log('\n%cNotificación de Alerta:', COLORS.red);
    this.channel.send(message);
  }

  setChannel(channel: NotificationChannel): void {
    this.channel = channel; // Asignar el nuevo canal a la propiedad `channel`
  }
}

class ReminderNotification extends Notification {
  notify(message: string): void {
    console.log('\n%cNotificación de Recordatorio:', COLORS.blue);
    this.channel.send(message);
  }

  setChannel(channel: NotificationChannel): void {
    this.channel = channel; // Asignar el nuevo canal a la propiedad `channel`
  }
}

class PushNotification extends Notification {
  override notify(message: string): void {
    console.log('\n%cNotificación de Push:', COLORS.green);
    this.channel.send(message);
  }

  override setChannel(channel: NotificationChannel): void {
    this.channel = channel; // Asignar el nuevo canal a la propiedad `channel`
  }
}

// ============================================================
// Aquí se crean instancias de las notificaciones y se envían mensajes a través de diferentes canales.
function main() {

  // Crear una notificación de alerta usando el canal de correo electrónico
  const alert = new AlertNotification(new EmailChannel());

  alert.notify('Alerta de seguridad: Se ha detectado un acceso no autorizado.');

  // Cambiar el canal a SMS y volver a enviar la alerta
  alert.setChannel(new SMSChannel());
  alert.notify('Alerta de seguridad: Se ha detectado un acceso no autorizado.');

  // ===========================================================

  // Crear una notificación de recordatorio usando el canal de SMS
  const reminder = new ReminderNotification(new SMSChannel());
  reminder.notify(
    'Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m.'
  );

  // Cambiar el canal de recordatorio a correo electrónico y enviar nuevamente
  reminder.setChannel(new PushNotificationChannel());
  reminder.notify(
    'Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m.'
  );

  // ===========================================================

  // Crear una notificación de push usando el canal de notificación push
  const push = new PushNotification(new PushNotificationChannel());
  push.notify('Nueva actualización disponible. Haz clic para instalar.');
}

main();
