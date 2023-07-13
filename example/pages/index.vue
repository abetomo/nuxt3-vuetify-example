<script  lang="ts" setup>
const state = reactive<{ date: Date }>({ date: new Date() })
const update = () => state.date = new Date()
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
