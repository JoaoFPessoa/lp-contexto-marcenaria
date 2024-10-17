import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

type Project = {
  title: string;
  description: string;
  mainImageUrl: string;
  imagesUrl: string[];
};

export const listProjects = async () => {
  try {
    // Fetch the project data from the 'projects' table
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;

    // Transform the 'main_image' field to use the public URL
    const transformedProjects = data.map((project: any) => {
      const { data: publicUrlData } = supabase.storage
        .from("bucket-project-images") // Replace with your actual bucket name
        .getPublicUrl(project.main_image);

      // Update the main_image to be the public URL
      return {
        ...project,
        main_image: publicUrlData.publicUrl,
      };
    });

    return transformedProjects;
  } catch (error) {
    console.error("Error fetching projects and images:", error);
    return null;
  }
};

// Add Project
export const addProject = async (project: Project) => {
  const { title, description, mainImageUrl, imagesUrl } = project;

  try {
    // Insert into 'projects' table
    const { data, error } = await supabase
      .from("projects")
      .insert([{ title, description, main_image: mainImageUrl }])
      .select()
      .single();
    console.log("Insert Response:", { data, error });

    if (error) {
      console.error("Error inserting project:", error);
      throw error; // Throw error to be caught in the calling function
    }

    // Ensure data is defined before accessing its properties
    if (!data) {
      throw new Error("No data returned after inserting project.");
    }
    const projectId = data.id;
    console.log("Inserted Project ID:", projectId);

    // Insert the images in 'project_images' table
    const imagesData = imagesUrl.map((image, index) => ({
      project_id: projectId,
      image_url: image,
      sort_order: index + 1,
    }));

    const { data: projectImagesData, error: projectImagesError } =
      await supabase.from("project_images").insert(imagesData);

    if (projectImagesError) throw projectImagesError;
    console.log("Project Images Insert Response:", {
      projectImagesData,
      projectImagesError,
    });

    return data;
  } catch (error) {
    console.error("Error adding project:", error);
    return null;
  }
};

// Delete Project
export const deleteProject = async (projectId: string) => {
  try {
    await supabase.from("project_images").delete().eq("project_id", projectId);
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error deleting project:", error);
    return null;
  }
};

// Update Project
export const updateProject = async (
  projectId: string,
  updates: Partial<Project>
) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .update(updates) // We're updating the project itself, not 'project-images'
      .eq("id", projectId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating project:", error);
    return null;
  }
};
