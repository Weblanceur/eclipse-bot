export default function findStrInArray(str: string, arrayStr: string[]) {
  return arrayStr.some((element) => {
    if (str.toLowerCase().indexOf(element) !== -1) {
      return 1
    }
  })
}
