const buttonsEl = document.querySelectorAll("button");
const inputFieldEl = document.getElementById("result");

// Adiciona o evento de clique para cada botão
buttonsEl.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      clearResult();
    } else if (value === "=") {
      calculateResult();
    } else {
      appendValue(value);
    }
  });
});

// Limpa o campo de resultado
function clearResult() {
  inputFieldEl.value = "";
}

// Calcula e mostra o resultado
function calculateResult() {
  try {
    const result = eval(inputFieldEl.value);
    inputFieldEl.value = result;
  } catch (error) {
    inputFieldEl.value = "Erro";
  }
}

// Adiciona o valor ao campo
function appendValue(value) {
  inputFieldEl.value += value;
}
