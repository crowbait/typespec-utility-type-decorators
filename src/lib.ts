import {createTypeSpecLibrary} from "@typespec/compiler";

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
        default: `Duplicate key.`,
      },
    },
  }
} as const);

export const {reportDiagnostic, createDiagnostic} = $lib;
