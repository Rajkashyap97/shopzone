import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">// support channel</span>
          <h1>Get in touch</h1>
          <p>
            Questions about an order, a product spec, or the platform itself —
            drop us a line and the team will follow up.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="contact-success">
              <strong>Message received.</strong>
              <span>We'll get back to you shortly.</span>
            </div>
          ) : (
            <>
              <label>
                Name
                <input type="text" required placeholder="Jane Doe" />
              </label>
              <label>
                Email
                <input type="email" required placeholder="jane@example.com" />
              </label>
              <label>
                Message
                <textarea rows="5" required placeholder="How can we help?" />
              </label>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
