// LocalStorage utility functions for managing user creations

const STORAGE_KEY = 'pixscribe_creations';

/**
 * Get all saved creations from localStorage
 * @returns {Array} Array of creation objects
 */
export const getCreations = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

/**
 * Save a new creation to localStorage
 * @param {Object} creation - Creation object with imageUrl, prompt, timestamp
 * @returns {boolean} Success status
 */
export const saveCreation = (creation) => {
  try {
    const creations = getCreations();
    const newCreation = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...creation,
    };
    creations.unshift(newCreation); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creations));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

/**
 * Delete a creation from localStorage
 * @param {string} id - Creation ID to delete
 * @returns {boolean} Success status
 */
export const deleteCreation = (id) => {
  try {
    const creations = getCreations();
    const filtered = creations.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting from localStorage:', error);
    return false;
  }
};

/**
 * Clear all creations from localStorage
 * @returns {boolean} Success status
 */
export const clearAllCreations = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};
