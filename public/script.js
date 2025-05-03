// Local storage keys
const USERS_KEY = 'oshmas_users';
const CURRENT_USER_KEY = 'oshmas_current_user';

// Initialize local storage with default data if empty
if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
}

// Food database
const foodDatabase = {
    'palov': {
        name: 'Palov',
        image: 'images/foods/palov.png',
        recommended: {
            '1': false,
            '2': false,
            'prediabetic': false
        },
        description: 'O\'zbekistonning milliy taomis',
        details: 'Palov - guruch, go\'sht, sabzavotlar va ziravorlardan tayyorlanadigan an\'anaviy taom. Diabet bilan og\'riganlar uchun kam yog\'li go\'sht va ko\'proq sabzavotlar bilan tayyorlanishi tavsiya etiladi.',
        preparation: '1. Yog\'ni qizdirib, go\'shtni qovurish\n2. Sabzavotlarni qo\'shib, qovurish\n3. Guruchni tozalab, suv bilan yuvish\n4. Hammasini birga pishirish\n5. Ziravorlar bilan ziravorlash'
    },
    'somsa': {
        name: 'Somsa',
        image: 'images/foods/somsa.jpg',
        recommended: {
            '1': false,
            '2': false,
            'prediabetic': false
        },
        description: 'Xamirli taom',
        details: 'Somsa - xamir va qiyma go\'shtdan tayyorlanadigan taom. Diabet bilan og\'riganlar uchun kam yog\'li go\'sht va butun donli un ishlatish tavsiya etiladi.',
        preparation: '1. Xamirni yasash\n2. Qiymani tayyorlash\n3. Somsalarni shakllantirish\n4. Tandirda pishirish'
    },
    'manti': {
        name: 'Manti',
        image: 'images/foods/manti.jpg',
        recommended: {
            '1': false,
            '2': false,
            'prediabetic': false
        },
        description: 'Xamirli taom',
        details: 'Manti - xamir va qiyma go\'shtdan tayyorlanadigan taom. Diabet bilan og\'riganlar uchun kam yog\'li go\'sht va butun donli un ishlatish tavsiya etiladi.',
        preparation: '1. Xamirni yasash\n2. Qiymani tayyorlash\n3. Mantilarni shakllantirish\n4. Bug\'da pishirish'
    },
    'lagmon': {
        name: 'Lag\'mon',
        image: 'images/foods/lagmon.png',
        recommended: {
            '1': true,
            '2': true,
            'prediabetic': true
        },
        description: 'Uzun xamirli taom',
        details: 'Lag\'mon - uzun xamir, go\'sht va sabzavotlardan tayyorlanadigan taom. Diabet bilan og\'riganlar uchun kam yog\'li go\'sht, ko\'proq sabzavotlar va butun donli un ishlatish tavsiya etiladi.',
        preparation: '1. Xamirni yasash\n2. Sabzavotlarni to\'g\'ralash\n3. Go\'shtni qovurish\n4. Xamirni qaynatish\n5. Hammasini birga aralashtirish'
    },
    'shashlik': {
        name: 'Shashlik',
        image: 'images/foods/shashlik.png',
        recommended: {
            '1': true,
            '2': true,
            'prediabetic': true
        },
        description: 'Go\'shtli taom',
        details: 'Shashlik - go\'shtdan tayyorlanadigan taom. Diabet bilan og\'riganlar uchun kam yog\'li go\'sht ishlatish va ko\'proq sabzavotlar bilan iste\'mol qilish tavsiya etiladi.',
        preparation: '1. Go\'shtni marinadlash\n2. Go\'shtni shashlikga tizish\n3. Mangalda pishirish'
    },
    'chuchvara': {
        name: 'Chuchvara',
        recommended: {
            '1': false,
            '2': false,
            'prediabetic': false
        },
        description: 'Xamirli taom',
        details: 'Chuchvara - xamir va qiyma go\'shtdan tayyorlanadigan taom. Diabet bilan og\'riganlar uchun kam yog\'li go\'sht va butun donli un ishlatish tavsiya etiladi.',
        preparation: '1. Xamirni yasash\n2. Qiymani tayyorlash\n3. Chuchvaralarni shakllantirish\n4. Qaynoq suvda pishirish'
    },
    'osh': {
        name: 'Osh',
        recommended: {
            '1': true,
            '2': true,
            'prediabetic': true
        },
        description: 'Sho\'rva',
        details: 'Osh - go\'sht va sabzavotlardan tayyorlanadigan sho\'rva. Diabet bilan og\'riganlar uchun kam yog\'li go\'sht va ko\'proq sabzavotlar ishlatish tavsiya etiladi.',
        preparation: '1. Go\'shtni qaynatish\n2. Sabzavotlarni qo\'shish\n3. Ziravorlar bilan ziravorlash'
    },
    'mastava': {
        name: 'Mastava',
        recommended: {
            '1': true,
            '2': true,
            'prediabetic': true
        },
        description: 'Sho\'rva',
        details: 'Mastava - guruch, go\'sht va sabzavotlardan tayyorlanadigan sho\'rva. Diabet bilan og\'riganlar uchun kam yog\'li go\'sht va ko\'proq sabzavotlar ishlatish tavsiya etiladi.',
        preparation: '1. Go\'shtni qaynatish\n2. Guruchni qo\'shish\n3. Sabzavotlarni qo\'shish\n4. Ziravorlar bilan ziravorlash'
    },
    'dimlama': {
        name: 'Dimlama',
        recommended: {
            '1': true,
            '2': true,
            'prediabetic': true
        },
        description: 'Sabzavotli taom',
        details: 'Dimlama - sabzavotlardan tayyorlanadigan taom. Diabet bilan og\'riganlar uchun ideal taom, chunki unda ko\'p miqdorda sabzavotlar ishlatiladi.',
        preparation: '1. Sabzavotlarni to\'g\'ralash\n2. Go\'shtni qovurish\n3. Sabzavotlarni qo\'shish\n4. Dimlash'
    },
    'kabob': {
        name: 'Kabob',
        recommended: {
            '1': true,
            '2': true,
            'prediabetic': true
        },
        description: 'Go\'shtli taom',
        details: 'Kabob - go\'shtdan tayyorlanadigan taom. Diabet bilan og\'riganlar uchun kam yog\'li go\'sht ishlatish va ko\'proq sabzavotlar bilan iste\'mol qilish tavsiya etiladi.',
        preparation: '1. Go\'shtni marinadlash\n2. Go\'shtni shashlikga tizish\n3. Mangalda pishirish'
    },
    'norin': {
        name: 'Norin',
        recommended: {
            '1': true,
            '2': true,
            'prediabetic': true
        },
        description: 'Xamirli taom',
        details: 'Norin - uzun xamir va go\'shtdan tayyorlanadigan taom. Diabet bilan og\'riganlar uchun kam yog\'li go\'sht va butun donli un ishlatish tavsiya etiladi.',
        preparation: '1. Xamirni yasash\n2. Go\'shtni qaynatish\n3. Xamirni qaynatish\n4. Hammasini birga aralashtirish'
    },
    'qovurma': {
        name: 'Qovurma',
        recommended: {
            '1': false,
            '2': false,
            'prediabetic': false
        },
        description: 'Go\'shtli taom',
        details: 'Qovurma - go\'shtdan tayyorlanadigan taom. Diabet bilan og\'riganlar uchun kam yog\'li go\'sht ishlatish va ko\'proq sabzavotlar bilan iste\'mol qilish tavsiya etiladi.',
        preparation: '1. Go\'shtni to\'g\'ralash\n2. Yog\'ni qizdirish\n3. Go\'shtni qovurish\n4. Sabzavotlarni qo\'shish'
    },
    'sho\'rva': {
        name: 'Sho\'rva',
        recommended: {
            '1': true,
            '2': true,
            'prediabetic': true
        },
        description: 'Sho\'rva',
        details: 'Sho\'rva - go\'sht va sabzavotlardan tayyorlanadigan taom. Diabet bilan og\'riganlar uchun kam yog\'li go\'sht va ko\'proq sabzavotlar ishlatish tavsiya etiladi.',
        preparation: '1. Go\'shtni qaynatish\n2. Sabzavotlarni qo\'shish\n3. Ziravorlar bilan ziravorlash'
    }
};

// Helper functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        alert('Muvaffaqiyatli kirildi');
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();
        displayFoodRecommendations();
        updateNavigation();
    } else {
        alert('Email yoki parol noto\'g\'ri');
    }
});

// Handle registration form submission
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const diabetesType = document.getElementById('diabetesType').value;

    const users = getUsers();
    if (users.some(user => user.email === email)) {
        alert('Bu email allaqachon ro\'yxatdan o\'tgan');
        return;
    }

    const newUser = {
        id: generateId(),
        name,
        email,
        password,
        diabetesType,
        registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    alert('Muvaffaqiyatli ro\'yxatdan o\'tildi');
    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    registerModal.hide();
    displayFoodRecommendations();
    updateNavigation();
});

// Display food recommendations based on user's diabetes type
function displayFoodRecommendations() {
    const user = getCurrentUser();
    if (!user) return;

    const diabetesType = user.diabetesType;
    const foodContainer = document.getElementById('foodContainer');
    foodContainer.innerHTML = '';

    const recommendedFoods = [];
    const notRecommendedFoods = [];

    // Categorize foods
    for (const [id, food] of Object.entries(foodDatabase)) {
        if (food.recommended[diabetesType]) {
            recommendedFoods.push({ id, ...food });
        } else {
            notRecommendedFoods.push({ id, ...food });
        }
    }

    // Display recommended foods
    if (recommendedFoods.length > 0) {
        const recommendedSection = document.createElement('div');
        recommendedSection.className = 'col-12 mb-4';
        recommendedSection.innerHTML = '<h3 class="text-success mb-3">Tavsiya etiladigan taomlar</h3>';
        foodContainer.appendChild(recommendedSection);

        const recommendedRow = document.createElement('div');
        recommendedRow.className = 'row';
        recommendedSection.appendChild(recommendedRow);

        recommendedFoods.forEach(food => {
            recommendedRow.appendChild(createFoodCard(food));
        });
    }

    // Display not recommended foods
    if (notRecommendedFoods.length > 0) {
        const notRecommendedSection = document.createElement('div');
        notRecommendedSection.className = 'col-12 mb-4';
        notRecommendedSection.innerHTML = '<h3 class="text-danger mb-3">Tavsiya etilmaydigan taomlar</h3>';
        foodContainer.appendChild(notRecommendedSection);

        const notRecommendedRow = document.createElement('div');
        notRecommendedRow.className = 'row';
        notRecommendedSection.appendChild(notRecommendedRow);

        notRecommendedFoods.forEach(food => {
            notRecommendedRow.appendChild(createFoodCard(food));
        });
    }
}

// Create food card
function createFoodCard(food) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';

    const card = document.createElement('div');
    card.className = 'food-card';

    card.innerHTML = `
        <div class="card">
            <img src="${food.image}" class="card-img-top" alt="${food.name}" onerror="this.src='images/foods/default.png'">
            <div class="card-body">
                <h5 class="card-title">${food.name}</h5>
                <p class="card-text">${food.description}</p>
                <button class="btn btn-primary" onclick="showFoodDetails('${food.id}')">
                    Batafsil
                </button>
            </div>
        </div>
    `;

    col.appendChild(card);
    return col;
}

// Show food details
function showFoodDetails(foodId) {
    const food = foodDatabase[foodId];
    if (!food) return;

    const modal = new bootstrap.Modal(document.getElementById('foodDetailsModal'));
    const modalBody = document.getElementById('foodDetailsBody');

    modalBody.innerHTML = `
        <div class="text-center mb-4">
            <img src="${food.image}" class="img-fluid rounded" alt="${food.name}" onerror="this.src='images/foods/default.png'" style="max-height: 300px;">
        </div>
        <h4>${food.name}</h4>
        <p><strong>Tavsiya:</strong> ${food.recommended[getCurrentUser()?.diabetesType] ? 'Tavsiya etiladi' : 'Tavsiya etilmaydi'}</p>
        <p><strong>Tavsif:</strong> ${food.details}</p>
        <h5>Tayyorlash usuli:</h5>
        <p>${food.preparation}</p>
    `;

    modal.show();
}

// Update navigation based on authentication status
function updateNavigation() {
    const user = getCurrentUser();
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');

    if (user) {
        loginBtn.style.display = 'none';
        userMenu.style.display = 'block';
        document.getElementById('userName').textContent = user.name;
    } else {
        loginBtn.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

// Handle logout
function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    updateNavigation();
    window.location.reload();
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for buttons
    document.getElementById('loginBtn')?.addEventListener('click', function() {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    });

    document.getElementById('registerBtn')?.addEventListener('click', function() {
        const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
        registerModal.show();
    });

    document.getElementById('showRegisterBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
        loginModal.hide();
        registerModal.show();
    });

    document.getElementById('showLoginBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        registerModal.hide();
        loginModal.show();
    });

    // Initialize page state
    updateNavigation();
    const user = getCurrentUser();
    if (user) {
        displayFoodRecommendations();
    }
}); 