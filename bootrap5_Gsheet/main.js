const resultData = [];
elem = {
  navMenu: document.getElementById('navbarCollapse'),
  slideElem: document.getElementById('part-slide'),
  slideBtn: document.querySelector('.carousel-indicators'),
  marketingElem: document.getElementById('marketing'),
  futereElem: document.getElementById('futere'),
};

async function getData() {
  const sheetName = [
    'sheet_menu',
    'sheet_slide',
    'sheet_marketing',
    'sheet_futere',
  ];
  const idSheet = '1XOuvSLWT84njH2svmZ1Upc_pV_RUF2lsoeyhsB2XYkE';
  const kunc = 'AIzaSyBTpbphIeN4O0OsoqWjzsfBVAmi8-rFEek';
  // const range = `${sheet}!A2:F5`;
  // const url = `https://sheets.googleapis.com/v4/spreadsheets/${idSheet}/values/${range}?key=${kunc}`;

  const da = await Promise.all(
    sheetName.map((sheet) =>
      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${idSheet}/values/${sheet}!A2:F10?key=${kunc}`
      ).then((resp) => resp.json())
    )
  ).then((res) => res);

  da.forEach((val) => {
    resultData.push(val.values);
  });
}

// async function getData(sheet = 'sheet_menu') {
//   const idSheet = '1XOuvSLWT84njH2svmZ1Upc_pV_RUF2lsoeyhsB2XYkE';
//   const range = `${sheet}!A2:F5`;
//   const kunc = 'AIzaSyBTpbphIeN4O0OsoqWjzsfBVAmi8-rFEek';
//   const url = `https://sheets.googleapis.com/v4/spreadsheets/${idSheet}/values/${range}?key=${kunc}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   // resultData.push(data.values);
//   console.log(data);
// }

async function menu() {
  let ele = '';
  resultData[0].forEach((val) => {
    ele += `
      <li class="nav-item">
      <a class="nav-link" href="${val[1]}">${val[0]}</a>
      </li>
      `;
  });
  elem.navMenu.firstElementChild.innerHTML = ele;
}

async function slide() {
  let ele = '';
  let eleSlide = '';
  resultData[1].forEach((val, ind) => {
    if (ind === 0) {
      ele += `
              <div class="carousel-item active">
              <img src="${val[4]}" alt="" 
              class="bd-placeholder-img"
              width="100%"
              height="100%"
            >
              // <svg
              //   class="bd-placeholder-img"
              //   width="100%"
              //   height="100%"
              //   xmlns="http://www.w3.org/2000/svg"
              //   aria-hidden="true"
              //   preserveAspectRatio="xMidYMid slice"
              //   focusable="false"
              // >
              //  <rect width="100%" height="100%" fill="#777" />
              //</svg>

              <div class="container">
                <div class="carousel-caption text-start">
                  <h1>${val[0]}</h1>
                  <p>
                  ${val[1]}
                  </p>
                  <p>
                    <a class="btn btn-lg btn-primary" href="${val[3]}">${val[2]}</a>
                  </p>
                </div>
              </div>
            </div>`;
    } else {
      ele += `
              <div class="carousel-item">
              <img src="${val[4]}" alt=""
              class="bd-placeholder-img"
                width="100%"
                height="100%"
              >
              // <svg
              //   class="bd-placeholder-img"
              //   width="100%"
              //   height="100%"
              //   xmlns="http://www.w3.org/2000/svg"
              //   aria-hidden="true"
              //   preserveAspectRatio="xMidYMid slice"
              //   focusable="false"
              // >
              //   <rect width="100%" height="100%" fill="#777" />
              // </svg>

              <div class="container">
                <div class="carousel-caption text-start">
                  <h1>${val[0]}</h1>
                  <p>
                  ${val[1]}
                  </p>
                  <p>
                    <a class="btn btn-lg btn-primary" href="${val[3]}">${val[2]}</a>
                  </p>
                </div>
              </div>
            </div>`;
    }
  });

  for (let i = 0; i < resultData[1].length; i++) {
    if (i === 0) {
      eleSlide += `
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="${i}"
              class="active"
              aria-current="true"
              aria-label="Slide ${i}">
            </button>
      
      `;
    } else {
      eleSlide += `
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="${i}"
            aria-label="Slide 2">
          </button>
`;
    }
  }
  // console.log(eleSlide);
  elem.slideElem.innerHTML = ele;
  elem.slideBtn.innerHTML = eleSlide;
}
async function marketing() {
  let ele = '';
  resultData[2].forEach((val, ind) => {
    if (ind >= 0) {
      ele += `
            <div class="col-lg-4">
            <img src="${val[4]}" alt=""
            class="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              preserveAspectRatio="xMidYMid slice"
              focusable="false" >
            
            <h2>${val[1]}</h2>
            <p>
            ${val[2]}
            </p>
            <p>
              <a class="btn btn-secondary" href="${val[4]}">View details &raquo;</a>
            </p>
          </div>
            `;
    }
  });
  elem.marketingElem.innerHTML = ele;
}

async function futere() {
  let ele = '';
  resultData[3].forEach((val, ind) => {
    if (ind % 2 === 0) {
      ele += `
            <div class="row featurette">
            <div class="col-md-7">
              <h3 class="featurette-heading">
              ${val[0]}
                <span class="text-muted">${val[1]}</span>
              </h3>
              <p class="lead">
              ${val[2]}
              </p>
            </div>
            <div class="col-md-5">
            <img src="${val[4]}" alt=""
            class="
            bd-placeholder-img bd-placeholder-img-lg
            featurette-image
            img-fluid
            mx-auto"
          width="500"
          height="500"
            >
              
            </div>
          </div>

          <hr class="featurette-divider" />

            `;
    } else {
      ele += `
      <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">
        ${val[0]}
          <span class="text-muted">${val[1]}</span>
        </h2>
        <p class="lead">
        ${val[2]}
        </p>
      </div>
      <div class="col-md-5">
      <img src="${val[4]}" alt=""
      class="
      bd-placeholder-img bd-placeholder-img-lg
      featurette-image
      img-fluid
      mx-auto"
      width="500"
      height="500"
      >
      </div>
    </div>

    <hr class="featurette-divider" />`;
    }
  });
  elem.futereElem.innerHTML = ele;
}

async function runApp() {
  await getData();
  menu();
  slide();
  marketing();
  futere();
  // console.log(resultData);
}

runApp();
