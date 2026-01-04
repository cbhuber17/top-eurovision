import "./Flag.css";

/**
 * Converts ISO country code (e.g., "SE") to Twemoji SVG URL.
 * Flags are represented by two regional indicator codepoints.
 */
function countryCodeToTwemojiFlagUrl(countryCode) {
  if (!countryCode || countryCode.length !== 2) return null;

  const code = countryCode.toUpperCase();
  const A = "A".charCodeAt(0);

  const cps = [...code].map((ch) => {
    const n = ch.charCodeAt(0) - A;
    // Regional Indicator Symbol Letter A starts at 0x1F1E6
    return (0x1f1e6 + n).toString(16);
  });

  // Twemoji uses codepoints joined with '-'
  return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${cps.join(
    "-"
  )}.svg`;
}

export default function Flag({ countryCode, countryName }) {
  const src = countryCodeToTwemojiFlagUrl(countryCode);

  if (!src) return null;

  return (
    <img
      className="flag"
      src={src}
      alt={`${countryName} flag`}
      loading="lazy"
      width="18"
      height="18"
    />
  );
}
