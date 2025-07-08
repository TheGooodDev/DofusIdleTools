import { useEffect, useState } from "react"
import "../styles/Parchemins.css"

// const TIERS = [
//     { seuil_max: 100_000, cout: 10, gain: 1, label: "Petit Parchemin" },
//     { seuil_max: 1_000_000, cout: 100, gain: 35, label: "Parchemin" },
//     { seuil_max: 10_000_000, cout: 1_000, gain: 450, label: "Grand Parchemin" },
//     { seuil_max: 100_000_000, cout: 10_000, gain: 6_000, label: "Puissant Parchemin" },
// ]


const TIERS = [
    { seuil_max: 100_000, cout: 100, gain: 15, label: "Parchemin 0 - 100k" },
    { seuil_max: 1_000_000, cout: 100, gain: 35, label: "Parchemin 100k - 1M" },
    { seuil_max: 10_000_000, cout: 100, gain: 45, label: "Parchemin 1M - 10M" },
    { seuil_max: 25_000_000, cout: 100, gain: 60, label: "Parchemin 10M - 25M" },
    { seuil_max: 50_000_000, cout: 100, gain: 80, label: "Parchemin 25M-50M" },
    { seuil_max: 100_000_000, cout: 100, gain: 105, label: "Parchemin 50M-100M" },
    { seuil_max: 200_000_000, cout: 100, gain: 135, label: "Parchemin 100M-200M" },
    { seuil_max: 250_000_000, cout: 100, gain: 170, label: "Parchemin 200M-250M" },
    { seuil_max: 300_000_000, cout: 100, gain: 210, label: "Parchemin 250M-300M" },
    { seuil_max: 350_000_000, cout: 100, gain: 255, label: "Parchemin 300M-350M" },
    { seuil_max: 400_000_000, cout: 100, gain: 305, label: "Parchemin 350M-400M" },
]



const TIERS_Vita = [
    { seuil_max: 100_000, cout: 100, gain: 30, label: "Parchemin 0 - 100k" },
    { seuil_max: 1_000_000, cout: 100, gain: 70, label: "Parchemin 100k - 1M" },
    { seuil_max: 10_000_000, cout: 100, gain: 90, label: "Parchemin 1M - 10M" },
    { seuil_max: 25_000_000, cout: 100, gain: 120, label: "Parchemin 10M - 25M" },
    { seuil_max: 50_000_000, cout: 100, gain: 160, label: "Parchemin 25M-50M" },
    { seuil_max: 100_000_000, cout: 100, gain: 210, label: "Parchemin 50M-100M" },
    { seuil_max: 200_000_000, cout: 100, gain: 270, label: "Parchemin 100M-200M" },
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
    Etage_max_acsension: number
    Vip: boolean
}
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
        Etage_max_acsension: profil.Etage_max_acsension || 1,
        Vip: profil.Vip || false,
    };
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
    const [coutTotal2, setCoutTotal2] = useState(0)
    const [details, setDetails] = useState<Record<string, number>>({})
    const [nbRuns, setNbRuns] = useState<number | null>(null)
    const [nbRuns2, setNbRuns2] = useState<number | null>(null)

    useEffect(() => {
        const tiers = statName === "Vita" ? TIERS_Vita : TIERS
        const { monnaie1, monnaie2, parType } = calculerCoutParchemin(
            Number(lvlActuel),
            Number(lvlVoulue),
            tiers
        )
        setDetails(parType)
        setCoutTotal(monnaie1)
        setCoutTotal2(monnaie2)
    }, [lvlActuel, lvlVoulue, statKey])

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

        const tiers = statName === "Vita" ? TIERS_Vita : TIERS
        const tranche = tiers.find(t => value < t.seuil_max)
        console.log(tranche)
        if (tranche) {
            setLvlVoulue(tranche.seuil_max)
        } else {
            setLvlVoulue(value + 1_000_000)
        }
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
    useEffect(() => {
        if (coutTotal2 > 0) {
            const { Etage_max_acsension } = profile
            const gainRun = pointsParRun(0, Etage_max_acsension)
            setNbRuns2(Math.ceil(coutTotal2 / gainRun))
        }
    }, [coutTotal2, profile])

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
                    Stats actuel
                    <input
                        type="text"
                        value={formatNumber(Number(lvlActuel))}
                        onChange={(e) => setLvlActuel(parseInt(cleanNumber(e.target.value)))}
                    />
                </label>

                <label>
                    Stats voulu
                    <input
                        type="text"
                        value={formatNumber(lvlVoulue)}
                        onChange={(e) => setLvlVoulue(parseInt(cleanNumber(e.target.value)))}
                    />
                </label>
            </div>


            <h2>📊 Résultat</h2>
            <p><strong>Jeton eveil :</strong> {formatNumber(coutTotal)} points d'éveil</p>
            <p><strong>Jeton ascension 1 :</strong> {formatNumber(coutTotal2)} points d'éveil</p>

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
            {nbRuns2 !== null && (
                <div>
                    <h2>🔁 Simulation ascension 1</h2>
                    <p>Nombre de runs nécessaires : <strong>{formatNumber(nbRuns2)}</strong></p>
                </div>
            )}
        </div>
    )
}

function calculerCoutParchemin(niveauActuel: number, niveauVoulu: number, tiers: typeof TIERS) {
    let temp = niveauActuel
    let coutMonnaie1 = 0
    let coutMonnaie2 = 0
    const nbParchemins: Record<string, number> = {}
    tiers.forEach(({ label }) => (nbParchemins[label] = 0))

    for (const row of tiers) {
        if (temp >= niveauVoulu) break
        const borneInf = temp
        const borneSup = Math.min(row.seuil_max - 1, niveauVoulu - 1)
        if (borneInf > borneSup) continue
        const statsAGagner = borneSup - borneInf + 1
        const parcheminsUtiles = Math.ceil(statsAGagner / row.gain)

        temp += parcheminsUtiles * row.gain
        const cout = parcheminsUtiles * row.cout

        if (row.seuil_max <= 200_000_000) {
            coutMonnaie1 += cout
        } else {
            coutMonnaie2 += cout
        }

        nbParchemins[row.label] += parcheminsUtiles
    }

    return { total: coutMonnaie1 + coutMonnaie2, monnaie1: coutMonnaie1, monnaie2: coutMonnaie2, parType: nbParchemins }
}

function pointsParRun(start: number, end: number): number {
    var res = 0;
    const profile = getProfile();
    for (let i = start; i <= end; i++) {
        let add = i
        if (profile.Vip)
            add = Math.ceil(i * 1.1)
        res += add;
    }

    return res;
}

function cleanNumber(str: string): string {
    return str.replace(/\D/g, "")
}

function formatNumber(n: number): string {
    return n.toLocaleString("fr-FR")
}