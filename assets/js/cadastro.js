(function () {
  'use strict';

  const sb = window.supabaseClient;
  const form = document.getElementById('cadastro-form');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const togglePasswordButton = document.getElementById('toggle-password');
  const eyeIcon = document.getElementById('eye-icon');
  const eyeOffIcon = document.getElementById('eye-off-icon');
  const cadastrarButton = document.getElementById('cadastrar');
  const googleButton = document.getElementById('cadastrar-google');
  const mensagem = document.getElementById('mensagem');

  function mostrarMensagem(texto, tipo) {
    if (!mensagem) return;
    mensagem.textContent = texto;
    mensagem.className = `auth-message ${tipo || ''}`.trim();
  }

  function setCarregando(ativo) {
    if (cadastrarButton) {
      cadastrarButton.disabled = ativo;
      cadastrarButton.textContent = ativo ? 'Criando conta...' : 'Criar conta gratuita';
    }
    if (googleButton) googleButton.disabled = ativo;
  }

  function isNetworkError(error) {
    const message = String(error?.message || error || '').toLowerCase();
    return (
      message.includes('failed to fetch') ||
      message.includes('fetch failed') ||
      message.includes('network') ||
      message.includes('load failed')
    );
  }

  async function cadastrar(event) {
    event.preventDefault();
    if (!sb || !sb.auth) {
      mostrarMensagem('Serviço de autenticação temporariamente indisponível.', 'error');
      return;
    }

    const email = emailInput?.value?.trim() || '';
    const password = senhaInput?.value || '';

    if (!email || !password) {
      mostrarMensagem('Preencha e-mail e senha.', 'error');
      return;
    }

    if (password.length < 8) {
      mostrarMensagem('A senha deve ter pelo menos 8 caracteres.', 'error');
      return;
    }

    setCarregando(true);
    mostrarMensagem('Criando sua conta gratuita...');

    try {
      const { data, error } = await sb.auth.signUp({ email, password });

      if (error) {
        if (error.message.toLowerCase().includes('rate limit')) {
          mostrarMensagem(
            'Limite de cadastros temporariamente atingido no servidor. Tente novamente em alguns minutos.',
            'error'
          );
        } else {
          mostrarMensagem(error.message, 'error');
        }
        setCarregando(false);
        return;
      }

      if (data?.session) {
        window.location.replace(window.traubeSitePath?.('/dashboard/') || '/dashboard/');
        return;
      }

      mostrarMensagem(
        'Conta criada com sucesso! Verifique seu e-mail caso a confirmação seja necessária.',
        'success'
      );
    } catch (err) {
      mostrarMensagem(
        isNetworkError(err)
          ? 'Não foi possível conectar ao servidor de autenticação.'
          : 'Não foi possível criar a conta.',
        'error'
      );
    } finally {
      setCarregando(false);
    }
  }

  async function cadastrarComGoogle() {
    if (!sb || !sb.auth) return;
    setCarregando(true);
    mostrarMensagem('Redirecionando para autenticação com Google...');

    try {
      const redirectTo = window.location.origin + (window.traubeSitePath?.('/dashboard/?google_auth=1') || '/dashboard/?google_auth=1');
      const { data, error } = await sb.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo,
          scopes: 'email profile https://www.googleapis.com/auth/calendar',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) {
        mostrarMensagem(error.message || 'Erro ao conectar com Google.', 'error');
        setCarregando(false);
        return;
      }

      if (data?.url) {
        window.location.assign(data.url);
      }
    } catch (err) {
      console.error('Google Auth Error:', err);
      mostrarMensagem('Não foi possível iniciar a autenticação com Google.', 'error');
      setCarregando(false);
    }
  }

  // Verifica se já está logado
  if (sb && sb.auth) {
    sb.auth.getSession().then(({ data }) => {
      if (data?.session) {
        window.location.replace(window.traubeSitePath?.('/dashboard/') || '/dashboard/');
      }
    }).catch(() => {});
  }

  if (form) form.addEventListener('submit', cadastrar);
  if (googleButton) googleButton.addEventListener('click', cadastrarComGoogle);

  if (togglePasswordButton && senhaInput) {
    togglePasswordButton.addEventListener('click', () => {
      const isPassword = senhaInput.type === 'password';
      senhaInput.type = isPassword ? 'text' : 'password';
      togglePasswordButton.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
      togglePasswordButton.setAttribute('aria-pressed', String(isPassword));
      if (eyeIcon && eyeOffIcon) {
        eyeIcon.style.display = isPassword ? 'none' : '';
        eyeOffIcon.style.display = isPassword ? '' : 'none';
      }
    });
  }
})();
