//import GalleryHeader from "./GalleryHeader";
import GalleryToolbar from "./GalleryToolbar";
import GalleryPictures from "./GalleryPictures";
import GalleryPagination from "./GalleryPagination";

import "./Gallery.scss";

const Gallery = () => {
  return (
    <div>
      <GalleryToolbar />
      <GalleryPictures />
      <GalleryPagination />
    </div>
  );
};

export default Gallery;
