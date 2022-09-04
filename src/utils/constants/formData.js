export const formData = [
  {
    labelText: 'Nome',
    placeholder: 'David Augusto',
    inputType: 'text',
    name: 'name',
  },
  {
    labelText: 'E-mail',
    placeholder: 'davidaugusto@gmail.com',
    inputType: 'email',
    name: 'email',
  },
  {
    labelText: 'CPF',
    placeholder: '23232312334',
    inputType: 'number',
    name: 'cpf',
  },
  {
    labelText: 'Gênero',
    placeholder: 'São Paulo',
    inputType: 'select',
    name: 'genre',
    options: [
      {
        value: 'M',
        label: 'Homem',
      },
      {
        value: 'F',
        label: 'Mulher',
      },
      {
        value: 'NB',
        label: 'Não binário',
      },
      {
        value: 'NI',
        label: 'Prefiro não informar',
      },
    ],
  },
  {
    labelText: 'Data de Aniversário',
    placeholder: '10/08/2003',
    inputType: 'date',
    name: 'birth_date',
  },
  {
    labelText: 'Endereço',
    placeholder: 'Avenida Paulista, 1400',
    inputType: 'text',
    name: 'address',
  },
  {
    labelText: 'Cidade',
    placeholder: 'São Paulo',
    inputType: 'text',
    name: 'city',
  },
  {
    labelText: 'Estado',
    placeholder: 'SP',
    inputType: 'text',
    name: 'state',
  },
]
