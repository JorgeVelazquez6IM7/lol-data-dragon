import { createContext, useState } from "react";

export const StatsContext = createContext();

export const StatsProvider = ({children}) => {

    const initialValues = {
        "champLevel": 1,
        "levels": [0,0,0,0],
        "baseAD": 0,
        "bonusAD": 0,
        "totalAD": 0,
        "totalAP": 0,
        "baseArmor": 0,
        "bonusArmor": 0,
        "totalArmor": 0,
        "baseMR": 0,
        "bonusMR": 0,
        "totalMR": 0
      };

    const [champStats, setChampStats] = useState(initialValues);

    return(
        <StatsContext.Provider value={{champStats, setChampStats}}>
            {children}
        </StatsContext.Provider>
    )
}