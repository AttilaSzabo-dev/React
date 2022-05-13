document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("show-more").addEventListener("click", showMorePosts);
  if (document.getElementById("add-cover") !== null) {
      document.getElementById("add-cover").addEventListener("click", showCoverUpload);
  }
  document.getElementById("backdrop").addEventListener("click", hideCoverUpload);
  document.getElementById("close").addEventListener("click", hideCoverUpload);
  document.querySelector(".upload-cover").addEventListener("click", uploadFile);

  if (document.querySelector('.filepond--action-process-item') === null) {
      document.querySelector(".upload-cover").disabled = true;
  }

  document.addEventListener('FilePond:addfile', (e) => {
      document.querySelector(".upload-cover").disabled = false;
  });
  document.addEventListener('FilePond:processfiles', (e) => {
      location.reload();
  });

  // Register the plugin with FilePond
  FilePond.registerPlugin(
      FilePondPluginFileMetadata,
      FilePondPluginImageCrop,
      FilePondPluginImagePreview,
      FilePondPluginImageResize,
      FilePondPluginImageValidateSize,
      FilePondPluginFileValidateType,
      FilePondPluginImageEdit
  );

  // Get a reference to the file input element
  const inputElement = document.querySelector('input[type="file"]');

  // Create the FilePond instance
  const pond = FilePond.create(inputElement, {
      credits: false,
      // filepond locale:
      labelIdle: "Húzza ide a képet vagy <span class='filepond--label-action'> válassza </span> ki a fájlt",
      labelInvalidField: 'A mező érvénytelen fájlokat tartalmaz',
      labelFileWaitingForSize: 'Fáljméret kiszámolása',
      labelFileSizeNotAvailable: 'A fájlméret nem elérhető',
      labelFileLoading: 'Töltés',
      labelFileLoadError: 'Hiba a betöltés során',
      labelFileProcessing: 'Feltöltés',
      labelFileProcessingComplete: 'Sikeres feltöltés',
      labelFileProcessingAborted: 'A feltöltés megszakítva',
      labelFileProcessingError: 'Hiba történt a feltöltés során',
      labelFileProcessingRevertError: 'Hiba a visszaállítás során',
      labelFileRemoveError: 'Hiba történt az eltávolítás során',
      labelTapToCancel: 'koppints a törléshez',
      labelTapToRetry: 'koppints az újrakezdéshez',
      labelTapToUndo: 'koppints a visszavonáshoz',
      labelButtonRemoveItem: 'Eltávolítás',
      labelButtonAbortItemLoad: 'Megszakítás',
      labelButtonRetryItemLoad: 'Újrapróbálkozás',
      labelButtonAbortItemProcessing: 'Megszakítás',
      labelButtonUndoItemProcessing: 'Visszavonás',
      labelButtonRetryItemProcessing: 'Újrapróbálkozás',
      labelButtonProcessItem: 'Feltöltés',
      labelMaxFileSizeExceeded: 'A fájl túllépte a maximális méretet',
      labelMaxFileSize: 'Maximális fájlméret: {filesize}',
      labelMaxTotalFileSizeExceeded: 'Túllépte a maximális teljes méretet',
      labelMaxTotalFileSize: 'A maximáis teljes fájlméret: {filesize}',
      labelFileTypeNotAllowed: 'Érvénytelen típusú fájl',
      fileValidateTypeLabelExpectedTypes: 'Engedélyezett típusok {allButLastType} vagy {lastType}',
      imageValidateSizeLabelFormatError: 'A képtípus nem támogatott',
      imageValidateSizeLabelImageSizeTooSmall: 'A kép túl kicsi',
      imageValidateSizeLabelImageSizeTooBig: 'A kép túl nagy',
      imageValidateSizeLabelExpectedMinSize: 'Minimum méret: {minWidth} × {minHeight}',
      imageValidateSizeLabelExpectedMaxSize: 'Maximum méret: {maxWidth} × {maxHeight}',
      imageValidateSizeLabelImageResolutionTooLow: 'A felbontás túl alacsony',
      imageValidateSizeLabelImageResolutionTooHigh: 'A felbontás túl magas',
      imageValidateSizeLabelExpectedMinResolution: 'Minimáis felbontás: {minResolution}',
      imageValidateSizeLabelExpectedMaxResolution: 'Maximális felbontás: {maxResolution}',
      allowMultiple: false,
      allowReplace: true,
      maxFiles: 1,
      //checkValidity: true,
      allowImageResize: true,
      imageResizeTargetWidth: 1110,
      imageResizeTargetHeight: 300,
      imageResizeUpscale: false,
      allowImageValidateSize: true,
      imageValidateSizeMinWidth: 1110,
      //  imageValidateSizeMaxWidth: 1110,
      imageValidateSizeMinHeight: 300,
      //  imageValidateSizeMaxHeight: 300,
      // imageValidateSizeLabelImageSizeTooBig: "A kép túl nagy",
      // imageValidateSizeLabelImageSizeTooSmall: "A kép túl kicsi",
      // imageValidateSizeLabelExpectedMaxSize: "A legnagyobb méret {maxWidth} × {maxHeight}",
      /* allowFileTypeValidation: true,
      acceptedFileTypes: ["image/jpeg", "image/jpg"], */
      //imageResizeUpscale: false, //nem tudom kell-e??
      allowImageCrop: true,
      imageCropAspectRatio: "0.27", // 300/1110
      /* allowImageEdit: true,
      imageEditInstantEdit: true,
      imageEditAllowEdit: true, */
      acceptedFileTypes: ["image/jpeg", "image/jpg"],
      server: {
          //  url: '/posztok/index/upload',
          // url: '/posztok/kovetesteszt/2021/07/19/kovetes_teszt_teszt_kovetes',
          url: window.location.href,
          method: "POST",
          process: '/process',
          fetch: null,
          revert: null,
          onerror: (response) => response.data,
      },
      allowProcess: true,
      instantUpload: false,
      //  styleButtonProcessItemPosition: 'right',
      /* fileMetadataObject: {
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
      }, */
  });

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

const uploadFile = () => {
  document.querySelector('.filepond--action-process-item').click();
}