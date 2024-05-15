import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getChamp } from "../../api/DataDragonApi";
import { LgContext } from "../../context/LgContext";
import Carousel from "../ui/Carousel";
import { useNavigate } from "react-router-dom";

const skinArray = (skinArray, champ) => {
  const url = "https://ddragon.leagueoflegends.com/cdn/img/champion/centered/";
  const arr = [];
  skinArray.map((s, i) => {
    const skinUrl = `${url}${champ}_${s.num}.jpg`;
    arr.push(skinUrl);
  });
  return arr;
};

export default function ChampModal({ open, setOpen, champ }) {

  //useRef hooks
  const cancelButtonRef = useRef(null);
  const isMountingRef = useRef(true);

  //Context hooks
  const { pgLanguage } = useContext(LgContext);

  //Navigate hooks
  const navigate = useNavigate();

  //state hooks
  const [champSkins, setChampSkins] = useState([]);
  const [ selectedChamp, setSelectedChamp ] = useState({});

  //useEffect that only executes an API call when updating modal
  useEffect(() => {
    if (!isMountingRef.current) {
      /*API call*/
      getChamp(pgLanguage, champ).then(({ data }) => {
        setSelectedChamp(data[champ]);
        setChampSkins(skinArray(data[champ].skins, data[champ].id));
      });
    } else {
      isMountingRef.current = false;
      /*API call*/
      getChamp(pgLanguage, "Ekko").then(({ data }) => {
        setSelectedChamp(data["Ekko"]);
        setChampSkins(skinArray(data["Ekko"].skins, data["Ekko"].id));
      });
    }
  }, [champ]);

  const dmgCalculatorRedirect = () => navigate(`/dmgCalculator?ChampId=${champ}`);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel
                className={`flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl`}
              >
                <div className="relative flex w-full items-center overflow-hidden bg-white shadow-2xl">
                  
                  <button type="button" onClick={() => setOpen(false)}
                    className="absolute z-50 right-4 top-4 text-white hover:text-app-raspberry sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8">
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 justify-items-center text-center">
                    <Carousel slides={champSkins}></Carousel>
                    <div className="w-full p-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {champ}
                      </h2>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {selectedChamp.title}
                      </h3>
                    </div>
                    <div className="w-full p-2">
                      <p className="text-base font-semibold text-gray-400"> {selectedChamp.lore} </p>
                    </div>
                    <div className="w-full p-2">
                      <button onClick={dmgCalculatorRedirect}>Go to Damage Calculator</button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}