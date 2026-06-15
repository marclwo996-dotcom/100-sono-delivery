import { Produto, TamanhoPizza } from './types'

export const TAMANHOS_PIZZA: TamanhoPizza[] = [
  { id: 'P', nome: 'Pequeno (26cm)', preco: 34.00 },
  { id: 'M', nome: 'Médio (30cm)', preco: 44.00 },
  { id: 'G', nome: 'Grande (35cm)', preco: 52.00 },
  { id: 'F', nome: 'Família (40cm)', preco: 62.00 }
]

export const PRECO_BORDA = {
  'P': 6.00,
  'M': 6.00,
  'G': 8.00,
  'F': 8.00
}

export const produtos: Produto[] = [
  // PIZZAS
  {
    id: 'pizza-01',
    nome: 'À Moda Delivery',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, frango, calabresa, azeitona, presunto, ervilha, palmito, milho, cebola, tomate e orégano',
    temTamanhos: true
  },
  {
    id: 'pizza-02',
    nome: 'Alho e Óleo',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, alho e azeitona',
    temTamanhos: true
  },
  {
    id: 'pizza-03',
    nome: 'Atum',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, atum e orégano',
    temTamanhos: true
  },
  {
    id: 'pizza-04',
    nome: 'Baiana',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, calabresa, pimenta, cebola e azeitona',
    temTamanhos: true
  },
  {
    id: 'pizza-05',
    nome: 'Caipira',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, frango, milho e catupiry',
    temTamanhos: true
  },
  {
    id: 'pizza-06',
    nome: 'Calabresa Toscana',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, calabresa ralada, azeitona e cebola',
    temTamanhos: true
  },
  {
    id: 'pizza-07',
    nome: 'Calabresa',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano e calabresa',
    temTamanhos: true
  },
  {
    id: 'pizza-08',
    nome: 'Paquera',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, presunto, milho, ovo e tomate',
    temTamanhos: true
  },
  {
    id: 'pizza-09',
    nome: 'Frango',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano e frango',
    temTamanhos: true
  },
  {
    id: 'pizza-10',
    nome: 'Frango ao Catupiry',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, frango e catupiry',
    temTamanhos: true
  },
  {
    id: 'pizza-11',
    nome: 'Presunto',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano e presunto',
    temTamanhos: true
  },
  {
    id: 'pizza-12',
    nome: 'Marguerita',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, manjericão e tomate',
    temTamanhos: true
  },
  {
    id: 'pizza-13',
    nome: 'Milho Verde',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano e milho verde',
    temTamanhos: true
  },
  {
    id: 'pizza-14',
    nome: 'Milho Verde ao Catupiry',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, milho verde e catupiry',
    temTamanhos: true
  },
  {
    id: 'pizza-15',
    nome: 'Mista',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, calabresa e presunto',
    temTamanhos: true
  },
  {
    id: 'pizza-16',
    nome: 'Mussarela',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, tomate e azeitona',
    temTamanhos: true
  },
  {
    id: 'pizza-17',
    nome: 'Palmito',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano e palmito',
    temTamanhos: true
  },
  {
    id: 'pizza-18',
    nome: 'Palmito com Milho',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, milho e palmito',
    temTamanhos: true
  },
  {
    id: 'pizza-19',
    nome: 'Grega',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, frango, palmito e milho',
    temTamanhos: true
  },
  {
    id: 'pizza-20',
    nome: 'Nordestina',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, frango, presunto, azeitona e cebola',
    temTamanhos: true
  },
  {
    id: 'pizza-21',
    nome: 'Napolitana',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, tomate, azeitona e parmesão ralado',
    temTamanhos: true
  },
  {
    id: 'pizza-22',
    nome: 'Portuguesa',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, presunto, ovo, ervilha e cebola',
    temTamanhos: true
  },
  {
    id: 'pizza-23',
    nome: 'Solella',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, frango e palmito',
    temTamanhos: true
  },
  {
    id: 'pizza-24',
    nome: 'Três Queijos',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, catupiry e cheddar',
    temTamanhos: true
  },
  {
    id: 'pizza-25',
    nome: 'Quatro Queijos',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, catupiry, cheddar e parmesão ralado',
    temTamanhos: true
  },
  {
    id: 'pizza-26',
    nome: 'Strofrango',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, creme de leite e frango',
    temTamanhos: true
  },
  {
    id: 'pizza-27',
    nome: 'Vegetariana',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, manjericão, palmito e milho verde',
    temTamanhos: true
  },
  {
    id: 'pizza-28',
    nome: 'Lombinho',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano e lombo canadense',
    temTamanhos: true
  },
  {
    id: 'pizza-29',
    nome: 'Lombinho com Catupiry',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, lombo canadense e catupiry',
    temTamanhos: true
  },
  {
    id: 'pizza-30',
    nome: 'Romana',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, milho, calabresa e bacon',
    temTamanhos: true
  },
  {
    id: 'pizza-31',
    nome: 'Maçã',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela e maçã',
    temTamanhos: true
  },
  {
    id: 'pizza-32',
    nome: 'Nova Moda',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, lombinho, bacon e cheddar',
    temTamanhos: true
  },
  {
    id: 'pizza-33',
    nome: 'Mexicana',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, calabresa, pimentão, pimenta e cebola',
    temTamanhos: true
  },
  {
    id: 'pizza-34',
    nome: 'Italiana',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, frango, palmito e tomate',
    temTamanhos: true
  },
  {
    id: 'pizza-35',
    nome: 'Americana',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, frango, milho e ervilha',
    temTamanhos: true
  },
  {
    id: 'pizza-36',
    nome: 'Brasileirinha',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, presunto, milho, ervilha e tomate',
    temTamanhos: true
  },
  {
    id: 'pizza-37',
    nome: 'Camponesa',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, bacon, ovo, ervilha, tomate e milho',
    temTamanhos: true
  },
  {
    id: 'pizza-38',
    nome: 'Canadense',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, lombinho e abacaxi',
    temTamanhos: true
  },
  {
    id: 'pizza-39',
    nome: 'Carne Seca',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, carne seca, cebola e azeitona',
    temTamanhos: true
  },
  {
    id: 'pizza-40',
    nome: 'Carne Seca com Banana',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, carne seca e banana',
    temTamanhos: true
  },
  {
    id: 'pizza-41',
    nome: 'Frango ao 4 Queijo',
    preco: 34.00,
    categoria: 'pizzas',
    descricao: 'Molho, mussarela, orégano, frango, catupiry, cheddar e queijo parmesão',
    temTamanhos: true
  },

  // LANCHES
  {
    id: 'lanche-01',
    nome: 'Chess Hiper',
    preco: 18.00,
    categoria: 'lanches',
    descricao: 'Hambúrguer, bacon, presunto, ovo, queijo, tomate e alface'
  },
  {
    id: 'lanche-02',
    nome: 'Chess Bacon',
    preco: 14.00,
    categoria: 'lanches',
    descricao: 'Hambúrguer, bacon, queijo, tomate e alface'
  },
  {
    id: 'lanche-03',
    nome: 'Chess Egg',
    preco: 14.00,
    categoria: 'lanches',
    descricao: 'Hambúrguer, queijo, ovo, tomate e alface'
  },
  {
    id: 'lanche-04',
    nome: 'Chess Salada',
    preco: 10.00,
    categoria: 'lanches',
    descricao: 'Hambúrguer, queijo, tomate e alface'
  },
  {
    id: 'lanche-05',
    nome: 'Americano',
    preco: 12.00,
    categoria: 'lanches',
    descricao: 'Presunto, queijo, ovo, tomate e alface'
  },
  {
    id: 'lanche-06',
    nome: 'American Bacon',
    preco: 14.00,
    categoria: 'lanches',
    descricao: 'Presunto, queijo, ovo, bacon, tomate e alface'
  },
  {
    id: 'lanche-07',
    nome: 'American Burguer',
    preco: 14.00,
    categoria: 'lanches',
    descricao: 'Hambúrguer, presunto, ovo, queijo, tomate e alface'
  },
  {
    id: 'lanche-08',
    nome: 'Hambúrguer',
    preco: 8.00,
    categoria: 'lanches',
    descricao: 'Hambúrguer, tomate e alface'
  },
  {
    id: 'lanche-09',
    nome: 'Misto',
    preco: 7.00,
    categoria: 'lanches',
    descricao: 'Queijo e presunto'
  },
  {
    id: 'lanche-10',
    nome: 'Misto Especial',
    preco: 13.00,
    categoria: 'lanches',
    descricao: 'Presunto e queijo, milho, batata palha, alface e tomate'
  },
  {
    id: 'lanche-11',
    nome: 'Baurú',
    preco: 8.00,
    categoria: 'lanches',
    descricao: 'Presunto e queijo, tomate e alface'
  },
  {
    id: 'lanche-12',
    nome: 'Chess Dog',
    preco: 8.00,
    categoria: 'lanches',
    descricao: 'Salsicha e queijo'
  },
  {
    id: 'lanche-13',
    nome: 'Chess Burguer',
    preco: 8.00,
    categoria: 'lanches',
    descricao: 'Hambúrguer e queijo'
  },
  {
    id: 'lanche-14',
    nome: 'Chess Galinha',
    preco: 15.00,
    categoria: 'lanches',
    descricao: 'Frango, queijo, batata, milho, tomate e alface'
  },
  {
    id: 'lanche-15',
    nome: 'Chess Galinha Bacon',
    preco: 17.00,
    categoria: 'lanches',
    descricao: 'Frango, queijo, bacon, milho, tomate, alface e batata palha'
  },
  {
    id: 'lanche-16',
    nome: 'Miss Galinha',
    preco: 17.00,
    categoria: 'lanches',
    descricao: 'Presunto, queijo, frango, milho, batata palha, tomate e alface'
  },
  {
    id: 'lanche-17',
    nome: 'Chess Dog Galinha',
    preco: 17.00,
    categoria: 'lanches',
    descricao: 'Hambúrguer, queijo, salsicha e galinha'
  },
  {
    id: 'lanche-18',
    nome: 'Chess Dog Burguer',
    preco: 12.00,
    categoria: 'lanches',
    descricao: 'Hambúrguer, queijo, salsicha'
  },
  {
    id: 'lanche-19',
    nome: 'Super Boy',
    preco: 12.00,
    categoria: 'lanches',
    descricao: 'Bacon, ovo, queijo, tomate e alface'
  },
  {
    id: 'lanche-20',
    nome: 'Chess Egg Bacon',
    preco: 16.00,
    categoria: 'lanches',
    descricao: 'Hambúrguer, bacon, ovo, queijo, tomate e alface'
  },
  {
    id: 'lanche-21',
    nome: 'Big Bacon',
    preco: 17.00,
    categoria: 'lanches',
    descricao: 'Hambúrguer, presunto, queijo, bacon, milho e batata palha'
  },
  {
    id: 'lanche-22',
    nome: 'Miss Bacon',
    preco: 14.00,
    categoria: 'lanches',
    descricao: 'Presunto, queijo, bacon, tomate e alface'
  },
  {
    id: 'lanche-23',
    nome: 'Miss Burguer',
    preco: 13.00,
    categoria: 'lanches',
    descricao: 'Hambúrguer, presunto e queijo'
  },
  {
    id: 'lanche-24',
    nome: 'Egg Burguer',
    preco: 12.00,
    categoria: 'lanches',
    descricao: 'Hambúrguer, ovo e queijo'
  },

  // LANCHES ESPECIAIS
  {
    id: 'lanche-especial-25',
    nome: 'Chess Picanha',
    preco: 20.00,
    categoria: 'lanches-especiais',
    descricao: 'Hambúrguer de picanha 140g, presunto, queijo, milho, batata palha, tomate e alface'
  },
  {
    id: 'lanche-especial-26',
    nome: 'Chess Picanha Bacon',
    preco: 24.00,
    categoria: 'lanches-especiais',
    descricao: 'Hambúrguer de picanha 140g, bacon, queijo, presunto, batata palha, milho, tomate e alface'
  },
  {
    id: 'lanche-especial-27',
    nome: 'Chess Picanha Duplo',
    preco: 24.00,
    categoria: 'lanches-especiais',
    descricao: '2 Hambúrguer de picanha 140g, 2 presunto, 2 queijo, milho, batata palha, tomate e alface'
  },
  {
    id: 'lanche-especial-28',
    nome: 'Chess Picanha Triplo',
    preco: 28.00,
    categoria: 'lanches-especiais',
    descricao: '3 Hambúrguer de picanha 140g, 3 presunto, 3 queijo, milho, batata palha, tomate e alface'
  },
  {
    id: 'lanche-especial-29',
    nome: 'Chess Calabresa',
    preco: 20.00,
    categoria: 'lanches-especiais',
    descricao: 'Calabresa, presunto, queijo, milho, batata palha, tomate e alface'
  },
  {
    id: 'lanche-especial-30',
    nome: 'X-Filé',
    preco: 22.00,
    categoria: 'lanches-especiais',
    descricao: 'Filé, presunto, queijo, batata palha, milho, tomate e alface'
  },
  {
    id: 'lanche-especial-31',
    nome: 'Hambúrguer Especial',
    preco: 18.00,
    categoria: 'lanches-especiais',
    descricao: 'Hambúrguer, presunto, queijo, milho, tomate, alface e batata palha'
  },
  {
    id: 'lanche-especial-32',
    nome: 'Hambúrguer Duplo',
    preco: 16.00,
    categoria: 'lanches-especiais',
    descricao: '2 Hambúrguer, queijo, batata palha, milho, tomate e alface'
  },
  {
    id: 'lanche-especial-33',
    nome: 'X Hiper Monster',
    preco: 23.00,
    categoria: 'lanches-especiais',
    descricao: 'Hambúrguer, 2 presunto, 2 queijo, bacon, milho, ovo, molho barbecue, cheddar, milho, batata palha, tomate e alface'
  },
  {
    id: 'lanche-especial-34',
    nome: 'X Hiper Monster Galinha',
    preco: 26.00,
    categoria: 'lanches-especiais',
    descricao: 'Frango, hambúrguer, 2 presunto, 2 queijo, ovo, bacon, molho barbecue, cheddar, milho, tomate, batata palha e alface'
  },
  {
    id: 'lanche-especial-35',
    nome: 'X Hiper Monster Calabresa',
    preco: 26.00,
    categoria: 'lanches-especiais',
    descricao: 'Calabresa, hambúrguer, 2 presunto, 2 queijo, ovo, bacon, molho barbecue, cheddar, milho, tomate, batata palha e alface'
  },
  {
    id: 'lanche-especial-36',
    nome: 'X Calabresa Galinha',
    preco: 22.00,
    categoria: 'lanches-especiais',
    descricao: 'Calabresa, frango, queijo, milho, batata palha, alface e tomate'
  },
  {
    id: 'lanche-especial-37',
    nome: 'Mister Jhon',
    preco: 24.00,
    categoria: 'lanches-especiais',
    descricao: '2 Hambúrguer de picanha, 2 presunto, 2 queijo, bacon, cheddar, milho, molho barbecue, tomate, batata palha e alface'
  },
  {
    id: 'lanche-especial-38',
    nome: 'Faceburg',
    preco: 21.00,
    categoria: 'lanches-especiais',
    descricao: 'Hambúrguer beef burg com queijo 120g, queijo, presunto, catupiry, milho, batata palha, tomate e alface'
  },
  {
    id: 'lanche-especial-39',
    nome: 'Faceburg Duplo',
    preco: 25.00,
    categoria: 'lanches-especiais',
    descricao: '2 Hambúrguer beef burg com queijo 120g, queijo, presunto, catupiry, milho, batata palha, tomate e alface'
  },
  {
    id: 'lanche-especial-40',
    nome: '100 Sono Especial',
    preco: 45.00,
    categoria: 'lanches-especiais',
    descricao: 'X-hambúrguer, presunto, queijo, cheddar, bacon, catupiry, frango, ovo, carne, calabresa, salsicha, batata palha, milho, tomate e alface'
  },

  // PORÇÕES
  {
    id: 'porcao-01',
    nome: 'Batata Frita',
    preco: 18.00,
    categoria: 'porcoes',
    descricao: 'Porção de batata frita'
  },
  {
    id: 'porcao-02',
    nome: 'Batata Frita e Cheddar',
    preco: 22.00,
    categoria: 'porcoes',
    descricao: 'Porção de batata frita com cheddar'
  },
  {
    id: 'porcao-03',
    nome: 'Batata Frita e Bacon',
    preco: 23.00,
    categoria: 'porcoes',
    descricao: 'Porção de batata frita com bacon'
  },
  {
    id: 'porcao-04',
    nome: 'Batata Frita, Bacon e Cheddar',
    preco: 26.00,
    categoria: 'porcoes',
    descricao: 'Porção de batata frita com bacon e cheddar'
  },
  {
    id: 'porcao-05',
    nome: 'Bolinho de Queijo',
    preco: 18.00,
    categoria: 'porcoes',
    descricao: 'Porção de bolinho de queijo'
  },
  {
    id: 'porcao-06',
    nome: 'Coxinha',
    preco: 18.00,
    categoria: 'porcoes',
    descricao: 'Porção de coxinha'
  },
  {
    id: 'porcao-07',
    nome: 'Salame',
    preco: 22.00,
    categoria: 'porcoes',
    descricao: 'Porção de salame'
  },
  {
    id: 'porcao-08',
    nome: 'Azeitona',
    preco: 16.00,
    categoria: 'porcoes',
    descricao: 'Porção de azeitona'
  },
  {
    id: 'porcao-09',
    nome: 'Queijo',
    preco: 22.00,
    categoria: 'porcoes',
    descricao: 'Porção de queijo'
  },
  {
    id: 'porcao-10',
    nome: 'Calabresa',
    preco: 32.00,
    categoria: 'porcoes',
    descricao: 'Porção de calabresa'
  },
  {
    id: 'porcao-11',
    nome: 'Carne de Sol Acebolada (Palito)',
    preco: 36.00,
    categoria: 'porcoes',
    descricao: 'Carne de sol acebolada'
  },
  {
    id: 'porcao-12',
    nome: 'Carne de Sol com Fritas (Palito)',
    preco: 52.00,
    categoria: 'porcoes',
    descricao: 'Carne de sol com batata frita'
  },
  {
    id: 'porcao-13',
    nome: 'Tábua de Frios',
    preco: 45.00,
    categoria: 'porcoes',
    descricao: 'Salame, palmito, azeitona e queijo'
  },
  {
    id: 'porcao-14',
    nome: 'Caldos',
    preco: 10.00,
    categoria: 'porcoes',
    descricao: 'Consulte sabores'
  },

  // COMBOS
  {
    id: 'combo-01',
    nome: 'Combo Junior',
    preco: 38.00,
    categoria: 'combos',
    descricao: '2X Salada, Batata Frita, Suco de Laranja 500ml'
  },
  {
    id: 'combo-02',
    nome: 'Combo Turbo',
    preco: 60.00,
    categoria: 'combos',
    descricao: '2X Mister Jhon, Batata Frita, Guaraná 1L'
  }
]

export const TAXA_ENTREGA = 3.00
