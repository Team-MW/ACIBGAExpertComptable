# Hachetag - Clone du Site Web

Ce projet est un clone du site web de l'agence de communication Hachetag (https://www.hachetag.co).

## 🚀 Fonctionnalités

- **Design moderne et responsive** : Adapté à tous les écrans (desktop, tablette, mobile)
- **Animations fluides** : Effets de scroll, transitions, et animations au survol
- **Navigation interactive** : Menu hamburger pour mobile, navigation fluide
- **Sections complètes** :
  - Hero section avec animation
  - Section problèmes/solutions
  - Services (Stratégie, Digital, Design, SEO)
  - Portfolio avec effets hover
  - Méthodologie
  - Formulaire de contact
  - Footer complet
- **Effets visuels** :
  - Parallax sur la section hero
  - Animations au scroll (AOS)
  - Curseur personnalisé
  - Bouton scroll to top
  - Bannière de cookies

## 📁 Structure du Projet

```
microdidact/
├── index.html      # Structure HTML principale
├── styles.css      # Tous les styles et animations CSS
├── script.js       # JavaScript pour les interactions
└── README.md       # Documentation du projet
```

## 🛠️ Installation et Utilisation

1. **Ouvrir le site** :
   - Ouvrez simplement le fichier `index.html` dans votre navigateur
   - Ou utilisez un serveur local :
     ```bash
     # Avec Python
     python -m http.server 8000
     
     # Avec Node.js (http-server)
     npx http-server
     
     # Avec PHP
     php -S localhost:8000
     ```

2. **Accéder au site** :
   - Ouvrez votre navigateur et allez à `http://localhost:8000`

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans `styles.css` via les variables CSS :
```css
:root {
    --primary-color: #000000;
    --secondary-color: #ffffff;
    --accent-color: #ff6b6b;
    --text-color: #333333;
    --light-gray: #f5f5f5;
    --dark-gray: #666666;
}
```

### Animations
Les animations sont gérées via :
- CSS transitions et keyframes
- JavaScript pour les animations au scroll
- Intersection Observer API pour détecter les éléments visibles

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints à :
- **Desktop** : > 768px
- **Tablette** : 768px - 480px
- **Mobile** : < 480px

## 🌟 Fonctionnalités JavaScript

- Navigation scroll effect
- Menu mobile toggle
- Smooth scroll pour les liens d'ancrage
- Animations au scroll (AOS)
- Effets hover sur les éléments du portfolio
- Gestion des cookies
- Parallax effect
- Curseur personnalisé
- Bouton scroll to top
- Formulaire de contact avec validation

## 📝 Notes

- Les images du portfolio utilisent des gradients CSS pour l'instant. Vous pouvez les remplacer par de vraies images.
- Le formulaire de contact affiche une alerte pour l'instant. Vous devrez intégrer un backend pour le traitement réel.
- Les animations sont optimisées pour de bonnes performances.

## 🔧 Technologies Utilisées

- HTML5
- CSS3 (avec variables CSS, Grid, Flexbox)
- JavaScript (Vanilla JS, pas de dépendances)
- Google Fonts (Inter)

## 📄 Licence

Ce projet est un clone éducatif du site Hachetag.

---

**Développé avec ❤️**

