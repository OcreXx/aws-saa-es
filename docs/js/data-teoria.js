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
  resumen: "Infraestructura global, marco Well-Architected, responsabilidad compartida, gestión de cuentas y, además, cuotas de servicio, planes de soporte y cumplimiento.",
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
        </ul>
        <h3>Cuotas, soporte y cumplimiento</h3>
        <ul>
          <li><strong>Service Quotas:</strong> casi todo en AWS tiene un límite por cuenta y región (instancias EC2, VPC, direcciones IP elásticas, funciones Lambda simultáneas). Muchos son <strong>ampliables solicitándolo</strong>, y conviene hacerlo <em>antes</em> de un pico previsto o de un plan de DR; se pueden vigilar con alarmas de CloudWatch.</li>
          <li><strong>AWS Artifact:</strong> portal de autoservicio para descargar los <strong>informes de cumplimiento</strong> de AWS (SOC, ISO, PCI DSS) y firmar acuerdos como el BAA de HIPAA.</li>
          <li><strong>AWS Trusted Advisor:</strong> revisa la cuenta en cinco categorías (coste, rendimiento, seguridad, tolerancia a fallos y límites de servicio). Con soporte Basic o Developer solo se ven unas pocas comprobaciones; <strong>hacen falta Business o Enterprise</strong> para todas.</li>
          <li><strong>Planes de soporte:</strong> Basic (gratis) → Developer → <strong>Business</strong> (soporte 24/7, todos los checks de Trusted Advisor, acceso a la API de Support) → <strong>Enterprise</strong> (TAM dedicado, respuesta en 15 minutos para casos críticos, <strong>Shield Response Team</strong>).</li>
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
  resumen: "EC2, AMI y modelos de precios; balanceadores (ALB/NLB, drenaje, TLS); Auto Scaling con plantillas, hooks y warm pools; Lambda a fondo (concurrencia, VPC); contenedores ECS/EKS/Fargate; placement groups y EFA.",
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
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p><strong>Atajo de examen:</strong> "tolera interrupciones y minimiza coste" → <strong>Spot</strong>. "24/7 estable" → <strong>Reserved</strong>. "servidor físico dedicado / BYOL" → <strong>Dedicated Hosts</strong>. Instancias <strong>T</strong> = rendimiento base con créditos de ráfaga.</p></div></div>
        <h3>Spot a fondo</h3>
        <ul>
          <li>AWS recupera la capacidad con un <strong>aviso de interrupción de 2 minutos</strong> (y una <em>rebalance recommendation</em> antes, cuando el riesgo sube).</li>
          <li><strong>Spot Fleet / EC2 Fleet:</strong> piden capacidad combinando varios tipos de instancia y AZ con una estrategia de asignación (<em>capacity-optimized</em> es la que menos interrupciones sufre; <em>lowest-price</em> la más barata).</li>
          <li><strong>Política de instancias mixtas</strong> en un ASG: una base On-Demand para garantizar servicio y el resto en Spot repartido entre varios tipos. Es el patrón recomendado.</li>
          <li>No uses Spot para nodos con estado (bases de datos, el nodo maestro de un clúster) ni para cargas que no puedan reintentarse.</li>
        </ul>
        <h3>Tenencia del hardware</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Tenencia</th><th>Qué garantiza</th><th>Cuándo</th></tr></thead>
          <tbody>
            <tr><td>Compartida (por defecto)</td><td>Hardware compartido con otros clientes</td><td>Todo lo normal</td></tr>
            <tr><td><strong>Dedicated Instance</strong></td><td>Hardware físico no compartido, pero AWS decide en qué servidor (puede cambiar al parar/arrancar)</td><td>Requisito de aislamiento</td></tr>
            <tr><td><strong>Dedicated Host</strong></td><td>Un servidor físico concreto y persistente, con visibilidad de sockets y núcleos</td><td><strong>BYOL</strong> con licencias por socket/core (Windows, Oracle), auditoría de hardware</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Si la pregunta menciona <strong>licencias por socket o por núcleo</strong> → <strong>Dedicated Host</strong> (es el único que muestra el hardware). Si solo pide "hardware no compartido" → basta <strong>Dedicated Instance</strong>.</p></div></div>`
    },
    {
      id: "ami-metadatos",
      titulo: "AMI, metadatos y ciclo de vida de la instancia",
      html: `
        <h3>AMI (Amazon Machine Image)</h3>
        <p>Una <strong>AMI</strong> es la plantilla desde la que arranca una instancia: sistema operativo, software preinstalado, permisos de lanzamiento y los <strong>snapshots de EBS</strong> de sus volúmenes.</p>
        <ul>
          <li>Es un recurso <strong>regional</strong>: para usarla en otra región hay que <strong>copiarla</strong> (la copia recibe un ID nuevo). Copiar entre regiones es la base de un DR con AMI lista.</li>
          <li>Se puede <strong>compartir con otras cuentas</strong> (o hacerla pública). Si sus snapshots están cifrados con una clave gestionada por el cliente, además hay que <strong>dar permiso sobre esa clave KMS</strong> a la cuenta destino.</li>
          <li><strong>Golden AMI:</strong> AMI con la aplicación y la configuración ya dentro. Arranca mucho más rápido que instalar todo con <em>user data</em> en cada escalado, así que es lo ideal para un Auto Scaling group.</li>
          <li><strong>EC2 Image Builder:</strong> automatiza construir, probar, parchear y distribuir AMIs (y contenedores) de forma programada, incluso a varias regiones y cuentas.</li>
        </ul>
        <h3>User data y metadatos de instancia</h3>
        <ul>
          <li><strong>User data:</strong> script de arranque (<em>bootstrap</em>) que se ejecuta como root la primera vez que arranca la instancia: instalar paquetes, registrar la instancia, descargar configuración.</li>
          <li><strong>Metadatos de instancia:</strong> se consultan en <code>169.254.169.254</code> e incluyen el ID, la IP, la AZ y, sobre todo, las <strong>credenciales temporales del rol IAM</strong> asociado.</li>
        </ul>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>Exige <strong>IMDSv2</strong> (metadatos orientados a sesión con token). Con IMDSv1 una vulnerabilidad <strong>SSRF</strong> en la aplicación permite pedir los metadatos y <strong>robar las credenciales del rol</strong>. Si el examen habla de proteger las credenciales de instancia frente a SSRF → IMDSv2.</p></div></div>
        <h3>Parar, hibernar y terminar</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Acción</th><th>Qué ocurre</th></tr></thead>
          <tbody>
            <tr><td><strong>Stop / Start</strong></td><td>La instancia cambia de host físico: se <strong>pierde el instance store</strong> y la IP pública (salvo que uses una EIP). El EBS persiste. No se factura el cómputo.</td></tr>
            <tr><td><strong>Hibernar</strong></td><td>Guarda la <strong>memoria RAM en el volumen raíz</strong> (que debe estar cifrado y ser suficientemente grande) y la restaura al arrancar: procesos y caché intactos, arranque muy rápido.</td></tr>
            <tr><td><strong>Terminar</strong></td><td>Se elimina la instancia; el volumen raíz se borra salvo que se cambie <em>DeleteOnTermination</em>.</td></tr>
          </tbody>
        </table></div>
        <h3>Procesadores y rendimiento</h3>
        <ul>
          <li><strong>AWS Graviton (ARM):</strong> hasta ~40% mejor relación precio/rendimiento en cargas compatibles (Linux, contenedores, Lambda, RDS, ElastiCache). Respuesta típica a "bajar coste sin perder rendimiento y podemos recompilar".</li>
          <li><strong>Nitro:</strong> la plataforma moderna de EC2; habilita instancias más rápidas, EBS de alto rendimiento y <em>enclaves</em> para datos sensibles.</li>
          <li><strong>EBS-optimized:</strong> ancho de banda dedicado entre la instancia y EBS (en las familias actuales viene de serie).</li>
        </ul>`
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
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p><strong>ALB</strong> para enrutar por ruta/host o autenticar con Cognito/WAF. <strong>NLB</strong> cuando pidan IP estática/EIP, TCP/UDP, preservar la IP de origen o rendimiento extremo.</p></div></div>
        <h3>Ajustes que caen en el examen</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Ajuste</th><th>Qué hace</th><th>Síntoma típico</th></tr></thead>
          <tbody>
            <tr><td><strong>Deregistration delay</strong> (drenaje de conexiones)</td><td>Tiempo que el balanceador espera a que terminen las peticiones en curso antes de sacar un target (por defecto 300 s, 0–3600)</td><td>"Al escalar hacia dentro o desplegar se cortan peticiones a medias" → súbelo</td></tr>
            <tr><td><strong>Idle timeout</strong></td><td>Tiempo que el ALB mantiene abierta una conexión sin tráfico (por defecto 60 s)</td><td>Subidas lentas o respuestas largas que se cortan a los 60 s</td></tr>
            <tr><td><strong>Health check</strong></td><td>Ruta, umbrales de sano/insano e intervalo; el ELB deja de enviar tráfico al target insano</td><td>Instancias sanas marcadas como insanas: revisa ruta, código esperado y grupo de seguridad</td></tr>
            <tr><td><strong>Grupos de destino ponderados</strong></td><td>Reparte un porcentaje del tráfico entre dos target groups del mismo listener</td><td>Base de los despliegues <strong>blue/green y canary</strong></td></tr>
          </tbody>
        </table></div>
        <h3>TLS en el balanceador</h3>
        <ul>
          <li>Lo habitual es <strong>terminar TLS en el ELB</strong> con un certificado de <strong>ACM</strong> (gratis y con renovación automática) y hablar HTTP por dentro de la VPC.</li>
          <li>El <strong>ALB</strong> admite varios certificados en un mismo listener mediante <strong>SNI</strong>, y puede redirigir HTTP a HTTPS.</li>
          <li>El <strong>NLB</strong> puede terminar TLS (con ACM) o hacer <em>passthrough</em> TCP para que el cifrado llegue intacto a la instancia (cuando el requisito es cifrado extremo a extremo o mTLS propio).</li>
        </ul>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>El grupo de seguridad de las instancias debe permitir el tráfico <strong>desde el grupo de seguridad del ALB</strong>, no desde internet. Es el patrón correcto y además evita saltarse el balanceador.</p></div></div>`
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
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Usa <strong>health checks del ELB</strong> (mejor que solo EC2) y un <strong>periodo de gracia (grace period)</strong> mayor que el arranque de la app para no terminar instancias antes de tiempo (por defecto 300 s).</p></div></div>
        <h3>Horizontal frente a vertical</h3>
        <ul>
          <li><strong>Escalado vertical:</strong> una máquina más grande (cambiar el tipo de instancia, subir la memoria de una Lambda, pasar a una clase de RDS mayor). Es sencillo, pero tiene techo y normalmente implica <strong>reiniciar</strong> el recurso. Es lo típico para una base de datos relacional que escribe.</li>
          <li><strong>Escalado horizontal:</strong> más copias del mismo componente tras un balanceador (el ASG, más tasks de ECS, más réplicas de lectura). No tiene techo práctico, tolera fallos y es lo que pide casi siempre el examen. Requiere que la aplicación sea <strong>sin estado</strong>.</li>
        </ul>
        <h3>Plantillas de lanzamiento (launch templates)</h3>
        <p>El ASG necesita saber <em>qué</em> lanzar. La <strong>plantilla de lanzamiento</strong> define AMI, tipo de instancia, grupos de seguridad, rol IAM, user data y opciones de Spot; admite <strong>versiones</strong> y es la única opción recomendada: las antiguas <em>launch configurations</em> están descatalogadas y no soportan instancias mixtas ni las funciones nuevas.</p>
        <h3>Ciclo de vida y control del escalado</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Mecanismo</th><th>Para qué sirve</th></tr></thead>
          <tbody>
            <tr><td><strong>Lifecycle hooks</strong></td><td>Pausan la instancia al entrar (<em>Pending:Wait</em>) o al salir (<em>Terminating:Wait</em>) para ejecutar acciones: instalar software, registrar en un inventario o <strong>volcar los logs antes de terminarla</strong></td></tr>
            <tr><td><strong>Warm pool</strong></td><td>Mantiene instancias ya inicializadas y paradas listas para entrar en servicio en segundos: la solución cuando el arranque de la app es muy lento</td></tr>
            <tr><td><strong>Cooldown</strong></td><td>Periodo tras una acción de escalado en el que no se lanza otra, para no sobrerreaccionar (por defecto 300 s)</td></tr>
            <tr><td><strong>Política de terminación</strong></td><td>Decide a quién matar al escalar hacia dentro (por defecto: equilibra AZ y elimina la de la plantilla más antigua o la más cercana a la siguiente hora facturada)</td></tr>
            <tr><td><strong>Protección de escalado</strong> (<em>instance protection</em>)</td><td>Marca instancias que el ASG no puede terminar: p. ej. la que está procesando un trabajo largo</td></tr>
            <tr><td><strong>Instancias mixtas</strong></td><td>Combina On-Demand y Spot con varios tipos de instancia en el mismo ASG (base On-Demand + porcentaje Spot)</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Atajos: "ejecutar un script antes de terminar la instancia" → <strong>lifecycle hook</strong>. "la app tarda 10 minutos en arrancar y el escalado llega tarde" → <strong>warm pool</strong> (o golden AMI). "escala de golpe ×10 a las 9:00 todos los días" → escalado <strong>programado</strong> o <strong>predictivo</strong>, no target tracking.</p></div></div>
        <p>Un ASG debe abarcar <strong>varias AZ</strong>: reparte las instancias de forma equilibrada y, si una AZ cae, lanza capacidad en las demás. Junto con el ALB y Multi-AZ es el patrón estándar de alta disponibilidad.</p>`
    },
    {
      id: "serverless",
      titulo: "Serverless: Lambda y Step Functions",
      html: `
        <h3>AWS Lambda</h3>
        <p>Cómputo sin servidores, dirigido por eventos, con escalado automático y pago por petición + duración (GB-segundo). Límites clave:</p>
        <ul>
          <li>Tiempo máximo: <strong>15 minutos</strong> (por defecto 3 s, se aumenta).</li>
          <li>Memoria: 128 MB – <strong>10 GB</strong> (la CPU escala con la memoria).</li>
          <li>Escala de forma concurrente automáticamente (1.000 concurrentes por defecto).</li>
        </ul>
        <p>Disparadores típicos: API Gateway, eventos de S3, DynamoDB Streams, EventBridge, SNS, SQS.</p>
        <h3>Concurrencia y arranques en frío</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Concepto</th><th>Qué es</th><th>Para qué</th></tr></thead>
          <tbody>
            <tr><td><strong>Arranque en frío</strong> (cold start)</td><td>Latencia extra al crear un entorno de ejecución nuevo (peor con VPC, paquetes grandes o runtimes pesados como Java)</td><td>Síntoma: "la primera petición tarda mucho"</td></tr>
            <tr><td><strong>Concurrencia aprovisionada</strong></td><td>Mantiene N entornos inicializados y calientes</td><td><strong>Elimina el arranque en frío</strong> en APIs sensibles a la latencia (tiene coste fijo)</td></tr>
            <tr><td><strong>Concurrencia reservada</strong></td><td>Reserva parte del límite de la cuenta para una función y a la vez la limita a ese máximo</td><td>Garantizar capacidad a una función crítica o <strong>proteger una base de datos</strong> de demasiadas conexiones simultáneas</td></tr>
            <tr><td><strong>SnapStart</strong></td><td>Cachea un snapshot del entorno ya inicializado (Java)</td><td>Reduce el arranque en frío sin coste de concurrencia aprovisionada</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>El límite por defecto son <strong>1.000 ejecuciones concurrentes por cuenta y región</strong>. Al superarlo las invocaciones se rechazan (<em>throttling</em>): las asíncronas se reintentan y acaban en la <strong>DLQ / destino de error</strong>, las síncronas devuelven error al cliente.</p></div></div>
        <h3>Lambda dentro de una VPC</h3>
        <p>Por defecto una Lambda vive fuera de tu VPC y no ve los recursos privados. Si la asocias a subredes de la VPC, crea <strong>ENIs</strong> en ellas y ya puede hablar con RDS, ElastiCache o un endpoint privado.</p>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Una Lambda en subredes privadas <strong>pierde el acceso a internet</strong>: para salir necesita un <strong>NAT Gateway</strong> (o un VPC endpoint para hablar con servicios de AWS). Es un fallo clásico: "la función no llega a una API externa desde la VPC".</p></div></div>
        <h3>Otras piezas de Lambda</h3>
        <ul>
          <li><strong>Capas (layers):</strong> dependencias o librerías comunes compartidas entre funciones, fuera del paquete de despliegue.</li>
          <li><strong>Destinos y DLQ:</strong> en invocaciones asíncronas puedes enviar el resultado de éxito o de error a SQS, SNS, EventBridge u otra Lambda.</li>
          <li><strong>Event source mapping:</strong> para SQS, Kinesis y DynamoDB Streams es Lambda quien <em>sondea</em> la fuente y agrupa registros en lotes (con tamaño de lote, ventana y reintentos configurables).</li>
          <li><strong>Empaquetado:</strong> zip de hasta 50 MB (250 MB descomprimido) o <strong>imagen de contenedor</strong> de hasta 10 GB. Almacenamiento temporal en <code>/tmp</code> de 512 MB a 10 GB, o EFS montado para datos compartidos.</li>
        </ul>
        <h3>Step Functions</h3>
        <p>Orquesta flujos serverless: coordina varias Lambda con reintentos, manejo de errores, ejecución en paralelo y lógica condicional (máquina de estados).</p>`
    },
    {
      id: "contenedores",
      titulo: "Contenedores: ECS, EKS, Fargate y ECR",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Servicio</th><th>Qué es</th><th>Cuándo elegirlo</th></tr></thead>
          <tbody>
            <tr><td><strong>ECS</strong></td><td>Orquestador de contenedores propio de AWS, sencillo y muy integrado (ALB, IAM, CloudWatch)</td><td>Es la opción por defecto si no hay requisito de Kubernetes</td></tr>
            <tr><td><strong>EKS</strong></td><td>Kubernetes gestionado: AWS opera el <em>control plane</em> (multi-AZ) y tú los nodos (EC2 o Fargate)</td><td>Ya usas Kubernetes, quieres <strong>portabilidad</strong> entre nubes o su ecosistema (Helm, operadores)</td></tr>
            <tr><td><strong>Fargate</strong></td><td>Modo <em>sin servidor</em> para ECS y EKS: no gestionas ni parcheas instancias, pagas por vCPU y memoria del task</td><td>"Sin gestionar servidores", cargas intermitentes, menos trabajo operativo</td></tr>
            <tr><td><strong>ECR</strong></td><td>Registro privado de imágenes, con escaneo de vulnerabilidades y replicación entre regiones</td><td>Guardar las imágenes (se integra con Inspector)</td></tr>
          </tbody>
        </table></div>
        <h3>Los dos roles de un task de ECS — muy preguntado</h3>
        <ul>
          <li><strong>Task execution role:</strong> lo usa el <em>agente</em> de ECS para <strong>arrancar</strong> el task: descargar la imagen de ECR, escribir logs en CloudWatch y leer secretos de Secrets Manager o Parameter Store.</li>
          <li><strong>Task role:</strong> lo usa <strong>tu aplicación</strong> dentro del contenedor para llamar a servicios de AWS (S3, DynamoDB, SQS...).</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>"El contenedor no puede leer de S3" → falta permiso en el <strong>task role</strong>. "El task no arranca porque no descarga la imagen o no escribe logs" → falta permiso en el <strong>task execution role</strong>.</p></div></div>
        <h3>Red y escalado</h3>
        <ul>
          <li><strong>Modo de red awsvpc:</strong> cada task recibe su propia ENI e IP privada y su <strong>grupo de seguridad</strong> (obligatorio en Fargate). Es lo que permite aislar tasks entre sí.</li>
          <li><strong>Service Auto Scaling:</strong> ajusta el número de tasks por CPU, memoria o peticiones por target del ALB; con EC2 además hacen falta <strong>capacity providers</strong> (o un ASG) para añadir instancias donde colocarlos.</li>
          <li><strong>Balanceo:</strong> el ALB registra los tasks por IP y admite puerto dinámico, de modo que varias copias del mismo contenedor conviven en una instancia.</li>
          <li><strong>Almacenamiento:</strong> para estado compartido entre tasks, monta <strong>EFS</strong> (Fargate lo soporta); los volúmenes locales del task son efímeros.</li>
        </ul>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Coste: contenedores de larga vida y uso estable salen más baratos en <strong>EC2 con Savings Plans o Spot</strong>; cargas irregulares o picos cortos, en <strong>Fargate</strong> (incluido Fargate Spot).</p></div></div>`
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
        <h3>Red de alto rendimiento: ENA y EFA</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Adaptador</th><th>Qué aporta</th><th>Cuándo</th></tr></thead>
          <tbody>
            <tr><td><strong>ENA</strong> (Enhanced Networking)</td><td>Red acelerada por SR-IOV: hasta 100+ Gbps, menos latencia y menos CPU. Viene activado en las familias modernas</td><td>Cualquier carga que necesite mucho ancho de banda</td></tr>
            <tr><td><strong>EFA</strong> (Elastic Fabric Adapter)</td><td>Una ENA que además permite <strong>saltarse el sistema operativo</strong> (bypass del kernel) para comunicación entre nodos con latencia muy baja y consistente. Habla <strong>MPI</strong> y NCCL</td><td><strong>HPC</strong>, simulación, CFD y entrenamiento distribuido de modelos de ML</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Patrón de examen: "cluster HPC fuertemente acoplado que usa <strong>MPI</strong> y necesita la mínima latencia entre nodos" → <strong>EFA + cluster placement group</strong> en la misma AZ. Solo Linux, y el EFA no atraviesa placement groups ni AZ distintas.</p></div></div>
        <h3>Estado de sesión</h3>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Con varias instancias tras un ALB, guarda el estado de sesión en un almacén <strong>externo</strong> (ElastiCache o DynamoDB), no en disco local ni con <em>sticky sessions</em>: así cualquier instancia atiende cualquier petición y no se pierde al fallar una.</p></div></div>
        <h3>Opciones híbridas y de borde</h3>
        <ul>
          <li><strong>Outposts:</strong> infraestructura AWS en tu propio centro de datos (experiencia híbrida consistente).</li>
          <li><strong>Wavelength:</strong> cómputo en el borde de redes 5G (ultra baja latencia móvil).</li>
          <li><strong>AWS Batch:</strong> ejecución gestionada de trabajos por lotes con aprovisionamiento y planificación automáticos.</li>
          <li><strong>WorkSpaces:</strong> escritorios virtuales (VDI) gestionados para empleados y teletrabajo; <strong>AppStream 2.0</strong> transmite una <em>aplicación</em> concreta al navegador sin instalarla.</li>
          <li><strong>VMware Cloud on AWS:</strong> ejecutar tu entorno VMware existente sobre infraestructura de AWS, sin reconvertir las máquinas virtuales.</li>
          <li><strong>ECS Anywhere</strong> y <strong>EKS Anywhere</strong> llevan la gestión de contenedores a tu propio hardware; <strong>EKS Distro</strong> es la distribución de Kubernetes que usa EKS, para ejecutarla por tu cuenta.</li>
          <li><strong>Serverless Application Repository:</strong> catálogo de aplicaciones serverless listas para desplegar en tu cuenta.</li>
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
  resumen: "S3 a fondo (clases, replicación y RTC, Glacier, cifrado, sitio web estático, Batch Operations); EBS (gp3 vs gp2, io1 vs io2, Multi-Attach, snapshots y cifrado); EFS y FSx; y copias centralizadas con AWS Backup.",
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
          <li><strong>MFA Delete:</strong> exige un código MFA para borrar versiones o desactivar el versionado. Solo lo puede activar la <strong>cuenta raíz</strong>. Protege frente a borrados maliciosos.</li>
          <li><strong>Consistencia fuerte:</strong> desde 2020 S3 es <em>read-after-write</em> fuertemente consistente para PUT, DELETE y listados, sin coste ni configuración (ya no hay que "esperar" a que se propague).</li>
        </ul>
        <h3>Replicación con más detalle</h3>
        <ul>
          <li>Requiere <strong>versionado en origen y destino</strong> y un <strong>rol IAM</strong> que S3 asume para copiar. Es <strong>asíncrona</strong>.</li>
          <li>Solo replica los objetos <strong>nuevos</strong> desde que se activa la regla; para los anteriores hace falta <strong>S3 Batch Replication</strong>.</li>
          <li><strong>RTC (Replication Time Control):</strong> replica el 99,99% de los objetos en <strong>menos de 15 minutos</strong>, con SLA y métricas. Es la respuesta cuando piden un <strong>RPO garantizado</strong> en la replicación.</li>
          <li>No es transitiva (A→B y B→C no implica A→C, salvo que se configure) y los borrados solo se replican si activas la réplica de <em>delete markers</em>.</li>
          <li>Casos: <strong>CRR</strong> para DR, cumplimiento o acercar datos a usuarios de otra región; <strong>SRR</strong> para agregar logs o separar producción de un entorno de pruebas.</li>
        </ul>
        <h3>Recuperar desde Glacier</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Clase</th><th>Modos de recuperación</th><th>Tiempo</th></tr></thead>
          <tbody>
            <tr><td>Glacier Instant Retrieval</td><td>Directa</td><td>Milisegundos</td></tr>
            <tr><td>Glacier Flexible Retrieval</td><td><strong>Expedited</strong> / Standard / <strong>Bulk</strong></td><td>1–5 min / 3–5 h / 5–12 h (Bulk es gratis)</td></tr>
            <tr><td>Glacier Deep Archive</td><td>Standard / Bulk</td><td>12 h / 48 h</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p><strong>S3 Glacier Vault Lock</strong> (y <strong>Object Lock en modo Compliance</strong>) aplican <strong>WORM</strong>: una vez bloqueada la política, <em>nadie</em> — ni la cuenta raíz — puede borrar los datos antes de tiempo. Es la respuesta a "retención normativa inmutable de 7 años".</p></div></div>
        <h3>Cifrado en reposo</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Método</th><th>Gestión de claves</th><th>Cuándo</th></tr></thead>
          <tbody>
            <tr><td>SSE-S3</td><td>AWS las gestiona (AES-256)</td><td>Cifrado sencillo, opción por defecto</td></tr>
            <tr><td>SSE-KMS</td><td>AWS KMS</td><td>Auditoría (CloudTrail), rotación, permisos granulares</td></tr>
            <tr><td>SSE-C</td><td>El cliente aporta la clave</td><td>Quieres controlar las claves</td></tr>
            <tr><td>DSSE-KMS</td><td>KMS, doble capa de cifrado</td><td>Requisitos normativos muy estrictos</td></tr>
            <tr><td>Cliente</td><td>El cliente cifra antes de subir</td><td>Control total</td></tr>
          </tbody>
        </table></div>
        <p>Desde 2023 <strong>todos los objetos se cifran por defecto con SSE-S3</strong> aunque no configures nada. Si usas SSE-KMS en un bucket con mucho tráfico, activa <strong>S3 Bucket Keys</strong>: reduce hasta un 99% las llamadas a KMS y su coste.</p>
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
        </ul>
        <h3>Alojar un sitio web estático</h3>
        <p>Un bucket puede servir directamente HTML, CSS, JS e imágenes activando <strong>Static website hosting</strong> (con documento de índice y de error). El endpoint resultante es <strong>HTTP</strong> y el contenido tiene que ser público, así que el patrón recomendado es <strong>CloudFront delante del bucket con OAC</strong>: añade HTTPS con tu dominio, caché global, WAF y mantiene el bucket privado.</p>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Apunta el dominio raíz al sitio con un registro <strong>Alias</strong> de Route 53 (el CNAME no vale en el apex). Si el bucket devuelve <strong>403</strong> al publicarlo, revisa <em>Block Public Access</em> y la bucket policy; si es un <strong>404</strong>, el documento de índice.</p></div></div>
        <h3>Operar sobre muchos objetos</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Función</th><th>Para qué</th></tr></thead>
          <tbody>
            <tr><td><strong>S3 Batch Operations</strong></td><td>Ejecuta una acción sobre <strong>millones de objetos</strong> con un solo trabajo: copiar, cambiar de clase, sustituir etiquetas o ACL, aplicar Object Lock o invocar una Lambda por objeto</td></tr>
            <tr><td><strong>S3 Inventory</strong></td><td>Informe programado (CSV/Parquet) con todos los objetos y sus metadatos: tamaño, clase, cifrado, estado de replicación. Suele ser la entrada de Batch Operations</td></tr>
            <tr><td><strong>S3 Storage Lens</strong></td><td>Panel de análisis de uso y coste de <strong>toda la organización</strong>, con recomendaciones (objetos no accedidos, subidas multiparte incompletas)</td></tr>
            <tr><td><strong>Requester Pays</strong></td><td>El <strong>solicitante</strong> paga la descarga y la petición, no el dueño del bucket. Para compartir grandes datasets sin asumir el coste de salida</td></tr>
            <tr><td><strong>S3 Object Lambda</strong></td><td>Transforma el objeto <em>al vuelo</em> al recuperarlo (redactar datos personales, convertir formatos) sin guardar copias</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Ahorro silencioso: las <strong>subidas multiparte incompletas</strong> siguen ocupando y facturando. Añade siempre una regla de ciclo de vida que las aborte a los 7 días (Storage Lens y Trusted Advisor las detectan).</p></div></div>`
    },
    {
      id: "ebs",
      titulo: "EBS: volúmenes y snapshots",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Tipo</th><th>IOPS máx.</th><th>Rendimiento</th><th>Uso</th></tr></thead>
          <tbody>
            <tr><td><strong>gp3</strong> (SSD)</td><td>16.000</td><td>1.000 MB/s</td><td>Uso general y arranque. La opción por defecto hoy</td></tr>
            <tr><td>gp2 (SSD, anterior)</td><td>16.000</td><td>250 MB/s</td><td>Generación previa; los IOPS dependen del tamaño</td></tr>
            <tr><td><strong>io2</strong> / io1 (SSD)</td><td>64.000 (256.000 con Block Express)</td><td>1.000–4.000 MB/s</td><td>Bases de datos críticas, IOPS altos y consistentes</td></tr>
            <tr><td>st1 (HDD)</td><td>500</td><td>500 MB/s</td><td>Big data, logs (acceso secuencial)</td></tr>
            <tr><td>sc1 (HDD)</td><td>250</td><td>250 MB/s</td><td>Datos fríos, acceso poco frecuente (el más barato)</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>Los HDD (<strong>st1</strong> y <strong>sc1</strong>) <strong>no pueden ser volumen de arranque</strong>, y su rendimiento se mide en throughput, no en IOPS: sirven para lecturas secuenciales grandes, nunca para una base de datos.</p></div></div>
        <h3>gp3 vs gp2 — por qué gp3 gana casi siempre</h3>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>gp2</th><th>gp3</th></tr></thead>
          <tbody>
            <tr><td>Rendimiento base</td><td><strong>3 IOPS por GB</strong> (mínimo 100): para 16.000 IOPS necesitas 5,3 TB aunque no uses el espacio</td><td><strong>3.000 IOPS y 125 MB/s incluidos</strong> en cualquier tamaño</td></tr>
            <tr><td>Ampliar rendimiento</td><td>Solo agrandando el volumen</td><td><strong>IOPS y throughput se aprovisionan aparte del tamaño</strong></td></tr>
            <tr><td>Ráfagas</td><td>Sistema de <strong>créditos de ráfaga</strong> (hasta 3.000 IOPS): al agotarse, el rendimiento se desploma</td><td>Rendimiento constante, sin créditos</td></tr>
            <tr><td>Coste</td><td>Referencia</td><td>~20% más barato por GB</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>"El volumen va rápido un rato y luego se ralentiza" → son los <strong>créditos de ráfaga de gp2</strong> agotados: migra a <strong>gp3</strong>. "Sobreaprovisionamos un volumen enorme solo para tener IOPS" → gp3 también, porque separa IOPS de capacidad.</p></div></div>
        <h3>io1 vs io2 y Multi-Attach</h3>
        <ul>
          <li><strong>Durabilidad:</strong> io2 ofrece <strong>99,999%</strong> frente al 99,8–99,9% de io1 y del resto (100 veces más fiable), <strong>al mismo precio</strong>: si el examen ofrece los dos, io2.</li>
          <li><strong>Ratio IOPS/GB:</strong> io2 llega a 500 IOPS por GB (io1, 50), así que necesita menos capacidad para el mismo rendimiento.</li>
          <li><strong>io2 Block Express:</strong> hasta <strong>256.000 IOPS, 4.000 MB/s y 64 TiB</strong> con latencia de microsegundos, en instancias Nitro. Para SAP HANA, Oracle o SQL Server exigentes.</li>
          <li><strong>Multi-Attach:</strong> solo io1/io2 pueden estar conectados a <strong>hasta 16 instancias a la vez</strong>, y siempre <strong>dentro de la misma AZ</strong>. Necesita un sistema de ficheros de clúster (no vale ext4/XFS); si lo que piden es "compartido entre instancias", la respuesta correcta suele ser <strong>EFS</strong>, no Multi-Attach.</li>
        </ul>
        <h3>Snapshots</h3>
        <ul>
          <li>Copias <strong>incrementales</strong> (solo bloques cambiados), almacenadas en S3 y gestionadas por AWS (multi-AZ).</li>
          <li>Se pueden copiar entre regiones, crear una AMI, o cifrar durante la copia.</li>
          <li>EBS es de una sola AZ; para mover a otra AZ, haz snapshot y restaura allí. <strong>Copiar snapshots a otra región es la base de un DR de backup y restauración.</strong></li>
          <li><strong>Fast Snapshot Restore (FSR):</strong> los volúmenes restaurados de un snapshot son "perezosos" (los primeros accesos son lentos mientras se hidratan desde S3). FSR los deja <strong>a pleno rendimiento desde el primer bloque</strong>, con un coste por snapshot y AZ.</li>
          <li><strong>Data Lifecycle Manager (DLM):</strong> automatiza crear, retener, copiar entre regiones y borrar snapshots y AMIs según una política.</li>
          <li><strong>EBS Snapshot Archive:</strong> hasta 75% más barato para snapshots de larga retención (restauración en 24–72 h).</li>
        </ul>
        <h3>Cifrado de EBS</h3>
        <ul>
          <li>Usa <strong>KMS</strong> (AES-256) y cifra datos en reposo, en tránsito entre la instancia y el volumen, los <strong>snapshots</strong> y todos los volúmenes creados a partir de ellos. El impacto en rendimiento es inapreciable.</li>
          <li>Un volumen <strong>no se puede descifrar</strong>, y uno sin cifrar no se cifra "in situ": el camino es <strong>snapshot → copia del snapshot con cifrado activado → volumen nuevo</strong> (o restaurar una AMI creada desde él).</li>
          <li>Activa <strong>cifrado por defecto</strong> en la cuenta y región para que todo volumen nuevo nazca cifrado.</li>
          <li>Para compartir un snapshot cifrado con otra cuenta hace falta una <strong>clave gestionada por el cliente</strong> y dar permiso sobre ella en la política de la clave (las claves propias de AWS no se pueden compartir).</li>
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
          <li>Se accede por un <strong>mount target</strong> (una ENI) <strong>en cada AZ</strong>, protegido por su grupo de seguridad: las instancias montan el de su propia AZ.</li>
        </ul>
        <div class="tablewrap"><table>
          <thead><tr><th>Ajuste</th><th>Opciones</th><th>Cuándo</th></tr></thead>
          <tbody>
            <tr><td>Clases de almacenamiento</td><td>Standard, <strong>Standard-IA</strong>, One Zone, One Zone-IA</td><td>Una <strong>política de ciclo de vida</strong> mueve a IA los ficheros no accedidos en N días: es la forma estándar de abaratar EFS (hasta ~92%)</td></tr>
            <tr><td>Modo de rendimiento</td><td>General Purpose / Max I/O</td><td>General Purpose para latencia baja (lo normal); Max I/O para miles de clientes en paralelo a costa de más latencia</td></tr>
            <tr><td>Modo de throughput</td><td><strong>Elastic</strong> / Bursting / Provisioned</td><td>Elastic se ajusta solo (recomendado); Provisioned cuando necesitas más throughput del que da tu tamaño</td></tr>
          </tbody>
        </table></div>
        <ul>
          <li><strong>EFS Access Points:</strong> puntos de entrada con un usuario/grupo POSIX y un directorio raíz impuestos: cada aplicación o contenedor ve solo su carpeta. Muy usados con ECS/Fargate y Lambda.</li>
          <li>Cifrado en reposo con KMS y en tránsito con TLS; el acceso se controla con grupos de seguridad y con <strong>políticas de sistema de archivos</strong> basadas en IAM.</li>
        </ul>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>EFS cuesta bastante más por GB que S3 o EBS. Si la pregunta pide "abaratar EFS" la respuesta es <strong>ciclo de vida a Standard-IA</strong> (o One Zone si no necesitas resiliencia multi-AZ), no cambiar de servicio.</p></div></div>
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
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Archivos compartidos: <strong>Windows/SMB → FSx for Windows</strong>; <strong>Linux/NFS → EFS</strong>; <strong>HPC/ML de máximo rendimiento → FSx for Lustre</strong>.</p></div></div>
        <p><strong>FSx for Lustre</strong> puede montarse <em>sobre</em> un bucket de S3: lee los objetos como ficheros y devuelve los resultados a S3. Es el patrón de HPC y ML sobre un data lake.</p>`
    },
    {
      id: "aws-backup",
      titulo: "Copias de seguridad centralizadas: AWS Backup",
      html: `
        <p><strong>AWS Backup</strong> centraliza y automatiza las copias de seguridad de muchos servicios desde un único sitio, en lugar de configurar snapshots servicio por servicio.</p>
        <ul>
          <li><strong>Qué protege:</strong> EBS, EC2 (la instancia entera), RDS y Aurora, DynamoDB, EFS, FSx, Storage Gateway, DocumentDB, Neptune, S3 y servidores VMware.</li>
          <li><strong>Backup plan:</strong> define <em>cada cuánto</em> se copia, <strong>cuánto se retiene</strong>, cuándo pasa a almacenamiento <strong>frío</strong> y si se <strong>copia a otra región o a otra cuenta</strong>. Los recursos se asignan al plan por <strong>etiquetas</strong>, así que todo recurso nuevo etiquetado queda protegido automáticamente.</li>
          <li><strong>Backup vault:</strong> el almacén cifrado con KMS donde caen los puntos de recuperación.</li>
          <li><strong>Vault Lock (modo Compliance):</strong> hace las copias <strong>inmutables</strong>: nadie, ni un administrador ni la cuenta raíz, puede acortar la retención ni borrarlas. Es la defensa frente a <strong>ransomware</strong> y la respuesta a auditorías de retención.</li>
          <li><strong>Multicuenta:</strong> con Organizations se aplican <strong>políticas de backup</strong> a toda una OU y se auditan con <strong>AWS Backup Audit Manager</strong>.</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Atajo: "copias centralizadas, con retención uniforme y demostrable, de varios servicios y varias cuentas" → <strong>AWS Backup</strong>. "Snapshots de EBS/AMI automatizados y nada más" → también vale <strong>Data Lifecycle Manager</strong>, pero AWS Backup es la respuesta cuando hay <strong>cumplimiento</strong>, varias cuentas o servicios mezclados.</p></div></div>`
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
  resumen: "RDS y Aurora (endpoints, Serverless v2, réplicas y promoción, blue/green), Multi-AZ, DynamoDB a fondo (GSI vs LSI, TTL, PITR, transacciones), ElastiCache, Redshift y bases especializadas.",
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
            <tr><td>Series temporales (IoT, métricas)</td><td><strong>Timestream</strong></td></tr>
            <tr><td>Redis en memoria <em>duradero</em> (base de datos, no solo caché)</td><td><strong>MemoryDB for Redis</strong></td></tr>
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
          <li><strong>Aurora Serverless v2:</strong> escala el cómputo <em>en caliente</em> y de forma granular (en <strong>ACU</strong>, de <strong>0 a 256</strong>) sin cortar conexiones, y admite Multi-AZ, réplicas y Global Database. Con capacidad mínima de <strong>0 ACU</strong> se <strong>pausa automáticamente</strong> cuando no hay carga y se reanuda al llegar una conexión, así que ya no es la v1 la única que llegaba a cero. Es la versión vigente; la v1 escalaba a saltos y está descatalogada.</li>
          <li><strong>Prioridad de failover (tiers 0–15):</strong> Aurora promociona la réplica con el <em>tier</em> más bajo y, a igualdad de tier, la de mayor tamaño. Así decides qué réplica se convierte en writer.</li>
          <li><strong>Aurora Multi-Master</strong> (varios nodos de escritura simultáneos) fue una opción especializada de Aurora MySQL 5.6 y <strong>ya no está disponible</strong> en las versiones actuales: hoy la respuesta es un writer + réplicas de lectura, o Global Database escribiendo en la región principal.</li>
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
        </ul>
        <h3>Réplicas de lectura: detalles que caen</h3>
        <ul>
          <li>Hasta <strong>15 réplicas</strong> por instancia en MySQL, MariaDB y PostgreSQL (5 en Oracle y SQL Server), y 15 en Aurora. Pueden estar en <strong>otra AZ o en otra región</strong>.</li>
          <li><strong>Promoción:</strong> una réplica puede <strong>promocionarse a instancia independiente</strong>. Una réplica de lectura <strong>cross-region promovida</strong> es la receta clásica de DR para RDS (RPO de segundos/minutos, RTO de minutos).</li>
          <li>Ojo al coste: la replicación <strong>entre regiones</strong> paga transferencia de datos; dentro de la misma región entre AZ, en RDS, no se cobra.</li>
          <li>La aplicación debe apuntar explícitamente al <strong>endpoint de la réplica</strong> para leer de ella (en Aurora, al <em>reader endpoint</em>).</li>
        </ul>
        <h3>Multi-AZ clásico vs Multi-AZ DB cluster</h3>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>Multi-AZ (instancia)</th><th>Multi-AZ DB cluster</th></tr></thead>
          <tbody>
            <tr><td>Topología</td><td>1 primaria + 1 standby</td><td>1 escritor + <strong>2 standby en otras 2 AZ</strong></td></tr>
            <tr><td>¿Se lee del standby?</td><td><strong>No</strong></td><td><strong>Sí</strong>, son legibles</td></tr>
            <tr><td>Failover</td><td>1–2 min</td><td>Normalmente &lt; 35 s</td></tr>
          </tbody>
        </table></div>
        <h3>Operación y despliegues</h3>
        <ul>
          <li><strong>Escalado automático de almacenamiento:</strong> RDS amplía el disco solo al acercarse al límite (defines un techo). Evita la caída por disco lleno.</li>
          <li><strong>Blue/Green Deployments:</strong> crea un entorno verde sincronizado para actualizar la versión del motor o el esquema y hacer el cambio en <strong>menos de un minuto</strong>, con vuelta atrás fácil.</li>
          <li><strong>Performance Insights</strong> (qué consultas cargan la base de datos) y <strong>Enhanced Monitoring</strong> (métricas del sistema operativo cada segundo) para diagnosticar cuellos de botella.</li>
          <li><strong>Eventos de RDS</strong> a SNS: avisan de failover, bajo espacio, fin de backup, etc.</li>
          <li>Las <strong>ventanas de mantenimiento</strong> aplican parches (en Multi-AZ, primero al standby y luego con failover, minimizando la parada).</li>
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
            <tr><td>Global Tables</td><td>Replicación multi-región activa-activa (lecturas globales rápidas). Por defecto la consistencia entre regiones es <strong>eventual</strong>; también existe el modo de <strong>consistencia fuerte multirregión (MRSC)</strong></td></tr>
          </tbody>
        </table></div>
        <p><strong>Modos de capacidad:</strong> <em>Provisioned</em> (RCU/WCU fijos, más barato si es predecible) u <em>On-Demand</em> (pago por petición, para tráfico impredecible). <strong>Consistencia:</strong> eventual (por defecto, más barata) o fuerte (refleja las últimas escrituras).</p>
        <h3>Índices: GSI vs LSI — muy preguntado</h3>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>GSI (global)</th><th>LSI (local)</th></tr></thead>
          <tbody>
            <tr><td>Clave</td><td>Clave de partición <strong>distinta</strong> de la tabla</td><td><strong>Misma</strong> clave de partición, otra clave de ordenación</td></tr>
            <tr><td>Cuándo se crea</td><td>En cualquier momento</td><td><strong>Solo al crear la tabla</strong> (no se añade después)</td></tr>
            <tr><td>Capacidad</td><td>La suya propia (RCU/WCU separados)</td><td>Comparte la de la tabla</td></tr>
            <tr><td>Consistencia</td><td>Solo eventual</td><td>Admite lectura <strong>fuertemente consistente</strong></td></tr>
            <tr><td>Límite</td><td>20 por tabla</td><td>5 por tabla, y máx. 10 GB por valor de clave de partición</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>"Consultar por un atributo que no es la clave" → <strong>GSI</strong>. "Otra forma de ordenar dentro de la misma partición y con consistencia fuerte" → <strong>LSI</strong>, pero solo si se pensó al crear la tabla. Si el GSI se queda sin capacidad, el <strong>throttling se contagia a las escrituras de la tabla</strong>.</p></div></div>
        <h3>Capacidad, rendimiento y errores</h3>
        <ul>
          <li><strong>Auto Scaling</strong> ajusta RCU/WCU en modo provisionado; <strong>capacidad adaptativa</strong> (automática) reparte capacidad hacia particiones calientes y aísla los elementos más pedidos.</li>
          <li><strong>ProvisionedThroughputExceededException:</strong> síntoma de clave de partición mal elegida (poca cardinalidad) o de picos: reintenta con <em>backoff exponencial</em>, cambia a On-Demand o mete <strong>DAX</strong> delante para lecturas.</li>
          <li><strong>Capacidad reservada:</strong> compromiso de 1–3 años sobre RCU/WCU para abaratar cargas estables.</li>
          <li>Tamaño máximo de un elemento: <strong>400 KB</strong>. Para ficheros grandes, guarda el objeto en <strong>S3</strong> y en DynamoDB solo el puntero.</li>
        </ul>
        <h3>Datos, copias y operaciones</h3>
        <ul>
          <li><strong>TTL:</strong> un atributo con fecha de caducidad y DynamoDB <strong>borra solo</strong> los elementos vencidos, gratis. Ideal para sesiones, carritos o datos temporales (y el borrado aparece en Streams).</li>
          <li><strong>PITR:</strong> recuperación a cualquier segundo de los <strong>últimos 35 días</strong>. Los <strong>backups bajo demanda</strong> se guardan indefinidamente. Ambos sin afectar al rendimiento.</li>
          <li><strong>Transacciones:</strong> ACID sobre varios elementos y hasta 100 acciones; para todo lo demás bastan las <strong>escrituras condicionales</strong> (bloqueo optimista con un número de versión).</li>
          <li><strong>Export a S3:</strong> vuelca la tabla a S3 (sin consumir capacidad) para analizarla con Athena o cargarla en Redshift.</li>
          <li><strong>Streams + Lambda:</strong> patrón estándar para reaccionar a cambios, agregar datos o mantener otro sistema sincronizado.</li>
        </ul>`
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
        <p>Se pone <strong>delante de la base de datos</strong> para reducir carga de lectura y acelerar respuestas. <strong>ElastiCache Serverless</strong> evita dimensionar nodos, y <strong>MemoryDB for Redis</strong> es la variante <em>duradera</em> (multi-AZ con log transaccional): sirve como base de datos principal en memoria, no solo como caché.</p>
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
        <ul>
          <li><strong>Nodos RA3:</strong> separan cómputo y almacenamiento (Redshift Managed Storage), así escalas cada uno por su lado. <strong>Redshift Serverless</strong> evita dimensionar el clúster.</li>
          <li><strong>Concurrency Scaling:</strong> añade clústeres temporales cuando llegan muchas consultas a la vez, para que no se encolen.</li>
          <li>Los <strong>snapshots</strong> van a S3 y pueden copiarse a otra región (DR del almacén de datos).</li>
        </ul>
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
  resumen: "VPC (NAT, egress-only, DNS), SG/NACL y Network Firewall, conectividad híbrida (Peering, VPN, Direct Connect, Transit Gateway), endpoints y PrivateLink, Route 53 con Resolver híbrido, CloudFront a fondo y Global Accelerator.",
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
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Nunca pongas bases de datos en subredes públicas. Patrón típico: web/ALB en subred pública, app y BD en subredes privadas con salida vía NAT Gateway.</p></div></div>
        <h3>NAT Gateway vs NAT Instance</h3>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>NAT Gateway</th><th>NAT Instance (heredado)</th></tr></thead>
          <tbody>
            <tr><td>Gestión</td><td>Gestionado por AWS, sin parches</td><td>Una EC2 que administras tú</td></tr>
            <tr><td>Disponibilidad</td><td>Redundante <strong>dentro de su AZ</strong></td><td>Depende de ti (script de failover)</td></tr>
            <tr><td>Ancho de banda</td><td>5 Gbps de base, escala solo hasta <strong>100 Gbps</strong> (y de 1 a 10 millones de paquetes/s)</td><td>El del tipo de instancia</td></tr>
            <tr><td>Grupos de seguridad</td><td><strong>No admite</strong> (se filtra en las subredes)</td><td>Sí, y hay que <strong>desactivar la comprobación origen/destino</strong></td></tr>
            <tr><td>Bastión</td><td>No puede hacerlo</td><td>Puede usarse también como bastión</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>Un NAT Gateway <strong>vive en una sola AZ</strong>: si esa AZ cae, las subredes privadas que rutan a él se quedan sin salida. Para alta disponibilidad, <strong>un NAT Gateway por AZ</strong> y que cada tabla de rutas apunte al de su zona. Además se factura por hora <strong>y por GB procesado</strong>: mandar el tráfico a S3 por un <strong>Gateway Endpoint</strong> ahorra ese coste.</p></div></div>
        <p>Novedad reciente: además del NAT Gateway <strong>zonal</strong> de toda la vida existe el <strong>NAT Gateway regional</strong>, que se expande y contrae solo por las AZ donde tengas cargas (alta disponibilidad por defecto y sin necesidad de subred pública). Para el examen, la respuesta clásica sigue siendo <strong>un NAT Gateway por AZ</strong>, pero conviene que el término no te pille de nuevas.</p>
        <h3>IPv6 y salida solo de ida</h3>
        <p>En IPv6 todas las direcciones son públicas, así que no hay NAT: para que una subred privada IPv6 pueda <strong>salir a internet sin ser alcanzable desde fuera</strong> se usa un <strong>Egress-Only Internet Gateway</strong> (el equivalente al NAT Gateway, pero para IPv6).</p>
        <h3>DNS dentro de la VPC</h3>
        <p>La VPC ofrece un resolutor DNS en la segunda IP de su rango (y en <code>169.254.169.253</code>). Para que los nombres privados y las zonas privadas de Route 53 funcionen, la VPC necesita <strong>enableDnsSupport</strong> y <strong>enableDnsHostnames</strong> activados.</p>`
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
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>El grupo de seguridad, al ser <strong>con estado</strong>, gestiona el retorno automáticamente: <strong>no</strong> hace falta abrir puertos efímeros en él.</p></div></div>
        <h3>¿Y AWS Network Firewall?</h3>
        <p>Cuando los SG y las NACL se quedan cortos, <strong>AWS Network Firewall</strong> es un firewall gestionado <strong>a nivel de VPC</strong> con inspección profunda: filtrado por <strong>dominio</strong> (allow-list de destinos de salida), reglas Suricata, IPS/IDS y control centralizado del tráfico. Se despliega en subredes propias y se gobierna a escala con <strong>Firewall Manager</strong>.</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Capa</th><th>Herramienta</th><th>Qué filtra</th></tr></thead>
          <tbody>
            <tr><td>Instancia (ENI)</td><td>Grupo de seguridad</td><td>IP y puerto; solo permitir; con estado</td></tr>
            <tr><td>Subred</td><td>NACL</td><td>IP y puerto; permite y <strong>deniega</strong>; sin estado</td></tr>
            <tr><td>VPC</td><td><strong>Network Firewall</strong></td><td>Dominios, protocolos y firmas (IPS), entrada y salida</td></tr>
            <tr><td>Aplicación (capa 7)</td><td><strong>WAF</strong></td><td>HTTP: SQLi, XSS, límite de tasa, geo (sobre ALB, CloudFront o API Gateway)</td></tr>
          </tbody>
        </table></div>`
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
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>El <strong>Gateway Endpoint no es accesible desde on-premises</strong> (VPN/Direct Connect) ni desde una VPC emparejada. Para llegar a S3/DynamoDB (u otro servicio) <strong>desde on-premises o entre VPC</strong>, usa un <strong>Interface Endpoint (PrivateLink)</strong>, que sí es alcanzable por VPN, Direct Connect y Peering.</p></div></div>
        <h3>Políticas de endpoint y PrivateLink</h3>
        <ul>
          <li>Una <strong>política de endpoint</strong> limita a qué recursos se puede llegar a través de él (por ejemplo, "solo a los buckets de mi organización"). Es la forma de <strong>evitar la exfiltración</strong> de datos a buckets de terceros.</li>
          <li>En el lado contrario, una <strong>bucket policy</strong> puede exigir la condición <code>aws:SourceVpce</code> para que el bucket <strong>solo</strong> acepte tráfico por tu endpoint.</li>
          <li><strong>PrivateLink</strong> expone un servicio propio: se publica detrás de un <strong>NLB</strong> (o GWLB) como <em>endpoint service</em> y los consumidores lo alcanzan con un interface endpoint en su VPC, sin peering, sin rutas y <strong>sin problema de CIDR solapados</strong>. Es la forma recomendada de compartir un servicio con muchas VPC o cuentas.</li>
        </ul>`
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
        <h3>Client VPN: usuarios, no sedes</h3>
        <p>La Site-to-Site VPN conecta <strong>redes</strong>. Para conectar <strong>personas</strong> (teletrabajo, administradores) está <strong>AWS Client VPN</strong>: un servicio gestionado basado en <strong>OpenVPN</strong> al que cada usuario se conecta desde su portátil y entra en la VPC como un dispositivo más.</p>
        <ul>
          <li>Autenticación con <strong>Active Directory</strong>, SAML (IAM Identity Center) o certificados mutuos.</li>
          <li><strong>Reglas de autorización</strong> por grupo: quién llega a qué subred o red de destino.</li>
          <li>Con <em>split tunnel</em> solo viaja por el túnel el tráfico hacia AWS; sin él, todo el tráfico del portátil pasa por la VPC (útil para inspeccionarlo).</li>
          <li>Da acceso también a on-premises si la VPC tiene VPN o Direct Connect.</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Atajo: "conectar la <strong>oficina</strong> con AWS" → <strong>Site-to-Site VPN</strong>. "Que los <strong>empleados en remoto</strong> lleguen a recursos privados de la VPC" → <strong>Client VPN</strong>. "Entrar por shell a una EC2 sin bastión ni claves" → <strong>Session Manager</strong>.</p></div></div>
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
        <p>Los health checks se integran con <strong>CloudWatch</strong> y pueden disparar <strong>alertas por SNS</strong> cuando un recurso pasa a no disponible.</p>
        <h3>Route 53 Resolver: DNS híbrido</h3>
        <p>El resolutor de la VPC resuelve nombres de AWS, pero en un entorno híbrido hay que resolver <strong>en los dos sentidos</strong>. Para eso están los <strong>endpoints de Route 53 Resolver</strong>, que son ENIs en tu VPC:</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Tipo de endpoint</th><th>Dirección</th><th>Para qué</th></tr></thead>
          <tbody>
            <tr><td><strong>Inbound</strong> (de entrada)</td><td>On-premises → AWS</td><td>Que tus servidores DNS del centro de datos resuelvan nombres de la VPC y de tus <strong>zonas privadas</strong></td></tr>
            <tr><td><strong>Outbound</strong> (de salida)</td><td>AWS → on-premises</td><td>Que las instancias de la VPC resuelvan los dominios internos de la empresa, mediante <strong>reglas de reenvío</strong> por dominio</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Pregunta típica: "las instancias en AWS no resuelven <em>corp.interno</em>" → <strong>outbound endpoint + regla de reenvío</strong> hacia el DNS on-premises (sobre VPN o Direct Connect). Las reglas se comparten con otras cuentas por <strong>RAM</strong>. <strong>Route 53 Resolver DNS Firewall</strong> permite además bloquear dominios maliciosos desde la VPC.</p></div></div>
        <p>Otras piezas: <strong>DNSSEC</strong> (firma de la zona para evitar suplantación de respuestas), <strong>Traffic Flow</strong> (editor visual para combinar políticas de enrutado complejas) y <strong>Resolver Query Logging</strong> (registro de consultas DNS a CloudWatch, S3 o Firehose).</p>`
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
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>"Cachear contenido web / CDN" → <strong>CloudFront</strong>. "IP estática, TCP/UDP no HTTP, failover entre regiones y baja latencia por la red de AWS" → <strong>Global Accelerator</strong>.</p></div></div>
        <h3>Cómo se configura CloudFront</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Concepto</th><th>Qué hace</th></tr></thead>
          <tbody>
            <tr><td><strong>Cache behavior</strong></td><td>Reglas por patrón de ruta (<code>/api/*</code>, <code>/static/*</code>) que deciden el origen, el TTL, los métodos permitidos y qué cabeceras, cookies o query strings forman parte de la <strong>clave de caché</strong></td></tr>
            <tr><td><strong>TTL</strong></td><td>Mínimo, por defecto y máximo. El origen manda con <code>Cache-Control</code>; para contenido dinámico, TTL 0</td></tr>
            <tr><td><strong>Invalidación</strong></td><td>Borra objetos de la caché antes de que expiren (tras un despliegue). Cuesta dinero a partir de cierto volumen: la alternativa limpia es <strong>versionar los nombres de fichero</strong></td></tr>
            <tr><td><strong>Origin group</strong></td><td>Origen primario + secundario: CloudFront conmuta ante errores 5xx. <strong>Failover de origen</strong> para alta disponibilidad</td></tr>
            <tr><td><strong>Price class</strong></td><td>Limita las ubicaciones de borde usadas (solo Europa y EE. UU., etc.) para <strong>reducir coste</strong> renunciando a cobertura</td></tr>
            <tr><td><strong>OAC</strong> (antes OAI)</td><td>Solo CloudFront puede leer el bucket de S3, que permanece privado</td></tr>
          </tbody>
        </table></div>
        <h3>Proteger el contenido</h3>
        <ul>
          <li><strong>Signed URLs:</strong> un fichero concreto (una descarga puntual). <strong>Signed Cookies:</strong> varios ficheros a la vez (una serie completa, una zona privada del sitio).</li>
          <li><strong>Geo-restricción</strong> (lista blanca o negra de países) y <strong>WAF</strong> asociado a la distribución.</li>
          <li><strong>Field-level encryption:</strong> cifra en el borde campos concretos de un formulario (tarjeta, datos de salud) con una clave pública, de modo que solo la aplicación final puede descifrarlos.</li>
          <li>Código en el borde: <strong>CloudFront Functions</strong> (JavaScript ligerísimo, milisegundos: reescribir URL, cabeceras, redirecciones) frente a <strong>Lambda@Edge</strong> (más potente y con acceso a la red: manipular peticiones o respuestas al origen).</li>
        </ul>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>CloudFront también <strong>abarata</strong>: la transferencia de salida desde el borde es más barata que desde EC2 o S3 y no se cobra la transferencia entre el origen de AWS y CloudFront. Si la pregunta menciona a la vez "latencia global" y "coste de salida", suele ser CloudFront.</p></div></div>`
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
  resumen: "KMS a fondo (políticas de clave, rotación, multirregión, CloudHSM), secretos y certificados, WAF/Shield/Firewall Manager, y detección, auditoría y cumplimiento.",
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
        <h3>Quién puede usar una clave: política de clave e IAM</h3>
        <ul>
          <li>Toda clave KMS tiene una <strong>política de clave</strong> (política basada en recurso) y <strong>es obligatoria</strong>: si no te nombra, no puedes usarla aunque IAM te dé <code>kms:*</code>. La política por defecto delega en IAM de la cuenta propietaria.</li>
          <li>Para el <strong>acceso entre cuentas</strong> hacen falta las dos partes: la política de la clave autoriza a la otra cuenta <em>y</em> esa cuenta concede el permiso a su usuario o rol.</li>
          <li><strong>Grants:</strong> permisos temporales y granulares que un servicio (EBS, Lambda...) recibe para usar la clave en tu nombre, sin tocar la política.</li>
          <li>Todo uso de una clave queda registrado en <strong>CloudTrail</strong>: es la razón principal para elegir <strong>SSE-KMS</strong> frente a SSE-S3 cuando piden auditoría.</li>
        </ul>
        <h3>Rotación, regiones y tipos de clave</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Escenario</th><th>Qué usar</th></tr></thead>
          <tbody>
            <tr><td>Rotar el material criptográfico automáticamente</td><td>Clave gestionada por el cliente con <strong>rotación automática anual</strong> (KMS guarda el material antiguo para descifrar lo ya cifrado; no hay que recifrar nada)</td></tr>
            <tr><td>Cifrar en varias regiones y poder descifrar en cualquiera</td><td><strong>Claves multirregión</strong> (misma clave replicada). Sin ellas hay que recifrar al copiar un snapshot a otra región</td></tr>
            <tr><td>La empresa exige generar el material de clave ella misma (BYOK)</td><td><strong>Material de clave importado</strong> (la rotación pasa a ser manual y tú respondes de la copia del material)</td></tr>
            <tr><td>Firmar o verificar, o cifrar con clave pública fuera de AWS</td><td><strong>Claves asimétricas</strong> (RSA/ECC)</td></tr>
            <tr><td>Módulo de hardware <strong>exclusivo</strong>, FIPS 140-2 nivel 3, control total de las claves</td><td><strong>CloudHSM</strong> (AWS no tiene acceso; tú gestionas usuarios y copias)</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>Borrar una clave no es inmediato: queda <strong>pendiente de eliminación entre 7 y 30 días</strong> (y puede cancelarse), porque sin ella los datos cifrados son irrecuperables. Si lo que quieres es cortar el acceso ya, <strong>deshabilítala</strong>. Y recuerda: las claves <strong>propiedad de AWS no se pueden compartir</strong>, así que para compartir snapshots o AMIs cifradas necesitas una clave propia.</p></div></div>
        <h3>Secrets Manager vs Parameter Store</h3>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>Secrets Manager</th><th>Parameter Store</th></tr></thead>
          <tbody>
            <tr><td>Rotación automática</td><td><strong>Sí</strong>, con una función Lambda (plantillas listas para RDS, Aurora, Redshift y DocumentDB)</td><td>No (manual)</td></tr>
            <tr><td>Coste</td><td>~0,40$/secreto/mes</td><td>Gratis (nivel estándar)</td></tr>
            <tr><td>Uso</td><td>Credenciales de BD, claves de API, secretos que deben rotar</td><td>Configuración de aplicación, valores simples, referencias a AMIs</td></tr>
            <tr><td>Tamaño y niveles</td><td>Hasta 64 KB</td><td>Estándar 4 KB y gratis; <strong>avanzado</strong> 8 KB, con coste y políticas de caducidad</td></tr>
            <tr><td>Entre cuentas</td><td>Sí, con política de recurso en el secreto</td><td>Sí, con Parameter Store avanzado compartido</td></tr>
          </tbody>
        </table></div>
        <ul>
          <li>Ambos cifran con <strong>KMS</strong>; en Parameter Store hay que usar el tipo <strong>SecureString</strong> para que el valor se cifre.</li>
          <li>El acceso se da con IAM a la aplicación (rol de EC2, Lambda o task de ECS): nunca credenciales en el código o en variables de entorno en claro.</li>
          <li><strong>RDS Proxy</strong> se integra con Secrets Manager, de modo que la rotación no rompe las conexiones de la aplicación.</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Atajo: si la pregunta dice <strong>"rotar automáticamente"</strong> la contraseña de una base de datos → <strong>Secrets Manager</strong>. Si dice "guardar configuración o un valor sin coste" → <strong>Parameter Store</strong> (SecureString si es sensible).</p></div></div>
        <h3>ACM</h3>
        <p>Certificados TLS/SSL <strong>gratuitos con renovación automática</strong>, integrados con ALB, NLB, CloudFront y API Gateway. Para <strong>CloudFront el certificado debe estar en us-east-1</strong>; para un ALB, en la misma región del balanceador.</p>
        <ul>
          <li>ACM <strong>no exporta</strong> la clave privada de sus certificados públicos: no sirve para instalarlo a mano en una EC2. Para eso está <strong>ACM Private CA</strong> (autoridad certificadora propia para certificados internos, dispositivos IoT o mTLS).</li>
          <li>La validación puede ser por DNS (recomendada: renueva sola) o por correo.</li>
        </ul>`
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
        </table></div>
        <h3>AWS WAF con detalle</h3>
        <ul>
          <li>Se asocia una <strong>Web ACL</strong> a un <strong>CloudFront, ALB, API Gateway, AppSync</strong> o Cognito (no a un NLB ni a una EC2 suelta: a capa 4 no llega).</li>
          <li><strong>Reglas gestionadas por AWS</strong> y del Marketplace: OWASP Top 10, IP reputation, bots, entradas maliciosas. Es la respuesta rápida a "protegernos de SQLi y XSS sin escribir reglas".</li>
          <li><strong>Reglas basadas en tasa (rate-based):</strong> bloquean una IP que supere N peticiones en 5 minutos. Sirven contra fuerza bruta, <em>scraping</em> y capa 7.</li>
          <li>Otros criterios: país, cabeceras, cuerpo, tamaño, expresiones regulares e <strong>IP sets</strong>; acciones de permitir, bloquear, contar o <strong>CAPTCHA</strong>.</li>
        </ul>
        <h3>Shield y Firewall Manager</h3>
        <ul>
          <li><strong>Shield Standard</strong> está siempre activo y gratis: absorbe los ataques volumétricos habituales (capa 3/4).</li>
          <li><strong>Shield Advanced</strong> añade detección avanzada, protección de EIP/Global Accelerator/Route 53, informes de ataques, acceso al <strong>Shield Response Team (SRT)</strong> y, muy preguntado, <strong>protección de costes</strong>: AWS te devuelve el gasto de escalado provocado por un ataque. Incluye WAF sin coste adicional.</li>
          <li><strong>Firewall Manager</strong> aplica y audita reglas de WAF, Shield Advanced, grupos de seguridad y Network Firewall <strong>en todas las cuentas de la organización</strong>, incluidas las que se creen mañana.</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Arquitectura anti-DDoS de libro: <strong>CloudFront/Global Accelerator por delante</strong> (absorben en el borde), <strong>WAF</strong> con reglas gestionadas y de tasa, <strong>Shield Advanced</strong> si el negocio lo justifica, la infraestructura en <strong>subredes privadas</strong> y escalado automático para aguantar el pico.</p></div></div>`
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
        <p>Acceso seguro de shell a instancias EC2 <strong>sin claves SSH ni bastión</strong>: usa permisos IAM y el puerto 443, y registra las sesiones en CloudTrail.</p>
        <h3>Auditoría y cumplimiento</h3>
        <ul>
          <li><strong>AWS Artifact:</strong> el portal donde descargar los <strong>informes de cumplimiento</strong> de AWS (SOC 1/2/3, ISO 27001, PCI DSS) y gestionar acuerdos como el BAA de HIPAA. Si la pregunta dice "el auditor pide el informe SOC 2", la respuesta es Artifact.</li>
          <li><strong>Audit Manager:</strong> recopila evidencias de forma continua y las organiza según un marco (PCI, GDPR, HIPAA) para preparar auditorías.</li>
          <li><strong>CloudTrail Lake:</strong> almacén gestionado de eventos con consultas SQL y retención de años, como alternativa a llevarse los logs a S3 y consultarlos con Athena.</li>
          <li><strong>GuardDuty</strong> analiza CloudTrail, VPC Flow Logs y logs de DNS (y opcionalmente EKS, S3, RDS y malware en EBS) <strong>sin instalar agentes</strong>, y sus hallazgos pueden disparar una respuesta automática vía EventBridge + Lambda.</li>
        </ul>`
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
  resumen: "Desacoplar con SQS y SNS (FIFO, DLQ, escalado), Kinesis a fondo (shards, partition key, fan-out, Firehose) y MSK, orquestación con Step Functions, EventBridge y API Gateway.",
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
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>¿Varios consumidores para el mismo mensaje? → <strong>SNS</strong> (pub/sub). ¿Amortiguar y procesar a tu ritmo con persistencia? → <strong>SQS</strong>. ¿Enrutar eventos de muchas fuentes a distintos destinos? → <strong>EventBridge</strong>.</p></div></div>
        <p>Completan la familia <strong>Amazon MQ</strong> (broker ActiveMQ/RabbitMQ para migrar sistemas existentes) y <strong>Amazon AppFlow</strong>, que mueve datos <strong>entre aplicaciones SaaS y AWS</strong> (Salesforce, Zendesk, Slack, ServiceNow hacia S3, Redshift o Snowflake) sin escribir integraciones: si el enunciado dice "sincronizar datos de Salesforce con S3 sin código", es AppFlow.</p>`
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
        </ul>
        <h3>Más ajustes de SQS</h3>
        <ul>
          <li><strong>Delay queue:</strong> retrasa la entrega de <em>todos</em> los mensajes nuevos hasta 15 minutos; el <strong>message timer</strong> hace lo mismo para un mensaje concreto.</li>
          <li><strong>Redrive:</strong> además de enviar a la DLQ tras N intentos, permite <strong>devolver los mensajes de la DLQ a la cola original</strong> una vez corregido el error.</li>
          <li><strong>FIFO de alto rendimiento:</strong> eleva el límite muy por encima de los 300 mensajes por segundo repartiendo el tráfico en muchos <em>message group ID</em> distintos.</li>
          <li>Si un mensaje tarda más de lo previsto, el consumidor puede <strong>ampliar el visibility timeout</strong> (ChangeMessageVisibility) para que no lo reciba otro consumidor a la vez.</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Patrón de escalado que cae mucho: un <strong>Auto Scaling group de consumidores</strong> que escala según la métrica <strong>ApproximateNumberOfMessagesVisible</strong> (o mensajes por instancia). Así se absorbe un pico sin perder trabajo y sin sobredimensionar el resto del tiempo.</p></div></div>`
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
      titulo: "Kinesis Data Streams: el modelo mental",
      html: `
        <p>Kinesis cuesta hasta que se ve la idea central, así que empecemos por ahí. Un <strong>stream</strong> es una <strong>cinta continua de registros dividida en carriles</strong> (los <em>shards</em>). Los <strong>productores</strong> van dejando registros en la cinta y los <strong>consumidores</strong> la leen <strong>por posición</strong>, sin retirar nada: cada consumidor lleva su propio marcador de por dónde va.</p>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p><strong>La diferencia que lo explica todo:</strong> en <strong>SQS</strong> un mensaje se entrega a un consumidor y <strong>se borra</strong>. En <strong>Kinesis</strong> el registro <strong>se queda</strong> durante la retención, así que <strong>varias aplicaciones distintas pueden leer los mismos datos a la vez</strong> y se puede <strong>volver atrás y reprocesarlo todo</strong> (replay). Kinesis no es una cola: es un registro ordenado de eventos.</p></div></div>
        <h3>Las piezas</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Pieza</th><th>Qué es</th></tr></thead>
          <tbody>
            <tr><td><strong>Registro</strong></td><td>Lo que se escribe: una <strong>partition key</strong> más hasta <strong>1 MB</strong> de datos</td></tr>
            <tr><td><strong>Shard</strong> (carril)</td><td>La unidad de capacidad y de <strong>orden</strong>. El stream tiene N shards y su capacidad total es N veces la de uno</td></tr>
            <tr><td><strong>Partition key</strong></td><td>Decide en qué shard cae el registro (por hash). <strong>Misma clave → mismo shard → orden garantizado</strong></td></tr>
            <tr><td><strong>Número de secuencia</strong></td><td>La posición del registro dentro de su shard; el consumidor guarda por dónde va (<em>checkpoint</em>)</td></tr>
            <tr><td><strong>Retención</strong></td><td>24 h por defecto, ampliable a <strong>7 días</strong> y hasta <strong>365</strong>. Es la ventana en la que puedes reprocesar</td></tr>
          </tbody>
        </table></div>
        <h3>Capacidad: los números que hay que saber</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Por cada shard</th><th>Límite</th></tr></thead>
          <tbody>
            <tr><td>Escritura</td><td><strong>1 MB/s</strong> o <strong>1.000 registros/s</strong> (lo que se agote antes)</td></tr>
            <tr><td>Lectura (fan-out estándar)</td><td><strong>2 MB/s compartidos</strong> entre todos los consumidores, y 5 llamadas GetRecords por segundo</td></tr>
            <tr><td>Lectura (enhanced fan-out)</td><td><strong>2 MB/s para cada consumidor</strong> registrado</td></tr>
          </tbody>
        </table></div>
        <p>De ahí salen los cálculos típicos del examen: si entran <strong>5 MB/s</strong>, necesitas <strong>5 shards</strong>; si son 10.000 registros pequeños por segundo, necesitas <strong>10 shards</strong> aunque el volumen en MB sea ridículo.</p>
        <h3>Provisioned vs On-Demand</h3>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>Provisioned</th><th>On-Demand</th></tr></thead>
          <tbody>
            <tr><td>Shards</td><td>Los defines y ajustas tú</td><td>Kinesis los ajusta solo</td></tr>
            <tr><td>Cuándo</td><td>Carga conocida y estable: sale más barato</td><td><strong>Tráfico impredecible</strong> o a ráfagas, o si no quieres gestionar capacidad</td></tr>
            <tr><td>Escalado</td><td>Manual: <strong>resharding</strong> (dividir un shard caliente o fusionar dos infrautilizados)</td><td>Automático (duplica capacidad según el pico de los últimos 30 días)</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p><strong>El "shard caliente".</strong> Si eliges una partition key de <strong>baja cardinalidad</strong> (por ejemplo, el país, y el 90% del tráfico es de uno solo), todos esos registros caen en el mismo shard: recibirás <strong>ProvisionedThroughputExceededException</strong> aunque el stream tenga capacidad de sobra. La solución es una clave de <strong>alta cardinalidad</strong> (ID de usuario, ID de dispositivo, ID de pedido), no añadir shards a ciegas.</p></div></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Para <strong>ordenar</strong>: en <strong>Kinesis</strong>, misma <strong>partition key</strong>; en <strong>SQS</strong>, cola <strong>FIFO</strong> con <strong>Message Group ID</strong>. En ambos casos el orden se garantiza <em>dentro del grupo</em>, y los grupos distintos van en paralelo.</p></div></div>`
    },
    {
      id: "kinesis-consumo",
      titulo: "Kinesis: productores, consumidores y fan-out",
      html: `
        <h3>Cómo entran los datos</h3>
        <ul>
          <li><strong>SDK:</strong> <code>PutRecord</code> (uno) y <code>PutRecords</code> (lote de hasta 500). Lo más simple.</li>
          <li><strong>KPL</strong> (Kinesis Producer Library): agrega y agrupa registros pequeños para exprimir el shard, a costa de algo de latencia de <em>buffer</em>. Para miles de eventos diminutos por segundo.</li>
          <li><strong>Kinesis Agent:</strong> demonio que vigila ficheros de log en un servidor y los envía sin escribir código.</li>
          <li>Integraciones directas: <strong>CloudWatch Logs</strong> (filtro de suscripción), IoT Core, DynamoDB Streams a través de Lambda, y SDK móviles.</li>
        </ul>
        <h3>Cómo se leen</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Consumidor</th><th>Cómo funciona</th><th>Cuándo</th></tr></thead>
          <tbody>
            <tr><td><strong>Lambda</strong></td><td>Un <em>event source mapping</em> sondea el stream y entrega lotes. La concurrencia es de <strong>una ejecución por shard</strong> (ampliable con el <em>parallelization factor</em>)</td><td>Procesamiento sin servidores, lo más habitual</td></tr>
            <tr><td><strong>KCL</strong> (Kinesis Client Library)</td><td>Reparte los shards entre varios <em>workers</em> y guarda los <strong>checkpoints en una tabla de DynamoDB</strong> que crea ella misma</td><td>Aplicaciones propias en EC2/contenedores, con reparto y recuperación automáticos</td></tr>
            <tr><td><strong>Firehose</strong></td><td>Consume el stream y lo entrega a S3, Redshift, OpenSearch...</td><td>Solo quieres almacenar, sin escribir código</td></tr>
            <tr><td><strong>Managed Service for Apache Flink</strong></td><td>Analítica continua con SQL o Flink (ventanas, agregaciones, detección de patrones)</td><td>Métricas en tiempo real, alertas, detección de anomalías</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>Trampa clásica de la <strong>KCL</strong>: los checkpoints viven en una <strong>tabla de DynamoDB</strong>. Si al rol le falta permiso sobre ella, o la tabla sufre <em>throttling</em>, el consumo se atasca o se reprocesan registros. Y una regla de oro del streaming: el procesamiento debe ser <strong>idempotente</strong>, porque la entrega es <em>al menos una vez</em>.</p></div></div>
        <h3>Fan-out estándar vs enhanced fan-out — muy preguntado</h3>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>Estándar</th><th>Enhanced fan-out</th></tr></thead>
          <tbody>
            <tr><td>Modelo</td><td>El consumidor <strong>sondea</strong> (GetRecords)</td><td>Kinesis <strong>empuja</strong> los datos (SubscribeToShard)</td></tr>
            <tr><td>Ancho de banda</td><td><strong>2 MB/s por shard compartidos</strong> entre todos los consumidores</td><td><strong>2 MB/s por shard y por consumidor</strong></td></tr>
            <tr><td>Latencia</td><td>~200 ms, y empeora al añadir consumidores</td><td>~70 ms, estable</td></tr>
            <tr><td>Coste</td><td>Incluido</td><td>Se paga por consumidor y hora</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Si el enunciado dice <strong>"varias aplicaciones consumen el mismo stream"</strong> y aparecen <strong>lecturas limitadas (throttling) o latencia creciente</strong>, la respuesta es <strong>enhanced fan-out</strong>, no más shards. Con dos consumidores o menos, el estándar basta.</p></div></div>
        <p>Detalles finos: con enhanced fan-out se pueden registrar hasta <strong>20 aplicaciones consumidoras</strong> por stream, y el modo On-Demand admite hasta <strong>el doble del pico de escritura de los últimos 30 días</strong> (si el tráfico se dispara más de golpe, hay throttling durante unos 15 minutos mientras Kinesis reparte los shards).</p>
        <h3>Vigilar un stream</h3>
        <ul>
          <li><strong>GetRecords.IteratorAgeMilliseconds:</strong> la métrica reina. Si crece, <strong>el consumidor va por detrás</strong> del stream y acabarás perdiendo datos cuando venza la retención. Se arregla con más capacidad de proceso (más shards y más Lambdas, o parallelization factor).</li>
          <li><strong>WriteProvisionedThroughputExceeded</strong> en escritura y <strong>ReadProvisionedThroughputExceeded</strong> en lectura: revisa partition key, número de shards o pasa a On-Demand / enhanced fan-out.</li>
          <li>Ante <em>throttling</em> puntual, los SDK reintentan con <strong>backoff exponencial</strong>.</li>
        </ul>
        <h3>Seguridad</h3>
        <p>Cifrado <strong>en reposo con KMS</strong> y en tránsito por <strong>HTTPS/TLS</strong>; permisos con <strong>IAM</strong> (políticas separadas para productores y consumidores) y acceso privado desde la VPC mediante <strong>interface endpoints</strong>.</p>`
    },
    {
      id: "kinesis-firehose",
      titulo: "Firehose, MSK y qué servicio de mensajería elegir",
      html: `
        <h3>Data Firehose: la manguera hacia el almacén</h3>
        <p>Firehose <strong>no es un stream que se consulta</strong>, es una <strong>tubería de entrega</strong> totalmente gestionada: recoge los datos y los deja en el destino. No hay shards que dimensionar, no hay retención y <strong>no se puede reprocesar</strong>.</p>
        <ul>
          <li><strong>Destinos:</strong> S3, Redshift (vía S3), OpenSearch, Splunk y endpoints HTTP de terceros (Datadog, New Relic, MongoDB).</li>
          <li><strong>Buffer:</strong> entrega cuando se cumple el <strong>tamaño</strong> (1–128 MB, por defecto 5 MB) o el <strong>intervalo</strong> (<strong>0–900 s</strong>, por defecto 300 s hacia S3), lo que ocurra antes. Con intervalo 0 (<em>zero buffering</em>) entrega en segundos; con los valores por defecto es <em>near real-time</em>, del orden de minutos. Bajar de 60 s hacia S3 encarece las peticiones PUT.</li>
          <li><strong>Transformación:</strong> puede invocar una <strong>Lambda</strong> para limpiar o enriquecer cada lote, <strong>convertir a Parquet u ORC</strong> (barato de consultar luego con Athena), comprimir y particionar por fecha.</li>
          <li>Los registros que fallan se dejan en un <strong>bucket de errores</strong>, y se puede guardar una copia íntegra del origen en S3.</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>El par de respuestas que más cae: <strong>"procesar en tiempo real con lógica propia y poder reprocesar"</strong> → <strong>Data Streams</strong>. <strong>"Cargar el stream en S3/Redshift/OpenSearch con la mínima gestión posible"</strong> → <strong>Firehose</strong>. Y se combinan: Data Streams para el proceso en vivo y Firehose colgando del mismo stream para archivar en S3.</p></div></div>
        <h3>El resto de la familia</h3>
        <ul>
          <li><strong>Managed Service for Apache Flink</strong> (antes Kinesis Data Analytics): analítica continua sobre el stream con SQL o Flink, con ventanas de tiempo. Salida a otro stream, a Firehose o a Lambda.</li>
          <li><strong>Kinesis Video Streams:</strong> ingesta de vídeo de cámaras para analizarlo (Rekognition Video) o almacenarlo.</li>
        </ul>
        <h3>Amazon MSK (Kafka gestionado)</h3>
        <div class="tablewrap"><table>
          <thead><tr><th></th><th>Kinesis Data Streams</th><th>MSK</th></tr></thead>
          <tbody>
            <tr><td>Unidad</td><td>Shard</td><td>Partición (de un topic)</td></tr>
            <tr><td>Tamaño de mensaje</td><td>1 MB</td><td>1 MB por defecto, <strong>configurable a más</strong></td></tr>
            <tr><td>Retención</td><td>1–365 días</td><td><strong>Ilimitada</strong> (según disco o niveles de almacenamiento)</td></tr>
            <tr><td>Gestión</td><td>Serverless, mínima</td><td>Gestionas configuración, particiones y actualizaciones (o usa <strong>MSK Serverless</strong>)</td></tr>
            <tr><td>Cuándo</td><td>Nativo de AWS, la opción por defecto</td><td>Ya usas <strong>Kafka</strong>, quieres su ecosistema o migras sin reescribir la aplicación</td></tr>
          </tbody>
        </table></div>
        <h3>Tabla de decisión: mensajería y streaming</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Servicio</th><th>Modelo</th><th>Varios consumidores</th><th>¿Reprocesar?</th><th>Caso típico</th></tr></thead>
          <tbody>
            <tr><td><strong>SQS</strong></td><td>Cola: se consume y se borra</td><td>No (un mensaje, un consumidor)</td><td>No</td><td>Desacoplar y amortiguar trabajo</td></tr>
            <tr><td><strong>SNS</strong></td><td>Pub/sub push</td><td>Sí, en el momento</td><td>No</td><td>Notificar a varios a la vez (fan-out)</td></tr>
            <tr><td><strong>EventBridge</strong></td><td>Bus con reglas</td><td>Sí</td><td>Con <em>archive and replay</em></td><td>Enrutar eventos por contenido, SaaS, cron</td></tr>
            <tr><td><strong>Kinesis Data Streams</strong></td><td>Log ordenado y persistente</td><td><strong>Sí, independientes</strong></td><td><strong>Sí</strong></td><td>Telemetría, clics, IoT, analítica en vivo</td></tr>
            <tr><td><strong>Firehose</strong></td><td>Entrega gestionada</td><td>Un destino</td><td>No</td><td>Volcar el stream a S3/Redshift/OpenSearch</td></tr>
            <tr><td><strong>MSK</strong></td><td>Kafka</td><td>Sí</td><td>Sí</td><td>Ya hay Kafka o hace falta su ecosistema</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Señales del enunciado: "millones de eventos por segundo", "clics", "telemetría de IoT", "ventana de tiempo", "reproducir los datos" o "varias aplicaciones analizan lo mismo" → <strong>Kinesis</strong>. "Desacoplar", "que no se pierda el trabajo", "cada mensaje lo procesa un worker" → <strong>SQS</strong>.</p></div></div>`
    },
    {
      id: "api-orquestacion",
      titulo: "API Gateway, Step Functions y EventBridge",
      html: `
        <h3>API Gateway</h3>
        <p>Publica y gestiona APIs (REST, HTTP o WebSocket) con caché, autenticación (IAM, Cognito, Lambda authorizer), throttling y CORS. Se integra con Lambda, endpoints HTTP, servicios AWS y recursos privados vía VPC Link.</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Tipo de endpoint</th><th>Dónde vive</th><th>Cuándo</th></tr></thead>
          <tbody>
            <tr><td><strong>Edge-optimized</strong></td><td>Se publica a través de las ubicaciones de borde de CloudFront</td><td>Clientes repartidos por el mundo (por defecto en las API REST)</td></tr>
            <tr><td><strong>Regional</strong></td><td>En la región</td><td>Clientes en la misma región, o si quieres poner tu propio CloudFront delante</td></tr>
            <tr><td><strong>Privado</strong></td><td>Solo accesible desde la VPC por un <strong>interface endpoint</strong></td><td>APIs internas que no deben salir a internet</td></tr>
          </tbody>
        </table></div>
        <ul>
          <li><strong>Etapas (stages):</strong> dev, test y prod conviven con su propia configuración y variables; el despliegue <strong>canary</strong> manda un porcentaje del tráfico a la versión nueva.</li>
          <li><strong>Usage plans y API keys:</strong> asignan cuota (peticiones al mes) y límite de tasa <strong>por cliente</strong>. Es la respuesta a "limitar a cada socio comercial". El <strong>throttling</strong> general protege el backend.</li>
          <li><strong>Caché por etapa:</strong> guarda las respuestas (TTL configurable) y descarga el backend; se puede invalidar con una cabecera.</li>
          <li><strong>Autorización:</strong> IAM (servicios y cuentas), <strong>Cognito User Pools</strong> (usuarios de la app) o un <strong>Lambda authorizer</strong> (lógica propia, JWT de terceros).</li>
          <li><strong>VPC Link</strong> conecta la API con un NLB o un servicio privado dentro de tu VPC.</li>
          <li><strong>HTTP API</strong> es más barata y rápida que <strong>REST API</strong>, pero REST conserva funciones como las API keys, la caché o la validación de peticiones.</li>
        </ul>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>El tiempo máximo de integración de API Gateway es de <strong>29 segundos por defecto</strong> (desde 2024 se puede pedir ampliar esa cuota en las REST API regionales y privadas, a costa de reducir el throttle de la cuenta). En el examen, la respuesta sigue siendo: si el trabajo dura más, responde <strong>202 Accepted</strong> y delega en SQS, Step Functions o una Lambda asíncrona.</p></div></div>
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
  resumen: "CloudWatch (resolución, alarmas compuestas y anomalías, retención y suscripción de logs), CloudTrail, Config, X-Ray y Systems Manager.",
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
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>Error clásico: esperar la <strong>memoria de EC2</strong> en las métricas por defecto. No está: requiere el agente de CloudWatch.</p></div></div>
        <h3>Resolución: cada cuánto se mide</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Modo</th><th>Intervalo</th><th>Coste</th></tr></thead>
          <tbody>
            <tr><td>Monitorización básica (por defecto)</td><td>5 minutos</td><td>Gratis</td></tr>
            <tr><td><strong>Monitorización detallada</strong></td><td>1 minuto</td><td>Con coste. Necesaria para que el <strong>Auto Scaling reaccione rápido</strong></td></tr>
            <tr><td>Métrica personalizada de <strong>alta resolución</strong></td><td>hasta <strong>1 segundo</strong> (alarmas de 10 o 30 s)</td><td>Con coste</td></tr>
          </tbody>
        </table></div>
        <h3>Alarmas con más juego</h3>
        <ul>
          <li><strong>Alarmas compuestas:</strong> combinan varias alarmas con Y/O para <strong>reducir el ruido</strong> ("avisa solo si falla la CPU <em>y</em> el health check").</li>
          <li><strong>Detección de anomalías:</strong> CloudWatch aprende la banda normal de la métrica y alarma cuando se sale, sin fijar un umbral a mano.</li>
          <li><strong>Metric math:</strong> combina métricas (por ejemplo, porcentaje de errores sobre el total) y alarma sobre el resultado.</li>
          <li>Acciones posibles: notificar por SNS, escalar un ASG, o <strong>recuperar o reiniciar</strong> una instancia EC2.</li>
        </ul>
        <h3>Logs: retención y salida</h3>
        <ul>
          <li>Los grupos de logs tienen <strong>retención indefinida por defecto</strong>: fija una (1 día a 10 años) o pagarás por logs eternos. Es una respuesta típica de optimización de coste.</li>
          <li><strong>Filtros de suscripción:</strong> envían los logs en tiempo real a <strong>Kinesis Data Streams, Firehose, OpenSearch o Lambda</strong> para analizarlos o archivarlos en S3.</li>
          <li><strong>Logs Insights</strong> consulta con su propio lenguaje; para análisis barato a largo plazo, exporta a S3 y consulta con <strong>Athena</strong>.</li>
          <li><strong>Observabilidad entre cuentas:</strong> una cuenta de monitorización puede ver métricas, logs y trazas de las demás.</li>
          <li>Complementos: <strong>CloudWatch Synthetics</strong> (canarios que simulan a un usuario y detectan la caída antes que él), <strong>RUM</strong> (experiencia real en el navegador) y <strong>Container / Lambda Insights</strong>.</li>
        </ul>`
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
          <li><strong>Trail de organización:</strong> un único trail creado desde la cuenta de gestión que recoge la actividad de <strong>todas las cuentas</strong> en un bucket central (normalmente en una cuenta de seguridad, con Object Lock para que nadie lo altere).</li>
          <li><strong>CloudTrail Insights</strong> detecta automáticamente picos anómalos de actividad de la API (por ejemplo, una ráfaga inusual de borrados).</li>
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
        <p>El <strong>AWS Health Dashboard</strong> (antes Personal Health Dashboard) avisa de incidencias de AWS que afectan específicamente a <em>tus</em> recursos, con guía de remediación.</p>
        <h3>Otras piezas de gestión que lista el examen</h3>
        <ul>
          <li><strong>Amazon Managed Grafana</strong> y <strong>Amazon Managed Service for Prometheus</strong>: la pareja gestionada para métricas y cuadros de mando al estilo Kubernetes, cuando el equipo ya trabaja con ese ecosistema en vez de con CloudWatch.</li>
          <li><strong>AWS License Manager:</strong> controla el uso de licencias por socket, núcleo o VM (Windows, Oracle, SQL Server) para no incumplirlas; se apoya en Dedicated Hosts.</li>
          <li><strong>AWS Well-Architected Tool:</strong> cuestionario guiado que revisa una carga de trabajo frente a los seis pilares y devuelve un plan de mejoras.</li>
          <li><strong>AWS Service Catalog:</strong> catálogo de productos aprobados (plantillas de CloudFormation) que los equipos despliegan solos dentro de los límites que fija TI.</li>
        </ul>`
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
  resumen: "Familia Snow, DMS/SCT, DataSync, Storage Gateway, Transfer Family, MGN, descubrimiento con Migration Hub y recuperación ante desastres con DRS.",
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
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Regla práctica: si transferir por internet llevaría <strong>más de una semana</strong>, usa un dispositivo Snow. Ej.: 80 TB a 100 Mbps ≈ meses; con Snowball ≈ 1 semana (envío incluido).</p></div></div>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p><strong>Ojo con la realidad de 2026:</strong> AWS ha ido retirando la familia Snow. <strong>Snowcone</strong> se descatalogó y <strong>Snowball Edge ya no se ofrece a clientes nuevos</strong>; AWS remite a <strong>DataSync</strong> (transferencia en línea), a los <strong>AWS Data Transfer Terminal</strong> (llevar tus discos a una sede de AWS y subirlos a gran velocidad) y a <strong>Outposts</strong> para cómputo en el borde. Aun así, <strong>la familia Snow sigue en la lista de servicios del examen</strong> y las preguntas del tipo "80 TB con una línea lenta" se responden igual: dispositivo Snow. Estudia el concepto, pero no te extrañe no encontrarlo ya en la consola.</p></div></div>`
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
        <p>Estrategias de migración: <em>Rehost</em> (lift-and-shift, MGN), <em>Replatform</em>, <em>Repurchase</em> (SaaS), <em>Refactor</em> (rediseño cloud-native), <em>Retire</em> y <em>Retain</em>.</p>
        <h3>Antes de migrar: descubrir e inventariar</h3>
        <ul>
          <li><strong>Application Discovery Service:</strong> inventaría los servidores on-premises, su uso de CPU y memoria y sus <strong>dependencias de red</strong>, para dimensionar el destino y decidir qué se mueve junto.</li>
          <li><strong>Migration Hub:</strong> el panel único donde se sigue el avance de la migración en todas las herramientas (MGN, DMS) y cuentas.</li>
        </ul>
        <h3>AWS Elastic Disaster Recovery (DRS)</h3>
        <p>Es el <strong>hermano de MGN para recuperación ante desastres</strong>: replica de forma continua los servidores (on-premises, de otra nube o de otra región de AWS) a un <strong>área de preparación barata</strong> en AWS, donde solo se paga almacenamiento y unas instancias mínimas.</p>
        <ul>
          <li>Cuando ocurre el desastre, <strong>lanza las instancias reales en minutos</strong> (RTO de minutos, <strong>RPO de segundos</strong>).</li>
          <li>Permite <strong>ensayar el plan de DR sin afectar a producción</strong> y hacer <em>failback</em> al centro de datos después.</li>
          <li>Sustituye a CloudEndure Disaster Recovery.</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>No confundir: <strong>MGN</strong> migra servidores <em>una vez</em>; <strong>DRS</strong> mantiene una copia lista <em>siempre</em> para recuperar. Y si la pregunta pide un DR barato "sin rediseñar la aplicación ni mantener una copia encendida" → <strong>DRS</strong> encaja como un guante.</p></div></div>`
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
  resumen: "Athena, Redshift, Glue, EMR, OpenSearch, QuickSight, Lake Formation y Data Exchange; y los servicios de IA gestionados que entran en el examen, con SageMaker y una nota sobre IA generativa.",
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
            <tr><td>Streaming de eventos compatible con <strong>Kafka</strong></td><td><strong>MSK</strong></td><td>Con MSK Serverless</td></tr>
            <tr><td>Catálogo, permisos y gobierno de un data lake</td><td><strong>Lake Formation</strong></td><td>Sí</td></tr>
            <tr><td>Suscribirse a <strong>datos de terceros</strong> ya preparados</td><td><strong>AWS Data Exchange</strong></td><td>Sí</td></tr>
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
          <li><strong>QuickSight</strong> (AWS lo está renombrando como <strong>Amazon Quick</strong>): servicio de BI para cuadros de mando y visualizaciones, con motor en memoria <strong>SPICE</strong> y detección de anomalías por ML. Se conecta a Athena, Redshift, RDS, S3 y más.</li>
          <li>En medios, la guía del examen incluye <strong>Kinesis Video Streams</strong> (ingesta de vídeo de cámaras) y <strong>Elastic Transcoder</strong> (conversión de formatos de vídeo); la familia Elemental (MediaConvert, MediaLive...) queda fuera de alcance.</li>
          <li><strong>OpenSearch</strong> (antes Elasticsearch): motor de búsqueda y analítica de logs (stack ELK), búsqueda de texto completo y monitorización. No sustituye a una base relacional ni a un data warehouse.</li>
          <li><strong>Lake Formation:</strong> construye data lakes seguros de forma centralizada, con control de acceso a nivel de columna/fila, usando el catálogo de Glue.</li>
          <li>Variantes que conviene reconocer: <strong>EMR Serverless</strong> y <strong>EMR on EKS</strong> (Spark sin gestionar clústeres), <strong>Glue DataBrew</strong> (preparación de datos visual, sin código), <strong>consultas federadas de Athena</strong> (SQL sobre RDS, DynamoDB u otras fuentes sin mover los datos), <strong>workgroups de Athena</strong> para separar equipos y limitar el gasto por consulta, y <strong>OpenSearch Serverless</strong>.</li>
          <li><strong>Kinesis Data Analytics:</strong> analítica en tiempo real sobre streams con SQL o Apache Flink.</li>
        </ul>`
    },
    {
      id: "ml",
      titulo: "Servicios de IA gestionados: qué entra en el examen",
      html: `
        <p>La inteligencia artificial <strong>sí entra</strong> en el SAA-C03, pero nunca como ciencia de datos: se pregunta como arquitecto, es decir <strong>"¿qué servicio gestionado resuelve este requisito sin montar nada?"</strong>. Suele ser <strong>una o dos preguntas</strong>, y se resuelven reconociendo la palabra clave del enunciado.</p>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>La guía oficial del examen lista <strong>ocho servicios</strong> en la categoría <em>Machine Learning</em> (consultada en septiembre de 2026). Son exactamente los de la tabla siguiente: con dominarlos a este nivel es suficiente.</p></div></div>
        <div class="tablewrap"><table>
          <thead><tr><th>Servicio</th><th>Qué hace</th><th>Señal en el enunciado</th></tr></thead>
          <tbody>
            <tr><td><strong>Rekognition</strong></td><td>Análisis de imagen y vídeo: objetos, caras, texto en imágenes, <strong>moderación de contenido</strong></td><td>"detectar contenido inapropiado", "reconocer caras", "etiquetar fotos"</td></tr>
            <tr><td><strong>Textract</strong></td><td><strong>OCR</strong> que extrae texto, <strong>tablas y campos de formulario</strong> de documentos escaneados y PDF</td><td>"digitalizar facturas", "formularios en papel", "extraer datos de documentos"</td></tr>
            <tr><td><strong>Comprehend</strong></td><td>NLP: <strong>sentimiento</strong>, entidades, idioma, frases clave, temas; detecta <strong>PII</strong> en texto</td><td>"analizar opiniones de clientes", "clasificar tickets", "extraer entidades"</td></tr>
            <tr><td><strong>Transcribe</strong></td><td>Voz a texto, con hablantes, marcas de tiempo y filtrado de palabras</td><td>"subtítulos", "transcribir llamadas o reuniones"</td></tr>
            <tr><td><strong>Polly</strong></td><td>Texto a voz con voces naturales (y SSML)</td><td>"leer el contenido en voz alta", "generar audio"</td></tr>
            <tr><td><strong>Translate</strong></td><td>Traducción automática entre idiomas</td><td>"web multi-idioma", "traducir opiniones al inglés"</td></tr>
            <tr><td><strong>Lex</strong></td><td><strong>Chatbots</strong> conversacionales de voz y texto (el motor de Alexa); se integra con Lambda y Connect</td><td>"asistente virtual", "bot de atención al cliente"</td></tr>
            <tr><td><strong>SageMaker AI</strong></td><td>Plataforma completa para <strong>construir, entrenar y desplegar modelos propios</strong></td><td>"entrenar con nuestros datos históricos", "modelo personalizado"</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p><strong>La trampa que se repite:</strong> si el enunciado dice <em>"sin experiencia en machine learning"</em>, <em>"sin equipo de ciencia de datos"</em> o <em>"con el mínimo esfuerzo de desarrollo"</em> → <strong>servicio gestionado</strong> (Rekognition, Textract, Comprehend...). Si dice <em>"entrenar un modelo con nuestros propios datos"</em> o <em>"algoritmo a medida"</em> → <strong>SageMaker</strong>. Elegir SageMaker cuando basta una API gestionada es la respuesta incorrecta más frecuente.</p></div></div>
        <h3>Combinaciones que caen</h3>
        <ul>
          <li><strong>Moderar imágenes que suben los usuarios:</strong> subida a S3 → <strong>evento de S3</strong> → Lambda → <strong>Rekognition</strong> → resultado a DynamoDB y aviso por SNS.</li>
          <li><strong>Analítica de un centro de llamadas:</strong> audio en S3 → <strong>Transcribe</strong> (voz a texto) → <strong>Comprehend</strong> (sentimiento y entidades) → S3/Athena o QuickSight para el cuadro de mando.</li>
          <li><strong>Digitalizar formularios:</strong> <strong>Textract</strong> para extraer los campos y <strong>Amazon A2I</strong> (Augmented AI) para mandar a <strong>revisión humana</strong> lo que baje de cierta confianza.</li>
          <li><strong>Contenido global:</strong> <strong>Translate</strong> para traducir y <strong>Polly</strong> para generar el audio en cada idioma.</li>
          <li><strong>Documentos con datos personales:</strong> <strong>Comprehend</strong> detecta y redacta PII en texto; <strong>Macie</strong> es el que busca datos sensibles <em>en S3</em>. No confundirlos.</li>
        </ul>
        <h3>SageMaker desde la óptica del arquitecto</h3>
        <p>De SageMaker el examen no pide algoritmos, sino <strong>cómo se sirve el modelo</strong> y cuánto cuesta:</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Forma de inferencia</th><th>Cómo funciona</th><th>Cuándo</th></tr></thead>
          <tbody>
            <tr><td><strong>Endpoint en tiempo real</strong></td><td>Instancias siempre encendidas tras un endpoint HTTPS, con auto scaling</td><td>Latencia de milisegundos y tráfico constante</td></tr>
            <tr><td><strong>Serverless Inference</strong></td><td>Escala a cero y arranca al llegar la petición</td><td>Tráfico <strong>intermitente</strong> que tolera algo de arranque en frío; evita pagar 24/7</td></tr>
            <tr><td><strong>Asynchronous Inference</strong></td><td>Cola interna, payloads grandes y respuestas de hasta minutos; puede escalar a cero</td><td>Ficheros grandes o inferencia lenta sin bloquear al cliente</td></tr>
            <tr><td><strong>Batch Transform</strong></td><td>Procesa un conjunto de datos completo y termina; no hay endpoint</td><td><strong>Lotes periódicos</strong>: la opción más barata si no hace falta respuesta inmediata</td></tr>
          </tbody>
        </table></div>
        <ul>
          <li><strong>Coste:</strong> un endpoint en tiempo real olvidado factura sin parar; para entrenar, <strong>Managed Spot Training</strong> ahorra hasta un 90%.</li>
          <li><strong>Red y seguridad:</strong> estos servicios se llaman por su API pública. Para que el tráfico no salga a internet, usa <strong>interface endpoints (PrivateLink)</strong> desde la VPC; cifra los datos de S3 y los volúmenes con <strong>KMS</strong>, y controla el acceso con <strong>IAM</strong> (más roles de ejecución para los trabajos).</li>
        </ul>
        <h3>¿Y la IA generativa (Bedrock, Amazon Q)?</h3>
        <p>Conviene saber dónde está cada cosa para no estudiar de más:</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Servicio</th><th>Situación en la guía del examen</th><th>Qué es, en una línea</th></tr></thead>
          <tbody>
            <tr><td><strong>Bedrock</strong></td><td><strong>No aparece</strong> en la lista de servicios del examen (ni dentro ni fuera de alcance)</td><td>Acceso gestionado a modelos fundacionales por API, con RAG y agentes</td></tr>
            <tr><td><strong>Amazon Q</strong></td><td>No aparece</td><td>Asistente de IA para empresa y para desarrollo</td></tr>
            <tr><td><strong>Kendra</strong></td><td>No aparece en ninguna de las dos listas</td><td>Búsqueda inteligente en lenguaje natural sobre documentos de la empresa</td></tr>
            <tr><td><strong>Forecast</strong> · <strong>Fraud Detector</strong></td><td>No aparecen</td><td>Previsión de series temporales · detección de fraude online</td></tr>
            <tr><td><strong>Personalize</strong></td><td><strong>Explícitamente fuera de alcance</strong></td><td>Motor de recomendaciones</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>La lista oficial es <strong>no exhaustiva y cambia</strong>, y los bancos de preguntas más recientes empiezan a mencionar <strong>Bedrock</strong>. Con reconocer la frase "acceso a modelos fundacionales mediante API, sin gestionar infraestructura" vas servido: no merece la pena estudiarlo a fondo para este examen, pero tampoco te debe sonar a chino. En cambio, <strong>Personalize está fuera de alcance</strong>: no le dediques tiempo.</p></div></div>`
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
  resumen: "Tres niveles, alta disponibilidad, recuperación ante desastres a fondo (RTO/RPO e implementación), desacoplamiento, serverless, estrategias de despliegue e infraestructura como código.",
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
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Para RPO de ~1 h y RTO de ~4 h, <strong>Pilot Light</strong> suele ser lo más rentable. Multi-site sería sobredimensionar; backup/restore podría no cumplir el RTO.</p></div></div>
        <h3>Primero, entender RTO y RPO</h3>
        <ul>
          <li><strong>RPO</strong> (Recovery Point Objective): <em>cuántos datos puedo perder</em>, medido en tiempo hacia atrás desde el desastre. Lo determina la <strong>frecuencia de la copia o de la replicación</strong>. Backups cada 24 h → RPO de 24 h.</li>
          <li><strong>RTO</strong> (Recovery Time Objective): <em>cuánto puede estar caído el servicio</em>. Lo determina lo que tardas en <strong>levantar</strong> todo.</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Regla para elegir en el examen: el enunciado casi siempre <strong>da las dos cifras</strong>. Busca la opción <strong>más barata que las cumpla</strong>, no la mejor en absoluto. RPO de horas → backups. RPO de minutos → replicación. <strong>RPO de segundos y RTO de minutos</strong> → warm standby o activo-activo.</p></div></div>
        <h3>Cómo se implementa cada estrategia</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Estrategia</th><th>Qué hay encendido en la región de DR</th><th>Piezas de AWS</th></tr></thead>
          <tbody>
            <tr><td><strong>Backup y restauración</strong><br>RTO horas · RPO horas</td><td>Nada: solo copias</td><td><strong>AWS Backup</strong> con copia entre regiones, snapshots de EBS/RDS copiados, <strong>S3 CRR</strong>, AMIs copiadas, plantilla de CloudFormation lista</td></tr>
            <tr><td><strong>Pilot Light</strong><br>RTO decenas de minutos · RPO minutos</td><td>Solo el <strong>núcleo de datos</strong>: la base de datos replicando. El cómputo, creado pero apagado</td><td><strong>Réplica de lectura cross-region</strong> o <strong>Aurora Global Database</strong>, datos en S3 replicados, AMIs y plantillas listas para escalar el ASG a la hora de la verdad</td></tr>
            <tr><td><strong>Warm Standby</strong><br>RTO minutos · RPO segundos</td><td>Una copia <strong>completa pero reducida</strong> y funcionando</td><td>Todo desplegado al mínimo (ASG con 1 instancia), BD replicando; el corte es <strong>escalar y cambiar el DNS</strong></td></tr>
            <tr><td><strong>Multi-site activo-activo</strong><br>RTO casi cero · RPO casi cero</td><td>Las dos regiones sirviendo tráfico</td><td><strong>Route 53</strong> con latencia o ponderación, <strong>DynamoDB Global Tables</strong> o Aurora Global, <strong>Global Accelerator</strong>. El más caro y el más complejo</td></tr>
          </tbody>
        </table></div>
        <h3>La capa de datos manda</h3>
        <div class="tablewrap"><table>
          <thead><tr><th>Dato</th><th>Mecanismo de DR</th><th>RPO aproximado</th></tr></thead>
          <tbody>
            <tr><td>RDS</td><td>Snapshots copiados a otra región / <strong>réplica de lectura cross-region</strong> que se <strong>promociona</strong></td><td>Horas / segundos-minutos</td></tr>
            <tr><td>Aurora</td><td><strong>Global Database</strong> (replicación &lt; 1 s, promoción de la región secundaria en ~1 min)</td><td>Segundos</td></tr>
            <tr><td>DynamoDB</td><td><strong>Global Tables</strong> (activo-activo) y <strong>PITR</strong></td><td>Segundos</td></tr>
            <tr><td>S3</td><td><strong>CRR</strong>, con <strong>RTC</strong> si hace falta garantía de 15 minutos</td><td>Minutos</td></tr>
            <tr><td>EBS / EC2</td><td>Snapshots y AMIs copiadas (con DLM o AWS Backup), o <strong>DRS</strong> para replicación continua</td><td>Horas / segundos</td></tr>
            <tr><td>Servidores on-premises o de otra nube</td><td><strong>AWS Elastic Disaster Recovery (DRS)</strong></td><td>Segundos</td></tr>
          </tbody>
        </table></div>
        <h3>Conmutar y volver</h3>
        <ul>
          <li>El interruptor suele ser <strong>Route 53 con política de failover</strong> y health checks: el DNS deja de apuntar a la región caída. Ojo al <strong>TTL</strong>: uno alto retrasa el cambio, así que en escenarios de DR se usan TTL bajos (60 s).</li>
          <li><strong>Global Accelerator</strong> conmuta más rápido que el DNS, porque la IP no cambia y el desvío ocurre en la red de AWS.</li>
          <li>Todo lo que se levante en la otra región debe existir allí de antemano: <strong>AMIs y snapshots copiados</strong>, certificados de ACM emitidos en esa región, plantillas de <strong>CloudFormation o StackSets</strong> y <strong>cuotas de servicio</strong> suficientes (un límite bajo arruina el RTO).</li>
          <li><strong>Un plan de DR sin ensayar no existe:</strong> hay que probar el failover periódicamente (DRS y Aurora Global permiten ensayos sin tocar producción).</li>
        </ul>
        <div class="callout callout--warn"><div class="callout__icon">!</div><div><p>No confundas <strong>alta disponibilidad</strong> con <strong>DR</strong>: Multi-AZ (dos AZ de la misma región) es HA y cubre el fallo de un centro de datos. El DR cubre la pérdida de <strong>una región entera</strong> y siempre implica <strong>otra región</strong>. Y un backup en el mismo bucket que los datos no es DR: hay que sacarlo de la región, e idealmente de la cuenta.</p></div></div>`
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
          <li><strong>AWS Amplify</strong> empaqueta ese frontal: hospedaje de la web o app móvil con CI/CD, autenticación con Cognito y API con AppSync o API Gateway. <strong>Device Farm</strong> la prueba en dispositivos reales.</li>
          <li><strong>Caché en capas:</strong> CloudFront (borde), caché de API Gateway, ElastiCache/DAX (datos). El patrón <em>cache-aside</em> (lazy loading) con ElastiCache es ideal para cargas de mucha lectura.</li>
          <li><strong>Defensa en profundidad:</strong> combina <strong>WAF + Shield + grupos de seguridad + NACL + cifrado KMS</strong>. Una sola capa no basta.</li>
        </ul>`
    },
    {
      id: "despliegues",
      titulo: "Estrategias de despliegue sin cortar el servicio",
      html: `
        <div class="tablewrap"><table>
          <thead><tr><th>Estrategia</th><th>Cómo funciona</th><th>Coste y riesgo</th></tr></thead>
          <tbody>
            <tr><td><strong>All at once</strong></td><td>Se actualiza todo de golpe</td><td>El más barato y rápido, pero <strong>hay corte</strong> y la vuelta atrás es lenta</td></tr>
            <tr><td><strong>Rolling</strong></td><td>Por lotes de instancias</td><td>Sin capacidad extra, pero conviven dos versiones y baja la capacidad durante el proceso</td></tr>
            <tr><td><strong>Rolling con lote adicional</strong></td><td>Añade instancias antes de actualizar</td><td>Mantiene la capacidad total; algo más de coste</td></tr>
            <tr><td><strong>Immutable</strong></td><td>Levanta instancias <strong>nuevas</strong> con la versión nueva y descarta las viejas</td><td>Vuelta atrás inmediata, sin mezclar versiones; duplica la capacidad un rato</td></tr>
            <tr><td><strong>Blue/Green</strong></td><td>Dos entornos completos; se <strong>cambia el tráfico</strong> del azul al verde</td><td>Rollback en segundos; el doble de infraestructura durante el cambio</td></tr>
            <tr><td><strong>Canary</strong></td><td>Se manda un <strong>pequeño porcentaje</strong> del tráfico a la versión nueva y se va subiendo</td><td>El menor riesgo: se detecta el fallo con pocos usuarios afectados</td></tr>
          </tbody>
        </table></div>
        <h3>Con qué se hace en AWS</h3>
        <ul>
          <li><strong>ALB con grupos de destino ponderados:</strong> el mecanismo natural para blue/green y canary en EC2 o contenedores.</li>
          <li><strong>Route 53 ponderado:</strong> reparto porcentual a nivel de DNS, útil entre entornos o regiones enteras (cuidado con el TTL y la caché del cliente).</li>
          <li><strong>CodeDeploy:</strong> automatiza rolling, blue/green y canary en EC2, ECS y Lambda, con <strong>rollback automático</strong> si salta una alarma de CloudWatch. (La guía del examen lo marca <em>fuera de alcance</em>, como el resto de servicios Code*: entiende el concepto, no lo estudies a fondo.)</li>
          <li><strong>Lambda con alias ponderados</strong> y <strong>etapas canary de API Gateway</strong> para el mundo serverless.</li>
          <li><strong>Elastic Beanstalk</strong> implementa estas políticas de serie (all at once, rolling, rolling con lote adicional, immutable y blue/green mediante <em>swap de URL</em> entre entornos).</li>
        </ul>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Atajos: "cero tiempo de inactividad y poder revertir al instante" → <strong>blue/green</strong>. "Probar con un 5% de usuarios reales antes de desplegar del todo" → <strong>canary</strong>. "Sin capacidad extra y aceptamos ir poco a poco" → <strong>rolling</strong>. "Que no convivan dos versiones" → <strong>immutable</strong>.</p></div></div>`
    },
    {
      id: "iac",
      titulo: "Infraestructura como código: CloudFormation",
      html: `
        <p><strong>CloudFormation</strong> describe la infraestructura en una plantilla (YAML o JSON) y la crea, actualiza y elimina como un <strong>stack</strong>, de forma repetible y con el mismo resultado en cualquier cuenta o región. Es gratis: solo pagas los recursos.</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Concepto</th><th>Para qué</th></tr></thead>
          <tbody>
            <tr><td><strong>Change set</strong></td><td>Muestra <strong>qué va a cambiar</strong> (y qué recursos se van a reemplazar) antes de aplicar. Evita sorpresas en producción</td></tr>
            <tr><td><strong>StackSets</strong></td><td>Despliega el mismo stack en <strong>muchas cuentas y regiones</strong> desde la cuenta de gestión: la forma de aplicar una base común a toda la organización</td></tr>
            <tr><td><strong>Nested stacks</strong></td><td>Trocea una plantilla enorme en piezas reutilizables (una VPC estándar, un ALB estándar)</td></tr>
            <tr><td><strong>DeletionPolicy: Retain</strong> / <strong>Snapshot</strong></td><td>Evita que al borrar el stack desaparezca una base de datos o un bucket: se conserva o se guarda un snapshot</td></tr>
            <tr><td><strong>Drift detection</strong></td><td>Detecta los cambios hechos <strong>a mano</strong> por consola que ya no coinciden con la plantilla</td></tr>
            <tr><td><strong>Parámetros, Mappings y Outputs</strong></td><td>Reutilizar la plantilla entre entornos y exportar valores a otros stacks</td></tr>
          </tbody>
        </table></div>
        <ul>
          <li>Si una actualización falla, CloudFormation hace <strong>rollback automático</strong> al estado anterior.</li>
          <li>Ecosistema: <strong>AWS SAM</strong> (sintaxis corta para serverless), <strong>CDK</strong> (infraestructura en Python o TypeScript que se compila a CloudFormation; <em>fuera del alcance oficial del examen</em>) y <strong>Service Catalog</strong> (catálogo de plantillas aprobadas que los equipos despliegan solos).</li>
        </ul>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>En DR, una plantilla de CloudFormation es lo que convierte "tenemos los backups" en "levantamos el entorno entero en otra región en minutos". Y en gobierno, <strong>StackSets</strong> es la respuesta a "aplicar la misma configuración base a todas las cuentas nuevas".</p></div></div>`
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
  resumen: "Modelos de precios, Savings Plans, Spot, clases de S3, right-sizing, herramientas de gestión de costes y el coste de la transferencia de datos.",
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
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p><strong>Right-sizing:</strong> ajusta el tamaño de EC2 y la memoria de Lambda al uso real. Como Lambda cobra por GB-segundo, sobredimensionar la memoria multiplica el coste. El <strong>Instance Scheduler</strong> apaga entornos de dev fuera del horario laboral (≈73% de ahorro).</p></div></div>
        <ul>
          <li><strong>Compute Optimizer:</strong> recomienda, con datos reales de uso, el tipo de instancia EC2, el tamaño del ASG, el volumen EBS y la memoria de Lambda adecuados. Es la herramienta específica de <em>right-sizing</em>.</li>
          <li><strong>Cost and Usage Report (CUR):</strong> el detalle de facturación más granular (hasta por hora y por recurso) que se entrega a S3 para analizarlo con Athena o QuickSight.</li>
          <li><strong>Categorías de coste</strong> y <strong>Billing Conductor</strong> para repartir el gasto por equipo o cliente cuando las etiquetas no bastan.</li>
        </ul>`
    },
    {
      id: "transferencia-datos",
      titulo: "El coste que se olvida: transferencia de datos",
      html: `
        <p>Media docena de preguntas del examen se resuelven sabiendo <strong>cuándo se paga por mover datos</strong>. La regla base: <strong>entrar en AWS es gratis; salir a internet se paga</strong>, y dentro de AWS depende de cuánta distancia recorra el tráfico.</p>
        <div class="tablewrap"><table>
          <thead><tr><th>Trayecto</th><th>¿Se paga?</th></tr></thead>
          <tbody>
            <tr><td>Internet → AWS (entrada)</td><td><strong>Gratis</strong></td></tr>
            <tr><td>AWS → internet (salida)</td><td><strong>Sí</strong>, y es lo más caro. Hay una capa gratuita mensual</td></tr>
            <tr><td>Dentro de la <strong>misma AZ</strong> por IP <strong>privada</strong></td><td><strong>Gratis</strong></td></tr>
            <tr><td>Dentro de la misma AZ por IP <strong>pública o elástica</strong></td><td><strong>Sí</strong>: usa siempre la IP privada o el DNS interno</td></tr>
            <tr><td>Entre AZ de la misma región</td><td>Sí, en los dos sentidos (también en VPC Peering entre AZ)</td></tr>
            <tr><td>Entre regiones</td><td>Sí, más caro que entre AZ</td></tr>
            <tr><td>Hacia <strong>CloudFront</strong> desde un origen de AWS</td><td><strong>Gratis</strong>, y la salida desde el borde es más barata que desde EC2 o S3</td></tr>
            <tr><td>A través de <strong>NAT Gateway</strong></td><td>Sí: por hora <strong>y por GB procesado</strong></td></tr>
            <tr><td>Por un <strong>Gateway Endpoint</strong> (S3 y DynamoDB)</td><td><strong>Gratis</strong>; el interface endpoint cobra por hora y por GB</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--key"><div class="callout__icon">★</div><div><p>Optimizaciones que caen tal cual: poner <strong>CloudFront delante</strong> para abaratar la salida; añadir un <strong>Gateway Endpoint de S3</strong> para que el tráfico deje de pasar (y pagar) por el <strong>NAT Gateway</strong>; mantener el tráfico <strong>dentro de la misma AZ</strong> entre capas conversadoras; y comprimir o usar formatos columnares para mover menos datos.</p></div></div>
        <p>No todo el coste es por GB: S3 también cobra <strong>por petición</strong>. Subir un millón de ficheros diminutos de uno en uno sale más caro (y más lento) que <strong>agruparlos en lotes</strong> o comprimirlos antes de subir; lo mismo ocurre al bajar el intervalo de entrega de Firehose por debajo de 60 s, que multiplica las peticiones PUT.</p>
        <div class="callout callout--tip"><div class="callout__icon">i</div><div><p>Otros ahorros silenciosos: <strong>IP elásticas sin asociar</strong> y IPv4 públicas (se facturan), <strong>volúmenes EBS huérfanos</strong> y snapshots antiguos, <strong>subidas multiparte incompletas</strong> en S3, <strong>logs de CloudWatch sin retención</strong> y balanceadores olvidados. Trusted Advisor y Cost Explorer los sacan a la luz.</p></div></div>`
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
