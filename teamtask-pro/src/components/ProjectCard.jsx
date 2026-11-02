import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, onEdit, onDelete }) => {
    const navigate = useNavigate()
    return (
        <div className="group flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">

            {/* Project Name */}
            <div className="flex items-start justify-between gap-3">
                <h3 className="break-words text-xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                    {project.name}
                </h3>

                <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${project.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                        }`}
                >
                    {project.status || "active"}
                </span>
            </div>

            {/* Project Description */}
            <p className="min-h-12 break-words text-sm leading-6 text-gray-600">
                {project.description || "No description available."}
            </p>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Status Details */}
            <p className="text-sm text-gray-500">
                Status:{" "}
                <span
                    className={
                        project.status === "completed"
                            ? "font-semibold capitalize text-green-600"
                            : "font-semibold capitalize text-blue-600"
                    }
                >
                    {project.status || "active"}
                </span>
            </p>

            {/* Action Buttons */}
            <div className="mt-1 flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={() => onEdit(project)}
                    className="flex-1 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-amber-600 active:scale-95"
                >
                    Edit Project
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(project._id)}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 active:scale-95"
                >
                    Delete
                </button>

                <button
                onClick={()=>navigate(`/projects/${project._id}`)}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 active:scale-95"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
