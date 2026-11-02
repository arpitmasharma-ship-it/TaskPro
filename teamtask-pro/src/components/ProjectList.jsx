
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects, onEdit, onDelete, loading }) => {
    if (loading) {
        return <p>Loading projects...</p>;
    }

    if (projects.length === 0) {
        return <p>No projects found.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
                <ProjectCard
                    key={project._id}
                    project={project}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ProjectList;
