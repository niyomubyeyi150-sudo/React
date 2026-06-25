import { Link } from "react-router-dom";
import "../Styles/home.css";

const skills = [
  {
    title: "React Development",
    description: "Building fast and interactive user interfaces.",
  },
  {
    title: "Responsive Design",
    description: "Websites that work on all devices.",
  },
  {
    title: "REST APIs",
    description: "Connecting frontend applications to backends.",
  },
  {
    title: "JavaScript",
    description: "Modern ES6+ development practices.",
  },
  {
    title: "CSS",
    description: "Clean and maintainable styling.",
  },
  {
    title: "Git & GitHub",
    description: "Version control and collaboration.",
  },
];

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Hello, I'm a React Developer</h1>
          <p>
            I build modern, responsive, and user-friendly web applications.
          </p>

          <div className="hero-buttons">
            <Link to="/contact" className="btn">
              Contact Me
            </Link>

            <Link to="/about" className="btn-outline">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="skills-section">
        <div className="container">
          <h2>What I Do</h2>

          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill.title}>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Work Together?</h2>
          <p>Let's create something amazing.</p>

          <Link to="/contact" className="btn">
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;