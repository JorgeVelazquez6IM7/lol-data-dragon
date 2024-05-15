import { Navigate, Route, Routes } from "react-router-dom";
import { ChampsPage } from "../components/champions/ChampsPage"
import { ItemsPage } from "../components/items/ItemsPage"
import { DamageCalculatorPage } from "../components/damageCalculator/DamageCalculatorPage"
import { NavBar } from '../components/ui/NavBar'

export const AppRouter = () =>{
    return(
        <>
            <NavBar />

            <Routes>
                <Route path="champs" element={<ChampsPage/>} />
                <Route path="items" element={<ItemsPage/>} />
                <Route path="dmgCalculator" element={<DamageCalculatorPage/>} />

                <Route path="/" element={<Navigate to="/champs" />} />
            </Routes>
        </>
    )
}