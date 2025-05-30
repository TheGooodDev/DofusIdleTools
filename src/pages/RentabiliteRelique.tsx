import { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import "../styles/RentabiliteRelique.css"

interface Row {
    Etage: number
    "Cout Cumulé": number
}

export default function RentabiliteRelique() {
    const [data, setData] = useState<Row[]>([])
    const [niveau, setNiveau] = useState<number>(() => {
        const profil = JSON.parse(localStorage.getItem("profil") || "{}")
        return profil.Level_Relique ?? 1
    })
    const [etageFinal, setEtageFinal] = useState<number>(() => {
        const profil = JSON.parse(localStorage.getItem("profil") || "{}")
        return profil.Etage_max ?? 1000
    })
    const [vitesse, setVitesse] = useState(7)
    const [tableau, setTableau] = useState<any[]>([])

    // Charger le fichier Excel (converti en JSON, ici en local)
    useEffect(() => {
        fetch("/Classeur1.xlsx")
            .then((res) => res.arrayBuffer())
            .then((buffer) => {
                const wb = XLSX.read(buffer, { type: "buffer" })
                const sheet = wb.Sheets[wb.SheetNames[0]]
                const json: Row[] = XLSX.utils.sheet_to_json(sheet)
                setData(json)
            })
    }, [])
    function calculPoints3h(palier: number, etageFinal: number, vitesse: number): number {
        const temps = tRun(palier, etageFinal, vitesse)
        const pointsParRun = sumOfIntegers(palier, etageFinal)

        if (temps <= 0) return 0

        const nbRuns = Math.floor(180 / temps)
        const tempsUtilisé = nbRuns * temps
        const tempsRestant = 180 - tempsUtilisé

        const etagesSupp = Math.floor(tempsRestant * vitesse)
        const finPartiel = Math.min(palier + etagesSupp - 1, etageFinal)
        const pointsPartiel = sumOfIntegers(palier, finPartiel)

        return nbRuns * pointsParRun + pointsPartiel
    }
    useEffect(() => {
        if (data.length === 0) return
        const ligneActuelle = data.find((row) => row.Etage === niveau)
        if (!ligneActuelle) return

        const costCurrent = ligneActuelle["Cout Cumulé"]
        const points_current_3h = calculPoints3h(niveau, etageFinal, vitesse)
        let bestGain = -Infinity;
        let results: any[] = [];
        for (let i = 1; i <= 1000; i++) {
            const ligneI = data.find((row) => row.Etage === i);
            if (!ligneI) continue;

            const costI = ligneI["Cout Cumulé"];
            const costUpgrade = i <= niveau ? 0 : costI - costCurrent;

            const ptsRun = pointsParRun(i, etageFinal);
            const tempsRun = tRun(i, etageFinal, vitesse);

            let nbRuns = 0;
            let pointsPartiel = 0;

            if (tempsRun > 0) {
                nbRuns = Math.floor(180 / tempsRun);
                const tempsRestant = 180 - nbRuns * tempsRun;
                const etagesSupp = Math.floor(tempsRestant * vitesse);
                const finPartiel = Math.min(i + etagesSupp - 1, etageFinal);
                pointsPartiel = sumOfIntegers(i, finPartiel);
            }

            const totalPoints = nbRuns * ptsRun + pointsPartiel;
            const gainPercent = points_current_3h > 0
                ? ((totalPoints - points_current_3h) / points_current_3h) * 100
                : 0;

            bestGain = Math.max(bestGain, gainPercent);

            results.push({
                Palier: i,
                "Coût Cumulé (abs.)": costI,
                "Coût d'Amélioration": costUpgrade,
                "Points/run": ptsRun,
                "Temps/run (min)": round(tempsRun, 2),
                "Pts/min (run)": round(ptsRun / tempsRun || 0, 2),
                "Runs (3h)": nbRuns,
                "Points partiels": pointsPartiel,
                "Points (3h)": totalPoints,
                "Gain (%)": round(gainPercent, 2),
            });
        }

        // ✅ Tag the best gain row(s)
        results = results.map((row) => ({
            ...row,
            isBestGain: row["Gain (%)"] === round(bestGain, 2),
        }));

        setTableau(results);
    }, [data, niveau, etageFinal, vitesse])

    return (
        <div className="page-relique">
            <h1>Calcul de rentabilité de la relique d'éveil</h1>
            <p>
                Cette application vous permet d'estimer l'amélioration potentielle en changeant de palier de relique sur une session de 3 heures.
            </p>

            <div className="form">
                <label>
                    Niveau actuel de la relique (1-1000)
                    <input type="number" value={niveau} onChange={(e) => setNiveau(Number(e.target.value))} min={1} max={1000} />
                </label>
                <label>
                    Étage final (là où vous mourrez)
                    <input type="number" value={etageFinal} onChange={(e) => setEtageFinal(Number(e.target.value))} min={1} />
                </label>
                <label>
                    Vitesse (etages / minute)
                    <input type="number" value={vitesse} onChange={(e) => setVitesse(Number(e.target.value))} min={1} />
                </label>
            </div>

            <p>Durée totale considérée : <strong>3 heures</strong> (180 minutes).</p>

            <h2>Tableau de rentabilité</h2>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            {tableau.length > 0 && Object.keys(tableau[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableau.map((row, i) => (
                            <tr key={i} className={row.isBestGain ? "best-gain" : ""}>
                                {Object.entries(row).map(([key, val], j) =>
                                    key !== "isBestGain" ? (
                                        <td key={j}>{String(val)}</td>
                                    ) : null
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function sumOfIntegers(a: number, b: number): number {
    if (b < a) return 0
    return ((b - a + 1) * (a + b)) / 2
}

function pointsParRun(a: number, b: number): number {
    return sumOfIntegers(a, b)
}

function tRun(a: number, b: number, vitesse: number): number {
    return b < a ? 0 : (b - a + 1) / vitesse
}

function round(n: number, digits = 2): number {
    return Math.round(n * 10 ** digits) / 10 ** digits
}