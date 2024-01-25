export default interface BracketNode<T> {
  postOrder(): BracketNode<T>[];
}
export const show = <T>(
  cur: BracketNode<T>,
  f: (x: BracketNode<T>) => string,
  separator: string
): string => cur.postOrder().map(f).join(separator);
