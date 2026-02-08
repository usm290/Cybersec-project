// === DARK MODE FUNCTIONALITY ===

/**
 * Toggle dark mode on/off
 */
function toggleDarkMode() {
    const html = document.documentElement;
    const isDarkMode = html.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    
    // Update button text and icon
    updateThemeButton(isDarkMode);
}

/**
 * Update the theme button appearance based on current mode
 */
function updateThemeButton(isDarkMode) {
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (isDarkMode) {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark';
    }
}

/**
 * Initialize dark mode based on saved preference or system preference
 */
function initializeDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const html = document.documentElement;
    
    if (savedMode === 'enabled') {
        html.classList.add('dark-mode');
        updateThemeButton(true);
    } else if (savedMode === 'disabled') {
        html.classList.remove('dark-mode');
        updateThemeButton(false);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            html.classList.add('dark-mode');
            updateThemeButton(true);
            localStorage.setItem('darkMode', 'enabled');
        }
    }
}

// === GLOBAL DATA ===

const courseModules = [
    {
        title: "Module 1: Digital Identity",
        shortTitle: "Digital Identity",
        objective: "Understand what cybersecurity is, why it matters, and how your digital identity is managed and protected.",
        content: [
            {
                heading: "What is Cybersecurity?",
                points: [
                    "Definition and scope (protecting data, systems, and networks).",
                    "The confidentiality, integrity, and availability (CIA) triad. Think of it as the core principles of security!",
                ],
                note: "The CIA Triad means: **C**onfidentiality (keep secrets secret), **I**ntegrity (keep data accurate), and **A**vailability (make sure systems work when needed)."
            },
            {
                heading: "Why You are the Target",
                points: [
                    "Understanding the 'human firewall' concept: You are the most important defense against cyber attacks.",
                    "The cost of a breach (financial loss, reputation damage, getting into legal trouble).",
                ]
            },
            {
                heading: "Digital Identity Management",
                points: [
                    "Creating and managing strong, unique passwords (long, random, and different for every account).",
                    "The power of Multi-Factor Authentication (MFA/2FA) and why it must be used everywhere.",
                    "Using password managers securely to remember all your complex passwords.",
                ],
                customHTML: `
                    <div class="mt-8 pt-4 border-t border-gray-300">
                        <h4 class="text-lg font-bold text-primary mb-3">Password Strength Demo (Authenticator)</h4>
                        <p class="text-sm text-gray-600 mb-4">Try typing a password below to see how to make it stronger. Aim for Green!</p>
                        
                        <input type="text" id="password-input" onkeyup="checkPasswordStrength(this.value)" 
                            placeholder="Type a password here..."
                            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition mb-3 text-gray-800">

                        <div id="strength-indicator" class="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div id="strength-bar" class="h-full transition-all duration-500 ease-in-out" style="width: 0%"></div>
                        </div>
                        
                        <p id="strength-text" class="text-sm mt-2 font-semibold text-gray-500">Strength: Start Typing</p>

                        <!-- Strong Password Tips -->
                        <div class="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-md">
                            <p class="font-semibold text-yellow-800">Tips for a Super Strong Password:</p>
                            <ul class="list-disc pl-5 text-sm text-yellow-700 space-y-1 mt-2">
                                <li>**Length:** Use at least 12 characters (the longer, the better!).</li>
                                <li>**Mixture:** Include uppercase letters, lowercase letters, numbers, and symbols (like !, @, #, $).</li>
                                <li>**Uniqueness:** Never reuse passwords across different accounts.</li>
                                <li>**Phrase:** Use a memorable but long phrase (e.g., "MydogLovesBones!19") instead of a single word.</li>
                            </ul>
                        </div>
                    </div>
                `
            }
        ]
    },
    {
        title: "Module 2: Phishing and Social Engineering",
        shortTitle: "Phishing",
        objective: "Learn to identify and report various types of social engineering attacks, particularly phishing.",
        content: [
            {
                heading: "The Threat of Social Engineering",
                points: [
                    "What social engineering is (manipulating people to gain access, often by pretending to be someone else).",
                    "Common tactics: creating **urgency** (act now!), pretending to have **authority** (I'm your boss!), or appealing to your helpfulness.",
                ]
            },
            {
                heading: "Types of Phishing Attacks",
                points: [
                    "Email Phishing (most common type, uses malicious links and attachments).",
                    "Spear Phishing (highly targeted attacks against specific individuals).",
                    "Vishing (phone/voice phishing) and Smishing (text message phishing).",
                ]
            },
            {
                heading: "Spotting a Phishing Email",
                points: [
                    "Analyzing sender addresses (does it look right?).",
                    "Suspicious links (hover over them to see the real destination).",
                    "Grammatical errors or awkward phrasing.",
                    "Identifying common 'red flags' (unexpected requests, major urgency, threats).",
                ]
            },
            {
                heading: "Reporting Protocols",
                points: [
                    "The immediate steps to take if you suspect a phishing attempt: Do NOT click anything! Report it immediately to your IT or Security Team.",
                ]
            }
        ]
    },
    {
        title: "Module 3: Malware and Mobile Security",
        shortTitle: "Malware/Mobile",
        objective: "Identify the various forms of malicious software and understand the specific risks associated with mobile devices.",
        content: [
            {
                heading: "Understanding Malware",
                points: [
                    "Malware includes: Viruses, Worms, Trojans, and Spyware.",
                    "How malware infects systems (downloads, compromised websites, malicious files).",
                ]
            },
            {
                heading: "The Threat of Ransomware",
                points: [
                    "How ransomware works (it encrypts your files and demands payment).",
                    "Preventative measures: **Regular backups** of your important data and **keeping all software patched and up-to-date**.",
                ]
            },
            {
                heading: "Secure Web Browsing",
                points: [
                    "Identifying secure connections (look for **HTTPS** and the **lock icon** in the address bar).",
                    "Dangers of clicking on suspicious pop-ups or ads (if it looks too good to be true, it is!).",
                ]
            },
            {
                heading: "Mobile Device Security",
                points: [
                    "Securing devices with biometrics (fingerprint/face ID) and strong passcodes.",
                    "Dangers of public Wi-Fi (it's often unsecured) and using a VPN.",
                    "Only downloading apps from official app stores.",
                ]
            }
        ]
    },
    {
        title: "Module 4: Data Handling and Privacy",
        shortTitle: "Data Handling",
        objective: "Learn the proper procedures for classifying, storing, and disposing of sensitive company and customer data, adhering to privacy standards.",
        content: [
            {
                heading: "Data Classification and Handling",
                points: [
                    "Identifying sensitive (e.g., private names, addresses), confidential, and public data.",
                    "Policies for sharing data internally and externally (only share sensitive data using secure methods approved by the organization).",
                ]
            },
            {
                heading: "Clean Desk Policy and Physical Security",
                points: [
                    "The importance of locking your screen when stepping away from your computer.",
                    "Securing documents and devices in the office (don't leave confidential papers lying around).",
                    "Tailgating/Piggybacking prevention (don't let unauthorized people follow you into secure areas).",
                ]
            },
            {
                heading: "Remote Work and Home Network Security",
                points: [
                    "Securing home Wi-Fi networks (strong passwords, changing the default router password).",
                    "Protecting company equipment outside the office (keep laptops safe and out of sight).",
                ]
            },
            {
                heading: "Acceptable Use Policy (AUP)",
                points: [
                    "Understanding the organization's rules on using company systems (e.g., no illegal downloads, restricted use of personal websites).",
                ]
            }
        ]
    },
    {
        title: "Module 5: Incident Response",
        shortTitle: "Incident Response",
        objective: "Know exactly what steps to take during a security incident and understand the importance of continuous learning.",
        content: [
            {
                heading: "Recognizing a Security Incident",
                points: [
                    "Signs of a compromise (suddenly slow computer, strange pop-ups, accounts getting locked out).",
                    "The 'Don't Panic, Do Act' mindset: Stay calm, but take immediate action.",
                ]
            },
            {
                heading: "The Incident Response Plan (IRP)",
                points: [
                    "Immediate actions: **Disconnecting from the network** (unplug the network cable or turn off Wi-Fi).",
                    "Do NOT delete files or try to 'fix' the problem yourself.",
                    "Whom to contact immediately (IT, Security Team, or a specific Hotline number).",
                ]
            },
            {
                heading: "Continuous Vigilance",
                points: [
                    "Why training is mandatory and ongoing (new threats appear every day).",
                    "Keeping software and operating systems updated (patch management) to close security holes.",
                    "Your role in maintaining the security posture of the organization (if you see something, say something!).",
                ]
            }
        ]
    }
];

const quizQuestions = [
    // --- Module 1: Digital Identity (Q1-4) ---
    { module: "Digital Identity", question: "1. What is the single best defense for protecting your account, even if your password is leaked?", options: ["A) Use a very long password.", "B) Use Multi-Factor Authentication (MFA).", "C) Change your password every day."], answerIndex: 1 },
    { module: "Digital Identity", question: "2. The CIA triad stands for Confidentiality, Integrity, and what?", options: ["A) Authenticity", "B) Access", "C) Availability."], answerIndex: 2 },
    { module: "Digital Identity", question: "3. What is the minimum recommended character length for a truly strong password?", options: ["A) 8 characters", "B) 10 characters", "C) 12 characters."], answerIndex: 2 },
    { module: "Digital Identity", question: "4. What tool is the most secure way to manage dozens of unique, complex passwords?", options: ["A) A browser's built-in save feature.", "B) A password manager.", "C) Writing them on a sticky note at home."], answerIndex: 1 },
    
    // --- Module 2: Phishing (Q5-8) ---
    { module: "Phishing", question: "5. Which is the BIGGEST red flag for a suspicious email that is trying to trick you?", options: ["A) It asks you to call a phone number.", "B) It creates extreme urgency and asks you to click a link to 'verify' your account.", "C) It has minor spelling mistakes."], answerIndex: 1 },
    { module: "Phishing", question: "6. What is 'Spear Phishing'?", options: ["A) A bulk email sent to millions of users.", "B) A highly targeted attack against a specific individual or organization.", "C) A text message asking for personal info."], answerIndex: 1 },
    { module: "Phishing", question: "7. Before clicking a link in an email, what should you do?", options: ["A) Reply to the sender asking if the link is safe.", "B) Hover your mouse over the link to see the actual destination URL.", "C) Assume it is safe if you know the sender's name."], answerIndex: 1 },
    { module: "Phishing", question: "8. An attack where a threat actor calls you pretending to be from IT to get your password is known as:", options: ["A) Smishing", "B) Phishing", "C) Vishing."], answerIndex: 2 },

    // --- Module 3: Malware/Mobile (Q9-12) ---
    { module: "Malware/Mobile", question: "9. What is the most important defense against losing your files to ransomware (where your files get locked)?", options: ["A) Paying the ransom quickly.", "B) Having regular, secure backups of your data.", "C) Turning off your computer immediately."], answerIndex: 1 },
    { module: "Malware/Mobile", question: "10. What symbol in the web address bar indicates a secure, encrypted connection?", options: ["A) HTTP and a red X", "B) HTTPS and a lock icon", "C) FTP and a globe icon."], answerIndex: 1 },
    { module: "Malware/Mobile", question: "11. Why is using a password or biometric security essential on your mobile phone?", options: ["A) To speed up the processor.", "B) To protect your data if the device is lost or stolen.", "C) To conserve battery life."], answerIndex: 1 },
    { module: "Malware/Mobile", question: "12. Malware that secretly monitors your computer activity and steals information is called:", options: ["A) Worm", "B) Trojan", "C) Spyware."], answerIndex: 2 },

    // --- Module 4: Data Handling (Q13-16) ---
    { module: "Data Handling", question: "13. What should you always do when you step away from your computer, even for a minute, in an office setting?", options: ["A) Minimize all open windows.", "B) Lock your screen (e.g., Windows Key + L).", "C) Turn off the monitor."], answerIndex: 1 },
    { module: "Data Handling", question: "14. Allowing an unauthorized person to follow you through a secure door by holding it open for them is called:", options: ["A) Trusting", "B) Tailgating (or Piggybacking)", "C) Socializing."], answerIndex: 1 },
    { module: "Data Handling", question: "15. What is considered 'Confidential' data?", options: ["A) Information publicly available on the company website.", "B) Sensitive personal information (like employee salary details or medical records).", "C) The daily lunch menu."], answerIndex: 1 },
    { module: "Data Handling", question: "16. To secure your home Wi-Fi for remote work, what is a crucial step beyond a strong password?", options: ["A) Changing the Wi-Fi color.", "B) Disabling the network entirely.", "C) Changing the default administrator password on the router."], answerIndex: 2 },

    // --- Module 5: Incident Response (Q17-20) ---
    { module: "Incident Response", question: "17. If your computer suddenly starts acting strangely (e.g., pop-ups, very slow) and you suspect a security issue, what is the IMMEDIATE first action?", options: ["A) Run a full anti-virus scan immediately.", "B) Disconnect the computer from the network (Wi-Fi or cable).", "C) Restart the machine."], answerIndex: 1 },
    { module: "Incident Response", question: "18. During a security incident, what should you NOT attempt to do?", options: ["A) Report the incident to your team lead.", "B) Document what happened.", "C) Try to delete malicious files or 'fix' the problem yourself."], answerIndex: 2 },
    { module: "Incident Response", question: "19. Why is 'patch management' (keeping software updated) a critical security measure?", options: ["A) It makes the software run faster.", "B) It closes known security vulnerabilities and bugs.", "C) It improves the software's graphics."], answerIndex: 1 },
    { module: "Incident Response", question: "20. Who should be the first internal contact (outside of your manager) you call when you detect a possible breach or severe security issue?", options: ["A) A friend in a different department.", "B) The Security or IT Help Desk.", "C) The CEO."], answerIndex: 1 }
];

// === DOM REFERENCES ===
const moduleList = document.getElementById('module-list');
const moduleContentDiv = document.getElementById('module-content');
const homeView = document.getElementById('home-view');
const courseView = document.getElementById('course-view');
const quizView = document.getElementById('quiz-view');
const questionArea = document.getElementById('question-area');
const resultContainer = document.getElementById('result-container');
const quizContainer = document.getElementById('quiz-container');

// === QUIZ STATE ===
let currentQuestionIndex = 0;
let score = 0;
let modulePerformance = {};

// === VIEW MANAGEMENT ===

/**
 * Function to switch between the Home View, Course View, and Quiz View.
 * @param {string} viewName - 'home', 'course', or 'quiz'
 */
function showView(viewName) {
    homeView.classList.add('hidden');
    courseView.classList.add('hidden');
    quizView.classList.add('hidden');
    
    if (viewName === 'home') {
        homeView.classList.remove('hidden');
    } else if (viewName === 'course') {
        courseView.classList.remove('hidden');
        document.querySelector('main').scrollTo(0, 0); 
    } else if (viewName === 'quiz') {
        quizView.classList.remove('hidden');
    }
}

// === MODULE LOGIC ===

/**
 * Checks the strength of a given password and updates the UI indicator.
 */
function checkPasswordStrength(password) {
    const bar = document.getElementById('strength-bar');
    const text = document.getElementById('strength-text');
    if (!bar || !text) return; 

    let score = 0;
    const length = password.length;

    // Score calculation based on criteria:
    if (length >= 8) score += 15; 
    if (length >= 12) score += 25; 
    if (/[a-z]/.test(password)) score += 15; 
    if (/[A-Z]/.test(password)) score += 15; 
    if (/[0-9]/.test(password)) score += 15; 
    if (/[^A-Za-z0-9]/.test(password)) score += 15; 

    score = Math.min(100, score); 

    let strengthText = 'Start Typing';
    let barColor = 'bg-gray-400';
    let barWidth = score;

    if (length === 0) {
        strengthText = 'Start Typing';
        barWidth = 0;
        barColor = 'bg-gray-400';
    } else if (score < 40) {
        strengthText = 'Weak (Easy to Guess)';
        barColor = 'bg-red-500';
    } else if (score < 70) {
        strengthText = 'Medium (Needs Improvement)';
        barColor = 'bg-yellow-500';
    } else if (score < 100) {
        strengthText = 'Strong (Great Job!)';
        barColor = 'bg-blue-500';
    } else {
        strengthText = 'Excellent (Very Secure!)';
        barColor = 'bg-green-500';
    }

    bar.style.width = `${barWidth}%`;
    bar.className = `h-full transition-all duration-500 ease-in-out ${barColor}`;
    text.textContent = `Strength: ${strengthText} (${barWidth}%)`;
    
    // Set text color dynamically
    text.classList.remove('text-gray-500', 'text-red-500', 'text-yellow-600', 'text-blue-600', 'text-green-600');
    if (length === 0) {
        text.classList.add('text-gray-500');
    } else if (score < 40) {
        text.classList.add('text-red-500');
    } else if (score < 70) {
        text.classList.add('text-yellow-600');
    } else if (score < 100) {
        text.classList.add('text-blue-600');
    } else {
        text.classList.add('text-green-600');
    }
}

/**
 * Renders the navigation sidebar using the courseModules data.
 */
function renderSidebar() {
    // Populate the module list
    courseModules.forEach((module, index) => {
        const li = document.createElement('li');
        li.className = 'module-item p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out border-l-4 border-transparent animate-slide-in-left';
        li.style.animationDelay = `${index * 0.1}s`;
        li.textContent = module.title;
        li.dataset.index = index;
        li.onclick = () => { showView('course'); loadModule(index); };
        moduleList.appendChild(li);
    });

    // Load the first module's content, but keep the Home View visible initially
    loadModule(0); 
    showView('home');
}

/**
 * Renders the content for the selected module.
 * @param {number} index - The index of the module to load.
 */
function loadModule(index) {
    const module = courseModules[index];
    if (!module) return;

    // Update active class in sidebar
    document.querySelectorAll('.module-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-index="${index}"]`).classList.add('active');

    // Construct Content HTML
    let contentHTML = `
        <h2 class="text-3xl font-extrabold text-primary mb-2 animate-fade-in-up">
            ${module.title}
        </h2>
        <div class="mb-8 p-4 bg-secondary/10 border-l-4 border-secondary rounded-lg animate-fade-in-up" style="animation-delay: 0.1s;">
            <p class="font-semibold text-gray-700">Objective:</p>
            <p class="text-gray-700">${module.objective}</p>
        </div>
    `;

    let sectionIndex = 0;
    module.content.forEach(section => {
        contentHTML += `
            <div class="mb-8 p-6 bg-gray-50 rounded-xl shadow-lg transition duration-300 hover:shadow-xl animate-fade-in-up" style="animation-delay: ${(sectionIndex + 0.2) * 0.1}s;">
                <h3 class="text-xl font-bold text-gray-800 mb-3 border-b pb-2 border-gray-200">${section.heading}</h3>
                <ul class="list-disc pl-5 space-y-2 text-gray-700">
            `;
        section.points.forEach(point => {
            contentHTML += `
                <li class="pl-2">${point}</li>
            `;
        });
        contentHTML += `</ul>`;

        // Inject custom HTML content (like the password checker) if it exists
        if (section.customHTML) {
            contentHTML += section.customHTML;
        }
        
        if (section.note) {
            contentHTML += `
                <div class="mt-4 p-3 text-sm bg-blue-100 border-l-4 border-primary text-blue-800 rounded-md">
                    <p class="font-semibold">Quick Note:</p>
                    <p>${section.note}</p>
                </div>
            `;
        }
        contentHTML += `</div>`;
        sectionIndex++;
    });

    moduleContentDiv.innerHTML = contentHTML;
    // Scroll to the top of the content area for a better user experience
    document.querySelector('main').scrollTo(0, 0); 
    
    // Immediately check the empty password input after loading the module
    checkPasswordStrength(''); 
}

// === QUIZ LOGIC ===

/**
 * Initializes and starts the quiz.
 */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    modulePerformance = {};
    
    // Initialize module performance tracker
    courseModules.forEach(m => {
        const totalQuestions = quizQuestions.filter(q => q.module === m.shortTitle).length;
        modulePerformance[m.shortTitle] = {
            correct: 0,
            total: totalQuestions,
            title: m.title
        };
    });

    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    displayQuestion();
}

/**
 * Displays the current question and options.
 */
function displayQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showResults();
        return;
    }

    const questionData = quizQuestions[currentQuestionIndex];
    const statusText = document.getElementById('quiz-status');
    statusText.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length} (${questionData.module})`;

    let html = `
        <h3 class="text-xl font-semibold text-gray-800 mb-6 animate-fade-in-up">${questionData.question}</h3>
        <div id="options-container" class="space-y-4">
    `;

    questionData.options.forEach((option, index) => {
        html += `
            <button 
                class="option-btn w-full text-left p-4 rounded-xl border-2 border-gray-200 bg-gray-50 hover:bg-primary/10 transition duration-150 text-gray-800 font-medium shadow-sm animate-slide-in-left"
                style="animation-delay: ${index * 0.1}s;"
                onclick="selectAnswer(${index})"
            >
                ${option}
            </button>
        `;
    });

    html += `</div>`;
    questionArea.innerHTML = html;
}

/**
 * Handles the user selecting an answer and updates module performance.
 * @param {number} selectedIndex - The index of the option selected by the user.
 */
function selectAnswer(selectedIndex) {
    const questionData = quizQuestions[currentQuestionIndex];
    const optionsContainer = document.getElementById('options-container');
    const buttons = optionsContainer.querySelectorAll('.option-btn');

    // Disable all buttons to prevent double-clicking
    buttons.forEach(btn => btn.onclick = null);

    // Check if the answer is correct
    const isCorrect = selectedIndex === questionData.answerIndex;
    
    if (isCorrect) {
        score++;
        modulePerformance[questionData.module].correct++; // Record correct answer for the module
        buttons[selectedIndex].classList.remove('bg-gray-50', 'hover:bg-primary/10');
        buttons[selectedIndex].classList.add('bg-secondary', 'border-green-600', 'text-white', 'shadow-lg');
    } else {
        buttons[selectedIndex].classList.remove('bg-gray-50', 'hover:bg-primary/10');
        buttons[selectedIndex].classList.add('bg-red-400', 'border-red-600', 'text-white', 'shadow-lg');
        
        // Highlight the correct answer
        buttons[questionData.answerIndex].classList.add('bg-green-200', 'border-green-600', 'shadow-md');
    }

    // Move to the next question after a slight delay
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 1000); // 1 second delay to see the feedback
}

/**
 * Displays the final quiz results and performance analysis.
 */
function showResults() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    const totalQuestions = quizQuestions.length;
    const percentage = (score / totalQuestions) * 100;

    const title = document.getElementById('result-title');
    const message = document.getElementById('result-message');
    const scoreDisplay = document.getElementById('score-display');
    const breakdownDiv = document.getElementById('performance-breakdown');

    scoreDisplay.textContent = `${score}/${totalQuestions}`;

    // 1. Overall Feedback
    if (percentage >= 90) {
        title.textContent = "Certified Cyber Defender!";
        title.className = "text-4xl font-bold mb-2 text-center text-secondary";
        message.textContent = "Outstanding score! You have a high level of cyber awareness across all topics.";
    } else if (percentage >= 75) {
        title.textContent = "Great Job!";
        title.className = "text-4xl font-bold mb-2 text-center text-blue-600";
        message.textContent = "You passed with flying colors! Review the breakdown below to see where you can polish your skills.";
    } else if (percentage >= 50) {
        title.textContent = "Good Start, Needs Review!";
        title.className = "text-4xl font-bold mb-2 text-center text-yellow-600";
        message.textContent = "A decent score, but there are some critical gaps. Focus on the areas below marked for review.";
    } else {
        title.textContent = "Time for a Full Review!";
        title.className = "text-4xl font-bold mb-2 text-center text-red-600";
        message.textContent = "Please return to the learning modules and pay close attention to all 5 topics.";
    }

    // 2. Performance Breakdown
    let breakdownHTML = '';
    let recommendations = [];

    for (const module in modulePerformance) {
        const data = modulePerformance[module];
        const modulePercentage = data.total > 0 ? (data.correct / data.total) * 100 : 0;
        const isPassing = modulePercentage >= 75;
        const progressColor = isPassing ? 'bg-secondary' : 'bg-red-500';
        const textColor = isPassing ? 'text-green-800' : 'text-red-800';
        
        if (!isPassing) {
            recommendations.push(module);
        }

        breakdownHTML += `
            <div class="flex justify-between items-center p-4 rounded-lg bg-gray-100 shadow-sm">
                <div class="flex-1">
                    <p class="font-semibold text-gray-900">${module}</p>
                    ${!isPassing ? `<p class="text-xs text-red-600 font-bold mt-1">Review Recommended</p>` : ''}
                </div>
                <div class="w-1/3 flex items-center space-x-3">
                    <div class="w-full bg-gray-300 rounded-full h-2.5">
                        <div class="h-2.5 rounded-full transition-all duration-500" style="width: ${modulePercentage.toFixed(0)}%; background-color: ${isPassing ? '#34D399' : '#EF4444'};"></div>
                    </div>
                    <span class="text-sm font-bold ${textColor}">${data.correct}/${data.total}</span>
                </div>
            </div>
        `;
    }
    
    breakdownDiv.innerHTML = breakdownHTML;

    // 3. Final Recommendation Summary
    if (recommendations.length > 0) {
        let recMessage = `<div class="mt-6 p-4 bg-red-100 border-l-4 border-red-500 rounded-md">
            <p class="font-semibold text-red-800">Recommendation:</p>
            <p class="text-sm text-red-700 mt-1">Please focus your review on the following critical modules: <strong>${recommendations.join(', ')}</strong>.</p>
        </div>`;
        breakdownDiv.insertAdjacentHTML('afterend', recMessage);
    }
}

// Initialize the app on window load
window.onload = () => {
    initializeDarkMode();
    renderSidebar();
};
