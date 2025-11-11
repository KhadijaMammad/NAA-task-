import { Trash2, X } from 'lucide-react';

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  postTitle?: string;
};

export default function DeleteModal({ isOpen, onClose, onConfirm, postTitle }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <Trash2 className="w-8 h-8 text-red-500" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900">Delete Post</h3>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete the post - <strong>"{postTitle}"</strong>?
          </p>

          <div className="flex gap-3 w-full mt-6">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
