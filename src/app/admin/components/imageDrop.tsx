/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Project } from "../page";

const ImageDragDrop = ({ project }: { project: Project }) => {
  const [images, setImages] = useState(project.images);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // Create a copy of the images array
    const reorderedImages = Array.from(images);

    // Remove the dragged image
    const [removed] = reorderedImages.splice(result.source.index, 1);

    // Insert the dragged image into the new position
    reorderedImages.splice(result.destination.index, 0, removed);

    // Update sort_order based on the new order
    const updatedImages = reorderedImages.map((img, index) => ({
      ...img,
      sort_order: index + 1,
    }));

    // Set the new state
    setImages(updatedImages);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="images">
        {(provided: any) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ display: "flex" }}
          >
            {images.map((image, index) => (
              <Draggable
                key={image.image_url}
                draggableId={`${image.image_url}-${index}`}
                index={index}
              >
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      padding: "16px",
                      margin: "4px",
                      background: "#f0f0f0",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  >
                    <img
                      src={`https://slgaxqebdbxopfxzurqx.supabase.co/storage/v1/object/public/bucket-project-images/${image.image_url}`}
                      alt={`Image ${image.sort_order}`}
                      style={{ width: "300px", height: "300px" }}
                    />
                    <p>Sort Order: {image.sort_order}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const DropContext = ({ project }: { project: Project }) => {
  return <ImageDragDrop project={project} />;
};

export default DropContext;
