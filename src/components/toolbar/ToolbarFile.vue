<script setup lang="ts">
import type { Meta2dData, Pen } from '@meta2d/core';
import dayjs from 'dayjs';
import FileSaver from 'file-saver';

function newFile() {
  useConfirm({
    title: '提示',
    content: '新建文件会覆盖原有图纸，确定要新建吗？',
    ok() {
      meta2d.open({ name: getRandomStr(8), pens: [] as Pen[] } as Meta2dData);
      Message.success('新建文件成功');
    },
  });
}

function readFile(file: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function openFile() {
  // 1. 显示选择文件对话框
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = async (event) => {
    const elem = event.target as HTMLInputElement;
    if (elem.files && elem.files[0]) {
      // 2. 读取文件字符串内容
      const text = await readFile(elem.files[0]);
      try {
        // 3. 打开文件内容
        meta2d.open(JSON.parse(text));
      }
      catch (e) {
        console.error(e);
      }
    }
  };
  input.click();
}

function exportFile() {
  const data: any = meta2d.data();
  const defaultFileName = `图纸数据${dayjs().format('YYYYMMDDHHmmss')}`;
  FileSaver.saveAs(
    new Blob([JSON.stringify(data)], {
      type: 'text/plain;charset=utf-8',
    }),
    `${data.name || defaultFileName}.json`,
  );
}

function exportPng() {
  let name = (meta2d.store.data as any).name;
  if (name)
    name += '.png';

  meta2d.downloadPng(name);
}

/**
 *  判断该画笔`是否是组合为状态中`展示的画笔
 */
function isShowChild(pen: any, store: any) {
  let selfPen = pen;
  while (selfPen && selfPen.parentId) {
    const oldPen = selfPen;
    selfPen = store.pens[selfPen.parentId];
    const showChildIndex = selfPen?.calculative?.showChild;
    if (showChildIndex !== undefined) {
      const showChildId = selfPen.children[showChildIndex];
      if (showChildId !== oldPen.id)
        return false;
    }
  }
  return true;
}

function exportSvg() {
  if (!C2S) {
    Message.error('缺少相应插件，请联系管理员！');
    return;
  }

  const rect: any = meta2d.getRect();
  rect.x -= 10;
  rect.y -= 10;
  const ctx = new C2S(rect.width + 20, rect.height + 20);
  ctx.textBaseline = 'middle';
  for (const pen of meta2d.store.data.pens) {
    if (pen.visible === false || !isShowChild(pen, meta2d.store))
      continue;

    meta2d.renderPenRaw(ctx, pen, rect);
  }

  let mySerializedSVG = ctx.getSerializedSvg();
  if (meta2d.store.data.background) {
    mySerializedSVG = mySerializedSVG.replace('{{bk}}', '');
    mySerializedSVG = mySerializedSVG.replace(
      '{{bkRect}}',
      `<rect x="0" y="0" width="100%" height="100%" fill="${meta2d.store.data.background}"></rect>`,
    );
  } else {
    mySerializedSVG = mySerializedSVG.replace('{{bk}}', '');
    mySerializedSVG = mySerializedSVG.replace('{{bkRect}}', '');
  }

  mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x');

  const urlObject: any = (window as any).URL || window;
  const export_blob = new Blob([mySerializedSVG]);
  const url = urlObject.createObjectURL(export_blob);

  const a = document.createElement('a');
  a.setAttribute(
    'download',
    `${(meta2d.store.data as any).name || 'le5le.meta2d'}.svg`,
  );
  a.setAttribute('href', url);
  const evt = document.createEvent('MouseEvents');
  evt.initEvent('click', true, true);
  a.dispatchEvent(evt);
}

function openImageFile() {
  // 1. 显示选择文件对话框
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = async (event) => {
    const elem = event.target as HTMLInputElement;
    if (!elem.files || !elem.files[0])
      return;
    const file = elem.files[0];
    const REGEX = /image/;
    if (!REGEX.test(file.type)) {
      Message.error('请上传图片');
      return;
    }

    // 2. 读取图片内容
    const imageUrl = await getFileBase64(file);
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      const width = image.width;
      const height = image.height;
      // 进行缩放, 默认宽度 300
      const radioWidth = 300;
      const radioHeight = radioWidth * height / width;
      try {
        // 3. 打开图片
        meta2d.canvas.addCaches = [
          {
            width: radioWidth,
            height: radioHeight,
            image: imageUrl,
            name: 'image',
            imageRatio: true,
          },
        ];
        Message.success('上传成功，请点击图纸选择添加位置');
      } catch (e) {
        console.error(e);
      }
    };
  };
  input.click();
}
</script>

<template>
  <a-dropdown trigger="hover" :popup-max-height="false">
    <div text-xl op50 hover:op75 cursor-pointer i-ph:compass-tool />

    <template #content>
      <a-doption @click="newFile">
        <template #icon>
          <div i-ri-file-add-line />
        </template>
        新建文件
      </a-doption>
      <a-doption @click="openFile">
        <template #icon>
          <div i-ri-folder-open-line />
        </template>
        打开JSON文件
      </a-doption>
      <a-doption @click="exportFile">
        <template #icon>
          <div i-ri-file-download-line />
        </template>
        导出JSON文件
      </a-doption>

      <a-divider />

      <a-doption @click="openImageFile">
        <template #icon>
          <div i-ri-import-line />
        </template>
        导入图片
      </a-doption>
      <a-doption @click="exportPng">
        <template #icon>
          <div i-ri-image-2-line />
        </template>
        下载为PNG
      </a-doption>
      <a-doption @click="exportSvg">
        <template #icon>
          <div i-carbon-svg />
        </template>
        下载为SVG
      </a-doption>
    </template>
  </a-dropdown>
</template>
