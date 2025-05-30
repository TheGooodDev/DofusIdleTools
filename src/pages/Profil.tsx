import { useEffect, useState } from "react"
import "../styles/Profil.css"

type Profile = {
  Pseudo: string
  Stats_air: number
  Stats_Feu: number
  Stats_Eau: number
  Stats_Terre: number
  Stats_Vita: number
  Level_Relique: number
  Etage_max: number
  Vip: boolean
}

const DEFAULT_PROFILE: Profile = {
  Pseudo: "Invité",
  Stats_air: 0,
  Stats_Feu: 0,
  Stats_Eau: 0,
  Stats_Terre: 0,
  Stats_Vita: 0,
  Level_Relique: 1,
  Etage_max: 1,
  Vip: false,
}

const LOCAL_KEY = "profil"

export default function Profil() {
  const [profile, setProfile] = useState<Profile>(() => {
    const saved = localStorage.getItem(LOCAL_KEY)
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE
  })
  const handleVip = (checked: boolean) => {
    setProfile((prev) => ({ ...prev, Vip: checked }))
  }
  // Sauvegarde automatique dès que le profil change
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(profile))
  }, [profile])

  const update = (key: keyof Profile, value: string) => {
    const parsed = parseInt(value.replace(/\D/g, "") || "0", 10);

    setProfile((prev) => {
      let newValue = parsed;

      // Limite spécifique pour le niveau de relique
      if (key === "Level_Relique") {
        newValue = Math.min(parsed, 1000);
      }

      return { ...prev, [key]: newValue };
    });
  };

  const handlePseudo = (value: string) => {
    setProfile((prev) => ({ ...prev, Pseudo: value }))
  }

  return (
    <div className="profil-container">
      <h1>🧑‍🚀 Profil</h1>

      <h2>Pseudo</h2>
      <input
        type="text"
        value={profile.Pseudo}
        onChange={(e) => handlePseudo(e.target.value)}
        placeholder="Pseudo"
      />

      <h2>Stats élémentaires</h2>
      <div className="grid">
        <LabeledInput label={<><img src="/air.png" alt="Air" /> Agilité</>} value={profile.Stats_air} onChange={(v) => update("Stats_air", v)} />
        <LabeledInput label={<><img src="/feu.png" alt="Feu" /> Intelligence</>} value={profile.Stats_Feu} onChange={(v) => update("Stats_Feu", v)} />
        <LabeledInput label={<><img src="/eau.png" alt="Eau" /> Chance</>} value={profile.Stats_Eau} onChange={(v) => update("Stats_Eau", v)} />
        <LabeledInput label={<><img src="/terre.png" alt="Terre" /> Force</>} value={profile.Stats_Terre} onChange={(v) => update("Stats_Terre", v)} />
        <LabeledInput label={<><img src="/pv.png" alt="PV" /> Vitalité</>} value={profile.Stats_Vita} onChange={(v) => update("Stats_Vita", v)} />
      </div>
      <h2>Progression</h2>
      <div className="grid">
        <LabeledInput label="Niveau relique" value={profile.Level_Relique} onChange={(v) => update("Level_Relique", v)} />
        <LabeledInput label="Étages max idle" value={profile.Etage_max} onChange={(v) => update("Etage_max", v)} />
      </div>
      <h2>Status VIP</h2>
      <div className="form-group vip-checkbox">
        <label className="labeled-input">
          <span>VIP :</span>
          <input
            type="checkbox"
            checked={profile.Vip}
            onChange={(e) => handleVip(e.target.checked)}
          />
        </label>
      </div>
    </div>
  )
}

function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: React.ReactNode;
  value: number;
  onChange: (val: string) => void;
}) {
  const displayValue = value.toLocaleString("fr-FR");

  return (
    <div className="form-group">
      <label className="labeled-input">
        <span>{label} :</span>
        <input
          type="text"
          className="form-control"
          value={displayValue}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}


