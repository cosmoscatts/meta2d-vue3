<script setup lang="ts">
createPrimaryColor('purple')

const isViewMounted = useMounted()
provide('isViewMounted', isViewMounted)
</script>

<template>
  <div h-screen w-screen bg-base flex="~ col">
    <Header lt-lg:hidden />

    <div grid="~ cols-6" lt-lg:hidden>
      <div col-span-1 h="[calc(100vh-80px)]">
        <SideBar />
      </div>
      <ContextMenu>
        <div col-span-4 border-x="1 solid" border-base bg-hex-fbfbff dark:bg-hex-182033 h="[calc(100vh-80px)]">
          <View />
        </div>
      </ContextMenu>
      <div col-span-1 h="[calc(100vh-80px)]">
        <Props />
      </div>
    </div>

    <div lg:hidden h="[calc(100vh-30px)]" flex justify-center items-center op-50 font-bold text-4xl>
      请将窗口放大
    </div>

    <Footer />
  </div>
</template>
