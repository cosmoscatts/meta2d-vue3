import type { Pen } from '@meta2d/core';
import { useMeta2dSelection } from './selection';

export function bindMeta2dActive() {
  const { select } = useMeta2dSelection();

  function active(pens?: Pen[]) {
    select(pens);
  }

  function inactive() {
    select();
  }

  meta2d.on('active', active);
  meta2d.on('inactive', inactive);
}
