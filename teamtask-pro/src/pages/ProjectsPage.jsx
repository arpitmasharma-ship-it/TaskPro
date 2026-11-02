
import { useEffect, useState } from "react";

import {
    getProjects,
    addProject,
    deleteProject,
    updateProject
} from "../api/projectApi";

import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";
import SearchFilter from "../components/SearchFilter";
import ProjectStats from "../components/ProjectStats";
import ProjectProgress from "../components/ProjectProgress";

const ProjectsPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const [editId, setEditId] = useState(null);
    const [status, setStatus] = useState("active");

    const [searchtext, setSearchtext] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchProjects = async () => {
        try {
            setLoading(true);

            const response = await getProjects();
            setProjects(response.data.projects || []);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleAddProject = async () => {
        try {
            await addProject({
                name: title.trim(),
                description: description.trim(),
                status
            });

            setTitle("");
            setDescription("");
            setStatus("active");

            await fetchProjects();
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    const handeleDelete = async (id) => {
        try {
            await deleteProject(id);
            await fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleEdit = async () => {
        try {
            await updateProject(editId, {
                name: title.trim(),
                description: description.trim(),
                status
            });

            setTitle("");
            setDescription("");
            setStatus("active");
            setEditId(null);

            await fetchProjects();
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const handleSelectEdit = (project) => {
        setEditId(project._id);
        setTitle(project.name || "");
        setDescription(project.description || "");
        setStatus(project.status || "active");
    };

    const filteredProjects = projects.filter((project) => {
        const name = (project.name || "").toLowerCase();
        const search = searchtext.toLowerCase();

        const matchesSearch = name.includes(search);

        const matchesStatus =
            statusFilter === "all" ||
            (project.status || "active") === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
            <h1 className="text-3xl font-bold">
                TeamTask Pro
            </h1>

            <h2 className="text-xl font-semibold">
                Your Projects
            </h2>

            <SearchFilter
                searchtext={searchtext}
                setSearchtext={setSearchtext}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {/* Statics ...  */}
            <ProjectStats projects={projects} />

            {/* Project Progress  */}

            <ProjectProgress projects={projects} />

            <ProjectList
                projects={filteredProjects}
                loading={loading}
                onEdit={handleSelectEdit}
                onDelete={handeleDelete}
            />

            <div className="border rounded-lg p-5">
                <h2 className="text-xl font-semibold mb-4">
                    {editId ? "Edit Project" : "Add New Project"}
                </h2>

                <ProjectForm
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    status={status}
                    setStatus={setStatus}
                    editId={editId}
                    handleAddProject={handleAddProject}
                    handleEdit={handleEdit}
                />

                {editId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditId(null);
                            setTitle("");
                            setDescription("");
                            setStatus("active");
                        }}
                        className="mt-3 border px-4 py-2 rounded"
                    >
                        Cancel Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProjectsPage;
