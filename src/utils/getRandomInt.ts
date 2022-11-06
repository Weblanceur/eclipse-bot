/**
 * Генерирует случайное целое число в диапазоне от 1 до переданного max
 *
 * @param {number} max верхний предел диапазона
 *
 * @return {number} случайное целое число
 * */
export default function getRandomInt(max = 2147483648): number {
  return Math.floor(Math.random() * max)
}
