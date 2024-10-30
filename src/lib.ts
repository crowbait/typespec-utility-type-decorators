import { createTypeSpecLibrary } from "@typespec/compiler";

export const $lib = createTypeSpecLibrary({
  name: "typespec-utility-type-decorators",
  diagnostics: {
    "no-keys": {
      severity: "error",
      messages: {
        default: `No keys given.`,
      },
    },
    "duplicate-key": {
      severity: "warning",
      messages: {
        default: `Duplicate key.`,
      },
    },
    "unknown-key": {
      severity: "error",
      messages: {
        default: `Key not found in target model.`,
      },
    },
  },
} as const);

export const { reportDiagnostic, createDiagnostic } = $lib;
