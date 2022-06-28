import { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { MdDragIndicator } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";

import TvDataContext from "../context/TvDataContext";
import ModalTvItems from "../components/filter-items/ModalTvItems";
import ModalFavoriteTvItems from "../components/filter-items/ModalFavoriteTvItems";

import classes from "./Modal.module.css";

const Modal = ({ tvEventInit }) => {
  const { tvData, setTvData, csrf } = useContext(TvDataContext);

  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...tvData.favorite];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setTvData(prevData => ({...prevData, favorite: updatedList}))
    //setTvData(tvData["favorite"] = updatedList);
  };

  console.log("modal tveventinit", tvEventInit);
  console.log("modal tvData", tvData);
  return (
    <>
      <div className={classes.backdrop}></div>
      <div className={classes.modal}>
        <header className={classes.header}>
          <h2>Kedvencek szerkeztése</h2>
          {/* <button onClick={onConfirm}>X</button> */}
        </header>
        <div className={classes.content}>
          <div className={classes.contentSections}>
            <h3>TV csatornák</h3>
            <div className={classes.channelLists}>
              {tvEventInit.channels.map((channel) => (
                <ModalTvItems
                  key={channel.id}
                  id={channel.id}
                  name={channel.name}
                />
              ))}
            </div>
          </div>
          <div className={classes.contentSections}>
            <h3>Kedvenc TV csatornák</h3>
            <DragDropContext onDragEnd={handleDrop}>
              <Droppable droppableId="list-container">
                {(provided) => (
                  <div
                    className={`${classes.channelLists} list-container`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tvData.favorite.map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided) => (
                          <div
                            className={`${classes.modalFavoriteTvItemWrapper} item-container`}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            <div className={classes.wrapper}>
                              <MdDragIndicator className={classes.drag} />
                              <AiFillHeart className={classes.like} />
                              <span className={classes.tvItemName}>{item}</span>
                            </div>
                            <div className={classes.wrapper}>
                              <MdKeyboardArrowUp
                                className={`${classes.up} ${classes.arrows}`}
                              />
                              <MdKeyboardArrowDown
                                className={`${classes.down} ${classes.arrows}`}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
