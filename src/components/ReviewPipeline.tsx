import { useEffect, useState } from 'react';
import { Briefcase, MessageSquare, MonitorPlay, Edit2 } from 'lucide-react';
import { ReviewPipelineItem } from '../types';
import { fetchReviewPipeline } from '../lib/database';

interface ReviewPipelineProps {
  isAdminMode: boolean;
  onEditItem: (item: ReviewPipelineItem) => void;
  onItemClick: (item: ReviewPipelineItem) => void;
}

export const ReviewPipeline = ({ isAdminMode, onEditItem, onItemClick }: ReviewPipelineProps) => {
  const [items, setItems] = useState<ReviewPipelineItem[]>([]);

  useEffect(() => {
    loadPipeline();
  }, []);

  const loadPipeline = async () => {
    try {
      const data = await fetchReviewPipeline();
      setItems(data);
    } catch (error) {
      console.error('Failed to load review pipeline:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Review':
        return <Briefcase className="w-5 h-5" />;
      case 'Interview':
        return <MessageSquare className="w-5 h-5" />;
      case 'Demo':
        return <MonitorPlay className="w-5 h-5" />;
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'dark:bg-green-900 dark:text-green-200 dark:border-green-700 bg-green-100 text-green-800 border-green-200';
      case 'Confirmed':
        return 'dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700 bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending':
        return 'dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Upcoming Reviews & Interviews</h2>
        <p className="text-gray-600 dark:text-gray-400 transition-colors">Live review pipeline updated during the event</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md dark:hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 relative group"
          >
            {isAdminMode && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditItem(item);
                }}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            )}

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-3">
                {item.logo_url ? (
                  <img src={item.logo_url} alt={item.company_name} className="w-12 h-12 object-contain" />
                ) : (
                  getTypeIcon(item.type)
                )}
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm transition-colors">{item.company_name}</h3>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400 transition-colors">
                  {getTypeIcon(item.type)}
                  <span>{item.type}</span>
                </div>

                <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(item.status)} transition-colors`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
