import "./StatsSection.css";
import Flag from "../Flag/Flag";

function pluralizePicks(n) {
  return `${n} ${n === 1 ? "pick" : "picks"}`;
}

/**
 * Return items representing the top N *ranks* by count, including ties.
 * Example: counts 5,4,4,3 -> returns 5 + (4,4) + 3 (3 ranks, 4 items)
 */
function topRanksWithTies(entries, maxRanks = 3) {
  const sorted = [...entries].sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    // stable tie-break for consistent display
    return a.label.localeCompare(b.label);
  });

  const result = [];
  let ranksIncluded = 0;
  let lastCount = null;

  for (const e of sorted) {
    if (lastCount === null || e.count !== lastCount) {
      ranksIncluded += 1;
      lastCount = e.count;
    }
    if (ranksIncluded > maxRanks) break;
    result.push(e);
  }

  return result;
}

function StatCard({ title, items }) {
  return (
    <section className="stat-card" aria-label={title}>
      <h3 className="stat-card__title">{title}</h3>

      {items.length === 0 ? (
        <p className="stat-card__empty">No data yet.</p>
      ) : (
        <ol className="stat-card__list">
          {items.map((item, idx) => (
            <li
              key={`${item.key ?? item.label}-${idx}`}
              className="stat-card__item"
            >
              <span className="stat-card__label">
                {item.countryCode ? (
                  <>
                    <Flag
                      countryCode={item.countryCode}
                      countryName={item.countryName ?? item.label}
                    />{" "}
                    {item.label}
                  </>
                ) : (
                  item.label
                )}
              </span>
              <span className="stat-card__count">
                {pluralizePicks(item.count)}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default function StatsSection({ people }) {
  const allPicks =
    people?.flatMap((p) => (Array.isArray(p.top10) ? p.top10 : [])) ?? [];

  // --- Songs ---
  const songMap = new Map();
  for (const s of allPicks) {
    const artist = (s.artist ?? "").trim();
    const song = (s.song ?? "").trim();
    const year = s.year;
    const countryCode = (s.countryCode ?? "").trim().toUpperCase();

    // Skip incomplete entries
    if (!artist || !song || !year) continue;

    const key = `${artist}||${song}||${year}||${countryCode}`;
    const label = `${artist} - “${song}” (${year})`;

    const existing = songMap.get(key);
    if (existing) existing.count += 1;
    else songMap.set(key, { key, label, count: 1 });
  }

  const topSongs = topRanksWithTies([...songMap.values()], 3);

  // --- Years ---
  const yearMap = new Map();
  for (const s of allPicks) {
    const year = s.year;
    if (!year) continue;
    const key = String(year);
    const existing = yearMap.get(key);
    if (existing) existing.count += 1;
    else yearMap.set(key, { key, label: key, count: 1 });
  }

  const topYears = topRanksWithTies([...yearMap.values()], 3);

  // --- Countries ---
  const countryMap = new Map();
  for (const s of allPicks) {
    const countryName = (s.country ?? "").trim();
    const countryCode = (s.countryCode ?? "").trim().toUpperCase();
    if (!countryName || !countryCode) continue;

    const key = countryCode;
    const existing = countryMap.get(key);
    if (existing) existing.count += 1;
    else
      countryMap.set(key, {
        key,
        label: countryName,
        countryName,
        countryCode,
        count: 1,
      });
  }

  const topCountries = topRanksWithTies([...countryMap.values()], 3);

  return (
    <section className="stats-section" aria-label="Community Stats">
      <h2 className="stats-section__title">Community Stats</h2>

      <div className="stats-grid">
        <StatCard title="Top Songs" items={topSongs} />
        <StatCard title="Top Years" items={topYears} />
        <StatCard title="Top Countries" items={topCountries} />
      </div>
    </section>
  );
}
