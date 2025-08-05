import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: 'video' | 'design';
  thumbnail: string;
  link: string;
}

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'design'>('video');

  const portfolioItems: PortfolioItem[] = [
    // Video Editing Items
    {
      id: 1,
      title: 'YouTube Channel Intro',
      description: 'Dynamic intro with motion graphics and engaging transitions',
      category: 'video',
      thumbnail: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '#'
    },
    {
      id: 2,
      title: 'Product Promotional Video',
      description: 'High-energy promotional video with color grading and effects',
      category: 'video',
      thumbnail: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '#'
    },
    {
      id: 3,
      title: 'Event Highlight Reel',
      description: 'Cinematic event coverage with smooth transitions',
      category: 'video',
      thumbnail: 'https://images.pexels.com/photos/2608519/pexels-photo-2608519.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '#'
    },
    {
      id: 4,
      title: 'Social Media Video Ad',
      description: 'Engaging social media advertisement with call-to-action',
      category: 'video',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '#'
    },
    // Graphic Design Items
    {
      id: 5,
      title: 'YouTube Thumbnail Pack',
      description: 'Eye-catching thumbnails optimized for click-through rates',
      category: 'design',
      thumbnail: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '#'
    },
    {
      id: 6,
      title: 'Brand Identity Design',
      description: 'Complete brand package with logo and style guide',
      category: 'design',
      thumbnail: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '#'
    },
    {
      id: 7,
      title: 'Social Media Templates',
      description: 'Instagram and Facebook post templates for consistent branding',
      category: 'design',
      thumbnail: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '#'
    },
    {
      id: 8,
      title: 'Event Poster Design',
      description: 'Creative poster design for music festival promotion',
      category: 'design',
      thumbnail: 'https://images.pexels.com/photos/1666159/pexels-photo-1666159.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '#'
    }
  ];

  const filteredItems = portfolioItems.filter(item => item.category === activeTab);

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My Portfolio
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my latest work in video editing and graphic design. Each project represents 
            a unique creative challenge solved with innovative visual solutions.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'video'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Video Editing
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'design'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              Graphic Design
            </button>
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="text-white"
                    >
                      {activeTab === 'video' ? <Play size={48} /> : <ExternalLink size={48} />}
                    </motion.div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {item.description}
                  </p>
                  <motion.a
                    href={item.link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeTab === 'video'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50'
                    }`}
                  >
                    {activeTab === 'video' ? 'Watch Video' : 'View Design'}
                    <ExternalLink size={16} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;