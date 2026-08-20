document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     REGISTRATION
  ========================= */

  const registrationScreen =
    document.getElementById("registrationScreen");

  const registered =
    localStorage.getItem("workchatRegistered");

  const savedUser =
    localStorage.getItem("workchatUser");

  function hideRegistration() {
    if (registrationScreen) {
      registrationScreen.style.display = "none";
    }
  }

  function showRegistration() {
    if (registrationScreen) {
      registrationScreen.style.display = "flex";
    }
  }

  if (registered === "true") {
    hideRegistration();
  } else {
    showRegistration();
  }


  /* =========================
     EMAIL
  ========================= */

  const emailLogin =
    document.getElementById("emailLogin");

  if (emailLogin) {
    emailLogin.onclick = () => {

      const box =
        document.querySelector(".registration-box");

      box.innerHTML = `
        <div class="registration-logo">
          WORKCHAT
        </div>

        <p>
          Введи email для создания аккаунта
        </p>

        <input
          id="emailInput"
          type="email"
          placeholder="example@email.com"
          style="
            width:100%;
            padding:14px;
            margin-bottom:10px;
            border-radius:12px;
            border:1px solid #292933;
            background:#0b0b10;
            color:white;
          "
        >

        <input
          id="passwordInput"
          type="password"
          placeholder="Пароль"
          style="
            width:100%;
            padding:14px;
            margin-bottom:12px;
            border-radius:12px;
            border:1px solid #292933;
            background:#0b0b10;
            color:white;
          "
        >

        <button
          id="emailContinue"
          class="login-button"
        >
          Продолжить
        </button>

        <button
          id="backLogin"
          class="login-button"
        >
          ← Назад
        </button>
      `;

      document.getElementById("emailContinue").onclick =
        () => {

          const email =
            document.getElementById("emailInput").value.trim();

          const password =
            document.getElementById("passwordInput").value;

          if (!email.includes("@")) {
            alert("Введите правильный email.");
            return;
          }

          if (password.length < 6) {
            alert("Пароль должен содержать минимум 6 символов.");
            return;
          }

          completeRegistration(email);
        };

      document.getElementById("backLogin").onclick =
        () => location.reload();
    };
  }


  /* =========================
     PHONE
  ========================= */

  const phoneLogin =
    document.getElementById("phoneLogin");

  if (phoneLogin) {
    phoneLogin.onclick = () => {

      const box =
        document.querySelector(".registration-box");

      box.innerHTML = `
        <div class="registration-logo">
          WORKCHAT
        </div>

        <p>
          Введи номер телефона
        </p>

        <input
          id="phoneInput"
          type="tel"
          placeholder="+996 555 123 456"
          style="
            width:100%;
            padding:14px;
            margin-bottom:12px;
            border-radius:12px;
            border:1px solid #292933;
            background:#0b0b10;
            color:white;
          "
        >

        <button
          id="phoneContinue"
          class="login-button"
        >
          Получить код
        </button>

        <button
          id="backLogin"
          class="login-button"
        >
          ← Назад
        </button>
      `;

      document.getElementById("phoneContinue").onclick =
        () => {

          const phone =
            document.getElementById("phoneInput").value.trim();

          if (phone.length < 7) {
            alert("Введите правильный номер.");
            return;
          }

          completeRegistration(phone);
        };

      document.getElementById("backLogin").onclick =
        () => location.reload();
    };
  }


  /* =========================
     GOOGLE / FACEBOOK
  ========================= */

  document.getElementById("googleLogin")?.addEventListener(
    "click",
    () => {
      alert("Настоящий вход через Google подключим позже.");
    }
  );

  document.getElementById("facebookLogin")?.addEventListener(
    "click",
    () => {
      alert("Настоящий вход через Facebook подключим позже.");
    }
  );


  /* =========================
     REGISTRATION COMPLETE
  ========================= */

  function completeRegistration(user) {

    localStorage.setItem(
      "workchatRegistered",
      "true"
    );

    localStorage.setItem(
      "workchatUser",
      user
    );

    hideRegistration();

    updateProfile();

    alert("Добро пожаловать в WORKCHAT! 🎉");
  }


  /* =========================
     NAVIGATION
  ========================= */

  const pages =
    document.querySelectorAll(".page");

  const navButtons =
    document.querySelectorAll(".nav-button");

  const pageButtons =
    document.querySelectorAll("[data-page-button]");


  function openPage(name) {

    pages.forEach(page => {
      page.classList.remove("active-page");
    });

    const page =
      document.getElementById(name + "Page");

    if (page) {
      page.classList.add("active-page");
    }

    navButtons.forEach(button => {
      button.classList.remove("active");

      if (button.dataset.page === name) {
        button.classList.add("active");
      }
    });

    window.scrollTo(0, 0);
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

  const themeButton =
    document.getElementById("themeButton");

  if (themeButton) {

    themeButton.onclick = () => {

      document.body.classList.toggle("light");

      themeButton.textContent =
        document.body.classList.contains("light")
          ? "☀"
          : "☾";
    };

  }


  /* =========================
     MUSIC
  ========================= */

  const audioInput =
    document.getElementById("audioInput");

  const audioPlayer =
    document.getElementById("audioPlayer");

  const trackList =
    document.getElementById("trackList");

  const currentTrack =
    document.getElementById("currentTrack");

  const currentArtist =
    document.getElementById("currentArtist");

  const albumCount =
    document.getElementById("albumCount");

  const trackStat =
    document.getElementById("trackStat");

  let tracks = [];


  function renderTracks() {

    if (!trackList) return;

    trackList.innerHTML = "";

    if (tracks.length === 0) {

      trackList.innerHTML = `
        <div class="empty-state">
          Добавь свой первый трек.
        </div>
      `;

    }

    tracks.forEach(track => {

      const item =
        document.createElement("div");

      item.className = "track";

      item.innerHTML = `
        <div class="track-icon">
          🎵
        </div>

        <div class="track-info">
          <strong>${track.name}</strong>
          <span>WORKCHAT Creator</span>
        </div>

        <button class="track-play">
          ▶
        </button>
      `;

      item.querySelector(".track-play").onclick =
        () => {

          if (audioPlayer) {
            audioPlayer.src = track.url;
            audioPlayer.play();
          }

          if (currentTrack) {
            currentTrack.textContent = track.name;
          }

          if (currentArtist) {
            currentArtist.textContent =
              "WORKCHAT Creator";
          }
        };

      trackList.appendChild(item);

    });

    if (albumCount) {
      albumCount.textContent =
        tracks.length +
        (tracks.length === 1 ? " трек" : " треков");
    }

    if (trackStat) {
      trackStat.textContent = tracks.length;
    }
  }


  if (audioInput) {

    audioInput.onchange = event => {

      const file =
        event.target.files[0];

      if (!file) return;

      tracks.push({
        name: file.name,
        url: URL.createObjectURL(file)
      });

      renderTracks();
    };

  }

  renderTracks();


  /* =========================
     VIDEO
  ========================= */

  const videoInput =
    document.getElementById("videoInput");

  const videoPreview =
    document.getElementById("videoPreview");


  if (videoInput) {

    videoInput.onchange = event => {

      const file =
        event.target.files[0];

      if (!file) return;

      const video =
        document.createElement("video");

      video.src =
        URL.createObjectURL(file);

      video.controls = true;
      video.playsInline = true;

      videoPreview.innerHTML = "";

      videoPreview.appendChild(video);
    };

  }


  /* =========================
     CHATS
  ========================= */

  const createChatButton =
    document.getElementById("createChatButton");

  const chatList =
    document.getElementById("chatList");

  let chats = [];


  function renderChats() {

    if (!chatList) return;

    chatList.innerHTML = "";

    if (chats.length === 0) {

      chatList.innerHTML = `
        <div class="empty-state">
          Пока нет комнат.
        </div>
      `;

      return;
    }

    chats.forEach(chat => {

      const room =
        document.createElement("div");

      room.className = "chat-room";

      room.innerHTML = `
        <div class="chat-room-icon">
          💬
        </div>

        <div class="chat-room-info">
          <strong>${chat.name}</strong>
          <span>${chat.members}/40 участников</span>
        </div>
      `;

      chatList.appendChild(room);
    });
  }


  if (createChatButton) {

    createChatButton.onclick = () => {

      const name =
        prompt("Название новой комнаты:");

      if (!name) return;

      chats.push({
        name: name,
        members: 1
      });

      renderChats();
    };

  }

  renderChats();


  /* =========================
     PROFILE
  ========================= */

  function updateProfile() {

    const profileName =
      document.getElementById("profileName");

    const avatar =
      document.getElementById("avatar");

    const user =
      localStorage.getItem("workchatUser");

    if (!user) return;

    if (profileName) {
      profileName.textContent = user;
    }

    if (avatar) {
      avatar.textContent =
        user.charAt(0).toUpperCase();
    }
  }


  updateProfile();


  console.log("WORKCHAT loaded successfully.");

});
