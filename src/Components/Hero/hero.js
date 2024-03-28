import React, { useEffect } from 'react';
import './hero.scss';
import avatar from '../../assets/avatar.png'
import swipeIcon from '../../assets/swipe-icon.svg'

const Hero = () => {

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const heroWrapper = document.querySelector('.hero-wrapper');
    if (heroWrapper) {
      heroWrapper.style.setProperty('--hero-height', `${windowHeight}px`);
    }
  }, []);

  return (
    <section className="hero-wrapper">
      <div className="hero-content">
        <div className="hero-left">
          <h1 className='hero-title'>Hi, My name is<br /><span className="highlighted-text">Andrés Llinás</span></h1>
          <p className="hero-header">I develop exceptional and accessible digital experiences for the web.</p>
          <div className="hero-ctas cta-group">
            <a className='hero-cta primary-cta' href="https://drive.google.com/file/d/1qLzD8NCCJjuS7XCxQMO-MCEmqqM4Z35l/view?usp=sharing" target="_blank" rel="noopener noreferrer">Download CV</a>
            <a className='hero-cta secondary-cta' href="https://www.linkedin.com/in/andresllinasr/" target="_blank" rel="noopener noreferrer">Get in touch</a>
          </div>
        </div>
        <div className="hero-right">
          <svg className="blob blob-1" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stop-color="#000" stop-opacity=".7" />
                <stop offset="100%" stop-color="#000" stop-opacity="0" />
              </linearGradient>
            </defs><path d="M220,412.89352842548396C261.930381224514,405.25996496708245,281.9646644615737,360.0360803985666,316.16815118907886,334.60873967272784C354.10973465025916,306.40244661169146,419.3871857911462,303.1135039322799,429.72599323760676,256.9803511636712C440.01532735458125,211.06795506153225,384.6178465106194,179.26669776611024,359.962458222292,139.19263706891803C336.41454919700305,100.91863689759859,328.6011098108377,51.200232356148206,289.49741710550364,29.057415792209305C246.64647856418782,4.7926876791135875,188.55697181145314,-7.424447969301998,146.6179142382798,18.384376377191135C105.78773944393676,43.51080673307661,119.33204387172324,106.52327445246692,95.76942434103401,148.27544370171375C72.64752467502184,189.2466721749346,13.521378675953256,209.6232601624374,12.154659238994146,256.64874139071014C10.737011700115271,305.4265343488495,50.14660381935017,346.61528213728025,89.152791660316,375.93763061974136C126.50651514639426,404.01776246041186,174.02459348004524,421.2635020089986,220,412.89352842548396" fill="url(#gradient)" />
          </svg>
          <img className='hero-image' src={avatar} alt="Designer" />
        </div>
      </div>
      <img className='swipe-icon' src={swipeIcon} alt="Swipe Down" />
    </section>
  );
};

export default Hero;