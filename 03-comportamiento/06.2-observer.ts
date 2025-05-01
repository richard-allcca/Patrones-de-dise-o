/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from '../helpers/colors.ts';

/**
 * * ! Patrón Observer
 * En este ejemplo, tenemos una estación meteorológica (WeatherStation)
 * que actúa como el sujeto y varias aplicaciones de clima (WeatherApp)
 * que actúan como observadores.
 * Cuando la estación meteorológica actualiza el clima,
 * notifica a todas las aplicaciones suscritas,
 * y cada aplicación recibe la actualización y puede actuar en consecuencia.
 */

// Interfaz Observer
interface Observer {
  notifyUpdate(weatherData: string): void;
}

// Clase Subject - Se encarga de gestionar los Observers
// y notificarles sobre los cambios en el estado
class WeatherStation {
  private observers: Observer[] = [];
  private weatherData: string = 'Soleado';

  // Agregar un Observer
  subscribe(observer: Observer): void {
    this.observers.push(observer);
    observer.notifyUpdate(this.weatherData);

    console.log(
      '%cNueva aplicación suscrita al sistema meteorológico.',
      COLORS.green
    );
  }

  // Eliminar un Observer
  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((sub) => sub !== observer);
    console.log(`%cUna aplicación se ha dado de baja`, COLORS.red);
  }

  // Actualizar el clima y notificar a todos los Observers
  setWeather(weatherData: string): void {
    console.log(`\nClima actualizado: %c${weatherData}`, COLORS.blue);

    this.weatherData = weatherData;
    this.notifyObservers();
  }

  // Notificar a todos los Observers
  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.notifyUpdate(this.weatherData);
    }
  }
}

// Clase Observer - WeatherApp
class WeatherApp implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Recibir actualización del clima
  notifyUpdate(weatherData: string): void {
    console.log(
      `%c${this.name} %cha recibido notificación del clima: %c${weatherData}`,
      COLORS.red,
      COLORS.white,
      COLORS.yellow
    );
  }
}

// Código Cliente para Probar
function main(): void {
  const weatherStation = new WeatherStation();

  // Crear aplicaciones
  const flutterWeatherApp = new WeatherApp('Flutter WeatherApp');
  const reactNativeWeatherApp = new WeatherApp('React Native WeatherApp');
  const weatherTrackerApp = new WeatherApp('Weather Tracker App');

  // Suscribir aplicaciones a la estación meteorológica
  weatherStation.subscribe(flutterWeatherApp);
  weatherStation.subscribe(reactNativeWeatherApp);

  // Actualizar el clima
  weatherStation.setWeather('Lluvioso');

  // Agregar una nueva aplicación
  weatherStation.subscribe(weatherTrackerApp);
  weatherStation.setWeather('Nublado');

  // Una aplicación se da de baja
  weatherStation.unsubscribe(reactNativeWeatherApp);
  weatherStation.setWeather('Tormenta eléctrica');
}

main();
