import {createTypeSpecLibrary} from "@typespec/compiler";

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
  }
} as const);

export const {reportDiagnostic, createDiagnostic} = $lib;
