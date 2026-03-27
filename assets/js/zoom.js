// Initialize medium zoom.
$(document).ready(function () {
  const zoomBackground = getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee"; // + 'ee' for trasparency.

  medium_zooms = [];

  const publicationZoomTargets = document.querySelectorAll(".publication-preview[data-zoomable]");
  if (publicationZoomTargets.length > 0) {
    publication_zoom = mediumZoom(publicationZoomTargets, {
      background: zoomBackground,
      margin: 160,
    });
    medium_zooms.push(publication_zoom);
  }

  const defaultZoomTargets = document.querySelectorAll("[data-zoomable]:not(.publication-preview)");
  if (defaultZoomTargets.length > 0) {
    medium_zoom = mediumZoom(defaultZoomTargets, {
      background: zoomBackground,
    });
    medium_zooms.push(medium_zoom);
  }
});
