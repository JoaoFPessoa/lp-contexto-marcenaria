import { useState } from "react";
import { addProject, supabase } from "../../../../supabase";
import toast from "react-hot-toast";

interface AddProjectProps {
  onClose: () => void;
  onProjectAdded: () => void; // Callback to refresh project list after adding
}

export default function AddProject({
  onClose,
  onProjectAdded,
}: AddProjectProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [mainImage, setMainImage] = useState<File | null>(null); // To upload main image
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // Convert FileList to Array
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loadingToastId = toast.loading(
      "Por favor, aguarde enquanto salvamos..."
    );

    setIsLoading(true); // Disable buttons

    // Upload main image to Supabase
    let mainImageUrl = "";
    if (mainImage) {
      const { data, error } = await supabase.storage
        .from("bucket-project-images")
        .upload(`main-${Date.now()}-${mainImage.name}`, mainImage);
      if (error) {
        console.error("Error uploading main image:", error);
        toast.error(`Failed to add main image: ${error.message}`);
        toast.dismiss(loadingToastId); // Dismiss the loading toast
        setIsLoading(false);
        return;
      }
      mainImageUrl = data.path;
    }

    // Upload additional images to Supabase
    const imageUrls: string[] = [];
    for (let image of images) {
      const { data, error } = await supabase.storage
        .from("bucket-project-images")
        .upload(`${image.name}`, image);
      if (error) {
        console.error("Error uploading additional images:", error);
        toast.dismiss(loadingToastId); // Dismiss the loading toast
        toast.error(`Failed to add project: ${error.message}`); // Show error message
        setIsLoading(false);
        return;
      }
      imageUrls.push(data.path);
    }

    // Add project to Supabase
    const newProject = {
      title,
      description,
      mainImage: mainImageUrl,
      images: imageUrls,
    };

    const result = await addProject({
      title: newProject.title,
      description: newProject.description,
      mainImageUrl: newProject.mainImage,
      imagesUrl: newProject.images,
    });

    if (result) {
      toast.dismiss(loadingToastId); // Dismiss the loading toast
      toast.success("Project added successfully!"); // Show success message
    } else {
      toast.dismiss(loadingToastId); // Dismiss the loading toast on error
      toast.error("Failed to add project. Please try again.");
    }

    setIsLoading(false); // Re-enable buttons
    onProjectAdded(); // Refresh the project list after adding
    onClose(); // Close modal after submission
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Main Image</label>
          <input type="file" onChange={handleMainImageChange} required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Additional Images</label>
          <input type="file" multiple onChange={handleImagesChange} />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700, ${
              isLoading && "bg-gray-500"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add project"}
          </button>
        </div>
      </form>
    </div>
  );
}
