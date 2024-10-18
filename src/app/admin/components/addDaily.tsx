import { useState } from "react";
import { addAcabamento, addDaily, supabase } from "../../../../supabase";
import toast from "react-hot-toast";

interface AddDailyProps {
  onClose: () => void;
  onProjectAdded: () => void; // Callback to refresh project list after adding
}

export default function AddDaily({ onClose, onProjectAdded }: AddDailyProps) {
  const [mainImages, setMainImages] = useState<File[]>([]); // To upload multiple images
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to an array and set it in state
      setMainImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loadingToastId = toast.loading(
      "Por favor, aguarde enquanto salvamos..."
    );

    setIsLoading(true); // Disable buttons

    // Track successful uploads
    const imageUrls: string[] = [];

    // Upload all selected images to Supabase
    for (const mainImage of mainImages) {
      const { data, error } = await supabase.storage
        .from("bucket-project-images")
        .upload(`daily-${mainImage.name}`, mainImage);

      if (error) {
        console.error("Error uploading main image:", error);
        toast.error(`Failed to add main image: ${error.message}`);
        continue; // Skip to the next image
      }

      // Store the path of the uploaded image
      imageUrls.push(data.path);
    }

    // Add each image as a new acabamento entry
    for (const imageUrl of imageUrls) {
      const result = await addDaily({
        image_url: imageUrl,
      });

      if (result && result.status !== 200) {
        toast.error("Erro ao adicionar acabamento");
      }
    }

    toast.dismiss(loadingToastId); // Dismiss the loading toast
    toast.success("Salvo com sucesso!"); // Show success message
    setIsLoading(false); // Re-enable buttons
    onProjectAdded(); // Refresh the project list after adding
    onClose(); // Close modal after submission
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add nova imagem</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Imagens</label>
          <input
            type="file"
            multiple // Allow multiple file uploads
            onChange={handleMainImageChange}
            required
          />
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
            className={`bg-blue-950 text-white py-2 px-4 rounded-lg hover:bg-blue-700 ${
              isLoading ? "bg-gray-500" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading
              ? "Adicionando..."
              : mainImages.length > 1
              ? "Add imagens"
              : "Add imagem"}
          </button>
        </div>
      </form>
    </div>
  );
}
