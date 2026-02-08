const express = require('express');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Course modules data
const courseModules = [
    {
        id: 'module1',
        title: 'The Essential Five: Core Security Principles',
        description: 'Master the foundation of cybersecurity with our five essential principles',
        duration: '2 hours',
        difficulty: 'Beginner',
        color: '#EF4444',
        lessons: [
            'Understanding the Attack Surface',
            'Defense in Depth Strategy',
            'Zero Trust Architecture',
            'Security Layers Overview',
            'Practical Implementation'
        ],
        moduleContent: `
            <h2>1. Big-Picture Overview</h2>
            <p>Imagine building a skyscraper without a foundation; it doesn't matter how fancy the windows are if the ground is soft. These five principles are the "Foundational Ground" of security. Without them, you are just buying expensive tools without knowing why. We use these to stop chaos before it starts.</p>

            <h2>2. Deep Explanation of Lessons</h2>
            <h3>Lesson 1: Understanding the Attack Surface</h3>
            <p><strong>The Concept:</strong> Your attack surface is the sum of every possible "door" or "window" an attacker can touch. The more features your app has, the bigger your surface.</p>
            <p><strong>Step-by-Step:</strong> 
                1. Identify all open ports.
                2. List all user input fields.
                3. Map out all external APIs.
                4. Reduce: Close what you don't use.
            </p>

            <h3>Lesson 2: Defense in Depth (DiD)</h3>
            <p><strong>The Concept:</strong> Redundancy. If a hacker picks the lock on your front door, they should still find a locked safe inside, and that safe should be bolted to a floor covered in motion sensors.</p>

            <h2>3. Real-World Examples</h2>
            <ul>
                <li><strong>Scenario A:</strong> A bank uses an app. They have a firewall (Layer 1), an encrypted database (Layer 2), and mandatory employee training (Layer 3). When a hacker steals an employee's laptop, the encrypted database prevents them from seeing account balances.</li>
                <li><strong>Scenario B:</strong> A smart-home company removes the "Web Control Panel" because most users use the mobile app. This shrinks their attack surface by removing an entire target.</li>
            </ul>

            <h2>4. Practical Demonstration</h2>
            <p><strong>Checking your own attack surface (Terminal):</strong></p>
            <pre><code># Use 'nmap' to see which "doors" (ports) are open on your machine
nmap -v localhost</code></pre>
            <p><em>Explanation:</em> This command scans your local computer. If you see "Port 80 (HTTP) open" but you aren't running a website, that is a hole in your attack surface you should close.</p>

            <h2>5. Attacker vs. Defender</h2>
            <p><strong>Attacker:</strong> "I'll scan the whole company to find one forgotten server that hasn't been updated since 2019."</p>
            <p><strong>Defender:</strong> "I've set up automated scans to find old servers and shut them down immediately (Surface Reduction)."</p>

            <h2>6. Common Mistakes</h2>
            <p><strong>Mistake:</strong> "I have a strong firewall, so I don't need to encrypt my internal data." 
            <br><strong>Danger:</strong> If the firewall is bypassed once, the hacker has total access to everything (No Defense in Depth).</p>

            <h2>7. Mini Exercise</h2>
            <p>Look at your smartphone. List 3 things that are part of its "Attack Surface" (e.g., Bluetooth, the Charging Port, the App Store). How can you "shrink" that surface today?</p>

            <h2>8. Key Takeaways</h2>
            <ul>
                <li>Small Attack Surface = Less Work for Defenders.</li>
                <li>Layer your security like an onion.</li>
                <li>Verify everyone, even people inside the office (Zero Trust).</li>
            </ul>
        `
    },
    {
        id: 'module2',
        title: 'Authentication & Access Control',
        description: 'Learn how to secure user identities and control access effectively',
        duration: '2.5 hours',
        difficulty: 'Beginner',
        color: '#3B82F6',
        lessons: [
            'Password Security Best Practices',
            'Multi-Factor Authentication',
            'Single Sign-On (SSO)',
            'Role-Based Access Control',
            'Implementing OAuth 2.0'
        ],
        moduleContent: `
            <h2>1. Big-Picture Overview</h2>
            <p>Identity is the new perimeter. In a world of cloud apps, we don't have walls anymore—we have logins. If you fail at authentication, you've handed the keys to the kingdom to the enemy.</p>

            <h2>2. Deep Explanation of Lessons</h2>
            <h3>Lesson 1: Password Security & Salting</h3>
            <p>We never store passwords as plain text. We use "Hashes" and "Salts." A Salt is random data added to a password before it's hashed, making every entry unique even if two users choose the same password.</p>

            <h3>Lesson 2: RBAC (Role-Based Access Control)</h3>
            <p>Instead of saying "Bob can edit files," we say "Editors can edit files" and make Bob an "Editor." This makes managing 1,000 employees possible without making mistakes.</p>

            <h2>3. Real-World Examples</h2>
            <ul>
                <li><strong>Scenario A:</strong> A hacker steals a database of 1 million passwords. Because the company used "Bcrypt" with "Salting," it would take the hacker 100 years to crack them.</li>
                <li><strong>Scenario B:</strong> An intern leaves a company. Because they used SSO (Single Sign-On), the IT manager clicks one button to disable the intern's access to 50 different apps instantly.</li>
            </ul>

            <h2>4. Practical Demonstration</h2>
            <p><strong>Hashing a password safely (Node.js/JavaScript):</strong></p>
            <pre><code>const bcrypt = require('bcrypt');
const myPassword = "securePassword123";

// Hash the password with a "Salt Round" of 10
bcrypt.hash(myPassword, 10, (err, hash) => {
    console.log("Secure Hash to store in DB:", hash);
});</code></pre>
            <p><em>Explanation:</em> This code takes a readable password and turns it into a long string of gibberish that cannot be reversed. Even if a hacker sees the hash, they don't know the password.</p>

            <h2>5. Attacker vs. Defender</h2>
            <p><strong>Attacker:</strong> "I'll try to guess common passwords like '123456' on thousands of accounts (Password Spraying)."</p>
            <p><strong>Defender:</strong> "I'll enable MFA. Even if they guess the password, they won't have the user's phone for the second code."</p>

            <h2>6. Common Mistakes</h2>
            <p><strong>Mistake:</strong> Trusting users to pick good passwords without enforcing rules. 
            <br><strong>Danger:</strong> Users will choose "Password1!" every single time.</p>

            <h2>7. Mini Exercise</h2>
            <p>Go to your favorite app. Check the security settings. Do you have MFA turned on? If not, turn it on and notice how the "Factor" (SMS or App) works.</p>

            <h2>8. Key Takeaways</h2>
            <ul>
                <li>MFA is the single best way to stop 99% of identity attacks.</li>
                <li>Never store passwords in plain text—ever.</li>
                <li>Least Privilege: Only give users the access they NEED to do their job.</li>
            </ul>
        `
    },
    {
        id: 'module3',
        title: 'Network Security Fundamentals',
        description: 'Understand network threats and defense mechanisms',
        duration: '3 hours',
        difficulty: 'Intermediate',
        color: '#10B981',
        lessons: [
            'Network Architecture Basics',
            'Firewalls and IDS/IPS',
            'VPN Technology',
            'DNS Security',
            'DDoS Protection'
        ],
        moduleContent: `
            <h2>1. Big-Picture Overview</h2>
            <p>The network is the circulatory system of your business. If the network is poisoned, every computer connected to it is at risk. Network security is about controlling the flow of traffic to ensure only the "good guys" can pass.</p>

            <h2>2. Deep Explanation of Lessons</h2>
            <h3>Lesson 1: Firewalls (The Filter)</h3>
            <p>Firewalls work on "Rules." A rule might say: "Allow traffic from Port 443 (Web) but block everything else." It's the gatekeeper of your digital border.</p>

            <h3>Lesson 2: IDS/IPS (The Alarm & Guard)</h3>
            <p>IDS (Intrusion Detection) watches for patterns. If someone tries to login 500 times in 1 second, it screams "Alert!" IPS (Intrusion Prevention) goes a step further and actually cuts the connection.</p>

            <h2>3. Real-World Examples</h2>
            <ul>
                <li><strong>Scenario A:</strong> A coffee shop offers free Wi-Fi. An attacker tries to "Sniff" (listen to) your data. Because you are using a VPN, they only see encrypted junk.</li>
                <li><strong>Scenario B:</strong> A news website is attacked by 10,000 bots trying to crash it (DDoS). Their DDoS protection recognizes the bot behavior and blocks them before the server catches fire.</li>
            </ul>

            <h2>4. Practical Demonstration</h2>
            <p><strong>Viewing your Network Connections (Bash):</strong></p>
            <pre><code># See every app on your computer that is currently talking to the internet
netstat -tunlp</code></pre>
            <p><em>Explanation:</em> This shows you the "Connections." If you see a program you don't recognize sending data to a random IP address, you might have a virus.</p>

            <h2>5. Attacker vs. Defender</h2>
            <p><strong>Attacker:</strong> "I'll join the public Wi-Fi and use a tool called 'Wireshark' to see if anyone is sending passwords over an unencrypted (HTTP) connection."</p>
            <p><strong>Defender:</strong> "I've enforced HTTPS everywhere, so even on public Wi-Fi, the data is unreadable to sniffer tools."</p>

            <h2>6. Common Mistakes</h2>
            <p><strong>Mistake:</strong> Putting the "Database" on a public IP address so it's "easier to manage." 
            <br><strong>Danger:</strong> Now anyone in the world can try to hack your database directly.</p>

            <h2>7. Mini Exercise</h2>
            <p>Open your command prompt and type <code>ping google.com</code>. Notice the IP address it returns. This is DNS at work! Imagine if that IP address was changed to a hacker's computer—that is a DNS attack.</p>

            <h2>8. Key Takeaways</h2>
            <ul>
                <li>Segmentation: Keep your "Home" network and "Work" network separate.</li>
                <li>VPNs are essential for remote work on public networks.</li>
                <li>Firewalls should follow a "Deny All" policy by default.</li>
            </ul>
        `
    },
    {
        id: 'module4',
        title: 'Cryptography Essentials',
        description: 'Explore encryption, hashing, and digital signatures',
        duration: '3.5 hours',
        difficulty: 'Intermediate',
        color: '#F59E0B',
        lessons: [
            'Symmetric Encryption',
            'Asymmetric Encryption',
            'Hashing Algorithms',
            'Digital Signatures',
            'Key Management'
        ],
        moduleContent: `
            <h2>1. Big-Picture Overview</h2>
            <p>Cryptography is the "Secret Sauce" that makes the internet safe. Without it, you couldn't buy anything online, use a credit card, or send a private message. It is the math that keeps your secrets secret.</p>

            <h2>2. Deep Explanation of Lessons</h2>
            <h3>Lesson 1: Symmetric vs. Asymmetric</h3>
            <p><strong>Symmetric:</strong> Use one key (fast). Like a house key.
            <br><strong>Asymmetric:</strong> Use two keys (secure). Like a mailbox: anyone can drop a letter in (Public Key), but only the owner has the key to get it out (Private Key).</p>

            <h3>Lesson 2: Digital Signatures</h3>
            <p>This isn't an image of your name. It's a mathematical proof that a file wasn't changed. If even one letter in a document is changed, the signature becomes invalid.</p>

            <h2>3. Real-World Examples</h2>
            <ul>
                <li><strong>Scenario A:</strong> You visit <code>https://mybank.com</code>. The "S" stands for SSL/TLS, which uses Asymmetric Encryption to hide your login from everyone else on your Wi-Fi.</li>
                <li><strong>Scenario B:</strong> You download a software update. Your computer checks the "Digital Signature." If a hacker added a virus to the update, the signature would fail and your computer would block the install.</li>
            </ul>

            <h2>4. Practical Demonstration</h2>
            <p><strong>Creating a Hash of a text file (Linux/Mac):</strong></p>
            <pre><code>echo "Secret Message" > secret.txt
sha256sum secret.txt</code></pre>
            <p><em>Explanation:</em> This generates a unique string (the hash). If you change "Secret" to "secret" (lowercase) and run it again, the hash will be completely different. This proves the file was changed!</p>

            <h2>5. Attacker vs. Defender</h2>
            <p><strong>Attacker:</strong> "I'll try to find where they stored their Private Key. If I get that, I can read all their encrypted emails."</p>
            <p><strong>Defender:</strong> "I store my Private Key in a Hardware Security Module (HSM)—a physical chip that makes it impossible to copy the key."</p>

            <h2>6. Common Mistakes</h2>
            <p><strong>Mistake:</strong> Trying to "invent your own" encryption math. 
            <br><strong>Danger:</strong> Even the smartest people make math mistakes. Always use industry-standard libraries like OpenSSL or Sodium.</p>

            <h2>7. Mini Exercise</h2>
            <p>Look for the "Lock" icon in your browser's address bar. Click it and look for "Certificate." See who "Signed" the certificate for this website. That is the chain of trust!</p>

            <h2>8. Key Takeaways</h2>
            <ul>
                <li>Encryption = Privacy (Hiding data).</li>
                <li>Hashing = Integrity (Checking if data changed).</li>
                <li>Signatures = Authenticity (Checking who sent it).</li>
            </ul>
        `
    },
    {
        id: 'module5',
        title: 'Incident Response & Threat Analysis',
        description: 'Handle security incidents and analyze threats effectively',
        duration: '4 hours',
        difficulty: 'Advanced',
        color: '#8B5CF6',
        lessons: [
            'Incident Response Planning',
            'Threat Detection & Analysis',
            'Forensics Fundamentals',
            'Recovery Procedures',
            'Lessons Learned'
        ],
        moduleContent: `
            <h2>1. Big-Picture Overview</h2>
            <p>In cybersecurity, it is not a matter of "if," but "when." This module is about what happens after the sirens go off. Success is defined by how fast you recover, not just by how well you defended.</p>

            <h2>2. Deep Explanation of Lessons</h2>
            <h3>Lesson 1: The OODA Loop</h3>
            <p>Observe, Orient, Decide, Act. When an attack happens, you must act in seconds. A plan (Incident Response Plan) tells you exactly who to call and what to unplug.</p>

            <h3>Lesson 2: Digital Forensics</h3>
            <p>This is the CSI of the computer world. We look at "Logs" (the computer's diary) to see exactly how the hacker got in, what they looked at, and if they are still there.</p>

            <h2>3. Real-World Examples</h2>
            <ul>
                <li><strong>Scenario A:</strong> A company notices a weird spike in data leaving their network at 3 AM. Because they have "Threat Detection," they automatically lock the accounts involved, stopping a major theft.</li>
                <li><strong>Scenario B:</strong> A hospital gets hit by "Ransomware" (files are locked). Because they have "Clean Backups," they wipe the computers and restore the data in 4 hours without paying the hacker.</li>
            </ul>

            <h2>4. Practical Demonstration</h2>
            <p><strong>Searching through system logs for errors (Bash):</strong></p>
            <pre><code># Look for the word "Failed" in your system authentication logs
grep "Failed" /var/log/auth.log</code></pre>
            <p><em>Explanation:</em> If you see 1,000 "Failed" messages from an IP address in Russia, you know someone is currently trying to break in.</p>

            <h2>5. Attacker vs. Defender</h2>
            <p><strong>Attacker:</strong> "Once I'm in, I'll delete the logs so the admins can't see what I did."</p>
            <p><strong>Defender:</strong> "I send my logs to a separate 'Log Server' that is read-only. The attacker can't delete what they can't touch."</p>

            <h2>6. Common Mistakes</h2>
            <p><strong>Mistake:</strong> Panic. Turning off the power immediately without taking a "Snapshot" of the RAM. 
            <br><strong>Danger:</strong> Most evidence lives in the RAM. If you pull the plug, you lose the chance to see what the hacker was doing.</p>

            <h2>7. Mini Exercise</h2>
            <p>Write down a 3-step plan for what you would do if you noticed your personal Instagram was hacked right now. Who do you contact? What do you change first?</p>

            <h2>8. Key Takeaways</h2>
            <ul>
                <li>Preparation is 90% of a successful recovery.</li>
                <li>Logs are your best friend during an investigation.</li>
                <li>Always perform a "Post-Mortem" to learn why it happened.</li>
            </ul>
        `
    }
];

// @route   GET /api/courses
// @desc    Get all course modules
// @access  Public
router.get('/', optionalAuth, (req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: courseModules.length,
            modules: courseModules.map(module => ({
                id: module.id,
                title: module.title,
                description: module.description,
                duration: module.duration,
                difficulty: module.difficulty,
                color: module.color,
                lessonsCount: module.lessons.length
            }))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching courses',
            error: error.message
        });
    }
});

// @route   GET /api/courses/:moduleId
// @desc    Get specific course module details
// @access  Public
router.get('/:moduleId', optionalAuth, (req, res) => {
    try {
        const { moduleId } = req.params;
        const module = courseModules.find(m => m.id === moduleId);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        res.status(200).json({
            success: true,
            module
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching module',
            error: error.message
        });
    }
});

// @route   GET /api/courses/:moduleId/lessons
// @desc    Get lessons for a specific module
// @access  Public
router.get('/:moduleId/lessons', (req, res) => {
    try {
        const { moduleId } = req.params;
        const module = courseModules.find(m => m.id === moduleId);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        res.status(200).json({
            success: true,
            moduleId: module.id,
            moduleTitle: module.title,
            lessons: module.lessons,
            content: module.moduleContent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching lessons',
            error: error.message
        });
    }
});

module.exports = router;