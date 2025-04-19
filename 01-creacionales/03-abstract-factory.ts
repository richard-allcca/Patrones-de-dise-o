/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

import { COLORS } from "../helpers/colors.ts";

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

interface Hamburger {
    prepare(): void;
}

interface Drink {
    pour(): void;
}

// ! Concrete Products

class ChickenHamburger implements Hamburger {
    prepare(): void {
        console.log('%cPreparing Chicken Hamburger', COLORS.yellow);
    }
}

class BeefHamburger implements Hamburger {
    prepare(): void {
        console.log('%cPreparing Beef Hamburger', COLORS.cyan);
    }
}

class Water implements Drink {
    pour(): void {
        console.log('%cPouring Water', COLORS.yellow);
    }
}

class Soda implements Drink {
    pour(): void {
        console.log('%cPouring Soda', COLORS.cyan);
    }
}

// ! Abstract Factory

interface RestaurantFactory {
    createHamburger(): Hamburger;
    createDrink(): Drink;
}

class FastFoodFactory implements RestaurantFactory {
    createHamburger(): Hamburger {
        return new BeefHamburger();
    }

    createDrink(): Drink {
        return new Soda();
    }
}

class HealthyRestaurantFactory implements RestaurantFactory {
    createHamburger(): Hamburger {
        return new ChickenHamburger();
    }

    createDrink(): Drink {
        return new Water();
    }
}


//! Client Code

function main(factory: RestaurantFactory) {
    const hamburger = factory.createHamburger();
    const drink = factory.createDrink();

    hamburger.prepare();
    drink.pour();
}

console.log('\n%cFast Restaurant Factory:', COLORS.orange);
main(new FastFoodFactory());

console.log('\n%cHealthy Restaurant Factory:', COLORS.orange);
main(new HealthyRestaurantFactory());

