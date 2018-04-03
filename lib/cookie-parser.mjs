import cookie from 'cookie'

export default function () {
  const cookieData = this.getHeader('cookie')
  if (cookieData) {
    this.cookies = cookie.parse(cookieData)
  }
  return this.cookies || null
}
