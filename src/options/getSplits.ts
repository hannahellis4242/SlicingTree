const getSplits = <T>(xs: T[]): T[][][] => {
  if (xs.length < 2) {
    return [];
  }
  return new Array(xs.length - 1).fill(0).map((_, i) => {
    const firstHalf = xs.slice(0, i + 1);
    const secondHalf = xs.slice(i + 1);
    return [firstHalf, secondHalf];
  });
};
export default getSplits;
