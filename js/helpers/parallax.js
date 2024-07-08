const directionMap = {
    right: 0, // angles start pointing to the right and...
    top: 90, // ...go counter clockwise
    left: 180,
    bottom: 270
  }
  
  const directionMultipliers = {
    0: [1, 0],
    90: [0, -1],
    180: [-1, 0],
    270: [0, 1]
  }
  
  const parallaxes = Array.prototype.map.call(document.getElementsByClassName('parallax'), element => {
    let {
      angle,
      movement} = element.dataset
    let multipliers
  
    // angle has shorthands "top", "left", "bottom" and "right"
    angle = directionMap[angle] ?? parseFloat(angle) // nullish coalescing. using `||` here would fail for `0`
    movement = parseFloat(movement)
  
    // fallback if undefined
    // NaN is the only value that doesn't equal itself
    if (angle !== angle) angle = 270 // move to bottom (default parallax effect)
    if (movement !== movement) movement = 100 // 100px
  
    // check if angle is located in top half and/or left half
    angle %= 360
    if (angle < 0) angle += 360
    const toLeft = angle > 90 && angle < 270
    const toTop = angle < 180
  
    // align elements at right corner of parent .visual
    element.style[toLeft ? 'left' : 'right'] = 0
    element.style[toTop ? 'top' : 'bottom'] = 0
  
    // if it's not a perfectly horizontal or vertical movement, get cos and sin
    if (angle % 90) {
      const radians = angle * Math.PI / 180
      multipliers = [Math.cos(radians), Math.sin(radians) * -1] // only sin has to be inverted
    } else multipliers = directionMultipliers[angle]
  
    // increase width and height according to movement and multipliers
    if (multipliers[0]) element.style.width = `calc(100% + ${movement * Math.abs(multipliers[0])}px)`
    if (multipliers[1]) element.style.height = `calc(100% + ${movement * Math.abs(multipliers[1])}px)`
  
    return {
      element,
      movement,
      multipliers
    }
  })
  
  const windowInnerHeight = window.innerHeight
  
  const scrollHandler = (() => {
    const ret = {
      active: false
    }
    let timeout
  
    ret.activate = function activate() {
      if (ret.active) clearTimeout(timeout)
      else {
        ret.active = true
        requestAnimationFrame(runParallax)
      }
      timeout = setTimeout(() => ret.active = false, 20)
    }
  
    return ret
  })()
  
  const runParallax = () => {
    Array.prototype.forEach.call(parallaxes, parallax => {
      const {
        element,
        movement,
        multipliers
      } = parallax
  
      const {
        top,
        height
      } = element.getBoundingClientRect()
      const scrolledInContainer = windowInnerHeight - top
      const scrollArea = windowInnerHeight + height
      const progress = scrolledInContainer / scrollArea
  
      if (progress > -0.1 && progress < 1.1) {
        const position = Math.min(Math.max(progress, 0), 1) * movement
        element.style.transform = `translate3d(${position * multipliers[0]}px, ${position * multipliers[1]}px, 0)`
      }
    })
  
    if (scrollHandler.active) requestAnimationFrame(runParallax)
  }
  
  runParallax()
  
  window.addEventListener('scroll', scrollHandler.activate)