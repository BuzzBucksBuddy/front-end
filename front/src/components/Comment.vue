<template>
  <div>
    <h4>{{ comment.content }}</h4>
    <p>{{ comment.user.username }}</p>
    <p>{{ comment.created_at.slice(0, 10) }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  comment: Object
})

</script>

<style scoped>

</style>