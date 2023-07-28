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

## Icon

```
% npm install -D @mdi/font
```

```diff
--- a/example/pages/index.vue
+++ b/example/pages/index.vue
@@ -11,7 +11,10 @@ onMounted(update)
       {{ state.date }}
     </div>
     <div>
-      <v-btn class="text-none" @click="update">
+      <v-btn class="text-none" prepend-icon="mdi-check-circle" @click="update">
+        <template v-slot:prepend>
+          <v-icon></v-icon>
+        </template>
         update
       </v-btn>
     </div>
```

```diff
--- a/example/plugins/vuetify.ts
+++ b/example/plugins/vuetify.ts
@@ -1,4 +1,5 @@
 import { createVuetify } from 'vuetify'
+import '@mdi/font/css/materialdesignicons.css'

 export default defineNuxtPlugin(nuxtApp => {
   nuxtApp.vueApp.use(createVuetify({ ssr: true }))
```

## Testing

### Install

```
% npm i -D \
    @vitejs/plugin-vue \
    @vue/test-utils \
    jsdom \
    unplugin-auto-import \
    vitest
```

### Add files

`vitest.config.ts`

```typescript
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vue'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': '.'
    },
  },
})
```

`tests/pages/index.spec.ts`

```typescript
import { mount } from '@vue/test-utils'

import Index from '@/pages/index.vue'

describe('Index', async () => {
  test('1st h1', async () => {
    const wrapper = mount(Index)
    expect(wrapper.find('h1').text()).toBe('Example')
  })
})
```

### Update files

`tsconfig.json`

```diff
--- a/example/tsconfig.json
+++ b/example/tsconfig.json
@@ -1,4 +1,9 @@
 {
   // https://nuxt.com/docs/guide/concepts/typescript
-  "extends": "./.nuxt/tsconfig.json"
+  "extends": "./.nuxt/tsconfig.json",
+  "compilerOptions": {
+    "types": [
+      "vitest/globals"
+    ]
+  }
 }
```

`package.json`

```diff
--- a/example/package.json
+++ b/example/package.json
@@ -6,15 +6,21 @@
     "dev": "nuxt dev",
     "generate": "nuxt generate",
     "preview": "nuxt preview",
-    "postinstall": "nuxt prepare"
+    "postinstall": "nuxt prepare",
+    "test": "vitest run"
   },
   "devDependencies": {
     "@nuxt/devtools": "latest",
```

`.gitignore`

```diff
--- a/example/.gitignore
+++ b/example/.gitignore
@@ -21,3 +21,6 @@ logs
 .env
 .env.*
 !.env.example
+
+#
+auto-imports.d.ts
```

### Todo

```
▲ [WARNING] Cannot find base config file "./.nuxt/tsconfig.json" [tsconfig.json]

    ../../../../tsconfig.json:3:13:
      3 │   "extends": "./.nuxt/tsconfig.json",
        ╵              ~~~~~~~~~~~~~~~~~~~~~~~
```

```
[Vue warn]: Failed to resolve component: v-btn
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.
  at <Index ref="VTU_COMPONENT" >
  at <VTUROOT>
```

## Links

* https://nuxt.com/
    * https://nuxt.com/docs/getting-started/installation
    * https://nuxt.com/docs/guide/concepts/typescript
    * https://nuxt.com/docs/getting-started/views
    * https://nuxt.com/docs/getting-started/testing
* https://vuetifyjs.com/
