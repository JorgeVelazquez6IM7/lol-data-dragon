import { GlobeAltIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const SearchBar = () => {
  return (
    <form className="w-full mx-auto">
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"></MagnifyingGlassIcon>
            </div>
            <input type="search" id="default-search" 
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Search champions..."/>
        </div>
    </form>
  );
};
