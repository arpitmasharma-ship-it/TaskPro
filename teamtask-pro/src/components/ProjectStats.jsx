
import React from "react";

const ProjectStats = ({ projects }) => {
    const count = projects.reduce((count, project) => {
        count.total++;

        if (project.status === "active") {
            count.active++;
        }

        if (project.status === "completed") {
            count.completed++;
        }

        return count;
    }, { total: 0, completed: 0, active: 0 });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-6">

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200">
                <h3 className="text-gray-500 text-sm font-semibold">
                    Total Projects
                </h3>
                <p className="text-blue-600 text-4xl font-bold mt-3">
                    {count.total}
                </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200">
                <h3 className="text-gray-500 text-sm font-semibold">
                    Active Projects
                </h3>
                <p className="text-amber-600 text-4xl font-bold mt-3">
                    {count.active}
                </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200">
                <h3 className="text-gray-500 text-sm font-semibold">
                    Completed Projects
                </h3>
                <p className="text-green-600 text-4xl font-bold mt-3">
                    {count.completed}
                </p>
            </div>

        </div>
    );
};

export default ProjectStats;
