import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper/modules'; // Import Autoplay module

import Alone from '../assets/videos/alone.mp4';
import CourseMate from '../assets/videos/course-mate.mp4';
import Girl from '../assets/videos/girl.mp4';
import Dashboard from '../assets/images/dashboard.png';
import '../assets/css/onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();

  const steps = [
    {
      text: 'Welcome to Learn Auto',
      videoSrc: Alone,
    },
    {
      text: 'Learn at your own pace.',
      videoSrc: CourseMate,
    },
    {
      text: 'Track your progress and achievements.',
      imgSrc: Dashboard,
    },
    {
      text: 'Get started now!',
      videoSrc: Girl,
    },
  ];

  const handleComplete = () => {
    localStorage.setItem('onboardingComplete', 'true');
    navigate('/login'); // Navigate to the login page after onboarding is completed
  };

  return (
    <div className="onboarding">
      <Swiper
        modules={[Pagination, Autoplay]} // Include Autoplay module
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true, el: '.swiper-pagination', bulletClass: 'swiper-pagination-bullet' }}
      >
        {steps.map((step, index) => (
          <SwiperSlide key={index}>
            <div className="onboarding-content">
              {step.videoSrc ? (
                <video src={step.videoSrc} autoPlay muted loop />
              ) : (
                <img src={step.imgSrc} alt="Onboarding step" />
              )}
              <h2>{step.text}</h2>
              {index === steps.length - 1 && (
                <button onClick={handleComplete}>Get Started</button>
              )}
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
};

export default Onboarding;