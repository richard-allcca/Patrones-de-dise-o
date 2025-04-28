/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 */

import { COLORS } from '../helpers/colors.ts';

/**
 * * ! Problema
 * En un juego, tenemos diferentes tipos de balas (pistola, escopeta, rifle) y
 * cada una tiene diferentes propiedades (daño, color). Si creamos una nueva
 * instancia de cada tipo de bala cada vez que disparamos
 * podría consumir mucha memoria.
 * En su lugar, podemos usar el patrón Flyweight para compartir las instancias
 * de los tipos de balas y así reducir la cantidad de memoria que utilizan.
 */

// 1. Clase que representa el tipo de bala - BulletType (Flyweight)
// Esta clase contiene las propiedades intrínsecas (compartidas) de las balas,
// como el nombre, el daño y el color. Estas propiedades son inmutables y se
// comparten entre todas las balas del mismo tipo.
class BulletType {
  private name: string;
  private damage: number;
  private color: string;

  constructor(name: string, damage: number, color: string) {
    this.name = name;
    this.damage = damage;
    this.color = color;
  }

  getName(): string {
    return this.name;
  }

  getDamage(): number {
    return this.damage;
  }

  getColor(): string {
    return this.color;
  }
}

// 2. Fábrica de Flyweights - BulletTypeFactory
// Esta clase se encarga de gestionar las instancias de BulletType. Si ya existe
// un BulletType con las mismas propiedades, lo reutiliza; de lo contrario, crea
// una nueva instancia.
class BulletTypeFactory {
  private bulletTypes: Record<string, BulletType> = {};

  getBulletType(name: string, damage: number, color: string): BulletType {
    const key = `${name}-${damage}-${color}`;

    if (!this.bulletTypes[key]) {
      console.log(`%cCreando una instancia ${key}`, COLORS.red);
      this.bulletTypes[key] = new BulletType(name, damage, color);
    }

    return this.bulletTypes[key];
  }
}

// 3. Clase que representa una Bala - Bullet
// Esta clase contiene las propiedades extrínsecas (no compartidas) de las balas,
// como las coordenadas y la dirección. Cada bala tiene su propia instancia,
// pero comparte el BulletType para ahorrar memoria.
class Bullet {
  private x: number;
  private y: number;
  private direction: number;
  private bulletType: BulletType;

  constructor(x: number, y: number, direction: number, bulletType: BulletType) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.bulletType = bulletType;
  }

  display(): void {
    const text = `
      Bala del tipo: %c"${this.bulletType.getName()}" 
      %cCoords: (${this.x}, ${this.y})
      Dirección ${this.direction}
      Daño: ${this.bulletType.getDamage()} 
      Color: ${this.bulletType.getColor()}
    `;

    console.log(text, COLORS.green, COLORS.white);
  }
}

// 4. Sistema de Disparos - ShootingSystem
// Esta clase gestiona las balas disparadas y utiliza la fábrica para obtener
// instancias compartidas de BulletType.
class ShootingSystem {
  private bullets: Bullet[] = [];
  private factory: BulletTypeFactory;

  constructor(factory: BulletTypeFactory) {
    this.factory = factory;
  }

  shoot(
    x: number,
    y: number,
    direction: number,
    type: string,
    damage: number,
    color: string
  ): void {
    // Obtener un BulletType compartido desde la fábrica
    const bulletType = this.factory.getBulletType(type, damage, color);

    // Crear una nueva bala con propiedades extrínsecas
    const bullet = new Bullet(x, y, direction, bulletType);
    this.bullets.push(bullet);

    // Mostrar la bala
    bullet.display();
  }

  getBulletCount(): number {
    return this.bullets.length;
  }
}

// 5. Código Cliente para probar el Flyweight
function main() {
  const factory = new BulletTypeFactory();
  const shootingSystem = new ShootingSystem(factory);

  // Disparar varias balas de diferentes tipos
  shootingSystem.shoot(10, 20, 0, 'Pistola', 10, 'Gris');
  shootingSystem.shoot(15, 25, 90, 'Escopeta', 20, 'Rojo');
  shootingSystem.shoot(20, 30, 180, 'Rifle', 15, 'Verde');
  shootingSystem.shoot(10, 20, 45, 'Pistola', 10, 'Gris');
  shootingSystem.shoot(25, 35, 270, 'Escopeta', 20, 'Rojo');

  // Mostrar el total de balas disparadas
  console.log(
    `Total de balas disparadas: %c${shootingSystem.getBulletCount()}\n`,
    COLORS.yellow
  );
}

main();