import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Profil from "./pages/Profil"
import "./App.css"
import Home from "./pages/Home"
import Royalmouth from "./pages/donjons/Royalmouth"
import Mansot from "./pages/donjons/Mansot"
import Ben from "./pages/donjons/Ben"
import Obsidiantre from "./pages/donjons/Obsidiantre"
import Givrefoux from "./pages/donjons/givrefoux"
import Korriandre from "./pages/donjons/Korriandre"
import Kolosso from "./pages/donjons/kolosso"
import Ramdisk from "./pages/Ramdisk"
import RentabiliteRelique from "./pages/RentabiliteRelique"
import Parchemins from "./pages/Parchemin"
import Navbar from "./components/Navbar"
import './styles/colors.css';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/royalmouth" element={<Royalmouth />} />
          <Route path="/mansot" element={<Mansot />} />
          <Route path="/ben" element={<Ben />} />
          <Route path="/obsidiantre" element={<Obsidiantre />} />
          <Route path="/givrefoux" element={<Givrefoux />} />
          <Route path="/korriandre" element={<Korriandre />} />
          <Route path="/kolosso" element={<Kolosso />} />
          <Route path="/ramdisk" element={<Ramdisk />} />
          <Route path="/rentabilite-relique" element={<RentabiliteRelique />} />
          <Route path="/parchemins" element={<Parchemins/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
