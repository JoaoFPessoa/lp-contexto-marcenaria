import { useState, useEffect } from "react";
import {
  deleteAcabamento,
  deleteProject,
  fetchAcabamentos,
  supabase,
} from "../../../../supabase";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddAcabamento from "./addAcabamento";
import toast from "react-hot-toast";

type Acabamento = {
  public_url: string;
  sort_order: number;
  id: string;
};

export default function AcabamentosPage() {
  const [acabamentos, setAcabamentos] = useState<Acabamento[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  async function getData() {
    const data = await fetchAcabamentos();
    //@ts-ignore
    setAcabamentos(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (acabamentoId: string) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar esta imagem?"
    );
    if (confirmDelete) {
      await deleteAcabamento(acabamentoId);
      getData(); // Refresh project list
      toast.success("Acabamento deletado com sucesso!");
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedAcabamentos = [...acabamentos];
    const [reorderedProject] = updatedAcabamentos.splice(
      result.source.index,
      1
    );
    updatedAcabamentos.splice(result.destination.index, 0, reorderedProject);

    // Update sort_order for all projects
    const reorderedProjectsWithSortOrder = updatedAcabamentos.map(
      (project, index) => ({
        ...project,
        sort_order: index + 1, // Adjusting sort_order to new order
      })
    );

    setAcabamentos(reorderedProjectsWithSortOrder);
    setHasChanges(true); // Set that there are unsaved changes
  };

  // Save order changes to Supabase
  const saveChanges = async () => {
    try {
      for (const acabamento of acabamentos) {
        const { error } = await supabase
          .from("acabamentos")
          .update({ sort_order: acabamento.sort_order })
          .eq("id", acabamento.id);

        if (error) throw error;
      }
      setHasChanges(false); // Reset changes after save
      alert("Order updated successfully!");
    } catch (error) {
      console.error("Error saving sort order:", error);
    }
  };
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold">Acabamentos</h1>

      <div className="flex gap-2">
        <button
          className="my-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          onClick={() => setAddModalOpen(true)}
        >
          Add Acabamento
        </button>
      </div>
      <span className="italic">
        Arraste e solte as imagens para mudar a ordem. Há um botão específico
        para salvar ordenação!
      </span>
      {/* DragDropContext for reordering */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div
              className="grid   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {acabamentos.map((acabamento, index) => (
                <Draggable
                  key={acabamento.id}
                  draggableId={acabamento.public_url}
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
                        src={acabamento.public_url}
                        alt={acabamento.id}
                        className="w-full h-40 object-cover mb-4 rounded-lg"
                      />
                      <div className="flex justify-between items-center">
                        <button
                          className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700"
                          onClick={() => handleDelete(acabamento.id)}
                        >
                          Deletar
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
          Salvar mudanças
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
            <AddAcabamento
              onClose={() => setAddModalOpen(false)}
              onProjectAdded={getData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
