document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("show-more").addEventListener("click", showMorePosts);
  document.getElementById("add-cover").addEventListener("click", showCoverUpload);
  document.getElementById("backdrop").addEventListener("click", hideCoverUpload);
  document.getElementById("close").addEventListener("click", hideCoverUpload);

  // Register the plugin with FilePond
  FilePond.registerPlugin(
    FilePondPluginFileMetadata,
    FilePondPluginImageCrop,
    FilePondPluginImagePreview
  );

  // Get a reference to the file input element
  const inputElement = document.querySelector('input[type="file"]');

  // Create the FilePond instance
  const pond = FilePond.create(inputElement, {
    credits: false,
    labelIdle: "Húzza ide a képet vagy <span class='filepond--label-action'> válassza </span> ki a fájlt",
    allowMultiple: false,
    allowReplace: true,
    maxFiles: 1,
    checkValidity: true,
    imageCropAspectRatio: "16:9",
    server: {
      //url: ....,
      //method: "POST",
      process: './process',
      fetch: null,
      revert: null,
    },
    fileMetadataObject: {
      markup: [
        [
          "rect",
          {
            left: 0,
            right: 0,
            bottom: 0,
            height: "60px",
            backgroundColor: "rgba(0,0,0,.5)",
          },
        ],
      ],
    },
  });

  //pond.addFile("./beach.jpeg");

  //const input = document.querySelector('input[type="file"]');
  //create(input);
  //const inputElement = document.querySelector('input[type="file"]');
  /* const pond = FilePond.create(inputElement, {
    credits: false,
    labelIdle: "Húzza ide a képet vagy <span class='filepond--label-action'> válassza </span> ki a fájlt",
    allowMultiple: false,
    allowReplace: true,
    maxFiles: 1,
    checkValidity: true,
    server: {
      //url: ....,
      //method: "POST",
      process: './process',
      fetch: null,
      revert: null,
    }
  }); */
  
  var slider = tns({
    container: ".inda-slider",
    items: 1,
    slideBy: 1,
    responsive: {
      0: {
        //gutter: 55,
        //edgePadding: 10
      },
      860: {
        items: 2,
        gutter: 55,
      },
      1120: {
        items: 3,
        gutter: 55,
      },
    },
    gutter: 55,
    edgePadding: 10,
    //autoWidth: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayHoverPause: true,
    autoplayTimeout: 3500,
    mouseDrag: true,
    swipeAngle: false,
    speed: 400,
    prevButton: "#slider_prev",
    nextButton: "#slider_next",
    nav: true,
    navPosition: "bottom",
  });
});

const showMorePosts = () => {
  document.getElementById("best-post-wrapper").classList.remove("less");
};

const showCoverUpload = () => {
  const backdrop = document.getElementById("backdrop");
  const modal = document.getElementById("modal");
  backdrop.classList.remove("hide");
  modal.classList.remove("hide");
};

const hideCoverUpload = () => {
  const backdrop = document.getElementById("backdrop");
  const modal = document.getElementById("modal");
  backdrop.classList.add("hide");
  modal.classList.add("hide");
}
