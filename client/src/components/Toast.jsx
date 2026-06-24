import { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type !== 'error';

  return (
    <div
      className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 rounded-lg shadow-xl text-white text-sm font-medium animate-fade-in ${
        isSuccess ? 'bg-[#00B517]' : 'bg-[#FA3434]'
      }`}
    >
      {isSuccess ? <Check className="h-4 w-4 shrink-0" /> : <X className="h-4 w-4 shrink-0" />}
      <span>{toast.msg}</span>
      <button type="button" onClick={onClose} className="ml-2 opacity-80 hover:opacity-100">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  return { toast, setToast, showToast };
}
