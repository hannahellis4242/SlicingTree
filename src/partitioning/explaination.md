# Partitioning

## Setup

Starting with n items, we with to separate them into m piles. Assuming you allow for empty piles, you can evaluate a solution by labeling each item with a number (0,m-1) for which pile it will be in. This is the same as creating a number that is n digits in base m. So there are $m^n$ possible labellings.

## Evaluating

So to create each labeling you can simply count up in base m.

## Binary Partitioning

In the case where we have only 2 piles, then it is just a case of counting up in binary. If we don't want empty piles then we can just ignore the cases that are equal to zero or equal to $2^m-2$.