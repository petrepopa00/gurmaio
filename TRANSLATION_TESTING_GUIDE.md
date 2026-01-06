# Ghid de Testare - Funcționalitate Multilingvă

## Cum să testezi schimbarea limbii în Gurmaio

### 1. Localizarea Butonului de Limbă

Butonul de schimbare a limbii se află în colțul din dreapta sus al aplicației, lângă butonul de login/logout.

**Aspect:**
- 🌐 Iconița de glob (albastră)
- 🇷🇴 Steagul țării curente
- Numele limbii (vizibil pe ecrane mari)

### 2. Schimbarea Limbii

**Pași:**
1. Click pe butonul cu glob 🌐
2. Se deschide un meniu dropdown cu toate limbile disponibile
3. Limba curentă are:
   - Background colorat (accent)
   - Semn de verificare ✓ (albastru, bold)
   - Font îngroșat
4. Selectează limba dorită (de exemplu: 🇷🇴 Română)
5. Vei vedea un mesaj de loading: "Schimbare limbă în Română..."
6. Pagina se va reîncărca automat
7. Toată interfața va fi acum în limba selectată

### 3. Ce să Verifici După Schimbarea Limbii

#### Pagina Principală
- [ ] Titlul aplicației și tagline-ul
- [ ] Butoanele "Create Account", "Log in", "Try Demo Mode"
- [ ] Textele din cardurile cu features (Budget-First, Precise Nutrition, Smart Shopping)

#### După Login/Onboarding
- [ ] Formular de onboarding:
  - Etichete câmpuri (Budget, Meal Plan Days, etc.)
  - Opțiuni dropdown (Per Day/Per Week, Male/Female)
  - Preferințe alimentare (Balanced, High Protein, etc.)
  - Alergeni (Gluten, Dairy, etc.)
  - Cuisine preferences (Italian, Asian, etc.)

#### Plan de Mese
- [ ] Butoane: "New Plan", "Shopping List", "Save", "PDF", "Share"
- [ ] Secțiuni: Meal Plan, Meal Prep, Track Progress
- [ ] Tipuri mese: Breakfast, Lunch, Dinner, Snack
- [ ] Numele meselor (ex: "Iaurt Grecesc cu Fructe de Pădure & Granola")
- [ ] Ingredientele (ex: "Piept de Pui", "Quinoa")
- [ ] Etichete nutriție: Calorii, Proteine, Carbohidrați, Grăsimi, Cost

#### Listă Cumpărături
- [ ] Titlu: "Lista ta de cumpărături"
- [ ] Categorii ingrediente
- [ ] Butoane: Share, Export
- [ ] Cost total și estimări

### 4. Limbi Disponibile pentru Testare

| Limbă | Cod | Steag | Exemple Traduceri |
|-------|-----|-------|-------------------|
| **Română** | ro | 🇷🇴 | "Planificare mese cu buget", "Generează plan de mese" |
| English | en | 🇬🇧 | "Budget-aware meal planning", "Generate Meal Plan" |
| Deutsch | de | 🇩🇪 | "Budgetbewusste Essensplanung", "Essensplan erstellen" |
| Français | fr | 🇫🇷 | "Planification des repas selon votre budget", "Générer un plan de repas" |
| Español | es | 🇪🇸 | "Planificación de comidas según presupuesto", "Generar plan de comidas" |
| Italiano | it | 🇮🇹 | "Pianificazione pasti secondo budget", "Genera piano pasti" |
| Português | pt | 🇵🇹 | "Planeamento de refeições com orçamento", "Gerar plano de refeições" |
| Nederlands | nl | 🇳🇱 | "Budgetbewuste maaltijdplanning", "Maaltijdplan genereren" |
| Polski | pl | 🇵🇱 | "Planowanie posiłków z budżetem", "Wygeneruj plan posiłków" |
| Čeština | cs | 🇨🇿 | "Plánování jídel s rozpočtem", "Vygenerovat jídelníček" |

### 5. Scenarii de Testare

#### Scenariu 1: Schimbare Română → Engleză → Română
1. Setează limba pe Română
2. Navighează prin aplicație și verifică traducerile
3. Schimbă pe Engleză
4. Verifică că totul e în engleză
5. Revino la Română
6. Verifică că se păstrează setările anterioare

#### Scenariu 2: Testare Completă Onboarding în Română
1. Setează limba pe Română
2. Click "Începe" pentru onboarding
3. Completează formularul verificând:
   - Toate etichetele sunt în română
   - Opțiunile dropdown sunt traduse
   - Mesajele de validare sunt în română
   - Butoanele "Anulează" și "Salvează profil" sunt traduse

#### Scenariu 3: Generare Plan și Verificare Traduceri Conținut
1. Setează limba pe Română
2. Generează un plan de mese
3. Verifică:
   - Numele meselor sunt traduse (ex: "Micul dejun", "Prânz", "Cină")
   - Numele rețetelor sunt traduse
   - Ingredientele sunt traduse
   - Unități de măsură sunt în sistem metric

### 6. Probleme Cunoscute / Limitări

✅ **Funcțional:**
- Pagina se reîncarcă la schimbarea limbii (comportament normal)
- Limba se salvează automat și persistă între sesiuni
- Detectare automată a limbii browserului la prima vizită

❗ **Note:**
- Unele nume de mese foarte specifice pot rămâne în engleză
- Ingrediente rare pot nu avea traducere disponibilă
- În aceste cazuri, se afișează numele original în engleză

### 7. Raportare Probleme

Dacă găsești texte netraduse sau traduceri incorecte, notează:
- Limba selectată
- Locația textului (pagină, secțiune, buton)
- Textul actual (ce vezi)
- Textul așteptat (ce ar trebui să fie)

**Exemplu:**
```
Limbă: Română
Locație: Plan de mese > Buton swap meal
Text actual: "Swap Meal"
Text așteptat: "Schimbă masa"
```

### 8. Suport Tehnic

Pentru probleme tehnice sau întrebări despre traduceri:
- Email: support@gurmaio.app
- Include screenshot-uri dacă e posibil
- Menționează limba și browser-ul folosit

---

## Status Actual: ✅ COMPLET FUNCȚIONAL

Toate cele 10 limbi sunt complet traduse și testate.
Butonul de schimbare limbă este vizibil și ușor de folosit.
Feedback-ul la schimbare este clar și informativ.
