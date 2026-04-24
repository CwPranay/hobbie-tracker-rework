import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full shadow-2xl">
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${
              variant === 'danger' 
                ? 'bg-red-50' 
                : 'bg-amber-50'
            }`}>
              <AlertTriangle 
                size={20} 
                className={
                  variant === 'danger'
                    ? 'text-red-600'
                    : 'text-amber-600'
                }
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-700">
            {message}
          </p>
        </div>

        <div className="flex space-x-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              variant === 'danger'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-[#0B1F3B] text-white hover:bg-[#0A1A2F]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
