
function toggleMenu() {
    const menu = document.querySelector('.menu-items');
    menu.classList.toggle('show');
}

document.addEventListener('click', function(event) {
    const menu = document.querySelector('.menu-items');
    const toggle = document.querySelector('.nav-toggle');
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        menu.classList.remove('show');
    }
});

function toggleLanguage() {
    const trContent = document.getElementById('tr');
    const enContent = document.getElementById('en');

    if (trContent && enContent) {
        if (trContent.classList.contains('active')) {
            trContent.classList.remove('active');
            enContent.classList.add('active');
        } else {
            enContent.classList.remove('active');
            trContent.classList.add('active');
        }
    }
}

function toggleFullText(button) {
    const fullText = button.previousElementSibling;
    const isEnglish = button.textContent === 'Read More' || button.textContent === 'Show Less';

    if (fullText.classList.contains('hidden')) {
        fullText.classList.remove('hidden');
        button.textContent = isEnglish ? 'Show Less' : 'Daha Az Göster';
    } else {
        fullText.classList.add('hidden');
        button.textContent = isEnglish ? 'Read More' : 'Devamını Oku';
    }
}

function setLanguage(lang) {
  if (typeof translations !== "undefined" && translations[lang]) {
    localStorage.setItem("lang", lang); 
    for (const key in translations[lang]) {
      const el = document.getElementById(key);
      if (el) el.innerHTML = translations[lang][key];
    }
  }
}

function populateFromJSON() {
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      document.getElementById("site-owner-name").textContent = data.name;
      document.getElementById("home-name").textContent = data.name;
      document.getElementById("home-title").textContent = data.title;
      document.getElementById("motivation-text").textContent = data.motivation;
      document.getElementById("email-link").href = "mailto:" + data.contact.email;
      document.getElementById("footer-name").textContent = data.name;

      const socialLinks = document.getElementById("social-links");
      const footerLinks = document.getElementById("footer-social");

      // 🔁 Önceki ikonları temizle
      if (socialLinks) socialLinks.innerHTML = "";
      if (footerLinks) footerLinks.innerHTML = "";

      if (data.socials) {
        data.socials.forEach(social => {
          const a = document.createElement("a");
          a.href = social.url;
          a.title = social.name;
          a.target = "_blank";
          a.innerHTML = `<i class="${social.icon}"></i>`;
          if (socialLinks) socialLinks.appendChild(a.cloneNode(true));
          if (footerLinks) footerLinks.appendChild(a);
        });
      }

      const projectsContent = document.getElementById("projects-content");
      if (projectsContent && data.projects) {
        projectsContent.innerHTML = ""; // 📌 Önceki projeleri de temizle
        data.projects.forEach(project => {
          const div = document.createElement("div");
          div.className = "projects";
          div.innerHTML = `
            <i class="fas fa-project-diagram mb-3"></i>
            <h3 class="project-title">${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
              ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>`;
          projectsContent.appendChild(div);
        });
      }
    });
}


document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const savedLang = localStorage.getItem("lang") || "tr";
  setLanguage(savedLang);
  populateFromJSON();
});

window.populateFromJSON = populateFromJSON;