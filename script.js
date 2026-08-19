const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.textContent.trim();

    if (name.includes("Монтаж")) {
      alert("🎬 Раздел монтажа скоро будет доступен!");
    }

    if (name.includes("Музыка")) {
      alert("🎵 Музыкальный раздел скоро будет доступен!");
    }

    if (name.includes("Чаты")) {
      alert("💬 Чаты скоро будут доступны!");
    }

    if (name.includes("Профиль")) {
      alert("👤 Профиль пользователя скоро будет доступен!");
    }
  });
});
