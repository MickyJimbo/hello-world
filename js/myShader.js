module.exports = function(THREE){

  THREE.MyShader = {

    uniforms: {
      "light": { value: new THREE.Vector3( 0.1, 0.25, 0.6 ) }
    },

    vertexShader: [

      "attribute float displacement;",

      "varying vec3 vNormal;",

      "void main() {",

        "vNormal = normal;",

        "vec3 newPosition = position + normal * vec3(displacement);",

        "gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );",

      "}"

    ].join("\n"),

    fragmentShader: [

      "varying vec3 vNormal;",

      "uniform vec3 light;",

      "void main() {",

        "vec3 nLight = vec3(normalize(light));",

        "float dProd = max(0.0, dot(vNormal, nLight));",

        "gl_FragColor = vec4( dProd, dProd, dProd, 1.0 );",

      "}"

    ].join("\n")
  };

}
