# Bubble Sort

::: tip Algorithm overview
| **Bubble sort** | |
| --------------------------- | ----------- |
| Best case time complexity | $O(n)$ |
| Average time complexity | $O(n^2)$ |
| Worst case time complexity | $O(n^2)$ |
| Space complexity | $O(1)$ |
| Stable? | Yes |
| In-place? | Yes |
:::

Bubble sort is a simple sorting algorithm where the larger elements 'bubble' up the list. It works by repeatedly running through the array checking if adjacent elements are in the correct order and swapping them if not. This means that after each pass the largest element in the unsorted array will have moved to the top and is now in it's correct position. This repeats until every element is in it's correct position.

Given an array of $n$ size it takes one full pass of the unsorted array to move the first largest element to the top. Then in the next pass we only need to check $n - 1$ as one element has already been sorted. Since each pass places one element in it's correct position we will need to pass over the array n times. So the number of comparisons will be $n + (n-1) + (n-2) + ... + 1$ This results in a time complexity of $O(n^2)$.

BUT this can be improved. A early exit can be implemented which stops the algorithm if we know that the array is already sorted. If we do a pass over the array and each adjacent pair is already in the correct order meaning no swaps where required we know that the array is now sorted and we can return early. This addition changes the best case time complexity to $O(n)$ This occurs if the input array was is already sorted, we do the first pass doing $n$ checks but when we reach the end with no swaps we know the array is already sorted and return.

Bubble sort is a **stable** algorithm meaning the order of equal elements in the input are retained after sorting. This makes sense due to the 'bubbling up' nature of bubble sort, swaps are only made between adjacent pairs if the first element is greater than the second (importantly no swap is made when elements are equal).

Bubble sort is a **in-place** algorithm meaning that it sorts directly on the input array without the need for additional memory proportional to the array size. Additional memory is still required. A single element of space is required to facilitate swaps but this is constant and won't change as the number of elements increases. This gives bubble sort a space complexity of $O(1)$ (not including the input array).

::: tip Have a go!
Below is an interactive implementation of bubble sort. Change the array values and size then watch it be sorted visually. Give it a few goes and build your understanding of what's actually happening!
:::

Please note interactive sections currently don't work on mobile!

<script setup>
import BubbleSort from '../pageComponents/bubbleSort.vue'
</script>

<BubbleSort />
