// Obtém os elementos do HTML
const cpfInput = document.getElementById('cpf');
const button = document.getElementById('button');
const result = document.getElementById('result');

// Adiciona o evento de clique ao botão
button.addEventListener('click', () => {
	// Remove todos os caracteres não numéricos do CPF
	const cpf = cpfInput.value.replace(/\D/g, '');

	// Verifica se o CPF é válido
	if (validaCPF(cpf)) {
		result.textContent = 'CPF válido';
		result.classList.remove('error');
	} else {
		result.textContent = 'CPF inválido';
		result.classList.add('error');
	}
});

// Adiciona o evento de input ao campo de CPF
cpfInput.addEventListener('input', () => {
	// Formata o CPF usando a máscara (obg susu)
	formatarCPF(cpfInput);
});

// Função para formatar o CPF com a máscara
function formatarCPF(input) {
	// Remove todos os caracteres não numéricos do CPF
	let cpf = input.value.replace(/\D/g, '');

	// Adiciona a máscara ao CPF
	if (cpf.length > 3 && cpf.length <= 6) {
		// Máscara até 6 dígitos --- 999.999
		cpf = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
	} else if (cpf.length > 6 && cpf.length <= 9) {
		// Máscara até 9 dígitos --- 999.999.999
		cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
	} else if (cpf.length > 9) {
		// Máscara até 11 dígitos --- 999.999.999-99
		cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
	}

	// Atualiza o valor do campo de CPF
	input.value = cpf;
}

// Função para validar o CPF
function validaCPF(cpf) {
	// Remove todos os caracteres não numéricos do CPF
	cpf = cpf.replace(/\D/g, '');

	// Verifica se o CPF possui 11 dígitos
	if (cpf.length !== 11) {
		return false;
	}

	// Verifica se o CPF é uma sequência de dígitos repetidos
	if (/^(\d)\1*$/.test(cpf)) {
		return false;
	}

	let sum = 0;
	let remainder;

	// Calcula o primeiro dígito verificador do CPF
	for (let i = 1; i <= 9; i++) {
		sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
	}

	remainder = (sum * 10) % 11;

	// Verifica se o dígito verificador é 10 ou 11
	if (remainder === 10 || remainder === 11) {
		remainder = 0;
	}

	// Verifica se o dígito verificador é igual ao informado
	if (remainder !== parseInt(cpf.substring(9, 10))) {
		return false;
	}

	sum = 0;

	// Calcula o segundo dígito verificador do CPF
	for (let i = 1; i <= 10; i++) {
		sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
	}

	remainder = (sum * 10) % 11;

	// Verifica se o dígito verificador é 10 ou 11
	if (remainder === 10 || remainder === 11) {
		remainder = 0;
	}

	// Verifica se o dígito verificador é igual ao informado
	if (remainder !== parseInt(cpf.substring(10, 11))) {
		return false;
	}

	return true;
}
