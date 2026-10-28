# 🧮 Calculadora

Calculadora web sencilla hecha con **HTML, CSS y JavaScript**, sin librerías ni frameworks.

## Funcionalidades

- Suma, resta, multiplicación y división.
- Operaciones encadenadas (`2 + 3 × 4` se resuelve paso a paso, como una calculadora de bolsillo).
- Decimales con coma, porcentaje y borrado del último dígito.
- Aviso de error al dividir entre cero.
- Se puede usar con el **teclado físico**.
- Diseño adaptado a móvil.

## Atajos de teclado

| Tecla | Acción |
|---|---|
| `0`–`9` | Escribir número |
| `+` `-` `*` `/` | Operadores |
| `.` o `,` | Decimal |
| `Enter` o `=` | Resultado |
| `Backspace` | Borrar último dígito |
| `Escape` | Borrar todo |
| `%` | Porcentaje |

## Cómo usarla

No necesita instalación. Descarga el repositorio y abre `index.html` en el navegador.

```bash
git clone https://github.com/DiegoRivera14/calculadora.git
cd calculadora
# abre index.html en tu navegador
```

## Estructura

```
calculadora/
├── index.html   # Estructura de la pantalla y los botones
├── style.css    # Diseño con CSS Grid y variables de color
└── script.js    # Lógica de la calculadora
```

## Cómo funciona

La calculadora guarda su estado en cuatro variables de `script.js`:

| Variable | Contenido |
|---|---|
| `actual` | Número que se está escribiendo, como texto (permite añadir dígitos y la coma). |
| `anterior` | Número guardado al pulsar un operador. |
| `operador` | Operación pendiente: `+`, `-`, `*` o `/`. |
| `esperandoNumero` | `true` justo después de pulsar un operador; el siguiente dígito empieza un número nuevo. |

Flujo de una operación como `2 + 3 =`:

1. `escribirNumero("2")` → `actual = "2"`.
2. `elegirOperador("+")` → `anterior = 2`, `operador = "+"`, `esperandoNumero = true`.
3. `escribirNumero("3")` → `actual = "3"`.
4. `resolver()` → llama a `calcular(2, 3, "+")` y guarda el resultado en `actual`.

Si se pulsa un operador con otra operación pendiente (`2 + 3 ×`), primero se resuelve la pendiente. Por eso las operaciones se encadenan de izquierda a derecha, como en una calculadora de bolsillo, sin prioridad de la multiplicación.

Otros detalles:

- No se usa `eval()`: `calcular()` resuelve cada operación con un `switch`.
- `redondear()` corta a 10 decimales para evitar errores de coma flotante (`0.1 + 0.2 = 0.30000000000000004`).
- Todos los botones comparten un único listener (delegación de eventos) y se identifican por sus atributos `data-numero`, `data-operador` y `data-accion`.
- Tras cada acción, `actualizarPantalla()` vuelve a pintar la pantalla a partir del estado.

## Autor

Diego Rivera — [GitHub](https://github.com/DiegoRivera14)
