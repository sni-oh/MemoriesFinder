import React from 'react';

interface MediaPreviewProps {
  urls: string[];
}

const isVideo = (url: string): boolean => {
  const videoExtensions = ['.mp4', '.webm', '.ogg'];
  return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

const MediaPreview: React.FC<MediaPreviewProps> = ({ urls }) => {
  if (urls.length === 0) {
    return <p>No media files to display.</p>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', padding: '20px' }}>
      {urls.map((url, index) => {
        const fileName = url.substring(url.lastIndexOf('/') + 1);
        return (
          <div key={url + index} style={{ border: '1px solid #ddd', padding: '8px', borderRadius: '4px', width: '200px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {isVideo(url) ? (
              <video
                src={url}
                controls
                style={{ maxWidth: '100%', height: 'auto', display: 'block', marginBottom: '8px', objectFit: 'cover' }}
              />
            ) : (
              <img
                src={url}
                alt={fileName}
                loading='lazy'
                style={{ maxWidth: '100%', height: 'auto', display: 'block', marginBottom: '8px', objectFit: 'cover' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MediaPreview;
