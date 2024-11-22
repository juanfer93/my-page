import { useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { useStore } from '../store/store';

const About = () => {
  const {
    titleText,
    bodyText,
    cursorVisible,
    setTitleText,
    setBodyText,
    toggleCursor,
    theme
  } = useStore(state => state);

  const fullTitle = "Acerca de mí:";
  const fullBody = `Mi nombre es Juan Fernando Pacheco, soy desarrollador full stack, tengo experiencia
  en el desarrollo de aplicaciones web y moviles, manejo lenguajes de programación
  como: Javascript, Typescript, Java y Python. He trabajado en aplicaciones de
  backend como Node.js, Express.js, Nest.js, Spring Boot, 
  y aplicaciones de frontend como React.js y Next.js.
  en Python he manejado frameworks como Django y Flask.
  Hoy vengo a ofrecerte mis servicios como desarrollador full stack,
  Abajo hay un formulario que puedes usar para contactarme.`;

  const titleIndexRef = useRef(0);
  const bodyIndexRef = useRef(0);

  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTitleCompleteRef = useRef(false);

  useEffect(() => {
    const writeText = () => {
      if (titleIndexRef.current < fullTitle.length) {
        setTitleText((prev) => prev + fullTitle[titleIndexRef.current]);
        titleIndexRef.current++;
        setTimeout(writeText, 100);
      } else if (!isTitleCompleteRef.current) {
        isTitleCompleteRef.current = true;
        setTimeout(writeText, 100);
      } else if (bodyIndexRef.current < fullBody.length) {
        setBodyText((prev) => prev + fullBody[bodyIndexRef.current]);
        bodyIndexRef.current++;
        setTimeout(writeText, 50);
      }
    };

    if (titleText === '' && bodyText === '') {
      writeText();
    }

    cursorTimeoutRef.current = setInterval(() => {
      if (isTitleCompleteRef.current) {
        toggleCursor();
      }
    }, 500);

    return () => {
      if (cursorTimeoutRef.current) {
        clearInterval(cursorTimeoutRef.current);
      }
    };
  }, [setTitleText, setBodyText, toggleCursor, titleText, bodyText, fullBody]);

  return (
    <div
      id="about-section"
      className="flex flex-col items-center justify-center mt-16 scroll-offset fade-in"
      style={{
        transition: 'background-color 0.5s ease, backdrop-filter 0.5s ease',
        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="relative w-full">
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[var(--background-color)] via-[rgba(0, 0, 0, 0.7)] to-[var(--background-color)] opacity-80 -z-5`}></div>

        <Card
          className="relative w-full h-auto sm:h-[400px] md:h-80 p-6 rounded-lg shadow-lg flex items-center transition-all duration-500"
          style={{
            boxShadow: theme === 'dark' ? '0px 10px 20px rgba(255, 255, 255, 0.2)' : '0px 10px 20px rgba(0, 0, 0, 0.15)',
          }}
        >
          <h1 className="text-left text-3xl font-bold mb-3 ml-3 text-[var(--text-color)] text-shadow-md">
            {titleText}
            {!isTitleCompleteRef.current && cursorVisible && <span className="cursor-title"></span>}
          </h1>
          <p className="m-0 text-[var(--text-color)] text-left ml-3 text-shadow-md">
            {bodyText}
            {isTitleCompleteRef.current && cursorVisible && <span className="cursor-paragraph"></span>}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default About;
