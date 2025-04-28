/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

import { COLORS } from '../helpers/colors.ts';

/**
 * * ! Problema
 * En una aplicación de mapas, tenemos diferentes tipos de ubicaciones (hospitales,
 * escuelas, parques) y cada una tiene diferentes propiedades (coordenadas,
 * ícono). Si creamos una nueva instancia de cada tipo de ubicación cada vez que
 * la mostramos, podría consumir mucha memoria.
 * En su lugar, podemos usar el patrón Flyweight para compartir las instancias
 * de los íconos de las ubicaciones y así reducir la cantidad de memoria que
 * utilizan.
 */

// 1. Clase Flyweight - LocationIcon
// Representa las propiedades intrínsecas (compartidas) de las ubicaciones,
// como el tipo y el ícono.
class LocationIcon {
  private type: string; // hospital, escuela, parque
  private iconImage: string; // imagen del marcador

  constructor(type: string, iconImage: string) {
    this.type = type;
    this.iconImage = iconImage;
  }

  display(coordinates: { x: number; y: number }): void {
    console.log(
      `Coords: ${this.type} en ${coordinates.x}, ${coordinates.y} con ícono %c[${this.iconImage}]`,
      COLORS.green
    );
  }
}

// 2. Fábrica de Flyweights - LocationFactory
// Gestiona las instancias compartidas de LocationIcon.
class LocationFactory {
  private icons: Record<string, LocationIcon> = {};

  getLocationIcon(type: string): LocationIcon {
    if (!this.icons[type]) {
      console.log(`%cCreando una instancia del ícono de ${type}`, COLORS.red);
      const iconImage = `imagen_de_${type.toLowerCase()}.png`;
      this.icons[type] = new LocationIcon(type, iconImage);
    }

    return this.icons[type];
  }
}

// 3. Clase que representa una ubicación en el mapa - MapLocation
// Contiene las propiedades extrínsecas (no compartidas), como las coordenadas.
class MapLocation {
  private coordinates: { x: number; y: number };
  private icon: LocationIcon;

  constructor(x: number, y: number, icon: LocationIcon) {
    this.coordinates = { x, y };
    this.icon = icon;
  }

  display() {
    this.icon.display(this.coordinates);
  }
}

// 4. Código Cliente para probar el Flyweight
function main() {
  const factory = new LocationFactory();

  // Crear varias ubicaciones en el mapa
  const locations = [
    new MapLocation(10, 20, factory.getLocationIcon('hospital')),
    new MapLocation(20, 40, factory.getLocationIcon('hospital')),
    new MapLocation(30, 60, factory.getLocationIcon('hospital')),

    new MapLocation(35, 65, factory.getLocationIcon('parque')),
    new MapLocation(30, 60, factory.getLocationIcon('Escuela')),
  ];

  // Mostrar todas las ubicaciones
  locations.forEach((location) => location.display());
}

main();