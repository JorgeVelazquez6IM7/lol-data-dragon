import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getChamp } from "../../api/DataDragonApi";
import { LgContext } from "../../context/LgContext";
import Carousel from "../ui/Carousel";

const skinArray = (skinArray, champ) =>{
  const url = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/";
  const arr = [];
  skinArray.map((s,i) =>{
    const skinUrl = `${url}${champ}_${s.num}.jpg`;
    arr .push(skinUrl);
  });
  return arr;
}

export default function ChampModal({ open, setOpen, champ }) {

  const cancelButtonRef = useRef(null);
  const isMountingRef = useRef(false);

  const { pgLanguage } = useContext(LgContext);

  const [ champInfo, setChampInfo ] = useState({});
  const [ champSkins, setChampSkins ] = useState([]);

  {/*This useEffect only executes on mounting in order to prevent the follow useEffect to execute an API call on mount*/}
  useEffect(() => {
    isMountingRef.current = true;
  }, []);

  {/*useEffect that only executes an API call when updating modal*/}
  useEffect(() => {
    if (!isMountingRef.current) {
      {/*API call*/}
      getChamp(pgLanguage, champ).then(({data}) => {
        setChampInfo(data[champ]);
        setChampSkins(skinArray(data[champ].skins, data[champ].id));
      });
    } else {
      isMountingRef.current = false;
    }
  }, [champ, pgLanguage]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className={`flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl`}>
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <Carousel slides={champSkins}></Carousel>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{champ} Gaming</h2>
                      <h3 className="text-xl font-semibold text-gray-900 sm:pr-12">{champInfo.title}</h3>
                      <p className="text-base font-semibold text-gray-900 sm:pr-12">{champInfo.lore}</p>
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
