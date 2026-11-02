import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectById } from '../api/projectApi'
import { createTask, deleteTask, getTasksByProject, updateTask } from '../api/taskApi'


const ProjectDetailsPage = () => {
    const [project, setProject] = useState(null)
    const { id } = useParams()

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("todo");
    const [editid, setEditid] = useState(null)
    const [searchtext, setSearchtext] = useState("")
    const [searchfilter, setSearchfilter] = useState(null)


    // Task States ...
    const taskStates = tasks.reduce((count, task) => {
        count.total++;

        if (task.status === "todo") {
            count.todoTask++;
        }

        if (task.status === "in-progress") {
            count.inProgress++;
        }

        if (task.status === "completed") {
            count.completedTask++;
        }
        return count   // ye bhul jata hu ma ... 

    }, { total: 0, inProgress: 0, todoTask: 0, completedTask: 0 })

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasksByProject(id)
                console.log("Project ID:", id);
                console.log("API Response:", response.data);
                setTasks(response.data.tasks || []);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTasks();
    }, [id])



    useEffect(() => {
        const getprojectdetail = async () => {
            const response = await getProjectById(id)
            setProject(response.data.idproject)
            // yeha idproject ka mtlb hai ki es id wala project ... 

        }

        getprojectdetail()
    }, [id])

    if (loading) return <p>Loading tasks...</p>;



    // create the Task Api 


    const taskCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await createTask({
                title,
                description,
                status,
                project: id
            })
            console.log(response.data);

            setTitle("");
            setDescription("");
            setStatus("todo");

            // updated Task 
            // esse ye hoga ki bina refresh kra new added task show ho jayegnge 
            const updatedTasks = await getTasksByProject(id);
            setTasks(updatedTasks.data.tasks || []);


        } catch (error) {
            console.log(error);
        }
    }

    // HandleSelcectTask
    const handleselectedit = async (task) => {
        setEditid(task._id)
        setTitle(task.title)
        setDescription(task.description)
        setStatus(task.status)
    }

    /// handle Edit 

    const editUpdateHandler = async () => {
        try {
            const response = await updateTask(editid, {
                title,
                description,
                status
            })

            const updatedTasks = await getTasksByProject(id);
            setTasks(updatedTasks.data.tasks || []);

            setTitle("")
            setDescription("")
            setStatus("todo");
            setEditid(null)

        } catch (error) {
            console.log(error);
        }


    }



    // delete the task  .. 

    const deletetaskHandle = async (deleteid) => {
        try {
            await deleteTask(deleteid)
            const updatedTasks = await getTasksByProject(id);
            setTasks(updatedTasks.data.tasks || []);
        } catch (error) {
            console.log(error);
        }
    }


    // search And Filter Handler

    const filteredTasks = tasks.filter((task) => {
        const matchSearch = task.title.toLowerCase().includes(searchtext.toLowerCase())

        const matchFilter = !searchfilter || task.status === searchfilter

        return matchSearch && matchFilter
    })

    return (
        <div>

            {/* Project Show Hoga ....  */}
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition duration-300 hover:shadow-xl">
                {project && (
                    <>
                        <h1 className="mb-4 break-words text-3xl font-bold text-gray-800">
                            {project.name}
                        </h1>

                        <p className="mb-6 text-base leading-7 text-gray-600">
                            {project.description}
                        </p>

                        <div className="border-t border-gray-200 pt-5 flex flex-col gap-2">
                            <span className="text-sm font-semibold text-gray-500">
                                Project Status
                            </span>

                            <p className={`mt-2 inline-block rounded-full px-4 py-2 text-sm font-semibold capitalize ${project.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                                }`}>
                                {project.status || "active"}
                            </p>
                        </div>
                    </>
                )}
            </div>



            {/* Search And Filter .... */}
            {/* Search and Filter */}

            <div className="max-w-5xl mx-auto px-4 my-8">
                <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">

                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Search & Filter Tasks
                    </h2>

                    <div className="flex flex-col md:flex-row gap-4">

                        {/* Search Input */}
                        <div className="flex-1">
                            <input
                                type="text"
                                value={searchtext}
                                onChange={(e) => setSearchtext(e.target.value)}
                                placeholder="Search task by title..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300
                    outline-none transition duration-200
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    hover:border-gray-400"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="w-full md:w-64">
                            <select
                                value={searchfilter || ""}
                                onChange={(e) => setSearchfilter(e.target.value || null)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300
                    bg-white text-gray-700 outline-none cursor-pointer
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">All Status</option>
                                <option value="todo">Todo</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        {/* Clear Button */}
                        <button
                            onClick={() => {
                                setSearchtext("");
                                setSearchfilter(null);
                            }}
                            className="px-6 py-3 rounded-xl bg-gray-800 text-white
                font-semibold hover:bg-gray-700 transition duration-200"
                        >
                            Clear
                        </button>

                    </div>
                </div>
            </div>




            {/* Create the Task Logic ...  */}

            <form
                onSubmit={taskCreate}
                className="w-full max-w-2xl mx-auto my-10 px-4"
            >
                <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8">

                    {/* Heading */}
                    <div className="mb-7">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Create New Task
                        </h1>

                        <p className="text-sm text-gray-500 mt-2">
                            Add details to create a new project task.
                        </p>
                    </div>

                    {/* Title */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Task Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your task title..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                        outline-none transition duration-200
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                       hover:border-gray-400"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your task..."
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                      outline-none resize-y transition duration-200
                                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                      hover:border-gray-400"
                        />
                    </div>

                    {/* Status */}
                    <div className="mb-7">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Task Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                     bg-white outline-none cursor-pointer
                                     focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="todo">Todo</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className='flex flex-col gap-2'  >
                        {
                            /* my mistake mena yeha ye kr diya onClick={editUpdateHandler()}
                            yeha call nhi krta ...  */
                            editid ? <button onClick={editUpdateHandler}
                                type="button"

                                className="w-full bg-blue-600 hover:bg-blue-700
                                             text-white font-semibold py-3 rounded-xl
                                             shadow-md hover:shadow-lg
                                             transition duration-200 active:scale-[0.98]"
                            >
                                Update Task
                            </button>
                                :
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700
                                          text-white font-semibold py-3 rounded-xl
                                            shadow-md hover:shadow-lg
                                           transition duration-200 active:scale-[0.98]"
                                >
                                    + Create Task
                                </button>
                        }
                    </div>

                </div>
            </form>


            {/* Statectics is Here ....................  */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 mx-auto max-w-5xl px-4">

                <div className="bg-blue-100 p-5 rounded-xl">
                    <h2>Total Tasks</h2>
                    <h1 className="text-3xl font-bold">{taskStates.total}</h1>
                </div>

                <div className="bg-yellow-100 p-5 rounded-xl">
                    <h2>In Progress</h2>
                    <h1 className="text-3xl font-bold">{taskStates.inProgress}</h1>
                </div>

                <div className="bg-gray-100 p-5 rounded-xl">
                    <h2>Todo Tasks</h2>
                    <h1 className="text-3xl font-bold">{taskStates.todoTask}</h1>
                </div>

                <div className="bg-green-100 p-5 rounded-xl">
                    <h2>Completed</h2>
                    <h1 className="text-3xl font-bold">{taskStates.completedTask}</h1>
                </div>

                <div className="bg-green-100 p-5 rounded-xl">
                    <h2>Completion</h2>
                    {taskStates.total === 0
                        ? 0
                        : Math.round((taskStates.completedTask / taskStates.total) * 100)
                    }%
                </div>

            </div>

            {/* us Specific Project ke Task show honge .... */}
            <div className="max-w-5xl mx-auto p-6 flex flex-col gap-5">
                <h1 className="text-2xl font-bold mb-4">Project Tasks</h1>

                {filteredTasks.length === 0 ? (
                    <p>No tasks found for this project.</p>
                ) : (
                    filteredTasks.map((task) => (
                        <div
                            key={task._id}
                            className="group flex  flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                        >
                            {/* Task Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                                        {task.title}
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        {task.description}
                                    </p>
                                </div>

                                <span
                                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize
                                        ${task.status === "completed"
                                            ? "bg-green-100 text-green-700"
                                            : task.status === "in-progress"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-blue-100 text-blue-700"
                                        }`}
                                >
                                    {task.status}
                                </span>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100"></div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    onClick={() => handleselectedit(task)}
                                    className="rounded-lg border cursor-pointer border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                                >
                                    Edit Task
                                </button>

                                <button
                                    onClick={() => deletetaskHandle(task._id)}
                                    className="rounded-lg border cursor-pointer border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                                >
                                    Delete Task
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}

export default ProjectDetailsPage