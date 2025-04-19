/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 */

interface Hamburger {
  prepare(): void;
}


//! Concrete Products (clases concretas)
class Cheeseburger implements Hamburger {
  prepare(): void {
    console.log("Preparando Cheeseburger...");
  }
}

class ChickenBurger implements Hamburger {
  prepare(): void {
    console.log("Preparando ChickenBurger...");
  }
}

class VeggieBurger implements Hamburger {
  prepare(): void {
    console.log("Preparando VeggieBurger...");
  }
}

//! Factory Method - Creator (clase abstracta)
abstract class Restaurant {
  protected abstract createHamburger(): Hamburger;

  orderHamburger(): void {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

//! Factory Method - Concrete Creators (subclases)
class CheeseRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new Cheeseburger();
  }
}

class ChickenRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new ChickenBurger();
  }
}

class VeggieRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new VeggieBurger();
  }
}

// Client
function main() {
  let restaurant: Restaurant;
  const burgerType = prompt(
    "Seleccione el tipo de hamburguesa: 1. Cheeseburger, 2. ChickenBurger, 3. VeggieBurger\n",
  );

  // Según la opción seleccionada, se crea una instancia de la clase correspondiente
  switch (burgerType) {
    case "1":
      restaurant = new CheeseRestaurant();
      break;
    case "2":
      restaurant = new ChickenRestaurant();
      break;
    case "3":
        restaurant = new VeggieRestaurant();
        break;
    default:
      throw new Error("Tipo de hamburguesa no válido");
  }

  // Se llama al método orderHamburger() de la instancia creada
  // Esto invocará al método prepare() de la hamburguesa correspondiente
  restaurant.orderHamburger();
}

main();
