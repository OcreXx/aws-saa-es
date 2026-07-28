/* =========================================================
   Exámenes de práctica (DumpsBase · dump1)
   Esquema por examen:
   { id, titulo, resumen, preguntas: [
       { pregunta, opciones:[...], correctas:[idx], explicacion }
   ]}
   Preguntas traducidas y condensadas al español. Los índices de
   "correctas" corresponden al orden de "opciones" (0 = A, 1 = B, ...).
   ========================================================= */
window.EXAMENES = [
  {
    id: "examen-01",
    titulo: "Examen de práctica 1",
    resumen: "50 preguntas tipo test sobre S3, EC2, VPC, bases de datos, desacoplamiento y seguridad, con respuesta correcta y explicación.",
    preguntas: [
      {
        pregunta: "Una empresa recopila datos de temperatura, humedad y presión atmosférica en ciudades de varios continentes. El volumen medio de datos que recopila desde cada sitio es de 500 GB al día. Cada sitio dispone de una conexión a Internet de alta velocidad. La empresa quiere agregar los datos de todos estos sitios globales en un único bucket de Amazon S3 lo más rápido posible. La solución debe minimizar la complejidad operativa. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Activar S3 Transfer Acceleration en el bucket de destino. Usar cargas multiparte para subir los datos de cada sitio directamente al bucket de destino.",
          "Subir los datos de cada sitio a un bucket de S3 en la Región más cercana. Usar S3 Cross-Region Replication para copiar los objetos al bucket de destino. Después eliminar los datos del bucket de origen.",
          "Programar trabajos diarios con dispositivos AWS Snowball Edge Storage Optimized para transferir los datos de cada sitio a la Región más cercana. Usar S3 Cross-Region Replication para copiar los objetos al bucket de destino.",
          "Subir los datos de cada sitio a una instancia de Amazon EC2 en la Región más cercana. Guardarlos en un volumen de Amazon EBS. A intervalos regulares, tomar una snapshot de EBS y copiarla a la Región del bucket de destino. Restaurar el volumen de EBS en esa Región."
        ],
        correctas: [0],
        explicacion: "S3 Transfer Acceleration usa las edge locations de CloudFront para acelerar las transferencias de larga distancia hacia S3, y las cargas multiparte suben directamente al bucket de destino. Es lo más rápido y con menos complejidad operativa; las demás opciones añaden pasos y componentes innecesarios."
      },
      {
        pregunta: "Una empresa necesita analizar los archivos de log de una aplicación propia. Los logs se almacenan en formato JSON en un bucket de Amazon S3. Las consultas serán simples y se ejecutarán bajo demanda. Un arquitecto de soluciones debe realizar el análisis con cambios mínimos en la arquitectura existente. ¿Qué debe hacer con el MENOR trabajo operativo?",
        opciones: [
          "Usar Amazon Redshift para cargar todo el contenido en un único lugar y ejecutar las consultas SQL cuando sea necesario.",
          "Usar Amazon CloudWatch Logs para almacenar los logs. Ejecutar consultas SQL desde la consola de CloudWatch cuando sea necesario.",
          "Usar Amazon Athena directamente sobre Amazon S3 para ejecutar las consultas cuando sea necesario.",
          "Usar AWS Glue para catalogar los logs. Usar un clúster transitorio de Apache Spark en Amazon EMR para ejecutar las consultas SQL cuando sea necesario."
        ],
        correctas: [2],
        explicacion: "Amazon Athena permite consultar datos directamente en S3 con SQL estándar, sin servidores ni cargas previas. Es lo ideal para consultas puntuales sobre JSON en S3 con el mínimo trabajo operativo."
      },
      {
        pregunta: "Una empresa usa AWS Organizations para gestionar varias cuentas de AWS de distintos departamentos. La cuenta de gestión tiene un bucket de Amazon S3 con informes de proyectos. La empresa quiere limitar el acceso a este bucket solo a los usuarios de cuentas que pertenezcan a la organización de AWS Organizations. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Añadir la clave de condición global aws:PrincipalOrgID, con el ID de la organización, a la política del bucket de S3.",
          "Crear una unidad organizativa (OU) por departamento. Añadir la clave de condición global aws:PrincipalOrgPaths a la política del bucket.",
          "Usar AWS CloudTrail para monitorizar los eventos CreateAccount, InviteAccountToOrganization, LeaveOrganization y RemoveAccountFromOrganization. Actualizar la política del bucket en consecuencia.",
          "Etiquetar a cada usuario que necesite acceso al bucket. Añadir la clave de condición global aws:PrincipalTag a la política del bucket."
        ],
        correctas: [0],
        explicacion: "aws:PrincipalOrgID condiciona el acceso a que la petición provenga de una cuenta de la organización, sin tener que listar todos los IDs de cuenta. Es la forma más simple y con menos mantenimiento."
      },
      {
        pregunta: "Una aplicación se ejecuta en una instancia de Amazon EC2 dentro de una VPC. La aplicación procesa logs almacenados en un bucket de Amazon S3. La instancia EC2 necesita acceder al bucket sin conectividad a Internet. ¿Qué solución proporciona conectividad de red privada a Amazon S3?",
        opciones: [
          "Crear un gateway VPC endpoint hacia el bucket de S3.",
          "Enviar los logs en streaming a Amazon CloudWatch Logs. Exportar los logs al bucket de S3.",
          "Crear un instance profile en Amazon EC2 para permitir el acceso a S3.",
          "Crear una API de Amazon API Gateway con un private link para acceder al endpoint de S3."
        ],
        correctas: [0],
        explicacion: "Un gateway VPC endpoint para S3 permite acceder a S3 desde la VPC por la red privada de AWS, sin internet gateway ni NAT y sin coste adicional. Un instance profile da permisos, pero no resuelve la conectividad privada."
      },
      {
        pregunta: "Una empresa aloja una aplicación web en AWS con una única instancia de Amazon EC2 que guarda los documentos subidos por los usuarios en un volumen de Amazon EBS. Para mejorar la escalabilidad y la disponibilidad, la empresa duplicó la arquitectura creando una segunda instancia EC2 y un segundo volumen EBS en otra zona de disponibilidad, colocando ambas detrás de un Application Load Balancer. Tras el cambio, los usuarios informan de que, al actualizar el sitio, ven un subconjunto de sus documentos u otro, pero nunca todos a la vez. ¿Qué debe proponer el arquitecto para que los usuarios vean todos sus documentos a la vez?",
        opciones: [
          "Copiar los datos para que ambos volúmenes EBS contengan todos los documentos.",
          "Configurar el Application Load Balancer para dirigir a cada usuario al servidor que tiene sus documentos.",
          "Copiar los datos de ambos volúmenes EBS a Amazon EFS. Modificar la aplicación para guardar los nuevos documentos en Amazon EFS.",
          "Configurar el Application Load Balancer para enviar la petición a ambos servidores y devolver cada documento desde el servidor correcto."
        ],
        correctas: [2],
        explicacion: "Amazon EFS es un sistema de archivos compartido al que pueden acceder a la vez varias instancias EC2 en distintas AZ. Así ambas instancias ven el mismo conjunto de documentos, algo imposible con volúmenes EBS independientes."
      },
      {
        pregunta: "Una empresa usa NFS para almacenar archivos de vídeo grandes en un almacenamiento conectado a la red (NAS) on-premises. Cada archivo mide entre 1 MB y 500 GB. El almacenamiento total es de 70 TB y ya no crece. La empresa decide migrar los vídeos a Amazon S3. Debe migrarlos lo antes posible usando el mínimo ancho de banda de red. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Crear un bucket de S3 y un rol de IAM con permisos de escritura. Usar la AWS CLI para copiar todos los archivos locales al bucket.",
          "Crear un trabajo de AWS Snowball Edge. Recibir el dispositivo on-premises. Usar el cliente de Snowball Edge para transferir los datos al dispositivo. Devolverlo para que AWS importe los datos a Amazon S3.",
          "Desplegar un S3 File Gateway on-premises con un endpoint de servicio público. Crear un bucket y un recurso compartido NFS en el File Gateway apuntando al bucket. Transferir los datos desde el NFS existente al File Gateway.",
          "Configurar una conexión AWS Direct Connect entre la red on-premises y AWS. Desplegar un S3 File Gateway con una interfaz virtual pública (VIF). Crear un bucket y un recurso compartido NFS en el File Gateway. Transferir los datos desde el NFS existente."
        ],
        correctas: [1],
        explicacion: "Con 70 TB y el requisito de usar el mínimo ancho de banda, Snowball Edge transfiere los datos mediante el envío físico del dispositivo, sin consumir red. Las opciones por red (CLI, File Gateway, Direct Connect) consumirían mucho ancho de banda."
      },
      {
        pregunta: "Una empresa tiene una aplicación que ingiere mensajes entrantes. Docenas de otras aplicaciones y microservicios los consumen rápidamente. El número de mensajes varía drásticamente y a veces sube de golpe a 100.000 por segundo. La empresa quiere desacoplar la solución y aumentar la escalabilidad. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Persistir los mensajes en Amazon Kinesis Data Analytics. Configurar las aplicaciones consumidoras para leer y procesar los mensajes.",
          "Desplegar la aplicación de ingesta en instancias de Amazon EC2 dentro de un Auto Scaling group que escale según métricas de CPU.",
          "Escribir los mensajes en Amazon Kinesis Data Streams con un único shard. Usar una función de AWS Lambda para preprocesarlos y guardarlos en Amazon DynamoDB. Configurar los consumidores para leer de DynamoDB.",
          "Publicar los mensajes en un topic de Amazon SNS con múltiples suscripciones de colas de Amazon SQS. Configurar las aplicaciones consumidoras para procesar los mensajes desde las colas."
        ],
        correctas: [3],
        explicacion: "El patrón fan-out SNS + varias colas SQS desacopla al productor de los muchos consumidores y absorbe los picos: cada consumidor procesa su propia cola a su ritmo. Es totalmente gestionado y muy escalable."
      },
      {
        pregunta: "Una empresa está migrando una aplicación distribuida a AWS. La aplicación atiende cargas variables. La plataforma heredada consta de un servidor principal que coordina trabajos entre varios nodos de cómputo. La empresa quiere modernizar la aplicación con una solución que maximice la resiliencia y la escalabilidad. ¿Cómo debe diseñar el arquitecto la arquitectura?",
        opciones: [
          "Configurar una cola de Amazon SQS como destino de los trabajos. Implementar los nodos de cómputo con instancias EC2 en un Auto Scaling group. Configurar el escalado de forma programada.",
          "Configurar una cola de Amazon SQS como destino de los trabajos. Implementar los nodos de cómputo con instancias EC2 en un Auto Scaling group. Configurar el escalado en función del tamaño de la cola.",
          "Implementar el servidor principal y los nodos de cómputo con instancias EC2 en un Auto Scaling group. Configurar AWS CloudTrail como destino de los trabajos. Escalar según la carga del servidor principal.",
          "Implementar el servidor principal y los nodos de cómputo con instancias EC2 en un Auto Scaling group. Configurar Amazon EventBridge como destino de los trabajos. Escalar según la carga de los nodos de cómputo."
        ],
        correctas: [1],
        explicacion: "Encolar los trabajos en SQS desacopla la coordinación y elimina el servidor principal como punto único de fallo. Escalar el Auto Scaling group según la profundidad de la cola adapta el cómputo a la carga variable."
      },
      {
        pregunta: "Una empresa ejecuta un servidor de archivos SMB en su centro de datos. El servidor guarda archivos grandes a los que se accede con frecuencia durante los primeros días tras crearse; después de 7 días casi no se acceden. El tamaño total crece y está cerca de la capacidad total. Un arquitecto debe aumentar el espacio disponible sin perder acceso de baja latencia a los archivos más recientes, y proporcionar gestión del ciclo de vida de los archivos. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar AWS DataSync para copiar a AWS los datos con más de 7 días desde el servidor SMB.",
          "Crear un Amazon S3 File Gateway para ampliar el almacenamiento. Crear una política de ciclo de vida de S3 para transicionar los datos a S3 Glacier Deep Archive después de 7 días.",
          "Crear un sistema de archivos Amazon FSx for Windows File Server para ampliar el almacenamiento.",
          "Instalar una utilidad en cada equipo de usuario para acceder a Amazon S3. Crear una política de ciclo de vida de S3 para transicionar los datos a S3 Glacier Flexible Retrieval después de 7 días."
        ],
        correctas: [1],
        explicacion: "S3 File Gateway amplía el almacenamiento local con caché de baja latencia para lo reciente y guarda todo como objetos en S3. Una política de ciclo de vida mueve automáticamente lo antiguo a Glacier Deep Archive, cubriendo capacidad y ciclo de vida."
      },
      {
        pregunta: "Una empresa está construyendo una aplicación web de comercio electrónico en AWS. La aplicación envía la información de los pedidos nuevos a una API REST de Amazon API Gateway para procesarla. La empresa quiere asegurarse de que los pedidos se procesan en el orden en que se reciben. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar una integración de API Gateway para publicar un mensaje en un topic de Amazon SNS cuando la aplicación recibe un pedido. Suscribir una función de AWS Lambda al topic para procesarlo.",
          "Usar una integración de API Gateway para enviar un mensaje a una cola FIFO de Amazon SQS cuando la aplicación recibe un pedido. Configurar la cola FIFO para invocar una función de AWS Lambda que lo procese.",
          "Usar un authorizer de API Gateway para bloquear cualquier petición mientras la aplicación procesa un pedido.",
          "Usar una integración de API Gateway para enviar un mensaje a una cola estándar de Amazon SQS cuando la aplicación recibe un pedido. Configurar la cola estándar para invocar una función de AWS Lambda que lo procese."
        ],
        correctas: [1],
        explicacion: "Solo las colas FIFO de SQS garantizan el orden de procesamiento (first-in, first-out) y la entrega exactamente una vez. Las colas estándar no garantizan el orden."
      },
      {
        pregunta: "Una empresa tiene una aplicación que se ejecuta en instancias de Amazon EC2 y usa una base de datos Amazon Aurora. Las instancias EC2 se conectan a la base de datos con nombres de usuario y contraseñas almacenados localmente en un archivo. La empresa quiere minimizar el trabajo operativo de gestionar las credenciales. ¿Qué debe hacer el arquitecto?",
        opciones: [
          "Usar AWS Secrets Manager. Activar la rotación automática.",
          "Usar AWS Systems Manager Parameter Store. Activar la rotación automática.",
          "Crear un bucket de S3 para guardar objetos cifrados con una clave de AWS KMS. Migrar el archivo de credenciales al bucket. Apuntar la aplicación al bucket.",
          "Crear un volumen de Amazon EBS cifrado para cada instancia EC2 y adjuntarlo. Migrar el archivo de credenciales al nuevo volumen. Apuntar la aplicación al volumen."
        ],
        correctas: [0],
        explicacion: "Secrets Manager almacena y rota automáticamente las credenciales de base de datos, y la aplicación las recupera bajo demanda. Parameter Store no ofrece rotación automática nativa de secretos como Secrets Manager."
      },
      {
        pregunta: "Una empresa global aloja su aplicación web en instancias de Amazon EC2 detrás de un Application Load Balancer (ALB). La aplicación tiene datos estáticos y dinámicos; los estáticos se guardan en un bucket de Amazon S3. La empresa quiere mejorar el rendimiento y reducir la latencia tanto de los datos estáticos como de los dinámicos. Usa su propio dominio registrado en Amazon Route 53. ¿Qué debe hacer el arquitecto?",
        opciones: [
          "Crear una distribución de Amazon CloudFront con el bucket de S3 y el ALB como orígenes. Configurar Route 53 para enrutar el tráfico a la distribución de CloudFront.",
          "Crear una distribución de CloudFront con el ALB como origen. Crear un acelerador estándar de AWS Global Accelerator con el bucket de S3 como endpoint. Configurar Route 53 hacia la distribución de CloudFront.",
          "Crear una distribución de CloudFront con el bucket de S3 como origen. Crear un acelerador estándar de Global Accelerator con el ALB y la distribución de CloudFront como endpoints. Crear un dominio personalizado que apunte al DNS del acelerador y usarlo como endpoint.",
          "Crear una distribución de CloudFront con el ALB como origen. Crear un acelerador estándar de Global Accelerator con el bucket de S3 como endpoint. Crear dos dominios: uno hacia el DNS de CloudFront para lo dinámico y otro hacia el DNS del acelerador para lo estático."
        ],
        correctas: [0],
        explicacion: "Una única distribución de CloudFront admite varios orígenes: el bucket de S3 (estático) y el ALB (dinámico). Cachea en las edge locations reduciendo la latencia de ambos, y Route 53 dirige el dominio a CloudFront."
      },
      {
        pregunta: "Una empresa realiza mantenimiento mensual de su infraestructura de AWS. Durante estas tareas, necesita rotar las credenciales de sus bases de datos Amazon RDS for MySQL en varias Regiones de AWS. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Guardar las credenciales como secretos en AWS Secrets Manager. Usar replicación de secretos multi-Región para las Regiones necesarias. Configurar Secrets Manager para rotar los secretos de forma programada.",
          "Guardar las credenciales como parámetros secure string en AWS Systems Manager. Usar replicación multi-Región. Configurar Systems Manager para rotar los secretos de forma programada.",
          "Guardar las credenciales en un bucket de S3 con cifrado del lado del servidor (SSE). Usar Amazon EventBridge para invocar una función de AWS Lambda que rote las credenciales.",
          "Cifrar las credenciales con claves gestionadas por el cliente multi-Región de AWS KMS. Guardarlas en una tabla global de Amazon DynamoDB. Usar una función de Lambda para recuperarlas y la API de RDS para rotarlas."
        ],
        correctas: [0],
        explicacion: "Secrets Manager ofrece de forma nativa replicación de secretos multi-Región y rotación automática programada, integrada con RDS. Es la opción con menos trabajo operativo; las demás requieren código o servicios sin rotación nativa."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación de comercio electrónico en instancias de Amazon EC2 detrás de un Application Load Balancer. Las instancias están en un Auto Scaling group en varias zonas de disponibilidad y escalan según la CPU. La aplicación guarda las transacciones en una base de datos MySQL 8.0 alojada en una instancia EC2 grande. El rendimiento de la base de datos se degrada rápido al aumentar la carga. La aplicación tiene más lecturas que escrituras. La empresa quiere una solución que escale automáticamente la base de datos para atender lecturas impredecibles manteniendo alta disponibilidad. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar Amazon Redshift con un único nodo para las funciones de leader y compute.",
          "Usar Amazon RDS con despliegue Single-AZ. Configurar RDS para añadir instancias de lectura en otra zona de disponibilidad.",
          "Usar Amazon Aurora con despliegue Multi-AZ. Configurar Aurora Auto Scaling con réplicas de Aurora.",
          "Usar Amazon ElastiCache for Memcached con instancias EC2 Spot."
        ],
        correctas: [2],
        explicacion: "Aurora Multi-AZ ofrece alta disponibilidad, y Aurora Auto Scaling añade o elimina réplicas de lectura automáticamente según la carga, distribuyendo las lecturas impredecibles. Además es compatible con MySQL."
      },
      {
        pregunta: "Una empresa migró recientemente a AWS y quiere proteger el tráfico que entra y sale de la VPC de producción. En su centro de datos on-premises tenía un servidor de inspección que realizaba operaciones como inspección del flujo de tráfico y filtrado. La empresa quiere las mismas funcionalidades en la nube de AWS. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar Amazon GuardDuty para la inspección y el filtrado de tráfico en la VPC de producción.",
          "Usar Traffic Mirroring para reflejar el tráfico de la VPC de producción para su inspección y filtrado.",
          "Usar AWS Network Firewall para crear las reglas necesarias de inspección y filtrado de tráfico para la VPC de producción.",
          "Usar AWS Firewall Manager para crear las reglas necesarias de inspección y filtrado de tráfico para la VPC de producción."
        ],
        correctas: [2],
        explicacion: "AWS Network Firewall es un firewall gestionado que inspecciona y filtra el tráfico de entrada y salida de la VPC mediante reglas, replicando la función del appliance on-premises. GuardDuty solo detecta amenazas y Firewall Manager gestiona políticas a escala, no inspecciona en línea."
      },
      {
        pregunta: "Una empresa aloja un data lake en AWS con datos en Amazon S3 y en Amazon RDS for PostgreSQL. Necesita una solución de informes con visualización de datos que incluya todas las fuentes del data lake. Solo el equipo directivo debe tener acceso completo a todas las visualizaciones; el resto de la empresa, acceso limitado. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Crear un análisis en Amazon QuickSight. Conectar todas las fuentes y crear datasets. Publicar dashboards. Compartir los dashboards con los roles de IAM adecuados.",
          "Crear un análisis en Amazon QuickSight. Conectar todas las fuentes y crear datasets. Publicar dashboards. Compartir los dashboards con los usuarios y grupos adecuados.",
          "Crear una tabla y un crawler de AWS Glue para los datos de S3. Crear un trabajo ETL de Glue que genere informes. Publicarlos en S3 y limitar el acceso con políticas de bucket.",
          "Crear una tabla y un crawler de AWS Glue para los datos de S3. Usar Amazon Athena Federated Query para acceder a los datos de RDS for PostgreSQL. Generar informes con Athena, publicarlos en S3 y limitar el acceso con políticas de bucket."
        ],
        correctas: [1],
        explicacion: "QuickSight es la herramienta de BI de AWS para visualizar datos de múltiples fuentes (S3 y RDS). El control de acceso se hace compartiendo los dashboards con usuarios y grupos de QuickSight, dando acceso completo a la dirección y limitado al resto."
      },
      {
        pregunta: "Una empresa está implementando una nueva aplicación de negocio. La aplicación se ejecuta en dos instancias de Amazon EC2 y usa un bucket de Amazon S3 para almacenar documentos. Un arquitecto debe asegurarse de que las instancias EC2 puedan acceder al bucket. ¿Qué debe hacer?",
        opciones: [
          "Crear un rol de IAM que conceda acceso al bucket de S3 y adjuntarlo a las instancias EC2.",
          "Crear una política de IAM que conceda acceso al bucket de S3 y adjuntarla a las instancias EC2.",
          "Crear un grupo de IAM que conceda acceso al bucket de S3 y adjuntarlo a las instancias EC2.",
          "Crear un usuario de IAM que conceda acceso al bucket de S3 y adjuntar la cuenta de usuario a las instancias EC2."
        ],
        correctas: [0],
        explicacion: "La forma correcta y segura de dar permisos a instancias EC2 es un rol de IAM adjunto a la instancia: entrega credenciales temporales y rotadas, sin claves incrustadas. Las políticas y grupos se asocian a identidades, no directamente a instancias."
      },
      {
        pregunta: "Un equipo de desarrollo diseña un microservicio que convertirá imágenes grandes en imágenes más pequeñas y comprimidas. Cuando un usuario sube una imagen por la interfaz web, el microservicio debe guardarla en un bucket de Amazon S3, procesarla y comprimirla con una función de AWS Lambda y guardar la versión comprimida en otro bucket de S3. Un arquitecto debe diseñar una solución con componentes duraderos y sin estado que procese las imágenes automáticamente. ¿Qué combinación de acciones cumple estos requisitos? (Elige dos.)",
        opciones: [
          "Crear una cola de Amazon SQS. Configurar el bucket de S3 para enviar una notificación a la cola cuando se suba una imagen.",
          "Configurar la función Lambda para usar la cola de Amazon SQS como fuente de invocación. Cuando el mensaje se procese correctamente, eliminarlo de la cola.",
          "Configurar la función Lambda para monitorizar el bucket de S3 en busca de subidas nuevas. Al detectar una imagen, escribir el nombre del archivo en un archivo de texto en memoria para llevar el control de las procesadas.",
          "Lanzar una instancia de Amazon EC2 para monitorizar una cola de Amazon SQS. Cuando se añadan elementos, registrar el nombre del archivo en un archivo de texto en la instancia e invocar la función Lambda.",
          "Configurar un evento de Amazon EventBridge para monitorizar el bucket de S3. Cuando se suba una imagen, enviar una alerta a un topic de Amazon SNS con el correo del propietario para su procesamiento."
        ],
        correctas: [0, 1],
        explicacion: "La notificación de eventos de S3 hacia una cola SQS (A) desacopla y hace duradera la ingesta, y usar esa cola como fuente de invocación de Lambda (B) procesa las imágenes sin estado, borrando el mensaje al terminar. Guardar estado en memoria o en una instancia rompe el requisito de componentes sin estado."
      },
      {
        pregunta: "Una empresa tiene una aplicación web de tres capas desplegada en AWS. Los servidores web están en una subred pública de una VPC; los de aplicación y base de datos, en subredes privadas de la misma VPC. La empresa ha desplegado un appliance de firewall virtual de terceros (de AWS Marketplace) en una VPC de inspección, con una interfaz IP que puede aceptar paquetes IP. Un arquitecto necesita integrar la aplicación web con el appliance para inspeccionar todo el tráfico antes de que llegue al servidor web. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Crear un Network Load Balancer en la subred pública de la VPC de la aplicación para enrutar el tráfico al appliance para su inspección.",
          "Crear un Application Load Balancer en la subred pública de la VPC de la aplicación para enrutar el tráfico al appliance para su inspección.",
          "Desplegar un transit gateway en la VPC de inspección. Configurar las tablas de rutas para enrutar los paquetes entrantes a través del transit gateway.",
          "Desplegar un Gateway Load Balancer en la VPC de inspección. Crear un endpoint de Gateway Load Balancer para recibir los paquetes entrantes y reenviarlos al appliance."
        ],
        correctas: [3],
        explicacion: "El Gateway Load Balancer está pensado para insertar appliances virtuales de terceros de forma transparente: su endpoint recibe el tráfico y lo reenvía al appliance para inspección en línea, de forma escalable y con poco trabajo operativo."
      },
      {
        pregunta: "Una empresa quiere mejorar su capacidad de clonar grandes cantidades de datos de producción en un entorno de pruebas dentro de la misma Región de AWS. Los datos están en instancias de Amazon EC2 sobre volúmenes de Amazon EBS. Las modificaciones de los datos clonados no deben afectar a producción. El software que accede a estos datos requiere un rendimiento de E/S alto y constante. El arquitecto debe minimizar el tiempo necesario para clonar los datos. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Tomar snapshots de EBS de los volúmenes de producción. Restaurarlas en volúmenes de instance store del entorno de pruebas.",
          "Configurar los volúmenes EBS de producción para usar EBS Multi-Attach. Tomar snapshots y adjuntar los volúmenes de producción a las instancias EC2 de pruebas.",
          "Tomar snapshots de EBS de los volúmenes de producción. Crear e inicializar nuevos volúmenes EBS. Adjuntarlos a las instancias de pruebas antes de restaurar los volúmenes desde las snapshots.",
          "Tomar snapshots de EBS de los volúmenes de producción. Activar EBS fast snapshot restore en las snapshots. Restaurarlas en nuevos volúmenes EBS y adjuntarlos a las instancias EC2 de pruebas."
        ],
        correctas: [3],
        explicacion: "EBS fast snapshot restore crea volúmenes desde snapshots totalmente inicializados, eliminando la latencia del primer acceso a cada bloque. Así el clon está disponible rápido y con el rendimiento de E/S completo desde el principio, sin afectar a producción."
      },
      {
        pregunta: "Una empresa de comercio electrónico quiere lanzar un sitio de una-oferta-al-día en AWS. Cada día habrá exactamente un producto en oferta durante 24 horas. La empresa quiere gestionar millones de peticiones por hora con latencia de milisegundos en las horas punta. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Usar Amazon S3 para alojar el sitio completo en distintos buckets. Añadir distribuciones de Amazon CloudFront con los buckets como orígenes. Guardar los datos de pedidos en Amazon S3.",
          "Desplegar el sitio completo en instancias EC2 en Auto Scaling groups en varias zonas de disponibilidad. Añadir un ALB para el tráfico web y otro para las APIs de backend. Guardar los datos en Amazon RDS for MySQL.",
          "Migrar toda la aplicación a contenedores en Amazon EKS. Usar el Cluster Autoscaler de Kubernetes para escalar el número de pods ante picos. Guardar los datos en Amazon RDS for MySQL.",
          "Usar un bucket de S3 para el contenido estático. Desplegar una distribución de CloudFront con el bucket como origen. Usar Amazon API Gateway y funciones de AWS Lambda para las APIs de backend. Guardar los datos en Amazon DynamoDB."
        ],
        correctas: [3],
        explicacion: "S3 + CloudFront sirven el contenido estático a escala global con baja latencia, y API Gateway + Lambda + DynamoDB forman un backend serverless que escala solo. Todo son servicios gestionados, con el mínimo trabajo operativo."
      },
      {
        pregunta: "Un arquitecto usa Amazon S3 para diseñar el almacenamiento de una nueva aplicación de medios digitales. Los archivos deben ser resistentes a la pérdida de una zona de disponibilidad. Algunos archivos se acceden con frecuencia y otros rara vez, con un patrón impredecible. El arquitecto debe minimizar los costes de almacenar y recuperar los archivos. ¿Qué opción de almacenamiento cumple estos requisitos?",
        opciones: [
          "S3 Standard",
          "S3 Intelligent-Tiering",
          "S3 Standard-Infrequent Access (S3 Standard-IA)",
          "S3 One Zone-Infrequent Access (S3 One Zone-IA)"
        ],
        correctas: [1],
        explicacion: "S3 Intelligent-Tiering mueve automáticamente los objetos entre niveles de acceso según el uso, ideal para patrones impredecibles, y almacena los datos en varias AZ (resistente a la pérdida de una). One Zone-IA no resistiría la pérdida de la AZ."
      },
      {
        pregunta: "Una empresa almacena archivos de copia de seguridad en S3 Standard. Se acceden con frecuencia durante 1 mes; después ya no se acceden. La empresa debe conservarlos indefinidamente. ¿Qué solución de almacenamiento cumple estos requisitos de la forma MÁS rentable?",
        opciones: [
          "Configurar S3 Intelligent-Tiering para migrar los objetos automáticamente.",
          "Crear una configuración de ciclo de vida de S3 para transicionar los objetos de S3 Standard a S3 Glacier Deep Archive tras 1 mes.",
          "Crear una configuración de ciclo de vida de S3 para transicionar los objetos de S3 Standard a S3 Standard-Infrequent Access tras 1 mes.",
          "Crear una configuración de ciclo de vida de S3 para transicionar los objetos de S3 Standard a S3 One Zone-Infrequent Access tras 1 mes."
        ],
        correctas: [1],
        explicacion: "Como tras el mes ya no se accede a los backups y solo hay que conservarlos, Glacier Deep Archive es la clase más barata. Una regla de ciclo de vida hace la transición automáticamente al mes."
      },
      {
        pregunta: "Una empresa observa un aumento de los costes de Amazon EC2 en su última factura. El equipo de facturación detecta un escalado vertical no deseado del tipo de instancia en un par de instancias EC2. Un arquitecto necesita crear un gráfico que compare los últimos 2 meses de costes de EC2 y hacer un análisis en profundidad para identificar la causa raíz del escalado vertical. ¿Cómo debe generar la información con el MENOR trabajo operativo?",
        opciones: [
          "Usar AWS Budgets para crear un informe de presupuesto y comparar los costes de EC2 por tipo de instancia.",
          "Usar la función de filtrado granular de Cost Explorer para analizar en profundidad los costes de EC2 por tipo de instancia.",
          "Usar los gráficos del panel de AWS Billing and Cost Management para comparar los costes de EC2 por tipo de instancia de los últimos 2 meses.",
          "Usar AWS Cost and Usage Reports para crear un informe y enviarlo a un bucket de S3. Usar Amazon QuickSight con S3 como fuente para generar un gráfico interactivo por tipo de instancia."
        ],
        correctas: [1],
        explicacion: "Cost Explorer permite visualizar y filtrar los costes de forma granular (por ejemplo, por tipo de instancia) y comparar periodos, todo desde la consola y sin montar nada. Es la vía con menos trabajo operativo para el análisis de causa raíz."
      },
      {
        pregunta: "Una empresa está diseñando una aplicación que usa una función de AWS Lambda para recibir información a través de Amazon API Gateway y guardarla en una base de datos Amazon Aurora PostgreSQL. Durante la prueba de concepto, la empresa tuvo que aumentar mucho las cuotas de Lambda para gestionar los grandes volúmenes de datos que necesita cargar en la base de datos. Un arquitecto debe recomendar un nuevo diseño que mejore la escalabilidad y minimice el esfuerzo de configuración. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Reescribir el código de la función Lambda a código Apache Tomcat que se ejecute en instancias EC2. Conectar la base de datos con drivers JDBC de Java.",
          "Cambiar la plataforma de Aurora a Amazon DynamoDB. Aprovisionar un clúster de DynamoDB Accelerator (DAX). Usar el SDK cliente de DAX para apuntar las llamadas de la API al clúster DAX.",
          "Configurar dos funciones Lambda: una para recibir la información y otra para cargarla en la base de datos. Integrarlas mediante Amazon SNS.",
          "Configurar dos funciones Lambda: una para recibir la información y otra para cargarla en la base de datos. Integrarlas mediante una cola de Amazon SQS."
        ],
        correctas: [3],
        explicacion: "Intercalar una cola de SQS entre las dos Lambdas amortigua los picos: la primera recibe y encola, y la segunda consume a un ritmo sostenible para la base de datos. Así se escala sin subir cuotas y con poca configuración. SNS no amortigua ni reintenta como una cola."
      },
      {
        pregunta: "Una empresa necesita revisar su despliegue en la nube de AWS para asegurarse de que sus buckets de Amazon S3 no tengan cambios de configuración no autorizados. ¿Qué debe hacer un arquitecto para lograr este objetivo?",
        opciones: [
          "Activar AWS Config con las reglas adecuadas.",
          "Activar AWS Trusted Advisor con las comprobaciones adecuadas.",
          "Activar Amazon Inspector con la plantilla de evaluación adecuada.",
          "Activar el registro de acceso al servidor de Amazon S3. Configurar Amazon EventBridge."
        ],
        correctas: [0],
        explicacion: "AWS Config registra y evalúa continuamente los cambios de configuración de los recursos, incluidos los buckets de S3, y con reglas puede detectar configuraciones no autorizadas. Es el servicio pensado para auditar cambios de configuración."
      },
      {
        pregunta: "Una empresa va a lanzar una nueva aplicación y mostrará sus métricas en un dashboard de Amazon CloudWatch. El product manager necesita acceder al dashboard periódicamente, pero no tiene cuenta de AWS. Un arquitecto debe darle acceso siguiendo el principio de mínimo privilegio. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Compartir el dashboard desde la consola de CloudWatch. Introducir el correo del product manager, completar los pasos de compartición y proporcionarle un enlace para verlo.",
          "Crear un usuario de IAM específico para el product manager. Adjuntarle la política gestionada CloudWatchReadOnlyAccess. Compartir las credenciales y la URL del dashboard.",
          "Crear un usuario de IAM para los empleados. Adjuntarle la política gestionada ViewOnlyAccess. Compartir las credenciales y pedirle que localice el dashboard por su nombre.",
          "Desplegar un servidor bastión en una subred pública. Cuando lo necesite, arrancar el servidor y compartir las credenciales RDP, con el navegador configurado para abrir el dashboard con credenciales de AWS en caché."
        ],
        correctas: [0],
        explicacion: "CloudWatch permite compartir un dashboard concreto con direcciones de correo específicas, sin crear usuarios de IAM ni conceder acceso a la cuenta. Es lo que mejor respeta el mínimo privilegio para alguien sin cuenta de AWS."
      },
      {
        pregunta: "Una empresa está migrando aplicaciones a AWS desplegadas en distintas cuentas, gestionadas de forma centralizada con AWS Organizations. El equipo de seguridad necesita single sign-on (SSO) en todas las cuentas. La empresa debe seguir gestionando los usuarios y grupos en su Microsoft Active Directory autogestionado on-premises. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Activar AWS IAM Identity Center (AWS SSO). Crear un trust unidireccional (one-way forest o domain trust) para conectar el Active Directory autogestionado con AWS SSO mediante AWS Directory Service for Microsoft Active Directory.",
          "Activar AWS IAM Identity Center (AWS SSO). Crear un trust bidireccional (two-way forest trust) para conectar el Active Directory autogestionado con AWS SSO mediante AWS Directory Service for Microsoft Active Directory.",
          "Usar AWS Directory Service. Crear una relación de confianza bidireccional con el Active Directory autogestionado.",
          "Desplegar un proveedor de identidad (IdP) on-premises. Activar AWS IAM Identity Center (AWS SSO)."
        ],
        correctas: [0],
        explicacion: "Con AWS SSO y AWS Managed Microsoft AD basta un trust unidireccional: AWS solo necesita confiar en el AD on-premises para autenticar, manteniendo allí usuarios y grupos. Un trust unidireccional es suficiente y más restrictivo que uno bidireccional."
      },
      {
        pregunta: "Una empresa ofrece un servicio de voz sobre IP (VoIP) que usa conexiones UDP. El servicio consta de instancias de Amazon EC2 en un Auto Scaling group. La empresa tiene despliegues en varias Regiones de AWS. Necesita enrutar a los usuarios a la Región con menor latencia y failover automático entre Regiones. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Desplegar un Network Load Balancer (NLB) con su target group asociado al Auto Scaling group. Usar el NLB como endpoint de AWS Global Accelerator en cada Región.",
          "Desplegar un Application Load Balancer (ALB) con su target group asociado al Auto Scaling group. Usar el ALB como endpoint de AWS Global Accelerator en cada Región.",
          "Desplegar un Network Load Balancer (NLB) con su target group asociado al Auto Scaling group. Crear un registro de latencia de Route 53 que apunte a alias de cada NLB. Crear una distribución de CloudFront que use el registro de latencia como origen.",
          "Desplegar un Application Load Balancer (ALB) con su target group asociado al Auto Scaling group. Crear un registro ponderado de Route 53 que apunte a alias de cada ALB. Desplegar una distribución de CloudFront que use el registro ponderado como origen."
        ],
        correctas: [0],
        explicacion: "Para VoIP con UDP se necesita un Network Load Balancer (capa 4, soporta UDP) y AWS Global Accelerator, que enruta por la red de AWS a la Región de menor latencia y hace failover automático. El ALB no soporta UDP y CloudFront está pensado para HTTP."
      },
      {
        pregunta: "Un equipo de desarrollo ejecuta pruebas mensuales intensivas en recursos sobre su instancia de Amazon RDS for MySQL (uso general) con Performance Insights activado. Las pruebas duran 48 horas una vez al mes y son el único proceso que usa la base de datos. El equipo quiere reducir el coste de ejecutar las pruebas sin reducir los atributos de cómputo y memoria de la instancia. ¿Qué solución cumple estos requisitos de la forma MÁS rentable?",
        opciones: [
          "Detener la instancia de base de datos cuando terminen las pruebas y reiniciarla cuando se necesite.",
          "Usar una política de Auto Scaling con la instancia para escalar automáticamente al terminar las pruebas.",
          "Crear una snapshot al terminar las pruebas. Terminar la instancia y restaurar la snapshot cuando se necesite.",
          "Modificar la instancia a una clase de baja capacidad al terminar las pruebas y volver a modificarla cuando se necesite."
        ],
        correctas: [2],
        explicacion: "RDS solo permite detener una instancia un máximo de 7 días, tras los cuales se reinicia sola; con pruebas mensuales no sirve. Crear una snapshot y terminar la instancia elimina el coste de cómputo entre pruebas, y se restaura cuando hace falta manteniendo el mismo tamaño."
      },
      {
        pregunta: "Una empresa que aloja su aplicación web en AWS quiere asegurarse de que todas sus instancias de Amazon EC2, instancias de Amazon RDS y clústeres de Amazon Redshift estén configurados con etiquetas (tags). La empresa quiere minimizar el esfuerzo de configurar y operar esta comprobación. ¿Qué debe hacer un arquitecto?",
        opciones: [
          "Usar reglas de AWS Config para definir y detectar los recursos que no están correctamente etiquetados.",
          "Usar Cost Explorer para mostrar los recursos que no están correctamente etiquetados y etiquetarlos manualmente.",
          "Escribir llamadas a la API para comprobar el etiquetado de todos los recursos. Ejecutar el código periódicamente en una instancia EC2.",
          "Escribir llamadas a la API para comprobar el etiquetado de todos los recursos. Programar una función de AWS Lambda mediante Amazon CloudWatch para ejecutar el código periódicamente."
        ],
        correctas: [0],
        explicacion: "AWS Config incluye reglas gestionadas (como required-tags) que detectan automáticamente los recursos sin las etiquetas requeridas, sin escribir ni operar código propio. Es la opción con menos esfuerzo."
      },
      {
        pregunta: "Un equipo de desarrollo necesita alojar un sitio web al que accederán otros equipos. El contenido del sitio son HTML, CSS, JavaScript de cliente e imágenes. ¿Qué método es el MÁS rentable para alojar el sitio?",
        opciones: [
          "Contenerizar el sitio y alojarlo en AWS Fargate.",
          "Crear un bucket de Amazon S3 y alojar el sitio allí.",
          "Desplegar un servidor web en una instancia de Amazon EC2 para alojar el sitio.",
          "Configurar un Application Load Balancer con un target de AWS Lambda que use el framework Express.js."
        ],
        correctas: [1],
        explicacion: "El sitio es totalmente estático (HTML, CSS, JS de cliente e imágenes). El hosting de sitios estáticos en un bucket de S3 es la opción más barata y sin servidores que mantener."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación web de marketplace en AWS que atiende a cientos de miles de usuarios en horas punta. Necesita una solución escalable y casi en tiempo real para compartir los detalles de millones de transacciones financieras con varias aplicaciones internas. Además, las transacciones deben procesarse para eliminar datos sensibles antes de guardarse en una base de datos documental para su recuperación de baja latencia. ¿Qué debe recomendar un arquitecto?",
        opciones: [
          "Guardar las transacciones en Amazon DynamoDB. Configurar una regla en DynamoDB para eliminar los datos sensibles de cada transacción al escribir. Usar DynamoDB Streams para compartir los datos con otras aplicaciones.",
          "Enviar en streaming las transacciones a Amazon Kinesis Data Firehose para guardarlas en Amazon DynamoDB y Amazon S3. Usar la integración de AWS Lambda con Firehose para eliminar los datos sensibles. Las demás aplicaciones consumen los datos de S3.",
          "Enviar en streaming las transacciones a Amazon Kinesis Data Streams. Usar la integración con AWS Lambda para eliminar los datos sensibles y guardarlas después en Amazon DynamoDB. Las demás aplicaciones consumen las transacciones desde el data stream de Kinesis.",
          "Guardar las transacciones por lotes en Amazon S3 como archivos. Usar AWS Lambda para procesar cada archivo y eliminar los datos sensibles antes de actualizar los archivos en S3. Después Lambda guarda los datos en DynamoDB. Las demás aplicaciones consumen los archivos de S3."
        ],
        correctas: [2],
        explicacion: "Kinesis Data Streams permite ingesta en tiempo real y que varias aplicaciones consuman el mismo stream de forma independiente. Lambda limpia los datos sensibles y los guarda en DynamoDB (documental, baja latencia). Firehose es near-real-time por lotes y no permite múltiples consumidores del mismo modo."
      },
      {
        pregunta: "Una empresa aloja sus aplicaciones multicapa en AWS. Por motivos de cumplimiento, gobernanza, auditoría y seguridad, debe registrar los cambios de configuración de sus recursos de AWS y llevar un histórico de las llamadas a la API realizadas sobre esos recursos. ¿Qué debe hacer un arquitecto?",
        opciones: [
          "Usar AWS CloudTrail para registrar los cambios de configuración y AWS Config para registrar las llamadas a la API.",
          "Usar AWS Config para registrar los cambios de configuración y AWS CloudTrail para registrar las llamadas a la API.",
          "Usar AWS Config para registrar los cambios de configuración y Amazon CloudWatch para registrar las llamadas a la API.",
          "Usar AWS CloudTrail para registrar los cambios de configuración y Amazon CloudWatch para registrar las llamadas a la API."
        ],
        correctas: [1],
        explicacion: "AWS Config registra el histórico de cambios de configuración de los recursos, y AWS CloudTrail registra quién hizo qué llamada a la API y cuándo. Cada servicio cubre uno de los dos requisitos."
      },
      {
        pregunta: "Una empresa se prepara para lanzar una aplicación web pública en la nube de AWS. La arquitectura consta de instancias de Amazon EC2 dentro de una VPC detrás de un Elastic Load Balancer (ELB). Se usa un servicio de terceros para el DNS. El arquitecto debe recomendar una solución para detectar y protegerse frente a ataques DDoS a gran escala. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Activar Amazon GuardDuty en la cuenta.",
          "Activar Amazon Inspector en las instancias EC2.",
          "Activar AWS Shield y asignarle Amazon Route 53.",
          "Activar AWS Shield Advanced y asignarle el ELB."
        ],
        correctas: [3],
        explicacion: "AWS Shield Advanced ofrece protección DDoS ampliada para recursos como los Elastic Load Balancers, con detección, mitigación e informes. Como el DNS es de terceros (no Route 53), la protección se asigna al ELB."
      },
      {
        pregunta: "Una empresa aloja un sitio web estático en Amazon S3 y usa Amazon Route 53 para el DNS. El sitio experimenta una demanda creciente desde todo el mundo. La empresa debe reducir la latencia para los usuarios que acceden al sitio. ¿Qué solución cumple estos requisitos de la forma MÁS rentable?",
        opciones: [
          "Replicar el bucket de S3 del sitio a todas las Regiones de AWS. Añadir entradas de enrutamiento por geolocalización en Route 53.",
          "Aprovisionar aceleradores en AWS Global Accelerator. Asociar las direcciones IP proporcionadas al bucket de S3. Editar las entradas de Route 53 para que apunten a las IP de los aceleradores.",
          "Añadir una distribución de Amazon CloudFront delante del bucket de S3. Editar las entradas de Route 53 para que apunten a la distribución de CloudFront.",
          "Activar S3 Transfer Acceleration en el bucket. Editar las entradas de Route 53 para que apunten al nuevo endpoint."
        ],
        correctas: [2],
        explicacion: "CloudFront es una CDN que cachea el contenido estático en edge locations por todo el mundo, sirviéndolo desde el más cercano y reduciendo la latencia. Con el modelo de pago por uso es la opción más rentable frente a replicar buckets o usar Global Accelerator."
      },
      {
        pregunta: "Una empresa mantiene un repositorio de artículos con búsqueda en su sitio web. Los datos están en una tabla de Amazon RDS for MySQL con más de 10 millones de filas y 2 TB de almacenamiento General Purpose SSD. Cada día hay millones de actualizaciones a través del sitio. La empresa observa que algunas operaciones de inserción tardan 10 segundos o más y ha determinado que el problema es el rendimiento del almacenamiento. ¿Qué solución resuelve este problema de rendimiento?",
        opciones: [
          "Cambiar el tipo de almacenamiento a Provisioned IOPS SSD.",
          "Cambiar la instancia de base de datos a una clase optimizada para memoria.",
          "Cambiar la instancia de base de datos a una clase de rendimiento ampliable (burstable).",
          "Habilitar réplicas de lectura Multi-AZ de RDS con replicación asíncrona nativa de MySQL."
        ],
        correctas: [0],
        explicacion: "El cuello de botella es el almacenamiento. Provisioned IOPS SSD ofrece IOPS altas y constantes con baja latencia, ideal para cargas intensivas de escritura como estas inserciones. Cambiar la clase de instancia o añadir réplicas de lectura no mejora el rendimiento de las escrituras."
      },
      {
        pregunta: "Una empresa tiene miles de dispositivos edge que en conjunto generan 1 TB de alertas de estado al día. Cada alerta ocupa unos 2 KB. Un arquitecto debe ingerir y almacenar las alertas para su análisis futuro. La empresa quiere alta disponibilidad, minimizar costes y no gestionar infraestructura adicional. Además quiere mantener 14 días de datos disponibles para análisis inmediato y archivar los de más de 14 días. ¿Cuál es la solución MÁS eficiente operativamente?",
        opciones: [
          "Crear un delivery stream de Amazon Kinesis Data Firehose para ingerir las alertas. Configurarlo para entregarlas a un bucket de S3. Configurar una regla de ciclo de vida de S3 para transicionar los datos a Amazon S3 Glacier tras 14 días.",
          "Lanzar instancias de Amazon EC2 en dos zonas de disponibilidad detrás de un Elastic Load Balancer para ingerir las alertas. Crear un script que las guarde en un bucket de S3. Configurar una regla de ciclo de vida a Glacier tras 14 días.",
          "Crear un delivery stream de Kinesis Data Firehose para ingerir las alertas. Configurarlo para entregarlas a un clúster de Amazon OpenSearch Service. Configurar el clúster para tomar snapshots manuales cada día y borrar los datos de más de 14 días.",
          "Crear una cola estándar de Amazon SQS para ingerir las alertas con retención de 14 días. Configurar consumidores que sondeen la cola, comprueben la antigüedad del mensaje y lo analicen. Si tiene 14 días, copiarlo a un bucket de S3 y borrarlo de la cola."
        ],
        correctas: [0],
        explicacion: "Kinesis Data Firehose es totalmente gestionado (sin infraestructura que operar) y entrega el streaming a S3 de forma duradera y económica. Una regla de ciclo de vida archiva a Glacier tras 14 días. Las demás opciones requieren gestionar instancias o un clúster, o exceden el uso previsto de SQS."
      },
      {
        pregunta: "La aplicación de una empresa se integra con múltiples fuentes SaaS para recopilar datos. La empresa ejecuta instancias de Amazon EC2 para recibir los datos y subirlos a un bucket de Amazon S3 para su análisis. La misma instancia EC2 que recibe y sube los datos también envía una notificación al usuario cuando la subida se completa. La empresa nota un rendimiento lento y quiere mejorarlo lo máximo posible. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Crear un Auto Scaling group para que las instancias EC2 puedan escalar. Configurar una notificación de eventos de S3 hacia un topic de Amazon SNS cuando se complete la subida.",
          "Crear un flujo de Amazon AppFlow para transferir los datos entre cada fuente SaaS y el bucket de S3. Configurar una notificación de eventos de S3 hacia un topic de Amazon SNS cuando se complete la subida.",
          "Crear una regla de Amazon EventBridge por cada fuente SaaS para enviar los datos de salida, con el bucket de S3 como destino. Crear una segunda regla de EventBridge para enviar eventos al completarse la subida, con un topic de Amazon SNS como destino.",
          "Crear un contenedor Docker en lugar de una instancia EC2. Alojar la aplicación en Amazon ECS. Configurar CloudWatch Container Insights para enviar eventos a un topic de Amazon SNS cuando se complete la subida."
        ],
        correctas: [1],
        explicacion: "Amazon AppFlow es un servicio gestionado que transfiere datos entre aplicaciones SaaS y AWS (como S3) sin las instancias EC2 intermedias que ralentizan el proceso. Combinado con notificaciones de eventos de S3 y SNS, elimina la infraestructura propia y reduce el trabajo operativo."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación de procesamiento de imágenes de alta disponibilidad en instancias de Amazon EC2 dentro de una única VPC, repartidas en varias subredes de varias zonas de disponibilidad. Las instancias no se comunican entre sí, pero descargan y suben imágenes a Amazon S3 a través de una única NAT gateway. La empresa está preocupada por los cargos de transferencia de datos. ¿Cuál es la forma MÁS rentable de evitar los cargos de transferencia de datos regional?",
        opciones: [
          "Lanzar una NAT gateway en cada zona de disponibilidad.",
          "Sustituir la NAT gateway por una NAT instance.",
          "Desplegar un gateway VPC endpoint para Amazon S3.",
          "Aprovisionar un EC2 Dedicated Host para ejecutar las instancias EC2."
        ],
        correctas: [2],
        explicacion: "Un gateway VPC endpoint para S3 enruta el tráfico a S3 por la red privada de AWS sin pasar por la NAT gateway, eliminando los cargos de procesamiento de la NAT y el tráfico por Internet. No tiene coste adicional."
      },
      {
        pregunta: "Una empresa tiene una aplicación on-premises que genera una gran cantidad de datos sensibles al tiempo que se respaldan en Amazon S3. La aplicación ha crecido y los usuarios se quejan de las limitaciones de ancho de banda de Internet. Un arquitecto debe diseñar una solución a largo plazo que permita copias de seguridad oportunas en S3 con el mínimo impacto en la conectividad a Internet de los usuarios internos. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Establecer conexiones AWS VPN y enrutar todo el tráfico a través de un gateway VPC endpoint.",
          "Establecer una nueva conexión AWS Direct Connect y dirigir el tráfico de copia de seguridad por esta nueva conexión.",
          "Pedir dispositivos AWS Snowball diariamente. Cargar los datos en los dispositivos y devolverlos a AWS cada día.",
          "Abrir un ticket de soporte en la consola de AWS. Solicitar la eliminación de los límites de servicio de S3 en la cuenta."
        ],
        correctas: [1],
        explicacion: "AWS Direct Connect proporciona un enlace de red dedicado entre el centro de datos y AWS que no pasa por Internet. Dirigir las copias de seguridad por Direct Connect asegura backups oportunos sin consumir el ancho de banda de Internet de los usuarios."
      },
      {
        pregunta: "Una empresa tiene un bucket de Amazon S3 con datos críticos. La empresa debe proteger los datos frente a borrados accidentales. ¿Qué combinación de pasos debe seguir un arquitecto para cumplir estos requisitos? (Elige dos.)",
        opciones: [
          "Habilitar el versionado en el bucket de S3.",
          "Habilitar MFA Delete en el bucket de S3.",
          "Crear una política de bucket en el bucket de S3.",
          "Habilitar el cifrado por defecto en el bucket de S3.",
          "Crear una política de ciclo de vida para los objetos del bucket de S3."
        ],
        correctas: [0, 1],
        explicacion: "El versionado conserva versiones anteriores, permitiendo recuperar objetos borrados o sobrescritos. MFA Delete exige un código de autenticación multifactor para borrar objetos o deshabilitar el versionado, añadiendo una barrera contra borrados accidentales."
      },
      {
        pregunta: "Una empresa tiene un flujo de ingesta de datos formado por un topic de Amazon SNS para notificaciones de nuevas entregas y una función de AWS Lambda que procesa los datos y registra metadatos. La empresa observa que el flujo falla ocasionalmente por problemas de conectividad de red. Cuando ocurre, la función Lambda no ingiere los datos correspondientes a menos que se vuelva a ejecutar el trabajo manualmente. ¿Qué combinación de acciones debe tomar un arquitecto para asegurar que Lambda ingiera todos los datos en el futuro? (Elige dos.)",
        opciones: [
          "Desplegar la función Lambda en varias zonas de disponibilidad.",
          "Crear una cola de Amazon SQS y suscribirla al topic de SNS.",
          "Aumentar la CPU y la memoria asignadas a la función Lambda.",
          "Aumentar el throughput aprovisionado para la función Lambda.",
          "Modificar la función Lambda para que lea de una cola de Amazon SQS."
        ],
        correctas: [1, 4],
        explicacion: "Insertar una cola SQS entre SNS y Lambda hace duradera la entrega: si Lambda falla, el mensaje permanece en la cola y se reintenta, evitando pérdidas. Por eso se suscribe la cola al topic (B) y se modifica Lambda para consumir de la cola (E)."
      },
      {
        pregunta: "Una empresa tiene una aplicación que ofrece servicios de marketing a tiendas basados en compras anteriores de sus clientes. Las tiendas suben datos de transacciones mediante SFTP, y los datos se procesan y analizan para generar nuevas ofertas. Algunos archivos superan los 200 GB. Recientemente la empresa descubrió que algunas tiendas subieron archivos con información personal identificable (PII) que no debería haberse incluido. La empresa quiere que se alerte a los administradores si se vuelve a compartir PII y automatizar la remediación. ¿Qué debe hacer un arquitecto con el MENOR esfuerzo de desarrollo?",
        opciones: [
          "Usar un bucket de S3 como punto de transferencia seguro. Usar Amazon Inspector para escanear los objetos del bucket. Si contienen PII, activar una política de ciclo de vida de S3 para eliminarlos.",
          "Usar un bucket de S3 como punto de transferencia seguro. Usar Amazon Macie para escanear los objetos del bucket. Si contienen PII, usar Amazon SNS para notificar a los administradores para que los eliminen.",
          "Implementar algoritmos de escaneo personalizados en una función de AWS Lambda. Invocarla al cargar objetos en el bucket. Si contienen PII, usar Amazon SNS para notificar a los administradores para que los eliminen.",
          "Implementar algoritmos de escaneo personalizados en una función de AWS Lambda. Invocarla al cargar objetos en el bucket. Si contienen PII, usar Amazon SES para notificar a los administradores y activar una política de ciclo de vida de S3 para eliminar los objetos con PII."
        ],
        correctas: [1],
        explicacion: "Amazon Macie detecta automáticamente PII en objetos de S3 mediante machine learning, sin desarrollar algoritmos propios. Al detectarla, una notificación por SNS avisa a los administradores. Es la opción con menos esfuerzo de desarrollo; Inspector es para vulnerabilidades, no PII."
      },
      {
        pregunta: "Una empresa necesita capacidad garantizada de Amazon EC2 en tres zonas de disponibilidad concretas de una Región de AWS concreta para un evento próximo que durará 1 semana. ¿Qué debe hacer la empresa para garantizar la capacidad de EC2?",
        opciones: [
          "Comprar Reserved Instances que especifiquen la Región necesaria.",
          "Crear una On-Demand Capacity Reservation que especifique la Región necesaria.",
          "Comprar Reserved Instances que especifiquen la Región y las tres zonas de disponibilidad necesarias.",
          "Crear una On-Demand Capacity Reservation que especifique la Región y las tres zonas de disponibilidad necesarias."
        ],
        correctas: [3],
        explicacion: "Las On-Demand Capacity Reservations garantizan capacidad en zonas de disponibilidad específicas y se pueden crear y cancelar cuando se quiera, ideal para un evento de 1 semana. Las Reserved Instances son un compromiso de facturación (1-3 años) y no garantizan capacidad si no se reservan por AZ."
      },
      {
        pregunta: "El sitio web de una empresa usa un instance store de Amazon EC2 para su catálogo de artículos. La empresa quiere asegurarse de que el catálogo tenga alta disponibilidad y se almacene en una ubicación duradera. ¿Qué debe hacer un arquitecto para cumplir estos requisitos?",
        opciones: [
          "Mover el catálogo a Amazon ElastiCache for Redis.",
          "Desplegar una instancia EC2 más grande con un instance store mayor.",
          "Mover el catálogo del instance store a Amazon S3 Glacier Deep Archive.",
          "Mover el catálogo a un sistema de archivos de Amazon Elastic File System (Amazon EFS)."
        ],
        correctas: [3],
        explicacion: "El instance store es efímero: se pierde si la instancia se detiene o falla. Amazon EFS es un sistema de archivos gestionado, duradero, de alta disponibilidad y compartido, adecuado para el catálogo. Glacier Deep Archive es un archivo de recuperación lenta, no válido para un catálogo activo."
      },
      {
        pregunta: "Una empresa almacena archivos de transcripciones de llamadas mensualmente. Los usuarios acceden a los archivos de forma aleatoria durante el primer año tras la llamada, pero rara vez después de 1 año. La empresa quiere optimizar su solución dando a los usuarios la posibilidad de consultar y recuperar lo más rápido posible los archivos de menos de 1 año. Un retraso en la recuperación de los archivos más antiguos es aceptable. ¿Qué solución cumple estos requisitos de la forma MÁS rentable?",
        opciones: [
          "Guardar los archivos individuales con etiquetas en Amazon S3 Glacier Instant Retrieval. Consultar las etiquetas para recuperar los archivos.",
          "Guardar los archivos individuales en Amazon S3 Intelligent-Tiering. Usar políticas de ciclo de vida para moverlos a S3 Glacier Flexible Retrieval tras 1 año. Consultar y recuperar los archivos de S3 con Amazon Athena y los de Glacier con S3 Glacier Select.",
          "Guardar los archivos individuales con etiquetas en S3 Standard, y los metadatos de búsqueda de cada archivo en S3 Standard. Usar políticas de ciclo de vida para moverlos a S3 Glacier Instant Retrieval tras 1 año. Consultar y recuperar los archivos buscando por los metadatos.",
          "Guardar los archivos individuales en S3 Standard. Usar políticas de ciclo de vida para moverlos a S3 Glacier Deep Archive tras 1 año. Guardar los metadatos de búsqueda en Amazon RDS. Consultar los archivos desde RDS y recuperarlos de Glacier Deep Archive."
        ],
        correctas: [1],
        explicacion: "S3 Intelligent-Tiering da acceso rápido a los archivos recientes de patrón impredecible, y una regla de ciclo de vida mueve a Glacier Flexible Retrieval lo de más de 1 año (recuperación más lenta, aceptable). Es el equilibrio más rentable entre acceso rápido reciente y archivo barato."
      },
      {
        pregunta: "Una empresa tiene una carga de trabajo de producción que se ejecuta en 1.000 instancias de Amazon EC2 Linux. La carga está impulsada por software de terceros. La empresa necesita parchear el software de terceros en todas las instancias lo antes posible para remediar una vulnerabilidad de seguridad crítica. ¿Qué debe hacer un arquitecto?",
        opciones: [
          "Crear una función de AWS Lambda para aplicar el parche a todas las instancias EC2.",
          "Configurar AWS Systems Manager Patch Manager para aplicar el parche a todas las instancias EC2.",
          "Programar una maintenance window de AWS Systems Manager para aplicar el parche a todas las instancias EC2.",
          "Usar AWS Systems Manager Run Command para ejecutar un comando personalizado que aplique el parche a todas las instancias EC2."
        ],
        correctas: [3],
        explicacion: "Systems Manager Run Command ejecuta comandos o scripts a la vez en muchas instancias EC2, aplicando el parche de terceros de forma inmediata a las 1.000 instancias. Patch Manager se centra en parches del SO y las maintenance windows introducen esperas, no la urgencia requerida."
      },
      {
        pregunta: "Una empresa está desarrollando una aplicación que ofrece estadísticas de envío de pedidos para su recuperación mediante una API REST. La empresa quiere extraer las estadísticas de envío, organizar los datos en un formato HTML fácil de leer y enviar el informe a varias direcciones de correo a la misma hora cada mañana. ¿Qué combinación de pasos debe seguir un arquitecto? (Elige dos.)",
        opciones: [
          "Configurar la aplicación para enviar los datos a Amazon Kinesis Data Firehose.",
          "Usar Amazon Simple Email Service (Amazon SES) para dar formato a los datos y enviar el informe por correo.",
          "Crear un evento programado de Amazon EventBridge que invoque un trabajo de AWS Glue para consultar la API de la aplicación en busca de los datos.",
          "Crear un evento programado de Amazon EventBridge que invoque una función de AWS Lambda para consultar la API de la aplicación en busca de los datos.",
          "Guardar los datos de la aplicación en Amazon S3. Crear un topic de Amazon SNS como destino de eventos de S3 para enviar el informe por correo."
        ],
        correctas: [1, 3],
        explicacion: "Un evento programado de EventBridge que invoca una función Lambda (D) extrae los datos de la API cada mañana, y Amazon SES (B) da formato al informe HTML y lo envía a varias direcciones. Es la combinación serverless que cumple el requisito."
      },
      {
        pregunta: "Una empresa quiere migrar su aplicación on-premises a AWS. La aplicación produce archivos de salida que varían desde decenas de gigabytes hasta cientos de terabytes. Los datos deben almacenarse en una estructura de sistema de archivos estándar. La empresa quiere una solución que escale automáticamente, tenga alta disponibilidad y requiera el mínimo trabajo operativo. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Migrar la aplicación a contenedores en Amazon Elastic Container Service (Amazon ECS). Usar Amazon S3 para el almacenamiento.",
          "Migrar la aplicación a contenedores en Amazon Elastic Kubernetes Service (Amazon EKS). Usar Amazon Elastic Block Store (Amazon EBS) para el almacenamiento.",
          "Migrar la aplicación a instancias de Amazon EC2 en un Auto Scaling group Multi-AZ. Usar Amazon Elastic File System (Amazon EFS) para el almacenamiento.",
          "Migrar la aplicación a instancias de Amazon EC2 en un Auto Scaling group Multi-AZ. Usar Amazon Elastic Block Store (Amazon EBS) para el almacenamiento."
        ],
        correctas: [2],
        explicacion: "El requisito de una estructura de sistema de archivos estándar que escale automáticamente y sea de alta disponibilidad apunta a Amazon EFS, que crece de forma elástica hasta petabytes y es accesible desde varias AZ. S3 no es un sistema de archivos y EBS no se comparte entre AZ ni escala de forma elástica."
      }
    ]
  },
  {
    id: "examen-02",
    titulo: "Examen de práctica 2",
    resumen: "50 preguntas tipo test sobre almacenamiento, FSx, contenedores, streaming, seguridad de red y optimización de costes, con respuesta correcta y explicación.",
    preguntas: [
      {
        pregunta: "Una empresa necesita almacenar sus registros contables en Amazon S3. Los registros deben estar inmediatamente accesibles durante 1 año y después archivarse durante 9 años más. Nadie en la empresa, incluidos los usuarios administradores y los usuarios root, debe poder eliminar los registros durante todo el periodo de 10 años. Los registros deben almacenarse con la máxima resiliencia. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Guardar los registros en S3 Glacier durante todo el periodo de 10 años. Usar una política de control de acceso para denegar la eliminación de los registros durante 10 años.",
          "Guardar los registros con S3 Intelligent-Tiering. Usar una política de IAM para denegar la eliminación de los registros. Tras 10 años, cambiar la política de IAM para permitir la eliminación.",
          "Usar una política de ciclo de vida de S3 para transicionar los registros de S3 Standard a S3 Glacier Deep Archive tras 1 año. Usar S3 Object Lock en modo compliance durante un periodo de 10 años.",
          "Usar una política de ciclo de vida de S3 para transicionar los registros de S3 Standard a S3 One Zone-Infrequent Access (S3 One Zone-IA) tras 1 año. Usar S3 Object Lock en modo governance durante un periodo de 10 años."
        ],
        correctas: [2],
        explicacion: "S3 Object Lock en modo compliance impide que nadie, ni siquiera el usuario root, borre los objetos durante el periodo de retención. El ciclo de vida a Glacier Deep Archive cubre el archivado de los 9 años restantes. El modo governance no vale porque permite que usuarios con permisos especiales eliminen los objetos, y One Zone-IA no ofrece la máxima resiliencia al guardar los datos en una sola AZ."
      },
      {
        pregunta: "Una empresa ejecuta varias cargas de trabajo de Windows en AWS. Sus empleados usan recursos compartidos de archivos de Windows alojados en dos instancias de Amazon EC2. Los recursos compartidos sincronizan datos entre sí y mantienen copias duplicadas. La empresa quiere una solución de almacenamiento duradera y de alta disponibilidad que conserve la forma en que los usuarios acceden actualmente a los archivos. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Migrar todos los datos a Amazon S3. Configurar autenticación de IAM para que los usuarios accedan a los archivos.",
          "Configurar un Amazon S3 File Gateway. Montarlo en las instancias EC2 existentes.",
          "Extender el entorno de recursos compartidos a Amazon FSx for Windows File Server con una configuración Multi-AZ. Migrar todos los datos a FSx for Windows File Server.",
          "Extender el entorno de recursos compartidos a Amazon Elastic File System (Amazon EFS) con una configuración Multi-AZ. Migrar todos los datos a Amazon EFS."
        ],
        correctas: [2],
        explicacion: "FSx for Windows File Server es almacenamiento SMB nativo de Windows, gestionado y con alta disponibilidad en Multi-AZ, así que los usuarios siguen accediendo a los archivos igual que antes y desaparece la sincronización manual entre instancias. EFS solo habla NFS y no conserva el patrón de acceso actual."
      },
      {
        pregunta: "Un arquitecto de soluciones está desarrollando una arquitectura de VPC con varias subredes. La arquitectura alojará aplicaciones que usan instancias de Amazon EC2 e instancias de base de datos de Amazon RDS. Consta de seis subredes en dos zonas de disponibilidad; cada zona incluye una subred pública, una privada y una dedicada a las bases de datos. Solo las instancias EC2 que se ejecutan en las subredes privadas pueden tener acceso a las bases de datos de RDS. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Crear una nueva tabla de rutas que excluya la ruta a los bloques CIDR de las subredes públicas. Asociarla a las subredes de base de datos.",
          "Crear un grupo de seguridad que deniegue el tráfico entrante del grupo de seguridad asignado a las instancias de las subredes públicas. Adjuntarlo a las instancias de base de datos.",
          "Crear un grupo de seguridad que permita el tráfico entrante del grupo de seguridad asignado a las instancias de las subredes privadas. Adjuntarlo a las instancias de base de datos.",
          "Crear una conexión de peering entre las subredes públicas y las privadas. Crear otra conexión de peering entre las subredes privadas y las de base de datos."
        ],
        correctas: [2],
        explicacion: "Los grupos de seguridad solo admiten reglas de permitir y deniegan todo por defecto: basta permitir la entrada desde el grupo de seguridad de las instancias privadas para que solo ellas alcancen RDS. No existen reglas de denegación en los grupos de seguridad, lo que descarta la opción B."
      },
      {
        pregunta: "Una empresa ha registrado su nombre de dominio en Amazon Route 53. Usa Amazon API Gateway en la Región ca-central-1 como interfaz pública de las APIs de sus microservicios de backend. Servicios de terceros consumen las APIs de forma segura. La empresa quiere diseñar la URL de API Gateway con su nombre de dominio y el certificado correspondiente para que los terceros puedan usar HTTPS. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Crear variables de stage en API Gateway con Name=\"Endpoint-URL\" y Value=\"Company Domain Name\" para sobrescribir la URL por defecto. Importar el certificado público del dominio en AWS Certificate Manager (ACM).",
          "Crear registros DNS en Route 53 con el nombre de dominio. Apuntar el registro de alias al endpoint del stage regional de API Gateway. Importar el certificado público del dominio en AWS Certificate Manager (ACM) en la Región us-east-1.",
          "Crear un endpoint regional de API Gateway. Asociarlo al nombre de dominio de la empresa. Importar el certificado público del dominio en AWS Certificate Manager (ACM) en la misma Región. Adjuntar el certificado al endpoint de API Gateway. Configurar Route 53 para enrutar el tráfico al endpoint de API Gateway.",
          "Crear un endpoint regional de API Gateway. Asociarlo al nombre de dominio de la empresa. Importar el certificado público del dominio en AWS Certificate Manager (ACM) en la Región us-east-1. Adjuntar el certificado a las APIs de API Gateway. Crear registros DNS en Route 53 con el nombre de dominio y apuntar un registro A al nombre de dominio de la empresa."
        ],
        correctas: [2],
        explicacion: "Para un dominio personalizado con endpoint regional de API Gateway, el certificado de ACM debe estar en la misma Región que la API (ca-central-1). Solo los endpoints edge-optimized exigen el certificado en us-east-1, que es el error de las opciones B y D."
      },
      {
        pregunta: "Una empresa gestiona un sitio web de redes sociales muy popular que permite a los usuarios subir imágenes para compartirlas con otros usuarios. La empresa quiere asegurarse de que las imágenes no contengan contenido inapropiado y necesita una solución que minimice el esfuerzo de desarrollo. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Usar Amazon Comprehend para detectar contenido inapropiado. Usar revisión humana para las predicciones de baja confianza.",
          "Usar Amazon Rekognition para detectar contenido inapropiado. Usar revisión humana para las predicciones de baja confianza.",
          "Usar Amazon SageMaker para detectar contenido inapropiado. Usar Ground Truth para etiquetar las predicciones de baja confianza.",
          "Usar AWS Fargate para desplegar un modelo de machine learning personalizado que detecte contenido inapropiado. Usar Ground Truth para etiquetar las predicciones de baja confianza."
        ],
        correctas: [1],
        explicacion: "Amazon Rekognition analiza imágenes e incluye moderación de contenido lista para usar, sin entrenar ningún modelo. Comprehend trabaja sobre texto, y SageMaker o un modelo propio en Fargate exigirían un desarrollo considerable."
      },
      {
        pregunta: "Una empresa quiere ejecutar sus aplicaciones críticas en contenedores para cumplir requisitos de escalabilidad y disponibilidad. La empresa prefiere centrarse en el mantenimiento de las aplicaciones críticas y no quiere responsabilizarse de aprovisionar ni gestionar la infraestructura subyacente que ejecuta la carga contenerizada. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Usar instancias de Amazon EC2 e instalar Docker en ellas.",
          "Usar Amazon Elastic Container Service (Amazon ECS) sobre nodos worker de Amazon EC2.",
          "Usar Amazon Elastic Container Service (Amazon ECS) sobre AWS Fargate.",
          "Usar instancias de Amazon EC2 creadas desde una AMI optimizada para Amazon Elastic Container Service (Amazon ECS)."
        ],
        correctas: [2],
        explicacion: "AWS Fargate es el motor de cómputo serverless para contenedores: ejecuta las tareas de ECS sin aprovisionar ni gestionar instancias EC2. Todas las demás opciones dejan la infraestructura a cargo de la empresa."
      },
      {
        pregunta: "Una empresa aloja más de 300 sitios web y aplicaciones globales. Necesita una plataforma para analizar más de 30 TB de datos de clickstream al día. ¿Qué debe hacer un arquitecto de soluciones para transmitir y procesar los datos de clickstream?",
        opciones: [
          "Diseñar un AWS Data Pipeline para archivar los datos en un bucket de Amazon S3 y ejecutar un clúster de Amazon EMR con los datos para generar analíticas.",
          "Crear un Auto Scaling group de instancias de Amazon EC2 para procesar los datos y enviarlos a un data lake en Amazon S3 para que Amazon Redshift los analice.",
          "Cachear los datos en Amazon CloudFront. Guardarlos en un bucket de Amazon S3. Cuando se añada un objeto al bucket, ejecutar una función de AWS Lambda para procesarlos.",
          "Recoger los datos con Amazon Kinesis Data Streams. Usar Amazon Kinesis Data Firehose para transmitirlos a un data lake en Amazon S3. Cargarlos en Amazon Redshift para su análisis."
        ],
        correctas: [3],
        explicacion: "Kinesis Data Streams está pensado para ingerir clickstream en tiempo real a gran escala, Firehose lo entrega a S3 sin gestionar servidores y Redshift analiza el data lake. Es la única cadena totalmente gestionada y diseñada para streaming."
      },
      {
        pregunta: "Una empresa tiene un sitio web alojado en AWS detrás de un Application Load Balancer (ALB) configurado para gestionar HTTP y HTTPS por separado. La empresa quiere reenviar todas las peticiones al sitio de forma que usen HTTPS. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Actualizar la network ACL del ALB para aceptar solo tráfico HTTPS.",
          "Crear una regla que sustituya HTTP por HTTPS en la URL.",
          "Crear una regla de listener en el ALB para redirigir el tráfico HTTP a HTTPS.",
          "Sustituir el ALB por un Network Load Balancer configurado para usar Server Name Indication (SNI)."
        ],
        correctas: [2],
        explicacion: "El ALB permite definir una regla de listener con acción de redirección que envía todo el tráfico del puerto 80 a HTTPS, de forma nativa y sin escribir código. Bloquear HTTP con una ACL no redirige, solo rechaza las peticiones."
      },
      {
        pregunta: "Una empresa desarrolla una aplicación web de dos capas en AWS. Los desarrolladores la han desplegado en una instancia de Amazon EC2 que se conecta directamente a una base de datos Amazon RDS de backend. La empresa no debe incrustar las credenciales de la base de datos en la aplicación y además debe implementar una solución que rote automáticamente las credenciales de forma periódica. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Guardar las credenciales en los metadatos de la instancia. Usar reglas de Amazon EventBridge para ejecutar de forma programada una función de AWS Lambda que actualice a la vez las credenciales de RDS y los metadatos.",
          "Guardar las credenciales en un archivo de configuración dentro de un bucket de Amazon S3 cifrado. Usar reglas de Amazon EventBridge para ejecutar de forma programada una función de AWS Lambda que actualice a la vez las credenciales de RDS y las del archivo. Usar S3 Versioning para poder volver a valores anteriores.",
          "Guardar las credenciales como un secreto en AWS Secrets Manager. Activar la rotación automática del secreto. Adjuntar el permiso necesario al rol de la instancia EC2 para darle acceso al secreto.",
          "Guardar las credenciales como parámetros cifrados en AWS Systems Manager Parameter Store. Activar la rotación automática de los parámetros cifrados. Adjuntar el permiso necesario al rol de la instancia EC2 para darle acceso a los parámetros."
        ],
        correctas: [2],
        explicacion: "Secrets Manager saca las credenciales del código y ofrece rotación automática nativa integrada con RDS; el rol de la instancia le da acceso sin claves incrustadas. Parameter Store no tiene rotación automática de secretos, y las opciones A y B obligan a desarrollar y mantener código propio."
      },
      {
        pregunta: "Una empresa despliega una nueva aplicación web pública en AWS que se ejecutará detrás de un Application Load Balancer (ALB). La aplicación debe cifrarse en el edge con un certificado SSL/TLS emitido por una autoridad de certificación (CA) externa. El certificado debe rotarse cada año antes de que caduque. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Usar AWS Certificate Manager (ACM) para emitir un certificado SSL/TLS. Aplicarlo al ALB. Usar la función de renovación gestionada para rotarlo automáticamente.",
          "Usar AWS Certificate Manager (ACM) para emitir un certificado SSL/TLS. Importar el material de clave del certificado. Aplicarlo al ALB. Usar la renovación gestionada para rotarlo automáticamente.",
          "Usar AWS Certificate Manager (ACM) Private Certificate Authority para emitir un certificado SSL/TLS desde la CA raíz. Aplicarlo al ALB. Usar la renovación gestionada para rotarlo automáticamente.",
          "Usar AWS Certificate Manager (ACM) para importar un certificado SSL/TLS. Aplicarlo al ALB. Usar Amazon EventBridge para enviar una notificación cuando el certificado esté próximo a caducar. Rotar el certificado manualmente."
        ],
        correctas: [3],
        explicacion: "ACM no puede renovar automáticamente certificados importados de una CA externa: la renovación gestionada solo se aplica a los certificados que emite el propio ACM. Por eso hay que importarlo, avisar con EventBridge antes de la caducidad y rotarlo a mano."
      },
      {
        pregunta: "Una empresa ejecuta su infraestructura en AWS y tiene una base registrada de 700.000 usuarios en su aplicación de gestión documental. Quiere crear un producto que convierta archivos .pdf grandes en imágenes .jpg. Los .pdf pesan de media 5 MB. La empresa necesita guardar tanto los archivos originales como los convertidos. Un arquitecto debe diseñar una solución escalable que absorba una demanda que crecerá rápidamente. ¿Qué solución cumple estos requisitos de la forma MÁS rentable?",
        opciones: [
          "Guardar los archivos .pdf en Amazon S3. Configurar un evento S3 PUT que invoque una función de AWS Lambda que los convierta a .jpg y los guarde de nuevo en Amazon S3.",
          "Guardar los archivos .pdf en Amazon DynamoDB. Usar DynamoDB Streams para invocar una función de AWS Lambda que los convierta a .jpg y los guarde de nuevo en DynamoDB.",
          "Subir los archivos .pdf a una aplicación de AWS Elastic Beanstalk con instancias de Amazon EC2, almacenamiento de Amazon EBS y un Auto Scaling group. Usar un programa en las instancias EC2 para convertirlos a .jpg. Guardar los .pdf y los .jpg en el almacenamiento EBS.",
          "Subir los archivos .pdf a una aplicación de AWS Elastic Beanstalk con instancias de Amazon EC2, almacenamiento de Amazon EFS y un Auto Scaling group. Usar un programa en las instancias EC2 para convertirlos a .jpg. Guardar los .pdf y los .jpg en el almacenamiento EBS."
        ],
        correctas: [0],
        explicacion: "S3 con notificaciones de eventos que invocan Lambda es serverless: escala solo con la demanda y solo se paga por lo que se usa, sin servidores encendidos. DynamoDB no sirve para archivos de 5 MB (el límite por elemento es de 400 KB) y las opciones con Elastic Beanstalk mantienen instancias EC2 costosas."
      },
      {
        pregunta: "Una empresa tiene más de 5 TB de datos de archivos en servidores de archivos Windows on-premises con los que usuarios y aplicaciones interactúan a diario. La empresa está trasladando sus cargas de Windows a AWS y, mientras avanza el proceso, necesita acceder al almacenamiento de archivos tanto de AWS como on-premises con la mínima latencia. Necesita una solución que minimice el trabajo operativo y no requiera cambios significativos en los patrones de acceso actuales. La empresa usa una conexión AWS Site-to-Site VPN para conectarse a AWS. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Desplegar y configurar Amazon FSx for Windows File Server en AWS. Mover los datos on-premises a FSx for Windows File Server. Reconfigurar las cargas de trabajo para que usen FSx for Windows File Server en AWS.",
          "Desplegar y configurar un Amazon S3 File Gateway on-premises. Mover los datos on-premises al S3 File Gateway. Reconfigurar las cargas on-premises y las de la nube para que usen el S3 File Gateway.",
          "Desplegar y configurar un Amazon S3 File Gateway on-premises. Mover los datos on-premises a Amazon S3. Reconfigurar las cargas para que usen Amazon S3 directamente o el S3 File Gateway, según dónde esté cada carga.",
          "Desplegar y configurar Amazon FSx for Windows File Server en AWS. Desplegar y configurar un Amazon FSx File Gateway on-premises. Mover los datos on-premises al FSx File Gateway. Configurar las cargas de la nube para que usen FSx for Windows File Server en AWS y las on-premises para que usen el FSx File Gateway."
        ],
        correctas: [3],
        explicacion: "El FSx File Gateway cachea localmente los datos de FSx for Windows File Server, dando acceso de baja latencia tanto on-premises como en la nube sobre el mismo almacén y manteniendo el acceso SMB de siempre. Acceder a FSx solo a través de la VPN (opción A) añadiría latencia a los usuarios locales."
      },
      {
        pregunta: "Un hospital ha desplegado recientemente una API RESTful con Amazon API Gateway y AWS Lambda, que usa para subir informes en formato PDF y JPEG. El hospital necesita modificar el código de Lambda para identificar información sanitaria protegida (PHI) en los informes. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Usar librerías de Python existentes para extraer el texto de los informes e identificar la PHI en el texto extraído.",
          "Usar Amazon Textract para extraer el texto de los informes. Usar Amazon SageMaker para identificar la PHI en el texto extraído.",
          "Usar Amazon Textract para extraer el texto de los informes. Usar Amazon Comprehend Medical para identificar la PHI en el texto extraído.",
          "Usar Amazon Rekognition para extraer el texto de los informes. Usar Amazon Comprehend Medical para identificar la PHI en el texto extraído."
        ],
        correctas: [2],
        explicacion: "Amazon Textract extrae texto de PDF e imágenes y Amazon Comprehend Medical identifica PHI de forma nativa, sin entrenar modelos ni escribir lógica propia. SageMaker obligaría a construir un modelo y Rekognition no está pensado para extraer texto de documentos PDF."
      },
      {
        pregunta: "Una empresa tiene una aplicación que genera un gran número de archivos de unos 5 MB cada uno, almacenados en Amazon S3. La política de la empresa exige conservarlos 4 años antes de poder eliminarlos. Siempre se requiere accesibilidad inmediata, ya que contienen datos críticos difíciles de reproducir. Se accede a ellos con frecuencia los primeros 30 días desde su creación, pero rara vez después. ¿Qué solución de almacenamiento es la MÁS rentable?",
        opciones: [
          "Crear una política de ciclo de vida del bucket para mover los archivos de S3 Standard a S3 Glacier 30 días después de su creación. Eliminarlos 4 años después de su creación.",
          "Crear una política de ciclo de vida del bucket para mover los archivos de S3 Standard a S3 One Zone-Infrequent Access (S3 One Zone-IA) 30 días después de su creación. Eliminarlos 4 años después de su creación.",
          "Crear una política de ciclo de vida del bucket para mover los archivos de S3 Standard a S3 Standard-Infrequent Access (S3 Standard-IA) 30 días después de su creación. Eliminarlos 4 años después de su creación.",
          "Crear una política de ciclo de vida del bucket para mover los archivos de S3 Standard a S3 Standard-Infrequent Access (S3 Standard-IA) 30 días después de su creación. Moverlos a S3 Glacier 4 años después de su creación."
        ],
        correctas: [2],
        explicacion: "La accesibilidad inmediata descarta Glacier, y que los datos sean críticos y difíciles de reproducir descarta One Zone-IA, que vive en una sola AZ. Pasar a Standard-IA a los 30 días y borrar a los 4 años es lo más barato cumpliendo ambas condiciones; la opción D nunca elimina los archivos."
      },
      {
        pregunta: "Una empresa aloja una aplicación en varias instancias de Amazon EC2. La aplicación procesa mensajes de una cola de Amazon SQS, escribe en una tabla de Amazon RDS y elimina el mensaje de la cola. Ocasionalmente aparecen registros duplicados en la tabla de RDS, aunque la cola de SQS no contiene mensajes duplicados. ¿Qué debe hacer un arquitecto de soluciones para asegurar que los mensajes se procesen una sola vez?",
        opciones: [
          "Usar la llamada a la API CreateQueue para crear una cola nueva.",
          "Usar la llamada a la API AddPermission para añadir los permisos adecuados.",
          "Usar la llamada a la API ReceiveMessage para establecer un tiempo de espera adecuado.",
          "Usar la llamada a la API ChangeMessageVisibility para aumentar el visibility timeout."
        ],
        correctas: [3],
        explicacion: "Los duplicados aparecen porque el procesamiento tarda más que el visibility timeout: el mensaje vuelve a estar visible y otro consumidor lo procesa de nuevo. Aumentar el visibility timeout con ChangeMessageVisibility da tiempo a terminar y borrar el mensaje antes de que reaparezca."
      },
      {
        pregunta: "Un arquitecto de soluciones diseña una nueva arquitectura híbrida para extender la infraestructura on-premises de una empresa a AWS. La empresa requiere una conexión de alta disponibilidad con baja latencia constante hacia una Región de AWS. Necesita minimizar costes y acepta un tráfico más lento si falla la conexión principal. ¿Qué debe hacer el arquitecto?",
        opciones: [
          "Aprovisionar una conexión de AWS Direct Connect a una Región. Aprovisionar una conexión VPN como respaldo por si falla la conexión principal de Direct Connect.",
          "Aprovisionar un túnel VPN a una Región para conectividad privada. Aprovisionar un segundo túnel VPN para conectividad privada y como respaldo si falla el primero.",
          "Aprovisionar una conexión de AWS Direct Connect a una Región. Aprovisionar una segunda conexión de Direct Connect a la misma Región como respaldo si falla la principal.",
          "Aprovisionar una conexión de AWS Direct Connect a una Región. Usar el atributo de failover de Direct Connect desde la AWS CLI para crear automáticamente una conexión de respaldo si falla la principal."
        ],
        correctas: [0],
        explicacion: "Direct Connect aporta la baja latencia constante que se pide, y una VPN de respaldo da alta disponibilidad a un coste muy inferior al de un segundo Direct Connect, asumiendo que el tráfico sea más lento durante el fallo. El atributo de failover de la opción D no existe."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación web crítica para el negocio en instancias de Amazon EC2 detrás de un Application Load Balancer. Las instancias están en un Auto Scaling group. La aplicación usa una base de datos Amazon Aurora PostgreSQL desplegada en una única zona de disponibilidad. La empresa quiere que la aplicación tenga alta disponibilidad con el mínimo tiempo de inactividad y la mínima pérdida de datos. ¿Qué solución cumple estos requisitos con el MENOR esfuerzo operativo?",
        opciones: [
          "Colocar las instancias EC2 en distintas Regiones de AWS. Usar health checks de Amazon Route 53 para redirigir el tráfico. Usar replicación entre Regiones de Aurora PostgreSQL.",
          "Configurar el Auto Scaling group para usar varias zonas de disponibilidad. Configurar la base de datos como Multi-AZ. Configurar una instancia de Amazon RDS Proxy para la base de datos.",
          "Configurar el Auto Scaling group para usar una zona de disponibilidad. Generar snapshots horarias de la base de datos. Recuperar la base de datos desde las snapshots en caso de fallo.",
          "Configurar el Auto Scaling group para usar varias Regiones de AWS. Escribir los datos de la aplicación en Amazon S3. Usar notificaciones de eventos de S3 para lanzar una función de AWS Lambda que escriba los datos en la base de datos."
        ],
        correctas: [1],
        explicacion: "Repartir el Auto Scaling group entre varias AZ y pasar Aurora a Multi-AZ da alta disponibilidad con failover automático y sin pérdida de datos, y RDS Proxy acelera la recuperación de las conexiones tras el failover. Todo son opciones de configuración, sin desarrollo."
      },
      {
        pregunta: "La aplicación HTTP de una empresa está detrás de un Network Load Balancer (NLB), cuyo target group usa un Auto Scaling group de Amazon EC2 con varias instancias que ejecutan el servicio web. La empresa observa que el NLB no detecta los errores HTTP de la aplicación, y esos errores requieren reiniciar manualmente las instancias EC2. La empresa necesita mejorar la disponibilidad de la aplicación sin escribir scripts ni código personalizados. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Activar health checks HTTP en el NLB indicando la URL de la aplicación.",
          "Añadir un cron job a las instancias EC2 que revise los logs locales de la aplicación cada minuto y reinicie la aplicación si detecta errores HTTP.",
          "Sustituir el NLB por un Application Load Balancer. Activar health checks HTTP indicando la URL de la aplicación. Configurar una acción de Auto Scaling que reemplace las instancias no saludables.",
          "Crear una alarma de Amazon CloudWatch que monitorice la métrica UnhealthyHostCount del NLB. Configurar una acción de Auto Scaling que reemplace las instancias no saludables cuando la alarma esté en estado ALARM."
        ],
        correctas: [2],
        explicacion: "El ALB trabaja en capa 7 y sus health checks evalúan de forma nativa los códigos de respuesta HTTP de la aplicación, que es lo que aquí no se está detectando. Combinado con los health checks del Auto Scaling group, las instancias no saludables se reemplazan solas, sin scripts ni código."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación de compras que usa Amazon DynamoDB para guardar la información de los clientes. Ante una posible corrupción de datos, un arquitecto de soluciones debe diseñar una solución con un objetivo de punto de recuperación (RPO) de 15 minutos y un objetivo de tiempo de recuperación (RTO) de 1 hora. ¿Qué debe recomendar el arquitecto?",
        opciones: [
          "Configurar tablas globales de DynamoDB. Para la recuperación del RPO, apuntar la aplicación a otra Región de AWS.",
          "Configurar la recuperación a un momento dado (point-in-time recovery) de DynamoDB. Para la recuperación del RPO, restaurar al momento deseado.",
          "Exportar los datos de DynamoDB a Amazon S3 Glacier a diario. Para la recuperación del RPO, importar los datos de S3 Glacier a DynamoDB.",
          "Programar snapshots de Amazon EBS de la tabla de DynamoDB cada 15 minutos. Para la recuperación del RPO, restaurar la tabla desde la snapshot de EBS."
        ],
        correctas: [1],
        explicacion: "El point-in-time recovery de DynamoDB permite restaurar a cualquier segundo de los últimos 35 días, cumpliendo de sobra un RPO de 15 minutos y un RTO de 1 hora. Las tablas globales replicarían la corrupción a las demás Regiones, y DynamoDB no usa volúmenes EBS."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación de procesamiento de fotos que necesita subir y descargar imágenes con frecuencia desde buckets de Amazon S3 ubicados en la misma Región de AWS. Un arquitecto de soluciones ha detectado un aumento del coste en tarifas de transferencia de datos y necesita implementar una solución para reducirlo. ¿Cómo puede cumplir este requisito?",
        opciones: [
          "Desplegar Amazon API Gateway en una subred pública y ajustar la tabla de rutas para enrutar las llamadas a S3 a través de él.",
          "Desplegar una NAT gateway en una subred pública y adjuntar una política de endpoint que permita el acceso a los buckets de S3.",
          "Desplegar la aplicación en una subred pública y permitir que enrute a través de un internet gateway para acceder a los buckets de S3.",
          "Desplegar un gateway VPC endpoint de S3 en la VPC y adjuntar una política de endpoint que permita el acceso a los buckets."
        ],
        correctas: [3],
        explicacion: "El gateway VPC endpoint para S3 lleva el tráfico por la red privada de AWS, sin pasar por la NAT gateway ni por Internet, eliminando los cargos de transferencia y de procesamiento de la NAT. Además, el endpoint no tiene coste adicional."
      },
      {
        pregunta: "Una empresa ha lanzado recientemente instancias de aplicación basadas en Linux en Amazon EC2 en una subred privada, y un bastion host Linux en una instancia EC2 de una subred pública de una VPC. Un arquitecto de soluciones necesita conectarse desde la red on-premises, a través de la conexión a Internet de la empresa, al bastion host y a los servidores de aplicación. Debe asegurarse de que los grupos de seguridad de todas las instancias EC2 permitan ese acceso. ¿Qué combinación de pasos debe seguir? (Elige dos.)",
        opciones: [
          "Sustituir el grupo de seguridad actual del bastion host por uno que solo permita el acceso entrante desde las instancias de aplicación.",
          "Sustituir el grupo de seguridad actual del bastion host por uno que solo permita el acceso entrante desde el rango de IP interno de la empresa.",
          "Sustituir el grupo de seguridad actual del bastion host por uno que solo permita el acceso entrante desde el rango de IP externo de la empresa.",
          "Sustituir el grupo de seguridad actual de las instancias de aplicación por uno que permita el acceso SSH entrante solo desde la dirección IP privada del bastion host.",
          "Sustituir el grupo de seguridad actual de las instancias de aplicación por uno que permita el acceso SSH entrante solo desde la dirección IP pública del bastion host."
        ],
        correctas: [2, 3],
        explicacion: "La conexión llega desde Internet, así que el bastion debe permitir la entrada desde el rango de IP externo (público) de la empresa (C). Del bastion a las instancias privadas el tráfico circula dentro de la VPC, por lo que estas deben permitir SSH desde la IP privada del bastion (D)."
      },
      {
        pregunta: "Un arquitecto de soluciones diseña una aplicación web de dos capas. La aplicación consta de una capa web de cara al público alojada en Amazon EC2 en subredes públicas. La capa de base de datos consta de Microsoft SQL Server ejecutándose en Amazon EC2 en una subred privada. La seguridad es una prioridad alta para la empresa. ¿Cómo deben configurarse los grupos de seguridad? (Elige dos.)",
        opciones: [
          "Configurar el grupo de seguridad de la capa web para permitir el tráfico entrante en el puerto 443 desde 0.0.0.0/0.",
          "Configurar el grupo de seguridad de la capa web para permitir el tráfico saliente en el puerto 443 hacia 0.0.0.0/0.",
          "Configurar el grupo de seguridad de la capa de base de datos para permitir el tráfico entrante en el puerto 1433 desde el grupo de seguridad de la capa web.",
          "Configurar el grupo de seguridad de la capa de base de datos para permitir el tráfico saliente en los puertos 443 y 1433 hacia el grupo de seguridad de la capa web.",
          "Configurar el grupo de seguridad de la capa de base de datos para permitir el tráfico entrante en los puertos 443 y 1433 desde el grupo de seguridad de la capa web."
        ],
        correctas: [0, 2],
        explicacion: "La capa web es pública y debe aceptar HTTPS entrante desde cualquier origen (A). La base de datos solo debe aceptar el puerto 1433 (SQL Server) y únicamente desde el grupo de seguridad de la capa web (C), aplicando el mínimo privilegio. Los grupos de seguridad tienen estado, así que las respuestas no necesitan reglas de salida."
      },
      {
        pregunta: "Una empresa quiere mover una aplicación multicapa de on-premises a la nube de AWS para mejorar su rendimiento. La aplicación consta de capas que se comunican entre sí mediante servicios RESTful. Las transacciones se descartan cuando una de las capas se sobrecarga. Un arquitecto de soluciones debe diseñar una solución que resuelva estos problemas y modernice la aplicación. ¿Qué solución cumple estos requisitos y es la MÁS eficiente operativamente?",
        opciones: [
          "Usar Amazon API Gateway y dirigir las transacciones a funciones de AWS Lambda como capa de aplicación. Usar Amazon Simple Queue Service (Amazon SQS) como capa de comunicación entre los servicios.",
          "Usar métricas de Amazon CloudWatch para analizar el histórico de rendimiento y determinar la utilización máxima de los servidores durante los fallos. Aumentar el tamaño de las instancias EC2 del servidor de aplicación para cubrir el pico.",
          "Usar Amazon Simple Notification Service (Amazon SNS) para gestionar la mensajería entre servidores de aplicación en Amazon EC2 dentro de un Auto Scaling group. Usar Amazon CloudWatch para monitorizar la longitud de la cola de SNS y escalar según haga falta.",
          "Usar Amazon Simple Queue Service (Amazon SQS) para gestionar la mensajería entre servidores de aplicación en Amazon EC2 dentro de un Auto Scaling group. Usar Amazon CloudWatch para monitorizar la longitud de la cola de SQS y escalar cuando se detecten fallos de comunicación."
        ],
        correctas: [0],
        explicacion: "API Gateway con Lambda y SQS entre servicios es serverless: la cola absorbe los picos sin descartar transacciones y no hay servidores que gestionar, lo que además moderniza la aplicación. SNS no encola mensajes a la espera de que un consumidor los recoja."
      },
      {
        pregunta: "Una empresa recibe 10 TB de datos de instrumentación al día procedentes de varias máquinas ubicadas en una única fábrica. Los datos son archivos JSON almacenados en una red de área de almacenamiento (SAN) en un centro de datos on-premises dentro de la fábrica. La empresa quiere enviar estos datos a Amazon S3, donde varios sistemas adicionales los usarán para analíticas críticas casi en tiempo real. Una transferencia segura es importante porque los datos se consideran sensibles. ¿Qué solución ofrece la transferencia de datos MÁS fiable?",
        opciones: [
          "AWS DataSync a través de Internet público.",
          "AWS DataSync a través de AWS Direct Connect.",
          "AWS Database Migration Service (AWS DMS) a través de Internet público.",
          "AWS Database Migration Service (AWS DMS) a través de AWS Direct Connect."
        ],
        correctas: [1],
        explicacion: "DataSync es el servicio para transferir archivos (como los JSON de la SAN) hacia S3, y Direct Connect aporta un enlace dedicado, seguro y con ancho de banda constante, más fiable que Internet. DMS sirve para migrar bases de datos, no archivos."
      },
      {
        pregunta: "Una empresa necesita configurar una arquitectura de ingesta de datos en tiempo real para su aplicación. Necesita una API, un proceso que transforme los datos según se transmiten y una solución de almacenamiento para los datos. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Desplegar una instancia de Amazon EC2 que aloje una API que envíe datos a un data stream de Amazon Kinesis. Crear un delivery stream de Amazon Kinesis Data Firehose que use el data stream como fuente. Usar funciones de AWS Lambda para transformar los datos. Usar el delivery stream de Firehose para enviarlos a Amazon S3.",
          "Desplegar una instancia de Amazon EC2 que aloje una API que envíe datos a AWS Glue. Detener la comprobación de origen/destino en la instancia EC2. Usar AWS Glue para transformar los datos y enviarlos a Amazon S3.",
          "Configurar una API de Amazon API Gateway que envíe datos a un data stream de Amazon Kinesis. Crear un delivery stream de Amazon Kinesis Data Firehose que use el data stream como fuente. Usar funciones de AWS Lambda para transformar los datos. Usar el delivery stream de Firehose para enviarlos a Amazon S3.",
          "Configurar una API de Amazon API Gateway que envíe datos a AWS Glue. Usar funciones de AWS Lambda para transformar los datos. Usar AWS Glue para enviarlos a Amazon S3."
        ],
        correctas: [2],
        explicacion: "API Gateway aporta la API gestionada (sin EC2 que mantener), Kinesis Data Streams la ingesta en tiempo real, Lambda la transformación en vuelo dentro de Firehose y S3 el almacenamiento. Es la cadena totalmente serverless; las opciones con EC2 o Glue añaden gestión o no son de streaming."
      },
      {
        pregunta: "Una empresa necesita conservar los datos de transacciones de usuario en una tabla de Amazon DynamoDB y debe retenerlos durante 7 años. ¿Cuál es la solución MÁS eficiente operativamente que cumple estos requisitos?",
        opciones: [
          "Usar la recuperación a un momento dado (point-in-time recovery) de DynamoDB para respaldar la tabla de forma continua.",
          "Usar AWS Backup para crear programaciones de copia de seguridad y políticas de retención para la tabla.",
          "Crear una copia de seguridad bajo demanda de la tabla desde la consola de DynamoDB. Guardarla en un bucket de Amazon S3. Definir una configuración de ciclo de vida para el bucket.",
          "Crear una regla de Amazon EventBridge que invoque una función de AWS Lambda. Configurar la función para respaldar la tabla y guardar la copia en un bucket de Amazon S3. Definir una configuración de ciclo de vida para el bucket."
        ],
        correctas: [1],
        explicacion: "AWS Backup gestiona de forma centralizada las programaciones y las políticas de retención de DynamoDB sin escribir código. El point-in-time recovery solo cubre 35 días, muy lejos de los 7 años requeridos."
      },
      {
        pregunta: "Una empresa planea usar una tabla de Amazon DynamoDB para almacenar datos y le preocupa la optimización de costes. La tabla no se usará la mayoría de las mañanas. Por las tardes, el tráfico de lectura y escritura será a menudo impredecible, y cuando haya picos de tráfico se producirán muy rápido. ¿Qué debe recomendar un arquitecto de soluciones?",
        opciones: [
          "Crear una tabla de DynamoDB en modo de capacidad bajo demanda (on-demand).",
          "Crear una tabla de DynamoDB con un índice secundario global.",
          "Crear una tabla de DynamoDB con capacidad aprovisionada y auto scaling.",
          "Crear una tabla de DynamoDB en modo de capacidad aprovisionada y configurarla como tabla global."
        ],
        correctas: [0],
        explicacion: "El modo bajo demanda escala al instante ante picos repentinos e impredecibles y solo cobra por las peticiones realizadas, sin coste cuando la tabla no se usa. El auto scaling de la capacidad aprovisionada reacciona con retardo y no absorbe picos muy rápidos."
      },
      {
        pregunta: "Una empresa ha firmado recientemente un contrato con un AWS Managed Service Provider (MSP) Partner para ayudarle en una iniciativa de migración de aplicaciones. Un arquitecto de soluciones necesita compartir una Amazon Machine Image (AMI) de una cuenta de AWS existente con la cuenta del MSP Partner. La AMI está respaldada por Amazon Elastic Block Store (Amazon EBS) y usa una clave gestionada por el cliente de AWS Key Management Service (AWS KMS) para cifrar las snapshots de los volúmenes EBS. ¿Cuál es la forma MÁS segura de compartir la AMI con la cuenta del MSP Partner?",
        opciones: [
          "Hacer públicas la AMI cifrada y las snapshots. Modificar la política de la clave para permitir que la cuenta del MSP Partner use la clave.",
          "Modificar la propiedad launchPermission de la AMI. Compartir la AMI solo con la cuenta del MSP Partner. Modificar la política de la clave para permitir que la cuenta del MSP Partner use la clave.",
          "Modificar la propiedad launchPermission de la AMI. Compartir la AMI solo con la cuenta del MSP Partner. Modificar la política de la clave para confiar en una nueva clave de KMS propiedad del MSP Partner para el cifrado.",
          "Exportar la AMI de la cuenta de origen a un bucket de Amazon S3 en la cuenta del MSP Partner. Cifrar el bucket con una nueva clave de KMS propiedad del MSP Partner. Copiar y lanzar la AMI en la cuenta del MSP Partner."
        ],
        correctas: [1],
        explicacion: "Compartir la AMI mediante launchPermission solo con la cuenta concreta del partner, y darle acceso a la clave de KMS en la política de la clave, es lo mínimo imprescindible para que pueda lanzarla. Hacer la AMI pública (A) la expondría a todo el mundo."
      },
      {
        pregunta: "Un arquitecto de soluciones diseña la arquitectura cloud de una nueva aplicación que se desplegará en AWS. El proceso debe ejecutarse en paralelo, añadiendo y eliminando nodos de aplicación según el número de trabajos a procesar. La aplicación de procesamiento no tiene estado. El arquitecto debe asegurar que la aplicación esté débilmente acoplada y que los trabajos se almacenen de forma duradera. ¿Qué diseño debe usar?",
        opciones: [
          "Crear un topic de Amazon SNS para enviar los trabajos a procesar. Crear una AMI con la aplicación de procesamiento. Crear una launch configuration que use la AMI. Crear un Auto Scaling group con esa launch configuration. Configurar la política de escalado para añadir y eliminar nodos según el uso de CPU.",
          "Crear una cola de Amazon SQS para contener los trabajos a procesar. Crear una AMI con la aplicación de procesamiento. Crear una launch configuration que use la AMI. Crear un Auto Scaling group con esa launch configuration. Configurar la política de escalado para añadir y eliminar nodos según el uso de red.",
          "Crear una cola de Amazon SQS para contener los trabajos a procesar. Crear una AMI con la aplicación de procesamiento. Crear una launch template que use la AMI. Crear un Auto Scaling group con esa launch template. Configurar la política de escalado para añadir y eliminar nodos según el número de elementos en la cola de SQS.",
          "Crear un topic de Amazon SNS para enviar los trabajos a procesar. Crear una AMI con la aplicación de procesamiento. Crear una launch template que use la AMI. Crear un Auto Scaling group con esa launch template. Configurar la política de escalado para añadir y eliminar nodos según el número de mensajes publicados en el topic de SNS."
        ],
        correctas: [2],
        explicacion: "SQS almacena los trabajos de forma duradera y desacopla productores y consumidores; escalar el Auto Scaling group según el número de mensajes en la cola ajusta los nodos al trabajo realmente pendiente. SNS no almacena mensajes, y la CPU o la red no reflejan la cantidad de trabajos en espera."
      },
      {
        pregunta: "Una empresa aloja sus aplicaciones web en la nube de AWS. Configura Elastic Load Balancers para usar certificados importados en AWS Certificate Manager (ACM). El equipo de seguridad debe ser notificado 30 días antes de la caducidad de cada certificado. ¿Qué debe recomendar un arquitecto de soluciones?",
        opciones: [
          "Añadir una regla en ACM para publicar un mensaje personalizado en un topic de Amazon SNS cada día, empezando 30 días antes de que caduque cualquier certificado.",
          "Crear una regla de AWS Config que compruebe los certificados que caducarán en 30 días. Configurar Amazon EventBridge para invocar una alerta personalizada mediante Amazon SNS cuando AWS Config informe de un recurso no conforme.",
          "Usar AWS Trusted Advisor para comprobar los certificados que caducarán en 30 días. Crear una alarma de Amazon CloudWatch basada en las métricas de Trusted Advisor para los cambios de estado de la comprobación. Configurar la alarma para enviar una alerta personalizada mediante Amazon SNS.",
          "Crear una regla de Amazon EventBridge que detecte los certificados que caducarán en 30 días. Configurar la regla para invocar una función de AWS Lambda. Configurar la función para enviar una alerta personalizada mediante Amazon SNS."
        ],
        correctas: [3],
        explicacion: "ACM publica en EventBridge el evento \"ACM Certificate Approaching Expiration\", que permite disparar una Lambda que avise por SNS, y funciona también con certificados importados. ACM no tiene reglas de notificación propias (A) y Trusted Advisor no cubre los certificados importados (C)."
      },
      {
        pregunta: "El sitio web dinámico de una empresa está alojado en servidores on-premises en Estados Unidos. La empresa va a lanzar su producto en Europa y quiere optimizar los tiempos de carga del sitio para los nuevos usuarios europeos. El backend del sitio debe permanecer en Estados Unidos. El producto se lanza en unos pocos días y se necesita una solución inmediata. ¿Qué debe recomendar el arquitecto de soluciones?",
        opciones: [
          "Lanzar una instancia de Amazon EC2 en us-east-1 y migrar el sitio a ella.",
          "Mover el sitio web a Amazon S3. Usar Cross-Region Replication entre Regiones.",
          "Usar Amazon CloudFront con un origen personalizado que apunte a los servidores on-premises.",
          "Usar una política de enrutamiento por geoproximidad de Amazon Route 53 que apunte a los servidores on-premises."
        ],
        correctas: [2],
        explicacion: "CloudFront admite orígenes personalizados fuera de AWS, así que acelera el sitio desde las edge locations europeas dejando el backend on-premises en EE. UU., y se activa en minutos sin migrar nada. Route 53 solo resuelve DNS y no acelera la entrega del contenido."
      },
      {
        pregunta: "Una empresa quiere reducir el coste de su arquitectura web de tres capas existente. Los servidores web, de aplicación y de base de datos se ejecutan en instancias de Amazon EC2 para los entornos de desarrollo, pruebas y producción. Las instancias tienen de media un 30 % de uso de CPU en horas punta y un 10 % fuera de ellas. Las instancias de producción funcionan 24 horas al día; las de desarrollo y pruebas funcionan al menos 8 horas al día. La empresa planea automatizar la parada de las instancias de desarrollo y pruebas cuando no se usen. ¿Qué solución de compra de instancias EC2 cumple los requisitos de la forma MÁS rentable?",
        opciones: [
          "Usar Spot Instances para las instancias de producción. Usar Reserved Instances para las de desarrollo y pruebas.",
          "Usar Reserved Instances para las instancias de producción. Usar On-Demand Instances para las de desarrollo y pruebas.",
          "Usar Spot blocks para las instancias de producción. Usar Reserved Instances para las de desarrollo y pruebas.",
          "Usar On-Demand Instances para las instancias de producción. Usar Spot blocks para las de desarrollo y pruebas."
        ],
        correctas: [1],
        explicacion: "Producción funciona 24/7 de forma constante, el caso ideal para las Reserved Instances y su gran descuento. Desarrollo y pruebas se apagan cuando no se usan, así que On-Demand solo cobra las horas encendidas. Las Spot no valen para producción crítica porque AWS puede interrumpirlas."
      },
      {
        pregunta: "Una empresa tiene una aplicación web de producción en la que los usuarios suben documentos a través de una interfaz web o de una app móvil. Según un nuevo requisito normativo, los documentos nuevos no pueden modificarse ni eliminarse una vez almacenados. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Guardar los documentos subidos en un bucket de Amazon S3 con S3 Versioning y S3 Object Lock activados.",
          "Guardar los documentos subidos en un bucket de Amazon S3. Configurar una política de ciclo de vida de S3 para archivarlos periódicamente.",
          "Guardar los documentos subidos en un bucket de Amazon S3 con S3 Versioning activado. Configurar una ACL para restringir todo el acceso a solo lectura.",
          "Guardar los documentos subidos en un volumen de Amazon Elastic File System (Amazon EFS). Acceder a los datos montando el volumen en modo solo lectura."
        ],
        correctas: [0],
        explicacion: "S3 Object Lock implementa el modelo WORM (escribir una vez, leer muchas) e impide modificar o borrar los objetos durante el periodo de retención; para usarlo hace falta el versionado activado. Es el mecanismo diseñado para requisitos normativos de inmutabilidad."
      },
      {
        pregunta: "Una empresa tiene varios servidores web que necesitan acceder con frecuencia a una instancia de base de datos común de Amazon RDS MySQL Multi-AZ. La empresa quiere un método seguro para que los servidores web se conecten a la base de datos, cumpliendo un requisito de seguridad de rotar las credenciales de usuario con frecuencia. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Guardar las credenciales de usuario de la base de datos en AWS Secrets Manager. Conceder los permisos de IAM necesarios para que los servidores web accedan a AWS Secrets Manager.",
          "Guardar las credenciales de usuario de la base de datos en AWS Systems Manager OpsCenter. Conceder los permisos de IAM necesarios para que los servidores web accedan a OpsCenter.",
          "Guardar las credenciales de usuario de la base de datos en un bucket de Amazon S3 seguro. Conceder los permisos de IAM necesarios para que los servidores web recuperen las credenciales y accedan a la base de datos.",
          "Guardar las credenciales de usuario de la base de datos en archivos cifrados con AWS Key Management Service (AWS KMS) en el sistema de archivos del servidor web. El servidor web debe poder descifrar los archivos y acceder a la base de datos."
        ],
        correctas: [0],
        explicacion: "Secrets Manager está diseñado para guardar credenciales de base de datos y rotarlas automáticamente con integración nativa con RDS, controlando el acceso mediante IAM. OpsCenter gestiona incidencias operativas, no secretos."
      },
      {
        pregunta: "Una empresa aloja una aplicación en funciones de AWS Lambda invocadas por una API de Amazon API Gateway. Las funciones Lambda guardan datos de clientes en una base de datos Amazon Aurora MySQL. Cada vez que la empresa actualiza la base de datos, las funciones Lambda no consiguen establecer conexiones hasta que la actualización termina, con el resultado de que no se registran los datos de clientes de algunos eventos. Un arquitecto debe diseñar una solución que almacene los datos de clientes generados durante las actualizaciones de la base de datos. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Aprovisionar un Amazon RDS Proxy entre las funciones Lambda y la base de datos. Configurar las funciones Lambda para conectarse al RDS Proxy.",
          "Aumentar al máximo el tiempo de ejecución de las funciones Lambda. Crear un mecanismo de reintentos en el código que guarde los datos de clientes en la base de datos.",
          "Persistir los datos de clientes en el almacenamiento local de Lambda. Configurar nuevas funciones Lambda que revisen ese almacenamiento local para guardar los datos en la base de datos.",
          "Guardar los datos de clientes en una cola FIFO de Amazon Simple Queue Service (Amazon SQS). Crear una nueva función Lambda que sondee la cola y guarde los datos de clientes en la base de datos."
        ],
        correctas: [3],
        explicacion: "La cola de SQS retiene de forma duradera los datos mientras la base de datos no está disponible, y la Lambda consumidora los inserta cuando vuelve, sin perder nada; la variante FIFO además conserva el orden. El almacenamiento local de Lambda es efímero y no sirve como buffer."
      },
      {
        pregunta: "Una empresa de encuestas lleva años recopilando datos de zonas de Estados Unidos. Aloja los datos en un bucket de Amazon S3 de 3 TB que sigue creciendo. La empresa ha empezado a compartir los datos con una firma de marketing europea que tiene buckets de S3. La empresa quiere asegurarse de que sus costes de transferencia de datos se mantengan lo más bajos posible. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Configurar la función Requester Pays en el bucket de S3 de la empresa.",
          "Configurar S3 Cross-Region Replication desde el bucket de la empresa a uno de los buckets de la firma de marketing.",
          "Configurar el acceso entre cuentas para que la firma de marketing tenga acceso al bucket de S3 de la empresa.",
          "Configurar el bucket de S3 de la empresa para usar S3 Intelligent-Tiering. Sincronizar el bucket con uno de los buckets de la firma de marketing."
        ],
        correctas: [0],
        explicacion: "Con Requester Pays, quien descarga los datos (la firma de marketing) paga las peticiones y la transferencia, de modo que la empresa solo asume el coste de almacenamiento. Replicar o sincronizar los datos haría que la empresa pagara la salida."
      },
      {
        pregunta: "Una empresa usa Amazon S3 para guardar sus documentos confidenciales de auditoría. El bucket usa políticas de bucket para restringir el acceso a las credenciales de los usuarios de IAM del equipo de auditoría según el principio de mínimo privilegio. A los responsables de la empresa les preocupa el borrado accidental de documentos del bucket y quieren una solución más segura. ¿Qué debe hacer un arquitecto de soluciones para proteger los documentos de auditoría?",
        opciones: [
          "Activar las funciones de versionado y MFA Delete en el bucket de S3.",
          "Activar la autenticación multifactor (MFA) en las credenciales de IAM de cada cuenta de usuario del equipo de auditoría.",
          "Añadir una política de ciclo de vida de S3 a las cuentas de usuario de IAM del equipo de auditoría para denegar la acción s3:DeleteObject durante las fechas de auditoría.",
          "Usar AWS Key Management Service (AWS KMS) para cifrar el bucket de S3 y restringir el acceso a la clave de KMS a las cuentas de usuario de IAM del equipo de auditoría."
        ],
        correctas: [0],
        explicacion: "El versionado permite recuperar cualquier objeto borrado por accidente y MFA Delete exige un código adicional para eliminar versiones o desactivar el versionado. El cifrado protege la confidencialidad, pero no evita los borrados."
      },
      {
        pregunta: "Una empresa usa una base de datos SQL para guardar datos de películas de acceso público. La base de datos se ejecuta en una instancia Single-AZ de Amazon RDS. Un script ejecuta consultas a intervalos aleatorios cada día para registrar el número de películas nuevas añadidas y debe reportar un total final en horario laboral. El equipo de desarrollo observa que el rendimiento de la base de datos es insuficiente para las tareas de desarrollo mientras el script se ejecuta. ¿Qué solución cumple este requisito con el MENOR trabajo operativo?",
        opciones: [
          "Modificar la instancia de base de datos para que sea un despliegue Multi-AZ.",
          "Crear una réplica de lectura de la base de datos. Configurar el script para que consulte solo la réplica de lectura.",
          "Indicar al equipo de desarrollo que exporte manualmente las entradas de la base de datos al final de cada día.",
          "Usar Amazon ElastiCache para cachear las consultas habituales que el script ejecuta contra la base de datos."
        ],
        correctas: [1],
        explicacion: "Una réplica de lectura descarga las consultas del script a otra instancia, dejando libre la principal para el equipo de desarrollo, y se crea con unos pocos clics. En Multi-AZ el standby no atiende lecturas, así que no aliviaría la carga."
      },
      {
        pregunta: "Una empresa tiene aplicaciones que se ejecutan en instancias de Amazon EC2 dentro de una VPC. Una de ellas necesita llamar a la API de Amazon S3 para guardar y leer objetos. Según la normativa de seguridad de la empresa, no se permite que el tráfico de las aplicaciones circule por Internet. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Configurar un gateway endpoint de S3.",
          "Crear un bucket de S3 en una subred privada.",
          "Crear un bucket de S3 en la misma Región de AWS que las instancias EC2.",
          "Configurar una NAT gateway en la misma subred que las instancias EC2."
        ],
        correctas: [0],
        explicacion: "El gateway endpoint de S3 permite que la VPC llegue a S3 por la red privada de AWS sin salir a Internet. Los buckets de S3 no viven dentro de subredes, y una NAT gateway hace justo lo contrario: enrutar el tráfico hacia Internet."
      },
      {
        pregunta: "Una empresa guarda información sensible de usuarios en un bucket de Amazon S3 y quiere ofrecer acceso seguro a ese bucket desde la capa de aplicación que se ejecuta en instancias de Amazon EC2 dentro de una VPC. ¿Qué combinación de pasos debe seguir un arquitecto de soluciones? (Elige dos.)",
        opciones: [
          "Configurar un gateway VPC endpoint para Amazon S3 dentro de la VPC.",
          "Crear una política de bucket que haga públicos los objetos del bucket de S3.",
          "Crear una política de bucket que limite el acceso únicamente a la capa de aplicación que se ejecuta en la VPC.",
          "Crear un usuario de IAM con una política de acceso a S3 y copiar sus credenciales de IAM a la instancia EC2.",
          "Crear una instancia NAT y hacer que las instancias EC2 la usen para acceder al bucket de S3."
        ],
        correctas: [0, 2],
        explicacion: "El gateway VPC endpoint (A) lleva el tráfico a S3 por la red privada de AWS, y una política de bucket que solo admite peticiones desde ese endpoint o esa VPC (C) impide el acceso desde fuera. Hacer los objetos públicos o copiar credenciales de IAM a la instancia son prácticas inseguras."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación on-premises basada en una base de datos MySQL. Está migrando la aplicación a AWS para aumentar su elasticidad y disponibilidad. La arquitectura actual muestra una fuerte actividad de lectura durante la operación normal. Cada 4 horas, el equipo de desarrollo extrae una exportación completa de la base de datos de producción para poblar la de staging; durante ese periodo los usuarios sufren una latencia inaceptable y el equipo no puede usar staging hasta que el proceso termina. Un arquitecto debe recomendar una arquitectura de reemplazo que alivie la latencia y permita al equipo seguir usando staging sin demoras. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar Amazon Aurora MySQL con réplicas de Aurora Multi-AZ para producción. Poblar la base de datos de staging con un proceso de copia y restauración que use la utilidad mysqldump.",
          "Usar Amazon Aurora MySQL con réplicas de Aurora Multi-AZ para producción. Usar la clonación de bases de datos para crear la base de datos de staging bajo demanda.",
          "Usar Amazon RDS for MySQL con un despliegue Multi-AZ y réplicas de lectura para producción. Usar la instancia standby para la base de datos de staging.",
          "Usar Amazon RDS for MySQL con un despliegue Multi-AZ y réplicas de lectura para producción. Poblar la base de datos de staging con un proceso de copia y restauración que use la utilidad mysqldump."
        ],
        correctas: [1],
        explicacion: "La clonación de Aurora crea una copia casi instantánea mediante copy-on-write, sin exportar datos ni cargar la base de producción, así que staging está listo enseguida. Las réplicas de Aurora absorben la carga de lectura. Los procesos con mysqldump son justo el cuello de botella que hay que eliminar."
      },
      {
        pregunta: "Una empresa diseña una aplicación en la que los usuarios suben archivos pequeños a Amazon S3. Después de subir un archivo, este requiere un procesamiento sencillo y único para transformar los datos y guardarlos en formato JSON para su análisis posterior. Cada archivo debe procesarse lo más rápido posible tras subirse. La demanda variará: algunos días los usuarios subirán muchos archivos y otros pocos o ninguno. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Configurar Amazon EMR para leer archivos de texto de Amazon S3. Ejecutar scripts de procesamiento para transformar los datos. Guardar el archivo JSON resultante en un clúster de base de datos Amazon Aurora.",
          "Configurar Amazon S3 para enviar una notificación de evento a una cola de Amazon Simple Queue Service (Amazon SQS). Usar instancias de Amazon EC2 para leer de la cola y procesar los datos. Guardar el archivo JSON resultante en Amazon DynamoDB.",
          "Configurar Amazon S3 para enviar una notificación de evento a una cola de Amazon Simple Queue Service (Amazon SQS). Usar una función de AWS Lambda para leer de la cola y procesar los datos. Guardar el archivo JSON resultante en Amazon DynamoDB.",
          "Configurar Amazon EventBridge para enviar un evento a Amazon Kinesis Data Streams cuando se suba un archivo nuevo. Usar una función de AWS Lambda para consumir el evento del stream y procesar los datos. Guardar el archivo JSON resultante en un clúster de base de datos Amazon Aurora."
        ],
        correctas: [2],
        explicacion: "S3 → SQS → Lambda → DynamoDB es totalmente serverless: escala solo con la demanda, no cuesta nada cuando no se suben archivos y procesa cada uno nada más llegar. EMR y EC2 obligan a mantener clústeres o instancias encendidos."
      },
      {
        pregunta: "Una aplicación permite a los usuarios de la sede central de una empresa acceder a datos de productos almacenados en una instancia de base de datos Amazon RDS MySQL. El equipo de operaciones ha aislado una ralentización del rendimiento de la aplicación y quiere separar el tráfico de lectura del de escritura. Un arquitecto de soluciones debe optimizar el rendimiento de la aplicación rápidamente. ¿Qué debe recomendar?",
        opciones: [
          "Cambiar la base de datos existente a un despliegue Multi-AZ. Atender las peticiones de lectura desde la zona de disponibilidad principal.",
          "Cambiar la base de datos existente a un despliegue Multi-AZ. Atender las peticiones de lectura desde la zona de disponibilidad secundaria.",
          "Crear réplicas de lectura de la base de datos. Configurarlas con la mitad de recursos de cómputo y almacenamiento que la base de datos de origen.",
          "Crear réplicas de lectura de la base de datos. Configurarlas con los mismos recursos de cómputo y almacenamiento que la base de datos de origen."
        ],
        correctas: [3],
        explicacion: "Las réplicas de lectura separan el tráfico de lectura del de escritura, y deben dimensionarse igual que la instancia de origen para no convertirse en un nuevo cuello de botella ni acumular retraso de replicación. El standby de Multi-AZ no atiende lecturas."
      },
      {
        pregunta: "Un administrador de Amazon EC2 ha creado la siguiente política, asociada a un grupo de IAM que contiene varios usuarios. ¿Cuál es el efecto de esta política?",
        codigo: `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "ec2:TerminateInstances",
            "Resource": "*",
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": "10.100.100.0/24"
                }
            }
        },
        {
            "Effect": "Deny",
            "Action": "ec2:*",
            "Resource": "*",
            "Condition": {
                "StringNotEquals": {
                    "ec2:Region": "us-east-1"
                }
            }
        }
    ]
}`,
        opciones: [
          "Los usuarios pueden terminar una instancia EC2 en cualquier Región de AWS excepto us-east-1.",
          "Los usuarios pueden terminar una instancia EC2 con la dirección IP 10.100.100.1 en la Región us-east-1.",
          "Los usuarios pueden terminar una instancia EC2 en la Región us-east-1 cuando la IP de origen del usuario es 10.100.100.254.",
          "Los usuarios no pueden terminar una instancia EC2 en la Región us-east-1 cuando la IP de origen del usuario es 10.100.100.254."
        ],
        correctas: [2],
        explicacion: "El primer statement permite ec2:TerminateInstances solo si la IP de origen de la petición está dentro de 10.100.100.0/24, y 10.100.100.254 lo está. El segundo deniega cualquier acción de EC2 fuera de us-east-1. Combinados, solo se pueden terminar instancias en us-east-1 desde ese rango. Ojo: aws:SourceIp se refiere a la IP de quien hace la llamada, no a la de la instancia, lo que descarta la opción B."
      },
      {
        pregunta: "Una empresa tiene un gran despliegue de Microsoft SharePoint on-premises que requiere almacenamiento de archivos compartidos de Microsoft Windows. La empresa quiere migrar esta carga de trabajo a la nube de AWS y está valorando distintas opciones de almacenamiento. La solución debe tener alta disponibilidad e integrarse con Active Directory para el control de acceso. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Configurar almacenamiento de Amazon EFS y establecer el dominio de Active Directory para la autenticación.",
          "Crear un recurso compartido SMB en un file gateway de AWS Storage Gateway en dos zonas de disponibilidad.",
          "Crear un bucket de Amazon S3 y configurar Microsoft Windows Server para montarlo como un volumen.",
          "Crear un sistema de archivos Amazon FSx for Windows File Server en AWS y establecer el dominio de Active Directory para la autenticación."
        ],
        correctas: [3],
        explicacion: "FSx for Windows File Server ofrece recursos compartidos SMB nativos con integración directa con Active Directory y alta disponibilidad Multi-AZ, justo lo que SharePoint necesita. EFS no soporta SMB ni Active Directory, y S3 no es un sistema de archivos."
      },
      {
        pregunta: "Una empresa de procesamiento de imágenes tiene una aplicación web que los usuarios usan para subir imágenes a un bucket de Amazon S3. La empresa ha configurado notificaciones de eventos de S3 para publicar los eventos de creación de objetos en una cola estándar de Amazon Simple Queue Service (Amazon SQS). La cola sirve como fuente de eventos para una función de AWS Lambda que procesa las imágenes y envía los resultados a los usuarios por correo. Los usuarios informan de que reciben varios correos por cada imagen subida y un arquitecto determina que los mensajes de SQS están invocando la función Lambda más de una vez. ¿Qué debe hacer para resolver el problema con el MENOR trabajo operativo?",
        opciones: [
          "Configurar long polling en la cola de SQS aumentando el tiempo de espera de ReceiveMessage a 30 segundos.",
          "Cambiar la cola estándar de SQS por una cola FIFO. Usar el ID de deduplicación de mensajes para descartar los duplicados.",
          "Aumentar el visibility timeout de la cola de SQS a un valor mayor que la suma del timeout de la función y el timeout de la ventana de lotes (batch window).",
          "Modificar la función Lambda para que elimine cada mensaje de la cola de SQS inmediatamente después de leerlo, antes de procesarlo."
        ],
        correctas: [2],
        explicacion: "Si el visibility timeout es menor que lo que tarda Lambda en procesar, el mensaje reaparece en la cola y la función se invoca otra vez. AWS recomienda fijarlo por encima del timeout de la función más la ventana de lotes; es solo un cambio de configuración. Borrar el mensaje antes de procesarlo (D) haría perder imágenes si el procesamiento falla."
      },
      {
        pregunta: "Una empresa está implementando una solución de almacenamiento compartido para una aplicación de juegos alojada en un centro de datos on-premises. La empresa necesita poder usar clientes Lustre para acceder a los datos. La solución debe ser totalmente gestionada. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Crear un file gateway de AWS Storage Gateway. Crear un recurso compartido que use el protocolo de cliente requerido. Conectar el servidor de aplicación al recurso compartido.",
          "Crear una instancia Windows de Amazon EC2. Instalar y configurar el rol de recurso compartido de archivos de Windows en la instancia. Conectar el servidor de aplicación al recurso compartido.",
          "Crear un sistema de archivos de Amazon Elastic File System (Amazon EFS) y configurarlo para que soporte Lustre. Adjuntarlo al servidor de origen. Conectar el servidor de aplicación al sistema de archivos.",
          "Crear un sistema de archivos Amazon FSx for Lustre. Adjuntarlo al servidor de origen. Conectar el servidor de aplicación al sistema de archivos."
        ],
        correctas: [3],
        explicacion: "Amazon FSx for Lustre es el servicio totalmente gestionado que implementa el sistema de archivos Lustre, así que los clientes Lustre existentes funcionan sin cambios. EFS no soporta Lustre y las demás opciones tampoco lo ofrecen."
      },
      {
        pregunta: "La aplicación contenerizada de una empresa se ejecuta en una instancia de Amazon EC2. La aplicación necesita descargar certificados de seguridad antes de poder comunicarse con otras aplicaciones de negocio. La empresa quiere una solución muy segura para cifrar y descifrar los certificados casi en tiempo real, y necesita además guardar los datos en un almacenamiento de alta disponibilidad una vez cifrados. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Crear secretos de AWS Secrets Manager para los certificados cifrados. Actualizar los certificados manualmente cuando sea necesario. Controlar el acceso a los datos con permisos de IAM granulares.",
          "Crear una función de AWS Lambda que use la librería cryptography de Python para recibir y realizar las operaciones de cifrado. Guardar la función en un bucket de Amazon S3.",
          "Crear una clave gestionada por el cliente de AWS Key Management Service (AWS KMS). Permitir que el rol de EC2 use la clave de KMS para las operaciones de cifrado. Guardar los datos cifrados en Amazon S3.",
          "Crear una clave gestionada por el cliente de AWS Key Management Service (AWS KMS). Permitir que el rol de EC2 use la clave de KMS para las operaciones de cifrado. Guardar los datos cifrados en volúmenes de Amazon Elastic Block Store (Amazon EBS)."
        ],
        correctas: [2],
        explicacion: "KMS con una clave gestionada por el cliente cubre el cifrado y descifrado seguros sin infraestructura propia, y S3 ofrece almacenamiento de alta disponibilidad replicado entre varias AZ. Los volúmenes EBS viven en una sola AZ, así que no dan la misma disponibilidad."
      },
      {
        pregunta: "Un arquitecto de soluciones diseña una VPC con subredes públicas y privadas. La VPC y las subredes usan bloques CIDR IPv4. Hay una subred pública y una privada en cada una de tres zonas de disponibilidad (AZ) para alta disponibilidad. Se usa un internet gateway para dar acceso a Internet a las subredes públicas. Las subredes privadas necesitan acceso a Internet para que las instancias de Amazon EC2 puedan descargar actualizaciones de software. ¿Qué debe hacer el arquitecto para habilitar el acceso a Internet de las subredes privadas?",
        opciones: [
          "Crear tres NAT gateways, una por cada subred pública de cada AZ. Crear una tabla de rutas privada por AZ que reenvíe el tráfico ajeno a la VPC a la NAT gateway de su AZ.",
          "Crear tres NAT instances, una por cada subred privada de cada AZ. Crear una tabla de rutas privada por AZ que reenvíe el tráfico ajeno a la VPC a la NAT instance de su AZ.",
          "Crear un segundo internet gateway en una de las subredes privadas. Actualizar la tabla de rutas de las subredes privadas para reenviar el tráfico ajeno a la VPC a ese internet gateway privado.",
          "Crear un egress-only internet gateway en una de las subredes públicas. Actualizar la tabla de rutas de las subredes privadas para reenviar el tráfico ajeno a la VPC al egress-only internet gateway."
        ],
        correctas: [0],
        explicacion: "Las NAT gateways se despliegan en subredes públicas, y poner una por AZ evita que el fallo de una zona deje sin salida a las demás, además de ahorrar cargos de tráfico entre zonas. Los egress-only internet gateways son solo para IPv6, y una VPC admite un único internet gateway."
      },
      {
        pregunta: "Una empresa quiere migrar un centro de datos on-premises a AWS. El centro de datos aloja un servidor SFTP que guarda sus datos en un sistema de archivos basado en NFS. El servidor contiene 200 GB de datos que hay que transferir y debe alojarse en una instancia de Amazon EC2 que use un sistema de archivos de Amazon Elastic File System (Amazon EFS). ¿Qué combinación de pasos debe seguir un arquitecto de soluciones para automatizar esta tarea? (Elige dos.)",
        opciones: [
          "Lanzar la instancia EC2 en la misma zona de disponibilidad que el sistema de archivos de EFS.",
          "Instalar un agente de AWS DataSync en el centro de datos on-premises.",
          "Crear un volumen secundario de Amazon Elastic Block Store (Amazon EBS) en la instancia EC2 para los datos.",
          "Usar manualmente un comando de copia del sistema operativo para enviar los datos a la instancia EC2.",
          "Usar AWS DataSync para crear una configuración de ubicación adecuada para el servidor SFTP on-premises."
        ],
        correctas: [0, 1],
        explicacion: "El agente de DataSync on-premises (B) automatiza la transferencia del NFS hacia EFS, y lanzar la instancia EC2 en la misma AZ que el sistema de archivos (A) evita latencia y cargos entre zonas. Copiar a mano (D) no automatiza nada, y DataSync no dispone de ubicaciones de tipo SFTP (E)."
      }
    ]
  },
  {
    id: "examen-03",
    titulo: "Examen de práctica 3",
    resumen: "50 preguntas tipo test sobre Glue, DDoS, Object Lock, contenedores, migraciones con DMS, alta disponibilidad y compra de instancias, con respuesta correcta y explicación.",
    preguntas: [
      {
        pregunta: "Una empresa tiene un trabajo de extracción, transformación y carga (ETL) de AWS Glue que se ejecuta todos los días a la misma hora. El trabajo procesa datos XML que están en un bucket de Amazon S3, al que se añaden datos nuevos cada día. Un arquitecto de soluciones observa que AWS Glue está procesando todos los datos en cada ejecución. ¿Qué debe hacer para evitar que AWS Glue reprocese los datos antiguos?",
        opciones: [
          "Editar el trabajo para que use job bookmarks.",
          "Editar el trabajo para que elimine los datos después de procesarlos.",
          "Editar el trabajo estableciendo el campo NumberOfWorkers a 1.",
          "Usar una transformación de machine learning FindMatches."
        ],
        correctas: [0],
        explicacion: "Los job bookmarks de AWS Glue guardan el estado de lo ya procesado entre ejecuciones, de modo que cada ejecución solo procesa los datos nuevos. NumberOfWorkers solo cambia la capacidad de cómputo y FindMatches sirve para localizar registros duplicados, no para controlar qué se ha procesado."
      },
      {
        pregunta: "Un arquitecto de soluciones debe diseñar una infraestructura de alta disponibilidad para un sitio web servido por servidores web Windows que se ejecutan en instancias de Amazon EC2. Debe implementar una solución capaz de mitigar un ataque DDoS a gran escala originado desde miles de direcciones IP. El tiempo de inactividad no es aceptable. ¿Qué acciones debe realizar para proteger el sitio de un ataque así? (Elige dos.)",
        opciones: [
          "Usar AWS Shield Advanced para detener el ataque DDoS.",
          "Configurar Amazon GuardDuty para bloquear automáticamente a los atacantes.",
          "Configurar el sitio web para usar Amazon CloudFront tanto para el contenido estático como para el dinámico.",
          "Usar una función de AWS Lambda para añadir automáticamente las IP de los atacantes a las network ACL de la VPC.",
          "Usar instancias EC2 Spot en un Auto Scaling group con una política de escalado por seguimiento de objetivo fijada en el 80 % de uso de CPU."
        ],
        correctas: [0, 2],
        explicacion: "Shield Advanced ofrece protección DDoS gestionada con detección y mitigación automáticas (A), y CloudFront absorbe y filtra el tráfico en las edge locations, repartiendo el ataque por la red global de AWS en lugar de dejarlo llegar a los servidores (C). GuardDuty solo detecta amenazas, no las bloquea, y mantener listas de IP a mano es inviable con miles de orígenes."
      },
      {
        pregunta: "Una empresa se prepara para desplegar una nueva carga de trabajo serverless. Un arquitecto de soluciones debe aplicar el principio de mínimo privilegio para configurar los permisos con los que se ejecutará una función de AWS Lambda. Una regla de Amazon EventBridge invocará la función. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Añadir un rol de ejecución a la función con lambda:InvokeFunction como acción y * como principal.",
          "Añadir un rol de ejecución a la función con lambda:InvokeFunction como acción y Service: lambda.amazonaws.com como principal.",
          "Añadir una política basada en recursos a la función con lambda:* como acción y Service: events.amazonaws.com como principal.",
          "Añadir una política basada en recursos a la función con lambda:InvokeFunction como acción y Service: events.amazonaws.com como principal."
        ],
        correctas: [3],
        explicacion: "Para que EventBridge pueda invocar la función hace falta una política basada en recursos en la propia Lambda que autorice al servicio events.amazonaws.com. El mínimo privilegio exige conceder solo lambda:InvokeFunction y no lambda:* (C). El rol de ejecución define lo que la función puede hacer, no quién puede invocarla."
      },
      {
        pregunta: "Una empresa se prepara para guardar datos confidenciales en Amazon S3. Por motivos de cumplimiento, los datos deben cifrarse en reposo, el uso de las claves de cifrado debe registrarse para auditoría y las claves deben rotarse cada año. ¿Qué solución cumple estos requisitos y es la MÁS eficiente operativamente?",
        opciones: [
          "Cifrado del lado del servidor con claves proporcionadas por el cliente (SSE-C).",
          "Cifrado del lado del servidor con claves gestionadas por Amazon S3 (SSE-S3).",
          "Cifrado del lado del servidor con claves de AWS KMS (SSE-KMS) con rotación manual.",
          "Cifrado del lado del servidor con claves de AWS KMS (SSE-KMS) con rotación automática."
        ],
        correctas: [3],
        explicacion: "Solo KMS registra en CloudTrail cada uso de la clave, cumpliendo el requisito de auditoría, y su rotación automática anual no requiere ninguna intervención. SSE-S3 no permite auditar el uso de las claves y SSE-C obliga a gestionarlas por cuenta propia."
      },
      {
        pregunta: "Una empresa de bicicletas compartidas está desarrollando una arquitectura multicapa para rastrear la ubicación de sus bicicletas durante las horas punta de operación. La empresa quiere usar estos puntos de datos en su plataforma de analítica existente. Un arquitecto de soluciones debe determinar la opción multicapa más viable para soportar esta arquitectura. Los puntos de datos deben ser accesibles desde la API REST. ¿Qué acción cumple estos requisitos para almacenar y recuperar los datos de ubicación?",
        opciones: [
          "Usar Amazon Athena con Amazon S3.",
          "Usar Amazon API Gateway con AWS Lambda.",
          "Usar Amazon QuickSight con Amazon Redshift.",
          "Usar Amazon API Gateway con Amazon Kinesis Data Analytics."
        ],
        correctas: [3],
        explicacion: "API Gateway expone la API REST desde la que llegan y se consultan los puntos de ubicación, y Kinesis Data Analytics procesa ese flujo en tiempo real y lo entrega a la plataforma de analítica ya existente. Athena y QuickSight sirven para consulta y visualización por lotes, no para datos de ubicación en streaming."
      },
      {
        pregunta: "Una empresa tiene un sitio web de venta de automóviles que guarda sus anuncios en una base de datos de Amazon RDS. Cuando se vende un automóvil, el anuncio debe eliminarse del sitio y los datos deben enviarse a múltiples sistemas de destino. ¿Qué diseño debe recomendar un arquitecto de soluciones?",
        opciones: [
          "Crear una función de AWS Lambda que se dispare cuando se actualice la base de datos de Amazon RDS para enviar la información a una cola de Amazon Simple Queue Service (Amazon SQS) que los destinos consumirán.",
          "Crear una función de AWS Lambda que se dispare cuando se actualice la base de datos de Amazon RDS para enviar la información a una cola FIFO de Amazon Simple Queue Service (Amazon SQS) que los destinos consumirán.",
          "Suscribirse a una notificación de eventos de RDS y enviar una cola de Amazon Simple Queue Service (Amazon SQS) repartida (fan-out) a múltiples topics de Amazon Simple Notification Service (Amazon SNS). Usar funciones de AWS Lambda para actualizar los destinos.",
          "Suscribirse a una notificación de eventos de RDS y enviar un topic de Amazon Simple Notification Service (Amazon SNS) repartido (fan-out) a múltiples colas de Amazon Simple Queue Service (Amazon SQS). Usar funciones de AWS Lambda para actualizar los destinos."
        ],
        correctas: [0],
        explicacion: "Las notificaciones de eventos de RDS informan de sucesos de la instancia (failover, backups, paradas), no de cambios en los datos, así que las opciones C y D parten de una premisa falsa. Detectar la venta al actualizarse la base de datos e invocar una Lambda que publique el mensaje en SQS es lo que encaja; la cola FIFO (B) añadiría una restricción de orden que aquí no se pide."
      },
      {
        pregunta: "Una empresa necesita guardar datos en Amazon S3 y debe impedir que se modifiquen. Quiere que los objetos nuevos que se suban permanezcan inalterables durante un periodo de tiempo no determinado, hasta que la empresa decida modificarlos. Solo usuarios concretos de la cuenta de AWS deben poder eliminar los objetos. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Crear un vault de S3 Glacier. Aplicar una política de vault lock de tipo WORM (escribir una vez, leer muchas) a los objetos.",
          "Crear un bucket de S3 con S3 Object Lock activado. Activar el versionado. Establecer un periodo de retención de 100 años. Usar el modo governance como modo de retención por defecto del bucket para los objetos nuevos.",
          "Crear un bucket de S3. Usar AWS CloudTrail para rastrear los eventos de la API de S3 que modifiquen los objetos. Cuando llegue la notificación, restaurar los objetos modificados desde alguna copia de seguridad.",
          "Crear un bucket de S3 con S3 Object Lock activado. Activar el versionado. Añadir un legal hold a los objetos. Añadir el permiso s3:PutObjectLegalHold a las políticas de IAM de los usuarios que necesiten eliminar los objetos."
        ],
        correctas: [3],
        explicacion: "Un legal hold de S3 Object Lock protege el objeto de forma indefinida, sin fecha de caducidad, hasta que alguien con el permiso s3:PutObjectLegalHold lo retira: exactamente el periodo \"no determinado\" que se pide, junto con el control de quién puede eliminar. Un periodo de retención fijo (B) obligaría a decidir la duración de antemano."
      },
      {
        pregunta: "Una empresa de redes sociales permite a los usuarios subir imágenes a su sitio web, que se ejecuta en instancias de Amazon EC2. Durante las peticiones de subida, el sitio redimensiona las imágenes a un tamaño estándar y guarda las redimensionadas en Amazon S3. Los usuarios experimentan subidas lentas. La empresa necesita reducir el acoplamiento dentro de la aplicación y mejorar el rendimiento del sitio, y un arquitecto debe diseñar el proceso de subida más eficiente operativamente. ¿Qué combinación de acciones debe realizar? (Elige dos.)",
        opciones: [
          "Configurar la aplicación para subir las imágenes a S3 Glacier.",
          "Configurar el servidor web para subir las imágenes originales a Amazon S3.",
          "Configurar la aplicación para subir las imágenes directamente desde el navegador de cada usuario a Amazon S3 mediante una URL prefirmada.",
          "Configurar notificaciones de eventos de S3 para invocar una función de AWS Lambda cuando se suba una imagen. Usar la función para redimensionar la imagen.",
          "Crear una regla de Amazon EventBridge que invoque una función de AWS Lambda de forma programada para redimensionar las imágenes subidas."
        ],
        correctas: [1, 3],
        explicacion: "Subir el original directamente a S3 (B) quita al servidor web el trabajo de redimensionar durante la petición, y hacerlo después con una Lambda disparada por la notificación de evento de S3 (D) desacopla el proceso y lo ejecuta sin servidores. Redimensionar de forma programada (E) no sería inmediato y Glacier no sirve para contenido activo."
      },
      {
        pregunta: "Una empresa ha migrado recientemente a AWS un sistema de procesamiento de mensajes. El sistema recibe mensajes en una cola ActiveMQ que se ejecuta en una instancia de Amazon EC2. Los mensajes los procesa una aplicación consumidora en Amazon EC2, que escribe los resultados en una base de datos MySQL en otra instancia EC2. La empresa quiere que la aplicación tenga alta disponibilidad con poca complejidad operativa. ¿Qué arquitectura ofrece la MAYOR disponibilidad?",
        opciones: [
          "Añadir un segundo servidor ActiveMQ en otra zona de disponibilidad. Añadir una instancia EC2 consumidora adicional en otra zona de disponibilidad. Replicar la base de datos MySQL en otra zona de disponibilidad.",
          "Usar Amazon MQ con brokers activo/standby configurados en dos zonas de disponibilidad. Añadir una instancia EC2 consumidora adicional en otra zona de disponibilidad. Replicar la base de datos MySQL en otra zona de disponibilidad.",
          "Usar Amazon MQ con brokers activo/standby configurados en dos zonas de disponibilidad. Añadir una instancia EC2 consumidora adicional en otra zona de disponibilidad. Usar Amazon RDS for MySQL con Multi-AZ activado.",
          "Usar Amazon MQ con brokers activo/standby configurados en dos zonas de disponibilidad. Añadir un Auto Scaling group para las instancias EC2 consumidoras en dos zonas de disponibilidad. Usar Amazon RDS for MySQL con Multi-AZ activado."
        ],
        correctas: [3],
        explicacion: "La opción D es la única que hace redundantes las tres capas con servicios gestionados: Amazon MQ activo/standby para la cola, un Auto Scaling group multi-AZ que reemplaza automáticamente los consumidores que fallen, y RDS Multi-AZ con failover automático. Añadir una instancia consumidora suelta (C) no la reemplaza si cae."
      },
      {
        pregunta: "Una empresa aloja una aplicación web contenerizada en un conjunto de servidores on-premises que procesan las peticiones entrantes. El número de peticiones crece rápidamente y los servidores on-premises no pueden gestionarlo. La empresa quiere mover la aplicación a AWS con los mínimos cambios de código y el mínimo esfuerzo de desarrollo. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Usar AWS Fargate en Amazon Elastic Container Service (Amazon ECS) para ejecutar la aplicación web contenerizada con Service Auto Scaling. Usar un Application Load Balancer para distribuir las peticiones entrantes.",
          "Usar dos instancias de Amazon EC2 para alojar la aplicación web contenerizada. Usar un Application Load Balancer para distribuir las peticiones entrantes.",
          "Usar AWS Lambda con código nuevo escrito en uno de los lenguajes soportados. Crear varias funciones Lambda para soportar la carga. Usar Amazon API Gateway como punto de entrada a las funciones.",
          "Usar una solución de computación de alto rendimiento (HPC) como AWS ParallelCluster para establecer un clúster HPC que procese las peticiones entrantes a la escala adecuada."
        ],
        correctas: [0],
        explicacion: "La aplicación ya está contenerizada, así que ECS sobre Fargate la ejecuta tal cual, sin cambios de código ni servidores que gestionar, y Service Auto Scaling absorbe el crecimiento. Reescribir para Lambda (C) es justo lo contrario de \"mínimos cambios de código\", y dos instancias EC2 fijas (B) no escalan."
      },
      {
        pregunta: "Una empresa usa 50 TB de datos para generar informes y quiere moverlos de on-premises a AWS. Una aplicación propia en su centro de datos ejecuta un trabajo semanal de transformación de datos. La empresa va a pausar la aplicación hasta que la transferencia termine y necesita empezar el proceso cuanto antes. El centro de datos no tiene ancho de banda de red disponible para cargas adicionales. Un arquitecto debe transferir los datos y configurar el trabajo de transformación para que siga ejecutándose en la nube de AWS. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Usar AWS DataSync para mover los datos. Crear un trabajo de transformación personalizado con AWS Glue.",
          "Pedir un dispositivo AWS Snowcone para mover los datos. Desplegar la aplicación de transformación en el dispositivo.",
          "Pedir un dispositivo AWS Snowball Edge Storage Optimized. Copiar los datos al dispositivo. Crear un trabajo de transformación personalizado con AWS Glue.",
          "Pedir un dispositivo AWS Snowball Edge Storage Optimized que incluya cómputo de Amazon EC2. Copiar los datos al dispositivo. Crear una nueva instancia EC2 en AWS para ejecutar la aplicación de transformación."
        ],
        correctas: [2],
        explicacion: "Sin ancho de banda disponible, DataSync (A) queda descartado y hay que enviar los datos físicamente: Snowball Edge Storage Optimized cubre los 50 TB, mientras que Snowcone solo llega a unos pocos terabytes. Para la transformación, AWS Glue es un servicio gestionado y supone menos trabajo operativo que mantener una instancia EC2 propia (D)."
      },
      {
        pregunta: "Una empresa ha creado una aplicación de análisis de imágenes en la que los usuarios suben fotos y añaden marcos a sus imágenes, subiendo también los metadatos que indican qué marcos quieren. La aplicación usa una única instancia de Amazon EC2 y Amazon DynamoDB para guardar los metadatos. La aplicación se está haciendo popular y el número de usuarios crece; la empresa espera que el número de usuarios concurrentes varíe mucho según la hora y el día de la semana. La empresa debe asegurar que la aplicación escale para atender a esa base de usuarios creciente. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar AWS Lambda para procesar las fotos. Guardar las fotos y los metadatos en DynamoDB.",
          "Usar Amazon Kinesis Data Firehose para procesar las fotos y para guardar las fotos y los metadatos.",
          "Usar AWS Lambda para procesar las fotos. Guardar las fotos en Amazon S3. Mantener DynamoDB para guardar los metadatos.",
          "Aumentar el número de instancias EC2 a tres. Usar volúmenes de Amazon Elastic Block Store (Amazon EBS) Provisioned IOPS SSD (io2) para guardar las fotos y los metadatos."
        ],
        correctas: [2],
        explicacion: "Lambda escala automáticamente con la concurrencia variable y S3 es el almacén adecuado para las fotos, dejando DynamoDB para los metadatos. Guardar las fotos en DynamoDB (A) choca con el límite de 400 KB por elemento, y tres instancias EC2 fijas (D) no absorben una demanda tan variable."
      },
      {
        pregunta: "Una empresa de historiales médicos aloja una aplicación en instancias de Amazon EC2 que procesa archivos de datos de clientes guardados en Amazon S3. Las instancias están en subredes públicas y acceden a Amazon S3 por Internet, pero no necesitan ningún otro acceso de red. Un nuevo requisito obliga a que el tráfico de las transferencias de archivos siga una ruta privada y no vaya por Internet. ¿Qué cambio en la arquitectura de red debe recomendar un arquitecto de soluciones?",
        opciones: [
          "Crear una NAT gateway. Configurar la tabla de rutas de las subredes públicas para enviar el tráfico a Amazon S3 a través de la NAT gateway.",
          "Configurar el grupo de seguridad de las instancias EC2 para restringir el tráfico de salida de forma que solo se permita el tráfico hacia la prefix list de S3.",
          "Mover las instancias EC2 a subredes privadas. Crear un VPC endpoint para Amazon S3 y enlazarlo a la tabla de rutas de las subredes privadas.",
          "Eliminar el internet gateway de la VPC. Configurar una conexión AWS Direct Connect y enrutar el tráfico a Amazon S3 por esa conexión."
        ],
        correctas: [2],
        explicacion: "El VPC endpoint de S3 enruta el tráfico por la red privada de AWS, y mover las instancias a subredes privadas garantiza que no puedan salir a Internet. Una NAT gateway (A) sigue enviando el tráfico por Internet, y un grupo de seguridad (B) filtra destinos pero no cambia la ruta que sigue el tráfico."
      },
      {
        pregunta: "Una empresa usa un popular gestor de contenidos (CMS) para su sitio web corporativo, pero el parcheado y el mantenimiento que requiere son una carga. La empresa está rediseñando su sitio y quiere una solución nueva. El sitio se actualizará cuatro veces al año y no necesita contenido dinámico. La solución debe ofrecer alta escalabilidad y mayor seguridad. ¿Qué combinación de cambios cumple estos requisitos con el MENOR trabajo operativo? (Elige dos.)",
        opciones: [
          "Configurar Amazon CloudFront delante del sitio web para usar la funcionalidad HTTPS.",
          "Desplegar una web ACL de AWS WAF delante del sitio web para proporcionar la funcionalidad HTTPS.",
          "Crear y desplegar una función de AWS Lambda para gestionar y servir el contenido del sitio web.",
          "Crear el nuevo sitio web y un bucket de Amazon S3. Desplegar el sitio en el bucket con el alojamiento de sitios estáticos activado.",
          "Crear el nuevo sitio web. Desplegarlo usando un Auto Scaling group de instancias de Amazon EC2 detrás de un Application Load Balancer."
        ],
        correctas: [0, 3],
        explicacion: "El sitio es estático, así que alojarlo en S3 (D) elimina servidores y parcheo, y CloudFront delante (A) aporta HTTPS, caché global y escalabilidad. AWS WAF filtra peticiones pero no proporciona HTTPS (B), y EC2 o Lambda mantendrían la carga operativa que se quiere evitar."
      },
      {
        pregunta: "Una empresa guarda los logs de su aplicación en un grupo de logs de Amazon CloudWatch Logs. Una nueva política obliga a guardar todos los logs de aplicación en Amazon OpenSearch Service casi en tiempo real. ¿Qué solución cumple este requisito con el MENOR trabajo operativo?",
        opciones: [
          "Configurar una suscripción de CloudWatch Logs para enviar los logs en streaming a Amazon OpenSearch Service.",
          "Crear una función de AWS Lambda. Usar el grupo de logs para invocar la función y que escriba los logs en Amazon OpenSearch Service.",
          "Crear un delivery stream de Amazon Kinesis Data Firehose. Configurar el grupo de logs como fuente del delivery stream. Configurar Amazon OpenSearch Service como destino del delivery stream.",
          "Instalar y configurar el Amazon Kinesis Agent en cada servidor de aplicación para entregar los logs a Amazon Kinesis Data Streams. Configurar Kinesis Data Streams para entregar los logs a Amazon OpenSearch Service."
        ],
        correctas: [2],
        explicacion: "Firehose es un servicio totalmente gestionado que toma el grupo de logs como fuente y entrega a OpenSearch casi en tiempo real, sin código ni agentes que mantener. Escribir una Lambda propia (B) o instalar agentes en cada servidor (D) añaden trabajo operativo."
      },
      {
        pregunta: "Una empresa está construyendo una aplicación web que se ejecuta en instancias de Amazon EC2 en varias zonas de disponibilidad. La aplicación dará acceso a un repositorio de documentos de texto de unos 900 TB en total. La empresa prevé que la aplicación tendrá periodos de alta demanda. Un arquitecto debe asegurar que el componente de almacenamiento escale para atender la demanda en todo momento, y a la empresa le preocupa el coste total. ¿Qué solución de almacenamiento cumple estos requisitos de la forma MÁS rentable?",
        opciones: [
          "Amazon Elastic Block Store (Amazon EBS).",
          "Amazon Elastic File System (Amazon EFS).",
          "Amazon OpenSearch Service.",
          "Amazon S3."
        ],
        correctas: [3],
        explicacion: "S3 es almacenamiento de objetos prácticamente ilimitado, accesible a la vez desde todas las zonas de disponibilidad y con diferencia el más barato para 900 TB de documentos. EBS no se comparte entre instancias y EFS, aunque escala, cuesta bastante más por GB que S3."
      },
      {
        pregunta: "Una empresa global usa Amazon API Gateway para diseñar APIs REST para los usuarios de su club de fidelización en las Regiones us-east-1 y ap-southeast-2. Un arquitecto de soluciones debe diseñar una solución para proteger estas APIs REST gestionadas por API Gateway, repartidas en varias cuentas, frente a ataques de inyección SQL y cross-site scripting. ¿Qué solución cumple estos requisitos con el MENOR esfuerzo administrativo?",
        opciones: [
          "Configurar AWS WAF en ambas Regiones. Asociar web ACL regionales a un stage de la API.",
          "Configurar AWS Firewall Manager en ambas Regiones. Configurar de forma centralizada las reglas de AWS WAF.",
          "Configurar AWS Shield en ambas Regiones. Asociar web ACL regionales a un stage de la API.",
          "Configurar AWS Shield en una de las Regiones. Asociar web ACL regionales a un stage de la API."
        ],
        correctas: [1],
        explicacion: "AWS WAF es lo que bloquea la inyección SQL y el cross-site scripting (Shield protege frente a DDoS), pero al estar las APIs repartidas en varias cuentas, Firewall Manager permite definir las reglas una sola vez y aplicarlas de forma centralizada a todas: ese es el menor esfuerzo administrativo. Nota: el fichero de soluciones del dump marca A, que obligaría a configurar WAF cuenta por cuenta."
      },
      {
        pregunta: "Una empresa ha implementado una solución DNS autogestionada en tres instancias de Amazon EC2 detrás de un Network Load Balancer (NLB) en la Región us-west-2. La mayoría de sus usuarios están en Estados Unidos y Europa. La empresa quiere mejorar el rendimiento y la disponibilidad de la solución, y lanza y configura tres instancias EC2 en la Región eu-west-1, añadiéndolas como destinos de un nuevo NLB. ¿Qué solución puede usar la empresa para enrutar el tráfico a todas las instancias EC2?",
        opciones: [
          "Crear una política de enrutamiento por geolocalización de Amazon Route 53 para dirigir las peticiones a uno de los dos NLB. Crear una distribución de Amazon CloudFront y usar el registro de Route 53 como origen de la distribución.",
          "Crear un acelerador estándar en AWS Global Accelerator. Crear grupos de endpoints en us-west-2 y eu-west-1. Añadir los dos NLB como endpoints de los grupos.",
          "Adjuntar direcciones IP elásticas a las seis instancias EC2. Crear una política de enrutamiento por geolocalización de Amazon Route 53 para dirigir las peticiones a una de las seis instancias. Crear una distribución de Amazon CloudFront y usar el registro de Route 53 como origen.",
          "Sustituir los dos NLB por dos Application Load Balancers (ALB). Crear una política de enrutamiento por latencia de Amazon Route 53 para dirigir las peticiones a uno de los dos ALB. Crear una distribución de Amazon CloudFront y usar el registro de Route 53 como origen."
        ],
        correctas: [1],
        explicacion: "El DNS viaja sobre UDP en el puerto 53 y CloudFront solo sirve HTTP/HTTPS, así que todas las opciones que ponen CloudFront delante son inviables. Global Accelerator trabaja en capa 4 (TCP y UDP), enruta por la red de AWS al endpoint sano más cercano y aporta IP estáticas. Nota: el fichero de soluciones del dump marca A, que no funcionaría para tráfico DNS."
      },
      {
        pregunta: "Una empresa ejecuta una carga de trabajo de procesamiento de transacciones en línea (OLTP) en AWS que usa una instancia de base de datos de Amazon RDS sin cifrar en un despliegue Multi-AZ. Cada día se toman snapshots de la base de datos. ¿Qué debe hacer un arquitecto de soluciones para asegurar que la base de datos y las snapshots estén siempre cifradas de ahora en adelante?",
        opciones: [
          "Cifrar una copia de la última snapshot de la base de datos. Sustituir la instancia existente restaurando la snapshot cifrada.",
          "Crear un nuevo volumen de Amazon Elastic Block Store (Amazon EBS) cifrado y copiar las snapshots en él. Activar el cifrado en la instancia de base de datos.",
          "Copiar las snapshots y activar el cifrado con AWS Key Management Service (AWS KMS). Restaurar la snapshot cifrada en la instancia existente.",
          "Copiar las snapshots a un bucket de Amazon S3 cifrado con cifrado del lado del servidor con claves de AWS KMS (SSE-KMS)."
        ],
        correctas: [0],
        explicacion: "No se puede activar el cifrado sobre una instancia de RDS ya creada: hay que copiar una snapshot cifrándola durante la copia y restaurarla en una instancia nueva que sustituya a la anterior. Tampoco es posible restaurar una snapshot sobre una instancia existente (C)."
      },
      {
        pregunta: "Una empresa quiere construir una infraestructura escalable de gestión de claves para dar soporte a los desarrolladores que necesitan cifrar datos en sus aplicaciones. ¿Qué debe hacer un arquitecto de soluciones para reducir la carga operativa?",
        opciones: [
          "Usar autenticación multifactor (MFA) para proteger las claves de cifrado.",
          "Usar AWS Key Management Service (AWS KMS) para proteger las claves de cifrado.",
          "Usar AWS Certificate Manager (ACM) para crear, guardar y asignar las claves de cifrado.",
          "Usar una política de IAM para limitar el alcance de los usuarios con permisos de acceso para proteger las claves de cifrado."
        ],
        correctas: [1],
        explicacion: "KMS es el servicio gestionado de AWS para crear, almacenar, rotar y controlar el uso de claves de cifrado, y se integra con el resto de servicios, evitando construir y mantener esa infraestructura. ACM gestiona certificados TLS, no claves de cifrado de datos."
      },
      {
        pregunta: "Una empresa tiene una aplicación web dinámica alojada en dos instancias de Amazon EC2. La empresa tiene su propio certificado SSL, instalado en cada instancia para realizar la terminación SSL. El tráfico ha aumentado recientemente y el equipo de operaciones ha determinado que el cifrado y descifrado SSL está llevando la capacidad de cómputo de los servidores web a su límite. ¿Qué debe hacer un arquitecto de soluciones para aumentar el rendimiento de la aplicación?",
        opciones: [
          "Crear un nuevo certificado SSL con AWS Certificate Manager (ACM). Instalar el certificado de ACM en cada instancia.",
          "Crear un bucket de Amazon S3. Migrar el certificado SSL al bucket. Configurar las instancias EC2 para que referencien el bucket para la terminación SSL.",
          "Crear otra instancia EC2 como servidor proxy. Migrar el certificado SSL a la nueva instancia y configurarla para dirigir las conexiones a las instancias EC2 existentes.",
          "Importar el certificado SSL en AWS Certificate Manager (ACM). Crear un Application Load Balancer con un listener HTTPS que use el certificado SSL de ACM."
        ],
        correctas: [3],
        explicacion: "Trasladar la terminación SSL a un Application Load Balancer descarga el trabajo de cifrado y descifrado de las instancias EC2 y libera su CPU. Como el certificado es propio de la empresa, se importa en ACM en lugar de emitir uno nuevo. Un proxy en EC2 (C) solo movería el cuello de botella a otra instancia."
      },
      {
        pregunta: "Una empresa tiene un trabajo de procesamiento por lotes muy dinámico que usa muchas instancias de Amazon EC2 para completarse. El trabajo no tiene estado, puede iniciarse y detenerse en cualquier momento sin impacto negativo y normalmente tarda más de 60 minutos en completarse. La empresa ha pedido a un arquitecto de soluciones que diseñe una solución escalable y rentable que cumpla los requisitos del trabajo. ¿Qué debe recomendar?",
        opciones: [
          "Implementar instancias EC2 Spot.",
          "Comprar instancias EC2 Reserved.",
          "Implementar instancias EC2 On-Demand.",
          "Implementar el procesamiento en AWS Lambda."
        ],
        correctas: [0],
        explicacion: "El trabajo no tiene estado y puede interrumpirse sin consecuencias, que es exactamente el perfil de las instancias Spot y sus descuentos de hasta el 90 %. Lambda (D) no vale porque su tiempo máximo de ejecución es de 15 minutos y el trabajo supera los 60."
      },
      {
        pregunta: "Una empresa ejecuta su sitio de comercio electrónico de dos capas en AWS. La capa web consta de un balanceador de carga que envía tráfico a instancias de Amazon EC2. La capa de base de datos usa una instancia de Amazon RDS. Las instancias EC2 y la instancia de RDS no deben quedar expuestas a Internet público. Las instancias EC2 necesitan acceso a Internet para completar el procesamiento de pagos de los pedidos a través de un servicio web de terceros. La aplicación debe tener alta disponibilidad. ¿Qué combinación de opciones de configuración cumple estos requisitos? (Elige dos.)",
        opciones: [
          "Usar un Auto Scaling group para lanzar las instancias EC2 en subredes privadas. Desplegar una instancia de RDS Multi-AZ en subredes privadas.",
          "Configurar una VPC con dos subredes privadas y dos NAT gateways en dos zonas de disponibilidad. Desplegar un Application Load Balancer en las subredes privadas.",
          "Usar un Auto Scaling group para lanzar las instancias EC2 en subredes públicas en dos zonas de disponibilidad. Desplegar una instancia de RDS Multi-AZ en subredes privadas.",
          "Configurar una VPC con una subred pública, una subred privada y dos NAT gateways en dos zonas de disponibilidad. Desplegar un Application Load Balancer en la subred pública.",
          "Configurar una VPC con dos subredes públicas, dos subredes privadas y dos NAT gateways en dos zonas de disponibilidad. Desplegar un Application Load Balancer en las subredes públicas."
        ],
        correctas: [0, 4],
        explicacion: "Las instancias EC2 y RDS van en subredes privadas para no quedar expuestas, con RDS Multi-AZ para la alta disponibilidad (A). El Application Load Balancer necesita subredes públicas en dos zonas para recibir el tráfico de los clientes, y las NAT gateways (una por zona) dan a las instancias la salida a Internet hacia el servicio de pagos (E). Una sola subred pública (D) rompería la alta disponibilidad."
      },
      {
        pregunta: "Un arquitecto de soluciones necesita implementar una solución para reducir los costes de almacenamiento de una empresa. Todos los datos de la empresa están en la clase S3 Standard. La empresa debe conservar todos los datos durante al menos 25 años. Los datos de los 2 últimos años deben tener alta disponibilidad y poder recuperarse de forma inmediata. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Configurar una política de ciclo de vida de S3 para transicionar los objetos a S3 Glacier Deep Archive de forma inmediata.",
          "Configurar una política de ciclo de vida de S3 para transicionar los objetos a S3 Glacier Deep Archive después de 2 años.",
          "Usar S3 Intelligent-Tiering. Activar la opción de archivado para asegurar que los datos se archiven en S3 Glacier Deep Archive.",
          "Configurar una política de ciclo de vida de S3 para transicionar los objetos a S3 One Zone-Infrequent Access (S3 One Zone-IA) de forma inmediata y a S3 Glacier Deep Archive después de 2 años."
        ],
        correctas: [1],
        explicacion: "Los datos de los 2 primeros años deben ser recuperables al instante y con alta disponibilidad, así que permanecen en S3 Standard; a partir de ahí, Glacier Deep Archive es la clase más barata para los 23 años restantes. One Zone-IA (D) guarda los datos en una sola zona y no ofrece alta disponibilidad."
      },
      {
        pregunta: "Una empresa de medios está evaluando mover sus sistemas a la nube de AWS. Necesita al menos 10 TB de almacenamiento con el máximo rendimiento de E/S posible para procesamiento de vídeo, 300 TB de almacenamiento muy duradero para guardar el contenido multimedia y 900 TB de almacenamiento para material de archivo que ya no se usa. ¿Qué conjunto de servicios debe recomendar un arquitecto de soluciones?",
        opciones: [
          "Amazon EBS para el máximo rendimiento, Amazon S3 para el almacenamiento duradero y Amazon S3 Glacier para el archivo.",
          "Amazon EBS para el máximo rendimiento, Amazon EFS para el almacenamiento duradero y Amazon S3 Glacier para el archivo.",
          "Instance store de Amazon EC2 para el máximo rendimiento, Amazon EFS para el almacenamiento duradero y Amazon S3 para el archivo.",
          "Instance store de Amazon EC2 para el máximo rendimiento, Amazon S3 para el almacenamiento duradero y Amazon S3 Glacier para el archivo."
        ],
        correctas: [0],
        explicacion: "EBS con Provisioned IOPS ofrece alto rendimiento de E/S de forma persistente para el procesamiento de vídeo, S3 aporta la durabilidad de 11 nueves para el contenido y Glacier es lo más barato para el archivo. El instance store (C y D) es efímero y perdería los datos al parar la instancia."
      },
      {
        pregunta: "Una empresa quiere ejecutar aplicaciones en contenedores en la nube de AWS. Estas aplicaciones no tienen estado y toleran interrupciones en la infraestructura subyacente. La empresa necesita una solución que minimice el coste y el trabajo operativo. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Usar instancias Spot en un Auto Scaling group de Amazon EC2 para ejecutar los contenedores de la aplicación.",
          "Usar instancias Spot en un managed node group de Amazon Elastic Kubernetes Service (Amazon EKS).",
          "Usar instancias On-Demand en un Auto Scaling group de Amazon EC2 para ejecutar los contenedores de la aplicación.",
          "Usar instancias On-Demand en un managed node group de Amazon Elastic Kubernetes Service (Amazon EKS)."
        ],
        correctas: [1],
        explicacion: "Las instancias Spot minimizan el coste y encajan porque las aplicaciones no tienen estado y toleran interrupciones. Entre las dos opciones con Spot, el managed node group de EKS orquesta los contenedores y gestiona el ciclo de vida de los nodos, mientras que un Auto Scaling group de EC2 dejaría esa orquestación en manos de la empresa. Nota: el fichero de soluciones del dump lista aquí A y B a la vez, pese a ser una pregunta de respuesta única."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación web multicapa on-premises. La aplicación está contenerizada y se ejecuta en varios hosts Linux conectados a una base de datos PostgreSQL que contiene registros de usuarios. La carga operativa de mantener la infraestructura y planificar la capacidad está limitando el crecimiento de la empresa. Un arquitecto de soluciones debe mejorar la infraestructura de la aplicación. ¿Qué combinación de acciones debe realizar? (Elige dos.)",
        opciones: [
          "Migrar la base de datos PostgreSQL a Amazon Aurora.",
          "Migrar la aplicación web para alojarla en instancias de Amazon EC2.",
          "Configurar una distribución de Amazon CloudFront para el contenido de la aplicación web.",
          "Configurar Amazon ElastiCache entre la aplicación web y la base de datos PostgreSQL.",
          "Migrar la aplicación web para alojarla en AWS Fargate con Amazon Elastic Container Service (Amazon ECS)."
        ],
        correctas: [0, 4],
        explicacion: "Aurora (A) elimina la gestión de la base de datos y escala el almacenamiento por sí solo, y Fargate con ECS (E) ejecuta los contenedores existentes sin aprovisionar servidores ni planificar capacidad. Migrar a instancias EC2 (B) mantendría exactamente la carga operativa que se quiere eliminar."
      },
      {
        pregunta: "Una aplicación se ejecuta en instancias de Amazon EC2 repartidas en varias zonas de disponibilidad. Las instancias están en un Auto Scaling group detrás de un Application Load Balancer. La aplicación rinde mejor cuando el uso de CPU de las instancias está en torno al 40 %. ¿Qué debe hacer un arquitecto de soluciones para mantener el rendimiento deseado en todas las instancias del grupo?",
        opciones: [
          "Usar una política de escalado simple para escalar dinámicamente el Auto Scaling group.",
          "Usar una política de seguimiento de objetivo (target tracking) para escalar dinámicamente el Auto Scaling group.",
          "Usar una función de AWS Lambda para actualizar la capacidad deseada del Auto Scaling group.",
          "Usar acciones de escalado programadas para escalar hacia arriba y hacia abajo el Auto Scaling group."
        ],
        correctas: [1],
        explicacion: "Una política de seguimiento de objetivo mantiene automáticamente una métrica en el valor fijado (aquí, el 40 % de CPU), añadiendo o quitando instancias según haga falta. El escalado programado (D) no reacciona a la carga real y el escalado simple es menos preciso para sostener un objetivo concreto."
      },
      {
        pregunta: "Una empresa está desarrollando una aplicación de compartición de archivos que usará un bucket de Amazon S3 como almacenamiento. La empresa quiere servir todos los archivos a través de una distribución de Amazon CloudFront y no quiere que los archivos sean accesibles navegando directamente a la URL de S3. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Escribir políticas individuales para cada bucket de S3 que concedan permiso de lectura solo al acceso de CloudFront.",
          "Crear un usuario de IAM. Concederle permiso de lectura sobre los objetos del bucket de S3. Asignar el usuario a CloudFront.",
          "Escribir una política de bucket de S3 que asigne el ID de la distribución de CloudFront como Principal y el bucket de destino como Amazon Resource Name (ARN).",
          "Crear una origin access identity (OAI). Asignarla a la distribución de CloudFront. Configurar los permisos del bucket de S3 de forma que solo la OAI tenga permiso de lectura."
        ],
        correctas: [3],
        explicacion: "La origin access identity es la identidad especial que CloudFront usa para acceder al bucket: dando permiso de lectura únicamente a esa OAI, el contenido solo llega a través de CloudFront y las URL directas de S3 quedan bloqueadas. Un ID de distribución no es un principal de IAM válido (C)."
      },
      {
        pregunta: "El sitio web de una empresa ofrece a los usuarios informes históricos de rendimiento descargables. El sitio necesita una solución que escale para atender la demanda global, sea rentable, limite el aprovisionamiento de recursos de infraestructura y ofrezca el menor tiempo de respuesta posible. ¿Qué combinación debe recomendar un arquitecto de soluciones?",
        opciones: [
          "Amazon CloudFront y Amazon S3.",
          "AWS Lambda y Amazon DynamoDB.",
          "Application Load Balancer con Amazon EC2 Auto Scaling.",
          "Amazon Route 53 con Application Load Balancers internos."
        ],
        correctas: [0],
        explicacion: "Los informes son archivos estáticos: S3 los almacena sin infraestructura que aprovisionar y CloudFront los cachea en las edge locations de todo el mundo, dando el menor tiempo de respuesta al menor coste. Las opciones con EC2 o Lambda añaden cómputo innecesario para servir archivos."
      },
      {
        pregunta: "Una empresa ejecuta una base de datos Oracle on-premises. Como parte de su migración a AWS, quiere actualizar la base de datos a la versión más reciente disponible y configurar la recuperación ante desastres (DR). La empresa necesita minimizar el trabajo operativo tanto de la operación normal como de la configuración de DR, y además necesita mantener el acceso al sistema operativo subyacente de la base de datos. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Migrar la base de datos Oracle a una instancia de Amazon EC2. Configurar la replicación de la base de datos a otra Región de AWS.",
          "Migrar la base de datos Oracle a Amazon RDS for Oracle. Activar las copias de seguridad automatizadas entre Regiones para replicar las snapshots a otra Región de AWS.",
          "Migrar la base de datos Oracle a Amazon RDS Custom for Oracle. Crear una réplica de lectura de la base de datos en otra Región de AWS.",
          "Migrar la base de datos Oracle a Amazon RDS for Oracle. Crear una base de datos standby en otra zona de disponibilidad."
        ],
        correctas: [2],
        explicacion: "El requisito de mantener el acceso al sistema operativo descarta RDS for Oracle, que no lo permite, y una instancia EC2 obligaría a gestionarlo todo a mano. RDS Custom for Oracle es el punto intermedio (gestionado pero con acceso al sistema operativo) y una réplica de lectura en otra Región cubre la recuperación ante desastres."
      },
      {
        pregunta: "Una empresa quiere mover su aplicación a una solución serverless que analice los datos existentes y los nuevos mediante SQL. La empresa guarda los datos en un bucket de Amazon S3. Los datos requieren cifrado y deben replicarse a una Región de AWS diferente. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Crear un bucket de S3 nuevo. Cargar los datos en él. Usar S3 Cross-Region Replication (CRR) para replicar los objetos cifrados a un bucket de otra Región. Usar cifrado del lado del servidor con claves multi-Región de AWS KMS (SSE-KMS). Usar Amazon Athena para consultar los datos.",
          "Crear un bucket de S3 nuevo. Cargar los datos en él. Usar S3 Cross-Region Replication (CRR) para replicar los objetos cifrados a un bucket de otra Región. Usar cifrado del lado del servidor con claves multi-Región de AWS KMS (SSE-KMS). Usar Amazon RDS para consultar los datos.",
          "Cargar los datos en el bucket de S3 existente. Usar S3 Cross-Region Replication (CRR) para replicar los objetos cifrados a un bucket de otra Región. Usar cifrado del lado del servidor con claves gestionadas por Amazon S3 (SSE-S3). Usar Amazon Athena para consultar los datos.",
          "Cargar los datos en el bucket de S3 existente. Usar S3 Cross-Region Replication (CRR) para replicar los objetos cifrados a un bucket de otra Región. Usar cifrado del lado del servidor con claves gestionadas por Amazon S3 (SSE-S3). Usar Amazon RDS para consultar los datos."
        ],
        correctas: [0],
        explicacion: "Athena consulta con SQL directamente sobre S3 sin servidores, que es la parte serverless; RDS no puede consultar objetos de S3, lo que descarta B y D. Para replicar objetos cifrados entre Regiones, las claves multi-Región de KMS permiten descifrarlos en el destino sin trabajo adicional."
      },
      {
        pregunta: "Una empresa ejecuta cargas de trabajo en AWS y necesita conectarse a un servicio de un proveedor externo. El servicio está alojado en la VPC del proveedor. Según el equipo de seguridad de la empresa, la conectividad debe ser privada y estar restringida al servicio de destino, y la conexión debe iniciarse solo desde la VPC de la empresa. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Crear una conexión de peering de VPC entre la VPC de la empresa y la del proveedor. Actualizar la tabla de rutas para conectar con el servicio de destino.",
          "Pedir al proveedor que cree un virtual private gateway en su VPC. Usar AWS PrivateLink para conectar con el servicio de destino.",
          "Crear una NAT gateway en una subred pública de la VPC de la empresa. Actualizar la tabla de rutas para conectar con el servicio de destino.",
          "Pedir al proveedor que cree un VPC endpoint para el servicio de destino. Usar AWS PrivateLink para conectar con el servicio de destino."
        ],
        correctas: [3],
        explicacion: "AWS PrivateLink expone un único servicio de forma privada: el proveedor publica su endpoint y la empresa se conecta desde su VPC, sin exponer redes enteras y con la conexión siempre iniciada desde el lado del consumidor. El peering (A) conectaría las dos VPC completas, incumpliendo la restricción al servicio de destino."
      },
      {
        pregunta: "Una empresa está migrando su base de datos PostgreSQL on-premises a Amazon Aurora PostgreSQL. La base de datos on-premises debe permanecer en línea y accesible durante la migración, y la base de datos de Aurora debe mantenerse sincronizada con la on-premises. ¿Qué combinación de acciones debe realizar un arquitecto de soluciones? (Elige dos.)",
        opciones: [
          "Crear una tarea de replicación continua.",
          "Crear una copia de seguridad de la base de datos on-premises.",
          "Crear un servidor de replicación de AWS Database Migration Service (AWS DMS).",
          "Convertir el esquema de la base de datos con la AWS Schema Conversion Tool (AWS SCT).",
          "Crear una regla de Amazon EventBridge para monitorizar la sincronización de la base de datos."
        ],
        correctas: [0, 2],
        explicacion: "AWS DMS necesita un servidor (instancia) de replicación (C) y una tarea de replicación continua con captura de datos de cambios (A) para mantener Aurora sincronizada mientras el origen sigue en línea. La AWS SCT solo hace falta en migraciones heterogéneas, y aquí el motor es el mismo (PostgreSQL a Aurora PostgreSQL). Nota: el fichero de soluciones del dump marca A y D, pero la conversión de esquema es innecesaria en una migración homogénea."
      },
      {
        pregunta: "Una empresa usa AWS Organizations para crear cuentas de AWS dedicadas a cada unidad de negocio, de forma que cada una gestione su cuenta de forma independiente cuando lo solicite. El destinatario del correo del usuario root pasó por alto una notificación enviada a la dirección de correo del usuario root de una de las cuentas. La empresa quiere asegurarse de que no se pierda ninguna notificación futura y que estas se limiten a los administradores de las cuentas. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Configurar el servidor de correo de la empresa para reenviar los mensajes enviados a la dirección de correo del usuario root de la cuenta de AWS a todos los usuarios de la organización.",
          "Configurar todas las direcciones de correo de usuario root de las cuentas de AWS como listas de distribución dirigidas a unos pocos administradores que puedan responder a las alertas. Configurar los contactos alternativos de las cuentas desde la consola de AWS Organizations o mediante programación.",
          "Configurar todos los mensajes de correo del usuario root de las cuentas de AWS para que se envíen a un único administrador responsable de monitorizar las alertas y reenviarlas a los grupos adecuados.",
          "Configurar todas las cuentas de AWS existentes y todas las nuevas para que usen la misma dirección de correo de usuario root. Configurar los contactos alternativos de las cuentas desde la consola de AWS Organizations o mediante programación."
        ],
        correctas: [1],
        explicacion: "Cada cuenta de AWS necesita una dirección de correo de usuario root única, así que la opción D es directamente imposible. La práctica recomendada es usar listas de distribución como correo root de cada cuenta, para que varios administradores reciban los avisos, y configurar además contactos alternativos. Reenviar a todos (A) no limita las notificaciones a los administradores y un único destinatario (C) es un punto único de fallo. Nota: el fichero de soluciones del dump marca D."
      },
      {
        pregunta: "Una empresa ejecuta su aplicación de comercio electrónico en AWS. Cada pedido nuevo se publica como un mensaje en una cola RabbitMQ que se ejecuta en una instancia de Amazon EC2 en una única zona de disponibilidad. Los mensajes los procesa otra aplicación en una instancia EC2 separada, que guarda los detalles en una base de datos PostgreSQL en otra instancia EC2. Todas las instancias están en la misma zona de disponibilidad. La empresa necesita rediseñar su arquitectura para ofrecer la máxima disponibilidad con el menor trabajo operativo. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Migrar la cola a un par redundante (activo/standby) de instancias de RabbitMQ en Amazon MQ. Crear un Auto Scaling group Multi-AZ para las instancias EC2 que alojan la aplicación. Crear otro Auto Scaling group Multi-AZ para las instancias EC2 que alojan la base de datos PostgreSQL.",
          "Migrar la cola a un par redundante (activo/standby) de instancias de RabbitMQ en Amazon MQ. Crear un Auto Scaling group Multi-AZ para las instancias EC2 que alojan la aplicación. Migrar la base de datos a un despliegue Multi-AZ de Amazon RDS for PostgreSQL.",
          "Crear un Auto Scaling group Multi-AZ para las instancias EC2 que alojan la cola RabbitMQ. Crear otro Auto Scaling group Multi-AZ para las instancias EC2 que alojan la aplicación. Migrar la base de datos a un despliegue Multi-AZ de Amazon RDS for PostgreSQL.",
          "Crear un Auto Scaling group Multi-AZ para las instancias EC2 que alojan la cola RabbitMQ. Crear otro Auto Scaling group Multi-AZ para las instancias EC2 que alojan la aplicación. Crear un tercer Auto Scaling group Multi-AZ para las instancias EC2 que alojan la base de datos PostgreSQL."
        ],
        correctas: [1],
        explicacion: "Amazon MQ ofrece RabbitMQ gestionado en configuración activo/standby entre zonas, y RDS for PostgreSQL Multi-AZ aporta failover automático: ambos eliminan la gestión manual. Mantener la cola o la base de datos en instancias EC2 dentro de Auto Scaling groups (C y D) no da alta disponibilidad real a un componente con estado y multiplica el trabajo operativo."
      },
      {
        pregunta: "Un equipo de informes recibe archivos cada día en un bucket de Amazon S3. El equipo revisa y copia manualmente los archivos de ese bucket inicial a un bucket de análisis cada día a la misma hora para usarlos con Amazon QuickSight. Otros equipos están empezando a enviar más archivos y de mayor tamaño al bucket inicial. El equipo de informes quiere mover los archivos automáticamente al bucket de análisis según entren en el inicial. También quiere usar funciones de AWS Lambda para ejecutar código de detección de patrones sobre los datos copiados y, además, enviar los archivos a un pipeline de Amazon SageMaker Pipelines. ¿Qué debe hacer un arquitecto de soluciones con el MENOR trabajo operativo?",
        opciones: [
          "Crear una función Lambda que copie los archivos al bucket de análisis. Crear una notificación de eventos de S3 para el bucket de análisis. Configurar Lambda y SageMaker Pipelines como destinos de la notificación. Configurar s3:ObjectCreated:Put como tipo de evento.",
          "Crear una función Lambda que copie los archivos al bucket de análisis. Configurar el bucket de análisis para enviar notificaciones de eventos a Amazon EventBridge. Configurar una regla ObjectCreated en EventBridge. Configurar Lambda y SageMaker Pipelines como destinos de la regla.",
          "Configurar la replicación de S3 entre los buckets. Crear una notificación de eventos de S3 para el bucket de análisis. Configurar Lambda y SageMaker Pipelines como destinos de la notificación. Configurar s3:ObjectCreated:Put como tipo de evento.",
          "Configurar la replicación de S3 entre los buckets. Configurar el bucket de análisis para enviar notificaciones de eventos a Amazon EventBridge. Configurar una regla ObjectCreated en EventBridge. Configurar Lambda y SageMaker Pipelines como destinos de la regla."
        ],
        correctas: [3],
        explicacion: "Las notificaciones de eventos de S3 solo admiten como destino SNS, SQS, Lambda o EventBridge, nunca SageMaker Pipelines, lo que descarta A y C. Entre las dos que usan EventBridge, la replicación de S3 copia los archivos de forma gestionada, sin escribir ni mantener una Lambda propia, así que D es la de menor trabajo operativo. Nota: el fichero de soluciones del dump marca A."
      },
      {
        pregunta: "Un arquitecto de soluciones debe ayudar a una empresa a optimizar el coste de ejecutar una aplicación en AWS. La aplicación usará instancias de Amazon EC2, AWS Fargate y AWS Lambda como cómputo. Las instancias EC2 ejecutarán la capa de ingesta de datos; su uso será esporádico e impredecible y las cargas que se ejecuten en ellas pueden interrumpirse en cualquier momento. El front-end se ejecutará en Fargate y Lambda servirá la capa de API; la utilización del front-end y de la capa de API será predecible durante el próximo año. ¿Qué combinación de opciones de compra ofrece la solución MÁS rentable? (Elige dos.)",
        opciones: [
          "Usar instancias Spot para la capa de ingesta de datos.",
          "Usar instancias On-Demand para la capa de ingesta de datos.",
          "Comprar un Compute Savings Plan de 1 año para el front-end y la capa de API.",
          "Comprar instancias Reserved All Upfront de 1 año para la capa de ingesta de datos.",
          "Comprar un EC2 Instance Savings Plan de 1 año para el front-end y la capa de API."
        ],
        correctas: [0, 2],
        explicacion: "La capa de ingesta es esporádica e interrumpible, el perfil exacto de las instancias Spot (A). Para el front-end y la API, con uso predecible, el Compute Savings Plan (C) es el único que cubre Fargate y Lambda; el EC2 Instance Savings Plan (E) solo se aplica a EC2 y las Reserved Instances (D) no encajan con un uso impredecible."
      },
      {
        pregunta: "Una empresa gestiona un portal web que ofrece a los usuarios noticias de última hora globales, alertas locales y previsiones meteorológicas. El portal entrega a cada usuario una vista personalizada usando una mezcla de contenido estático y dinámico. El contenido se sirve por HTTPS a través de un servidor de API que se ejecuta en una instancia de Amazon EC2 detrás de un Application Load Balancer (ALB). La empresa quiere que el portal entregue este contenido a sus usuarios de todo el mundo lo más rápido posible. ¿Cómo debe diseñar la aplicación un arquitecto de soluciones para garantizar la MENOR latencia para todos los usuarios?",
        opciones: [
          "Desplegar la pila de la aplicación en una única Región de AWS. Usar Amazon CloudFront para servir todo el contenido estático y dinámico especificando el ALB como origen.",
          "Desplegar la pila de la aplicación en dos Regiones de AWS. Usar una política de enrutamiento por latencia de Amazon Route 53 para servir todo el contenido desde el ALB de la Región más cercana.",
          "Desplegar la pila de la aplicación en una única Región de AWS. Usar Amazon CloudFront para servir el contenido estático. Servir el contenido dinámico directamente desde el ALB.",
          "Desplegar la pila de la aplicación en dos Regiones de AWS. Usar una política de enrutamiento por geolocalización de Amazon Route 53 para servir todo el contenido desde el ALB de la Región más cercana."
        ],
        correctas: [1],
        explicacion: "El contenido es personalizado para cada usuario, así que la caché aporta poco y lo que reduce la latencia es acercar físicamente la pila a los usuarios: desplegar en dos Regiones y usar enrutamiento por latencia de Route 53, que envía a cada usuario a la Región que responde más rápido. El enrutamiento por geolocalización (D) elige por ubicación, no por latencia real."
      },
      {
        pregunta: "Una empresa de videojuegos está diseñando una arquitectura de alta disponibilidad. La aplicación se ejecuta sobre un kernel de Linux modificado y solo soporta tráfico basado en UDP. La empresa necesita que la capa de front-end ofrezca la mejor experiencia de usuario posible: debe tener baja latencia, enrutar el tráfico a la edge location más cercana y proporcionar direcciones IP estáticas de entrada a los endpoints de la aplicación. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Configurar Amazon Route 53 para reenviar las peticiones a un Application Load Balancer. Usar AWS Lambda para la aplicación con AWS Application Auto Scaling.",
          "Configurar Amazon CloudFront para reenviar las peticiones a un Network Load Balancer. Usar AWS Lambda para la aplicación en un grupo de AWS Application Auto Scaling.",
          "Configurar AWS Global Accelerator para reenviar las peticiones a un Network Load Balancer. Usar instancias de Amazon EC2 para la aplicación en un Auto Scaling group de EC2.",
          "Configurar Amazon API Gateway para reenviar las peticiones a un Application Load Balancer. Usar instancias de Amazon EC2 para la aplicación en un Auto Scaling group de EC2."
        ],
        correctas: [2],
        explicacion: "Global Accelerator proporciona IP estáticas, enruta desde la edge location más cercana por la red de AWS y soporta UDP, y el Network Load Balancer también trabaja en capa 4 con UDP. El kernel modificado obliga a usar instancias EC2 en lugar de Lambda, y ni CloudFront ni los ALB manejan tráfico UDP."
      },
      {
        pregunta: "Una empresa quiere migrar a AWS su aplicación monolítica on-premises. Quiere conservar la mayor parte posible del código de front-end y de backend, pero también quiere dividir la aplicación en aplicaciones más pequeñas, cada una gestionada por un equipo distinto. La empresa necesita una solución muy escalable que minimice el trabajo operativo. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Alojar la aplicación en AWS Lambda. Integrarla con Amazon API Gateway.",
          "Alojar la aplicación con AWS Amplify. Conectarla a una API de Amazon API Gateway integrada con AWS Lambda.",
          "Alojar la aplicación en instancias de Amazon EC2. Configurar un Application Load Balancer con las instancias EC2 en un Auto Scaling group como destinos.",
          "Alojar la aplicación en Amazon Elastic Container Service (Amazon ECS). Configurar un Application Load Balancer con Amazon ECS como destino."
        ],
        correctas: [3],
        explicacion: "Contenerizar en ECS permite dividir el monolito en servicios más pequeños e independientes reutilizando el código existente casi sin cambios, con escalado gestionado. Pasar a Lambda (A y B) exigiría reescribir la aplicación, justo lo que se quiere evitar, y las instancias EC2 (C) añaden trabajo operativo."
      },
      {
        pregunta: "Una empresa ha empezado a usar Amazon Aurora como almacén de datos de su aplicación global de comercio electrónico. Cuando se ejecutan informes grandes, los desarrolladores informan de que la aplicación rinde mal. Tras revisar las métricas en Amazon CloudWatch, un arquitecto de soluciones descubre que las métricas ReadIOPS y CPUUtilization se disparan cuando se ejecutan los informes mensuales. ¿Cuál es la solución MÁS rentable?",
        opciones: [
          "Migrar los informes mensuales a Amazon Redshift.",
          "Migrar los informes mensuales a una réplica de Aurora.",
          "Migrar la base de datos de Aurora a una clase de instancia mayor.",
          "Aumentar las IOPS aprovisionadas en la instancia de Aurora."
        ],
        correctas: [1],
        explicacion: "Los informes son consultas de lectura: moverlos a una réplica de Aurora los saca de la instancia principal sin afectar a la aplicación, y añadir una réplica es más barato que agrandar la instancia (C) o montar un clúster de Redshift (A). Aurora gestiona su propio almacenamiento y no permite aprovisionar IOPS (D)."
      },
      {
        pregunta: "Una empresa aloja una aplicación de analítica web en una única instancia de Amazon EC2 On-Demand. El software de analítica está escrito en PHP y usa una base de datos MySQL. El software, el servidor web que sirve PHP y el servidor de base de datos están todos alojados en la instancia EC2. La aplicación muestra signos de degradación del rendimiento en horas de mucho tráfico y devuelve errores 5xx. La empresa necesita que la aplicación escale de forma transparente. ¿Qué solución cumple estos requisitos de la forma MÁS rentable?",
        opciones: [
          "Migrar la base de datos a una instancia de Amazon RDS for MySQL. Crear una AMI de la aplicación web. Usar la AMI para lanzar una segunda instancia EC2 On-Demand. Usar un Application Load Balancer para repartir la carga entre las instancias.",
          "Migrar la base de datos a una instancia de Amazon RDS for MySQL. Crear una AMI de la aplicación web. Usar la AMI para lanzar una segunda instancia EC2 On-Demand. Usar enrutamiento ponderado de Amazon Route 53 para repartir la carga entre las dos instancias.",
          "Migrar la base de datos a una instancia de Amazon Aurora MySQL. Crear una función de AWS Lambda que detenga la instancia EC2 y cambie su tipo. Crear una alarma de Amazon CloudWatch que invoque la función cuando el uso de CPU supere el 75 %.",
          "Migrar la base de datos a una instancia de Amazon Aurora MySQL. Crear una AMI de la aplicación web. Aplicar la AMI a una launch template. Crear un Auto Scaling group con la launch template. Configurar la launch template para usar un Spot Fleet. Adjuntar un Application Load Balancer al Auto Scaling group."
        ],
        correctas: [3],
        explicacion: "Separar la base de datos a Aurora y poner la capa web en un Auto Scaling group detrás de un ALB da escalado transparente, y usar un Spot Fleet abarata el cómputo al máximo. Las opciones A y B fijan solo dos instancias, que no escalan, y la C sigue teniendo una única instancia que además hay que parar para redimensionarla."
      },
      {
        pregunta: "Una empresa ejecuta en producción una aplicación web sin estado sobre un grupo de instancias de Amazon EC2 On-Demand detrás de un Application Load Balancer. La aplicación tiene un uso intenso durante 8 horas cada día laborable, un uso moderado y estable por la noche y un uso bajo los fines de semana. La empresa quiere minimizar sus costes de EC2 sin afectar a la disponibilidad. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar instancias Spot para toda la carga de trabajo.",
          "Usar instancias Reserved para el nivel base de uso. Usar instancias Spot para la capacidad adicional que necesite la aplicación.",
          "Usar instancias On-Demand para el nivel base de uso. Usar instancias Spot para la capacidad adicional que necesite la aplicación.",
          "Usar instancias Dedicated para el nivel base de uso. Usar instancias On-Demand para la capacidad adicional."
        ],
        correctas: [1],
        explicacion: "Hay un nivel base de uso constante, que sale más barato con Reserved Instances, y unos picos variables que, al ser la aplicación sin estado, pueden cubrirse con instancias Spot. Usar solo Spot (A) pondría en riesgo la disponibilidad de la carga base, ya que AWS puede reclamar esas instancias."
      },
      {
        pregunta: "Una empresa necesita conservar durante 10 años los archivos de log de una aplicación crítica. El equipo de la aplicación accede con regularidad a los logs del último mes para resolver problemas, pero los logs de más de 1 mes se consultan rara vez. La aplicación genera más de 10 TB de logs al mes. ¿Qué opción de almacenamiento cumple estos requisitos de la forma MÁS rentable?",
        opciones: [
          "Guardar los logs en Amazon S3. Usar AWS Backup para mover los logs de más de 1 mes a S3 Glacier Deep Archive.",
          "Guardar los logs en Amazon S3. Usar políticas de ciclo de vida de S3 para mover los logs de más de 1 mes a S3 Glacier Deep Archive.",
          "Guardar los logs en Amazon CloudWatch Logs. Usar AWS Backup para mover los logs de más de 1 mes a S3 Glacier Deep Archive.",
          "Guardar los logs en Amazon CloudWatch Logs. Usar políticas de ciclo de vida de Amazon S3 para mover los logs de más de 1 mes a S3 Glacier Deep Archive."
        ],
        correctas: [1],
        explicacion: "S3 es mucho más barato que CloudWatch Logs para almacenar volúmenes grandes, y las políticas de ciclo de vida mueven solas los objetos a Glacier Deep Archive al mes. AWS Backup no hace transiciones de clase de almacenamiento de S3 (A) y las políticas de ciclo de vida de S3 no actúan sobre CloudWatch Logs (D)."
      },
      {
        pregunta: "Una empresa tiene un flujo de ingesta de datos con los siguientes componentes: un topic de Amazon Simple Notification Service (Amazon SNS) que recibe notificaciones sobre nuevas entregas de datos y una función de AWS Lambda que procesa y guarda los datos. El flujo falla ocasionalmente por problemas de conectividad de red y, cuando ocurre, los datos correspondientes no se ingieren a menos que la empresa vuelva a ejecutar el trabajo manualmente. ¿Qué debe hacer un arquitecto de soluciones para asegurar que todas las notificaciones acaben procesándose?",
        opciones: [
          "Configurar la función Lambda para desplegarse en varias zonas de disponibilidad.",
          "Modificar la configuración de la función Lambda para aumentar las asignaciones de CPU y memoria.",
          "Configurar la estrategia de reintentos del topic de SNS para aumentar tanto el número de reintentos como el tiempo de espera entre ellos.",
          "Configurar una cola de Amazon Simple Queue Service (Amazon SQS) como destino en caso de fallo (on-failure destination). Modificar la función Lambda para que procese los mensajes de la cola."
        ],
        correctas: [3],
        explicacion: "Un destino on-failure envía a una cola de SQS las invocaciones que fallan, conservando los datos de forma duradera para reprocesarlos sin intervención manual. Lambda ya se ejecuta de forma redundante entre zonas (A) y más CPU o memoria (B) no arregla un fallo de red."
      },
      {
        pregunta: "Una empresa tiene un servicio que produce datos de eventos y quiere usar AWS para procesarlos según se reciben. Los datos se escriben en un orden concreto que debe mantenerse durante todo el procesamiento. La empresa quiere implementar una solución que minimice el trabajo operativo. ¿Cómo debe conseguirlo un arquitecto de soluciones?",
        opciones: [
          "Crear una cola FIFO de Amazon Simple Queue Service (Amazon SQS) para contener los mensajes. Configurar una función de AWS Lambda para procesar los mensajes de la cola.",
          "Crear un topic de Amazon Simple Notification Service (Amazon SNS) para entregar notificaciones con las cargas a procesar. Configurar una función de AWS Lambda como suscriptora.",
          "Crear una cola estándar de Amazon Simple Queue Service (Amazon SQS) para contener los mensajes. Configurar una función de AWS Lambda para procesar los mensajes de la cola de forma independiente.",
          "Crear un topic de Amazon Simple Notification Service (Amazon SNS) para entregar notificaciones con las cargas a procesar. Configurar una cola de Amazon Simple Queue Service (Amazon SQS) como suscriptora."
        ],
        correctas: [0],
        explicacion: "Solo las colas FIFO de SQS garantizan que los mensajes se procesen en el mismo orden en que se escribieron, y una función Lambda como consumidora evita gestionar servidores. Las colas estándar (C) no conservan el orden y SNS tampoco lo garantiza."
      },
      {
        pregunta: "Una empresa está migrando una aplicación de servidores on-premises a instancias de Amazon EC2. Como parte de los requisitos de diseño de la migración, un arquitecto de soluciones debe implementar alarmas de métricas de infraestructura. La empresa no necesita actuar si el uso de CPU sube por encima del 50 % durante un pico breve, pero si el uso de CPU supera el 50 % y al mismo tiempo las IOPS de lectura del disco son altas, la empresa necesita actuar cuanto antes. El arquitecto también debe reducir las falsas alarmas. ¿Qué debe hacer?",
        opciones: [
          "Crear alarmas compuestas (composite alarms) de Amazon CloudWatch siempre que sea posible.",
          "Crear dashboards de Amazon CloudWatch para visualizar las métricas y reaccionar rápido ante los problemas.",
          "Crear canaries de Amazon CloudWatch Synthetics para monitorizar la aplicación y lanzar una alarma.",
          "Crear alarmas de métrica únicas de Amazon CloudWatch con varios umbrales de métrica siempre que sea posible."
        ],
        correctas: [0],
        explicacion: "Las alarmas compuestas combinan varias alarmas con lógica booleana, de modo que solo saltan cuando se cumplen a la vez las condiciones de CPU y de IOPS: exactamente lo que reduce las falsas alarmas. Una alarma de métrica vigila una sola métrica (D) y un dashboard no alerta de nada (B)."
      },
      {
        pregunta: "Una empresa quiere migrar su centro de datos on-premises a AWS. Según sus requisitos de cumplimiento, la empresa solo puede usar la Región ap-northeast-3. Los administradores de la empresa no tienen permitido conectar las VPC a Internet. ¿Qué soluciones cumplen estos requisitos? (Elige dos.)",
        opciones: [
          "Usar AWS Control Tower para implementar guardrails de residencia de datos que denieguen el acceso a Internet y denieguen el acceso a todas las Regiones de AWS excepto ap-northeast-3.",
          "Usar reglas de AWS WAF para impedir el acceso a Internet. Denegar el acceso a todas las Regiones de AWS excepto ap-northeast-3 en la configuración de la cuenta de AWS.",
          "Usar AWS Organizations para configurar políticas de control de servicios (SCP) que impidan que las VPC obtengan acceso a Internet. Denegar el acceso a todas las Regiones de AWS excepto ap-northeast-3.",
          "Crear una regla de salida en la network ACL de cada VPC para denegar todo el tráfico hacia 0.0.0.0/0. Crear una política de IAM para cada usuario que impida el uso de cualquier Región de AWS distinta de ap-northeast-3.",
          "Usar AWS Config para activar reglas gestionadas que detecten y alerten sobre internet gateways y sobre nuevos recursos desplegados fuera de ap-northeast-3."
        ],
        correctas: [0, 2],
        explicacion: "Los guardrails de residencia de datos de Control Tower (A) y las SCP de Organizations (C) son controles preventivos: impiden de verdad que se cree el acceso a Internet y que se use otra Región. AWS Config (E) solo detecta y avisa a posteriori, AWS WAF (B) no controla la salida a Internet y unas políticas de IAM por usuario (D) no escalan ni actúan a nivel de cuenta."
      },
      {
        pregunta: "Una empresa usa una aplicación web de tres capas para formar a los nuevos empleados. Solo se accede a la aplicación 12 horas al día. La empresa usa una instancia de base de datos de Amazon RDS for MySQL para guardar la información y quiere minimizar los costes. ¿Qué debe hacer un arquitecto de soluciones?",
        opciones: [
          "Configurar una política de IAM para AWS Systems Manager Session Manager. Crear un rol de IAM para la política. Actualizar la relación de confianza del rol. Configurar el arranque y la parada automáticos de la instancia de base de datos.",
          "Crear un clúster de caché de Amazon ElastiCache for Redis que permita a los usuarios acceder a los datos desde la caché cuando la instancia esté parada. Invalidar la caché cuando la instancia arranque.",
          "Lanzar una instancia de Amazon EC2. Crear un rol de IAM que conceda acceso a Amazon RDS. Adjuntar el rol a la instancia EC2. Configurar un cron job que arranque y pare la instancia EC2 según el horario deseado.",
          "Crear funciones de AWS Lambda que arranquen y paren la instancia de base de datos. Crear reglas programadas de Amazon EventBridge que invoquen las funciones Lambda. Configurar las funciones Lambda como destinos de los eventos de las reglas."
        ],
        correctas: [3],
        explicacion: "Programar con EventBridge unas funciones Lambda que arranquen y paren la instancia de RDS elimina el coste de las 12 horas diarias en que no se usa, y todo son servicios gestionados. La opción C añade una instancia EC2 solo para lanzar el cron, y la B no reduce el coste de la instancia de RDS."
      }
    ]
  }
  ,
  {
    id: "examen-04",
    titulo: "Examen de práctica 4",
    resumen: "50 preguntas tipo test sobre S3, CloudFront, streaming, Aurora, WAF/Shield, DynamoDB, ECS, Direct Connect, RDS y Cognito, con respuesta correcta y explicación.",
    preguntas: [
      {
        pregunta: "Una empresa vende tonos de llamada creados a partir de fragmentos de canciones populares. Los archivos se almacenan en Amazon S3 Standard y pesan al menos 128 KB. La empresa tiene millones de archivos, pero las descargas son poco frecuentes para los tonos de más de 90 días de antigüedad. Quiere ahorrar en almacenamiento manteniendo los archivos más consultados fácilmente disponibles. ¿Qué acción es la MÁS económica?",
        opciones: [
          "Configurar S3 Standard-IA como nivel de almacenamiento inicial de los objetos.",
          "Mover los archivos a S3 Intelligent-Tiering y configurarlo para moverlos a un nivel más económico tras 90 días.",
          "Configurar S3 Inventory para gestionar los objetos y moverlos a S3 Standard-IA tras 90 días.",
          "Implementar una política de ciclo de vida de S3 que mueva los objetos de S3 Standard a S3 Standard-IA tras 90 días."
        ],
        correctas: [3],
        explicacion: "Una política de ciclo de vida de S3 mueve automáticamente los objetos a S3 Standard-IA tras el umbral de 90 días indicado, el patrón de acceso exacto descrito, sin trabajo manual. S3 Inventory (C) solo genera informes, no mueve objetos, e Intelligent-Tiering (B) monitoriza y mueve según su propia lógica interna, no según un umbral fijo configurado a mano."
      },
      {
        pregunta: "Una empresa necesita guardar los resultados de un ensayo clínico en un repositorio de Amazon S3. El repositorio debe permitir que unos pocos científicos añadan archivos nuevos y restringir al resto de usuarios a solo lectura. Ningún usuario puede modificar ni eliminar archivos. Cada archivo debe conservarse un mínimo de 1 año desde su creación. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar S3 Object Lock en modo governance con una retención legal (legal hold) de 1 año.",
          "Usar S3 Object Lock en modo compliance con un período de retención de 365 días.",
          "Usar un rol de IAM para impedir que los usuarios eliminen o modifiquen objetos, con una política de bucket que solo permita ese rol.",
          "Configurar el bucket para invocar una función Lambda al añadir un objeto, que registre el hash del objeto para detectar modificaciones."
        ],
        correctas: [1],
        explicacion: "El modo compliance de S3 Object Lock impide que nadie, incluida la cuenta raíz, elimine o sobrescriba los objetos durante el período de retención (WORM real). El modo governance (A) puede saltarse con permisos especiales, y las opciones C y D son controles indirectos que no garantizan la inmutabilidad real."
      },
      {
        pregunta: "Una gran empresa de medios aloja una aplicación web en AWS y quiere cachear archivos multimedia confidenciales para que los usuarios de todo el mundo tengan acceso fiable a ellos. El contenido está en buckets de Amazon S3. La empresa debe entregar el contenido rápidamente sin importar la ubicación geográfica de las peticiones. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar AWS DataSync para conectar los buckets de S3 con la aplicación web.",
          "Desplegar AWS Global Accelerator para conectar los buckets de S3 con la aplicación web.",
          "Desplegar Amazon CloudFront para conectar los buckets de S3 con los servidores edge de CloudFront.",
          "Usar Amazon SQS para conectar los buckets de S3 con la aplicación web."
        ],
        correctas: [2],
        explicacion: "CloudFront cachea el contenido en ubicaciones edge de todo el mundo, entregándolo con baja latencia desde el punto más cercano al usuario. DataSync es para transferencia de datos, no para servir contenido, y SQS es una cola de mensajes, no un mecanismo de entrega."
      },
      {
        pregunta: "Una empresa produce datos por lotes desde distintas bases de datos y también datos de streaming en vivo desde sensores de red y APIs. Necesita consolidar todos los datos para analítica de negocio, procesarlos y dejarlos en distintos buckets de Amazon S3. Más tarde, varios equipos ejecutarán consultas puntuales e importarán los datos a una herramienta de BI para mostrar KPI. ¿Qué combinación de pasos cumple esto con el MENOR trabajo operativo? (Elige dos.)",
        opciones: [
          "Usar Amazon Athena para las consultas puntuales. Usar Amazon QuickSight para crear paneles de KPI.",
          "Usar Amazon Kinesis Data Analytics para las consultas puntuales. Usar Amazon QuickSight para crear paneles de KPI.",
          "Crear funciones personalizadas de AWS Lambda para mover los registros individuales de las bases de datos a un clúster de Amazon Redshift.",
          "Usar un trabajo ETL de AWS Glue para convertir los datos a JSON y cargarlos en varios clústeres de Amazon OpenSearch Service.",
          "Usar blueprints de AWS Lake Formation para identificar los datos a ingerir en un data lake. Usar AWS Glue para explorar el origen, extraer los datos y cargarlos en Amazon S3 en formato Apache Parquet."
        ],
        correctas: [0, 4],
        explicacion: "Athena permite consultas puntuales directamente sobre S3 y QuickSight genera los paneles de KPI, con el mínimo esfuerzo. Para 'procesar y dejar los datos en distintos buckets de S3', los blueprints de Lake Formation junto con un rastreador de Glue son la vía gestionada estándar para poblar un data lake en S3. Mover registros a Redshift con Lambda personalizada no deja los datos en S3 y añade código que mantener. Nota: el fichero de soluciones del dump marca A y C; la respuesta correcta es A y E."
      },
      {
        pregunta: "Una empresa guarda datos en un clúster de Amazon Aurora PostgreSQL. Debe conservar todos los datos durante 5 años y eliminarlos después, y conservar indefinidamente los logs de auditoría de las acciones realizadas en la base de datos. Actualmente tiene configuradas copias de seguridad automáticas para Aurora. ¿Qué combinación de pasos cumple estos requisitos? (Elige dos.)",
        opciones: [
          "Tomar una instantánea manual del clúster de la base de datos.",
          "Crear una política de ciclo de vida para las copias de seguridad automáticas.",
          "Configurar la retención de las copias de seguridad automáticas a 5 años.",
          "Configurar la exportación de los logs del clúster a Amazon CloudWatch Logs.",
          "Usar AWS Backup para hacer las copias de seguridad y conservarlas 5 años."
        ],
        correctas: [3, 4],
        explicacion: "Las copias de seguridad automáticas de RDS/Aurora tienen un máximo de 35 días de retención: no se pueden configurar a 5 años. Para conservar los datos ese plazo hay que usar AWS Backup, que sí admite políticas de retención de años. Para el log de auditoría indefinido, exportar los logs de la base de datos a CloudWatch Logs permite conservarlos sin caducidad."
      },
      {
        pregunta: "Un arquitecto de soluciones optimiza un sitio web para un evento musical. Los vídeos de las actuaciones se transmitirán en directo y después estarán disponibles bajo demanda, con una audiencia global esperada. ¿Qué servicio mejora el rendimiento tanto del streaming en directo como del streaming bajo demanda?",
        opciones: ["Amazon CloudFront", "AWS Global Accelerator", "Amazon Route 53", "Amazon S3 Transfer Acceleration"],
        correctas: [0],
        explicacion: "CloudFront distribuye contenido HTTP/HTTPS en caché desde ubicaciones edge y sirve tanto streaming en vivo (segmentos HLS/DASH) como contenido bajo demanda ya cacheado, mejorando el rendimiento global en ambos casos. Global Accelerator optimiza el enrutado de tráfico TCP/UDP no HTTP, pero no cachea contenido."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación serverless de acceso público que usa Amazon API Gateway y AWS Lambda. El tráfico se ha disparado recientemente por peticiones fraudulentas de botnets. ¿Qué pasos deberían tomarse para bloquear las peticiones de usuarios no autorizados? (Elige dos.)",
        opciones: [
          "Crear un plan de uso con una clave de API que se comparta solo con los usuarios legítimos.",
          "Añadir lógica dentro de la función Lambda para ignorar las peticiones de direcciones IP fraudulentas.",
          "Implementar una regla de AWS WAF para detectar peticiones maliciosas y bloquearlas.",
          "Convertir la API pública existente en una API privada y actualizar los registros DNS para redirigir a los usuarios al nuevo endpoint.",
          "Crear un rol de IAM para cada usuario que acceda a la API, que asumirá al hacer la llamada."
        ],
        correctas: [0, 2],
        explicacion: "Un plan de uso con clave de API restringe el acceso a quienes tengan una clave válida, y AWS WAF filtra patrones de tráfico malicioso (como los de un botnet) antes de que lleguen a Lambda. Convertir la API en privada rompe el requisito de que sea de acceso público, y añadir lógica en la propia Lambda es reactivo y no escala frente a un ataque grande."
      },
      {
        pregunta: "Una empresa de ecommerce aloja su aplicación de analítica en AWS y genera unos 300 MB de datos al mes en formato JSON. Evalúa una solución de recuperación ante desastres para respaldar los datos, que deben estar accesibles en milisegundos si se necesitan y conservarse 30 días. ¿Qué solución es la MÁS económica?",
        opciones: ["Amazon OpenSearch Service (Amazon Elasticsearch Service)", "Amazon S3 Glacier", "Amazon S3 Standard", "Amazon RDS for PostgreSQL"],
        correctas: [2],
        explicacion: "Para un volumen tan pequeño (300 MB/mes) con acceso en milisegundos, S3 Standard es la opción más económica y sencilla. S3 Glacier no ofrece acceso en milisegundos, y OpenSearch o RDS son mucho más caros y complejos para un simple respaldo de archivos."
      },
      {
        pregunta: "Una empresa tiene una pequeña aplicación Python que procesa documentos JSON y envía los resultados a una base de datos SQL on-premises. La aplicación se ejecuta miles de veces al día. La empresa quiere migrarla a AWS con una solución de alta disponibilidad que maximice la escalabilidad y minimice el trabajo operativo. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Colocar los documentos JSON en un bucket de S3. Ejecutar el código Python en varias instancias EC2 para procesarlos. Guardar los resultados en un clúster de Amazon Aurora.",
          "Colocar los documentos JSON en un bucket de S3. Crear una función de AWS Lambda que ejecute el código Python al llegar los documentos. Guardar los resultados en un clúster de Amazon Aurora.",
          "Colocar los documentos JSON en un volumen de Amazon EBS con Multi-Attach, conectado a varias instancias EC2. Guardar los resultados en una instancia de Amazon RDS.",
          "Colocar los documentos JSON como mensajes en una cola de Amazon SQS. Desplegar el código Python en un clúster de Amazon ECS con tipo de lanzamiento EC2. Guardar los resultados en una instancia de Amazon RDS."
        ],
        correctas: [1],
        explicacion: "Lambda disparada por eventos de S3 escala automáticamente sin gestionar servidores, y Aurora ofrece la base de datos gestionada de alta disponibilidad. Es la solución con menos trabajo operativo frente a gestionar instancias EC2 o un clúster ECS."
      },
      {
        pregunta: "Una empresa quiere usar infraestructura de computación de alto rendimiento (HPC) en AWS para modelado de riesgo financiero. Sus cargas HPC corren en Linux; cada flujo de trabajo usa cientos de instancias EC2 Spot, es efímero y genera miles de archivos de salida guardados en almacenamiento persistente para análisis futuro. Necesita copiar datos on-premises a ese almacenamiento y un sistema de archivos de alto rendimiento integrado con él. ¿Qué combinación de servicios cumple esto?",
        opciones: [
          "Amazon FSx for Lustre integrado con Amazon S3",
          "Amazon FSx for Windows File Server integrado con Amazon S3",
          "Amazon S3 Glacier integrado con Amazon EBS",
          "Un bucket de S3 con un VPC endpoint integrado con un volumen EBS General Purpose SSD (gp2)"
        ],
        correctas: [0],
        explicacion: "FSx for Lustre es un sistema de archivos de alto rendimiento para HPC, integrado de forma nativa con S3 como almacenamiento persistente, y permite copiar datos on-premises hacia él. FSx for Windows es para cargas Windows/SMB, no Linux/HPC."
      },
      {
        pregunta: "Una empresa está construyendo una aplicación en contenedores on-premises y decide moverla a AWS. Tendrá miles de usuarios poco después de desplegarse. La empresa no sabe cómo gestionar el despliegue de contenedores a escala y necesita una arquitectura de alta disponibilidad que minimice el trabajo operativo. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Guardar las imágenes en un repositorio de Amazon ECR. Usar un clúster de Amazon ECS con AWS Fargate. Usar target tracking para escalar automáticamente.",
          "Guardar las imágenes en Amazon ECR. Usar un clúster ECS con tipo de lanzamiento EC2. Usar target tracking para escalar automáticamente.",
          "Guardar las imágenes en un repositorio que corre en una instancia EC2. Ejecutar los contenedores en instancias EC2 en varias AZ, monitorizando la CPU en CloudWatch.",
          "Crear una AMI de EC2 con la imagen del contenedor. Lanzar instancias en un Auto Scaling group en varias AZ, escalando con una alarma de CloudWatch sobre la CPU."
        ],
        correctas: [0],
        explicacion: "Fargate elimina la gestión de servidores/clústeres subyacentes (a diferencia del tipo de lanzamiento EC2), por lo que ECR + ECS + Fargate es la combinación gestionada estándar para contenedores a escala con el mínimo trabajo operativo."
      },
      {
        pregunta: "Una empresa tiene dos aplicaciones: una que envía mensajes con payloads a procesar y otra que los recibe y procesa. La emisora envía unos 1.000 mensajes por hora; los mensajes pueden tardar hasta 2 días en procesarse y, si fallan, deben conservarse sin afectar al procesamiento del resto. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Levantar una instancia EC2 con una base de datos Redis y configurar ambas aplicaciones para usarla.",
          "Usar un data stream de Amazon Kinesis para recibir los mensajes e integrar la aplicación de procesamiento con la Kinesis Client Library (KCL).",
          "Integrar ambas aplicaciones con una cola de Amazon SQS. Configurar una dead-letter queue para los mensajes que fallen.",
          "Suscribir la aplicación de procesamiento a un topic de Amazon SNS. Integrar la aplicación emisora para escribir en ese topic."
        ],
        correctas: [2],
        explicacion: "SQS con una dead-letter queue es el patrón estándar para desacoplar productores y consumidores, reteniendo los mensajes fallidos sin bloquear el resto de la cola. Kinesis está pensado para streaming en tiempo real de alto volumen, y SNS no retiene mensajes fallidos por sí solo."
      },
      {
        pregunta: "Un arquitecto de soluciones debe diseñar una solución con Amazon CloudFront y un origen S3 para alojar un sitio estático. La política de seguridad exige que todo el tráfico sea inspeccionado por AWS WAF. ¿Qué solución cumple este requisito?",
        opciones: [
          "Configurar una política de bucket de S3 que solo acepte peticiones desde el ARN de AWS WAF.",
          "Configurar CloudFront para reenviar todas las peticiones a AWS WAF antes de pedir contenido al origen S3.",
          "Configurar un grupo de seguridad que permita solo las IP de CloudFront hacia S3, y asociar AWS WAF a CloudFront.",
          "Configurar CloudFront y S3 para usar un origin access identity (OAI) que restrinja el acceso al bucket, y habilitar AWS WAF en la distribución."
        ],
        correctas: [3],
        explicacion: "El OAI impide el acceso directo al bucket (solo CloudFront puede leerlo) y WAF, habilitado en la distribución, inspecciona todo el tráfico entrante. S3 no admite grupos de seguridad ni políticas de bucket basadas en el ARN de WAF."
      },
      {
        pregunta: "Los organizadores de un evento global quieren publicar informes diarios como páginas HTML estáticas, con millones de visitas esperadas de todo el mundo. Los archivos están en un bucket de S3. ¿Qué acción debería tomar el arquitecto de soluciones?",
        opciones: [
          "Generar URLs prefirmadas para los archivos.",
          "Usar Cross-Region Replication hacia todas las regiones.",
          "Usar la característica de geoproximidad de Amazon Route 53.",
          "Usar Amazon CloudFront con el bucket de S3 como origen."
        ],
        correctas: [3],
        explicacion: "CloudFront cachea el contenido estático en ubicaciones edge de todo el mundo, sirviendo millones de vistas con baja latencia y descargando el origen. Replicar el bucket a todas las regiones es mucho más costoso y complejo, y las URLs prefirmadas no ayudan a escalar el reparto de tráfico."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación de producción en un grupo de instancias EC2 que lee de una cola de Amazon SQS y procesa los mensajes en paralelo. El volumen de mensajes es impredecible y con tráfico intermitente, y la aplicación debe procesar mensajes sin ninguna interrupción. ¿Qué solución es la MÁS económica?",
        opciones: [
          "Usar solo instancias Spot para cubrir la capacidad máxima necesaria.",
          "Usar solo instancias reservadas para cubrir la capacidad máxima necesaria.",
          "Usar instancias reservadas para la capacidad base y Spot para la capacidad adicional.",
          "Usar instancias reservadas para la capacidad base y bajo demanda (On-Demand) para la capacidad adicional."
        ],
        correctas: [2],
        explicacion: "Las reservadas cubren de forma económica la capacidad base constante, y las Spot añaden capacidad adicional a bajo coste para los picos; como el procesamiento es en paralelo y tolera interrupciones, Spot es más barato que On-Demand para esa parte variable. Usar solo Spot arriesga la disponibilidad continua exigida."
      },
      {
        pregunta: "Un equipo de seguridad quiere limitar el acceso a servicios o acciones concretas en todas las cuentas de su organización, gestionada con AWS Organizations. La solución debe ser escalable y tener un único punto donde mantener los permisos. ¿Qué debería hacer un arquitecto de soluciones?",
        opciones: [
          "Crear una ACL que dé acceso a los servicios o acciones.",
          "Crear un grupo de seguridad que permita las cuentas y asociarlo a grupos de usuarios.",
          "Crear roles entre cuentas en cada cuenta para denegar el acceso a los servicios o acciones.",
          "Crear una política de control de servicios (SCP) en la unidad organizativa raíz para denegar el acceso a esos servicios o acciones."
        ],
        correctas: [3],
        explicacion: "Una SCP en la raíz de la organización es un único punto de control centralizado que se hereda en todas las cuentas, cumpliendo el requisito de escalabilidad y gestión centralizada. Las ACL y los grupos de seguridad no existen a nivel de cuenta/organización para este propósito."
      },
      {
        pregunta: "Una empresa está preocupada por la seguridad de su aplicación web pública tras ataques recientes. La aplicación usa un Application Load Balancer (ALB). Un arquitecto de soluciones debe reducir el riesgo de ataques DDoS. ¿Qué debería hacer?",
        opciones: [
          "Añadir un agente de Amazon Inspector al ALB.",
          "Configurar Amazon Macie para prevenir ataques.",
          "Habilitar AWS Shield Advanced para prevenir ataques.",
          "Configurar Amazon GuardDuty para monitorizar el ALB."
        ],
        correctas: [2],
        explicacion: "AWS Shield Advanced ofrece protección avanzada frente a DDoS para recursos como el ALB, incluyendo mitigación automática y soporte del equipo de respuesta DDoS. Inspector analiza vulnerabilidades, Macie protege datos sensibles y GuardDuty detecta amenazas, pero ninguno mitiga DDoS."
      },
      {
        pregunta: "La aplicación web de una empresa corre en instancias EC2 detrás de un Application Load Balancer. Un cambio de política exige que solo se pueda acceder desde un país concreto. ¿Qué configuración cumple este requisito?",
        opciones: [
          "Configurar el grupo de seguridad de las instancias EC2.",
          "Configurar el grupo de seguridad del Application Load Balancer.",
          "Configurar AWS WAF en el Application Load Balancer, dentro de una VPC.",
          "Configurar la NACL de la subred que contiene las instancias EC2."
        ],
        correctas: [2],
        explicacion: "AWS WAF asociado al ALB permite reglas de geo-restricción para permitir el tráfico solo desde un país concreto. Los grupos de seguridad y las NACL filtran por IP/puerto, no por geolocalización."
      },
      {
        pregunta: "Una empresa ofrece una API a sus usuarios que automatiza consultas de cálculo de impuestos según precios de artículos. Solo experimenta más consultas (y respuestas más lentas) durante la temporada navideña. Necesita una solución escalable y elástica. ¿Qué debería hacer el arquitecto de soluciones?",
        opciones: [
          "Ofrecer una API alojada en una instancia EC2 que realice los cálculos al recibir la petición.",
          "Diseñar una API REST con Amazon API Gateway que acepte los nombres de artículo y los pase a AWS Lambda para el cálculo.",
          "Crear un Application Load Balancer con dos instancias EC2 detrás que calculen el impuesto.",
          "Diseñar una API REST con API Gateway que se conecte con una API alojada en una instancia EC2 para el cálculo."
        ],
        correctas: [1],
        explicacion: "API Gateway + Lambda escalan automáticamente y sin coste cuando no hay tráfico, ajustándose de forma elástica a los picos estacionales sin gestionar servidores. Las opciones basadas en EC2/ALB exigen aprovisionar y gestionar capacidad de forma constante."
      },
      {
        pregunta: "Un arquitecto de soluciones crea una nueva distribución de Amazon CloudFront para una aplicación. Parte de la información que envían los usuarios es sensible. La aplicación usa HTTPS pero necesita otra capa de seguridad: la información sensible debe protegerse a lo largo de toda la pila de la aplicación, y su acceso debe restringirse a determinadas aplicaciones. ¿Qué acción debería tomar?",
        opciones: [
          "Configurar una URL firmada de CloudFront.",
          "Configurar una cookie firmada de CloudFront.",
          "Configurar un perfil de cifrado a nivel de campo (field-level encryption) de CloudFront.",
          "Configurar CloudFront y poner la Origin Protocol Policy en HTTPS Only para la Viewer Protocol Policy."
        ],
        correctas: [2],
        explicacion: "El cifrado a nivel de campo cifra los campos sensibles ya en el edge de CloudFront, y solo las aplicaciones con la clave privada correspondiente pueden descifrarlos, protegiendo el dato a lo largo de toda la pila. Las URL/cookies firmadas controlan el acceso al contenido, no cifran campos concretos, y HTTPS Only ya se cumplía con el HTTPS existente."
      },
      {
        pregunta: "Una empresa de videojuegos aloja una aplicación en navegador en AWS. Sus usuarios consumen muchos vídeos e imágenes almacenados en S3, contenido igual para todos. Al crecer la popularidad con millones de usuarios globales, la empresa quiere servir los archivos reduciendo la carga sobre el origen, de la forma MÁS económica. ¿Qué solución cumple esto?",
        opciones: [
          "Desplegar un accelerator de AWS Global Accelerator delante de los servidores web.",
          "Desplegar una distribución web de Amazon CloudFront delante del bucket de S3.",
          "Desplegar una instancia de Amazon ElastiCache for Redis delante de los servidores web.",
          "Desplegar una instancia de Amazon ElastiCache for Memcached delante de los servidores web."
        ],
        correctas: [1],
        explicacion: "CloudFront cachea el contenido estático (vídeos/imágenes) en el edge, reduciendo drásticamente la carga sobre el bucket de origen para contenido idéntico para todos los usuarios. Global Accelerator no cachea, y ElastiCache está pensado para acelerar consultas a bases de datos, no para servir archivos estáticos."
      },
      {
        pregunta: "Una empresa tiene una aplicación multicapa con seis servidores web frontend en un Auto Scaling group dentro de una única zona de disponibilidad, detrás de un Application Load Balancer. Un arquitecto de soluciones debe hacerla altamente disponible sin modificar la aplicación. ¿Qué arquitectura debería elegir?",
        opciones: [
          "Crear un Auto Scaling group que use tres instancias en cada una de dos regiones.",
          "Modificar el Auto Scaling group para usar tres instancias en cada una de dos zonas de disponibilidad.",
          "Crear una plantilla de Auto Scaling para poder crear rápidamente más instancias en otra región.",
          "Cambiar el ALB a una configuración round-robin para repartir el tráfico a la capa web."
        ],
        correctas: [1],
        explicacion: "Repartir las instancias entre dos zonas de disponibilidad dentro de la misma región da alta disponibilidad sin cambios en la aplicación, frente a una arquitectura multi-región mucho más compleja. El ALB ya reparte el tráfico entre AZ de forma nativa."
      },
      {
        pregunta: "Una aplicación de ecommerce de procesamiento de pedidos usa Amazon API Gateway y una función Lambda, con datos en Amazon Aurora PostgreSQL. Durante un evento de ventas, algunos clientes sufrieron timeouts por el gran número de conexiones abiertas que elevó la CPU y memoria de la base de datos. Se necesita evitar los timeouts con el mínimo cambio posible en la aplicación. ¿Qué solución cumple esto?",
        opciones: [
          "Configurar concurrencia aprovisionada para la función Lambda y convertir la base de datos en una base de datos global en varias regiones.",
          "Usar Amazon RDS Proxy para crear un proxy delante de la base de datos, y modificar la función Lambda para usar el endpoint del proxy.",
          "Crear una réplica de lectura de la base de datos en otra región y enrutar tráfico a ella con parámetros de consulta en API Gateway.",
          "Migrar los datos de Aurora PostgreSQL a Amazon DynamoDB con AWS DMS y modificar la función Lambda para usar la tabla."
        ],
        correctas: [1],
        explicacion: "RDS Proxy agrupa (pool) y gestiona las conexiones a la base de datos, evitando el agotamiento de conexiones que causaba los timeouts, con un cambio mínimo (solo el endpoint al que apunta Lambda). Las demás opciones no atacan el problema real o exigen cambios mucho mayores."
      },
      {
        pregunta: "Una aplicación corre en instancias EC2 en subredes privadas y necesita acceder a una tabla de Amazon DynamoDB. ¿Cuál es la forma MÁS segura de acceder a la tabla asegurando que el tráfico no sale de la red de AWS?",
        opciones: [
          "Usar un VPC endpoint para DynamoDB.",
          "Usar un NAT Gateway en una subred pública.",
          "Usar una instancia NAT en una subred privada.",
          "Usar el Internet Gateway asociado a la VPC."
        ],
        correctas: [0],
        explicacion: "El VPC endpoint (Gateway Endpoint) para DynamoDB mantiene el tráfico dentro de la red de AWS sin pasar por internet. Las opciones NAT/IGW sacan el tráfico hacia internet, lo cual es menos seguro y no cumple el requisito."
      },
      {
        pregunta: "Una empresa de entretenimiento usa Amazon DynamoDB para guardar metadatos multimedia. La aplicación es intensiva en lectura y sufre retrasos. La empresa no tiene personal para asumir más carga operativa y necesita mejorar el rendimiento de DynamoDB sin reconfigurar la aplicación. ¿Qué debería recomendar un arquitecto de soluciones?",
        opciones: [
          "Usar Amazon ElastiCache for Redis.",
          "Usar Amazon DynamoDB Accelerator (DAX).",
          "Replicar los datos con DynamoDB Global Tables.",
          "Usar Amazon ElastiCache for Memcached con Auto Discovery."
        ],
        correctas: [1],
        explicacion: "DAX es una caché en memoria totalmente gestionada específica para DynamoDB, compatible con la misma API, por lo que mejora la latencia de lectura sin reconfigurar la aplicación. ElastiCache exigiría cambiar el código para usar una API distinta, y Global Tables replica entre regiones, no mejora la latencia de lectura local."
      },
      {
        pregunta: "La infraestructura de una empresa consiste en instancias EC2 y una instancia de base de datos Amazon RDS en una única región de AWS. La empresa quiere respaldar sus datos en una región distinta, con el MÍNIMO trabajo operativo. ¿Qué solución cumple este requisito?",
        opciones: [
          "Usar AWS Backup para copiar las copias de seguridad de EC2 y de RDS a la región separada.",
          "Usar Amazon Data Lifecycle Manager (Amazon DLM) para copiar las copias de seguridad de EC2 y de RDS a la región separada.",
          "Crear AMI de las instancias EC2, copiarlas a la región separada, y crear una réplica de lectura de la base de datos RDS en esa región.",
          "Crear snapshots de EBS y de RDS, exportar los de RDS a S3 y configurar Cross-Region Replication (CRR) hacia la región separada."
        ],
        correctas: [0],
        explicacion: "AWS Backup gestiona de forma centralizada y automática las copias de EC2 y RDS, incluida su copia entre regiones, en un único servicio. Amazon DLM no gestiona copias de RDS, solo de EBS/EC2, y las demás opciones exigen pasos manuales adicionales con mucho más trabajo operativo."
      },
      {
        pregunta: "Un arquitecto de soluciones necesita guardar de forma segura el usuario y la contraseña de una base de datos que usa una aplicación para acceder a una instancia de Amazon RDS. La aplicación corre en una instancia EC2, y se quiere crear un parámetro seguro en AWS Systems Manager Parameter Store. ¿Qué debería hacer para cumplir este requisito?",
        opciones: [
          "Crear un rol de IAM con acceso de lectura al parámetro y acceso Decrypt a la clave de KMS que lo cifra, y asignar ese rol a la instancia EC2.",
          "Crear una política de IAM que permita el acceso de lectura al parámetro y Decrypt a la clave de KMS, y asignar esa política a la instancia EC2.",
          "Crear una relación de confianza de IAM entre el parámetro y la instancia EC2, especificando Amazon RDS como principal.",
          "Crear una relación de confianza de IAM entre la instancia de base de datos y la instancia EC2, especificando Systems Manager como principal."
        ],
        correctas: [0],
        explicacion: "Un rol de IAM con permisos de lectura sobre el parámetro y de Decrypt sobre la clave de KMS, asignado a la instancia vía perfil de instancia, es el patrón correcto. Las políticas no se asignan directamente a una instancia EC2 (se asignan a roles), y las opciones C y D inventan relaciones de confianza que no existen en este contexto."
      },
      {
        pregunta: "Una empresa diseña una plataforma de comunicaciones basada en API. La aplicación corre en instancias EC2 detrás de un Network Load Balancer (NLB) y usa Amazon API Gateway para el acceso externo. Quiere proteger la plataforma frente a exploits web como inyección SQL y también detectar y mitigar ataques DDoS grandes y sofisticados. ¿Qué combinación de soluciones ofrece la MAYOR protección? (Elige dos.)",
        opciones: [
          "Usar AWS WAF para proteger el NLB.",
          "Usar AWS Shield Advanced con el NLB.",
          "Usar AWS WAF para proteger Amazon API Gateway.",
          "Usar Amazon GuardDuty con AWS Shield Standard.",
          "Usar AWS Shield Standard con Amazon API Gateway."
        ],
        correctas: [1, 2],
        explicacion: "AWS WAF no puede asociarse directamente a un NLB (opera en capa 4, sin inspección HTTP), así que la protección DDoS del NLB se hace con Shield Advanced. Amazon API Gateway sí admite WAF directamente para bloquear ataques a nivel de aplicación como la inyección SQL."
      },
      {
        pregunta: "Una empresa tiene una aplicación heredada de procesamiento de datos por lotes en instancias EC2. Los datos se procesan secuencialmente, pero el orden de los resultados no importa. La única forma de escalarla es aumentar el tamaño de las instancias. Los desarrolladores deciden reescribirla como microservicios sobre Amazon ECS. ¿Qué debería recomendar un arquitecto de soluciones para la comunicación entre los microservicios?",
        opciones: [
          "Crear una cola de Amazon SQS. Añadir código a los productores para enviar datos a la cola, y a los consumidores para procesarlos desde la cola.",
          "Crear un topic de Amazon SNS. Añadir código a los productores para publicar notificaciones, y a los consumidores para suscribirse.",
          "Crear una función de AWS Lambda para pasar mensajes entre productores y consumidores.",
          "Crear una tabla de DynamoDB con Streams habilitado. Los productores insertan datos y los consumidores detectan nuevas entradas vía la API de Streams."
        ],
        correctas: [0],
        explicacion: "SQS desacopla productores y consumidores con una cola duradera, ideal cuando el orden de procesamiento no importa y se necesita escalar de forma sencilla y económica. SNS difunde a varios suscriptores a la vez en lugar de repartir trabajo, y Lambda o DynamoDB Streams añaden complejidad innecesaria para este patrón productor-consumidor simple."
      },
      {
        pregunta: "Una empresa quiere migrar su base de datos MySQL on-premises a AWS. Tras sufrir una interrupción que afectó gravemente al negocio, quiere una solución fiable que minimice la pérdida de datos y guarde cada transacción en al menos dos nodos. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Crear una instancia de Amazon RDS con replicación síncrona a tres nodos en tres zonas de disponibilidad.",
          "Crear una instancia de Amazon RDS MySQL con Multi-AZ habilitado, que replica los datos de forma síncrona.",
          "Crear una instancia de Amazon RDS MySQL y una réplica de lectura en otra región, que replica los datos de forma síncrona.",
          "Crear una instancia EC2 con MySQL que dispare una función Lambda para replicar los datos de forma síncrona hacia una instancia RDS MySQL."
        ],
        correctas: [1],
        explicacion: "RDS Multi-AZ replica de forma síncrona hacia una instancia en espera en otra AZ, guardando cada transacción en al menos dos nodos y minimizando la pérdida de datos con failover automático. Las réplicas de lectura entre regiones replican de forma asíncrona, no síncrona, así que no cumplen el requisito."
      },
      {
        pregunta: "Una empresa está construyendo un nuevo sitio web de pedidos dinámico. Quiere minimizar el mantenimiento y los parches de servidor. El sitio debe ser altamente disponible y escalar la capacidad de lectura y escritura lo más rápido posible ante cambios en la demanda. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Alojar el contenido estático en S3, el dinámico con API Gateway y Lambda, DynamoDB con capacidad bajo demanda, y CloudFront para entregar el contenido.",
          "Alojar el contenido estático en S3, el dinámico con API Gateway y Lambda, Aurora con Aurora Auto Scaling, y CloudFront para entregar el contenido.",
          "Alojar todo el contenido en instancias EC2 con Auto Scaling y Application Load Balancer, y DynamoDB con capacidad de escritura aprovisionada.",
          "Alojar todo el contenido en instancias EC2 con Auto Scaling y Application Load Balancer, y Aurora con Aurora Auto Scaling."
        ],
        correctas: [0],
        explicacion: "La combinación serverless (S3 + API Gateway + Lambda + DynamoDB bajo demanda + CloudFront) no requiere gestionar ni parchear servidores, y DynamoDB en modo bajo demanda escala lectura/escritura al instante según el tráfico. Aurora Auto Scaling escala más lento (añadiendo réplicas), y las opciones basadas en EC2 exigen mantenimiento de servidores."
      },
      {
        pregunta: "Una empresa tiene una cuenta de AWS de ingeniería de software, con acceso a su centro de datos on-premises mediante un par de conexiones de AWS Direct Connect (todo el tráfico no destinado a una VPC se enruta al virtual private gateway). Un equipo creó una función Lambda desde la consola y necesita que acceda a una base de datos en una subred privada del centro de datos. ¿Qué solución cumple este requisito?",
        opciones: [
          "Configurar la función Lambda para que se ejecute dentro de la VPC, con el grupo de seguridad apropiado.",
          "Establecer una conexión VPN entre AWS y el centro de datos, y enrutar el tráfico de la función Lambda a través de la VPN.",
          "Actualizar las tablas de rutas de la VPC para permitir que la función Lambda acceda al centro de datos a través de Direct Connect.",
          "Crear una dirección IP elástica y configurar la función Lambda para enviar tráfico a través de ella sin una interfaz de red elástica."
        ],
        correctas: [0],
        explicacion: "Una función Lambda creada desde la consola no está conectada a ninguna VPC por defecto: corre en la red gestionada por AWS y no puede llegar a recursos privados on-premises. Hay que configurarla para que se ejecute dentro de la VPC, de modo que use las rutas ya existentes hacia el virtual private gateway y Direct Connect. Las demás opciones no resuelven el problema real: que Lambda no está en la VPC."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación con Amazon ECS que crea versiones redimensionadas de una imagen y luego hace llamadas a la API de S3 para guardarlas. ¿Cómo puede un arquitecto de soluciones asegurar que la aplicación tiene permiso para acceder a S3?",
        opciones: [
          "Actualizar el rol de S3 en IAM para permitir acceso de lectura/escritura desde Amazon ECS y volver a lanzar el contenedor.",
          "Crear un rol de IAM con permisos de S3 y especificarlo como el taskRoleArn en la definición de la tarea.",
          "Crear un grupo de seguridad que permita el acceso de Amazon ECS a S3 y actualizar la configuración de lanzamiento del clúster.",
          "Crear un usuario de IAM con permisos de S3 y volver a lanzar las instancias EC2 del clúster con la sesión de esa cuenta iniciada."
        ],
        correctas: [1],
        explicacion: "El taskRoleArn de la definición de tarea de ECS es el mecanismo estándar para dar permisos de IAM a los contenedores de una tarea concreta. Los grupos de seguridad no controlan permisos de API, y usar un usuario de IAM con credenciales de larga duración va contra las buenas prácticas."
      },
      {
        pregunta: "Una empresa tiene una aplicación basada en Windows que debe migrarse a AWS. Requiere un sistema de archivos Windows compartido, conectado a varias instancias EC2 Windows desplegadas en varias zonas de disponibilidad. ¿Qué debería hacer un arquitecto de soluciones para cumplir este requisito?",
        opciones: [
          "Configurar AWS Storage Gateway en modo volume gateway. Montar el volumen en cada instancia Windows.",
          "Configurar Amazon FSx for Windows File Server. Montar el sistema de archivos FSx en cada instancia Windows.",
          "Configurar un sistema de archivos con Amazon Elastic File System (Amazon EFS). Montarlo en cada instancia Windows.",
          "Configurar un volumen de Amazon EBS del tamaño necesario. Conectar cada instancia EC2 al volumen y montar el sistema de archivos."
        ],
        correctas: [1],
        explicacion: "Amazon FSx for Windows File Server ofrece un sistema de archivos Windows totalmente gestionado, accesible por SMB desde múltiples instancias EC2 Windows a la vez, con alta disponibilidad e integración con Active Directory. EFS usa NFS (Linux), no SMB, y EBS no puede montarse en múltiples instancias como sistema de archivos compartido."
      },
      {
        pregunta: "Una empresa desarrolla una aplicación de ecommerce con un frontend balanceado, una aplicación en contenedores y una base de datos relacional. Necesita una solución de alta disponibilidad con la mínima intervención manual posible. ¿Qué soluciones cumplen estos requisitos? (Elige dos.)",
        opciones: [
          "Crear una instancia de Amazon RDS en modo Multi-AZ.",
          "Crear una instancia de Amazon RDS y una o más réplicas en otra zona de disponibilidad.",
          "Crear un clúster de Docker basado en instancias EC2 para gestionar la carga dinámica de la aplicación.",
          "Crear un clúster de Amazon ECS con tipo de lanzamiento Fargate para gestionar la carga dinámica de la aplicación.",
          "Crear un clúster de Amazon ECS con tipo de lanzamiento EC2 para gestionar la carga dinámica de la aplicación."
        ],
        correctas: [0, 3],
        explicacion: "RDS Multi-AZ da alta disponibilidad con failover automático sin intervención manual, y Fargate elimina la gestión de servidores del clúster de contenedores, cumpliendo ambos la mínima intervención manual. Los clústeres basados en EC2 (C, E) exigen gestionar y parchear los servidores subyacentes."
      },
      {
        pregunta: "Una empresa usa Amazon S3 como su data lake y tiene un nuevo socio que debe subir archivos de datos por SFTP. Se necesita una solución SFTP altamente disponible que minimice el trabajo operativo. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar AWS Transfer Family para configurar un servidor SFTP con un endpoint de acceso público, usando el data lake de S3 como destino.",
          "Usar Amazon S3 File Gateway como servidor SFTP y compartir su endpoint con el nuevo socio.",
          "Lanzar una instancia EC2 en una subred privada de una VPC; el socio sube archivos por VPN y un cron job los sube al data lake de S3.",
          "Lanzar instancias EC2 en una subred privada con un Network Load Balancer y un listener SFTP; un cron job sube los archivos al data lake."
        ],
        correctas: [0],
        explicacion: "AWS Transfer Family es un servicio SFTP totalmente gestionado que entrega directamente a S3, con alta disponibilidad y sin servidores que mantener. Las demás opciones exigen gestionar instancias EC2, scripts de cron y balanceadores por cuenta propia."
      },
      {
        pregunta: "Una empresa necesita guardar documentos de contrato durante 5 años, sin que puedan sobrescribirse ni eliminarse en ese período, y cifrados en reposo con rotación automática anual de la clave de cifrado. ¿Qué combinación de pasos cumple estos requisitos con el MENOR trabajo operativo? (Elige dos.)",
        opciones: [
          "Guardar los documentos en S3. Usar S3 Object Lock en modo governance.",
          "Guardar los documentos en S3. Usar S3 Object Lock en modo compliance.",
          "Usar cifrado del lado del servidor con claves administradas por Amazon S3 (SSE-S3). Configurar la rotación de claves.",
          "Usar cifrado del lado del servidor con una clave administrada por el cliente de AWS KMS. Configurar la rotación de claves.",
          "Usar cifrado del lado del servidor con una clave de KMS con material de clave importado (customer provided). Configurar la rotación de claves."
        ],
        correctas: [1, 3],
        explicacion: "El modo compliance de S3 Object Lock impide de verdad que se sobrescriban o eliminen los documentos durante el período de retención (el modo governance puede saltarse con permisos especiales). Una clave administrada por el cliente en KMS admite activar la rotación automática anual; SSE-S3 no permite configurar tú la rotación, y las claves con material importado no admiten rotación automática."
      },
      {
        pregunta: "Una empresa tiene una aplicación web basada en Java y PHP que planea mover de on-premises a AWS. Necesita poder probar nuevas funcionalidades del sitio con frecuencia, además de una solución gestionada y altamente disponible con el mínimo trabajo operativo. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Crear un bucket de S3 con alojamiento web estático y usar AWS Lambda para todo el contenido dinámico.",
          "Desplegar la aplicación en un entorno de AWS Elastic Beanstalk. Usar el intercambio de URL (URL swapping) entre varios entornos de Elastic Beanstalk para probar funcionalidades.",
          "Desplegar la aplicación en instancias EC2 con Java y PHP, usando Auto Scaling groups y un Application Load Balancer.",
          "Poner la aplicación en contenedores desplegados en instancias EC2, usando el AWS Load Balancer Controller para enrutar tráfico entre contenedores en pruebas."
        ],
        correctas: [1],
        explicacion: "Elastic Beanstalk gestiona la infraestructura por ti (alta disponibilidad, parches) y el intercambio de URL entre entornos permite probar nuevas funcionalidades (despliegue azul-verde) sin afectar a producción, sin necesidad de reescribir la aplicación Java/PHP existente."
      },
      {
        pregunta: "Una aplicación de pedidos guarda información de clientes en Amazon RDS for MySQL. Durante el horario laboral, los empleados ejecutan consultas puntuales de informes que provocan timeouts en el procesamiento de pedidos porque tardan mucho en ejecutarse. Hay que eliminar los timeouts sin impedir que los empleados sigan consultando. ¿Qué debería hacer un arquitecto de soluciones?",
        opciones: [
          "Crear una réplica de lectura y mover las consultas de informes a la réplica.",
          "Crear una réplica de lectura y repartir la aplicación de pedidos entre la instancia principal y la réplica.",
          "Migrar la aplicación de pedidos a Amazon DynamoDB con capacidad bajo demanda.",
          "Programar las consultas de informes para las horas de menor actividad."
        ],
        correctas: [0],
        explicacion: "Una réplica de lectura permite ejecutar las consultas de informes sin competir por recursos con la instancia principal que procesa los pedidos, eliminando los timeouts sin impedir que los empleados sigan consultando en cualquier momento."
      },
      {
        pregunta: "Un hospital quiere digitalizar su gran colección de registros históricos escritos, añadiendo cientos de documentos nuevos cada día. Necesita analizar los documentos, extraer la información médica y guardarlos de forma que una aplicación pueda ejecutar consultas SQL sobre los datos, maximizando la escalabilidad y la eficiencia operativa. ¿Qué combinación de pasos cumple estos requisitos? (Elige dos.)",
        opciones: [
          "Escribir la información de los documentos en una instancia EC2 que ejecute una base de datos MySQL.",
          "Escribir la información de los documentos en un bucket de S3. Usar Amazon Athena para consultar los datos.",
          "Crear un Auto Scaling group de instancias EC2 para ejecutar una aplicación propia que procese los archivos escaneados.",
          "Crear una función Lambda que se dispare al subir nuevos documentos, use Amazon Rekognition para convertirlos a texto y Amazon Transcribe Medical para extraer la información médica.",
          "Crear una función Lambda que se dispare al subir nuevos documentos, use Amazon Textract para convertirlos a texto y Amazon Comprehend Medical para extraer la información médica."
        ],
        correctas: [1, 4],
        explicacion: "Guardar en S3 y consultar con Athena da almacenamiento escalable con SQL sin servidores que gestionar. Amazon Textract (OCR de documentos) extrae el texto de los documentos escaneados, y Comprehend Medical detecta y extrae entidades médicas de ese texto; Rekognition es para imágenes/vídeo y Transcribe Medical para audio, no encajan aquí."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación por lotes en instancias EC2 con un backend de varias bases de datos Amazon RDS. La aplicación provoca un alto número de lecturas en las bases de datos. Se necesita reducir las lecturas manteniendo la alta disponibilidad. ¿Qué debería hacer el arquitecto de soluciones?",
        opciones: [
          "Añadir réplicas de lectura de Amazon RDS.",
          "Usar Amazon ElastiCache for Redis.",
          "Usar el almacenamiento en caché DNS de Amazon Route 53.",
          "Usar Amazon ElastiCache for Memcached."
        ],
        correctas: [1],
        explicacion: "ElastiCache for Redis añade una capa de caché que reduce directamente el número de lecturas que llegan a las bases de datos (sirviendo las consultas repetidas desde memoria), y admite replicación Multi-AZ para alta disponibilidad. Memcached no ofrece replicación/persistencia, y el caché DNS de Route 53 no tiene relación con las consultas a la base de datos."
      },
      {
        pregunta: "Una empresa necesita ejecutar una aplicación crítica en AWS usando Amazon EC2 para la base de datos. La base de datos debe ser altamente disponible y conmutar automáticamente si ocurre un evento disruptivo. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Lanzar dos instancias EC2, cada una en una zona de disponibilidad distinta de la misma región. Instalar la base de datos en ambas, configurarlas como clúster y activar la replicación.",
          "Lanzar una instancia EC2 en una zona de disponibilidad. Instalar la base de datos y usar una AMI para respaldar los datos, con AWS CloudFormation para reaprovisionar la instancia si ocurre un evento disruptivo.",
          "Lanzar dos instancias EC2 en dos regiones de AWS distintas. Instalar la base de datos en ambas, activar la replicación y conmutar a la segunda región.",
          "Lanzar una instancia EC2 en una zona de disponibilidad. Instalar la base de datos y usar una AMI para respaldar los datos, con la recuperación automática de EC2 para recuperar la instancia."
        ],
        correctas: [0],
        explicacion: "Dos instancias EC2 en distintas zonas de disponibilidad de la misma región, en clúster con replicación de base de datos, ofrecen alta disponibilidad real con conmutación automática entre AZ. Las opciones basadas en AMI y reaprovisionamiento (B, D) son de recuperación, no de conmutación automática inmediata, y la opción multi-región (C) añade complejidad y latencia innecesarias."
      },
      {
        pregunta: "El sistema de pedidos de una empresa envía peticiones desde clientes a instancias EC2, que las procesan y las guardan en una base de datos Amazon RDS. Los usuarios deben reprocesar los pedidos cuando el sistema falla. Se quiere una solución resiliente que procese los pedidos automáticamente si ocurre una interrupción. ¿Qué debería hacer un arquitecto de soluciones?",
        opciones: [
          "Mover las instancias EC2 a un Auto Scaling group. Crear una regla de Amazon EventBridge que apunte a una tarea de Amazon ECS.",
          "Mover las instancias EC2 a un Auto Scaling group detrás de un Application Load Balancer (ALB). Enviar los mensajes al endpoint del ALB.",
          "Mover las instancias EC2 a un Auto Scaling group. Enviar los pedidos a una cola de Amazon SQS y hacer que las instancias EC2 consuman los mensajes de la cola.",
          "Crear un topic de Amazon SNS y una función Lambda suscrita a él. Enviar los pedidos al topic y procesarlos con Systems Manager Run Command en las instancias EC2."
        ],
        correctas: [2],
        explicacion: "Desacoplar con una cola de SQS asegura que los pedidos persisten de forma duradera aunque las instancias fallen o se reinicien: al volver, siguen consumiendo desde la cola sin perder ni tener que reprocesar manualmente los pedidos. Las demás opciones no ofrecen esa persistencia duradera del pedido ante un fallo."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación en un gran número de instancias EC2 que leen y escriben en una tabla de Amazon DynamoDB. El tamaño de la tabla crece continuamente, pero la aplicación solo necesita los datos de los últimos 30 días. Se necesita una solución que minimice el coste y el esfuerzo de desarrollo. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar una plantilla de AWS CloudFormation para desplegar la solución completa y redesplegarla cada 30 días, eliminando la pila original.",
          "Usar una instancia EC2 que ejecute una aplicación de monitorización de AWS Marketplace, con DynamoDB Streams para registrar cuándo se crea un elemento, y un script que borre los elementos con más de 30 días.",
          "Configurar DynamoDB Streams para invocar una función Lambda al crear un nuevo elemento. La función Lambda borra los elementos con más de 30 días.",
          "Añadir un atributo con el valor del timestamp actual más 30 días a cada elemento nuevo, y configurar DynamoDB para usar ese atributo como atributo TTL."
        ],
        correctas: [3],
        explicacion: "El TTL (Time to Live) nativo de DynamoDB borra automáticamente los elementos caducados sin coste adicional de cómputo ni código que mantener: es la solución con menos coste y esfuerzo de desarrollo. Las demás opciones exigen infraestructura o código adicional (Lambda, EC2, CloudFormation) para lograr lo mismo."
      },
      {
        pregunta: "Una empresa tiene una aplicación .NET on-premises en Windows Server que guarda datos en un servidor Oracle Database Standard Edition. Planea migrar a AWS minimizando los cambios de desarrollo, con un entorno de aplicación altamente disponible. ¿Qué combinación de acciones cumple estos requisitos? (Elige dos.)",
        opciones: [
          "Refactorizar la aplicación como serverless con funciones de AWS Lambda que ejecuten .NET Core.",
          "Rehost la aplicación en AWS Elastic Beanstalk con la plataforma .NET en un despliegue Multi-AZ.",
          "Replatform la aplicación para que corra en Amazon EC2 con la AMI de Amazon Linux.",
          "Usar AWS Database Migration Service (AWS DMS) para migrar de Oracle a Amazon DynamoDB en un despliegue Multi-AZ.",
          "Usar AWS Database Migration Service (AWS DMS) para migrar de Oracle a Oracle en Amazon RDS, en un despliegue Multi-AZ."
        ],
        correctas: [1, 4],
        explicacion: "Rehost en Elastic Beanstalk con la plataforma .NET en Multi-AZ da alta disponibilidad sin apenas cambios de desarrollo, y migrar con DMS de Oracle a Oracle en RDS Multi-AZ mantiene el mismo motor de base de datos (sin reescribir consultas) con alta disponibilidad. Refactorizar a serverless o migrar a DynamoDB exigiría reescribir la aplicación y las consultas, y replatform a Amazon Linux no resuelve la base de datos."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación en contenedores sobre un clúster de Kubernetes on-premises, con una base de datos MongoDB. Quiere migrar parte de estos entornos a AWS sin cambios de código ni de método de despliegue, minimizando el trabajo operativo. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar Amazon ECS con nodos worker EC2 para el cómputo y MongoDB en EC2 para el almacenamiento.",
          "Usar Amazon ECS con AWS Fargate para el cómputo y Amazon DynamoDB para el almacenamiento.",
          "Usar Amazon EKS con nodos worker EC2 para el cómputo y Amazon DynamoDB para el almacenamiento.",
          "Usar Amazon EKS con AWS Fargate para el cómputo y Amazon DocumentDB (compatible con MongoDB) para el almacenamiento."
        ],
        correctas: [3],
        explicacion: "Amazon EKS es compatible con la API de Kubernetes (sin cambiar manifiestos ni herramientas de despliegue) y, con Fargate, no hay nodos que gestionar. Amazon DocumentDB es compatible con la API de MongoDB, por lo que la aplicación no necesita cambios de código. ECS (A, B) no es Kubernetes, y DynamoDB (B, C) no es compatible con la API de MongoDB."
      },
      {
        pregunta: "Una empresa de telemarketing diseña la funcionalidad de su centro de llamadas en AWS. Necesita reconocimiento de múltiples interlocutores y generación de transcripciones, poder consultar las transcripciones para analizar patrones de negocio, y conservarlas 7 años por motivos de auditoría. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar Amazon Rekognition para el reconocimiento de interlocutores. Guardar las transcripciones en S3 y usar modelos de machine learning para analizarlas.",
          "Usar Amazon Transcribe para el reconocimiento de múltiples interlocutores. Usar Amazon Athena para analizar las transcripciones.",
          "Usar Amazon Translate para el reconocimiento de interlocutores. Guardar las transcripciones en Amazon Redshift y usar SQL para analizarlas.",
          "Usar Amazon Rekognition para el reconocimiento de interlocutores. Guardar las transcripciones en S3 y usar Amazon Textract para analizarlas."
        ],
        correctas: [1],
        explicacion: "Amazon Transcribe es el servicio de voz a texto con reconocimiento de múltiples interlocutores (speaker diarization); guardando las transcripciones en S3, Athena permite consultarlas con SQL para analizar patrones. Rekognition es para imágenes/vídeo y Translate para traducción: ninguno transcribe ni identifica interlocutores en audio."
      },
      {
        pregunta: "Una empresa aloja su aplicación en AWS y usa Amazon Cognito para gestionar usuarios. Al iniciar sesión, la aplicación obtiene datos de Amazon DynamoDB mediante una API REST alojada en Amazon API Gateway. La empresa quiere una solución gestionada por AWS que controle el acceso a la API REST reduciendo el esfuerzo de desarrollo. ¿Qué solución cumple esto con el MENOR trabajo operativo?",
        opciones: [
          "Configurar una función de AWS Lambda como autorizador en API Gateway para validar qué usuario hizo la petición.",
          "Crear y asignar una clave de API a cada usuario, que debe enviarse con cada petición, validándola con una función Lambda.",
          "Enviar el correo del usuario en la cabecera de cada petición e invocar una función Lambda para validar su acceso.",
          "Configurar un autorizador de grupo de usuarios (user pool) de Amazon Cognito en API Gateway para que Cognito valide cada petición."
        ],
        correctas: [3],
        explicacion: "El autorizador de Cognito user pool en API Gateway es una integración nativa y totalmente gestionada: valida el token del usuario directamente sin escribir ni mantener código propio de autorización, a diferencia de las soluciones basadas en un autorizador Lambda personalizado."
      },
      {
        pregunta: "Una empresa desarrolla un servicio de comunicaciones de marketing dirigido a usuarios de una app móvil. Necesita enviar mensajes de confirmación por SMS a los que los usuarios puedan responder, y guardar las respuestas durante un año para su análisis. ¿Qué debería hacer un arquitecto de soluciones para cumplir estos requisitos?",
        opciones: [
          "Crear un flujo de contacto de Amazon Connect para enviar los SMS y usar AWS Lambda para procesar las respuestas.",
          "Crear un journey de Amazon Pinpoint y configurarlo para enviar los eventos a un data stream de Amazon Kinesis para su análisis y archivo.",
          "Usar Amazon SQS para distribuir los mensajes SMS y AWS Lambda para procesar las respuestas.",
          "Crear un topic FIFO de Amazon SNS y suscribir un data stream de Kinesis al topic para su análisis y archivo."
        ],
        correctas: [1],
        explicacion: "Amazon Pinpoint está pensado precisamente para campañas de mensajería multicanal (incluido SMS bidireccional) y sus journeys pueden enviar los eventos de respuesta a un data stream de Kinesis, que sirve tanto para analizarlos como para archivarlos el año exigido. Connect (A) es para centros de contacto de voz/chat, no encaja como servicio de campañas SMS, y SNS (D) no admite responder a los SMS enviados."
      },
      {
        pregunta: "Una empresa planea mover sus datos a un bucket de Amazon S3. Los datos deben cifrarse al guardarse en el bucket, y la clave de cifrado debe rotar automáticamente cada año. ¿Qué solución cumple estos requisitos con el MENOR trabajo operativo?",
        opciones: [
          "Mover los datos al bucket usando cifrado del lado del servidor con claves administradas por Amazon S3 (SSE-S3) y su rotación integrada.",
          "Crear una clave administrada por el cliente de AWS KMS, activar la rotación automática, configurar el cifrado por defecto del bucket para usar esa clave, y mover los datos.",
          "Crear una clave administrada por el cliente de AWS KMS, configurar el cifrado por defecto del bucket para usarla, mover los datos y rotar la clave manualmente cada año.",
          "Cifrar los datos con material de clave del cliente antes de moverlos al bucket. Crear una clave de KMS sin material de clave, importar el material del cliente y activar la rotación automática."
        ],
        correctas: [1],
        explicacion: "Una clave administrada por el cliente en AWS KMS con rotación automática activada gira la clave cada año sin ninguna intervención manual, y basta con configurarla como clave de cifrado por defecto del bucket. Rotar manualmente (C) añade trabajo operativo recurrente, y las claves con material importado (D) no admiten rotación automática."
      }
    ]
  }
  ,
  {
    id: "examen-05",
    titulo: "Examen de práctica 5",
    resumen: "50 preguntas tipo test sobre desacoplamiento con SQS, data lakes, DR, cifrado, Route 53, IAM entre cuentas, EKS, RDS y optimización de costes, con respuesta correcta y explicación.",
    preguntas: [
      {
        pregunta: "Los clientes de una empresa financiera piden citas con asesores enviando SMS. Una aplicación web en instancias EC2 acepta las peticiones y las publica en una cola de Amazon SQS. Otra aplicación en EC2 envía las invitaciones y confirmaciones por correo, y guarda la información de la cita en Amazon DynamoDB. Al crecer la empresa, las invitaciones tardan cada vez más en llegar. ¿Qué debería recomendar un arquitecto de soluciones para resolver esto?",
        opciones: [
          "Añadir un clúster de DynamoDB Accelerator (DAX) delante de la base de datos DynamoDB.",
          "Añadir una API de Amazon API Gateway delante de la aplicación web que acepta las peticiones de citas.",
          "Añadir una distribución de Amazon CloudFront con origen en la aplicación web que acepta las peticiones de citas.",
          "Añadir un Auto Scaling group para la aplicación que envía las invitaciones, configurado para escalar según la profundidad de la cola SQS."
        ],
        correctas: [3],
        explicacion: "El cuello de botella está en la aplicación que envía las invitaciones, no en la ingesta de peticiones. Escalar su Auto Scaling group según la profundidad (el tamaño) de la cola SQS permite añadir capacidad automáticamente cuando se acumulan mensajes, acelerando el envío. DAX o CloudFront no atacan el problema real."
      },
      {
        pregunta: "Una empresa de retail online tiene más de 50 millones de clientes activos y recibe más de 25.000 pedidos al día. Guarda los datos de compra en Amazon S3 y otros datos de cliente en Amazon RDS. Quiere poner todos los datos a disposición de varios equipos para analítica, con permisos granulares y el mínimo trabajo operativo. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Migrar los datos de compra para que se escriban directamente en Amazon RDS. Usar los controles de acceso de RDS para limitar el acceso.",
          "Programar una función Lambda que copie periódicamente datos de RDS a S3. Crear un rastreador de AWS Glue y consultar con Amazon Athena. Usar políticas de S3 para limitar el acceso.",
          "Crear un data lake con AWS Lake Formation. Crear una conexión JDBC de AWS Glue a Amazon RDS. Registrar el bucket de S3 en Lake Formation. Usar los controles de acceso de Lake Formation para limitar el acceso.",
          "Crear un clúster de Amazon Redshift. Programar una función Lambda que copie periódicamente datos de S3 y RDS a Redshift. Usar los controles de acceso de Redshift para limitar el acceso."
        ],
        correctas: [2],
        explicacion: "Lake Formation centraliza permisos granulares sobre un data lake que combina datos de S3 y de RDS (vía Glue), con el mínimo trabajo operativo al no tener que mover ni duplicar los datos a otro almacén como Redshift."
      },
      {
        pregunta: "Una empresa aloja un sitio web de marketing en su centro de datos on-premises: documentos estáticos en un único servidor, actualizados poco a menudo por SFTP. Decide alojar el sitio en AWS usando Amazon CloudFront. ¿Qué solución da la arquitectura más económica y resiliente para servir de origen a CloudFront?",
        opciones: [
          "Crear un servidor virtual con Amazon Lightsail. Configurar el servidor web en la instancia Lightsail. Subir el contenido por SFTP.",
          "Crear un Auto Scaling group de instancias EC2 con un Application Load Balancer. Subir el contenido por SFTP.",
          "Crear un bucket privado de Amazon S3. Usar una política de bucket que permita el acceso desde un origin access identity (OAI) de CloudFront. Subir el contenido con la AWS CLI.",
          "Crear un bucket público de S3. Configurar AWS Transfer for SFTP. Configurar el bucket para alojamiento web. Subir el contenido por SFTP."
        ],
        correctas: [2],
        explicacion: "Un bucket privado de S3 con OAI es la opción más económica y resiliente: sin servidores que mantener, sin coste de cómputo, y el acceso queda restringido exclusivamente a CloudFront. Las opciones con EC2 (A, B) tienen coste y mantenimiento continuos, y exponer el bucket públicamente (D) es innecesario y menos seguro."
      },
      {
        pregunta: "Una empresa quiere gestionar sus AMI. Actualmente las copia a la misma región donde se crean. Necesita una aplicación que capture las llamadas a la API de AWS y envíe alertas cuando se invoque la operación EC2 CreateImage en la cuenta. ¿Qué solución cumple esto con el MENOR trabajo operativo?",
        opciones: [
          "Crear una función Lambda que consulte los logs de AWS CloudTrail y envíe una alerta al detectar una llamada a CreateImage.",
          "Configurar CloudTrail con una notificación de Amazon SNS cuando se envíen logs actualizados a S3. Usar Amazon Athena para crear una tabla y consultar CreateImage al detectar una llamada.",
          "Crear una regla de Amazon EventBridge para la llamada CreateImage. Configurar como destino un topic de Amazon SNS que envíe una alerta al detectarla.",
          "Configurar una cola FIFO de Amazon SQS como destino de los logs de CloudTrail. Crear una función Lambda que envíe una alerta a un topic de SNS al detectar una llamada CreateImage."
        ],
        correctas: [2],
        explicacion: "EventBridge se integra de forma nativa con los eventos de la API de AWS (vía CloudTrail) y puede disparar una notificación SNS directamente, sin necesidad de código propio ni de consultar logs manualmente como en las demás opciones."
      },
      {
        pregunta: "Una empresa tiene una API asíncrona que ingiere peticiones de usuario y las despacha a microservicios según su tipo. Usa Amazon API Gateway como frontend y una función Lambda que invoca a Amazon DynamoDB para guardar las peticiones antes de despacharlas. Aunque ya aprovisionó todo el throughput de DynamoDB que su presupuesto permite, sigue teniendo problemas de disponibilidad y pierde peticiones. ¿Qué debería hacer un arquitecto de soluciones para resolver esto sin afectar a los usuarios actuales?",
        opciones: [
          "Añadir throttling en API Gateway con límites del lado del servidor.",
          "Usar DynamoDB Accelerator (DAX) y Lambda para almacenar en búfer las escrituras a DynamoDB.",
          "Crear un índice secundario en DynamoDB para la tabla de peticiones de usuario.",
          "Usar una cola de Amazon SQS y Lambda para almacenar en búfer las escrituras a DynamoDB."
        ],
        correctas: [3],
        explicacion: "Una cola SQS absorbe los picos de peticiones y Lambda las escribe en DynamoDB a un ritmo sostenible, evitando perder peticiones sin necesitar más presupuesto de throughput. El throttling (A) rechazaría peticiones de usuarios legítimos, DAX (B) es una caché de lectura y no ayuda a amortiguar escrituras, y un índice secundario (C) no reduce la presión de escritura."
      },
      {
        pregunta: "Una empresa necesita mover datos de una instancia EC2 a un bucket de Amazon S3, garantizando que ninguna llamada a la API ni ningún dato pasen por rutas públicas de internet. Solo esa instancia EC2 debe poder subir datos al bucket. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Crear un interface VPC endpoint para S3 en la subred de la instancia EC2. Adjuntar una política de recurso al bucket que solo permita el rol de IAM de esa instancia.",
          "Crear un gateway VPC endpoint para S3 en la zona de disponibilidad de la instancia. Adjuntar grupos de seguridad al endpoint y una política de recurso que solo permita el rol de IAM de la instancia.",
          "Ejecutar nslookup desde la instancia para obtener la IP privada del endpoint de S3. Crear una ruta en la tabla de rutas de la VPC y una política de recurso que solo permita el rol de IAM de la instancia.",
          "Usar el fichero público ip-ranges.json de AWS para obtener la IP privada del endpoint de S3. Crear una ruta en la VPC y una política de recurso que solo permita el rol de IAM de la instancia."
        ],
        correctas: [0],
        explicacion: "Un interface VPC endpoint (PrivateLink) para S3 mantiene el tráfico dentro de la red de AWS, y la política de recurso del bucket restringe la subida al rol de IAM de la instancia. Los gateway endpoints (B) NO admiten grupos de seguridad (son un destino de tabla de rutas, no una ENI), y las opciones C y D dependen de IP internas no documentadas y rutas manuales, algo no soportado por AWS."
      },
      {
        pregunta: "Un arquitecto de soluciones diseña una nueva aplicación en AWS que correrá en instancias EC2 On-Demand, escalando automáticamente entre varias zonas de disponibilidad con mucha frecuencia a lo largo del día. Un Application Load Balancer reparte la carga. La arquitectura debe soportar gestión distribuida de los datos de sesión, y la empresa acepta cambiar código si hace falta. ¿Qué debería hacer el arquitecto de soluciones?",
        opciones: [
          "Usar Amazon ElastiCache para gestionar y guardar los datos de sesión.",
          "Usar la afinidad de sesión (sticky sessions) del ALB para gestionar los datos de sesión.",
          "Usar Session Manager de AWS Systems Manager para gestionar la sesión.",
          "Usar la operación GetSessionToken de AWS STS para gestionar la sesión."
        ],
        correctas: [0],
        explicacion: "ElastiCache ofrece un almacén de sesión compartido y distribuido, accesible desde cualquier instancia, independientemente de cuál atienda cada petición; imprescindible cuando las instancias escalan con frecuencia entre AZ. Las sticky sessions (B) atan al usuario a una instancia concreta, lo cual falla si esa instancia se retira al escalar hacia abajo."
      },
      {
        pregunta: "Una empresa de reparto de comida crece rápido y su sistema de procesamiento de pedidos sufre problemas de escalado en horas punta. La arquitectura actual tiene un grupo de instancias EC2 en un Auto Scaling group para recoger pedidos y otro grupo para completarlos. Recoger pedidos es rápido, pero completarlos puede tardar más; no se puede perder ningún dato por un evento de escalado. Se necesita que ambos procesos escalen bien en horas punta, optimizando el uso de los recursos. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Monitorizar la CPU de cada instancia con CloudWatch. Configurar la capacidad mínima de cada Auto Scaling group según los valores de carga máxima.",
          "Monitorizar la CPU de cada instancia con CloudWatch. Configurar una alarma que invoque un topic de SNS que cree Auto Scaling groups adicionales bajo demanda.",
          "Aprovisionar dos colas de Amazon SQS, una para recogida y otra para cumplimentación de pedidos. Configurar las instancias EC2 para consumir su cola respectiva. Escalar los Auto Scaling groups según notificaciones que envíen las colas.",
          "Aprovisionar dos colas de Amazon SQS, una para recogida y otra para cumplimentación de pedidos. Configurar las instancias EC2 para consumir su cola respectiva. Crear una métrica de mensajes pendientes por instancia (backlog per instance) y escalar los Auto Scaling groups según esa métrica."
        ],
        correctas: [3],
        explicacion: "La métrica de backlog por instancia (mensajes visibles en la cola dividido entre el número de instancias) es el patrón recomendado por AWS para escalar Auto Scaling groups que consumen de SQS, y permite que cada proceso (recogida y cumplimentación) escale de forma independiente y proporcional a su propia carga real, sin perder datos gracias a la persistencia de la cola."
      },
      {
        pregunta: "Una empresa aloja varias aplicaciones de producción. Una de ellas usa recursos de EC2, Lambda, RDS, SNS y SQS repartidos en varias regiones de AWS. Todos los recursos llevan la etiqueta \"application\" con un valor por aplicación. Un arquitecto de soluciones necesita la forma más rápida de identificar todos los componentes etiquetados. ¿Qué solución cumple este requisito?",
        opciones: [
          "Usar AWS CloudTrail para generar una lista de recursos con la etiqueta application.",
          "Usar la AWS CLI para consultar cada servicio en todas las regiones y reportar los componentes etiquetados.",
          "Ejecutar una consulta en Amazon CloudWatch Logs Insights para reportar los componentes con la etiqueta application.",
          "Ejecutar una consulta con el Tag Editor de AWS Resource Groups para reportar los recursos con la etiqueta application a nivel global."
        ],
        correctas: [3],
        explicacion: "El Tag Editor de AWS Resource Groups busca recursos por etiqueta en todas las regiones desde un único punto, de forma inmediata. CloudTrail no indexa por etiqueta, la CLI por servicio y región es lenta y manual, y CloudWatch Logs Insights consulta logs, no un inventario de recursos."
      },
      {
        pregunta: "Una empresa necesita exportar su base de datos una vez al día a Amazon S3 para que otros equipos accedan. El tamaño de los objetos exportados varía entre 2 GB y 5 GB. El patrón de acceso a los datos en S3 es variable y cambia rápidamente. Los datos deben estar disponibles de inmediato y accesibles hasta 3 meses. Se necesita la solución más económica que no aumente el tiempo de recuperación. ¿Qué clase de almacenamiento de S3 debería usar la empresa?",
        opciones: ["S3 Intelligent-Tiering", "S3 Glacier Instant Retrieval", "S3 Standard", "S3 Standard-Infrequent Access (S3 Standard-IA)"],
        correctas: [0],
        explicacion: "S3 Intelligent-Tiering mueve automáticamente los objetos entre niveles de acceso según cambia su patrón de uso, sin penalización de tiempo de recuperación y sin tener que predecir tú mismo cuándo se accederá a cada objeto, ideal para un patrón de acceso variable e impredecible como este."
      },
      {
        pregunta: "Una empresa desarrolla una nueva app móvil. Debe filtrar correctamente el tráfico para proteger su Application Load Balancer frente a ataques de nivel de aplicación como cross-site scripting o inyección SQL. Tiene poca infraestructura y personal operativo, y quiere reducir su parte de responsabilidad en gestionar, actualizar y asegurar servidores. ¿Qué debería recomendar un arquitecto de soluciones?",
        opciones: [
          "Configurar reglas de AWS WAF y asociarlas al ALB.",
          "Desplegar la aplicación con Amazon S3 con alojamiento público habilitado.",
          "Desplegar AWS Shield Advanced y añadir el ALB como recurso protegido.",
          "Crear un nuevo ALB que dirija el tráfico a una instancia EC2 con un firewall de terceros, que luego pase el tráfico al ALB actual."
        ],
        correctas: [0],
        explicacion: "AWS WAF es un servicio gestionado que filtra ataques de nivel de aplicación (XSS, inyección SQL) asociado directamente al ALB, sin que la empresa gestione servidores de firewall propios. Shield Advanced (C) protege frente a DDoS, no frente a estos exploits de aplicación."
      },
      {
        pregunta: "El sistema de informes de una empresa entrega cientos de archivos .csv a un bucket de S3 cada día. Debe convertirlos a formato Apache Parquet y guardarlos en un bucket de datos transformados. ¿Qué solución cumple esto con el MENOR esfuerzo de desarrollo?",
        opciones: [
          "Crear un clúster de Amazon EMR con Apache Spark. Escribir una aplicación Spark que transforme los datos. Usar EMRFS para escribir los archivos en el bucket transformado.",
          "Crear un rastreador de AWS Glue para descubrir los datos. Crear un trabajo ETL de AWS Glue que los transforme. Indicar el bucket transformado en el paso de salida.",
          "Usar AWS Batch para crear una definición de trabajo en Bash que transforme los datos y los guarde en el bucket transformado. Enviar el trabajo como un array job.",
          "Crear una función Lambda que transforme los datos y los guarde en el bucket transformado. Configurar una notificación de eventos del bucket de S3 con la función Lambda como destino."
        ],
        correctas: [1],
        explicacion: "AWS Glue (rastreador + trabajo ETL gestionado, con transformación a Parquet integrada) exige mucho menos desarrollo que escribir y mantener una aplicación Spark en EMR, un script Bash en Batch o código Lambda personalizado para la conversión de formato."
      },
      {
        pregunta: "Una empresa tiene 700 TB de copias de seguridad en un NAS de su centro de datos. Deben quedar accesibles para peticiones regulatorias poco frecuentes y conservarse 7 años. La empresa decide migrarlas a AWS, con la migración completa en 1 mes, y dispone de 500 Mbps de ancho de banda dedicado en su conexión pública a internet. ¿Qué debería hacer un arquitecto de soluciones para migrar y almacenar los datos al MENOR coste?",
        opciones: [
          "Pedir dispositivos AWS Snowball para transferir los datos. Usar una política de ciclo de vida para pasarlos a Amazon S3 Glacier Deep Archive.",
          "Desplegar una conexión VPN entre el centro de datos y la VPC. Usar la AWS CLI para copiar los datos on-premises a Amazon S3 Glacier.",
          "Aprovisionar una conexión de AWS Direct Connect de 500 Mbps y transferir los datos a S3. Usar una política de ciclo de vida hacia S3 Glacier Deep Archive.",
          "Usar AWS DataSync para transferir los datos, con un agente DataSync on-premises, copiando desde el NAS a Amazon S3 Glacier."
        ],
        correctas: [0],
        explicacion: "700 TB por una conexión de 500 Mbps tardarían más de 4 meses, muy por encima del plazo de 1 mes exigido (descarta B, C y D, que dependen de esa misma conexión). Snowball transporta físicamente el volumen dentro del plazo, y el ciclo de vida hacia Glacier Deep Archive minimiza el coste de un almacenamiento de acceso poco frecuente a 7 años."
      },
      {
        pregunta: "Una empresa tiene un sitio web serverless con millones de objetos en un bucket de S3, usado como origen de una distribución de CloudFront. No activó el cifrado del bucket antes de cargar los objetos. Un arquitecto de soluciones necesita habilitar el cifrado para todos los objetos existentes y para los que se añadan en el futuro. ¿Qué solución cumple esto con el MENOR esfuerzo?",
        opciones: [
          "Crear un nuevo bucket de S3 con cifrado por defecto activado. Descargar todos los objetos existentes a almacenamiento local temporal y subirlos al nuevo bucket.",
          "Activar el cifrado por defecto del bucket de S3. Usar S3 Inventory para generar un .csv con los objetos sin cifrar. Ejecutar un trabajo de S3 Batch Operations que los copie y cifre.",
          "Crear una nueva clave de AWS KMS. Cambiar la configuración del bucket para usar cifrado del lado del servidor con SSE-KMS. Activar el versionado del bucket.",
          "Navegar a S3 en la consola de AWS, ordenar los objetos por el campo de cifrado, seleccionar cada objeto sin cifrar y aplicarles el cifrado por defecto uno a uno."
        ],
        correctas: [1],
        explicacion: "El cifrado por defecto del bucket cubre automáticamente todos los objetos futuros, y S3 Inventory + S3 Batch Operations cifra los millones de objetos ya existentes sin descargarlos ni subirlos manualmente. Descargar y volver a subir todo (A) o hacerlo objeto a objeto desde la consola (D) es inviable a esa escala."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación web global en instancias EC2 detrás de un Application Load Balancer, con datos en Amazon Aurora. Necesita una solución de recuperación ante desastres que tolere hasta 30 minutos de caída y posible pérdida de datos. La solución no necesita atender carga mientras la infraestructura principal esté sana. ¿Qué debería hacer un arquitecto de soluciones?",
        opciones: [
          "Desplegar la aplicación con los elementos de infraestructura necesarios ya preparados. Configurar failover activo-pasivo con Route 53. Crear una réplica de Aurora en una segunda región.",
          "Alojar un despliegue reducido de la aplicación en una segunda región. Configurar failover activo-activo con Route 53. Crear una réplica de Aurora en la segunda región.",
          "Replicar toda la infraestructura principal en una segunda región. Configurar failover activo-activo con Route 53. Crear una base de datos Aurora restaurada desde el último snapshot.",
          "Respaldar los datos con AWS Backup. Usar el backup para crear la infraestructura necesaria en una segunda región. Configurar failover activo-pasivo con Route 53. Crear una segunda instancia principal de Aurora en la segunda región."
        ],
        correctas: [0],
        explicacion: "Este es el patrón 'pilot light': la infraestructura mínima ya está desplegada (pero apagada/sin tráfico) en la segunda región, con una réplica de Aurora manteniendo los datos casi al día, y Route 53 conmuta de forma activo-pasiva al detectar el fallo. Cumple el RTO de 30 minutos sin el coste de mantener capacidad activa-activa constante (B, C), que la empresa no necesita."
      },
      {
        pregunta: "Una empresa tiene un servidor web en una instancia EC2 en una subred pública con una IP elástica. Tiene asignado el grupo de seguridad por defecto. La NACL por defecto se ha modificado para bloquear todo el tráfico. Un arquitecto de soluciones necesita que el servidor web sea accesible desde cualquier lugar por el puerto 443. ¿Qué combinación de pasos lo consigue? (Elige dos.)",
        opciones: [
          "Crear un grupo de seguridad con una regla que permita el puerto TCP 443 desde el origen 0.0.0.0/0.",
          "Crear un grupo de seguridad con una regla que permita el puerto TCP 443 hacia el destino 0.0.0.0/0.",
          "Actualizar la NACL para permitir el puerto TCP 443 desde el origen 0.0.0.0/0.",
          "Actualizar la NACL para permitir entrada y salida del puerto TCP 443 desde/hacia 0.0.0.0/0.",
          "Actualizar la NACL para permitir la entrada del puerto TCP 443 desde 0.0.0.0/0 y la salida del rango de puertos TCP 32768-65535 hacia 0.0.0.0/0."
        ],
        correctas: [0, 4],
        explicacion: "Hace falta un grupo de seguridad que permita la entrada por el 443 (A), y como la NACL es sin estado, hay que abrir también la salida por el rango de puertos efímeros (32768-65535) para permitir que la respuesta del servidor regrese al cliente (E). Permitir solo el 443 en ambos sentidos en la NACL (C, D) no basta: la respuesta sale por un puerto efímero, no por el 443."
      },
      {
        pregunta: "La aplicación de una empresa tiene problemas de rendimiento: es con estado (stateful) y necesita completar tareas en memoria en instancias EC2. La empresa despliega la infraestructura con AWS CloudFormation, usando la familia de instancias M5. Al aumentar el tráfico, el rendimiento se degrada. ¿Qué solución resuelve esto de la forma MÁS eficiente operativamente?",
        opciones: [
          "Sustituir las instancias EC2 por instancias T3 en un Auto Scaling group, aplicando los cambios desde la consola de administración de AWS.",
          "Modificar las plantillas de CloudFormation para ejecutar las instancias en un Auto Scaling group. Aumentar manualmente la capacidad deseada y máxima del grupo cuando haga falta.",
          "Modificar las plantillas de CloudFormation. Sustituir las instancias por instancias R5. Usar las métricas de memoria integradas de Amazon CloudWatch en EC2 para la planificación de capacidad futura.",
          "Modificar las plantillas de CloudFormation. Sustituir las instancias por instancias R5. Desplegar el agente de CloudWatch en las instancias para generar métricas personalizadas de latencia de la aplicación para la planificación de capacidad futura."
        ],
        correctas: [3],
        explicacion: "Las tareas en memoria (stateful) encajan mejor en la familia R5, optimizada para memoria, y el cambio debe hacerse en las plantillas de CloudFormation (infraestructura como código), no manualmente en la consola (A) ni con ajustes manuales recurrentes (B). Ojo: EC2/CloudWatch NO publican métricas de memoria 'integradas' sin agente (C describe algo que no existe); hace falta desplegar el agente de CloudWatch (D) para obtener métricas reales con las que planificar la capacidad."
      },
      {
        pregunta: "Un arquitecto de soluciones diseña una nueva API con Amazon API Gateway que recibirá peticiones de usuarios. El volumen de peticiones es muy variable; pueden pasar horas sin recibir ninguna. El procesamiento es asíncrono, pero debe completarse en pocos segundos tras la petición. ¿Qué servicio de cómputo debería invocar la API para cumplir esto al MENOR coste?",
        opciones: ["Un trabajo de AWS Glue", "Una función de AWS Lambda", "Un servicio en contenedores en Amazon EKS", "Un servicio en contenedores en Amazon ECS con EC2"],
        correctas: [1],
        explicacion: "Lambda solo cobra por invocación y tiempo de ejecución, sin coste alguno durante las horas sin tráfico, además de admitir invocación asíncrona con finalización en segundos. Un clúster de EKS o ECS con EC2 (C, D) implica coste constante de la infraestructura subyacente, y Glue está pensado para trabajos ETL por lotes, no para respuestas rápidas a peticiones puntuales."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación en un grupo de instancias EC2 Amazon Linux. Por cumplimiento normativo debe conservar los logs de la aplicación 7 años. Una herramienta de informes debe poder acceder a todos los archivos de forma concurrente. ¿Qué solución de almacenamiento cumple esto de la forma MÁS económica?",
        opciones: ["Amazon Elastic Block Store (Amazon EBS)", "Amazon Elastic File System (Amazon EFS)", "El almacenamiento efímero (instance store) de EC2", "Amazon S3"],
        correctas: [3],
        explicacion: "S3 es la opción más económica para almacenamiento duradero a largo plazo con acceso concurrente desde una herramienta de informes (basta con permisos de lectura sobre el bucket). EBS (A) no se puede montar simultáneamente en muchas instancias, el instance store (C) no es duradero, y EFS (B), aunque también permite acceso concurrente, tiene un coste por GB mayor que S3."
      },
      {
        pregunta: "Una empresa ha contratado a un proveedor externo para realizar trabajos en su cuenta de AWS. El proveedor usa una herramienta automatizada alojada en una cuenta de AWS de su propiedad, y no tiene acceso de IAM a la cuenta de la empresa. ¿Cómo debería un arquitecto de soluciones concederle ese acceso?",
        opciones: [
          "Crear un rol de IAM en la cuenta de la empresa que delegue el acceso al rol de IAM del proveedor. Adjuntar al rol las políticas de IAM necesarias para los permisos que requiere el proveedor.",
          "Crear un usuario de IAM en la cuenta de la empresa con una contraseña que cumpla los requisitos de complejidad. Adjuntar al usuario las políticas necesarias.",
          "Crear un grupo de IAM en la cuenta de la empresa. Añadir el usuario de IAM de la herramienta del proveedor al grupo. Adjuntar al grupo las políticas necesarias.",
          "Crear un nuevo proveedor de identidad eligiendo \"cuenta de AWS\" como tipo de proveedor en la consola de IAM. Indicar el ID de cuenta y el nombre de usuario del proveedor. Adjuntar las políticas al nuevo proveedor."
        ],
        correctas: [0],
        explicacion: "Un rol de IAM con una política de confianza que permita al rol del proveedor asumirlo es el patrón estándar de acceso entre cuentas: el proveedor obtiene credenciales temporales vía STS sin que la empresa tenga que crear ni gestionar usuarios/contraseñas de IAM propios del proveedor (B, C), y la opción D describe un mecanismo que no existe así en IAM."
      },
      {
        pregunta: "Una empresa ha desplegado una aplicación Java Spring Boot como pod en Amazon EKS, en subredes privadas. La aplicación necesita escribir datos en una tabla de Amazon DynamoDB, sin exponer tráfico a internet. ¿Qué combinación de pasos cumple este objetivo? (Elige dos.)",
        opciones: [
          "Adjuntar al pod de EKS un rol de IAM con privilegios suficientes.",
          "Adjuntar al pod de EKS un usuario de IAM con privilegios suficientes.",
          "Permitir conectividad de salida hacia la tabla de DynamoDB en las NACL de las subredes privadas.",
          "Crear un VPC endpoint para DynamoDB.",
          "Incrustar las claves de acceso en el código Java Spring Boot."
        ],
        correctas: [0, 3],
        explicacion: "Un rol de IAM asociado al pod (vía IAM Roles for Service Accounts) da los permisos necesarios, y un VPC endpoint para DynamoDB mantiene el tráfico dentro de la red de AWS sin salir a internet. Los usuarios de IAM (B) y las claves incrustadas en el código (E) van contra las buenas prácticas de seguridad, y las NACL (C) no conceden permisos de API, solo filtran tráfico de red."
      },
      {
        pregunta: "Una empresa migró recientemente su aplicación web a AWS reubicándola (rehost) en instancias EC2 dentro de una única región. Quiere rediseñar la arquitectura para que sea altamente disponible y tolerante a fallos, con el tráfico llegando aleatoriamente a todas las instancias en ejecución. ¿Qué combinación de pasos cumple estos requisitos? (Elige dos.)",
        opciones: [
          "Crear una política de enrutado de failover de Route 53.",
          "Crear una política de enrutado ponderada (weighted) de Route 53.",
          "Crear una política de enrutado multivalor (multivalue answer) de Route 53.",
          "Lanzar tres instancias EC2: dos en una zona de disponibilidad y una en otra.",
          "Lanzar cuatro instancias EC2: dos en una zona de disponibilidad y dos en otra."
        ],
        correctas: [2, 4],
        explicacion: "La política multivalor devuelve varias IP sanas de forma aleatoria entre las que el cliente elige, repartiendo el tráfico entre todas las instancias en buen estado. Repartir cuatro instancias a partes iguales entre dos AZ (dos y dos) da verdadera tolerancia a fallos: si una AZ cae, solo se pierde la mitad de la capacidad; con un reparto de tres (dos y una) se perdería dos tercios si falla la AZ con más instancias."
      },
      {
        pregunta: "Una empresa de medios recopila y analiza datos de actividad de usuarios on-premises y quiere migrar esta capacidad a AWS. El almacén de datos seguirá creciendo hasta alcanzar petabytes. Necesita una solución de ingesta de datos altamente disponible que facilite la analítica bajo demanda de los datos existentes y nuevos, con SQL. ¿Qué solución cumple esto con el MENOR trabajo operativo?",
        opciones: [
          "Enviar los datos de actividad a un data stream de Amazon Kinesis. Configurar el stream para entregar los datos a un bucket de Amazon S3.",
          "Enviar los datos de actividad a un delivery stream de Amazon Kinesis Data Firehose. Configurar el stream para entregarlos a un clúster de Amazon Redshift.",
          "Guardar los datos de actividad en un bucket de S3. Configurar S3 para ejecutar una función Lambda sobre los datos al llegar al bucket.",
          "Crear un servicio de ingesta en instancias EC2 repartidas en varias zonas de disponibilidad. Configurar el servicio para enviar los datos a una base de datos Amazon RDS Multi-AZ."
        ],
        correctas: [1],
        explicacion: "Kinesis Data Firehose es un servicio totalmente gestionado que entrega los datos directamente a Redshift, un almacén de datos a escala de petabytes optimizado para consultas SQL de alto rendimiento, sin gestionar ningún servidor de ingesta ni escribir código propio (a diferencia de C y D)."
      },
      {
        pregunta: "Una empresa recoge datos de miles de dispositivos remotos mediante una aplicación de servicios web RESTful que corre en una instancia EC2, que recibe los datos, los transforma y los guarda en un bucket de S3. El número de dispositivos remotos pronto llegará a los millones. Se necesita una solución muy escalable que minimice el trabajo operativo. ¿Qué combinación de pasos cumple estos requisitos? (Elige dos.)",
        opciones: [
          "Usar AWS Glue para procesar los datos en bruto en Amazon S3.",
          "Usar Amazon Route 53 para enrutar el tráfico a distintas instancias EC2.",
          "Añadir más instancias EC2 para acomodar el volumen creciente de datos entrantes.",
          "Enviar los datos en bruto a Amazon SQS. Usar instancias EC2 para procesarlos.",
          "Usar Amazon API Gateway para enviar los datos en bruto a un data stream de Amazon Kinesis. Configurar Amazon Kinesis Data Firehose para usar ese stream como origen y entregar los datos a Amazon S3."
        ],
        correctas: [0, 4],
        explicacion: "API Gateway + Kinesis Data Stream + Kinesis Data Firehose forman una vía de ingesta totalmente gestionada y muy escalable (sin el cuello de botella de una única instancia EC2 receptora), y AWS Glue procesa después los datos ya en S3 sin necesitar código de transformación propio en EC2. Añadir más instancias EC2 (C) o encolar hacia EC2 (D) sigue dependiendo de servidores que gestionar."
      },
      {
        pregunta: "Una empresa debe conservar sus logs de AWS CloudTrail 3 años, aplicado a varias cuentas mediante AWS Organizations desde la cuenta principal. El bucket de S3 destino tiene el versionado activado y una política de ciclo de vida que borra los objetos actuales tras 3 años. Al cuarto año, el número de objetos del bucket sigue subiendo aunque la cantidad de logs nuevos entregados se mantiene constante. ¿Qué solución borra los objetos de más de 3 años de la forma MÁS económica?",
        opciones: [
          "Configurar el trail centralizado de la organización para que expire los objetos tras 3 años.",
          "Configurar la política de ciclo de vida de S3 para que borre también las versiones anteriores, además de las actuales.",
          "Crear una función Lambda que enumere y borre de S3 los objetos de más de 3 años.",
          "Configurar la cuenta principal como propietaria de todos los objetos que se entregan al bucket."
        ],
        correctas: [1],
        explicacion: "Con el versionado activado, borrar la versión 'actual' solo añade un marcador de borrado: las versiones anteriores (noncurrent) se quedan acumulándose, que es justo el síntoma descrito. Hay que ampliar la política de ciclo de vida para expirar también las versiones no actuales, sin necesidad de código propio (C) ni cambios de propiedad (D)."
      },
      {
        pregunta: "Una empresa tiene una API que recibe datos en tiempo real de una flota de dispositivos de monitorización y los guarda en una instancia de Amazon RDS para su análisis posterior. El volumen de datos fluctúa, y en picos de tráfico la API devuelve errores de timeout. Tras revisar los logs, la empresa concluye que la base de datos no soporta el volumen de escritura de la API. Se necesita minimizar el número de conexiones a la base de datos y no perder datos en los picos de tráfico. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Aumentar el tamaño de la instancia de base de datos a un tipo con más memoria disponible.",
          "Convertir la instancia en una instancia Multi-AZ. Configurar la aplicación para escribir en todas las instancias RDS activas.",
          "Modificar la API para escribir los datos entrantes en una cola de Amazon SQS. Usar una función Lambda que SQS invoque para escribir los datos de la cola en la base de datos.",
          "Modificar la API para escribir los datos entrantes en un topic de Amazon SNS. Usar una función Lambda que SNS invoque para escribir los datos del topic en la base de datos."
        ],
        correctas: [2],
        explicacion: "SQS amortigua los picos de escritura y Lambda escribe en la base de datos a un ritmo controlado, reduciendo drásticamente el número de conexiones simultáneas y sin perder datos gracias a la persistencia de la cola. Multi-AZ (B) no permite escribir en varias instancias a la vez (solo hay una activa), y SNS (D) no retiene mensajes de forma duradera como SQS."
      },
      {
        pregunta: "Una empresa gestiona sus propias instancias EC2 con bases de datos MySQL, administrando manualmente la replicación y el escalado según la demanda. Necesita una solución que simplifique añadir o quitar capacidad de cómputo en la capa de base de datos, con mejor rendimiento, escalado y durabilidad, y el mínimo esfuerzo operativo. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Migrar las bases de datos a Amazon Aurora Serverless para Aurora MySQL.",
          "Migrar las bases de datos a Amazon Aurora Serverless para Aurora PostgreSQL.",
          "Combinar las bases de datos en una única base de datos MySQL más grande, en instancias EC2 más grandes.",
          "Crear un Auto Scaling group para la capa de base de datos y migrar las bases de datos existentes a ese nuevo entorno."
        ],
        correctas: [0],
        explicacion: "Aurora Serverless para Aurora MySQL mantiene la compatibilidad con el motor MySQL original (sin reescribir consultas) y ajusta la capacidad automáticamente según la demanda, sin gestión manual de replicación ni escalado. Migrar a PostgreSQL (B) cambiaría de motor innecesariamente, y las opciones C y D siguen dependiendo de instancias EC2 autogestionadas."
      },
      {
        pregunta: "Una empresa teme que sus dos instancias NAT ya no soporten el tráfico que necesita su aplicación. Un arquitecto de soluciones quiere una solución altamente disponible, tolerante a fallos y que escale automáticamente. ¿Qué debería recomendar?",
        opciones: [
          "Eliminar las dos instancias NAT y sustituirlas por dos NAT Gateway en la misma zona de disponibilidad.",
          "Usar Auto Scaling groups con Network Load Balancers para las instancias NAT en distintas zonas de disponibilidad.",
          "Eliminar las dos instancias NAT y sustituirlas por dos NAT Gateway en zonas de disponibilidad distintas.",
          "Sustituir las instancias NAT por instancias Spot en distintas zonas de disponibilidad, con un Network Load Balancer."
        ],
        correctas: [2],
        explicacion: "El NAT Gateway es un servicio gestionado por AWS, ya alta disponible y escalado automáticamente dentro de su zona de disponibilidad; desplegar uno por AZ (opción C) da la alta disponibilidad y tolerancia a fallos completa entre zonas. Ponerlos en la misma AZ (A) no protege frente a un fallo de zona, y las instancias NAT autogestionadas (B, D), aunque estén en Auto Scaling o sean Spot, siguen exigiendo mantenimiento propio y son menos fiables que el servicio gestionado."
      },
      {
        pregunta: "Una aplicación corre en una instancia EC2 con una IP elástica en la VPC A, y necesita acceder a una base de datos en la VPC B. Ambas VPC están en la misma cuenta de AWS. ¿Qué solución da el acceso requerido de forma MÁS segura?",
        opciones: [
          "Crear un grupo de seguridad de la base de datos que permita todo el tráfico desde la IP pública del servidor de aplicación en la VPC A.",
          "Configurar una conexión de VPC Peering entre la VPC A y la VPC B.",
          "Hacer pública la instancia de base de datos, asignándole una IP pública.",
          "Lanzar una instancia EC2 con IP elástica en la VPC B y hacer de proxy para todas las peticiones a través de ella."
        ],
        correctas: [1],
        explicacion: "El VPC Peering conecta directamente ambas VPC por IP privada, sin exponer la base de datos a internet ni depender de IP públicas (A, C) ni de una instancia proxy adicional que mantener (D)."
      },
      {
        pregunta: "Una empresa ejecuta entornos de demostración para sus clientes en instancias EC2, cada uno aislado en su propia VPC. El equipo de operaciones necesita ser notificado cuando se establezca acceso por RDP o SSH a un entorno. ¿Qué debería hacer un arquitecto de soluciones?",
        opciones: [
          "Configurar Amazon CloudWatch Application Insights para crear OpsItems de Systems Manager al detectar acceso RDP o SSH.",
          "Configurar las instancias EC2 con un perfil de instancia de IAM con la política AmazonSSMManagedInstanceCore.",
          "Publicar los VPC Flow Logs en Amazon CloudWatch Logs. Crear los filtros de métricas necesarios. Crear una alarma de CloudWatch con una acción de notificación cuando entre en estado ALARM.",
          "Configurar una regla de Amazon EventBridge que escuche eventos de tipo EC2 Instance State-change Notification, con un topic de SNS como destino, suscribiendo al equipo de operaciones."
        ],
        correctas: [2],
        explicacion: "Los VPC Flow Logs capturan las conexiones de red (incluidas las de los puertos RDP/SSH); publicándolos en CloudWatch Logs y creando un filtro de métricas más una alarma con notificación, se detecta y avisa del acceso. Application Insights (A) no está pensado para esto, la política SSM (B) da acceso vía Session Manager pero no notifica nada, y el evento de EventBridge de la opción D es sobre el estado de arranque/parada de la instancia, no sobre conexiones RDP/SSH."
      },
      {
        pregunta: "Un arquitecto de soluciones ha creado una cuenta de AWS nueva y debe asegurar el acceso del usuario raíz (root) de la cuenta. ¿Qué combinación de acciones lo consigue? (Elige dos.)",
        opciones: [
          "Asegurarse de que el usuario raíz use una contraseña robusta.",
          "Activar la autenticación multifactor (MFA) para el usuario raíz.",
          "Guardar las claves de acceso del usuario raíz en un bucket de S3 cifrado.",
          "Añadir el usuario raíz a un grupo con permisos administrativos.",
          "Aplicar los permisos necesarios al usuario raíz con una política insertada (inline policy)."
        ],
        correctas: [0, 1],
        explicacion: "Una contraseña robusta y el MFA son las prácticas fundamentales de seguridad para el usuario raíz. Guardar sus claves en S3 (C) es justo lo que no se debe hacer, y las opciones D y E no tienen sentido: el usuario raíz ya tiene acceso total implícito, no se le añaden permisos mediante grupos o políticas de IAM."
      },
      {
        pregunta: "Una empresa construye una nueva aplicación web de gestión de clientes (CRM). Usará varias instancias EC2 respaldadas por volúmenes EBS, detrás de un Application Load Balancer, y una base de datos Amazon Aurora. Todos los datos deben cifrarse en reposo y en tránsito. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Usar certificados de AWS KMS en el ALB para cifrar los datos en tránsito. Usar AWS Certificate Manager (ACM) para cifrar los volúmenes EBS y el almacenamiento de Aurora en reposo.",
          "Iniciar sesión en la consola de administración con la cuenta raíz de AWS. Subir los certificados de cifrado de la empresa. Activar el cifrado de todos los datos en reposo y en tránsito para la cuenta.",
          "Usar AWS KMS para cifrar los volúmenes EBS y el almacenamiento de Aurora en reposo. Adjuntar un certificado de AWS Certificate Manager (ACM) al ALB para cifrar los datos en tránsito.",
          "Usar BitLocker para cifrar todos los datos en reposo. Importar las claves del certificado TLS de la empresa a AWS KMS. Adjuntar las claves de KMS al ALB para cifrar los datos en tránsito."
        ],
        correctas: [2],
        explicacion: "KMS cifra en reposo los volúmenes EBS y el almacenamiento de Aurora, y un certificado de ACM en el ALB habilita HTTPS para cifrar en tránsito: es la combinación estándar y gestionada. Las demás opciones invierten los servicios (A) o describen mecanismos que no existen así en AWS (B, D)."
      },
      {
        pregunta: "Una empresa migra su base de datos Oracle on-premises a Amazon Aurora PostgreSQL. Varias aplicaciones escriben en las mismas tablas y deben migrarse una a una, con un mes de diferencia entre cada migración. La base de datos tiene un alto volumen de lecturas y escrituras, y los datos deben mantenerse sincronizados entre ambas bases de datos durante toda la migración. ¿Qué debería recomendar un arquitecto de soluciones?",
        opciones: [
          "Usar AWS DataSync para la migración inicial. Usar AWS DMS para crear una tarea de replicación solo de captura de cambios (CDC) con mapeo de todas las tablas.",
          "Usar AWS DataSync para la migración inicial. Usar AWS DMS para crear una tarea de carga completa más CDC con mapeo de todas las tablas.",
          "Usar el AWS Schema Conversion Tool (SCT) junto con AWS DMS, con una instancia de replicación optimizada para memoria. Crear una tarea de carga completa más CDC con mapeo de todas las tablas.",
          "Usar el AWS Schema Conversion Tool (SCT) junto con AWS DMS, con una instancia de replicación optimizada para cómputo. Crear una tarea de carga completa más CDC con mapeo solo de las tablas más grandes."
        ],
        correctas: [2],
        explicacion: "Al cambiar de motor (Oracle → Aurora PostgreSQL), hace falta el SCT para convertir el esquema; una tarea de carga completa + CDC mantiene sincronizados los datos durante todo el período de migración escalonada, y una instancia de replicación optimizada para memoria encaja con el alto volumen de lecturas/escrituras. Hay que mapear TODAS las tablas (no solo las grandes, como en D), porque distintas aplicaciones aún en proceso de migración pueden depender de cualquiera de ellas."
      },
      {
        pregunta: "Una empresa tiene una aplicación de tres capas para compartir imágenes: una instancia EC2 para el frontend, otra para la capa de aplicación y una tercera con una base de datos MySQL. Un arquitecto de soluciones debe diseñar una solución escalable y de alta disponibilidad con el menor cambio posible en la aplicación. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Alojar el frontend en Amazon S3. Usar funciones Lambda para la capa de aplicación. Mover la base de datos a una tabla de DynamoDB. Usar S3 para guardar y servir las imágenes.",
          "Usar entornos Multi-AZ balanceados de AWS Elastic Beanstalk para el frontend y la capa de aplicación. Mover la base de datos a una instancia de Amazon RDS con varias réplicas de lectura para servir las imágenes.",
          "Alojar el frontend en S3. Usar una flota de instancias EC2 en un Auto Scaling group para la capa de aplicación. Mover la base de datos a un tipo de instancia optimizado para memoria para guardar y servir las imágenes.",
          "Usar entornos Multi-AZ balanceados de Elastic Beanstalk para el frontend y la capa de aplicación. Mover la base de datos a una instancia de Amazon RDS Multi-AZ. Usar S3 para guardar y servir las imágenes."
        ],
        correctas: [3],
        explicacion: "Elastic Beanstalk Multi-AZ da alta disponibilidad al frontend y a la capa de aplicación sin reescribir la aplicación, RDS Multi-AZ hace lo mismo con la base de datos MySQL existente, y S3 es el lugar natural para guardar y servir imágenes (no la base de datos). Las opciones que cambian de motor de base de datos (A) o usan la propia base de datos para servir imágenes (B, C) exigen más cambios de los necesarios."
      },
      {
        pregunta: "Una aplicación en una instancia EC2 de la VPC-A necesita acceder a archivos de otra instancia EC2 en la VPC-B. Ambas VPC están en cuentas de AWS distintas. Se necesita una solución de acceso seguro sin punto único de fallo ni limitaciones de ancho de banda. ¿Qué solución cumple estos requisitos?",
        opciones: [
          "Configurar una conexión de VPC Peering entre la VPC-A y la VPC-B.",
          "Configurar gateway VPC endpoints para la instancia EC2 que corre en la VPC-B.",
          "Adjuntar un virtual private gateway a la VPC-B y configurar el enrutado desde la VPC-A.",
          "Crear una interfaz virtual privada (VIF) para la instancia EC2 de la VPC-B y añadir las rutas apropiadas desde la VPC-A."
        ],
        correctas: [0],
        explicacion: "El VPC Peering entre cuentas conecta directamente ambas VPC por IP privada, sin depender de un dispositivo intermedio (sin punto único de fallo) y sin límite de ancho de banda propio. Los gateway endpoints (B) son solo para S3/DynamoDB, un virtual private gateway (C) es para VPN hacia on-premises, y una VIF (D) es de Direct Connect, ninguno aplica a conectar dos VPC entre sí."
      },
      {
        pregunta: "Una empresa quiere que su equipo de ingeniería experimente con cuentas individuales de AWS, y ser notificada en cuanto el uso de instancias EC2 de un mes supere un umbral concreto en cada cuenta. ¿Qué debería hacer un arquitecto de soluciones para cumplir esto de la forma MÁS económica?",
        opciones: [
          "Usar AWS Budgets para crear un presupuesto de coste por cuenta, con período mensual, ámbito de instancias EC2 y un umbral de alerta. Configurar un topic de SNS para recibir la notificación al superarlo.",
          "Usar Cost Explorer para crear un informe diario de costes por servicio, filtrado por EC2. Configurar Cost Explorer para enviar una notificación de Amazon SES al superar un umbral.",
          "Usar Cost Explorer para crear un informe mensual de costes por servicio, filtrado por EC2. Configurar Cost Explorer para enviar una notificación de Amazon SES al superar un umbral.",
          "Usar AWS Cost and Usage Reports con granularidad horaria. Integrar los datos con Amazon Athena. Usar EventBridge para programar una consulta de Athena. Configurar un topic de SNS para la notificación."
        ],
        correctas: [0],
        explicacion: "AWS Budgets está diseñado exactamente para esto: presupuestos con alcance y período configurables que avisan por SNS al superar un umbral, sin más infraestructura. Cost Explorer (B, C) no dispara alertas por sí mismo tan directamente, y el Cost and Usage Report con Athena y EventBridge (D) es mucho más complejo de mantener para un caso tan simple."
      },
      {
        pregunta: "Un arquitecto de soluciones diseña un nuevo microservicio para la aplicación de una empresa. Los clientes deben poder llamar a un endpoint HTTPS para alcanzarlo, y el microservicio debe autenticar las llamadas con IAM. La lógica se implementará en una única función de AWS Lambda escrita en Go 1.x. ¿Qué solución despliega la función de la forma MÁS eficiente operativamente?",
        opciones: [
          "Crear una API REST de Amazon API Gateway. Configurar el método para usar la función Lambda. Habilitar autenticación IAM en la API.",
          "Crear una URL de función (function URL) para la función Lambda, especificando AWS_IAM como tipo de autenticación.",
          "Crear una distribución de Amazon CloudFront. Desplegar la función en Lambda@Edge, integrando la lógica de autenticación IAM en la función Lambda@Edge.",
          "Crear una distribución de CloudFront. Desplegar la función en CloudFront Functions, especificando AWS_IAM como tipo de autenticación."
        ],
        correctas: [1],
        explicacion: "Las URL de función de Lambda dan un endpoint HTTPS dedicado a una única función con autenticación IAM integrada (tipo AWS_IAM), sin aprovisionar ni mantener ningún recurso adicional: es más ligero y operativamente eficiente que desplegar una API REST completa en API Gateway solo para invocar una función. CloudFront Functions (D) no soporta autenticación AWS_IAM, y Lambda@Edge (C) obligaría a programar la lógica de autenticación a mano. Nota: el fichero de soluciones del dump marca A (API Gateway); las URL de función de Lambda, introducidas después, son hoy la forma más ligera de resolver justo este caso de una única función con autenticación IAM."
      },
      {
        pregunta: "Una empresa migró su solución de data warehouse a AWS y tiene una conexión de AWS Direct Connect. Los usuarios de la oficina corporativa consultan el data warehouse con una herramienta de visualización. Cada consulta devuelve una media de 50 MB, y cada página que envía la herramienta pesa unos 500 KB. Los resultados no se cachean. ¿Qué solución da el MENOR coste de salida de datos (egress)?",
        opciones: [
          "Alojar la herramienta de visualización on-premises y consultar el data warehouse directamente por internet.",
          "Alojar la herramienta de visualización en la misma región de AWS que el data warehouse, accediendo por internet.",
          "Alojar la herramienta on-premises y consultar el data warehouse directamente por una conexión de Direct Connect en una ubicación de la misma región.",
          "Alojar la herramienta de visualización en la misma región que el data warehouse, accediendo a ella por una conexión de Direct Connect en una ubicación de la misma región."
        ],
        correctas: [3],
        explicacion: "Al estar la herramienta de visualización en la misma región que el data warehouse, la consulta pesada (50 MB) se queda dentro de AWS sin coste de salida; solo la página final (~500 KB, mucho más pequeña) sale hacia los usuarios corporativos, y hacerlo por Direct Connect en la misma región tiene una tarifa de salida más baja que por internet. Las opciones que hacen viajar la consulta completa de 50 MB hacia on-premises (A, C) generan mucho más tráfico de salida."
      },
      {
        pregunta: "Una empresa de educación online migra a la nube de AWS. Mantiene los expedientes de sus estudiantes en una base de datos PostgreSQL y necesita que los datos estén disponibles y en línea en varias regiones de AWS en todo momento. ¿Qué solución cumple esto con el MENOR trabajo operativo?",
        opciones: [
          "Migrar la base de datos PostgreSQL a un clúster PostgreSQL en instancias EC2.",
          "Migrar la base de datos PostgreSQL a una instancia de Amazon RDS for PostgreSQL con la funcionalidad Multi-AZ activada.",
          "Migrar la base de datos PostgreSQL a una instancia de Amazon RDS for PostgreSQL. Crear una réplica de lectura en otra región.",
          "Migrar la base de datos PostgreSQL a una instancia de Amazon RDS for PostgreSQL. Configurar la copia de snapshots de la base de datos a otra región."
        ],
        correctas: [2],
        explicacion: "Multi-AZ (B) da alta disponibilidad dentro de una única región, no entre regiones. Una réplica de lectura en otra región mantiene los datos disponibles y en línea en varias regiones a la vez, con el mínimo trabajo operativo al ser una funcionalidad gestionada de RDS. Copiar snapshots (D) no mantiene los datos en línea de forma continua en la otra región."
      },
      {
        pregunta: "Una empresa aloja su aplicación web en AWS usando siete instancias EC2. Necesita que las direcciones IP de todas las instancias sanas se devuelvan en respuesta a las consultas DNS. ¿Qué política debería usarse para cumplir este requisito?",
        opciones: ["Política de enrutado simple", "Política de enrutado por latencia", "Política de enrutado multivalor (multivalue answer)", "Política de enrutado por geolocalización"],
        correctas: [2],
        explicacion: "La política multivalor devuelve varias direcciones IP sanas (hasta 8) en respuesta a la consulta DNS, exactamente lo que se pide. Las demás políticas devuelven un único valor (simple, latencia) o seleccionan según la ubicación del usuario (geolocalización), no todas las IP sanas."
      },
      {
        pregunta: "Un laboratorio médico produce datos de un nuevo estudio y quiere ponerlos a disposición, con mínima latencia, de clínicas de todo el país que usan aplicaciones locales basadas en archivos. Los datos están en un bucket de S3 con permisos de solo lectura para cada clínica. ¿Qué debería recomendar un arquitecto de soluciones?",
        opciones: [
          "Desplegar un file gateway de AWS Storage Gateway como máquina virtual on-premises en cada clínica.",
          "Migrar los archivos a las aplicaciones on-premises de cada clínica usando AWS DataSync.",
          "Desplegar un volume gateway de AWS Storage Gateway como máquina virtual on-premises en cada clínica.",
          "Adjuntar un sistema de archivos de Amazon EFS a los servidores on-premises de cada clínica."
        ],
        correctas: [0],
        explicacion: "El file gateway de Storage Gateway presenta el bucket de S3 como un sistema de archivos local (SMB/NFS) con caché local de baja latencia, manteniendo los permisos de solo lectura del bucket. EFS (D) no se puede montar directamente desde fuera de la red de AWS, y el volume gateway (C) expone volúmenes de bloques, no archivos."
      },
      {
        pregunta: "Una empresa usa un sistema de gestión de contenidos que corre en una única instancia EC2, con el servidor web y la base de datos en la misma instancia. Debe hacer la plataforma altamente disponible y capaz de escalar según la demanda. ¿Qué debería recomendar un arquitecto de soluciones?",
        opciones: [
          "Mover la base de datos a Amazon RDS con copias de seguridad automáticas activadas. Lanzar manualmente otra instancia EC2 en la misma zona de disponibilidad. Configurar un Application Load Balancer en esa zona con ambas instancias como destino.",
          "Migrar la base de datos a una instancia de Amazon Aurora con una réplica de lectura en la misma zona de disponibilidad que la instancia EC2 existente. Lanzar manualmente otra instancia EC2 en la misma zona. Configurar un Application Load Balancer con ambas instancias como destino.",
          "Mover la base de datos a Amazon Aurora con una réplica de lectura en otra zona de disponibilidad. Crear una AMI de la instancia EC2. Configurar un Application Load Balancer en dos zonas de disponibilidad. Adjuntar un Auto Scaling group que use la AMI en ambas zonas.",
          "Mover la base de datos a otra instancia EC2 aparte, con copias de seguridad programadas a S3. Crear una AMI de la instancia EC2 original. Configurar un Application Load Balancer en dos zonas. Adjuntar un Auto Scaling group que use la AMI en ambas zonas."
        ],
        correctas: [2],
        explicacion: "Repartir entre dos zonas de disponibilidad reales (tanto la base de datos con su réplica en Aurora, como las instancias vía Auto Scaling group y ALB) da alta disponibilidad de verdad. Las opciones que se quedan en una sola zona (A, B) no protegen frente a un fallo de zona, y usar EC2 en vez de un motor gestionado para la base de datos (D) añade trabajo operativo innecesario."
      },
      {
        pregunta: "Una empresa lanza una aplicación en AWS que usa un Application Load Balancer para dirigir tráfico a al menos dos instancias EC2 en un único grupo de destino, dentro de un Auto Scaling group por entorno. Necesita un entorno de desarrollo y uno de producción; el de producción tendrá picos de tráfico alto. ¿Qué solución configura el entorno de desarrollo de la forma MÁS económica?",
        opciones: [
          "Reconfigurar el grupo de destino del entorno de desarrollo para que tenga una única instancia EC2.",
          "Cambiar el algoritmo de balanceo del ALB a 'least outstanding requests'.",
          "Reducir el tamaño de las instancias EC2 en ambos entornos.",
          "Reducir el número máximo de instancias EC2 en el Auto Scaling group del entorno de desarrollo."
        ],
        correctas: [0],
        explicacion: "En desarrollo no hace falta la misma disponibilidad que en producción: bajar a una sola instancia en el grupo de destino reduce directamente el coste de cómputo del entorno de desarrollo. Cambiar el algoritmo de balanceo (B) no reduce instancias, reducir el tamaño en ambos entornos (C) afecta también a producción (no se pidió), y bajar el máximo del Auto Scaling group (D) no reduce la capacidad ya desplegada si no baja también el número deseado."
      },
      {
        pregunta: "Una empresa ejecuta una aplicación web en instancias EC2 en varias zonas de disponibilidad, en subredes privadas. Un arquitecto de soluciones implementa un Application Load Balancer de cara a internet con esas instancias como grupo de destino, pero el tráfico de internet no llega a ellas. ¿Cómo debería reconfigurar la arquitectura para solucionarlo?",
        opciones: [
          "Sustituir el ALB por un Network Load Balancer. Configurar un NAT Gateway en una subred pública para permitir el tráfico de internet.",
          "Mover las instancias EC2 a subredes públicas. Añadir una regla a sus grupos de seguridad que permita salida hacia 0.0.0.0/0.",
          "Actualizar las tablas de rutas de las subredes de las instancias EC2 para enviar el tráfico 0.0.0.0/0 al Internet Gateway. Añadir una regla de salida hacia 0.0.0.0/0 en sus grupos de seguridad.",
          "Crear subredes públicas en cada zona de disponibilidad. Asociarlas al ALB. Actualizar las tablas de rutas de las subredes públicas con una ruta hacia las subredes privadas."
        ],
        correctas: [3],
        explicacion: "Un ALB de cara a internet necesita estar él mismo en subredes públicas (con ruta a un Internet Gateway); si solo existían subredes privadas, esa es la causa raíz. Creando subredes públicas para el ALB (manteniendo las instancias EC2 en las privadas, que ya se comunican con ellas por la ruta local de la VPC) se soluciona sin exponer las instancias directamente (B) ni cambios innecesarios de balanceador (A) o de rutas de salida (C, que no es el problema: el tráfico no llega ni siquiera al ALB)."
      },
      {
        pregunta: "Una empresa tiene desplegada una base de datos en Amazon RDS for MySQL. Por el aumento de transacciones, el equipo de soporte detecta lecturas lentas contra la instancia y recomienda añadir una réplica de lectura. ¿Qué combinación de acciones debería tomar un arquitecto de soluciones ANTES de implementar este cambio? (Elige dos.)",
        opciones: [
          "Activar la replicación de binlog en el nodo primario de RDS.",
          "Elegir una prioridad de failover para la instancia de base de datos origen.",
          "Permitir que las transacciones de larga duración terminen en la instancia origen.",
          "Crear una global table e indicar las regiones de AWS donde estará disponible.",
          "Activar las copias de seguridad automáticas en la instancia origen, poniendo el período de retención a un valor distinto de 0."
        ],
        correctas: [2, 4],
        explicacion: "RDS exige tener las copias de seguridad automáticas activadas (retención distinta de 0) para poder crear una réplica de lectura de MySQL, y conviene dejar terminar las transacciones largas antes de crear la réplica para evitar bloqueos o una instantánea inconsistente durante el proceso. La prioridad de failover (B) es de Multi-AZ, no de réplicas de lectura, las global tables (D) son de DynamoDB, y RDS activa el binlog automáticamente al configurar la replicación (A), no es algo que se active a mano de antemano."
      },
      {
        pregunta: "Los usuarios reportan que algunos datos enviados no se procesan. Amazon CloudWatch muestra que las instancias EC2 tienen una utilización de CPU constante cercana al 100%. La empresa quiere mejorar el rendimiento del sistema y escalarlo según la carga de usuarios. ¿Qué debería hacer un arquitecto de soluciones?",
        opciones: [
          "Crear una copia de la instancia. Poner todas las instancias detrás de un Application Load Balancer.",
          "Crear un VPC endpoint para Amazon S3. Actualizar el software para usar el endpoint.",
          "Detener las instancias EC2. Cambiar el tipo de instancia a uno con más CPU y memoria. Reiniciarlas.",
          "Enrutar las peticiones entrantes a Amazon SQS. Configurar un Auto Scaling group basado en el tamaño de la cola. Actualizar el software para leer de la cola."
        ],
        correctas: [3],
        explicacion: "Desacoplar con SQS y escalar el Auto Scaling group según el tamaño de la cola permite absorber la carga variable y escalar según la demanda real, en lugar de depender de instancias fijas saturadas (A, C) o de un cambio que no aborda el problema de fondo (B)."
      },
      {
        pregunta: "Una empresa implementa una solución de almacenamiento compartido para una aplicación multimedia alojada en AWS. Necesita que los clientes puedan acceder a los datos por SMB, con una solución totalmente gestionada. ¿Qué solución de AWS cumple estos requisitos?",
        opciones: [
          "Crear un volume gateway de AWS Storage Gateway. Crear un recurso compartido con el protocolo de cliente necesario. Conectar el servidor de aplicación al recurso compartido.",
          "Crear un tape gateway de AWS Storage Gateway. Configurar cintas que usen Amazon S3. Conectar el servidor de aplicación al tape gateway.",
          "Crear una instancia EC2 Windows. Instalar y configurar un rol de recurso compartido de archivos de Windows en la instancia. Conectar el servidor de aplicación al recurso compartido.",
          "Crear un sistema de archivos de Amazon FSx for Windows File Server. Adjuntar el sistema de archivos al servidor de origen. Conectar el servidor de aplicación al sistema de archivos."
        ],
        correctas: [3],
        explicacion: "Amazon FSx for Windows File Server es un servicio totalmente gestionado con soporte nativo del protocolo SMB. El volume gateway (A) presenta volúmenes de bloque (iSCSI), no recursos SMB; el tape gateway (B) es para copias de seguridad tipo cinta; y una instancia EC2 con un rol de Windows (C) no es una solución gestionada, exige mantenimiento propio."
      },
      {
        pregunta: "El equipo de seguridad de una empresa pide que el tráfico de red se capture en VPC Flow Logs. Los logs se consultarán con frecuencia durante 90 días y después de forma intermitente. ¿Qué debería hacer un arquitecto de soluciones al configurar los logs?",
        opciones: [
          "Usar Amazon CloudWatch como destino. Configurar el grupo de logs de CloudWatch con una expiración de 90 días.",
          "Usar Amazon Kinesis como destino. Configurar el stream de Kinesis para retener los logs siempre 90 días.",
          "Usar AWS CloudTrail como destino. Configurar CloudTrail para guardar en un bucket de S3 y activar S3 Intelligent-Tiering.",
          "Usar Amazon S3 como destino. Activar una política de ciclo de vida de S3 que pase los logs a S3 Standard-Infrequent Access (S3 Standard-IA) tras 90 días."
        ],
        correctas: [3],
        explicacion: "S3 con una política de ciclo de vida hacia S3 Standard-IA tras 90 días encaja exactamente con el patrón descrito (acceso frecuente los primeros 90 días, después intermitente) al menor coste. CloudWatch con expiración a los 90 días (A) borraría los logs en vez de abaratarlos, y CloudTrail (C) no es el destino de los VPC Flow Logs."
      },
      {
        pregunta: "Una instancia EC2 está en una subred privada de una VPC nueva, sin acceso saliente a internet, pero necesita poder descargar actualizaciones de seguridad mensuales de un proveedor externo. ¿Qué debería hacer un arquitecto de soluciones para cumplir este requisito?",
        opciones: [
          "Crear un Internet Gateway y adjuntarlo a la VPC. Configurar la tabla de rutas de la subred privada para usar el Internet Gateway como ruta por defecto.",
          "Crear un NAT Gateway y colocarlo en una subred pública. Configurar la tabla de rutas de la subred privada para usar el NAT Gateway como ruta por defecto.",
          "Crear una instancia NAT y colocarla en la misma subred que la instancia EC2. Configurar la tabla de rutas de la subred privada para usar la instancia NAT como ruta por defecto.",
          "Crear un Internet Gateway y adjuntarlo a la VPC. Crear una instancia NAT en la misma subred que la instancia EC2. Configurar la tabla de rutas para usar el Internet Gateway como ruta por defecto."
        ],
        correctas: [1],
        explicacion: "El NAT Gateway va en una subred pública (con salida propia a internet vía Internet Gateway) y da salida saliente a las subredes privadas que lo apunten como ruta por defecto, manteniendo la instancia inaccesible desde fuera. Un Internet Gateway directo en la subred privada (A, D) la haría pública, y una instancia NAT en la propia subred privada (C) no tiene forma de salir a internet ella misma."
      },
      {
        pregunta: "Un arquitecto de soluciones necesita diseñar un sistema para guardar los expedientes de casos de clientes. Los archivos son activos importantes de la empresa y su número crecerá con el tiempo. Deben ser accesibles simultáneamente desde varios servidores de aplicación en instancias EC2, y la solución debe tener redundancia integrada. ¿Qué solución cumple estos requisitos?",
        opciones: ["Amazon Elastic File System (Amazon EFS)", "Amazon Elastic Block Store (Amazon EBS)", "Amazon S3 Glacier Deep Archive", "AWS Backup"],
        correctas: [0],
        explicacion: "EFS es un sistema de archivos compartido que se puede montar simultáneamente desde muchas instancias EC2, escala automáticamente y replica los datos entre varias zonas de disponibilidad (redundancia integrada). EBS (B) solo se puede montar en una instancia a la vez (salvo Multi-Attach, limitado), y Glacier Deep Archive (C) o AWS Backup (D) no son sistemas de archivos de acceso simultáneo."
      }
    ]
  },
  {
    id: "examen-06",
    titulo: "Examen de práctica 6",
    resumen: "50 preguntas (253-302 del banco de dumps) sobre IAM, resiliencia de arquitecturas, almacenamiento, streaming de datos y recuperación ante desastres.",
    preguntas: [
      {
        pregunta: "Un arquitecto de soluciones ha creado dos políticas de IAM: Política1 y Política2. Ambas están adjuntas a un grupo de IAM. Se añade un ingeniero cloud como usuario de IAM a ese grupo. ¿Qué acción podrá realizar el ingeniero cloud?",
        opciones: ["Eliminar usuarios de IAM", "Eliminar directorios", "Eliminar instancias Amazon EC2", "Eliminar logs de Amazon CloudWatch Logs"],
        correctas: [2],
        explicacion: "Pregunta basada en el contenido concreto de las dos políticas adjuntas (normalmente mostradas como imagen en el examen real), que aquí no se reproduce en texto; se mantiene la respuesta del fichero de origen."
      },
      {
        pregunta: "Una empresa revisa una migración reciente de una aplicación de tres capas a una VPC. El equipo de seguridad descubre que no se aplica el principio de mínimo privilegio en las reglas de entrada y salida de los security groups de EC2 entre las capas de la aplicación. ¿Qué debería hacer un arquitecto de soluciones para corregir esto?",
        opciones: [
          "Crear reglas de security group usando el ID de instancia como origen o destino.",
          "Crear reglas de security group usando el ID del security group como origen o destino.",
          "Crear reglas de security group usando los bloques CIDR de la VPC como origen o destino.",
          "Crear reglas de security group usando los bloques CIDR de la subred como origen o destino."
        ],
        correctas: [1],
        explicacion: "Referenciar el ID de otro security group como origen/destino permite que la regla siga aplicando dinámicamente a cualquier instancia que pertenezca a ese security group, sin importar su IP, cumpliendo el mínimo privilegio de forma mantenible. Usar CIDRs (C, D) es más amplio y menos preciso, y el ID de instancia (A) no es un tipo de origen válido en reglas de security group."
      },
      {
        pregunta: "Un flujo de compra de un ecommerce escribe un pedido en una base de datos y llama a un servicio para procesar el pago. Los usuarios sufren timeouts durante el checkout, y al reenviar el formulario se crean varios pedidos únicos para la misma transacción deseada. ¿Cómo debería refactorizar el arquitecto este flujo para evitar pedidos duplicados?",
        opciones: [
          "Configurar la aplicación web para enviar un mensaje de pedido a Amazon Kinesis Data Firehose. Hacer que el servicio de pago recupere el mensaje de Kinesis Data Firehose y procese el pedido.",
          "Crear una regla en AWS CloudTrail que invoque una función Lambda según la ruta de la petición registrada. Usar Lambda para consultar la base de datos, llamar al servicio de pago y pasar la información del pedido.",
          "Guardar el pedido en la base de datos. Enviar un mensaje con el número de pedido a Amazon SNS. Configurar el servicio de pago para hacer polling sobre SNS, recuperar el mensaje y procesar el pedido.",
          "Guardar el pedido en la base de datos. Enviar un mensaje con el número de pedido a una cola FIFO de Amazon SQS. Configurar el servicio de pago para recuperar el mensaje y procesar el pedido. Borrar el mensaje de la cola."
        ],
        correctas: [3],
        explicacion: "Guardar primero el pedido en la base de datos garantiza que no se pierda aunque el pago se retrase, y una cola SQS FIFO asegura procesamiento en orden y exactamente una vez por número de pedido, evitando duplicados de forma idempotente. Kinesis Data Firehose (A) no es un mecanismo de colas con deduplicación, CloudTrail (B) es un servicio de auditoría, no de mensajería, y SNS por sí solo (C) no garantiza deduplicación ni entrega única como SQS FIFO."
      },
      {
        pregunta: "Un arquitecto de soluciones implementa una aplicación de revisión de documentos usando un bucket de S3. La solución debe evitar el borrado accidental de documentos y garantizar que todas las versiones estén disponibles. Los usuarios deben poder descargar, modificar y subir documentos. ¿Qué combinación de acciones cumple estos requisitos? (Elige dos.)",
        opciones: ["Activar una ACL de bucket de solo lectura.", "Activar versionado en el bucket.", "Adjuntar una política de IAM al bucket.", "Activar MFA Delete en el bucket.", "Cifrar el bucket con AWS KMS."],
        correctas: [1, 3],
        explicacion: "El versionado conserva todas las versiones de cada objeto aunque se sobrescriban o borren, y MFA Delete añade un factor de autenticación adicional obligatorio para poder borrar versiones o desactivar el versionado, protegiendo contra borrados accidentales. Una ACL de solo lectura (A) impediría subir o modificar documentos, y una política de IAM (C) o el cifrado KMS (E) no evitan por sí solos el borrado accidental ni garantizan el historial de versiones."
      },
      {
        pregunta: "Una empresa construye una solución para reportar eventos de Amazon EC2 Auto Scaling de todas las aplicaciones de una cuenta de AWS. Necesita una solución serverless para guardar el estado de Auto Scaling en Amazon S3, que luego alimentará un dashboard casi en tiempo real. La solución no debe afectar a la velocidad de lanzamiento de las instancias EC2. ¿Cómo debería mover los datos a S3?",
        opciones: [
          "Usar un metric stream de Amazon CloudWatch para enviar el estado de Auto Scaling a Amazon Kinesis Data Firehose. Guardar los datos en S3.",
          "Lanzar un clúster de Amazon EMR para recoger el estado de Auto Scaling y enviarlo a Kinesis Data Firehose. Guardar los datos en S3.",
          "Crear una regla de Amazon EventBridge que invoque una función Lambda según un calendario. Configurar la función Lambda para enviar el estado de Auto Scaling directamente a S3.",
          "Usar un script de arranque durante el lanzamiento de una instancia EC2 para instalar Kinesis Agent. Configurar Kinesis Agent para recoger el estado de Auto Scaling y enviarlo a Kinesis Data Firehose. Guardar los datos en S3."
        ],
        correctas: [0],
        explicacion: "Un metric stream de CloudWatch hacia Kinesis Data Firehose es una tubería totalmente gestionada y serverless que entrega los datos casi en tiempo real a S3 sin ningún componente que se ejecute en las propias instancias EC2, por lo que no afecta a su velocidad de lanzamiento. EMR (B) añade infraestructura a gestionar, un Lambda programado (C) no es casi en tiempo real, y un agente instalado en cada instancia (D) sí puede afectar al arranque."
      },
      {
        pregunta: "Una empresa recibe cientos de archivos .csv de 1 GB en un bucket de S3 cada hora. Cada vez que se sube un archivo, hay que convertirlo a formato Apache Parquet y guardarlo en otro bucket de S3. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Crear una función Lambda que descargue los .csv, los convierta a Parquet y los guarde en S3. Invocar la función Lambda en cada evento PUT de S3.",
          "Crear un job de Apache Spark que lea los .csv, los convierta a Parquet y los guarde en S3. Crear una función Lambda para cada evento PUT de S3 que invoque el job de Spark.",
          "Crear una tabla y un crawler de AWS Glue para el bucket de S3. Programar una función Lambda para que use periódicamente Amazon Athena, convierta los resultados a Parquet y los guarde en S3.",
          "Crear un job ETL de AWS Glue que convierta los .csv a Parquet y los guarde en S3. Crear una función Lambda para cada evento PUT de S3 que invoque el job ETL."
        ],
        correctas: [3],
        explicacion: "AWS Glue es un servicio ETL totalmente gestionado especializado en este tipo de conversión de formato; delegar la conversión al job de Glue y usar Lambda solo como disparador por evento PUT minimiza la infraestructura propia. Un Lambda que hace la conversión él mismo (A) puede tener problemas de tiempo/memoria con archivos de 1 GB, y montar Spark (B) o un pipeline periódico con Athena (C) añade más gestión de la necesaria."
      },
      {
        pregunta: "Una empresa implementa nuevas políticas de retención de datos para todas las bases de datos en instancias de Amazon RDS. Debe retener copias de seguridad diarias durante un mínimo de 2 años, de forma consistente y restaurable. ¿Qué solución debería recomendar un arquitecto de soluciones?",
        opciones: [
          "Crear un backup vault en AWS Backup para las copias de RDS. Crear un plan de backup con programación diaria y expiración a los 2 años. Asignar las instancias RDS al plan.",
          "Configurar una ventana de backup diaria para las instancias RDS. Asignar una política de retención de 2 años a cada instancia. Usar Amazon Data Lifecycle Manager (DLM) para programar el borrado de snapshots.",
          "Configurar que los logs de transacciones de la base de datos se respalden automáticamente en CloudWatch Logs con expiración a los 2 años.",
          "Configurar una tarea de replicación de AWS DMS con captura de cambios (CDC) hacia S3 como destino, con una política de ciclo de vida de S3 que borre los snapshots tras 2 años."
        ],
        correctas: [0],
        explicacion: "AWS Backup es el servicio diseñado específicamente para centralizar y automatizar políticas de retención consistentes y restaurables sobre RDS, con programación y expiración configurables desde un único plan. DLM (B) no gestiona snapshots de RDS (está pensado para EBS/AMI), CloudWatch Logs (C) no es un mecanismo de backup de bases de datos completas, y DMS con CDC (D) es para migración/replicación continua, no para copias de seguridad periódicas."
      },
      {
        pregunta: "El equipo de cumplimiento de una empresa necesita mover sus recursos compartidos de archivos a AWS. Los recursos corren sobre un file share SMB de Windows Server, con acceso controlado por un Active Directory local autogestionado. La empresa quiere usar Amazon FSx for Windows File Server y necesita que los grupos del Active Directory local sigan restringiendo el acceso a los recursos compartidos, carpetas y archivos tras la migración. Ya se ha creado el sistema de archivos de FSx. ¿Qué solución cumple esto?",
        opciones: [
          "Crear un Active Directory Connector para conectar con el Active Directory. Mapear los grupos del Active Directory a grupos de IAM para restringir el acceso.",
          "Asignar una etiqueta con clave Restrict y valor Compliance. Mapear los grupos del Active Directory a grupos de IAM para restringir el acceso.",
          "Crear un rol vinculado a servicio de IAM enlazado directamente a FSx for Windows File Server para restringir el acceso.",
          "Unir (join) el sistema de archivos al Active Directory para restringir el acceso."
        ],
        correctas: [3],
        explicacion: "Al unir el sistema de archivos FSx al Active Directory local existente, se extiende la relación de confianza y el control de acceso pasa a basarse directamente en los grupos ya existentes en ese Active Directory, sin necesidad de recrear permisos. IAM no controla permisos NTFS/SMB (A, B, C); ese control de acceso a nivel de archivo y carpeta lo gestiona el propio Active Directory."
      },
      {
        pregunta: "Una empresa anuncia el despliegue de su web de retail a una audiencia global. La web corre sobre varias instancias EC2 detrás de un Elastic Load Balancer, en un Auto Scaling group repartido entre varias zonas de disponibilidad. La empresa quiere servir versiones distintas del contenido según el dispositivo con el que accede cada cliente. ¿Qué combinación de acciones cumple esto? (Elige dos.)",
        opciones: [
          "Configurar Amazon CloudFront para cachear varias versiones del contenido.",
          "Configurar una cabecera de host en un Network Load Balancer para enrutar tráfico a distintas instancias.",
          "Configurar una función Lambda@Edge que envíe objetos específicos a los usuarios según la cabecera User-Agent.",
          "Configurar AWS Global Accelerator. Reenviar peticiones a un Network Load Balancer (NLB). Configurar el NLB para enrutamiento basado en host a distintas instancias EC2.",
          "Configurar AWS Global Accelerator. Reenviar peticiones a un Network Load Balancer (NLB). Configurar el NLB para enrutamiento basado en ruta (path) a distintas instancias EC2."
        ],
        correctas: [0, 2],
        explicacion: "CloudFront puede cachear distintas variantes de contenido (por ejemplo, usando la cabecera Vary), y Lambda@Edge permite inspeccionar el User-Agent en el edge y servir dinámicamente el objeto adecuado según el tipo de dispositivo. Un NLB (B, D, E) opera en la capa de transporte (capa 4) y no puede inspeccionar cabeceras HTTP como User-Agent para tomar esas decisiones."
      },
      {
        pregunta: "Una empresa va a usar Amazon ElastiCache para su aplicación web multicapa. Un arquitecto de soluciones crea una VPC de Caché para el clúster de ElastiCache y una VPC de Aplicación para las instancias EC2, ambas en la misma región. Necesita dar acceso desde las instancias EC2 al clúster de ElastiCache. ¿Qué solución cumple esto de la forma MÁS económica?",
        opciones: [
          "Crear una conexión de peering entre las VPCs. Añadir una entrada de tabla de rutas para el peering en ambas VPCs. Configurar una regla de entrada en el security group del clúster de ElastiCache que permita conexiones desde el security group de la aplicación.",
          "Crear una VPC de tránsito. Actualizar las tablas de rutas de ambas VPCs para enrutar el tráfico a través de la VPC de tránsito. Configurar una regla de entrada en el security group del clúster de ElastiCache que permita conexiones desde el security group de la aplicación.",
          "Crear una conexión de peering entre las VPCs. Añadir una entrada de tabla de rutas para el peering en ambas VPCs. Configurar una regla de entrada en el security group de la propia conexión de peering que permita conexiones desde el security group de la aplicación.",
          "Crear una VPC de tránsito. Actualizar las tablas de rutas de ambas VPCs para enrutar el tráfico a través de la VPC de tránsito. Configurar una regla de entrada en el security group de la VPC de tránsito que permita conexiones desde el security group de la aplicación."
        ],
        correctas: [0],
        explicacion: "El VPC peering es la opción más económica para conectar dos VPCs en la misma región (no cobra por hora ni por gateway, solo transferencia de datos), y las conexiones de peering no tienen su propio security group: el control de acceso se hace en el security group del recurso destino (ElastiCache). Una VPC de tránsito (B, D) añade el coste de un Transit Gateway innecesario para un caso de dos VPCs, y la opción C referencia un security group de peering que no existe como tal."
      },
      {
        pregunta: "Una empresa construye una aplicación de varios microservicios usando contenedores en AWS. Necesita una solución que minimice el esfuerzo continuo de mantenimiento y escalado, sin poder gestionar infraestructura adicional. ¿Qué combinación de acciones cumple esto? (Elige dos.)",
        opciones: [
          "Desplegar un clúster de Amazon ECS.",
          "Desplegar el plano de control de Kubernetes en instancias EC2 repartidas entre varias zonas de disponibilidad.",
          "Desplegar un servicio de Amazon ECS con tipo de lanzamiento EC2. Especificar un número de tareas deseado mayor o igual a 2.",
          "Desplegar un servicio de Amazon ECS con tipo de lanzamiento Fargate. Especificar un número de tareas deseado mayor o igual a 2.",
          "Desplegar nodos worker de Kubernetes en instancias EC2 repartidas entre varias zonas de disponibilidad. Crear un deployment con dos o más réplicas por microservicio."
        ],
        correctas: [0, 3],
        explicacion: "Un clúster de ECS agrupa lógicamente los servicios y tareas, y el tipo de lanzamiento Fargate elimina la necesidad de aprovisionar o gestionar las instancias EC2 subyacentes: AWS gestiona toda la infraestructura de cómputo. Gestionar el plano de control o los nodos worker de Kubernetes (B, E) o usar el tipo de lanzamiento EC2 (C) implica seguir administrando instancias EC2."
      },
      {
        pregunta: "Una web corre sobre 10 instancias EC2 con tráfico dirigido por Amazon Route 53. Ocasionalmente hay errores de timeout al navegar la aplicación; el equipo de redes descubre que algunas consultas DNS devuelven IPs de instancias no saludables. ¿Qué debería implementar un arquitecto de soluciones para resolver estos timeouts?",
        opciones: [
          "Crear un registro de Route 53 con política de enrutamiento simple para cada instancia EC2. Asociar un health check a cada registro.",
          "Crear un registro de Route 53 con política de enrutamiento failover para cada instancia EC2. Asociar un health check a cada registro.",
          "Crear una distribución de Amazon CloudFront con las instancias EC2 como origen. Asociar un health check a las instancias EC2.",
          "Crear un Application Load Balancer (ALB) con health check delante de las instancias EC2. Enrutar desde Route 53 hacia el ALB."
        ],
        correctas: [3],
        explicacion: "Un ALB con health checks retira automáticamente las instancias no saludables de la rotación de tráfico, y al apuntar Route 53 al ALB (en vez de a las IPs individuales), las consultas DNS siempre resuelven al ALB, que ya se encarga de enviar tráfico solo a instancias saludables. Usar health checks directamente en registros de Route 53 por instancia (A, B) sigue exponiendo IPs individuales y no equilibra tráfico entre ellas, y CloudFront (C) no sustituye la función de un balanceador de capa 7 entre instancias."
      },
      {
        pregunta: "Un arquitecto de soluciones necesita diseñar una aplicación de alta disponibilidad con capas web, de aplicación y de base de datos. La entrega de contenido HTTPS debe estar lo más cerca posible del edge, con el menor tiempo de entrega posible. ¿Qué solución cumple esto y es la MÁS segura?",
        opciones: [
          "Configurar un Application Load Balancer (ALB) público con instancias EC2 redundantes en subredes públicas. Configurar Amazon CloudFront para entregar el contenido HTTPS usando el ALB público como origen.",
          "Configurar un ALB público con instancias EC2 redundantes en subredes privadas. Configurar CloudFront para entregar el contenido HTTPS usando las instancias EC2 como origen.",
          "Configurar un ALB público con instancias EC2 redundantes en subredes privadas. Configurar CloudFront para entregar el contenido HTTPS usando el ALB público como origen.",
          "Configurar un ALB público con instancias EC2 redundantes en subredes públicas. Configurar CloudFront para entregar el contenido HTTPS usando las instancias EC2 como origen."
        ],
        correctas: [2],
        explicacion: "CloudFront ya proporciona la entrega cercana al edge; para maximizar la seguridad, las instancias EC2 deben quedar en subredes privadas (no expuestas directamente) y CloudFront debe apuntar al ALB (no a las instancias) como origen, de modo que el ALB sea el único punto de entrada público. Exponer las instancias en subredes públicas (A, D) o usarlas directamente como origen de CloudFront (B, D) aumenta la superficie de ataque."
      },
      {
        pregunta: "Una plataforma de videojuegos en AWS es sensible a la latencia, porque puede afectar la experiencia e introducir ventajas injustas entre jugadores. La aplicación está desplegada en todas las regiones de AWS, sobre instancias EC2 en Auto Scaling groups detrás de Application Load Balancers. Se necesita monitorizar la salud de la aplicación y redirigir el tráfico a los endpoints saludables. ¿Qué solución cumple esto?",
        opciones: [
          "Configurar un accelerator en AWS Global Accelerator. Añadir un listener para el puerto que usa la aplicación y asociarlo a un endpoint regional en cada región. Añadir el ALB como endpoint.",
          "Crear una distribución de Amazon CloudFront con el ALB como servidor de origen. Configurar el comportamiento de caché para usar las cabeceras de caché del origen. Usar funciones Lambda para optimizar el tráfico.",
          "Crear una distribución de CloudFront con Amazon S3 como servidor de origen. Configurar el comportamiento de caché para usar las cabeceras de caché del origen. Usar funciones Lambda para optimizar el tráfico.",
          "Configurar una base de datos Amazon DynamoDB como almacén de datos de la aplicación. Crear un clúster DynamoDB Accelerator (DAX) como caché en memoria."
        ],
        correctas: [0],
        explicacion: "AWS Global Accelerator usa la red troncal global de AWS y IPs anycast estáticas para enrutar el tráfico al endpoint regional más óptimo según salud, geografía y políticas de enrutamiento, exactamente el mecanismo diseñado para minimizar latencia y redirigir automáticamente ante fallos de salud entre regiones. CloudFront (B, C) es un CDN pensado para contenido cacheable, no para tráfico interactivo sensible a latencia con múltiples orígenes regionales, y DAX (D) es una caché de base de datos, no una solución de enrutamiento global."
      },
      {
        pregunta: "Una empresa tiene un millón de usuarios en su app móvil y necesita analizar el uso de datos casi en tiempo real. También necesita cifrar los datos casi en tiempo real y guardarlos en una ubicación centralizada en formato Apache Parquet para su procesamiento posterior. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Crear un data stream de Amazon Kinesis para guardar los datos en S3. Crear una aplicación de Kinesis Data Analytics para analizarlos. Invocar una función Lambda para enviar los datos a la aplicación de Kinesis Data Analytics.",
          "Crear un data stream de Kinesis para guardar los datos en S3. Crear un clúster de Amazon EMR para analizarlos. Invocar una función Lambda para enviar los datos al clúster EMR.",
          "Crear un delivery stream de Amazon Kinesis Data Firehose para guardar los datos en S3. Crear un clúster de Amazon EMR para analizarlos.",
          "Crear un delivery stream de Kinesis Data Firehose para guardar los datos en S3. Crear una aplicación de Kinesis Data Analytics para analizarlos."
        ],
        correctas: [3],
        explicacion: "Kinesis Data Firehose entrega datos a S3 de forma totalmente gestionada (incluyendo cifrado en tránsito y en reposo, y conversión a Parquet integrada) sin necesidad de código intermedio como en las opciones con Lambda, y Kinesis Data Analytics permite analizar el stream casi en tiempo real, todo con el mínimo esfuerzo operativo. Las opciones con Lambda intermedio (A, B) o un clúster EMR que gestionar (B, C) añaden más piezas que administrar."
      },
      {
        pregunta: "Una empresa de videojuegos tiene una web que muestra puntuaciones, corriendo sobre instancias EC2 detrás de un Application Load Balancer, con datos en una base de datos Amazon RDS para MySQL. Los usuarios sufren retrasos causados por el rendimiento de lectura de la base de datos. La empresa quiere mejorar la experiencia minimizando cambios en la arquitectura de la aplicación. ¿Qué debería hacer un arquitecto de soluciones?",
        opciones: ["Usar Amazon ElastiCache delante de la base de datos.", "Usar RDS Proxy entre la aplicación y la base de datos.", "Migrar la aplicación de instancias EC2 a AWS Lambda.", "Migrar la base de datos de RDS para MySQL a Amazon DynamoDB."],
        correctas: [1],
        explicacion: "RDS Proxy agrupa y reutiliza conexiones de base de datos de forma gestionada, reduciendo la sobrecarga de gestión de conexiones sin requerir ningún cambio en la lógica de la aplicación ni en las consultas. ElastiCache (A) resolvería el problema pero exige modificar la aplicación para leer/escribir en la caché, y migrar a Lambda (C) o a DynamoDB (D) implica cambios arquitectónicos mucho mayores de los que pide el enunciado."
      },
      {
        pregunta: "Un ecommerce nota degradación del rendimiento de su web basada en Amazon RDS, atribuida a un aumento de consultas SQL de solo lectura de analistas de negocio. Se necesita resolver el problema con cambios mínimos en la aplicación web existente. ¿Qué debería recomendar el arquitecto de soluciones?",
        opciones: ["Exportar los datos a Amazon DynamoDB y que los analistas ejecuten ahí sus consultas.", "Cargar los datos en Amazon ElastiCache y que los analistas ejecuten ahí sus consultas.", "Crear una réplica de lectura de la base de datos primaria y que los analistas ejecuten ahí sus consultas.", "Copiar los datos a un clúster de Amazon Redshift y que los analistas ejecuten ahí sus consultas."],
        correctas: [2],
        explicacion: "Una réplica de lectura de RDS se crea de forma transparente para la aplicación (que sigue usando la base de datos primaria sin cambios) y permite desviar hacia ella las consultas de solo lectura de los analistas, aliviando la carga de la primaria con el mínimo cambio posible. Migrar a DynamoDB (A) o Redshift (D) exige rediseñar el esquema y las consultas, y ElastiCache (B) requiere cambios en la aplicación para leer de la caché."
      },
      {
        pregunta: "Una empresa usa una cuenta de AWS centralizada para guardar logs en varios buckets de S3. Un arquitecto de soluciones necesita garantizar que los datos se cifren en reposo antes de subirse a los buckets, y que también viajen cifrados en tránsito. ¿Qué solución cumple esto?",
        opciones: [
          "Usar cifrado del lado del cliente para cifrar los datos antes de subirlos a los buckets de S3.",
          "Usar cifrado del lado del servidor para cifrar los datos que se suben a los buckets de S3.",
          "Crear políticas de bucket que exijan cifrado del lado del servidor con claves administradas por S3 (SSE-S3) para las subidas.",
          "Activar la opción de seguridad para cifrar los buckets de S3 usando una clave por defecto de AWS KMS."
        ],
        correctas: [0],
        explicacion: "El requisito es que el dato ya esté cifrado ANTES de subirse (\"encrypted at rest before the data is uploaded\"); solo el cifrado del lado del cliente cumple eso, ya que el cifrado ocurre en el origen antes de que el objeto llegue a S3. Las opciones de cifrado del lado del servidor (B, C, D) cifran el objeto una vez ya ha llegado a S3, no antes de la subida."
      },
      {
        pregunta: "Un arquitecto de soluciones observa que un job de procesamiento por lotes nocturno tarda 1 hora en escalar automáticamente hasta la capacidad EC2 deseada. El pico de capacidad es el mismo cada noche y los jobs siempre empiezan a la 1 AM. Se necesita una solución económica que alcance rápidamente la capacidad deseada y permita que el Auto Scaling group reduzca capacidad tras terminar los jobs. ¿Qué debería hacer el arquitecto de soluciones?",
        opciones: [
          "Aumentar la capacidad mínima del Auto Scaling group.",
          "Aumentar la capacidad máxima del Auto Scaling group.",
          "Configurar escalado programado (scheduled scaling) para alcanzar el nivel de cómputo deseado.",
          "Cambiar la política de escalado para añadir más instancias EC2 en cada operación de escalado."
        ],
        correctas: [2],
        explicacion: "El escalado programado permite definir de antemano un aumento de capacidad justo antes de la 1 AM (cuando se sabe que empieza el job) y una reducción posterior, alcanzando la capacidad deseada al instante sin esperar a que se disparen métricas reactivas. Subir el mínimo (A) mantendría esa capacidad todo el día de forma innecesariamente costosa, subir el máximo (B) no adelanta el escalado, y cambiar el tamaño de cada paso de escalado (D) no resuelve el retraso inicial de una hora."
      },
      {
        pregunta: "Una web dinámica corre sobre una flota de instancias EC2 detrás de un ALB en la región us-west-1, y necesita servir varios idiomas a clientes de todo el mundo. Los usuarios de otras partes del mundo sufren alta latencia. La empresa no quiere recrear la arquitectura en varias regiones. ¿Qué debería hacer un arquitecto de soluciones?",
        opciones: [
          "Sustituir la arquitectura por una web servida desde un bucket de S3. Configurar una distribución de CloudFront con el bucket como origen. Cachear según la cabecera Accept-Language.",
          "Configurar una distribución de CloudFront con el ALB como origen. Cachear según la cabecera Accept-Language.",
          "Crear una API de Amazon API Gateway integrada con el ALB, con integración de tipo HTTP. Configurar una etapa de la API para cachear según la cabecera Accept-Language.",
          "Lanzar una instancia EC2 en cada región adicional y configurar NGINX como servidor de caché para esa región. Poner todas las instancias EC2 y el ALB detrás de un registro de Route 53 con política de enrutamiento por geolocalización."
        ],
        correctas: [1],
        explicacion: "CloudFront puede usar el ALB existente como origen sin tocar la arquitectura actual, y cachear en el edge según la cabecera Accept-Language sirve contenido en el idioma correcto con baja latencia global, aprovechando la red de puntos de presencia de CloudFront. Migrar a S3 (A) cambiaría radicalmente la arquitectura dinámica actual, API Gateway con integración HTTP (C) no está pensado para cachear webs completas, y desplegar instancias y NGINX por región (D) es justamente lo que la empresa quiere evitar."
      },
      {
        pregunta: "Un ecommerce en rápido crecimiento corre sus cargas en una única región de AWS. Se necesita una estrategia de recuperación ante desastres (DR) con otra región, manteniendo la base de datos al día en la región de DR con la menor latencia posible. El resto de la infraestructura en la región de DR debe correr a capacidad reducida y poder escalar si hace falta. ¿Qué solución cumple esto con el MENOR RTO (recovery time objective)?",
        opciones: [
          "Usar una base de datos global de Amazon Aurora con despliegue de tipo pilot light.",
          "Usar una base de datos global de Amazon Aurora con despliegue de tipo warm standby.",
          "Usar una instancia RDS Multi-AZ con despliegue de tipo pilot light.",
          "Usar una instancia RDS Multi-AZ con despliegue de tipo warm standby."
        ],
        correctas: [1],
        explicacion: "Aurora Global Database replica de forma continua y con baja latencia (normalmente <1 segundo) hacia réplicas en otras regiones, y un despliegue warm standby mantiene el resto de la infraestructura de la región de DR ya funcionando a capacidad reducida, lista para escalar rápido, lo que reduce el RTO frente a un pilot light (A) donde hay que arrancar más componentes desde cero. RDS Multi-AZ (C, D) no ofrece replicación entre regiones por sí mismo (es alta disponibilidad dentro de una región)."
      },
      {
        pregunta: "Una empresa corre una aplicación en instancias EC2 y necesita una solución de recuperación ante desastres con un RTO menor de 4 horas, usando la menor cantidad posible de recursos de AWS durante la operación normal. ¿Qué solución cumple esto de la forma MÁS eficiente operativamente?",
        opciones: [
          "Crear AMIs de respaldo de las instancias EC2. Copiar las AMIs a una región secundaria. Automatizar el despliegue de infraestructura en la región secundaria con AWS Lambda y scripts personalizados.",
          "Crear AMIs de respaldo de las instancias EC2. Copiar las AMIs a una región secundaria. Automatizar el despliegue de infraestructura en la región secundaria con AWS CloudFormation.",
          "Lanzar instancias EC2 en una región secundaria y mantenerlas activas en todo momento.",
          "Lanzar instancias EC2 en una zona de disponibilidad secundaria y mantenerlas activas en todo momento."
        ],
        correctas: [1],
        explicacion: "Este es el patrón clásico de \"pilot light\": AMIs actualizadas copiadas a la región secundaria más una plantilla de CloudFormation lista para desplegar bajo demanda logran un RTO de pocas horas sin mantener recursos activos permanentemente. Usar Lambda con scripts personalizados (A) es más frágil y menos operativamente eficiente que Infrastructure-as-Code con CloudFormation, y mantener instancias activas permanentemente (C, D) consume más recursos de los necesarios, además de que una zona de disponibilidad secundaria (D) no protege ante un desastre regional."
      },
      {
        pregunta: "Una aplicación web interna corre sobre instancias EC2 detrás de un ALB, en un Auto Scaling group que escala hasta 20 instancias en horario laboral y baja a 2 por la noche. El personal se queja de que la aplicación va muy lenta al empezar el día, aunque funciona bien a media mañana. ¿Cómo debería cambiarse el escalado para resolver la queja manteniendo los costes al mínimo?",
        opciones: [
          "Implementar una acción programada que fije la capacidad deseada en 20 poco antes de que abra la oficina.",
          "Implementar una acción de step scaling disparada con un umbral de CPU más bajo, y reducir el periodo de enfriamiento.",
          "Implementar una acción de target tracking disparada con un umbral de CPU más bajo, y reducir el periodo de enfriamiento.",
          "Implementar una acción programada que fije la capacidad mínima y máxima en 20 poco antes de que abra la oficina."
        ],
        correctas: [0],
        explicacion: "El problema es predecible (siempre ocurre a la misma hora), así que una acción de escalado programada que ya tenga las 20 instancias listas justo antes de que empiece la jornada resuelve la lentitud inicial sin depender de que una métrica reactiva (CPU) tarde en dispararse. Ajustar el escalado reactivo por CPU (B, C) seguiría tardando en reaccionar tras la subida real de carga, y fijar mínimo y máximo en 20 todo el tiempo (D) elevaría el coste innecesariamente fuera de esas horas."
      },
      {
        pregunta: "Una aplicación multicapa corre en varias instancias EC2 en un Auto Scaling group, con una instancia RDS para Oracle como capa de datos que usa funciones PL/SQL específicas de Oracle. El tráfico crece de forma constante, sobrecargando las instancias EC2 y agotando el almacenamiento de RDS. El Auto Scaling group no tiene métricas de escalado, solo define el mínimo de instancias saludables. Se prevé que el tráfico siga creciendo a un ritmo constante pero impredecible antes de estabilizarse. ¿Qué debería hacer el arquitecto de soluciones para que el sistema escale automáticamente ante el aumento de tráfico? (Elige dos.)",
        opciones: [
          "Configurar Auto Scaling de almacenamiento en la instancia RDS para Oracle.",
          "Migrar la base de datos a Amazon Aurora para usar almacenamiento con Auto Scaling.",
          "Configurar una alarma en la instancia RDS para Oracle quo salte con poco espacio libre.",
          "Configurar el Auto Scaling group para usar la CPU media como métrica de escalado.",
          "Configurar el Auto Scaling group para usar la memoria libre media como métrica de escalado."
        ],
        correctas: [0, 3],
        explicacion: "El almacenamiento de RDS con Auto Scaling evita quedarse sin espacio de forma automática sin migrar el motor (evitando reescribir las funciones PL/SQL específicas de Oracle), y usar la CPU media como métrica de escalado del Auto Scaling group permite que el número de instancias EC2 responda automáticamente a la carga real. Migrar a Aurora (B) implicaría reescribir el código específico de PL/SQL de Oracle, una alarma de espacio libre (C) solo avisa pero no actúa automáticamente, y CloudWatch no expone de forma nativa la memoria libre como métrica sin un agente adicional (E)."
      },
      {
        pregunta: "Un servicio online para publicar y transcodificar vídeo usa Amazon EFS Standard para guardar los vídeos, accesibles desde varias instancias EC2 Linux para su procesamiento. Al crecer la popularidad, el coste de almacenamiento se ha vuelto excesivo. ¿Qué solución de almacenamiento es la MÁS económica?",
        opciones: [
          "Usar AWS Storage Gateway de archivos para guardar y procesar el contenido de vídeo.",
          "Usar AWS Storage Gateway de volúmenes para guardar y procesar el contenido de vídeo.",
          "Usar Amazon EFS para guardar el contenido de vídeo. Una vez procesado, transferir los archivos a Amazon EBS.",
          "Usar Amazon S3 para guardar el contenido de vídeo. Mover temporalmente los archivos a un volumen de Amazon EBS adjunto al servidor para procesarlos."
        ],
        correctas: [3],
        explicacion: "S3 es muchísimo más económico que EFS para almacenamiento masivo de objetos de vídeo en bruto, y usar un volumen EBS temporal adjunto a la instancia solo durante el procesamiento evita pagar por almacenamiento compartido persistente caro. Mantener EFS como almacenamiento principal (C) no resuelve el problema de coste, y Storage Gateway (A, B) está pensado para integrar almacenamiento on-premises con AWS, no para este caso de procesamiento nativo en la nube."
      },
      {
        pregunta: "Una empresa quiere crear una aplicación para guardar datos de empleados en una relación jerárquica estructurada. Necesita respuesta de mínima latencia a consultas de alto tráfico sobre esos datos y proteger cualquier dato sensible. También necesita recibir avisos mensuales por email si aparece información financiera en los datos de empleados. ¿Qué combinación de pasos cumple esto? (Elige dos.)",
        opciones: [
          "Usar Amazon Redshift para guardar los datos de empleados en jerarquías. Descargar (unload) los datos a S3 cada mes.",
          "Usar Amazon DynamoDB para guardar los datos de empleados en jerarquías. Exportar los datos a S3 cada mes.",
          "Configurar Amazon Macie para la cuenta de AWS. Integrar Macie con Amazon EventBridge para enviar eventos mensuales a AWS Lambda.",
          "Usar Amazon Athena para analizar los datos de empleados en S3. Integrar Athena con Amazon QuickSight para publicar dashboards y compartirlos con los usuarios.",
          "Configurar Amazon Macie para la cuenta de AWS. Integrar Macie con Amazon EventBridge para enviar notificaciones mensuales mediante una suscripción de Amazon SNS."
        ],
        correctas: [1, 4],
        explicacion: "DynamoDB modela eficientemente datos jerárquicos con latencia de milisegundos en consultas de alto tráfico, y Macie integrado con EventBridge y una suscripción de SNS es el camino directo para clasificar datos sensibles (financieros) y notificar por email cada mes sin componentes adicionales. Redshift (A) no está optimizado para latencia mínima en consultas puntuales de alto tráfico, y las opciones que paran en Lambda (C) o en un dashboard de QuickSight (D) no completan el requisito de notificación mensual por email tal cual se pide."
      },
      {
        pregunta: "Una aplicación respaldada por una tabla de Amazon DynamoDB debe cumplir requisitos de compliance: copias de seguridad cada mes, disponibles durante 6 meses, y retenidas durante 7 años. ¿Qué solución cumple esto?",
        opciones: [
          "Crear un plan de AWS Backup para respaldar la tabla DynamoDB el primer día de cada mes. Definir una política de ciclo de vida que pase el backup a almacenamiento en frío tras 6 meses. Fijar el periodo de retención de cada backup en 7 años.",
          "Crear un backup bajo demanda de DynamoDB el primer día de cada mes. Transicionarlo a S3 Glacier Flexible Retrieval tras 6 meses. Crear una política de ciclo de vida de S3 que borre los backups de más de 7 años.",
          "Usar el SDK de AWS para desarrollar un script que cree un backup bajo demanda de la tabla. Configurar una regla de EventBridge que ejecute el script el primer día de cada mes. Crear un segundo script que corra el segundo día de cada mes para transicionar a almacenamiento en frío los backups de más de 6 meses y borrar los de más de 7 años.",
          "Usar la CLI de AWS para crear un backup bajo demanda de la tabla. Configurar una regla de EventBridge que ejecute el comando el primer día de cada mes con una expresión cron. Especificar en el comando que los backups pasen a almacenamiento en frío tras 6 meses y se borren tras 7 años."
        ],
        correctas: [0],
        explicacion: "AWS Backup gestiona de forma nativa e integrada la programación, el ciclo de vida (transición a frío) y la retención de los backups de DynamoDB desde un único plan declarativo, sin necesidad de scripts ni automatizaciones propias. Los backups bajo demanda de DynamoDB (B) no tienen política de ciclo de vida nativa hacia Glacier, y las soluciones con scripts personalizados o CLI programada (C, D) requieren mucho más esfuerzo operativo y mantenimiento."
      },
      {
        pregunta: "Una empresa usa Amazon CloudFront con su web y ha activado logging, guardando los logs en un bucket de S3. Necesita hacer análisis avanzados sobre esos logs y construir visualizaciones. ¿Qué debería hacer un arquitecto de soluciones?",
        opciones: [
          "Usar consultas SQL estándar en Amazon Athena para analizar los logs de CloudFront en S3. Visualizar los resultados con AWS Glue.",
          "Usar consultas SQL estándar en Amazon Athena para analizar los logs de CloudFront en S3. Visualizar los resultados con Amazon QuickSight.",
          "Usar consultas SQL estándar en Amazon DynamoDB para analizar los logs de CloudFront en S3. Visualizar los resultados con AWS Glue.",
          "Usar consultas SQL estándar en Amazon DynamoDB para analizar los logs de CloudFront en S3. Visualizar los resultados con Amazon QuickSight."
        ],
        correctas: [1],
        explicacion: "Athena permite consultar directamente con SQL estándar los logs guardados en S3 sin moverlos ni cargarlos en otra base de datos, y QuickSight es el servicio de AWS pensado para construir visualizaciones y dashboards interactivos a partir de esos resultados. DynamoDB (C, D) no consulta archivos de log en S3 con SQL directamente, y AWS Glue (A, C) es un servicio ETL/catálogo, no una herramienta de visualización."
      },
      {
        pregunta: "Una flota de servidores web usa una instancia RDS para PostgreSQL. Tras una revisión de cumplimiento, la empresa exige un RPO (recovery point objective) menor de 1 segundo para todas sus bases de datos de producción. ¿Qué solución cumple esto?",
        opciones: [
          "Activar un despliegue Multi-AZ para la instancia de base de datos.",
          "Activar auto scaling para la instancia de base de datos en una sola zona de disponibilidad.",
          "Configurar la instancia de base de datos en una zona de disponibilidad, y crear varias réplicas de lectura en otra zona de disponibilidad distinta.",
          "Configurar la instancia de base de datos en una zona de disponibilidad, y configurar tareas de AWS DMS con captura de cambios (CDC)."
        ],
        correctas: [0],
        explicacion: "Multi-AZ en RDS replica de forma síncrona hacia una réplica standby en otra zona de disponibilidad, por lo que en caso de fallo prácticamente no hay pérdida de datos confirmados (RPO cercano a cero, muy por debajo de 1 segundo). Las réplicas de lectura (C) son asíncronas y no garantizan ese RPO tan bajo, el auto scaling de instancia (B) no tiene relación con la replicación de datos, y DMS con CDC (D) introduce latencia de replicación adicional."
      },
      {
        pregunta: "Una web corre sobre instancias EC2 en la subred privada de una VPC, con un ALB que se extiende por las subredes públicas dirigiendo el tráfico web a las instancias. La empresa quiere restringir el tráfico de entrada del ALB hacia las instancias EC2, impidiendo el acceso desde cualquier otro origen dentro o fuera de la subred privada. ¿Qué solución cumple esto?",
        opciones: [
          "Configurar una ruta en la tabla de rutas que dirija el tráfico de internet a las IPs privadas de las instancias EC2.",
          "Configurar el security group de las instancias EC2 para permitir solo el tráfico que viene del security group del ALB.",
          "Mover las instancias EC2 a la subred pública y asignarles un conjunto de Elastic IPs.",
          "Configurar el security group del ALB para permitir cualquier tráfico TCP en cualquier puerto."
        ],
        correctas: [1],
        explicacion: "Referenciar el security group del ALB como único origen permitido en el security group de las instancias EC2 restringe el tráfico de entrada exclusivamente al que proviene del ALB, cumpliendo exactamente el requisito. Enrutar tráfico de internet directamente a IPs privadas (A) es contradictorio con tenerlas en subred privada, mover las instancias a subred pública (C) las expondría más, no menos, y abrir el security group del ALB a cualquier puerto (D) amplía el riesgo en vez de restringirlo."
      },
      {
        pregunta: "Un laboratorio de investigación ejecuta experimentos con una aplicación de simulación (Linux, que vuelca datos intermedios a un share NFS cada 5 minutos) y una aplicación de visualización (aplicación de escritorio Windows que necesita un sistema de archivos SMB). Mantener dos sistemas de archivos sincronizados causa duplicación de datos e ineficiencia. La empresa necesita migrar ambas aplicaciones a AWS sin modificar el código de ninguna. ¿Qué solución cumple esto?",
        opciones: [
          "Migrar ambas aplicaciones a AWS Lambda. Crear un bucket de S3 para intercambiar datos entre ellas.",
          "Migrar ambas aplicaciones a Amazon ECS. Configurar Amazon FSx File Gateway para el almacenamiento.",
          "Migrar la aplicación de simulación a instancias EC2 Linux. Migrar la aplicación de visualización a instancias EC2 Windows. Configurar Amazon SQS para intercambiar datos entre las aplicaciones.",
          "Migrar la aplicación de simulación a instancias EC2 Linux. Migrar la aplicación de visualización a instancias EC2 Windows. Configurar Amazon FSx for NetApp ONTAP para el almacenamiento."
        ],
        correctas: [3],
        explicacion: "Amazon FSx for NetApp ONTAP soporta acceso multiprotocolo simultáneo (NFS y SMB) al mismo dato subyacente, eliminando la duplicación entre dos sistemas de archivos distintos sin tener que tocar el código de ninguna aplicación. Lambda (A) y ECS (B) exigirían re-empaquetar aplicaciones de escritorio/monolíticas que no se pueden modificar, y SQS (C) es una cola de mensajes, no un sistema de archivos compartido NFS/SMB."
      },
      {
        pregunta: "Como parte de la planificación del presupuesto, dirección quiere un informe de los elementos facturados de AWS desglosado por usuario, para crear presupuestos por departamento. ¿Qué solución es la más eficiente para obtener esta información?",
        opciones: ["Ejecutar una consulta con Amazon Athena para generar el informe.", "Crear un informe en Cost Explorer y descargarlo.", "Acceder a los detalles de la factura desde el panel de facturación y descargarla.", "Modificar un presupuesto de coste en AWS Budgets para alertar con Amazon SES."],
        correctas: [1],
        explicacion: "AWS Cost Explorer permite generar y personalizar informes de costes desglosados por múltiples dimensiones (incluyendo etiquetas de usuario) y descargarlos directamente, sin necesidad de configurar consultas ni infraestructura adicional. Athena (A) exigiría antes exportar y catalogar los datos de facturación, el panel de facturación básico (C) no ofrece el mismo nivel de desglose y personalización, y AWS Budgets (D) sirve para alertas de presupuesto, no para generar informes desglosados por usuario."
      },
      {
        pregunta: "Una empresa aloja su web estática en Amazon S3 y quiere añadir un formulario de contacto con componentes dinámicos del lado del servidor (nombre, email, teléfono, mensaje). Se esperan menos de 100 visitas al mes. ¿Qué solución cumple esto de la forma MÁS económica?",
        opciones: [
          "Alojar una página de formulario dinámico en Amazon ECS. Configurar Amazon SES para conectar con cualquier proveedor de email externo.",
          "Crear un endpoint de Amazon API Gateway con backend de AWS Lambda que llame a Amazon Simple Email Service (Amazon SES).",
          "Convertir la web estática en dinámica desplegando Amazon Lightsail. Usar scripting del lado del cliente para el formulario. Integrarlo con Amazon WorkMail.",
          "Crear una instancia EC2 t2.micro. Desplegar un stack LAMP para alojar la página. Usar scripting del lado del cliente para el formulario. Integrarlo con Amazon WorkMail."
        ],
        correctas: [1],
        explicacion: "API Gateway + Lambda es una arquitectura totalmente serverless donde solo se paga por invocación real, ideal para menos de 100 visitas mensuales, y SES se encarga de enviar el email del formulario sin gestionar ningún servidor. ECS (A) y una instancia EC2 con LAMP (D) mantienen infraestructura corriendo (y por tanto costando) incluso sin tráfico, y Lightsail (C) es una instancia de coste fijo, menos ajustada a un uso tan bajo y esporádico."
      },
      {
        pregunta: "Una web estática alojada en CloudFront delante de S3, con backend de base de datos, no refleja las actualizaciones hechas en el repositorio Git. La empresa comprueba que el pipeline de CI/CD entre el repositorio y S3 está bien configurado (webhooks correctos) y que envía mensajes de despliegue exitoso. ¿Qué solución implementaría un arquitecto de soluciones para que se vean las actualizaciones en la web?",
        opciones: ["Añadir un Application Load Balancer.", "Añadir Amazon ElastiCache para Redis o Memcached a la capa de base de datos.", "Invalidar la caché de CloudFront.", "Usar AWS Certificate Manager (ACM) para validar el certificado SSL de la web."],
        correctas: [2],
        explicacion: "Si el pipeline ya despliega correctamente en S3 pero la web sigue mostrando contenido antiguo, el problema típico es que CloudFront sigue sirviendo objetos desde caché; invalidar la caché fuerza a CloudFront a volver a buscar el contenido actualizado en el origen. Un ALB (A) o ElastiCache (B) no tienen relación con servir contenido estático cacheado desde el edge, y el certificado SSL (D) no afecta a qué versión del contenido se sirve."
      },
      {
        pregunta: "Una empresa migra una aplicación basada en Windows on-premises a AWS. La aplicación tiene tres capas: aplicación, negocio y base de datos con Microsoft SQL Server. Necesita usar funciones específicas de SQL Server como backups nativos y Data Quality Services, y también compartir archivos para procesamiento entre las capas. ¿Cómo debería diseñar la arquitectura un arquitecto de soluciones?",
        opciones: [
          "Alojar las tres capas en instancias EC2. Usar Amazon FSx File Gateway para compartir archivos entre capas.",
          "Alojar las tres capas en instancias EC2. Usar Amazon FSx for Windows File Server para compartir archivos entre capas.",
          "Alojar las capas de aplicación y negocio en EC2. Alojar la capa de base de datos en Amazon RDS. Usar Amazon EFS para compartir archivos entre capas.",
          "Alojar las capas de aplicación y negocio en EC2. Alojar la capa de base de datos en Amazon RDS. Usar un volumen EBS Provisioned IOPS SSD (io2) para compartir archivos entre capas."
        ],
        correctas: [1],
        explicacion: "RDS para SQL Server no expone acceso directo al sistema de archivos ni soporta funciones nativas como backups .bak personalizados o Data Quality Services, por lo que hay que alojar SQL Server en EC2 para conservar esas capacidades; FSx for Windows File Server ofrece el recurso compartido SMB nativo de Windows que las tres capas necesitan. EFS (C) es para Linux (NFS), no SMB nativo de Windows, y un volumen EBS (D) solo se puede montar en una instancia, no compartirse entre varias capas."
      },
      {
        pregunta: "Una empresa migra un grupo de servidores web Linux a AWS. Los servidores deben acceder a archivos en un almacén compartido para cierto contenido, sin poder hacer ningún cambio en la aplicación. ¿Qué debería hacer un arquitecto de soluciones?",
        opciones: [
          "Crear un bucket S3 Standard con acceso desde los servidores web.",
          "Configurar una distribución de CloudFront con un bucket S3 como origen.",
          "Crear un sistema de archivos Amazon EFS. Montar el sistema de archivos EFS en todos los servidores web.",
          "Configurar un volumen EBS de propósito general SSD (gp3). Montar el volumen EBS en todos los servidores web."
        ],
        correctas: [2],
        explicacion: "EFS es un sistema de archivos de red (NFS) que se monta de forma nativa y simultánea en varias instancias Linux exactamente igual que un almacén compartido tradicional, sin requerir ningún cambio en cómo la aplicación accede a los archivos. S3 (A, B) es almacenamiento de objetos, no un sistema de archivos montable de la misma forma, y un volumen EBS (D) solo puede montarse en una instancia a la vez (salvo Multi-Attach, muy limitado)."
      },
      {
        pregunta: "Una función Lambda necesita acceso de lectura a un bucket de S3 en la misma cuenta de AWS. ¿Qué solución cumple esto de la forma MÁS segura?",
        opciones: [
          "Aplicar una política de bucket que conceda acceso de lectura al bucket de S3.",
          "Aplicar un rol de IAM a la función Lambda. Aplicar una política de IAM al rol que conceda acceso de lectura a ese bucket de S3.",
          "Incrustar una access key y una secret key en el código de la función Lambda para conceder los permisos de IAM necesarios de lectura al bucket de S3.",
          "Aplicar un rol de IAM a la función Lambda. Aplicar una política de IAM al rol que conceda acceso de lectura a todos los buckets de S3 de la cuenta."
        ],
        correctas: [1],
        explicacion: "Un rol de IAM asignado a Lambda proporciona credenciales temporales gestionadas automáticamente por AWS, y una política que conceda acceso de lectura solo al bucket concreto aplica el principio de mínimo privilegio. Una política de bucket (A) por sí sola sin rol no es la práctica recomendada para autenticar la propia función, incrustar claves en el código (C) es una mala práctica de seguridad grave, y conceder acceso a todos los buckets (D) viola el mínimo privilegio."
      },
      {
        pregunta: "Una empresa aloja una web en varias instancias EC2 dentro de un Auto Scaling group que escala según la demanda. Quiere optimizar el ahorro de costes sin adquirir ningún compromiso a largo plazo. ¿Qué opción de compra de instancias EC2 debería recomendar un arquitecto de soluciones?",
        opciones: ["Solo instancias dedicadas (Dedicated Instances).", "Solo instancias On-Demand.", "Una mezcla de instancias On-Demand y Spot.", "Una mezcla de instancias On-Demand y Reservadas."],
        correctas: [2],
        explicacion: "Las instancias Spot ofrecen el mayor ahorro de coste sin ningún compromiso, y combinarlas con On-Demand para cubrir la capacidad base que no puede interrumpirse es el patrón recomendado en un Auto Scaling group tolerante a interrupciones. Las instancias reservadas (D) sí implican un compromiso a largo plazo, contradiciendo el requisito, y usar solo On-Demand (B) o dedicadas (A) no aprovecha el ahorro disponible."
      },
      {
        pregunta: "Una empresa de medios usa CloudFront para su contenido de vídeo en streaming público, alojado en S3, y quiere controlar quién tiene acceso. Algunos usuarios usan un cliente HTTP personalizado que no soporta cookies; otros no pueden cambiar las URLs fijas que ya usan para acceder. ¿Qué servicios o métodos cumplen esto con el MENOR impacto para los usuarios? (Elige dos.)",
        opciones: ["Cookies firmadas (signed cookies)", "URLs firmadas (signed URLs)", "AWS AppSync", "JSON Web Token (JWT)", "AWS Secrets Manager"],
        correctas: [0, 1],
        explicacion: "Para los usuarios que no pueden cambiar sus URLs fijas, las cookies firmadas dan acceso sin modificar la URL que ya usan; para los usuarios cuyo cliente no soporta cookies, las URLs firmadas dan acceso sin depender de cookies. Usando ambos mecanismos en paralelo se cubre a los dos grupos con el mínimo impacto. AppSync (C) es un servicio de APIs GraphQL, JWT (D) no es un mecanismo nativo de control de acceso a CloudFront/S3, y Secrets Manager (E) gestiona secretos, no control de acceso a contenido de streaming."
      },
      {
        pregunta: "Una empresa prepara una nueva plataforma de datos que ingiere streaming en tiempo real desde varias fuentes. Necesita transformar los datos antes de escribirlos en S3, y poder consultarlos después con SQL. ¿Qué soluciones cumplen esto? (Elige dos.)",
        opciones: [
          "Usar Amazon Kinesis Data Streams para el streaming. Usar Kinesis Data Analytics para transformar los datos. Usar Kinesis Data Firehose para escribirlos en S3. Usar Amazon Athena para consultar los datos transformados en S3.",
          "Usar Amazon Managed Streaming for Apache Kafka (Amazon MSK) para el streaming. Usar AWS Glue para transformar los datos y escribirlos en S3. Usar Amazon Athena para consultar los datos transformados en S3.",
          "Usar AWS Database Migration Service (AWS DMS) para ingerir los datos. Usar Amazon EMR para transformarlos y escribirlos en S3. Usar Amazon Athena para consultarlos.",
          "Usar Amazon MSK para el streaming. Usar Kinesis Data Analytics para transformar los datos y escribirlos en S3. Usar el editor de consultas de Amazon RDS para consultarlos.",
          "Usar Kinesis Data Streams para el streaming. Usar AWS Glue para transformar los datos. Usar Kinesis Data Firehose para escribirlos en S3. Usar el editor de consultas de Amazon RDS para consultarlos."
        ],
        correctas: [0, 1],
        explicacion: "Ambas combinaciones usan un servicio de streaming en tiempo real (Kinesis Data Streams o MSK) junto con un servicio de transformación adecuado (Kinesis Data Analytics o AWS Glue) y terminan consultando con Athena, que sí soporta SQL directamente sobre datos en S3. DMS (C) no es un servicio de ingesta de streaming en tiempo real (está pensado para migración/replicación de bases de datos), y el \"editor de consultas de Amazon RDS\" (D, E) no consulta datos almacenados en S3."
      },
      {
        pregunta: "Una empresa tiene una solución de backup de volúmenes on-premises que ha llegado al fin de su vida útil. Quiere usar AWS como parte de una nueva solución de backup, manteniendo acceso local a todos los datos mientras se respaldan en AWS, con transferencia automática y segura. ¿Qué solución cumple esto?",
        opciones: [
          "Usar AWS Snowball para migrar los datos a S3. Configurar los sistemas on-premises para montar el endpoint S3 de Snowball y tener acceso local a los datos.",
          "Usar AWS Snowball Edge para migrar los datos a S3. Usar la interfaz de archivos de Snowball Edge para dar a los sistemas on-premises acceso local a los datos.",
          "Usar AWS Storage Gateway configurado como cached volume gateway. Ejecutar el appliance de Storage Gateway on-premises y configurar el porcentaje de datos a cachear localmente. Montar los volúmenes de gateway para el acceso local.",
          "Usar AWS Storage Gateway configurado como stored volume gateway. Ejecutar el appliance de Storage Gateway on-premises y mapear los volúmenes de gateway al almacenamiento local. Montar los volúmenes de gateway para el acceso local."
        ],
        correctas: [3],
        explicacion: "Un stored volume gateway mantiene una copia completa de los datos en el almacenamiento local (acceso local a TODOS los datos, con baja latencia) mientras replica de forma asíncrona y segura snapshots completos hacia S3 de forma automática, que es justo lo que pide el enunciado. Un cached volume gateway (C) solo mantiene localmente los datos de acceso frecuente (no todos), y Snowball/Snowball Edge (A, B) son dispositivos de migración puntual, no una solución continua de backup con acceso local permanente."
      },
      {
        pregunta: "Una aplicación alojada en instancias EC2 necesita acceder a un bucket de S3 sin que el tráfico pase por internet. ¿Cómo debería configurar el acceso un arquitecto de soluciones?",
        opciones: [
          "Crear una zona alojada privada con Amazon Route 53.",
          "Crear un endpoint de VPC de tipo gateway para Amazon S3 en la VPC.",
          "Configurar las instancias EC2 para usar un NAT Gateway al acceder al bucket de S3.",
          "Establecer una conexión AWS Site-to-Site VPN entre la VPC y el bucket de S3."
        ],
        correctas: [1],
        explicacion: "Un Gateway VPC Endpoint para S3 permite que el tráfico entre la VPC y S3 viaje enteramente por la red interna de AWS sin salir a internet ni pasar por un NAT Gateway. Una zona alojada privada de Route 53 (A) solo resuelve nombres DNS, no crea la ruta de red, un NAT Gateway (C) sí implica salida hacia internet (a través del Internet Gateway), y una VPN Site-to-Site (D) conecta redes on-premises con la VPC, no la VPC con un servicio de AWS como S3."
      },
      {
        pregunta: "Un ecommerce guarda terabytes de datos de clientes en AWS, que contienen información personal identificable (PII). Quiere usar los datos en tres aplicaciones; solo una de ellas necesita procesar la PII. La PII debe eliminarse antes de que las otras dos aplicaciones procesen los datos. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Guardar los datos en una tabla DynamoDB. Crear una capa de aplicación proxy que intercepte y procese los datos que solicita cada aplicación.",
          "Guardar los datos en un bucket de S3. Procesar y transformar los datos con S3 Object Lambda antes de devolverlos a la aplicación solicitante.",
          "Procesar los datos y guardar las versiones transformadas en tres buckets de S3 separados, uno por aplicación, con su propio dataset personalizado.",
          "Procesar los datos y guardar las versiones transformadas en tres tablas DynamoDB separadas, una por aplicación, con su propio dataset personalizado."
        ],
        correctas: [1],
        explicacion: "S3 Object Lambda permite aplicar la lógica de eliminación de PII sobre la marcha, en el momento en que cada aplicación solicita el objeto, sin duplicar el dato original ni mantener copias transformadas separadas para cada aplicación. Crear una capa proxy propia (A) es más esfuerzo operativo que un servicio gestionado, y duplicar los datos en varios buckets o tablas (C, D) multiplica el almacenamiento y la complejidad de mantenimiento frente a transformar bajo demanda."
      },
      {
        pregunta: "Un equipo de desarrollo lanza una aplicación en instancias EC2 dentro de una VPC de desarrollo. Un arquitecto de soluciones necesita crear una nueva VPC en la misma cuenta, que se conectará mediante peering con la VPC de desarrollo. El bloque CIDR de la VPC de desarrollo es 192.168.0.0/24. ¿Cuál es el bloque CIDR MÁS PEQUEÑO válido para la nueva VPC, compatible con una conexión de peering hacia la VPC de desarrollo?",
        opciones: ["10.0.1.0/32", "192.168.0.0/24", "192.168.1.0/32", "10.0.1.0/24"],
        correctas: [3],
        explicacion: "El CIDR de la nueva VPC no puede solaparse con 192.168.0.0/24 (descarta B) y una VPC no puede tener un bloque /32 (VPC exige un rango, con /28 como mínimo permitido), lo que descarta las opciones /32 (A, C); 10.0.1.0/24 es el bloque /24 válido y no solapado más pequeño de las opciones dadas."
      },
      {
        pregunta: "Una empresa despliega su aplicación en cinco instancias EC2. Un Application Load Balancer distribuye tráfico mediante un target group. El uso medio de CPU está casi siempre por debajo del 10%, con picos ocasionales hasta el 65%. Se necesita automatizar el escalado optimizando el coste y asegurando suficiente CPU durante los picos. ¿Qué solución cumple esto?",
        opciones: [
          "Crear una alarma de CloudWatch que entre en estado ALARM cuando la CPUUtilization sea menor del 20%. Crear una función Lambda que la alarma invoque para terminar una de las instancias EC2 del target group del ALB.",
          "Crear un Auto Scaling group. Seleccionar el ALB y el target group existentes. Configurar una política de target tracking basada en la métrica ASGAverageCPUUtilization. Fijar el mínimo en 2, la capacidad deseada en 3, el máximo en 6 y el valor objetivo en 50%. Añadir las instancias EC2 al Auto Scaling group.",
          "Crear un Auto Scaling group. Seleccionar el ALB y el target group existentes. Fijar el mínimo en 2, la capacidad deseada en 3 y el máximo en 6. Añadir las instancias EC2 al Auto Scaling group.",
          "Crear dos alarmas de CloudWatch: una que entre en ALARM cuando la CPU media baje del 20%, y otra cuando suba del 50%. Configurar ambas para publicar en un topic de Amazon SNS que envíe un email. Al recibir el mensaje, entrar manualmente a subir o bajar el número de instancias EC2."
        ],
        correctas: [1],
        explicacion: "Un Auto Scaling group con política de target tracking sobre ASGAverageCPUUtilization ajusta automáticamente el número de instancias para mantener el uso de CPU cerca del valor objetivo, cubriendo los picos sin sobreaprovisionar en los valles, todo de forma automática. Terminar instancias manualmente vía Lambda (A) es un mecanismo ad-hoc y frágil, fijar solo capacidades estáticas sin política de escalado (C) no reacciona a los picos, y depender de alarmas con intervención manual por email (D) no es una automatización real."
      },
      {
        pregunta: "Una aplicación crítica de negocio corre en instancias EC2 detrás de un ALB, en un Auto Scaling group, con acceso a una instancia RDS. El diseño no pasa una revisión operativa porque las instancias EC2 y la instancia de base de datos están todas en una única zona de disponibilidad. Hay que actualizar el diseño para usar una segunda zona de disponibilidad. ¿Qué solución hace la aplicación altamente disponible?",
        opciones: [
          "Aprovisionar una subred en cada zona de disponibilidad. Configurar el Auto Scaling group para repartir las instancias EC2 entre ambas zonas. Configurar la instancia de base de datos con conexiones a cada red.",
          "Aprovisionar dos subredes que se extiendan por ambas zonas de disponibilidad. Configurar el Auto Scaling group para repartir las instancias EC2 entre ambas zonas. Configurar la instancia de base de datos con conexiones a cada red.",
          "Aprovisionar una subred en cada zona de disponibilidad. Configurar el Auto Scaling group para repartir las instancias EC2 entre ambas zonas. Configurar la instancia de base de datos para despliegue Multi-AZ.",
          "Aprovisionar una subred que se extienda por ambas zonas de disponibilidad. Configurar el Auto Scaling group para repartir las instancias EC2 entre ambas zonas. Configurar la instancia de base de datos para despliegue Multi-AZ."
        ],
        correctas: [2],
        explicacion: "Cada subred de una VPC pertenece a una única zona de disponibilidad (no puede extenderse por varias, lo que descarta las opciones que lo plantean), así que hay que crear una subred por zona; RDS Multi-AZ es el mecanismo nativo y correcto de RDS para alta disponibilidad entre zonas, no \"conexiones a cada red\" configuradas manualmente."
      },
      {
        pregunta: "Un laboratorio de investigación necesita procesar unos 8 TB de datos, con latencias por debajo del milisegundo y un throughput mínimo de 6 GBps para el subsistema de almacenamiento. Cientos de instancias EC2 con Amazon Linux distribuirán y procesarán los datos. ¿Qué solución cumple estos requisitos de rendimiento?",
        opciones: [
          "Crear un sistema de archivos Amazon FSx for NetApp ONTAP. Fijar la política de tiering de cada volumen en ALL. Importar los datos en bruto al sistema de archivos. Montarlo en las instancias EC2.",
          "Crear un bucket de S3 para los datos en bruto. Crear un sistema de archivos Amazon FSx for Lustre con almacenamiento SSD persistente. Activar la opción de importar/exportar datos desde y hacia S3. Montar el sistema de archivos en las instancias EC2.",
          "Crear un bucket de S3 para los datos en bruto. Crear un sistema de archivos FSx for Lustre con almacenamiento HDD persistente. Activar la opción de importar/exportar datos desde y hacia S3. Montar el sistema de archivos en las instancias EC2.",
          "Crear un sistema de archivos FSx for NetApp ONTAP. Fijar la política de tiering de cada volumen en NONE. Importar los datos en bruto al sistema de archivos. Montarlo en las instancias EC2."
        ],
        correctas: [1],
        explicacion: "FSx for Lustre está diseñado específicamente para cargas de cómputo intensivo con latencias sub-milisegundo y throughput muy alto, y el almacenamiento SSD persistente es necesario para alcanzar los 6 GBps requeridos (el HDD, opción C, no llega a ese throughput). ONTAP (A, D) no está optimizado para este perfil de rendimiento extremo de HPC como Lustre."
      },
      {
        pregunta: "Una empresa necesita migrar una aplicación heredada de un centro de datos on-premises a AWS por limitaciones de capacidad de hardware. La aplicación corre 24/7, y el almacenamiento de su base de datos sigue creciendo con el tiempo. ¿Qué debería hacer un arquitecto de soluciones para cumplir esto de la forma MÁS económica?",
        opciones: [
          "Migrar la capa de aplicación a instancias EC2 Spot. Migrar la capa de almacenamiento de datos a Amazon S3.",
          "Migrar la capa de aplicación a instancias EC2 Reservadas. Migrar la capa de almacenamiento a instancias RDS On-Demand.",
          "Migrar la capa de aplicación a instancias EC2 Reservadas. Migrar la capa de almacenamiento a instancias Aurora Reservadas.",
          "Migrar la capa de aplicación a instancias EC2 On-Demand. Migrar la capa de almacenamiento a instancias RDS Reservadas."
        ],
        correctas: [2],
        explicacion: "Como la aplicación corre de forma continua 24/7, las instancias Reservadas (tanto para EC2 como para la base de datos) dan el mayor ahorro frente a On-Demand gracias al compromiso a largo plazo, y Aurora añade escalado de almacenamiento automático adecuado para una base de datos que sigue creciendo. Las Spot (A) no son adecuadas para una carga que debe correr sin interrupciones 24/7, y mezclar Reservadas de aplicación con RDS On-Demand (B) o EC2 On-Demand con RDS Reservadas (D) no maximiza el ahorro en ambas capas."
      },
      {
        pregunta: "Un laboratorio universitario necesita migrar 30 TB de datos de un file server Windows on-premises a Amazon FSx for Windows File Server. Tiene un enlace de red de 1 Gbps compartido con muchos otros departamentos. Quiere maximizar el rendimiento de la transferencia mientras controla el ancho de banda usado para minimizar el impacto en otros departamentos, completando la migración en 5 días. ¿Qué solución de AWS cumple esto?",
        opciones: ["AWS Snowcone", "Amazon FSx File Gateway", "AWS DataSync", "AWS Transfer Family"],
        correctas: [2],
        explicacion: "AWS DataSync está diseñado para transferencias de datos de alto rendimiento entre on-premises y AWS (incluyendo FSx for Windows File Server), y permite limitar explícitamente el ancho de banda usado para no saturar el enlace compartido, cumpliendo el plazo de 5 días. Snowcone (A) es un dispositivo físico de transporte, más lento para este volumen en ese plazo con red disponible; FSx File Gateway (B) sirve para acceso continuo tipo caché, no para una migración masiva puntual; y Transfer Family (D) está pensado para protocolos SFTP/FTPS/FTP, no para migraciones masivas de archivos con control de ancho de banda."
      },
      {
        pregunta: "Una empresa quiere crear una app móvil para que los usuarios vean clips de vídeo a cámara lenta. Actualmente la app captura los clips y los sube en formato bruto a un bucket de S3, desde donde se recuperan directamente. Los vídeos son muy pesados en bruto, y los usuarios sufren problemas de buffering y reproducción en móvil. La empresa quiere maximizar rendimiento y escalabilidad minimizando el esfuerzo operativo. ¿Qué combinación de soluciones cumple esto? (Elige dos.)",
        opciones: [
          "Desplegar Amazon CloudFront para la entrega y el cacheo de contenido.",
          "Usar AWS DataSync para replicar los archivos de vídeo entre regiones de AWS en otros buckets de S3.",
          "Usar Amazon Elastic Transcoder para convertir los archivos de vídeo a formatos más apropiados.",
          "Desplegar un Auto Scaling group de instancias EC2 en Local Zones para la entrega y el cacheo de contenido.",
          "Desplegar un Auto Scaling group de instancias EC2 para convertir los archivos de vídeo a formatos más apropiados."
        ],
        correctas: [0, 2],
        explicacion: "CloudFront reduce la latencia y el buffering entregando el contenido desde el edge más cercano al usuario, y Elastic Transcoder convierte los vídeos en bruto a formatos y resoluciones optimizados para streaming en móvil, ambos como servicios gestionados sin infraestructura propia que administrar. Replicar los archivos en bruto entre regiones (B) no resuelve el problema de tamaño/formato, y montar Auto Scaling groups de EC2 para cacheo o transcodificación (D, E) añade justo la infraestructura que se quiere evitar."
      }
    ]
  },
  {
    id: "examen-07",
    titulo: "Examen de práctica 7",
    resumen: "50 preguntas (303-352 del banco de dumps) sobre Auto Scaling, almacenamiento híbrido, seguridad y cifrado, arquitecturas serverless y recuperación ante desastres.",
    preguntas: [
      {
        pregunta: "Una empresa lanza una aplicación nueva desplegada en un clúster de Amazon ECS con tipo de lanzamiento Fargate. Se monitoriza el uso de CPU y memoria porque se espera mucho tráfico al lanzarla, pero la empresa quiere reducir costes cuando el uso baje. ¿Qué debería recomendar un arquitecto de soluciones?",
        opciones: [
          "Usar Amazon EC2 Auto Scaling para escalar en ciertos periodos según patrones de tráfico anteriores.",
          "Usar una función Lambda para escalar Amazon ECS cuando una alarma de CloudWatch detecte una infracción de métrica.",
          "Usar Amazon EC2 Auto Scaling con políticas de escalado simple para escalar cuando una alarma de CloudWatch detecte una infracción de métrica de ECS.",
          "Usar AWS Application Auto Scaling con políticas de target tracking para escalar cuando una alarma de CloudWatch detecte una infracción de métrica de ECS."
        ],
        correctas: [3],
        explicacion: "AWS Application Auto Scaling es el servicio diseñado específicamente para ajustar automáticamente el número de tareas o servicios de ECS según métricas de CloudWatch, y las políticas de target tracking mantienen el valor objetivo ajustando la capacidad tanto al alza como a la baja según la demanda real. Las opciones con EC2 Auto Scaling (A, C) no aplican directamente a tareas Fargate (que no son instancias EC2 gestionadas por el usuario), y usar Lambda como intermediario (B) añade complejidad innecesaria frente al mecanismo nativo de Application Auto Scaling."
      },
      {
        pregunta: "Una empresa ha creado recientemente un sitio de recuperación ante desastres en otra región de AWS. Necesita transferir grandes cantidades de datos en ambos sentidos entre sistemas de archivos NFS de las dos regiones de forma periódica. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: ["Usar AWS DataSync.", "Usar dispositivos AWS Snowball.", "Configurar un servidor SFTP en Amazon EC2.", "Usar AWS Database Migration Service (AWS DMS)."],
        correctas: [0],
        explicacion: "AWS DataSync está diseñado específicamente para sincronizar y transferir datos de forma periódica y automatizada entre sistemas de archivos NFS/SMB, incluidos entre dos ubicaciones en AWS, con el mínimo esfuerzo operativo. Snowball (B) es para migraciones puntuales masivas mediante dispositivos físicos, no para sincronización periódica, un servidor SFTP propio (C) exige gestionar infraestructura, y DMS (D) está diseñado para bases de datos, no para sistemas de archivos NFS."
      },
      {
        pregunta: "Una empresa diseña una solución de almacenamiento compartido para una aplicación de videojuegos alojada en la nube de AWS. Necesita poder usar clientes SMB para acceder a los datos, y la solución debe ser totalmente gestionada. ¿Qué solución de AWS cumple esto?",
        opciones: [
          "Crear una tarea de AWS DataSync que comparta los datos como un sistema de archivos montable. Montar el sistema de archivos en el servidor de la aplicación.",
          "Crear una instancia EC2 Windows. Instalar y configurar un rol de recurso compartido de archivos de Windows en la instancia. Conectar el servidor de la aplicación al recurso compartido.",
          "Crear un sistema de archivos Amazon FSx for Windows File Server. Adjuntar el sistema de archivos al servidor de origen. Conectar el servidor de la aplicación al sistema de archivos.",
          "Crear un bucket de Amazon S3. Asignar un rol de IAM a la aplicación para dar acceso al bucket de S3. Montar el bucket de S3 en el servidor de la aplicación."
        ],
        correctas: [2],
        explicacion: "Amazon FSx for Windows File Server es un servicio de archivos totalmente gestionado y nativamente compatible con el protocolo SMB, ideal para clientes Windows sin tener que administrar servidores propios. Una instancia EC2 con un rol de archivos de Windows (B) no sería totalmente gestionada (hay que administrar el sistema operativo), DataSync (A) es un servicio de transferencia/sincronización, no un sistema de archivos montable de forma nativa, y S3 (D) no soporta el protocolo SMB de forma nativa."
      },
      {
        pregunta: "Una empresa quiere correr una base de datos en memoria para una aplicación sensible a la latencia que corre en instancias EC2. La aplicación procesa más de 100.000 transacciones por minuto y necesita alto throughput de red. Se necesita un diseño de red económico que minimice los cargos por transferencia de datos. ¿Qué solución cumple esto?",
        opciones: [
          "Lanzar todas las instancias EC2 en la misma zona de disponibilidad dentro de la misma región. Especificar un placement group con estrategia cluster al lanzar las instancias EC2.",
          "Lanzar todas las instancias EC2 en distintas zonas de disponibilidad dentro de la misma región. Especificar un placement group con estrategia partition al lanzarlas.",
          "Desplegar un Auto Scaling group para lanzar instancias EC2 en distintas zonas de disponibilidad según un objetivo de utilización de red.",
          "Desplegar un Auto Scaling group con una política de step scaling para lanzar instancias EC2 en distintas zonas de disponibilidad."
        ],
        correctas: [0],
        explicacion: "Un placement group con estrategia cluster agrupa las instancias físicamente cerca dentro de la misma zona de disponibilidad, dando la latencia más baja y el mayor throughput de red posible entre ellas, y la transferencia de datos dentro de la misma zona de disponibilidad no genera cargos adicionales. Repartir las instancias entre varias zonas (B, C, D) sí genera cargos de transferencia entre zonas y no ofrece la misma proximidad física de baja latencia que el cluster placement group."
      },
      {
        pregunta: "Una empresa que corre principalmente sus servidores de aplicación on-premises decide migrar a AWS. Quiere minimizar la necesidad de escalar su almacenamiento iSCSI local, y que solo los datos de acceso reciente permanezcan almacenados localmente. ¿Qué solución de AWS debería usar?",
        opciones: ["Amazon S3 File Gateway", "AWS Storage Gateway Tape Gateway", "AWS Storage Gateway Volume Gateway, volúmenes almacenados (stored volumes)", "AWS Storage Gateway Volume Gateway, volúmenes en caché (cached volumes)"],
        correctas: [3],
        explicacion: "En el modo de volúmenes en caché (cached volumes), el conjunto completo de datos se guarda en S3 y solo los datos de acceso más frecuente/reciente se cachean localmente, minimizando la necesidad de escalar el almacenamiento on-premises, exactamente lo que pide el enunciado. Los volúmenes almacenados (stored volumes, C) mantienen la copia completa en local (lo contrario de lo pedido), Tape Gateway (B) emula cintas para backup, no almacenamiento iSCSI de acceso activo, y S3 File Gateway (A) usa protocolos de archivos (NFS/SMB), no iSCSI."
      },
      {
        pregunta: "Una empresa tiene varias cuentas de AWS con facturación consolidada. Corre varias instancias RDS para Oracle On-Demand de alto rendimiento activas durante 90 días. El equipo financiero tiene acceso a AWS Trusted Advisor tanto en la cuenta de facturación consolidada como en todas las demás cuentas, y necesita usar la cuenta adecuada para revisar las recomendaciones de Trusted Advisor sobre RDS y así reducir costes. ¿Qué combinación de pasos cumple esto? (Elige dos.)",
        opciones: [
          "Usar las recomendaciones de Trusted Advisor desde la cuenta donde corren las instancias RDS.",
          "Usar las recomendaciones de Trusted Advisor desde la cuenta de facturación consolidada para ver todas las comprobaciones de instancias RDS a la vez.",
          "Revisar la comprobación de Trusted Advisor de optimización de instancias reservadas (RI) de Amazon RDS.",
          "Revisar la comprobación de Trusted Advisor de instancias RDS inactivas (Idle DB Instances).",
          "Revisar la comprobación de Trusted Advisor de optimización de nodos reservados de Amazon Redshift."
        ],
        correctas: [1, 2],
        explicacion: "Al ser cuentas vinculadas por facturación consolidada, revisar Trusted Advisor desde la cuenta de pago (payer account) permite ver de forma agregada las comprobaciones de RDS de todas las cuentas vinculadas a la vez; y dado que las instancias On-Demand llevan 90 días activas de forma continua con alto rendimiento, la comprobación relevante para ahorrar costes es la de optimización de instancias reservadas de RDS (recomienda comprar RIs para cargas sostenidas). Revisar solo desde la cuenta individual (A) no da la vista consolidada pedida, la comprobación de instancias inactivas (D) no aplica a instancias activas de alto rendimiento, y Redshift (E) es un servicio distinto de RDS."
      },
      {
        pregunta: "Un arquitecto de soluciones necesita optimizar costes de almacenamiento identificando qué buckets de S3 ya no se usan o se usan raramente. ¿Qué solución logra esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Analizar los patrones de acceso a los buckets usando el dashboard de S3 Storage Lens, con métricas de actividad avanzadas.",
          "Analizar los patrones de acceso a los buckets usando el dashboard de S3 en la consola de administración de AWS.",
          "Activar la métrica BucketSizeBytes de CloudWatch para los buckets. Analizar los patrones de acceso con esos datos usando Amazon Athena.",
          "Activar AWS CloudTrail para monitorizar objetos de S3. Analizar los patrones de acceso con los logs de CloudTrail integrados con CloudWatch Logs."
        ],
        correctas: [0],
        explicacion: "S3 Storage Lens proporciona de forma nativa e integrada métricas avanzadas de actividad y patrones de acceso a nivel de bucket (incluyendo qué buckets no se acceden o se acceden raramente), sin necesidad de configurar métricas adicionales, consultas ni pipelines de análisis. El dashboard básico de la consola (B) no ofrece ese nivel de detalle de actividad, y las opciones con BucketSizeBytes+Athena (C) o CloudTrail+CloudWatch Logs (D) exigen configurar y mantener un pipeline de análisis adicional, con más esfuerzo operativo."
      },
      {
        pregunta: "Una empresa vende datasets a clientes que investigan en inteligencia artificial y machine learning. Los datasets son archivos grandes guardados en un bucket de S3 en us-east-1. Una web desplegada en varias instancias EC2 detrás de un ALB gestiona la venta de acceso; tras la compra, los clientes reciben una URL firmada de S3 para acceder a los archivos. Los clientes están repartidos entre Norteamérica y Europa, y la empresa quiere reducir el coste de transferencia de datos manteniendo o mejorando el rendimiento. ¿Qué debería hacer un arquitecto de soluciones?",
        opciones: [
          "Configurar S3 Transfer Acceleration en el bucket existente. Dirigir las peticiones de los clientes al endpoint de Transfer Acceleration. Seguir usando URLs firmadas de S3 para el control de acceso.",
          "Desplegar una distribución de Amazon CloudFront con el bucket de S3 existente como origen. Dirigir las peticiones de los clientes a la URL de CloudFront. Cambiar a URLs firmadas de CloudFront para el control de acceso.",
          "Montar un segundo bucket de S3 en la región eu-central-1 con Replicación entre Regiones (CRR) entre ambos buckets. Dirigir las peticiones a la región más cercana. Seguir usando URLs firmadas de S3.",
          "Modificar la web para habilitar streaming de los datasets a los usuarios finales. Configurar la web para leer los datos del bucket existente. Implementar el control de acceso directamente en la aplicación."
        ],
        correctas: [1],
        explicacion: "CloudFront cachea el contenido en el edge más cercano a cada cliente (reduciendo tanto la latencia como el coste de transferencia de datos frente a servir directamente desde el bucket en us-east-1), y las URLs firmadas de CloudFront ofrecen el mismo control de acceso granular que las de S3 pero adaptado al CDN. Transfer Acceleration (A) acelera subidas, no tanto la distribución repetida de descargas populares, replicar el bucket entre regiones (C) duplica el almacenamiento y su coste, y reimplementar el control de acceso en la aplicación (D) añade mucho más esfuerzo de desarrollo."
      },
      {
        pregunta: "Una empresa usa AWS para diseñar una web que procesa presupuestos de seguros. Los usuarios solicitan presupuestos desde la aplicación; deben separarse por tipo de presupuesto, responderse en menos de 24 horas y no perderse nunca. La solución debe maximizar la eficiencia operativa y minimizar el mantenimiento. ¿Qué solución cumple esto?",
        opciones: [
          "Crear varios data streams de Amazon Kinesis según el tipo de presupuesto. Configurar la web para enviar mensajes al stream adecuado. Configurar cada grupo de servidores backend para usar Kinesis Client Library (KCL) y consumir mensajes de su propio stream.",
          "Crear una función Lambda y un topic de Amazon SNS por cada tipo de presupuesto. Suscribir la función Lambda a su topic SNS asociado. Configurar la aplicación para publicar las solicitudes de presupuesto en el topic SNS correspondiente.",
          "Crear un único topic de Amazon SNS. Suscribir colas de Amazon SQS al topic SNS. Configurar el filtrado de mensajes de SNS para publicar en la cola SQS adecuada según el tipo de presupuesto. Configurar cada servidor backend para usar su propia cola SQS.",
          "Crear varios delivery streams de Amazon Kinesis Data Firehose según el tipo de presupuesto, entregando a un clúster de Amazon OpenSearch Service. Configurar la aplicación para enviar mensajes al delivery stream adecuado. Configurar cada grupo de servidores backend para buscar los mensajes en OpenSearch Service y procesarlos."
        ],
        correctas: [2],
        explicacion: "Un único topic de SNS con filtrado de mensajes hacia distintas colas SQS por tipo de presupuesto es el patrón estándar de bajo mantenimiento para enrutar y desacoplar mensajes sin duplicar infraestructura: SQS garantiza que ningún mensaje se pierda (persistencia hasta que se procesa) y cada servidor backend consume solo su propia cola. Kinesis Data Streams o Firehose (A, D) están pensados para streaming de alto volumen y análisis en tiempo real, no para este patrón de enrutamiento por tipo con garantía de entrega, y crear un Lambda+SNS por cada tipo (B) multiplica los componentes a mantener frente a una única solución con filtrado."
      },
      {
        pregunta: "Una empresa tiene una aplicación que corre en varias instancias EC2, cada una con varios volúmenes de datos EBS adjuntos. Hay que respaldar cada noche la configuración de las instancias y sus datos, y la aplicación debe poder recuperarse en otra región de AWS. ¿Qué solución cumple esto de la forma MÁS eficiente operativamente?",
        opciones: [
          "Escribir una función Lambda que programe snapshots nocturnos de los volúmenes EBS de la aplicación y los copie a otra región.",
          "Crear un plan de backup con AWS Backup para hacer copias nocturnas. Copiar los backups a otra región. Añadir las instancias EC2 de la aplicación como recursos.",
          "Crear un plan de backup con AWS Backup para hacer copias nocturnas. Copiar los backups a otra región. Añadir los volúmenes EBS de la aplicación como recursos.",
          "Escribir una función Lambda que programe snapshots nocturnos de los volúmenes EBS de la aplicación y los copie a otra zona de disponibilidad."
        ],
        correctas: [2],
        explicacion: "AWS Backup centraliza y automatiza de forma nativa el backup programado y la copia entre regiones sin necesidad de scripts propios, y añadir los volúmenes EBS como recursos del plan cubre exactamente los datos que hay que respaldar. Una función Lambda personalizada (A, D) exige mantener código propio para algo que AWS Backup ya gestiona de forma nativa, y copiar solo a otra zona de disponibilidad (D) no cumple el requisito de recuperación en otra región."
      },
      {
        pregunta: "Una empresa construye una app móvil en AWS y quiere ampliar su alcance a millones de usuarios. Necesita una plataforma donde los usuarios autorizados puedan ver el contenido de la empresa en sus dispositivos móviles. ¿Qué debería recomendar un arquitecto de soluciones?",
        opciones: [
          "Publicar el contenido en un bucket público de S3. Usar claves de AWS KMS para transmitir el contenido.",
          "Configurar una VPN IPsec entre la app móvil y el entorno de AWS para transmitir el contenido.",
          "Usar Amazon CloudFront. Proporcionar URLs firmadas para transmitir el contenido.",
          "Configurar AWS Client VPN entre la app móvil y el entorno de AWS para transmitir el contenido."
        ],
        correctas: [2],
        explicacion: "CloudFront es la CDN de AWS diseñada para entregar contenido en streaming a millones de usuarios a nivel global con baja latencia, y las URLs firmadas permiten controlar el acceso solo a usuarios autorizados con permisos y expiración configurables. Un bucket público con KMS (A) expondría el contenido sin control de acceso real, y las VPNs (B, D) están pensadas para conectar redes privadas, no para servir streaming a millones de usuarios finales."
      },
      {
        pregunta: "Una empresa tiene una base de datos MySQL on-premises usada por el equipo global de ventas, con patrones de acceso infrecuentes. El equipo de ventas necesita tiempo de inactividad mínimo. Un administrador de bases de datos quiere migrar esta base de datos a AWS sin elegir un tipo de instancia concreto, anticipando más usuarios en el futuro. ¿Qué servicio debería recomendar un arquitecto de soluciones?",
        opciones: ["Amazon Aurora MySQL", "Amazon Aurora Serverless para MySQL", "Amazon Redshift Spectrum", "Amazon RDS para MySQL"],
        correctas: [1],
        explicacion: "Aurora Serverless escala automáticamente la capacidad de cómputo según el uso real sin que haya que elegir ni fijar un tipo de instancia concreto, encajando perfectamente con un patrón de acceso infrecuente y con crecimiento futuro incierto de usuarios. Aurora MySQL provisionado (A) y RDS para MySQL (D) exigen elegir un tipo de instancia fijo, y Redshift Spectrum (C) es para analítica sobre datos en S3, no para sustituir una base de datos transaccional MySQL."
      },
      {
        pregunta: "Una empresa sufrió una brecha de seguridad que afectó a varias aplicaciones de su centro de datos on-premises, aprovechando vulnerabilidades en aplicaciones personalizadas que corrían en los servidores. Ahora migra sus aplicaciones a instancias EC2 y quiere una solución que escanee activamente en busca de vulnerabilidades en las instancias EC2 y envíe un informe detallado de los hallazgos. ¿Qué solución cumple esto?",
        opciones: [
          "Desplegar AWS Shield para escanear las instancias EC2 en busca de vulnerabilidades. Crear una función Lambda para registrar los hallazgos en AWS CloudTrail.",
          "Desplegar Amazon Macie y funciones Lambda para escanear las instancias EC2 en busca de vulnerabilidades. Registrar los hallazgos en AWS CloudTrail.",
          "Activar Amazon GuardDuty. Desplegar los agentes de GuardDuty en las instancias EC2. Configurar una función Lambda para automatizar la generación y distribución de informes detallados de los hallazgos.",
          "Activar Amazon Inspector. Desplegar el agente de Amazon Inspector en las instancias EC2. Configurar una función Lambda para automatizar la generación y distribución de informes detallados de los hallazgos."
        ],
        correctas: [3],
        explicacion: "Amazon Inspector es el servicio de AWS diseñado específicamente para escanear activamente instancias EC2 en busca de vulnerabilidades de software y exposición a la red, y una función Lambda puede automatizar la generación y el envío de los informes de hallazgos. AWS Shield (A) protege contra ataques DDoS, no escanea vulnerabilidades de software, Macie (B) está enfocado a descubrir datos sensibles, no vulnerabilidades de instancias, y GuardDuty (C) analiza comportamiento y amenazas a partir de logs, no ejecuta un agente de escaneo de vulnerabilidades como Inspector."
      },
      {
        pregunta: "Una empresa usa una instancia EC2 para ejecutar un script que hace polling y procesa mensajes de una cola de Amazon SQS. Quiere reducir costes operativos manteniendo la capacidad de procesar un número creciente de mensajes. ¿Qué debería recomendar un arquitecto de soluciones?",
        opciones: [
          "Aumentar el tamaño de la instancia EC2 para procesar mensajes más rápido.",
          "Usar Amazon EventBridge para apagar la instancia EC2 cuando esté infrautilizada.",
          "Migrar el script de la instancia EC2 a una función AWS Lambda con el runtime adecuado.",
          "Usar AWS Systems Manager Run Command para ejecutar el script bajo demanda."
        ],
        correctas: [2],
        explicacion: "Migrar el polling y procesamiento a una función Lambda (activada por la propia cola SQS como origen de eventos) elimina el coste de una instancia EC2 corriendo permanentemente, y Lambda escala automáticamente el número de invocaciones concurrentes según crece la cola, pagando solo por el tiempo de cómputo real usado. Aumentar el tamaño de la instancia (A) incrementa el coste en vez de reducirlo, apagarla con EventBridge (B) complicaría el procesamiento continuo de mensajes, y Run Command bajo demanda (D) no resuelve el procesamiento continuo automático de una cola creciente."
      },
      {
        pregunta: "Una empresa usa una aplicación heredada que produce datos en formato CSV y los guarda en S3. Va a desplegar una aplicación comercial (COTS) que hace consultas SQL complejas sobre datos en Redshift y S3 únicamente, pero no puede procesar los .csv que produce la aplicación heredada. No se puede modificar la aplicación heredada para que produzca otro formato. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Crear un job ETL de AWS Glue programado. Configurar el job para procesar los .csv y guardar los datos procesados en Amazon Redshift.",
          "Desarrollar un script de Python que corra en instancias EC2 para convertir los .csv a archivos .sql. Invocar el script con una programación cron para guardar los archivos de salida en S3.",
          "Crear una función Lambda y una tabla de DynamoDB. Usar un evento de S3 para invocar la función Lambda. Configurar la función Lambda para hacer un ETL de los .csv y guardar los datos procesados en la tabla DynamoDB.",
          "Usar Amazon EventBridge para lanzar un clúster de Amazon EMR con programación semanal. Configurar el clúster EMR para hacer un ETL de los .csv y guardar los datos procesados en una tabla de Amazon Redshift."
        ],
        correctas: [0],
        explicacion: "Un job ETL de AWS Glue programado convierte automáticamente los .csv al formato que necesita la aplicación COTS (cargándolos en Redshift, que sí soporta) sin gestionar infraestructura propia, siendo la opción de menor esfuerzo operativo. Mantener un script en EC2 (B) exige gestionar servidores, procesar vía Lambda hacia DynamoDB (C) no coloca los datos donde la app COTS los necesita (Redshift/S3), y levantar un clúster EMR semanal (D) es más infraestructura de la necesaria para esta conversión de formato."
      },
      {
        pregunta: "Una empresa migró recientemente todo su entorno de TI a la nube de AWS y descubre que los usuarios aprovisionan instancias EC2 sobredimensionadas y modifican reglas de security groups sin seguir el proceso de control de cambios adecuado. Un arquitecto de soluciones debe diseñar una estrategia para rastrear y auditar estos cambios de inventario y configuración. ¿Qué acciones debería tomar? (Elige dos.)",
        opciones: [
          "Activar AWS CloudTrail y usarlo para auditoría.",
          "Usar políticas de ciclo de vida de datos para las instancias EC2.",
          "Activar AWS Trusted Advisor y consultar el panel de seguridad.",
          "Activar AWS Config y crear reglas de auditoría y cumplimiento.",
          "Restaurar configuraciones anteriores de recursos con una plantilla de AWS CloudFormation."
        ],
        correctas: [0, 3],
        explicacion: "CloudTrail registra el historial de todas las acciones y llamadas a la API realizadas sobre los recursos de la cuenta (quién hizo qué cambio y cuándo), y AWS Config mantiene un inventario continuo de la configuración de los recursos y permite crear reglas que evalúan automáticamente el cumplimiento frente al estado deseado, avisando de desviaciones. Las políticas de ciclo de vida de datos (B) no auditan cambios de configuración, el panel de seguridad de Trusted Advisor (C) da recomendaciones puntuales pero no un registro de auditoría continuo, y restaurar con CloudFormation (E) es una acción de remediación, no de rastreo/auditoría."
      },
      {
        pregunta: "Una empresa tiene cientos de instancias EC2 Linux en AWS. Los administradores de sistemas han usado claves SSH compartidas para gestionarlas. Tras una auditoría reciente, el equipo de seguridad exige eliminar todas las claves compartidas. Un arquitecto de soluciones debe diseñar una solución de acceso seguro a las instancias EC2. ¿Qué solución cumple esto con el MENOR esfuerzo administrativo?",
        opciones: [
          "Usar AWS Systems Manager Session Manager para conectarse a las instancias EC2.",
          "Usar AWS Security Token Service (AWS STS) para generar claves SSH de un solo uso bajo demanda.",
          "Permitir acceso SSH compartido a un conjunto de instancias bastión. Configurar el resto de instancias para permitir SSH solo desde las instancias bastión.",
          "Usar un autorizador personalizado de Amazon Cognito para autenticar usuarios. Invocar una función Lambda para generar una clave SSH temporal."
        ],
        correctas: [0],
        explicacion: "Session Manager de Systems Manager permite conectarse de forma segura a las instancias sin necesidad de claves SSH, bastiones ni puertos abiertos, usando roles de IAM para la autenticación y dejando un registro auditable de las sesiones, con el mínimo esfuerzo administrativo al no requerir infraestructura ni gestión de claves adicional. Generar claves SSH bajo demanda con STS (B) o vía Cognito+Lambda (D) sigue implicando gestión de claves SSH, y mantener instancias bastión (C) sigue usando SSH compartido en el propio bastión, sin eliminar del todo el problema."
      },
      {
        pregunta: "Una empresa usa una flota de instancias EC2 para ingerir datos de fuentes on-premises. Los datos están en formato JSON y las tasas de ingesta pueden llegar a 1 MB/s. Al reiniciar una instancia EC2, se pierden los datos en tránsito. El equipo de ciencia de datos quiere consultar los datos ingeridos casi en tiempo real. ¿Qué solución ofrece consultas casi en tiempo real, escalable y con mínima pérdida de datos?",
        opciones: [
          "Publicar los datos en Amazon Kinesis Data Streams. Usar Kinesis Data Analytics para consultarlos.",
          "Publicar los datos en Kinesis Data Firehose con Amazon Redshift como destino. Usar Redshift para consultarlos.",
          "Guardar los datos ingeridos en el almacenamiento de instancia (instance store) de EC2. Publicarlos en Kinesis Data Firehose con S3 como destino. Usar Amazon Athena para consultarlos.",
          "Guardar los datos ingeridos en un volumen EBS. Publicarlos en Amazon ElastiCache para Redis. Suscribirse al canal de Redis para consultarlos."
        ],
        correctas: [0],
        explicacion: "Kinesis Data Streams retiene los datos de forma duradera y replicada en la propia infraestructura de streaming de AWS (no en la instancia que los genera), de forma que un reinicio de la instancia EC2 productora no provoca pérdida de datos en tránsito, y Kinesis Data Analytics permite consultarlos con SQL casi en tiempo real directamente sobre el stream. Guardar datos en almacenamiento local de la instancia (C) o en un volumen EBS (D) antes de enviarlos no protege frente a la pérdida descrita si el reinicio ocurre antes de esa persistencia, y Redshift vía Firehose (B) tiene mayor latencia de carga que Kinesis Data Analytics para consultas casi en tiempo real."
      },
      {
        pregunta: "¿Qué debería hacer un arquitecto de soluciones para garantizar que todos los objetos subidos a un bucket de S3 estén cifrados?",
        opciones: [
          "Actualizar la política del bucket para denegar el PutObject si no tiene la cabecera s3:x-amz-acl.",
          "Actualizar la política del bucket para denegar el PutObject si no tiene la cabecera s3:x-amz-acl con valor private.",
          "Actualizar la política del bucket para denegar el PutObject si no tiene la cabecera aws:SecureTransport con valor true.",
          "Actualizar la política del bucket para denegar el PutObject si no tiene la cabecera x-amz-server-side-encryption."
        ],
        correctas: [3],
        explicacion: "La cabecera x-amz-server-side-encryption indica el algoritmo de cifrado del lado del servidor a aplicar; una política de bucket que deniegue cualquier PutObject sin esa cabecera obliga a que todo objeto subido quede cifrado en el servidor. Las cabeceras s3:x-amz-acl (A, B) controlan permisos de ACL, no cifrado, y aws:SecureTransport (C) exige HTTPS en la conexión (cifrado en tránsito), no cifrado en reposo del objeto."
      },
      {
        pregunta: "Un arquitecto de soluciones diseña una aplicación multicapa donde los usuarios suben imágenes desde el móvil. La aplicación genera una miniatura de cada imagen y devuelve un mensaje confirmando la subida. La generación de la miniatura puede tardar hasta 60 segundos, pero la empresa quiere dar una respuesta más rápida notificando que la imagen original se recibió. El arquitecto debe diseñar el envío asíncrono de peticiones entre capas. ¿Qué debería hacer?",
        opciones: [
          "Escribir una función Lambda personalizada que genere la miniatura y avise al usuario. Usar el proceso de subida de imagen como origen de eventos para invocar la función Lambda.",
          "Crear un flujo de trabajo de AWS Step Functions. Configurar Step Functions para orquestar entre las capas de la aplicación y avisar al usuario cuando la miniatura esté lista.",
          "Crear una cola de mensajes de Amazon SQS. Al subir las imágenes, colocar un mensaje en la cola SQS para la generación de la miniatura. Avisar al usuario mediante un mensaje de la aplicación de que la imagen se recibió.",
          "Crear topics y suscripciones de Amazon SNS. Usar una suscripción para que la aplicación genere la miniatura tras completarse la subida. Usar una segunda suscripción para notificar al móvil del usuario mediante notificación push cuando termine la generación."
        ],
        correctas: [2],
        explicacion: "Colocar un mensaje en una cola SQS para la generación asíncrona de la miniatura desacopla ambos procesos: la aplicación puede confirmar de inmediato la recepción de la imagen al usuario mientras el procesamiento de la miniatura ocurre después, de forma independiente, leyendo la cola. Un Lambda invocado directamente por el evento de subida (A) seguiría bloqueando la respuesta hasta terminar (o requeriría lógica adicional para desacoplarlo), Step Functions (B) añade orquestación innecesaria para un flujo tan simple, y SNS con dos suscripciones (D) no ofrece el buffering/cola que SQS sí aporta ante picos de subidas."
      },
      {
        pregunta: "Las instalaciones de una empresa tienen lectores de tarjetas en cada entrada del edificio. Al escanear una tarjeta, el lector envía un mensaje por HTTPS indicando quién intentó acceder a esa entrada. Un arquitecto de soluciones debe diseñar un sistema para procesar estos mensajes, que sea altamente disponible y cuyos resultados estén disponibles para que el equipo de seguridad los analice. ¿Qué arquitectura debería recomendar?",
        opciones: [
          "Lanzar una instancia EC2 como endpoint HTTPS y para procesar los mensajes. Configurar la instancia para guardar los resultados en un bucket de S3.",
          "Crear un endpoint HTTPS en Amazon API Gateway. Configurar el endpoint de API Gateway para invocar una función Lambda que procese los mensajes y guarde los resultados en una tabla de Amazon DynamoDB.",
          "Usar Amazon Route 53 para dirigir los mensajes entrantes de los sensores a una función Lambda. Configurar la función Lambda para procesar los mensajes y guardar los resultados en una tabla DynamoDB.",
          "Crear un endpoint de VPC de tipo gateway para Amazon S3. Configurar una conexión Site-to-Site VPN desde la red de las instalaciones a la VPC para que los datos de los sensores se escriban directamente en un bucket de S3 a través del endpoint de VPC."
        ],
        correctas: [1],
        explicacion: "API Gateway + Lambda + DynamoDB es una arquitectura serverless totalmente gestionada y altamente disponible por defecto (sin servidores que administrar ni puntos únicos de fallo), ideal para procesar eventos HTTPS y dejar los resultados disponibles para análisis posterior. Una instancia EC2 propia (A) no es altamente disponible por sí sola sin más componentes, y Route 53 (C) es un servicio DNS, no un mecanismo de recepción de peticiones HTTPS; montar una VPN Site-to-Site (D) es una complejidad de red innecesaria para simples peticiones HTTPS desde sensores."
      },
      {
        pregunta: "Una empresa quiere implementar un plan de recuperación ante desastres para su volumen de almacenamiento de archivos on-premises principal, montado desde un dispositivo iSCSI en un servidor de almacenamiento local, con cientos de terabytes de datos. Quiere que los usuarios finales conserven acceso inmediato a todos los tipos de archivo desde los sistemas on-premises, sin experimentar latencia. ¿Qué solución cumple esto con el MENOR cambio en la infraestructura existente?",
        opciones: [
          "Aprovisionar un Amazon S3 File Gateway como máquina virtual on-premises. Fijar la caché local en 10 TB. Modificar las aplicaciones existentes para acceder a los archivos por NFS. Para recuperarse de un desastre, aprovisionar una instancia EC2 y montar el bucket de S3 con los archivos.",
          "Aprovisionar un AWS Storage Gateway Tape Gateway. Usar una solución de backup para respaldar todos los datos existentes a una biblioteca de cintas virtual, programada para correr cada noche tras el backup inicial. Para recuperarse, aprovisionar una instancia EC2 y restaurar los datos a un volumen EBS desde los volúmenes de la biblioteca de cintas virtual.",
          "Aprovisionar un AWS Storage Gateway Volume Gateway de volúmenes en caché. Fijar la caché local en 10 TB. Montar el volumen de caché al servidor de archivos existente por iSCSI, y copiar todos los archivos al volumen de almacenamiento. Configurar snapshots programados del volumen. Para recuperarse, restaurar un snapshot a un volumen EBS y adjuntarlo a una instancia EC2.",
          "Aprovisionar un AWS Storage Gateway Volume Gateway de volúmenes almacenados, con el mismo espacio en disco que el volumen de archivos existente. Montar el volumen almacenado al servidor de archivos existente por iSCSI, y copiar todos los archivos al volumen de almacenamiento. Configurar snapshots programados del volumen. Para recuperarse, restaurar un snapshot a un volumen EBS y adjuntarlo a una instancia EC2."
        ],
        correctas: [3],
        explicacion: "Los volúmenes almacenados (stored volumes) mantienen la copia completa de TODOS los datos en el almacenamiento local (garantizando acceso inmediato sin latencia a cualquier archivo, tal y como exige el enunciado), mientras se respaldan de forma asíncrona mediante snapshots hacia AWS para la recuperación ante desastres, manteniendo el mismo protocolo iSCSI que ya usa el servidor existente (mínimo cambio). Los volúmenes en caché (C) solo mantienen localmente los datos de acceso frecuente, no garantizando acceso inmediato a TODOS los archivos; S3 File Gateway (A) exige cambiar el protocolo de acceso de iSCSI a NFS, y Tape Gateway (B) está pensado para backup de cintas, no para servir acceso local continuo de datos activos."
      },
      {
        pregunta: "Una empresa aloja una aplicación web desde un bucket de S3. La aplicación usa Amazon Cognito como proveedor de identidad para autenticar usuarios y devuelve un JSON Web Token (JWT) que da acceso a recursos protegidos guardados en otro bucket de S3. Tras el despliegue, los usuarios reportan errores y no pueden acceder al contenido protegido. Un arquitecto de soluciones debe resolver esto dando los permisos adecuados. ¿Qué solución cumple esto?",
        opciones: [
          "Actualizar el identity pool de Amazon Cognito para que asuma el rol de IAM adecuado para acceder al contenido protegido.",
          "Actualizar la ACL de S3 para permitir que la aplicación acceda al contenido protegido.",
          "Volver a desplegar la aplicación en S3 para evitar que las lecturas eventualmente consistentes del bucket afecten al acceso de los usuarios al contenido protegido.",
          "Actualizar el pool de Amazon Cognito para usar mapeos de atributos personalizados dentro del identity pool y dar a los usuarios los permisos adecuados para acceder al contenido protegido."
        ],
        correctas: [0],
        explicacion: "El identity pool de Cognito es el componente que determina qué rol de IAM asumen los usuarios autenticados para acceder a recursos de AWS; si el rol asociado no tiene los permisos correctos (p. ej. s3:GetObject sobre el bucket protegido), hay que actualizarlo para que asuma el rol de IAM con esos permisos. Una ACL de bucket (B) no sustituye la necesidad de un rol de IAM con permisos correctos para el flujo de Cognito, la consistencia eventual (C) no es un problema real en S3 desde hace años, y los mapeos de atributos personalizados (D) afectan a la información del usuario, no directamente al rol de IAM que determina el acceso a S3."
      },
      {
        pregunta: "Una empresa de hosting de imágenes sube sus archivos grandes a buckets de S3 Standard, usando subida multiparte en paralelo con las APIs de S3, y sobrescribe el objeto si se sube el mismo de nuevo. Durante los primeros 30 días tras la subida los objetos se acceden con frecuencia; después se acceden con menos frecuencia, pero de forma inconsistente entre objetos. La empresa debe optimizar el coste de almacenamiento de S3 manteniendo alta disponibilidad y resiliencia. ¿Qué combinación de acciones debería recomendar un arquitecto de soluciones? (Elige dos.)",
        opciones: [
          "Mover los activos a S3 Intelligent-Tiering tras 30 días.",
          "Configurar una política de ciclo de vida de S3 para limpiar las subidas multiparte incompletas.",
          "Configurar una política de ciclo de vida de S3 para limpiar marcadores de borrado expirados.",
          "Mover los activos a S3 Standard-Infrequent Access (S3 Standard-IA) tras 30 días.",
          "Mover los activos a S3 One Zone-Infrequent Access (S3 One Zone-IA) tras 30 días."
        ],
        correctas: [0, 1],
        explicacion: "Como el patrón de acceso tras los 30 días es inconsistente entre objetos (no se sabe de antemano cuáles seguirán accediéndose y cuáles no), S3 Intelligent-Tiering es la clase de almacenamiento diseñada justamente para mover automáticamente cada objeto entre niveles según su patrón real de acceso, sin monitorización manual; y limpiar las subidas multiparte incompletas evita pagar por fragmentos huérfanos que no llegaron a completarse, una buena práctica de optimización de coste habitual con subidas multiparte. Mover a Standard-IA o One Zone-IA de forma fija (D, E) no se adapta a un patrón de acceso inconsistente por objeto como sí lo hace Intelligent-Tiering, y limpiar marcadores de borrado (C) no aplica aquí porque no se menciona versionado."
      },
      {
        pregunta: "Un arquitecto de soluciones debe asegurar una red VPC que aloja instancias EC2 con datos muy sensibles, en una subred privada. Según la política de la empresa, las instancias EC2 de la VPC solo pueden acceder a repositorios de software de terceros aprobados en internet (usando la URL de ese tercero) para actualizaciones de producto; el resto del tráfico de internet debe bloquearse. ¿Qué solución cumple esto?",
        opciones: [
          "Actualizar la tabla de rutas de la subred privada para enrutar el tráfico saliente hacia un firewall de AWS Network Firewall. Configurar grupos de reglas de listas de dominios.",
          "Configurar un web ACL de AWS WAF. Crear un conjunto de reglas personalizado que filtre peticiones de tráfico según rangos de IP de origen y destino.",
          "Implementar reglas de entrada estrictas en el security group. Configurar una regla de salida que permita tráfico solo hacia los repositorios de software autorizados especificando sus URLs.",
          "Configurar un Application Load Balancer (ALB) delante de las instancias EC2. Dirigir todo el tráfico saliente al ALB. Usar una regla de listener basada en URL en el target group del ALB para el acceso saliente a internet."
        ],
        correctas: [0],
        explicacion: "AWS Network Firewall soporta grupos de reglas de listas de dominios (filtrado por FQDN/dominio), que es el único mecanismo de la lista capaz de permitir tráfico saliente basado en la URL/dominio real de terceros aprobados y bloquear el resto. Los security groups (C) solo filtran por dirección IP/CIDR y puerto, no por URL o dominio (las IPs de terceros pueden cambiar), AWS WAF (B) protege aplicaciones web entrantes, no filtra tráfico saliente de instancias hacia internet, y un ALB (D) está diseñado para balancear tráfico entrante, no para enrutar ni filtrar tráfico saliente hacia internet."
      },
      {
        pregunta: "Una empresa aloja una aplicación de ecommerce de tres capas en AWS. La web se sirve desde S3 e integra con una API que gestiona las peticiones de venta, alojada en tres instancias EC2 detrás de un ALB. La API tiene contenido de front-end estático y dinámico junto con workers backend que procesan las ventas de forma asíncrona. Se espera un aumento repentino y significativo de peticiones de venta durante eventos de lanzamiento de nuevos productos. ¿Qué debería recomendar un arquitecto de soluciones para asegurar que todas las peticiones se procesen correctamente?",
        opciones: [
          "Añadir una distribución de CloudFront para el contenido dinámico. Aumentar el número de instancias EC2 para manejar el incremento de tráfico.",
          "Añadir una distribución de CloudFront para el contenido estático. Poner las instancias EC2 en un Auto Scaling group que lance nuevas instancias según el tráfico de red.",
          "Añadir una distribución de CloudFront para el contenido dinámico. Añadir una instancia de Amazon ElastiCache delante del ALB para reducir el tráfico que debe manejar la API.",
          "Añadir una distribución de CloudFront para el contenido estático. Añadir una cola de Amazon SQS para recibir peticiones de la web y procesarlas después con las instancias EC2."
        ],
        correctas: [1],
        explicacion: "CloudFront para el contenido estático reduce la carga en el backend (sirviéndolo desde el edge), y un Auto Scaling group que lance nuevas instancias según el tráfico de red permite escalar dinámicamente la capacidad de la API ante el pico repentino de ventas. CloudFront no cachea contenido dinámico de forma efectiva por su naturaleza (A, C), ElastiCache delante del ALB (C) no es un patrón estándar de caché de aplicación en ese punto, y añadir una cola SQS adicional (D) sin también escalar las instancias no resuelve la capacidad de procesamiento necesaria durante el pico."
      },
      {
        pregunta: "Una auditoría de seguridad revela que las instancias EC2 no se están parcheando regularmente. Un arquitecto de soluciones necesita una solución que ejecute escaneos de seguridad regulares sobre una gran flota de instancias EC2, las parchee según un calendario regular, y ofrezca un informe del estado de parcheo de cada instancia. ¿Qué solución cumple esto?",
        opciones: [
          "Configurar Amazon Macie para escanear las instancias EC2 en busca de vulnerabilidades de software. Configurar un cron job en cada instancia EC2 para parchearla según un calendario regular.",
          "Activar Amazon GuardDuty en la cuenta. Configurar GuardDuty para escanear las instancias EC2 en busca de vulnerabilidades de software. Configurar AWS Systems Manager Session Manager para parchear las instancias según un calendario regular.",
          "Configurar Amazon Detective para escanear las instancias EC2 en busca de vulnerabilidades de software. Configurar una regla programada de Amazon EventBridge para parchear las instancias EC2 según un calendario regular.",
          "Activar Amazon Inspector en la cuenta. Configurar Amazon Inspector para escanear las instancias EC2 en busca de vulnerabilidades de software. Configurar AWS Systems Manager Patch Manager para parchear las instancias EC2 según un calendario regular."
        ],
        correctas: [3],
        explicacion: "Amazon Inspector escanea automáticamente las instancias EC2 en busca de vulnerabilidades de software, y Systems Manager Patch Manager es el servicio nativo de AWS diseñado para aplicar parches según un calendario y generar el informe de estado de parcheo por instancia. Macie (A) descubre datos sensibles, no vulnerabilidades de software, GuardDuty (B) detecta amenazas a partir de comportamiento y logs, no ejecuta escaneos de vulnerabilidades como Inspector, y Detective (C) es una herramienta de investigación forense de incidentes, no de escaneo ni parcheo."
      },
      {
        pregunta: "Una empresa planea guardar datos en instancias de Amazon RDS. Debe cifrar los datos en reposo. ¿Qué debería hacer un arquitecto de soluciones para cumplir este requisito?",
        opciones: [
          "Crear una clave en AWS Key Management Service (AWS KMS). Activar el cifrado para las instancias de base de datos.",
          "Crear una clave de cifrado. Guardarla en AWS Secrets Manager. Usar la clave para cifrar las instancias de base de datos.",
          "Generar un certificado en AWS Certificate Manager (ACM). Activar SSL/TLS en las instancias de base de datos usando el certificado.",
          "Generar un certificado en AWS Identity and Access Management (IAM). Activar SSL/TLS en las instancias de base de datos usando el certificado."
        ],
        correctas: [0],
        explicacion: "El cifrado en reposo de RDS se gestiona de forma nativa creando una clave en AWS KMS y activando la opción de cifrado al crear (o modificar) la instancia de base de datos; RDS se integra directamente con KMS para este propósito. Secrets Manager (B) guarda secretos como credenciales, no gestiona el cifrado en reposo de la instancia, y SSL/TLS con ACM (C) o certificados de IAM (D) cifran las conexiones en tránsito, no los datos almacenados en disco."
      },
      {
        pregunta: "Una empresa debe migrar 20 TB de datos desde un centro de datos a la nube de AWS en menos de 30 días. El ancho de banda de red de la empresa está limitado a 15 Mbps y no puede superar el 70% de utilización. ¿Qué debería hacer un arquitecto de soluciones para cumplir esto?",
        opciones: ["Usar AWS Snowball.", "Usar AWS DataSync.", "Usar una conexión VPN segura.", "Usar Amazon S3 Transfer Acceleration."],
        correctas: [0],
        explicacion: "Con un ancho de banda limitado a 15 Mbps (y máximo el 70% de uso, unos 10,5 Mbps efectivos), transferir 20 TB por red tardaría muchos meses, muy por encima del plazo de 30 días; AWS Snowball transporta los datos físicamente, evitando la limitación de la red y cumpliendo el plazo. DataSync (B), una VPN (C) o Transfer Acceleration (D) siguen dependiendo del mismo enlace de red limitado y no resolverían el problema de tiempo dado el ancho de banda disponible."
      },
      {
        pregunta: "Una empresa necesita dar a sus empleados acceso seguro a archivos confidenciales y sensibles, accesibles solo por usuarios autorizados, y que puedan descargarse de forma segura a los dispositivos de los empleados. Los archivos están en un servidor de archivos Windows on-premises que se está quedando sin capacidad por el aumento de uso remoto. ¿Qué solución cumple esto?",
        opciones: [
          "Migrar el servidor de archivos a una instancia EC2 en una subred pública. Configurar el security group para limitar el tráfico de entrada a las IPs de los empleados.",
          "Migrar los archivos a un sistema de archivos Amazon FSx for Windows File Server. Integrar el sistema de archivos FSx con el Active Directory on-premises. Configurar AWS Client VPN.",
          "Migrar los archivos a Amazon S3 y crear un endpoint de VPC privado. Crear una URL firmada para permitir la descarga.",
          "Migrar los archivos a Amazon S3 y crear un endpoint de VPC público. Permitir que los empleados inicien sesión con AWS IAM Identity Center (AWS Single Sign-On)."
        ],
        correctas: [1],
        explicacion: "FSx for Windows File Server integrado con el Active Directory on-premises existente mantiene el mismo modelo de permisos y autenticación ya usado por los empleados, y AWS Client VPN da acceso remoto seguro y cifrado a ese sistema de archivos sin exponerlo a internet. Una instancia EC2 en subred pública (A) expone el servidor directamente a internet (menos seguro), y las opciones con S3 (C, D) no reemplazan de forma transparente un recurso compartido de archivos Windows con la misma experiencia ni integración de Active Directory."
      },
      {
        pregunta: "La aplicación de una empresa corre en instancias EC2 detrás de un ALB, en un Auto Scaling group repartido entre varias zonas de disponibilidad. El primer día de cada mes a medianoche, la aplicación se vuelve mucho más lenta cuando corre el proceso batch de cálculo financiero de fin de mes, haciendo que la CPU de las instancias EC2 llegue de inmediato al 100% y se interrumpa la aplicación. ¿Qué debería recomendar un arquitecto de soluciones para que la aplicación soporte esta carga y evite el tiempo de inactividad?",
        opciones: [
          "Configurar una distribución de CloudFront delante del ALB.",
          "Configurar una política de escalado simple de EC2 Auto Scaling basada en el uso de CPU.",
          "Configurar una política de escalado programado (scheduled scaling) de EC2 Auto Scaling según el calendario mensual.",
          "Configurar Amazon ElastiCache para quitar parte de la carga de las instancias EC2."
        ],
        correctas: [2],
        explicacion: "El pico de carga es completamente predecible (siempre el primer día del mes a medianoche), así que una política de escalado programado puede añadir capacidad de antemano justo antes de que arranque el proceso batch, evitando que la CPU llegue al 100% antes de que el escalado reactivo tenga tiempo de responder. Un escalado simple basado en CPU (B) reaccionaría solo después de que la CPU ya esté saturada, CloudFront (A) no acelera un proceso de cálculo backend, y ElastiCache (D) no está diseñado para aliviar picos de CPU de cálculos batch."
      },
      {
        pregunta: "Una empresa quiere dar a un cliente la posibilidad de usar su Microsoft Active Directory on-premises para descargar archivos guardados en S3. La aplicación del cliente usa un cliente SFTP para descargar los archivos. ¿Qué solución cumple esto con el MENOR esfuerzo operativo y sin cambios en la aplicación del cliente?",
        opciones: [
          "Configurar AWS Transfer Family con SFTP para Amazon S3. Configurar autenticación integrada con Active Directory.",
          "Configurar AWS Database Migration Service (AWS DMS) para sincronizar el cliente on-premises con S3. Configurar autenticación integrada con Active Directory.",
          "Configurar AWS DataSync para sincronizar entre la ubicación on-premises y S3 usando AWS IAM Identity Center (AWS Single Sign-On).",
          "Configurar una instancia EC2 Windows con SFTP para conectar el cliente on-premises con S3. Integrar AWS Identity and Access Management (IAM)."
        ],
        correctas: [0],
        explicacion: "AWS Transfer Family ofrece un endpoint SFTP totalmente gestionado sobre S3, con integración nativa de autenticación con Active Directory, de forma que la aplicación del cliente sigue usando SFTP exactamente igual que antes, sin ningún cambio, y sin tener que gestionar servidores. DMS (B) está pensado para replicación de bases de datos, no para servir SFTP, DataSync (C) sincroniza datos pero no expone un endpoint SFTP para el cliente existente, y montar una instancia EC2 con SFTP propio (D) exige gestionar infraestructura, justo lo que se quiere evitar."
      },
      {
        pregunta: "Una empresa experimenta aumentos repentinos de demanda y necesita aprovisionar instancias EC2 grandes a partir de una AMI. Las instancias correrán en un Auto Scaling group. La empresa necesita una solución que dé la mínima latencia de inicialización para cubrir la demanda. ¿Qué solución cumple esto?",
        opciones: [
          "Usar el comando aws ec2 register-image para crear una AMI a partir de un snapshot. Usar AWS Step Functions para reemplazar la AMI en el Auto Scaling group.",
          "Activar la restauración rápida de snapshots de Amazon EBS (fast snapshot restore) sobre un snapshot. Aprovisionar una AMI usando ese snapshot. Reemplazar la AMI en el Auto Scaling group por la nueva.",
          "Activar la creación de AMIs y definir reglas de ciclo de vida en Amazon Data Lifecycle Manager (DLM). Crear una función Lambda que modifique la AMI en el Auto Scaling group.",
          "Usar Amazon EventBridge para invocar políticas de ciclo de vida de AWS Backup que aprovisionen AMIs. Configurar los límites de capacidad del Auto Scaling group como origen de eventos en EventBridge."
        ],
        correctas: [1],
        explicacion: "EBS fast snapshot restore precalienta el snapshot para que los volúmenes creados a partir de él (y por tanto las instancias lanzadas desde la AMI basada en ese snapshot) tengan rendimiento pleno desde el primer momento, minimizando la latencia de inicialización frente al comportamiento normal de carga perezosa de bloques de un snapshot. Registrar la AMI con Step Functions (A) o automatizar su reemplazo con Lambda/DLM (C) o EventBridge+Backup (D) no aborda directamente el problema de latencia de inicialización de los volúmenes EBS del snapshot."
      },
      {
        pregunta: "Una empresa aloja una web multicapa con un clúster de Amazon Aurora MySQL como almacenamiento, y la capa de aplicación en instancias EC2. Las normas de seguridad de TI exigen que las credenciales de la base de datos estén cifradas y se roten cada 14 días. ¿Qué debería hacer un arquitecto de soluciones para cumplir esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Crear una nueva clave de cifrado de AWS KMS. Usar AWS Secrets Manager para crear un nuevo secreto que use la clave KMS con las credenciales correspondientes. Asociar el secreto al clúster Aurora. Configurar un periodo de rotación personalizado de 14 días.",
          "Crear dos parámetros en AWS Systems Manager Parameter Store: uno de tipo string para el usuario y otro de tipo SecureString para la contraseña. Elegir cifrado de AWS KMS para el parámetro de contraseña, y cargar estos parámetros en la capa de aplicación. Implementar una función Lambda que rote la contraseña cada 14 días.",
          "Guardar un archivo con las credenciales en un sistema de archivos Amazon EFS cifrado con AWS KMS. Montar el sistema de archivos EFS en todas las instancias EC2 de la capa de aplicación. Restringir el acceso al archivo para que la aplicación pueda leerlo y solo los superusuarios puedan modificarlo. Implementar una función Lambda que rote la clave en Aurora cada 14 días y escriba las nuevas credenciales en el archivo.",
          "Guardar un archivo con las credenciales en un bucket de S3 cifrado con AWS KMS, que la aplicación usa para cargar las credenciales. Descargar el archivo regularmente para asegurar que se usan las credenciales correctas. Implementar una función Lambda que rote las credenciales de Aurora cada 14 días y las suba al archivo en el bucket S3."
        ],
        correctas: [0],
        explicacion: "AWS Secrets Manager tiene integración nativa con Aurora para gestionar y rotar automáticamente las credenciales según un periodo configurable (14 días en este caso), sin necesidad de escribir ni mantener ninguna función Lambda personalizada para la rotación. Las opciones con Parameter Store (B), EFS (C) o S3 (D) exigen implementar y mantener manualmente una función Lambda de rotación propia, con mucho más esfuerzo operativo que la rotación nativa de Secrets Manager."
      },
      {
        pregunta: "Una empresa ha desplegado una web en AWS. Aloja la base de datos backend en Amazon RDS para MySQL con una instancia primaria y cinco réplicas de lectura para escalar. Las réplicas no deben ir más de 1 segundo por detrás de la primaria. La base de datos ejecuta rutinariamente procedimientos almacenados programados. Al crecer el tráfico, las réplicas sufren retraso adicional en picos de carga. Un arquitecto de soluciones debe reducir el retraso de replicación al máximo, minimizando cambios en el código de la aplicación y el esfuerzo operativo continuo. ¿Qué solución cumple esto?",
        opciones: [
          "Migrar la base de datos a Amazon Aurora MySQL. Sustituir las réplicas de lectura por Aurora Replicas, y configurar Aurora Auto Scaling. Sustituir los procedimientos almacenados por funciones nativas de Aurora MySQL.",
          "Desplegar un clúster de Amazon ElastiCache para Redis delante de la base de datos. Modificar la aplicación para consultar la caché antes de consultar la base de datos. Sustituir los procedimientos almacenados por funciones Lambda.",
          "Migrar la base de datos a MySQL corriendo en instancias EC2. Elegir instancias grandes optimizadas para cómputo para todos los nodos de réplica. Mantener los procedimientos almacenados en las instancias EC2.",
          "Migrar la base de datos a Amazon DynamoDB. Aprovisionar un gran número de unidades de capacidad de lectura (RCUs) para soportar el throughput necesario, y configurar escalado de capacidad on-demand. Sustituir los procedimientos almacenados por streams de DynamoDB."
        ],
        correctas: [0],
        explicacion: "Las Aurora Replicas tienen un retraso de replicación mucho menor que las réplicas de lectura tradicionales de RDS gracias a la arquitectura de almacenamiento compartido de Aurora, y Aurora Auto Scaling ajusta automáticamente el número de réplicas según la demanda real, reduciendo el retraso en picos con el mínimo esfuerzo operativo continuo. Añadir ElastiCache (B) o migrar a DynamoDB (D) exige cambios significativos en el código de la aplicación (justo lo que hay que minimizar), y migrar a EC2 propio (C) aumenta el esfuerzo operativo en vez de reducirlo."
      },
      {
        pregunta: "Un arquitecto de soluciones debe crear un plan de recuperación ante desastres (DR) para una plataforma SaaS de alto volumen. Todos los datos de la plataforma se guardan en un clúster de Amazon Aurora MySQL, y el plan de DR debe replicar los datos a una región secundaria de AWS. ¿Qué solución cumple esto de la forma MÁS económica?",
        opciones: [
          "Usar replicación de binary log de MySQL hacia un clúster Aurora en la región secundaria. Aprovisionar una instancia de base de datos para el clúster Aurora en la región secundaria.",
          "Configurar una base de datos global de Aurora para el clúster. Cuando termine la configuración, eliminar la instancia de base de datos de la región secundaria.",
          "Usar AWS Database Migration Service (AWS DMS) para replicar continuamente los datos a un clúster Aurora en la región secundaria. Eliminar la instancia de base de datos de la región secundaria.",
          "Configurar una base de datos global de Aurora para el clúster. Especificar un mínimo de una instancia de base de datos en la región secundaria."
        ],
        correctas: [3],
        explicacion: "Aurora Global Database es la forma nativa y más económica de replicar de forma continua y con baja latencia entre regiones; mantener al menos una instancia de base de datos en la región secundaria es imprescindible, ya que sin ninguna instancia activa (B, C) no hay forma de leer los datos replicados ni de promoverla en caso de desastre. La replicación manual con binary log (A) exige gestionar y mantener la replicación manualmente, más esfuerzo y coste que la solución nativa de Aurora."
      },
      {
        pregunta: "Una empresa tiene una aplicación personalizada con credenciales incrustadas que recupera información de una instancia RDS MySQL. Dirección exige que la aplicación sea más segura con el mínimo esfuerzo de programación. ¿Qué debería hacer un arquitecto de soluciones para cumplir esto?",
        opciones: [
          "Usar AWS Key Management Service (AWS KMS) para crear claves. Configurar la aplicación para cargar las credenciales de base de datos desde KMS. Activar la rotación automática de claves.",
          "Crear credenciales en la base de datos RDS para MySQL para el usuario de la aplicación y guardarlas en AWS Secrets Manager. Configurar la aplicación para cargar las credenciales desde Secrets Manager. Crear una función Lambda que rote las credenciales en Secrets Manager.",
          "Crear credenciales en la base de datos RDS para MySQL para el usuario de la aplicación y guardarlas en AWS Secrets Manager. Configurar la aplicación para cargar las credenciales desde Secrets Manager. Configurar un calendario de rotación de credenciales para el usuario de la aplicación en la base de datos RDS para MySQL usando Secrets Manager.",
          "Crear credenciales en la base de datos RDS para MySQL para el usuario de la aplicación y guardarlas en AWS Systems Manager Parameter Store. Configurar la aplicación para cargar las credenciales desde Parameter Store. Configurar un calendario de rotación de credenciales para el usuario de la aplicación en la base de datos RDS para MySQL usando Parameter Store."
        ],
        correctas: [2],
        explicacion: "Secrets Manager tiene integración nativa con RDS para MySQL que permite configurar directamente un calendario de rotación automática de credenciales sin escribir ninguna función Lambda personalizada, siendo la opción de menor esfuerzo de programación. KMS (A) gestiona claves de cifrado, no credenciales de aplicación con rotación de usuario de base de datos, la opción con Lambda propia (B) añade esfuerzo de programación innecesario existiendo la rotación nativa, y Parameter Store (D) no ofrece rotación nativa integrada con RDS como sí lo hace Secrets Manager."
      },
      {
        pregunta: "Una empresa de medios aloja su web en AWS. La arquitectura incluye una flota de instancias EC2 detrás de un ALB y una base de datos en Amazon Aurora. El equipo de ciberseguridad reporta que la aplicación es vulnerable a inyección SQL. ¿Cómo debería resolver esto la empresa?",
        opciones: [
          "Usar AWS WAF delante del ALB. Asociar los web ACLs adecuados a AWS WAF.",
          "Crear una regla de listener del ALB que responda a las inyecciones SQL con una respuesta fija.",
          "Suscribirse a AWS Shield Advanced para bloquear automáticamente todos los intentos de inyección SQL.",
          "Configurar Amazon Inspector para bloquear automáticamente todos los intentos de inyección SQL."
        ],
        correctas: [0],
        explicacion: "AWS WAF está diseñado específicamente para proteger aplicaciones web frente a exploits comunes como la inyección SQL, mediante reglas y conjuntos de reglas (web ACLs) que se aplican delante del ALB para filtrar peticiones maliciosas. Una regla de listener del ALB (B) no tiene capacidad de inspección de contenido SQL, AWS Shield Advanced (C) protege contra ataques DDoS, no inyección SQL, y Amazon Inspector (D) escanea vulnerabilidades de instancias, no bloquea tráfico de aplicación en tiempo real."
      },
      {
        pregunta: "Una empresa tiene un data lake en S3 gobernado por AWS Lake Formation. Quiere crear una visualización en Amazon QuickSight combinando los datos del data lake con datos operativos guardados en una base de datos Amazon Aurora MySQL, aplicando autorización a nivel de columna para que el equipo de marketing solo acceda a un subconjunto de columnas de la base de datos. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Usar Amazon EMR para ingerir los datos directamente de la base de datos al motor SPICE de QuickSight. Incluir solo las columnas necesarias.",
          "Usar AWS Glue Studio para ingerir los datos de la base de datos al data lake de S3. Adjuntar una política de IAM a los usuarios de QuickSight para forzar el control de acceso a nivel de columna. Usar S3 como fuente de datos en QuickSight.",
          "Usar AWS Glue Elastic Views para crear una vista materializada de la base de datos en S3. Crear una política de bucket de S3 para forzar el control de acceso a nivel de columna para los usuarios de QuickSight. Usar S3 como fuente de datos en QuickSight.",
          "Usar un blueprint de Lake Formation para ingerir los datos de la base de datos al data lake de S3. Usar Lake Formation para forzar el control de acceso a nivel de columna para los usuarios de QuickSight. Usar Amazon Athena como fuente de datos en QuickSight."
        ],
        correctas: [3],
        explicacion: "Lake Formation es el servicio diseñado específicamente para aplicar control de acceso granular a nivel de columna sobre datos del data lake, y sus blueprints automatizan la ingesta desde bases de datos relacionales como Aurora hacia S3; usando Athena como fuente en QuickSight se aprovecha directamente esa autorización ya aplicada por Lake Formation, sin necesidad de mecanismos de control de acceso adicionales. Las políticas de IAM (B) o de bucket de S3 (C) no ofrecen de forma nativa un control de acceso a nivel de columna tan granular como Lake Formation, y EMR (A) no es un servicio de aplicación de políticas de autorización a nivel de columna."
      },
      {
        pregunta: "Una empresa de procesamiento de transacciones tiene jobs batch semanales con scripts que corren en instancias EC2 dentro de un Auto Scaling group. El número de transacciones varía, pero la utilización de CPU base en cada ejecución es de al menos el 60%. La empresa necesita aprovisionar la capacidad 30 minutos antes de que corran los jobs. Actualmente los ingenieros hacen esto modificando manualmente los parámetros del Auto Scaling group, y la empresa no tiene recursos para analizar las tendencias de capacidad necesarias. Necesita una forma automatizada de modificar la capacidad deseada del Auto Scaling group. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Crear una política de escalado dinámico para el Auto Scaling group. Configurar la política para escalar según la métrica de utilización de CPU. Fijar el valor objetivo de la métrica en 60%.",
          "Crear una política de escalado programado para el Auto Scaling group. Fijar la capacidad deseada, mínima y máxima adecuadas. Fijar la recurrencia en semanal. Fijar la hora de inicio 30 minutos antes de que corran los jobs batch.",
          "Crear una política de escalado predictivo (predictive scaling) para el Auto Scaling group. Configurar la política para escalar según previsión (forecast). Fijar la métrica de escalado en utilización de CPU. Fijar el valor objetivo de la métrica en 60%. En la política, configurar que las instancias se pre-lancen 30 minutos antes de que corran los jobs.",
          "Crear un evento de Amazon EventBridge que invoque una función Lambda cuando la métrica de utilización de CPU del Auto Scaling group llegue al 60%. Configurar la función Lambda para aumentar la capacidad deseada y máxima del Auto Scaling group en un 20%."
        ],
        correctas: [2],
        explicacion: "El escalado predictivo analiza automáticamente el histórico de carga (sin que la empresa tenga que analizar tendencias manualmente) y pre-lanza instancias con antelación suficiente antes del pico previsto, cumpliendo exactamente el requisito de aprovisionar capacidad 30 minutos antes sin intervención manual continua. El escalado dinámico basado en CPU (A) es reactivo, no anticipa el pico con antelación, el escalado programado (B) exige que los propios ingenieros calculen y mantengan manualmente los valores de capacidad para cada ejecución (la empresa dice no tener recursos para ese análisis), y la solución con EventBridge+Lambda (D) también es reactiva y requiere mantenimiento de código propio."
      },
      {
        pregunta: "Un arquitecto de soluciones diseña la arquitectura de recuperación ante desastres (DR) de una empresa. Tiene una base de datos MySQL corriendo en una instancia EC2 en una subred privada, con backup programado. El diseño de DR debe incluir varias regiones de AWS. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Migrar la base de datos MySQL a varias instancias EC2. Configurar una instancia standby en la región de DR. Activar la replicación.",
          "Migrar la base de datos MySQL a Amazon RDS. Usar un despliegue Multi-AZ. Activar réplicas de lectura para la instancia primaria en distintas zonas de disponibilidad.",
          "Migrar la base de datos MySQL a una base de datos global de Amazon Aurora. Alojar el clúster primario en la región principal. Alojar el clúster secundario en la región de DR.",
          "Guardar el backup programado de la base de datos MySQL en un bucket de S3 configurado con Replicación entre Regiones (CRR). Usar el backup para restaurar la base de datos en la región de DR."
        ],
        correctas: [2],
        explicacion: "Una base de datos global de Aurora replica de forma nativa y gestionada entre regiones con baja latencia, con el clúster secundario ya listo en la región de DR, siendo la opción de menor esfuerzo operativo continuo entre las que realmente cubren varias regiones. Configurar réplicas EC2 manuales (A) exige gestionar la replicación uno mismo, RDS Multi-AZ con réplicas (B) opera dentro de la misma región (no cumple el requisito de multi-región), y restaurar desde backups replicados en S3 (D) tiene un RTO mucho mayor que una base de datos global ya activa."
      },
      {
        pregunta: "Una empresa tiene una aplicación Java que usa Amazon SQS para procesar mensajes, pero no puede procesar mensajes mayores de 256 KB. La empresa quiere que la aplicación pueda procesar mensajes de hasta 50 MB. ¿Qué solución cumple esto con los MENOS cambios de código?",
        opciones: [
          "Usar la Amazon SQS Extended Client Library para Java para alojar en S3 los mensajes mayores de 256 KB.",
          "Usar Amazon EventBridge para publicar los mensajes grandes desde la aplicación en vez de Amazon SQS.",
          "Cambiar el límite de Amazon SQS para manejar mensajes mayores de 256 KB.",
          "Guardar los mensajes mayores de 256 KB en Amazon Elastic File System (Amazon EFS). Configurar Amazon SQS para referenciar esa ubicación en los mensajes."
        ],
        correctas: [0],
        explicacion: "La SQS Extended Client Library para Java está diseñada específicamente para este caso: descarga automáticamente el payload grande a S3 y deja solo una referencia en el mensaje de SQS, integrándose con cambios mínimos de código sobre el cliente SQS existente. SQS tiene un límite fijo de 256 KB que no se puede aumentar (C), EventBridge (B) no es un reemplazo directo de SQS sin reescribir la lógica de colas, y referenciar EFS manualmente desde SQS (D) exigiría implementar esa lógica de referencia a mano en vez de usar la librería ya existente para ese propósito."
      },
      {
        pregunta: "Una empresa quiere restringir el acceso al contenido de una de sus webs principales y protegerlo con técnicas de autorización disponibles en AWS. Quiere una arquitectura serverless y una solución de autenticación para menos de 100 usuarios, que se integre con la web principal y sirva contenido globalmente, escalando conforme crezca la base de usuarios, con la menor latencia de login posible. ¿Qué solución cumple esto de la forma MÁS económica?",
        opciones: [
          "Usar Amazon Cognito para autenticación. Usar Lambda@Edge para autorización. Usar Amazon CloudFront para servir la web globalmente.",
          "Usar AWS Directory Service for Microsoft Active Directory para autenticación. Usar AWS Lambda para autorización. Usar un Application Load Balancer para servir la web globalmente.",
          "Usar Amazon Cognito para autenticación. Usar AWS Lambda para autorización. Usar Amazon S3 Transfer Acceleration para servir la web globalmente.",
          "Usar AWS Directory Service for Microsoft Active Directory para autenticación. Usar Lambda@Edge para autorización. Usar AWS Elastic Beanstalk para servir la web globalmente."
        ],
        correctas: [0],
        explicacion: "Cognito ofrece autenticación totalmente gestionada y económica para pocos usuarios sin infraestructura propia, Lambda@Edge ejecuta la lógica de autorización en el edge más cercano al usuario (mínima latencia de login), y CloudFront distribuye el contenido globalmente, formando la combinación serverless más económica y de menor latencia. AWS Directory Service (B, D) es mucho más costoso y pesado para menos de 100 usuarios, un ALB (B) no distribuye contenido globalmente por diseño, y S3 Transfer Acceleration (C) acelera transferencias a S3, no sirve una web completa con baja latencia de login."
      },
      {
        pregunta: "Una empresa tiene un array NAS envejecido en su centro de datos, que expone recursos compartidos SMB y NFS a estaciones de trabajo cliente. No quiere comprar un nuevo array NAS ni pagar la renovación de su contrato de soporte. Parte de los datos se accede con frecuencia, pero gran parte están inactivos. Un arquitecto de soluciones necesita migrar los datos a S3, usar políticas de ciclo de vida de S3, y mantener el mismo aspecto para las estaciones de trabajo cliente, usando AWS Storage Gateway como parte de la solución. ¿Qué tipo de storage gateway debería aprovisionar?",
        opciones: ["Volume Gateway", "Tape Gateway", "Amazon FSx File Gateway", "Amazon S3 File Gateway"],
        correctas: [3],
        explicacion: "Amazon S3 File Gateway da a las aplicaciones on-premises acceso a almacenamiento en S3 mediante interfaces de archivos NFS y SMB (manteniendo el mismo aspecto para los clientes), moviendo de forma transparente los datos de acceso frecuente a una caché local de baja latencia mientras el resto se guarda en S3, usando políticas de ciclo de vida de S3 para gestionar el coste de los datos fríos con el tiempo. Volume Gateway (A) expone volúmenes de bloque iSCSI, no recursos compartidos de archivos SMB/NFS, Tape Gateway (B) emula cintas de backup, y FSx File Gateway (C) da acceso a sistemas de archivos FSx existentes, no a S3 directamente."
      },
      {
        pregunta: "Una empresa tiene una aplicación corriendo en instancias EC2. Un arquitecto de soluciones ha estandarizado la empresa en una familia de instancias concreta y varios tamaños según las necesidades actuales. La empresa quiere maximizar el ahorro de coste de la aplicación durante los próximos 3 años, pudiendo cambiar la familia y el tamaño de instancia en los próximos 6 meses según la popularidad y el uso de la aplicación. ¿Qué solución cumple esto de la forma MÁS económica?",
        opciones: ["Compute Savings Plan", "EC2 Instance Savings Plan", "Instancias reservadas zonales (Zonal Reserved Instances)", "Instancias reservadas estándar (Standard Reserved Instances)"],
        correctas: [0],
        explicacion: "Un Compute Savings Plan ofrece un ahorro significativo frente a On-Demand a cambio de un compromiso de gasto ($/hora) durante 1 o 3 años, con la flexibilidad de cambiar de familia de instancia, tamaño y zona de disponibilidad sin perder el descuento, encajando exactamente con la necesidad de cambiar de familia/tamaño en 6 meses. El EC2 Instance Savings Plan (B) y las instancias reservadas (C, D) atan el descuento a una familia de instancia concreta (o incluso una zona concreta en el caso zonal), perdiendo flexibilidad si se cambia de familia."
      },
      {
        pregunta: "Una empresa recoge datos de un gran número de participantes que usan dispositivos wearables. Guarda los datos en una tabla de Amazon DynamoDB y usa aplicaciones para analizarlos. La carga de trabajo de datos es constante y predecible. La empresa quiere mantenerse en o por debajo de su presupuesto previsto para DynamoDB. ¿Qué solución cumple esto de la forma MÁS económica?",
        opciones: [
          "Usar modo aprovisionado y DynamoDB Standard-Infrequent Access (DynamoDB Standard-IA). Reservar capacidad para la carga prevista.",
          "Usar modo aprovisionado. Especificar las unidades de capacidad de lectura (RCUs) y escritura (WCUs).",
          "Usar modo on-demand. Fijar las RCUs y WCUs lo bastante altas para acomodar cambios en la carga.",
          "Usar modo on-demand. Especificar las RCUs y WCUs con capacidad reservada."
        ],
        correctas: [1],
        explicacion: "Con una carga de trabajo constante y predecible, el modo aprovisionado (fijando RCUs y WCUs según la demanda conocida) es más económico que el modo on-demand, que cobra por petición y está pensado para cargas impredecibles o con picos. DynamoDB Standard-IA (A) no es una clase de tabla estándar aplicable de esta forma junto con capacidad reservada tradicional del modo aprovisionado, y el modo on-demand (C, D) no encaja de forma óptima con una carga ya conocida y estable, además de que on-demand no usa RCUs/WCUs configurables de la misma manera que el modo aprovisionado."
      },
      {
        pregunta: "Una empresa guarda datos confidenciales en una base de datos Amazon Aurora PostgreSQL en la región ap-southeast-3, cifrada con una clave gestionada por el cliente de AWS KMS. La empresa fue adquirida recientemente y debe compartir de forma segura un backup de la base de datos con la cuenta de AWS de la empresa adquirente, también en ap-southeast-3. ¿Qué debería hacer un arquitecto de soluciones para cumplir esto?",
        opciones: [
          "Crear un snapshot de la base de datos. Copiarlo a un nuevo snapshot sin cifrar. Compartir el nuevo snapshot con la cuenta de AWS de la empresa adquirente.",
          "Crear un snapshot de la base de datos. Añadir la cuenta de AWS de la empresa adquirente a la política de la clave KMS. Compartir el snapshot con la cuenta de AWS de la empresa adquirente.",
          "Crear un snapshot de la base de datos que use una clave KMS gestionada por AWS distinta. Añadir la cuenta de la empresa adquirente al alias de la clave KMS. Compartir el snapshot con la cuenta de AWS de la empresa adquirente.",
          "Crear un snapshot de la base de datos. Descargarlo. Subirlo a un bucket de Amazon S3. Actualizar la política del bucket de S3 para permitir el acceso desde la cuenta de AWS de la empresa adquirente."
        ],
        correctas: [1],
        explicacion: "Compartir un snapshot cifrado con KMS exige conceder permisos tanto sobre el propio snapshot como sobre la clave KMS usada para cifrarlo; añadiendo la cuenta adquirente a la política de la clave KMS y compartiendo el snapshot, esa cuenta puede descifrar y restaurar la base de datos. Descifrar el snapshot (A) elimina la protección de los datos confidenciales durante la transferencia, y las opciones con un alias de clave gestionada por AWS (C) o subida manual a S3 (D) no son el mecanismo correcto ni seguro para compartir snapshots cifrados de RDS/Aurora entre cuentas."
      },
      {
        pregunta: "Una empresa usa una instancia RDS para Microsoft SQL Server Single-AZ de 100 GB en us-east-1 para guardar transacciones de clientes. Necesita alta disponibilidad y recuperación automática para la instancia. También debe correr informes sobre la base de datos varias veces al año; el proceso de informes hace que las transacciones tarden más de lo habitual en reflejarse en las cuentas de los clientes. La empresa necesita una solución que mejore el rendimiento del proceso de informes. ¿Qué combinación de pasos cumple estos requisitos? (Elige dos.)",
        opciones: [
          "Modificar la instancia de base de datos de Single-AZ a un despliegue Multi-AZ.",
          "Tomar un snapshot de la instancia actual. Restaurar el snapshot en un nuevo despliegue RDS en otra zona de disponibilidad.",
          "Crear una réplica de lectura de la instancia en una zona de disponibilidad distinta. Dirigir todas las peticiones de informes a la réplica de lectura.",
          "Migrar la base de datos a RDS Custom.",
          "Usar RDS Proxy para limitar las peticiones de informes a la ventana de mantenimiento."
        ],
        correctas: [0, 2],
        explicacion: "El despliegue Multi-AZ da alta disponibilidad y recuperación automática ante fallo (failover a una réplica standby síncrona en otra zona), cumpliendo el primer requisito; y crear una réplica de lectura dedicada en otra zona para dirigir ahí las peticiones de informes libera a la instancia primaria de esa carga, mejorando el rendimiento del proceso transaccional. Restaurar un snapshot manualmente (B) no ofrece alta disponibilidad continua ni automática, migrar a RDS Custom (D) no resuelve directamente ninguno de los dos requisitos planteados, y RDS Proxy (E) gestiona pools de conexiones, no separa físicamente la carga de informes de la transaccional como una réplica de lectura."
      },
      {
        pregunta: "Una empresa traslada su aplicación de gestión de datos a AWS y quiere transicionar a una arquitectura orientada a eventos, más distribuida y basada en conceptos serverless para las distintas partes del flujo de trabajo, minimizando el esfuerzo operativo. ¿Qué solución cumple esto?",
        opciones: [
          "Construir el flujo de trabajo en AWS Glue. Usar AWS Glue para invocar funciones AWS Lambda que procesen los pasos del flujo.",
          "Construir el flujo de trabajo en AWS Step Functions. Desplegar la aplicación en instancias EC2. Usar Step Functions para invocar los pasos del flujo en las instancias EC2.",
          "Construir el flujo de trabajo en Amazon EventBridge. Usar EventBridge para invocar funciones Lambda según un calendario para procesar los pasos del flujo.",
          "Construir el flujo de trabajo en AWS Step Functions. Usar Step Functions para crear una máquina de estados. Usar la máquina de estados para invocar funciones Lambda que procesen los pasos del flujo."
        ],
        correctas: [3],
        explicacion: "AWS Step Functions es el servicio diseñado para orquestar flujos de trabajo distribuidos mediante máquinas de estados totalmente gestionadas, invocando funciones Lambda serverless para cada paso, sin tener que gestionar ningún servidor ni infraestructura propia. AWS Glue (A) es un servicio ETL, no de orquestación de flujos de eventos genéricos, desplegar en EC2 (B) contradice el objetivo de minimizar operación e ir hacia serverless, y EventBridge basado en calendario (C) no sustituye la orquestación de pasos secuenciales/condicionales que ofrece una máquina de estados de Step Functions."
      },
      {
        pregunta: "Una empresa diseña la red de un videojuego multijugador online. El juego usa el protocolo de red UDP y se desplegará en ocho regiones de AWS. La arquitectura de red debe minimizar la latencia y la pérdida de paquetes para dar a los usuarios finales una experiencia de juego de alta calidad. ¿Qué solución cumple esto?",
        opciones: [
          "Configurar un transit gateway en cada región. Crear adjuntos de peering entre regiones entre cada transit gateway.",
          "Configurar AWS Global Accelerator con listeners UDP y grupos de endpoints en cada región.",
          "Configurar Amazon CloudFront con UDP activado. Configurar un origen en cada región.",
          "Configurar una malla de VPC peering entre cada región. Activar UDP para cada VPC."
        ],
        correctas: [1],
        explicacion: "AWS Global Accelerator soporta listeners UDP y usa la red troncal global de AWS con IPs anycast estáticas para enrutar el tráfico de cada jugador al endpoint regional más óptimo, minimizando tanto la latencia como la pérdida de paquetes, exactamente el caso de uso para el que fue diseñado (juegos online). Un Transit Gateway con peering entre regiones (A) o una malla de VPC peering (D) enrutan tráfico entre VPCs pero no optimizan la ruta desde el usuario final hacia el endpoint más cercano como Global Accelerator, y CloudFront (C) es una CDN pensada para contenido HTTP(S) cacheable, no soporta UDP para tráfico de juego en tiempo real."
      }
    ]
  },
  {
    id: "examen-08",
    titulo: "Examen de práctica 8",
    resumen: "50 preguntas (353-402 del banco de dumps) sobre bases de datos gestionadas, mensajería ordenada, cifrado, seguridad de red y arquitecturas de alta disponibilidad.",
    preguntas: [
      {
        pregunta: "Una empresa aloja una aplicación web de tres capas en instancias EC2 en una única zona de disponibilidad. La aplicación usa una base de datos MySQL autogestionada en una instancia EC2, guardando los datos en un volumen EBS Provisioned IOPS SSD (io2) de 1 TB. Se espera un tráfico de 1.000 IOPS tanto de lectura como de escritura en el pico. La empresa quiere minimizar interrupciones, estabilizar el rendimiento y reducir costes, manteniendo capacidad para el doble de IOPS, y mover la capa de base de datos a una solución totalmente gestionada, altamente disponible y tolerante a fallos. ¿Qué solución cumple esto de la forma MÁS económica?",
        opciones: [
          "Usar un despliegue Multi-AZ de una instancia RDS para MySQL con un volumen EBS io2 Block Express.",
          "Usar un despliegue Multi-AZ de una instancia RDS para MySQL con un volumen EBS de propósito general SSD (gp2).",
          "Usar los niveles de acceso de Amazon S3 Intelligent-Tiering.",
          "Usar dos instancias EC2 grandes para alojar la base de datos en modo activo-pasivo."
        ],
        correctas: [1],
        explicacion: "Un despliegue RDS Multi-AZ para MySQL con un volumen gp2 de tamaño suficiente puede alcanzar y superar las 3.000 IOPS base (el doble de los 1.000 IOPS pico requeridos) de forma mucho más económica que un volumen io2 Block Express (pensado para cargas de rendimiento extremo, mucho más caro de lo necesario aquí), cumpliendo el requisito de alta disponibilidad totalmente gestionada al menor coste. S3 Intelligent-Tiering (C) es almacenamiento de objetos, no una base de datos relacional, y mantener dos instancias EC2 propias (D) no es una solución totalmente gestionada."
      },
      {
        pregunta: "Una empresa aloja una aplicación serverless en AWS que usa Amazon API Gateway, AWS Lambda y una base de datos Amazon RDS para PostgreSQL. Nota un aumento de errores de aplicación por timeouts de conexión a la base de datos durante picos de tráfico o tráfico impredecible. Necesita una solución que reduzca los fallos con el menor cambio posible en el código. ¿Qué debería hacer un arquitecto de soluciones?",
        opciones: [
          "Reducir la tasa de concurrencia de Lambda.",
          "Activar RDS Proxy en la instancia de base de datos RDS.",
          "Redimensionar la clase de instancia de RDS para aceptar más conexiones.",
          "Migrar la base de datos a Amazon DynamoDB con escalado on-demand."
        ],
        correctas: [1],
        explicacion: "RDS Proxy es un proxy de base de datos totalmente gestionado y de alta disponibilidad, diseñado específicamente para aplicaciones serverless y con tráfico impredecible: agrupa y reutiliza las conexiones de forma eficiente, reduciendo los timeouts, sin necesidad de modificar el código de la aplicación. Reducir la concurrencia de Lambda (A) limitaría el rendimiento general, redimensionar la instancia RDS (C) no resuelve el problema de gestión de conexiones de forma escalable, y migrar a DynamoDB (D) exige reescribir toda la capa de datos."
      },
      {
        pregunta: "Una empresa migra una aplicación antigua a AWS. La aplicación ejecuta un job por lotes cada hora, intensivo en CPU, que tarda de media 15 minutos en un servidor on-premises con 64 vCPU y 512 GiB de memoria. ¿Qué solución ejecutará el job por lotes en 15 minutos con el MENOR esfuerzo operativo?",
        opciones: [
          "Usar AWS Lambda con escalado funcional.",
          "Usar Amazon Elastic Container Service (Amazon ECS) con AWS Fargate.",
          "Usar Amazon Lightsail con AWS Auto Scaling.",
          "Usar AWS Batch sobre Amazon EC2."
        ],
        correctas: [3],
        explicacion: "AWS Batch aprovisiona dinámicamente el tipo y la cantidad óptima de instancias EC2 según los requisitos de recursos del job (incluyendo instancias con muchas vCPU, algo que Lambda no puede igualar por sus límites de cómputo), gestionando la infraestructura subyacente con el mínimo esfuerzo operativo. Lambda (A) tiene límites de tiempo de ejecución y de CPU insuficientes para esta carga tan intensiva, Fargate (B) no permite el mismo control granular sobre tipos de instancia de alto rendimiento, y Lightsail (C) no está pensado para cargas de cómputo por lotes de este calibre."
      },
      {
        pregunta: "Una empresa guarda sus objetos de datos en Amazon S3 Standard. Un arquitecto de soluciones ha descubierto que el 75% de los datos se accede raramente tras 30 días. La empresa necesita que todos los datos sigan siendo inmediatamente accesibles con la misma alta disponibilidad y resiliencia, pero quiere minimizar el coste de almacenamiento. ¿Qué solución de almacenamiento cumple esto?",
        opciones: [
          "Mover los objetos de datos a S3 Glacier Deep Archive tras 30 días.",
          "Mover los objetos de datos a S3 Standard-Infrequent Access (S3 Standard-IA) tras 30 días.",
          "Mover los objetos de datos a S3 One Zone-Infrequent Access (S3 One Zone-IA) tras 30 días.",
          "Mover los objetos de datos a S3 One Zone-Infrequent Access (S3 One Zone-IA) de inmediato."
        ],
        correctas: [1],
        explicacion: "S3 Standard-IA mantiene la misma alta disponibilidad y resiliencia (múltiples zonas de disponibilidad) que S3 Standard, con acceso de baja latencia inmediato, pero a un coste de almacenamiento menor, ideal para datos que siguen necesitando disponibilidad inmediata aunque se accedan con menos frecuencia. Glacier Deep Archive (A) no ofrece acceso inmediato (requiere horas de restauración), y las opciones One Zone-IA (C, D) sacrifican la resiliencia multi-zona que el enunciado exige mantener."
      },
      {
        pregunta: "Una empresa de videojuegos traslada su marcador público de un centro de datos a AWS. Usa instancias EC2 Windows Server detrás de un ALB para alojar su aplicación dinámica, y necesita una solución de almacenamiento altamente disponible. La aplicación consiste en archivos estáticos y código dinámico del lado del servidor. ¿Qué combinación de pasos debería tomar un arquitecto de soluciones? (Elige dos.)",
        opciones: [
          "Guardar los archivos estáticos en Amazon S3. Usar Amazon CloudFront para cachear los objetos en el edge.",
          "Guardar los archivos estáticos en Amazon S3. Usar Amazon ElastiCache para cachear los objetos en el edge.",
          "Guardar el código del lado del servidor en Amazon Elastic File System (Amazon EFS). Montar el volumen EFS en cada instancia EC2 para compartir los archivos.",
          "Guardar el código del lado del servidor en Amazon FSx for Windows File Server. Montar el volumen de FSx for Windows File Server en cada instancia EC2 para compartir los archivos.",
          "Guardar el código del lado del servidor en un volumen EBS de propósito general SSD (gp2). Montar el volumen EBS en cada instancia EC2 para compartir los archivos."
        ],
        correctas: [0, 3],
        explicacion: "S3 junto con CloudFront es la combinación estándar para servir archivos estáticos de forma altamente disponible y con baja latencia global; y como las instancias son Windows Server, FSx for Windows File Server es el sistema de archivos compartido nativo compatible con SMB para el código del lado del servidor, accesible desde todas las instancias EC2 Windows. ElastiCache (B) no es un servicio de cacheo de contenido estático en el edge como CloudFront, EFS (C) usa el protocolo NFS y no es compatible de forma nativa con instancias Windows Server, y un volumen EBS (E) solo se puede montar en una instancia a la vez, no compartirse entre varias."
      },
      {
        pregunta: "Una empresa de redes sociales corre su aplicación en instancias EC2 detrás de un ALB, que es el origen de una distribución de CloudFront. La aplicación tiene más de mil millones de imágenes guardadas en un bucket de S3 y procesa miles de imágenes por segundo. La empresa quiere redimensionar las imágenes dinámicamente y servir el formato adecuado a cada cliente. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Instalar una librería externa de gestión de imágenes en una instancia EC2. Usar la librería para procesar las imágenes.",
          "Crear una política de origin request de CloudFront. Usar la política para redimensionar automáticamente las imágenes y servir el formato adecuado según la cabecera HTTP User-Agent de la petición.",
          "Usar una función Lambda@Edge con una librería externa de gestión de imágenes. Asociar la función Lambda@Edge a los comportamientos de CloudFront que sirven las imágenes.",
          "Crear una política de response headers de CloudFront. Usar la política para redimensionar automáticamente las imágenes y servir el formato adecuado según la cabecera HTTP User-Agent de la petición."
        ],
        correctas: [2],
        explicacion: "Lambda@Edge permite ejecutar código de procesamiento de imágenes (usando una librería externa) directamente en las ubicaciones edge de CloudFront, sin aprovisionar ni gestionar ningún servidor, asociándose directamente a los comportamientos de caché que sirven las imágenes. Una instancia EC2 propia (A) exige gestionar infraestructura, y las políticas de origin request o de response headers de CloudFront (B, D) solo modifican cabeceras HTTP, no pueden ejecutar lógica de procesamiento de imágenes como el redimensionado."
      },
      {
        pregunta: "Un hospital necesita guardar historiales de pacientes en un bucket de S3. El equipo de cumplimiento debe garantizar que toda la información de salud protegida (PHI) esté cifrada en tránsito y en reposo, y debe administrar ellos mismos la clave de cifrado de los datos en reposo. ¿Qué solución cumple esto?",
        opciones: [
          "Crear un certificado SSL/TLS público en AWS Certificate Manager (ACM). Asociar el certificado a Amazon S3. Configurar el cifrado por defecto de cada bucket de S3 con cifrado del lado del servidor con claves de AWS KMS (SSE-KMS). Asignar al equipo de cumplimiento la gestión de las claves KMS.",
          "Usar la condición aws:SecureTransport en las políticas de bucket de S3 para permitir solo conexiones cifradas por HTTPS (TLS). Configurar el cifrado por defecto de cada bucket con cifrado del lado del servidor con claves gestionadas por S3 (SSE-S3). Asignar al equipo de cumplimiento la gestión de las claves SSE-S3.",
          "Usar la condición aws:SecureTransport en las políticas de bucket de S3 para permitir solo conexiones cifradas por HTTPS (TLS). Configurar el cifrado por defecto de cada bucket con cifrado del lado del servidor con claves de AWS KMS (SSE-KMS). Asignar al equipo de cumplimiento la gestión de las claves KMS.",
          "Usar la condición aws:SecureTransport en las políticas de bucket de S3 para permitir solo conexiones cifradas por HTTPS (TLS). Usar Amazon Macie para proteger los datos sensibles guardados en S3. Asignar al equipo de cumplimiento la gestión de Macie."
        ],
        correctas: [2],
        explicacion: "La condición aws:SecureTransport en la política del bucket obliga a que todas las conexiones usen HTTPS (cifrado en tránsito), y SSE-KMS con una clave gestionada por el cliente permite que el equipo de cumplimiento administre directamente esa clave de cifrado en reposo (algo que SSE-S3, con claves gestionadas por AWS, no permite). SSE-S3 (B) no da control de la clave al equipo de cumplimiento, un certificado ACM en S3 (A) no es el mecanismo real de cifrado en reposo, y Macie (D) descubre datos sensibles pero no es un mecanismo de gestión de claves de cifrado."
      },
      {
        pregunta: "Una empresa usa Amazon API Gateway para correr un gateway privado con dos APIs REST en la misma VPC. El servicio BuyStock llama al servicio CheckFunds para comprobar fondos disponibles antes de comprar una acción. La empresa nota en los VPC Flow Logs que BuyStock llama a CheckFunds por internet en vez de por la VPC. Un arquitecto de soluciones debe implementar una solución para que las APIs se comuniquen a través de la VPC. ¿Qué solución cumple esto con los MENOS cambios de código?",
        opciones: [
          "Añadir una cabecera X-API-Key en la cabecera HTTP para autorización.",
          "Usar un endpoint de interfaz (interface endpoint).",
          "Usar un endpoint de gateway (gateway endpoint).",
          "Añadir una cola de Amazon SQS entre las dos APIs REST."
        ],
        correctas: [1],
        explicacion: "Un endpoint de interfaz (VPC endpoint de tipo interface) para API Gateway permite conectividad privada dentro de la VPC hacia las APIs, garantizando que la comunicación entre BuyStock y CheckFunds se mantenga dentro de la VPC sin cambiar apenas código (solo la resolución de red). Un endpoint de gateway (C) solo está disponible para S3 y DynamoDB, no para API Gateway, una cabecera X-API-Key (A) no cambia la ruta de red del tráfico, y añadir una cola SQS (D) exigiría reescribir la comunicación síncrona entre servicios como un flujo asíncrono."
      },
      {
        pregunta: "Una empresa aloja una aplicación de videojuegos multijugador en AWS. Quiere que la aplicación lea datos con latencia por debajo del milisegundo y ejecute consultas puntuales sobre datos históricos. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Usar Amazon RDS para los datos de acceso frecuente. Ejecutar un script personalizado periódico para exportar los datos a un bucket de S3.",
          "Guardar los datos directamente en un bucket de S3. Implementar una política de ciclo de vida de S3 para mover los datos antiguos a S3 Glacier Deep Archive para almacenamiento a largo plazo. Ejecutar consultas puntuales sobre los datos en S3 usando Amazon Athena.",
          "Usar Amazon DynamoDB con DynamoDB Accelerator (DAX) para los datos de acceso frecuente. Exportar los datos a un bucket de S3 usando la exportación de tablas de DynamoDB. Ejecutar consultas puntuales sobre los datos en S3 usando Amazon Athena.",
          "Usar Amazon DynamoDB para los datos de acceso frecuente. Activar streaming hacia Amazon Kinesis Data Streams. Usar Kinesis Data Firehose para leer los datos de Kinesis Data Streams. Guardar los registros en un bucket de S3."
        ],
        correctas: [2],
        explicacion: "DynamoDB con DAX ofrece latencia de lectura por debajo del milisegundo para los datos de acceso frecuente, y la exportación nativa de tablas de DynamoDB a S3 (sin necesidad de scripts propios) permite ejecutar consultas puntuales con Athena sobre los datos históricos, todo con servicios totalmente gestionados. RDS (A) no ofrece latencia sub-milisegundo nativa como DAX, y exigiría un script propio para exportar, guardar los datos directamente en S3 (B) no da latencia sub-milisegundo para el acceso frecuente, y el streaming continuo vía Kinesis (D) añade más infraestructura de la necesaria para consultas puntuales ocasionales."
      },
      {
        pregunta: "Una empresa usa un sistema de procesamiento de pagos que exige que los mensajes de un mismo ID de pago se reciban en el mismo orden en que se enviaron; si no, los pagos podrían procesarse incorrectamente. ¿Qué acciones debería tomar un arquitecto de soluciones para cumplir esto? (Elige dos.)",
        opciones: [
          "Escribir los mensajes en una tabla de Amazon DynamoDB usando el ID de pago como clave de partición.",
          "Escribir los mensajes en un data stream de Amazon Kinesis usando el ID de pago como clave de partición.",
          "Escribir los mensajes en un clúster de Amazon ElastiCache para Memcached usando el ID de pago como clave.",
          "Escribir los mensajes en una cola de Amazon SQS. Fijar el atributo del mensaje para usar el ID de pago.",
          "Escribir los mensajes en una cola FIFO de Amazon SQS. Fijar el grupo de mensajes para usar el ID de pago."
        ],
        correctas: [1, 4],
        explicacion: "Usar el ID de pago como clave de partición en Kinesis Data Streams garantiza que todos los mensajes de ese ID vayan al mismo shard y se procesen en el orden en que se escribieron, y una cola SQS FIFO con el ID de pago como grupo de mensajes garantiza el orden estricto dentro de ese grupo. DynamoDB (A) no es un mecanismo de mensajería con garantía de orden de procesamiento, ElastiCache for Memcached (C) no tiene noción de orden de mensajes en absoluto, y una cola SQS estándar con atributos de mensaje (D) no garantiza el orden (para eso se necesita específicamente una cola FIFO)."
      },
      {
        pregunta: "Una empresa construye un sistema de videojuegos que necesita enviar eventos únicos de forma concurrente a servicios separados de marcador, emparejamiento y autenticación. Necesita un sistema orientado a eventos en AWS que garantice el orden de los eventos. ¿Qué solución cumple esto?",
        opciones: [
          "Un bus de eventos de Amazon EventBridge",
          "Topics FIFO de Amazon Simple Notification Service (Amazon SNS)",
          "Topics estándar de Amazon Simple Notification Service (Amazon SNS)",
          "Colas FIFO de Amazon Simple Queue Service (Amazon SQS)"
        ],
        correctas: [1],
        explicacion: "Los topics FIFO de SNS pueden enviar los mismos eventos de forma concurrente a varios suscriptores (patrón fan-out) mientras garantizan el orden de entrega, cumpliendo exactamente el requisito de enviar eventos únicos a la vez a varios servicios manteniendo el orden. Las colas SQS FIFO (D) no distribuyen de forma nativa a varios consumidores distintos simultáneamente como SNS (cada mensaje lo consume normalmente un solo consumidor por cola), los topics SNS estándar (C) no garantizan el orden, y un bus de EventBridge (A) no garantiza el orden estricto de entrega como sí lo hace SNS FIFO."
      },
      {
        pregunta: "Un hospital diseña una nueva aplicación que recoge síntomas de pacientes, usando Amazon SQS y Amazon SNS en la arquitectura. Un arquitecto de soluciones revisa el diseño: los datos deben cifrarse en reposo y en tránsito, y solo el personal autorizado del hospital debe poder acceder a ellos. ¿Qué combinación de pasos cumple esto? (Elige dos.)",
        opciones: [
          "Activar cifrado del lado del servidor en los componentes de SQS. Actualizar la política de clave por defecto para restringir su uso a un conjunto de principales autorizados.",
          "Activar cifrado del lado del servidor en los componentes de SNS usando una clave gestionada por el cliente de AWS KMS. Aplicar una política de clave que restrinja su uso a un conjunto de principales autorizados.",
          "Activar cifrado en los componentes de SNS. Actualizar la política de clave por defecto para restringir su uso a un conjunto de principales autorizados. Fijar una condición en la política del topic para permitir solo conexiones cifradas por TLS.",
          "Activar cifrado del lado del servidor en los componentes de SQS usando una clave gestionada por el cliente de AWS KMS. Aplicar una política de clave que restrinja su uso a un conjunto de principales autorizados. Fijar una condición en la política de la cola para permitir solo conexiones cifradas por TLS.",
          "Activar cifrado del lado del servidor en los componentes de SQS usando una clave gestionada por el cliente de AWS KMS. Aplicar una política de IAM que restrinja su uso a un conjunto de principales autorizados. Fijar una condición en la política de la cola para permitir solo conexiones cifradas por TLS."
        ],
        correctas: [1, 3],
        explicacion: "Usar una clave gestionada por el cliente de KMS (en vez de la clave por defecto de AWS) tanto para SNS como para SQS permite aplicar una política de clave que restrinja explícitamente su uso al personal autorizado del hospital, y en el caso de SQS, añadir además la condición de solo TLS en la política de la cola cubre el cifrado en tránsito. Las opciones con la clave por defecto (A, C) no dan el mismo control granular de acceso que una clave gestionada por el cliente con política personalizada, y restringir el uso de la clave KMS mediante una política de IAM en vez de la política de la propia clave (E) no es el mecanismo estándar recomendado para este control."
      },
      {
        pregunta: "Una empresa corre una web respaldada por Amazon RDS. Un nuevo administrador de bases de datos causó pérdida de datos al editar accidentalmente información de una tabla. Para recuperarse de este tipo de incidente, la empresa quiere poder restaurar la base de datos a su estado de 5 minutos antes de cualquier cambio, dentro de los últimos 30 días. ¿Qué función debería incluir el arquitecto de soluciones en el diseño para cumplir esto?",
        opciones: ["Réplicas de lectura", "Snapshots manuales", "Copias de seguridad automatizadas (automated backups)", "Despliegues Multi-AZ"],
        correctas: [2],
        explicacion: "Las copias de seguridad automatizadas de RDS permiten la recuperación a un punto en el tiempo (point-in-time recovery) con granularidad de segundos, dentro del periodo de retención configurado (hasta 35 días), cumpliendo exactamente el requisito de restaurar a 5 minutos antes de cualquier cambio dentro de los últimos 30 días. Las réplicas de lectura (A) no ofrecen recuperación a un punto en el tiempo arbitrario, los snapshots manuales (B) solo capturan el estado en momentos puntuales que el administrador decida tomar (no continuo), y Multi-AZ (D) da alta disponibilidad, no recuperación histórica ante errores de datos."
      },
      {
        pregunta: "La web de una empresa consiste en una API de Amazon API Gateway delante de una función AWS Lambda y una base de datos Amazon DynamoDB. La función Lambda gestiona la lógica de negocio, y la tabla DynamoDB aloja los datos. La aplicación usa user pools de Amazon Cognito para identificar a los usuarios individuales. Un arquitecto de soluciones necesita actualizar la aplicación para que solo los usuarios con una suscripción activa puedan acceder al contenido premium. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Activar el cacheo y el throttling de la API en API Gateway.",
          "Configurar AWS WAF en la API de API Gateway. Crear una regla que filtre a los usuarios con suscripción.",
          "Aplicar permisos de IAM de grano fino sobre el contenido premium en la tabla DynamoDB.",
          "Implementar planes de uso (usage plans) y claves de API de API Gateway para limitar el acceso de los usuarios sin suscripción."
        ],
        correctas: [3],
        explicacion: "Los planes de uso y claves de API de API Gateway son un mecanismo nativo diseñado precisamente para dar (o no dar) acceso a distintos niveles de la API según la clave asignada a cada usuario, de forma que a los usuarios con suscripción se les emite una clave con acceso al plan premium y al resto no, sin apenas cambios de código ni infraestructura adicional. AWS WAF (B) no tiene forma nativa de conocer el estado de suscripción de un usuario para filtrar peticiones, los permisos de IAM de grano fino sobre DynamoDB (C) exigirían reconfigurar todo el flujo de autenticación hacia IAM/Cognito identity pools (mucho más esfuerzo), y el cacheo/throttling (A) no distingue entre usuarios con o sin suscripción."
      },
      {
        pregunta: "Una empresa usa enrutamiento basado en latencia de Amazon Route 53 para dirigir peticiones a su aplicación basada en UDP para usuarios de todo el mundo. La aplicación está alojada en servidores redundantes en centros de datos on-premises de la empresa en Estados Unidos, Asia y Europa. Los requisitos de cumplimiento exigen que la aplicación siga alojada on-premises. La empresa quiere mejorar el rendimiento y la disponibilidad de la aplicación. ¿Qué debería hacer un arquitecto de soluciones?",
        opciones: [
          "Configurar tres Network Load Balancers (NLBs) en las tres regiones de AWS que apunten a los endpoints on-premises. Crear un accelerator con AWS Global Accelerator, y registrar los NLBs como sus endpoints. Dar acceso a la aplicación con un CNAME que apunte al DNS del accelerator.",
          "Configurar tres Application Load Balancers (ALBs) en las tres regiones de AWS que apunten a los endpoints on-premises. Crear un accelerator con AWS Global Accelerator, y registrar los ALBs como sus endpoints. Dar acceso a la aplicación con un CNAME que apunte al DNS del accelerator.",
          "Configurar tres NLBs en las tres regiones de AWS que apunten a los endpoints on-premises. En Route 53, crear un registro de enrutamiento basado en latencia que apunte a los tres NLBs, y usarlo como origen de una distribución de CloudFront. Dar acceso a la aplicación con un CNAME que apunte al DNS de CloudFront.",
          "Configurar tres ALBs en las tres regiones de AWS que apunten a los endpoints on-premises. En Route 53, crear un registro de enrutamiento basado en latencia que apunte a los tres ALBs, y usarlo como origen de una distribución de CloudFront. Dar acceso a la aplicación con un CNAME que apunte al DNS de CloudFront."
        ],
        correctas: [0],
        explicacion: "Los NLBs (no los ALBs, que operan en capa 7 HTTP/HTTPS) son necesarios porque la aplicación usa UDP, y Global Accelerator (que sí soporta UDP mediante sus listeners) enruta el tráfico a través de la red troncal global de AWS hacia el endpoint más óptimo, mejorando rendimiento y disponibilidad sin mover la aplicación de on-premises (cumpliendo el requisito de cumplimiento). Los ALBs (B, D) no soportan UDP, y CloudFront (C, D) es una CDN para contenido HTTP(S) cacheable, no soporta tráfico UDP en tiempo real."
      },
      {
        pregunta: "Un arquitecto de soluciones quiere que todos los usuarios nuevos tengan requisitos de complejidad específicos y periodos de rotación obligatorios para las contraseñas de usuario de IAM. ¿Qué debería hacer para conseguirlo?",
        opciones: [
          "Fijar una política de contraseñas general para toda la cuenta de AWS.",
          "Fijar una política de contraseñas para cada usuario de IAM individualmente.",
          "Usar software de terceros para fijar los requisitos de contraseña.",
          "Adjuntar una regla de Amazon CloudWatch al evento Create_newuser para fijar la contraseña con los requisitos adecuados."
        ],
        correctas: [0],
        explicacion: "IAM permite configurar una única política de contraseñas a nivel de cuenta de AWS que se aplica automáticamente a todos los usuarios de IAM (nuevos y existentes), centralizando los requisitos de complejidad y rotación sin tener que configurar nada por usuario. Configurar una política por cada usuario individualmente (B) es mucho más esfuerzo operativo e innecesario existiendo la política a nivel de cuenta, software de terceros (C) añade complejidad innecesaria, y una regla de CloudWatch sobre un evento de creación de usuario (D) no es el mecanismo nativo de IAM para esto."
      },
      {
        pregunta: "Una empresa ha migrado una aplicación a instancias EC2 Linux. Una de estas instancias corre varias tareas de 1 hora según una programación. Estas tareas fueron escritas por equipos distintos y no comparten lenguaje de programación común. La empresa está preocupada por el rendimiento y la escalabilidad mientras estas tareas corren en una única instancia. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Usar AWS Batch para ejecutar las tareas como jobs. Programar los jobs usando Amazon EventBridge (Amazon CloudWatch Events).",
          "Convertir la instancia EC2 en un contenedor. Usar AWS App Runner para crear el contenedor bajo demanda y ejecutar las tareas como jobs.",
          "Copiar las tareas a funciones AWS Lambda. Programar las funciones Lambda usando Amazon EventBridge (Amazon CloudWatch Events).",
          "Crear una Amazon Machine Image (AMI) de la instancia EC2 que ejecuta las tareas. Crear un Auto Scaling group con la AMI para ejecutar varias copias de la instancia."
        ],
        correctas: [0],
        explicacion: "AWS Batch gestiona de forma totalmente administrada el aprovisionamiento dinámico de recursos de cómputo según los requisitos de cada job, permitiendo ejecutar tareas escritas en cualquier lenguaje (empaquetadas como contenedores) sin reescribir el código de cada equipo, con el mínimo esfuerzo operativo. Reescribir las tareas como funciones Lambda (C) exigiría adaptar cada tarea a un runtime de Lambda concreto (más esfuerzo dado que no comparten lenguaje), App Runner (B) está pensado para servicios web continuos, no para jobs por lotes programados, y duplicar la instancia con un Auto Scaling group (D) no resuelve la ejecución coordinada de tareas distintas como jobs individuales."
      },
      {
        pregunta: "Una empresa corre una aplicación web pública de tres capas en una VPC, sobre instancias EC2 en varias zonas de disponibilidad. Las instancias EC2 en subredes privadas necesitan comunicarse con un servidor de licencias por internet. La empresa necesita una solución gestionada que minimice el mantenimiento operativo. ¿Qué solución cumple esto?",
        opciones: [
          "Aprovisionar una instancia NAT en una subred pública. Modificar la tabla de rutas de cada subred privada con una ruta por defecto hacia la instancia NAT.",
          "Aprovisionar una instancia NAT en una subred privada. Modificar la tabla de rutas de cada subred privada con una ruta por defecto hacia la instancia NAT.",
          "Aprovisionar un NAT Gateway en una subred pública. Modificar la tabla de rutas de cada subred privada con una ruta por defecto hacia el NAT Gateway.",
          "Aprovisionar un NAT Gateway en una subred privada. Modificar la tabla de rutas de cada subred privada con una ruta por defecto hacia el NAT Gateway."
        ],
        correctas: [2],
        explicacion: "Un NAT Gateway es un servicio totalmente gestionado por AWS (alta disponibilidad y mantenimiento mínimo), y debe colocarse en una subred pública para tener acceso propio a internet vía el Internet Gateway, dando salida a las subredes privadas que lo apunten como ruta por defecto. Una instancia NAT (A, B) exige que el propio cliente la gestione, parchee y escale manualmente, y un NAT Gateway en una subred privada (D) no tendría forma de salir a internet él mismo."
      },
      {
        pregunta: "Una empresa necesita crear un clúster de Amazon Elastic Kubernetes Service (Amazon EKS) para alojar una aplicación de streaming de medios digitales. El clúster EKS usará un grupo de nodos gestionado respaldado por volúmenes EBS para almacenamiento. La empresa debe cifrar todos los datos en reposo usando una clave gestionada por el cliente guardada en AWS KMS. ¿Qué combinación de acciones cumple esto con el MENOR esfuerzo operativo? (Elige dos.)",
        opciones: [
          "Usar un plugin de Kubernetes que use la clave gestionada por el cliente para cifrar los datos.",
          "Tras crear el clúster EKS, localizar los volúmenes EBS. Activar el cifrado usando la clave gestionada por el cliente.",
          "Activar el cifrado de EBS por defecto en la región de AWS donde se creará el clúster EKS. Seleccionar la clave gestionada por el cliente como clave por defecto.",
          "Crear el clúster EKS. Crear un rol de IAM con una política que conceda permiso sobre la clave gestionada por el cliente. Asociar el rol al clúster EKS.",
          "Guardar la clave gestionada por el cliente como un secret de Kubernetes en el clúster EKS. Usar la clave gestionada por el cliente para cifrar los volúmenes EBS."
        ],
        correctas: [2, 3],
        explicacion: "El cifrado de EBS por defecto es una configuración regional que, una vez activada con la clave gestionada por el cliente elegida como clave por defecto, cifra automáticamente todos los volúmenes EBS nuevos creados en esa región (incluidos los del clúster EKS) sin ninguna acción adicional; y un rol de IAM con permisos sobre esa clave KMS, asociado al clúster, permite que EKS use la clave para las operaciones de cifrado/descifrado necesarias. Localizar y cifrar volúmenes manualmente tras crear el clúster (B) exige intervención manual continua, y usar un plugin de Kubernetes propio (A) o guardar la clave como secret de Kubernetes (E) son enfoques mucho más complejos e inseguros que la integración nativa de EBS con KMS."
      },
      {
        pregunta: "Una empresa quiere migrar una base de datos Oracle a AWS. La base de datos consiste en una única tabla con millones de imágenes de sistemas de información geográfica (GIS) de alta resolución, identificadas por un código geográfico. Cuando ocurre un desastre natural, decenas de miles de imágenes se actualizan cada pocos minutos. Cada código geográfico tiene una sola imagen o fila asociada. La empresa quiere una solución altamente disponible y escalable durante esos eventos. ¿Qué solución cumple esto de la forma MÁS económica?",
        opciones: [
          "Guardar las imágenes y los códigos geográficos en una tabla de base de datos. Usar Oracle corriendo en una instancia RDS Multi-AZ.",
          "Guardar las imágenes en buckets de S3. Usar Amazon DynamoDB con el código geográfico como clave y la URL S3 de la imagen como valor.",
          "Guardar las imágenes y los códigos geográficos en una tabla de Amazon DynamoDB. Configurar DynamoDB Accelerator (DAX) durante los periodos de alta carga.",
          "Guardar las imágenes en buckets de S3. Guardar los códigos geográficos y las URLs S3 de las imágenes en una tabla de base de datos. Usar Oracle corriendo en una instancia RDS Multi-AZ."
        ],
        correctas: [1],
        explicacion: "Guardar las imágenes pesadas en S3 (barato, escalable y duradero) y usar DynamoDB (clave-valor simple, código geográfico → URL de S3) para el metadato de acceso masivo y concurrente durante desastres es mucho más económico y escalable que mantener toda la carga sobre una base de datos relacional Oracle en RDS, que no escala de forma tan elástica ante decenas de miles de actualizaciones simultáneas. Mantener Oracle en RDS (A, D) no escala igual de bien ante ese patrón de escritura masiva concurrente, y aunque DynamoDB con las imágenes también en DynamoDB (C) sería técnicamente posible, no es tan económico como usar S3 para el almacenamiento pesado de las imágenes."
      },
      {
        pregunta: "Una empresa tiene una aplicación que recoge datos de sensores IoT en automóviles. Los datos se transmiten y guardan en S3 a través de Kinesis Data Firehose, produciendo billones de objetos S3 al año. Cada mañana, la empresa usa los datos de los últimos 30 días para reentrenar modelos de machine learning. Cuatro veces al año, usa los datos de los últimos 12 meses para análisis y entrenar otros modelos. Los datos deben estar disponibles con retraso mínimo durante hasta 1 año; después deben retenerse con fines de archivo. ¿Qué solución de almacenamiento cumple esto de la forma MÁS económica?",
        opciones: [
          "Usar la clase de almacenamiento S3 Intelligent-Tiering. Crear una política de ciclo de vida de S3 que transicione los objetos a S3 Glacier Deep Archive tras 1 año.",
          "Usar la clase de almacenamiento S3 Intelligent-Tiering. Configurar S3 Intelligent-Tiering para mover automáticamente los objetos a S3 Glacier Deep Archive tras 1 año.",
          "Usar la clase de almacenamiento S3 Standard-Infrequent Access (S3 Standard-IA). Crear una política de ciclo de vida de S3 que transicione los objetos a S3 Glacier Deep Archive tras 1 año.",
          "Usar la clase de almacenamiento S3 Standard. Crear una política de ciclo de vida de S3 que transicione los objetos a S3 Standard-Infrequent Access (S3 Standard-IA) tras 30 días, y después a S3 Glacier Deep Archive tras 1 año."
        ],
        correctas: [3],
        explicacion: "El patrón de acceso descrito es predecible por fases (frecuente los primeros 30 días para el reentrenamiento diario, después menos frecuente hasta el año para los análisis trimestrales, y archivo después del año), así que una política de ciclo de vida explícita con S3 Standard → Standard-IA a los 30 días → Glacier Deep Archive al año optimiza el coste en cada fase sin pagar de más por Intelligent-Tiering (pensado para patrones desconocidos/inconsistentes, no para este caso ya predecible). S3 Standard-IA desde el inicio (C) no ofrece el rendimiento óptimo de S3 Standard que conviene tener durante los primeros 30 días de acceso diario intensivo."
      },
      {
        pregunta: "Una empresa corre varias aplicaciones de negocio en tres VPCs separadas dentro de la región us-east-1. Las aplicaciones deben poder comunicarse entre VPCs, y también enviar de forma consistente cientos de gigabytes de datos al día a una aplicación sensible a la latencia que corre en un único centro de datos on-premises. Un arquitecto de soluciones necesita diseñar una solución de conectividad de red que maximice la relación coste-eficiencia. ¿Qué solución cumple esto?",
        opciones: [
          "Configurar tres conexiones AWS Site-to-Site VPN desde el centro de datos a AWS. Establecer conectividad configurando una conexión VPN por cada VPC.",
          "Lanzar un appliance de red virtual de terceros en cada VPC. Establecer un túnel VPN IPsec entre el centro de datos y cada appliance virtual.",
          "Montar tres conexiones AWS Direct Connect desde el centro de datos a un Direct Connect gateway en us-east-1. Establecer conectividad configurando cada VPC para usar una de las conexiones Direct Connect.",
          "Montar una conexión AWS Direct Connect desde el centro de datos a AWS. Crear un transit gateway, y adjuntar cada VPC al transit gateway. Establecer conectividad entre la conexión Direct Connect y el transit gateway."
        ],
        correctas: [3],
        explicacion: "Una única conexión Direct Connect (más económica que múltiples conexiones) junto con un transit gateway que centraliza la conectividad entre las tres VPCs y hacia on-premises es la solución más coste-eficiente: el transit gateway actúa como hub único, evitando conexiones redundantes por VPC. Tres conexiones VPN (A) o tres conexiones Direct Connect (C) multiplican el coste innecesariamente, y un appliance virtual de terceros por VPC (B) añade licencias y gestión adicionales."
      },
      {
        pregunta: "Un ecommerce construye una aplicación distribuida con varias funciones serverless y servicios de AWS para completar tareas de procesamiento de pedidos, que requieren aprobaciones manuales como parte del flujo. Un arquitecto de soluciones necesita diseñar una arquitectura que combine varias funciones Lambda en aplicaciones serverless responsivas, y que también orqueste datos y servicios que corren en instancias EC2, contenedores o servidores on-premises. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Usar AWS Step Functions para construir la aplicación.",
          "Integrar todos los componentes de la aplicación en un job de AWS Glue.",
          "Usar Amazon Simple Queue Service (Amazon SQS) para construir la aplicación.",
          "Usar funciones AWS Lambda y eventos de Amazon EventBridge para construir la aplicación."
        ],
        correctas: [0],
        explicacion: "AWS Step Functions está diseñado exactamente para coordinar y orquestar múltiples servicios de AWS (incluyendo funciones Lambda, tareas en EC2/contenedores e incluso recursos on-premises vía activadores) en un flujo de trabajo visual, incluyendo pasos de aprobación manual, todo sin gestionar infraestructura propia. AWS Glue (B) es un servicio ETL, no de orquestación general de flujos, SQS (C) es solo una cola de mensajes sin capacidad de orquestación de pasos, y Lambda+EventBridge (D) no ofrece de forma nativa la orquestación de flujos con aprobaciones manuales que sí ofrece Step Functions."
      },
      {
        pregunta: "Una empresa ha lanzado una instancia RDS para MySQL. La mayoría de las conexiones a la base de datos vienen de aplicaciones serverless. El tráfico de la aplicación cambia mucho en intervalos aleatorios. En momentos de alta demanda, los usuarios reportan errores de rechazo de conexión a la base de datos. ¿Qué solución resuelve esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Crear un proxy en RDS Proxy. Configurar las aplicaciones de los usuarios para usar la instancia de base de datos a través de RDS Proxy.",
          "Desplegar Amazon ElastiCache para Memcached entre las aplicaciones de los usuarios y la instancia de base de datos.",
          "Migrar la instancia de base de datos a una clase de instancia distinta con mayor capacidad de E/S. Configurar las aplicaciones de los usuarios para usar la nueva instancia.",
          "Configurar Multi-AZ para la instancia de base de datos. Configurar las aplicaciones de los usuarios para alternar entre las instancias de base de datos."
        ],
        correctas: [0],
        explicacion: "RDS Proxy agrupa y reutiliza de forma gestionada las conexiones a la base de datos, absorbiendo los picos y ráfagas de conexiones típicos de aplicaciones serverless sin que se agoten las conexiones disponibles en la instancia, sin necesidad de cambiar el tamaño de la instancia ni el código de la aplicación. ElastiCache (B) cachea datos, no gestiona el problema de agotamiento de conexiones, cambiar la clase de instancia (C) es más caro y no resuelve el patrón de picos impredecibles, y Multi-AZ (D) da alta disponibilidad, no más capacidad de conexiones simultáneas."
      },
      {
        pregunta: "Una empresa ha desplegado un nuevo sistema de auditoría para centralizar información sobre versiones de sistema operativo, parcheo y software instalado en instancias EC2. Un arquitecto de soluciones debe garantizar que todas las instancias aprovisionadas mediante Auto Scaling groups envíen correctamente informes al sistema de auditoría tanto al lanzarse como al terminarse. ¿Qué solución logra esto de la forma MÁS eficiente?",
        opciones: [
          "Usar una función Lambda programada que ejecute un script remotamente en todas las instancias EC2 para enviar datos al sistema de auditoría.",
          "Usar lifecycle hooks de EC2 Auto Scaling para ejecutar un script personalizado que envíe datos al sistema de auditoría cuando las instancias se lancen y se terminen.",
          "Usar una launch configuration de EC2 Auto Scaling para ejecutar un script personalizado vía user data que envíe datos al sistema de auditoría cuando las instancias se lancen y se terminen.",
          "Ejecutar un script personalizado en el sistema operativo de la instancia que envíe datos al sistema de auditoría. Configurar el script para que lo invoque el Auto Scaling group cuando la instancia arranque y se termine."
        ],
        correctas: [1],
        explicacion: "Los lifecycle hooks de Auto Scaling están diseñados específicamente para pausar una instancia en los estados de lanzamiento o terminación y ejecutar acciones personalizadas (como notificar a un sistema externo) de forma garantizada antes de que la instancia pase al siguiente estado, cubriendo ambos eventos de forma nativa. El user data (C) solo se ejecuta al lanzar la instancia, no al terminarla, un script en el propio sistema operativo (D) no tiene un mecanismo nativo fiable para engancharse a la terminación gestionada por Auto Scaling, y un Lambda programado periódicamente (A) no captura el momento exacto de lanzamiento/terminación de cada instancia."
      },
      {
        pregunta: "Una empresa desarrolla un videojuego multijugador en tiempo real que usa UDP para las comunicaciones entre el cliente y los servidores en un Auto Scaling group. Se esperan picos de demanda durante el día, así que la plataforma de servidores del juego debe adaptarse. Los desarrolladores quieren guardar las puntuaciones de los jugadores y otros datos no relacionales en una solución de base de datos que escale sin intervención. ¿Qué solución debería recomendar un arquitecto de soluciones?",
        opciones: [
          "Usar Amazon Route 53 para la distribución de tráfico y Amazon Aurora Serverless para el almacenamiento de datos.",
          "Usar un Network Load Balancer para la distribución de tráfico y Amazon DynamoDB en modo on-demand para el almacenamiento de datos.",
          "Usar un Network Load Balancer para la distribución de tráfico y Amazon Aurora Global Database para el almacenamiento de datos.",
          "Usar un Application Load Balancer para la distribución de tráfico y tablas globales de Amazon DynamoDB para el almacenamiento de datos."
        ],
        correctas: [1],
        explicacion: "Un Network Load Balancer opera en capa 4 y soporta UDP (necesario para este juego), y DynamoDB en modo on-demand escala automáticamente su capacidad de lectura/escritura según la demanda real sin intervención manual, encajando con el requisito de datos no relacionales que escalen solos. Un ALB (D) no soporta UDP (opera en capa 7 HTTP/HTTPS), y Aurora Serverless (A) o Aurora Global Database (C) son bases de datos relacionales, no encajan con el requisito de datos no relacionales como puntuaciones de jugadores."
      },
      {
        pregunta: "Una empresa aloja una aplicación frontend que usa una API de Amazon API Gateway integrada con AWS Lambda como backend. Cuando la API recibe peticiones, la función Lambda carga muchas librerías, se conecta a una base de datos RDS, procesa los datos y los devuelve al frontend. La empresa quiere que la latencia de respuesta sea la menor posible para todos sus usuarios con los menos cambios posibles en sus operaciones. ¿Qué solución cumple esto?",
        opciones: [
          "Establecer una conexión entre la aplicación frontend y la base de datos para hacer las consultas más rápidas saltándose la API.",
          "Configurar concurrencia aprovisionada (provisioned concurrency) para la función Lambda que gestiona las peticiones.",
          "Cachear los resultados de las consultas en Amazon S3 para una recuperación más rápida de datasets similares.",
          "Aumentar el tamaño de la base de datos para incrementar el número de conexiones que Lambda puede establecer a la vez."
        ],
        correctas: [1],
        explicacion: "La concurrencia aprovisionada mantiene un número determinado de instancias de la función Lambda ya inicializadas y con las librerías cargadas de antemano, eliminando la latencia del cold start (que es justamente el cuello de botella descrito, dado que la función carga muchas librerías), con un cambio mínimo de configuración y sin tocar código ni arquitectura. Saltarse la API (A) rompe la arquitectura actual, cachear en S3 (C) no resuelve la latencia de inicialización de Lambda, y aumentar el tamaño de la base de datos (D) no ataca el problema real, que es el cold start de Lambda, no la capacidad de conexiones de RDS."
      },
      {
        pregunta: "Una empresa migra su carga de trabajo on-premises a la nube de AWS. Ya usa varias instancias EC2 e instancias RDS. Quiere una solución que arranque y pare automáticamente las instancias EC2 y RDS fuera del horario laboral, minimizando coste y mantenimiento de infraestructura. ¿Qué solución cumple esto?",
        opciones: [
          "Escalar las instancias EC2 con redimensionamiento elástico. Escalar las instancias de base de datos a cero fuera del horario laboral.",
          "Explorar el AWS Marketplace en busca de soluciones de partners que arranquen y paren automáticamente las instancias EC2 y RDS según un calendario.",
          "Lanzar otra instancia EC2. Configurar un calendario de crontab que ejecute scripts de shell para arrancar y parar las instancias EC2 y RDS existentes según un calendario.",
          "Crear una función AWS Lambda que arranque y pare las instancias EC2 y RDS. Configurar Amazon EventBridge para invocar la función Lambda según un calendario."
        ],
        correctas: [3],
        explicacion: "Una función Lambda programada mediante EventBridge es una solución totalmente serverless y gestionada, sin infraestructura propia que mantener, que puede arrancar y parar tanto instancias EC2 como RDS según el calendario definido, minimizando coste (solo se paga por la ejecución puntual del Lambda) y mantenimiento. Buscar soluciones de terceros en el Marketplace (B) puede implicar coste de licencia adicional, lanzar otra instancia EC2 con crontab (C) exige mantener y pagar por esa instancia adicional, y las instancias RDS no se pueden \"escalar a cero\" (A) como tal."
      },
      {
        pregunta: "Una empresa aloja una web de tres capas que incluye una base de datos PostgreSQL, guardando metadatos de documentos. La empresa busca en esos metadatos términos clave para recuperar documentos que revisa en un informe mensual. Los documentos se guardan en S3, normalmente se escriben una sola vez pero se actualizan con frecuencia. El proceso de generación del informe tarda varias horas usando consultas relacionales, y no debe impedir la modificación de documentos ni la adición de nuevos. Un arquitecto de soluciones necesita acelerar el proceso de informes. ¿Qué solución cumple esto con el MENOR cambio en el código de la aplicación?",
        opciones: [
          "Montar un nuevo clúster de Amazon DocumentDB (compatible con MongoDB) con una réplica de lectura. Escalar la réplica de lectura para generar los informes.",
          "Montar un nuevo clúster de Amazon Aurora PostgreSQL que incluya una Aurora Replica. Hacer las consultas de los informes contra la Aurora Replica.",
          "Montar una nueva instancia RDS para PostgreSQL Multi-AZ. Configurar el módulo de informes para consultar el nodo secundario de RDS, de forma que no afecte al nodo primario.",
          "Montar una nueva tabla de Amazon DynamoDB para guardar los documentos. Usar una capacidad de escritura fija para soportar las nuevas entradas de documentos. Escalar automáticamente la capacidad de lectura para soportar los informes."
        ],
        correctas: [1],
        explicacion: "Migrar a Aurora PostgreSQL con una Aurora Replica dedicada a las consultas de informes desvía toda la carga pesada de los informes fuera de la instancia primaria (que sigue atendiendo modificaciones de documentos sin interferencia), manteniendo el mismo motor PostgreSQL y por tanto el mínimo cambio de código posible respecto a usar consultas relacionales ya existentes. DocumentDB (A) exige migrar de un modelo relacional a documentos (cambio mayor de código), el nodo secundario de RDS Multi-AZ (C) no está pensado para servir consultas de solo lectura de forma activa (es un standby de failover, no un endpoint de lectura como una réplica), y DynamoDB (D) exigiría reescribir todas las consultas relacionales como acceso NoSQL."
      },
      {
        pregunta: "Una empresa tiene una aplicación de tres capas en AWS que ingiere datos de sensores de los dispositivos de sus usuarios. El tráfico pasa por un Network Load Balancer (NLB), después a instancias EC2 de la capa web, y finalmente a instancias EC2 de la capa de aplicación, que hace llamadas a una base de datos. ¿Qué debería hacer un arquitecto de soluciones para mejorar la seguridad de los datos en tránsito?",
        opciones: [
          "Configurar un listener TLS. Desplegar el certificado del servidor en el NLB.",
          "Configurar AWS Shield Advanced. Activar AWS WAF en el NLB.",
          "Cambiar el balanceador de carga a un Application Load Balancer (ALB). Activar AWS WAF en el ALB.",
          "Cifrar el volumen EBS de las instancias EC2 usando AWS Key Management Service (AWS KMS)."
        ],
        correctas: [0],
        explicacion: "Configurar un listener TLS en el NLB con el certificado del servidor cifra el tráfico entre los dispositivos de los usuarios y la capa web, protegiendo los datos en tránsito exactamente en el tramo descrito, sin necesidad de cambiar de tipo de balanceador. AWS WAF (B, C) protege contra ataques a nivel de aplicación web, no cifra el tráfico en tránsito por sí mismo, y cifrar los volúmenes EBS (D) protege los datos en reposo en disco, no los datos mientras viajan por la red."
      },
      {
        pregunta: "Una empresa planea migrar una aplicación comercial (off-the-shelf) de su centro de datos on-premises a AWS. El software tiene un modelo de licencia por sockets y núcleos, con requisitos predecibles de capacidad y disponibilidad. La empresa quiere usar sus licencias existentes, compradas a principios de este año. ¿Qué opción de precios de EC2 es la MÁS económica?",
        opciones: ["Dedicated Reserved Hosts", "Dedicated On-Demand Hosts", "Dedicated Reserved Instances", "Dedicated On-Demand Instances"],
        correctas: [0],
        explicacion: "Un Dedicated Host reservado (Reserved) da control total sobre los sockets y núcleos físicos del servidor dedicado (necesario para el modelo de licencia existente basado en sockets/núcleos), con el mayor ahorro de coste gracias al compromiso de reserva, encajando con los requisitos predecibles de capacidad y disponibilidad. Los Dedicated On-Demand Hosts (B) no ofrecen el descuento por reserva, y las Dedicated Instances (C, D) no dan visibilidad ni control directo sobre el hardware físico subyacente necesario para licencias atadas a sockets/núcleos concretos."
      },
      {
        pregunta: "Una empresa corre una aplicación en instancias EC2 Linux en varias zonas de disponibilidad. La aplicación necesita una capa de almacenamiento altamente disponible y compatible con POSIX, con máxima durabilidad de datos, compartible entre las instancias EC2. Los datos se acceden con frecuencia los primeros 30 días, y con menos frecuencia después. ¿Qué solución cumple esto de la forma MÁS económica?",
        opciones: [
          "Usar la clase de almacenamiento S3 Standard. Crear una política de ciclo de vida de S3 para mover los datos de acceso infrecuente a S3 Glacier.",
          "Usar la clase de almacenamiento S3 Standard. Crear una política de ciclo de vida de S3 para mover los datos de acceso infrecuente a S3 Standard-Infrequent Access (S3 Standard-IA).",
          "Usar la clase de almacenamiento Standard de Amazon Elastic File System (Amazon EFS). Crear una política de gestión del ciclo de vida para mover los datos de acceso infrecuente a EFS Standard-Infrequent Access (EFS Standard-IA).",
          "Usar la clase de almacenamiento One Zone de Amazon EFS. Crear una política de gestión del ciclo de vida para mover los datos de acceso infrecuente a EFS One Zone-Infrequent Access (EFS One Zone-IA)."
        ],
        correctas: [2],
        explicacion: "EFS es compatible con POSIX y se puede montar y compartir simultáneamente entre instancias EC2 en varias zonas de disponibilidad (S3 no es un sistema de archivos POSIX montable de la misma forma), y su clase Standard con política de ciclo de vida hacia Standard-IA reduce el coste tras los 30 días manteniendo la misma durabilidad y disponibilidad multi-zona. S3 (A, B) no es compatible con POSIX ni se monta como sistema de archivos compartido de la misma manera, y la clase One Zone de EFS (D) sacrifica la redundancia entre varias zonas de disponibilidad que el enunciado exige."
      },
      {
        pregunta: "Un arquitecto de soluciones diseña una nueva VPC con dos subredes públicas para el balanceador de carga, dos subredes privadas para servidores web y dos subredes privadas para MySQL. Los servidores web solo usan HTTPS. Ya existe un security group para el balanceador que permite el puerto 443 desde 0.0.0.0/0. La política de la empresa exige que cada recurso tenga el mínimo acceso necesario para realizar su tarea. ¿Qué estrategia de configuración adicional debería usar el arquitecto de soluciones?",
        opciones: [
          "Crear un security group para los servidores web que permita el puerto 443 desde 0.0.0.0/0. Crear un security group para los servidores MySQL que permita el puerto 3306 desde el security group de los servidores web.",
          "Crear una network ACL para los servidores web que permita el puerto 443 desde 0.0.0.0/0. Crear una network ACL para los servidores MySQL que permita el puerto 3306 desde el security group de los servidores web.",
          "Crear un security group para los servidores web que permita el puerto 443 desde el balanceador de carga. Crear un security group para los servidores MySQL que permita el puerto 3306 desde el security group de los servidores web.",
          "Crear una network ACL para los servidores web que permita el puerto 443 desde el balanceador de carga. Crear una network ACL para los servidores MySQL que permita el puerto 3306 desde el security group de los servidores web."
        ],
        correctas: [2],
        explicacion: "Referenciar directamente el security group del balanceador (en vez de 0.0.0.0/0) como origen permitido en el security group de los servidores web, y el security group de los servidores web como origen permitido en el de MySQL, aplica el mínimo privilegio real: cada capa solo acepta tráfico de la capa inmediatamente anterior. Permitir 443 desde 0.0.0.0/0 en los servidores web (A) expone innecesariamente esa capa a cualquier origen (el balanceador ya filtra eso en su propio security group), y las network ACLs (B, D) son un control adicional a nivel de subred, no el mecanismo principal recomendado para expresar relaciones de mínimo privilegio entre capas de la aplicación."
      },
      {
        pregunta: "Un ecommerce corre una aplicación multicapa en AWS. Las capas de frontend y backend corren en EC2, y la base de datos en Amazon RDS para MySQL. La capa backend se comunica con la instancia RDS. Hay llamadas frecuentes que devuelven datasets idénticos desde la base de datos, causando ralentizaciones. ¿Qué acción debería tomarse para mejorar el rendimiento del backend?",
        opciones: [
          "Implementar Amazon SNS para guardar las llamadas a la base de datos.",
          "Implementar Amazon ElastiCache para cachear los datasets grandes.",
          "Implementar una réplica de lectura de RDS para MySQL para cachear las llamadas a la base de datos.",
          "Implementar Amazon Kinesis Data Firehose para transmitir las llamadas a la base de datos."
        ],
        correctas: [1],
        explicacion: "ElastiCache es un servicio de caché en memoria totalmente gestionado, ideal para cachear datasets idénticos solicitados repetidamente, evitando volver a consultar la base de datos cada vez y reduciendo drásticamente la carga sobre RDS. SNS (A) es un servicio de notificaciones, no de caché, una réplica de lectura de RDS (C) sigue siendo una base de datos relacional (no una caché en memoria de baja latencia) y no está pensada como mecanismo de caché de resultados idénticos, y Kinesis Data Firehose (D) transmite datos hacia destinos de almacenamiento/análisis, no acelera consultas repetidas."
      },
      {
        pregunta: "Un nuevo empleado se incorpora a una empresa como ingeniero de despliegue, y usará plantillas de AWS CloudFormation para crear varios recursos de AWS. Un arquitecto de soluciones quiere que el ingeniero realice sus tareas siguiendo el principio de mínimo privilegio. ¿Qué combinación de acciones debería tomar el arquitecto de soluciones para lograrlo? (Elige dos.)",
        opciones: [
          "Hacer que el ingeniero de despliegue use las credenciales del usuario root de la cuenta de AWS para las operaciones de stacks de CloudFormation.",
          "Crear un nuevo usuario de IAM para el ingeniero de despliegue y añadirlo a un grupo con la política de IAM PowerUsers adjunta.",
          "Crear un nuevo usuario de IAM para el ingeniero de despliegue y añadirlo a un grupo con la política de IAM AdministratorAccess adjunta.",
          "Crear un nuevo usuario de IAM para el ingeniero de despliegue y añadirlo a un grupo con una política de IAM que solo permita acciones de AWS CloudFormation.",
          "Crear un rol de IAM para el ingeniero de despliegue que defina explícitamente los permisos específicos del stack de CloudFormation, y lanzar los stacks usando ese rol de IAM."
        ],
        correctas: [3, 4],
        explicacion: "Un usuario de IAM en un grupo con una política limitada solo a acciones de CloudFormation, combinado con un rol de IAM que define explícitamente (y de forma acotada) los permisos concretos que necesita el stack a desplegar, aplica el mínimo privilegio en ambas capas: qué puede hacer el propio ingeniero y qué recursos puede crear/gestionar el stack. Usar las credenciales root (A) o políticas amplias como PowerUsers (B) o AdministratorAccess (C) otorgan muchos más permisos de los estrictamente necesarios para esta tarea."
      },
      {
        pregunta: "Una empresa despliega una aplicación web de dos capas en una VPC. La capa web usa un Auto Scaling group de EC2 en subredes públicas repartidas entre varias zonas de disponibilidad. La capa de base de datos consiste en una instancia RDS para MySQL en subredes privadas separadas. La capa web necesita acceder a la base de datos para recuperar información de producto. La aplicación no funciona como se espera: reporta que no puede conectar con la base de datos, aunque esta está confirmada como activa y funcionando. Todas las configuraciones de network ACLs, security groups y tablas de rutas siguen en su estado por defecto. ¿Qué debería recomendar un arquitecto de soluciones para arreglar la aplicación?",
        opciones: [
          "Añadir una regla explícita a la network ACL de la subred privada para permitir tráfico desde las instancias EC2 de la capa web.",
          "Añadir una ruta en la tabla de rutas de la VPC para permitir tráfico entre las instancias EC2 de la capa web y la capa de base de datos.",
          "Desplegar las instancias EC2 de la capa web y la instancia RDS de la capa de base de datos en dos VPCs separadas, y configurar VPC peering.",
          "Añadir una regla de entrada al security group de la instancia RDS de la capa de base de datos para permitir tráfico desde el security group de la capa web."
        ],
        correctas: [3],
        explicacion: "Con todas las configuraciones en su estado por defecto, el security group por defecto de la instancia RDS deniega todo el tráfico entrante salvo que se añada explícitamente una regla; añadir una regla de entrada que permita tráfico desde el security group de la capa web resuelve directamente el bloqueo. Las network ACLs por defecto (A) ya permiten todo el tráfico por defecto (no son la causa aquí), la tabla de rutas por defecto de una misma VPC (B) ya permite el tráfico entre subredes de esa VPC sin configuración adicional, y separar en dos VPCs con peering (C) es una complejidad innecesaria que no soluciona el problema real (falta de regla en el security group)."
      },
      {
        pregunta: "Una empresa tiene un gran dataset para su negocio de publicidad online, guardado en una instancia RDS para MySQL en una única zona de disponibilidad. Quiere que las consultas de informes de negocio corran sin afectar a las operaciones de escritura de la instancia de producción. ¿Qué solución cumple esto?",
        opciones: [
          "Desplegar réplicas de lectura de RDS para procesar las consultas de informes de negocio.",
          "Escalar horizontalmente la instancia de base de datos colocándola detrás de un Elastic Load Balancer.",
          "Escalar verticalmente la instancia de base de datos a un tipo de instancia mayor para manejar tanto escrituras como consultas.",
          "Desplegar la instancia de base de datos en varias zonas de disponibilidad para procesar las consultas de informes de negocio."
        ],
        correctas: [0],
        explicacion: "Las réplicas de lectura de RDS desvían las consultas de solo lectura (como los informes de negocio) hacia una copia separada de la base de datos, sin afectar al rendimiento de las operaciones de escritura en la instancia primaria. Un Elastic Load Balancer (B) no distribuye tráfico de base de datos de esta forma, escalar verticalmente la instancia (C) no separa físicamente la carga de lectura de la de escritura, y un despliegue Multi-AZ (D) usa la instancia standby solo para failover, no como endpoint de lectura activo para consultas de informes."
      },
      {
        pregunta: "Una empresa de procesamiento de pagos graba todas las comunicaciones de voz con sus clientes y guarda los archivos de audio en un bucket de S3. Necesita capturar el texto de los archivos de audio, eliminando del texto cualquier información personal identificable (PII) de los clientes. ¿Qué debería hacer un arquitecto de soluciones para cumplir esto?",
        opciones: [
          "Procesar los archivos de audio usando Amazon Kinesis Video Streams. Usar una función Lambda para buscar patrones de PII conocidos.",
          "Cuando se suba un archivo de audio al bucket de S3, invocar una función Lambda que inicie una tarea de Amazon Textract para analizar las grabaciones de llamadas.",
          "Configurar un job de transcripción de Amazon Transcribe con la redacción de PII activada. Cuando se suba un archivo de audio al bucket de S3, invocar una función Lambda para iniciar el job de transcripción. Guardar la salida en un bucket de S3 separado.",
          "Crear un flujo de contacto de Amazon Connect que ingiera los archivos de audio con la transcripción activada. Incrustar una función Lambda para buscar patrones de PII conocidos. Usar Amazon EventBridge para iniciar el flujo de contacto cuando se suba un archivo de audio a S3."
        ],
        correctas: [2],
        explicacion: "Amazon Transcribe tiene una función nativa de redacción de PII integrada en el propio job de transcripción, que elimina automáticamente la información personal identificable del texto resultante sin lógica adicional de detección de patrones, y un Lambda disparado por la subida a S3 automatiza todo el flujo. Kinesis Video Streams (A) es para streaming de vídeo, no transcripción de audio, Amazon Textract (B) extrae texto de documentos/imágenes, no transcribe audio, y Amazon Connect (D) es una plataforma de centro de contacto en vivo, no un servicio para procesar archivos de audio ya grabados y almacenados."
      },
      {
        pregunta: "Una empresa corre una aplicación web ecommerce multicapa en la nube de AWS, sobre instancias EC2 con una instancia RDS para MySQL Multi-AZ. RDS está configurada con la generación más reciente de instancia y 2.000 GB de almacenamiento en un volumen EBS de propósito general SSD (gp3). El rendimiento de la base de datos afecta a la aplicación durante periodos de alta demanda. Un administrador de bases de datos analiza los logs de CloudWatch Logs y descubre que el rendimiento de la aplicación siempre se degrada cuando el número de IOPS de lectura y escritura supera las 20.000. ¿Qué debería hacer un arquitecto de soluciones para mejorar el rendimiento de la aplicación?",
        opciones: [
          "Sustituir el volumen por un volumen magnético.",
          "Aumentar el número de IOPS del volumen gp3.",
          "Sustituir el volumen por un volumen Provisioned IOPS SSD (io2).",
          "Sustituir el volumen gp3 de 2.000 GB por dos volúmenes gp3 de 1.000 GB."
        ],
        correctas: [2],
        explicacion: "Los volúmenes gp3 tienen un límite máximo de IOPS aprovisionables inferior al que soportan los volúmenes io2 (diseñados para cargas de alto rendimiento y baja latencia como bases de datos exigentes), así que sustituir el volumen por un io2 permite aprovisionar consistentemente muchas más IOPS que las 20.000 donde degrada el rendimiento actual. Un volumen magnético (A) es mucho más lento, aumentar las IOPS del propio gp3 (B) tiene un tope máximo insuficiente para este caso, y dividir en dos volúmenes gp3 más pequeños (D) no aumenta el límite de IOPS disponible de forma efectiva para una única base de datos."
      },
      {
        pregunta: "Un usuario de IAM hizo varios cambios de configuración en recursos de AWS de la cuenta de su empresa durante un despliegue de producción la semana pasada. Un arquitecto de soluciones descubre que un par de reglas de security group no están configuradas como se desea, y quiere confirmar qué usuario de IAM fue responsable de los cambios. ¿Qué servicio debería usar para encontrar esa información?",
        opciones: ["Amazon GuardDuty", "Amazon Inspector", "AWS CloudTrail", "AWS Config"],
        correctas: [2],
        explicacion: "AWS CloudTrail registra el historial de todas las llamadas a la API realizadas en la cuenta, incluyendo la identidad del usuario de IAM que hizo cada cambio, la hora, la IP de origen y los parámetros exactos de la petición, permitiendo identificar exactamente quién modificó las reglas del security group. GuardDuty (A) detecta amenazas mediante análisis de comportamiento, no un registro de auditoría de quién hizo qué cambio, Amazon Inspector (B) escanea vulnerabilidades de instancias, y AWS Config (D) registra el historial de configuración de los recursos pero no identifica al usuario responsable de cada cambio de la misma forma detallada que CloudTrail."
      },
      {
        pregunta: "Una empresa ha implementado un servicio DNS autogestionado en AWS, formado por instancias EC2 en distintas regiones de AWS y endpoints de un accelerator estándar de AWS Global Accelerator. Quiere proteger la solución frente a ataques DDoS. ¿Qué debería hacer un arquitecto de soluciones para cumplir esto?",
        opciones: [
          "Suscribirse a AWS Shield Advanced. Añadir el accelerator como recurso a proteger.",
          "Suscribirse a AWS Shield Advanced. Añadir las instancias EC2 como recursos a proteger.",
          "Crear un web ACL de AWS WAF que incluya una regla basada en tasa. Asociar el web ACL al accelerator.",
          "Crear un web ACL de AWS WAF que incluya una regla basada en tasa. Asociar el web ACL a las instancias EC2."
        ],
        correctas: [0],
        explicacion: "AWS Shield Advanced ofrece protección DDoS avanzada específicamente sobre recursos como acceleradores de Global Accelerator, y protegerlo directamente en ese punto de entrada cubre todo el tráfico entrante hacia los endpoints EC2 detrás de él, en la capa de red/transporte donde ocurren los ataques DDoS volumétricos. AWS WAF (C, D) opera en la capa de aplicación HTTP/HTTPS y no se puede asociar a un accelerator de Global Accelerator ni a instancias EC2 directamente (solo a ALB, API Gateway o CloudFront), y proteger solo las instancias EC2 con Shield Advanced (B) sin proteger el propio accelerator deja sin cubrir el punto de entrada del tráfico."
      },
      {
        pregunta: "Un ecommerce necesita correr un job diario programado para agregar y filtrar registros de ventas para analítica. Guarda los registros de ventas en un bucket de S3; cada objeto puede pesar hasta 10 GB. El job puede tardar hasta una hora en completarse según el volumen de eventos de venta. El uso de CPU y memoria del job es constante y se conoce de antemano. Un arquitecto de soluciones necesita minimizar el esfuerzo operativo necesario para ejecutar el job. ¿Qué solución cumple esto?",
        opciones: [
          "Crear una función AWS Lambda con una notificación de Amazon EventBridge. Programar el evento de EventBridge para que se ejecute una vez al día.",
          "Crear una función AWS Lambda. Crear una API HTTP de Amazon API Gateway, e integrarla con la función. Crear un evento programado de EventBridge que llame a la API e invoque la función.",
          "Crear un clúster de Amazon Elastic Container Service (Amazon ECS) con tipo de lanzamiento AWS Fargate. Crear un evento programado de Amazon EventBridge que lance una tarea de ECS en el clúster para ejecutar el job.",
          "Crear un clúster de Amazon ECS con tipo de lanzamiento EC2 y un Auto Scaling group con al menos una instancia EC2. Crear un evento programado de EventBridge que lance una tarea de ECS en el clúster para ejecutar el job."
        ],
        correctas: [2],
        explicacion: "El job puede tardar hasta una hora (superando el límite máximo de 15 minutos de ejecución de una función Lambda, lo que descarta A y B), y ECS con Fargate ejecuta la tarea sin gestionar instancias EC2 subyacentes, con recursos de CPU/memoria conocidos y constantes que se pueden especificar directamente en la definición de la tarea, todo con el mínimo esfuerzo operativo. Usar el tipo de lanzamiento EC2 con un Auto Scaling group (D) exigiría gestionar y mantener las instancias subyacentes, más esfuerzo operativo del necesario existiendo Fargate."
      },
      {
        pregunta: "Una empresa necesita transferir 600 TB de datos desde su sistema de almacenamiento NAS on-premises a la nube de AWS. La transferencia debe completarse en 2 semanas. Los datos son sensibles y deben cifrarse en tránsito. La conexión a internet de la empresa soporta una velocidad de subida de 100 Mbps. ¿Qué solución cumple esto de la forma MÁS económica?",
        opciones: [
          "Usar la funcionalidad de subida multiparte de Amazon S3 para transferir los archivos por HTTPS.",
          "Crear una conexión VPN entre el sistema NAS on-premises y la región de AWS más cercana. Transferir los datos por la conexión VPN.",
          "Usar la consola de AWS Snow Family para pedir varios dispositivos AWS Snowball Edge Storage Optimized. Usar los dispositivos para transferir los datos a Amazon S3.",
          "Montar una conexión AWS Direct Connect de 10 Gbps entre la ubicación de la empresa y la región de AWS más cercana. Transferir los datos por una conexión VPN hacia la región para guardarlos en S3."
        ],
        correctas: [2],
        explicacion: "Con solo 100 Mbps de subida, transferir 600 TB por red tardaría muchos meses (muy por encima del plazo de 2 semanas); los dispositivos Snowball Edge Storage Optimized permiten transferir los datos localmente a alta velocidad y luego enviarlos físicamente a AWS, sin depender del ancho de banda de internet disponible, siendo también la opción más económica al no requerir contratar más ancho de banda ni una nueva conexión dedicada. La subida multiparte por HTTPS (A) o una VPN (B) siguen limitadas por los 100 Mbps existentes, y montar una conexión Direct Connect de 10 Gbps nueva (D) es mucho más cara y lenta de aprovisionar que usar Snowball para una migración puntual de este volumen."
      },
      {
        pregunta: "Una empresa financiera aloja una web en AWS. La aplicación usa un endpoint regional de Amazon API Gateway para que los usuarios consulten precios de acciones en tiempo real. El equipo de seguridad ha notado un aumento en el número de peticiones a la API y le preocupa que ataques de inundación HTTP (HTTP flood) puedan tumbar la aplicación. Un arquitecto de soluciones debe diseñar una solución para proteger la aplicación de este tipo de ataque. ¿Qué solución cumple esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Crear una distribución de Amazon CloudFront delante del endpoint regional de API Gateway con un TTL máximo de 24 horas.",
          "Crear un web ACL regional de AWS WAF con una regla basada en tasa. Asociar el web ACL a la etapa (stage) de API Gateway.",
          "Usar la métrica Count de Amazon CloudWatch para monitorizar y alertar al equipo de seguridad cuando se alcance una tasa predefinida.",
          "Crear una distribución de CloudFront con Lambda@Edge delante del endpoint regional de API Gateway. Crear una función AWS Lambda que bloquee peticiones de IPs que superen una tasa predefinida."
        ],
        correctas: [1],
        explicacion: "Un web ACL de AWS WAF con una regla basada en tasa (rate-based rule) detecta y bloquea automáticamente direcciones IP que superen un umbral de peticiones en un periodo dado, protegiendo directamente contra ataques de inundación HTTP, y se asocia directamente a la etapa de API Gateway sin componentes adicionales que mantener. CloudFront con TTL alto (A) no detiene un ataque activo, solo cachea contenido, monitorizar con CloudWatch (C) es reactivo y exige intervención manual del equipo de seguridad, y montar Lambda@Edge con lógica de bloqueo propia (D) reimplementa manualmente algo que WAF ya ofrece de forma nativa, con más esfuerzo operativo."
      },
      {
        pregunta: "Una startup meteorológica tiene una web personalizada para vender datos meteorológicos a sus usuarios online. Usa Amazon DynamoDB para guardar sus datos y quiere construir un nuevo servicio que envíe una alerta a los responsables de cuatro equipos internos cada vez que se registre un nuevo evento meteorológico. La empresa no quiere que este nuevo servicio afecte al rendimiento de la aplicación actual. ¿Qué debería hacer un arquitecto de soluciones para cumplir esto con el MENOR esfuerzo operativo?",
        opciones: [
          "Usar transacciones de DynamoDB para escribir los nuevos datos de eventos en la tabla. Configurar las transacciones para notificar a los equipos internos.",
          "Hacer que la aplicación actual publique un mensaje en cuatro topics de Amazon Simple Notification Service (Amazon SNS). Hacer que cada equipo se suscriba a un topic.",
          "Activar Amazon DynamoDB Streams en la tabla. Usar triggers para escribir en un único topic de Amazon Simple Notification Service (Amazon SNS) al que los equipos puedan suscribirse.",
          "Añadir un atributo personalizado a cada registro para marcar los elementos nuevos. Escribir un cron job que escanee la tabla cada minuto en busca de elementos nuevos y notifique a una cola de Amazon Simple Queue Service (Amazon SQS) a la que los equipos puedan suscribirse."
        ],
        correctas: [2],
        explicacion: "DynamoDB Streams captura automáticamente los cambios de la tabla sin que la aplicación tenga que hacer nada adicional (sin afectar su rendimiento), y un trigger que escriba en un único topic SNS al que se suscriban los cuatro equipos es la solución más simple de mantener, evitando gestionar cuatro topics separados. Modificar la aplicación para publicar directamente en SNS (B) sí toca el código y el rendimiento de la aplicación actual, las transacciones de DynamoDB (A) no tienen una función nativa de notificación integrada, y escanear la tabla con un cron job cada minuto (D) añade carga de lectura innecesaria y latencia frente al enfoque basado en streams."
      },
      {
        pregunta: "Una empresa quiere usar la nube de AWS para hacer que una aplicación existente sea altamente disponible y resiliente. La versión actual de la aplicación reside en el centro de datos de la empresa. La aplicación sufrió recientemente pérdida de datos tras el fallo de un servidor de base de datos por un corte de electricidad inesperado. La empresa necesita una solución que evite cualquier punto único de fallo y que permita escalar la aplicación según la demanda de los usuarios. ¿Qué solución cumple esto?",
        opciones: [
          "Desplegar los servidores de aplicación usando instancias EC2 en un Auto Scaling group repartido entre varias zonas de disponibilidad. Usar una instancia RDS en configuración Multi-AZ.",
          "Desplegar los servidores de aplicación usando instancias EC2 en un Auto Scaling group en una única zona de disponibilidad. Desplegar la base de datos en una instancia EC2. Activar EC2 Auto Recovery.",
          "Desplegar los servidores de aplicación usando instancias EC2 en un Auto Scaling group repartido entre varias zonas de disponibilidad. Usar una instancia RDS con una réplica de lectura en una única zona de disponibilidad. Promover la réplica de lectura para sustituir a la instancia primaria si esta falla.",
          "Desplegar los servidores de aplicación usando instancias EC2 en un Auto Scaling group repartido entre varias zonas de disponibilidad. Desplegar los servidores de base de datos primario y secundario en instancias EC2 en varias zonas de disponibilidad. Usar Amazon EBS Multi-Attach para crear almacenamiento compartido entre las instancias."
        ],
        correctas: [0],
        explicacion: "Un Auto Scaling group repartido entre varias zonas de disponibilidad elimina el punto único de fallo en la capa de aplicación y permite escalar según demanda, y RDS Multi-AZ da failover automático de la base de datos hacia una réplica síncrona en otra zona sin intervención manual, evitando la pérdida de datos del incidente descrito. Mantener una única zona de disponibilidad (B) o una base de datos en una sola instancia EC2 (B, D con gestión manual) no elimina el punto único de fallo, y promover manualmente una réplica de lectura (C, asíncrona) no da la misma garantía de recuperación automática sin pérdida de datos que Multi-AZ."
      },
      {
        pregunta: "Una empresa necesita ingerir y procesar grandes cantidades de datos en streaming que genera su aplicación. La aplicación corre en instancias EC2 y envía datos a Amazon Kinesis Data Streams, configurado con los valores por defecto. Cada dos días, la aplicación consume los datos y los escribe en un bucket de S3 para procesamiento de business intelligence (BI). La empresa observa que S3 no está recibiendo todos los datos que la aplicación envía a Kinesis Data Streams. ¿Qué debería hacer un arquitecto de soluciones para resolver esto?",
        opciones: [
          "Actualizar la configuración por defecto de Kinesis Data Streams modificando el periodo de retención de datos.",
          "Actualizar la aplicación para usar la Kinesis Producer Library (KPL) al enviar los datos a Kinesis Data Streams.",
          "Actualizar el número de shards de Kinesis para manejar el throughput de los datos enviados a Kinesis Data Streams.",
          "Activar el versionado de S3 en el bucket para preservar todas las versiones de cada objeto ingerido."
        ],
        correctas: [0],
        explicacion: "Con la configuración por defecto, Kinesis Data Streams retiene los registros solo 24 horas; como la aplicación consume los datos cada dos días (cada 48 horas), los registros más antiguos caducan y se pierden antes de poder leerse, exactamente el patrón de pérdida descrito. Ampliar el periodo de retención (por ejemplo, a más de 48 horas) resuelve directamente el problema. Usar la Kinesis Producer Library (B) mejora la eficiencia del productor pero no evita la expiración de registros no consumidos a tiempo, aumentar el número de shards (C) resuelve problemas de throughput/capacidad, no de retención, y el versionado de S3 (D) no tiene relación con datos que nunca llegan a escribirse en S3 porque expiraron antes en Kinesis."
      },
      {
        pregunta: "Una empresa despliega una aplicación de ecommerce de tres capas sobre una flota de instancias EC2, en un Auto Scaling group detrás de un ALB. Todos los datos de ecommerce se guardan en una instancia RDS para MariaDB Multi-AZ. La empresa quiere optimizar la gestión de sesiones de cliente durante las transacciones; la aplicación debe guardar los datos de sesión de forma durable. ¿Qué soluciones cumplen esto? (Elige dos.)",
        opciones: [
          "Activar la función de sesiones persistentes (session affinity / sticky sessions) en el ALB.",
          "Usar una tabla de Amazon DynamoDB para guardar la información de sesión de los clientes.",
          "Desplegar un user pool de Amazon Cognito para gestionar la información de sesión de los usuarios.",
          "Desplegar un clúster de Amazon ElastiCache para Redis para guardar la información de sesión de los clientes.",
          "Usar AWS Systems Manager Application Manager en la aplicación para gestionar la información de sesión de los usuarios."
        ],
        correctas: [1, 3],
        explicacion: "DynamoDB y ElastiCache para Redis son los dos almacenes externos de sesión típicos que desacoplan el estado de sesión de la instancia EC2 concreta que la atendió, permitiendo que cualquier instancia del Auto Scaling group sirva la petición sin perder la sesión al escalar o reemplazar instancias; ambos ofrecen la durabilidad y disponibilidad necesarias para datos de sesión en un entorno de escalado dinámico. Las sesiones persistentes del ALB (A) mantienen la sesión ligada a una instancia física concreta (no son durables ni sobreviven a la terminación de esa instancia), Cognito (C) gestiona identidad y autenticación de usuarios, no el estado de sesión de la aplicación, y Systems Manager Application Manager (E) es una herramienta de gestión/visibilidad de aplicaciones, no un almacén de datos de sesión."
      },
      {
        pregunta: "Una empresa necesita una estrategia de backup para su aplicación web de tres capas sin estado (stateless). La aplicación corre en instancias EC2 en un Auto Scaling group con una política de escalado dinámico que responde a eventos de escalado. La capa de base de datos corre en Amazon RDS para PostgreSQL. La aplicación no necesita almacenamiento local temporal en las instancias EC2. El RPO (recovery point objective) de la empresa es de 2 horas. La estrategia de backup debe maximizar la escalabilidad y optimizar el uso de recursos en este entorno. ¿Qué solución cumple esto?",
        opciones: [
          "Tomar snapshots de los volúmenes EBS de las instancias EC2 y de la base de datos cada 2 horas para cumplir el RPO.",
          "Configurar una política de ciclo de vida de snapshots para tomar snapshots de los volúmenes EBS. Activar copias de seguridad automatizadas en RDS para cumplir el RPO.",
          "Conservar las últimas Amazon Machine Images (AMIs) de las capas web y de aplicación. Activar copias de seguridad automatizadas en RDS y usar la recuperación a un punto en el tiempo para cumplir el RPO.",
          "Tomar snapshots de los volúmenes EBS de las instancias EC2 cada 2 horas. Activar copias de seguridad automatizadas en RDS y usar la recuperación a un punto en el tiempo para cumplir el RPO."
        ],
        correctas: [2],
        explicacion: "Como la aplicación es stateless y no requiere almacenamiento temporal local, basta con conservar las AMIs más recientes de las capas web/aplicación (para relanzar instancias idénticas) en vez de tomar snapshots periódicos de sus volúmenes EBS (que no contienen datos relevantes que respaldar); las copias de seguridad automatizadas de RDS con recuperación a un punto en el tiempo ya cubren de sobra el RPO de 2 horas para la única capa con estado real. Tomar snapshots de EBS de las instancias cada 2 horas (A, D) desperdicia recursos y esfuerzo operativo en datos que no son necesarios de respaldar dado que la app es stateless."
      },
      {
        pregunta: "Una empresa quiere desplegar una nueva web pública en AWS. La aplicación incluye una capa de servidores web con instancias EC2 y una capa de base de datos con una instancia RDS para MySQL. La aplicación debe ser segura y accesible para clientes globales con direcciones IP dinámicas. ¿Cómo debería configurar un arquitecto de soluciones los security groups para cumplir esto?",
        opciones: [
          "Configurar el security group de los servidores web para permitir tráfico entrante en el puerto 443 desde 0.0.0.0/0. Configurar el security group de la instancia de base de datos para permitir tráfico entrante en el puerto 3306 desde el security group de los servidores web.",
          "Configurar el security group de los servidores web para permitir tráfico entrante en el puerto 443 desde las direcciones IP de los clientes. Configurar el security group de la instancia de base de datos para permitir tráfico entrante en el puerto 3306 desde el security group de los servidores web.",
          "Configurar el security group de los servidores web para permitir tráfico entrante en el puerto 443 desde las direcciones IP de los clientes. Configurar el security group de la instancia de base de datos para permitir tráfico entrante en el puerto 3306 desde las direcciones IP de los clientes.",
          "Configurar el security group de los servidores web para permitir tráfico entrante en el puerto 443 desde 0.0.0.0/0. Configurar el security group de la instancia de base de datos para permitir tráfico entrante en el puerto 3306 desde 0.0.0.0/0."
        ],
        correctas: [0],
        explicacion: "Como los clientes son globales y tienen IPs dinámicas (no se puede restringir por IP concreta de forma práctica), el puerto 443 debe abrirse a 0.0.0.0/0 en los servidores web (es una web pública, ese es su propósito), pero la base de datos debe seguir referenciando el security group de los servidores web como único origen permitido, nunca abrirse directamente a 0.0.0.0/0 ni a IPs de clientes. Restringir el acceso web por IP de cliente (B, C) no es viable con IPs dinámicas de clientes globales, y abrir la base de datos directamente a internet (D) es una grave brecha de seguridad innecesaria."
      }
    ]
  }
];
