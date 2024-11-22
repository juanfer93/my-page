import { Card } from 'primereact/card';
import { projects } from '../data/projects';
import { useStore } from '../store/store';

const Projects = () => {

  const { theme } = useStore()

  return (
    <div id="projects-section" className="mt-12 flex justify-between scroll-offset fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Card
              className={`shadow-lg w-full p-4 flex flex-col items-center rounded-lg 
              border transition-all transform hover:scale-105 cursor-pointer bg-[var(--background-color)] 
              `}
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
              <h2 className="text-xl font-semibold text-center text-[var(--text-color)]">{project.title}</h2>
              <p className="text-center mb-4 text-[var(--secondary-text-color)]">{project.description}</p>
              <span className="text-[var(--link-color)] hover:text-[var(--link-hover-color)] transition-all">
                Ver proyecto
              </span>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
