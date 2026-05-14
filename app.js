

function saveData() {
  localStorage.setItem(
    'warehouseData',
    JSON.stringify(warehouseData)
  );
}

function loadData() {
  const saved =
    localStorage.getItem('warehouseData');

  if (saved) {
    return JSON.parse(saved);
  }

  return null;
}

//const loadedData = loadData();

//if (loadedData) {
//  warehouseData = loadedData;
//}


const app = document.getElementById('app');

let currentStack = 0;

function renderHomePage() {
  app.innerHTML = `

    <header>
    <h1>
      <img src="b&q.png" width="200" height="200">
      DC2 AVLQ Check
      <img src="b&q.png" width="200" height="200">
    </h1>
    </header>

    <div class="button-container">
      <button class="button2" onclick="showAisle('SA')">SA</button>
      <button class="button2" onclick="showAisle('SB')">SBB</button>
      <button class="button2" onclick="showAisle('SC')">SC</button>
      <button class="button2" onclick="showAisle('SD')">SD</button>
      <button class="button2" onclick="showAisle('SE')">SE</button>

      <br>
      <button class="button3" onclick="showAisle('VA')">VA</button>
      <button class="button3" onclick="showAisle('VB')">VB</button>
      <button class="button3" onclick="showAisle('VC')">VC</button>

      <!--

      <button class="button4" class="export-btn" onclick="exportOption()">
        EXPORT EXCEL
      </button>
      -->

      <br>

      <button class="button4" onclick="resetData()">
        RESET DATA
      </button>
    </div>
  `;
}


function exportOption() {
  app.innerHTML = `
    <button class="back-btn" onclick="renderHomePage()">
      ← Back
    </button>

    <h2>Choose Which Aisles to Export</h2>

    <div class="button-container">
      <button onclick="exportToExcel('SA')">SA</button>
      <button onclick="exportToExcel('SB')">SB</button>
      <button onclick="exportToExcel('SC')">SC</button>
      <button onclick="exportToExcel('SD')">SD</button>
      <button onclick="exportToExcel('SE')">SE</button>

      <br>
      <button onclick="exportToExcel('VA')">VA</button>
      <button onclick="exportToExcel('VB')">VB</button>
      <button onclick="exportToExcel('VC')">VC</button>
      <br>
      <button onclick="exportToExcel('ALL')">ALL</button>


    </div>

  `;

}

function showAisle(aisle) {

  currentStack = 0;

  renderStack(aisle);
}

function renderStack(aisle) {

  if (aisle == "VA" || aisle == "VB" || aisle == "VC" ) {

    const leftStack = warehouseData[aisle][currentStack];
    const centerStack = warehouseData[aisle][currentStack + 1];
    const rightStack = warehouseData[aisle][currentStack + 2];

    app.innerHTML = `
      <div class="top-bar">
        <button class="back-btn" onclick="renderHomePage()">
          ← Main Menu
        </button>

        <div class="title-group">
          <h1>${aisle}</h1>
          <h2>select all that are empty</h2>
        </div>

      <div class="spacer"></div>
    </div>

    <div class="middle-row">

    <button class="next-btn" onclick="backStack('${aisle}')">
     BACK BUTTON
    </button>


      <div class="stacks-wrapper">

        <div class="stack-column">

        <div class="stack-container" id="leftStack"></div>

        <button
          class="stack-empty-btn"
          onclick="emptyStack('${aisle}', ${currentStack})"
        >
          EMPTY STACK
        </button>

      </div>

      <div class="stack-column">

        <div class="stack-container" id="centerStack"></div>

        <button
          class="stack-empty-btn"
          onclick="emptyStack('${aisle}', ${currentStack + 1})"
        >
          EMPTY STACK
        </button>
      </div>


      <div class="stack-column">

        <div class="stack-container" id="rightStack"></div>

        <button
          class="stack-empty-btn"
          onclick="emptyStack('${aisle}', ${currentStack + 2})"
        >
          EMPTY STACK
        </button>

      </div>


      </div>

      <button class="next-btn" onclick="nextStack('${aisle}')">
      NEXT BUTTON
      </button>
    </div>

  `;

    renderSingleStack(leftStack, 'leftStack', aisle);
    renderSingleStack(centerStack, 'centerStack', aisle);
    renderSingleStack(rightStack, 'rightStack', aisle);


  } else {

    const leftStack = warehouseData[aisle][currentStack];
    const rightStack = warehouseData[aisle][currentStack + 1];

  app.innerHTML = `
    <div class="top-bar">
        <button class="back-btn" onclick="renderHomePage()">
          ← Main Menu
        </button>
        <div class="title-group">
          <h1>${aisle}</h1>
          <h2>select all that are empty</h2>
        </div>

      <div class="spacer"></div>
    </div>


    <div class="middle-row">

     <button class="next-btn" onclick="backStack('${aisle}')">
     BACK BUTTON
      </button>

      <div class="stacks-wrapper">

        <div class="stack-column">

        <div class="stack-container" id="leftStack"></div>

        <button
          class="stack-empty-btn"
          onclick="emptyStack('${aisle}', ${currentStack})"
        >
          EMPTY STACK
        </button>

      </div>

      <div class="stack-column">

        <div class="stack-container" id="rightStack"></div>

        <button
          class="stack-empty-btn"
          onclick="emptyStack('${aisle}', ${currentStack + 1})"
        >
          EMPTY STACK
        </button>

      </div>

      </div>

    <button class="next-btn" onclick="nextStack('${aisle}')">
      NEXT BUTTON
    </button>


    </div>

  `;

    renderSingleStack(leftStack, 'leftStack', aisle);

    renderSingleStack(rightStack, 'rightStack', aisle);
  };


}



function renderSingleStack(stackData, containerId, aisle) {

  if (!stackData) return;

  const container =
    document.getElementById(containerId);

  stackData.forEach(item => {

    const div = document.createElement('div');

    div.className = 'rack-card';

    div.innerHTML = `

      <button class="
        status-btn
        ${item.empty ? 'empty-btn' : 'full-btn'}
      ">
        ${item.empty ? 'EMPTY' : 'FULL'}
      </button>

      <h3>${item.location}</h3>
    `;

    const statusButton =
      div.querySelector('.status-btn');

    statusButton.addEventListener('click', () => {

      item.empty = !item.empty;

      //save
      saveData();  


      renderStack(aisle);
    });

    container.appendChild(div);
  });
}





function nextStack(aisle) {
  if (aisle == "VA" || aisle == "VB" || aisle == "VC") {
    currentStack += 3;
  } else {
    currentStack += 2;
  }

  if (
    currentStack >= warehouseData[aisle].length
  ) {

    exportToExcel(aisle)

    app.innerHTML = `
    <div class="top-bar">
        <button class="back-btn" onclick="renderHomePage()">
          ← Main Menu
        </button>

      <div class="spacer"></div>
    </div>

    <div class="complete-message">
        ✅ Everything in ${aisle} has been checked
      </div>

    <div class="complete-message">
        File Saved In Downloads Folder
      </div>

    <div class="center-button">
      <button class="next-btn" onclick="backStack('${aisle}')">
      BACK BUTTON
      </button>
    </div>
    `
    return;

  }

  renderStack(aisle);
}


function backStack(aisle) {
  if (aisle == "VA" || aisle == "VB" || aisle == "VC") {
    currentStack -= 3;
  } else {
    currentStack -= 2;
  }

  if (currentStack < 0) {
    currentStack = 0;
  }

  renderStack(aisle);
}


function emptyStack(aisle, stackIndex) {

  const stack =
    warehouseData[aisle][stackIndex];

  if (!stack) return;

  stack.forEach(item => {
    item.empty = true;
  });

  saveData();

  renderStack(aisle);
}


function exportToExcel(aisle) {

  const now = new Date();

  const timestamp =
    String(now.getDate()).padStart(2, "0") +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    now.getFullYear() +
    "_" +
    String(now.getHours()).padStart(2, "0") +
    "." +
    String(now.getMinutes()).padStart(2, "0")



  if (aisle == "ALL") {
    const workbook = XLSX.utils.book_new();

    Object.keys(warehouseData).forEach(aisle => {

      const rows = [];

      warehouseData[aisle].forEach(stack => {

        stack.forEach(item => {

          rows.push({
            Location: item.location,
            Status: item.empty ? 'EMPTY' : 'FULL'
          });
        });
      });

      const worksheet =
        XLSX.utils.json_to_sheet(rows);

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        aisle
      );
    });

    XLSX.writeFile(
      workbook,
      `AVQL-ALL-${timestamp}.xlsx`
    );
    
  } else {
    const workbook = XLSX.utils.book_new();

    const rows = [];

      warehouseData[aisle].forEach(stack => {

        stack.forEach(item => {

          rows.push({
            Location: item.location,
            Status: item.empty ? 'EMPTY' : 'FULL'
          });
        });
      });

    const worksheet =
      XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        aisle
      );

    XLSX.writeFile(
      workbook,
      `AVQL-${aisle}-${timestamp}.xlsx`
    );

  }

}


function resetData() {

  const confirmed = confirm(
    'Reset all warehouse data?'
  );

  if (!confirmed) return;

  localStorage.removeItem('warehouseData');

  warehouseData = structuredClone(defaultWarehouseData);

  saveData();

  renderHomePage();
}


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker Registered'));
}


renderHomePage();