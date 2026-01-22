import { useEffect, useState } from 'react';
import { CheckCircle, Building2, Edit2 } from 'lucide-react';
import { BrandPartnership } from '../types';
import { fetchBrandPartnerships } from '../lib/database';
import { EditBrandModal } from './EditBrandModal';

interface BrandPartnershipsProps {
  isAdminMode?: boolean;
}

export const BrandPartnerships = ({ isAdminMode = false }: BrandPartnershipsProps) => {
  const [partnerships, setPartnerships] = useState<BrandPartnership[]>([]);
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    item: BrandPartnership | null;
  }>({ isOpen: false, item: null });

  useEffect(() => {
    loadPartnerships();
  }, []);

  const loadPartnerships = async () => {
    try {
      const data = await fetchBrandPartnerships();
      setPartnerships(data);
    } catch (error) {
      console.error('Failed to load brand partnerships:', error);
    }
  };

  return (
    <>
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Brand Reviews & Partnerships</h2>
          <p className="text-gray-600 dark:text-gray-400 transition-colors">Completed collaborations with leading brands</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partnerships.map((partnership) => (
            <div
              key={partnership.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md dark:hover:shadow-lg transition-all duration-300 group relative overflow-hidden cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 flex items-center justify-center mb-3 transition-all duration-300">
                  {partnership.logo_url ? (
                    <img
                      src={partnership.logo_url}
                      alt={partnership.brand_name}
                      className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 transition-colors" />
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white text-sm text-center transition-colors">{partnership.brand_name}</h3>

                {partnership.is_completed && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 transition-colors">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                )}

                {isAdminMode && (
                  <button
                    onClick={() => setEditModal({ isOpen: true, item: partnership })}
                    className="absolute top-2 left-2 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-all dark:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditBrandModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, item: null })}
        item={editModal.item}
        onSave={() => {
          setEditModal({ isOpen: false, item: null });
          loadPartnerships();
        }}
      />
    </>
  );
};
