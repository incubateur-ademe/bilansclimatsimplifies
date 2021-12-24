export function validateSiren(siren) {
  siren = siren.replaceAll(' ', '')
  if (siren.length !== 9 || /[^0-9-\s]+/.test(siren)) {
    return false
  }

  let nCheck = 0
  let isEven = false

  for (let i = siren.length - 1; i >= 0; i--) {
    const cDigit = siren.charAt(i)
    let nDigit = parseInt(cDigit, 10)

    if (isEven && (nDigit *= 2) > 9) {
      nDigit -= 9
    }

    nCheck += nDigit
    isEven = !isEven
  }

  return nCheck % 10 === 0
}

export function validateNombreSalaries(nombreSalaries) {
  return nombreSalaries >= 50 && nombreSalaries <= 500
}

export function validateAnnee(annee) {
  const year = new Date().getFullYear()
  return year - Number(annee) >= 0 && year - Number(annee) < 3
}
