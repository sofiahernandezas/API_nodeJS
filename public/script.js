document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("boton-palabra");
  const result = document.getElementById("resultado");
  const logoutBtn = document.getElementById("logout-btn");
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegisterLink = document.getElementById('show-register-form');

  // Función para verificar si el usuario está logueado
  const checkLogin = async () => {
    const response = await fetch("/word", { method: 'GET' });

    if (response.status === 401) {
      result.innerHTML = `<p style="color: red;">¡Debes iniciar sesión para buscar palabras! 🤔</p>`;
      logoutBtn.style.display = "none"; // Esconde el botón de cerrar sesión
      return false; // Si no está logueado, no se permite continuar
    }

    logoutBtn.style.display = "inline-block"; 
    return true; 
  };

  // Función para obtener la palabra aleatoria (solo si el usuario está logueado)
  const getRandomWord = async () => {
    const loggedIn = await checkLogin();
    if (!loggedIn) return; // Si no está logueado, no se ejecuta la búsqueda

    try {
      const response = await fetch("/word");
      const data = await response.json();

      result.innerHTML = `
          <h2 class="fst-italic">"${data.word}"</h2>
          <ul>${data.definitions.map(def => `<li>${def}</li>`).join("")}</ul>
      `;
    } catch (error) {
      result.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
  };

  // Event listener para el botón de búsqueda de palabras
  button.addEventListener("click", getRandomWord);

  // Mostrar formulario de registro cuando se haga clic en el enlace
  showRegisterLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  // Event listener para el formulario de registro
  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const resultMessage = await response.text();
    alert(resultMessage);

    if (response.status === 201) {
      // Después de registrarse, vuelve a mostrar el formulario de login
      registerForm.style.display = "none";
      loginForm.style.display = "block";
    }
  });

  // Event listener para el formulario de login
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const resultMessage = await response.text();
    alert(resultMessage);

    // Si el login fue exitoso, muestra el botón de logout
    if (response.status === 200) {
      logoutBtn.style.display = "inline-block"; // Muestra el botón de cerrar sesión
    }
  });

  // Event listener para el botón de cierre de sesión
  logoutBtn.addEventListener("click", async () => {
    const response = await fetch('/logout', { method: 'POST' });

    if (response.status === 200) {
      alert("Sesión cerrada exitosamente");
      logoutBtn.style.display = "none"; // Oculta el botón de logout
      result.innerHTML = ""; // Limpia la sección de resultados
    } else {
      alert("Error al cerrar sesión");
    }
  });
});
