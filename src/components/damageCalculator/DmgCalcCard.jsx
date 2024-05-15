import { useContext, useEffect, useState } from "react";
import SpellsModal from "./SpellsModal";
import { StatsContext } from "../../context/StatsContext";

const getGrownStats = (base, g, n) => Math.ceil(base + g * (n-1) * (0.7025+0.0175*(n-1)));

export const DmgCalcCard = ({selectedChamp}) => {

  //Context hooks
  const { champStats, setChampStats } = useContext(StatsContext);

  //State hooks
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([3115,227011,223089,3100,0,0]);

  //Effect hooks
  useEffect(() => {
    
    const n = champStats.champLevel;
    const {stats} = selectedChamp;

    //Para AD
    const baseAD = getGrownStats(stats.attackdamage,stats.attackdamageperlevel,n);
    const totalAD = baseAD + champStats.bonusAD;

    const baseArmor = getGrownStats(stats.armor,stats.armorperlevel,n);
    const totalArmor = baseArmor + champStats.bonusArmor;

    const baseMR = getGrownStats(stats.spellblock,stats.spellblockperlevel,n);
    const totalMR = baseMR + champStats.bonusAD;

    setChampStats({
      ...champStats,
      baseAD,
      totalAD,
      baseArmor,
      totalArmor,
      baseMR,
      totalMR
    });
    
  }, [champStats.champLevel]);

  const openSpellsModal = () => {
    setOpen(true);
  }

    return(
        <div id="CARD_CONTAINER"
          className="bg-black text-white shadow-lg shadow-app-blue mx-[10%] md:grid md:grid-cols-4 lg:mx-[20%]
            hover:shadow-xl hover:shadow-app-blue">

          <img className="hidden md:block object-cover h-full w-full"
            src={`tiles/${selectedChamp.id}_0.jpg`}/>

          <div id="CARD" className="md:col-span-3 p-4">

            <div id="CARD_HEADER" className="max-w-fit max-h-fit grid grid-rows-2 grid-flow-col gap-x-4 ">
              <div className="row-span-2">
                <img className="w-12" src={`tag-icons/${selectedChamp.tags[0]}_icon.webp`}/>
              </div>
              <div className="text-xl font-bold">{selectedChamp.id} <span className="text-app-blue">lvl {champStats.champLevel}</span></div>
              <div className="text-sm font-light uppercase">{selectedChamp.title}</div>
            </div>

            <div id="CARD_BODY" className="flex flex-wrap flex-row gap-4 md:justify-around ml-4">
              
              <div className="w-full md:w-2/5 lg:max-w-fit">
                <h2 className="text-lg text-center mb-2">SPELLS</h2>
                <button onClick={openSpellsModal}>
                  <div className="grid grid-cols-3 gap-2 justify-items-center">
                    <div key="passive" className="border border-white">
                      <img className="w-12" src={`spell/passive/${selectedChamp.passive.image.full}`}/>
                    </div>
                    {selectedChamp.spells.map((spell,i) =>{
                      return(<div key={i} className="border border-white">
                        <img className="w-12" src={`spell/${spell.image.full}`}/>
                      </div>
                    )})}
                  </div>
                </button>
              </div>

              <div className="w-full md:w-2/5 lg:max-w-fit">
                <h2 className="text-lg text-center mb-2">ITEMS</h2>
                <button>
                  <div className="grid grid-cols-3 gap-2 justify-items-center">
                    {items.map((item, i) => {
                      return(
                      <div key={i} className="border border-white">
                        <img className="w-12" src={`item/${item}.png`}></img>
                      </div>
                    )})}
                  </div>
                </button>
              </div>

              <div className="w-full">
                <h2 className="text-lg text-center mb-2">STATS</h2>
                <div className="flex flex-wrap justify-around justify-items-center">
                  <div className="w-1/2 md:w-1/3 lg:w-1/5">
                    <h2 className="text-lg mb-2">OFFENSIVE</h2>
                    <div id="STAT_01" className="max-w-fit grid grid-rows-2 grid-flow-col gap-x-4">
                      <div className="row-span-2 self-center">
                        <img className="w-9" src="stat-icons\Ability_power_colored_icon.webp"/>
                      </div>
                      <div className="text-xl font-bold">{champStats.totalAP}</div>
                      <div className="text-sm font-light">0</div>
                    </div>
                    <div id="STAT_02" className="max-w-fit grid grid-rows-2 grid-flow-col gap-x-4">
                      <div className="row-span-2 self-center">
                        <img className="w-9" src="stat-icons\Attack_damage_colored_icon.webp"/>
                      </div>
                      <div className="text-xl font-bold">{champStats.totalAD}</div>
                      <div className="text-sm font-light">{champStats.baseAD} + {champStats.bonusAD}</div>
                    </div>
                  </div>
                  <div className="w-1/2 md:w-1/3 lg:w-1/5">
                    <h2 className="text-lg mb-2">DEFENSIVE</h2>
                    <div id="STAT_03" className="max-w-fit grid grid-rows-2 grid-flow-col gap-x-4">
                      <div className="row-span-2 self-center">
                        <img className="w-9" src="stat-icons\Armor_colored_icon.webp"/>
                      </div>
                      <div className="text-xl font-bold">{champStats.totalArmor}</div>
                      <div className="text-sm font-light">{champStats.baseArmor} + {champStats.bonusArmor}</div>
                    </div>
                    <div id="STAT_04" className="max-w-fit grid grid-rows-2 grid-flow-col gap-x-4">
                      <div className="row-span-2 self-center">
                        <img className="w-9" src="stat-icons\Magic_resistance_colored_icon.webp"/>
                      </div>
                      <div className="text-xl font-bold">{champStats.totalMR}</div>
                      <div className="text-sm font-light">{champStats.baseMR} + {champStats.bonusMR}</div>
                    </div>
                  </div>
                  <div className="w-1/2 md:w-1/3 lg:w-1/5">
                    <h2 className="text-lg mb-2">CRITICAL</h2>
                    <div id="STAT_05" className="max-w-fit grid grid-rows-2 grid-flow-col gap-x-4">
                      <div className="row-span-2 self-center">
                        <img className="w-9" src="stat-icons\Critical_strike_chance_colored_icon.webp"/>
                      </div>
                      <div className="text-xl font-bold">130</div>
                      <div className="text-sm font-light">70+50</div>
                    </div>
                    <div id="STAT_06" className="max-w-fit grid grid-rows-2 grid-flow-col gap-x-4">
                      <div className="row-span-2 self-center">
                        <img className="w-9" src="stat-icons\Critical_strike_damage_icon.webp"/>
                      </div>
                      <div className="text-xl font-bold">130</div>
                      <div className="text-sm font-light">70+50</div>
                    </div>
                  </div>
                  <div className="w-1/2 md:w-1/3 lg:w-1/5">
                    <h2 className="text-lg mb-2">OTHER</h2>
                    <div id="STAT_07" className="max-w-fit grid grid-rows-2 grid-flow-col gap-x-4">
                      <div className="row-span-2 self-center">
                        <img className="w-9" src="stat-icons\Attack_speed_colored_icon.webp"/>
                      </div>
                      <div className="text-xl font-bold">130</div>
                      <div className="text-sm font-light">70+50</div>
                    </div>
                    <div id="STAT_08" className="max-w-fit grid grid-rows-2 grid-flow-col gap-x-4">
                      <div className="row-span-2 self-center">
                        <img className="w-9" src="stat-icons\Ability_haste_colored_icon.webp"/>
                      </div>
                      <div className="text-xl font-bold">130</div>
                      <div className="text-sm font-light">70+50</div>
                    </div>
                  </div>
                  <div className="w-1/2 md:w-1/3 lg:w-1/5">
                    <h2 className="text-lg mb-2">PERFORATION</h2>
                    <div id="STAT_09" className="max-w-fit grid grid-rows-2 grid-flow-col gap-x-4">
                      <div className="row-span-2 self-center">
                        <img className="w-9" src="stat-icons\Armor_penetration_colored_icon.webp"/>
                      </div>
                      <div className="text-xl font-bold">130</div>
                      <div className="text-sm font-light">70+50</div>
                    </div>
                    <div id="STAT_10" className="max-w-fit grid grid-rows-2 grid-flow-col gap-x-4">
                      <div className="row-span-2 self-center">
                        <img className="w-9" src="stat-icons\Magic_penetration_colored_icon.webp"/>
                      </div>
                      <div className="text-xl font-bold">130</div>
                      <div className="text-sm font-light">70+50</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SpellsModal open={open} setOpen={setOpen} spells={selectedChamp.spells}/>
        </div>
    )
}