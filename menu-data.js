/*
  Datos del menú por sucursal.

  Para editar:
  - Cada sucursal tiene su lista de tarjetas (categorías).
  - Cada tarjeta tiene sus "tipos" (variantes) con nombre, descripción, precio y foto.
  - Si un tipo no tiene foto, se muestra un espacio con el ícono y "Foto próximamente".
  - Para quitar una tarjeta de una sucursal, bórrala de la lista de esa sucursal.
  - Una sucursal con la lista vacía muestra "Menú próximamente".
*/

const PHOTO = 'assets/menu-photos/';

/* ---------- Tipos compartidos (tomados del menú impreso) ---------- */

const MARISCOS_TOSTADA = [['Cangrejo', 'Q35'], ['Camarón', 'Q35'], ['Pulpo', 'Q40'], ['Pescado', 'Q40']];

const CEVICHE_TABLA = (medio, libra) => ({
  cols: ['1–2 mariscos', '3–4 mariscos', 'Vegetariano'],
  rows: [['½ lb', ...medio], ['1 lb', ...libra]]
});

const CEVICHES = [
  { name: 'Aguachile', desc: 'A base de cilantro, limón, cebolla morada en juliana, pepino y aguacate.', table: CEVICHE_TABLA(['Q99', 'Q115', 'Q89'], ['Q149', 'Q169', 'Q129']) },
  { name: 'Ajonjolí', desc: 'A base de aceite de ajonjolí, salsa soya, pepino, tomate, cebolla en juliana y aguacate.', table: CEVICHE_TABLA(['Q99', 'Q115', 'Q89'], ['Q149', 'Q169', 'Q129']) },
  { name: 'Chapín', desc: 'A base de tomate, cebolla, cilantro y aguacate.', table: CEVICHE_TABLA(['Q99', 'Q115', 'Q89'], ['Q149', 'Q169', 'Q129']) },
  { name: 'Coctel', desc: 'A base de salsa dulce, picante, cebolla, cilantro y aguacate. (Es posible sin picante).', table: CEVICHE_TABLA(['Q70', 'Q89', 'Q89'], ['Q125', 'Q139', 'Q129']) },
  { name: 'Mazatlán', desc: 'A base de pepino, cebolla morada picada, camote, elote y aguacate.', table: CEVICHE_TABLA(['Q99', 'Q115', 'Q89'], ['Q149', 'Q169', 'Q129']) },
  { name: 'Mexicano', desc: 'A base de jugos cítricos, cebolla morada en juliana, cilantro, tomate, jalapeño y aguacate.', table: CEVICHE_TABLA(['Q99', 'Q115', 'Q89'], ['Q149', 'Q169', 'Q129']) },
  { name: 'Veracruzano', desc: 'A base de jugos cítricos, cebolla morada en juliana, cilantro y aguacate.', table: CEVICHE_TABLA(['Q99', 'Q115', 'Q89'], ['Q149', 'Q169', 'Q129']) },
  { name: 'Aguachile negro', desc: 'A base de salsas negras, pepino, cebolla morada y aguacate.', photo: PHOTO + 'aguachile-negro.jpg', options: [['½ lb', 'Q99'], ['1 lb', 'Q149']] },
  { name: 'Ceviche de macha', desc: 'A base de cebolla morada, cebolla blanca, aguacate, manías y salsa macha.', photo: PHOTO + 'ceviche-macha.jpg', options: [['½ lb', 'Q99'], ['1 lb', 'Q149']] }
];

const CEVICHES_NOTA = 'Acompañados de picante, galletas o tostada horneada. Mariscos a tu elección: camarón, pulpo, cangrejo y pescado. Vegetariano con proteína de champiñón.';

const FISH_AND_CHIPS = { name: 'Fish and chips', desc: 'Filete de pescado dorado empanizado.', price: 'Q69', photo: PHOTO + 'fish-and-chips.jpg' };
const CAMARONES_EMPANIZADOS = { name: 'Camarones empanizados', desc: '½ libra de camarones empanizados.', price: 'Q89', photo: PHOTO + 'camarones-empanizados.jpg' };
const CAMARONES_AJILLO = { name: 'Camarones al ajillo', desc: '½ libra de camarones al ajillo.', price: 'Q89' };
const CAMARONES_DIABLA = { name: 'Camarones a la diabla', desc: 'A base de chiles, acompañado de guarnición a su elección.', price: 'Q99' };
const CAMARONES_CHIPOTLE = { name: 'Camarones al chipotle', desc: '½ libra de camarones al sartén con salsa chipotle a base de crema y queso provolone.', price: 'Q99' };

/* ---------- Sucursales ---------- */

const MENU_BRANCHES = [
  {
    id: 'san-isidro',
    number: '01',
    name: 'Centro San Isidro',
    zone: 'Zona 16',
    categories: [
      {
        id: 'fish-and-chips', icon: '🐟', title: 'Fish & Chips', tag: 'SIGNATURE', featured: true,
        desc: 'Pescado empanizado, papas crujientes y salsas de la casa.',
        note: 'Acompañado de 1 guarnición y 1 aderezo a tu elección.',
        items: [FISH_AND_CHIPS]
      },
      {
        id: 'camarones', icon: '🍤', title: 'Camarones',
        desc: 'Camarones dorados con acompañamiento y salsa.',
        items: [CAMARONES_AJILLO, CAMARONES_EMPANIZADOS, CAMARONES_DIABLA, CAMARONES_CHIPOTLE]
      },
      {
        id: 'ceviches', icon: '🥣', title: 'Ceviches',
        desc: 'Opciones frescas de ½ lb y 1 lb.',
        note: CEVICHES_NOTA,
        items: CEVICHES
      },
      { id: 'chicken-fingers', icon: '🍗', title: 'Chicken Fingers', desc: 'Tiernos por dentro, crujientes por fuera.', items: [] },
      { id: 'signature-burger', icon: '🍔', title: 'Signature Burger', desc: 'Una hamburguesa con identidad Fish.', items: [] },
      { id: 'tostitos', icon: '🌶️', title: 'Tostitos con Camarón', desc: 'Pico de gallo, camarón y mucho crunch.', items: [] }
    ]
  },
  {
    id: 'zona15',
    number: '02',
    name: 'Fish2Go',
    zone: 'Zona 15',
    fullMenu: 'menu-zona15.html',
    categories: [
      {
        id: 'empanizados', icon: '🐟', title: 'Fish & Chips y empanizados', tag: 'SIGNATURE', featured: true,
        desc: 'Dorados, crujientes y hechos para repetir.',
        note: 'Acompañados de 1 guarnición y 1 aderezo a tu elección.',
        items: [
          FISH_AND_CHIPS,
          CAMARONES_EMPANIZADOS,
          { name: 'Calamares empanizados', desc: '½ libra de calamares empanizados.', price: 'Q105' }
        ]
      },
      {
        id: 'para-empezar', icon: '🌶️', title: 'Para empezar',
        desc: 'Tostones, tostadas y entradas para compartir.',
        items: [
          { name: 'Chiles jalapeños', desc: 'Envueltos con tocino y empanizados.', price: 'Q139', photo: PHOTO + 'chiles-jalapenos.jpg' },
          { name: 'Tostones', desc: 'Cama de tostones de la casa con base de mayonesa, pico de gallo y jalapeño, coronado con marisco, aguacate y lechuga.', options: [['Cangrejo', 'Q50'], ['Camarón', 'Q50'], ['Pulpo', 'Q55'], ['Pescado', 'Q55'], ['Super mixto', 'Q69']] },
          { name: 'Tostada Chapina', desc: 'Base de mayonesa de la casa, cubierta con pico de gallo, jalapeño y coronada con aguacate y lechuga.', options: MARISCOS_TOSTADA },
          { name: 'Tostada Veracruzana', desc: 'Base de aguacate, cubierta con chipotle, pepino y cebolla morada en juliana.', options: MARISCOS_TOSTADA },
          { name: 'Tostada de Aguachile', desc: 'A base de cilantro, limón, cebolla morada en juliana, pepino y aguacate.', options: MARISCOS_TOSTADA },
          { name: 'Tostada de pistacho', desc: 'Base de camarón cubierta de aguacate, chipotle, cebolla morada, serrano y pistacho.', price: 'Q35' },
          { name: 'Triángulos de mozzarella', desc: 'Con salsa pomodoro.', price: 'Q89' },
          { name: 'Carpaccio de pulpo', desc: 'Lascas de pulpo, alcaparras, aceite de oliva y queso parmesano, acompañado de pan.', price: 'Q115' },
          { name: 'Tiradito de atún', desc: 'Lascas de atún con fruto exótico, cebolla morada, aguacate y su aderezo asiático.', price: 'Q120' }
        ]
      },
      {
        id: 'al-ajillo', icon: '🧄', title: 'Al ajillo',
        desc: 'Mariscos salteados al ajillo, al estilo de la casa.',
        note: 'Acompañados de 1 guarnición y 1 aderezo a tu elección.',
        items: [
          CAMARONES_AJILLO,
          { name: 'Pulpo al ajillo', desc: '½ libra de pulpo al ajillo.', price: 'Q89' },
          { name: 'Calamares al ajillo', desc: '½ libra de calamares al ajillo.', price: 'Q105' },
          { name: 'Mejillones al ajillo', price: 'Q89' },
          { name: 'Abulón al ajillo', price: 'Q115' },
          { name: 'Pulpo y camarón', desc: 'Pulpo y camarón al ajillo.', price: 'Q149' },
          { name: 'Super mixto', desc: 'Pulpo, camarón y calamar al ajillo.', price: 'Q179' }
        ]
      },
      {
        id: 'ceviches', icon: '🥣', title: 'Ceviches · Mesa fría',
        desc: 'Nueve estilos de ceviche en ½ lb y 1 lb.',
        note: CEVICHES_NOTA + ' Extra: paquete de tostadas Q35 · 2 galletas Q10.',
        items: CEVICHES
      },
      {
        id: 'platillos', icon: '🍲', title: 'Platillos',
        desc: 'Bocado del pescador, canoas, caldos y más.',
        note: 'Los platillos se venden únicamente en restaurante.',
        items: [
          { name: 'Bocado del pescador', desc: 'Fumet de mariscos condimentado con crema de leche y especias de la casa, servido en pan artesanal de masa madre.', price: 'Q189', photo: PHOTO + 'bocado-del-pescador.jpg' },
          { name: 'Bocado del pescador mixto', price: 'Q239' },
          CAMARONES_DIABLA,
          CAMARONES_CHIPOTLE,
          { name: 'La canoa de camarón', desc: 'Tortilla de maíz frita con camarón al ajillo, repollo morado y aderezo a su elección.', price: 'Q89' },
          { name: 'La canoa de pulpo', desc: 'Tortilla frita con pulpo al ajillo, repollo morado y aderezo chipotle.', price: 'Q89' },
          { name: 'La canoa de pescado empanizado', desc: 'Tortilla frita con pescado empanizado, repollo morado y aderezo a tu elección.', price: 'Q89' },
          { name: 'Mojarra frita', desc: 'Acompañada de guarnición a elección o ensalada de tomate, cebolla, lechuga, aguacate y aderezo.', price: 'Q120' },
          { name: 'Cazuela', desc: 'Camarones a base de aceite de oliva, acompañada de pan de orégano.', price: 'Q85' },
          { name: 'La zarzuela', desc: '½ lb de marisco a elección (camarón, pulpo, calamar o mejillón) salteado con aceite de oliva y salsa de zarzuela, con pan tostado. Extra de marisco Q45.', price: 'Q105' },
          { name: 'Caldo el marinero', desc: 'Caldo de camarón, calamar, pulpo y pescado.', price: 'Q189' }
        ]
      },
      {
        id: 'guarniciones', icon: '🍟', title: 'Guarniciones y aderezos',
        desc: 'Para acompañar cualquier plato.',
        compact: true,
        note: 'Aderezos: Tártara, Ranch, Mayonesa, Salsa dulce, Mostaza miel, Aguacate cilantro, Chipotle, Chiltepe ajo, Tamarindo chipotle, Pomodoro y Ajo parmesano.',
        items: [
          { name: 'Porción de papas fritas', price: 'Q22' },
          { name: 'Porción de papas de camote', price: 'Q20' },
          { name: 'Porción de tostones', price: 'Q25' },
          { name: 'Porción de aros de cebolla', price: 'Q30' },
          { name: 'Aderezo extra', price: 'Q5' }
        ]
      },
      {
        id: 'bebidas', icon: '🥤', title: 'Bebidas',
        desc: 'Naturales, sodas artesanales y calientes.',
        compact: true,
        photo: PHOTO + 'bebidas-naturales.jpg',
        items: [
          { name: 'Limonada natural', desc: 'Agua o soda.', price: 'Q15' },
          { name: 'Naranjada', desc: 'Agua o soda.', price: 'Q15' },
          { name: 'Tamarindo natural', desc: 'Agua o soda.', price: 'Q15' },
          { name: 'Cimarrona', price: 'Q15' },
          { name: 'Jengibre / Hierbabuena', price: 'Q18' },
          { name: 'Manzana', price: 'Q18' },
          { name: 'Fresa / Melocotón', price: 'Q18' },
          { name: 'Naranja / Maracuyá', price: 'Q18' },
          { name: 'Jamaica / Coco', price: 'Q18' },
          { name: 'Dr. Burns', desc: 'Soda artesanal de agua volcánica de Guatemala: Sandía, Raspberry lime, Cherry bomb, Cremita.', price: 'Q19' },
          { name: 'Botella de agua pura', price: 'Q10' },
          { name: 'Agua mineral', price: 'Q12' },
          { name: 'Coca Cola', price: 'Q12' },
          { name: 'Pepsi, Pepsi Zero', price: 'Q12' },
          { name: '7UP, Mirinda, Grapette', price: 'Q12' },
          { name: 'Canada Dry', price: 'Q12' },
          { name: 'Café americano', price: 'Q15' },
          { name: 'Té de distintos sabores', price: 'Q12' }
        ]
      },
      {
        id: 'postres', icon: '🍨', title: 'Postres',
        desc: 'Churros y pastel con helado.',
        note: 'Sabores de helado: chocolate y vainilla.',
        items: [
          { name: 'Canasta de churros', desc: '2 canastas de churros con helado de vainilla al centro, topping de fresa, chocolate o caramelo.', price: 'Q60' },
          { name: 'Pastel de zanahoria', desc: 'Porción de pastel de zanahoria con una bola de helado.', price: 'Q39' }
        ]
      },
      {
        id: 'cervezas', icon: '🍺', title: 'Cervezas',
        desc: 'Nacionales, importadas y artesanales.',
        compact: true,
        items: [
          { name: 'Gallo', price: 'Q25' },
          { name: 'Cabro', price: 'Q25' },
          { name: 'Modelo', price: 'Q25' },
          { name: 'Corona', price: 'Q25' },
          { name: 'Corona Cero', price: 'Q20' },
          { name: 'Pacífico', price: 'Q20' },
          { name: 'Stella Artois', price: 'Q29' },
          { name: 'Michelob', price: 'Q29' },
          { name: 'Montecarlo', price: 'Q29' },
          { name: 'Picosita cerveza', price: 'Q35' },
          { name: 'Picosita mineral', price: 'Q20' },
          { name: 'Zapoteca', price: 'Q40' },
          { name: 'Cervezas artesanales', desc: 'Antigua, Sin Novia, Muy Noble, Cervecería 14, Chelita Linda.', price: 'Q40' }
        ]
      }
    ]
  },
  {
    id: 'antigua',
    number: '03',
    name: 'The Court',
    zone: 'Antigua',
    categories: []
  }
];
