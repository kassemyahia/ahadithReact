export function requiredValue(message = 'هذا الحقل مطلوب') {
  return { required: message }
}

export function emailValidity(message = 'البريد الإلكتروني غير صحيح') {
  return {
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message,
    },
  }
}

export function minimumPasswordLength(minLength = 8) {
  return {
    minLength: {
      value: minLength,
      message: `كلمة المرور يجب أن تكون ${minLength} أحرف على الأقل`,
    },
    maxLength: {
      value: 128,
      message: 'كلمة المرور طويلة جدًا',
    },
  }
}

export function passwordConfirmation(password, message = 'كلمتا المرور غير متطابقتين') {
  return (value) => value === password || message
}

export const validators = {
  required: requiredValue(),
  email: emailValidity(),
  password: minimumPasswordLength(8),
}
