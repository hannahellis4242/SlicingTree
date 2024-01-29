import Partition, { flatten, lift } from "./Partition";

const partitions = <T>(items: T[]): Partition<T>[] =>
  items.map(lift).reduce(
    (acc, [f, s]) => {
      const firsts = acc.map((x) => flatten(x, f));
      const seconds = acc.map((x) => flatten(x, s));
      return seconds.concat(firsts);
    },
    [[[], []]]
  );

export default partitions;
