const translations = {
  "isStaff": "Es Administrador de Banco",
  "username": "Nombre de Usuario",
  "status": "Estado",
}

export const translate = (textKey: keyof typeof translations): string | any => {
  if (translations[textKey]) return translations[textKey]
  return textKey;
}