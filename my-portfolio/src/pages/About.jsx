import "../Styles/about.css";

const skills = [
  { name: "React", level: "90%" },
  { name: "JavaScript", level: "85%" },
  { name: "CSS", level: "80%" },
  { name: "Node.js", level: "75%" },
];

const timeline = [
  {
    year: "2024",
    event: "Joined SheCanCODE Bootcamp",
  },
  {
    year: "2023",
    event: "Built first full-stack project",
  },
  {
    year: "2022",
    event: "Started learning React",
  },
];

function About() {
  return (
    <>
      <section className="about-hero">
        <div className="container">
          <h1>About Me</h1>
          <p>
            Passionate developer focused on creating modern web applications.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <h2>Who Am I?</h2>

          <p>
            I am a web developer from Kigali, Rwanda. I enjoy building modern
            websites and learning new technologies.
          </p>

          <div className="stats">
            <div className="stat-box">
              <h3>15+</h3>
              <p>Projects</p>
            </div>

            <div className="stat-box">
              <h3>2+</h3>
              <p>Years Learning</p>
            </div>

            <div className="stat-box">
              <h3>100%</h3>
              <p>Commitment</p>
            </div>
          </div>
        </div>
      </section>

      <section className="skills">
        <div className="container">
          <h2>Technical Skills</h2>

          {skills.map((skill) => (
            <div key={skill.name} className="skill-bar">
              <div className="skill-header">
                <span>{skill.name}</span>
                <span>{skill.level}</span>
              </div>

              <div className="bar">
                <div
                  className="fill"
                  style={{ width: skill.level }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="timeline">
        <div className="container">
          <h2>My Journey</h2>

          {timeline.map((item) => (
            <div className="timeline-item" key={item.year}>
              <h3>{item.year}</h3>
              <p>{item.event}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default About;