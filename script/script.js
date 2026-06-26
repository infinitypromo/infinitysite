(function () {
  'use strict';

  // ===== BACKGROUND: ESTRELAS E PARTÍCULAS =====
  function createStars(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    for (let i = 0; i < 100; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() * 2 + 0.5;
      s.style.cssText = [
        'width:' + size + 'px; height:' + size + 'px;',
        'left:' + (Math.random() * 100) + '%; top:' + (Math.random() * 100) + '%;',
        '--d:' + (1.5 + Math.random() * 3) + 's;',
        '--op:' + (0.3 + Math.random() * 0.7) + ';',
        'animation-delay:' + (Math.random() * 3) + 's;'
      ].join('');
      el.appendChild(s);
    }
  }

  function createParticles(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const fx = (Math.random() - 0.5) * 60;
      p.style.cssText = [
        'left:' + (10 + Math.random() * 80) + '%; bottom:0;',
        '--fd:' + (4 + Math.random() * 5) + 's;',
        '--fx:' + fx + 'px; --fx2:' + (fx + (Math.random() - 0.5) * 40) + 'px;',
        'animation-delay:' + (Math.random() * 5) + 's;'
      ].join('');
      el.appendChild(p);
    }
  }

  // Inicializa backgrounds
  createStars('bgStars');
  createParticles('bgParticles');

  // ===== NAVBAR TOGGLE (mobile) =====
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  // ===== VALIDAÇÃO DO FORMULÁRIO DE LOGIN =====
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    var emailInput = document.getElementById('email');
    var senhaInput = document.getElementById('senha');
    var emailError = document.getElementById('emailError');
    var senhaError = document.getElementById('senhaError');
    var toggleBtn = document.getElementById('toggleSenha');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setError(el, msg) {
      if (el) el.textContent = msg;
    }

    function clearErrors() {
      if (emailInput) emailInput.classList.remove('error');
      if (senhaInput) senhaInput.classList.remove('error');
      setError(emailError, '');
      setError(senhaError, '');
    }

    // Toggle senha visibility
    if (toggleBtn && senhaInput) {
      toggleBtn.addEventListener('click', function () {
        var type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
        senhaInput.setAttribute('type', type);
        var eyeOpen = toggleBtn.querySelector('.eye-open');
        var eyeClosed = toggleBtn.querySelector('.eye-closed');
        if (type === 'text') {
          eyeOpen.style.display = 'none';
          eyeClosed.style.display = 'block';
        } else {
          eyeOpen.style.display = 'block';
          eyeClosed.style.display = 'none';
        }
      });
    }

    // Real-time validation on blur
    if (emailInput) {
      emailInput.addEventListener('blur', function () {
        if (this.value && !validateEmail(this.value)) {
          this.classList.add('error');
          setError(emailError, 'E-mail inválido');
        } else {
          this.classList.remove('error');
          setError(emailError, '');
        }
      });
      emailInput.addEventListener('input', function () {
        this.classList.remove('error');
        setError(emailError, '');
      });
    }

    if (senhaInput) {
      senhaInput.addEventListener('blur', function () {
        if (this.value && this.value.length < 4) {
          this.classList.add('error');
          setError(senhaError, 'Mínimo de 4 caracteres');
        } else {
          this.classList.remove('error');
          setError(senhaError, '');
        }
      });
      senhaInput.addEventListener('input', function () {
        this.classList.remove('error');
        setError(senhaError, '');
      });
    }

    // Submit validation
    loginForm.addEventListener('submit', function (e) {
      clearErrors();
      var valid = true;

      if (!emailInput.value || !validateEmail(emailInput.value)) {
        emailInput.classList.add('error');
        setError(emailError, 'Informe um e-mail válido');
        valid = false;
      }

      if (!senhaInput.value || senhaInput.value.length < 4) {
        senhaInput.classList.add('error');
        setError(senhaError, 'Senha deve ter no mínimo 4 caracteres');
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
      }
    });
  }

  // ===== WINDOW DRAG =====
  var dragWindow = document.getElementById('loginWindow');
  var dragTitleBar = document.getElementById('windowTitleBar');
  if (dragWindow && dragTitleBar) {
    var isDragging = false;
    var dragOffsetX = 0;
    var dragOffsetY = 0;

    dragTitleBar.addEventListener('mousedown', function (e) {
      if (e.target.closest('.window-btn')) return;
      isDragging = true;
      var rect = dragWindow.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;
      dragWindow.classList.add('dragging');
      dragWindow.style.position = 'fixed';
      dragWindow.style.left = rect.left + 'px';
      dragWindow.style.top = rect.top + 'px';
      dragWindow.style.margin = '0';
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      dragWindow.style.left = (e.clientX - dragOffsetX) + 'px';
      dragWindow.style.top = (e.clientY - dragOffsetY) + 'px';
    });

    document.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false;
        dragWindow.classList.remove('dragging');
      }
    });
  }

  // ===== DRAGON CURSOR FOLLOWER =====
  var isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (!isMobile && document.getElementById('bgStars') !== null) {
    var container = document.createElement('div');
    container.className = 'dragon-container';
    document.body.appendChild(container);

    var HEAD_SIZE = 44;

    var headSVG = '<svg viewBox="0 0 80 90" width="' + HEAD_SIZE + '" height="' + (HEAD_SIZE * 2) + '" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M40 10 C22 10 14 24 14 38 C14 52 22 66 40 72 C58 66 66 52 66 38 C66 24 58 10 40 10Z" ' +
      'fill="rgba(51,255,51,0.15)" stroke="rgba(51,255,51,0.5)" stroke-width="0.8"/>' +
      '<path d="M40 10 L36 2 L40 6 L44 2Z" fill="rgba(51,255,51,0.2)" stroke="rgba(51,255,51,0.4)" stroke-width="0.5"/>' +
      '<path d="M22 20 L6 4 L16 18Z" fill="rgba(51,255,51,0.2)" stroke="rgba(51,255,51,0.4)" stroke-width="0.6"/>' +
      '<path d="M58 20 L74 4 L64 18Z" fill="rgba(51,255,51,0.2)" stroke="rgba(51,255,51,0.4)" stroke-width="0.6"/>' +
      '<circle cx="28" cy="36" r="6.5" fill="rgba(10,10,10,0.85)" stroke="rgba(51,255,51,0.35)" stroke-width="0.7"/>' +
      '<circle cx="52" cy="36" r="6.5" fill="rgba(10,10,10,0.85)" stroke="rgba(51,255,51,0.35)" stroke-width="0.7"/>' +
      '<circle cx="36" cy="54" r="1.5" fill="rgba(10,10,10,0.5)"/>' +
      '<circle cx="44" cy="54" r="1.5" fill="rgba(10,10,10,0.5)"/>' +
      '<path d="M40 14 L38 26 M40 14 L42 26" fill="none" stroke="rgba(51,255,51,0.2)" stroke-width="0.4"/>' +
      '<path d="M28 18 Q40 14 52 18" fill="none" stroke="rgba(51,255,51,0.15)" stroke-width="0.4"/>' +
      '</svg>';

    var wingSVG = '<svg viewBox="0 0 60 50" width="48" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M5 40 L15 20 L25 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
      '<path d="M15 20 L35 4" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.6"/>' +
      '<path d="M15 20 L40 12" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>' +
      '<path d="M15 20 L42 22" stroke="currentColor" stroke-width="0.6" stroke-linecap="round" opacity="0.4"/>' +
      '<path d="M25 8 L35 4 L40 12 L42 22" stroke="currentColor" stroke-width="0.5" fill="currentColor" fill-opacity="0.03"/>' +
      '<circle cx="15" cy="20" r="2" fill="currentColor" opacity="0.6"/>' +
      '<circle cx="25" cy="8" r="1.5" fill="currentColor" opacity="0.5"/>' +
      '</svg>';

    var wingSVGRight = '<svg viewBox="0 0 60 50" width="48" height="40" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform:scaleX(-1)">' +
      '<path d="M5 40 L15 20 L25 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
      '<path d="M15 20 L35 4" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.6"/>' +
      '<path d="M15 20 L40 12" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>' +
      '<path d="M15 20 L42 22" stroke="currentColor" stroke-width="0.6" stroke-linecap="round" opacity="0.4"/>' +
      '<path d="M25 8 L35 4 L40 12 L42 22" stroke="currentColor" stroke-width="0.5" fill="currentColor" fill-opacity="0.03"/>' +
      '<circle cx="15" cy="20" r="2" fill="currentColor" opacity="0.6"/>' +
      '<circle cx="25" cy="8" r="1.5" fill="currentColor" opacity="0.5"/>' +
      '</svg>';

    var segmentCount = 22;
    var segments = [];
    var segSizes = [];
    var connectors = [];

    for (var i = 0; i < segmentCount; i++) {
      var el = document.createElement('div');
      el.className = 'dragon-segment';

      if (i === 0) {
        var wingLeft = document.createElement('div');
        wingLeft.className = 'dragon-wing dragon-wing--left';
        wingLeft.innerHTML = wingSVG;

        var wingRight = document.createElement('div');
        wingRight.className = 'dragon-wing dragon-wing--right';
        wingRight.innerHTML = wingSVGRight;

        el.innerHTML = headSVG +
          '<div class="dragon-eye" style="top:33px;left:24px;"></div>' +
          '<div class="dragon-eye" style="top:33px;left:49px;"></div>' +
          '<div class="dragon-glow"></div>';
        el.appendChild(wingLeft);
        el.appendChild(wingRight);
        el.style.width = HEAD_SIZE + 'px';
        el.style.height = (HEAD_SIZE * 2) + 'px';
        segSizes.push(HEAD_SIZE);
      } else {
        var size;
        if (i < 7) {
          size = 24 - i * 1.8;
        } else if (i < 14) {
          size = Math.max(8, 11.4 - (i - 7) * 0.6);
        } else {
          size = Math.max(3, 7.2 - (i - 14) * 0.5);
        }
        segSizes.push(size);
        var bone = document.createElement('div');
        bone.className = 'dragon-bone' + (i > 13 ? ' tail' : '');
        bone.style.width = size + 'px';
        bone.style.height = size + 'px';
        el.appendChild(bone);
      }

      container.appendChild(el);
      segments.push({ x: window.innerWidth / 2, y: window.innerHeight / 2, el: el });

      if (i > 0) {
        var conn = document.createElement('div');
        conn.className = 'dragon-bone-connector';
        container.appendChild(conn);
        connectors.push(conn);
      }
    }

    // ===== RASTREAMENTO DE ACELERAÇÃO =====
    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;
    var prevMouseX = mouseX;
    var prevMouseY = mouseY;
    var mouseAccel = 0;
    var dragonVisible = false;
    var time = 0;

    // ===== DETECÇÃO DE HOVER EM BOTÕES =====
    var hoverColor = null;
    var defaultBoneColor = 'rgba(200,220,230,0.9)';
    var defaultBoneStroke = 'rgba(140,160,170,0.5)';
    var defaultEyeColor = '#00D4FF';

    // Cores possíveis ao hover
    var hoverColors = {
      btn:     { bone: 'rgba(51,255,51,0.8)',    stroke: 'rgba(51,255,51,0.5)',   eye: '#33ff33', glow: 'rgba(51,255,51,0.06)' },
      discord: { bone: 'rgba(88,101,242,0.8)',    stroke: 'rgba(88,101,242,0.5)',  eye: '#5865F2', glow: 'rgba(88,101,242,0.06)' },
      danger:  { bone: 'rgba(255,59,111,0.8)',    stroke: 'rgba(255,59,111,0.5)',  eye: '#FF3B6F', glow: 'rgba(255,59,111,0.06)' },
      link:    { bone: 'rgba(51,255,51,0.8)',     stroke: 'rgba(51,255,51,0.4)',   eye: '#33ff33', glow: 'rgba(51,255,51,0.06)' }
    };

    function detectHoverColor(target) {
      while (target && target !== document.body) {
        if (target.classList.contains('discord-btn') || (target.tagName === 'A' && target.classList.contains('discord-btn'))) return 'discord';
        if (target.classList.contains('btn-primary')) return 'btn';
        if (target.classList.contains('btn-ghost')) return 'btn';
        if (target.classList.contains('btn')) return 'btn';
        if (target.tagName === 'A') return 'link';
        if (target.tagName === 'BUTTON') return 'btn';
        if (target.tagName === 'INPUT') return 'btn';
        target = target.parentElement;
      }
      return null;
    }

    document.addEventListener('mouseover', function (e) {
      hoverColor = detectHoverColor(e.target);
    });
    document.addEventListener('mouseout', function (e) {
      if (hoverColor) {
        var related = detectHoverColor(e.relatedTarget);
        if (!related) hoverColor = null;
      }
    });

    // ===== DETECÇÃO DE SELEÇÃO DE TEXTO =====
    var isFlickering = false;

    document.addEventListener('selectionchange', function () {
      var sel = window.getSelection();
      if (sel && sel.toString().toUpperCase().indexOf('INFINITY') !== -1) {
        isFlickering = true;
      } else {
        setTimeout(function () { isFlickering = false; }, 600);
      }
    });

    // ===== EVENTOS =====
    document.addEventListener('mousemove', function (e) {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      var ddx = mouseX - prevMouseX;
      var ddy = mouseY - prevMouseY;
      mouseAccel = Math.sqrt(ddx * ddx + ddy * ddy);

      if (!dragonVisible) {
        dragonVisible = true;
        container.style.opacity = '1';
      }
    });

    document.addEventListener('mouseleave', function () {
      dragonVisible = false;
      container.style.opacity = '0';
    });

    container.style.opacity = '0';
    container.style.transition = 'opacity 0.6s';

    function applyDragonColor(colorSet) {
      var eyes = container.querySelectorAll('.dragon-eye');
      var bones = container.querySelectorAll('.dragon-bone');
      var glow = container.querySelector('.dragon-glow');
      var wings = container.querySelectorAll('.dragon-wing');

      eyes.forEach(function (e) {
        e.style.background = colorSet.eye;
        e.style.boxShadow = '0 0 10px ' + colorSet.eye + ', 0 0 20px ' + colorSet.eye;
      });
      bones.forEach(function (b) {
        b.style.background = 'radial-gradient(circle, ' + colorSet.bone + ' 0%, ' + colorSet.stroke + ' 100%)';
      });
      if (glow) {
        glow.style.background = 'radial-gradient(circle, ' + colorSet.glow + ' 0%, transparent 65%)';
      }
      wings.forEach(function (w) {
        w.style.color = colorSet.stroke;
      });
    }

    function resetDragonColor() {
      var eyes = container.querySelectorAll('.dragon-eye');
      var bones = container.querySelectorAll('.dragon-bone');
      var glow = container.querySelector('.dragon-glow');
      var wings = container.querySelectorAll('.dragon-wing');

      eyes.forEach(function (e) {
        e.style.background = '';
        e.style.boxShadow = '';
      });
      bones.forEach(function (b) {
        b.style.background = '';
      });
      if (glow) {
        glow.style.background = '';
      }
      wings.forEach(function (w) {
        w.style.color = '';
      });
    }

    function animateDragon() {
      time += 0.02;

      // Aceleração do mouse → velocidade do dragão
      var accelNorm = Math.min(mouseAccel / 40, 1);
      var dynamicSpeed = 0.04 + accelNorm * 0.18;
      var dynamicSegSpeed = 0.12 + accelNorm * 0.2;
      mouseAccel *= 0.92;

      // Aplicar cor baseado no hover
      if (hoverColor && hoverColors[hoverColor]) {
        applyDragonColor(hoverColors[hoverColor]);
      } else {
        resetDragonColor();
      }

      // Efeito de flicker ao selecionar "INFINITY"
      var flickerOpacity = 1;
      if (isFlickering) {
        flickerOpacity = Math.random() > 0.15 ? 1 : 0.2;
      }
      container.style.opacity = flickerOpacity.toString();
      if (dragonVisible && !isFlickering) {
        container.style.opacity = '1';
      }

      var head = segments[0];
      var wave = Math.sin(time * 2) * 0.3;
      head.x += (mouseX - head.x) * dynamicSpeed + wave;
      head.y += (mouseY - head.y) * dynamicSpeed;

      var hx = head.x - segSizes[0] / 2;
      var hy = head.y - segSizes[0] * 1.2;

      var dx = mouseX - head.x;
      var dy = mouseY - head.y;
      var angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

      head.el.style.transform = 'translate(' + hx + 'px,' + hy + 'px) rotate(' + angle + 'deg)';

      for (var i = 1; i < segments.length; i++) {
        var prev = segments[i - 1];
        var seg = segments[i];
        var sz = segSizes[i];

        var segWave = Math.sin(time * 3 + i * 0.5) * (0.5 + i * 0.15);
        seg.x += (prev.x - seg.x) * dynamicSegSpeed + segWave * 0.1;
        seg.y += (prev.y - seg.y) * dynamicSegSpeed;

        var sx = seg.x - sz / 2;
        var sy = seg.y - sz / 2;

        var sdx = prev.x - seg.x;
        var sdy = prev.y - seg.y;
        var sAngle = Math.atan2(sdy, sdx) * (180 / Math.PI) + 90;

        seg.el.style.transform = 'translate(' + sx + 'px,' + sy + 'px) rotate(' + sAngle + 'deg)';

        if (i > 13) {
          seg.el.style.opacity = Math.max(0.15, 1 - ((i - 13) / 9));
        }

        if (connectors[i - 1]) {
          var connEl = connectors[i - 1];
          var cdx = seg.x - prev.x;
          var cdy = seg.y - prev.y;
          var cLen = Math.sqrt(cdx * cdx + cdy * cdy);
          var cAngle = Math.atan2(cdy, cdx) * (180 / Math.PI);
          var cThickness = Math.max(1, sz * 0.15);
          connEl.style.cssText = 'width:' + cLen + 'px;height:' + cThickness + 'px;' +
            'left:' + prev.x + 'px;top:' + (prev.y - cThickness / 2) + 'px;' +
            'transform:rotate(' + cAngle + 'deg);' +
            'opacity:' + (i > 13 ? Math.max(0.15, 1 - ((i - 13) / 9)) : 0.6) + ';';
        }
      }

      requestAnimationFrame(animateDragon);
    }

    animateDragon();
  }
})();
