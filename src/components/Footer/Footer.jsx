import "./Footer.css";

export default function Footer() {
  const lastUpdated = "January 4, 2026";

  return (
    <footer className="site-footer">
      <p className="site-footer__text">
        Page last updated at:{" "}
        <span className="site-footer__date">{lastUpdated}</span>
      </p>
    </footer>
  );
}
