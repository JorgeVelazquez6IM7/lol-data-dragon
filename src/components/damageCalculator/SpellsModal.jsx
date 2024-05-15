import { Fragment, useContext, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { StatsContext } from '../../context/StatsContext';

export default function SpellsModal({open, setOpen, spells}) {

  //Ref Hooks
  const cancelButtonRef = useRef(null);

  //Context hooks
  const { champStats, setChampStats } = useContext(StatsContext);

  //State hooks
  const [levels, setLevels] = useState(champStats.levels);

  //funcions
  function levelUp(i, isIncrementing){
    const newLevels = levels.map((c, index) => {
      if (i === index) {
        // Increment or decrement the clicked counter
        return isIncrementing ? c+1 : c-1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setLevels(newLevels);
  }

  function saveLevels(){
    const newChampLevel = levels.reduce((previous, current) => previous + current,0);
    console.log("new level: " + newChampLevel);
    setChampStats({
      ...champStats,
      "champLevel": (newChampLevel === 0) ? 1 : newChampLevel,
      "levels": levels
    });
    setOpen(false);
  }

  function cancelOp(){
    setOpen(false);
    setLevels(champStats.levels);
  }

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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-2xl lg:max-w-6xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div className="md:grid md:grid-cols-2">
                        {spells.map((spell, i) => {
                          return(
                            <div className='mt-2' key={i}>
                              {spell.name}
                              <div className='flex flex-wrap justify-items-center gap-2'>
                                <div className=''><img className='' src={`spell/${spell.image.full}`}/></div>
                                <div className="relative flex items-center max-w-[8rem]">
                                    <button type="button" onClick={()=>levelUp(i,false)} disabled={levels[i] === 0}
                                      className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-4 h-12">
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                        </svg>
                                    </button>
                                    <input type="text" id={`level-input-${i}`} value={levels[i]} 
                                      className="bg-gray-50 border-x-0 border-gray-300 h-12 text-center text-gray-900 text-md block w-12 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled/>
                                    <button type="button" onClick={()=>levelUp(i,true)} disabled={spell.maxrank === levels[i]}
                                      className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-4 h-12">
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className=''><p className='text-sm'>{spell.description}</p></div>
                              </div>
                            </div>
                          )
                        })}
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-app-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 sm:ml-3 sm:w-auto"
                    onClick={() => saveLevels()}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-app-raspberry px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-opacity-80 sm:mt-0 sm:w-auto"
                    onClick={() => cancelOp()}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}