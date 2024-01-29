# SlicingTree
Algorithm to create all possible slicing trees for the given leaf items

## What is a slicing tree

A slicing tree is a repesentation of a possible floor plan for laying out rectangular shapes. A slice represents how it's two children are orientated next to each other. With a horizontal slice being two blocks next to each other and a vertical split being one on top of the other

```
┌───────┬──────────────┐
│       │              │   Horizontal Split
│       │              │
│       │              │        H
│   A   │      B       │       / \
│       │              │      A   B
│       │              │
│       │              │
└───────┴──────────────┘

┌───────┐
│       │                  Vertical Split
│       │
│       │                       V
│   A   │                      / \
│       │                     A   B
│       │
│       │
├───────┴─────┐
│             │
│             │
│             │
│     B       │
│             │
│             │
│             │
└─────────────┘
```

<https://cas.ee.ic.ac.uk/people/gac1/Synthesis/Lecture16.pdf>

## Explaination of the algorithm

The algorithm works recursively. In the case of no leaves then there is no possible trees. However the base case is a single leaf, in which case we have just one tree, ie just the leaf.

With two or more leaves it is just a case of working out all the possible ways you can partition the list of leaves into two non empty sets. This then represnts the leaves in each child tree of the split. For each possible partitions there is also two possible slices, a horizontal slice and a vertical one.

Let's take a case of three leaves, labeled 1,2 and 3. At the first split there are six possible non-empty partitions.

|left|right|
|-|-|
|1|2,3|
|2|1,3|
|3|1,2|
|1,2|3|
|1,3|2|
|2,3|3|

This leads to 12 solutions overall (6 with a horizontal split and 6 with a vertical split). The side that has two possible leaves then recurses with those two leaves as inputs.

The steps in general are as follows.

1. Calculate partitions for leaves
2. for each partition create the possible trees for each half
3. take the cartesian product of each half's solutions so that each half's possible trees are paired together.
4. Turn each pairing into a horizontal and a vertical slice.