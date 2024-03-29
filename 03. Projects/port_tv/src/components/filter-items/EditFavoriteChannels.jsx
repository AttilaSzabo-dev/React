import { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { MdDragIndicator } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";

import TvDataContext from "../../context/TvDataContext";
import ModalTvItems from "./ModalTvItems";
import classes from "./EditFavoriteChannels.module.css";
import ModalContext from "../../context/ModalContext";

const EditFavoriteChannels = ({ initData }) => {
  const { tvData, setTvData, csrf } = useContext(TvDataContext);
  const ctx = useContext(ModalContext);

  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = tvData.favorite;
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setTvData((prevData) => ({
      ...prevData,
      favorite: updatedList,
    }));
    sendData(true);
  };

  const onManualMove = (index, bool) => {
    let orig = tvData.favorite;
    if (bool) {
      [orig[index], orig[index - 1]] = [orig[index - 1], orig[index]];
    } else [orig[index], orig[index + 1]] = [orig[index + 1], orig[index]];
    setTvData((prevData) => ({
      ...prevData,
      favorite: orig,
    }));
    sendData(true);
  };

  const sendData = (bool, item) => {
    let newFavorite = "i_channels=";
    if (bool) {
      tvData["favorite"].map((favId) => (newFavorite += favId + "%2C"));
    } else {
      const filteredFavorite = tvData["favorite"].filter(
        (removeId) => removeId !== item
      );
      let toSet = [];
      filteredFavorite.map((favId) => (newFavorite += favId + "%2C"));
      filteredFavorite.map((favId) => toSet.push(favId));
      setTvData((prevData) => ({
        ...prevData,
        favorite: toSet,
      }));
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open(
      "POST",
      "/felhasznalo/portam/set-user-favorite-tv-channels",
      true
    );
    xhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    xhttp.setRequestHeader("X-CSRF-Token", csrf);
    xhttp.send(newFavorite);
  };

  return (
    <>
      <header className={classes.header}>
        <h2>Kedvencek szerkesztése</h2>
        <button className={classes.modalConfirm} onClick={(e) => ctx.setModal(false)}>
          X
        </button>
      </header>
      <div className={classes.content}>
        <div className={classes.contentSections}>
          <h3>TV csatornák</h3>
          <div className={classes.channelLists}>
            {initData.channels.map((channel) => (
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
                            <AiFillHeart
                              onClick={() => sendData(false, item)}
                              className={classes.like}
                            />
                            <span className={classes.tvItemName}>
                              {initData.channels.find((x) => x.id === item).name}
                            </span>
                          </div>
                          <div className={classes.wrapper}>
                            <MdKeyboardArrowUp
                              onClick={() => onManualMove(index, true)}
                              className={`${classes.up} ${classes.arrows} ${
                                index === 0 ? classes.disabled : ""
                              }`}
                            />
                            <MdKeyboardArrowDown
                              onClick={() => onManualMove(index, false)}
                              className={`${classes.down} ${classes.arrows} ${
                                index === tvData.favorite.length - 1
                                  ? classes.disabled
                                  : ""
                              }`}
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
    </>
  );
};

export default EditFavoriteChannels;
