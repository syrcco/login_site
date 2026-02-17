(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initLoginForm();
    initForgotForm();
    initPasswordToggle();
    initSSOButton();
  });

  /* ── Login form ── */
  function initLoginForm() {
    var form = document.getElementById('login-form');
    if (!form) return;

    var attempts = 0;
    var locked = false;
    var btn = form.querySelector('button[type="submit"]');
    var alert = document.getElementById('login-alert');
    var label = btn.textContent;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (locked) return;

      var email = form.querySelector('[name="email"]').value.trim();
      var pass = form.querySelector('[name="password"]').value;

      if (!email) return showAlert(alert, 'Please enter your email address.', 'error');
      if (!pass) return showAlert(alert, 'Please enter your password.', 'error');

      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span>Signing in\u2026';

      setTimeout(function () {
        btn.disabled = false;
        btn.textContent = label;
        attempts++;

        if (attempts >= 3) {
          locked = true;
          btn.disabled = true;
          showAlert(alert, 'Too many failed attempts. Please try again in 5 minutes.', 'error');
          setTimeout(function () {
            locked = false;
            attempts = 0;
            btn.disabled = false;
            hideAlert(alert);
          }, 300000);
          return;
        }

        showAlert(alert, 'Invalid email or password. Please try again.', 'error');
      }, 1200 + Math.random() * 800);
    });
  }

  /* ── Forgot-password form ── */
  function initForgotForm() {
    var form = document.getElementById('forgot-form');
    if (!form) return;

    var btn = form.querySelector('button[type="submit"]');
    var alert = document.getElementById('forgot-alert');
    var label = btn.textContent;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('[name="email"]').value.trim();
      if (!email) return showAlert(alert, 'Please enter your email address.', 'error');

      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span>Sending\u2026';

      setTimeout(function () {
        btn.disabled = false;
        btn.textContent = label;
        form.querySelector('[name="email"]').value = '';
        showAlert(alert,
          'If an account exists for ' + esc(email) + ', we\u2019ve sent password reset instructions to that address.',
          'success');
      }, 1500 + Math.random() * 1000);
    });
  }

  /* ── Password visibility toggle ── */
  function initPasswordToggle() {
    var btn = document.querySelector('.password-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var input = btn.parentElement.querySelector('input');
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.textContent = show ? 'Hide' : 'Show';
    });
  }

  /* ── SSO button ── */
  function initSSOButton() {
    var btn = document.getElementById('sso-btn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      showAlert(
        document.getElementById('login-alert'),
        'Single Sign-On is configured by your organization administrator. Contact your IT admin for your SSO endpoint URL.',
        'error'
      );
    });
  }

  /* ── Helpers ── */
  function showAlert(el, msg, type) {
    if (!el) return;
    el.className = 'alert alert-' + type + ' show';
    el.textContent = msg;
  }

  function hideAlert(el) {
    if (!el) return;
    el.className = 'alert';
    el.textContent = '';
  }

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }
})();
