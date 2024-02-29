const pexelsUrl = "https://api.pexels.com/v1/search?query=";
const APIkey = "LQqt4JR8J3j2BIIV9Vb7xCj7zfqsYDNLtDYe8bo5obIudBdOXDBPKgmD";

const removeCol = function (context) {
  let rightColDelete = context.closest(".col-md-4");
  rightColDelete.remove();
};

const displayCards = function (photos) {
  let row = document.querySelector(".album .container .row");
  row.innerHTML = "";
  photos.forEach((photo) => {
    let colTemplate = `
      <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
          <a href="./pexels-details.html?photoId=${photo.id}">
              <img src=${photo.src.small}} style="width: 100%" height= "400" width="200"/>
          </a>
              <div class="card-body">
              <a href="./pexels-details.html?photoId=${photo.id}">
                  <h5 class="card-title">Lorem Ipsum</h5>
              </a>
                  <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                  </p>
                  <div
                  class="d-flex justify-content-between align-items-center"
                  >
                  <div class="btn-group">
                      <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onclick="fillImageModal(this)"
                      >
                          View
                      </button>
                      <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                      onclick="removeCol(this)"
                      >
                      Hide
                      </button>
                  </div>
                  <small class="text-muted">${photo.id}</small>
                  </div>
              </div>
          </div>
      </div>
      `;
    row.innerHTML += colTemplate;
  });
};

const getImages = function (query) {
  fetch(pexelsUrl + query, {
    headers: {
      authorization: APIkey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error to get the images");
      }
    })
    .then((data) => {
      console.log(data);
      displayCards(data.photos);
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = function () {
  let primaryButton = document.querySelector(".btn-primary");
  primaryButton.addEventListener("click", () => {
    getImages("faroe island");
  });

  let secondaryButton = document.querySelector(".btn-secondary");
  secondaryButton.addEventListener("click", () => {
    getImages("mountains");
  });
};
