/* global AFRAME THREE*/
AFRAME.registerComponent('obj-move', {
  schema: {
    width: { default: 0.5 }
  },
  init: function () {
    this.localPosition = new THREE.Vector3();
    this.bindMethods();
    this.el
    this.el.setAttribute('pinchable', {
      pinchDistance: 0.05
    });
    this.el.addEventListener('pinchedmoved', this.onPinchedMoved);
    
  },

  bindMethods: function (evt) {
    this.onPinchedMoved = this.onPinchedMoved.bind(this);
  },
  
  onPinchedMoved: function (evt) {
    const rightPinch = document.getElementById("right-hand");
    const boxGeometry = document.getElementById("boxGeometry");
    const txt4 = document.getElementById("txt4");
    
    var el = this.el;
    var halfWidth = this.data.width / 2;
    var localPosition = this.localPosition;
    localPosition.copy(evt.detail.position);
    el.object3D.updateMatrixWorld();
    el.object3D.worldToLocal(localPosition);
    if (localPosition.x < -halfWidth || localPosition.x > halfWidth) { return; }
    // txt4.setAttribute("value", "localPosition.x: " + localPosition.x + ", el.object3D.position.x: " + el.object3D.position.x+ ", evt.detail.position.x: " + evt.detail.position.x)
    this.el.object3D.position.x = evt.detail.position.x;
    this.el.object3D.position.y = evt.detail.position.y;
    this.el.object3D.position.z = evt.detail.position.z;
  }

  
});

