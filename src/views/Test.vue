<template>
  <Room :roomId = roomId></Room>
</template>
<script>

import Room from "@/components/museum/Room";
export default {
  name: 'CustomerThree',
  components: {Room},
  label:'3D模型',
  data() {
    return {
      roomId: 1
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>
<style scoped>
</style>
