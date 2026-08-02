import Button from '../common/Button.jsx'
import Modal from '../common/Modal.jsx'

export default function ConfirmDialog({ open, title, message, confirmLabel = 'تأكيد', pending = false, destructive = false, onConfirm, onClose }) {
  return (
    <Modal open={open} title={title} onClose={pending ? undefined : onClose}>
      <p className="text-sm leading-7 text-[var(--color-text-muted)]">{message}</p>
      <div className="mt-5 flex flex-wrap justify-end gap-3">
        <Button variant="secondary" disabled={pending} onClick={onClose}>إلغاء</Button>
        <Button variant={destructive ? 'danger' : 'primary'} loading={pending} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
