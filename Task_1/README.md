## CHALLENGE 1 - Refactoring

- Do you have any comments on the code as is?

• Seems like there is mixup between 2 module conventions. ES6 `import` and CommonJs `module.expores`
• `validateBodyFont` should probaby be set outside of `buildTheme` for reusability and testing
• In my opinion `validateBodyFont` should return a `boolean` instead of fonts.
• It might be tricky to test `buildTheme` as it's not exported.

- How would you test it?
  • I write unit testing with Mocha and Chai.
  • If I cannot export some of the functions I'd use something like rewire (https://github.com/jhnns/rewire)
