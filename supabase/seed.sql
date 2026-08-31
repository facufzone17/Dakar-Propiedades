-- ============================================================================
-- Seed: las 18 propiedades reales del catálogo actual.
-- Las fotos apuntan a los archivos que ya viven en el repo (public/propiedades/).
-- Ejecutar DESPUÉS de 0001_init.sql. Es idempotente (on conflict do nothing).
-- ============================================================================

insert into public.propiedades
  (id, operacion, tipo, direccion, barrio, zona, precio, moneda, expensas,
   ambientes, dormitorios, banos, cocheras, m2_cubiertos, m2_terreno, antiguedad,
   descripcion, amenities, fotos, fuente_url, destacada)
values
('20192603','venta','Departamento','3 de Febrero 2800','Belgrano','CABA',198000,'USD',320000,
 3,2,2,null,80,null,null,
 'DEPARTAMENTO DE 3 AMB. AL FRTE 2 BAÑOS EXCELENTE ESTADO IMPECABLE DORM. EN SUITE C.VESTIDOR PATIO COCINA COMODA EQUIPADA LOSA RADIANTE MUY LUMINOSO VTA DIRECTA CONSULTE',
 array['Balcón','Suite','Vestidor','Patio','Lavadero','Ascensor','Calefacción','Gas natural','Muebles de cocina'],
 array['/propiedades/20192603/1.jpg','/propiedades/20192603/2.jpg','/propiedades/20192603/3.jpg','/propiedades/20192603/4.jpg','/propiedades/20192603/5.jpg','/propiedades/20192603/6.jpg'],
 'https://www.argenprop.com/departamento-en-venta-en-belgrano-3-ambientes--20192603',true),

('19386282','venta','Departamento','Cabello 3900, piso 8','Palermo','CABA',128000,'USD',150000,
 3,2,1,null,null,null,null,
 'Buen Departamento Muy Luminoso, Excelente ubicación- Dormitorios c/ Placar propiedad desocupada venta directa Consulte Dakar Propiedades',
 array['Balcón'],
 array['/propiedades/19386282/1.jpg','/propiedades/19386282/2.jpg','/propiedades/19386282/3.jpg','/propiedades/19386282/4.jpg','/propiedades/19386282/5.jpg','/propiedades/19386282/6.jpg'],
 'https://www.argenprop.com/departamento-en-venta-en-palermo-3-ambientes--19386282',false),

('16362610','alquiler','Departamento','Terrada 1800, piso 5','Villa del Parque','CABA',750000,'ARS',160000,
 2,1,1,null,40,null,null,
 'EXCELENTE DEPARTAMENTO DE 2 AMBIENTES ALFRENTE CON BALCON SEMIPISO MUY LUMINOSO Y AIREADO A UNA CUADRA DE AV NAZCA Y A 2 DE ALVAREZ JONTE CONSULTE DAKAR',
 array['Balcón','Cocina separada','Living comedor','Ascensor','Gas natural','Muebles de cocina','Termotanque'],
 array['/propiedades/16362610/1.jpg','/propiedades/16362610/2.jpg','/propiedades/16362610/3.jpg','/propiedades/16362610/4.jpg','/propiedades/16362610/5.jpg','/propiedades/16362610/6.jpg'],
 'https://www.argenprop.com/departamento-en-alquiler-en-villa-del-parque-2-ambientes--16362610',true),

('20192615','venta','Departamento','Teniente General Juan Domingo Perón 2100, PB','Balvanera','CABA',65000,'USD',120000,
 2,1,2,null,36,null,null,
 'MUY BUEN DEPTO PLANTA BAJA APTO PROFESIONAL 2 BAÑOS LUMINOSO PATIO LAVADERO LUGAR DE GUARDADO CONSULTE',
 array['Apto profesional','Patio','Lavadero','Planta baja'],
 array['/propiedades/20192615/1.jpg','/propiedades/20192615/2.jpg','/propiedades/20192615/3.jpg','/propiedades/20192615/4.jpg','/propiedades/20192615/5.jpg','/propiedades/20192615/6.jpg'],
 'https://www.argenprop.com/departamento-en-venta-en-balvanera-2-ambientes--20192615',false),

('15254852','alquiler','Departamento','Av. Juan Bautista Alberdi 2900, piso 7','Flores','CABA',550000,'ARS',160000,
 1,null,1,null,33,null,8,
 'EXCELENTE DEPARTAMENTO DE 1 AMBIENTE FRENTE BALCÓN MUY LUMINOSO AMPLIO AIRE ACONDICIONADO CONSULTE DAKAR PROPIEDADES',
 array['Balcón','Aire acondicionado central','Ascensor','Frente'],
 array['/propiedades/15254852/1.jpg','/propiedades/15254852/2.jpg','/propiedades/15254852/3.jpg','/propiedades/15254852/4.jpg','/propiedades/15254852/5.jpg','/propiedades/15254852/6.jpg'],
 'https://www.argenprop.com/departamento-en-alquiler-en-flores-1-ambiente--15254852',false),

('16400078','alquiler','Departamento','Nahuel Huapi 4900, piso 1','Villa Urquiza','CABA',680000,'ARS',160000,
 1,null,1,null,36,null,null,
 'Muy buen departamento amplio Excelente Estado con SUM sin pileta super luminoso y aireado todo impecable A/ Acondicionado',
 array['Balcón corrido','SUM','Aire acondicionado','Vista ciudad','Contrafrente'],
 array['/propiedades/16400078/1.jpg','/propiedades/16400078/2.jpg','/propiedades/16400078/3.jpg','/propiedades/16400078/4.jpg','/propiedades/16400078/5.jpg','/propiedades/16400078/6.jpg'],
 'https://www.argenprop.com/departamento-en-alquiler-en-villa-urquiza-1-ambiente--16400078',false),

('12780065','venta','PH','Mariano Acosta 1300, PB','Flores Sur','CABA',50000,'USD',null,
 2.5,2,1,null,null,null,null,
 'DEPARTAMENTO PLANTA BAJA 2 HABITACIONES COCINA BAÑO PATIO TODO EN PLANTA BAJA OPORTUNIDAD. DAKAR',
 array['Patio','Planta baja','Apto crédito'],
 array['/propiedades/12780065/1.jpg','/propiedades/12780065/2.jpg','/propiedades/12780065/3.jpg','/propiedades/12780065/4.jpg','/propiedades/12780065/5.jpg','/propiedades/12780065/6.jpg'],
 'https://www.argenprop.com/ph-en-venta-en-flores-sur--12780065',false),

('15838966','venta','Departamento','Esmeralda 900','Microcentro','CABA',78000,'USD',null,
 1,1,null,null,null,null,null,
 'EXCELENTE DEPARTAMENTO PARA INVERSIÓN PLENO MICRO CENTRO ESMERALDA Y PARAGUAY TODO EQUIPADO EXCELENTE ESTADO CONSULTE',
 array['Totalmente equipado','Apto crédito','Ideal inversión'],
 array['/propiedades/15838966/1.jpg','/propiedades/15838966/2.jpg','/propiedades/15838966/3.jpg','/propiedades/15838966/4.jpg','/propiedades/15838966/5.jpg','/propiedades/15838966/6.jpg'],
 'https://www.argenprop.com/departamento-en-venta-en-microcentro-1-ambiente--15838966',false),

('10909089','venta','PH','3 de Febrero 500, PB','Villa Sarmiento','Ramos Mejía, GBA',123000,'USD',null,
 5,4,2,null,110,null,null,
 '2 DEPARTAMENTOS TIPO CASA PLANTA BAJA Y PLANTA ALTA - PATIO Y BALCÓN TERRAZA GRANDE DOS COCINAS BAÑOS IDEAL 2 FAMILIAS CONSULTE OPORTUNIDAD',
 array['Patio','Terraza','2 cocinas','Ideal 2 familias','Apto crédito'],
 array['/propiedades/10909089/1.jpg','/propiedades/10909089/2.jpg','/propiedades/10909089/3.jpg','/propiedades/10909089/4.jpg','/propiedades/10909089/5.jpg','/propiedades/10909089/6.jpg'],
 'https://www.argenprop.com/ph-en-venta-en-villa-sarmiento-5-ambientes--10909089',false),

('19665261','alquiler','Departamento','Av. Francisco Beiró 4800','Villa Real','CABA',2600000,'ARS',150000,
 3,2,2,1,null,null,null,
 'EXCELENTE DEPARTAMENTO DE 3 AMB. 2 BAÑOS A ESTRENAR CON PATIO CON PARRILLA EXCELENTE',
 array['A estrenar','Patio','Parrilla','Cochera'],
 array['/propiedades/19665261/1.jpg','/propiedades/19665261/2.jpg','/propiedades/19665261/3.jpg','/propiedades/19665261/4.jpg','/propiedades/19665261/5.jpg','/propiedades/19665261/6.jpg'],
 'https://www.argenprop.com/departamento-en-alquiler-en-villa-real-3-ambientes--19665261',true),

('16267744','venta','Departamento','Av. Olivera 100','Floresta','CABA',72000,'USD',null,
 1,null,1,null,null,null,null,
 'EXCELENTE DEPARTAMENTO A ESTRENAR AL FRENTE BALCÓN CORRIDO A/AC IMPECABLE MATERIALES DE PRIMERA- CONSULTE DAKAR PROPIEDADES',
 array['A estrenar','Balcón corrido','Aire acondicionado','Frente','Apto crédito'],
 array['/propiedades/16267744/1.jpg','/propiedades/16267744/2.jpg','/propiedades/16267744/3.jpg','/propiedades/16267744/4.jpg','/propiedades/16267744/5.jpg','/propiedades/16267744/6.jpg'],
 'https://www.argenprop.com/departamento-en-venta-en-floresta-1-ambiente--16267744',false),

('16200750','venta','Local','Av. Álvarez Jonte 2700','Villa del Parque','CABA',83000,'USD',110000,
 null,null,null,null,30,null,null,
 'EXCELENTE LOCAL VARIOS RUBREOS SOBRE AVENIDA EDIFICIO NUEVO A ESTRENAR CONSULTE',
 array['A estrenar','Sobre avenida','Vía pública','En edificio'],
 array['/propiedades/16200750/1.jpg','/propiedades/16200750/2.jpg','/propiedades/16200750/3.jpg','/propiedades/16200750/4.jpg','/propiedades/16200750/5.jpg','/propiedades/16200750/6.jpg'],
 'https://www.argenprop.com/local-en-venta-en-villa-del-parque--16200750',false),

('12959385','venta','Quinta','Talcahuano 2300','Paso del Rey','Moreno, GBA',150000,'USD',null,
 null,2,1,null,85,800,1,
 'excelente casa nueva con parque quincho consulte',
 array['Quincho','Parque','Lote 20 x 40','Apto crédito'],
 array['/propiedades/12959385/1.jpg','/propiedades/12959385/2.jpg','/propiedades/12959385/3.jpg','/propiedades/12959385/4.jpg','/propiedades/12959385/5.jpg','/propiedades/12959385/6.jpg'],
 'https://www.argenprop.com/quinta-en-venta-en-paso-del-rey--12959385',true),

('8922305','venta','Departamento','La Pampa 700, piso 1','Belgrano Chico','CABA',220000,'USD',null,
 1,null,null,null,51,null,null,
 'EXCELENTE AMBIENTE FRENTE BALCÓN CORRIDO IMPECABLE VISTA NUEVO A/A A UN PASO DE HERMOSOS PARQUES CONSULTE MÁS DETALLES A DAKAR PROPIEDADES',
 array['Balcón','Pileta','Gimnasio','Solárium','Salón de fiestas','Laundry','Seguridad','Vigilancia'],
 array['/propiedades/8922305/1.jpg','/propiedades/8922305/2.jpg','/propiedades/8922305/3.jpg','/propiedades/8922305/4.jpg','/propiedades/8922305/5.jpg','/propiedades/8922305/6.jpg'],
 'https://www.argenprop.com/departamento-en-venta-en-belgrano-chico-1-ambiente--8922305',true),

('8009568','venta','Departamento','Alejandro Magariños Cervantes 1800, piso 5','Paternal','CABA',110000,'USD',null,
 2,1,1,1,40,null,null,
 'EXCELENTE DEPARTAMENTO. MUY LUMINOSO CON LAVADERO BALCÓN BAÑO COMPLETO DORMITORIO CON PLACAR COCINA EQUIPADA CON COCHERA FIJA CONSULTE',
 array['Balcón','Lavadero','Cochera fija','Cocina equipada','Apto crédito'],
 array['/propiedades/8009568/1.jpg','/propiedades/8009568/2.jpg','/propiedades/8009568/3.jpg','/propiedades/8009568/4.jpg','/propiedades/8009568/5.jpg','/propiedades/8009568/6.jpg'],
 'https://www.argenprop.com/departamento-en-venta-en-paternal--8009568',false),

('18041174','venta','Departamento','Bolivia 400, piso 17','Flores','CABA',115000,'USD',160000,
 4,3,1,null,84,null,null,
 'EXCELENTE DEPTO MUY AMPLIO 3 DORMITORIOS CON PLACAR, BAÑO COMPLETO TOILETTE MUY LUMINOSO A/ ACONDICIONADO VENTILADOR DE TECHO COCINA COMEDOR EQUIPADA LAVADERO EXCELENTE UBICACION CONSULTE DAKAR PROPIEDADES',
 array['Toilette','Aire acondicionado','Lavadero','Cocina comedor equipada','Contrafrente'],
 array['/propiedades/18041174/1.jpg','/propiedades/18041174/2.jpg','/propiedades/18041174/3.jpg','/propiedades/18041174/4.jpg','/propiedades/18041174/5.jpg','/propiedades/18041174/6.jpg'],
 'https://www.argenprop.com/departamento-en-venta-en-flores-4-ambientes--18041174',true),

('17444454','venta','Galpón','Chacras de Nogolí','Juan Martín de Pueyrredón','San Luis',950000,'USD',null,
 null,null,null,null,null,null,null,
 'EXCELENTE CAMPO EN SAN LUIS - PREPARADO PARA COUNTRY CHACRAS DE NOGOLI CALLES PREPARADO PARA VENTA. CONSULTE DAKAR PROPIEDADES',
 array['Preparado para country','Calles abiertas'],
 array['/propiedades/17444454/1.jpg'],
 'https://www.argenprop.com/galpon-en-venta-en-san-luis--17444454',false),

('19008415','venta','Galpón','Joaquín V. González 2700','Villa del Parque','CABA',960000,'USD',null,
 null,null,2,null,430,null,40,
 'EXCELENTE GALPON DOBLE FRENTE. 17,30 m de frente por 30 m de fondo.',
 array['Doble frente','2 oficinas','Portón corredizo','Agua corriente','Electricidad','Fuerza motriz'],
 array['/propiedades/19008415/1.jpg'],
 'https://www.argenprop.com/galpon-en-venta-en-villa-del-parque--19008415',false)

on conflict (id) do nothing;
