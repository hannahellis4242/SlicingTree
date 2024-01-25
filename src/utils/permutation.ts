const permutation = <T>(elements: T[]): T[][] => {
  if (elements.length < 2) {
    return [elements];
  }
  return elements.flatMap((element) =>
    permutation(elements.filter((x) => x !== element)).map((p) => [
      element,
      ...p,
    ])
  );
};
export default permutation;
