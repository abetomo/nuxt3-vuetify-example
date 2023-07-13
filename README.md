# nuxt3-vuetify-example

## New Project

```
% npx nuxi@latest init example
Nuxi 3.6.2                                                                                                         10:15:50
✨ Nuxt project is created with v3 template. Next steps:                                                           10:15:51
 › cd example                                                                                                      10:15:51
 › Install dependencies with npm install or yarn install or pnpm install                                           10:15:51
 › Start development server with npm run dev or yarn dev or pnpm run dev
```

```
% cd example
% npm i
```

## TypeScript

```
% npm i -D vue-tsc typescript
```

```diff
--- a/example/nuxt.config.ts
+++ b/example/nuxt.config.ts
@@ -1,4 +1,8 @@
 // https://nuxt.com/docs/api/configuration/nuxt-config
 export default defineNuxtConfig({
-  devtools: { enabled: true }
+  devtools: { enabled: true },
+  typescript: {
+    strict: true,
+    typeCheck: true
+  },
 })
```

## Pages

### Update `app.vue`

```diff
--- a/example/app.vue
+++ b/example/app.vue
@@ -1,5 +1,5 @@
 <template>
   <div>
-    <NuxtWelcome />
+    <NuxtPage />
   </div>
 </template>
```

### Add `pages/index.vue`.

```
% mkdir pages
```

`pages/index.vue`

```vue
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
      <button @click="update">
        update
      </button>
    </div>
  </div>
</template>
```

## Use `Vuetify`

### Install

```
% npm i -D vuetify sass vite-plugin-vuetify
```

### Add files

```
% mkdir plugins assets
```

`plugins/vuetify.ts`

```vue
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(createVuetify({ ssr: true }))
})
```

`assets/vuetify.scss`

```scss
@use "vuetify/styles";
```

### Update `nuxt.config.ts`

```diff
--- a/example/nuxt.config.ts
+++ b/example/nuxt.config.ts
@@ -1,3 +1,5 @@
+import vuetify from 'vite-plugin-vuetify'
+
 // https://nuxt.com/docs/api/configuration/nuxt-config
 export default defineNuxtConfig({
   devtools: { enabled: true },
@@ -5,4 +7,18 @@ export default defineNuxtConfig({
     strict: true,
     typeCheck: true
   },
+  build: {
+    transpile: ['vuetify'],
+  },
+  hooks: {
+    'vite:extendConfig': (config) => {
+      config.plugins!.push(vuetify())
+    },
+  },
+  vite: {
+    ssr: {
+      noExternal: ['vuetify'],
+    },
+  },
+  css: ['@/assets/vuetify.scss'],
 })
```

### Update `pages/index.vue`

```diff
--- a/example/pages/index.vue
+++ b/example/pages/index.vue
@@ -10,9 +10,9 @@ const update = () => state.date = new Date()
       {{ state.date }}
     </div>
     <div>
-      <button @click="update">
+      <v-btn class="text-none" @click="update">
         update
-      </button>
+      </v-btn>
     </div>
   </div>
 </template>
```

## Links

* https://nuxt.com/
* https://vuetifyjs.com/
