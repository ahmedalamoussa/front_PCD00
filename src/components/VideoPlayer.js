import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoId, title }) => {
  // Extraire l'ID de la vidéo YouTube depuis différents formats d'URL
  const getYouTubeId = (url) => {
    if (!url) return videoId;
    
    // Si c'est déjà un ID
    if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
      return url;
    }
    
    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : videoId;
  };

  const embedId = getYouTubeId(videoId);

  return (
    <div className="video-player-container">
      <h3 className="video-title">{title || 'Vidéo de démonstration'}</h3>
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${embedId}`}
          title={title || 'Vidéo de démonstration'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p className="video-instruction">
        Regardez attentivement la vidéo avant de commencer l'exercice.
      </p>
    </div>
  );
};

export default VideoPlayer;
