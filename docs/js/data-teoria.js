/* =========================================================
   TEORÍA — AWS Solutions Architect Associate (SAA-C03)
   Contenido en español, condensado y orientado al examen.
   Cada módulo: { id, numero, titulo, resumen, peso, tiempo,
                  teoria:[{id,titulo,html}], preguntas:[...] }
   ========================================================= */
window.TEORIA = [

/* ===================== MÓDULO 01 ===================== */
{
  id: "01-fundamentos",
  numero: 1,
  titulo: "Fundamentos de AWS",
  resumen: "Infraestructura global, marco Well-Architected, responsabilidad compartida y gestión de cuentas.",
  peso: "~10%",
  tiempo: "30–45 min",
  teoria: [
    {
      id: "infra-global",
      titulo: "Infraestructura global",
      html: `
        <p>La infraestructura de AWS se organiza en tres niveles, de mayor a menor cobertura geográfica:</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Nivel</th><th>Qué es</th><th>Cantidad</th></tr></thead>
          <tbody>
            <tr><td><strong>Región</strong></td><td>Zona geográfica aislada (varios centros de datos)</td><td>30+</td></tr>
            <tr><td><strong>Zona de Disponibilidad (AZ)</strong></td><td>Uno o varios centros de datos independientes dentro de una región</td><td>3–6 por región (mín. 3)</td></tr>
            <tr><td><strong>Ubicación de borde (Edge)</strong></td><td>Puntos de caché de CloudFront cerca del usuario</td><td>400+</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p><strong>Regla de oro:</strong> Multi-AZ = Alta Disponibilidad (HA). Multi-Región = Recuperación ante Desastres (DR). No confundas ambos conceptos, es un error muy frecuente en el examen.</p></div></div>
        <h3>Zonas especializadas</h3>
        <ul>
          <li><strong>Local Zones:</strong> acercan cómputo y almacenamiento a grandes ciudades para latencia de milisegundos de un solo dígito.</li>
          <li><strong>Wavelength:</strong> despliega cómputo dentro de redes 5G para usuarios móviles con ultra baja latencia.</li>
          <li><strong>Outposts:</strong> infraestructura AWS física en tu propio centro de datos (on-premises).</li>
        </ul>
        <h3>Cómo elegir una región (CPAS)</h3>
        <ul>
          <li><strong>C</strong>umplimiento: ¿leyes de soberanía de datos?</li>
          <li><strong>P</strong>roximidad: ¿dónde están los usuarios?</li>
          <li><strong>A</strong>vailability (disponibilidad): ¿está el servicio en esa región?</li>
          <li><strong>S</strong>pending (coste): ¿cuánto cuesta allí?</li>
        </ul>`
    },
    {
      id: "well-architected",
      titulo: "Marco Well-Architected",
      html: `
        <p>El <strong>AWS Well-Architected Framework</strong> define buenas prácticas para diseñar en la nube, organizadas en <strong>6 pilares</strong>:</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Pilar</th><th>Pregunta clave</th><th>Idea principal</th></tr></thead>
          <tbody>
            <tr><td>Excelencia operativa</td><td>¿Cómo operar y monitorizar?</td><td>Automatiza todo</td></tr>
            <tr><td>Seguridad</td><td>¿Cómo proteger los datos?</td><td>Defensa en profundidad</td></tr>
            <tr><td>Fiabilidad</td><td>¿Cómo recuperarse de fallos?</td><td>Multi-AZ, diseñar para el fallo</td></tr>
            <tr><td>Eficiencia del rendimiento</td><td>¿Recursos adecuados?</td><td>Ajusta al tipo de carga</td></tr>
            <tr><td>Optimización de costes</td><td>¿Cómo reducir gasto?</td><td>Paga solo por lo que usas</td></tr>
            <tr><td>Sostenibilidad</td><td>¿Cómo minimizar el impacto?</td><td>Optimiza la utilización</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p><strong>Memoriza los 6 pilares.</strong> Preguntas típicas: "diseñar para el fallo" y "deja de adivinar tu capacidad" → Fiabilidad y Eficiencia del rendimiento respectivamente. "Implementar una base de identidad sólida" → Seguridad.</p></div></div>`
    },
    {
      id: "responsabilidad-compartida",
      titulo: "Modelo de responsabilidad compartida",
      html: `
        <p>La seguridad en AWS es una <strong>responsabilidad compartida</strong>:</p>
        <ul>
          <li><strong>AWS — seguridad <em>de</em> la nube:</strong> seguridad física, hardware, red, y el <strong>hipervisor</strong>.</li>
          <li><strong>Cliente — seguridad <em>en</em> la nube:</strong> cifrado de datos, permisos IAM, parches del sistema operativo invitado, seguridad de la aplicación y configuración de red.</li>
        </ul>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p><strong>Mnemotécnica:</strong> AWS = hardware e infraestructura. Tú = datos y configuración. Si la pregunta menciona el <em>hipervisor</em> o la seguridad física → es responsabilidad de AWS.</p></div></div>`
    },
    {
      id: "gestion-cuentas",
      titulo: "Gestión de cuentas: Organizations, SCP, Control Tower, RAM",
      html: `
        <h3>AWS Organizations</h3>
        <p>Gestiona <strong>múltiples cuentas</strong> de forma centralizada. Estructura: cuenta de gestión (paga las facturas) + Unidades Organizativas (OU) que agrupan cuentas miembro.</p>
        <ul>
          <li><strong>Facturación consolidada:</strong> una sola factura y <strong>descuentos por volumen</strong> al sumar el uso de todas las cuentas. También permite compartir Instancias Reservadas.</li>
        </ul>
        <h3>Service Control Policies (SCP) — muy preguntado</h3>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>Las SCP <strong>NO conceden permisos</strong>: son límites máximos (guardarraíles). <strong>NO afectan a la cuenta de gestión</strong>. Permisos efectivos = política IAM <strong>Y</strong> SCP.</p></div></div>
        <pre><code>{
  "Effect": "Deny",
  "Action": "*",
  "Resource": "*",
  "Condition": {
    "StringNotEquals": {
      "aws:RequestedRegion": ["us-east-1", "eu-west-1"]
    }
  }
}</code></pre>
        <p>Casos típicos de SCP: restringir regiones, exigir cifrado, impedir <code>organizations:LeaveOrganization</code>, proteger CloudTrail.</p>
        <h3>Control Tower vs Organizations</h3>
        <p><strong>Control Tower</strong> = Organizations + automatización + buenas prácticas. Configura un entorno multicuenta seguro en minutos (Landing Zone, guardarraíles predefinidos, Account Factory). Úsalo cuando quieras rapidez y gobernanza lista para usar.</p>
        <h3>Resource Access Manager (RAM)</h3>
        <p>Comparte recursos <strong>entre cuentas</strong> sin duplicarlos. Uso más frecuente en el examen: <strong>compartir subredes de VPC</strong> desde una cuenta de red centralizada.</p>`
    },
    {
      id: "herramientas-modelos",
      titulo: "Herramientas, modelos de servicio y datos rápidos",
      html: `
        <h3>Formas de gestionar AWS</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Herramienta</th><th>Mejor para</th></tr></thead>
          <tbody>
            <tr><td>Consola</td><td>Tareas visuales y puntuales, aprender</td></tr>
            <tr><td>CLI</td><td>Automatización y scripts</td></tr>
            <tr><td>SDK</td><td>Código de aplicación</td></tr>
            <tr><td>CloudFormation</td><td>Infraestructura como código (replicar entornos)</td></tr>
          </tbody>
        </table></div>
        <h3>Modelos de servicio</h3>
        <ul>
          <li><strong>IaaS</strong> (p. ej. EC2): gestionas el SO y la máquina.</li>
          <li><strong>PaaS</strong> (p. ej. Elastic Beanstalk): despliegas código sin gestionar servidores.</li>
          <li><strong>SaaS</strong>: aplicación totalmente gestionada.</li>
          <li><strong>FaaS</strong> (Lambda): funciones por eventos, sin servidores.</li>
        </ul>
        <h3>Servicios globales vs regionales</h3>
        <ul>
          <li><strong>Globales:</strong> IAM, CloudFront, Route 53, WAF.</li>
          <li><strong>Regionales:</strong> EC2, RDS, VPC, Lambda (S3 usa espacio de nombres global).</li>
        </ul>
        <h3>Herramientas de coste</h3>
        <ul>
          <li><strong>Pricing Calculator:</strong> estima costes <em>antes</em> de desplegar.</li>
          <li><strong>Cost Explorer:</strong> analiza costes históricos.</li>
          <li><strong>Budgets:</strong> alertas al superar un umbral de gasto.</li>
        </ul>`
    }
  ],
  preguntas: [
    {
      pregunta: "Una aplicación debe seguir funcionando aunque falle un centro de datos completo. ¿Qué componente de la infraestructura de AWS se debe usar?",
      opciones: [
        "Desplegar en varias ubicaciones de borde (Edge Locations)",
        "Desplegar en varias Zonas de Disponibilidad dentro de una misma región",
        "Desplegar en varias regiones",
        "Desplegar usando AWS Local Zones"
      ],
      correctas: [1],
      explicacion: "Las Zonas de Disponibilidad son centros de datos independientes dentro de una región; desplegar en varias AZ protege frente al fallo de un centro de datos. Varias regiones es DR (recuperación ante desastres), no simple alta disponibilidad."
    },
    {
      pregunta: "Un arquitecto necesita minimizar la latencia para usuarios que acceden a contenido estático a nivel global. ¿Qué combinación usar?",
      opciones: [
        "Amazon S3 con replicación entre regiones",
        "Amazon CloudFront con S3 como origen",
        "Amazon S3 con Transfer Acceleration",
        "Varias instancias EC2 en distintas regiones"
      ],
      correctas: [1],
      explicacion: "CloudFront es la CDN de AWS con más de 400 ubicaciones de borde: cachea el contenido cerca del usuario y minimiza la latencia. S3 actúa como origen del contenido estático."
    },
    {
      pregunta: "Según el modelo de responsabilidad compartida, ¿cuál de estas es responsabilidad de AWS?",
      opciones: [
        "El cifrado de los datos en reposo en S3",
        "La gestión de parches del sistema operativo invitado en EC2",
        "La seguridad física de los centros de datos",
        "La configuración de los grupos de seguridad"
      ],
      correctas: [2],
      explicacion: "AWS es responsable de la 'seguridad DE la nube': infraestructura física, hardware e instalaciones. El cifrado, los parches del SO y los grupos de seguridad son responsabilidad del cliente."
    },
    {
      pregunta: "Una empresa quiere desplegar una aplicación sin gestionar servidores, sistemas operativos ni entornos de ejecución. ¿Qué categoría de servicio encaja mejor?",
      opciones: [
        "Infraestructura como servicio (IaaS)",
        "Plataforma como servicio (PaaS)",
        "Software como servicio (SaaS)",
        "Función como servicio (FaaS)"
      ],
      correctas: [1],
      explicacion: "PaaS (como Elastic Beanstalk) abstrae la gestión de infraestructura: despliegas código sin administrar servidores ni SO. IaaS (EC2) exige gestionar las máquinas virtuales."
    },
    {
      pregunta: "Por normativa, los datos almacenados en AWS no pueden salir de una ubicación geográfica concreta. ¿Cómo se consigue?",
      opciones: [
        "Habilitar AWS GuardDuty",
        "Elegir la región adecuada y no habilitar funciones entre regiones",
        "Usar AWS Organizations con SCP",
        "Habilitar AWS CloudTrail"
      ],
      correctas: [1],
      explicacion: "Los datos permanecen en la región elegida salvo que configures lo contrario. Sin replicación ni transferencias entre regiones se garantiza la residencia de datos. El control principal es elegir la región correcta."
    },
    {
      pregunta: "¿Qué pilar del Well-Architected Framework se centra en recuperarse de fallos y adquirir recursos dinámicamente según la demanda?",
      opciones: ["Excelencia operativa", "Seguridad", "Fiabilidad", "Eficiencia del rendimiento"],
      correctas: [2],
      explicacion: "El pilar de Fiabilidad se centra en la tolerancia a fallos, la recuperación ante desastres y la auto-recuperación para mantener la carga de trabajo operativa."
    },
    {
      pregunta: "Una empresa quiere estimar el coste de su infraestructura planificada ANTES de desplegarla. ¿Qué herramienta debe usar?",
      opciones: ["AWS Cost Explorer", "AWS Budgets", "AWS Pricing Calculator", "Informe de costes y uso (CUR)"],
      correctas: [2],
      explicacion: "Pricing Calculator estima costes de arquitecturas planificadas. Cost Explorer analiza costes históricos y Budgets envía alertas de presupuesto."
    },
    {
      pregunta: "Una aplicación requiere latencia de un solo dígito de milisegundos para usuarios de un área metropolitana concreta. ¿Qué componente se debe usar?",
      opciones: ["Una región de AWS", "Una Zona de Disponibilidad", "AWS Local Zone", "AWS Wavelength Zone"],
      correctas: [2],
      explicacion: "Las Local Zones acercan cómputo, almacenamiento y bases de datos a los usuarios finales en áreas metropolitanas, logrando latencias de un solo dígito de milisegundos. Wavelength es específico para 5G."
    },
    {
      pregunta: "Un equipo de seguridad quiere impedir que todas las cuentas miembro de su organización creen recursos fuera de us-east-1 y eu-west-1. ¿Cómo implementarlo?",
      opciones: [
        "Crear políticas IAM en cada cuenta que restrinjan las regiones",
        "Usar reglas de AWS Config para detectar recursos no conformes",
        "Crear una SCP que deniegue acciones en otras regiones",
        "Usar AWS Firewall Manager para bloquear el acceso por región"
      ],
      correctas: [2],
      explicacion: "Las SCP son controles preventivos centralizados que no pueden anular los administradores de las cuentas miembro. Las políticas IAM sí pueden cambiarlas los administradores de cada cuenta y Config es detectivo, no preventivo."
    },
    {
      pregunta: "¿Cuál de las siguientes afirmaciones sobre las Service Control Policies (SCP) es correcta?",
      opciones: [
        "Las SCP conceden permisos a usuarios y roles",
        "Las SCP afectan a la cuenta de gestión de la organización",
        "Las SCP definen los permisos máximos de las cuentas miembro",
        "Las SCP solo se aplican a cuentas individuales, no a OU"
      ],
      correctas: [2],
      explicacion: "Las SCP actúan como guardarraíles: definen el máximo de permisos posibles, no conceden permisos, no afectan a la cuenta de gestión y pueden aplicarse a la raíz, a OU o a cuentas."
    },
    {
      pregunta: "Una empresa quiere montar rápidamente un entorno multicuenta seguro con aprovisionamiento automatizado de cuentas y guardarraíles de gobernanza preconfigurados. ¿Qué servicio usar?",
      opciones: ["AWS Organizations", "AWS Control Tower", "AWS CloudFormation StackSets", "AWS Service Catalog"],
      correctas: [1],
      explicacion: "Control Tower ofrece configuración automatizada multicuenta con Landing Zone, guardarraíles preconstruidos y Account Factory. Está construido sobre Organizations, que requeriría configuración manual."
    },
    {
      pregunta: "Una cuenta de red centralizada quiere compartir subredes de VPC con varias cuentas de aplicación sin duplicar la infraestructura de VPC. ¿Qué servicio lo permite?",
      opciones: ["Emparejamiento de VPC (Peering)", "AWS Transit Gateway", "AWS Resource Access Manager (RAM)", "AWS PrivateLink"],
      correctas: [2],
      explicacion: "AWS RAM permite compartir recursos entre cuentas; las subredes permanecen en la cuenta propietaria pero son accesibles por las cuentas compartidas, evitando duplicar VPC."
    },
    {
      pregunta: "Usando facturación consolidada, una empresa recibe descuentos por volumen en S3 aunque ninguna cuenta por separado alcance el umbral. ¿Por qué?",
      opciones: [
        "AWS aplica descuentos automáticos por usar Organizations",
        "La facturación consolidada suma el uso de todas las cuentas para el precio por volumen",
        "La cuenta de gestión se queda todos los descuentos",
        "Las SCP habilitan ahorro de costes automáticamente"
      ],
      correctas: [1],
      explicacion: "La facturación consolidada trata a toda la organización como una única entidad de facturación: el uso agregado de todas las cuentas alcanza tramos de precio con mayor descuento."
    },
    {
      pregunta: "Para usar la AWS CLI evitando incrustar credenciales de larga duración en los scripts, ¿cuál es la MEJOR práctica?",
      opciones: [
        "Usar las credenciales de la cuenta raíz",
        "Crear un usuario IAM y guardar sus credenciales en el script",
        "Usar roles IAM con credenciales de seguridad temporales",
        "Usar claves de acceso sin clave secreta"
      ],
      correctas: [2],
      explicacion: "Los roles IAM proporcionan credenciales temporales vía AWS STS que rotan automáticamente. Nunca uses credenciales raíz para tareas diarias ni incrustes credenciales en el código."
    },
    {
      pregunta: "¿Cuáles son beneficios de usar regiones de AWS? (Selecciona 2)",
      opciones: [
        "Menor latencia para usuarios de áreas geográficas concretas",
        "Replicación automática de datos entre todas las regiones",
        "Cumplimiento de requisitos de soberanía de datos",
        "Menor coste que usar una única región",
        "Conmutación por error automática entre regiones"
      ],
      correctas: [0, 2],
      explicacion: "Desplegar en regiones cercanas reduce la latencia y elegir la región permite cumplir la residencia/soberanía de datos. La replicación y la conmutación por error NO son automáticas: hay que configurarlas."
    }
  ]
}
,

/* ===================== MÓDULO 02 ===================== */
{
  id: "02-iam",
  numero: 2,
  titulo: "IAM: Identidad y accesos",
  resumen: "Usuarios, grupos, roles y políticas; evaluación de permisos, STS, federación, Organizations y SCP, políticas basadas en recursos, límites de permisos, Cognito, IAM Identity Center y buenas prácticas de seguridad.",
  peso: "~15–20%",
  tiempo: "45–60 min",
  diagrama: `%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#232f3e', 'edgeLabelBackground':'#ffffff', 'tertiaryColor': '#fff'}}}%%
graph TD
    classDef global fill:#f2f3f3,stroke:#232f3e,stroke-width:2px,color:#232f3e,stroke-dasharray: 5 5;
    classDef governance fill:#e6f7ff,stroke:#0073bb,stroke-width:2px,color:#0073bb;
    classDef identity fill:#e9fbec,stroke:#1d8102,stroke-width:2px,color:#1d8102;
    classDef compute fill:#fff0e6,stroke:#d87f0a,stroke-width:2px,color:#d87f0a;
    classDef policy fill:#fff1f0,stroke:#cf1322,stroke-width:2px,color:#cf1322;
    classDef audit fill:#f9f0ff,stroke:#722ed1,stroke-width:2px,color:#722ed1;
    classDef storage fill:#e6fffb,stroke:#006d75,stroke-width:2px,color:#006d75;

    subgraph Capa_Global ["CAPA 0: ORGANIZACIÓN Y GOBERNANZA (AWS Organizations)"]
        direction TB
        Org["AWS Organization"]:::global
        ControlTower["AWS Control Tower"]:::governance
        OU["Unidades Organizativas - OUs"]:::global
        SCP["<b>SCP</b><br/>Service Control Policies"]:::policy

        ControlTower -.->|Orquesta| Org
        Org --> OU
        OU -->|Aplica Techo de Permisos| SCP
    end

    subgraph Capa_Identidad ["CAPA 1: FUENTES DE IDENTIDAD Y FEDERACIÓN"]
        direction LR
        ExtIdP["Proveedor de Identidad Externo<br/>Okta / Azure AD / Ping"]:::identity
        ADManaged["AWS Managed<br/>Microsoft AD"]:::identity
    end

    subgraph Capa_Acceso ["CAPA 2: CENTRO DE ACCESO CENTRALIZADO"]
        direction TB
        IdentityCenter["<b>AWS IAM Identity Center</b><br/>(successor to AWS SSO)"]:::identity
        PermissionSets["Conjuntos de Permisos<br/>(Permission Sets)"]:::policy
        IdentityCenter <-->|Sincroniza Usuarios y Grupos| ExtIdP
        IdentityCenter <-->|Conecta| ADManaged
        IdentityCenter -->|Define| PermissionSets
    end

    subgraph Capa_Cuenta ["CAPA 3: DENTRO DE LA CUENTA DE AWS"]

        subgraph IAM_Local ["IAM Local de la Cuenta"]
            direction TB
            IAM_Roles["<b>Roles IAM</b><br/>(Asumidos centralmente o por servicios)"]:::compute
            STS["AWS STS<br/>Tokens Temporales"]:::compute
        end

        subgraph Recursos ["Recursos y Controles"]
            EC2["Instancia EC2"]:::compute
            S3["Bucket S3"]:::storage
            KMS["Clave KMS"]:::storage
        end

        subgraph Politicas_Locales ["Puntos de Control de Permisos"]
            IdentityPolicy["Identity-based<br/>Policies"]:::policy
            ResourcePolicy["Resource-based Policies<br/>(ej. S3 Bucket Policy)"]:::policy
            PermBoundary["<b>Permissions Boundary</b><br/>(Límite de Delegación)"]:::policy
        end

        EC2 -->|Asume| IAM_Roles
        STS -.->|Genera credenciales para| IAM_Roles

        IAM_Roles -->|Evaluado por| IdentityPolicy
        IAM_Roles -->|Evaluado por| PermBoundary
        ResourcePolicy -.->|Protege a| S3
        ResourcePolicy -.->|Protege a| KMS
    end

    subgraph Capa_App ["CAPA 4: IDENTIDADES PARA APLICACIONES (B2C/B2B)"]
        direction TB
        CUP["Cognito User Pools - CUP<br/>(Directorio de Usuarios de App)"]:::identity
        CIP["Cognito Identity Pools - CIP<br/>(Autorización a AWS)"]:::compute
        EndUsers["Usuarios Finales<br/>App Móvil/Web"]:::identity
        EndUsers -->|Login| CUP
        CUP -->|Token JWT| CIP
        CIP -->|Intercambia por| STS
    end

    subgraph Capa_Auditoria ["CAPA 5: AUDITORÍA, SEGURIDAD Y MÍNIMO PRIVILEGIO"]
        direction LR
        AccessAdvisor["IAM Access Advisor<br/>(Análisis de último uso)"]:::audit
        AccessAnalyzer["IAM Access Analyzer<br/>(Público / Cross-account)"]:::audit
        CredReport["Credential Report<br/>(Auditoría de Cuenta)"]:::audit
        CloudTrail["AWS CloudTrail<br/>(Registro de APIs)"]:::audit
    end

    IdentityCenter ==>|Despliega Roles y Políticas en| Capa_Cuenta
    OU ==>|Contiene| Capa_Cuenta
    SCP ==>|Gobierna| Capa_Cuenta
    Capa_Cuenta -.-> CloudTrail
    Capa_Cuenta -.-> AccessAdvisor
    Capa_Cuenta -.-> AccessAnalyzer`,
  teoria: [
    {
      id: "componentes",
      titulo: "Componentes de IAM",
      html: `
        <p><strong>IAM</strong> (Identity and Access Management) controla <em>quién</em> puede hacer <em>qué</em> en AWS. Es un servicio <strong>global</strong> y gratuito.</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Componente</th><th>Qué es</th><th>Credenciales</th><th>Ideal para</th></tr></thead>
          <tbody>
            <tr><td><strong>Usuarios</strong></td><td>Personas o aplicaciones</td><td>De larga duración</td><td>Acceso individual</td></tr>
            <tr><td><strong>Grupos</strong></td><td>Conjuntos de usuarios</td><td>Ninguna</td><td>Organizar por función</td></tr>
            <tr><td><strong>Roles</strong></td><td>Servicios AWS / acceso temporal</td><td>Temporales</td><td>EC2, Lambda, entre cuentas</td></tr>
            <tr><td><strong>Políticas</strong></td><td>Documentos JSON de permisos</td><td>Ninguna</td><td>Definir permisos</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>La cuenta <strong>raíz (root)</strong> nunca debe usarse para tareas diarias. Actívale MFA y guárdala a buen recaudo. Los <strong>grupos no se pueden anidar</strong> (un grupo no contiene otros grupos).</p></div></div>
        <h3>Límites a recordar</h3>
        <ul>
          <li>Máx. <strong>5.000 usuarios</strong> por cuenta · <strong>300 grupos</strong> por cuenta.</li>
          <li>Un usuario puede estar en máx. <strong>10 grupos</strong> y tener máx. <strong>2 claves de acceso</strong>.</li>
        </ul>`
    },
    {
      id: "politicas",
      titulo: "Políticas y lógica de evaluación",
      html: `
        <p>Una política IAM es un documento JSON con esta estructura:</p>
        <pre><code>{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow" | "Deny",
    "Action": "servicio:operación",
    "Resource": "arn:aws:...",
    "Condition": { ... }   // opcional
  }]
}</code></pre>
        <h3>Tipos de política</h3>
        <ul>
          <li><strong>Basadas en identidad:</strong> se asocian a usuarios, grupos o roles (qué puede hacer cada uno).</li>
          <li><strong>Basadas en recursos:</strong> se asocian al recurso (p. ej. bucket de S3, cola SQS, clave KMS) y <em>sí</em> pueden indicar principals de otras cuentas.</li>
        </ul>
        <h3>Orden de evaluación — ¡clave!</h3>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p><strong>Denegación explícita &gt; Permiso explícito &gt; Denegación implícita.</strong> Por defecto todo está denegado. Una denegación explícita <em>siempre</em> gana, aunque exista un permiso.</p></div></div>
        <p>Los <strong>límites de permisos (permissions boundaries)</strong> fijan el máximo que puede tener una identidad: permisos efectivos = política de identidad ∩ límite. Útiles para delegar administración sin riesgo de escalada de privilegios.</p>`
    },
    {
      id: "roles-sts",
      titulo: "Roles, STS y acceso temporal",
      html: `
        <p>Los <strong>roles</strong> otorgan credenciales <strong>temporales</strong> vía <strong>AWS STS</strong>. Un rol tiene dos políticas:</p>
        <ul>
          <li><strong>Política de confianza (trust policy):</strong> define <em>quién</em> puede asumir el rol (el principal).</li>
          <li><strong>Política de permisos:</strong> define <em>qué</em> puede hacer el rol.</li>
        </ul>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Para que un servicio (EC2, Lambda) acceda a otros recursos, <strong>usa siempre un rol</strong>, nunca guardes claves de acceso en la instancia o el código.</p></div></div>
        <h3>Federación de identidades</h3>
        <p>Permite entrar en AWS con las credenciales corporativas existentes (sin crear un usuario IAM por empleado):</p>
        <ul>
          <li><strong>SAML 2.0:</strong> integración con Active Directory / IdP corporativo.</li>
          <li><strong>OpenID Connect (OIDC):</strong> identidades web/sociales.</li>
        </ul>
        <h3>Acceso entre cuentas y a terceros</h3>
        <p>Crea un rol en tu cuenta cuya política de confianza permita a la cuenta externa asumirlo. Para proveedores externos añade un <strong>External ID</strong> que evita el problema del "confused deputy".</p>`
    },
    {
      id: "condiciones-mfa",
      titulo: "Condiciones, MFA y buenas prácticas",
      html: `
        <h3>Condiciones más importantes</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Condición</th><th>Uso</th></tr></thead>
          <tbody>
            <tr><td><code>aws:SourceIp</code></td><td>Restringir por dirección IP (p. ej. solo la oficina)</td></tr>
            <tr><td><code>aws:MultiFactorAuthPresent</code></td><td>Exigir MFA para operaciones sensibles</td></tr>
            <tr><td><code>aws:CurrentTime</code></td><td>Acceso solo en horario laboral</td></tr>
            <tr><td><code>aws:SecureTransport</code></td><td>Forzar HTTPS</td></tr>
            <tr><td><code>aws:RequestedRegion</code></td><td>Limitar la región donde se hace la petición (p. ej. solo eu-west-1)</td></tr>
            <tr><td><code>aws:PrincipalOrgID</code></td><td>Autorizar a toda una organización sin listar sus cuentas (en políticas de recurso)</td></tr>
            <tr><td><code>ec2:ResourceTag/<em>clave</em></code></td><td>Permitir/denegar según la etiqueta del recurso EC2 (p. ej. <code>ec2:ResourceTag/Env = dev</code>)</td></tr>
          </tbody>
        </table></div>
        <h3>URLs prefirmadas (pre-signed URLs)</h3>
        <p>Dan acceso <strong>temporal</strong> a un objeto de S3 sin que el usuario final tenga credenciales AWS. Ideal para descargas o subidas puntuales de usuarios no autenticados.</p>
        <h3>Buenas prácticas</h3>
        <ul>
          <li>Activa MFA en la cuenta raíz y no la uses a diario.</li>
          <li>Usa grupos para asignar permisos y aplica <strong>mínimo privilegio</strong>.</li>
          <li>Usa roles para EC2/Lambda; rota las credenciales; nunca subas claves a repositorios.</li>
          <li>Si expones claves por error: <strong>desactívalas y elimínalas de inmediato</strong>, revisa CloudTrail y genera nuevas.</li>
        </ul>`
    },
    {
      id: "organizations-scp",
      titulo: "AWS Organizations: OU y SCP",
      html: `
        <p><strong>AWS Organizations</strong> agrupa varias cuentas AWS bajo una <strong>cuenta de gestión</strong> (management account): facturación consolidada y gobierno centralizado.</p>
        <h3>Jerarquía: Raíz → OU → cuentas</h3>
        <p>Las cuentas se organizan en un árbol. Las <strong>Unidades Organizativas (OU)</strong> agrupan cuentas por función o entorno (p. ej. <em>Producción</em>, <em>Desarrollo</em>, <em>Seguridad</em>, <em>Sandbox</em>) para aplicarles políticas en bloque. Las OU se pueden <strong>anidar</strong> (hasta 5 niveles).</p>
        <h3>Service Control Policies (SCP)</h3>
        <ul>
          <li>Fijan el <strong>máximo de permisos</strong> (guardarraíl) de las cuentas de una OU o cuenta. <strong>No conceden permisos</strong>: solo limitan.</li>
          <li>Permiso efectivo = <strong>política IAM ∩ SCP</strong>: la acción debe estar permitida en <em>ambas</em>.</li>
          <li>Se <strong>heredan hacia abajo</strong>: una cuenta cumple las SCP de su OU y las de todas las OU superiores.</li>
          <li><strong>No afectan a la cuenta de gestión</strong> (por eso no conviene alojar cargas en ella) ni a los <em>service-linked roles</em>.</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Una SCP es un <strong>filtro</strong>, no una concesión. Aunque una SCP "permita" un servicio, la identidad sigue necesitando una política IAM que le conceda ese permiso.</p></div></div>
        <p>Casos típicos: restringir regiones (<code>aws:RequestedRegion</code>), exigir cifrado, impedir <code>organizations:LeaveOrganization</code>, proteger CloudTrail/Config.</p>`
    },
    {
      id: "recursos-s3-limites",
      titulo: "Políticas basadas en recursos, S3 y límites de permisos",
      html: `
        <h3>¿Qué servicios admiten políticas basadas en recursos?</h3>
        <p>Se asocian al <em>recurso</em> y su gran ventaja es que <strong>pueden indicar principals de otras cuentas</strong> → acceso <strong>entre cuentas sin asumir rol</strong>. No todos los servicios las soportan; los más preguntados:</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Servicio</th><th>Política basada en recursos</th></tr></thead>
          <tbody>
            <tr><td><strong>S3</strong></td><td>Política de bucket (bucket policy)</td></tr>
            <tr><td><strong>SNS / SQS</strong></td><td>Política de acceso del topic / de la cola</td></tr>
            <tr><td><strong>Lambda</strong></td><td>Política de recursos de la función o capa</td></tr>
            <tr><td><strong>KMS</strong></td><td>Política de clave (key policy)</td></tr>
            <tr><td><strong>CloudWatch Logs</strong></td><td>Resource policy (deja que otros servicios escriban logs)</td></tr>
            <tr><td>EventBridge, Secrets Manager, ECR, API Gateway, EFS, VPC endpoints</td><td>También la admiten</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>En una política de recurso, <code>aws:PrincipalOrgID</code> autoriza a <strong>toda la organización</strong> sin listar cada cuenta (y sí incluye la cuenta de gestión).</p></div></div>
        <h3>S3: política a nivel de bucket vs a nivel de objeto</h3>
        <p>No existe una "política de objeto" aparte: la <strong>política de bucket controla ambos niveles</strong> según el ARN del <code>Resource</code>.</p>
        <ul>
          <li><strong>Acciones de bucket</strong> (<code>s3:ListBucket</code>, <code>s3:GetBucketPolicy</code>) → Resource = <code>arn:aws:s3:::mi-bucket</code> (sin <code>/*</code>).</li>
          <li><strong>Acciones de objeto</strong> (<code>s3:GetObject</code>, <code>s3:PutObject</code>, <code>s3:DeleteObject</code>) → Resource = <code>arn:aws:s3:::mi-bucket/*</code> (o un prefijo <code>.../carpeta/*</code>).</li>
        </ul>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>Trampa clásica: <code>s3:ListBucket</code> es permiso <strong>de bucket</strong>; apúntalo al ARN del bucket, <strong>no</strong> a <code>/*</code>. Las ACL (heredadas) actúan a nivel de bucket y de objeto, pero AWS recomienda desactivarlas (<em>Bucket owner enforced</em>) y usar políticas.</p></div></div>
        <h3>Límites de permisos (permissions boundaries)</h3>
        <p>Política gestionada que se adjunta a <strong>una identidad IAM concreta</strong> (usuario o rol) y fija su <strong>techo</strong> de permisos. Por sí sola no concede nada: permiso efectivo = <strong>política de identidad ∩ límite</strong>.</p>
        <p>Uso típico: <strong>delegación segura</strong> — dejar que un administrador junior cree roles/usuarios sin que puedan escalar privilegios por encima del límite.</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Mecanismo</th><th>Alcance</th><th>¿Concede permisos?</th></tr></thead>
          <tbody>
            <tr><td>Política de identidad</td><td>Usuario / grupo / rol</td><td>Sí</td></tr>
            <tr><td>Política de recurso</td><td>El recurso (S3, SQS…)</td><td>Sí (admite otras cuentas)</td></tr>
            <tr><td>Límite de permisos</td><td>Una identidad IAM</td><td>No, solo limita</td></tr>
            <tr><td>SCP</td><td>Cuenta / OU entera</td><td>No, solo limita</td></tr>
          </tbody>
        </table></div>`
    },
    {
      id: "herramientas-integracion",
      titulo: "Herramientas de control e integración con IAM",
      html: `
        <h3>Amazon Cognito: User Pools (CUP) vs Identity Pools (CIP)</h3>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>User Pool (CUP)</th><th>Identity Pool (CIP)</th></tr></thead>
          <tbody>
            <tr><td>Para qué</td><td>Autenticación: directorio de usuarios de tu app (registro/login, MFA, federación social/SAML/OIDC)</td><td>Autorización: canjea una identidad por <strong>credenciales AWS temporales</strong> (vía STS)</td></tr>
            <tr><td>Devuelve</td><td>Tokens JWT (quién eres)</td><td>Credenciales AWS para acceder a S3, DynamoDB… (qué puedes tocar)</td></tr>
            <tr><td>Invitados</td><td>No</td><td>Sí (acceso guest)</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p><strong>CUP = quién eres; CIP = qué puedes hacer en AWS.</strong> Se suelen combinar: el user pool autentica y el identity pool entrega las credenciales AWS.</p></div></div>
        <h3>IAM Identity Center (antes AWS SSO)</h3>
        <p>Acceso <strong>centralizado de la plantilla</strong> a <strong>varias cuentas</strong> de la organización y a apps SaaS con un único inicio de sesión. Usa su directorio propio o un IdP externo (AD, Okta, Entra ID) vía SAML. Los <strong>permission sets</strong> se despliegan como roles en cada cuenta. Es la opción recomendada frente a usuarios IAM de larga duración para el acceso humano.</p>
        <h3>AWS Directory Service (AD gestionado)</h3>
        <ul>
          <li><strong>AWS Managed Microsoft AD:</strong> un Active Directory real gestionado en AWS; para cargas que dependen de AD (Windows, SQL Server, RDS for SQL Server) y para confianzas con el AD on-premises.</li>
          <li><strong>AD Connector:</strong> redirige la autenticación al AD on-premises (no almacena usuarios en AWS).</li>
          <li><strong>Simple AD:</strong> directorio pequeño/básico compatible con AD, sin funciones avanzadas.</li>
        </ul>
        <h3>AWS Control Tower</h3>
        <p>Configura y gobierna un entorno <strong>multicuenta</strong> seguro (landing zone) sobre Organizations, con buenas prácticas: <strong>controls/guardrails</strong> (preventivos con SCP, detectivos con Config), <strong>Account Factory</strong> para aprovisionar cuentas estandarizadas y un panel de cumplimiento.</p>
        <h3>Auditoría de IAM: Credential Report y Access Advisor</h3>
        <ul>
          <li><strong>Credential Report:</strong> informe CSV a nivel de cuenta con todos los usuarios y el estado de sus credenciales (edad de las claves, MFA, contraseña, último uso). Para auditoría y cumplimiento (uno cada 4 h como máximo).</li>
          <li><strong>Access Advisor</strong> (datos de último acceso a servicios): muestra qué servicios ha usado realmente una identidad y cuándo, para <strong>recortar permisos hacia el mínimo privilegio</strong>.</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>No confundir: <strong>Access Advisor</strong> ayuda a quitar permisos no usados; <strong>IAM Access Analyzer</strong> detecta recursos compartidos con entidades <em>externas</em> a tu zona de confianza.</p></div></div>`
    }
  ],
  preguntas: [
    {
      pregunta: "Una aplicación en instancias EC2 necesita acceder a objetos de un bucket de S3. ¿Cuál es la forma MÁS segura de conceder ese acceso?",
      opciones: [
        "Crear un usuario IAM con acceso programático y guardar sus claves en la instancia",
        "Crear un rol IAM con permisos sobre S3 y asociarlo a la instancia EC2",
        "Hacer público el bucket y permitir acceso anónimo",
        "Usar las credenciales de la cuenta raíz en la instancia"
      ],
      correctas: [1],
      explicacion: "Los roles IAM proporcionan credenciales temporales que rotan automáticamente, sin gestionar credenciales de larga duración. Es la práctica recomendada para instancias EC2."
    },
    {
      pregunta: "Hay que dar acceso temporal a auditores externos para revisar logs en S3, y ese acceso debe caducar a los 7 días. ¿Mejor solución?",
      opciones: [
        "Crear usuarios IAM para los auditores y borrarlos a los 7 días",
        "Crear roles IAM y dar a los auditores credenciales temporales mediante AWS STS",
        "Compartir las credenciales de la cuenta raíz durante 7 días",
        "Crear una URL prefirmada válida 7 días"
      ],
      correctas: [1],
      explicacion: "AWS STS genera credenciales temporales que caducan solas según la duración de sesión. Los roles se pueden asumir mediante federación, evitando la carga operativa de crear y borrar usuarios."
    },
    {
      pregunta: "Se quiere exigir que los usuarios IAM usen MFA antes de poder eliminar objetos de S3. ¿Cómo se aplica?",
      opciones: [
        "Habilitar MFA Delete en el bucket",
        "Crear una política IAM con una condición que requiera MFA",
        "Usar SCP de AWS Organizations",
        "Configurar una política de bucket que requiera MFA"
      ],
      correctas: [1],
      explicacion: "La condición IAM aws:MultiFactorAuthPresent puede aplicarse a acciones concretas como s3:DeleteObject, siendo el enfoque estándar y más directo."
    },
    {
      pregunta: "Un equipo necesita acceso de solo lectura a EC2 siempre, pero acceso de escritura únicamente en horario laboral (9:00–17:00). ¿Cómo implementarlo?",
      opciones: [
        "Usar condiciones de política IAM basadas en tiempo",
        "Adjuntar/quitar políticas manualmente cada día",
        "Usar Lambda para modificar las políticas según la hora",
        "Crear dos grupos y mover a los usuarios entre ellos"
      ],
      correctas: [0],
      explicacion: "IAM admite condiciones basadas en tiempo con aws:CurrentTime (DateGreaterThan / DateLessThan), permitiendo escritura solo en el rango horario indicado y lectura siempre."
    },
    {
      pregunta: "Una empresa usa SAML 2.0 para que sus empleados accedan a AWS con sus credenciales de Active Directory corporativo. ¿Qué tipo de acceso es?",
      opciones: ["Acceso de usuario IAM", "Acceso con cuenta raíz", "Acceso federado", "Acceso programático"],
      correctas: [2],
      explicacion: "La federación permite acceder a AWS con credenciales corporativas existentes. El IdP genera una aserción SAML que STS intercambia por credenciales temporales, sin crear un usuario IAM por empleado."
    },
    {
      pregunta: "¿Cuál de estas afirmaciones sobre políticas IAM es correcta?",
      opciones: [
        "Las políticas basadas en identidad se asocian a los recursos",
        "Las políticas basadas en recursos se asocian a identidades IAM",
        "Las políticas basadas en identidad definen permisos para usuarios, grupos y roles",
        "Las políticas basadas en recursos no pueden indicar principals de otras cuentas"
      ],
      correctas: [2],
      explicacion: "Las políticas basadas en identidad se asocian a usuarios/grupos/roles. Las basadas en recursos se asocian al recurso (S3, KMS, Lambda) y sí admiten principals de otras cuentas."
    },
    {
      pregunta: "Una función Lambda necesita acceder a tablas de DynamoDB. ¿Cuál es la forma correcta de conceder los permisos?",
      opciones: [
        "Crear un usuario IAM para la función",
        "Crear un rol de ejecución (execution role) para la función",
        "Añadir permisos directamente a la función",
        "Usar una política basada en recursos en DynamoDB"
      ],
      correctas: [1],
      explicacion: "El rol de ejecución de Lambda define a qué puede acceder la función; el servicio Lambda lo asume al ejecutarse. Las funciones no pueden usar usuarios IAM."
    },
    {
      pregunta: "Un desarrollador subió por error claves de acceso de AWS a un repositorio público de GitHub. ¿Qué hacer de INMEDIATO?",
      opciones: [
        "Cambiar la contraseña del usuario IAM",
        "Borrar el repositorio de GitHub",
        "Desactivar y eliminar las claves de acceso expuestas",
        "Habilitar MFA en la cuenta"
      ],
      correctas: [2],
      explicacion: "Las credenciales expuestas deben desactivarse y eliminarse de inmediato para impedir su uso. Borrar el repo no ayuda si ya fue clonado/indexado, y la contraseña es independiente de las claves."
    },
    {
      pregunta: "¿Qué entidad de IAM puede tener a la vez política de confianza y política de permisos?",
      opciones: ["Usuario IAM", "Grupo IAM", "Rol IAM", "Política IAM"],
      correctas: [2],
      explicacion: "Solo los roles tienen política de confianza (quién puede asumirlo) y política de permisos (qué puede hacer). Usuarios y grupos no tienen política de confianza."
    },
    {
      pregunta: "Hay que dar a proveedores externos acceso a ciertos buckets de S3 sin crear usuarios IAM. ¿Mejor enfoque?",
      opciones: [
        "Compartir las credenciales de la cuenta raíz",
        "Crear roles IAM entre cuentas con External ID",
        "Hacer públicos los buckets",
        "Usar URLs prefirmadas de S3"
      ],
      correctas: [1],
      explicacion: "Los roles entre cuentas permiten que una cuenta externa acceda a los recursos. El External ID añade seguridad y evita el problema del 'confused deputy'."
    },
    {
      pregunta: "¿Cuál es el efecto por defecto cuando ninguna política IAM permite ni deniega explícitamente una acción?",
      opciones: ["Allow", "Deny", "Solicita aprobación", "Registra la acción"],
      correctas: [1],
      explicacion: "IAM aplica denegación implícita: todo está denegado salvo que se permita explícitamente. Orden: denegación explícita → permiso explícito → denegación implícita."
    },
    {
      pregunta: "¿Cuál es el propósito de los límites de permisos (permissions boundaries) de IAM?",
      opciones: [
        "Fijar los permisos máximos que puede tener una entidad IAM",
        "Conceder permisos adicionales por encima de las políticas",
        "Sustituir a las políticas IAM",
        "Cifrar las credenciales IAM"
      ],
      correctas: [0],
      explicacion: "Los límites de permisos establecen el techo de permisos: aunque la política de identidad permita más, el límite lo restringe. Permisos efectivos = política ∩ límite."
    },
    {
      pregunta: "Hay que dar acceso temporal a objetos de S3 a usuarios no autenticados durante 1 hora. ¿Qué usar?",
      opciones: ["Credenciales de usuario IAM", "URLs prefirmadas de S3", "Política de bucket de S3", "Un rol IAM"],
      correctas: [1],
      explicacion: "Las URLs prefirmadas conceden acceso limitado en el tiempo a un objeto sin que el usuario final necesite credenciales AWS; caducan tras la duración indicada."
    },
    {
      pregunta: "Una empresa quiere impedir que TODAS las cuentas de la OU 'Producción' usen regiones fuera de eu-west-1, sin que los administradores de cada cuenta puedan saltárselo. ¿Qué usar?",
      opciones: [
        "Una política IAM en cada cuenta con condición aws:RequestedRegion",
        "Una SCP en la OU que deniegue acciones fuera de eu-west-1",
        "Un límite de permisos en cada rol",
        "Una regla de AWS Config sobre la región"
      ],
      correctas: [1],
      explicacion: "Las SCP son guardarraíles centralizados que los administradores de las cuentas miembro no pueden anular, y se heredan por toda la OU. Una política IAM la puede cambiar el admin de la cuenta, un límite de permisos solo afecta a una identidad y Config es detectivo, no preventivo."
    },
    {
      pregunta: "Se quiere permitir que cualquier cuenta de la organización acceda a una cola SQS, sin tener que listar cada ID de cuenta y manteniéndolo al día. ¿Cómo?",
      opciones: [
        "Añadir cada cuenta como Principal en la política de la cola",
        "Usar una política de recurso en la cola con la condición aws:PrincipalOrgID",
        "Crear un usuario IAM compartido",
        "Hacer la cola pública"
      ],
      correctas: [1],
      explicacion: "aws:PrincipalOrgID en la política basada en recursos autoriza a toda la organización con un solo valor (el ID de la organización), sin enumerar cuentas; se actualiza solo al añadir cuentas nuevas."
    },
    {
      pregunta: "¿Cuál de estos servicios permite conceder acceso entre cuentas mediante una política basada en recursos asociada directamente al recurso?",
      opciones: ["Amazon EC2", "Amazon S3", "Amazon RDS", "Amazon EBS"],
      correctas: [1],
      explicacion: "S3 admite políticas de bucket (basadas en recursos) que pueden indicar principals de otras cuentas. Servicios como S3, SNS, SQS, Lambda, KMS o CloudWatch Logs las soportan; EC2, RDS o EBS no usan políticas basadas en recursos."
    },
    {
      pregunta: "En una política de bucket de S3, ¿qué ARN de Resource corresponde a la acción s3:ListBucket?",
      opciones: [
        "arn:aws:s3:::mi-bucket/*",
        "arn:aws:s3:::mi-bucket",
        "Ambos ARNs a la vez",
        "arn:aws:s3:::*/mi-bucket"
      ],
      correctas: [1],
      explicacion: "s3:ListBucket es un permiso a nivel de bucket, así que su Resource es el ARN del bucket (sin /*). Las acciones sobre objetos (GetObject, PutObject) sí usan el ARN con /*."
    },
    {
      pregunta: "Se quiere dejar que un administrador junior cree roles IAM, garantizando que esos roles nunca tengan más permisos que un conjunto máximo definido. ¿Qué mecanismo aplica ese techo a cada identidad creada?",
      opciones: [
        "Una SCP",
        "Un límite de permisos (permissions boundary)",
        "Una política de recurso",
        "Una URL prefirmada"
      ],
      correctas: [1],
      explicacion: "El límite de permisos fija el techo de una identidad IAM concreta: aunque su política conceda más, el permiso efectivo es la intersección. La SCP también limita, pero a nivel de cuenta/OU entera, no por identidad."
    },
    {
      pregunta: "Una app móvil debe autenticar a sus usuarios y, tras el login, darles acceso temporal a un bucket S3 propio de cada usuario. ¿Qué combinación de Cognito usar?",
      opciones: [
        "Solo un User Pool",
        "Solo un Identity Pool",
        "User Pool para autenticar + Identity Pool para obtener credenciales AWS temporales",
        "Un rol IAM por usuario"
      ],
      correctas: [2],
      explicacion: "El User Pool (CUP) autentica y emite tokens; el Identity Pool (CIP) canjea ese token por credenciales AWS temporales vía STS para acceder a S3. CUP = quién eres, CIP = qué puedes tocar en AWS."
    },
    {
      pregunta: "Una organización con 40 cuentas AWS quiere que sus empleados inicien sesión una vez y accedan a las cuentas que les correspondan, integrándose con su IdP corporativo. ¿Qué servicio es el más adecuado?",
      opciones: [
        "Crear usuarios IAM en cada cuenta",
        "IAM Identity Center con permission sets",
        "Amazon Cognito Identity Pools",
        "AD Connector"
      ],
      correctas: [1],
      explicacion: "IAM Identity Center centraliza el acceso de la plantilla a múltiples cuentas de Organizations con SSO, se integra con un IdP externo vía SAML y despliega permisos como permission sets (roles) en cada cuenta, evitando usuarios IAM de larga duración."
    },
    {
      pregunta: "Una empresa migra a AWS aplicaciones Windows que dependen de Active Directory y quiere un AD gestionado en AWS con relación de confianza hacia su AD on-premises. ¿Qué opción de AWS Directory Service encaja?",
      opciones: [
        "Simple AD",
        "AD Connector",
        "AWS Managed Microsoft AD",
        "Amazon Cognito"
      ],
      correctas: [2],
      explicacion: "AWS Managed Microsoft AD es un Active Directory real gestionado en AWS, apto para cargas dependientes de AD y para establecer relaciones de confianza con el AD on-premises. AD Connector solo redirige la autenticación al AD local y Simple AD es básico."
    },
    {
      pregunta: "El equipo de seguridad quiere identificar y retirar permisos que un rol tiene concedidos pero que nunca ha utilizado. ¿Qué herramienta lo indica?",
      opciones: [
        "IAM Access Advisor (datos de último acceso a servicios)",
        "IAM Access Analyzer",
        "El Credential Report",
        "AWS CloudTrail Insights"
      ],
      correctas: [0],
      explicacion: "Access Advisor muestra qué servicios ha usado realmente la identidad y cuándo, lo que permite recortar hacia el mínimo privilegio. Access Analyzer, en cambio, detecta recursos compartidos con entidades externas; el Credential Report audita el estado de las credenciales."
    }
  ]
}
,

/* ===================== MÓDULO 03 ===================== */
{
  id: "03-computo",
  numero: 3,
  titulo: "Cómputo",
  resumen: "EC2 y modelos de precios, balanceadores de carga (ALB/NLB, sticky sessions, cross-zone), ENI e IP elástica, Auto Scaling, Lambda, contenedores y opciones híbridas.",
  peso: "~20–25%",
  tiempo: "60–90 min",
  teoria: [
    {
      id: "ec2-precios",
      titulo: "EC2: tipos de instancia y modelos de precios",
      html: `
        <p>Una instancia como <code>t3.medium</code> se lee como Familia(t) + Generación(3) + Tamaño(medium). Familias principales: <strong>C</strong> (cómputo), <strong>R</strong> (memoria), <strong>M</strong> (uso general), <strong>T</strong> (ráfaga/burstable), <strong>P/G</strong> (GPU), <strong>I/D/H</strong> (almacenamiento).</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Modelo</th><th>Descuento</th><th>Compromiso</th><th>Ideal para</th><th>Interrupción</th></tr></thead>
          <tbody>
            <tr><td>On-Demand</td><td>0%</td><td>Ninguno</td><td>Cargas cortas o impredecibles</td><td>No</td></tr>
            <tr><td>Spot</td><td>hasta 90%</td><td>Ninguno</td><td>Cargas tolerantes a fallos</td><td><strong>Sí (aviso 2 min)</strong></td></tr>
            <tr><td>Reserved (RI)</td><td>hasta 72%</td><td>1–3 años</td><td>Carga estable 24/7</td><td>No</td></tr>
            <tr><td>Savings Plans</td><td>hasta 66%</td><td>1–3 años</td><td>Uso flexible (EC2, Lambda, Fargate)</td><td>No</td></tr>
            <tr><td>Dedicated Hosts</td><td>—</td><td>Ninguno/1–3 años</td><td>Cumplimiento, BYOL de licencias</td><td>No</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p><strong>Atajo de examen:</strong> "tolera interrupciones y minimiza coste" → <strong>Spot</strong>. "24/7 estable" → <strong>Reserved</strong>. "servidor físico dedicado / BYOL" → <strong>Dedicated Hosts</strong>. Instancias <strong>T</strong> = rendimiento base con créditos de ráfaga.</p></div></div>`
    },
    {
      id: "balanceadores",
      titulo: "Balanceadores de carga (ELB)",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Tipo</th><th>Capa</th><th>Protocolo</th><th>Uso</th><th>Rasgo clave</th></tr></thead>
          <tbody>
            <tr><td><strong>ALB</strong></td><td>7</td><td>HTTP/HTTPS</td><td>Web, microservicios, contenedores</td><td>Enrutado por ruta/host/cabecera, targets Lambda</td></tr>
            <tr><td><strong>NLB</strong></td><td>4</td><td>TCP/UDP/TLS</td><td>Rendimiento extremo, protocolos no HTTP</td><td><strong>IP estática/EIP por AZ</strong>, millones de peticiones/s</td></tr>
            <tr><td><strong>GWLB</strong></td><td>3</td><td>IP</td><td>Appliances de seguridad</td><td>Firewalls, IDS/IPS de terceros</td></tr>
          </tbody>
        </table></div>
        <h3>ALB (Application Load Balancer) en detalle</h3>
        <ul>
          <li>Opera en <strong>capa 7</strong>: entiende HTTP/HTTPS y puede <strong>enrutar por ruta</strong> (<code>/api</code>, <code>/imagenes</code>), <strong>por host</strong> (<code>api.ejemplo.com</code>), por cabecera, método o query string.</li>
          <li>Tipos de <strong>target</strong>: instancias EC2, direcciones IP, <strong>funciones Lambda</strong> y contenedores (ECS/EKS).</li>
          <li>Soporta <strong>WebSocket</strong> y <strong>HTTP/2</strong>, redirecciones, respuestas fijas y <strong>varios certificados TLS</strong> en un mismo listener con <strong>SNI</strong>.</li>
          <li>Se integra con <strong>AWS WAF</strong> (filtrado a nivel de aplicación) y con <strong>Cognito/OIDC</strong> para autenticar usuarios antes de llegar al backend.</li>
        </ul>
        <h3>NLB (Network Load Balancer) en detalle</h3>
        <ul>
          <li>Opera en <strong>capa 4</strong> (TCP/UDP/TLS): elígelo cuando pidan <strong>rendimiento extremo</strong> (millones de peticiones/s, latencia de microsegundos) o <strong>protocolos que no son HTTP</strong>.</li>
          <li>Ofrece una <strong>IP estática por AZ</strong> (y puedes asociarle una <strong>Elastic IP</strong>), útil cuando el cliente necesita fijar la IP de destino en un firewall (allow-list).</li>
          <li><strong>Preserva la IP de origen</strong> del cliente y es el frontal de <strong>PrivateLink</strong> (exponer un servicio de forma privada a otras VPC/cuentas).</li>
        </ul>
        <h3>Sticky sessions (afinidad de sesión)</h3>
        <p>Hacen que un mismo cliente vaya siempre al <strong>mismo target</strong>, útil si el estado de sesión se guarda en la instancia. El ALB usa una <strong>cookie</strong> (generada por él, <em>duration-based</em>, o propia de la app, <em>application-based</em>); el NLB fija la afinidad por <strong>IP de origen</strong>.</p>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Las sticky sessions son un parche: si el target falla, se pierde la sesión. Lo recomendado es guardar la sesión en un almacén <strong>externo</strong> (ElastiCache/DynamoDB) y dejar la arquitectura sin estado.</p></div></div>
        <h3>Balanceo entre zonas (cross-zone load balancing)</h3>
        <p>Con cross-zone <strong>activado</strong>, cada nodo del balanceador reparte el tráfico entre los targets de <strong>todas las AZ</strong> por igual; <strong>desactivado</strong>, solo reparte entre los de su propia AZ (puede desequilibrar la carga si hay distinto número de targets por AZ).</p>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>ALB</th><th>NLB</th></tr></thead>
          <tbody>
            <tr><td>Por defecto</td><td><strong>Activado</strong> (siempre)</td><td>Desactivado</td></tr>
            <tr><td>Coste entre AZ</td><td>Gratis</td><td>Se cobra transferencia entre AZ si se activa</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p><strong>ALB</strong> para enrutar por ruta/host o autenticar con Cognito/WAF. <strong>NLB</strong> cuando pidan IP estática/EIP, TCP/UDP, preservar la IP de origen o rendimiento extremo.</p></div></div>`
    },
    {
      id: "eni-eip",
      titulo: "ENI e IP elástica",
      html: `
        <h3>ENI (Elastic Network Interface)</h3>
        <p>Una <strong>ENI</strong> es una <strong>tarjeta de red virtual</strong> que se conecta a una instancia dentro de una subred (una AZ). Cada ENI puede tener:</p>
        <ul>
          <li>Una <strong>IP privada principal</strong> (y varias secundarias) del rango de la subred.</li>
          <li>Una <strong>IP elástica</strong> y/o una IP pública, una <strong>MAC</strong> propia y uno o varios <strong>grupos de seguridad</strong>.</li>
        </ul>
        <p>Una ENI se puede <strong>desasociar de una instancia y asociar a otra</strong> (en la misma AZ), moviendo con ella su IP y su configuración de red: útil para <strong>failover</strong> (IP flotante entre un nodo activo y uno de respaldo) o para tener una <strong>interfaz de gestión</strong> separada.</p>
        <h3>IP elástica (Elastic IP)</h3>
        <ul>
          <li>Es una <strong>IPv4 pública estática</strong> asociada a tu cuenta que puedes <strong>remapear</strong> entre instancias o ENI en segundos (enmascara el fallo de una instancia reasignándola a otra).</li>
          <li>Sirve cuando necesitas una <strong>IP pública fija</strong> (allow-lists de terceros). Para no depender de EIP, suele ser mejor usar un <strong>DNS con Route 53</strong> o un balanceador delante.</li>
        </ul>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>AWS <strong>cobra por las IP elásticas</strong> (y por IPv4 públicas en general). Libera las que no uses. Una EIP vive en una sola región.</p></div></div>`
    },
    {
      id: "autoscaling",
      titulo: "Auto Scaling",
      html: `
        <p>Un grupo de Auto Scaling (ASG) mantiene la <strong>capacidad deseada</strong> definida por Mín / Deseado / Máx. Si terminas instancias manualmente, el ASG lanza otras para volver al deseado.</p>
        <h3>Políticas de escalado</h3>
        <ul>
          <li><strong>Seguimiento de destino (Target Tracking):</strong> "mantén la CPU al 50%". La más sencilla y habitual (reactiva).</li>
          <li><strong>Por pasos (Step):</strong> distintos umbrales añaden distinto número de instancias.</li>
          <li><strong>Programado (Scheduled):</strong> para patrones <em>predecibles</em> ("+10 instancias los lunes a las 8:00"). Proactivo.</li>
          <li><strong>Predictivo:</strong> previsión basada en ML.</li>
        </ul>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Usa <strong>health checks del ELB</strong> (mejor que solo EC2) y un <strong>periodo de gracia (grace period)</strong> mayor que el arranque de la app para no terminar instancias antes de tiempo (por defecto 300 s).</p></div></div>`
    },
    {
      id: "serverless",
      titulo: "Serverless: Lambda, contenedores y orquestación",
      html: `
        <h3>AWS Lambda</h3>
        <p>Cómputo sin servidores, dirigido por eventos, con escalado automático y pago por petición + duración (GB-segundo). Límites clave:</p>
        <ul>
          <li>Tiempo máximo: <strong>15 minutos</strong> (por defecto 3 s, se aumenta).</li>
          <li>Memoria: 128 MB – <strong>10 GB</strong> (la CPU escala con la memoria).</li>
          <li>Escala de forma concurrente automáticamente (1.000 concurrentes por defecto).</li>
        </ul>
        <p>Disparadores típicos: API Gateway, eventos de S3, DynamoDB Streams, EventBridge, SNS, SQS.</p>
        <h3>Contenedores</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Servicio</th><th>Qué es</th></tr></thead>
          <tbody>
            <tr><td><strong>ECS</strong></td><td>Orquestador de contenedores nativo de AWS</td></tr>
            <tr><td><strong>EKS</strong></td><td>Kubernetes gestionado (AWS gestiona el control plane)</td></tr>
            <tr><td><strong>Fargate</strong></td><td>Contenedores sin servidor (sin gestionar EC2), sobre ECS o EKS</td></tr>
          </tbody>
        </table></div>
        <h3>Step Functions</h3>
        <p>Orquesta flujos serverless: coordina varias Lambda con reintentos, manejo de errores, ejecución en paralelo y lógica condicional (máquina de estados).</p>`
    },
    {
      id: "avanzado",
      titulo: "Placement groups, sesiones e híbrido",
      html: `
        <h3>Grupos de ubicación (placement groups)</h3>
        <ul>
          <li><strong>Cluster:</strong> instancias juntas en una AZ, baja latencia y alto rendimiento (HPC).</li>
          <li><strong>Spread:</strong> en racks distintos, máximo 7 por AZ; para instancias críticas.</li>
          <li><strong>Partition:</strong> apps distribuidas (Hadoop, Kafka, Cassandra).</li>
        </ul>
        <h3>Estado de sesión</h3>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Con varias instancias tras un ALB, guarda el estado de sesión en un almacén <strong>externo</strong> (ElastiCache o DynamoDB), no en disco local ni con <em>sticky sessions</em>: así cualquier instancia atiende cualquier petición y no se pierde al fallar una.</p></div></div>
        <h3>Opciones híbridas y de borde</h3>
        <ul>
          <li><strong>Outposts:</strong> infraestructura AWS en tu propio centro de datos (experiencia híbrida consistente).</li>
          <li><strong>Wavelength:</strong> cómputo en el borde de redes 5G (ultra baja latencia móvil).</li>
          <li><strong>AWS Batch:</strong> ejecución gestionada de trabajos por lotes con aprovisionamiento y planificación automáticos.</li>
        </ul>`
    }
  ],
  preguntas: [
    {
      pregunta: "Hay que ejecutar un trabajo por lotes que tolera interrupciones y debe minimizar costes. ¿Qué modelo de precios de EC2 usar?",
      opciones: ["Instancias On-Demand", "Instancias Reservadas", "Instancias Spot", "Dedicated Hosts"],
      correctas: [2],
      explicacion: "Spot ofrece hasta un 90% de descuento y puede interrumpirse con 2 minutos de aviso: ideal para cargas tolerantes a fallos como procesamiento por lotes, análisis o CI/CD."
    },
    {
      pregunta: "Una aplicación tiene picos de tráfico predecibles cada lunes a las 9:00. ¿Qué enfoque de Auto Scaling es MÁS rentable?",
      opciones: ["Seguimiento de destino", "Escalado simple", "Escalado por pasos", "Escalado programado"],
      correctas: [3],
      explicacion: "El escalado programado (scheduled) es proactivo: escala antes del pico según un horario definido, ideal para patrones predecibles. Los demás son reactivos."
    },
    {
      pregunta: "Una app web necesita alta disponibilidad multi-AZ con enrutado avanzado de tráfico HTTP/HTTPS. ¿Qué balanceador usar?",
      opciones: ["Classic Load Balancer", "Application Load Balancer", "Network Load Balancer", "Gateway Load Balancer"],
      correctas: [1],
      explicacion: "El ALB opera en capa 7 (HTTP/HTTPS) con enrutado avanzado por ruta, host o cabecera, soporte de WebSocket/HTTP-2 e integración con WAF y Cognito."
    },
    {
      pregunta: "Una app de microservicios necesita un balanceador capaz de millones de peticiones/s con latencia ultrabaja e IP estática. ¿Cuál usar?",
      opciones: ["Application Load Balancer", "Network Load Balancer", "Classic Load Balancer", "CloudFront"],
      correctas: [1],
      explicacion: "El NLB opera en capa 4 (TCP/UDP/TLS), gestiona millones de peticiones/s con latencia de microsegundos, ofrece IP estática por AZ y preserva la IP de origen."
    },
    {
      pregunta: "Se quiere ejecutar código en respuesta a eventos, sin gestionar servidores, que corra solo al dispararse y escale solo. ¿Qué servicio usar?",
      opciones: ["EC2 con Auto Scaling", "AWS Lambda", "Amazon ECS", "AWS Elastic Beanstalk"],
      correctas: [1],
      explicacion: "Lambda es cómputo serverless dirigido por eventos, con escalado automático y pago por tiempo de cómputo (por milisegundo), sin gestión de servidores."
    },
    {
      pregunta: "Se necesitan ejecutar contenedores Docker sin gestionar instancias EC2. ¿Qué opción usar?",
      opciones: ["ECS con tipo de lanzamiento EC2", "ECS con tipo de lanzamiento Fargate", "Amazon EKS autogestionado", "AWS Elastic Beanstalk"],
      correctas: [1],
      explicacion: "Fargate es la plataforma de contenedores sin servidor: no gestionas instancias EC2 y pagas por vCPU y memoria usadas. Funciona tanto con ECS como con EKS."
    },
    {
      pregunta: "Unas instancias EC2 necesitan conectividad de baja latencia y alto rendimiento entre ellas dentro del mismo clúster. ¿Qué grupo de ubicación usar?",
      opciones: ["Cluster Placement Group", "Spread Placement Group", "Partition Placement Group", "No se necesita ninguno"],
      correctas: [0],
      explicacion: "El Cluster Placement Group agrupa las instancias físicamente cercanas en una única AZ, logrando baja latencia y alto rendimiento de red (HPC, big data)."
    },
    {
      pregunta: "Se quiere desplegar una app web con escalado automático, balanceo y monitorización de salud sin gestionar la infraestructura. ¿Qué servicio usar?",
      opciones: ["AWS Lambda", "EC2 con Auto Scaling", "AWS Elastic Beanstalk", "Amazon Lightsail"],
      correctas: [2],
      explicacion: "Elastic Beanstalk es un PaaS: subes el código y aprovisiona automáticamente EC2, ALB, Auto Scaling y monitorización, manteniendo el control de los recursos."
    },
    {
      pregunta: "Una función Lambda expira a los 3 segundos al procesar archivos grandes. ¿Qué se debe cambiar?",
      opciones: [
        "Aumentar la memoria asignada",
        "Aumentar el ajuste de tiempo de espera (timeout)",
        "Usar capas (layers) de Lambda",
        "Cambiar a EC2"
      ],
      correctas: [1],
      explicacion: "El timeout por defecto es 3 s y puede subirse hasta 15 minutos. Es un ajuste independiente de la memoria."
    },
    {
      pregunta: "Se necesitan instancias EC2 en servidores físicos dedicados por requisitos de cumplimiento y BYOL. ¿Qué opción usar?",
      opciones: ["Dedicated Instances", "Dedicated Hosts", "Instancias Reservadas", "Instancias Spot"],
      correctas: [1],
      explicacion: "Los Dedicated Hosts asignan un servidor físico completo con visibilidad de sockets/núcleos y permiten BYOL (Windows Server, SQL Server), cumpliendo requisitos estrictos."
    },
    {
      pregunta: "Un ASG tiene 10 instancias y un administrador termina manualmente 3. ¿Qué ocurre después?",
      opciones: [
        "Auto Scaling termina 3 más",
        "Auto Scaling lanza 3 instancias nuevas",
        "Auto Scaling no hace nada",
        "Auto Scaling envía una alerta"
      ],
      correctas: [1],
      explicacion: "El ASG mantiene la capacidad deseada: si se terminan instancias, lanza otras para volver al número deseado."
    },
    {
      pregunta: "Una app por lotes usa funciones Lambda pero necesita coordinar varios pasos con manejo de errores y reintentos. ¿Qué servicio usar?",
      opciones: ["Amazon SQS", "Amazon SNS", "AWS Step Functions", "Amazon EventBridge"],
      correctas: [2],
      explicacion: "Step Functions orquesta flujos serverless como máquina de estados: coordina varias Lambda con reintentos, captura de errores, ejecución en paralelo y lógica condicional."
    },
    {
      pregunta: "Una app necesita rendimiento base de CPU con capacidad de ráfaga por encima del base cuando haga falta. ¿Qué tipo de instancia usar?",
      opciones: ["M5 (uso general)", "C5 (optimizada en cómputo)", "T3 (rendimiento en ráfaga)", "R5 (optimizada en memoria)"],
      correctas: [2],
      explicacion: "Las instancias T3/T4g son de rendimiento en ráfaga: acumulan créditos de CPU cuando están por debajo del base y los gastan al superar el base. Rentables para cargas variables."
    },
    {
      pregunta: "Una app web corre en varias instancias EC2 tras un ALB y debe mantener el estado de sesión. ¿Cómo gestionarlo?",
      opciones: [
        "Guardar la sesión en el almacenamiento local de cada instancia",
        "Habilitar sticky sessions en el ALB",
        "Guardar la sesión en Amazon ElastiCache o DynamoDB",
        "Usar NLB en lugar de ALB"
      ],
      correctas: [2],
      explicacion: "El almacenamiento externo de sesión (ElastiCache/DynamoDB) hace la arquitectura verdaderamente sin estado: cualquier instancia atiende cualquier petición y no se pierde la sesión al fallar una."
    },
    {
      pregunta: "Una empresa necesita ejecutar servicios de AWS en su propio centro de datos por residencia de datos, manteniendo una experiencia híbrida consistente. ¿Qué servicio usar?",
      opciones: ["AWS Outposts", "EC2 Dedicated Hosts", "AWS Snowball Edge", "AWS Direct Connect"],
      correctas: [0],
      explicacion: "Outposts lleva infraestructura y servicios nativos de AWS (EC2, EBS, RDS, ECS/EKS…) a tu centro de datos con un modelo operativo consistente. Direct Connect solo aporta conectividad."
    }
  ]
}
,

/* ===================== MÓDULO 04 ===================== */
{
  id: "04-almacenamiento",
  numero: 4,
  titulo: "Almacenamiento",
  resumen: "S3 (bucket/objeto/prefijo, clases, cifrado, ciclo de vida, seguridad y funciones como Select, CORS, URLs prefirmadas y Access Points); volúmenes EBS, almacenamiento efímero y sistemas de archivos EFS/FSx.",
  peso: "~15–20%",
  tiempo: "60–75 min",
  teoria: [
    {
      id: "tipos",
      titulo: "Tipos de almacenamiento",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Tipo</th><th>Servicio</th><th>Adjunto a</th><th>Persistente</th><th>Uso típico</th></tr></thead>
          <tbody>
            <tr><td>Objetos</td><td><strong>S3</strong></td><td>Acceso HTTP</td><td>Sí (multi-AZ)</td><td>Archivos, contenido estático, backups</td></tr>
            <tr><td>Bloque</td><td><strong>EBS</strong></td><td>1 instancia (1 AZ)*</td><td>Sí</td><td>Bases de datos, volumen de arranque</td></tr>
            <tr><td>Archivos</td><td><strong>EFS / FSx</strong></td><td>Muchas instancias</td><td>Sí (multi-AZ)</td><td>Sistemas de archivos compartidos</td></tr>
            <tr><td>Bloque efímero</td><td><strong>Instance Store</strong></td><td>1 instancia</td><td><strong>No</strong> (se pierde al parar)</td><td>Caché, datos temporales, máximo rendimiento</td></tr>
          </tbody>
        </table></div>
        <p style="font-size:.9rem;color:var(--muted)">* io1/io2 admiten multi-attach dentro de la misma AZ.</p>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Palabras clave: "compartido entre varias instancias" → <strong>EFS</strong> (no EBS). "temporal / se puede perder / caché" → <strong>Instance Store</strong>. "base de datos / persistente" → <strong>EBS</strong>.</p></div></div>`
    },
    {
      id: "conceptos-s3",
      titulo: "S3: bucket, objeto, clave y prefijo",
      html: `
        <p>Amazon S3 guarda <strong>objetos</strong> dentro de <strong>buckets</strong>. Es almacenamiento <strong>plano</strong> (no hay carpetas reales): la jerarquía es una convención de nombres.</p>
        <ul>
          <li><strong>Bucket:</strong> el contenedor. Su nombre es <strong>único a nivel global</strong> (en todo AWS) y vive en una <strong>región</strong> concreta.</li>
          <li><strong>Objeto:</strong> el archivo en sí (hasta <strong>5 TB</strong>) más sus metadatos. Cada objeto se identifica por su <strong>clave (key)</strong>.</li>
          <li><strong>Clave (key):</strong> el <strong>nombre completo</strong> del objeto dentro del bucket, p. ej. <code>facturas/2024/enero.pdf</code>. La URL resultante es <code>https://mi-bucket.s3.amazonaws.com/facturas/2024/enero.pdf</code>.</li>
          <li><strong>Prefijo (prefix):</strong> la parte de la clave antes del último <code>/</code> (<code>facturas/2024/</code>). No son carpetas reales, pero permiten <strong>organizar</strong> y <strong>filtrar</strong> (reglas de ciclo de vida, permisos, listados).</li>
        </ul>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>El rendimiento de S3 escala <strong>por prefijo</strong> (3.500 escrituras y 5.500 lecturas por segundo y prefijo). Repartir las claves en varios prefijos multiplica el rendimiento.</p></div></div>`
    },
    {
      id: "clases-s3",
      titulo: "Clases de almacenamiento de S3",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Clase</th><th>Recuperación</th><th>Dur. mínima</th><th>Uso</th></tr></thead>
          <tbody>
            <tr><td>Standard</td><td>Instantánea</td><td>—</td><td>Acceso frecuente</td></tr>
            <tr><td>Intelligent-Tiering</td><td>Instantánea</td><td>—</td><td>Patrón de acceso desconocido/cambiante</td></tr>
            <tr><td>Standard-IA</td><td>Instantánea</td><td>30 días</td><td>Acceso poco frecuente</td></tr>
            <tr><td>One Zone-IA</td><td>Instantánea</td><td>30 días</td><td>Poco frecuente y no crítico (1 AZ)</td></tr>
            <tr><td>Glacier Instant</td><td>Instantánea</td><td>90 días</td><td>Archivo con acceso inmediato</td></tr>
            <tr><td>Glacier Flexible</td><td>Min – horas</td><td>90 días</td><td>Archivo de acceso raro</td></tr>
            <tr><td>Glacier Deep Archive</td><td>12–48 h</td><td>180 días</td><td>Archivo a largo plazo (el más barato)</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>"IA" = <em>Infrequent Access</em>, no acceso lento: sigue siendo instantáneo. Para cumplimiento a 7 años con acceso muy raro → <strong>Glacier Deep Archive</strong> (el más barato). Patrón desconocido → <strong>Intelligent-Tiering</strong> (sin tarifas de recuperación).</p></div></div>`
    },
    {
      id: "funciones-s3",
      titulo: "Funciones clave de S3",
      html: `
        <ul>
          <li><strong>Versionado:</strong> guarda todas las versiones; el borrado crea un "delete marker" recuperable. Requisito para replicación.</li>
          <li><strong>Object Lock (WORM):</strong> impide borrar/sobrescribir objetos durante un periodo. Modo <em>Compliance</em> (ni root puede) o <em>Governance</em>. Para cumplimiento normativo.</li>
          <li><strong>Reglas de ciclo de vida:</strong> transiciones automáticas entre clases y expiración por fecha. Optimización de coste basada en reglas.</li>
          <li><strong>Replicación:</strong> <strong>CRR</strong> (entre regiones, para DR/latencia/cumplimiento) y <strong>SRR</strong> (misma región). Requiere versionado en ambos buckets.</li>
          <li><strong>Notificaciones de eventos:</strong> disparan Lambda, SQS o SNS al crear/borrar objetos (arquitecturas por eventos).</li>
          <li><strong>Transfer Acceleration:</strong> acelera <em>subidas</em> globales usando ubicaciones de borde.</li>
          <li><strong>Multipart Upload:</strong> obligatorio para objetos &gt; 5 GB, recomendado &gt; 100 MB; sube partes en paralelo. Tamaño máx. de objeto: 5 TB.</li>
        </ul>
        <h3>Cifrado en reposo</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Método</th><th>Gestión de claves</th><th>Cuándo</th></tr></thead>
          <tbody>
            <tr><td>SSE-S3</td><td>AWS las gestiona (AES-256)</td><td>Cifrado sencillo, opción por defecto</td></tr>
            <tr><td>SSE-KMS</td><td>AWS KMS</td><td>Auditoría (CloudTrail), rotación, permisos granulares</td></tr>
            <tr><td>SSE-C</td><td>El cliente aporta la clave</td><td>Quieres controlar las claves</td></tr>
            <tr><td>Cliente</td><td>El cliente cifra antes de subir</td><td>Control total</td></tr>
          </tbody>
        </table></div>
        <p>Para acceder a S3 desde una VPC sin internet ni NAT, usa un <strong>VPC Gateway Endpoint</strong> (gratuito, solo S3 y DynamoDB).</p>`
    },
    {
      id: "seguridad-s3",
      titulo: "Seguridad y control de acceso en S3",
      html: `
        <p>El acceso a S3 se decide combinando varios niveles (basta con que uno conceda y que ninguno deniegue explícitamente):</p>
        <h3>Políticas basadas en identidad (IAM)</h3>
        <p>Se adjuntan a un <strong>usuario, grupo o rol</strong> de IAM y definen qué acciones de S3 puede hacer ese principal y sobre qué recursos. Ideales cuando el control gira en torno a <strong>quién</strong> accede (dentro de tu cuenta).</p>
        <h3>Políticas basadas en recurso (bucket policy)</h3>
        <ul>
          <li>Se adjuntan al <strong>bucket</strong> (en JSON) y controlan el acceso al bucket y a sus objetos. Son la forma habitual de conceder acceso <strong>entre cuentas</strong> o de imponer condiciones globales.</li>
          <li>Casos típicos: exigir cifrado en la subida (<code>s3:x-amz-server-side-encryption</code>), forzar HTTPS (<code>aws:SecureTransport</code>) o restringir por VPC endpoint o IP de origen.</li>
        </ul>
        <h3>ACL de bucket y de objeto (heredado)</h3>
        <p>Las <strong>ACL</strong> son un mecanismo antiguo y de grano grueso que concede permisos a nivel de bucket o de objeto individual. AWS <strong>recomienda desactivarlas</strong> con <strong>S3 Object Ownership</strong> (opción "Bucket owner enforced"), para gobernarlo todo solo con políticas.</p>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Regla práctica: <strong>políticas de identidad (IAM)</strong> para "quién de mi cuenta", <strong>bucket policy</strong> para acceso entre cuentas o condiciones globales, y <strong>evita las ACL</strong>. Mantén el <strong>Block Public Access</strong> activado salvo que necesites explícitamente contenido público.</p></div></div>`
    },
    {
      id: "s3-avanzado",
      titulo: "S3 Select, CORS, URLs prefirmadas y Access Points",
      html: `
        <h3>S3 Select y Glacier Select</h3>
        <p>Permiten recuperar <strong>solo un subconjunto</strong> de los datos de un objeto usando <strong>SQL</strong> (sobre CSV, JSON o Parquet), en vez de descargar el objeto entero: reduce datos transferidos y coste. <strong>Glacier Select</strong> hace lo mismo directamente sobre objetos archivados en Glacier.</p>
        <h3>CORS (Cross-Origin Resource Sharing)</h3>
        <p>Configuración que permite que una web servida desde un <strong>origen</strong> (dominio) haga peticiones a un bucket de <strong>otro origen</strong>. Sin la regla CORS adecuada en el bucket, el navegador bloquea esas peticiones cruzadas.</p>
        <h3>URLs prefirmadas (pre-signed URLs)</h3>
        <p>Una URL <strong>temporal</strong> que concede acceso a un objeto (subida o descarga) <strong>con los permisos de quien la genera</strong> y una <strong>caducidad</strong>. Ideal para dar acceso puntual a un objeto privado sin hacerlo público ni crear usuarios (p. ej. "descarga esta factura durante 15 minutos").</p>
        <h3>Puntos de acceso (Access Points)</h3>
        <ul>
          <li>Endpoints con <strong>nombre y política propios</strong> para un bucket compartido: en vez de una bucket policy gigante, cada aplicación o equipo usa su <strong>propio access point</strong> con permisos acotados.</li>
          <li>Pueden restringirse a una <strong>VPC</strong> (acceso solo privado). Los <strong>Multi-Region Access Points</strong> dan un único endpoint global que enruta a la copia de S3 más cercana.</li>
        </ul>`
    },
    {
      id: "ebs",
      titulo: "EBS: volúmenes y snapshots",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Tipo</th><th>IOPS</th><th>Rendimiento</th><th>Uso</th></tr></thead>
          <tbody>
            <tr><td><strong>gp3</strong> / gp2</td><td>16.000</td><td>1.000 MB/s</td><td>Uso general, arranque</td></tr>
            <tr><td><strong>io2</strong> / io1</td><td>64.000+</td><td>1.000 MB/s</td><td>Bases de datos críticas, alto IOPS</td></tr>
            <tr><td>st1</td><td>500</td><td>500 MB/s</td><td>Big data, logs (rendimiento secuencial)</td></tr>
            <tr><td>sc1</td><td>250</td><td>250 MB/s</td><td>Datos fríos, acceso poco frecuente</td></tr>
          </tbody>
        </table></div>
        <h3>Snapshots</h3>
        <ul>
          <li>Copias <strong>incrementales</strong> (solo bloques cambiados), almacenadas en S3 y gestionadas por AWS (multi-AZ).</li>
          <li>Se pueden copiar entre regiones, crear una AMI, o cifrar durante la copia.</li>
          <li>EBS es de una sola AZ; para mover a otra AZ, haz snapshot y restaura allí.</li>
          <li><strong>EBS Snapshot Archive:</strong> hasta 75% más barato para snapshots de larga retención (restauración en 24–72 h).</li>
        </ul>`
    },
    {
      id: "archivos",
      titulo: "Sistemas de archivos: EFS y FSx",
      html: `
        <h3>Amazon EFS</h3>
        <ul>
          <li>Sistema de archivos <strong>NFS</strong> compartido, <strong>multi-AZ</strong> por defecto, escala automáticamente y solo pagas por lo usado.</li>
          <li>Solo <strong>Linux</strong>; miles de conexiones concurrentes.</li>
        </ul>
        <h3>Familia FSx</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Tipo</th><th>SO / Protocolo</th><th>Uso</th></tr></thead>
          <tbody>
            <tr><td>FSx for Windows</td><td>Windows / SMB</td><td>Apps Windows, integración con Active Directory</td></tr>
            <tr><td>FSx for Lustre</td><td>Linux / Lustre</td><td>HPC, machine learning, big data (integra con S3)</td></tr>
            <tr><td>FSx for NetApp ONTAP</td><td>Multiprotocolo NFS/SMB</td><td>NAS empresarial</td></tr>
            <tr><td>FSx for OpenZFS</td><td>Linux / NFS</td><td>Cargas Linux con snapshots</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Archivos compartidos: <strong>Windows/SMB → FSx for Windows</strong>; <strong>Linux/NFS → EFS</strong>; <strong>HPC/ML de máximo rendimiento → FSx for Lustre</strong>.</p></div></div>`
    }
  ],
  preguntas: [
    {
      pregunta: "Hay que almacenar datos de acceso frecuente con la menor latencia y mayor rendimiento; el coste no es lo prioritario. ¿Qué clase de S3 usar?",
      opciones: ["S3 Standard", "S3 Intelligent-Tiering", "S3 Standard-IA", "S3 One Zone-IA"],
      correctas: [0],
      explicacion: "S3 Standard ofrece latencia de milisegundos, alto rendimiento y 99,99% de disponibilidad; está diseñada para datos de acceso frecuente."
    },
    {
      pregunta: "Datos de cumplimiento que deben conservarse 7 años y se acceden 1–2 veces al año; el coste es crítico. ¿Solución MÁS rentable?",
      opciones: ["S3 Standard", "S3 Glacier Flexible Retrieval", "S3 Glacier Deep Archive", "S3 Intelligent-Tiering"],
      correctas: [2],
      explicacion: "Glacier Deep Archive es la clase más barata de S3, pensada para retención a largo plazo (7–10+ años) con recuperación de 12–48 h, aceptable para acceso muy raro."
    },
    {
      pregunta: "Una web sirve contenido estático (imágenes, CSS, JS) a usuarios globales desde S3. ¿MEJOR forma de mejorar rendimiento y reducir latencia?",
      opciones: [
        "Habilitar S3 Transfer Acceleration",
        "Usar CloudFront con S3 como origen",
        "Habilitar replicación entre regiones",
        "Usar la clase S3 Standard"
      ],
      correctas: [1],
      explicacion: "CloudFront (CDN) cachea el contenido en 400+ ubicaciones de borde cercanas al usuario, reduciendo latencia y descargando el bucket de origen. Transfer Acceleration acelera subidas, no descargas."
    },
    {
      pregunta: "Se necesita almacenamiento de bloque para una base de datos en EC2 que requiere IOPS altos y consistentes. ¿Qué opción usar?",
      opciones: ["Instance Store", "EBS gp3", "EBS Provisioned IOPS (io2)", "Amazon EFS"],
      correctas: [2],
      explicacion: "Los volúmenes io2 (Provisioned IOPS SSD) ofrecen IOPS altos y consistentes (hasta 64.000+, o 256.000 con Block Express) y 99,999% de durabilidad para bases de datos críticas."
    },
    {
      pregunta: "Una app necesita almacenamiento de archivos compartido accesible desde varias instancias EC2 en varias AZ mediante NFS. ¿Qué servicio usar?",
      opciones: ["Amazon EBS", "Amazon S3", "Amazon EFS", "Instance Store"],
      correctas: [2],
      explicacion: "EFS es un sistema de archivos NFS compartido, multi-AZ, con escalado automático y acceso concurrente desde miles de instancias Linux."
    },
    {
      pregunta: "Se quiere mover objetos de S3 a clases más baratas automáticamente según el patrón de acceso, sin gestionarlo manualmente. ¿Qué usar?",
      opciones: ["Reglas de ciclo de vida", "S3 Intelligent-Tiering", "Scripts manuales", "Funciones Lambda"],
      correctas: [1],
      explicacion: "S3 Intelligent-Tiering mueve los objetos entre niveles automáticamente según el acceso, sin tarifas de recuperación (solo una pequeña tarifa de monitorización). Ideal para patrones desconocidos o cambiantes."
    },
    {
      pregunta: "Hay que cifrar objetos de S3 en reposo y se quiere que AWS gestione las claves de forma sencilla. ¿Qué método usar?",
      opciones: ["SSE-C (claves del cliente)", "SSE-S3 (claves gestionadas por S3)", "SSE-KMS", "Cifrado del lado del cliente"],
      correctas: [1],
      explicacion: "SSE-S3 usa claves gestionadas por AWS con AES-256, sin coste adicional: es la opción de cifrado más sencilla. SSE-KMS se elige cuando se necesita auditoría y control de claves."
    },
    {
      pregunta: "Se necesitan replicar objetos de S3 de us-east-1 a eu-west-1 para recuperación ante desastres. ¿Qué función habilitar?",
      opciones: ["Versionado de S3", "Replicación entre regiones (CRR)", "Replicación en la misma región (SRR)", "Transfer Acceleration"],
      correctas: [1],
      explicacion: "CRR replica objetos de forma asíncrona entre regiones distintas (DR, cumplimiento, menor latencia). Requiere versionado habilitado en el bucket origen y destino."
    },
    {
      pregunta: "Una app genera datos temporales que necesitan almacenamiento de alto rendimiento y pueden perderse si la instancia se detiene. ¿Qué usar?",
      opciones: ["EBS gp3", "EBS io2", "Instance Store", "Amazon EFS"],
      correctas: [2],
      explicacion: "El Instance Store es almacenamiento efímero físicamente adjunto al host, con el mayor rendimiento de IOPS y sin coste adicional; los datos se pierden al parar/terminar la instancia."
    },
    {
      pregunta: "Se quiere poder recuperar objetos de S3 borrados durante 30 días. ¿Qué habilitar?",
      opciones: ["Reglas de ciclo de vida", "Versionado de S3", "S3 Object Lock", "MFA Delete"],
      correctas: [1],
      explicacion: "El versionado conserva todas las versiones; al borrar, se crea un delete marker y las versiones anteriores quedan recuperables, protegiendo frente a borrados accidentales."
    },
    {
      pregunta: "Una app Windows en EC2 necesita almacenamiento de archivos compartido por protocolo SMB. ¿Qué servicio usar?",
      opciones: ["Amazon EFS", "Amazon FSx for Windows File Server", "Amazon EBS", "Amazon S3"],
      correctas: [1],
      explicacion: "FSx for Windows File Server ofrece un sistema de archivos Windows nativo con SMB, integración con Active Directory y características NTFS, en despliegue multi-AZ."
    },
    {
      pregunta: "Se necesitan almacenar petabytes de datos para entrenamiento de ML con el mayor rendimiento posible. ¿Qué servicio es MÁS apropiado?",
      opciones: ["Amazon S3", "Amazon EFS", "Amazon FSx for Lustre", "Amazon EBS"],
      correctas: [2],
      explicacion: "FSx for Lustre está diseñado para HPC y ML: latencias submilisegundo, cientos de GB/s de rendimiento y millones de IOPS, con integración directa con S3."
    },
    {
      pregunta: "Se requiere que los objetos de S3 nunca puedan borrarse ni sobrescribirse por cumplimiento normativo. ¿Qué función usar?",
      opciones: ["Versionado de S3", "S3 Object Lock", "MFA Delete", "Reglas de ciclo de vida"],
      correctas: [1],
      explicacion: "S3 Object Lock aplica WORM (escribir una vez, leer muchas): impide borrar o sobrescribir durante el periodo de retención. En modo Compliance ni siquiera la cuenta raíz puede."
    },
    {
      pregunta: "Se quiere acceder a S3 desde instancias EC2 sin usar internet gateway ni NAT. ¿Qué configurar?",
      opciones: ["Conexión VPN", "AWS Direct Connect", "VPC Endpoint para S3 (Gateway Endpoint)", "Emparejamiento de VPC"],
      correctas: [2],
      explicacion: "Un Gateway Endpoint para S3 crea una conexión privada desde la VPC a S3 sin internet, sin coste de transferencia y con el tráfico dentro de la red de AWS."
    },
    {
      pregunta: "Objetos en S3 Standard: los accedidos en 30 días deben quedarse en Standard y los más antiguos moverse a Glacier. ¿Cómo automatizarlo?",
      opciones: ["S3 Intelligent-Tiering", "Reglas de ciclo de vida", "Función Lambda", "Migración manual"],
      correctas: [1],
      explicacion: "Las reglas de ciclo de vida automatizan transiciones por fecha (p. ej. a Glacier a los 30 días) y expiraciones, filtrando por prefijo o etiqueta, sin código."
    }
  ]
}
,

/* ===================== MÓDULO 05 ===================== */
{
  id: "05-bases-datos",
  numero: 5,
  titulo: "Bases de datos",
  resumen: "RDS y Aurora (endpoints, clonación, RDS Proxy, cifrado y acceso), alta disponibilidad y réplicas, DynamoDB, caché con ElastiCache (Redis vs Memcached y patrones), Redshift y bases especializadas.",
  peso: "~15–20%",
  tiempo: "60–75 min",
  teoria: [
    {
      id: "seleccion",
      titulo: "Elegir la base de datos correcta",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Necesidad</th><th>Servicio</th></tr></thead>
          <tbody>
            <tr><td>Relacional SQL gestionada</td><td><strong>RDS</strong> (o Aurora)</td></tr>
            <tr><td>NoSQL clave-valor / documento</td><td><strong>DynamoDB</strong></td></tr>
            <tr><td>Caché en memoria</td><td><strong>ElastiCache</strong> (Redis/Memcached)</td></tr>
            <tr><td>Almacén de datos / analítica (OLAP)</td><td><strong>Redshift</strong></td></tr>
            <tr><td>Grafos</td><td><strong>Neptune</strong></td></tr>
            <tr><td>Documentos compatibles con MongoDB</td><td><strong>DocumentDB</strong></td></tr>
            <tr><td>Libro contable inmutable</td><td><strong>QLDB</strong></td></tr>
            <tr><td>Compatible con Cassandra</td><td><strong>Keyspaces</strong></td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p><strong>Redshift es OLAP</strong> (analítica), no OLTP (transaccional). No lo uses para operaciones transaccionales.</p></div></div>`
    },
    {
      id: "rds-aurora",
      titulo: "RDS y Aurora",
      html: `
        <p><strong>RDS</strong> es un servicio gestionado de bases relacionales: MySQL, PostgreSQL, MariaDB, Oracle y SQL Server. AWS gestiona parches, backups y failover.</p>
        <h3>Amazon Aurora</h3>
        <ul>
          <li>Compatible con MySQL y PostgreSQL; <strong>5× más rápido que MySQL</strong> y 3× que PostgreSQL.</li>
          <li>Almacenamiento auto-escalable (10 GB → 128 TB), con <strong>6 copias en 3 AZ</strong> y auto-reparación.</li>
          <li>Hasta <strong>15 réplicas de lectura</strong>, failover automático &lt; 30 s y <strong>Backtrack</strong> (rebobinar sin restaurar).</li>
          <li><strong>Aurora Serverless:</strong> escala el cómputo automáticamente y pagas por segundo; ideal para cargas impredecibles o con inactividad.</li>
          <li><strong>Aurora Global Database:</strong> réplica entre regiones en &lt; 1 s, para apps globales y DR.</li>
        </ul>
        <h3>Endpoints de Aurora</h3>
        <ul>
          <li><strong>Cluster (writer):</strong> apunta siempre al nodo de <strong>escritura</strong>; sigue automáticamente el failover.</li>
          <li><strong>Reader:</strong> reparte las <strong>lecturas</strong> entre todas las réplicas (balanceo automático).</li>
          <li><strong>Custom (personalizado):</strong> un endpoint para un <strong>subconjunto</strong> de instancias que elijas (p. ej. dirigir la analítica a réplicas más grandes).</li>
          <li><strong>Instance:</strong> apunta a una instancia concreta (uso puntual/diagnóstico).</li>
        </ul>
        <h3>Otras capacidades de Aurora</h3>
        <ul>
          <li><strong>Clonación rápida (copy-on-write):</strong> crea una copia de la base de datos casi al instante y sin duplicar el almacenamiento (solo se copian los bloques que cambian). Ideal para montar entornos de prueba con datos de producción.</li>
          <li><strong>Aurora Machine Learning:</strong> integra <strong>SageMaker</strong> y <strong>Comprehend</strong> para invocar predicciones de ML <strong>desde SQL</strong>, sin mover los datos.</li>
          <li><strong>Aurora Multi-Master:</strong> permite <strong>varios nodos de escritura</strong> a la vez (disponibilidad de escritura continua). Es una opción especializada y con limitaciones; para la mayoría de casos basta con un writer + réplicas de lectura.</li>
        </ul>`
    },
    {
      id: "rds-seguridad",
      titulo: "RDS Proxy y seguridad de RDS/Aurora",
      html: `
        <h3>RDS Proxy</h3>
        <p>Un <strong>proxy de conexiones gestionado</strong> que se sitúa entre la aplicación y la base de datos (RDS/Aurora):</p>
        <ul>
          <li><strong>Agrupa y reutiliza conexiones (pooling):</strong> evita agotar las conexiones cuando hay muchos clientes, típico de <strong>Lambda</strong> y apps serverless con picos.</li>
          <li>Reduce el tiempo de <strong>failover</strong> (hasta ~66%) y ofrece un punto de conexión estable.</li>
          <li>Permite autenticación con <strong>IAM</strong> y guardar las credenciales en <strong>Secrets Manager</strong>.</li>
        </ul>
        <h3>Cifrado</h3>
        <ul>
          <li><strong>En reposo</strong> con <strong>KMS</strong>: debe activarse <strong>al crear</strong> la instancia. Para cifrar una BD existente, se restaura un snapshot cifrado en una instancia nueva. Cubre datos, backups automáticos, snapshots y réplicas.</li>
          <li><strong>En tránsito</strong> con <strong>SSL/TLS</strong> entre la aplicación y la base de datos.</li>
        </ul>
        <h3>Control de acceso</h3>
        <ul>
          <li><strong>Red:</strong> la BD vive en <strong>subredes privadas</strong>, protegida por <strong>grupos de seguridad</strong> (que permiten solo el SG de la capa de aplicación).</li>
          <li><strong>Permisos:</strong> <strong>IAM</strong> controla quién administra la instancia (acciones de la API), mientras que el acceso a los datos usa credenciales de BD o <strong>autenticación IAM</strong>.</li>
        </ul>`
    },
    {
      id: "ha-backups",
      titulo: "Multi-AZ, réplicas de lectura y backups",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>Multi-AZ</th><th>Réplicas de lectura</th></tr></thead>
          <tbody>
            <tr><td>Objetivo</td><td>Alta disponibilidad</td><td>Escalar lecturas</td></tr>
            <tr><td>Replicación</td><td>Síncrona</td><td>Asíncrona</td></tr>
            <tr><td>Failover</td><td>Automático (&lt; 2 min)</td><td>No automático</td></tr>
            <tr><td>Región</td><td>Misma región</td><td>Admite otras regiones</td></tr>
            <tr><td>¿Se puede leer del standby?</td><td><strong>No</strong></td><td>Sí (las réplicas son legibles)</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p><strong>Multi-AZ = disponibilidad</strong>; <strong>réplicas de lectura = rendimiento de lectura</strong>. El standby de Multi-AZ NO es legible (error clásico del examen).</p></div></div>
        <h3>Backups</h3>
        <ul>
          <li><strong>Backups automáticos:</strong> recuperación a un punto en el tiempo (retención 1–35 días). Se borran al eliminar la instancia.</li>
          <li><strong>Snapshots manuales:</strong> los inicia el usuario, se conservan indefinidamente y se pueden copiar a otra región.</li>
          <li>El cifrado en reposo (KMS) debe activarse al crear; no se puede cifrar una BD existente (crea una nueva desde snapshot).</li>
        </ul>`
    },
    {
      id: "dynamodb",
      titulo: "DynamoDB",
      html: `
        <p>Base <strong>NoSQL</strong> totalmente gestionada, serverless, con latencia de <strong>milisegundos de un solo dígito</strong> a cualquier escala y replicación multi-AZ integrada.</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Concepto</th><th>Descripción</th></tr></thead>
          <tbody>
            <tr><td>Clave de partición</td><td>Clave primaria (hash). Elige alta cardinalidad para evitar particiones "calientes"</td></tr>
            <tr><td>Clave de ordenación</td><td>Segunda clave opcional, para consultas por rango</td></tr>
            <tr><td>GSI</td><td>Índice secundario global: consultar por atributos que no son clave</td></tr>
            <tr><td>Streams</td><td>Captura de cambios; puede disparar Lambda</td></tr>
            <tr><td>DAX</td><td>Caché en memoria: latencia de <strong>microsegundos</strong></td></tr>
            <tr><td>Global Tables</td><td>Replicación multi-región activa-activa (lecturas globales rápidas)</td></tr>
          </tbody>
        </table></div>
        <p><strong>Modos de capacidad:</strong> <em>Provisioned</em> (RCU/WCU fijos, más barato si es predecible) u <em>On-Demand</em> (pago por petición, para tráfico impredecible). <strong>Consistencia:</strong> eventual (por defecto, más barata) o fuerte (refleja las últimas escrituras).</p>`
    },
    {
      id: "cache-dw",
      titulo: "ElastiCache, Redshift y migración",
      html: `
        <h3>ElastiCache</h3>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>Redis</th><th>Memcached</th></tr></thead>
          <tbody>
            <tr><td>Tipos de datos</td><td>Complejos (listas, sets, hashes, sorted sets)</td><td>Simples (strings/objetos)</td></tr>
            <tr><td>Persistencia / backup</td><td>Sí (snapshots)</td><td>No</td></tr>
            <tr><td>Replicación / Multi-AZ / failover</td><td>Sí</td><td>No</td></tr>
            <tr><td>Multi-hilo</td><td>No</td><td>Sí</td></tr>
            <tr><td>Escalado</td><td>Réplicas de lectura y sharding (cluster mode)</td><td>Horizontal añadiendo nodos</td></tr>
          </tbody>
        </table></div>
        <p>Se pone <strong>delante de la base de datos</strong> para reducir carga de lectura y acelerar respuestas.</p>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p><strong>Redis</strong> cuando pidan persistencia, alta disponibilidad (Multi-AZ/failover), réplicas o estructuras de datos ricas. <strong>Memcached</strong> para una caché simple, volátil y multinúcleo.</p></div></div>
        <h3>Seguridad de Redis</h3>
        <p>Redis admite <strong>cifrado en reposo y en tránsito (TLS)</strong> y autenticación mediante <strong>Redis AUTH</strong> (token/contraseña) o <strong>RBAC</strong> (usuarios con permisos). Memcached no ofrece estas capacidades de autenticación ni persistencia.</p>
        <h3>Patrones de caché</h3>
        <ul>
          <li><strong>Lazy loading (cache-aside):</strong> la app lee de la caché; si falla (miss), lee de la BD y <strong>guarda el resultado</strong> en la caché. Solo se cachea lo que se pide, pero el primer acceso es más lento y los datos pueden quedar obsoletos (se mitiga con <strong>TTL</strong>).</li>
          <li><strong>Write-through:</strong> cada <strong>escritura</strong> actualiza la BD <strong>y</strong> la caché a la vez. La caché siempre está fresca, pero también cachea datos que quizá no se lean.</li>
          <li><strong>Almacenamiento de sesión:</strong> guardar el estado de sesión de usuario en ElastiCache hace que la app web sea <strong>sin estado</strong> (cualquier instancia atiende cualquier petición tras un ALB).</li>
        </ul>
        <h3>Redshift</h3>
        <p>Almacén de datos (OLAP) con <strong>almacenamiento columnar</strong> y procesamiento masivamente paralelo (MPP), a escala de petabytes. <strong>Redshift Spectrum</strong> consulta datos directamente en S3.</p>
        <h3>Migración</h3>
        <p><strong>DMS</strong> (Database Migration Service) migra bases de datos a AWS con mínima interrupción; junto con <strong>SCT</strong> (Schema Conversion Tool) permite migrar entre motores distintos.</p>`
    }
  ],
  preguntas: [
    {
      pregunta: "Se necesita una base relacional con escalado automático, alta disponibilidad multi-AZ y failover automático, con mínima administración. ¿Qué servicio usar?",
      opciones: ["Amazon RDS MySQL", "Amazon Aurora", "Amazon DynamoDB", "Amazon Redshift"],
      correctas: [1],
      explicacion: "Aurora es compatible con MySQL/PostgreSQL, ofrece almacenamiento auto-escalable (hasta 128 TB), 6 copias en 3 AZ, failover automático < 30 s y opción serverless, con mínima administración."
    },
    {
      pregunta: "Una app requiere latencia inferior al milisegundo en lecturas/escrituras y escalado automático para millones de peticiones/s. ¿Qué base de datos usar?",
      opciones: ["Amazon RDS", "Amazon DynamoDB", "Amazon Aurora", "Amazon DocumentDB"],
      correctas: [1],
      explicacion: "DynamoDB es NoSQL totalmente gestionada con latencia de milisegundos de un solo dígito (microsegundos con DAX), escalado automático y replicación multi-AZ integrada."
    },
    {
      pregunta: "Se quieren cachear los resultados de consultas para reducir la carga de lectura sobre RDS y mejorar los tiempos de respuesta. ¿Qué servicio usar?",
      opciones: ["Amazon CloudFront", "Amazon ElastiCache", "DynamoDB Accelerator (DAX)", "Amazon S3"],
      correctas: [1],
      explicacion: "ElastiCache (Redis/Memcached) ofrece caché en memoria con latencia de microsegundos, reduciendo la carga sobre la base de datos (patrón cache-aside). DAX es específico de DynamoDB."
    },
    {
      pregunta: "Un almacén de datos requiere consultas analíticas complejas sobre petabytes de datos. ¿Qué servicio es MÁS apropiado?",
      opciones: ["Amazon RDS", "Amazon DynamoDB", "Amazon Redshift", "Amazon Aurora"],
      correctas: [2],
      explicacion: "Redshift es un almacén de datos (OLAP) con almacenamiento columnar y procesamiento masivamente paralelo a escala de petabytes, ideal para analítica y BI."
    },
    {
      pregunta: "Una aplicación MongoDB debe migrarse a AWS con cambios mínimos. ¿Qué servicio usar?",
      opciones: ["Amazon RDS", "Amazon DynamoDB", "Amazon DocumentDB", "Amazon Neptune"],
      correctas: [2],
      explicacion: "DocumentDB es una base documental compatible con MongoDB, totalmente gestionada, con drivers y herramientas de MongoDB compatibles."
    },
    {
      pregunta: "Una base RDS debe sobrevivir al fallo de una AZ con el mínimo tiempo de inactividad. ¿Qué configurar?",
      opciones: [
        "Añadir réplicas de lectura",
        "Habilitar el despliegue Multi-AZ",
        "Aumentar el tamaño de la instancia",
        "Habilitar Redshift"
      ],
      correctas: [1],
      explicacion: "Multi-AZ mantiene un standby con replicación síncrona y failover automático (< 2 min) ante el fallo de una AZ. Las réplicas de lectura son para escalar lecturas, no para failover automático."
    },
    {
      pregunta: "Una base de datos sufre mucho tráfico de lectura mientras las escrituras son normales. ¿Cómo escalar?",
      opciones: [
        "Habilitar Multi-AZ",
        "Añadir réplicas de lectura (hasta 5, o 15 en Aurora)",
        "Cambiar a Instance Store",
        "Aumentar la retención de backups"
      ],
      correctas: [1],
      explicacion: "Las réplicas de lectura descargan el tráfico de lectura mediante replicación asíncrona y son legibles. Multi-AZ no sirve para escalar lecturas (su standby no es legible)."
    },
    {
      pregunta: "El uso de una base de datos varía mucho y a veces queda inactiva. ¿Qué opción minimiza costes?",
      opciones: ["RDS Multi-AZ", "Aurora Serverless", "Redshift", "DynamoDB Provisioned"],
      correctas: [1],
      explicacion: "Aurora Serverless escala el cómputo automáticamente y cobra por segundo, pausándose en inactividad: ideal para cargas impredecibles o intermitentes."
    },
    {
      pregunta: "Usuarios de todo el mundo necesitan lecturas rápidas y de baja latencia de los mismos datos NoSQL. ¿Qué usar?",
      opciones: [
        "Réplicas de lectura de RDS",
        "DynamoDB Global Tables",
        "Redshift Spectrum",
        "Un único bucket de S3"
      ],
      correctas: [1],
      explicacion: "Las Global Tables de DynamoDB replican los datos entre varias regiones en modo activo-activo, ofreciendo lecturas locales de baja latencia en todo el mundo."
    },
    {
      pregunta: "Hay que recuperar una base RDS a un momento concreto de ayer. ¿Qué se necesita?",
      opciones: [
        "Snapshots manuales cada hora",
        "Backups automáticos (retención 1–35 días) y restauración a un punto en el tiempo",
        "Réplicas de lectura",
        "Multi-AZ"
      ],
      correctas: [1],
      explicacion: "Los backups automáticos de RDS guardan un backup diario y logs de transacciones que permiten la recuperación a un punto en el tiempo dentro del periodo de retención (1–35 días)."
    },
    {
      pregunta: "Una app de DynamoDB con mucha lectura necesita latencia de microsegundos mediante caché. ¿Qué añadir?",
      opciones: ["ElastiCache Memcached", "DynamoDB Accelerator (DAX)", "CloudFront", "Read Replicas"],
      correctas: [1],
      explicacion: "DAX es la caché en memoria específica de DynamoDB que reduce la latencia de milisegundos a microsegundos en cargas de lectura intensiva."
    },
    {
      pregunta: "Una app necesita una base de datos de grafos para modelar relaciones muy conectadas. ¿Qué servicio usar?",
      opciones: ["Amazon Neptune", "Amazon DynamoDB", "Amazon Redshift", "Amazon RDS"],
      correctas: [0],
      explicacion: "Amazon Neptune es la base de datos de grafos gestionada de AWS, idónea para datos altamente conectados (redes sociales, recomendaciones, detección de fraude)."
    },
    {
      pregunta: "Se necesita migrar una base de datos on-premises a RDS con la mínima interrupción, incluso entre motores distintos. ¿Qué herramientas usar?",
      opciones: [
        "Solo snapshots de EBS",
        "AWS DMS (y SCT para cambio de motor)",
        "S3 Transfer Acceleration",
        "CloudFront"
      ],
      correctas: [1],
      explicacion: "DMS migra bases de datos con mínima interrupción; combinado con SCT (Schema Conversion Tool) permite migrar entre motores heterogéneos."
    },
    {
      pregunta: "Para una tabla de DynamoDB con tráfico impredecible que a veces es muy alto, ¿qué modo de capacidad conviene?",
      opciones: ["Provisioned con RCU/WCU fijos", "On-Demand (pago por petición)", "Multi-AZ", "Reserved"],
      correctas: [1],
      explicacion: "El modo On-Demand cobra por petición y absorbe picos impredecibles sin planificar capacidad. Provisioned es más barato solo cuando el tráfico es predecible."
    }
  ]
}
,

/* ===================== MÓDULO 06 ===================== */
{
  id: "06-redes",
  numero: 6,
  titulo: "Redes y entrega de contenido",
  resumen: "VPC, subredes, grupos de seguridad y NACL (puertos efímeros), conectividad híbrida (VPC Peering, VPN Site-to-Site y CloudHub, Direct Connect, Transit Gateway), VPC endpoints, Route 53, CloudFront y Global Accelerator.",
  peso: "~20–25%",
  tiempo: "75–90 min",
  teoria: [
    {
      id: "panorama",
      titulo: "Panorama de red",
      html: `
        <p>Este módulo cubre la red privada en AWS (<strong>VPC</strong>), su seguridad (grupos de seguridad y NACL), la <strong>conectividad</strong> entre VPC y con on-premises (Peering, VPN, Direct Connect, Transit Gateway) y la <strong>entrega de contenido</strong> (Route 53, CloudFront, Global Accelerator). El siguiente diagrama sitúa las piezas principales.</p>
        <figure class="figure">
          <img src="img/global.png" alt="Visión global de una VPC: región, subredes pública y privada, IGW, NAT Gateway, NACL, VPC Endpoint, Flow Logs, Transit Gateway, VPC Peering, VPN y Direct Connect hacia un centro de datos." loading="lazy">
          <figcaption>Visión global: la VPC, su salida a internet, los endpoints y las vías de conexión híbrida (VPN, Direct Connect, Transit Gateway, Peering).</figcaption>
        </figure>`
    },
    {
      id: "vpc",
      titulo: "Componentes de una VPC",
      html: `
        <p>Una <strong>VPC</strong> es tu red privada virtual en AWS. Componentes clave:</p>
        <ul>
          <li><strong>Subredes:</strong> dividen la VPC en segmentos (públicos/privados). Una subred vive en una sola AZ.</li>
          <li><strong>Internet Gateway (IGW):</strong> da acceso a internet a las subredes públicas (gratuito).</li>
          <li><strong>NAT Gateway:</strong> permite salida a internet a las subredes <em>privadas</em> (se coloca en una subred pública). Gestionado y con alta disponibilidad por AZ; preferible al NAT Instance.</li>
          <li><strong>Tablas de rutas:</strong> definen a dónde va el tráfico. <strong>Lo que hace pública a una subred es tener una ruta 0.0.0.0/0 → IGW.</strong></li>
        </ul>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Nunca pongas bases de datos en subredes públicas. Patrón típico: web/ALB en subred pública, app y BD en subredes privadas con salida vía NAT Gateway.</p></div></div>`
    },
    {
      id: "sg-nacl",
      titulo: "Grupos de seguridad vs NACL",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>Grupo de seguridad (SG)</th><th>NACL</th></tr></thead>
          <tbody>
            <tr><td>Nivel</td><td>Instancia (ENI)</td><td>Subred</td></tr>
            <tr><td>Reglas</td><td>Solo permitir (<em>allow</em>)</td><td>Permitir y <strong>denegar</strong></td></tr>
            <tr><td>Estado</td><td>Con estado (respuesta automática)</td><td>Sin estado (define ida y vuelta)</td></tr>
            <tr><td>Por defecto</td><td>Deniega entrada, permite salida</td><td>Permite todo</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Los <strong>grupos de seguridad solo permiten</strong>, no pueden denegar. Para <strong>bloquear una IP concreta</strong> usa una <strong>NACL</strong> (admite reglas deny) o AWS WAF. La NACL es <em>sin estado</em>: hay que abrir tráfico de entrada y de salida.</p></div></div>
        <h3>Puertos efímeros (importan por ser sin estado)</h3>
        <p>Como la NACL es <strong>sin estado</strong>, el tráfico de vuelta no se permite solo: usa <strong>puertos efímeros</strong>. Cuando un cliente abre una conexión (p. ej. a un servidor web en el 443), la respuesta del servidor <strong>no</strong> vuelve al 443, sino a un <strong>puerto efímero aleatorio</strong> del cliente.</p>
        <ul>
          <li>Por eso, en la NACL hay que <strong>abrir también el rango de puertos efímeros</strong> en el sentido del tráfico de retorno (salida en el lado servidor, entrada en el lado cliente).</li>
          <li>Rango recomendado por AWS: <code>1024–65535</code> (varía según el sistema: Linux 32768–60999, Windows 49152–65535; NAT Gateway y ELB usan 1024–65535).</li>
        </ul>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>El grupo de seguridad, al ser <strong>con estado</strong>, gestiona el retorno automáticamente: <strong>no</strong> hace falta abrir puertos efímeros en él.</p></div></div>`
    },
    {
      id: "cidr",
      titulo: "CIDR y subredes",
      html: `
        <p>El bloque CIDR de una VPC va de <strong>/16</strong> (máximo, 65.536 IPs) a <strong>/28</strong>. Rangos privados RFC 1918: <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code>.</p>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>AWS reserva <strong>5 IPs por subred</strong> (las 4 primeras y la última). Ejemplo: un /24 tiene 256 − 5 = <strong>251 IPs usables</strong>.</p></div></div>
        <p><strong>VPC Flow Logs</strong> capturan el tráfico IP de las ENI (a CloudWatch Logs o S3) para diagnóstico y análisis de seguridad. No capturan tráfico a la metadata (169.254.169.254) ni al DNS de AWS.</p>`
    },
    {
      id: "conectividad",
      titulo: "Conectividad entre VPC y con on-premises",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Opción</th><th>Uso</th></tr></thead>
          <tbody>
            <tr><td><strong>VPC Peering</strong></td><td>Conectar 2 VPC. <strong>No es transitivo</strong> (A-B-C: A no llega a C) y los CIDR no pueden solaparse</td></tr>
            <tr><td><strong>Transit Gateway</strong></td><td>Hub central para conectar <strong>muchas</strong> VPC (y on-premises)</td></tr>
            <tr><td><strong>Site-to-Site VPN</strong></td><td>Conexión cifrada a on-premises, rápida de montar (hasta ~1,25 Gbps)</td></tr>
            <tr><td><strong>Direct Connect</strong></td><td>Enlace físico dedicado a on-premises (1–100 Gbps); no cifrado (usa VPN sobre DX). Tarda semanas en aprovisionarse</td></tr>
            <tr><td><strong>PrivateLink</strong></td><td>Exponer/consumir un servicio de forma privada entre VPC o cuentas</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Con VPC Peering en la <strong>misma región</strong> puedes <strong>referenciar grupos de seguridad</strong> de la VPC vecina en tus reglas (en lugar de rangos CIDR): un SG de la VPC A puede permitir tráfico desde un SG de la VPC B emparejada.</p></div></div>
        <h3>VPC Endpoints</h3>
        <ul>
          <li><strong>Gateway Endpoint:</strong> solo <strong>S3 y DynamoDB</strong>, se añade a la tabla de rutas. <strong>Gratuito.</strong> Solo accesible <em>desde dentro de la VPC</em>.</li>
          <li><strong>Interface Endpoint (PrivateLink):</strong> una <strong>ENI</strong> con IP privada en la subred, para casi todos los demás servicios. Con coste por hora + datos.</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>El <strong>Gateway Endpoint no es accesible desde on-premises</strong> (VPN/Direct Connect) ni desde una VPC emparejada. Para llegar a S3/DynamoDB (u otro servicio) <strong>desde on-premises o entre VPC</strong>, usa un <strong>Interface Endpoint (PrivateLink)</strong>, que sí es alcanzable por VPN, Direct Connect y Peering.</p></div></div>`
    },
    {
      id: "vpn-s2s",
      titulo: "VPN Site-to-Site y AWS VPN CloudHub",
      html: `
        <p>La <strong>Site-to-Site VPN</strong> conecta tu red on-premises con la VPC mediante un túnel <strong>IPsec cifrado</strong> que viaja por internet. Es rápida de montar y de bajo coste (frente a Direct Connect).</p>
        <ul>
          <li>Dos extremos: el <strong>Virtual Private Gateway (VGW)</strong> del lado AWS (o un Transit Gateway) y el <strong>Customer Gateway (CGW)</strong>, que representa tu router/firewall on-premises.</li>
          <li>Cada conexión VPN trae <strong>2 túneles</strong> en distintas AZ para alta disponibilidad (~1,25 Gbps por túnel).</li>
          <li>Enrutado <strong>estático</strong> o <strong>dinámico (BGP)</strong>.</li>
        </ul>
        <h3>AWS VPN CloudHub</h3>
        <p>Permite comunicar <strong>varias sedes entre sí</strong> (hub-and-spoke) usando un <strong>único Virtual Private Gateway</strong>: cada sede monta su VPN contra el VGW y, mediante BGP, las sedes se hablan <strong>entre ellas</strong> a través del hub. Solución sencilla y económica para conectar oficinas remotas, incluso sin VPC de por medio.</p>
        <figure class="figure">
          <img src="img/cloudHub.png" alt="AWS VPN CloudHub: un Virtual Private Gateway central conectado por VPN a tres redes de clientes (Customer Gateways) en topología radial hub-and-spoke." loading="lazy">
          <figcaption>VPN CloudHub: un mismo VGW conecta varias sedes (Customer Gateways) y les permite comunicarse entre sí a través del hub.</figcaption>
        </figure>`
    },
    {
      id: "direct-connect",
      titulo: "AWS Direct Connect",
      html: `
        <p><strong>Direct Connect (DX)</strong> es un enlace <strong>físico dedicado</strong> entre tu centro de datos y AWS a través de una ubicación DX. Ofrece <strong>ancho de banda alto y latencia consistente</strong> (no depende de internet), ideal para cargas sensibles al rendimiento o grandes transferencias.</p>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>Direct Connect <strong>no cifra</strong> el tráfico por sí solo. Para cifrarlo, monta una <strong>VPN IPsec sobre DX</strong>. Además, aprovisionarlo tarda <strong>semanas</strong> (frente a la VPN, inmediata).</p></div></div>
        <h3>Tipos de conexión</h3>
        <ul>
          <li><strong>Dedicada:</strong> un puerto Ethernet físico dedicado a un solo cliente, de <strong>1, 10, 100 (o 400) Gbps</strong>. Se solicita directamente a AWS.</li>
          <li><strong>Alojada (hosted):</strong> la provee un <strong>Partner de Direct Connect</strong>, con capacidades más granulares (desde <strong>50 Mbps hasta 25 Gbps</strong>). Se contrata a través del partner.</li>
        </ul>
        <h3>Interfaces virtuales (VIF)</h3>
        <ul>
          <li><strong>Privada:</strong> acceso a los recursos privados de la VPC (por su IP privada).</li>
          <li><strong>Pública:</strong> acceso a servicios públicos de AWS (p. ej. S3) por la conexión DX.</li>
          <li><strong>De tránsito:</strong> conecta la DX a un <strong>Transit Gateway</strong> (vía Direct Connect Gateway).</li>
        </ul>
        <figure class="figure">
          <img src="img/DirectConnect.png" alt="Direct Connect: la VPC con su Virtual Private Gateway se conecta a la ubicación de Direct Connect; una interfaz virtual privada (VLAN 1) llega a la VPC y una pública (VLAN 2) a S3/Glacier, hasta el router del cliente." loading="lazy">
          <figcaption>Direct Connect con interfaz virtual privada (a la VPC) y pública (a servicios como S3), sobre VLAN independientes desde la red del cliente.</figcaption>
        </figure>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Máxima resiliencia: combina <strong>Direct Connect + una VPN de respaldo</strong> (failover) para no depender de un único enlace.</p></div></div>`
    },
    {
      id: "transit-gateway",
      titulo: "Transit Gateway: ECMP, Direct Connect y Traffic Mirroring",
      html: `
        <p>El <strong>Transit Gateway (TGW)</strong> es un <strong>hub central</strong> que conecta <strong>muchas VPC</strong>, VPN y Direct Connect de forma escalable (evita la maraña de peerings). Se puede <strong>compartir entre cuentas</strong> con <strong>AWS Resource Access Manager (RAM)</strong>.</p>
        <h3>VPN Site-to-Site con ECMP</h3>
        <p>Al terminar las VPN en el TGW puedes usar <strong>ECMP</strong> (Equal-Cost Multi-Path) para <strong>agregar el ancho de banda de varios túneles/conexiones VPN</strong> y superar el límite de una sola conexión. Requiere <strong>enrutado dinámico (BGP)</strong>; no funciona con rutas estáticas.</p>
        <figure class="figure">
          <img src="img/ECMP.png" alt="Transit Gateway conectado a cuatro VPC y a un centro de datos corporativo mediante dos conexiones VPN, agregando ancho de banda con ECMP." loading="lazy">
          <figcaption>Con ECMP, el Transit Gateway reparte el tráfico entre varios túneles VPN hacia on-premises y suma su ancho de banda.</figcaption>
        </figure>
        <h3>Compartir Direct Connect con el Transit Gateway</h3>
        <p>Mediante un <strong>Direct Connect Gateway</strong> y una <strong>interfaz virtual de tránsito</strong>, una única Direct Connect puede alcanzar el TGW y, a través de él, <strong>todas las VPC conectadas</strong> (incluso en varias cuentas). Así centralizas la conectividad híbrida.</p>
        <figure class="figure">
          <img src="img/TransitGWDirectConnectComparticion.png" alt="Transit Gateway conectado a VPC de dos cuentas y, vía Direct Connect Gateway e interfaz virtual de tránsito, a la ubicación de Direct Connect y al centro de datos del cliente." loading="lazy">
          <figcaption>Direct Connect Gateway + VIF de tránsito conectan el centro de datos al Transit Gateway y, con él, a las VPC de varias cuentas.</figcaption>
        </figure>
        <h3>Traffic Mirroring</h3>
        <p><strong>Traffic Mirroring</strong> copia el tráfico de red de una <strong>ENI</strong> y lo envía a herramientas de monitorización/seguridad (IDS/IPS, análisis de paquetes) para inspección profunda, sin afectar a la carga. Útil para detección de amenazas y diagnóstico de red.</p>`
    },
    {
      id: "route-53",
      titulo: "Route 53: DNS, registros y health checks",
      html: `
        <p><strong>Amazon Route 53</strong> es el servicio <strong>DNS</strong> gestionado de AWS (el "53" es el puerto de DNS): traduce nombres de dominio a direcciones IP. Es <strong>altamente disponible y escalable</strong>, y además actúa como <strong>registrador de dominios</strong> y como <strong>comprobador de salud (health checks)</strong> con conmutación por error.</p>
        <h3>Zonas alojadas (hosted zones)</h3>
        <p>Una <strong>zona alojada</strong> es el contenedor de los registros DNS de un dominio:</p>
        <ul>
          <li><strong>Pública:</strong> resuelve el dominio en <strong>internet</strong>.</li>
          <li><strong>Privada:</strong> resuelve nombres <strong>solo dentro de una o varias VPC</strong> (DNS interno). La VPC necesita <code>enableDnsSupport</code> y <code>enableDnsHostnames</code> activados.</li>
        </ul>
        <h3>Registros DNS</h3>
        <p>Tipos habituales: <strong>A</strong> (nombre → IPv4), <strong>AAAA</strong> (IPv6), <strong>CNAME</strong> (nombre → otro nombre), <strong>MX</strong> (correo), <strong>TXT</strong> (verificación/SPF), <strong>NS</strong> y <strong>SOA</strong> (delegación de la zona). Cada registro tiene un <strong>TTL</strong> (tiempo de caché en segundos).</p>
        <h3>CNAME vs Alias — muy preguntado</h3>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>CNAME</th><th>Alias (propio de Route 53)</th></tr></thead>
          <tbody>
            <tr><td>Apunta a</td><td>Cualquier nombre DNS</td><td>Recursos AWS (ELB, CloudFront, S3 web, API Gateway, Global Accelerator) u otro registro de la zona</td></tr>
            <tr><td>Apex del dominio (<code>ejemplo.com</code>)</td><td><strong>No</strong> (solo subdominios)</td><td><strong>Sí</strong></td></tr>
            <tr><td>Coste de consulta</td><td>Se cobra</td><td><strong>Gratis</strong> hacia recursos AWS</td></tr>
            <tr><td>Tipo de registro</td><td>CNAME</td><td>A / AAAA</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Para apuntar el <strong>dominio raíz (apex)</strong> a un ELB, CloudFront o S3 usa un <strong>registro Alias</strong>: el CNAME no puede ir en el apex. Además el Alias sigue solo los cambios de IP del recurso y no cobra por consulta.</p></div></div>
        <h3>Políticas de enrutado</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Política</th><th>Uso</th></tr></thead>
          <tbody>
            <tr><td>Simple</td><td>Un único recurso</td></tr>
            <tr><td>Ponderada (Weighted)</td><td>Pruebas A/B, migración gradual (% a cada recurso)</td></tr>
            <tr><td>Latencia</td><td>Enruta a la región de menor latencia</td></tr>
            <tr><td>Failover</td><td>Activo-pasivo para DR (según health check)</td></tr>
            <tr><td>Geolocalización</td><td>Según la ubicación del usuario</td></tr>
            <tr><td>Geoproximidad</td><td>Según la distancia geográfica, con sesgo (bias) ajustable</td></tr>
            <tr><td>Multivalor</td><td>Varias IP con comprobación de salud</td></tr>
          </tbody>
        </table></div>
        <h3>Health checks y conmutación por error</h3>
        <p>Route 53 comprueba la salud de los recursos y, con la política <strong>Failover</strong>, deja de enviar tráfico a los que estén caídos. Tres tipos:</p>
        <ul>
          <li><strong>De endpoint:</strong> sondea una IP o dominio por HTTP, HTTPS o TCP.</li>
          <li><strong>Calculado:</strong> combina el estado de varios health checks hijos.</li>
          <li><strong>Basado en alarma de CloudWatch:</strong> sigue el estado de una alarma.</li>
        </ul>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>Los verificadores de Route 53 son <strong>públicos</strong>: <strong>no pueden alcanzar recursos en subredes privadas</strong> (IP privada). Para vigilar un recurso privado usa un <strong>health check basado en una alarma de CloudWatch</strong>: creas una métrica/alarma (p. ej. <code>StatusCheckFailed</code> de la instancia, o una métrica personalizada que publique una Lambda) y el health check sigue el estado de esa alarma.</p></div></div>
        <p>Los health checks se integran con <strong>CloudWatch</strong> y pueden disparar <strong>alertas por SNS</strong> cuando un recurso pasa a no disponible.</p>`
    },
    {
      id: "cloudfront-ga",
      titulo: "CloudFront y Global Accelerator",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>CloudFront</th><th>Global Accelerator</th></tr></thead>
          <tbody>
            <tr><td>Propósito</td><td>Cachear contenido (CDN)</td><td>Enrutar al endpoint óptimo</td></tr>
            <tr><td>Protocolos</td><td>HTTP/HTTPS</td><td>Cualquiera (TCP/UDP)</td></tr>
            <tr><td>Caché</td><td>Sí</td><td>No</td></tr>
            <tr><td>IP</td><td>Cambian</td><td><strong>IP estáticas (Anycast)</strong></td></tr>
          </tbody>
        </table></div>
        <h3>Amazon CloudFront</h3>
        <p>Es la <strong>CDN</strong> de AWS: cachea el contenido en <strong>ubicaciones de borde (edge locations)</strong> cercanas al usuario, reduciendo latencia y descargando el origen. Sirve contenido <strong>estático</strong> y <strong>dinámico</strong>, y puede ejecutar lógica en el borde con <strong>CloudFront Functions</strong> o <strong>Lambda@Edge</strong>.</p>
        <p>Orígenes con los que se integra:</p>
        <ul>
          <li><strong>Bucket S3</strong> (o S3 como web estática), protegido con <strong>OAC/OAI</strong> para que solo CloudFront acceda al bucket.</li>
          <li><strong>ALB, EC2 o cualquier servidor HTTP</strong> (origen personalizado), on-premises incluido.</li>
          <li><strong>API Gateway</strong>, <strong>Lambda function URLs</strong> y servicios de medios (MediaStore/MediaPackage).</li>
        </ul>
        <p>Para restringir contenido: <strong>Signed URLs/Cookies</strong>, <strong>geo-restricción</strong> e integración con <strong>AWS WAF</strong>.</p>
        <h3>AWS Global Accelerator</h3>
        <p>Proporciona <strong>2 IP estáticas Anycast</strong> y enruta al usuario por la <strong>red troncal de AWS</strong> hasta el <strong>endpoint sano más cercano</strong>, mejorando latencia, disponibilidad y failover entre regiones. <strong>No cachea</strong> (a diferencia de CloudFront) y sirve <strong>cualquier protocolo TCP/UDP</strong>, por lo que encaja con apps no HTTP (juegos, VoIP, IoT).</p>
        <p>Endpoints que puede tener detrás: <strong>ALB, NLB, instancias EC2</strong> y <strong>Elastic IP</strong>, en una o varias regiones.</p>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>"Cachear contenido web / CDN" → <strong>CloudFront</strong>. "IP estática, TCP/UDP no HTTP, failover entre regiones y baja latencia por la red de AWS" → <strong>Global Accelerator</strong>.</p></div></div>`
    }
  ],
  preguntas: [
    {
      pregunta: "Una base de datos en una subred privada necesita descargar parches de internet. ¿Qué solución usar?",
      opciones: [
        "Asignarle una IP pública",
        "Desplegar un NAT Gateway en una subred pública y enrutar 0.0.0.0/0 → NAT",
        "Colocar la base de datos en una subred pública",
        "Añadir un Internet Gateway a la subred privada"
      ],
      correctas: [1],
      explicacion: "El NAT Gateway (situado en una subred pública) da salida a internet a las instancias de subredes privadas manteniéndolas inaccesibles desde fuera. La tabla de rutas privada apunta 0.0.0.0/0 al NAT."
    },
    {
      pregunta: "Hay que bloquear una dirección IP maliciosa concreta para que no acceda a los recursos. ¿Qué usar?",
      opciones: [
        "Un grupo de seguridad con regla de denegación",
        "Una NACL con regla de denegación (o AWS WAF)",
        "Una tabla de rutas",
        "Un Internet Gateway"
      ],
      correctas: [1],
      explicacion: "Los grupos de seguridad solo permiten, no pueden denegar. Para bloquear una IP concreta se usa una NACL (admite reglas deny) o AWS WAF."
    },
    {
      pregunta: "Tres VPC necesitan comunicarse entre sí de forma escalable. ¿Cuál es el mejor enfoque?",
      opciones: [
        "Tres emparejamientos (peering) separados",
        "AWS Transit Gateway (hub-and-spoke)",
        "Un Internet Gateway compartido",
        "Una única subred compartida"
      ],
      correctas: [1],
      explicacion: "El peering no es transitivo y no escala bien con muchas VPC. Transit Gateway actúa como hub central que conecta muchas VPC (y on-premises) de forma escalable."
    },
    {
      pregunta: "¿Cuál de estas afirmaciones sobre el emparejamiento de VPC (peering) es correcta?",
      opciones: [
        "El peering es transitivo: si A-B y B-C, entonces A llega a C",
        "El peering NO es transitivo y los CIDR no pueden solaparse",
        "Solo funciona dentro de la misma región",
        "Permite CIDR solapados"
      ],
      correctas: [1],
      explicacion: "El VPC peering no es transitivo (A-B-C no permite que A alcance C) y requiere que los bloques CIDR no se solapen. Puede ser entre regiones y entre cuentas."
    },
    {
      pregunta: "Se necesita acceso privado a S3 desde la VPC sin coste por hora. ¿Qué tipo de VPC endpoint usar?",
      opciones: [
        "Interface Endpoint (PrivateLink)",
        "Gateway Endpoint",
        "NAT Gateway",
        "Internet Gateway"
      ],
      correctas: [1],
      explicacion: "El Gateway Endpoint (solo S3 y DynamoDB) se añade a la tabla de rutas y es gratuito. Los Interface Endpoints usan una ENI y tienen coste por hora + datos."
    },
    {
      pregunta: "Se quiere enrutar a los usuarios de la UE a recursos en la UE y a los de EE. UU. a recursos en EE. UU. ¿Qué política de Route 53 usar?",
      opciones: ["Simple", "Ponderada (Weighted)", "Geolocalización", "Failover"],
      correctas: [2],
      explicacion: "La política de geolocalización de Route 53 enruta según la ubicación geográfica del usuario, ideal para servir contenido regionalizado."
    },
    {
      pregunta: "Para un escenario activo-pasivo de recuperación ante desastres basado en comprobaciones de salud, ¿qué política de Route 53 usar?",
      opciones: ["Latencia", "Failover", "Multivalor", "Ponderada"],
      correctas: [1],
      explicacion: "La política de failover enruta al recurso primario mientras esté sano y conmuta al secundario según el health check, patrón activo-pasivo de DR."
    },
    {
      pregunta: "Una empresa necesita una conexión dedicada y de alto rendimiento consistente entre su centro de datos y AWS. ¿Qué opción usar?",
      opciones: ["Site-to-Site VPN", "AWS Direct Connect", "VPC Peering", "Internet Gateway"],
      correctas: [1],
      explicacion: "Direct Connect proporciona un enlace físico dedicado (1–100 Gbps) con rendimiento consistente. La VPN es más rápida de montar y cifrada, pero va por internet."
    },
    {
      pregunta: "Un proveedor quiere ofrecer acceso privado a su servicio para clientes en otras cuentas de AWS, sin exponerlo a internet. ¿Qué usar?",
      opciones: ["AWS PrivateLink (VPC Endpoint Service)", "VPC Peering", "Internet Gateway", "NAT Gateway"],
      correctas: [0],
      explicacion: "PrivateLink permite exponer un servicio de forma privada a otras VPC/cuentas mediante endpoints de interfaz, sin atravesar internet."
    },
    {
      pregunta: "¿Cuántas direcciones IP reserva AWS en cada subred?",
      opciones: ["2", "3", "5", "10"],
      correctas: [2],
      explicacion: "AWS reserva 5 IPs por subred (las 4 primeras y la última). Por eso un /24 tiene 251 IPs usables (256 − 5)."
    },
    {
      pregunta: "Una aplicación de juego usa TCP/UDP y necesita IP estáticas y enrutado a la región óptima con failover rápido. ¿Qué servicio usar?",
      opciones: ["Amazon CloudFront", "AWS Global Accelerator", "Route 53 simple", "NAT Gateway"],
      correctas: [1],
      explicacion: "Global Accelerator ofrece IP estáticas Anycast y enruta el tráfico (incluido TCP/UDP no HTTP) al endpoint sano más óptimo. CloudFront es una CDN para contenido HTTP/HTTPS."
    },
    {
      pregunta: "¿Cuál es la diferencia clave entre un grupo de seguridad y una NACL respecto al estado?",
      opciones: [
        "Ambos son sin estado",
        "El grupo de seguridad es con estado; la NACL es sin estado",
        "El grupo de seguridad es sin estado; la NACL es con estado",
        "Ambos son con estado"
      ],
      correctas: [1],
      explicacion: "El grupo de seguridad es con estado (el tráfico de respuesta se permite automáticamente); la NACL es sin estado y requiere reglas explícitas de entrada y de salida."
    },
    {
      pregunta: "Se quiere restringir el acceso a un bucket S3 para que solo se sirva a través de CloudFront. ¿Qué usar?",
      opciones: [
        "Hacer el bucket público",
        "Origin Access Control/Identity (OAC/OAI)",
        "Un NAT Gateway",
        "Una NACL"
      ],
      correctas: [1],
      explicacion: "OAC/OAI permite que solo CloudFront acceda al bucket de origen, evitando el acceso directo a S3 y manteniéndolo privado."
    },
    {
      pregunta: "Una migración gradual quiere enviar el 10% del tráfico a una nueva versión y el 90% a la antigua. ¿Qué política de Route 53 usar?",
      opciones: ["Ponderada (Weighted)", "Geolocalización", "Latencia", "Failover"],
      correctas: [0],
      explicacion: "La política ponderada reparte el tráfico según pesos porcentuales entre recursos, ideal para pruebas A/B y despliegues graduales."
    },
    {
      pregunta: "Una NACL permite la entrada al puerto 443, pero los clientes no reciben la respuesta del servidor web. ¿Qué falta configurar?",
      opciones: [
        "Permitir la salida en el rango de puertos efímeros (1024–65535)",
        "Cambiar la NACL a modo con estado",
        "Abrir también el puerto 443 de salida",
        "Añadir un grupo de seguridad con regla deny"
      ],
      correctas: [0],
      explicacion: "La NACL es sin estado: el tráfico de respuesta vuelve por un puerto efímero, no por el 443. Hay que permitir explícitamente la salida en el rango de puertos efímeros (AWS recomienda 1024–65535). El grupo de seguridad, con estado, no necesita esto."
    },
    {
      pregunta: "Dos VPC en la misma región están emparejadas (peering). Se quiere permitir tráfico desde las instancias de la VPC B a las de la VPC A sin usar rangos CIDR. ¿Qué permite AWS?",
      opciones: [
        "Referenciar el grupo de seguridad de la VPC B en las reglas del SG de la VPC A",
        "Compartir la misma NACL entre ambas VPC",
        "Nada: solo se puede por CIDR",
        "Usar un Internet Gateway compartido"
      ],
      correctas: [0],
      explicacion: "En VPC peering dentro de la misma región puedes referenciar grupos de seguridad de la VPC vecina en tus reglas, en lugar de especificar rangos CIDR."
    },
    {
      pregunta: "Desde el centro de datos on-premises (conectado por Direct Connect) se necesita acceso privado a Amazon S3. ¿Qué tipo de VPC endpoint usar?",
      opciones: [
        "Gateway Endpoint",
        "Interface Endpoint (PrivateLink)",
        "Internet Gateway",
        "NAT Gateway"
      ],
      correctas: [1],
      explicacion: "El Gateway Endpoint solo es accesible desde dentro de la VPC (vía tabla de rutas), no desde on-premises ni VPC emparejadas. Para acceder desde on-premises (VPN/Direct Connect) se usa un Interface Endpoint (PrivateLink)."
    },
    {
      pregunta: "Una empresa quiere conectar varias oficinas remotas entre sí de forma sencilla y económica usando VPN, comunicándose todas a través de AWS. ¿Qué solución encaja?",
      opciones: [
        "AWS VPN CloudHub",
        "VPC Peering entre las oficinas",
        "Un Internet Gateway por oficina",
        "Amazon CloudFront"
      ],
      correctas: [0],
      explicacion: "VPN CloudHub usa un único Virtual Private Gateway como hub: cada sede monta su Site-to-Site VPN y, mediante BGP, las sedes se comunican entre sí (hub-and-spoke) de forma sencilla y de bajo coste."
    },
    {
      pregunta: "Se ha contratado Direct Connect, pero seguridad exige que el tráfico vaya cifrado extremo a extremo. ¿Qué añadir?",
      opciones: [
        "Nada: Direct Connect ya cifra el tráfico",
        "Una VPN IPsec sobre la conexión Direct Connect",
        "Una NACL",
        "Un Gateway Endpoint"
      ],
      correctas: [1],
      explicacion: "Direct Connect no cifra el tráfico por sí mismo. Para cifrarlo se monta una VPN IPsec sobre la Direct Connect (VPN over DX)."
    },
    {
      pregunta: "¿Qué diferencia a una conexión Direct Connect 'dedicada' de una 'alojada' (hosted)?",
      opciones: [
        "La dedicada es un puerto físico para un solo cliente (1/10/100 Gbps) contratado a AWS; la alojada la provee un Partner con capacidades más granulares (50 Mbps–25 Gbps)",
        "La alojada siempre es más rápida",
        "La dedicada va cifrada y la alojada no",
        "No hay ninguna diferencia real"
      ],
      correctas: [0],
      explicacion: "La conexión dedicada es un puerto Ethernet físico dedicado a un único cliente (1, 10, 100 o 400 Gbps), solicitado a AWS. La alojada la entrega un AWS Direct Connect Partner con capacidades más granulares (de 50 Mbps a 25 Gbps)."
    },
    {
      pregunta: "Se necesita más ancho de banda hacia on-premises del que da una sola conexión VPN, terminando las VPN en un Transit Gateway. ¿Qué permite agregar el ancho de banda de varios túneles?",
      opciones: [
        "ECMP (Equal-Cost Multi-Path) con enrutado dinámico BGP",
        "Rutas estáticas en la VPN",
        "Un Gateway Endpoint",
        "VPC Peering"
      ],
      correctas: [0],
      explicacion: "Al terminar las VPN en el Transit Gateway, ECMP agrega el ancho de banda de varios túneles/conexiones VPN. Requiere enrutado dinámico (BGP); no funciona con rutas estáticas."
    },
    {
      pregunta: "Hay que apuntar el dominio raíz (apex) ejemplo.com a un Application Load Balancer. ¿Qué tipo de registro de Route 53 usar?",
      opciones: [
        "Un registro CNAME",
        "Un registro Alias de tipo A",
        "Un registro MX",
        "Un registro TXT"
      ],
      correctas: [1],
      explicacion: "El CNAME no puede usarse en el apex del dominio. El registro Alias (tipo A) sí, apunta a recursos AWS como un ELB, sigue automáticamente sus cambios de IP y no tiene coste de consulta."
    },
    {
      pregunta: "Se quiere resolver nombres DNS internos que solo deben ser accesibles dentro de la VPC. ¿Qué usar?",
      opciones: [
        "Una zona alojada pública de Route 53",
        "Una zona alojada privada de Route 53 asociada a la VPC",
        "Un registro CNAME público",
        "Un Internet Gateway"
      ],
      correctas: [1],
      explicacion: "La zona alojada privada resuelve nombres solo dentro de una o varias VPC (DNS interno). Requiere que la VPC tenga enableDnsSupport y enableDnsHostnames activados."
    },
    {
      pregunta: "Se necesita comprobar la salud de una instancia EC2 que solo tiene IP privada (subred privada) y avisar cuando falle. ¿Cómo hacerlo con Route 53?",
      opciones: [
        "Un health check de endpoint apuntando a su IP privada",
        "Un health check basado en una alarma de CloudWatch (que sigue una métrica del recurso) y notificar por SNS",
        "No es posible comprobar recursos privados",
        "Un registro Alias con TTL bajo"
      ],
      correctas: [1],
      explicacion: "Los verificadores de Route 53 son públicos y no alcanzan IP privadas. Se usa un health check basado en una alarma de CloudWatch (p. ej. sobre StatusCheckFailed o una métrica personalizada) y se envían alertas por SNS."
    }
  ]
}
,

/* ===================== MÓDULO 07 ===================== */
{
  id: "07-seguridad",
  numero: 7,
  titulo: "Seguridad y cumplimiento",
  resumen: "Cifrado con KMS, gestión de secretos y certificados, WAF/Shield, y servicios de detección y auditoría.",
  peso: "~20–25%",
  tiempo: "60–75 min",
  teoria: [
    {
      id: "mapa",
      titulo: "Mapa de servicios de seguridad",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Necesidad</th><th>Servicio</th></tr></thead>
          <tbody>
            <tr><td>Claves de cifrado</td><td><strong>KMS</strong> (o CloudHSM para hardware dedicado)</td></tr>
            <tr><td>Secretos / contraseñas</td><td><strong>Secrets Manager</strong></td></tr>
            <tr><td>Certificados TLS/SSL</td><td><strong>ACM</strong></td></tr>
            <tr><td>Firewall de aplicación</td><td><strong>WAF</strong></td></tr>
            <tr><td>Protección DDoS</td><td><strong>Shield</strong> (Standard/Advanced)</td></tr>
            <tr><td>Detección de amenazas</td><td><strong>GuardDuty</strong></td></tr>
            <tr><td>Datos sensibles en S3 (PII)</td><td><strong>Macie</strong></td></tr>
            <tr><td>Auditoría de llamadas API</td><td><strong>CloudTrail</strong></td></tr>
            <tr><td>Cumplimiento de configuración</td><td><strong>Config</strong></td></tr>
          </tbody>
        </table></div>`
    },
    {
      id: "kms",
      titulo: "Cifrado: KMS, secretos y certificados",
      html: `
        <h3>KMS — tipos de clave</h3>
        <ul>
          <li><strong>Gestionadas por AWS:</strong> gratuitas, rotación anual obligatoria, formato <code>aws/servicio</code>.</li>
          <li><strong>Gestionadas por el cliente (CMK):</strong> ~1$/mes, rotación anual opcional, control total de la política de clave, se pueden deshabilitar/borrar.</li>
          <li><strong>Propiedad de AWS:</strong> opacas, sin visibilidad.</li>
        </ul>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p><strong>Cifrado de sobre (envelope):</strong> una clave de datos (DEK) cifra los datos y la CMK cifra la DEK. Permite cifrar grandes volúmenes localmente sin que la CMK salga de KMS (límite directo de KMS: 4 KB).</p></div></div>
        <h3>Secrets Manager vs Parameter Store</h3>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>Secrets Manager</th><th>Parameter Store</th></tr></thead>
          <tbody>
            <tr><td>Rotación automática</td><td><strong>Sí</strong> (RDS, etc.)</td><td>No (manual)</td></tr>
            <tr><td>Coste</td><td>~0,40$/secreto/mes</td><td>Gratis (estándar)</td></tr>
            <tr><td>Uso</td><td>Credenciales de BD, claves API</td><td>Config de app, valores simples</td></tr>
          </tbody>
        </table></div>
        <h3>ACM</h3>
        <p>Certificados TLS/SSL <strong>gratuitos con renovación automática</strong>, integrados con ALB, CloudFront y API Gateway. Para CloudFront, el certificado debe estar en us-east-1.</p>`
    },
    {
      id: "proteccion",
      titulo: "Protección: WAF, Shield y Firewall Manager",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Servicio</th><th>Capa</th><th>Para qué</th></tr></thead>
          <tbody>
            <tr><td><strong>WAF</strong></td><td>7</td><td>Firewall de aplicación web: inyección SQL, XSS, rate limiting, geo-bloqueo</td></tr>
            <tr><td><strong>Shield Standard</strong></td><td>3/4</td><td>Protección DDoS <strong>gratuita y automática</strong></td></tr>
            <tr><td><strong>Shield Advanced</strong></td><td>3/4/7</td><td>DDoS avanzado, soporte 24/7 (~3.000$/mes)</td></tr>
            <tr><td><strong>Firewall Manager</strong></td><td>Varias</td><td>Gestión centralizada de seguridad multicuenta</td></tr>
          </tbody>
        </table></div>`
    },
    {
      id: "deteccion",
      titulo: "Detección y auditoría",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Servicio</th><th>Qué hace</th></tr></thead>
          <tbody>
            <tr><td><strong>GuardDuty</strong></td><td>Detección de amenazas con ML (analiza Flow Logs, CloudTrail, DNS…)</td></tr>
            <tr><td><strong>Macie</strong></td><td>Descubre datos sensibles/PII en S3</td></tr>
            <tr><td><strong>Inspector</strong></td><td>Evaluación de vulnerabilidades en EC2/ECR</td></tr>
            <tr><td><strong>Detective</strong></td><td>Investigación y análisis de causa raíz</td></tr>
            <tr><td><strong>Security Hub</strong></td><td>Panel central que agrega hallazgos</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p><strong>CloudTrail vs Config:</strong> CloudTrail responde "¿<em>quién</em> hizo qué?" (llamadas API); Config responde "¿está el recurso <em>conforme</em>?" (cambios de configuración y reglas de cumplimiento, con remediación vía Systems Manager).</p></div></div>
        <h3>Systems Manager — Session Manager</h3>
        <p>Acceso seguro de shell a instancias EC2 <strong>sin claves SSH ni bastión</strong>: usa permisos IAM y el puerto 443, y registra las sesiones en CloudTrail.</p>`
    }
  ],
  preguntas: [
    {
      pregunta: "Se necesita automatizar la rotación de la contraseña de una base de datos cada 30 días. ¿Qué servicio usar?",
      opciones: ["AWS Parameter Store", "AWS Secrets Manager con rotación automática", "AWS KMS", "AWS Config"],
      correctas: [1],
      explicacion: "Secrets Manager ofrece rotación automática integrada (RDS, DocumentDB, Redshift…). Parameter Store no rota secretos automáticamente."
    },
    {
      pregunta: "Hay que descubrir qué buckets de S3 contienen números de tarjeta o información personal (PII). ¿Qué servicio usar?",
      opciones: ["Amazon GuardDuty", "Amazon Macie", "AWS Config", "Amazon Inspector"],
      correctas: [1],
      explicacion: "Macie usa ML para descubrir y clasificar datos sensibles/PII almacenados en S3."
    },
    {
      pregunta: "Se necesita cifrar un volumen EBS existente que está sin cifrar. ¿Cuál es el procedimiento correcto?",
      opciones: [
        "Activar el cifrado directamente sobre el volumen existente",
        "Crear un snapshot, copiarlo con cifrado y crear un volumen desde el snapshot cifrado",
        "No es posible cifrar EBS",
        "Usar una NACL"
      ],
      correctas: [1],
      explicacion: "No se puede cifrar in situ un volumen ya creado. Se hace snapshot, se copia con cifrado activado y se crea un nuevo volumen a partir del snapshot cifrado."
    },
    {
      pregunta: "Se quieren recibir alertas sobre actividad sospechosa o maliciosa en la cuenta de AWS mediante detección basada en ML. ¿Qué habilitar?",
      opciones: ["Amazon Macie", "Amazon GuardDuty", "AWS CloudTrail", "AWS Shield"],
      correctas: [1],
      explicacion: "GuardDuty es el servicio de detección de amenazas que analiza VPC Flow Logs, eventos de CloudTrail y logs DNS con machine learning para detectar anomalías."
    },
    {
      pregunta: "Hay que saber quién borró un objeto concreto de S3. ¿Qué servicio lo registra?",
      opciones: ["AWS Config", "AWS CloudTrail", "Amazon GuardDuty", "VPC Flow Logs"],
      correctas: [1],
      explicacion: "CloudTrail registra todas las llamadas a la API de AWS (incluidos los eventos de datos de S3), permitiendo auditar quién realizó cada acción."
    },
    {
      pregunta: "Se quiere verificar de forma continua que todos los buckets de S3 están cifrados y son privados. ¿Qué servicio usar?",
      opciones: ["AWS CloudTrail", "AWS Config con reglas de cumplimiento", "Amazon Macie", "AWS WAF"],
      correctas: [1],
      explicacion: "AWS Config evalúa la configuración de los recursos frente a reglas de cumplimiento y puede remediar automáticamente (con Systems Manager). Responde '¿el recurso es conforme?'."
    },
    {
      pregunta: "Una aplicación web necesita protección contra inyección SQL y cross-site scripting (XSS). ¿Qué servicio usar?",
      opciones: ["AWS Shield Standard", "AWS WAF", "Amazon GuardDuty", "AWS Config"],
      correctas: [1],
      explicacion: "AWS WAF es un firewall de aplicación (capa 7) que filtra peticiones maliciosas como inyección SQL y XSS, y permite reglas por IP, cabeceras, geografía y rate limiting."
    },
    {
      pregunta: "¿Qué protección DDoS básica está disponible de forma gratuita y automática para los recursos de AWS?",
      opciones: ["AWS Shield Advanced", "AWS Shield Standard", "AWS WAF", "AWS Firewall Manager"],
      correctas: [1],
      explicacion: "Shield Standard protege automáticamente y sin coste frente a los ataques DDoS más comunes en capas 3/4. Shield Advanced añade protección y soporte avanzados por ~3.000$/mes."
    },
    {
      pregunta: "Una empresa necesita control total sobre las políticas de sus claves de cifrado y poder deshabilitarlas. ¿Qué tipo de clave KMS usar?",
      opciones: [
        "Claves propiedad de AWS",
        "Claves gestionadas por AWS",
        "Claves gestionadas por el cliente (CMK)",
        "Claves de sesión"
      ],
      correctas: [2],
      explicacion: "Las CMK (Customer Managed Keys) dan control total de la política de clave, rotación opcional y capacidad de deshabilitar/borrar, a cambio de ~1$/mes por clave."
    },
    {
      pregunta: "Para almacenar configuración simple de aplicación y valores no sensibles sin necesidad de rotación, ¿qué servicio es el más adecuado y económico?",
      opciones: ["AWS Secrets Manager", "AWS Systems Manager Parameter Store", "AWS KMS", "AWS CloudHSM"],
      correctas: [1],
      explicacion: "Parameter Store (nivel estándar) es gratuito y adecuado para configuración de aplicación y valores simples. Secrets Manager se reserva para secretos que requieren rotación."
    },
    {
      pregunta: "Se requiere acceso seguro de shell a instancias EC2 sin gestionar claves SSH ni un host bastión, con auditoría de las sesiones. ¿Qué usar?",
      opciones: [
        "SSH con par de claves",
        "Systems Manager Session Manager",
        "Un host bastión en subred pública",
        "Direct Connect"
      ],
      correctas: [1],
      explicacion: "Session Manager da acceso basado en IAM por el puerto 443, sin claves SSH ni bastión, y registra todas las sesiones en CloudTrail."
    },
    {
      pregunta: "Se necesitan certificados TLS/SSL gratuitos con renovación automática para un ALB y una distribución de CloudFront. ¿Qué servicio usar?",
      opciones: ["AWS KMS", "AWS Certificate Manager (ACM)", "AWS Secrets Manager", "AWS CloudHSM"],
      correctas: [1],
      explicacion: "ACM emite certificados TLS/SSL gratuitos con renovación automática e integración con ALB, CloudFront y API Gateway (para CloudFront, el certificado debe estar en us-east-1)."
    },
    {
      pregunta: "Una entidad debe cumplir requisitos regulatorios que exigen un módulo de seguridad hardware dedicado bajo su control exclusivo. ¿Qué servicio usar?",
      opciones: ["AWS KMS con claves gestionadas por AWS", "AWS CloudHSM", "AWS Secrets Manager", "Amazon Macie"],
      correctas: [1],
      explicacion: "CloudHSM proporciona módulos de seguridad hardware (HSM) dedicados y de control exclusivo del cliente, para requisitos regulatorios estrictos."
    },
    {
      pregunta: "La cuenta A necesita acceder de forma segura a recursos de la cuenta B. ¿Cuál es la mejor práctica?",
      opciones: [
        "Compartir las claves de acceso IAM entre cuentas",
        "Usar roles IAM con política de confianza entre cuentas",
        "Hacer públicos los recursos",
        "Usar la cuenta raíz de B"
      ],
      correctas: [1],
      explicacion: "El acceso entre cuentas se resuelve con roles IAM y una política de confianza: la cuenta A asume el rol de la cuenta B sin compartir credenciales de larga duración."
    }
  ]
}
,

/* ===================== MÓDULO 08 ===================== */
{
  id: "08-integracion",
  numero: 8,
  titulo: "Integración de aplicaciones",
  resumen: "Desacoplar con SQS y SNS (FIFO, orden, cifrado y control de acceso), streaming con Kinesis (aprovisionamiento, orden y seguridad), orquestación con Step Functions, EventBridge y API Gateway.",
  peso: "~10–15%",
  tiempo: "45–60 min",
  teoria: [
    {
      id: "seleccion",
      titulo: "Elegir el servicio de integración",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>SQS</th><th>SNS</th><th>EventBridge</th></tr></thead>
          <tbody>
            <tr><td>Tipo</td><td>Cola (pull)</td><td>Pub/Sub (push)</td><td>Bus de eventos</td></tr>
            <tr><td>Patrón</td><td>Punto a punto</td><td>Fan-out (1 a muchos)</td><td>Enrutado de eventos por reglas</td></tr>
            <tr><td>Persistencia</td><td>Sí (hasta 14 días)</td><td>No (entrega inmediata)</td><td>No</td></tr>
            <tr><td>Uso</td><td>Desacoplar y amortiguar</td><td>Notificaciones a varios</td><td>Arquitecturas por eventos</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>¿Varios consumidores para el mismo mensaje? → <strong>SNS</strong> (pub/sub). ¿Amortiguar y procesar a tu ritmo con persistencia? → <strong>SQS</strong>. ¿Enrutar eventos de muchas fuentes a distintos destinos? → <strong>EventBridge</strong>.</p></div></div>`
    },
    {
      id: "sqs",
      titulo: "Amazon SQS",
      html: `
        <p>Cola de mensajes para <strong>desacoplar</strong> componentes. Tamaño máx. de mensaje: 256 KB (mensajes mayores, hasta 2 GB, con la <strong>Extended Client Library</strong> + S3).</p>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>Standard</th><th>FIFO</th></tr></thead>
          <tbody>
            <tr><td>Orden</td><td>Best-effort (no garantizado)</td><td><strong>Garantizado</strong></td></tr>
            <tr><td>Duplicados</td><td>Posibles (al menos una vez)</td><td>Exactamente una vez (deduplicación)</td></tr>
            <tr><td>Rendimiento</td><td>Ilimitado</td><td>300 msg/s (3.000 en lote)</td></tr>
          </tbody>
        </table></div>
        <p><strong>Casos de uso:</strong> amortiguar picos entre una capa web y sus workers, desacoplar microservicios, distribuir trabajo entre un Auto Scaling group de consumidores, o servir de buffer ante una base de datos o un proceso lento.</p>
        <h3>Conceptos clave</h3>
        <ul>
          <li><strong>Visibility timeout:</strong> tiempo que un mensaje queda invisible tras leerlo (por defecto 30 s, máx. 12 h). Evita procesamiento duplicado.</li>
          <li><strong>Retención:</strong> por defecto 4 días, máx. 14 días.</li>
          <li><strong>Long polling</strong> (0–20 s): espera a que haya mensajes; reduce costes y respuestas vacías (recomendado frente al short polling).</li>
          <li><strong>Dead Letter Queue (DLQ):</strong> recoge los mensajes que fallan tras varios intentos.</li>
        </ul>
        <h3>Orden con FIFO</h3>
        <p>La cola FIFO garantiza el orden dentro de un <strong>Message Group ID</strong>: los mensajes del mismo grupo se procesan en orden y distintos grupos se procesan en paralelo. La deduplicación usa un <strong>Deduplication ID</strong> (explícito o basado en el contenido).</p>
        <h3>Cifrado y control de acceso</h3>
        <ul>
          <li><strong>Cifrado en reposo</strong> con claves gestionadas por SQS (<strong>SSE-SQS</strong>) o con <strong>KMS</strong> (SSE-KMS); en tránsito por <strong>HTTPS/TLS</strong>.</li>
          <li><strong>Acceso:</strong> <strong>políticas de IAM</strong> (quién puede enviar/recibir) y <strong>política de cola</strong> basada en recurso (p. ej. permitir que un tema SNS o una cuenta concreta escriba en la cola).</li>
        </ul>`
    },
    {
      id: "sns",
      titulo: "SNS y patrón fan-out",
      html: `
        <p><strong>SNS</strong> entrega mensajes por push a múltiples suscriptores: HTTP/S, email, SMS, colas SQS, funciones Lambda, push móvil y Firehose. Admite <strong>filtrado de mensajes</strong> y temas FIFO.</p>
        <h3>Patrón fan-out</h3>
        <pre><code>            [Tema SNS]
                 |
        _________|_________
        |        |        |
      [SQS]    [SQS]    [SQS]
        |        |        |
     [App1]   [App2]   [App3]</code></pre>
        <p>Un evento (p. ej. una subida a S3) publica en SNS, que reparte a varias colas SQS para procesamiento paralelo, desacoplado y sin pérdida de datos.</p>
        <h3>Cifrado y control de acceso</h3>
        <ul>
          <li><strong>Cifrado en reposo</strong> con <strong>KMS</strong> (SSE) y en tránsito por <strong>HTTPS/TLS</strong>.</li>
          <li><strong>Acceso:</strong> <strong>políticas de IAM</strong> y <strong>política de tema</strong> basada en recurso, que define quién puede <strong>publicar</strong> y quién puede <strong>suscribirse</strong> (y con qué protocolos).</li>
          <li>Los <strong>temas FIFO</strong> preservan el orden y, combinados con colas SQS FIFO suscritas, mantienen el orden de extremo a extremo.</li>
        </ul>`
    },
    {
      id: "kinesis",
      titulo: "Familia Kinesis",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Servicio</th><th>Propósito</th></tr></thead>
          <tbody>
            <tr><td><strong>Data Streams</strong></td><td>Streaming en tiempo real (procesar datos según llegan). Retención 1–365 días. Se escala con <em>shards</em></td></tr>
            <tr><td><strong>Data Firehose</strong></td><td>Cargar streams a almacenamiento (S3, Redshift, OpenSearch, Splunk). Totalmente gestionado, sin shards</td></tr>
            <tr><td><strong>Data Analytics</strong></td><td>Consultas SQL sobre streams en tiempo real</td></tr>
            <tr><td><strong>Video Streams</strong></td><td>Streaming de vídeo (cámaras, etc.)</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>"Procesar millones de registros en tiempo real" → <strong>Data Streams</strong>. "Cargar el stream a S3/Redshift con mínima gestión" → <strong>Firehose</strong>.</p></div></div>
        <h3>Aprovisionamiento de Data Streams</h3>
        <ul>
          <li><strong>Provisioned:</strong> tú defines y gestionas el número de <strong>shards</strong> (cada shard = 1 MB/s o 1.000 registros/s de entrada). Más barato si conoces la carga.</li>
          <li><strong>On-Demand:</strong> Kinesis escala los shards automáticamente según el tráfico; ideal para cargas impredecibles.</li>
        </ul>
        <h3>Orden en Kinesis</h3>
        <p>Los registros se reparten en shards según su <strong>partition key</strong>. Todos los registros con la <strong>misma partition key</strong> van al mismo shard y se procesan <strong>en orden</strong> (p. ej. usar el <em>ID de pago</em> como partition key ordena los eventos de ese pago). Retención configurable de 1 a 365 días.</p>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Para <strong>ordenar</strong>: en <strong>Kinesis</strong> usa la <strong>partition key</strong>; en <strong>SQS</strong> usa una cola <strong>FIFO</strong> con <strong>Message Group ID</strong>.</p></div></div>
        <h3>Seguridad</h3>
        <p><strong>Cifrado en reposo</strong> con <strong>KMS</strong> y en tránsito por <strong>HTTPS/TLS</strong>; el acceso se controla con <strong>IAM</strong>.</p>`
    },
    {
      id: "api-orquestacion",
      titulo: "API Gateway, Step Functions y EventBridge",
      html: `
        <h3>API Gateway</h3>
        <p>Publica y gestiona APIs (REST, HTTP o WebSocket) con caché, autenticación (IAM, Cognito, Lambda authorizer), throttling y CORS. Se integra con Lambda, endpoints HTTP, servicios AWS y recursos privados vía VPC Link.</p>
        <h3>Step Functions</h3>
        <p>Orquestación serverless como máquina de estados: estados Task, Choice, Parallel, Wait y Map. Flujos <em>Standard</em> (hasta 1 año) o <em>Express</em> (hasta 5 min). Para flujos multi-paso con reintentos y aprobaciones.</p>
        <h3>EventBridge</h3>
        <p>Bus de eventos que enruta eventos de servicios AWS, apps propias y SaaS a destinos (Lambda, SQS, SNS, Step Functions…) según <strong>reglas</strong>. Es la evolución de CloudWatch Events e incluye programación tipo cron.</p>
        <h3>Amazon MQ</h3>
        <p>Broker de mensajes gestionado (ActiveMQ/RabbitMQ) con protocolos estándar (AMQP, MQTT, STOMP). Úsalo al <strong>migrar</strong> brokers on-premises existentes; para apps nuevas nativas, usa SQS/SNS.</p>`
    }
  ],
  preguntas: [
    {
      pregunta: "El nivel web y el de procesamiento de una aplicación deben ser independientes entre sí. ¿Qué servicio los desacopla?",
      opciones: ["Una cola SQS entre ambos niveles", "Un tema SNS", "Kinesis Data Streams", "API Gateway"],
      correctas: [0],
      explicacion: "Una cola SQS entre niveles los desacopla: el productor encola y el consumidor procesa a su ritmo, absorbiendo picos y aislando fallos."
    },
    {
      pregunta: "Un mismo evento debe disparar 3 funciones Lambda diferentes. ¿Cuál es la mejor solución?",
      opciones: [
        "Una cola SQS con 3 consumidores",
        "Un tema SNS con 3 suscripciones Lambda",
        "3 llamadas encadenadas",
        "Kinesis Firehose"
      ],
      correctas: [1],
      explicacion: "SNS entrega por push a múltiples suscriptores (fan-out): un tema con 3 suscripciones Lambda invoca las tres funciones en paralelo con el mismo mensaje."
    },
    {
      pregunta: "Los pedidos deben procesarse exactamente en el orden en que se reciben. ¿Qué usar?",
      opciones: ["Cola SQS Standard", "Cola SQS FIFO", "Tema SNS estándar", "Kinesis Firehose"],
      correctas: [1],
      explicacion: "La cola SQS FIFO garantiza el orden y el procesamiento exactamente una vez. La Standard solo ofrece orden best-effort y puede duplicar."
    },
    {
      pregunta: "Una app recibe 10.000 peticiones en un minuto y debe procesarlas a lo largo de una hora sin perderlas. ¿Qué arquitectura usar?",
      opciones: [
        "SNS con entrega directa",
        "Cola SQS Standard + Auto Scaling según la profundidad de la cola",
        "Lambda síncrona directa",
        "API Gateway con caché"
      ],
      correctas: [1],
      explicacion: "SQS amortigua la ráfaga (load leveling) y un Auto Scaling que escala según el número de mensajes en la cola permite procesarlos al ritmo adecuado sin pérdidas."
    },
    {
      pregunta: "Hay que procesar millones de registros de log por segundo en tiempo real. ¿Qué servicio usar?",
      opciones: ["Amazon SQS", "Kinesis Data Streams", "Amazon SNS", "AWS Step Functions"],
      correctas: [1],
      explicacion: "Kinesis Data Streams está diseñado para ingesta y procesamiento de streaming en tiempo real a gran escala, con varios consumidores leyendo los mismos datos."
    },
    {
      pregunta: "Una subida a S3 debe disparar 3 flujos de procesamiento distintos e independientes. ¿Qué patrón usar?",
      opciones: [
        "S3 → una sola cola SQS",
        "S3 → SNS → 3 colas SQS (fan-out)",
        "S3 → Kinesis Firehose",
        "S3 → API Gateway"
      ],
      correctas: [1],
      explicacion: "El patrón fan-out: el evento de S3 publica en un tema SNS que reparte a 3 colas SQS, cada una alimentando un flujo de procesamiento independiente y desacoplado."
    },
    {
      pregunta: "Un flujo multi-paso entre microservicios necesita coordinación con manejo de errores, reintentos y ramas condicionales. ¿Qué servicio usar?",
      opciones: ["Amazon SQS", "AWS Step Functions", "Amazon SNS", "Kinesis Data Analytics"],
      correctas: [1],
      explicacion: "Step Functions orquesta flujos como máquina de estados con estados Task, Choice, Parallel y Map, e incorpora reintentos y manejo de errores."
    },
    {
      pregunta: "Distintos cambios de estado de instancias EC2 deben enrutarse a distintas funciones Lambda según reglas. ¿Qué servicio usar?",
      opciones: ["Amazon SQS", "Amazon EventBridge con reglas", "Amazon SNS", "AWS Step Functions"],
      correctas: [1],
      explicacion: "EventBridge enruta eventos a distintos destinos según reglas de filtrado, ideal para arquitecturas dirigidas por eventos con múltiples fuentes y destinos."
    },
    {
      pregunta: "En SQS, ¿qué evita que dos consumidores procesen el mismo mensaje a la vez tras leerlo de la cola?",
      opciones: ["El long polling", "El visibility timeout", "La Dead Letter Queue", "El delay queue"],
      correctas: [1],
      explicacion: "El visibility timeout hace invisible el mensaje para otros consumidores durante un tiempo (por defecto 30 s, máx. 12 h) mientras se procesa, evitando duplicados."
    },
    {
      pregunta: "Para reducir costes y respuestas vacías al leer de una cola SQS con poco tráfico, ¿qué conviene habilitar?",
      opciones: ["Short polling", "Long polling (hasta 20 s)", "Delay queues", "FIFO"],
      correctas: [1],
      explicacion: "El long polling espera hasta 20 s a que lleguen mensajes antes de responder, reduciendo llamadas vacías y costes frente al short polling por defecto."
    },
    {
      pregunta: "¿Dónde deben ir los mensajes que fallan repetidamente al procesarse en SQS para analizarlos aparte?",
      opciones: ["A un tema SNS", "A una Dead Letter Queue (DLQ)", "A EventBridge", "A CloudTrail"],
      correctas: [1],
      explicacion: "La DLQ recoge los mensajes que superan el número máximo de recepciones sin procesarse con éxito, para inspeccionarlos y depurar sin bloquear la cola principal."
    },
    {
      pregunta: "Se quiere cargar datos de streaming a S3 y Redshift con transformación opcional y la mínima gestión. ¿Qué servicio usar?",
      opciones: ["Kinesis Data Streams", "Kinesis Data Firehose", "Amazon SQS", "Amazon MQ"],
      correctas: [1],
      explicacion: "Kinesis Data Firehose entrega streams a destinos como S3, Redshift u OpenSearch de forma totalmente gestionada (sin shards), con transformación opcional vía Lambda."
    },
    {
      pregunta: "Una empresa migra a AWS aplicaciones que usan un broker de mensajes on-premises con protocolos estándar (AMQP, MQTT). ¿Qué servicio encaja mejor?",
      opciones: ["Amazon SQS", "Amazon MQ", "Amazon SNS", "EventBridge"],
      correctas: [1],
      explicacion: "Amazon MQ es un broker gestionado (ActiveMQ/RabbitMQ) con protocolos estándar, idóneo para migrar aplicaciones existentes sin reescribir su integración de mensajería."
    }
  ]
}
,

/* ===================== MÓDULO 09 ===================== */
{
  id: "09-monitorizacion",
  numero: 9,
  titulo: "Monitorización y gestión",
  resumen: "CloudWatch (métricas, alarmas, logs), auditoría con CloudTrail, cumplimiento con Config, trazas con X-Ray y Systems Manager.",
  peso: "~10–15%",
  tiempo: "45–60 min",
  teoria: [
    {
      id: "que-servicio",
      titulo: "¿Qué servicio usar?",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Pregunta</th><th>Servicio</th></tr></thead>
          <tbody>
            <tr><td>"¿Cómo rinde mi aplicación?"</td><td><strong>CloudWatch</strong> (métricas, logs, alarmas)</td></tr>
            <tr><td>"¿Quién hizo qué y cuándo?"</td><td><strong>CloudTrail</strong> (llamadas API)</td></tr>
            <tr><td>"¿El recurso es conforme?"</td><td><strong>Config</strong> (cambios de configuración)</td></tr>
            <tr><td>"¿Dónde está el cuello de botella?"</td><td><strong>X-Ray</strong> (trazas de peticiones)</td></tr>
          </tbody>
        </table></div>`
    },
    {
      id: "cloudwatch",
      titulo: "Amazon CloudWatch",
      html: `
        <p>Los cuatro pilares (regla "MALE"): <strong>M</strong>étricas, <strong>A</strong>larmas, <strong>L</strong>ogs y <strong>E</strong>ventos.</p>
        <ul>
          <li><strong>Métricas:</strong> las de EC2 por defecto (cada 5 min, gratis) incluyen CPU, red y disco (E/S), pero <strong>NO la memoria ni el espacio en disco</strong>: para eso hay que instalar el <strong>agente de CloudWatch</strong> y publicar métricas personalizadas.</li>
          <li><strong>Alarmas:</strong> estados OK / ALARM / INSUFFICIENT_DATA. Acciones: notificar por SNS, disparar Auto Scaling o acciones de EC2.</li>
          <li><strong>Logs:</strong> jerarquía Log Group → Log Stream → eventos. Con <em>metric filters</em> se extraen métricas de los logs y con <em>Logs Insights</em> se consultan.</li>
          <li><strong>Eventos (EventBridge):</strong> programación cron o por cambios de estado, con destinos Lambda, SNS, SQS, etc.</li>
        </ul>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>Error clásico: esperar la <strong>memoria de EC2</strong> en las métricas por defecto. No está: requiere el agente de CloudWatch.</p></div></div>`
    },
    {
      id: "cloudtrail-config",
      titulo: "CloudTrail y Config",
      html: `
        <h3>CloudTrail</h3>
        <ul>
          <li>Registra <strong>eventos de gestión</strong> (plano de control, p. ej. CreateBucket) y, si se habilitan aparte y con coste, <strong>eventos de datos</strong> (p. ej. S3 GetObject, Lambda Invoke).</li>
          <li>El historial de eventos es gratis y se conserva <strong>90 días</strong>; para conservarlo más, crea un <em>trail</em> que entregue a S3.</li>
          <li>Es por región salvo que crees un <strong>trail multirregión</strong>. Incluye validación de integridad de los ficheros de log.</li>
        </ul>
        <h3>Config</h3>
        <p>Registra los cambios de configuración de los recursos y evalúa <strong>reglas de cumplimiento</strong> (gestionadas o personalizadas). Estados: conforme / no conforme. Puede <strong>remediar automáticamente</strong> con Systems Manager Automation.</p>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p><strong>CloudTrail vs VPC Flow Logs:</strong> CloudTrail registra <em>llamadas API</em> a nivel de cuenta; los VPC Flow Logs registran el <em>tráfico de red</em> a nivel de VPC/subred/ENI.</p></div></div>`
    },
    {
      id: "xray-ssm",
      titulo: "X-Ray y Systems Manager",
      html: `
        <h3>AWS X-Ray</h3>
        <p>Trazado distribuido de peticiones: <strong>segmentos</strong> y <strong>subsegmentos</strong> forman <strong>trazas</strong> de extremo a extremo y un <strong>mapa de servicios</strong> visual. Ideal para localizar cuellos de botella y latencias en aplicaciones distribuidas/microservicios.</p>
        <h3>AWS Systems Manager</h3>
        <ul>
          <li><strong>Patch Manager:</strong> automatiza el parcheado del SO.</li>
          <li><strong>Session Manager:</strong> acceso seguro sin claves SSH ni bastión.</li>
          <li><strong>Run Command:</strong> ejecuta comandos en una flota de instancias.</li>
          <li><strong>Parameter Store:</strong> almacena configuración y secretos.</li>
          <li><strong>Automation:</strong> runbooks para tareas comunes (incluida remediación de Config).</li>
        </ul>
        <p>El <strong>Personal Health Dashboard</strong> avisa de incidencias de AWS que afectan específicamente a <em>tus</em> recursos, con guía de remediación.</p>`
    }
  ],
  preguntas: [
    {
      pregunta: "CloudWatch no muestra el uso de memoria de una instancia EC2. ¿Cómo obtenerlo?",
      opciones: [
        "Habilitar la monitorización detallada",
        "Instalar el agente de CloudWatch en la EC2 y publicar métricas personalizadas",
        "Crear una alarma de CPU",
        "Habilitar CloudTrail"
      ],
      correctas: [1],
      explicacion: "Las métricas por defecto de EC2 no incluyen la memoria ni el espacio en disco. Hay que instalar el agente de CloudWatch para publicar esas métricas personalizadas."
    },
    {
      pregunta: "Se necesita saber quién eliminó un objeto concreto de S3. ¿Qué servicio (y configuración) usar?",
      opciones: [
        "CloudWatch Metrics",
        "CloudTrail con eventos de datos de S3 habilitados",
        "AWS Config",
        "VPC Flow Logs"
      ],
      correctas: [1],
      explicacion: "CloudTrail audita las llamadas API. Para acciones a nivel de objeto de S3 (como DeleteObject) hay que habilitar los eventos de datos de S3 (tienen coste adicional)."
    },
    {
      pregunta: "Una aplicación distribuida va lenta y hay que averiguar qué servicio provoca el retardo. ¿Qué usar?",
      opciones: ["Amazon CloudWatch Logs", "AWS X-Ray", "AWS Config", "AWS CloudTrail"],
      correctas: [1],
      explicacion: "X-Ray ofrece trazado distribuido de extremo a extremo y un mapa de servicios que permite identificar el componente que introduce la latencia."
    },
    {
      pregunta: "Se quiere verificar de forma continua que todos los buckets de S3 tienen cifrado en servidor habilitado. ¿Qué usar?",
      opciones: [
        "CloudWatch Alarms",
        "AWS Config con la regla correspondiente",
        "CloudTrail",
        "X-Ray"
      ],
      correctas: [1],
      explicacion: "AWS Config evalúa la configuración de los recursos frente a reglas de cumplimiento (p. ej. s3-bucket-server-side-encryption-enabled) e informa de los no conformes."
    },
    {
      pregunta: "Hay que recibir una notificación cuando la CPU de una EC2 supere el 80% durante 5 minutos. ¿Cómo implementarlo?",
      opciones: [
        "CloudTrail con un trail multirregión",
        "Una alarma de CloudWatch sobre CPUUtilization que publique en un tema SNS",
        "Una regla de Config",
        "Un VPC Flow Log"
      ],
      correctas: [1],
      explicacion: "Una alarma de CloudWatch sobre la métrica CPUUtilization con acción hacia un tema SNS envía la notificación (email/SMS/Lambda) cuando se supera el umbral."
    },
    {
      pregunta: "Se quiere escalar un grupo de EC2 en función de la profundidad de una cola de la aplicación. ¿Qué enfoque usar?",
      opciones: [
        "Publicar una métrica personalizada en CloudWatch → alarma → política de Auto Scaling",
        "Usar solo la métrica de CPU por defecto",
        "Habilitar CloudTrail",
        "Usar X-Ray"
      ],
      correctas: [0],
      explicacion: "Se publica la profundidad de la cola como métrica personalizada en CloudWatch; una alarma sobre esa métrica dispara la política de Auto Scaling para ajustar la capacidad."
    },
    {
      pregunta: "¿Durante cuánto tiempo se conserva de forma gratuita el historial de eventos de CloudTrail en la consola?",
      opciones: ["7 días", "30 días", "90 días", "1 año"],
      correctas: [2],
      explicacion: "El historial de eventos de CloudTrail está disponible de forma gratuita durante 90 días. Para conservarlo más tiempo se crea un trail que entrega los logs a S3."
    },
    {
      pregunta: "¿Cuál es la diferencia entre CloudTrail y los VPC Flow Logs?",
      opciones: [
        "Ambos registran llamadas API",
        "CloudTrail registra llamadas API; los VPC Flow Logs registran el tráfico de red",
        "CloudTrail registra tráfico de red; los Flow Logs registran API",
        "Son el mismo servicio"
      ],
      correctas: [1],
      explicacion: "CloudTrail audita las llamadas a la API de AWS a nivel de cuenta; los VPC Flow Logs capturan el tráfico de red IP a nivel de VPC, subred o ENI para diagnóstico."
    },
    {
      pregunta: "Se necesita ejecutar comandos y aplicar parches del SO en una flota de instancias EC2 de forma centralizada. ¿Qué servicio usar?",
      opciones: ["AWS Systems Manager", "Amazon CloudWatch", "AWS Config", "AWS X-Ray"],
      correctas: [0],
      explicacion: "Systems Manager (Run Command y Patch Manager) permite ejecutar comandos y automatizar el parcheado del SO en una flota de instancias de forma centralizada."
    },
    {
      pregunta: "¿Cuál es el intervalo por defecto de las métricas estándar de EC2 en CloudWatch?",
      opciones: ["1 segundo", "1 minuto", "5 minutos", "15 minutos"],
      correctas: [2],
      explicacion: "Las métricas por defecto de EC2 se publican cada 5 minutos de forma gratuita. La monitorización detallada (1 minuto) tiene coste adicional."
    },
    {
      pregunta: "Una empresa quiere ser avisada de incidencias de AWS que afectan específicamente a sus propios recursos, con guía de remediación. ¿Qué usar?",
      opciones: [
        "Service Health Dashboard (estado global)",
        "Personal Health Dashboard",
        "AWS Config",
        "CloudTrail"
      ],
      correctas: [1],
      explicacion: "El Personal Health Dashboard notifica de forma proactiva las incidencias que impactan en los recursos de tu cuenta, con orientación de remediación, e integra con EventBridge."
    },
    {
      pregunta: "Ante un hallazgo de seguridad, se quiere responder automáticamente ejecutando una función Lambda. ¿Qué patrón usar?",
      opciones: [
        "GuardDuty/CloudTrail → EventBridge → Lambda",
        "CloudWatch Metrics → SNS → email",
        "Config → snapshot manual",
        "X-Ray → traza → alarma"
      ],
      correctas: [0],
      explicacion: "El patrón de respuesta automatizada enruta el hallazgo (GuardDuty o un evento de CloudTrail) por EventBridge hacia una función Lambda que ejecuta la remediación."
    }
  ]
}
,

/* ===================== MÓDULO 10 ===================== */
{
  id: "10-migracion",
  numero: 10,
  titulo: "Migración y transferencia",
  resumen: "Familia Snow, migración de bases de datos con DMS/SCT, DataSync, Storage Gateway, Transfer Family y MGN.",
  peso: "~8–12%",
  tiempo: "40–50 min",
  teoria: [
    {
      id: "seleccion",
      titulo: "Elegir el servicio de migración",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Qué migras</th><th>Servicio</th></tr></thead>
          <tbody>
            <tr><td>Bases de datos</td><td><strong>DMS</strong> (+ SCT si cambia el motor)</td></tr>
            <tr><td>Archivos (puntual/programado)</td><td><strong>DataSync</strong></td></tr>
            <tr><td>Archivos vía SFTP/FTP</td><td><strong>Transfer Family</strong></td></tr>
            <tr><td>Almacenamiento híbrido continuo</td><td><strong>Storage Gateway</strong></td></tr>
            <tr><td>Servidores / VM (lift-and-shift)</td><td><strong>MGN</strong> (Application Migration Service)</td></tr>
            <tr><td>Grandes volúmenes / internet lento</td><td><strong>Familia Snow</strong></td></tr>
          </tbody>
        </table></div>`
    },
    {
      id: "snow",
      titulo: "Familia Snow",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Dispositivo</th><th>Capacidad</th><th>Uso</th></tr></thead>
          <tbody>
            <tr><td><strong>Snowcone</strong></td><td>8–14 TB</td><td>Muy portátil, IoT, ubicaciones remotas</td></tr>
            <tr><td><strong>Snowball Edge (Storage)</strong></td><td>80 TB</td><td>Migraciones grandes de centro de datos</td></tr>
            <tr><td><strong>Snowball Edge (Compute)</strong></td><td>42 TB + GPU</td><td>Procesamiento/ML en el borde</td></tr>
            <tr><td><strong>Snowmobile</strong></td><td>100 PB</td><td>Escala exabyte (un camión, literalmente)</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Regla práctica: si transferir por internet llevaría <strong>más de una semana</strong>, usa un dispositivo Snow. Ej.: 80 TB a 100 Mbps ≈ meses; con Snowball ≈ 1 semana (envío incluido).</p></div></div>`
    },
    {
      id: "dms",
      titulo: "DMS y SCT",
      html: `
        <p><strong>DMS</strong> (Database Migration Service) migra bases de datos manteniendo la de origen <strong>en línea</strong> (migración con downtime casi nulo).</p>
        <ul>
          <li><strong>Homogénea</strong> (Oracle → Oracle): solo DMS.</li>
          <li><strong>Heterogénea</strong> (Oracle → PostgreSQL): DMS <strong>+ SCT</strong> (Schema Conversion Tool) para convertir el esquema, procedimientos y vistas.</li>
          <li><strong>CDC (Change Data Capture):</strong> replicación continua de cambios; permite mantener el destino sincronizado hasta el corte (cutover).</li>
        </ul>
        <p>Orígenes: bases on-premises, EC2, RDS, S3… Destinos: RDS, Aurora, Redshift, DynamoDB, S3, entre otros.</p>`
    },
    {
      id: "otros",
      titulo: "DataSync, Storage Gateway, Transfer Family y MGN",
      html: `
        <h3>DataSync</h3>
        <p>Transferencia automatizada de archivos (NFS/SMB) hacia S3, EFS o FSx, con cifrado en tránsito, validación de integridad y hasta 10 Gbps. Para migraciones puntuales o sincronizaciones programadas.</p>
        <h3>Storage Gateway</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Tipo</th><th>Interfaz</th><th>Uso</th></tr></thead>
          <tbody>
            <tr><td>File Gateway</td><td>NFS/SMB</td><td>Archivos como objetos en S3 (almacenamiento híbrido)</td></tr>
            <tr><td>Volume Gateway</td><td>iSCSI</td><td>Almacenamiento de bloque con respaldo en S3</td></tr>
            <tr><td>Tape Gateway</td><td>iSCSI VTL</td><td>Sustituir cintas físicas (backup a Glacier)</td></tr>
          </tbody>
        </table></div>
        <p>DataSync = transferencias puntuales/programadas; Storage Gateway = almacenamiento híbrido <strong>continuo</strong>.</p>
        <h3>Transfer Family</h3>
        <p>Recibe archivos por <strong>SFTP, FTPS o FTP</strong> y los deposita en S3 o EFS. Ideal para que terceros suban archivos o para sustituir servidores SFTP on-premises.</p>
        <h3>MGN — Application Migration Service</h3>
        <p>Lift-and-shift de servidores a EC2 mediante replicación a nivel de bloque, con pruebas no disruptivas y corte con downtime de minutos. Sustituye al antiguo SMS.</p>
        <h3>Las 6 R</h3>
        <p>Estrategias de migración: <em>Rehost</em> (lift-and-shift, MGN), <em>Replatform</em>, <em>Repurchase</em> (SaaS), <em>Refactor</em> (rediseño cloud-native), <em>Retire</em> y <em>Retain</em>.</p>`
    }
  ],
  preguntas: [
    {
      pregunta: "Hay que migrar una base de datos Oracle a RDS PostgreSQL con el mínimo tiempo de inactividad. ¿Qué usar?",
      opciones: [
        "Solo DMS",
        "DMS + SCT (Schema Conversion Tool)",
        "DataSync",
        "Snowball Edge"
      ],
      correctas: [1],
      explicacion: "Al cambiar de motor (migración heterogénea) se necesita SCT para convertir el esquema, procedimientos y vistas, y DMS para mover los datos manteniendo el origen en línea."
    },
    {
      pregunta: "Se deben transferir 80 TB de datos y la conexión a internet es de 100 Mbps (tardaría meses). ¿Qué solución usar?",
      opciones: ["AWS DataSync", "AWS Snowball Edge", "AWS Transfer Family", "AWS Direct Connect"],
      correctas: [1],
      explicacion: "Con internet lento y decenas de TB, Snowball Edge (dispositivo físico) completa la transferencia en aproximadamente una semana (envío incluido) frente a los meses por red."
    },
    {
      pregunta: "Un servidor de archivos on-premises debe sincronizarse de forma continua con S3 manteniendo acceso local con caché. ¿Qué usar?",
      opciones: [
        "AWS DataSync",
        "AWS Storage Gateway (File Gateway)",
        "AWS Snowcone",
        "AWS Transfer Family"
      ],
      correctas: [1],
      explicacion: "File Gateway ofrece almacenamiento híbrido continuo: los archivos se guardan como objetos en S3 con caché local para el acceso frecuente. DataSync es para transferencias puntuales o programadas."
    },
    {
      pregunta: "Terceros deben subir archivos por SFTP y estos deben aterrizar en S3. ¿Qué servicio usar?",
      opciones: ["AWS DataSync", "AWS Transfer Family", "AWS Storage Gateway", "AWS Snowball"],
      correctas: [1],
      explicacion: "Transfer Family soporta SFTP/FTPS/FTP y entrega los archivos directamente en S3 o EFS, ideal para subidas de terceros o para sustituir servidores SFTP on-premises."
    },
    {
      pregunta: "Se necesita migrar de una sola vez un recurso NFS de 10 TB a Amazon EFS. ¿Qué servicio usar?",
      opciones: ["AWS Storage Gateway", "AWS DataSync", "AWS DMS", "AWS Snowmobile"],
      correctas: [1],
      explicacion: "DataSync automatiza transferencias de archivos NFS/SMB hacia S3, EFS o FSx con validación de integridad, idóneo para una migración puntual de 10 TB a EFS."
    },
    {
      pregunta: "Una empresa quiere migrar 500 servidores de on-premises a AWS con estrategia lift-and-shift. ¿Qué servicio usar?",
      opciones: [
        "AWS Application Migration Service (MGN)",
        "AWS DataSync",
        "AWS DMS",
        "AWS Transfer Family"
      ],
      correctas: [0],
      explicacion: "MGN realiza el lift-and-shift de servidores a EC2 mediante replicación a nivel de bloque, con pruebas no disruptivas y corte de minutos. Sustituye al antiguo SMS."
    },
    {
      pregunta: "Una base MySQL on-premises necesita replicación continua hacia RDS mientras sigue operando. ¿Qué usar?",
      opciones: [
        "DMS con CDC (Change Data Capture)",
        "Snowball Edge",
        "DataSync",
        "Storage Gateway"
      ],
      correctas: [0],
      explicacion: "DMS con CDC replica de forma continua los cambios del origen al destino, manteniéndolos sincronizados hasta el corte final con un tiempo de inactividad mínimo."
    },
    {
      pregunta: "¿Se necesita SCT para una migración de MySQL a MySQL?",
      opciones: [
        "Sí, siempre",
        "No, porque es una migración homogénea (mismo motor)",
        "Sí, para convertir el esquema",
        "No, pero se necesita Snowball"
      ],
      correctas: [1],
      explicacion: "SCT solo hace falta en migraciones heterogéneas (motores distintos). Entre MySQL y MySQL la migración es homogénea y basta con DMS."
    },
    {
      pregunta: "Se debe migrar un volumen de datos de escala exabyte (más de 10 PB) desde un centro de datos. ¿Qué dispositivo usar?",
      opciones: ["Snowcone", "Snowball Edge", "AWS Snowmobile", "DataSync"],
      correctas: [2],
      explicacion: "Snowmobile transporta hasta 100 PB por unidad en un contenedor, siendo la opción para migraciones a escala exabyte de centros de datos completos."
    },
    {
      pregunta: "Se quiere sustituir una biblioteca de cintas físicas de backup integrando el software de copias existente con almacenamiento en la nube. ¿Qué usar?",
      opciones: [
        "Storage Gateway (Tape Gateway)",
        "Storage Gateway (File Gateway)",
        "AWS Backup directo",
        "DataSync"
      ],
      correctas: [0],
      explicacion: "Tape Gateway presenta una biblioteca de cintas virtual (VTL) compatible con el software de backup existente y archiva las cintas en Glacier, sustituyendo las cintas físicas."
    },
    {
      pregunta: "Dentro de las 6 R de la migración, ¿cómo se denomina mover una aplicación tal cual a EC2 sin apenas cambios?",
      opciones: ["Refactor", "Rehost (lift-and-shift)", "Repurchase", "Retire"],
      correctas: [1],
      explicacion: "Rehost o lift-and-shift consiste en trasladar la aplicación a AWS (EC2) con cambios mínimos, típicamente usando MGN. Refactor implica rediseñar para la nube."
    },
    {
      pregunta: "Antes de una migración se quiere inventariar servidores, dependencias de aplicaciones y datos de rendimiento on-premises. ¿Qué servicio usar?",
      opciones: [
        "AWS Application Discovery Service",
        "AWS DataSync",
        "AWS Transfer Family",
        "Amazon CloudWatch"
      ],
      correctas: [0],
      explicacion: "Application Discovery Service recopila inventario de servidores, dependencias de aplicaciones y métricas de rendimiento (con o sin agente) para planificar la migración, integrándose con Migration Hub."
    }
  ]
}
,

/* ===================== MÓDULO 11 ===================== */
{
  id: "11-analitica",
  numero: 11,
  titulo: "Analítica y Machine Learning",
  resumen: "Athena, Redshift, Glue, EMR, OpenSearch y QuickSight; más un repaso de los servicios de ML de AWS.",
  peso: "~8–12%",
  tiempo: "45–60 min",
  teoria: [
    {
      id: "seleccion",
      titulo: "Elegir el servicio de analítica",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Necesidad</th><th>Servicio</th><th>Serverless</th></tr></thead>
          <tbody>
            <tr><td>Consultar datos en S3 con SQL</td><td><strong>Athena</strong></td><td>Sí</td></tr>
            <tr><td>Almacén de datos / BI (OLAP)</td><td><strong>Redshift</strong></td><td>No</td></tr>
            <tr><td>ETL (transformación de datos)</td><td><strong>Glue</strong></td><td>Sí</td></tr>
            <tr><td>Hadoop / Spark (big data)</td><td><strong>EMR</strong></td><td>No</td></tr>
            <tr><td>Búsqueda / analítica de logs</td><td><strong>OpenSearch</strong></td><td>No</td></tr>
            <tr><td>Cuadros de mando / visualización</td><td><strong>QuickSight</strong></td><td>Sí</td></tr>
          </tbody>
        </table></div>`
    },
    {
      id: "athena",
      titulo: "Amazon Athena",
      html: `
        <p>Consultas <strong>SQL sin servidores</strong> directamente sobre datos en S3. Se paga por <strong>TB escaneado</strong> (~5$/TB). Se integra con el catálogo de Glue y sirve para consultar VPC Flow Logs, CloudTrail o logs de ALB.</p>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Para <strong>reducir coste y acelerar</strong> Athena: usa formatos columnares (<strong>Parquet/ORC</strong>, hasta 90% más baratos), <strong>comprime</strong>, <strong>particiona</strong> los datos (por fecha, región…) y evita <code>SELECT *</code>. Como cobra por datos escaneados, comprimir y usar columnar ahorra muchísimo.</p></div></div>
        <p>Patrón típico de data lake: <code>S3 → Glue Crawler → Catálogo de Glue → Athena → QuickSight</code>.</p>`
    },
    {
      id: "redshift-glue-emr",
      titulo: "Redshift, Glue y EMR",
      html: `
        <h3>Redshift</h3>
        <p>Almacén de datos (OLAP) con almacenamiento columnar y procesamiento masivamente paralelo (MPP). <strong>Redshift Spectrum</strong> consulta datos en S3 sin cargarlos, permitiendo <strong>unir datos de S3 y de Redshift</strong>. Los snapshots se guardan en S3 y pueden copiarse a otra región.</p>
        <h3>Glue</h3>
        <p>ETL <strong>serverless</strong>: el <em>Crawler</em> descubre el esquema, el <em>Catálogo</em> guarda los metadatos y los <em>Jobs</em> (Python/Scala, programados o por evento) transforman los datos. Se paga por segundo de ejecución.</p>
        <h3>EMR</h3>
        <p>Framework Hadoop gestionado (Spark, HBase, Presto, Hive…) para <strong>procesamiento de big data</strong> a gran escala. Úsalo para trabajos complejos; para un ETL simple, Glue es más sencillo. Recuerda terminar los clústeres transitorios para no incurrir en coste.</p>`
    },
    {
      id: "quicksight-otros",
      titulo: "QuickSight, OpenSearch y Lake Formation",
      html: `
        <ul>
          <li><strong>QuickSight:</strong> servicio de BI para cuadros de mando y visualizaciones, con motor en memoria <strong>SPICE</strong> y detección de anomalías por ML. Se conecta a Athena, Redshift, RDS, S3 y más.</li>
          <li><strong>OpenSearch</strong> (antes Elasticsearch): motor de búsqueda y analítica de logs (stack ELK), búsqueda de texto completo y monitorización. No sustituye a una base relacional ni a un data warehouse.</li>
          <li><strong>Lake Formation:</strong> construye data lakes seguros de forma centralizada, con control de acceso a nivel de columna/fila, usando el catálogo de Glue.</li>
          <li><strong>Kinesis Data Analytics:</strong> analítica en tiempo real sobre streams con SQL o Apache Flink.</li>
        </ul>`
    },
    {
      id: "ml",
      titulo: "Servicios de Machine Learning",
      html: `
        <p>AWS ofrece servicios de ML gestionados (sin experiencia en ML) para casos de uso concretos:</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Servicio</th><th>Para qué</th></tr></thead>
          <tbody>
            <tr><td><strong>Rekognition</strong></td><td>Análisis de imágenes y vídeo (detección de objetos, caras, moderación)</td></tr>
            <tr><td><strong>Textract</strong></td><td>Extraer texto, tablas y formularios de documentos escaneados (OCR)</td></tr>
            <tr><td><strong>Comprehend</strong></td><td>NLP: sentimiento, entidades, idioma, frases clave</td></tr>
            <tr><td><strong>Transcribe</strong></td><td>Voz a texto (transcripción de audio)</td></tr>
            <tr><td><strong>Polly</strong></td><td>Texto a voz (voces naturales)</td></tr>
            <tr><td><strong>Translate</strong></td><td>Traducción automática entre idiomas</td></tr>
            <tr><td><strong>Lex</strong></td><td>Chatbots y asistentes de voz (voz y texto)</td></tr>
            <tr><td><strong>Kendra</strong></td><td>Búsqueda inteligente en lenguaje natural sobre documentos empresariales</td></tr>
            <tr><td><strong>Forecast</strong></td><td>Previsión de series temporales (ventas, demanda)</td></tr>
            <tr><td><strong>Fraud Detector</strong></td><td>Detección de fraude online</td></tr>
            <tr><td><strong>SageMaker</strong></td><td>Plataforma completa para construir, entrenar y desplegar modelos propios</td></tr>
          </tbody>
        </table></div>`
    }
  ],
  preguntas: [
    {
      pregunta: "Se quieren analizar logs de CloudTrail almacenados en S3 con SQL y sin gestionar infraestructura. ¿Qué servicio usar?",
      opciones: ["Amazon Redshift", "Amazon Athena", "Amazon EMR", "Amazon QuickSight"],
      correctas: [1],
      explicacion: "Athena permite ejecutar consultas SQL directamente sobre datos en S3 de forma serverless, pagando por TB escaneado, sin infraestructura que gestionar."
    },
    {
      pregunta: "Se necesita inteligencia de negocio (BI) sobre petabytes de datos estructurados. ¿Qué servicio es MÁS apropiado?",
      opciones: ["Amazon Athena", "Amazon RDS", "Amazon Redshift", "Amazon OpenSearch"],
      correctas: [2],
      explicacion: "Redshift es un almacén de datos (OLAP) con almacenamiento columnar y MPP, diseñado para analítica y BI a escala de petabytes."
    },
    {
      pregunta: "Las consultas de Athena están costando demasiado. ¿Cómo reducir el coste?",
      opciones: [
        "Cambiar a formato Parquet/ORC, comprimir y particionar los datos",
        "Usar siempre SELECT *",
        "Aumentar el tamaño del clúster",
        "Migrar a EMR"
      ],
      correctas: [0],
      explicacion: "Como Athena cobra por datos escaneados, convertir a columnar (Parquet/ORC), comprimir y particionar reduce enormemente el volumen leído y, por tanto, el coste (hasta ~90%)."
    },
    {
      pregunta: "Hay que transformar datos CSV de S3 y cargarlos en Redshift cada noche, sin gestionar servidores. ¿Qué servicio usar?",
      opciones: ["AWS Glue", "Amazon EMR", "AWS Lambda", "Amazon Athena"],
      correctas: [0],
      explicacion: "Glue es un servicio de ETL serverless con planificador: descubre el esquema, transforma los datos y los carga en el destino (p. ej. Redshift) sin gestionar infraestructura."
    },
    {
      pregunta: "Se necesita búsqueda de texto completo en tiempo real sobre los logs de una aplicación. ¿Qué servicio usar?",
      opciones: ["Amazon Redshift", "Amazon OpenSearch", "Amazon Athena", "AWS Glue"],
      correctas: [1],
      explicacion: "OpenSearch (antes Elasticsearch) está diseñado para búsqueda de texto completo y analítica de logs en tiempo real (stack ELK con Kibana)."
    },
    {
      pregunta: "Se quieren crear cuadros de mando de negocio a partir de datos de Athena y Redshift. ¿Qué servicio usar?",
      opciones: ["Amazon QuickSight", "Amazon EMR", "AWS Glue", "Amazon OpenSearch"],
      correctas: [0],
      explicacion: "QuickSight es el servicio de BI de AWS para crear cuadros de mando y visualizaciones, con conexión a Athena, Redshift, RDS y S3, y motor en memoria SPICE."
    },
    {
      pregunta: "Hay que ejecutar trabajos de Apache Spark sobre grandes conjuntos de datos. ¿Qué servicio usar?",
      opciones: ["AWS Glue solo", "Amazon EMR", "Amazon Athena", "Amazon QuickSight"],
      correctas: [1],
      explicacion: "Amazon EMR es el framework Hadoop gestionado que ejecuta Spark (y HBase, Presto, Hive…) para procesamiento de big data a gran escala."
    },
    {
      pregunta: "Se necesita unir datos que están en S3 con datos que están en un clúster de Redshift, sin cargar los de S3. ¿Qué usar?",
      opciones: ["AWS Glue", "Redshift Spectrum", "Amazon Athena Federated Query", "Amazon EMR"],
      correctas: [1],
      explicacion: "Redshift Spectrum consulta datos directamente en S3 desde el clúster de Redshift, permitiendo unir en la misma consulta datos de S3 y de Redshift sin cargarlos."
    },
    {
      pregunta: "Una aplicación necesita detectar objetos y caras en imágenes subidas por los usuarios. ¿Qué servicio de ML usar?",
      opciones: ["Amazon Textract", "Amazon Rekognition", "Amazon Comprehend", "Amazon Polly"],
      correctas: [1],
      explicacion: "Rekognition analiza imágenes y vídeo (detección de objetos, caras, moderación de contenido) sin necesidad de experiencia en ML."
    },
    {
      pregunta: "Se quieren extraer los datos estructurados (tablas y formularios) de PDFs escaneados. ¿Qué servicio usar?",
      opciones: ["Amazon Transcribe", "Amazon Textract", "Amazon Translate", "Amazon Kendra"],
      correctas: [1],
      explicacion: "Textract usa OCR para extraer texto, tablas y campos de formularios de documentos escaneados, automatizando la entrada de datos."
    },
    {
      pregunta: "Se necesita analizar el sentimiento y las entidades de las reseñas de clientes (texto). ¿Qué servicio usar?",
      opciones: ["Amazon Comprehend", "Amazon Lex", "Amazon Polly", "Amazon Forecast"],
      correctas: [0],
      explicacion: "Comprehend es el servicio de procesamiento de lenguaje natural (NLP) que extrae sentimiento, entidades, idioma y frases clave de textos."
    },
    {
      pregunta: "Hay que transcribir automáticamente archivos de audio de un centro de llamadas a texto. ¿Qué servicio usar?",
      opciones: ["Amazon Polly", "Amazon Transcribe", "Amazon Translate", "Amazon Rekognition"],
      correctas: [1],
      explicacion: "Transcribe convierte voz en texto (speech-to-text), útil para analítica de call centers, subtítulos o actas de reuniones."
    },
    {
      pregunta: "Se quiere ofrecer traducción automática en tiempo real dentro de una aplicación web multilingüe. ¿Qué servicio usar?",
      opciones: ["Amazon Translate", "Amazon Comprehend", "Amazon Lex", "Amazon Kendra"],
      correctas: [0],
      explicacion: "Amazon Translate ofrece traducción automática neuronal en tiempo real y por lotes entre decenas de idiomas, ideal para localizar aplicaciones."
    }
  ]
}
,

/* ===================== MÓDULO 12 ===================== */
{
  id: "12-patrones",
  numero: 12,
  titulo: "Patrones de arquitectura",
  resumen: "Tres niveles, alta disponibilidad, recuperación ante desastres, desacoplamiento, serverless y defensa en profundidad.",
  peso: "~10–15%",
  tiempo: "45–60 min",
  teoria: [
    {
      id: "tres-niveles",
      titulo: "Arquitectura de tres niveles y subredes",
      html: `
        <p>Una aplicación web clásica se divide en tres niveles y se despliega según la seguridad de cada uno:</p>
        <ul>
          <li><strong>Presentación (web):</strong> necesita internet → <strong>subred pública</strong> (tras un ALB).</li>
          <li><strong>Aplicación (lógica):</strong> no necesita acceso directo desde internet → <strong>subred privada</strong> (sale por NAT Gateway).</li>
          <li><strong>Base de datos:</strong> con datos sensibles, aislada → <strong>subred privada</strong>, sin acceso a internet.</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Regla de examen: presentación en pública; aplicación y base de datos en privadas. Minimiza la superficie de ataque (defensa en profundidad).</p></div></div>`
    },
    {
      id: "ha",
      titulo: "Alta disponibilidad y escalado",
      html: `
        <ul>
          <li><strong>Multi-AZ + ALB + Auto Scaling:</strong> patrón estándar de alta disponibilidad dentro de una región; sobrevive al fallo de una AZ con failover automático y RTO de minutos.</li>
          <li><strong>Serverless (Lambda + DynamoDB On-Demand):</strong> absorbe picos repentinos (p. ej. 10× en un lanzamiento) sin planificar capacidad ni pre-calentar.</li>
          <li><strong>Multi-región + Route 53 (latencia):</strong> despliega la pila en varias regiones para reducir latencia del contenido <em>dinámico</em> a usuarios lejanos (CloudFront solo cachea el estático).</li>
        </ul>`
    },
    {
      id: "dr",
      titulo: "Estrategias de recuperación ante desastres (DR)",
      html: `
        <p>Se eligen según el <strong>RTO</strong> (tiempo de recuperación) y el <strong>RPO</strong> (pérdida de datos tolerable). De menor a mayor coste/rapidez:</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Estrategia</th><th>RTO / RPO</th><th>Coste</th></tr></thead>
          <tbody>
            <tr><td><strong>Backup y restauración</strong></td><td>Horas (alto)</td><td>El más bajo</td></tr>
            <tr><td><strong>Pilot Light</strong></td><td>Servicios núcleo (p. ej. BD) replicados; el resto se escala al activar</td><td>Bajo</td></tr>
            <tr><td><strong>Warm Standby</strong></td><td>Copia reducida siempre encendida; RTO/RPO menores</td><td>Medio</td></tr>
            <tr><td><strong>Multi-site activo-activo</strong></td><td>Casi cero</td><td>El más alto</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Para RPO de ~1 h y RTO de ~4 h, <strong>Pilot Light</strong> suele ser lo más rentable. Multi-site sería sobredimensionar; backup/restore podría no cumplir el RTO.</p></div></div>`
    },
    {
      id: "desacoplar",
      titulo: "Desacoplamiento y eventos",
      html: `
        <ul>
          <li><strong>SQS entre servicios:</strong> desacopla y amortigua picos sin perder mensajes; cada servicio procesa a su ritmo. Con <em>visibility timeout</em> + borrado explícito, el mensaje solo se elimina tras procesarse con éxito.</li>
          <li><strong>SNS (pub/sub):</strong> un mensaje llega a varios suscriptores (fan-out).</li>
          <li><strong>EventBridge:</strong> enruta eventos de múltiples fuentes a distintos destinos según su contenido.</li>
          <li><strong>Step Functions:</strong> orquesta flujos multi-paso con manejo de errores y reintentos.</li>
        </ul>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Procesamiento asíncrono fiable: la subida dispara una Lambda que guarda en S3, y el <strong>evento de S3</strong> dispara otra Lambda para el procesamiento pesado (evita el timeout de 29 s de API Gateway y aprovecha los 15 min de Lambda).</p></div></div>`
    },
    {
      id: "serverless-cache",
      titulo: "Serverless, caché y seguridad en capas",
      html: `
        <ul>
          <li><strong>Serverless (S3 + CloudFront + API Gateway + Lambda + DynamoDB):</strong> escala automáticamente, pago por uso y mínima gestión; ideal para tráfico impredecible.</li>
          <li><strong>Caché en capas:</strong> CloudFront (borde), caché de API Gateway, ElastiCache/DAX (datos). El patrón <em>cache-aside</em> (lazy loading) con ElastiCache es ideal para cargas de mucha lectura.</li>
          <li><strong>Defensa en profundidad:</strong> combina <strong>WAF + Shield + grupos de seguridad + NACL + cifrado KMS</strong>. Una sola capa no basta.</li>
        </ul>`
    }
  ],
  preguntas: [
    {
      pregunta: "Una app web debe soportar picos de tráfico impredecibles con mínima gestión y modelo de pago por uso. ¿Qué arquitectura es MÁS apropiada?",
      opciones: [
        "EC2 con Auto Scaling tras un ALB",
        "Arquitectura serverless con S3, CloudFront, API Gateway, Lambda y DynamoDB",
        "Contenedores ECS sobre EC2",
        "EC2 con escalado manual"
      ],
      correctas: [1],
      explicacion: "La arquitectura serverless escala automáticamente y es de pago por uso: S3/CloudFront para lo estático, API Gateway/Lambda para el cómputo y DynamoDB On-Demand, con cero gestión de infraestructura."
    },
    {
      pregunta: "Se diseña una app de alta disponibilidad que debe sobrevivir al fallo de una AZ completa con RTO < 5 min. ¿Qué patrón implementar?",
      opciones: [
        "Despliegue en una sola AZ con backups automáticos",
        "Despliegue Multi-AZ con Auto Scaling y ALB",
        "Replicación entre regiones con failover manual",
        "Una región con snapshots diarios"
      ],
      correctas: [1],
      explicacion: "Multi-AZ con ALB (reparte tráfico y comprueba salud) y Auto Scaling (reemplaza instancias fallidas) ofrece failover automático que cumple el RTO < 5 min."
    },
    {
      pregunta: "Para una base de datos de producción se toleran 1 h de pérdida de datos (RPO) y 4 h de recuperación (RTO). ¿Qué estrategia de DR es MÁS rentable?",
      opciones: ["Multi-site activo-activo", "Warm standby", "Pilot light", "Backup y restauración"],
      correctas: [2],
      explicacion: "Pilot Light mantiene replicados los servicios núcleo (como la BD) y escala el resto al activarse, cumpliendo RPO de minutos y RTO de horas de forma más económica que warm standby o multi-site."
    },
    {
      pregunta: "Una carga con mucha lectura, donde los datos se leen mucho pero se actualizan poco, necesita reducir la carga de la base de datos. ¿Qué estrategia de caché usar?",
      opciones: [
        "Write-through",
        "Cache-aside (lazy loading) con ElastiCache",
        "Solo pooling de conexiones",
        "Aumentar el tamaño de la instancia de BD"
      ],
      correctas: [1],
      explicacion: "El patrón cache-aside es ideal para lecturas intensivas: la app consulta primero la caché (ElastiCache) y solo va a la BD si hay fallo de caché, reduciendo la carga de forma económica."
    },
    {
      pregunta: "Una arquitectura de microservicios necesita desacoplar servicios para absorber picos sin perder mensajes. ¿Qué patrón usar?",
      opciones: [
        "Llamadas API directas entre servicios",
        "Colas SQS entre servicios",
        "Una base de datos compartida",
        "Comunicación por archivos en S3"
      ],
      correctas: [1],
      explicacion: "SQS aporta acoplamiento débil y amortiguación: los mensajes se persisten y no se pierden en los picos, y cada servicio procesa a su ritmo. Las llamadas directas crean acoplamiento fuerte."
    },
    {
      pregunta: "Una app desplegada en varias regiones necesita una base de datos con escrituras multi-región y resolución automática de conflictos. ¿Cuál usar?",
      opciones: [
        "RDS con réplicas de lectura entre regiones",
        "Aurora Global Database",
        "DynamoDB Global Tables",
        "Redshift con snapshots entre regiones"
      ],
      correctas: [2],
      explicacion: "Las Global Tables de DynamoDB soportan escrituras activo-activo multi-región con resolución de conflictos (last-writer-wins). Las réplicas de RDS son de solo lectura y Aurora Global tiene una única región de escritura."
    },
    {
      pregunta: "Una app de tres niveles con datos sensibles debe desplegarse de forma segura. ¿Cómo ubicar los niveles?",
      opciones: [
        "Todos en subredes públicas",
        "Todos en subredes privadas",
        "Presentación en pública; aplicación y base de datos en privadas",
        "Presentación y aplicación en pública; base de datos en privada"
      ],
      correctas: [2],
      explicacion: "La capa de presentación necesita internet (subred pública); la de aplicación y la base de datos van en subredes privadas (defensa en profundidad), saliendo la app por NAT Gateway y quedando la BD aislada."
    },
    {
      pregunta: "Una app debe procesar imágenes subidas (redimensionar, filtrar y actualizar BD); el proceso puede tardar varios minutos. ¿Qué arquitectura asegura un procesamiento fiable?",
      opciones: [
        "API Gateway → Lambda (proceso síncrono)",
        "API Gateway → Lambda → S3 → Lambda (disparada por S3) → DynamoDB",
        "EC2 haciendo polling de S3",
        "Subir directamente a EC2 para procesar"
      ],
      correctas: [1],
      explicacion: "La subida guarda en S3 y el evento de S3 dispara una segunda Lambda que procesa de forma asíncrona (hasta 15 min), evitando el timeout de 29 s de API Gateway y desacoplando el procesamiento."
    },
    {
      pregunta: "Una app financiera requiere transacciones ACID entre varias tablas y debe escalar el tráfico de lectura. ¿Qué solución usar?",
      opciones: [
        "DynamoDB",
        "Amazon Aurora con réplicas de lectura",
        "Amazon Redshift",
        "ElastiCache"
      ],
      correctas: [1],
      explicacion: "Aurora es relacional (soporta ACID) y sus réplicas de lectura (hasta 15) escalan el tráfico de lectura con mejor rendimiento que RDS estándar."
    },
    {
      pregunta: "Una web debe soportar un aumento repentino de tráfico de 10× durante lanzamientos de producto. ¿Qué patrón implementar?",
      opciones: [
        "Capacidad fija con escalado manual",
        "Auto Scaling con seguimiento de destino por CPU",
        "Pre-calentamiento con escalado programado",
        "Arquitectura serverless con Lambda y DynamoDB On-Demand"
      ],
      correctas: [3],
      explicacion: "La arquitectura serverless escala automáticamente sin pre-calentar ni planificar capacidad: Lambda llega a miles de ejecuciones concurrentes y DynamoDB On-Demand se adapta al tráfico, ideal para picos impredecibles."
    },
    {
      pregunta: "Una app usa CloudFront, ALB, EC2 y RDS. Los usuarios de una región concreta sufren lentitud. ¿Causa probable y solución?",
      opciones: [
        "Aumentar el tamaño de la instancia EC2",
        "Desplegar la pila en la región del usuario con enrutado por latencia de Route 53",
        "Habilitar la compresión de CloudFront",
        "Migrar RDS a Provisioned IOPS"
      ],
      correctas: [1],
      explicacion: "El contenido dinámico va al origen; desplegar la pila en la región del usuario y usar el enrutado por latencia de Route 53 reduce la latencia de red. Aumentar la instancia o el IOPS no afecta a la latencia de red."
    },
    {
      pregunta: "Se quiere implementar defensa en profundidad para una app web. ¿Qué combinación de servicios usar?",
      opciones: [
        "Solo grupos de seguridad",
        "WAF + Shield + grupos de seguridad + NACL + cifrado KMS",
        "Políticas IAM y grupos de seguridad",
        "Solo CloudFront con HTTPS"
      ],
      correctas: [1],
      explicacion: "La defensa en profundidad combina varias capas: WAF (aplicación), Shield (DDoS), grupos de seguridad (instancia), NACL (subred) y KMS (cifrado de datos). Una sola capa es insuficiente."
    },
    {
      pregunta: "Una app por lotes debe leer mensajes de una cola, procesarlos y borrarlos solo tras procesarlos con éxito. ¿Qué servicio y patrón usar?",
      opciones: [
        "SNS con borrado inmediato",
        "SQS con visibility timeout y borrado explícito",
        "Kinesis con checkpointing",
        "EventBridge con Lambda"
      ],
      correctas: [1],
      explicacion: "SQS oculta el mensaje durante el visibility timeout y solo se elimina con una llamada explícita a DeleteMessage tras procesarlo; si el proceso falla, el mensaje vuelve a estar visible."
    },
    {
      pregunta: "Un entorno de desarrollo usa EC2, RDS y NAT Gateway y solo se usa de lunes a viernes de 9:00 a 18:00. ¿Cómo optimizar costes?",
      opciones: [
        "Usar Instancias Reservadas",
        "Usar el Instance Scheduler para arrancar/parar los recursos fuera del horario laboral",
        "Migrar a serverless",
        "Usar Instancias Spot"
      ],
      correctas: [1],
      explicacion: "El Instance Scheduler arranca y para automáticamente EC2 y RDS según un horario, ahorrando durante noches y fines de semana (≈65% de la semana), lo más rentable para entornos de desarrollo."
    }
  ]
}
,

/* ===================== MÓDULO 13 ===================== */
{
  id: "13-costes",
  numero: 13,
  titulo: "Optimización de costes",
  resumen: "Modelos de precios, Savings Plans, Spot, clases de S3, right-sizing y herramientas de gestión de costes.",
  peso: "~10–15%",
  tiempo: "40–50 min",
  teoria: [
    {
      id: "modelos",
      titulo: "Modelos de precios de cómputo",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Modelo</th><th>Descuento</th><th>Cuándo elegirlo</th></tr></thead>
          <tbody>
            <tr><td>On-Demand</td><td>0%</td><td>Cargas cortas o impredecibles</td></tr>
            <tr><td>Spot</td><td>hasta 90%</td><td>Cargas tolerantes a fallos (por lotes, CI/CD)</td></tr>
            <tr><td>Reserved Instances</td><td>hasta 72%</td><td>Carga estable 24/7 con compromiso 1–3 años</td></tr>
            <tr><td>Savings Plans</td><td>hasta 66%</td><td>Uso estable pero flexible (EC2, Fargate, Lambda)</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>24/7 estable → <strong>Reserved o Savings Plans</strong>. Por lotes tolerante a interrupciones → <strong>Spot</strong>. Mezcla de EC2/Fargate/Lambda con uso estable → <strong>Compute Savings Plans</strong> (el más flexible). Tráfico impredecible con picos → Auto Scaling + Spot, o serverless.</p></div></div>`
    },
    {
      id: "ri-savings",
      titulo: "Reserved Instances y Savings Plans",
      html: `
        <p>El <strong>máximo descuento</strong> en RI se logra con plazo de <strong>3 años</strong> y pago <strong>All Upfront</strong> (todo por adelantado).</p>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>Standard RI</th><th>Convertible RI</th></tr></thead>
          <tbody>
            <tr><td>Descuento</td><td>hasta 72%</td><td>hasta 54%</td></tr>
            <tr><td>Flexibilidad</td><td>Cambiar solo el tamaño dentro de la familia</td><td>Cambiar familia, SO y tenencia</td></tr>
          </tbody>
        </table></div>
        <h3>Savings Plans</h3>
        <ul>
          <li><strong>Compute Savings Plans:</strong> aplican a EC2, Fargate y Lambda, en cualquier familia, tamaño o región. Los más flexibles.</li>
          <li><strong>EC2 Instance Savings Plans:</strong> mayor descuento pero limitados a una familia de instancias en una región.</li>
        </ul>`
    },
    {
      id: "s3-storage",
      titulo: "Optimización de almacenamiento",
      html: `
        <ul>
          <li><strong>Reglas de ciclo de vida:</strong> mueve datos de acceso raro a clases más baratas. Ej.: logs a <strong>Glacier Deep Archive</strong> tras 30 días para retención de 7 años.</li>
          <li><strong>Intelligent-Tiering:</strong> para patrones de acceso <strong>desconocidos o variables</strong>; mueve objetos entre niveles automáticamente sin tarifas de recuperación.</li>
          <li><strong>gp3:</strong> permite aprovisionar IOPS de forma independiente del tamaño; reduce a los IOPS que realmente necesitas (evita sobreaprovisionar).</li>
          <li><strong>Limpieza:</strong> elimina volúmenes EBS sin adjuntar y snapshots antiguos (Trusted Advisor y Config ayudan a detectarlos).</li>
        </ul>`
    },
    {
      id: "herramientas",
      titulo: "Herramientas de gestión de costes",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Herramienta</th><th>Para qué</th></tr></thead>
          <tbody>
            <tr><td><strong>Pricing Calculator</strong></td><td>Estimar costes <em>antes</em> de desplegar</td></tr>
            <tr><td><strong>Cost Explorer</strong></td><td>Analizar coste histórico, <strong>previsión</strong> (hasta 12 meses), recomendaciones de <em>right-sizing</em> y uso de RI</td></tr>
            <tr><td><strong>Budgets</strong></td><td>Presupuestos con <strong>alertas</strong> por umbral (p. ej. 80% y 100%)</td></tr>
            <tr><td><strong>Trusted Advisor</strong></td><td>Recomendaciones (instancias infrautilizadas, recursos sin usar)</td></tr>
            <tr><td><strong>Cost Allocation Tags</strong></td><td>Repartir costes por departamento/proyecto (activándolas en Facturación)</td></tr>
            <tr><td><strong>Organizations</strong></td><td>Facturación consolidada y descuentos por volumen</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p><strong>Right-sizing:</strong> ajusta el tamaño de EC2 y la memoria de Lambda al uso real. Como Lambda cobra por GB-segundo, sobredimensionar la memoria multiplica el coste. El <strong>Instance Scheduler</strong> apaga entornos de dev fuera del horario laboral (≈73% de ahorro).</p></div></div>`
    }
  ],
  preguntas: [
    {
      pregunta: "20 instancias EC2 funcionan 24/7 con uso constante desde hace 2 años y seguirán al menos 2 más. ¿Modelo de precios MÁS rentable?",
      opciones: [
        "Instancias On-Demand",
        "RI de 1 año sin pago inicial",
        "RI de 3 años con todo el pago por adelantado (All Upfront)",
        "Instancias Spot"
      ],
      correctas: [2],
      explicacion: "Una carga estable 24/7 encaja con Reserved Instances. El plazo de 3 años con All Upfront ofrece el máximo descuento (hasta 72%), justificado por el uso prolongado esperado."
    },
    {
      pregunta: "Trabajos por lotes que pueden interrumpirse y reanudarse sin pérdida de datos corren 4–6 h al día. ¿Opción de cómputo MÁS rentable?",
      opciones: ["On-Demand", "Reserved Instances", "Spot", "Dedicated Hosts"],
      correctas: [2],
      explicacion: "Spot ofrece hasta 90% de ahorro y encaja con cargas tolerantes a fallos que pueden hacer checkpoint y reanudarse, sin necesidad de compromiso a largo plazo."
    },
    {
      pregunta: "Hay que reducir el coste de 500 TB de logs en S3: los de más de 30 días se acceden raramente pero deben guardarse 7 años. ¿Qué hacer?",
      opciones: [
        "Mantener todo en S3 Standard",
        "Reglas de ciclo de vida que muevan a Glacier Deep Archive tras 30 días",
        "Borrar los logs a los 30 días",
        "Usar Intelligent-Tiering para todo"
      ],
      correctas: [1],
      explicacion: "Glacier Deep Archive es la clase más barata; una regla de ciclo de vida transiciona automáticamente a los 30 días y cumple la retención de 7 años, con un ahorro enorme frente a Standard."
    },
    {
      pregunta: "Una app usa EC2 de varias familias y regiones, además de Fargate y Lambda, con uso estable y predecible. ¿Modelo con MÁS flexibilidad y ahorro?",
      opciones: [
        "EC2 Reserved Instances",
        "Compute Savings Plans",
        "EC2 Instance Savings Plans",
        "On-Demand"
      ],
      correctas: [1],
      explicacion: "Los Compute Savings Plans aplican a EC2, Fargate y Lambda en cualquier familia, tamaño o región (hasta 66%), siendo la opción más flexible para un uso mixto y estable."
    },
    {
      pregunta: "Se quiere identificar qué instancias EC2 están infrautilizadas y podrían reducirse de tamaño. ¿Qué herramienta(s) lo recomiendan?",
      opciones: [
        "Solo AWS Budgets",
        "Cost Explorer con recomendaciones de right-sizing",
        "Solo Trusted Advisor",
        "Tanto Cost Explorer (right-sizing) como Trusted Advisor"
      ],
      correctas: [3],
      explicacion: "Cost Explorer (right-sizing) y Trusted Advisor analizan las métricas de uso y recomiendan tipos de instancia más pequeños con el ahorro estimado. Budgets solo fija límites de gasto."
    },
    {
      pregunta: "Un almacenamiento de 1 PB en S3 tiene patrones de acceso impredecibles (unos objetos frecuentes, otros raros). ¿Solución MÁS rentable?",
      opciones: [
        "S3 Standard para todo",
        "S3 Intelligent-Tiering",
        "Mover objetos manualmente entre clases",
        "S3 Glacier para todo"
      ],
      correctas: [1],
      explicacion: "Intelligent-Tiering mueve los objetos entre niveles de acceso automáticamente según su uso, sin tarifas de recuperación, óptimo cuando el patrón de acceso es desconocido o variable."
    },
    {
      pregunta: "Se quiere prever el coste de AWS de los próximos 6 meses según las tendencias de uso actuales. ¿Qué herramienta usar?",
      opciones: [
        "AWS Budgets",
        "Cost Explorer con previsión (forecasting)",
        "AWS Trusted Advisor",
        "Informe de costes y uso (CUR)"
      ],
      correctas: [1],
      explicacion: "Cost Explorer ofrece previsión de costes de hasta 12 meses a partir del histórico de uso. Budgets alerta pero no prevé y el CUR es para análisis detallado."
    },
    {
      pregunta: "50 instancias m5.large corren de forma continua con uso constante. ¿Qué tipo de RI ofrece el MAYOR descuento?",
      opciones: [
        "Standard RI, 1 año, sin pago inicial",
        "Standard RI, 3 años, All Upfront",
        "Convertible RI, 3 años, All Upfront",
        "Convertible RI, 1 año, pago parcial"
      ],
      correctas: [1],
      explicacion: "Las Standard RI dan más descuento que las Convertible; el plazo de 3 años y el pago All Upfront maximizan el ahorro (hasta 72%), viable con uso constante."
    },
    {
      pregunta: "Se quiere repartir costes por departamento (Ingeniería, Marketing, Finanzas). ¿Cómo implementarlo?",
      opciones: [
        "Crear una cuenta AWS por departamento",
        "Usar Cost Allocation Tags y activarlas en la consola de Facturación",
        "Usar una región por departamento",
        "Crear una VPC por departamento"
      ],
      correctas: [1],
      explicacion: "Las etiquetas de asignación de costes (Cost Allocation Tags) permiten agrupar el gasto por dimensiones personalizadas (p. ej. 'Departamento'); tras activarlas se ven en Cost Explorer."
    },
    {
      pregunta: "Una función Lambda tiene 3008 MB de memoria pero solo usa 512 MB, y se ejecuta 10 millones de veces al mes. ¿Cómo optimizar el coste?",
      opciones: [
        "Aumentar la memoria a 10 GB",
        "Reducir la memoria asignada a 512 MB",
        "Cambiar a EC2",
        "Mantener la configuración actual"
      ],
      correctas: [1],
      explicacion: "Lambda cobra por GB-segundo (memoria × duración). Ajustar la memoria a lo que realmente usa (512 MB) reduce el coste casi 6×. El right-sizing de memoria es clave en Lambda."
    },
    {
      pregunta: "Los costes de transferencia de datos son altos al servir contenido estático a nivel global. ¿Cómo reducirlos?",
      opciones: [
        "Usar S3 Transfer Acceleration",
        "Usar CloudFront como CDN",
        "Mover los datos a Glacier",
        "Usar instancias EC2 más grandes"
      ],
      correctas: [1],
      explicacion: "CloudFront cachea en el borde y la transferencia desde el origen (S3/EC2) hacia CloudFront es gratuita, además de que la salida hacia usuarios desde CloudFront es más barata."
    },
    {
      pregunta: "Se quiere fijar un presupuesto de 10.000 $/mes y recibir alertas al 80% y al 100%. ¿Qué servicio usar?",
      opciones: ["Cost Explorer", "AWS Budgets", "CloudWatch Alarms", "Trusted Advisor"],
      correctas: [1],
      explicacion: "AWS Budgets crea presupuestos de coste/uso con umbrales de alerta (80%, 100%) que envían notificaciones por SNS al superarse."
    },
    {
      pregunta: "Una empresa tiene RI Convertible y Standard y quiere cambiar de familia de instancia por cambios en la aplicación. ¿Cuáles se pueden modificar?",
      opciones: [
        "Solo las Standard",
        "Solo las Convertible",
        "Ambas",
        "Ninguna"
      ],
      correctas: [1],
      explicacion: "Las Convertible RI permiten cambiar familia, SO y tenencia (a cambio de menor descuento). Las Standard solo permiten cambiar el tamaño dentro de la misma familia."
    },
    {
      pregunta: "Una base de datos necesita 3.000 IOPS de forma constante, pero usa gp3 con 16.000 IOPS aprovisionados. ¿Cómo optimizar el coste?",
      opciones: [
        "Cambiar a gp2",
        "Reducir los IOPS aprovisionados a 3.000 en gp3",
        "Cambiar a almacenamiento magnético",
        "Mantener la configuración actual"
      ],
      correctas: [1],
      explicacion: "gp3 permite aprovisionar IOPS de forma independiente del tamaño; bajar de 16.000 a 3.000 IOPS mantiene el rendimiento necesario y elimina el sobreaprovisionamiento (5×)."
    },
    {
      pregunta: "Una web con tráfico impredecible que puede multiplicarse por 10 de golpe quiere minimizar costes garantizando rendimiento. ¿Qué arquitectura usar?",
      opciones: [
        "Un número fijo de instancias On-Demand",
        "Auto Scaling con seguimiento de destino + instancias Spot",
        "Grandes Instancias Reservadas",
        "Escalado manual con alarmas de CloudWatch"
      ],
      correctas: [1],
      explicacion: "Auto Scaling ajusta la capacidad según la demanda y combinar una base On-Demand con Spot para el escalado reduce el coste (hasta 90%). La capacidad fija o reservada malgasta dinero en tráfico bajo."
    }
  ]
}

]; // FIN TEORIA
