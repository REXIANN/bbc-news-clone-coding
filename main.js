(() => {
  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  let currentItem = graphicElems[0]; // 현재 활성화된(visible클래스가 불튼) .graphic-item을 지정
  let ioIndex;

  // IntersectionObserver 호출
  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;
    console.log(ioIndex)
  });

  // 각 엘리먼트에 data-index 추가
  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]) // 모든 엘리먼트를 관찰대상으로 등록
    // stepElems[i].setAttribute('data-index', i);
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  function activate() {
    currentItem.classList.add('visible')
  }

  function deactivate() {
    currentItem.classList.remove('visible')
  }

  // 각 step의 위치를 파악하여 해당 step이 특정 구간에 들어오면 그에 맞는 이미지를 보여준다 
  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;
  
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      // 엘리먼트의 위치를 가져옴
      step = stepElems[i];
      if (!step) continue; // step에 값이 없으면 continue
      boundingRect = step.getBoundingClientRect();
      
      // 범위 설정
      const innerHeightCondition = 
        boundingRect.top > window.innerHeight * 0.1 && 
        boundingRect.top < window.innerHeight * 0.8
      
      if (innerHeightCondition) {
        const dataIndex = step.dataset.index;

        deactivate()
        currentItem = graphicElems[dataIndex]
        activate()
      }
    }
  });

  activate(); // 첫번째 아이템의 visible을 활성화시킴

})(); 