import Flag from "../Flag/Flag";
import "./PersonCard.css";

/**
 * @param {{ personName: string, top10: Array<{
 *  rank: number,
 *  artist: string,
 *  song: string,
 *  country: string,
 *  countryCode: string,
 *  flagEmoji: string,
 *  year: number,
 *  youtubeUrl: string
 * }> }} props
 */
export default function PersonCard({ personName, top10 }) {
  return (
    <section className="person-card" aria-label={`${personName} Top 10`}>
      <h2 className="person-card__title">{personName}</h2>

      <ol className="person-card__list">
        {top10.map((item) => (
          <li key={item.rank} className="person-card__item">
            <div className="person-card__line">
              <span className="person-card__artist">{item.artist}</span>
              <span className="person-card__dash"> - </span>
              <span className="person-card__song">“{item.song}”</span>
            </div>

            <div className="person-card__meta">
              <span className="person-card__country">
                <Flag
                  countryCode={item.countryCode}
                  countryName={item.country}
                />{" "}
                {item.country}
              </span>

              <span className="person-card__dot">•</span>
              <span className="person-card__year">{item.year}</span>
              <span className="person-card__dot">•</span>
              <a
                className="person-card__link"
                href={item.youtubeUrl}
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
