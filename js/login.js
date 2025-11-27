document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Credenciais padrão (você deve alterar)
            if(username === 'admin' && password === 'Admin.2025#') {
                localStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'admin-panel.html';
            } else {
                document.getElementById('message').textContent = 'Credenciais inválidas!';
            }
        });