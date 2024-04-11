interface ConfirmProps {
  title?: string
  content?: string
  ok?: () => void
  okText?: string
  cancelText?: string
}

/**
 * 通用确认框
 */
export function useConfirm(opts?: ConfirmProps) {
  return Modal.confirm({
    title: opts?.title,
    content: opts?.content || '',
    okText: opts?.okText || '确定',
    cancelText: opts?.cancelText || '取消',
    onOk: opts?.ok,
  })
}
