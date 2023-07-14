<script  lang="ts" setup>
const state = reactive<{ date: Date|null }>({ date: null })
const update = () => state.date = new Date()
onMounted(update)
</script>

<template>
  <div>
    <h1>Example</h1>
    <div>
      {{ state.date }}
    </div>
    <div>
      <v-btn class="text-none" @click="update">
        update
      </v-btn>
    </div>
  </div>
</template>
