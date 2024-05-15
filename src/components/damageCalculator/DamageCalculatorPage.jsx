import { useSearchParams } from "react-router-dom";
import { DmgCalcCard } from "./DmgCalcCard";
import { useContext, useEffect } from "react";
import { getChamp } from "../../api/DataDragonApi";
import { LgContext } from "../../context/LgContext";
import { useQuery } from "@tanstack/react-query";
import { StatsProvider } from "../../context/StatsContext";

export const DamageCalculatorPage = () => {

  //Param hooks
  const [searchParams] = useSearchParams();
  const ParamChampId = searchParams.get("ChampId");
  const ChampId = (ParamChampId===null) ? "Ekko" : ParamChampId;

  //Context hooks
  const { pgLanguage } = useContext(LgContext);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [ChampId],
    queryFn: async() => {
      console.log("entra");
      const resp = await getChamp(pgLanguage, ChampId);
      return resp.data;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => { refetch() }, [pgLanguage])

  return (
    <StatsProvider>
      <div id="HEADER" className="text-white my-6">
        {isLoading ? (<></>) 
          : (<div className="">
            <h1 className="text-2xl text-center">
              Click {ChampId}'s spells and items to edit them.
            </h1>
            <DmgCalcCard selectedChamp={data[ChampId]}></DmgCalcCard>
          </div>)
        }
      </div>
    </StatsProvider>
  );
};
