import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { LgComboBox } from "../ui/LgComboBox";
import { Languages } from "../../data/languages";
import { LgContext } from "../../context/LgContext";
import { useContext } from "react";

const navigation = [
  { name: "Champions", href: "champs", current: true },
  { name: "Items", href: "items", current: false },
  { name: "Damage Calculator", href: "dmgCalculator", current: false },
  { name: "Donations", href: "", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const NavBar = () => {

  const { pgLanguage, setPgLanguage } = useContext(LgContext);

  const onMyEvent = ({id}) => {
    setPgLanguage(id);
  }

  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="mx-2 max-w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* Logo & Menu*/}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {/* Logo*/}
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-12 w-auto"
                    src="./fire.png"
                    alt="Your Company"
                  />
                  <p className="text-white text-xl mx-2 font-bold">PL Project</p>
                </div>
                {/* Navigation Menu */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({
                          isActive,
                        }) => `px-3 py-2 text-lg text-white font-medium rounded-sm
                          hover:bg-gray-600 hover:border-b-4 hover:border-b-app-raspberry
                          ${
                            isActive
                              ? "border-b-4 border-b-app-blue"
                              : "text-gray-300"
                          }`}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 invisible md:visible">
                <LgComboBox onMyChange={event => onMyEvent(event)} comboData={Languages}></LgComboBox>
              </div>
            </div>
          </div>
          {/* Mobile Navigation Menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "border-b-4 border-b-sky-600"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "text-white block rounded-sm px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
