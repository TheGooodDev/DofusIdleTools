import { useEffect, useState } from "react"
import "../styles/Parchemins.css"

const TIERS = [
    { seuil_max: 100_000, cout: 10, gain: 1, label: "Petit Parchemin" },
    { seuil_max: 1_000_000, cout: 100, gain: 35, label: "Parchemin" },
    { seuil_max: 10_000_000, cout: 1_000, gain: 450, label: "Grand Parchemin" },
    { seuil_max: 100_000_000, cout: 10_000, gain: 6_000, label: "Puissant Parchemin" },
]

const STAT_KEYS: Record<string, keyof Profile> = {
    Air: "Stats_air",
    Feu: "Stats_Feu",
    Eau: "Stats_Eau",
    Terre: "Stats_Terre",
    Vita: "Stats_Vita",
}

type Profile = {
    Pseudo: string
    Stats_air: number
    Stats_Feu: number
    Stats_Eau: number
    Stats_Terre: number
    Stats_Vita: number
    Level_Relique: number
    Etage_max: number
}

export default function Parchemins() {
    const [profile, setProfile] = useState<Profile>(() => {
        const stored = localStorage.getItem("profil")
        return stored ? JSON.parse(stored) : {
            Pseudo: "",
            Stats_air: 0,
            Stats_Feu: 0,
            Stats_Eau: 0,
            Stats_Terre: 0,
            Stats_Vita: 0,
            Level_Relique: 1,
            Etage_max: 1,
        }
    })

    const [statName, setStatName] = useState<keyof typeof STAT_KEYS>("Air")
    const statKey = STAT_KEYS[statName]

    const [lvlActuel, setLvlActuel] = useState(profile[statKey])
    const [lvlVoulue, setLvlVoulue] = useState<number>((profile[statKey] as number) + 1_000_000)

    const [coutTotal, setCoutTotal] = useState(0)
    const [details, setDetails] = useState<Record<string, number>>({})
    const [nbRuns, setNbRuns] = useState<number | null>(null)

    useEffect(() => {
        const { total, parType } = calculerCoutParchemin(
            Number(lvlActuel),
            Number(lvlVoulue)
        )
        setCoutTotal(total)
        setDetails(parType)
    }, [lvlActuel, lvlVoulue])

    useEffect(() => {
        // mise à jour du profil si la stat de base change
        if (lvlActuel !== profile[statKey]) {
            const updated = { ...profile, [statKey]: lvlActuel }
            setProfile(updated)
            localStorage.setItem("profil", JSON.stringify(updated))
        }
    }, [lvlActuel])
    useEffect(() => {
        const value = Number(profile[statKey] || 0)
        setLvlActuel(value)
        setLvlVoulue(value + 1_000_000)
    }, [statKey])
    useEffect(() => {
        if (coutTotal > 0) {
            const { Level_Relique, Etage_max } = profile
            if (Level_Relique > Etage_max) {
                setNbRuns(null)
                return
            }
            const gainRun = pointsParRun(Level_Relique, Etage_max)
            setNbRuns(Math.ceil(coutTotal / gainRun))
        }
    }, [coutTotal, profile])

    return (
        <div className="page-parchemins">
            <h1>Coût en parchemins</h1>

<div className="form">
  <div className="stat-selector">
    <span>Stat à améliorer :</span>
    <div className="stat-options">
      {Object.entries(STAT_KEYS).map(([key]) => (
        <button
          key={key}
          onClick={() => setStatName(key as keyof typeof STAT_KEYS)}
          className={`stat-button ${statName === key ? "active" : ""}`}
        >
          <img src={`/${key.toLowerCase() === "vita" ? "pv" : key.toLowerCase()}.png`} alt={key} />
          {key}
        </button>
      ))}
    </div>
  </div>

  <label>
    Niveau actuel
    <input
      type="text"
      value={formatNumber(Number(lvlActuel))}
      onChange={(e) => setLvlActuel(parseInt(cleanNumber(e.target.value)))}
    />
  </label>

  <label>
    Niveau voulu
    <input
      type="text"
      value={formatNumber(lvlVoulue)}
      onChange={(e) => setLvlVoulue(parseInt(cleanNumber(e.target.value)))}
    />
  </label>
</div>


            <h2>📊 Résultat</h2>
            <p><strong>Coût total :</strong> {formatNumber(coutTotal)} points d'éveil</p>

            <table>
                <thead>
                    <tr><th>Type</th><th>Nombre</th></tr>
                </thead>
                <tbody>
                    {Object.entries(details).map(([label, count]) => (
                        <tr key={label}>
                            <td>{label}</td>
                            <td>{formatNumber(count)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {nbRuns !== null && (
                <div>
                    <h2>🧪 Simulation de farm</h2>
                    <p>Nombre de runs complets nécessaires : <strong>{formatNumber(nbRuns)}</strong></p>
                </div>
            )}
        </div>
    )
}

function calculerCoutParchemin(niveauActuel: number, niveauVoulu: number) {
    let temp = niveauActuel
    let coutTotal = 0
    const nbParchemins: Record<string, number> = {}
    TIERS.forEach(({ label }) => (nbParchemins[label] = 0))

    for (const row of TIERS) {
        if (temp >= niveauVoulu) break
        const borneInf = temp
        const borneSup = Math.min(row.seuil_max - 1, niveauVoulu - 1)
        if (borneInf > borneSup) continue
        const statsAGagner = borneSup - borneInf + 1
        const parcheminsUtiles = Math.ceil(statsAGagner / row.gain)

        temp += parcheminsUtiles * row.gain
        coutTotal += parcheminsUtiles * row.cout
        nbParchemins[row.label] += parcheminsUtiles
    }

    return { total: coutTotal, parType: nbParchemins }
}

function pointsParRun(start: number, end: number): number {
    return ((end - start + 1) * (start + end)) / 2
}

function cleanNumber(str: string): string {
    return str.replace(/\D/g, "")
}

function formatNumber(n: number): string {
    return n.toLocaleString("fr-FR")
}