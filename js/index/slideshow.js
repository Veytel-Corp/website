let c=0;
const slides = {
  properties: [
    {
      src: 'v1718147146/adpruytnsaiyihndr2e1',
      duration: 6.5,
      mirror: false,
    },
    {
      src: 'v1721880739/video3_izeynz',
      duration: 6.5,
      mirror: true,
    },
    // {
    //   src: 'v1721930980/derma_demo_gfdb5s',
    //   duration: 10,
    // mirror: false,
    // },
    {
      src: 'v1721885691/video3backup_j7ryry',
      duration: 6.5,
      mirror: false,
    },
  ],
  screenSizes: [{ w: 900, mw: 600 }, { w: 1000, mw: 1000 }, { w: 2000, mw: 1001 }],
  visibleSlideIndex: 0,
  nextSlideIndex: 1,
}

slides.initializeSlideElement = (slideEl, slideIndex) => {
  slideEl.innerHTML = '';
  c=0;
  for (let i = 0; i < slides.screenSizes.length; i++) {
    const sourceEl = document.createElement('source');
    sourceEl.src = `https://res.cloudinary.com/drrssdubw/video/upload/w_${slides.screenSizes[i].w}/${slides.properties[slideIndex].src}.mp4`;
    sourceEl.media = c <= 1 ? `(max-width: ${slides.screenSizes[c].mw}px)` : `(min-width: ${slides.screenSizes[c].mw}px)`;
    sourceEl.type = 'video/mp4';
    c++;
    slideEl.appendChild(sourceEl);
  }
}
slides.initializeNextSlideElement = () => {
  const nextSlideEl = document.querySelector('.next-slide');
  const index = slides.nextSlideIndex;
  slides.initializeSlideElement(nextSlideEl, index);
}
slides.initializeCurrentSlideElement = () => {
  const currentSlideEl = document.querySelector('.current-slide');
  slides.initializeSlideElement(currentSlideEl, slides.visibleSlideIndex);
}
slides.setNextSlideAttributes = () => {
  const nextSlideEl = document.querySelector('.next-slide');
  const sources = nextSlideEl.querySelectorAll('source');
  const index = slides.nextSlideIndex;
  // const mirrorSlide = (b) => {
  //   console.log(b);
  //   if (b) 
  //     nextSlideEl.classList.add('mirror');
  //   else
  //   nextSlideEl.classList.remove('mirror');
  // }
  // mirrorSlide(slides.properties[index].mirror);

  c=0;
  sources.forEach((source) => {
    source.src = `https://res.cloudinary.com/drrssdubw/video/upload/w_${slides.screenSizes[c].w}/${slides.properties[index].src}.mp4`;
    source.media = c <= 1 ? `(max-width: ${slides.screenSizes[c].mw}px)` : `(min-width: ${slides.screenSizes[c].mw}px)`;
    source.type = 'video/mp4';
    c++;
  });
  setTimeout(()=>{
    nextSlideEl.load();
  }, 1500)
}
slides.nextSlide = () => {
  const vsi = slides.visibleSlideIndex;
  const nsi = slides.nextSlideIndex;
  slides.visibleSlideIndex = slides.properties.length - 1 <= vsi ? 0 : vsi + 1;
  slides.nextSlideIndex = slides.properties.length - 1 <= nsi ? 0 : nsi + 1;

  const currentSlideEl = document.querySelector('.next-slide');
  const prevSlideEl = document.querySelector('.current-slide');

  prevSlideEl.classList.remove('current-slide');
  prevSlideEl.classList.add('next-slide');

  currentSlideEl.currentTime = 0;
  currentSlideEl.classList.remove('next-slide');
  currentSlideEl.classList.add('current-slide');

  slides.setNextSlideAttributes();
  scheduleNextSlide();
}

// slides.initializeCurrentSlideElement();
slides.initializeNextSlideElement();

const scheduleNextSlide = () => {
  let time = slides.properties[slides.visibleSlideIndex].duration * 1000;
  setTimeout(() => {
    slides.nextSlide();
  }, time);
}

scheduleNextSlide();