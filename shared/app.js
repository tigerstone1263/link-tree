(() => {
  const fallbackConfig = {
    title: "Get the app",
    description: "Find the right store for your device.",
    releaseDate: "",
    logoSrc: "",
    logoAlt: "App logo",
    appStore: {
      url: "",
      label: "App Store"
    },
    playStore: {
      url: "",
      label: "Play Store"
    }
  };

  const config = window.APP_CONFIG || {};
  const resolvedConfig = {
    title: config.title || fallbackConfig.title,
    description: config.description || fallbackConfig.description,
    releaseDate: config.releaseDate || fallbackConfig.releaseDate,
    logoSrc: config.logoSrc || fallbackConfig.logoSrc,
    logoAlt: config.logoAlt || fallbackConfig.logoAlt,
    appStore: {
      url: (config.appStore && config.appStore.url) || fallbackConfig.appStore.url,
      label: (config.appStore && config.appStore.label) || fallbackConfig.appStore.label
    },
    playStore: {
      url: (config.playStore && config.playStore.url) || fallbackConfig.playStore.url,
      label: (config.playStore && config.playStore.label) || fallbackConfig.playStore.label
    }
  };

  const statusEl = document.getElementById("status");
  const appStoreBtn = document.getElementById("appStoreBtn");
  const playStoreBtn = document.getElementById("playStoreBtn");
  const pageTitle = document.getElementById("pageTitle");
  const pageDescription = document.getElementById("pageDescription");
  const releaseDateEl = document.getElementById("releaseDate");
  const logoImg = document.getElementById("appLogo");

  if (pageTitle) pageTitle.textContent = resolvedConfig.title;
  if (pageDescription) pageDescription.textContent = resolvedConfig.description;
  if (releaseDateEl) {
    if (resolvedConfig.releaseDate) {
      releaseDateEl.textContent = `Release date: ${resolvedConfig.releaseDate}`;
      releaseDateEl.hidden = false;
    } else {
      releaseDateEl.textContent = "";
      releaseDateEl.hidden = true;
    }
  }
  if (resolvedConfig.title) document.title = resolvedConfig.title;

  if (logoImg && resolvedConfig.logoSrc) {
    logoImg.src = resolvedConfig.logoSrc;
    logoImg.alt = resolvedConfig.logoAlt;
  }

  const updateButton = (button, data) => {
    if (!button) return;
    if (data.url) button.href = data.url;
    const label = button.querySelector(".label");
    if (label && data.label) label.textContent = data.label;
    if (data.label) button.setAttribute("aria-label", `Open in ${data.label}`);
  };

  updateButton(appStoreBtn, resolvedConfig.appStore);
  updateButton(playStoreBtn, resolvedConfig.playStore);

  const markRecommended = (button) => {
    if (!button) return;
    button.classList.add("recommended");
    button.insertAdjacentHTML("beforeend", "<span aria-hidden='true'>→</span>");
  };

  const redirectTo = (url, label) => {
    if (!url) return;
    if (statusEl) statusEl.textContent = `Opening ${label}...`;
    setTimeout(() => {
      window.location.href = url;
    }, 1100);
  };

  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isIOS) {
    markRecommended(appStoreBtn);
    redirectTo(resolvedConfig.appStore.url, resolvedConfig.appStore.label);
  } else if (isAndroid) {
    markRecommended(playStoreBtn);
    redirectTo(resolvedConfig.playStore.url, resolvedConfig.playStore.label);
  } else if (statusEl) {
    statusEl.textContent = "";
  }
})();
