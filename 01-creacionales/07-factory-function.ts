/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

import { COLORS } from "../helpers/colors.ts";


type Language = 'es' | 'en' | 'fr' | 'de';

function createGreeter(language: Language) {

    return function (name: string) {
        const messages = {
            es: `Hola ${name}, ¿cómo estás?`,
            en: `Hello ${name}, how are you?`,
            fr: `Bonjour ${name}, comment ça va?`,
            de: `Hallo ${name}, wie geht's?`,
        };

        // return messages[language] || messages.en;
        return console.log(`%c${messages[language] || messages.en}`, COLORS.red);
    }
}

function main() {

    const greetInSpanish = createGreeter('es');
    const greetInEnglish = createGreeter('en');
    const greetInFrench = createGreeter('fr');
    const greetInGerman = createGreeter('de');

    greetInSpanish('Juan');
    greetInEnglish('John');
    greetInFrench('Jean');
    greetInGerman('Hans');
}

main();