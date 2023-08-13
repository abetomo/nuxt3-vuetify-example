<script  lang="ts" setup>
const state = reactive<{ date: Date|null }>({ date: null })
const update = () => { state.date = new Date() }
onMounted(update)
</script>

<template>
  <div>
    <h1>Example</h1>
    <div>
      {{ state.date }}
    </div>
    <div>
      <v-btn class="text-none" prepend-icon="mdi-check-circle" @click="update">
        <template #prepend>
          <v-icon />
        </template>
        update
      </v-btn>
    </div>
  </div>
</template>
