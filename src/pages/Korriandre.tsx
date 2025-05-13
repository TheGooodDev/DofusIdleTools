import "../styles/Korriandre.css";

export default function Korriandre() {
  return (
    <div className="korriandre-container">
      <h1>🕷️ <span>Farm Korriandre</span></h1>

      <section className="korri-section">
        <h2>Prérequis</h2>
        <div className="prerequis-row">
          <Spell icon="/spell/peur.png" level={6} name="Peur" />
          <Spell icon="/spell/coffre.png" level={2} name="Coffre" />
        </div>
      </section>

      <section className="korri-section">
        <h2>Description</h2>
        <ul className="description-list">
          <li>📍 Bloquer le korriandre dans le coin en base</li>
          <li>🌀 Utiliser <strong>Peur</strong> pour le pousser ou <strong>Dispe</strong> s’il est sur la case de départ la plus basse</li>
          <li>🪙 Utiliser le <strong>Coffre</strong> pour le bloquer</li>
        </ul>
      </section>

      <section className="korri-section">
        <h2>Vidéo</h2>
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/vvP5knbWTOQ"
            title="Farm Korriandre"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
}

function Spell({ icon, level, name }: { icon: string; level: number; name: string }) {
  return (
    <div className="spell-block">
      <img src={icon} alt={name} width={80} height={80} />
      <strong>Niv. {level}</strong>
    </div>
  );
}
