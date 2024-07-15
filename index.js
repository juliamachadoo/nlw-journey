// bibliotecas e códigos de terceiros
//Vai formatar da dada "Mon Jul 08 2024 10:00:00 GMT-0300=> 
  //Dia numérico: 08
  //Dia da semana curto: seg
  //Dia da semana longo: segunda
  //Mês: Julho
  //Hora: 10:00"
const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format("DD"),
      semana: {
        curto: dayjs(data).format("ddd"),
        longo: dayjs(data).format("dddd"),
      },
    },
    mes: dayjs(data).format("MMMM"),
    hora: dayjs(data).format("HH:mm"),
  };
};

// object {}
const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true,
};

// lista, array, vetor []
let atividades = [
  atividade,
  {
    nome: "Academia em grupo",
    data: new Date("2024-07-09 12:00"),
    finalizada: false,
  },
  {
    nome: "Gamming session",
    data: new Date("2024-07-09 16:00"),
    finalizada: true,
  },
];

// atividades = []

// arrow function
const criarItemDeAtividade = (atividade) => {
  let input = `
    <input 
    onchange="concluirAtividade(event)"
    value="${atividade.data}"
    type="checkbox" 
    `;

  if (atividade.finalizada) {
    input += "checked";
  }

  input += ">";

  const formatar = formatador(atividade.data);

  return `
    <div class='card-bg'>
      ${input}

      <div>

        <svg class= 'active' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>

        <svg class='inactive' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dashed"><path d="M10.1 2.182a10 10 0 0 1 3.8 0"/><path d="M13.9 21.818a10 10 0 0 1-3.8 0"/><path d="M17.609 3.721a10 10 0 0 1 2.69 2.7"/><path d="M2.182 13.9a10 10 0 0 1 0-3.8"/><path d="M20.279 17.609a10 10 0 0 1-2.7 2.69"/><path d="M21.818 10.1a10 10 0 0 1 0 3.8"/><path d="M3.721 6.391a10 10 0 0 1 2.7-2.69"/><path d="M6.391 20.279a10 10 0 0 1-2.69-2.7"/></svg>

        <span>${atividade.nome}</span>
      </div>


      <time class='short'>
      ${formatar.dia.semana.curto}.
      ${formatar.dia.numerico} <br>
      ${formatar.hora}
      </time>

      <time class='full'>
        ${formatar.dia.semana.longo}, 
        dia ${formatar.dia.numerico}
        de ${formatar.mes} 
        às ${formatar.hora}h </time>
    </div>
    `;
};

const atualizarListaDeAtividades = () => {
  const section = document.querySelector("section");
  section.innerHTML = "";

  // verificar se a minha lista está vazia
  if (atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`;
    return;
  }

  for (let atividade of atividades) {
    section.innerHTML += criarItemDeAtividade(atividade);
  }
};


const salvarAtividade = (event) => {
  event.preventDefault();

  //Pega os itens do formulario, ou seja os dados digitados
  const dadosDoFormulario = new FormData(event.target);

  const nome = dadosDoFormulario.get("atividade");
  const dia = dadosDoFormulario.get("dia");
  const hora = dadosDoFormulario.get("hora");
  const data = `${dia} ${hora}`;

  const novaAtividade = {
    nome,
    data,
    finalizada: false,
  };

  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data;
  });

  if (atividadeExiste) {
    return alert("Dia/Hora não disponível");
  }

  atividades = [novaAtividade, ...atividades];
  atualizarListaDeAtividades();
};

const criarDiasSelecao = () => {
  const dias = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ];


  let diasSelecao = "";

  for (let dia of dias) {
    const formatar = formatador(dia);
    const diaFormatado = `
      ${formatar.dia.numerico} de 
      ${formatar.mes}
      `;

    diasSelecao += `
      <option value="${dia}">${diaFormatado}</option>
      `;
  }

  //Seleciona onde está o select name dia e coloca no lugar os "dias Selecao"
  document.querySelector('select[name="dia"]').innerHTML = diasSelecao;
};


const criarHorasSelecao = () => {
  let horasDisponiveis = "";

  // Para aparecer os valores do horario na option que tem o mesmo valor. 
  for (let i = 6; i < 23; i++) {
    const hora = String(i).padStart(2, "0");
    horasDisponiveis += `
      <option value="${hora}:00">${hora}:00</option>`;
    horasDisponiveis += `
      <option value="${hora}:30">${hora}:30</option>`;
  }

  document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis;
};


const concluirAtividade = (event) => {
  const input = event.target;
  const dataDesteInput = input.value;

  const atividade = atividades.find((atividade) => {
    return atividade.data == dataDesteInput;
  });

  if (!atividade) {
    return;
  }

  atividade.finalizada = !atividade.finalizada;
};

atualizarListaDeAtividades();
criarDiasSelecao();
criarHorasSelecao();