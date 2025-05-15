import { Link } from "react-router-dom";
import "../styles/Home.css";

type Profile = {
  Pseudo: string;
  Stats_air: number;
  Stats_Feu: number;
  Stats_Eau: number;
  Stats_Terre: number;
  Stats_Vita: number;
  Level_Relique: number;
  Etage_max: number;
  Vip: boolean;
};

function getProfile(): Profile {
  const profil = JSON.parse(localStorage.getItem("profil") || "{}");
  return {
    Pseudo: profil.Pseudo || "Inconnu",
    Stats_air: profil.Stats_air || 0,
    Stats_Feu: profil.Stats_Feu || 0,
    Stats_Eau: profil.Stats_Eau || 0,
    Stats_Terre: profil.Stats_Terre || 0,
    Stats_Vita: profil.Stats_Vita || 0,
    Level_Relique: profil.Level_Relique || 1,
    Etage_max: profil.Etage_max || 1,
    Vip: profil.Vip || false,
  };
}

function pointsParRun(start: number, end: number): number {
  return ((end - start + 1) * (start + end)) / 2;
}

export default function Home() {
  const profile = getProfile();
  let pointsRun = pointsParRun(profile.Level_Relique, profile.Etage_max);

  // Bonus VIP : +10%
  if (profile.Vip) {
    pointsRun = Math.round(pointsRun * 1.1);
  }

  return (
    <main className="home-container">
      <h1 className="home-title">Dofus IDLE Tools</h1>

      <section className="summary-block">
        <h2>📌 Résumé du profil</h2>
        <ul>
          <li><strong>Pseudo :</strong> {profile.Pseudo}</li>
          <li><strong>Relique d’éveil :</strong> niveau {profile.Level_Relique}</li>
          <li><strong>Étage max :</strong> {profile.Etage_max}</li>
          <li><strong>Points par run :</strong> {pointsRun.toLocaleString("fr-FR")} {profile.Vip && <span>⭐ (+10% VIP)</span>}</li>
        </ul>
      </section>

      <section className="summary-block">
        <h2>📊 Stats</h2>
        <ul className="stat-list">
          <li><img src="/air.png" alt="Air" /> {profile.Stats_air.toLocaleString("fr-FR")}</li>
          <li><img src="/feu.png" alt="Feu" /> {profile.Stats_Feu.toLocaleString("fr-FR")}</li>
          <li><img src="/eau.png" alt="Eau" /> {profile.Stats_Eau.toLocaleString("fr-FR")}</li>
          <li><img src="/terre.png" alt="Terre" /> {profile.Stats_Terre.toLocaleString("fr-FR")}</li>
          <li><img src="/pv.png" alt="Vitalité" /> {profile.Stats_Vita.toLocaleString("fr-FR")}</li>
        </ul>
      </section>

      <div className="sections">
        <Section title="🧰 Outils" color="pumpkin">
          <PageLink to="/parchemins" icon="📜">Parchemin</PageLink>
          <PageLink to="/rentabilite-relique" icon="📦">Rentabilité Relique</PageLink>
        </Section>

        <Section title="⚙️ Optimisation" color="midnight">
          <PageLink to="/ramdisk" icon="🚀">Ramdisk</PageLink>
        </Section>

        <Section title="💰 Farm Donjons" color="icterine">
          <PageLink to="/royalmouth" icon="🐑">Royalmouth</PageLink>
          <PageLink to="/mansot" icon="🐧">Mansot Royal</PageLink>
          <PageLink to="/ben" icon="🏴‍☠️">Ben le Ripate</PageLink>
          <PageLink to="/obsidiantre" icon="🌋">Obsidiantre</PageLink>
          <PageLink to="/givrefoux" icon="❄️">Givrefoux</PageLink>
          <PageLink to="/korriandre" icon="🕷️">Korriandre</PageLink>
          <PageLink to="/kolosso" icon="🐻‍❄️">Kolosso</PageLink>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className={`section section-${color}`}>
      <h2>{title}</h2>
      <div className="links">{children}</div>
    </div>
  );
}

function PageLink({ to, icon, children }: { to: string; icon?: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="page-link">
      {icon && <span className="me-2">{icon}</span>}
      {children}
    </Link>
  );
}
