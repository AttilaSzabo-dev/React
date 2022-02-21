document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("show-more").addEventListener("click", showMorePosts);
  document.getElementById("add-cover").addEventListener("click", showCoverUpload);
  document.getElementById("backdrop").addEventListener("click", hideCoverUpload);
  document.getElementById("close").addEventListener("click", hideCoverUpload);
  
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
