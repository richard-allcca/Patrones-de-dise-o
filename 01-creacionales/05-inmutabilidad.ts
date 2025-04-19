/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsavedChanges: boolean;

  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean,
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }

  // NOTE - copyWith: Método para crear una copia del objeto con propiedades modificadas
  // Se utiliza para crear un nuevo estado del editor de código sin modificar el original.

  copyWith(
    // Partial permite que las propiedades sean opcionales
    { content, cursorPosition, unsavedChanges }: Partial<CodeEditorState>, 
  ): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsavedChanges ?? this.unsavedChanges,
    );
  }

  displayState() {
    console.log(`
            Content: ${this.content}
            Cursor Position: ${this.cursorPosition}
            Unsaved Changes: ${this.unsavedChanges}
        `);
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  // NOTE - save: Método para guardar el estado actual del editor de código
  // Se utiliza para almacenar el estado en el historial y avanzar el índice actual.

  save(state: CodeEditorState) {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    this.history.push(state);
    this.currentIndex++;
  }

  // NOTE - undo: Método para deshacer el último cambio en el editor de código
  // Se utiliza para retroceder en el historial y obtener el estado anterior.

  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }

    return null;
  }

  // NOTE - redo: Método para rehacer el último cambio en el editor de código
  // Se utiliza para avanzar en el historial y obtener el siguiente estado.

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }

    return null;
  }
}

function main() {
    const history = new CodeEditorHistory();
    let editorState = new CodeEditorState("console.log('Hello, World!');", 2, false);

    history.save(editorState);

    console.log("%cInitial State:", COLORS.blue);
    editorState.displayState();

    editorState = editorState.copyWith({
        content: "console.log('Hello, World!');\nconsole.log('Hello, TypeScript!');",
        cursorPosition: 3,
        unsavedChanges: true,
    })
    history.save(editorState);
}

main();

