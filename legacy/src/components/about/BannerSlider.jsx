import React, { useState, useEffect, useRef } from 'react';

const bannerImages = [
  'https://s3-api.fpt.vn/fptvn-storage/2025-10-10/1760061241_banner-wifi-7-2.jpg',
  'https://s3-api.fpt.vn/fptvn-storage/2025-12-12/1765528482_1920x718pxsafezone1440x500.png',
  'https://s3-api.fpt.vn/fptvn-storage/2025-10-13/1760344329_TngMeshNetCng.jpg',
  'https://s3-api.fpt.vn/fptvn-storage/2025-10-14/1760429551_bTaskeeVoucher1920x560.jpg',
  'https://s3-api.fpt.vn/fptvn-storage/2025-09-06/1757127889_hyperfast-fpt.jpg',
];

export default function BannerSlider() {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => setIdx(i => (i + 1) % bannerImages.length), 4000);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <div style={{
        display: 'flex',
        transition: 'transform 0.6s ease-in-out',
        transform: `translateX(-${idx * 100}%)`,
      }}>
        {bannerImages.map((src, i) => (
          <img key={i} src={src} alt={`FPT Banner ${i + 1}`}
            style={{ width: '100%', flexShrink: 0, display: 'block', objectFit: 'cover', maxHeight: '420px' }} />
        ))}
      </div>
      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
        {bannerImages.map((_, i) => (
          <button key={i} onClick={() => { setIdx(i); clearInterval(timer.current); timer.current = setInterval(() => setIdx(j => (j + 1) % bannerImages.length), 4000); }}
            style={{
              width: i === idx ? '24px' : '10px', height: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer',
              backgroundColor: i === idx ? '#f57020' : 'rgba(255,255,255,0.7)',
              transition: 'all 0.3s',
            }} />
        ))}
      </div>
    </div>
  );
}
