<template>
  <div id="app">
    <RwvHeader />
    <router-view></router-view>
    <RwvFooter />
  </div>
</template>

<script>
import (RwvHeader): "@/components/TheHeader"
import (RwvFooter): "@/components/TheFooter"

export default: [
  name: "App"
  components:
    RwvHeader
    RwvFooter
]
</script>

<style></style>
