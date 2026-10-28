// =====================================================
// Calculadora básica
// No usa eval(): cada operación se calcula a mano,
// guardando el número anterior y el operador elegido.
// =====================================================

const pantallaResultado = document.getElementById("resultado");
const pantallaOperacion = document.getElementById("operacion");
const teclado = document.querySelector(".teclado");

// Estado de la calculadora
let actual = "0";          // número que se está escribiendo (como texto)
let anterior = null;       // número guardado antes de pulsar un operador
let operador = null;       // "+", "-", "*" o "/"
let esperandoNumero = false; // true justo después de pulsar un operador

const SIMBOLOS = { "+": "+", "-": "−", "*": "×", "/": "÷" };

// ---------- Utilidades ----------

// Muestra los números con coma decimal, como se hace en España
function formatear(numero) {
  return String(numero).replace(".", ",");
}

// Evita errores de coma flotante como 0.1 + 0.2 = 0.30000000000000004
function redondear(numero) {
  return Math.round(numero * 1e10) / 1e10;
}

function calcular(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? null : a / b; // null indica división entre cero
  }
}

function actualizarPantalla() {
  pantallaResultado.textContent = formatear(actual);
  pantallaOperacion.textContent =
    operador !== null ? `${formatear(anterior)} ${SIMBOLOS[operador]}` : "";

  // Resalta el botón del operador activo
  document.querySelectorAll(".operador").forEach((boton) => {
    boton.classList.toggle(
      "activo",
      esperandoNumero && boton.dataset.operador === operador
    );
  });
}

// ---------- Acciones ----------

function escribirNumero(digito) {
  if (actual === "Error") actual = "0";

  if (esperandoNumero) {
    actual = digito;
    esperandoNumero = false;
  } else if (actual.length < 15) {
    actual = actual === "0" ? digito : actual + digito;
  }
}

function escribirDecimal() {
  if (esperandoNumero || actual === "Error") {
    actual = "0.";
    esperandoNumero = false;
  } else if (!actual.includes(".")) {
    actual += ".";
  }
}

function elegirOperador(nuevoOperador) {
  if (actual === "Error") return;

  // Si ya había una operación pendiente, se resuelve antes (ej: 2 + 3 + ...)
  if (operador !== null && !esperandoNumero) {
    resolver();
    if (actual === "Error") return;
  }

  anterior = parseFloat(actual);
  operador = nuevoOperador;
  esperandoNumero = true;
}

function resolver() {
  if (operador === null || esperandoNumero) return;

  const resultado = calcular(anterior, parseFloat(actual), operador);

  actual = resultado === null ? "Error" : String(redondear(resultado));
  anterior = null;
  operador = null;
}

function borrarTodo() {
  actual = "0";
  anterior = null;
  operador = null;
  esperandoNumero = false;
}

function borrarUltimo() {
  if (esperandoNumero || actual === "Error") return;
  actual = actual.length > 1 ? actual.slice(0, -1) : "0";
  if (actual === "-") actual = "0";
}

function porcentaje() {
  if (actual === "Error") return;
  actual = String(redondear(parseFloat(actual) / 100));
}

// ---------- Eventos ----------

// Un único listener para todo el teclado (delegación de eventos)
teclado.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");
  if (!boton) return;

  const { numero, operador: op, accion } = boton.dataset;

  if (numero !== undefined) escribirNumero(numero);
  else if (op) elegirOperador(op);
  else if (accion === "decimal") escribirDecimal();
  else if (accion === "igual") resolver();
  else if (accion === "borrar-todo") borrarTodo();
  else if (accion === "borrar") borrarUltimo();
  else if (accion === "porcentaje") porcentaje();

  actualizarPantalla();
});

// Soporte para el teclado físico
document.addEventListener("keydown", (evento) => {
  const tecla = evento.key;

  if (/^[0-9]$/.test(tecla)) escribirNumero(tecla);
  else if (["+", "-", "*", "/"].includes(tecla)) elegirOperador(tecla);
  else if (tecla === "." || tecla === ",") escribirDecimal();
  else if (tecla === "Enter" || tecla === "=") {
    evento.preventDefault();
    resolver();
  }
  else if (tecla === "Backspace") borrarUltimo();
  else if (tecla === "Escape") borrarTodo();
  else if (tecla === "%") porcentaje();
  else return;

  actualizarPantalla();
});

actualizarPantalla();
