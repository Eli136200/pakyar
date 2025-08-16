'use client';
import React from 'react';
import Slider from 'react-slick';

// CSS باید همینجا ایمپورت شود
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function BannerSlider() {
  const settings = {
    dots: true,
    // دات‌ها را داخل قاب بیار
    dotsClass: 'slick-dots bottom-2', // نیاز است ظرف نسبی باشد (هست)
    appendDots: dots => <ul style={{ margin: 0 }}>{dots}</ul>,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    rtl: true, // چون RTL هستیم
  };

  const images = [
    '/banners/Banner1.jpg',
    '/banners/Banner2.jpg',
    '/banners/Banner3.jpg',
  ];

  return (
    <div className="relative rounded-xl overflow-hidden shadow-md">
      <Slider {...settings}>
        {images.map((src, i) => (
          <div key={i}>
            <img src={src} alt={`banner-${i + 1}`} className="w-full h-40 object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
