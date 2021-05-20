<template>
<v-container>
  <Room :roomId = roomId></Room>
</v-container>
</template>

<script>
import Room from "@/components/museum/Room";
export default {
  name: "Museum",
  components: {Room},
  data(){
    return{
      roomId: 1
    }
  }
}
</script>

<style scoped>

</style>
