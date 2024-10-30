import {createTestHost, createTestWrapper} from "@typespec/compiler/testing";
import {TypespecUtilityTypeDecoratorsTestLibrary} from "../src/testing/index.js";

export async function createTypespecUtilityTypeDecoratorsTestHost() {
  return createTestHost({
    libraries: [TypespecUtilityTypeDecoratorsTestLibrary],
  });
}

export async function createTypespecUtilityTypeDecoratorsTestRunner() {
  const host = await createTypespecUtilityTypeDecoratorsTestHost();

  return createTestWrapper(host, {
    autoUsings: ["TypespecUtilityTypeDecorators"]
  });
}