import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useStore } from '../store/store';
import { useEffect } from 'react';

const Header = () => {
  const { theme, toggleTheme } = useStore();

  const handleScrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const startContent = (
    <h1 className="text-2xl font-extrabold tracking-wide text-primary">
      JFPI
    </h1>
  );

  const endContent = (
    <div className="flex gap-4">
      <Button
        icon="pi pi-user"
        className="p-button-text text-primary hover:text-accent transition-transform duration-200 hover:scale-150"
        data-pr-tooltip="Acerca de mí"
        onClick={() => handleScrollToSection('about-section')}
        id="others"
      />
      <Button
        icon="pi pi-briefcase"
        className="p-button-text text-primary hover:text-accent transition-transform duration-200 hover:scale-150"
        data-pr-tooltip="Proyectos"
        onClick={() => handleScrollToSection('projects-section')}
        id="others"
      />
      <Button
        icon="pi pi-mobile"
        className="p-button-text text-primary hover:text-accent transition-transform duration-200 hover:scale-150"
        data-pr-tooltip="Contáctame"
        onClick={() => handleScrollToSection('contact-section')}
        id="contact-button"
      />
      <Button
        icon={theme === 'dark' ? "pi pi-sun" : "pi pi-moon"}
        className="p-button-text text-primary hover:text-accent transition-transform duration-200 hover:scale-150"
        onClick={toggleTheme}
        data-pr-tooltip="Cambiar tema"
        id="theme-toggle"
      />
    </div>
  );

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div
      className="card fixed top-0 left-0 w-full z-40 p-4 transition-all duration-300"
      style={{
        backgroundColor: theme === 'dark'
          ? 'rgba(0, 0, 0, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)', 
        boxShadow: theme === 'dark'
          ? '0px 4px 10px rgba(255, 255, 255, 0.2)'
          : '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Tooltip target="#others, #contact-button" position="bottom" />
      <Tooltip target="#theme-toggle" position="left" />
      <Toolbar
        className="flex justify-between items-center px-6"
        start={startContent}
        end={endContent}
      />
    </div>
  );
};

export default Header;
