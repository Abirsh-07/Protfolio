import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Play, Eye, Heart } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: 'video' | 'design';
  thumbnail: string;
  link: string;
  videoType?: 'youtube' | 'drive' | 'external';
  videoId?: string;
  embedUrl?: string;
  views?: number;
  likes?: number;
}

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'design'>('video');
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);

  // Helper function to get YouTube embed URL
  const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  // Helper function to get Google Drive embed URL
  const getGoogleDriveEmbedUrl = (url: string): string => {
    const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : '';
  };

  const portfolioItems: PortfolioItem[] = [
    // Video Editing Items with real video sources
    {
      id: 1,
      title: 'YouTube Channel Intro',
      description: 'Dynamic intro with motion graphics and engaging transitions',
      category: 'video',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS67z2yQGzdbtHpLNw7DYCI8mA6DNcZDFb7nQ&s',
      link: 'https://youtu.be/csdw0kaWprI', // Replace with your actual YouTube video
      videoType: 'youtube',
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      title: 'Coffee House Promotional Video',
      description: 'High-energy promotional video with color grading and effects',
      category: 'video',
      thumbnail: 'https://pop.inquirer.net/files/2025/06/10-coffee-shops-in-Quezon-City-you-should-definitely-visit.jpg',
      link: 'https://drive.google.com/file/d/19Clsssqe2koPlhUyfnXlE7oCsKnVhYos/view?usp=sharing', // Replace with your Google Drive link
      videoType: 'drive',
      views: 890,
      likes: 67
    },
    {
      id: 3,
      title: 'Online Services Reel one',
      description: 'Cinematic event coverage with smooth transitions',
      category: 'video',
      thumbnail: 'https://www.how2shout.com/wp-content/uploads/2021/08/How-to-use-online-services-for-your-businesses-to-grow-it-faster-and-bigger-min.jpg',
      link: 'https://drive.google.com/file/d/1Wa-yVZ8he5BC1Tne__Q3RSKvDr02kqDp/view?usp=drive_link', // Replace with your actual YouTube video
      videoType: 'drive',
      views: 2100,
      likes: 156
    },
    {
      id: 4,
      title: 'Color Grading for Your Videos',
      description: 'Engaging social media advertisement with call-to-action',
      category: 'video',
      thumbnail: 'https://petapixel.com/assets/uploads/2022/01/The-Photographers-Guide-to-Color-Grading-Video.jpg',
      link: 'https://drive.google.com/file/d/13F0eulz6obuzxOomzCNVtCkFNHBA3epG/view?usp=drive_link', // Replace with your Google Drive link
      videoType: 'drive',
      views: 1450,
      likes: 98
    },
    {
      id: 5,
      title: 'Music Video Edit',
      description: 'Creative music video with synchronized cuts and effects',
      category: 'video',
      thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: 'https://drive.google.com/file/d/1_Gd-zSXLXln_9Ykd_-8KFUfnxdbiXFn6/view?usp=sharing', // Replace with your actual YouTube video
      videoType: 'drive',
      views: 3200,
      likes: 245
    },
    {
      id: 6,
      title: 'Corporate Training Video',
      description: 'Professional training video with clear narration and graphics',
      category: 'video',
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: 'https://drive.google.com/file/d/1DEF456GHI789/view', // Replace with your Google Drive link
      videoType: 'drive',
      views: 780,
      likes: 52
    },
    // Graphic Design Items
    {
      id: 7,
      title: 'YouTube Thumbnail Pack',
      description: 'Eye-catching thumbnails optimized for click-through rates',
      category: 'design',
      thumbnail: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '#'
    },
    {
      id: 8,
      title: 'Brand Identity Design',
      description: 'Complete brand package with logo and style guide',
      category: 'design',
      thumbnail: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '#'
    },
    {
      id: 9,
      title: 'Social Media Templates',
      description: 'Instagram and Facebook post templates for consistent branding',
      category: 'design',
      thumbnail: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '#'
    },
    {
      id: 10,
      title: 'Event Poster Design',
      description: 'Creative poster design for music festival promotion',
      category: 'design',
      thumbnail: 'https://images.pexels.com/photos/1666159/pexels-photo-1666159.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '#'
    }
  ];

  const filteredItems = portfolioItems.filter(item => item.category === activeTab);

  const openVideoModal = (item: PortfolioItem) => {
    if (item.category === 'video') {
      setSelectedVideo(item);
    }
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const getEmbedUrl = (item: PortfolioItem): string => {
    if (item.videoType === 'youtube') {
      return getYouTubeEmbedUrl(item.link);
    } else if (item.videoType === 'drive') {
      return getGoogleDriveEmbedUrl(item.link);
    }
    return item.embedUrl || '';
  };

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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => item.category === 'video' ? openVideoModal(item) : window.open(item.link, '_blank')}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
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
                  {item.category === 'video' && (
                    <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {item.videoType === 'youtube' ? 'YouTube' : 'Drive'}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    {item.description}
                  </p>
                  
                  {item.category === 'video' && item.views && (
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>{item.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={16} />
                        <span>{item.likes} likes</span>
                      </div>
                    </div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeTab === 'video'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50'
                    }`}
                  >
                    {activeTab === 'video' ? 'Watch Video' : 'View Design'}
                    {activeTab === 'video' ? <Play size={16} /> : <ExternalLink size={16} />}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
              onClick={closeVideoModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedVideo.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedVideo.description}
                      </p>
                    </div>
                    <button
                      onClick={closeVideoModal}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <iframe
                      src={getEmbedUrl(selectedVideo)}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={selectedVideo.title}
                    />
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>{selectedVideo.views?.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={16} />
                        <span>{selectedVideo.likes} likes</span>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-xs">
                        {selectedVideo.videoType === 'youtube' ? 'YouTube' : 'Google Drive'}
                      </div>
                    </div>
                    
                    <motion.a
                      href={selectedVideo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-300 flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      Open Original
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;