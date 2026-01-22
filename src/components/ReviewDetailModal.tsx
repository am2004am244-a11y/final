import { X, Calendar, TrendingUp } from 'lucide-react';
import { ReviewPipelineItem } from '../types';
import { LineChart } from './LineChart';
import { generateChartData } from '../lib/storage';

interface ReviewDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ReviewPipelineItem | null;
}

export const ReviewDetailModal = ({ isOpen, onClose, item }: ReviewDetailModalProps) => {
  if (!isOpen || !item) return null;

  const engagementData = generateChartData(1000 + Math.random() * 5000, 15);

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto transition-colors">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center transition-colors">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{item.company_name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-6">
            {item.logo_url && (
              <img
                src={item.logo_url}
                alt={item.company_name}
                className="w-24 h-24 object-contain bg-gray-50 dark:bg-gray-700 rounded-lg p-3 transition-colors"
              />
            )}

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium transition-colors">
                  {item.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  item.status === 'Completed'
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : item.status === 'Confirmed'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}>
                  {item.status}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  Added: {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 transition-colors">
              <TrendingUp className="w-5 h-5" />
              Expected Engagement Curve
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
              <LineChart data={engagementData} color="#3b82f6" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 transition-colors">Expected Reach</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                {(Math.random() * 20000 + 10000).toFixed(0)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 transition-colors">Estimated Engagement</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                {(Math.random() * 15 + 5).toFixed(1)}%
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 transition-colors">Priority Level</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                {item.status === 'Confirmed' ? 'High' : item.status === 'Completed' ? 'Done' : 'Medium'}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Review Details</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors">
              This {item.type.toLowerCase()} with {item.company_name} is currently {item.status.toLowerCase()}.
              {item.status === 'Confirmed' && ' The content is scheduled and ready for production.'}
              {item.status === 'Pending' && ' Awaiting confirmation from the brand team.'}
              {item.status === 'Completed' && ' This content has been published and is live.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
