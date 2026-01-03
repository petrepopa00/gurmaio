import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface VideoEmbedProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  className?: string;
  onClose?: () => void;
}

export function VideoEmbed({
  videoUrl,
  thumbnailUrl,
  title = 'Watch Demo',
  className,
  onClose,
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoUrl) {
    return null;
  }

  const getEmbedUrl = (url: string): string => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be')
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : new URLSearchParams(url.split('?')[1]).get('v');
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    
    if (url.includes('loom.com')) {
      const videoId = url.split('share/')[1]?.split('?')[0];
      return `https://www.loom.com/embed/${videoId}?autoplay=1`;
    }
    
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <Card className={cn('relative overflow-hidden border-2 shadow-lg', className)}>
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          <X weight="bold" />
        </Button>
      )}

      <div className="relative aspect-video bg-background">
        {!isPlaying && thumbnailUrl ? (
          <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/90 group-hover:bg-primary group-hover:scale-110 transition-all flex items-center justify-center shadow-lg">
                <Play className="w-10 h-10 text-primary-foreground ml-1" weight="fill" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white font-heading text-xl font-bold">{title}</h3>
            </div>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </Card>
  );
}
