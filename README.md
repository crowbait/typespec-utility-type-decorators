# typespec-utility-type-decorators

This is a [TypeSpec](https://typespec.io) library aiming to provide
(some) [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.htm)
to TypeSpec.

This is meant to help reduce the need to rewrite Models if simple transformations
would suffice, upholding the DRY principle.

## Content
- [Installation & Setup](#installation)
- [Usage](#usage)
  - [Omit](#omit-typescript-equivalent)
  - [Partial](#partial-typescript-equivalent)
    - [PartialKeys](#partialkeys)
  - [Pick](#pick-typescript-equivalent)
  - [Required](#required-typescript-equivalent)
    - [RequiredKeys](#requiredkeys)

## Installation


### Setup
Import the package, `using` the library:
```ts
import "typespec-utility-type-decorators";
using TypespecUtilityTypeDecorators;
```

## Usage

### Omit ([TypeScript Equivalent](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys))
Removes properties of the Model with the given keys.
```ts
model Book {
  author: string,
  title: string
}

@omit("author")
model TransformedBook {...Book}
/*
{
  title: string
}
*/
```

### Partial ([TypeScript Equivalent](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype))
Sets all properties on a model to be optional.
```ts
model Book {
  author: string,
  title: string
}

@partial
model TransformedBook {...Book}
/*
{
  author?: string
  title?: string
}
*/
```

#### PartialKeys
Sets properties of the Model with the given keys to be optional.
```ts
model Book {
  author: string,
  title: string,
  read: boolean
}

@partialKeys("author", "read")
model TransformedBook {...Book}
/*
{
  author?: string
  title: string
  read?: boolean
}
*/
```

### Pick ([TypeScript Equivalent](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys))
Omits all but the given keys from a model. Opposite of [Omit](#omit-typescript-equivalent).
```ts
model Book {
  author: string,
  title: string
}

@pick("author")
model TransformedBook {...Book}
/*
{
  author: string
}
*/
```

### Required ([TypeScript Equivalent](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype))
Sets all properties on a model to be required (not optional). Opposite of [Partial](#partial-typescript-equivalent).
```ts
model Book {
  author?: string,
  title: string
}

@required
model TransformedBook {...Book}
/*
{
  author: string
  title: string
}
*/
```

#### RequiredKeys
Sets properties of the Model with the given keys to be required (not optional). Opposite of [PartialKeys](#partialkeys)
```ts
model Book {
  author?: string,
  title: string,
  read?: boolean
}

@partialKeys("author")
model TransformedBook {...Book}
/*
{
  author: string
  title: string
  read?: boolean
}
*/
```