(() => {
  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  let currentItem; // 현재 활성화된(visible클래스가 불튼) .graphic-item을 지정

  // 각 엘리먼트에 data-index 추가
  for (let i = 0; i < stepElems.length; i++) {
    // stepElems[i].setAttribute('data-index', i);
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  // 각 step의 위치를 파악
  // 해당 step이 특정 구간에 들어오면 그에 맞는 이미지를 보여준다 
  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;
  
    for (let i = 0; i < stepElems.length; i++) {
      // 엘리먼트의 위치를 가져옴
      step = stepElems[i];
      boundingRect = step.getBoundingClientRect();

      // 범위 설정
      const innerHeightCondition = 
        boundingRect.top > window.innerHeight * 0.1 && 
        boundingRect.top < window.innerHeight * 0.8
      
      if (innerHeightCondition) {
        const dataIndex = step.dataset.index;

        if (currentItem) {
          currentItem.classList.remove('visible')
        }
        currentItem = graphicElems[dataIndex]
        currentItem.classList.add('visible')
      }
    }
  });

})(); 