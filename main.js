(() => {
  // data-actions 함수들을actions객체의 메서드로 등록
  const actions = {
    birdFlies(key) {
      // 부모의 data-index가 2인 엘리먼트의 자식 중 bird클래스가 있는거 고름
      if (key) {
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`
      } else {
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`
      }
    },
    birdFlies2(key) {
      if (key) {
        document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`
      } else {
        document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`
      }
    }
  }
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

  function activate(action) {
    currentItem.classList.add('visible')
    if (action) {
      actions[action](true); // 문자열을 받아서 그에 해당하는 객체의 메서드를 호출할 수 있음
    }
  }

  function deactivate(action) {
    currentItem.classList.remove('visible')
    if (action) {
      actions[action](false)
    }
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

        deactivate(currentItem.dataset.action)
        currentItem = graphicElems[dataIndex]
        activate(currentItem.dataset.action)
      }
    }
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      scrollTo(0, 0); // x, y 둘다 0으로 해주자. 해당동작은 살짝 늦춰줘야 잘 동작한다!
    }, 100)
  })

  activate(); // 첫번째 아이템의 visible을 활성화시킴

})(); 