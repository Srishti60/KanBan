"use client";

import React, { useState, useEffect } from "react";
import "../app/globals.css";
import { cardsData } from "../Data";
import { DragDropContext,Droppable,Draggable,DropResult } from "react-beautiful-dnd-next";

interface Data {
  id: number;
  name: string;
}

const Drag = () => {

  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    setData(cardsData);
  }, []);

  const onDragEnd = (e: DropResult) => {
    const { source, destination } = e;
    if (!destination) return;
    if (source.index === destination.index && source.droppableId === destination.droppableId) return;
    const newData = [...data];
    const [movedItem] = newData.splice(source.index, 1); 
    newData.splice(destination.index, 0, movedItem); 
     setData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col gap-y-10 p-10 ">
        <h1 className="text-center font-bold text-black text-2xl">
          Drag and Drop Application
        </h1>
        <Droppable droppableId="droppable"  type="group">
          {
            (provided)=>(
              <div className="flex justify-center" {...provided.droppableProps}
              ref={provided.innerRef}>
              <div className="bg-gray-300 border rounded border-neutral-400 bg-slate-50 h-64 w-80 p-5 flex flex-col gap-y-5" >
                {
                data.length &&  data.map((item,index)=> (
                    <Draggable key={item.id} draggableId={`draggable${item.id}`} index={index}>
                      {
                        (provided)=>(
                          <div className="h-10 w-full bg-zinc-300 p-2 border rounded border-neutral-400" {...provided.dragHandleProps}
                          {...provided.draggableProps}
                       ref   =     {provided.innerRef} >
                          <p>{item.name}</p>
                        </div>
                        )
                      }
                   
                  </Draggable>
              
                  ))
                }
              </div>
              {provided.placeholder}
            </div>
            )
          }
        </Droppable>
      </div>
    </DragDropContext>
  );
};


export default Drag;
