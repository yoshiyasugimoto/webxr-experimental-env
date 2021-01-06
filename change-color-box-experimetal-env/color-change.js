/* global AFRAME */
AFRAME.registerComponent("color-change", {
  schema: {
    color: { default: "green" },
  },

  init: function () {
    this.bindMethods();
    this.el.addEventListener("pinchedstarted", this.onPinchedStarted);
    this.el.addEventListener("pinchedended", this.onPinchedEnded);
    this.el.sceneEl.addEventListener("buttonpushed", this.onButtonPushed);
  },

  bindMethods: function () {
    this.onPinchedStarted = this.onPinchedStarted.bind(this);
    this.onPinchedEnded = this.onPinchedEnded.bind(this);
  },

  onPinchedStarted: function () {
    this.originalColor =
      this.originalColor || this.el.getAttribute("material").color;
    this.el.setAttribute("material", "color", this.data.color);
  },

  onPinchedEnded: function () {
    this.el.setAttribute("material", "color", this.originalColor);
  },

  onButtonPushed: function (evt) {
    var boxGeometryEl = document.getElementById("boxGeometry");
    boxGeometryEl.setAttribute("material", "color", evt.detail.color);
  },
});
