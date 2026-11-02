import React from 'react'

const ProjectProgress = ({ projects }) => {

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


    const percentage = count.total === 0
        ? 0
        : Math.round((count.completed / count.total) * 100);
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <h1 className='text-2xl font-semibold  '  > Total Progress </h1>
            <h1 className="text-4xl font-extrabold text-white">
                {percentage}%
            </h1>
        </div>
    )
}

export default ProjectProgress