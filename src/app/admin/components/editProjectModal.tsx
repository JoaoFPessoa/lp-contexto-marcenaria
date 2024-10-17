/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { supabase, updateProject } from "../../../../supabase";
import toast from "react-hot-toast";
import { Project } from "../page";

interface EditProjectModalProps {
  project: Project;
  onClose: () => void;
  onProjectUpdated: () => void;
}

export default function EditProjectModal({
  project,
  onClose,
  onProjectUpdated,
}: EditProjectModalProps) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<
    { image_url: string; sort_order: number }[]
  >(project.images);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleDeleteImage = async (imageUrl: string) => {
    try {
      const { error: storageError } = await supabase.storage
        .from("bucket-project-images")
        .remove([imageUrl]);

      if (storageError) {
        console.error(
          "Error deleting image from storage:",
          storageError.message
        );
        return;
      }

      const { error: tableError } = await supabase
        .from("project_images")
        .delete()
        .match({ project_id: project.id, image_url: imageUrl });

      if (tableError) {
        console.error("Error deleting image from table:", tableError.message);
        return;
      }

      toast.success("Imagem deletada com sucesso!");
      setExistingImages(
        existingImages.filter((img) => img.image_url !== imageUrl)
      );
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProject: Partial<Project> = { title, description };

    // Upload main image if a new one is selected
    if (mainImage) {
      const { data, error } = await supabase.storage
        .from("bucket-project-images")
        .upload(`main-${Date.now()}-${mainImage.name}`, mainImage);

      if (!error) {
        updatedProject.main_image = data.path;
      }
    }

    // Update the project (excluding the images)
    await updateProject(project.id, updatedProject);
    toast.success("Editado com sucesso!");
    onProjectUpdated(); // Refresh project list
    onClose(); // Close modal
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(existingImages);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    // Update the state with the reordered images
    setExistingImages(reorderedImages);
  };

  // New function to save the image order
  const handleSaveOrder = async () => {
    try {
      const updates = existingImages.map((image, index) => ({
        image_url: image.image_url,
        project_id: project.id,
        sort_order: index + 1, // Assign new sort order based on index
      }));

      // Update the sort_order in the project_images table
      const { error } = await supabase
        .from("project_images")
        .upsert(updates, { onConflict: "image_url,project_id" }); // Use a comma-separated string for multiple columns

      if (error) {
        console.error("Error saving image order:", error.message);
        toast.error("Erro ao salvar a ordem das imagens.");
      } else {
        toast.success("Ordem das imagens salva com sucesso!");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Erro inesperado ao salvar a ordem.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <button className="text-red-500 float-right" onClick={onClose}>
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Editar projeto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Imagem de Capa</label>
            <input type="file" onChange={handleMainImageChange} />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Imagens</label>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable-images">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="grid grid-cols-3 gap-4"
                  >
                    {existingImages.map((imageObj, index) => (
                      <Draggable
                        key={imageObj.image_url}
                        draggableId={imageObj.image_url}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="relative"
                          >
                            <img
                              id={imageObj.image_url}
                              src={
                                supabase.storage
                                  .from("bucket-project-images")
                                  .getPublicUrl(imageObj.image_url).data
                                  .publicUrl
                              }
                              alt={`Image ${index + 1}`}
                              className="h-[300px] w-[300px]"
                            />
                            <img
                              src="/icons/delete.svg"
                              className="absolute top-2 right-2 p-1 cursor-pointer"
                              onClick={() =>
                                handleDeleteImage(imageObj.image_url)
                              }
                              alt={`Delete Image ${index + 1}`}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <div className="mb-4">
            <input type="file" multiple onChange={handleImagesChange} />
          </div>

          <div className="mb-4">
            <button
              type="button" // Change to button type
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 mb-4 w-full"
              onClick={handleSaveOrder} // Handle the save order action
            >
              Salvar ordem das imagens
            </button>
          </div>

          <div className="mb-4 border-t pt-4">
            {" "}
            {/* Add a border and padding */}
            <h3 className="text-lg font-semibold mb-2">Update Project</h3>{" "}
            {/* Section title */}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full"
            >
              Atualizar dados do projeto (não altera a ordem das imagens)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
