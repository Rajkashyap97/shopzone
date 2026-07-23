import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '110px 24px', textAlign: 'left' }}>
      <span className="eyebrow">// 404</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, margin: '10px 0 20px' }}>
        This route doesn't exist.
      </h1>
      <Link to="/" className="btn btn-primary">Back to Home →</Link>
    </div>
  );
}
