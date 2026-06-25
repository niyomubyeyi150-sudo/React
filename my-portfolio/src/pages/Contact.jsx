import "../Styles/contact.css";

function Contact() {
  function handleSubmit(e) {
    e.preventDefault();
    alert("Message Sent Successfully");
    e.target.reset();
  }

  return (
    <>
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Me</h1>
          <p>Let's discuss your next project.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              placeholder="Full Name"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              required
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              required
            ></textarea>

            <button type="submit" className="btn">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;