export default function timer(ms) {
  return new Promise((res) => setTimeout(res, ms))
}
