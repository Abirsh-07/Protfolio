import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, HardDrive, Link, Copy, CheckCircle } from 'lucide-react';

const VideoPortfolioGuide: React.FC = () => {
  const [copiedText, setCopiedText] = React.useState<string>('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const youtubeSteps = [
    {
      step: 1,
      title: "Upload your video to YouTube",
      description: "Make sure your video is public or unlisted (not private)"
    },
    {
      step: 2,
      title: "Copy the video URL",
      description: "Use any of these formats:",
      examples: [
        "https://www.youtube.com/watch?v=VIDEO_ID",
        "https://youtu.be/VIDEO_ID",
        "https://www.youtube.com/embed/VIDEO_ID"
      ]
    },
    {
      step: 3,
      title: "Update your portfolio",
      description: "Replace the placeholder URLs in Portfolio.tsx"
    }
  ];

  const driveSteps = [
    {
      step: 1,
      title: "Upload video to Google Drive",
      description: "Upload your video file to your Google Drive"
    },
    {
      step: 2,
      title: "Set sharing permissions",
      description: "Right-click → Share → Change to 'Anyone with the link can view'"
    },
    {
      step: 3,
      title: "Copy the shareable link",
      description: "The URL should look like:",
      examples: [
        "https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
      ]
    },
    {
      step: 4,
      title: "Update your portfolio",
      description: "Replace the placeholder URLs in Portfolio.tsx"
    }
  ];

  const codeExample = `// In Portfolio.tsx, update your video items:
{
  id: 1,
  title: 'Your Video Title',
  description: 'Your video description',
  category: 'video',
  thumbnail: 'path/to/your/thumbnail.jpg',
  link: 'https://youtu.be/YOUR_VIDEO_ID', // Your actual YouTube URL
  videoType: 'youtube', // or 'drive'
  views: 1250,
  likes: 89
}`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          How to Add Your Videos to Portfolio
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Follow these steps to showcase your video editing work using YouTube or Google Drive
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* YouTube Method */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <Youtube className="w-8 h-8 text-red-600" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              YouTube Method
            </h3>
          </div>
          
          <div className="space-y-4">
            {youtubeSteps.map((step) => (
              <div key={step.step} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {step.description}
                  </p>
                  {step.examples && (
                    <div className="space-y-1">
                      {step.examples.map((example, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-700 p-2 rounded text-xs font-mono text-gray-700 dark:text-gray-300">
                          {example}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Google Drive Method */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <HardDrive className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Google Drive Method
            </h3>
          </div>
          
          <div className="space-y-4">
            {driveSteps.map((step) => (
              <div key={step.step} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {step.description}
                  </p>
                  {step.examples && (
                    <div className="space-y-1">
                      {step.examples.map((example, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-700 p-2 rounded text-xs font-mono text-gray-700 dark:text-gray-300">
                          {example}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Code Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Code Example
            </h3>
          </div>
          <button
            onClick={() => copyToClipboard(codeExample, 'code')}
            className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            {copiedText === 'code' ? <CheckCircle size={16} /> : <Copy size={16} />}
            {copiedText === 'code' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{codeExample}</code>
        </pre>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-green-50 dark:bg-green-900/20 p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          💡 Pro Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li>• <strong>YouTube:</strong> Better for SEO and discoverability, supports HD quality</li>
          <li>• <strong>Google Drive:</strong> Good for private client work, larger file sizes supported</li>
          <li>• <strong>Thumbnails:</strong> Use high-quality custom thumbnails (1280x720px recommended)</li>
          <li>• <strong>Descriptions:</strong> Write compelling descriptions that highlight your skills</li>
          <li>• <strong>Organization:</strong> Keep your videos organized with consistent naming</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default VideoPortfolioGuide;