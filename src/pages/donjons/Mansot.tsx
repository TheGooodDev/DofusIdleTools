import "../../styles/Donjon.css";

export default function donjon() {
  return (
    <div className="donjon-container">
      <h1>🐧 <span>Farm Mansot Royal</span></h1>

      <section className="donjon-section">
        <h2>Prérequis</h2>
        <div className="prerequis-row">
          <Spell icon="/spell/soin.png" level={1} name="Mot curatif" />
        </div>
      </section>

      <section className="donjon-section">
        <h2>Description</h2>
        <ul className="description-list">
          <li>📍 Se soigner à son CaC</li>
        </ul>
      </section>

      <section className="donjon-section">
        <h2>Vidéo</h2>
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/laqyE--c6v0"
            title="Farm Mansot Royal"
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
