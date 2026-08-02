import { useState } from 'react'
import Input from '../common/Input.jsx'
import Button from '../common/Button.jsx'

export default function PasswordInput(props) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="grid gap-2">
      <Input type={visible ? 'text' : 'password'} {...props} />
      <Button className="min-h-9 justify-self-start px-3 text-xs" variant="ghost" onClick={() => setVisible((value) => !value)}>
        {visible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
      </Button>
    </div>
  )
}
