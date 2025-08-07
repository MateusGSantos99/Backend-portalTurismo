async function login(email, password) {
    try {
      const response = await fetch('https://backend-portalturismo-5ao1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // se seu backend usa cookies/sessão
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert('Erro: ' + errorData.message);
        return;
      }
  
      const data = await response.json();
      alert(data.message); // login realizado com sucesso
      // faça algo, ex: salvar token, redirecionar...
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro no login, tente novamente.');
    }
  }
  