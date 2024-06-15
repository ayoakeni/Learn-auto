import React, { useRef } from 'react';
import Header from '../components/header';
import SideBar from '../components/sideBar';
import useFontSize from '../components/useFontSize';
import '../assets/css/home.css';
import ScrollToTopButton from '../components/scrollToTopButton';

function Home() {
  const contentRef = useRef(null);
  const [fontSize] = useFontSize();

  return (
    <div className='container'>
      <Header />
      <SideBar />
      <div ref={contentRef} className={`content home-con font-size-${fontSize}`}>
        <div className="hero-page">
          <h1>Welcome to Learn Auto</h1>
          <h2>Your Path to Global Communication and Understanding</h2>
        </div>
        <div className="home-content">
          <div className="frosted-glass">
            <h2>Learn Multinational Languages: Your Path to Global Communication and Understanding</h2>
            <p>
              Welcome to our Language Learning section! In an increasingly interconnected world, knowing multiple languages opens doors to new opportunities, cultures, and experiences. By learning multinational languages, you can enhance your communication skills, broaden your horizons, and connect with people from different backgrounds.
            </p>
          </div>
          <div className="frosted-glass section">
            <h3>Why Learn Multiple Languages?</h3>
            <ul>
              <li><b>Boost Communication:</b> Learning new languages allows you to communicate with a wider range of people, both personally and professionally.</li>
              <li><b>Enhance Cognitive Skills:</b> Multilingualism is known to improve memory, problem-solving abilities, and overall cognitive function.</li>
              <li><b>Experience Cultures:</b> Understanding a language goes hand-in-hand with appreciating the culture and traditions of its speakers.</li>
              <li><b>Career Advancement:</b> Multilingual individuals are in high demand in many industries, including business, diplomacy, tourism, and education.</li>
              <li><b>Travel with Ease:</b> Knowing the local language can significantly enhance your travel experiences and help you navigate new places confidently.</li>
            </ul>
          </div>
          <div className="frosted-glass section">
            <h3>What Will You Learn?</h3>
            <p>In our language lessons, you'll explore:</p>
            <ul>
              <li><b>Introduction to Languages:</b> Understand the basics and the unique aspects of each language.</li>
              <li><b>Grammar and Vocabulary:</b> Learn essential grammar rules and build your vocabulary in different languages.</li>
              <li><b>Speaking and Listening:</b> Practice speaking and listening skills through interactive exercises and real-life scenarios.</li>
              <li><b>Reading and Writing:</b> Improve your reading comprehension and writing abilities in various languages.</li>
              <li><b>Cultural Insights:</b> Gain insights into the cultures and customs associated with each language, enriching your learning experience.</li>
            </ul>
          </div>
          <div className="frosted-glass section">
            <h3>Start Your Language Learning Journey Today!</h3>
            <p>
              Whether you're a beginner or looking to advance your skills, our lessons are designed to provide comprehensive knowledge and practical experience. Join us and take the first step towards mastering new languages, enhancing your communication abilities, and achieving your personal and professional goals.
            </p>
          </div>
        </div>
        <ScrollToTopButton targetRef={contentRef} />
      </div>
    </div>
  );
}

export default Home;