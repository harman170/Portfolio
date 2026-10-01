/* -------------------------------------------------------------
   HARMANJOT KAUR PORTFOLIO - CORE APPLICATION LOGIC
   Features: Theme Switcher, Typing, Project Filter, Modals
------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // 1. Theme Toggle Management
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    // Load initial theme from localStorage
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark-theme";
    body.className = savedTheme;

    themeToggleBtn.addEventListener("click", () => {
        if (body.classList.contains("dark-theme")) {
            body.classList.replace("dark-theme", "light-theme");
            localStorage.setItem("portfolio-theme", "light-theme");
        } else {
            body.classList.replace("light-theme", "dark-theme");
            localStorage.setItem("portfolio-theme", "dark-theme");
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const isMenuOpen = navMenu.classList.contains("active");
        mobileToggle.innerHTML = isMenuOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
        lucide.createIcons();
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }
        });
    });

    // 3. Navbar scroll layout change
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 4. Typing Animation (Hero Subtitle)
    const typingText = document.getElementById("typing-text");
    const roles = [
        "Full-Stack Web Developer",
        "AI/ML Engineer Student",
        "Competitive Coder",
        "Open-Source Contributor"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // normal typing
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // brief pause before next word
        }

        setTimeout(type, typingSpeed);
    }
    
    if (typingText) {
        type();
    }

    // 5. Active Section Observer
    const sections = document.querySelectorAll("section[id]");
    const observerOptions = {
        threshold: 0.25,
        rootMargin: "-80px 0px 0px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // 6. Interactive Skill Tabs
    const skillTabs = document.querySelectorAll(".skill-tab-btn");
    const skillPanels = document.querySelectorAll(".skill-content-panel");

    skillTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetTab = tab.getAttribute("data-tab");
            
            // Remove active classes
            skillTabs.forEach(t => t.classList.remove("active"));
            skillPanels.forEach(p => p.classList.remove("active"));
            
            // Add active class
            tab.classList.add("active");
            const targetPanel = document.getElementById(targetTab);
            targetPanel.classList.add("active");

            // Restart fill bar animations for target panel
            const fills = targetPanel.querySelectorAll(".skill-fill");
            fills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = width;
                }, 50);
            });
        });
    });

    // Proactively animate default skills panel
    const defaultFills = document.querySelectorAll(".skill-content-panel.active .skill-fill");
    defaultFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
            fill.style.width = width;
        }, 300);
    });

    // 7. Projects Filters
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category") || "";
                const categories = cardCategory.split(" ");
                if (filterValue === "all" || categories.includes(filterValue)) {
                    card.style.display = "flex";
                    card.style.animation = "fadeIn 0.4s forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 8. Project Modal Overlays Injection & Management
    const projectDetails = {
        meds: {
            title: "Medicine Donation Platform",
            category: "Full-Stack MERN",
            date: "Jan 2026 - Present",
            image: "assets/projects/meds.png",
            techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Render Hosting"],
            role: "Lead Full-Stack Developer",
            problem: "Medical donation programs struggle with real-time stock allocation and matching local patients to donor stocks, resulting in medicine expiry and waste.",
            solution: "Architected a dual-dashboard MERN website allowing donor organizations to log inventory, and recipient clinics to claim medications. Integrated a state-sync pipeline that instantly adjusts availability to prevent double-claiming.",
            features: [
                "Real-time synchronized database log tracking donor donations.",
                "Automated email notifications to recipients when matched drugs are logged.",
                "Role-based secure routes and JWT validation controls.",
                "Modern, responsive responsive UI boards for tracking and analytics."
            ]
        },
        noticehub: {
            title: "CSB NoticeHub App",
            category: "Flutter & Firebase",
            date: "Feb 2025",
            image: "assets/projects/noticehub.png",
            techStack: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "AnimationController"],
            role: "Mobile App Developer",
            problem: "Traditional notices on notice boards are often missed, and emails are buried. Akal University students needed an instant, structured alert system.",
            solution: "Created CSB NoticeHub - a Flutter and Firebase mobile application featuring structured categories for push alerts, real-time message logs, and official attachments.",
            features: [
                "Categorized notification alerts directly from department heads.",
                "Real-time chat functionality supporting emojis and media uploads.",
                "Seamless Firebase security rules shielding unauthorized post creations.",
                "Sleek transition animation sets handled via AnimationController."
            ]
        },
        nexthope: {
            title: "NextHope Volunteer Coordination Platform",
            category: "Node.js & MongoDB",
            date: "Jan 2025",
            image: "assets/projects/nexthope.png",
            techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "CSS3 Grid"],
            role: "Backend & UI Developer",
            problem: "Rehabilitation operations lack consolidated portals that coordinate local volunteers to tasks, leading to under-utilized volunteer hours.",
            solution: "Designed and built NextHope, coordinating tasks, roles, and feedback for community operations. Leveraged MongoDB indexes for quick query filtering.",
            features: [
                "Task board where volunteers can view and request job enrollments.",
                "Admin panel displaying volunteer statistics and task verification flows.",
                "Secure API architecture backed by robust JSON Web Token checks.",
                "Completely customized CSS Grid theme adapting elegantly to devices."
            ]
        },
        wine: {
            title: "Wine Quality Prediction",
            category: "Machine Learning / Python",
            date: "Jun 2025",
            image: "assets/projects/wine.png",
            techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
            role: "Data Analyst & ML Developer",
            problem: "Evaluating wine quality manually is subjective, expensive, and slow. Wineries need reliable algorithms to classify quality grades dynamically.",
            solution: "Performed extensive Exploratory Data Analysis (EDA) on chemical attributes (acidity, residual sugar, pH, alcohol), and trained 10 classification models to determine the optimal predictor.",
            features: [
                "Thorough Exploratory Data Analysis detailing feature correlations.",
                "Comparisons of 10 ML models (Random Forest, SVM, KNN, Logistic Regression, etc.).",
                "Hyperparameter tuning improving classification precision and recall.",
                "Insightful heatmaps demonstrating chemical impacts on quality metrics."
            ]
        },
        dax: {
            title: "DAX Financial & Business Intelligence Engine",
            category: "Data Analytics & BI",
            date: "Upcoming (In Development)",
            image: "assets/projects/dax.jpg",
            techStack: ["DAX (Data Analysis Expressions)", "Power BI", "SQL Server", "Python", "Data Modeling"],
            role: "BI Developer & Data Analyst",
            problem: "Enterprise financial decision-makers rely on scattered spreadsheets, resulting in slow quarter-end reporting, human calculation mistakes, and an inability to perform dynamic what-if KPI simulations.",
            solution: "Building an automated enterprise intelligence suite leveraging complex DAX expressions, dynamic measures, star-schema data modeling, and executive variance dashboards.",
            features: [
                "Dynamic DAX measures calculating Year-over-Year (YoY) revenue growth, gross margin variances, and EBITDA metrics.",
                "Relational star schema connecting sales transactions, departmental budgets, and regional performance records.",
                "Automated SQL ETL data pipelines eliminating manual workbook preparation.",
                "Interactive executive scorecards with anomaly detection, quarterly targets, and geographic drill-down capabilities."
            ]
        },
        omni: {
            title: "OmniAI - Multimodal Intelligence Suite",
            category: "Generative & Multimodal AI",
            date: "Upcoming (In Planning)",
            image: "assets/projects/omni.jpg",
            techStack: ["Python", "PyTorch", "Transformers", "FastAPI", "React.js", "Whisper", "Vector DB"],
            role: "AI/ML Architect & Lead",
            problem: "Modern workflows require switching between fragmented point tools for computer vision analysis, voice transcription, document understanding, and automated agent reasoning.",
            solution: "Architecting OmniAI as a unified multimodal AI studio that processes speech, text, code, and image streams concurrently, enabling rich cross-modal reasoning in a single interface.",
            features: [
                "Cross-modal reasoning engine combining vision-language models for instant image analysis, OCR, and scene segmentation.",
                "Low-latency bidirectional audio streaming leveraging Whisper speech recognition and neural voice synthesis.",
                "Modular agent orchestration with vector memory for conversational retrieval on private files.",
                "Ultra-sleek dark glassmorphic dashboard with live audio visualizer and neural network architecture inspector."
            ]
        },
        estatesync: {
            title: "EstateSync - Real Estate Management Desktop Suite",
            category: "Java Desktop & Database System",
            date: "Upcoming (In Planning)",
            image: "assets/projects/estatesync.jpg",
            techStack: ["Java", "JavaFX", "MySQL", "Relational DB", "iText PDF", "Apache POI"],
            role: "Full-Stack Software Engineer",
            problem: "Property dealers and brokers frequently lose tracks of leads, plot boundary specs, and commission settlements by relying on messy physical diaries, duplicated listings, and manual paperwork.",
            solution: "Designing EstateSync, a complete JavaFX desktop application with MySQL backend that consolidates customer verification, property inventories, financial deal closures, and visual analytics.",
            features: [
                "Customer Master: Profile management with 10-digit mobile quick search, buyer/seller categorization, and Aadhar/photo attachments.",
                "Property Lister: Owner phone linking, dimensional boundary lengths (Front/Rear/Left/Right), facing direction, sq. yards, and DDA clearance tracking.",
                "Property Finder: Dynamic multi-criteria search (City, Area, Price Min/Max) with tabular results and one-click 'Create PDF' client catalog export.",
                "Finalized Deals Manager: Relational inner joins linking property and seller info, calculating down payments, advance, commission, and pending balances automatically.",
                "Interactive Visual BI: Real-time JavaFX pie charts directly querying MySQL for Customer Types, Property Classifications, and Deal Status ratios.",
                "Dual Format Reports: One-click directory exports to Excel (.xlsx) and printable PDF (.pdf) documents."
            ]
        }
    };

    const modal = document.getElementById("project-modal");
    const modalContent = document.getElementById("modal-project-details");
    const modalClose = document.getElementById("modal-close");
    const openModalButtons = document.querySelectorAll(".open-modal-btn");

    openModalButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const projectKey = btn.getAttribute("data-project");
            const data = projectDetails[projectKey];
            
            if (data) {
                // Inject content
                modalContent.innerHTML = `
                    <img src="${data.image}" alt="${data.title}" class="modal-project-img">
                    <h3 class="modal-project-title">${data.title}</h3>
                    <div class="modal-project-meta">
                        <span><i data-lucide="folder"></i> ${data.category}</span>
                        <span><i data-lucide="calendar"></i> ${data.date}</span>
                        <span><i data-lucide="user"></i> ${data.role}</span>
                    </div>
                    
                    <div class="modal-project-details-grid">
                        <div class="modal-text-content">
                            <h4 class="modal-section-title">The Challenge</h4>
                            <p>${data.problem}</p>
                            
                            <h4 class="modal-section-title">The Solution</h4>
                            <p>${data.solution}</p>
                            
                            <h4 class="modal-section-title">Key Accomplishments</h4>
                            <ul style="padding-left: 20px; margin-bottom: 20px; color: var(--text-secondary); font-size: 14px;">
                                ${data.features.map(f => `<li style="margin-bottom: 6px;">${f}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div style="border-top: 1px solid var(--border-color); padding-top: 20px;">
                        <h4 class="modal-section-title">Technologies Used</h4>
                        <div class="modal-tag-group">
                            ${data.techStack.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                    </div>
                `;
                
                // Show modal
                modal.classList.add("active");
                document.body.style.overflow = "hidden"; // disable body scroll
                
                // Re-initialize Lucide icons inside modal
                lucide.createIcons();
            }
        });
    });

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = ""; // restore body scroll
    }

    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });

    // 9. Contact Form Simulation
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Show loading status
            formStatus.className = "form-status";
            formStatus.innerHTML = '<span style="color: var(--text-secondary)">Sending message... <i data-lucide="loader" class="animate-spin"></i></span>';
            lucide.createIcons();
            
            // Simulate API request (1.5 seconds)
            setTimeout(() => {
                // Success message
                formStatus.className = "form-status success";
                formStatus.innerHTML = '<i data-lucide="check-circle" style="vertical-align: middle;"></i> Message sent successfully! I will reach out soon.';
                lucide.createIcons();
                contactForm.reset();
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }, 1500);
        });
    }
});
