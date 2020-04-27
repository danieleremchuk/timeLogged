const btnColor = document.createElement("button");
btnColor.innerHTML = "Show Color";
btnColor.className = ".btn-default Searchbtn";
const body = document.getElementsByTagName("body")[0];

const titlebar = document.querySelector("td.TitleBarText.page-header");
const title = titlebar.innerText;

if (titlebar !== null) {
  let toggleClr = true;
  if (title === "Weekly Summary Report") {
    body.appendChild(btnColor);
    btnColor.addEventListener("click", function () {
      toggleClr ? newBgColor() : undoBgColor();
      toggleClr = !toggleClr;

    });
  }
  if (title === "Monthly Summary Report") {
    body.appendChild(btnColor);
    btnColor.addEventListener("click", function () {
      toggleClr ? newBgColor() : undoBgColor();
      toggleClr = !toggleClr;

    });
  }
}

const btnPerc = document.createElement("button");
btnPerc.innerHTML = "Show %";
btnPerc.className = ".btn-default Searchbtn";

if (titlebar !== null) {
  let toggle = true;
  if (title === "Weekly Summary Report") {
    body.appendChild(btnPerc);
    btnPerc.addEventListener("click", function () {
      toggle ? funAdd() : funRemove();
      toggle = !toggle;
    });
  }
  if (title === "Monthly Summary Report") {
    body.appendChild(btnPerc);
    btnPerc.addEventListener("click", function () {
      toggle ? funAdd() : funRemove();
      toggle = !toggle;
    });
  }
}

function newBgColor() {
  if (title === "Weekly Summary Report") {
    let logRow = document.getElementById("11_0");
    let logCell = logRow.cells;
    for (i = 0; i < logCell.length; i++) {
      let num = Number(logCell[i].innerText);
      let currentBg = logCell[i].style.backgroundColor;
      let percent = (num / 480) * 100;
      if (percent >= 90) {
        logCell[i].style.backgroundColor = "#A9DFBF";
      } else if (percent < 90 && percent >= 80) {
        logCell[i].style.backgroundColor = "#F9E79F";
      } else if (percent < 80 && percent > 0) {
        logCell[i].style.backgroundColor = "#E6B0AA";
      }
      btnColor.className = ".btn-default";
      btnColor.innerHTML = "Hide Color";
    }
  } else if (title === "Monthly Summary Report") {
    const row = document.getElementsByTagName("td")

    for (i = 0; i < row.length; i++) {
      const child = row[i].lastElementChild;
      if (child !== null) {
        if (row[i].className === "" && child.className === "INP") {
          let num = Number(row[i].innerText.trim());
          let percent = Math.round((num / 480) * 100);
          if (percent >= 90) {
            row[i].bgColor = "#A9DFBF";
          } else if (percent < 90 && percent >= 80) {
            row[i].bgColor = "#F9E79F";
          } else if (percent < 80 && percent > 0) {
            row[i].bgColor = "#E6B0AA";
          }
        }
      }
      btnColor.className = ".btn-default";
      btnColor.innerHTML = "Hide Color";
    }
  }
}

function undoBgColor() {
  if (title === "Weekly Summary Report") {
    const logRow = document.getElementById("11_0");
    const logCell = logRow.cells;
    for (i = 0; i < logCell.length; i++) {
      logCell[i].style.backgroundColor = "";
    }
  } else if (title === "Monthly Summary Report") {
    const row = document.getElementsByTagName("td");
    for (i = 0; i < row.length; i++) {
      let child = row[i].lastElementChild;
      if (child !== null) {
        if (row[i].className === "" && child.className === "INP") {
          row[i].bgColor = "";
        }
      }
    }
  }
  btnColor.className = ".btn-default Searchbtn";
  btnColor.innerHTML = "Show Color";
}

function funRemove() {
  removeRow();
  removeTotal();
  btnPerc.className = ".btn-default Searchbtn";
  btnPerc.innerHTML = "Show %";
}

function funAdd() {
  showPercent();
  btnPerc.className = ".btn-default";
  btnPerc.innerHTML = "Hide %";
}

function getSumMin() {
  let logWeek = document.getElementById("11_0").cells;
  let sum = 0;
  for (i = 0; i < logWeek.length - 1; i++) {
    sum += Number(logWeek[i].innerText.trim());
  }
  return sum;
}

function getAvgPerc() {
  const sumMin = getSumMin();
  const days = 5;
  let logWeekPerc = document.getElementById("11_0").cells;
  let avg = 0;
  if (sumMin !== 0) {
    avg = (sumMin / (days * 480));
  }
  percAvg = Math.round(avg * 100);

  return percAvg;
}

// Create new row to show percentages
function cloneRow() {
  if (title === "Weekly Summary Report") {
    let row = document.getElementById("11_0");
    let table = document.getElementById("tab1");
    let clone = row.cloneNode(true);
    clone.id = "percentage";
    table.appendChild(clone);
  } else if (title === "Monthly Summary Report") {
    //insert header cell 
    let header = document.getElementById("10_0");
    let th = document.createElement("th");
    th.className = " NOBRD ";
    th.style = " min-width:5.0px;max-width:5.0px; word-wrap: break-word;  white-space:normal; ";
    th.innerText = "Time (Percentage)";
    header.append(th);
    let row = document.getElementsByTagName("td");
    //insert cell at end of table
    for (i = 0; i < row.length; i++) {
      let child = row[i].lastElementChild;
      if (child !== null) {
        if (row[i].className === "" && child.className === "INP") {
          let timeRow = row[i].parentElement;
          let timeCell = timeRow.insertCell(-1);
          timeCell.className = "percentage";
          timeCell.style = "min-width:5.0px;  max-width:5.0px;  word-wrap: break-word;  white-space:normal; ";
          timeCell.align = "CENTER";
        }
      }
    }
  }
}

function showPercent() {
  if (title === "Weekly Summary Report") {
    let row = document.getElementById("percentage");
    if (row !== null) {
      let cell = row.cells;
      for (i = 0; i < cell.length - 1; i++) {
        let cellId = cell[i].id;
        let rawText = cell[i].innerText;
        let num = Number(cell[i].innerText);
        let percent = Math.trunc((num / 480) * 100);
        if (rawText.indexOf("%") > -1) {
          cell[i].innerText = cell[i].innerText;
        } else {
          cell[i].innerText = percent + "%";
        }
      }
      if (row.cells[row.cells.length - 1].id !== "totalPerc") {
        addTotal();
      }
    } else if (row == null) {
      cloneRow();
      let row = document.getElementById("percentage");
      cell = row.cells;
      for (i = 0; i < cell.length; i++) {
        let rawText = cell[i].innerText;
        let num = Number(cell[i].innerText);
        let percent = Math.trunc((num / 480) * 100);
        if (rawText.indexOf("%") > -1) {
          cell[i].innerText = cell[i].innerText;
        } else {
          cell[i].innerText = percent + "%";
        }
      }
      addTotal();
    }
  } else if (title === "Monthly Summary Report") {
    const perc = document.getElementsByClassName("percentage");
    if (perc.length > 0) {
      for (i = 0; i < perc.length; i++) {
        let rawText = perc[i].innerText;
        let percPar = perc[i].parentElement;
        let percCh = percPar.children[2];
        let time = percCh.innerText.trim();
        let percent = Math.round((Number(time) / 480) * 100);
        perc[i].innerText = percent + "%";
      }
      if (perc[perc.length - 1].parentElement.id !== "totalRow") {
        addTotal();
      }
    } else if (perc.length === 0) {
      cloneRow();
      for (i = 0; i < perc.length; i++) {
        let rawText = perc[i].innerText;
        let percPar = perc[i].parentElement;
        let percCh = percPar.children[2];
        let time = percCh.innerText.trim();
        let percent = Math.round((Number(time) / 480) * 100);
        perc[i].innerText = percent + "%";
      }
    }
    addTotal();
  }
}

function addTotal() {
  if (title === "Weekly Summary Report") {
    // Add header cell after last cell in row
    let rowHd = document.getElementById("10_0");
    let cellHd = rowHd.cells[rowHd.cells.length - 1];
    let cloneHd = cellHd.cloneNode(true);
    if (cellHd.id !== "totalHd") {
      cloneHd.id = "totalHd";
      rowHd.appendChild(cloneHd);
      cloneHd.innerText = "Total Time";
    }
    // Add totals cell after last cell on "minutes" row
    let rowMin = document.getElementById("11_0");
    let cellMin = rowMin.cells[rowMin.cells.length - 1];
    let clone = cellMin.cloneNode(true);
    if (cellMin.id !== "totalMin") {
      clone.id = "totalMin";
      rowMin.appendChild(clone);
      clone.innerText = getSumMin();
    }
    // Add totals cell after last cell on "percentage" row
    let rowPerc = document.getElementById("percentage");
    let cellPerc = rowPerc.cells[rowPerc.cells.length - 1];
    let clonePerc = cellPerc.cloneNode(true);
    if (cellPerc.id !== "totalPerc") {
      clonePerc.id = "totalPerc";
      rowPerc.appendChild(clonePerc);
      clonePerc.innerText = getAvgPerc() + "%";
    }
  } else if (title === "Monthly Summary Report") {
    let minTab = document.getElementById("tab1");
    let minRow = minTab.rows;
    let sumMin = 0;
    let daysMin = 0;
    for (i = 5; i < minRow.length; i++) {
      let minutes = Number(minRow[i].cells[2].innerText.trim());
      sumMin += minutes;
      daysMin = daysMin + 1;
    }
    let totalMin = Math.round(sumMin / (daysMin * 480) * 100);
    let row = document.getElementsByTagName("td");
    let timeRow;
    for (i = 0; i < row.length; i++) {
      let child = row[i].lastElementChild;
      if (child !== null) {
        if (row[i].className === "" && child.className === "INP") {
          timeRow = row[i].parentElement;
        }
      }
    }
    //clone row and update values (need to get calculations of time and average percent)
    let newRow = timeRow;
    let table = document.getElementById("tab1");
    let clone = newRow.cloneNode(true);
    clone.id = "totalRow";
    if (timeRow.className === "Shadow") {
      clone.className = "Light";
    } else if (timeRow.className === "Light") {
      clone.className = "Shadow";
    }
    table.appendChild(clone);
    let totalRow = document.getElementById("totalRow");
    for (t = 0; t < totalRow.cells.length; t++) {
      let cell = totalRow.cells;
      if (cell[t].className !== "vHide" && cell[t].className === "") {
        let time = cell[t].innerText;
        time = sumMin;
        cell[t].innerText = time;
      }
      if (cell[t].className !== "vHide" && cell[t].className === "fvc") {
        let date = cell[t].innerText;
        date = "Total for the Month";
        cell[t].innerText = date;
      }
      if (cell[t].className === "percentage") {
        let percent = cell[t].innerText;
        percent = totalMin;
        cell[t].innerText = percent + "%";
      }
    }
  }
}

function removeRow() {
  if (title === "Weekly Summary Report") {
    let delRow = document.getElementById("percentage");
    let table = document.getElementById("tab1");
    table.removeChild(delRow);
  } else if (title === "Monthly Summary Report") {
    let minTab = document.getElementById("tab1");
    let minRow = minTab.rows;
    for (i = 5; i < minRow.length; i++) {
      minRow[i].deleteCell(minRow[i].cells.length - 1);
    }
  }
}

function removeTotal() {
  if (title === "Weekly Summary Report") {
    let delMin = document.getElementById("11_0");
    let minIndex = delMin.cells.length - 1;
    delMin.deleteCell(minIndex);
    let delHd = document.getElementById("10_0");
    let headIndex = delHd.cells.length - 1;
    delHd.deleteCell(headIndex);
  } else if (title === "Monthly Summary Report") {
    let delRow = document.getElementById("totalRow");
    let delTab = document.getElementById("tab1");
    delTab.deleteRow(delRow.rowIndex);
    let delHd = document.getElementById("10_0");
    let headIndex = delHd.cells.length - 1;
    delHd.deleteCell(headIndex);
  }
}