import './App.css';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';

function App() {

  return (
    <div className="App">
      <Header />
      <About />
      <Projects />
      <ContactForm />
    </div>
  );
}

export default App;
