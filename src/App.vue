<template>
  <div id="app">
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
export default {
  data () {
    return {
      scene: null, // 场景
      camera: null, // 相机
      mesh: null, // 网格
      renderer: null, // 渲染器对象
      orbitControls: null, // 鼠标缩放对象
      gltfLoader: null // 加载文件的对象
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      this.camera.position.set(15, 35, 45)
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      // 初始化加载模型
      this.gltfLoader = new GLTFLoader()
      document.getElementById('app').appendChild(this.renderer.domElement)
      window.addEventListener('resize', () => this.onWindowResize())
      // 创建文件的缩放动作
      this.orbitControls = new OrbitControls(
        this.camera,
        this.renderer.domElement
      )

      // 设置平面
      const planeBufferGeometry = new THREE.PlaneBufferGeometry(100, 100)
      const plane = new THREE.Mesh(
        planeBufferGeometry,
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide // 双面的平板
        })
      )
      plane.name = 'plane'
      // 调整平面的角度
      plane.rotation.x = -Math.PI / 2
      // 网格分为100*100
      this.scene.add(new THREE.GridHelper(100, 100))
      this.scene.add(plane)

      // 灯光
      this.scene.background = new THREE.Color(0xcce0ff)
      // 环境光
      this.scene.add(new THREE.AmbientLight(0x666666))
      // 平行灯光
      const light = new THREE.DirectionalLight(0xdfebff, 1)
      light.position.set(50, 200, 100)
      light.position.multiplyScalar(1.3)
      light.castShadow = true
      light.shadow.mapSize.width = 1024
      light.shadow.mapSize.height = 1024
      const d = 300
      light.shadow.camera.left = -d
      light.shadow.camera.right = d
      light.shadow.camera.top = d
      light.shadow.camera.bottom = -d
      light.shadow.camera.far = 1000
      this.scene.add(light)

      // 加载文件
      this.gltfLoader.load('/static/models/Soldier3.glb', gltf => {
        this.scene.add(gltf.scene)
      })
      this.render()
    },
    render () {
      window.requestAnimationFrame(() => this.render())
      this.renderer.render(this.scene, this.camera)
    },
    onWindowResize () {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }
}
</script>

<style lang="less">
</style>
