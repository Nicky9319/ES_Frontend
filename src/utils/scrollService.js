/**
 * Scrolls to a specific element by ID with an optional offset
 * @param {string} elementId - The ID of the element to scroll to
 * @param {Object} options - Scroll options
 * @param {number} offsetY - Optional vertical offset in pixels (positive = scroll more upward)
 */
export const scrollToElement = (elementId, options = {}, offsetY = 0) => {
  // Default options
  const defaultOptions = {
    behavior: 'smooth',
    block: 'start',
    ...options
  };

  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      // If offset is provided, use scrollTo with calculated position
      if (offsetY !== 0) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - offsetY;
        window.scrollTo({
          top: middle,
          behavior: defaultOptions.behavior
        });
      } else {
        // Otherwise use the standard scrollIntoView
        element.scrollIntoView(defaultOptions);
      }
    }
  }, 100); // Small delay to ensure navigation completes first
};
