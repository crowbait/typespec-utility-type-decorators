import { resolvePath } from "@typespec/compiler";
import {
  createTestLibrary,
  TypeSpecTestLibrary,
} from "@typespec/compiler/testing";
import { fileURLToPath } from "url";

export const TypespecUtilityTypeDecoratorsTestLibrary: TypeSpecTestLibrary =
  createTestLibrary({
    name: "typespec-utility-type-decorators",
    packageRoot: resolvePath(fileURLToPath(import.meta.url), "../../../../"),
  });
