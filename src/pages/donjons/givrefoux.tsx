import "../../styles/Donjon.css";

export default function donjon() {
  return (
    <div className="donjon-container">
      <h1>❄️ <span>Farm Fuji Givrefoux</span></h1>

      <section className="donjon-section">
        <h2>Prérequis</h2>
        <div className="prerequis-row">
          <Spell icon="/spell/dispe.png" level={1} name="Flèche de dispersion" />
          <Spell icon="/spell/Maladresse.png" level={1} name="Maladresse" />
        </div>
      </section>

      <section className="donjon-section">
        <h2>Description</h2>
        <ul className="description-list">
          <li>🧲 Retrait PM la fuji et la poussé avec <strong>dispersion</strong></li>
          <li>📍 Se Mettre dans le coin haut gauche ou haut droit</li>
          <li>🌀 Passe tour</li>
        </ul>
      </section>

      <section className="donjon-section">
        <h2>Vidéo</h2>
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/5b0Wt7nm2pk"
            title="Farm Fuji Givrefoux"
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
