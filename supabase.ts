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

type Acabamento = {
  image_url: string;
};

type Daily = {
  image_url: string;
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

export const addAcabamento = async (acabamentos: Acabamento | Acabamento[]) => {
  // Ensure acabamentos is an array
  const normalizedAcabamentos = Array.isArray(acabamentos)
    ? acabamentos
    : [acabamentos];

  try {
    // Fetch the highest sort_order value from the acabamentos table
    const { data: maxSortData, error: maxSortError } = await supabase
      .from("acabamentos")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1);

    if (maxSortError) {
      console.error("Error fetching max sort order:", maxSortError);
      throw maxSortError;
    }

    const newSortOrder = maxSortData ? maxSortData[0].sort_order + 1 : 1; // If no rows exist, set sort_order to 1

    // Prepare the data for insertion
    const insertData = normalizedAcabamentos.map((acabamento, index) => ({
      image_url: acabamento.image_url,
      sort_order: newSortOrder + index, // Increment sort_order for each image
    }));

    // Insert into 'acabamentos' table
    const { data, error } = await supabase
      .from("acabamentos")
      .insert(insertData)
      .single();

    if (error) {
      console.error("Error inserting acabamentos:", error);
      throw error; // Throw error to be caught in the calling function
    } else {
      return { status: 200 };
    }
  } catch (error) {
    console.error("Error adding acabamentos:", error);
    return null;
  }
};

export const fetchAcabamentos = async () => {
  try {
    const { data, error } = await supabase
      .from("acabamentos")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.log("Erro ao carregar acabamentos: ", error);
      throw error;
    }

    // Map over the data to create public URLs
    const acabamentosWithPublicUrl = data.map((acabamento) => {
      return {
        ...acabamento,
        public_url: supabase.storage
          .from("bucket-project-images")
          .getPublicUrl(acabamento.image_url).data.publicUrl,
      };
    });

    return acabamentosWithPublicUrl;
  } catch (error) {
    console.error("Erro ao carregar acabamentos: ", error);
    return null;
  }
};

export const deleteAcabamento = async (acabamentoId: string) => {
  try {
    // Fetch the acabamentos to get the image URL
    const { data: acabamentoData, error: fetchError } = await supabase
      .from("acabamentos")
      .select("image_url") // Assuming image_url contains the path
      .eq("id", acabamentoId)
      .single(); // Fetch single item

    if (fetchError) throw fetchError;

    const imagePath = acabamentoData?.image_url; // Get the image path

    // Remove the image from the bucket if the path exists
    if (imagePath) {
      const { error: deleteImageError } = await supabase.storage
        .from("bucket-project-images")
        .remove([imagePath]);

      if (deleteImageError) {
        console.error("Error deleting image from bucket:", deleteImageError);
        throw deleteImageError; // Handle or log the error as needed
      }
    }

    // Now delete the acabamento record
    const { data, error } = await supabase
      .from("acabamentos")
      .delete()
      .eq("id", acabamentoId);
    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error deleting acabamento:", error);
    return null;
  }
};

export const addDaily = async (dailys: Daily | Daily[]) => {
  // Ensure dailys is an array
  const normalizedDailys = Array.isArray(dailys) ? dailys : [dailys];

  try {
    // Fetch the highest sort_order value from the dailys table
    const { data: maxSortData, error: maxSortError } = await supabase
      .from("dailys")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1);

    if (maxSortError) {
      console.error("Error fetching max sort order:", maxSortError);
      throw maxSortError;
    }

    const newSortOrder = maxSortData ? maxSortData[0].sort_order + 1 : 1; // If no rows exist, set sort_order to 1

    // Prepare the data for insertion
    const insertData = normalizedDailys.map((daily, index) => ({
      image_url: daily.image_url,
      sort_order: newSortOrder + index, // Increment sort_order for each image
    }));

    // Insert into 'dailys' table
    const { data, error } = await supabase
      .from("dailys")
      .insert(insertData)
      .single();

    if (error) {
      console.error("Error inserting dailys:", error);
      throw error; // Throw error to be caught in the calling function
    } else {
      return { status: 200 };
    }
  } catch (error) {
    console.error("Error adding dailys:", error);
    return null;
  }
};

export const fetchDailys = async () => {
  try {
    const { data, error } = await supabase
      .from("dailys")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.log("Erro ao carregar dailys: ", error);
      throw error;
    }

    // Map over the data to create public URLs
    const dailysWithPublicUrl = data.map((daily) => {
      const publicUrl = supabase.storage
        .from("bucket-project-images")
        .getPublicUrl(daily.image_url).data.publicUrl;

      return {
        ...daily,
        public_url: publicUrl,
        isVideo:
          daily.image_url.endsWith(".mp4") || daily.image_url.endsWith(".mov"), // Add logic to check for video types
      };
    });

    return dailysWithPublicUrl;
  } catch (error) {
    console.error("Erro ao carregar dia-a-dia: ", error);
    return null;
  }
};

export const deleteDaily = async (dailyId: string) => {
  try {
    // Fetch the dailys to get the image URL
    const { data: dailyData, error: fetchError } = await supabase
      .from("dailys")
      .select("image_url") // Assuming image_url contains the path
      .eq("id", dailyId)
      .single(); // Fetch single item

    if (fetchError) throw fetchError;

    const imagePath = dailyData?.image_url; // Get the image path

    // Remove the image from the bucket if the path exists
    if (imagePath) {
      const { error: deleteImageError } = await supabase.storage
        .from("bucket-project-images")
        .remove([imagePath]);

      if (deleteImageError) {
        console.error("Error deleting image from bucket:", deleteImageError);
        throw deleteImageError; // Handle or log the error as needed
      }
    }

    // Now delete the daily record
    const { data, error } = await supabase
      .from("dailys")
      .delete()
      .eq("id", dailyId);
    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error deleting daily:", error);
    return null;
  }
};
