import React, { useState, useEffect } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';

const handleClick = (lang) => {
    i18n.changeLanguage(lang)
    console.log(i18n.changeLanguage(lang))
}

const Watch = (props) => {
    const [t, i18n] = useTranslation();
    const [color, setColor] = useState();
    const [text, setText] = useState();
    let working = t('Popup.5');
    let notWorking = t('Popup.6');
    const [info, setInfo] = useState('');
    const setTime = () => {
        if (props.day === 'niedziela') {
            setColor(`red`)
            setText(notWorking)
            setInfo(t('Popup.1'))
        } else if (props.day === 'sobota') {
            if (props.time < 10 || props.time > 14) {
                setColor(`red`)
                setText(notWorking)
                setInfo(t('Popup.6'))
            }else {
                setColor(`green`)
                setText(working)
                setInfo(t('Popup.2'))
            }
        } else if (props.time < 10 || props.time > 17) {
            setColor(`red`)
            setText(notWorking)
            setInfo(t('Popup.6'))
        } else {
            setColor(`green`)
            setText(working)
            setInfo(t('Popup.3'))
        }
    }
    useEffect(() => {
        window.addEventListener('load', setTime())
       }) 
    return (
        <div>
            <a className='decoration-none' href="tel:+48731030490"><p className={`text-center ${color} pulsing`}>{text}</p></a>
            <p className="text-center pb-2 smaller">{info}</p> 
        </div>
    )
}

const Popup = () => {
    const [t, i18n] = useTranslation();
    const [newDate, setNewDate] = useState(new Date())
    const day = newDate.getDay();
    const hours = (newDate.getHours() < 10) ? `0${newDate.getHours()}` : newDate.getHours();
    const minutes = (newDate.getMinutes() < 10) ? `0${newDate.getMinutes()}` : newDate.getMinutes();
    const time = `${hours}:${minutes}`;
    const week = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];

    const [isActive, setActive] = useState(true);
    const closePopup = () => {
        setActive(!isActive);
    }
    
    return (
        <div className={!isActive ? "fixed-bottom not-active" : "fixed-bottom"}>
                            <div className='popup Oswald'>
                                <div className='position-relative' onClick={closePopup}><span className="material-symbols-outlined">close</span></div>
                                <img className="max-width" alt="img" src={require(`./background3.jpg`)} />
                                <div>
                                    <p className="text-center pt-2 h6">{t('Popup.4')} {time}</p>
                                    <Watch time={time} day={week[day]}/>
                                </div>
                            </div>                          
        </div>
    )
}

const Language = () => {
  return (
      <div className="language Oswald absolute">
        <a className='text-white' onClick={() => handleClick('pl')}>PL</a>
        <a className='text-white' onClick={() => handleClick('en')}>ENG</a>
      </div>
  )
}

const Menu = () => {
    const [t, i18n] = useTranslation();
    const [navbar, setNavbar] = useState(false)
    const [isActive, setActive] = useState(true);

    const changeBackground = () => {
        if (window.scrollY >= 300) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }
    const openMenu = () => {
        setActive(!isActive);
    }

    useEffect(() => {
        window.addEventListener('scroll', changeBackground)
    })
  return (
    <header className={navbar ? "header header-scrolled" : "header"}>
        <Language />  
          <button className="burger">
                <span onClick={openMenu} className={!isActive ? "material-symbols-outlined open hide" : "material-symbols-outlined open"}>menu</span>
                <span onClick={openMenu} className={!isActive ? "material-symbols-outlined close" : "material-symbols-outlined hide"}>close</span>
          </button> 
          <nav className={!isActive ? "Oswald active" : "Oswald"}>
            <ul>
              <li><a onClick={openMenu} href="#hero">{t('Header.1')}</a></li>
              <li><a onClick={openMenu} href="#about">{t('Header.2')}</a></li>
              <li><a onClick={openMenu} href="#offer">{t('Header.3')}</a></li>
              <li><a onClick={openMenu} href="#komp">{t('Header.4')}</a></li>
              <li><a onClick={openMenu} href="#contact">{t('Header.5')}</a></li>
            </ul>
          </nav>
      </header>
  )
}

const Background = () => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
  return(
    <div id="hero" className="bg-image">
        <div data-aos="fade-up" className="flex Oswald">
            <h1 className='text-center'>Szumiel
                <div className='wiggle'>
                    <h2 className='text-center Nunito'>Virtual System Management</h2>
                </div>
            </h1>
      </div>   
    </div> 
  )
}

const Info = () => {
    const [t, i18n] = useTranslation();
  return (
    <section id="about" className="container-fluid bg-dark text-white d-flex">
        <div className="container-lg m-auto py-5 fs-3">
            <div data-aos-easing="ease-in-out" data-aos="fade-up" className="row">
                <div className="col-xxl-8 Nunito">
                    <h1 className="text-center pt-2 pb-3 Oswald">{t('Who.1')}</h1>
                    <p className="pt-4 h6">{t('Who.2')}</p>
                    <p className="pt-4 h6">{t('Who.3')}</p>
                    <p className="pt-4 h6">{t('Who.4')}</p>
                    <p className="pt-4 h6">{t('Who.5')}</p>
                    <p className="pt-4 h6">{t('Who.6')}</p>
                    <p className="pt-4 h6">{t('Who.7')}</p>
                </div>
                <div className="col-xxl-4 m-auto">
                    <p className="h5 a2 Nunito underline">{t('Who.8')}</p>
                </div>
            </div> 
        </div>
    </section>
  )
}

const ColaborationModule = (props) => {
    const [t, i18n] = useTranslation();
    const list = props.array.slice(2);
    const newList = list.map(number => <li key={number}>{number}</li>);
    const [isActive, setActive] = useState(true);
    const toggleClass = () => {
        setActive(!isActive);
    }

    return (
        <div className="col-sm">
            <img className="pulsing shadow-sm max-width" alt="img" src={require(`${props.img}`)} />
            <p className="h4 pt-4 text-center Oswald">{props.name}</p>
            <div className="text-center">
                <button className='mb-t' type="button" onClick={toggleClass}>{t('Colab.1')}</button>
                <p className={!isActive ? "not-active" : null}>...</p>
            </div>
            <ul className={`pt-2 Oswald mb-t fadeInList ${isActive ? "not-active" : null}`}>
                {newList}
            </ul>
        </div>        
    )
}

const Colaboration = () => {
    const [t, i18n] = useTranslation();
    const colaborationInfoOne= ['./s1.jpg', t('Colab.2'), t('Colab.3'), t('Colab.4'), t('Colab.5'), t('Colab.6')]
    const colaborationInfoTwo= ['./s2.jpg', 'Human resources', t('Colab.7'), t('Colab.8'), t('Colab.9'), t('Colab.10'), t('Colab.11')]
    const colaborationInfoThree= ['./s3.jpg', t('Colab.12'), t('Colab.13'), t('Colab.14')]
    const colaborationInfoFourth= ['./s4.jpg', t('Colab.15'), t('Colab.16'), t('Colab.17'), t('Colab.18')]
    const colaborationInfoFifth= ['./s5.jpg', t('Colab.19'), t('Colab.20'), t('Colab.21')]
    const colaborationInfoSixth= ['./s6.jpg', t('Colab.22'), t('Colab.23'), t('Colab.24'), t('Colab.25'), t('Colab.26')]
  return (
        <section id="offer" className="container-fluid d-flex">
          <div data-aos-easing="ease-in-out" data-aos="fade-up" className="container-lg m-auto pb-5 more-info">
              <div className="row">
                  <div className="col"><h1 className="text-center pt-5 pb-3 Oswald">Współpraca z zakresu</h1></div>
              </div>
              <div className="row pt-4">
                    <ColaborationModule img={colaborationInfoOne[0]} name={colaborationInfoOne[1]} array={colaborationInfoOne} />
                    <ColaborationModule img={colaborationInfoTwo[0]} name={colaborationInfoTwo[1]} array={colaborationInfoTwo} />
                    <ColaborationModule img={colaborationInfoThree[0]} name={colaborationInfoThree[1]} array={colaborationInfoThree} />
              </div>
              <div className="row pt-4">           
                    <ColaborationModule img={colaborationInfoFourth[0]} name={colaborationInfoFourth[1]} array={colaborationInfoFourth} />
                    <ColaborationModule img={colaborationInfoFifth[0]} name={colaborationInfoFifth[1]} array={colaborationInfoFifth} />
                    <ColaborationModule img={colaborationInfoSixth[0]} name={colaborationInfoSixth[1]} array={colaborationInfoSixth} />
              </div>
          </div>
      </section>   
  )  
}

const Competencies = () => {
    const [t, i18n] = useTranslation();
    return (    
        <section id="komp" className="container-fluid bg-dark text-white d-flex">
            <div className="container-lg m-auto py-5 fs-3 mt-5 mb-5">
                <div data-aos-easing="ease-in-out" data-aos="fade-up" className="row">
                    <div className="col-xxl-4 m-auto text-left">
                        <h3 className="pt-2 pb-3 h4 Oswald">{t('Competencies.1')}</h3>
                        <p className="pt-4 h6 Nunito">{t('Competencies.2')}</p>
                    </div>
                    <div className="col-xxl-8">
                        <h1 className="text-center pt-2 pb-3 Oswald">{t('Competencies.3')}</h1>
                        <p className="pt-4 h6 text-center Nunito">{t('Competencies.4')}</p>
                        <p className="pt-4 h6 text-center Nunito">{t('Competencies.5')}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Contact = () => {
    const [t, i18n] = useTranslation();
    return (
        <section id="contact" className="container-fluid d-flex pb-2 bg-image-contact">
            <div data-aos-easing="ease-in-out" data-aos="fade-up" className="container-lg mt-5 mb-5 mx-auto text-white contact-border">
                <div className="row">
                    <div className="col"><h1 className="text-center pt-5 pb-3 a3 Nunito mb-t">{t('Contact.1')}</h1></div>
                    <p className="h5 pt-4 text-center Nunito mb-t">{t('Contact.2')}</p> 
                    <p className="h5 pt-4 text-center Nunito mb-t"><b>{t('Contact.3')}</b></p>
                    <p className="h5 pt-4 text-center Nunito mb-t"><b>{t('Contact.4')}</b></p>
                </div>
                <div className="row pt-5">
                    <div className="col mx-5">
                        <h2 className="Oswald mb-t">Email:</h2>
                        <p className="h5 Nunito small mb-t"><a href="mailto:contact@szumiel.com">contact@szumiel.com</a></p>
                    </div>
                    <div className="col mx-5">
                        <h2 className="Oswald mb-t">{t('Contact.5')}</h2>
                        <p className="h5 Nunito small mb-t"><a href="tel:+48731030490">+48 731 03 04 90</a></p>
                    </div>
                    <div className="col mx-5">
                        <h2 className="Oswald mb-t">{t('Contact.6')}</h2>
                        <p className="h6 Nunito mb-t">{t('Contact.7')}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Footer = () => {
    return (
        <section className="container-fluid d-flex bg-dark">
            <div className="container-lg mt-3 mb-2 mx-auto">
                <div className="row text-center">
                    <div className="col">
                        <p className="Oswald end-footer">2022 | Marcin Szumiel FrontEnd Developer - <a href="https://www.instagram.com/marcinszumiel/">Instagram</a></p>
                    </div>
                </div>
            </div>
        </section> 
    )
}

function App() {
  return (
    <div>
        <Popup />
        <Menu />
        <Background />
        <Info />
        <Colaboration />
        <Competencies />
        <Contact />
        <Footer />
    </div>
  );
}

export default App;
