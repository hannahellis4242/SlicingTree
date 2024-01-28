type Partition<T> = [T[], T[]];
export default Partition;

export const first = <T>(item: T): Partition<T> => [[item], []];
export const second = <T>(item: T): Partition<T> => [[], [item]];
export const lift = <T>(item: T): Partition<T>[] => [first(item), second(item)];
export const flatten = <T>(
  [a0, a1]: Partition<T>,
  [b0, b1]: Partition<T>
): Partition<T> => [a0.concat(b0), a1.concat(b1)];
