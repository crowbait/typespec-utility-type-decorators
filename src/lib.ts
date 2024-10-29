import {createTypeSpecLibrary, paramMessage} from "@typespec/compiler";

export const $lib = createTypeSpecLibrary({
  name: "typespec-utility-type-decorators",
  diagnostics: {
    "no-key": {
      severity: "error",
      messages: {
        default: `No key given.`,
      },
    },
    "duplicate-key": {
      severity: "warning",
      messages: {
        default: paramMessage`Duplicate key: '${"key"}'`,
      },
    },
  }
} as const);

export const { reportDiagnostic, createDiagnostic, stateKeys: StateKeys } = $lib;
