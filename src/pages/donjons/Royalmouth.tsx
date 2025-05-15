import "../../styles/Donjon.css";

export default function donjon() {
  return (
    <div className="donjon-container">
      <h1>🐑 <span>Farm Royalmouth</span></h1>

      <section className="donjon-section">
        <h2>Prérequis</h2>
        <div className="prerequis-row">
          <Spell icon="/spell/dispe.png" level={1} name="Flèche de dispertion" />
        </div>
      </section>

      <section className="donjon-section">
        <h2>Description</h2>
        <ul className="description-list">
          <li>📍 Pousser le royalmouth</li>
          <li>🌀 Faire gaffe quand il est au centre</li>
        </ul>
      </section>

      <section className="donjon-section">
        <h2>Vidéo</h2>
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/t-e4eDmKXuw"
            title="Farm royalmouth"
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
