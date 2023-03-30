const Utils = {}

Utils.getRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}

Utils.getId = () => {
  return Date.now()
}

export default Utils
