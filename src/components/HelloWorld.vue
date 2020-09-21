<template>
  <div class="hello">
   <model-gltf src="../static/models/Soldier3.glb"></model-gltf>
  </div>
</template>

<script>
import { ModelGltf } from 'vue-3d-model'
export default {
  components: {
    ModelGltf
  }
}
</script>
<style lang="less">
.hello {
  width: 1200px;
  height: 1200px;
}
</style>
