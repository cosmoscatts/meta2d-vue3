export const equipOptions = Array.from({ length: 5 }, (_, idx) => {
  return {
    value: `equip-mock-${idx + 1}`,
    label: `设备${idx + 1}`,
  };
});

export function createPointOptions(equipId: string) {
  return Array.from({ length: 6 }, (_, idx) => {
    return {
      value: `point-${idx + 1}-${equipId}`,
      label: `测点${idx + 1}`,
    };
  });
}
