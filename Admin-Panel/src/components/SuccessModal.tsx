import { Check, X } from 'lucide-react';

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
};

export default function SuccessModal({ isOpen, onClose, message = 'Your news added successfully' }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-7 h-7 text-white stroke-3" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900">Added Successfully!</h3>
          <p className="text-sm text-gray-600">{message}</p>

          <button
            onClick={onClose}
            className="w-full bg-[#2c3e82] text-white py-3 rounded-lg font-medium hover:bg-[#1e2a5e] transition-colors mt-4"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
