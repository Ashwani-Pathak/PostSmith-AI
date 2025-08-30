// Navigation utility functions for safe scrolling

/**
 * Safely scroll to a section by ID
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {boolean} smooth - Whether to use smooth scrolling (default: true)
 * @returns {boolean} - True if successful, false if fallback used
 */
export const safeScrollToSection = (sectionId, smooth = true) => {
  try {
    const element = document.getElementById(sectionId);
    if (element && typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'auto',
        block: 'start'
      });
      return true;
    } else {
      // Fallback: scroll to top if section not found
      window.scrollTo({ 
        top: 0, 
        behavior: smooth ? 'smooth' : 'auto' 
      });
      return false;
    }
  } catch (error) {
    console.warn(`Could not scroll to section ${sectionId}:`, error);
    // Fallback: scroll to top
    window.scrollTo({ 
      top: 0, 
      behavior: smooth ? 'smooth' : 'auto' 
    });
    return false;
  }
};

/**
 * Safely scroll to top of page
 * @param {boolean} smooth - Whether to use smooth scrolling (default: true)
 */
export const safeScrollToTop = (smooth = true) => {
  try {
    window.scrollTo({ 
      top: 0, 
      behavior: smooth ? 'smooth' : 'auto' 
    });
  } catch (error) {
    console.warn('Could not scroll to top:', error);
    // Fallback: use window.scrollTo without behavior
    window.scrollTo(0, 0);
  }
};

/**
 * Check if a section exists in the DOM
 * @param {string} sectionId - The ID of the section to check
 * @returns {boolean} - True if section exists
 */
export const sectionExists = (sectionId) => {
  try {
    const element = document.getElementById(sectionId);
    return !!(element && typeof element.scrollIntoView === 'function');
  } catch (error) {
    console.warn(`Error checking section ${sectionId}:`, error);
    return false;
  }
};

/**
 * Wait for a section to be available and then scroll to it
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} maxWait - Maximum time to wait in milliseconds (default: 2000)
 * @returns {Promise<boolean>} - Promise that resolves to true if successful
 */
export const waitAndScrollToSection = (sectionId, maxWait = 2000) => {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const checkAndScroll = () => {
      if (sectionExists(sectionId)) {
        const success = safeScrollToSection(sectionId);
        resolve(success);
        return;
      }
      
      // Check if we've exceeded max wait time
      if (Date.now() - startTime > maxWait) {
        console.warn(`Section ${sectionId} not found after ${maxWait}ms, scrolling to top`);
        safeScrollToTop();
        resolve(false);
        return;
      }
      
      // Try again in 100ms
      setTimeout(checkAndScroll, 100);
    };
    
    checkAndScroll();
  });
};
