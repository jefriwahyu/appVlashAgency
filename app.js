const list = document.querySelector(".list");
const namaDepan = document.getElementById("nama-depan");
const namaBelakang = document.getElementById("nama-belakang");
const email = document.getElementById("email");
const avatar = document.getElementById("avatar");
const addData1 = document.querySelector(".tambah-karyawan");

const url = "https://reqres.in/api/users";

const renderPost = (posts) => {
  list.addEventListener("click", (e) => {
    e.preventDefault();
  });
  const output = posts.data
    .map((el) => {
      return `
    
    <tr>
      <td>
        <div class="flex items-center justify-center py-4">
          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
              <img class="rounded-full" src="${el.avatar}" alt="image" />
            </div>
          </div>
        </div>
      </td>
      <td>
        </div>
          <div class="data font-bold">${el.first_name} ${el.last_name}</div>
        </div>
      </td>
      </td>
      <td>
        <div class="justify-center">
          <p class="flex justify-center">${el.email}</p>
        </div>
      </td>
      <td >
       <div>
         <button for"tw-modal" onclick="editData(${el.id},'${el.first_name}', '${el.last_name}', '${el.email}')" id="edit" class="rounded text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Edit</button>
        </div>
      </td>
      <td >
         <button onclick="deleteData(${el.id}); deleteRow(this);" id="delete" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Delete</button>
       </td>
    </tr>

    `;
    })
    .join("");
  list.innerHTML = output;
};

function getAllData() {
  fetch(url)
    .then((res) => res.json())
    .then((result) => renderPost(result));
}

getAllData();
// Create - Tambah Data Karyawan

function addData() {
  addData1.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      first_name: namaDepan.value,
      last_name: namaBelakang.value,
      // avatar: avatar.value
    }),
  })
    .then((res) => res.json())
    .then((result) => console.log(result));
}

function addDataNow() {
  addData1.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const namaDepan2 = document.getElementById("nama-depan").value;
  const namaBelakang2 = document.getElementById("nama-belakang").value;
  const email2 = document.getElementById("email").value;

  list.innerHTML += `
    <tr>
      <td>
        <div class="flex items-center justify-center py-4">
          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
              <img class="rounded-full" src="https://randomuser.me/api/portraits/men/${
                Math.floor(Math.random() * 90) + 1
              }.jpg" alt="image" />
            </div>
          </div>
        </div>
      </td>
      <td>
          <div>
            <div class="font-bold">${namaDepan2} ${namaBelakang2}</div>
          </div>     
      </td>
      <td >
        <div class="justify-center">
          <p class="flex justify-center">${email2}</p>
        </div>
      </td>
      <td >
      <div>
        <button onclick="" id="edit" class="cursor-pointer rounded text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Edit</button>
        </div>
      </td>
      <td >
        <button onclick="deleteRow(this);" id="delete" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Delete</button>
      </td>
  </tr>
  `;
}

function editData(uid, nama1, nama2, email1) {
  document.getElementById("nama-depan").value = nama1;
  document.getElementById("nama-belakang").value = nama2;
  document.getElementById("email").value = email1;
  document.getElementById("id").value = uid;
}

function saveData() {
  addData1.addEventListener("submit", (e) => {
    e.preventDefault();
    const uid = document.getElementById("id").value;
    const namaD1 = document.getElementById("nama-depan").value;
    const namaB1 = document.getElementById("nama-belakang").value;
    const emailD1 = document.getElementById("email").value;

    const dataUpdate = {
      first_name: namaD1,
      last_name: namaB1,
      email: emailD1,
    };

    fetch(`${url}/${uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdate),
    })
      .then((res) => res.json())
      .then((data) => console.log(alert("DATA BERHASIL DI SIMPAN")));
  });
}

function deleteData(uid) {
  fetch(`${url}/${uid}`, {
    method: "DELETE",
  }).then((res) => console.log(res));
}

function deleteRow(e) {
  var row = e.parentNode.parentNode;
  row.parentNode.removeChild(row);
  console.log("DATA BERHASIL DI HAPUS");
}

function clearText() {
  namaDepan.value = "";
  namaBelakang.value = "";
  email.value = "";
}