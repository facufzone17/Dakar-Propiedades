-- ============================================================================
-- Seed: 18 propiedades ficticias de demo (mismas que src/data/propiedades.ts).
-- Las fotos apuntan a los archivos del repo (public/propiedades/).
-- Ejecutar DESPUÉS de 0001_init.sql. Es idempotente (on conflict do nothing).
-- ============================================================================

insert into public.propiedades
  (id, operacion, tipo, direccion, barrio, zona, precio, moneda, expensas,
   ambientes, dormitorios, banos, cocheras, m2_cubiertos, m2_terreno, antiguedad,
   descripcion, amenities, fotos, fuente_url, destacada)
values
('depto-devoto-01','venta','Departamento','Nueva York 3800, piso 4','Villa Devoto','CABA',179000,'USD',95000,
 3,2,2,1,78,null,12,
 'Departamento de 3 ambientes al frente, muy luminoso, con balcón corrido. Living comedor amplio, cocina con muebles y lavadero independiente. Dormitorio en suite y segundo dormitorio con placard. Cochera cubierta en el edificio. A pocas cuadras de la plaza y del subte B.',
 array['Balcón','Suite','Lavadero','Cochera','Ascensor','Gas natural','Muebles de cocina'],
 array['/propiedades/depto-devoto-01/1.jpg','/propiedades/depto-devoto-01/2.jpg','/propiedades/depto-devoto-01/3.jpg','/propiedades/depto-devoto-01/4.jpg','/propiedades/depto-devoto-01/5.jpg'],
 null,true),

('depto-villa-del-parque-02','alquiler','Departamento','Marcos Sastre 2900, piso 2','Villa del Parque','CABA',620000,'ARS',110000,
 2,1,1,null,44,null,20,
 'Dos ambientes al frente con balcón, muy buena distribución. Cocina separada con espacio para mesa, dormitorio con placard y baño completo con ventana. Edificio con ascensor a media cuadra de la estación de tren y de Av. Nazca.',
 array['Balcón','Cocina separada','Living comedor','Ascensor','Gas natural','Frente'],
 array['/propiedades/depto-villa-del-parque-02/1.jpg','/propiedades/depto-villa-del-parque-02/2.jpg','/propiedades/depto-villa-del-parque-02/3.jpg','/propiedades/depto-villa-del-parque-02/4.jpg','/propiedades/depto-villa-del-parque-02/5.jpg'],
 null,true),

('depto-monte-castro-03','venta','Departamento','Baigorria 4200, piso 1','Monte Castro','CABA',112000,'USD',68000,
 2,1,1,null,46,null,35,
 'Departamento de 2 ambientes en excelente estado, contrafrente muy silencioso y luminoso. Piso de parquet, cocina equipada y balcón con lavadero. Apto crédito. Bajas expensas.',
 array['Balcón','Lavadero','Ascensor','Apto crédito','Gas natural','Contrafrente'],
 array['/propiedades/depto-monte-castro-03/1.jpg','/propiedades/depto-monte-castro-03/2.jpg','/propiedades/depto-monte-castro-03/3.jpg','/propiedades/depto-monte-castro-03/4.jpg','/propiedades/depto-monte-castro-03/5.jpg'],
 null,false),

('ph-floresta-04','venta','PH','Bahía Blanca 1500','Floresta','CABA',168000,'USD',null,
 4,3,2,null,95,120,55,
 'PH al frente sin expensas, tipo casa, con patio y terraza propia. Planta baja con living comedor, cocina y toilette; en la planta alta tres dormitorios y baño completo. Muy buena entrada de luz. Ideal familia.',
 array['Patio','Terraza','Sin expensas','Lavadero','Parrilla','Gas natural'],
 array['/propiedades/ph-floresta-04/1.jpg','/propiedades/ph-floresta-04/2.jpg','/propiedades/ph-floresta-04/3.jpg','/propiedades/ph-floresta-04/4.jpg','/propiedades/ph-floresta-04/5.jpg'],
 null,true),

('mono-villa-real-05','alquiler','Departamento','Lascano 5900, piso 3','Villa Real','CABA',390000,'ARS',70000,
 1,null,1,null,32,null,15,
 'Monoambiente amplio y luminoso al frente, con balcón. Cocina integrada con muebles, placard empotrado y aire acondicionado frío/calor. Edificio con ascensor sobre el límite con Versalles.',
 array['Balcón','Aire acondicionado','Ascensor','Frente','Muebles de cocina'],
 array['/propiedades/mono-villa-real-05/1.jpg','/propiedades/mono-villa-real-05/2.jpg','/propiedades/mono-villa-real-05/3.jpg','/propiedades/mono-villa-real-05/4.jpg'],
 null,false),

('depto-agronomia-06','venta','Departamento','Tinogasta 3300, piso 6','Agronomía','CABA',155000,'USD',105000,
 3,2,1,null,65,null,8,
 'Tres ambientes a estrenar con vista abierta al parque. Ambientes integrados, pisos de porcelanato, cocina con isla y balcón aterrazado. Edificio con laundry y terraza con parrilla. Excelente ubicación frente a espacios verdes.',
 array['Balcón','Terraza','Parrilla','Laundry','Ascensor','Vista abierta'],
 array['/propiedades/depto-agronomia-06/1.jpg','/propiedades/depto-agronomia-06/2.jpg','/propiedades/depto-agronomia-06/3.jpg','/propiedades/depto-agronomia-06/4.jpg','/propiedades/depto-agronomia-06/5.jpg'],
 null,false),

('depto-villa-pueyrredon-07','alquiler','Departamento','Mosconi 3600, piso 5','Villa Pueyrredón','CABA',720000,'ARS',135000,
 2,1,1,null,48,null,6,
 'Departamento de 2 ambientes moderno, semipiso al contrafrente. Cocina integrada equipada, dormitorio con placard y balcón con visuales despejadas. Edificio con seguridad y ascensor. A metros de Av. Mosconi.',
 array['Balcón','Seguridad','Ascensor','Muebles de cocina','Contrafrente'],
 array['/propiedades/depto-villa-pueyrredon-07/1.jpg','/propiedades/depto-villa-pueyrredon-07/2.jpg','/propiedades/depto-villa-pueyrredon-07/3.jpg','/propiedades/depto-villa-pueyrredon-07/4.jpg','/propiedades/depto-villa-pueyrredon-07/5.jpg'],
 null,false),

('ph-villa-santa-rita-08','venta','PH','Condarco 2400','Villa Santa Rita','CABA',139000,'USD',25000,
 3,2,1,null,62,null,45,
 'PH en primer piso por escalera, tipo dúplex, muy luminoso y con bajas expensas. Living comedor con balcón, cocina independiente, dos dormitorios y patio en la planta superior. Zona tranquila y bien conectada.',
 array['Balcón','Patio','Cocina separada','Lavadero','Bajas expensas'],
 array['/propiedades/ph-villa-santa-rita-08/1.jpg','/propiedades/ph-villa-santa-rita-08/2.jpg','/propiedades/ph-villa-santa-rita-08/3.jpg','/propiedades/ph-villa-santa-rita-08/4.jpg','/propiedades/ph-villa-santa-rita-08/5.jpg'],
 null,true),

('local-villa-del-parque-09','venta','Local','Av. San Martín 5400','Villa del Parque','CABA',145000,'USD',null,
 null,null,1,null,70,null,40,
 'Local a la calle sobre avenida de alto tránsito peatonal y vehicular. Salón principal, depósito en entrepiso y baño. Excelente vidriera. Ideal comercio o local de servicios. Entrega inmediata.',
 array['A la calle','Entrepiso','Vidriera','Sobre avenida'],
 array['/propiedades/local-villa-del-parque-09/1.jpg','/propiedades/local-villa-del-parque-09/2.jpg','/propiedades/local-villa-del-parque-09/3.jpg'],
 null,false),

('depto-ramos-mejia-10','venta','Departamento','Rosales 200, piso 2','Ramos Mejía','La Matanza, Buenos Aires',98000,'USD',55000,
 2,1,1,null,50,null,28,
 'Departamento de 2 ambientes a una cuadra de la estación de Ramos Mejía y del centro comercial. Living con balcón, cocina con lavadero y dormitorio amplio con placard. Apto profesional.',
 array['Balcón','Lavadero','Ascensor','Apto profesional','Gas natural'],
 array['/propiedades/depto-ramos-mejia-10/1.jpg','/propiedades/depto-ramos-mejia-10/2.jpg','/propiedades/depto-ramos-mejia-10/3.jpg','/propiedades/depto-ramos-mejia-10/4.jpg','/propiedades/depto-ramos-mejia-10/5.jpg'],
 null,false),

('casa-castelar-11','venta','Casa','Los Álamos 1200','Castelar','Morón, Buenos Aires',235000,'USD',null,
 5,3,2,2,160,300,25,
 'Casa en dos plantas sobre lote propio, en zona residencial arbolada de Castelar Norte. Living comedor con hogar a leña, cocina con office, tres dormitorios (uno en suite), quincho con parrilla y jardín con fondo verde. Cochera para dos autos.',
 array['Jardín','Parrilla','Quincho','Suite','Cochera','Hogar a leña','Lavadero'],
 array['/propiedades/casa-castelar-11/1.jpg','/propiedades/casa-castelar-11/2.jpg','/propiedades/casa-castelar-11/3.jpg','/propiedades/casa-castelar-11/4.jpg','/propiedades/casa-castelar-11/5.jpg'],
 null,false),

('depto-caseros-12','alquiler','Departamento','Lisandro de la Torre 3100, piso 4','Caseros','Tres de Febrero, Buenos Aires',540000,'ARS',90000,
 3,2,1,null,60,null,18,
 'Tres ambientes al frente con balcón, luminoso y bien distribuido. Cocina con lavadero incorporado, dos dormitorios con placard y baño completo. A metros de la estación Caseros y de la Av. San Martín.',
 array['Balcón','Lavadero','Ascensor','Frente','Gas natural'],
 array['/propiedades/depto-caseros-12/1.jpg','/propiedades/depto-caseros-12/2.jpg','/propiedades/depto-caseros-12/3.jpg','/propiedades/depto-caseros-12/4.jpg','/propiedades/depto-caseros-12/5.jpg'],
 null,false),

('depto-moron-13','alquiler','Departamento','Brown 800, piso 7','Morón','Morón, Buenos Aires',460000,'ARS',85000,
 2,1,1,null,42,null,22,
 'Departamento de 2 ambientes en piso alto con vista despejada, contrafrente muy silencioso. Cocina separada, dormitorio con placard y balcón. Edificio con encargado permanente, a tres cuadras de la peatonal de Morón.',
 array['Balcón','Encargado','Ascensor','Cocina separada','Contrafrente'],
 array['/propiedades/depto-moron-13/1.jpg','/propiedades/depto-moron-13/2.jpg','/propiedades/depto-moron-13/3.jpg','/propiedades/depto-moron-13/4.jpg','/propiedades/depto-moron-13/5.jpg'],
 null,false),

('ph-haedo-14','venta','PH','Rivadavia 15400','Haedo','Morón, Buenos Aires',126000,'USD',null,
 3,2,1,1,72,90,50,
 'PH al fondo, muy reciclado, sin expensas y con cochera. Living comedor amplio, cocina nueva, dos dormitorios y patio con parrilla. Entrada independiente. A pocas cuadras de la estación de Haedo.',
 array['Patio','Parrilla','Cochera','Sin expensas','Entrada independiente','Reciclado'],
 array['/propiedades/ph-haedo-14/1.jpg','/propiedades/ph-haedo-14/2.jpg','/propiedades/ph-haedo-14/3.jpg','/propiedades/ph-haedo-14/4.jpg','/propiedades/ph-haedo-14/5.jpg'],
 null,false),

('galpon-ciudadela-15','venta','Galpón','Gaona 3900','Ciudadela','Tres de Febrero, Buenos Aires',185000,'USD',null,
 null,null,2,null,380,450,30,
 'Galpón sobre lote propio con 12 metros de frente. Nave principal con altura libre de 6 metros, portón de acceso para camión, dos oficinas, baños y entrepiso de depósito. Trifásica instalada. Ideal logística o producción.',
 array['Portón camión','Entrepiso','Oficinas','Trifásica','Altura libre 6 m'],
 array['/propiedades/galpon-ciudadela-15/1.jpg','/propiedades/galpon-ciudadela-15/2.jpg','/propiedades/galpon-ciudadela-15/3.jpg'],
 null,false),

('galpon-santos-lugares-16','alquiler','Galpón','Matheu 2600','Santos Lugares','Tres de Febrero, Buenos Aires',1250000,'ARS',null,
 null,null,1,null,210,240,35,
 'Galpón para depósito con oficina al frente y baño. Piso de hormigón llaneado, buena ventilación y portón corredizo. A dos cuadras de la estación y con acceso rápido a Camino de Cintura.',
 array['Portón corredizo','Oficina','Piso de hormigón','Ventilación'],
 array['/propiedades/galpon-santos-lugares-16/1.jpg','/propiedades/galpon-santos-lugares-16/2.jpg','/propiedades/galpon-santos-lugares-16/3.jpg'],
 null,false),

('quinta-paso-del-rey-17','venta','Quinta','Los Aromos 500','Paso del Rey','Moreno, Buenos Aires',162000,'USD',null,
 4,3,2,3,130,1000,20,
 'Quinta sobre lote de 1000 m² con pileta, parque parquizado y arboleda añosa. Casa principal de tres dormitorios, galería con parrilla, quincho cerrado y cochera para tres autos. Perforación propia. Ideal fin de semana o vivienda permanente.',
 array['Pileta','Parque','Parrilla','Quincho','Cochera','Perforación','Galería'],
 array['/propiedades/quinta-paso-del-rey-17/1.jpg','/propiedades/quinta-paso-del-rey-17/2.jpg','/propiedades/quinta-paso-del-rey-17/3.jpg','/propiedades/quinta-paso-del-rey-17/4.jpg','/propiedades/quinta-paso-del-rey-17/5.jpg'],
 null,true),

('campo-san-luis-18','venta','Campo','Ruta Provincial 9, km 12','Nogolí','Belgrano, San Luis',92000,'USD',null,
 null,null,null,null,null,240000,null,
 'Fracción de campo de 24 hectáreas al pie de la sierra, con acceso por camino consolidado. Loteado preliminar apto emprendimiento de chacras. Vistas panorámicas, tendido eléctrico sobre la ruta y buena disponibilidad de agua. Escritura al día.',
 array['Vista a la sierra','Acceso consolidado','Electricidad sobre ruta','Apto loteo'],
 array['/propiedades/campo-san-luis-18/1.jpg','/propiedades/campo-san-luis-18/2.jpg','/propiedades/campo-san-luis-18/3.jpg','/propiedades/campo-san-luis-18/4.jpg'],
 null,false)

on conflict (id) do nothing;
