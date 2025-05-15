/**
 * 设备图库默认设备
 */

import gaoyagangImage from '~/assets/gaoyagang.svg';
import momeijiImage from '~/assets/momeiji.svg';
import reguoluImage from '~/assets/reguolu.svg';

/**
 * 注意两个数组得一一对应
 */
export function getDefaultEquipInfo() {
  const defaultNames = [
    '高压缸',
    '磨煤机',
    '热锅炉',
  ];
  const defaultImages = [
    gaoyagangImage,
    momeijiImage,
    reguoluImage,
  ];

  return {
    defaultNames,
    defaultImages,
  };
}
