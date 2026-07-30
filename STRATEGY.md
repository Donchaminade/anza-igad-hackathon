# IGAD Hackathon 2026 — Plan gagnant

**Deadline critique : 31 juillet 2026 @ 17:00 EAT (~36 h restantes depuis le 30 juil.)**  
Devpost : https://igad-husika-hackathon.devpost.com/

---

## 1. Synthèse du challenge

| Élément | Détail |
|--------|--------|
| **Objectif** | Renforcer *early warning → early action* : générer, communiquer, faire comprendre et transformer l’info en action opportune pour les communautés IGAD |
| **Thème** | « Smarter Early Warning, Stronger Communities » |
| **Contraintes** | Originalité ; équipe ≤ 5 ; soumission Devpost ; prototype (lien web ou APK) + vidéo ≤ 5 min ; GitHub public ; overview ≤ 250 mots ; solution details ≤ 250 mots ; disclosure des outils/données |
| **Critères jury (Devpost, pondérés)** | **Technical Depth 30%** · **Innovation & AI Creativity 30%** · **Problem Value & Impact 25%** · **Presentation & Documentation 15%** |
| **Sélection** | Top 10 → atelier d’évaluation physique (GHACOF74 sponsorisé pour top 5) |
| **Prix** | 1er $4k → 5e $1k ; places 6–10 = atelier ; pool $10k+ |
| **Stack / ressources** | Open source libre ; datasets climat/environnement/humanitaire ; APIs géospatiales / remote sensing ; plateformes ICPAC à brancher ou s’inspirer : Hazard Watch, Drought Watch, HUSIKA, Thresholds & Triggers |
| **Fenêtre** | Build ~23 juin → **31 juil. 17:00 EAT** — **il reste ~1,5 jour** |

**Insight stratégique :** ICPAC a déjà des dashboards (Hazard/Drought Watch) et de la com (HUSIKA) + triggers. Les projets génériques « encore un dashboard climat » perdent. Le jury (profil ICPAC / early warning / GIS) valorise le **dernier kilomètre** : compréhension + action + inclusion, branché sur leurs systèmes.

**How Might We :** *Comment transformer un seuil/alerte ICPAC en une décision claire et exécutable pour un acteur de terrain (agriculteur, agent DRM local, ONG), dans les 24–48 h, même avec faible connectivité ?*

---

## 2. Angles gagnants (affinés)

### Concept A — **Trigger-to-Action** (recommandé)

**Pitch :** Quand un seuil ICPAC est franchi, l’app génère automatiquement une « fiche d’action anticipatoire » par persona et localité (quoi faire, quand, avec quelles ressources), en langage simple + canaux bas débit (SMS/USSD mock / WhatsApp).

| Critère | Pourquoi ça score |
|---------|-------------------|
| Innovation | Passe de *monitor* → *act* ; rare chez les clones de dashboard |
| Impact | Lien direct vies/moyens de subsistance ; anticipatory action |
| Technique | Intégration réelle Thresholds/Triggers + données open |
| UX | Personas, langue claire, parcours « alerte → 3 actions » |
| Scalabilité | Même moteur pour sécheresse, inondation, etc. ; multi-pays IGAD |

- **Risque :** APIs ICPAC limitées / scraping fragile → mitiger avec fixtures + docs d’intégration.
- **Effort (36 h) :** Moyen — faisable si scope serré (1 aléa, 1 région, 2 personas).

### Concept B — **Alert Explain** (GenAI + confiance)

**Pitch :** Un « traducteur d’alerte » qui explique *pourquoi* le trigger a sauté (indicateurs), le niveau de confiance, et ce que ça veut dire pour *moi* (ferme / district), sans jargon scientifique.

| Critère | Score |
|---------|-------|
| Innovation | GenAI utile, pas gadget |
| Impact | Réduit fausses alertes perçues / inaction |
| Technique | RAG sur produits ICPAC + seuils |
| UX | Conversation / cards explicatives |
| Scalabilité | Fort si branché HUSIKA |

- **Risque :** Hallucinations = disqualification d’intégrité perçue → citations obligatoires + « source ICPAC ».
- **Effort :** Moyen-élevé (qualité du grounding).

### Concept C — **Ground Truth Loop**

**Pitch :** Les communautés valident/invalident les alertes satellitaires (photos, USSD « oui/non/sécheresse ici ») pour calibrer les faux positifs et remonter un signal terrain aux décideurs.

| Critère | Score |
|---------|-------|
| Innovation | Boucle fermée rare |
| Impact | Améliore confiance système |
| Technique | Crowdsourcing + carte |
| UX | Mobile-first simple |
| Scalabilité | Dépend adoption |

- **Risque :** Sans utilisateurs réels, démo creuse ; moins « early action » immédiat.
- **Effort :** Moyen, mais wow plus faible en 36 h.

---

## 3. Recommandation claire

**Prioriser A+B fusionné : Trigger-to-Action + Alert Explain (IA grounded).**

En 36 h, ne pas choisir entre A et B : **A porte l’impact (25%) et l’UX**, **B porte le critère IA à 30%**. Sans IA visible et utile, vous laissez 30% sur la table face à 466 participants.

**Pourquoi :**
1. Aligne le brief (« information → timely action ») mieux qu’un dashboard.
2. Branche **Thresholds & Triggers** + HUSIKA → crédibilité jury ICPAC/GIS.
3. **IA crédible** : LLM qui *rédige* fiches d’action + explications à partir de JSON de seuils/indicateurs (citations obligatoires) — pas un faux modèle de forecast.
4. Technique 30% : architecture claire, fixtures, déploiement, README.
5. Présentation 15% : vidéo narrative *alerte → explain → 3 actions → SMS*.

**Not Doing (focus) :**
- Pas de nouveau modèle de prévision climatique
- Pas de multi-aléas / multi-pays complets
- Pas d’auth entreprise / backend complexe
- Pas de vrai envoi SMS payant (mock + architecture prête)
- Pas de redesign de Hazard Watch

**Hypothèses à assumer (pas le temps de valider) :**
- Un décideur local a besoin d’actions concrètes, pas de plus d’indicateurs
- Les seuils ICPAC (même mockés fidèlement) suffisent pour la démo
- Anglais + 1 langue locale (swahili ou autre) = signal inclusion

---

## 4. Plan d’exécution — sprint ~36 h

### Rôles suggérés (adapter à l’équipe 1–5)

| Rôle | Focus |
|------|--------|
| **Lead produit / pitch** | Problème, personas, textes Devpost 250+250, script vidéo |
| **Full-stack** | App web déployée (Vercel) : carte + fiche action + flux alerte |
| **Data / intégration** | Seuils, fixtures ICPAC, 1 dataset open, README sources |
| **Design / UX** | Parcours mobile, clarté, accessibilité bas débit |
| **Vidéo / Devpost** | Capture démo, montage ≤ 5 min, soumission |

Solo : ordre = prototype + IA explain → vidéo → textes Devpost → polish.

### Timeline (à partir de maintenant — ~36 h jusqu’au 31 juil. 17:00 EAT)

#### Phase 0 — Gel (H0–H1)
- [ ] Confirmer A+B + 1 aléa (sécheresse **recommandée**)
- [ ] 1 géographie IGAD + 2 personas (DRM district + agriculteur)
- [ ] Repo GitHub + README stub + **enregistrement Devpost** (éligibilité pays !)
- [ ] Stack gelée : **Next.js + TS + Leaflet + JSON fixtures + 1 appel LLM** (OpenAI/Groq/Gemini) pour explain + action cards
- [ ] Clé API en env Vercel (jamais dans Git)

#### Phase 1 — MVP vertical (H1–H10)
Slice : *Alerte déclenchée → explain sourcé → fiche action persona → texte SMS.*

- [ ] Modèle : Hazard, Threshold, TriggerEvent, ActionCard, Persona
- [ ] 3–5 événements démo (logique type Thresholds ICPAC)
- [ ] UI liste + détail + carte
- [ ] Route LLM : prompt avec **contexte JSON only** + obligation de citer indicateurs
- [ ] Fallback : fiches pré-générées si LLM down (critique démo)
- [ ] Déploiement URL publique
- [ ] **Checkpoint :** flux E2E sur téléphone

#### Phase 2 — Différenciation (H10–H20)
- [ ] Liens/citations Drought Watch + Thresholds + HUSIKA dans l’UI et README
- [ ] Toggle langue (EN + 1 locale) sur sorties LLM ou fiches
- [ ] Mode bas débit : bloc SMS/USSD généré (copier-coller)
- [ ] Diagramme d’architecture dans README (score Technical + Docs)
- [ ] **Checkpoint :** pitch 90 s sans oral hors vidéo

#### Phase 3 — Soumission (H20–H32)
- [ ] Polish UX minimal
- [ ] Vidéo ≤ 5 min (viser 3–4) : problème → IA explain → actions → impact → stack
- [ ] Devpost : Overview ≤250, Details ≤250, stack, GitHub, vidéo, disclosure IA/datasets
- [ ] Soumission **≥ 2 h avant** 17:00 EAT

#### Phase 4 — Buffer (H32–deadline)
- [ ] Re-test URL + fallback offline
- [ ] Fix blockers only
- [ ] Vérifier éligibilité / roster ≤ 5 / originalité

### MVP vs Wow

| MVP (obligatoire) | Wow (si temps) |
|-------------------|----------------|
| Alerte → **IA explain sourcé** → fiche action 2 personas | Multi-langue live |
| Fallback fiches sans LLM | Playbook PDF anticipatory action |
| Carte + 1 région + 1 aléa | Comparaison « avant/après » action |
| SMS/USSD texte généré | Branchement API live si dispo |
| URL + GitHub + vidéo + Devpost | Dashboard admin seuils |

### Checklist technique

- [ ] URL HTTPS live
- [ ] Repo public + LICENSE + attributions datasets/APIs
- [ ] README : architecture, comment lancer, sources ICPAC
- [ ] Aucun secret dans le repo
- [ ] Démo offline-capable via fixtures si API tombe
- [ ] Mobile responsive (jury teste souvent au téléphone)
- [ ] Vidéo hébergée (YouTube/Loom) + lien dans Devpost
- [ ] Mots counts respectés (250/250)

---

## 5. Risques & pièges à éviter absolument

| Piège | Source | Mitigation |
|-------|--------|------------|
| Soumission **en retard** | rules : late may not be considered | Soumettre H-2 h minimum |
| Dashboard clone de Hazard/Drought Watch | overview + plateformes existantes | Différencier sur **action**, pas monitoring |
| Travail non original / non attribué | integrity / IP | Cite open source + datasets ; pas de copier-coller opaque |
| Overclaim IA (« on prédit mieux qu’ICPAC ») | crédibilité jury ICPAC | Compléter ICPAC, ne pas le remplacer |
| Prototype qui ne tourne pas | requirement Prototype | Fixtures + URL testée |
| Vidéo > 5 min ou sans parcours clair | requirements | Script 3–4 min max |
| Secrets / IP tiers | rules | Disclosure + pas de clés |
| Scope ML entraîné / multi-pays | temps | 1 aléa, 1 zone, règles + données open |
| Ignorer HUSIKA / Triggers | ressources encouragées | Référencer et brancher conceptuellement |
| Équipe > 5 | eligibility | Vérifier roster |
| **Pas d’IA visible** | Devpost : IA Creativity **30%** | LLM grounded sur seuils + disclosure |
| Pays non éligible | Devpost « specific countries » | Vérifier eligibility dès maintenant |
| Hallucinations LLM | intégrité / jury technique | Citations obligatoires + fallback statique |

---

## 6. Prochaines actions immédiates (maintenant)

1. **S’inscrire / vérifier** le compte Devpost + membres d’équipe (≤ 5).
2. **Geler** : Concept A, aléa = sécheresse, zone = 1 pays IGAD, 2 personas.
3. **Créer le repo** GitHub + push skeleton Next.js + README attributions.
4. **Explorer 30 min** : Drought Watch + Thresholds & Triggers — noter 3 indicateurs/seuils réutilisables en fixture.
5. **Écrire 5 ActionCards** (papier/JSON) avant de coder l’UI.
6. **Déployer une page vide** sur Vercel pour sécuriser l’URL publique.
7. **Draft script vidéo** (problème 30 s → démo 2 min → impact 30 s).
8. **Répartir rôles** et bloquer le calendrier jusqu’à 17:00 EAT demain.
9. **Préparer textes Devpost** en parallèle du code (ne pas laisser pour la fin).
10. **Décider stack secondaire** : Leaflet vs MapLibre ; pas de nouvelle lib après H2.

---

## Questions bloquantes (à clarifier vite)

1. **Taille et compétences de l’équipe** (solo ? frontend/backend/data/design) ?
2. **Êtes-vous éligible** (Devpost : pays/territoires spécifiques + majorité légale) ?
3. **Langue(s)** cibles (EN / SW / FR / autres) ?
4. **Pays / bassin** pour la démo ?
5. **Proto existant** ou zéro ?
6. **Web vs APK** (web fortement recommandé) ?
7. **Clé LLM dispo** (OpenAI / Groq / Gemini) pour le critère IA 30% ?
8. **Accès API ICPAC** ou fixtures + open data seulement ?

---

## One-pager idée retenue

**Problem Statement :** HMW transformer un franchissement de seuil ICPAC en actions anticipatoires claires pour des acteurs de terrain à faible bande passante ?

**Recommended Direction :** Trigger-to-Action cards + canaux bas débit, 1 aléa, 2 personas, fixtures fidèles ICPAC, explain sourcé léger.

**MVP Scope :** Web app : liste d’alertes déclenchées → détail → fiche action persona → texte SMS mock → démo vidéo.

**Key Assumptions :**
- [ ] Les décideurs manquent d’actions, pas de données
- [ ] Fixtures + liens ICPAC suffisent pour convaincre
- [ ] Une démo narrative bat un modèle ML fragile

**Not Doing :** Nouveau forecast model ; multi-hazard complet ; SMS réel payant ; refonte des plateformes ICPAC.
