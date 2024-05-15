import { useState } from "react";
import ChampModal from "./ChampModal";

export default function ChampList({ champList }) {

  {/*Modal state*/}
  const [open, setOpen] = useState(false);

  {/*Clicked Champ Name*/}
  const [champ, setChamp] = useState("");

  const openModal = (name) =>{
    setChamp(name);
    setOpen(true);
  }

  return (
    <div>
      <div className="mx-20 max-w-full py-8 sm:px-6 sm:py-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-6">
          {Object.keys(champList).map((champName, i) => {
            return(
            <button onClick={() => openModal(champName)} key={champName} className="group rounded-b-xl bg-black">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-12 xl:aspect-w-7">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`}
                  className="object-cover object-top h-full w-full hover:opacity-25"
                />
              </div>
              <h3 className="my-2 text-center text-lg text-bold text-white">
                {champName}
              </h3>
              <p className="my-2 text-center text-md font-medium text-gray-500">
                {champList[champName].title}
              </p>
            </button>
          )})}
        </div>
        <ChampModal open={open} setOpen={setOpen} champ={champ}></ChampModal>
      </div>
    </div>
  );
}