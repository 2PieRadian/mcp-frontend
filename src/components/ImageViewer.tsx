import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

type ImageViewerProps = {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
};

export default function ImageViewer({
  src,
  alt,
  className = "",
  children,
  isOpen: controlledIsOpen,
  onClose,
}: ImageViewerProps) {
  const [internalIsFullscreen, setInternalIsFullscreen] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const isFullscreen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsFullscreen;
  const setIsFullscreen = (value: boolean) => {
    if (controlledIsOpen === undefined) {
      setInternalIsFullscreen(value);
    } else if (!value && onClose) {
      onClose();
    }
  };
  const imageRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isFullscreen]);

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !imageRef.current?.contains(event.target as Node)
      ) {
        setIsFullscreen(false);
      }
    }

    if (isFullscreen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFullscreen]);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFullscreen(true);
  };

  const handleClose = () => {
    setIsFullscreen(false);
  };

  // If controlled mode (isOpen prop provided), only render the modal
  const isControlled = controlledIsOpen !== undefined;

  return (
    <>
      {/* Clickable Image - only render if not in controlled mode */}
      {!isControlled && (
        <div
          onClick={handleImageClick}
          className={`cursor-pointer transition-transform duration-200 hover:scale-105 ${className}`}
        >
          {children || (
            <img
              ref={imageRef}
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 sm:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all cursor-pointer border border-white/20"
            aria-label="Close"
          >
            <X size={24} className="sm:w-6 sm:h-6 text-white" />
          </button>

          {/* Fullscreen Image */}
          <div
            ref={modalRef}
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => {
              // In controlled mode, clicking outside should close
              if (isControlled && e.target === e.currentTarget && onClose) {
                onClose();
              }
            }}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
