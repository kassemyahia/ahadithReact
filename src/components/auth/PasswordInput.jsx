import { useState } from 'react'
import Input from '../common/Input.jsx'
import Button from '../common/Button.jsx'

export default function PasswordInput(props) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="grid gap-2">
      <Input type={visible ? 'text' : 'password'} {...props} />
      <Button className="justify-self-start" variant="ghost" onClick={() => setVisible((value) => !value)}>
        {visible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
      </Button>
    </div>
  )
}
