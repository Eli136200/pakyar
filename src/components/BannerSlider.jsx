'use client';
import React from 'react';
import Slider from 'react-slick';

// CSSهای slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function BannerSlider() {
  const settings = {
    dots: true,
    dotsClass: 'slick-dots',
    appendDots: (dots) => <ul>{dots}</ul>,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    rtl: true,
  };

  const images = [
    '/banners/Banner1.jpg',
    '/banners/Banner2.jpg',
    '/banners/Banner3.jpg',
  ];

  return (
    <div className="banner-slider relative rounded-2xl overflow-hidden shadow-md">
      <Slider {...settings}>
        {images.map((src, i) => (
          <div key={i}>
            <img
              src={src}
              alt={`banner-${i + 1}`}
              className="block w-full h-40 object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* استایل سفارشی برای حذف فاصله و تنظیم دات‌ها */}
      <style jsx global>{`
        /* فاصله‌ی اضافه پیش‌فرض slick */
        .banner-slider .slick-slider.slick-dotted {
          margin-bottom: 0 !important;
        }

        /* دات‌ها داخل اسلایدر */
        .banner-slider .slick-dots {
          position: absolute;
          bottom: 0.5rem !important;
          margin: 0 !important;
          width: 100%;
        }

        .banner-slider .slick-dots li button:before {
          font-size: 8px;
          opacity: 0.35;
          color: white; /* رنگ دات‌ها */
        }

        .banner-slider .slick-dots li.slick-active button:before {
          opacity: 0.9;
          color: white;
        }
      `}</style>
    </div>
  );
}
