# Merge Sort 

A fun visual project that shows how **merge sort** works by sorting scrambled vertical slices of an image.  
As the algorithm runs, the slices are gradually rearranged until the full picture is restored.

## Features

- Visualizes the **merge sort** algorithm step by step
- Uses **equal-sized vertical image slices** instead of normal bars
- Includes a **Shuffle** button to scramble the image again
- Includes a **Start Sorting** button to begin the animation
- Built with **HTML, CSS, and JavaScript**

## How It Works

The image is divided into vertical slices of equal size.  
Each slice is stored with:

- a `value` used for sorting
- an `imgIndex` that keeps track of which part of the image it represents

When merge sort rearranges the slices by their values, the image pieces move with them.  
Once the slices are fully sorted, the original image appears correctly.
