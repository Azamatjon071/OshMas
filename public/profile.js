// Check if user is logged in
document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    // Load user profile
    await loadUserProfile();
});

// Load user profile
async function loadUserProfile() {
    try {
        const response = await fetch('http://localhost:3000/api/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Profil ma\'lumotlarini yuklab bo\'lmadi');
        }

        const userData = await response.json();
        
        // Update profile information
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('userEmail').textContent = userData.email;
        document.getElementById('userDiabetesType').textContent = getDiabetesTypeText(userData.diabetesType);
        document.getElementById('userRegistrationDate').textContent = formatDate(userData.registeredAt);
        
        // Set form values
        document.getElementById('editName').value = userData.name;
        document.getElementById('editEmail').value = userData.email;

        // Update statistics
        updateStatistics(userData.stats);
    } catch (error) {
        console.error('Error loading profile:', error);
        alert('Profil ma\'lumotlarini yuklashda xatolik yuz berdi');
    }
}

// Handle profile form submission
document.getElementById('profileForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    try {
        const response = await fetch('http://localhost:3000/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name,
                email,
                currentPassword: currentPassword || undefined,
                newPassword: newPassword || undefined
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Profilni yangilashda xatolik yuz berdi');
        }

        alert(data.message);
        
        // Reload profile data
        await loadUserProfile();
        
        // Clear password fields
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    } catch (error) {
        console.error('Error updating profile:', error);
        alert(error.message || 'Profilni yangilashda xatolik yuz berdi');
    }
});

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

// Helper functions
function getDiabetesTypeText(type) {
    switch (type) {
        case '1':
            return '1-tur diabet';
        case '2':
            return '2-tur diabet';
        case 'prediabetic':
            return 'Prediabet';
        default:
            return 'Noma\'lum';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return `Ro'yxatdan o'tgan: ${date.toLocaleDateString('uz-UZ')}`;
}

function updateStatistics(stats) {
    document.getElementById('mealsCount').textContent = stats?.mealsCount || 0;
    document.getElementById('glucoseLevel').textContent = stats?.glucoseLevel || '0 mmol/L';
    document.getElementById('daysActive').textContent = stats?.daysActive || 0;
} 