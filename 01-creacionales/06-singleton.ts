/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls {
    private static instance: DragonBalls;
    private dragonBalls: number;

    private constructor() {
        this.dragonBalls = 0;
    }

    public static getInstance(): DragonBalls {
        if (!DragonBalls.instance) {
            DragonBalls.instance = new DragonBalls();
            console.log('Se ha creado una nueva instancia de DragonBalls');
        }
        return DragonBalls.instance;
    }

    public collectDragonBall(): void {
        if (this.dragonBalls < 7) {
            this.dragonBalls++;
            console.log(`Se ha recogido una Dragon Ball. Total: ${this.dragonBalls}`);
        }

        console.log('Ya se han recogido las 7 Dragon Balls');
    }

    public summonShenlong(): void {
        if (this.dragonBalls === 7) {
            console.log('Se ha invocado a Shenlong');
            this.dragonBalls = 0;
        }
        console.log(`No se han reunido las 7 Dragon Balls aun faltan: ${7 - this.dragonBalls} `);
    }
}

function main(){
    const dragonBallsOfGoku = DragonBalls.getInstance();
    const dragonBallsOfVegeta = DragonBalls.getInstance();

    console.log(dragonBallsOfGoku === dragonBallsOfVegeta); // true

    dragonBallsOfGoku.collectDragonBall(); // Se ha recogido una Dragon Ball. Total: 1
    dragonBallsOfGoku.collectDragonBall(); // Se ha recogido una Dragon Ball. Total: 2
    dragonBallsOfGoku.collectDragonBall(); // Se ha recogido una Dragon Ball. Total: 3
    dragonBallsOfGoku.collectDragonBall(); // Se ha recogido una Dragon Ball. Total: 4

    dragonBallsOfGoku.summonShenlong(); // Se ha invocado a Shenlong

    dragonBallsOfVegeta.collectDragonBall(); // Se ha recogido una Dragon Ball. Total: 5
    dragonBallsOfVegeta.collectDragonBall(); // Se ha recogido una Dragon Ball. Total: 6
    dragonBallsOfVegeta.collectDragonBall(); // Ya se han recogido las 7 Dragon Balls

    dragonBallsOfVegeta.summonShenlong(); // Se ha invocado a Shenlong
}

main();