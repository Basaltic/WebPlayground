const colors = []

const getZhongGuoSe = () => {
  const listElement = document.getElementById('colors')
  if (listElement) {
    for (let i = 0; i < listElement.children.length; i++) {
      const item = listElement.children[i].children[0].children[0].children[0]
      const colorName = item.innerHTML
      const rgbColor = item.style.color

      colors.push({ name: colorName, color: rgbColor })
    }
  }
}

export default getZhongGuoSe
