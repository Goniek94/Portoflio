// desktop/Folders/GalleryWindow.tsx

import { useState, useEffect } from 'react';
import { demosData } from '../../../data';

interface GalleryWindowProps {
  onClose: () => void;
}

export default function GalleryWindow({ onClose }: GalleryWindowProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedImage !== null) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <>
      <div className="w-full max-w-6xl rounded border-2 border-[#7a7a7a] shadow-xl bg-[#f6f6f6] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Pasek tytułu */}
        <div className="flex items-center justify-between px-2 py-1 bg-[#0a246a] border-b border-[#f6f6f6] relative">
          <span className="text-white font-bold tracking-wide text-xs select-none">
            📁 Demo & Screenshots
          </span>
          <div className="flex space-x-1">
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center bg-[#e81123] border border-[#888] rounded-sm shadow hover:bg-[#e34a4a] transition"
              title="Zamknij"
            >
              <span className="text-white text-xl font-bold -mt-[2px]">×</span>
            </button>
          </div>
        </div>

        {/* Disclaimer NDA */}
        <div className="px-4 py-3 bg-yellow-50 border-b border-yellow-200">
          <p className="text-sm text-yellow-800">
            <span className="font-bold">⚠️ PROJECT UNDER NDA</span> - The following screenshots were
            shared with client consent for presentation purposes.
          </p>
        </div>

        {/* Grid ze zdjęciami */}
        <div className="flex-1 overflow-y-auto bg-white p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demosData.map((demo, index) => (
              <div
                key={index}
                className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                {/* Image container - click to open modal */}
                <div
                  className="relative w-full bg-gray-100 cursor-pointer group overflow-hidden"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={demo.src}
                    alt={demo.alt}
                    className="w-full h-auto object-contain transition-all duration-300 group-hover:brightness-90"
                    style={{ maxHeight: '300px' }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                    <div className="bg-blue-600/90 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-sm">
                      🔍 Click to enlarge
                    </div>
                  </div>
                </div>

                {/* Content container with fixed height */}
                <div className="p-4 flex flex-col flex-1 bg-gradient-to-b from-white to-gray-50">
                  <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                    {demo.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                    {demo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dolny pasek */}
        <div className="flex items-center justify-between text-xs px-3 py-2 bg-[#f3f3f3] border-t border-[#c3c3c3]">
          <span className="text-gray-600">
            {demosData.length} screenshots • Automotive Marketplace
          </span>
          <button
            onClick={onClose}
            className="bg-blue-700 text-white text-xs px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Modal z powiększonym zdjęciem */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-8"
          onClick={closeModal}
        >
          <div className="relative max-w-[95vw] max-h-[95vh]">
            <img
              src={demosData[selectedImage].src}
              alt={demosData[selectedImage].alt}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-2xl font-bold transition"
            >
              ×
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded">
              <p className="text-sm font-bold">{demosData[selectedImage].title}</p>
              <p className="text-xs">{demosData[selectedImage].description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
