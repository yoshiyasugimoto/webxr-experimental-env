/* global AFRAME */
AFRAME.registerComponent("button", {
  schema: {
    label: { default: "label" },
    width: { default: 0.11 },
    toggable: { default: false },
  },
  init: function () {
    var el = this.el;
    var labelEl = (this.labelEl = document.createElement("a-entity"));
    var boxColor = el.id;

    this.color = boxColor;
    el.setAttribute("geometry", {
      primitive: "box",
      width: this.data.width,
      height: 0.05,
      depth: 0.04,
    });

    el.setAttribute("material", { color: this.color });
    el.setAttribute("pressable", "");

    labelEl.setAttribute("position", "0 0 0.02");
    labelEl.setAttribute("text", {
      value: this.data.label,
      color: "gray",
      align: "center",
    });

    labelEl.setAttribute("scale", "0.75 0.75 0.75");
    this.el.appendChild(labelEl);

    this.bindMethods();
    this.el.addEventListener("pressedstarted", this.onPressedStarted);
    this.el.addEventListener("pressedended", this.onPressedEnded);
  },

  bindMethods: function () {
    this.onPressedStarted = this.onPressedStarted.bind(this);
    this.onPressedEnded = this.onPressedEnded.bind(this);
  },

  update: function (oldData) {
    if (oldData.label !== this.data.label) {
      this.labelEl.setAttribute("text", "value", this.data.label);
    }
  },

  onPressedStarted: function () {
    var el = this.el;
    el.setAttribute("material", { color: "green" });
    el.emit("click");
    var evtDetail = this.evtDetail;
    evtDetail.color = el.id;
    el.emit("buttonpushed", evtDetail);

    if (this.data.togabble) {
      if (el.is("pressed")) {
        el.removeState("pressed");
      } else {
        el.addState("pressed");
      }
    }
  },

  onPressedEnded: function () {
    if (this.el.is("pressed")) {
      return;
    }
    this.el.setAttribute("material", { color: this.color });
  },
});
