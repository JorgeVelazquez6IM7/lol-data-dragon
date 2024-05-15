import { Fragment, useContext, useEffect, useState } from "react";
import ChampList from "./ChampList";
import { getChampions } from "../../api/DataDragonApi";
import { LgContext } from "../../context/LgContext";
import { SearchBar } from "../ui/SearchBar";
import { ComboBox } from "../ui/ComboBox";
import { roles } from "../../data/roles";
import { tags } from "../../data/tags";

export const ChampsPage = () => {

  const { pgLanguage } = useContext(LgContext);
  
  const [champList, setChampList] = useState({});

    useEffect(() => {
      getChampions(pgLanguage).then(({data}) => {
        setChampList(data);
      });
    }, [pgLanguage])

  return (
    <>
      <div id="Hero" className="mt-6 text-center space-y-3">
        <h1 className="text-4xl font-bold">Champions</h1>
        <p>See general information about League of Legends champions.</p>
        <div className="grid grid-cols-5 gap-2 w-[50%] mx-auto">
          <div className="col-span-3"><SearchBar></SearchBar></div>
          <ComboBox data={roles}></ComboBox>
          <ComboBox data={tags}></ComboBox>
        </div>
      </div>
      <ChampList champList={champList}></ChampList>
    </>
  );
};