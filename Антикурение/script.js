// Данные для базы знаний
const articles = [
    {
        id: 1,
        title: "Вред курения для сердечно-сосудистой системы",
        category: "harm",
        description: "Как курение влияет на сердце и сосуды, и какие последствия это имеет для здоровья.",
        icon: "❤️",
        date: "15.05.2024",
        views: 1245
    },
    {
        id: 2,
        title: "Метод постепенного снижения количества сигарет",
        category: "methods",
        description: "Поэтапный подход к отказу от курения, который помогает снизить стресс для организма.",
        icon: "📉",
        date: "12.05.2024",
        views: 987
    },
    {
        id: 3,
        title: "Как справляться со стрессом без сигарет",
        category: "psychology",
        description: "Эффективные техники управления стрессом для тех, кто бросает курить.",
        icon: "🧘",
        date: "10.05.2024",
        views: 1567
    },
    {
        id: 4,
        title: "Никотиновая зависимость: медицинский взгляд",
        category: "medicine",
        description: "Что говорит современная медицина о природе никотиновой зависимости и способах ее преодоления.",
        icon: "🏥",
        date: "08.05.2024",
        views: 876
    },
    {
        id: 5,
        title: "Влияние курения на дыхательную систему",
        category: "harm",
        description: "Как курение разрушает легкие и приводит к развитию хронических заболеваний.",
        icon: "🫁",
        date: "05.05.2024",
        views: 1342
    },
    {
        id: 6,
        title: "Никотинзаместительная терапия: плюсы и минусы",
        category: "methods",
        description: "Обзор различных методов НЗТ и их эффективности в борьбе с курением.",
        icon: "💊",
        date: "03.05.2024",
        views: 1109
    }
];

// Данные пользователя
let user = {
    isLoggedIn: false,
    name: "",
    email: "",
    quitDate: null,
    progress: 0,
    diaryEntries: []
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация навигации
    initNavigation();
    
    // Инициализация базы знаний
    initKnowledgeBase();
    
    // Инициализация калькулятора
    initCalculator();
    
    // Инициализация личного кабинета
    initPersonalArea();
    
    // Инициализация аутентификации
    initAuth();
    
    // Проверка состояния входа
    checkLoginStatus();
});

// Инициализация навигации
function initNavigation() {
    // Обработчики для навигационных ссылок
    const navLinks = document.querySelectorAll('.nav-link, .footer-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Обновление активного состояния в навигации
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Кнопка мобильного меню
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
    
    // Кнопка "Начать путь к здоровью"
    const startJourneyBtn = document.getElementById('startJourneyBtn');
    startJourneyBtn.addEventListener('click', function() {
        if (user.isLoggedIn) {
            showSection('personal');
        } else {
            showSection('auth');
            document.querySelector('.auth-tab[data-tab="register"]').click();
        }
    });
    
    // Кнопка "Узнать больше"
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    learnMoreBtn.addEventListener('click', function() {
        showSection('knowledge');
    });
}

// Показать определенный раздел
function showSection(sectionId) {
    // Скрыть все разделы
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Показать выбранный раздел
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        
        // Прокрутка к началу раздела
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Инициализация базы знаний
function initKnowledgeBase() {
    const articlesContainer = document.getElementById('articlesContainer');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Отображение всех статей при загрузке
    displayArticles('all');
    
    // Добавление обработчиков для кнопок категорий
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс к текущей кнопке
            this.classList.add('active');
            // Отображаем статьи выбранной категории
            displayArticles(this.dataset.category);
        });
    });
    
    // Функция отображения статей
    function displayArticles(category) {
        articlesContainer.innerHTML = '';
        
        const filteredArticles = category === 'all' 
            ? articles 
            : articles.filter(article => article.category === category);
        
        filteredArticles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'article-card card';
            articleCard.innerHTML = `
                <div class="article-image">
                    <span>${article.icon}</span>
                </div>
                <div class="article-content">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <div class="article-meta">
                        <span><i class="far fa-calendar"></i> ${article.date}</span>
                        <span><i class="far fa-eye"></i> ${article.views}</span>
                    </div>
                    <button class="btn btn-primary" style="margin-top: 15px;">Читать далее</button>
                </div>
            `;
            articlesContainer.appendChild(articleCard);
        });
    }
}

// Инициализация калькулятора
function initCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.addEventListener('click', calculateSavings);
    
    const updateProgressBtn = document.getElementById('updateProgressBtn');
    updateProgressBtn.addEventListener('click', updateProgress);
}

// Расчет экономии
function calculateSavings() {
    const cigarettesPerDay = parseInt(document.getElementById('cigarettesPerDay').value);
    const packPrice = parseInt(document.getElementById('packPrice').value);
    const cigarettesInPack = parseInt(document.getElementById('cigarettesInPack').value);
    
    const costPerCigarette = packPrice / cigarettesInPack;
    const dailyCost = cigarettesPerDay * costPerCigarette;
    const monthlyCost = dailyCost * 30;
    const yearlyCost = dailyCost * 365;
    
    const resultDiv = document.getElementById('result');
    document.getElementById('dailySavings').textContent = `В день: ${dailyCost.toFixed(2)} руб.`;
    document.getElementById('monthlySavings').textContent = `В месяц: ${monthlyCost.toFixed(2)} руб.`;
    document.getElementById('yearlySavings').textContent = `В год: ${yearlyCost.toFixed(2)} руб.`;
    
    resultDiv.style.display = 'block';
}

// Обновление прогресса
function updateProgress() {
    const progressInput = document.getElementById('progressInput');
    const progressDays = parseInt(progressInput.value);
    const progressBar = document.getElementById('progressBar');
    const progressDaysLabel = document.getElementById('progressDays');
    
    if (progressDays >= 0 && progressDays <= 30) {
        const progressPercent = (progressDays / 30) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressDaysLabel.textContent = `${progressDays} дней`;
        
        // Сохранение в данные пользователя
        user.progress = progressDays;
        
        // Обновление в личном кабинете
        if (user.isLoggedIn) {
            document.getElementById('daysWithoutSmoking').textContent = progressDays;
            document.getElementById('moneySaved').textContent = Math.round(progressDays * 75);
            document.getElementById('healthImprovement').textContent = `${Math.min(progressDays * 3, 100)}%`;
            document.getElementById('detailedProgressBar').style.width = `${progressPercent}%`;
        }
    }
}

// Инициализация личного кабинета
function initPersonalArea() {
    // Обработчики для бокового меню
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            
            // Удаляем активный класс у всех ссылок
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Добавляем активный класс к текущей ссылке
            this.classList.add('active');
            
            // Скрываем все вкладки
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Показываем выбранную вкладку
            const targetTab = document.getElementById(tabId + 'Tab');
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
    
    // Сохранение даты отказа
    const saveQuitDateBtn = document.getElementById('saveQuitDate');
    saveQuitDateBtn.addEventListener('click', function() {
        const quitDate = document.getElementById('quitDate').value;
        if (quitDate) {
            user.quitDate = quitDate;
            alert('Дата отказа от курения сохранена!');
            
            // Расчет количества дней без курения
            const today = new Date();
            const quit = new Date(quitDate);
            const diffTime = Math.abs(today - quit);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            // Обновление прогресса
            document.getElementById('progressInput').value = diffDays;
            updateProgress();
        }
    });
    
    // Сохранение записи в дневнике
    const saveDiaryEntryBtn = document.getElementById('saveDiaryEntry');
    saveDiaryEntryBtn.addEventListener('click', function() {
        const date = document.getElementById('diaryDate').value;
        const mood = document.getElementById('diaryMood').value;
        const cravings = document.getElementById('diaryCravings').value;
        const notes = document.getElementById('diaryNotes').value;
        
        if (date && notes) {
            const entry = {
                date,
                mood,
                cravings,
                notes
            };
            
            user.diaryEntries.push(entry);
            displayDiaryEntries();
            
            // Очистка формы
            document.getElementById('diaryDate').value = '';
            document.getElementById('diaryMood').value = '3';
            document.getElementById('diaryCravings').value = '3';
            document.getElementById('diaryNotes').value = '';
            
            alert('Запись сохранена!');
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    });
    
    // Сохранение настроек
    const saveSettingsBtn = document.getElementById('saveSettings');
    saveSettingsBtn.addEventListener('click', function() {
        alert('Настройки сохранены!');
    });
}

// Отображение записей дневника
function displayDiaryEntries() {
    const entriesList = document.getElementById('diaryEntriesList');
    entriesList.innerHTML = '';
    
    user.diaryEntries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = 'diary-entry card';
        
        const moodText = getMoodText(entry.mood);
        const cravingsText = getCravingsText(entry.cravings);
        
        entryElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <strong>${formatDate(entry.date)}</strong>
                <div>
                    <span>Настроение: ${moodText}</span> | 
                    <span>Тяга: ${cravingsText}</span>
                </div>
            </div>
            <p>${entry.notes}</p>
        `;
        
        entriesList.appendChild(entryElement);
    });
}

// Вспомогательные функции для дневника
function getMoodText(value) {
    const moods = {
        1: '😢 Ужасное',
        2: '😔 Плохое',
        3: '😐 Нормальное',
        4: '😊 Хорошее',
        5: '😄 Отличное'
    };
    return moods[value] || 'Не указано';
}

function getCravingsText(value) {
    const cravings = {
        1: 'Очень слабая',
        2: 'Слабая',
        3: 'Средняя',
        4: 'Сильная',
        5: 'Очень сильная'
    };
    return cravings[value] || 'Не указано';
}

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}

// Инициализация аутентификации
function initAuth() {
    // Обработчики для вкладок аутентификации
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Удаляем активный класс у всех вкладок
            authTabs.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс к текущей вкладке
            this.classList.add('active');
            
            // Скрываем все формы
            const authForms = document.querySelectorAll('.auth-form');
            authForms.forEach(form => form.classList.remove('active'));
            
            // Показываем выбранную форму
            const targetForm = document.getElementById(tabId + 'Form');
            if (targetForm) {
                targetForm.classList.add('active');
            }
        });
    });
    
    // Обработчики для кнопок входа/регистрации в шапке
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    loginBtn.addEventListener('click', function() {
        showSection('auth');
        document.querySelector('.auth-tab[data-tab="login"]').click();
    });
    
    registerBtn.addEventListener('click', function() {
        showSection('auth');
        document.querySelector('.auth-tab[data-tab="register"]').click();
    });
    
    logoutBtn.addEventListener('click', function() {
        user.isLoggedIn = false;
        user.name = "";
        user.email = "";
        checkLoginStatus();
        showSection('home');
    });
    
    // Обработчики для форм
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // В реальном приложении здесь был бы запрос к серверу
        if (email && password) {
            user.isLoggedIn = true;
            user.email = email;
            user.name = email.split('@')[0];
            checkLoginStatus();
            showSection('personal');
            
            // Очистка формы
            loginForm.reset();
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        if (!email || !password || !confirmPassword) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }
        
        // В реальном приложении здесь был бы запрос к серверу
        user.isLoggedIn = true;
        user.email = email;
        user.name = email.split('@')[0];
        checkLoginStatus();
        showSection('personal');
        
        // Очистка формы
        registerForm.reset();
    });
}

// Проверка статуса входа
function checkLoginStatus() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const personalNavLink = document.getElementById('personalNavLink');
    
    if (user.isLoggedIn) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        personalNavLink.style.display = 'block';
        
        // Обновление информации в личном кабинете
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
    } else {
        loginBtn.style.display = 'block';
        registerBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        personalNavLink.style.display = 'none';
    }
}