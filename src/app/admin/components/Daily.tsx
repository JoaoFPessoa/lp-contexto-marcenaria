import { useState, useEffect } from "react";
import { deleteDaily, fetchDailys, supabase } from "../../../../supabase";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import AddDaily from "./addDaily";

type Daily = {
  public_url: string;
  sort_order: number;
  id: string;
  isVideo: boolean;
};

export default function DailyPage() {
  const [dailys, setDailys] = useState<Daily[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  async function getData() {
    const data = await fetchDailys();

    //@ts-ignore
    setDailys(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (dailyId: string) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar esta imagem?"
    );
    if (confirmDelete) {
      await deleteDaily(dailyId);
      getData(); // Refresh project list
      toast.success("Imagem deletado com sucesso!");
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedDailys = [...dailys];
    const [reorderedProject] = updatedDailys.splice(result.source.index, 1);
    updatedDailys.splice(result.destination.index, 0, reorderedProject);

    // Update sort_order for all projects
    const reorderedDailysWithSortOrder = updatedDailys.map((daily, index) => ({
      ...daily,
      sort_order: index + 1, // Adjusting sort_order to new order
    }));

    setDailys(reorderedDailysWithSortOrder);
    setHasChanges(true); // Set that there are unsaved changes
  };

  // Save order changes to Supabase
  const saveChanges = async () => {
    try {
      for (const daily of dailys) {
        const { error } = await supabase
          .from("dailys")
          .update({ sort_order: daily.sort_order })
          .eq("id", daily.id);

        if (error) throw error;
      }
      setHasChanges(false); // Reset changes after save
      alert("Ordenação atualizada com sucesso!");
    } catch (error) {
      console.error("Erro salvando ordem:", error);
    }
  };
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold">Dia-a-dia</h1>

      <div className="flex gap-2">
        <button
          className="my-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          onClick={() => setAddModalOpen(true)}
        >
          Add Imagem
        </button>
      </div>
      <span className="italic">
        Arraste e solte as imagens para mudar a ordem. Há um botão específico
        para salvar ordenação!
      </span>
      {/* DragDropContext for reordering */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dailys">
          {(provided) => (
            <div
              className="grid   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {dailys?.map((daily, index) => (
                <Draggable
                  key={daily.id}
                  draggableId={daily.public_url}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="bg-white p-4 shadow-md rounded-lg"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {daily.isVideo ? (
                        <video
                          src={daily.public_url}
                          controls
                          className="w-full h-40 object-cover mb-4 rounded-lg"
                        />
                      ) : (
                        <img
                          src={daily.public_url}
                          alt={daily.id}
                          className="w-full h-40 object-cover mb-4 rounded-lg"
                        />
                      )}
                      <div className="flex justify-between items-center">
                        <button
                          className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700"
                          onClick={() => handleDelete(daily.id)}
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
            <AddDaily
              onClose={() => setAddModalOpen(false)}
              onProjectAdded={getData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
