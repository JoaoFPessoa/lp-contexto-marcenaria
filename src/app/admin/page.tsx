/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import AddProject from "./components/addProject";
import { deleteProject, supabase } from "../../../supabase";
import EditProjectModal from "./components/editProjectModal";
import { Toaster } from "react-hot-toast";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

type ProjectImage = {
  image_url: string;
  sort_order: number; // Add sort_order for images
};

export type Project = {
  id: string;
  title: string;
  description: string;
  main_image: string;
  images: ProjectImage[];
  sort_order: number;
};

export default function AdminPainel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hasChanges, setHasChanges] = useState(false); // Track if there are unsaved changes

  const fetchProjects = async () => {
    try {
      const { data: projects, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });
      console.log("data: ", projects);
      if (projectError) throw projectError;

      const projectsWithImages = await Promise.all(
        projects.map(async (project: Project) => {
          const mainImageUrl = supabase.storage
            .from("bucket-project-images")
            .getPublicUrl(project.main_image).data.publicUrl;

          const { data: projectImages, error: imagesError } = await supabase
            .from("project_images")
            .select("image_url, sort_order") // Include sort_order
            .eq("project_id", project.id)
            .order("sort_order", { ascending: true }); // Order by sort_order

          if (imagesError) throw imagesError;

          // Create an array of ProjectImage objects
          const additionalImages = projectImages.map(
            (image: { image_url: string; sort_order: number }) => ({
              image_url: image.image_url,
              sort_order: image.sort_order,
            })
          );

          return {
            ...project,
            main_image: mainImageUrl,
            images: additionalImages,
          };
        })
      );

      setProjects(projectsWithImages);
    } catch (error) {
      console.error("Error fetching projects and images:", error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (projectId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmDelete) {
      await deleteProject(projectId);
      fetchProjects(); // Refresh project list
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project); // Set selected project for editing
    setEditModalOpen(true); // Open edit modal
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedProjects = [...projects];
    const [reorderedProject] = updatedProjects.splice(result.source.index, 1);
    updatedProjects.splice(result.destination.index, 0, reorderedProject);

    // Update sort_order for all projects
    const reorderedProjectsWithSortOrder = updatedProjects.map(
      (project, index) => ({
        ...project,
        sort_order: index + 1, // Adjusting sort_order to new order
      })
    );

    setProjects(reorderedProjectsWithSortOrder);
    setHasChanges(true); // Set that there are unsaved changes
  };

  // Save order changes to Supabase
  const saveChanges = async () => {
    try {
      for (const project of projects) {
        const { error } = await supabase
          .from("projects")
          .update({ sort_order: project.sort_order })
          .eq("id", project.id);

        if (error) throw error;
      }
      setHasChanges(false); // Reset changes after save
      alert("Order updated successfully!");
    } catch (error) {
      console.error("Error saving sort order:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          onClick={() => setAddModalOpen(true)}
        >
          Add Project
        </button>
      </div>

      {/* DragDropContext for reordering */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div
              className="grid   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {projects.map((project, index) => (
                <Draggable
                  key={project.id}
                  draggableId={project.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="bg-white p-4 shadow-md rounded-lg"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img
                        src={project.main_image}
                        alt={project.title}
                        className="w-full h-40 object-cover mb-4 rounded-lg"
                      />
                      <h2 className="text-xl font-semibold mb-2">
                        {project.title}
                      </h2>
                      <div className="flex justify-between items-center">
                        <button
                          className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700"
                          onClick={() => handleDelete(project.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
                          onClick={() => handleEdit(project)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {hasChanges && (
        <button
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button
              className="text-red-500 float-right"
              onClick={() => setAddModalOpen(false)}
            >
              X
            </button>
            <AddProject
              onClose={() => setAddModalOpen(false)}
              onProjectAdded={fetchProjects}
            />
          </div>
        </div>
      )}

      {isEditModalOpen && selectedProject && (
        <EditProjectModal
          project={selectedProject}
          onClose={() => setEditModalOpen(false)}
          onProjectUpdated={fetchProjects}
        />
      )}
    </div>
  );
}
