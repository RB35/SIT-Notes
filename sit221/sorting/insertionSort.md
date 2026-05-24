# Insertion Sort

::: tip Algorithm overview
| **Insertion Sort** | |
| --------------------------- | ----------- |
| Best case time complexity | $O(n)$ |
| Average time complexity | $O(n^2)$ |
| Worst case time complexity | $O(n^2)$ |
| Space complexity | $O(1)$ |
| Stable? | Yes |
| In-place? | Yes |
:::

Insertion sort is another simple sorting algorithm. It works by building a partially sorted section usually at the start of the array.

At each pass we take the first element in the unsorted section and insert it into the sorted the sorted section. This insert is done by starting at the end of the sorted section and comparing each element with the element to be inserted. If the element to insert is less than the element we slide the sorted element forward into the free space where the unsorted element used to be. This sliding continues until the next element is smaller than or equal to the one we are inserting. At this point all elements before the gap are less than the element to be inserted and all after the space are greater. The element to be inserted is then inserted here expanding the sorted section. This continues until the whole array is part of the sorted section.

The average and worst time complexity of insertion sort is $O(n^2)$. $n$ iterations are needed to sort every element in the array. At every iteration we will probably need to slide a potion of the sorted elements to make space for the element to be inserted. This results in the $O(n^2)$ complexity. But the best case time complexity is $O(n)$. This best case is when the array is already sorted. At each iteration the element to add to the sorted section will be greater than the last element in the sorted section meaning no sliding is needed. This makes each iteration have a time complexity of $O(1)$. $O(n)$ iterations each taking $O(1)$ time results in a time complexity of $O(n)$ giving the best case complexity.

Insertion sort is a **stable** sorting algorithm, meaning the order of equal elements in the input are retained after sorting. This is because when sliding elements to create space for the new element in the sorted section we stop when we reach a element less than **OR EQUAL TO** the element we are inserting. This means that if one or more element of the same value exists in the sorted section the new element will be placed in front of the already sorted values. Since elements are added to the sorted section in order from left to right the order is maintained.

Insertion sort is a **in-place** algorithm meaning that it sorts directly on the input array without the need for additional memory proportional to the array size. Additional memory is still required, additional memory is required to facilitate swaps but this is constant and won't change as the number of elements increases. This gives insertion sort a space complexity of $O(1)$ (not including the input array).

::: tip Have a go!
Below is an interactive implementation of insertion sort. Change the array values and size then watch it be sorted visually. Give it a few goes and build your understanding of what's actually happening!
:::

Please note interactive sections currently don't work on mobile!

<script setup>
import InsertionSort from '../pageComponents/insertionSort.vue'
</script>

<InsertionSort />
