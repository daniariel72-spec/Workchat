/* =========================
   WORKCHAT 1.0
========================= */


/* =========================
   NAVIGATION
========================= */

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-button");
const pageButtons = document.querySelectorAll("[data-page-button]");

function openPage(pageName) {

  pages.forEach(page => {
    page.classList.remove("active-page");
  });

  const target = document.getElementById(pageName + "Page");

  if (target) {
    target.classList.add("active-page");
  }

  navButtons.forEach(button => {

    if (button.dataset.page === pageName) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }

  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


navButtons.forEach(button => {

  button.addEventListener("click", () => {

    openPage(button.dataset.page);

  });

});


pageButtons.forEach(button => {

  button.addEventListener("click", () => {

    openPage(button.dataset.pageButton);

  });

});


/* =========================
   THEME
========================= */

const themeButton = document.getElementById("themeButton");

const savedTheme = localStorage.getItem("workchat-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeButton.textContent = "☀";
}

themeButton.addEventListener("click", () => {

  document.body.classList.toggle("light");

  const light = document.body.classList.contains("light");

  localStorage.setItem(
    "workchat-theme",
    light ? "light" : "dark"
  );

  themeButton.textContent = light ? "☀" : "☾";

});


/* =========================
   MODAL
========================= */

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

function showModal(title, content) {

  modalTitle.textContent = title;
  modalBody.innerHTML = content;

  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", event => {

  if (event.target === modal) {
    modal.classList.add("hidden");
  }

});


/* =========================
   VIDEO EDITOR
========================= */

const videoInput = document.getElementById("videoInput");
const videoPreview = document.getElementById("videoPreview");
const editorStatus = document.getElementById("editorStatus");

videoInput.addEventListener("change", event => {

  const file = event.target.files[0];

  if (!file) return;

  const videoURL = URL.createObjectURL(file);

  videoPreview.innerHTML = `
    <video
      src="${videoURL}"
      controls
      style="width:100%;height:100%;object-fit:contain;border-radius:15px;"
    ></video>
  `;

  editorStatus.textContent =
    "Видео загружено: " + file.name;

});


document.getElementById("trimButton").addEventListener("click", () => {

  showModal(
    "✂️ Обрезка",
    `
      <p>
        Это первая версия редактора.
      </p>

      <p style="margin-top:10px;color:#9b9ba8;">
        Настоящая обрезка и экспорт видео будут
        добавлены следующим этапом.
      </p>
    `
  );

});


document.getElementById("textButton").addEventListener("click", () => {

  showModal(
    "🔤 Текст",
    `
      <input
        id="editorTextInput"
        type="text"
        placeholder="Введите текст"
        style="
          width:100%;
          padding:12px;
          background:#0b0b10;
          color:white;
          border:1px solid #282833;
          border-radius:10px;
        "
      >

      <button
        id="saveEditorText"
        class="primary-button"
        style="margin-top:12px;"
      >
        Добавить
      </button>
    `
  );


  document
    .getElementById("saveEditorText")
    .addEventListener("click", () => {

      const text =
        document.getElementById("editorTextInput").value.trim();

      if (!text) return;

      editorStatus.textContent =
        "Добавлен текст: " + text;

      modal.classList.add("hidden");

    });

});


document
  .getElementById("musicToVideoButton")
  .addEventListener("click", () => {

    showModal(
      "🎵 Музыка",
      `
        <p>
          Выбери трек из музыкального раздела
          для будущего проекта.
        </p>
      `
    );

  });


/* =========================
   MUSIC
========================= */

let tracks =
  JSON.parse(localStorage.getItem("workchat-tracks")) || [];

const audioInput = document.getElementById("audioInput");
const audioPlayer = document.getElementById("audioPlayer");
const trackList = document.getElementById("trackList");
const currentTrack = document.getElementById("currentTrack");
const currentArtist = document.getElementById("currentArtist");
const albumCount = document.getElementById("albumCount");
const trackStat = document.getElementById("trackStat");


function saveTracks() {

  /*
    Важно:
    локальные File/Blob нельзя нормально сохранять
    в localStorage между сессиями.

    Поэтому здесь сохраняются названия треков
    для демонстрационного прототипа.
  */

  localStorage.setItem(
    "workchat-tracks",
    JSON.stringify(
      tracks.map(track => ({
        name: track.name
      }))
    )
  );

}


function renderTracks() {

  trackList.innerHTML = "";

  if (tracks.length === 0) {

    trackList.innerHTML = `
      <p class="empty-state">
        Пока нет треков.
      </p>
    `;

  } else {

    tracks.forEach((track, index) => {

      const element =
        document.createElement("div");

      element.className = "track";

      element.innerHTML = `
        <div class="track-icon">
          🎵
        </div>

        <div class="track-info">
          <strong>${escapeHTML(track.name)}</strong>
          <span>WORKCHAT Creator</span>
        </div>

        <button
          class="track-play"
          data-track-index="${index}"
        >
          ▶
        </button>
      `;

      trackList.appendChild(element);

    });

  }

  albumCount.textContent =
    tracks.length +
    (tracks.length === 1 ? " трек" : " треков");

  trackStat.textContent = tracks.length;


  document
    .querySelectorAll(".track-play")
    .forEach(button => {

      button.addEventListener("click", () => {

        const index =
          Number(button.dataset.trackIndex);

        playTrack(index);

      });

    });

}


function playTrack(index) {

  const track = tracks[index];

  if (!track) return;

  currentTrack.textContent = track.name;
  currentArtist.textContent = "WORKCHAT Creator";

  if (track.url) {

    audioPlayer.src = track.url;

    audioPlayer.play().catch(() => {});

  }

}


audioInput.addEventListener("change", event => {

  const file = event.target.files[0];

  if (!file) return;

  const url = URL.createObjectURL(file);

  tracks.push({
    name: file.name,
    url: url
  });

  saveTracks();
  renderTracks();

});


document
  .getElementById("clearMusicButton")
  .addEventListener("click", () => {

    tracks = [];

    localStorage.removeItem("workchat-tracks");

    audioPlayer.pause();
    audioPlayer.removeAttribute("src");

    renderTracks();

  });


renderTracks();


/* =========================
   CHATS
========================= */

let chats =
  JSON.parse(localStorage.getItem("workchat-chats")) || [

    {
      id: 1,
      name: "🎬 Монтаж",
      members: 1,
      messages: [
        {
          user: "WORKCHAT",
          text: "Добро пожаловать в чат!"
        }
      ]
    },

    {
      id: 2,
      name: "🎵 Музыка",
      members: 1,
      messages: [
        {
          user: "WORKCHAT",
          text: "Обсуждаем создание музыки."
        }
      ]
    }

  ];


const chatList = document.getElementById("chatList");
const chatRoom = document.getElementById("chatRoom");
const messages = document.getElementById("messages");
const roomTitle = document.getElementById("roomTitle");
const roomMembers = document.getElementById("roomMembers");

let currentChat = null;


function saveChats() {

  localStorage.setItem(
    "workchat-chats",
    JSON.stringify(chats)
  );

}


function renderChats() {

  chatList.innerHTML = "";

  chats.forEach(chat => {

    const item =
      document.createElement("div");

    item.className = "chat-item";

    item.innerHTML = `
      <div>
        <strong>${escapeHTML(chat.name)}</strong>
      </div>

      <span>
        ${chat.members}/40
      </span>
    `;

    item.addEventListener("click", () => {
      openChat(chat.id);
    });

    chatList.appendChild(item);

  });

}


function openChat(id) {

  const chat =
    chats.find(item => item.id === id);

  if (!chat) return;

  currentChat = chat;

  chatList.classList.add("hidden");
  document
    .querySelector(".chat-create")
    .classList.add("hidden");

  chatRoom.classList.remove("hidden");

  roomTitle.textContent = chat.name;

  roomMembers.textContent =
    chat.members + "/40 участников";

  renderMessages();

}


function renderMessages() {

  messages.innerHTML = "";

  currentChat.messages.forEach(message => {

    const element =
      document.createElement("div");

    element.className = "message";

    element.innerHTML = `
      <strong>${escapeHTML(message.user)}</strong>
      <p>${escapeHTML(message.text)}</p>
    `;

    messages.appendChild(element);

  });

  messages.scrollTop = messages.scrollHeight;

}


document
  .getElementById("backChatButton")
  .addEventListener("click", () => {

    currentChat = null;

    chatRoom.classList.add("hidden");

    chatList.classList.remove("hidden");

    document
      .querySelector(".chat-create")
      .classList.remove("hidden");

  });


document
  .getElementById("createChatButton")
  .addEventListener("click", () => {

    const input =
      document.getElementById("chatNameInput");

    const name = input.value.trim();

    if (!name) {

      showModal(
        "💬 Название комнаты",
        "<p>Введите название комнаты.</p>"
      );

      return;
    }


    const newChat = {

      id: Date.now(),

      name: "💬 " + name,

      members: 1,

      messages: []

    };


    chats.push(newChat);

    saveChats();

    input.value = "";

    renderChats();

  });


document
  .getElementById("sendMessageButton")
  .addEventListener("click", sendMessage);


document
  .getElementById("messageInput")
  .addEventListener("keydown", event => {

    if (event.key === "Enter") {
      sendMessage();
    }

  });


function sendMessage() {

  if (!currentChat) return;

  const input =
    document.getElementById("messageInput");

  const text = input.value.trim();

  if (!text) return;

  currentChat.messages.push({

    user: "Ты",

    text: text

  });

  saveChats();

  input.value = "";

  renderMessages();

}


renderChats();


/* =========================
   PROFILE
========================= */

let profile =
  JSON.parse(localStorage.getItem("workchat-profile")) || {

    name: "Creator",

    bio: "Начинающий креатор WORKCHAT",

    description:
      "Здесь появится информация о пользователе."

  };


function renderProfile() {

  document.getElementById("profileName").textContent =
    profile.name;

  document.getElementById("profileBio").textContent =
    profile.bio;

  document.getElementById("profileDescription").textContent =
    profile.description;

  document.getElementById("avatar").textContent =
    profile.name.charAt(0).toUpperCase();

  document.getElementById("chatStat").textContent =
    chats.length;

}


document
  .getElementById("editProfileButton")
  .addEventListener("click", () => {

    showModal(
      "👤 Изменить профиль",
      `
        <input
          id="nameInput"
          type="text"
          maxlength="30"
          placeholder="Имя"
          value="${escapeAttribute(profile.name)}"
          style="
            width:100%;
            padding:12px;
            margin-bottom:10px;
            background:#0b0b10;
            color:white;
            border:1px solid #282833;
            border-radius:10px;
          "
        >

        <input
          id="bioInput"
          type="text"
          maxlength="80"
          placeholder="Краткое описание"
          value="${escapeAttribute(profile.bio)}"
          style="
            width:100%;
            padding:12px;
            margin-bottom:10px;
            background:#0b0b10;
            color:white;
            border:1px solid #282833;
            border-radius:10px;
          "
        >

        <textarea
          id="descriptionInput"
          maxlength="300"
          placeholder="О себе"
          style="
            width:100%;
            min-height:100px;
            padding:12px;
            background:#0b0b10;
            color:white;
            border:1px solid #282833;
            border-radius:10px;
          "
        >${escapeHTML(profile.description)}</textarea>

        <button
          id="saveProfileButton"
          class="primary-button"
          style="margin-top:12px;"
        >
          Сохранить
        </button>
      `
    );


    document
      .getElementById("saveProfileButton")
      .addEventListener("click", () => {

        profile.name =
          document.getElementById("nameInput").value.trim()
          || "Creator";

        profile.bio =
          document.getElementById("bioInput").value.trim()
          || "Начинающий креатор WORKCHAT";

        profile.description =
          document.getElementById("descriptionInput").value.trim()
          || "Здесь появится информация о пользователе.";


        localStorage.setItem(
          "workchat-profile",
          JSON.stringify(profile)
        );

        renderProfile();

        modal.classList.add("hidden");

      });

  });


renderProfile();


/* =========================
   SECURITY HELPERS
========================= */

function escapeHTML(text) {

  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


function escapeAttribute(text) {

  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

}

const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("profileBio");
const avatar = document.getElementById("avatar");

const savedUser =
  localStorage.getItem("workchat-user");

if (savedUser) {

  profileName.textContent = savedUser;

  profileBio.textContent =
    "Новый креатор WORKCHAT";

  avatar.textContent =
    savedUser.charAt(0).toUpperCase();

}

const audioInput = document.getElementById("audioInput");
const audioPlayer = document.getElementById("audioPlayer");
const trackList = document.getElementById("trackList");
const currentTrack = document.getElementById("currentTrack");
const currentArtist = document.getElementById("currentArtist");
const albumCount = document.getElementById("albumCount");
const trackStat = document.getElementById("trackStat");

let tracks = [];

function renderTracks() {

  trackList.innerHTML = "";

  if (tracks.length === 0) {

    trackList.innerHTML = `
      <p class="empty-state">
        Пока нет треков.
      </p>
    `;

    albumCount.textContent = "0 треков";
    trackStat.textContent = "0";

    return;
  }

  tracks.forEach(function(track, index) {

    const item = document.createElement("div");

    item.className = "track";

    item.innerHTML = `
      <div class="track-icon">🎵</div>

      <div class="track-info">
        <strong>${track.name}</strong>
        <span>WORKCHAT Creator</span>
      </div>

      <button class="track-play">
        ▶
      </button>
    `;

    item
      .querySelector(".track-play")
      .addEventListener("click", function() {

        currentTrack.textContent = track.name;
        currentArtist.textContent = "WORKCHAT Creator";

        audioPlayer.src = track.url;

        audioPlayer.play();

      });

    trackList.appendChild(item);

  });

  albumCount.textContent =
    tracks.length + " треков";

  trackStat.textContent =
    tracks.length;
}


if (audioInput) {

  audioInput.addEventListener("change", function(event) {

    const file = event.target.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    tracks.push({
      name: file.name,
      url: url
    });

    renderTracks();

  });

}


renderTracks();
