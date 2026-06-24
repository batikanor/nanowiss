import React from 'react';
import biofilmDemoVideo from '../assets/biofilm_demo.mp4';
import biofilmPoster from '../assets/product1.png';

const BiofilmVideo = ({ className = '', ariaLabel = 'nanoWISS biofilm visualization' }) => (
  <div className={`relative overflow-hidden rounded-md bg-white ${className}`}>
    <video
      className="h-full w-full object-contain"
      src={biofilmDemoVideo}
      poster={biofilmPoster}
      autoPlay
      loop
      muted
      playsInline
      aria-label={ariaLabel}
    />
  </div>
);

export default BiofilmVideo;
