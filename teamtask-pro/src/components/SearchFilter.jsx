
const SearchFilter = ({
    searchtext,
    setSearchtext,
    statusFilter,
    setStatusFilter
}) => {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">

            {/* Search Input */}
            <div className="relative flex-1">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-4.34-4.34m0 0A7 7 0 1 0 6.76 6.76a7 7 0 0 0 9.9 9.9Z"
                        />
                    </svg>
                </span>

                <input
                    type="text"
                    value={searchtext}
                    onChange={(e) => setSearchtext(e.target.value)}
                    placeholder="Search project by name..."
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
            </div>

            {/* Status Filter */}
            <div className="sm:w-52">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full cursor-pointer rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                    <option value="all">All Projects</option>
                    <option value="active">Active Projects</option>
                    <option value="completed">Completed Projects</option>
                </select>
            </div>

        </div>
    );
};

export default SearchFilter;
