# Selection Sort

::: tip Algorithm overview
| **Selection Sort** | |
| --------------------------- | ----------- |
| Best case time complexity | $O(n^2)$ |
| Average time complexity | $O(n^2)$ |
| Worst case time complexity | $O(n^2)$ |
| Space complexity | $O(1)$ |
| Stable? | No |
| In-place? | Yes |
:::

Selection sort is another simple sorting algorithm. Selection sort works by building a sorted section at the start of the array. This is achieved by setting the first element of the unsorted array as the current (for the first iteration this will be the first of the array since no sorted section exists yet). This current element is set as the min then we loop over the rest of the unsorted array checking to see if an element is smaller than the current min. If it is we update the min to be that element, once we have scanned the whole array we now know the smallest element that is in the unsorted section. If this minimum is different that the current element we swap the current element and the minimum. Then the sorted section can be increased by one since we have found the next element of the sorted array and placed it in its correct position.

Basically selection sort sorts the array by finding the next smallest element in the unsorted section and adding it to the end of the sorted section.

The time complexity of selection sort is $O(n^2)$ in all cases. This is because $n$ iterations are needed to sort the array and within each iteration we have to loop over all remaining unsorted elements to ensure we find the minimum.

Selection sort is **NOT a stable** algorithm. This means that the order of equal elements in the input array are not retained after sorting. This is due to the fact that the current and minimum elements are swapped. What if we had an array like $\begin{bmatrix} 2 & 2 & 1 \end{bmatrix}$? The first 2 will be swapped with the 1 meaning first 2 is now after the second meaning the order no longer exists.

Selection sort is an **in-place** algorithm meaning that it sorts directly on the input array without the need for additional memory proportional to the array size. Additional memory is still required, additional memory is required to facilitate swaps but this is constant and won't change as the number of elements increases. This gives selection sort a space complexity of $O(1)$ (not including the input array).

::: tip Have a go!
Below is an interactive implementation of selection sort. Change the array values and size then watch it be sorted visually. Give it a few goes and build your understanding of what's actually happening!
:::

Please note interactive sections currently don't work on mobile!

<script setup>
import SelectionSort from '../pageComponents/selectionSort.vue'
</script>

<SelectionSort />
