
const ProjectForm = ({
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    editId,
    handleAddProject,
    handleEdit
}) => {
    return (
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">

            <h2 className="mb-6 text-2xl font-bold text-gray-800">
                {editId ? "Update Your Project" : "Create New Project"}
            </h2>

            <div className="flex flex-col gap-5">

                {/* Project Name */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Project Name
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter project name"
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                {/* Project Description */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Project Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your project..."
                        rows={4}
                        className="w-full resize-y rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                {/* Project Status */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Project Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    >
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="button"
                    onClick={editId ? handleEdit : handleAddProject}
                    className={`mt-2 w-full rounded-lg px-5 py-3 font-semibold text-white shadow-md transition duration-200 active:scale-[0.98] ${
                        editId
                            ? "bg-amber-500 hover:bg-amber-600"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {editId ? "Update Project" : "Add Project"}
                </button>

            </div>
        </div>
    );
};

export default ProjectForm;
