// Import all files in the images folder
const images = import.meta.glob('./images/*');

// Export all imported files
export default images;