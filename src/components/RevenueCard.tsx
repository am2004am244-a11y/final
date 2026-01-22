import { DollarSign, TrendingUp } from 'lucide-react';

interface RevenueCardProps {
  revenue: number;
  onClick: () => void;
}

export const RevenueCard = ({ revenue, onClick }: RevenueCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-8 cursor-pointer hover:shadow-md dark:hover:shadow-lg transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Influencer Revenue</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Live</p>
          </div>
        </div>
        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
      </div>

      <div className="mb-2">
        <div className="text-4xl font-bold text-gray-900 dark:text-white animate-pulse">
          ${revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
        Revenue generated from content creation, product reviews, and brand collaborations
      </p>
    </div>
  );
};
