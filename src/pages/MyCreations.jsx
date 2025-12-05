import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ImageCard from '../components/ImageCard';
import { getCreations, deleteCreation, clearAllCreations } from '../utils/storage';

const MyCreations = () => {
  const navigate = useNavigate();
  const [creations, setCreations] = useState([]);
  const [selectedCreation, setSelectedCreation] = useState(null);

  useEffect(() => {
    loadCreations();
  }, []);

  const loadCreations = () => {
    const saved = getCreations();
    setCreations(saved);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this creation?')) {
      deleteCreation(id);
      loadCreations();
      if (selectedCreation?.id === id) {
        setSelectedCreation(null);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete ALL creations? This cannot be undone.')) {
      clearAllCreations();
      loadCreations();
      setSelectedCreation(null);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownload = (creation, e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = creation.imageUrl;
    link.download = `pixscribe-${creation.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
                My Creations
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {creations.length} {creations.length === 1 ? 'creation' : 'creations'} saved
              </p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg"
              >
                + Create New
              </motion.button>

              {creations.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearAll}
                  className="px-6 py-3 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-xl font-bold transition-all border border-red-300 dark:border-red-500/50"
                >
                  Clear All
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {creations.length === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-12 text-center dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="text-6xl mb-6">🎨</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No Creations Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto text-lg">
              Start creating amazing visuals with AI. Your saved creations will appear here.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg"
            >
              Create Your First Visual ✨
            </motion.button>
          </motion.div>
        ) : selectedCreation ? (
          // Detail View
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCreation(null)}
              className="mb-6 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-bold border border-gray-300 dark:border-gray-600"
            >
              ← Back to Gallery
            </motion.button>

            <ImageCard
              imageUrl={selectedCreation.imageUrl}
              prompt={selectedCreation.prompt}
              showActions={false}
              onDelete={() => handleDelete(selectedCreation.id)}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 card p-4 text-center text-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700"
            >
              Created on {formatDate(selectedCreation.timestamp)}
            </motion.div>
          </motion.div>
        ) : (
          // Gallery Grid
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {creations.map((creation, index) => (
                <motion.div
                  key={creation.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="card overflow-hidden cursor-pointer group dark:bg-gray-800 dark:border-gray-700"
                  onClick={() => setSelectedCreation(creation)}
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={creation.imageUrl}
                      alt={creation.prompt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm line-clamp-2">
                          {creation.prompt}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-2">
                      {creation.prompt}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {formatDate(creation.timestamp)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-4 pb-4 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleDownload(creation, e)}
                      className="flex-1 py-2 bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(creation.id);
                      }}
                      className="flex-1 py-2 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 rounded-lg text-sm font-semibold transition-all"
                    >
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyCreations;
