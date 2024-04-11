<script setup lang="ts">
createPrimaryColor('purple')

const isViewMounted = useMounted()
provide('isViewMounted', isViewMounted)
</script>

<template>
  <div h-screen w-screen bg-base>
    <Header />

    <div h="[calc(100vh-80px)]" grid="~ cols-6">
      <div col-span-1>
        <SideBar />
      </div>
      <ContextMenu>
        <div col-span-4 border-x="1 solid" border-base>
          <View />
        </div>
      </ContextMenu>
      <div col-span-1>
        3
      </div>
    </div>

    <Footer />
  </div>
</template>
