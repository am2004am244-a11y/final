import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { BrandPartnership } from '../types';
import { updateBrandPartnership } from '../lib/database';

interface EditBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: BrandPartnership | null;
  onSave: () => void;
}

export const EditBrandModal = ({ isOpen, onClose, item, onSave }: EditBrandModalProps) => {
  const [brandName, setBrandName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [isCompleted, setIsCompleted] = useState(true);

  useEffect(() => {
    if (item) {
      setBrandName(item.brand_name);
      setLogoUrl(item.logo_url || '');
      setIsCompleted(item.is_completed || false);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSave = async () => {
    try {
      await updateBrandPartnership(item.id, {
        brand_name: brandName,
        logo_url: logoUrl,
        is_completed: isCompleted,
      });
      onSave();
      onClose();
    } catch (error) {
      console.error('Failed to update brand partnership:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full transition-colors">
        <div className="border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center transition-colors">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Brand Partnership</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Brand Name
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Logo URL
            </label>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="completed"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="completed" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Mark as Completed
            </label>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-6 flex justify-end gap-3 transition-colors">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
