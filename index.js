let formSearch = document.querySelector("#formsearch");
let form = document.querySelector("#form");
let notFound = document.querySelector("#hello");
let searchmain = document.querySelector("#main2");
let database = JSON.parse(window.localStorage.myitems || "[]");
let main = document.querySelector("#main");
let modal = document.querySelector("#mydiv");
let formedit = document.querySelector("#formedit");
let updatenote = document.querySelector("#updatenote"),
  updatedate = document.querySelector("#updatedate"),
  updatetime = document.querySelector("#updatetime");
form.addEventListener("submit", e => {
  e.preventDefault();
  let note = document.querySelector("#note").value;
  if (!note.trim()) {
    Swal.fire({
      title: "<i>To do</i>",
      html: "<b>pls input a valid data</b>"
    });
    setTimeout(() => {
      location.reload();
    }, 1000);
  } else {
    let data = {
      id: Date.now(),
      content: note,
      timestamp:new Date().toGMTString()
    };
    database.push(data);
    store(JSON.stringify(database));
    Swal.fire({
      title: "<i>To do</i>",
      html: "<b>successfully created</b>"
    });
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
});

formSearch.addEventListener("submit", e => {
  e.preventDefault();
  let search = document.querySelector("#search").value;
  database.filter(element => {
    if (element.content.startsWith(search)) {
      searchmain.innerHTML += `  <p>note: ${element.content}  </p>
        <p> date: ${element.timestamp}</p>
        `;
    }
  });
});

function display() {
  let count = 0;
  database.forEach(element => {
    main.innerHTML += `
    <p class="pt  border-secondary p-2">note: ${element.content}  </p>
    <p class="pt1"> time: ${element.timestamp}</p>
    <button class="btn btn-danger pts" id="${element.id}" data-id="delete">delete</button>
    <button class="btn btn-warning pts2" id="${element.id}" data-id="update" >edit</button>
    `;
  });
}

display();

function store(params) {
  window.localStorage.myitems = params;
}

document.querySelector(".doadd").addEventListener("click", myfunction);

function myfunction(e) {
  if (e.target.classList.contains("pts")) {
    let mynewarray = database.filter(val => {
      return val.id != e.target.id;
    });

    store(JSON.stringify(mynewarray));
    Swal.fire({
      title: "<i>To do</i>",
      html: "<b>successfully deleted</b>",
      confirmButtonText: "<u>ok</u>"
    });
    setTimeout(() => {
      location.reload();
    }, 2000);
  } else if (e.target.classList.contains("pts2")) {
    document.querySelector("#note").value;
    database.filter((val, i) => {
      if (val.id == e.target.id) {
        let formedit = document.querySelector("#formedit");
        updatenote.value = val.content;
        modal.style.display = "block";
        updatenote.focus();
        formedit.addEventListener("submit", e => {
          e.preventDefault();
          let data = {
            id: Date.now(),
            content: updatenote.value,
            timestamp:new Date().toGMTString(),
           
          };
          // console.log(data);

          database.splice(i, 1, data);

          store(JSON.stringify(database));
          display();
          Swal.fire({
            title: "<i>To do</i>",
            html: "<b>successfully updated</b>",
            confirmButtonText: "<u>ok</u>"
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        });
      }
    });
  }
}
