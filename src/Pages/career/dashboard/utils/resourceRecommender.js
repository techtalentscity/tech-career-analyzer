/**
 * Advanced resource recommendation system that tailors learning resources 
 * based on the user's career paths, experience level, and skill gaps
 */

// Comprehensive mapping of career paths to skills, courses, and resources
const careerPathToSkillsMap = {
  // Data Science & ML Paths
  'Data Scientist': {
    primarySkills: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization', 'SQL', 'Data Analysis'],
    platforms: ['Kaggle', 'DataCamp', 'Coursera', 'edX'],
    certifications: [
      'IBM Data Science Professional Certificate', 
      'Microsoft Azure Data Scientist Associate', 
      'Google Data Analytics Professional Certificate',
      'AWS Certified Data Analytics Specialty'
    ],
    projects: [
      'Predictive modeling portfolio', 
      'A/B testing framework', 
      'End-to-end data analysis pipeline',
      'Interactive data dashboard'
    ],
    courses: [
      {
        title: 'IBM Data Science Professional Certificate',
        url: 'https://www.coursera.org/professional-certificates/ibm-data-science',
        platform: 'Coursera',
        level: 'beginner to intermediate',
        description: 'Comprehensive intro to data science from IBM'
      },
      {
        title: 'Applied Data Science with Python Specialization',
        url: 'https://www.coursera.org/specializations/data-science-python',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Learn practical data science skills with Python'
      },
      {
        title: 'Machine Learning Specialization (Andrew Ng)',
        url: 'https://www.coursera.org/specializations/machine-learning-introduction',
        platform: 'Coursera',
        level: 'beginner to intermediate',
        description: 'The updated version of Andrew Ng\'s classic ML course'
      },
      {
        title: 'Statistics with Python Specialization',
        url: 'https://www.coursera.org/specializations/statistics-with-python',
        platform: 'Coursera',
        level: 'beginner to intermediate',
        description: 'Statistical analysis using Python'
      },
      {
        title: 'Data Scientist with Python',
        url: 'https://www.datacamp.com/tracks/data-scientist-with-python',
        platform: 'DataCamp',
        level: 'beginner to intermediate',
        description: 'Comprehensive track covering key Python data science skills'
      }
    ]
  },
  'Machine Learning Engineer': {
    primarySkills: ['Python', 'Deep Learning', 'MLOps', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP'],
    platforms: ['DeepLearning.AI', 'Weights & Biases', 'HuggingFace', 'Coursera'],
    certifications: [
      'TensorFlow Developer Certificate', 
      'AWS Machine Learning Specialty', 
      'Google Professional Machine Learning Engineer',
      'Microsoft Azure AI Engineer Associate'
    ],
    projects: [
      'ML system deployment with monitoring', 
      'Model optimization framework', 
      'Custom neural network architecture',
      'Production ML pipeline'
    ],
    courses: [
      {
        title: 'Deep Learning Specialization',
        url: 'https://www.coursera.org/specializations/deep-learning',
        platform: 'DeepLearning.AI',
        level: 'intermediate',
        description: 'Comprehensive deep learning curriculum from Andrew Ng'
      },
      {
        title: 'Machine Learning Engineering for Production (MLOps)',
        url: 'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops',
        platform: 'DeepLearning.AI',
        level: 'advanced',
        description: 'Learn to deploy ML models in production environments'
      },
      {
        title: 'Natural Language Processing Specialization',
        url: 'https://www.coursera.org/specializations/natural-language-processing',
        platform: 'DeepLearning.AI',
        level: 'intermediate to advanced',
        description: 'NLP with deep learning approaches'
      },
      {
        title: 'TensorFlow: Advanced Techniques',
        url: 'https://www.coursera.org/specializations/tensorflow-advanced-techniques',
        platform: 'Coursera',
        level: 'advanced',
        description: 'Advanced TensorFlow techniques for ML engineers'
      },
      {
        title: 'PyTorch for Deep Learning',
        url: 'https://www.udacity.com/course/deep-learning-pytorch--ud188',
        platform: 'Udacity',
        level: 'intermediate',
        description: 'Deep learning with PyTorch'
      }
    ]
  },
  'MLOps Engineer': {
    primarySkills: ['ML Pipeline Automation', 'Kubeflow', 'MLflow', 'Docker', 'Kubernetes', 'CI/CD', 'Python'],
    platforms: ['Weights & Biases', 'Neptune.ai', 'Udacity', 'DeepLearning.AI'],
    certifications: [
      'Google Professional Machine Learning Engineer', 
      'DeepLearning.AI MLOps Specialization', 
      'Kubernetes CKA',
      'AWS Machine Learning Specialty'
    ],
    projects: [
      'Automated ML retraining pipeline', 
      'Model monitoring system', 
      'Feature store implementation',
      'Containerized ML system'
    ],
    courses: [
      {
        title: 'Machine Learning Engineering for Production (MLOps)',
        url: 'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops',
        platform: 'DeepLearning.AI',
        level: 'advanced',
        description: 'Comprehensive MLOps specialization'
      },
      {
        title: 'Deploying Machine Learning Models in Production',
        url: 'https://www.coursera.org/learn/deploying-machine-learning-models-in-production',
        platform: 'Coursera',
        level: 'intermediate to advanced',
        description: 'Learn to deploy ML models at scale'
      },
      {
        title: 'MLOps: Machine Learning Operations',
        url: 'https://www.udemy.com/course/mlops-machine-learning-operations/',
        platform: 'Udemy',
        level: 'intermediate to advanced',
        description: 'Practical guide to MLOps'
      },
      {
        title: 'Full Stack Deep Learning',
        url: 'https://fullstackdeeplearning.com/course/',
        platform: 'Full Stack Deep Learning',
        level: 'intermediate to advanced',
        description: 'Production ML systems end-to-end'
      },
      {
        title: 'Kubernetes for ML: Kubeflow',
        url: 'https://www.pluralsight.com/courses/kubernetes-machine-learning-kubeflow',
        platform: 'Pluralsight',
        level: 'advanced',
        description: 'Learn Kubeflow for ML on Kubernetes'
      }
    ]
  },
  'Data Engineer': {
    primarySkills: ['SQL', 'ETL', 'Data Warehousing', 'Spark', 'Python', 'Hadoop', 'Cloud Data Platforms'],
    platforms: ['DataBricks', 'Udemy', 'A Cloud Guru', 'Coursera'],
    certifications: [
      'Google Cloud Professional Data Engineer', 
      'Azure Data Engineer Associate', 
      'Databricks Certified Data Engineer',
      'AWS Data Analytics Specialty'
    ],
    projects: [
      'ETL/ELT pipeline', 
      'Data warehouse implementation', 
      'Real-time data processing system',
      'Data lake architecture'
    ],
    courses: [
      {
        title: 'Data Engineering with Google Cloud',
        url: 'https://www.coursera.org/professional-certificates/gcp-data-engineering',
        platform: 'Coursera',
        level: 'intermediate to advanced',
        description: 'Comprehensive data engineering on Google Cloud'
      },
      {
        title: 'Data Engineering, Big Data, and Machine Learning on GCP',
        url: 'https://www.coursera.org/specializations/gcp-data-machine-learning',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'End-to-end data engineering on Google Cloud'
      },
      {
        title: 'Spark and Python for Big Data with PySpark',
        url: 'https://www.udemy.com/course/spark-and-python-for-big-data-with-pyspark/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Learn big data processing with PySpark'
      },
      {
        title: 'Databricks Certified Data Engineer Associate',
        url: 'https://www.databricks.com/learn/training/data-engineer-learning-path',
        platform: 'Databricks',
        level: 'intermediate to advanced',
        description: 'Data engineering with Databricks'
      },
      {
        title: 'Modern Data Engineering Pipeline on GCP',
        url: 'https://www.coursera.org/projects/modern-data-engineering-pipeline-gcp',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Build modern data pipelines on GCP'
      }
    ]
  },
  
  // Web Development Paths
  'Frontend Developer': {
    primarySkills: ['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript', 'Next.js', 'Frontend Testing'],
    platforms: ['Frontend Masters', 'CSS-Tricks', 'Udemy', 'Codecademy'],
    certifications: [
      'Meta Front-End Developer Certificate', 
      'JavaScript Developer Certificate', 
      'AWS Certified Developer Associate',
      'React Developer Certification'
    ],
    projects: [
      'Interactive UI portfolio', 
      'Responsive web application', 
      'UI component library',
      'Frontend state management system'
    ],
    courses: [
      {
        title: 'Meta Front-End Developer Professional Certificate',
        url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
        platform: 'Coursera',
        level: 'beginner to intermediate',
        description: 'Complete frontend curriculum developed by Meta'
      },
      {
        title: 'React - The Complete Guide',
        url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
        platform: 'Udemy',
        level: 'beginner to advanced',
        description: 'Comprehensive React course including hooks, Redux, Next.js'
      },
      {
        title: 'Advanced CSS and Sass',
        url: 'https://www.udemy.com/course/advanced-css-and-sass/',
        platform: 'Udemy',
        level: 'intermediate to advanced',
        description: 'Advanced CSS, Sass, flexbox, grid, animations'
      },
      {
        title: 'TypeScript: The Complete Developer\'s Guide',
        url: 'https://www.udemy.com/course/typescript-the-complete-developers-guide/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Comprehensive TypeScript course'
      },
      {
        title: 'JavaScript: The Hard Parts',
        url: 'https://frontendmasters.com/courses/javascript-hard-parts-v2/',
        platform: 'Frontend Masters',
        level: 'intermediate to advanced',
        description: 'Deep dive into JavaScript fundamentals'
      }
    ]
  },
  'Backend Developer': {
    primarySkills: ['Node.js', 'Express', 'Django', 'Databases', 'REST API', 'GraphQL', 'Authentication'],
    platforms: ['The Odin Project', 'Udemy', 'Pluralsight', 'Educative'],
    certifications: [
      'AWS Developer Associate', 
      'Microsoft Azure Developer Associate', 
      'Node.js Certification',
      'MongoDB Developer Certification'
    ],
    projects: [
      'RESTful API implementation', 
      'Authentication system', 
      'Database optimization project',
      'Microservices architecture'
    ],
    courses: [
      {
        title: 'NodeJS - The Complete Guide',
        url: 'https://www.udemy.com/course/nodejs-the-complete-guide/',
        platform: 'Udemy',
        level: 'beginner to advanced',
        description: 'Comprehensive Node.js course with Express, MongoDB'
      },
      {
        title: 'The Complete Node.js Developer Course',
        url: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/',
        platform: 'Udemy',
        level: 'beginner to intermediate',
        description: 'Learn Node.js by building real projects'
      },
      {
        title: 'Django for Everybody Specialization',
        url: 'https://www.coursera.org/specializations/django',
        platform: 'Coursera',
        level: 'beginner to intermediate',
        description: 'Learn Django from scratch to deployment'
      },
      {
        title: 'GraphQL with Node.js',
        url: 'https://www.udemy.com/course/graphql-with-nodejs-complete/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'GraphQL API development with Node.js'
      },
      {
        title: 'Database Design and Basic SQL in PostgreSQL',
        url: 'https://www.coursera.org/learn/database-design-postgresql',
        platform: 'Coursera',
        level: 'beginner to intermediate',
        description: 'Learn PostgreSQL database design and implementation'
      }
    ]
  },
  'Full Stack Developer': {
    primarySkills: ['JavaScript', 'React', 'Node.js', 'Databases', 'API Design', 'TypeScript', 'Full Stack Architecture'],
    platforms: ['Full Stack Open', 'Udemy', 'Codecademy', 'Frontend Masters'],
    certifications: [
      'Meta Full Stack Engineer Certificate', 
      'IBM Full Stack Cloud Developer', 
      'AWS Full Stack Developer',
      'MongoDB Full Stack Developer'
    ],
    projects: [
      'Full stack e-commerce platform', 
      'Social media application clone', 
      'CMS system with admin dashboard',
      'Real-time collaboration app'
    ],
    courses: [
      {
        title: 'Full Stack Open',
        url: 'https://fullstackopen.com/en/',
        platform: 'University of Helsinki',
        level: 'intermediate',
        description: 'Modern web development with JavaScript and React'
      },
      {
        title: 'The Web Developer Bootcamp',
        url: 'https://www.udemy.com/course/the-web-developer-bootcamp/',
        platform: 'Udemy',
        level: 'beginner to intermediate',
        description: 'Complete web development bootcamp'
      },
      {
        title: 'Meta Full-Stack Engineer Professional Certificate',
        url: 'https://www.coursera.org/professional-certificates/meta-full-stack-engineer',
        platform: 'Coursera',
        level: 'beginner to advanced',
        description: 'Full stack development career path from Meta'
      },
      {
        title: 'MERN Stack Front To Back',
        url: 'https://www.udemy.com/course/mern-stack-front-to-back/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Full stack development with MongoDB, Express, React, Node'
      },
      {
        title: 'JavaScript Fullstack Bootcamp',
        url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
        platform: 'freeCodeCamp',
        level: 'beginner to intermediate',
        description: 'Free comprehensive JavaScript curriculum'
      }
    ]
  },
  
  // DevOps & Cloud Paths
  'DevOps Engineer': {
    primarySkills: ['CI/CD', 'Docker', 'Kubernetes', 'IaC', 'Cloud Platforms', 'Monitoring', 'Automation'],
    platforms: ['KodeKloud', 'A Cloud Guru', 'Linux Academy', 'Pluralsight'],
    certifications: [
      'AWS DevOps Engineer Professional', 
      'Kubernetes CKA/CKAD', 
      'Azure DevOps Engineer Expert',
      'Docker Certified Associate'
    ],
    projects: [
      'CI/CD pipeline implementation', 
      'Container orchestration system', 
      'Infrastructure as code templates',
      'Monitoring and alerting solution'
    ],
    courses: [
      {
        title: 'DevOps Engineer (Master)',
        url: 'https://kodekloud.com/courses/devops-engineer-master/',
        platform: 'KodeKloud',
        level: 'intermediate to advanced',
        description: 'Comprehensive DevOps curriculum'
      },
      {
        title: 'Docker and Kubernetes: The Complete Guide',
        url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Learn Docker and Kubernetes from scratch'
      },
      {
        title: 'GitOps: Kubernetes Continuous Delivery with Flux',
        url: 'https://www.pluralsight.com/courses/gitops-kubernetes-continuous-delivery-flux',
        platform: 'Pluralsight',
        level: 'advanced',
        description: 'Learn GitOps with Kubernetes and Flux'
      },
      {
        title: 'Terraform Beyond the Basics',
        url: 'https://acloudguru.com/course/terraform-beyond-the-basics',
        platform: 'A Cloud Guru',
        level: 'intermediate to advanced',
        description: 'Advanced Terraform techniques for IaC'
      },
      {
        title: 'Learn DevOps: CI/CD with Jenkins using Pipelines and Docker',
        url: 'https://www.udemy.com/course/learn-devops-ci-cd-with-jenkins-using-pipelines-and-docker/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'CI/CD implementation with Jenkins'
      }
    ]
  },
  'Cloud Architect': {
    primarySkills: ['AWS', 'Azure', 'GCP', 'IaC', 'System Design', 'Security', 'Networking'],
    platforms: ['A Cloud Guru', 'WhizLabs', 'Cloud Academy', 'Pluralsight'],
    certifications: [
      'AWS Solutions Architect Professional', 
      'Google Professional Cloud Architect', 
      'Azure Solutions Architect Expert',
      'HashiCorp Certified Terraform Associate'
    ],
    projects: [
      'Multi-region cloud architecture', 
      'Serverless system implementation', 
      'Cloud migration strategy',
      'High-availability cloud design'
    ],
    courses: [
      {
        title: 'AWS Certified Solutions Architect Professional',
        url: 'https://acloudguru.com/course/aws-certified-solutions-architect-professional',
        platform: 'A Cloud Guru',
        level: 'advanced',
        description: 'Prepare for the AWS Solutions Architect Professional exam'
      },
      {
        title: 'Azure Architect Technologies (AZ-305)',
        url: 'https://learn.microsoft.com/en-us/training/paths/microsoft-azure-architect-design-prerequisites/',
        platform: 'Microsoft Learn',
        level: 'advanced',
        description: 'Official Microsoft Azure architect training'
      },
      {
        title: 'Google Professional Cloud Architect',
        url: 'https://www.coursera.org/professional-certificates/gcp-cloud-architect',
        platform: 'Coursera',
        level: 'advanced',
        description: 'Google Cloud architect certification preparation'
      },
      {
        title: 'HashiCorp Certified: Terraform Associate',
        url: 'https://www.pluralsight.com/paths/hashicorp-certified-terraform-associate',
        platform: 'Pluralsight',
        level: 'intermediate',
        description: 'Terraform certification preparation'
      },
      {
        title: 'Cloud Architecture with Google Cloud',
        url: 'https://www.coursera.org/professional-certificates/gcp-cloud-architect',
        platform: 'Coursera',
        level: 'intermediate to advanced',
        description: 'Comprehensive Google Cloud architecture training'
      }
    ]
  },
  
  // AI & Emerging Tech Paths
  'AI Research Scientist': {
    primarySkills: ['Deep Learning', 'NLP', 'Computer Vision', 'PyTorch', 'Research Methods', 'Reinforcement Learning'],
    platforms: ['Papers with Code', 'DeepLearning.AI', 'Coursera', 'arXiv'],
    certifications: [
      'PyTorch Developer Certificate', 
      'NVIDIA Deep Learning Institute', 
      'IBM AI Engineering Professional Certificate',
      'Google TensorFlow Certificate'
    ],
    projects: [
      'Research paper implementation', 
      'Novel algorithm development', 
      'State-of-the-art model training',
      'AI benchmark improvement'
    ],
    courses: [
      {
        title: 'Deep Learning Specialization',
        url: 'https://www.coursera.org/specializations/deep-learning',
        platform: 'DeepLearning.AI',
        level: 'intermediate to advanced',
        description: 'Andrew Ng\'s foundational deep learning course series'
      },
      {
        title: 'Natural Language Processing Specialization',
        url: 'https://www.coursera.org/specializations/natural-language-processing',
        platform: 'DeepLearning.AI',
        level: 'intermediate to advanced',
        description: 'Comprehensive NLP with deep learning'
      },
      {
        title: 'Deep Learning with PyTorch: Zero to GANs',
        url: 'https://jovian.ai/learn/deep-learning-with-pytorch-zero-to-gans',
        platform: 'Jovian',
        level: 'intermediate',
        description: 'PyTorch deep learning from basics to GANs'
      },
      {
        title: 'Stanford CS224n: Natural Language Processing with Deep Learning',
        url: 'http://web.stanford.edu/class/cs224n/',
        platform: 'Stanford University',
        level: 'advanced',
        description: 'Stanford\'s renowned NLP course'
      },
      {
        title: 'MIT 6.S191: Introduction to Deep Learning',
        url: 'http://introtodeeplearning.com/',
        platform: 'MIT',
        level: 'intermediate to advanced',
        description: 'MIT\'s introduction to deep learning research'
      }
    ]
  },
  
  // Emerging Tech Fields
  'AR/VR Developer': {
    primarySkills: ['Unity', 'C#', '3D Modeling', 'AR Frameworks', 'Spatial Computing', 'UX Design'],
    platforms: ['Unity Learn', 'Coursera', 'Udemy', 'Pluralsight'],
    certifications: [
      'Unity Certified Professional: Programmer', 
      'Unity Certified Professional: Artist', 
      'Apple ARKit Certification',
      'Meta AR/VR Developer Certificate'
    ],
    projects: [
      'Immersive AR application', 
      'VR gaming experience', 
      'Spatial computing interface',
      'Mixed reality prototype'
    ],
    courses: [
      {
        title: 'Unity XR: How to Build AR and VR Apps',
        url: 'https://www.coursera.org/specializations/unity-xr',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Learn to build AR/VR apps with Unity'
      },
      {
        title: 'Complete C# Unity Game Developer 3D',
        url: 'https://www.udemy.com/course/unitycourse2/',
        platform: 'Udemy',
        level: 'beginner to intermediate',
        description: 'Learn Unity and C# for 3D game development'
      },
      {
        title: 'VR App Development with Unity',
        url: 'https://www.pluralsight.com/courses/unity-vr-app-development',
        platform: 'Pluralsight',
        level: 'intermediate',
        description: 'Build VR applications with Unity'
      },
      {
        title: 'ARKit Fundamentals',
        url: 'https://developer.apple.com/learn/curriculum/',
        platform: 'Apple Developer',
        level: 'intermediate',
        description: 'Create AR experiences for Apple devices'
      },
      {
        title: 'Meta XR Developer Professional Certificate',
        url: 'https://www.coursera.org/professional-certificates/meta-xr-associate-developer',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'AR/VR development by Meta'
      }
    ]
  },
  'Blockchain Developer': {
    primarySkills: ['Solidity', 'Web3.js', 'Smart Contracts', 'Blockchain Fundamentals', 'DApps', 'Security'],
    platforms: ['Ethereum.org', 'ConsenSys Academy', 'Udemy', 'Coursera'],
    certifications: [
      'Certified Blockchain Developer', 
      'Ethereum Developer Certification', 
      'ConsenSys Academy Certification',
      'Hyperledger Certified Developer'
    ],
    projects: [
      'DeFi application', 
      'Smart contract system', 
      'Blockchain-based marketplace',
      'Token implementation'
    ],
    courses: [
      {
        title: 'Blockchain Specialization',
        url: 'https://www.coursera.org/specializations/blockchain',
        platform: 'Coursera',
        level: 'beginner to intermediate',
        description: 'Comprehensive blockchain fundamentals'
      },
      {
        title: 'Ethereum and Solidity: The Complete Developer\'s Guide',
        url: 'https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Build blockchain applications with Ethereum'
      },
      {
        title: 'ConsenSys Academy Developer Program',
        url: 'https://consensys.net/academy/',
        platform: 'ConsenSys Academy',
        level: 'intermediate to advanced',
        description: 'Professional Ethereum developer training'
      },
      {
        title: 'Solidity, Blockchain, and Smart Contract Course',
        url: 'https://github.com/smartcontractkit/full-blockchain-solidity-course-js',
        platform: 'freeCodeCamp',
        level: 'beginner to intermediate',
        description: 'Free blockchain and smart contract development course'
      },
      {
        title: 'Zero to DApp: Build a Full Stack Blockchain Application',
        url: 'https://www.udemy.com/course/complete-dapp-solidity-react-blockchain-development/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Build full-stack blockchain applications'
      }
    ]
  },
  'Quantum Computing Developer': {
    primarySkills: ['Quantum Algorithms', 'Qiskit', 'Linear Algebra', 'Quantum Physics', 'Python'],
    platforms: ['IBM Quantum', 'Coursera', 'edX', 'Qiskit Textbook'],
    certifications: [
      'IBM Quantum Developer Certification', 
      'Microsoft Quantum Developer', 
      'Google Quantum Computing Foundations',
      'Qiskit Developer Certification'
    ],
    projects: [
      'Quantum algorithm implementation', 
      'Quantum machine learning model', 
      'Quantum optimization solver',
      'Quantum cryptography demo'
    ],
    courses: [
      {
        title: 'Introduction to Quantum Computing',
        url: 'https://www.coursera.org/learn/quantum-computing-algorithms',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Introductory quantum computing course'
      },
      {
        title: 'Quantum Computing Fundamentals',
        url: 'https://learn.microsoft.com/en-us/training/paths/quantum-computing-fundamentals/',
        platform: 'Microsoft Learn',
        level: 'beginner to intermediate',
        description: 'Microsoft\'s introduction to quantum computing'
      },
      {
        title: 'IBM Quantum Learning',
        url: 'https://quantum-computing.ibm.com/lab/learning',
        platform: 'IBM Quantum',
        level: 'beginner to advanced',
        description: 'Official IBM Quantum learning resources'
      },
      {
        title: 'Qiskit Textbook',
        url: 'https://qiskit.org/textbook/preface.html',
        platform: 'Qiskit',
        level: 'intermediate',
        description: 'Comprehensive quantum computing textbook'
      },
      {
        title: 'Quantum Machine Learning',
        url: 'https://www.edx.org/learn/quantum-computing/university-of-toronto-quantum-machine-learning',
        platform: 'edX',
        level: 'advanced',
        description: 'Apply quantum computing to machine learning'
      }
    ]
  },
  'Cybersecurity Engineer': {
    primarySkills: ['Network Security', 'Penetration Testing', 'Security Frameworks', 'Cryptography', 'Incident Response'],
    platforms: ['TryHackMe', 'HackTheBox', 'Cybrary', 'Coursera'],
    certifications: [
      'CompTIA Security+', 
      'Certified Ethical Hacker (CEH)', 
      'CISSP',
      'OSCP (Offensive Security Certified Professional)'
    ],
    projects: [
      'Security assessment framework', 
      'Vulnerability scanner implementation', 
      'Threat modeling system',
      'Security monitoring dashboard'
    ],
    courses: [
      {
        title: 'IBM Cybersecurity Analyst Professional Certificate',
        url: 'https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst',
        platform: 'Coursera',
        level: 'beginner to intermediate',
        description: 'Comprehensive cybersecurity curriculum'
      },
      {
        title: 'CompTIA Security+ Certification; SY0-601',
        url: 'https://www.comptia.org/certifications/security',
        platform: 'CompTIA',
        level: 'beginner to intermediate',
        description: 'Fundamental security certification preparation'
      },
      {
        title: 'Practical Ethical Hacking',
        url: 'https://www.udemy.com/course/practical-ethical-hacking/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Learn ethical hacking from scratch'
      },
      {
        title: 'TryHackMe: Complete Beginner',
        url: 'https://tryhackme.com/path/outline/beginner',
        platform: 'TryHackMe',
        level: 'beginner',
        description: 'Hands-on cybersecurity learning path'
      },
      {
        title: 'The Complete Cyber Security Course',
        url: 'https://www.udemy.com/course/the-complete-internet-security-privacy-course-volume-1/',
        platform: 'Udemy',
        level: 'beginner to intermediate',
        description: 'Comprehensive cybersecurity course'
      }
    ]
  },
  
  // Product Management and Non-Technical Tech Roles
  'Product Manager': {
    primarySkills: ['Product Strategy', 'User Research', 'Roadmapping', 'Agile', 'Data Analysis', 'Stakeholder Management'],
    platforms: ['Product School', 'Mind the Product', 'Coursera', 'Udemy'],
    certifications: [
      'Product Management Certificate (Product School)', 
      'Certified Scrum Product Owner (CSPO)', 
      'Professional Scrum Product Owner (PSPO)',
      'Google Project Management Certificate'
    ],
    projects: [
      'Product roadmap development', 
      'Market research and competitive analysis', 
      'User persona creation',
      'Product requirement documents (PRDs)'
    ],
    courses: [
      {
        title: 'Product Management Fundamentals',
        url: 'https://www.udemy.com/course/product-management-fundamentals/',
        platform: 'Udemy',
        level: 'beginner',
        description: 'Introduction to product management essentials'
      },
      {
        title: 'Digital Product Management',
        url: 'https://www.coursera.org/specializations/uva-darden-digital-product-management',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Product management for digital products'
      },
      {
        title: 'Agile Development',
        url: 'https://www.coursera.org/specializations/agile-development',
        platform: 'Coursera',
        level: 'beginner to intermediate',
        description: 'Agile methodology and product development'
      },
      {
        title: 'Product Analytics',
        url: 'https://www.productschool.com/product-analytics/',
        platform: 'Product School',
        level: 'intermediate',
        description: 'Data-driven product decisions'
      },
      {
        title: 'Technical Product Management',
        url: 'https://www.udemy.com/course/technical-product-management/',
        platform: 'Udemy',
        level: 'intermediate to advanced',
        description: 'Product management for technical products'
      }
    ]
  },
  'Scrum Master': {
    primarySkills: ['Scrum Framework', 'Agile Methodologies', 'Facilitation', 'Coaching', 'Conflict Resolution', 'Jira'],
    platforms: ['Scrum.org', 'Scrum Alliance', 'Udemy', 'Coursera'],
    certifications: [
      'Certified ScrumMaster (CSM)', 
      'Professional Scrum Master (PSM)', 
      'Advanced Certified ScrumMaster (A-CSM)',
      'Certified Agile Coach (CAC)'
    ],
    projects: [
      'Agile transformation planning', 
      'Sprint retrospective facilitation', 
      'Team performance metrics dashboard',
      'Process improvement documentation'
    ],
    courses: [
      {
        title: 'Scrum Master Certification Preparation',
        url: 'https://www.udemy.com/course/scrum-certification/',
        platform: 'Udemy',
        level: 'beginner to intermediate',
        description: 'Prepare for Scrum Master certification'
      },
      {
        title: 'Agile and Scrum Fundamentals',
        url: 'https://www.coursera.org/learn/agile-and-scrum-fundamentals',
        platform: 'Coursera',
        level: 'beginner',
        description: 'Introduction to Agile and Scrum methodologies'
      },
      {
        title: 'Professional Scrum Master',
        url: 'https://www.scrum.org/courses/professional-scrum-master-training',
        platform: 'Scrum.org',
        level: 'intermediate',
        description: 'Official Scrum.org PSM training'
      },
      {
        title: 'Agile Leadership',
        url: 'https://www.scrumalliance.org/courses/advanced-education/agile-leadership',
        platform: 'Scrum Alliance',
        level: 'advanced',
        description: 'Leadership in Agile environments'
      },
      {
        title: 'Jira for Agile Project Management',
        url: 'https://www.udemy.com/course/jira-for-agile-project-management/',
        platform: 'Udemy',
        level: 'beginner to intermediate',
        description: 'Using Jira for Agile teams'
      }
    ]
  },
  'Business Analyst': {
    primarySkills: ['Requirements Gathering', 'Process Modeling', 'Data Analysis', 'SQL', 'Business Intelligence', 'Tableau', 'Power BI'],
    platforms: ['IIBA', 'DataCamp', 'Udemy', 'Coursera'],
    certifications: [
      'IIBA Entry Certificate in Business Analysis (ECBA)', 
      'Certified Business Analysis Professional (CBAP)', 
      'PMI Professional in Business Analysis (PMI-PBA)',
      'Microsoft Certified: Power BI Data Analyst Associate'
    ],
    projects: [
      'Business requirements documentation', 
      'Process improvement analysis', 
      'Data visualization dashboard',
      'User story mapping'
    ],
    courses: [
      {
        title: 'Business Analysis Fundamentals',
        url: 'https://www.udemy.com/course/business-analysis-fundamentals/',
        platform: 'Udemy',
        level: 'beginner',
        description: 'Introduction to business analysis'
      },
      {
        title: 'Google Data Analytics Certificate',
        url: 'https://www.coursera.org/professional-certificates/google-data-analytics',
        platform: 'Coursera',
        level: 'beginner to intermediate',
        description: 'Data analysis for business decisions'
      },
      {
        title: 'SQL for Business Analysts',
        url: 'https://www.datacamp.com/courses/sql-for-business-analysts',
        platform: 'DataCamp',
        level: 'beginner to intermediate',
        description: 'SQL skills for business analysis'
      },
      {
        title: 'Power BI for Business Intelligence',
        url: 'https://www.udemy.com/course/microsoft-power-bi-up-running-with-power-bi-desktop/',
        platform: 'Udemy',
        level: 'beginner to intermediate',
        description: 'Power BI for data visualization and analysis'
      },
      {
        title: 'Agile Business Analysis',
        url: 'https://www.coursera.org/learn/agile-analysis',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Business analysis in Agile environments'
      }
    ]
  },
  'Financial Analyst': {
    primarySkills: ['Financial Modeling', 'Excel', 'Data Analysis', 'SQL', 'Financial Reporting', 'Power BI', 'Python'],
    platforms: ['CFI', 'Coursera', 'Udemy', 'Wall Street Prep'],
    certifications: [
      'Financial Modeling & Valuation Analyst (FMVA)', 
      'Chartered Financial Analyst (CFA)', 
      'Financial Risk Manager (FRM)',
      'Certified Financial Planner (CFP)'
    ],
    projects: [
      'Financial forecast model', 
      'Investment analysis dashboard', 
      'Financial data visualization',
      'Automated financial reporting'
    ],
    courses: [
      {
        title: 'Financial Modeling & Valuation Analyst (FMVA)',
        url: 'https://corporatefinanceinstitute.com/certifications/financial-modeling-valuation-analyst-fmva-program/',
        platform: 'Corporate Finance Institute',
        level: 'intermediate',
        description: 'Comprehensive financial modeling course'
      },
      {
        title: 'Excel Skills for Business Specialization',
        url: 'https://www.coursera.org/specializations/excel',
        platform: 'Coursera',
        level: 'beginner to intermediate',
        description: 'Excel skills for financial analysis'
      },
      {
        title: 'Financial Analysis with Python',
        url: 'https://www.datacamp.com/courses/introduction-to-financial-analysis-in-python',
        platform: 'DataCamp',
        level: 'intermediate',
        description: 'Python for financial analysis'
      },
      {
        title: 'Investment Management with Python and Machine Learning',
        url: 'https://www.coursera.org/specializations/investment-management-python-machine-learning',
        platform: 'Coursera',
        level: 'advanced',
        description: 'ML and Python for investment analysis'
      },
      {
        title: 'Business Intelligence with Power BI',
        url: 'https://www.udemy.com/course/power-bi-for-business-intelligence/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Power BI for financial dashboards'
      }
    ]
  },
  'Supply Chain Analyst': {
    primarySkills: ['Supply Chain Management', 'Inventory Optimization', 'Demand Forecasting', 'Excel', 'SQL', 'ERP Systems', 'Power BI'],
    platforms: ['ASCM', 'Coursera', 'Udemy', 'edX'],
    certifications: [
      'Certified Supply Chain Professional (CSCP)', 
      'Certified in Planning and Inventory Management (CPIM)', 
      'SCPro Certification',
      'SAP Supply Chain Management Certification'
    ],
    projects: [
      'Inventory optimization model', 
      'Demand forecasting system', 
      'Supply chain dashboard',
      'Logistics cost analysis'
    ],
    courses: [
      {
        title: 'Supply Chain Management Specialization',
        url: 'https://www.coursera.org/specializations/supply-chain-management',
        platform: 'Coursera',
        level: 'beginner to intermediate',
        description: 'Comprehensive supply chain management'
      },
      {
        title: 'Supply Chain Analytics',
        url: 'https://www.edx.org/course/supply-chain-analytics',
        platform: 'edX',
        level: 'intermediate',
        description: 'Analytics for supply chain management'
      },
      {
        title: 'Demand Planning and Forecasting',
        url: 'https://www.udemy.com/course/demand-planning/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Forecasting techniques for supply chain'
      },
      {
        title: 'SAP S/4HANA for Supply Chain',
        url: 'https://www.udemy.com/course/sap-s4hana-logistics/',
        platform: 'Udemy',
        level: 'intermediate to advanced',
        description: 'SAP for supply chain management'
      },
      {
        title: 'Excel for Supply Chain Management',
        url: 'https://www.udemy.com/course/excel-for-supply-chain-management/',
        platform: 'Udemy',
        level: 'beginner to intermediate',
        description: 'Excel techniques for supply chain'
      }
    ]
  },
  
  // Healthcare Tech Roles
  'Healthcare Data Analyst': {
    primarySkills: ['Healthcare Analytics', 'Electronic Health Records', 'SQL', 'Python', 'HIPAA Compliance', 'Tableau', 'Medical Terminology'],
    platforms: ['Coursera', 'Udemy', 'AHIMA', 'Udacity'],
    certifications: [
      'Certified Health Data Analyst (CHDA)', 
      'Healthcare Data Analyst Certification (HDAC)', 
      'Certified Healthcare Technology Specialist (CHTS)',
      'Epic Certification'
    ],
    projects: [
      'Patient outcomes dashboard', 
      'Healthcare cost analysis', 
      'Clinical data visualization',
      'Population health monitoring'
    ],
    courses: [
      {
        title: 'Healthcare Data Analysis',
        url: 'https://www.coursera.org/learn/healthcare-data-analysis',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Data analysis for healthcare'
      },
      {
        title: 'Electronic Health Records',
        url: 'https://www.coursera.org/learn/electronic-health-records-systems',
        platform: 'Coursera',
        level: 'beginner to intermediate',
        description: 'Understanding EHR systems'
      },
      {
        title: 'SQL for Healthcare Analytics',
        url: 'https://www.udemy.com/course/sql-for-healthcare-analytics/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'SQL for analyzing healthcare data'
      },
      {
        title: 'Healthcare Analytics with Tableau',
        url: 'https://www.udemy.com/course/healthcare-analytics-with-tableau/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Visualizing healthcare data with Tableau'
      },
      {
        title: 'HIPAA Compliance Training',
        url: 'https://www.udemy.com/course/hipaa-compliance-training/',
        platform: 'Udemy',
        level: 'beginner',
        description: 'Data privacy and HIPAA regulations'
      }
    ]
  },
  'Nursing Informatics Specialist': {
    primarySkills: ['Clinical Information Systems', 'Electronic Health Records', 'Healthcare IT', 'Data Analysis', 'Nursing Practice', 'Project Management'],
    platforms: ['ANIA', 'Coursera', 'Udemy', 'HIMSS'],
    certifications: [
      'Certified Professional in Healthcare Information and Management Systems (CPHIMS)', 
      'Certified in Nursing Informatics (RN-BC)', 
      'Epic Clinical Systems Certification',
      'Healthcare Information Security and Privacy Practitioner (HCISPP)'
    ],
    projects: [
      'Clinical workflow optimization', 
      'Nursing documentation improvement', 
      'Clinical decision support implementation',
      'Patient care dashboard'
    ],
    courses: [
      {
        title: 'Introduction to Nursing Informatics',
        url: 'https://www.coursera.org/learn/nursing-informatics-introduction',
        platform: 'Coursera',
        level: 'beginner',
        description: 'Fundamentals of nursing informatics'
      },
      {
        title: 'Healthcare IT: Electronic Health Records',
        url: 'https://www.udemy.com/course/healthcare-it-ehrs/',
        platform: 'Udemy',
        level: 'beginner to intermediate',
        description: 'EHR systems in healthcare'
      },
      {
        title: 'Clinical Information Systems',
        url: 'https://www.coursera.org/learn/clinical-information-systems',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Information systems in clinical settings'
      },
      {
        title: 'Data Analytics for Healthcare',
        url: 'https://www.coursera.org/learn/analytics-in-healthcare',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Analyzing healthcare data'
      },
      {
        title: 'HIMSS Nursing Informatics Certificate',
        url: 'https://www.himss.org/resources-certification/himss-approved-education-partner-nursing-informatics-certificate',
        platform: 'HIMSS',
        level: 'advanced',
        description: 'Comprehensive nursing informatics certification'
      }
    ]
  },
  'Health IT Project Manager': {
    primarySkills: ['Healthcare IT', 'Project Management', 'EHR Implementation', 'HIPAA', 'Change Management', 'Stakeholder Management'],
    platforms: ['HIMSS', 'PMI', 'Coursera', 'Udemy'],
    certifications: [
      'Project Management Professional (PMP)', 
      'Certified Associate in Project Management (CAPM)', 
      'Certified Professional in Healthcare Information and Management Systems (CPHIMS)',
      'Health IT Project Management Certification'
    ],
    projects: [
      'EHR implementation project plan', 
      'Healthcare IT system integration', 
      'Clinical workflow redesign',
      'Healthcare IT governance framework'
    ],
    courses: [
      {
        title: 'Healthcare IT Project Management',
        url: 'https://www.coursera.org/learn/health-informatics-planning-implementation',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Project management for healthcare IT'
      },
      {
        title: 'Project Management Professional (PMP) Certification',
        url: 'https://www.udemy.com/course/pmp-certification-exam-prep-course/',
        platform: 'Udemy',
        level: 'advanced',
        description: 'PMP certification preparation'
      },
      {
        title: 'Electronic Health Record Implementation',
        url: 'https://www.coursera.org/learn/ehr-implementation',
        platform: 'Coursera',
        level: 'intermediate to advanced',
        description: 'Managing EHR implementation projects'
      },
      {
        title: 'Change Management in Healthcare IT',
        url: 'https://www.udemy.com/course/change-management-in-healthcare/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Managing change in healthcare settings'
      },
      {
        title: 'Healthcare IT Governance',
        url: 'https://www.himss.org/resources-certification/it-governance-toolkit',
        platform: 'HIMSS',
        level: 'advanced',
        description: 'IT governance frameworks for healthcare'
      }
    ]
  },
  
  // Education Tech Roles
  'EdTech Specialist': {
    primarySkills: ['Educational Technology', 'Learning Management Systems', 'Instructional Design', 'Digital Learning', 'Data Analysis', 'Curriculum Development'],
    platforms: ['ISTE', 'Coursera', 'edX', 'Udemy'],
    certifications: [
      'ISTE Certification for Educators', 
      'Google Certified Educator', 
      'Microsoft Certified Educator',
      'Canvas LMS Certification'
    ],
    projects: [
      'Digital curriculum development', 
      'Online learning implementation', 
      'Educational technology assessment',
      'Learning analytics dashboard'
    ],
    courses: [
      {
        title: 'Educational Technology Leadership',
        url: 'https://www.coursera.org/learn/educational-technology-leadership',
        platform: 'Coursera',
        level: 'intermediate to advanced',
        description: 'Leading educational technology initiatives'
      },
      {
        title: 'Learning Management System Administration',
        url: 'https://www.udemy.com/course/learning-management-system-administration/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Managing LMS platforms'
      },
      {
        title: 'Digital Learning Design',
        url: 'https://www.edx.org/course/digital-learning-design',
        platform: 'edX',
        level: 'intermediate',
        description: 'Designing digital learning experiences'
      },
      {
        title: 'Learning Analytics Fundamentals',
        url: 'https://www.coursera.org/learn/learning-analytics-fundamentals',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Analyzing educational data'
      },
      {
        title: 'Google for Education Certification',
        url: 'https://teachercenter.withgoogle.com/certification',
        platform: 'Google',
        level: 'beginner to intermediate',
        description: 'Google tools for education'
      }
    ]
  },
  'Instructional Designer': {
    primarySkills: ['Instructional Design', 'eLearning Development', 'Learning Experience Design', 'Articulate Storyline', 'Canvas LMS', 'Multimedia Production'],
    platforms: ['ATD', 'Coursera', 'LinkedIn Learning', 'Udemy'],
    certifications: [
      'Certified Professional in Learning and Performance (CPLP)', 
      'Certified Instructional Designer', 
      'Articulate Storyline Certification',
      'Quality Matters Certification'
    ],
    projects: [
      'Interactive eLearning course', 
      'Blended learning curriculum', 
      'Training needs assessment',
      'Learning experience design'
    ],
    courses: [
      {
        title: 'Instructional Design Fundamentals',
        url: 'https://www.linkedin.com/learning/instructional-design-fundamentals',
        platform: 'LinkedIn Learning',
        level: 'beginner',
        description: 'Foundations of instructional design'
      },
      {
        title: 'Articulate Storyline: From Beginner to Advanced',
        url: 'https://www.udemy.com/course/articulate-storyline-3-training-from-beginner-to-advanced/',
        platform: 'Udemy',
        level: 'beginner to advanced',
        description: 'Creating interactive eLearning with Storyline'
      },
      {
        title: 'Learning Experience Design',
        url: 'https://www.coursera.org/learn/learning-experience-design',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Designing effective learning experiences'
      },
      {
        title: 'eLearning Development Best Practices',
        url: 'https://www.udemy.com/course/elearning-best-practices/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Best practices for eLearning development'
      },
      {
        title: 'Multimedia Learning',
        url: 'https://www.coursera.org/learn/principles-of-multimedia-learning',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Principles of multimedia in learning'
      }
    ]
  },
  
  // Engineering Tech Roles
  'Engineering Project Manager': {
    primarySkills: ['Project Management', 'Engineering Principles', 'CAD Software', 'Budgeting', 'Risk Management', 'Engineering Software'],
    platforms: ['PMI', 'Coursera', 'Udemy', 'edX'],
    certifications: [
      'Project Management Professional (PMP)', 
      'Professional Engineer (PE)', 
      'Certified ScrumMaster (CSM)',
      'PRINCE2 Certification'
    ],
    projects: [
      'Engineering project plan', 
      'Technical project budget', 
      'Engineering team management',
      'Design review process'
    ],
    courses: [
      {
        title: 'Engineering Project Management',
        url: 'https://www.coursera.org/learn/engineering-project-management',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Project management for engineering'
      },
      {
        title: 'PMP Certification Preparation',
        url: 'https://www.udemy.com/course/pmp-pmbok6-35-pdus/',
        platform: 'Udemy',
        level: 'advanced',
        description: 'Preparation for PMP certification'
      },
      {
        title: 'Engineering Leadership',
        url: 'https://www.edx.org/course/engineering-leadership',
        platform: 'edX',
        level: 'intermediate to advanced',
        description: 'Leadership skills for engineers'
      },
      {
        title: 'Technical Project Planning',
        url: 'https://www.coursera.org/learn/technical-project-planning',
        platform: 'Coursera',
        level: 'intermediate',
        description: 'Planning technical projects'
      },
      {
        title: 'Advanced AutoCAD',
        url: 'https://www.udemy.com/course/autocad-3d-advanced/',
        platform: 'Udemy',
        level: 'intermediate to advanced',
        description: 'Advanced CAD skills for engineering'
      }
    ]
  },
  'BIM Manager': {
    primarySkills: ['Building Information Modeling', 'Revit', 'Navisworks', 'AutoCAD', 'Construction Management', 'BIM Coordination'],
    platforms: ['Autodesk', 'Coursera', 'LinkedIn Learning', 'Udemy'],
    certifications: [
      'Autodesk Certified Professional: Revit', 
      'BIM Level 2 Certification', 
      'Certified BIM Manager',
      'Navisworks Certified Professional'
    ],
    projects: [
      'BIM execution plan', 
      'BIM standards development', 
      'Clash detection workflow',
      'Construction model coordination'
    ],
    courses: [
      {
        title: 'Revit BIM Management',
        url: 'https://www.udemy.com/course/revit-bim-management/',
        platform: 'Udemy',
        level: 'intermediate to advanced',
        description: 'Managing BIM with Revit'
      },
      {
        title: 'BIM Coordination',
        url: 'https://www.linkedin.com/learning/bim-coordination',
        platform: 'LinkedIn Learning',
        level: 'intermediate',
        description: 'Coordinating BIM processes'
      },
      {
        title: 'BIM for Construction Management',
        url: 'https://www.coursera.org/learn/bim-construction-management',
        platform: 'Coursera',
        level: 'intermediate to advanced',
        description: 'BIM applications in construction'
      },
      {
        title: 'Navisworks for BIM Managers',
        url: 'https://www.udemy.com/course/navisworks-for-bim/',
        platform: 'Udemy',
        level: 'intermediate',
        description: 'Using Navisworks for BIM coordination'
      },
      {
        title: 'BIM Standards and Protocols',
        url: 'https://www.linkedin.com/learning/bim-standards-development',
        platform: 'LinkedIn Learning',
        level: 'advanced',
        description: 'Developing BIM standards'
      }
    ]
  }
};

// Maps skill levels to appropriate learning resource difficulty
const skillLevelToResourceLevel = {
  1: 'beginner',      // Beginner
  2: 'beginner',      // Basic
  3: 'intermediate',  // Intermediate
  4: 'advanced',      // Advanced
  5: 'expert'         // Expert
};

/**
 * Helper function to check if a skill is technical or non-technical
 */
const isSkillTechnical = (skillName) => {
  const technicalSkills = [
    'python', 'javascript', 'java', 'c++', 'c#', 'ruby', 'go', 'php', 'swift', 'kotlin',
    'react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 'spring',
    'data science', 'machine learning', 'deep learning', 'artificial intelligence', 'nlp',
    'sql', 'mysql', 'postgresql', 'mongodb', 'oracle', 'database',
    'aws', 'azure', 'gcp', 'cloud', 'serverless',
    'docker', 'kubernetes', 'devops', 'ci/cd', 'terraform',
    'git', 'linux', 'bash', 'shell',
    'html', 'css', 'sass', 'less', 'bootstrap', 'tailwind',
    'rest api', 'graphql', 'websocket',
    'blockchain', 'solidity', 'ethereum', 'web3',
    'unity', 'unreal', 'ar', 'vr', 'xr',
    'tensorflow', 'pytorch', 'keras', 'scikit-learn',
    'security', 'cryptography', 'penetration testing',
    'revit', 'bim', 'autocad'
  ];
  
  const skillLower = skillName.toLowerCase();
  
  return technicalSkills.some(techSkill => 
    skillLower.includes(techSkill) || techSkill.includes(skillLower)
  );
};

/**
 * Get personalized resource recommendations based on user's profile and career paths
 * 
 * @param {Object} skill - The skill to get resources for
 * @param {Array} careerPaths - The user's recommended career paths
 * @param {Object} userData - The user's profile data
 * @return {Object} Personalized learning resources
 */
export const getPersonalizedResources = (skill, careerPaths, userData) => {
  const skillName = skill.name;
  const skillLower = skillName.toLowerCase();
  const userLevel = skillLevelToResourceLevel[skill.currentLevel] || 'beginner';
  const targetLevel = skillLevelToResourceLevel[skill.requiredLevel] || 'intermediate';
  
  // Default resources structure
  let resources = {
    courses: [],
    tutorials: [],
    videos: [],
    projects: [],
    communities: []
  };
  
  // Get the top career paths
  const topCareerPath = careerPaths.length > 0 ? careerPaths[0].title : null;
  const secondCareerPath = careerPaths.length > 1 ? careerPaths[1].title : null;
  
  // Find career path mapping for primary and secondary paths
  const primaryPathMapping = topCareerPath && careerPathToSkillsMap[topCareerPath] 
    ? careerPathToSkillsMap[topCareerPath] 
    : null;
    
  const secondaryPathMapping = secondCareerPath && careerPathToSkillsMap[secondCareerPath]
    ? careerPathToSkillsMap[secondCareerPath]
    : null;
  
  // Calculate relevance scores
  const getPrimaryPathRelevance = (skill) => {
    if (!primaryPathMapping) return 0;
    
    const skillLower = skill.toLowerCase();
    
    // Check if skill is directly mentioned in primary skills
    const directMatch = primaryPathMapping.primarySkills.some(
      primarySkill => primarySkill.toLowerCase() === skillLower ||
      skillLower.includes(primarySkill.toLowerCase()) ||
      primarySkill.toLowerCase().includes(skillLower)
    );
    
    if (directMatch) return 10;
    
    // Check if skill is related to any primary skills
    const relatedMatch = primaryPathMapping.primarySkills.some(
      primarySkill => 
        areSkillsRelated(skillLower, primarySkill.toLowerCase())
    );
    
    if (relatedMatch) return 7;
    
    return 3; // Basic relevance for any skill
  };
  
  // Check if skills are related (based on common technologies and domains)
  const areSkillsRelated = (skill1, skill2) => {
    // Programming languages relationships
    if ((skill1.includes('python') && skill2.includes('data')) ||
        (skill1.includes('data') && skill2.includes('python'))) {
      return true;
    }
    
    if ((skill1.includes('javascript') && (skill2.includes('react') || skill2.includes('node'))) ||
        ((skill1.includes('react') || skill1.includes('node')) && skill2.includes('javascript'))) {
      return true;
    }
    
    // Cloud and DevOps relationships
    if ((skill1.includes('kubernetes') && skill2.includes('docker')) ||
        (skill1.includes('docker') && skill2.includes('kubernetes'))) {
      return true;
    }
    
    if ((skill1.includes('devops') && (skill2.includes('ci/cd') || skill2.includes('cloud'))) ||
        ((skill1.includes('ci/cd') || skill1.includes('cloud')) && skill2.includes('devops'))) {
      return true;
    }
    
    return false;
  };
  
  // Primary path career-specific courses
  if (primaryPathMapping) {
    const primaryRelevance = getPrimaryPathRelevance(skillName);
    
    if (primaryRelevance >= 7) {
      // Highly relevant - use direct courses from the career path mapping
      if (primaryPathMapping.courses && primaryPathMapping.courses.length > 0) {
        // Find courses that are relevant to this skill
        const relevantCourses = primaryPathMapping.courses.filter(course => 
          course.title.toLowerCase().includes(skillLower) ||
          skillLower.includes(course.title.toLowerCase().split(' ')[0]) ||
          (course.description && course.description.toLowerCase().includes(skillLower))
        );
        
        // Select courses appropriate for user's level
        const levelAppropriate = relevantCourses.filter(course => 
          course.level && (
            (userLevel === 'beginner' && course.level.includes('beginner')) ||
            (userLevel === 'intermediate' && (course.level.includes('intermediate') || course.level.includes('beginner'))) ||
            (userLevel === 'advanced' && course.level.includes('advanced'))
          )
        );
        
        // Add the most relevant courses
        const coursesToAdd = levelAppropriate.length > 0 ? levelAppropriate : relevantCourses;
        
        // Add up to 3 courses, using both directly relevant and generally useful ones
        for (let i = 0; i < Math.min(3, coursesToAdd.length); i++) {
          resources.courses.push({
            title: coursesToAdd[i].title,
            url: coursesToAdd[i].url,
            platform: coursesToAdd[i].platform,
            relevance: "Career-Specific Training"
          });
        }
      }
      
      // If we couldn't find specific courses, add general platform resources
      if (resources.courses.length === 0 && primaryPathMapping.platforms && primaryPathMapping.platforms.length > 0) {
        const platform = primaryPathMapping.platforms[0];
        const platformUrl = getPlatformUrl(platform, skillName, userLevel);
        
        resources.courses.push({
          title: `${skillName} for ${topCareerPath}s`,
          url: platformUrl,
          platform: platform,
          relevance: "Career Learning Platform"
        });
      }
      
      // Add certification recommendation if relevant
      if (skill.gap > 1 && primaryPathMapping.certifications && primaryPathMapping.certifications.length > 0) {
        // Find a certification that mentions this skill
        const relevantCert = primaryPathMapping.certifications.find(cert => 
          cert.toLowerCase().includes(skillLower) || 
          skillLower.includes(cert.toLowerCase().split(' ')[0])
        ) || primaryPathMapping.certifications[0];
        
        resources.courses.push({
          title: `${relevantCert}`,
          url: `https://www.google.com/search?q=${encodeURIComponent(relevantCert)}+certification+course`,
          platform: "Industry Certification",
          relevance: "Career Advancing Credential"
        });
      }
      
      // Add project recommendation
      if (primaryPathMapping.projects && primaryPathMapping.projects.length > 0) {
        // Find a project that uses this skill
        const projectIdea = primaryPathMapping.projects.find(project => 
          project.toLowerCase().includes(skillLower) ||
          skillLower.includes(project.toLowerCase().split(' ')[0])
        ) || primaryPathMapping.projects[0];
        
        resources.projects.push({
          title: `Build a ${projectIdea}`,
          url: `https://github.com/topics/${encodeURIComponent(skillName.toLowerCase().replace(/ /g, '-'))}`,
          platform: "GitHub",
          relevance: "Career Portfolio Project"
        });
      }
    }
  }
  
  // Add secondary career resources if relevant
  if (secondaryPathMapping && (!primaryPathMapping || secondaryPathMapping !== primaryPathMapping)) {
    const isSecondaryRelevant = secondaryPathMapping.primarySkills.some(
      primarySkill => skillLower.includes(primarySkill.toLowerCase()) ||
                      primarySkill.toLowerCase().includes(skillLower)
    );
    
    if (isSecondaryRelevant) {
      // Add one relevant course from secondary career path
      if (secondaryPathMapping.courses && secondaryPathMapping.courses.length > 0) {
        const relevantCourses = secondaryPathMapping.courses.filter(course => 
          course.title.toLowerCase().includes(skillLower) ||
          skillLower.includes(course.title.toLowerCase().split(' ')[0]) ||
          (course.description && course.description.toLowerCase().includes(skillLower))
        );
        
        if (relevantCourses.length > 0) {
          resources.courses.push({
            title: relevantCourses[0].title,
            url: relevantCourses[0].url,
            platform: relevantCourses[0].platform,
            relevance: `Alternative Career: ${secondCareerPath}`
          });
        }
      }
    }
  }
  
  // If we didn't find career-specific courses, add general resources
  if (resources.courses.length === 0) {
    resources.courses.push({
      title: `${skillName} for ${userLevel === 'beginner' ? 'Beginners' : 'Professionals'}`,
      url: `https://www.coursera.org/search?query=${encodeURIComponent(skillName)}&levels=${userLevel === 'beginner' ? 'beginner' : 'intermediate%2Cadvanced'}`,
      platform: "Coursera",
      relevance: "General Skill Development"
    });
    
    resources.courses.push({
      title: `Comprehensive ${skillName} Course`,
      url: `https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(skillName)}&instructional_level=${userLevel === 'beginner' ? 'beginner' : userLevel === 'intermediate' ? 'intermediate' : 'expert'}`,
      platform: "Udemy",
      relevance: "General Training"
    });
  }
  
  // Add skill-specific tutorials
  resources.tutorials.push({
    title: `${skillName} Practical Tutorials`,
    url: `https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(skillName)}+practical+tutorial&instructional_level=${userLevel === 'beginner' ? 'beginner' : userLevel === 'intermediate' ? 'intermediate' : 'expert'}`,
    platform: "Udemy",
    relevance: "Hands-on Practice"
  });
  
  // Add video resources
  resources.videos.push({
    title: `${skillName} Video Tutorials`,
    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skillName)}+tutorial+${userLevel}`,
    platform: "YouTube",
    relevance: "Visual Learning"
  });
  
  // Add project resources
  resources.projects.push({
    title: `${skillName} Practice Projects`,
    url: `https://github.com/topics/${encodeURIComponent(skillName.toLowerCase().replace(/ /g, '-'))}`,
    platform: "GitHub",
    relevance: "Portfolio Development"
  });
  
  // Add level-specific resources
  if (userLevel === 'beginner') {
    resources.communities.push({
      title: `${skillName} Learning Community`,
      url: `https://www.reddit.com/r/learnprogramming/search/?q=${encodeURIComponent(skillName)}`,
      platform: "Reddit",
      relevance: "Beginner Support"
    });
  } else if (userLevel === 'intermediate' || userLevel === 'advanced') {
    resources.communities.push({
      title: `${skillName} Professional Network`,
      url: `https://stackoverflow.com/questions/tagged/${encodeURIComponent(skillName.toLowerCase().replace(/ /g, '-'))}`,
      platform: "Stack Overflow",
      relevance: "Professional Community"
    });
  }
  
  // Add skill-specific resources based on the skill name
  addSkillSpecificResources(resources, skillName, userLevel, topCareerPath);
  
  return resources;
};

/**
 * Get the URL for a specific learning platform
 */
const getPlatformUrl = (platform, skillName, level) => {
  const encodedSkill = encodeURIComponent(skillName);
  const encodedLevel = encodeURIComponent(level);
  
  switch (platform) {
    case 'Kaggle':
      return `https://www.kaggle.com/search?q=${encodedSkill}`;
    case 'DataCamp':
      return `https://www.datacamp.com/search?q=${encodedSkill}`;
    case 'DeepLearning.AI':
      return `https://www.deeplearning.ai/courses/`;
    case 'Frontend Masters':
      return `https://frontendmasters.com/search/?q=${encodedSkill}`;
    case 'A Cloud Guru':
      return `https://acloudguru.com/search?query=${encodedSkill}`;
    case 'Full Stack Open':
      return 'https://fullstackopen.com/en/';
    case 'TryHackMe':
      return `https://tryhackme.com/search?q=${encodedSkill}`;
    case 'The Odin Project':
      return 'https://www.theodinproject.com/paths';
    case 'IBM Quantum':
      return 'https://www.ibm.com/quantum/learn';
    case 'Unity Learn':
      return 'https://learn.unity.com/';
    case 'ConsenSys Academy':
      return 'https://consensys.net/academy/';
    case 'IIBA':
      return 'https://www.iiba.org/career-resources/';
    case 'Product School':
      return 'https://productschool.com/';
    case 'Scrum.org':
      return 'https://www.scrum.org/resources/learning-paths';
    case 'HIMSS':
      return 'https://www.himss.org/resources-certification';
    case 'ISTE':
      return 'https://www.iste.org/learn';
    case 'CFI':
      return 'https://corporatefinanceinstitute.com/resources/';
    case 'Autodesk':
      return 'https://www.autodesk.com/certification/';
    default:
      return `https://www.coursera.org/search?query=${encodedSkill}&levels=${level === 'beginner' ? 'beginner' : 'intermediate%2Cadvanced'}`;
  }
};

/**
 * Add resources specific to common technical skills
 */
const addSkillSpecificResources = (resources, skillName, level, careerPath) => {
  const skillLower = skillName.toLowerCase();
  
  // Programming Languages
  if (skillLower.includes('python')) {
    const pythonCourses = [
      {
        title: "Complete Python Bootcamp",
        url: "https://www.udemy.com/course/complete-python-bootcamp/",
        platform: "Udemy",
        level: "beginner to intermediate",
        relevance: "Core Python Skills"
      },
      {
        title: "Python for Data Science and Machine Learning",
        url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
        platform: "Udemy",
        level: "intermediate",
        relevance: "Python for Data Science"
      },
      {
        title: "Python for Everybody",
        url: "https://www.py4e.com/",
        platform: "University of Michigan",
        level: "beginner",
        relevance: "Python Fundamentals"
      }
    ];
    
    // Filter based on career path
    const filteredCourses = careerPath ? pythonCourses.filter(course => {
      if (careerPath === 'Data Scientist' || careerPath === 'Machine Learning Engineer' || careerPath === 'Data Engineer') {
        return course.relevance.includes('Data') || course.level.includes(level);
      }
      return course.level.includes(level);
    }) : pythonCourses;
    
    // Add filtered courses
    for (let i = 0; i < Math.min(2, filteredCourses.length); i++) {
      resources.courses.push({
        title: filteredCourses[i].title,
        url: filteredCourses[i].url,
        platform: filteredCourses[i].platform,
        relevance: filteredCourses[i].relevance
      });
    }
    
    resources.tutorials.push({
      title: "Python Exercises & Practice",
      url: "https://www.hackerrank.com/domains/python",
      platform: "HackerRank",
      relevance: "Skill Building"
    });
  }
  else if (skillLower.includes('javascript')) {
    const jsCourses = [
      {
        title: "The Complete JavaScript Course",
        url: "https://www.udemy.com/course/the-complete-javascript-course/",
        platform: "Udemy",
        level: "beginner to advanced",
        relevance: "Core JavaScript Skills"
      },
      {
        title: "JavaScript: Understanding the Weird Parts",
        url: "https://www.udemy.com/course/understand-javascript/",
        platform: "Udemy",
        level: "intermediate to advanced",
        relevance: "Advanced JavaScript Concepts"
      },
      {
        title: "JavaScript Algorithms and Data Structures",
        url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
        platform: "freeCodeCamp",
        level: "beginner to intermediate",
        relevance: "JavaScript Fundamentals"
      }
    ];
    
    // Filter based on career path and level
    const filteredCourses = careerPath ? jsCourses.filter(course => {
      if (careerPath === 'Frontend Developer' || careerPath === 'Full Stack Developer') {
        return course.level.includes(level) || course.level.includes('beginner');
      }
      return course.level.includes(level);
    }) : jsCourses;
    
    // Add filtered courses
    for (let i = 0; i < Math.min(2, filteredCourses.length); i++) {
      resources.courses.push({
        title: filteredCourses[i].title,
        url: filteredCourses[i].url,
        platform: filteredCourses[i].platform,
        relevance: filteredCourses[i].relevance
      });
    }
    
    resources.tutorials.push({
      title: "JavaScript.info",
      url: "https://javascript.info/",
      platform: "JavaScript.info",
      relevance: "Modern JavaScript Reference"
    });
  }
  
  // Frontend Frameworks
  else if (skillLower.includes('react')) {
    resources.courses.push({
      title: "React - The Complete Guide",
      url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
      platform: "Udemy",
      relevance: careerPath === 'Frontend Developer' || careerPath === 'Full Stack Developer' 
        ? "Core Career Skill" 
        : "UI Framework"
    });
    
    resources.tutorials.push({
      title: "React Documentation",
      url: "https://react.dev/learn",
      platform: "React.dev",
      relevance: "Official Documentation"
    });
    
    resources.projects.push({
      title: "Build a React Portfolio",
      url: "https://www.freecodecamp.org/news/portfolio-app-using-react-618814e35843/",
      platform: "freeCodeCamp",
      relevance: "Portfolio Project"
    });
  }
  
  // Data Science & ML
  else if (skillLower.includes('machine learning') || skillLower.includes('ml')) {
    resources.courses.push({
      title: "Machine Learning Specialization",
      url: "https://www.coursera.org/specializations/machine-learning-introduction",
      platform: "Coursera",
      relevance: careerPath === 'Data Scientist' || careerPath === 'Machine Learning Engineer' 
        ? "Core Career Skill" 
        : "ML Fundamentals"
    });
    
    resources.tutorials.push({
      title: "Hands-On ML with Scikit-Learn & TensorFlow",
      url: "https://github.com/ageron/handson-ml2",
      platform: "GitHub",
      relevance: "Practical Implementation"
    });
  }
  
  // DevOps & Cloud
  else if (skillLower.includes('devops') || skillLower.includes('ci/cd')) {
    resources.courses.push({
      title: "DevOps Engineer Master Program",
      url: "https://www.simplilearn.com/devops-engineer-masters-program-certification-training",
      platform: "Simplilearn",
      relevance: careerPath === 'DevOps Engineer' || careerPath === 'Cloud Architect'
        ? "Core Career Training"
        : "DevOps Fundamentals"
    });
  }
  else if (skillLower.includes('kubernetes') || skillLower.includes('k8s')) {
    resources.courses.push({
      title: "Certified Kubernetes Administrator (CKA)",
      url: "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/",
      platform: "Linux Foundation",
      relevance: careerPath === 'DevOps Engineer' || careerPath === 'Cloud Architect'
        ? "Industry Standard Certification"
        : "Container Orchestration"
    });
  }
  
  // Blockchain
  else if (skillLower.includes('blockchain') || skillLower.includes('web3') || skillLower.includes('solidity')) {
    resources.courses.push({
      title: "Blockchain Specialization",
      url: "https://www.coursera.org/specializations/blockchain",
      platform: "Coursera",
      relevance: careerPath === 'Blockchain Developer'
        ? "Core Career Training"
        : "Blockchain Fundamentals"
    });
  }
  
  // AR/VR
  else if (skillLower.includes('ar') || skillLower.includes('vr') || skillLower.includes('unity')) {
    resources.courses.push({
      title: "Unity XR: How to Build AR and VR Apps",
      url: "https://www.coursera.org/specializations/unity-xr",
      platform: "Coursera",
      relevance: careerPath === 'AR/VR Developer'
        ? "Core Career Training"
        : "AR/VR Foundations"
    });
  }
  
  // Quantum Computing
  else if (skillLower.includes('quantum')) {
    resources.courses.push({
      title: "Quantum Computing Fundamentals",
      url: "https://www.edx.org/learn/quantum-computing/purdue-university-quantum-computing",
      platform: "edX",
      relevance: careerPath === 'Quantum Computing Developer'
        ? "Core Career Training"
        : "Quantum Foundations"
    });
  }
  
  // Cybersecurity
  else if (skillLower.includes('security') || skillLower.includes('cyber')) {
    resources.courses.push({
      title: "IBM Cybersecurity Analyst Professional Certificate",
      url: "https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst",
      platform: "Coursera",
      relevance: careerPath === 'Cybersecurity Engineer'
        ? "Core Career Training"
        : "Security Fundamentals"
    });
  }
  
  // Product Management
  else if (skillLower.includes('product') || skillLower.includes('management')) {
    resources.courses.push({
      title: "Product Management Certification",
      url: "https://productschool.com/product-management-certification/",
      platform: "Product School",
      relevance: careerPath === 'Product Manager'
        ? "Core Career Training"
        : "Product Management Fundamentals"
    });
  }
  
  // Business Analysis
  else if (skillLower.includes('business') || skillLower.includes('analysis')) {
    resources.courses.push({
      title: "Business Analysis Certification",
      url: "https://www.iiba.org/business-analysis-certification/",
      platform: "IIBA",
      relevance: careerPath === 'Business Analyst'
        ? "Core Career Training"
        : "Business Analysis Fundamentals"
    });
  }
  
  // Healthcare IT
  else if (skillLower.includes('health') || skillLower.includes('healthcare')) {
    resources.courses.push({
      title: "Healthcare IT Certification",
      url: "https://www.himss.org/resources-certification",
      platform: "HIMSS",
      relevance: careerPath === 'Healthcare Data Analyst' || careerPath === 'Health IT Project Manager'
        ? "Core Career Training"
        : "Healthcare IT Fundamentals"
    });
  }
  
  // Educational Technology
  else if (skillLower.includes('education') || skillLower.includes('edtech')) {
    resources.courses.push({
      title: "Educational Technology Certificate",
      url: "https://www.edx.org/certificates/professional-certificate/harvardx-technology-leadership-in-schools",
      platform: "edX",
      relevance: careerPath === 'EdTech Specialist'
        ? "Core Career Training"
        : "Educational Technology Fundamentals"
    });
  }
};

/**
 * Determine if a skill is highly relevant for a specific career path
 */
export const careerPathHasSkill = (careerPath, skillName) => {
  const skillLower = skillName.toLowerCase();
  
  // Get the career path data
  const careerData = careerPathToSkillsMap[careerPath];
  if (!careerData) return false;
  
  // Check if the skill is in the primary skills list
  return careerData.primarySkills.some(skill => 
    skillLower.includes(skill.toLowerCase()) || 
    skill.toLowerCase().includes(skillLower)
  );
};

/**
 * Generate text about skill relevance to career paths
 */
export const getSkillRelevanceText = (skillName, careerPaths) => {
  const skillLower = skillName.toLowerCase();
  
  if (careerPaths.length === 0) {
    return 'This skill is important for many professional roles.';
  }
  
  const primaryPath = careerPaths[0].title;
  const secondaryPath = careerPaths.length > 1 ? careerPaths[1].title : null;
  
  const isPrimarySkill = careerPathHasSkill(primaryPath, skillName);
  const isSecondarySkill = secondaryPath ? careerPathHasSkill(secondaryPath, skillName) : false;
  
  // Check if this is a technical or non-technical skill
  const isTechnicalSkill = isSkillTechnical(skillName);
  
  if (isPrimarySkill && isSecondarySkill) {
    return `This is a core ${isTechnicalSkill ? 'technical ' : ''}skill for both ${primaryPath} and ${secondaryPath} career paths.`;
  } else if (isPrimarySkill) {
    return `This is a key ${isTechnicalSkill ? 'technical ' : ''}skill for the ${primaryPath} career path.`;
  } else if (isSecondarySkill) {
    return `While not as critical for ${primaryPath}, this skill is important for the ${secondaryPath} career path.`;
  } else {
    return `This skill provides valuable ${isTechnicalSkill ? 'technical ' : ''}foundations for your transition to ${primaryPath}.`;
  }
};
