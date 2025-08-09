/**
 * Get a cookie value by name.
 * @param name The name of the cookie to get.
 * @returns The value of the cookie, or null if it's not found.
 */
export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }
  return null
}

/**
 * Set a cookie.
 * @param name The name of the cookie to set.
 * @param value The value to set the cookie to.
 * @param days The number of days until the cookie expires.
 */
export function setCookie(name: string, value: string, days: number): void {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`
}

/**
 * Erase a cookie.
 * @param name The name of the cookie to erase.
 */
export function eraseCookie(name: string): void {
  document.cookie = `${name}=; Max-Age=-99999999; path=/`
}
