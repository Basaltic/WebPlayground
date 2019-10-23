const colors: any = []

const getZhongGuoSe = () => {
  const listElement = document.getElementById('colors')
  if (listElement) {
    for (let i = 0; i < listElement.children.length; i++) {
      const item: any = listElement.children[i].children[0].children[0].children[0]
      const colorName = item.innerHTML

      const rgb = item.style.color
        .replace('rgb(', '')
        .replace(')', '')
        .split(',')

      console.log(rgb)
      const rgbColor = {
        r: rgb[0].trim(),
        g: rgb[1].trim(),
        b: rgb[2].trim(),
      }

      colors.push({ name: colorName, color: rgbColor })
    }
  }

  console.log(JSON.stringify(colors))
}

getZhongGuoSe()

export default getZhongGuoSe
