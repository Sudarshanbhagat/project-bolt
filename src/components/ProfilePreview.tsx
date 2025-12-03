import { X } from 'lucide-react';

export default function ProfilePreview({ src, alt, open, onClose }: { src: string, alt?: string, open: boolean, onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6">
      <div className="relative max-w-[90vw] max-h-[90vh] rounded-lg overflow-hidden">
        <button
          aria-label="Close preview"
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/40 text-white p-2 rounded-full shadow"
        >
          <X className="w-5 h-5" />
        </button>
        <img src={src} alt={alt} className="block max-w-[90vw] max-h-[90vh] object-contain" />
      </div>
    </div>
  );
}
