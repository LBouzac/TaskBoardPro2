# 🧪 Rapport d'Apprentissage — Séquence 4 : Tests Unitaires

### 📚 Ce que j'ai retenu de cette séquence

#### 1. Pourquoi tester mon code ?
Le test unitaire n'est pas une simple vérification, c'est une **assurance pour la sécurité et la fiabilité** de mon code.
- **L'intérêt :** Pouvoir modifier une fonction complexe (un service de calcul ou de tri) et savoir en une seconde si j'ai cassé quelque chose ailleurs.
- **Le risque :** Sans tests, on accumule une "dette technique". On finit par avoir peur de toucher à son propre code de peur que tout s'effondre.
- **Mon expérience :** Lors du projet TaskBoard, j'ai réalisé qu'un test sur la suppression d'une tâche échouait parce que je ne comparais pas les bons types d'ID (string vs number). Sans le test, l'erreur serait restée cachée jusqu'en production.

#### 2. Mon analyse des outils
* **Jasmine :** C'est le framework qui me donne la syntaxe. J'utilise `describe` pour créer un groupe de tests et `fdescribe` pour définir une fonctionnalité précise.
* **Karma :** C'est l'outil "miroir". Il lance un navigateur (souvent Chrome) et réexécute mes tests à chaque sauvegarde. C'est mon feedback visuel immédiat.
* **TestBed :** L'outil le plus puissant mais aussi le plus complexe. Il permet de simuler un environnement Angular complet pour un seul composant, en injectant uniquement ce dont on a besoin.

#### 3. Concepts maîtrisés (avec mes mots)
* **Le Pattern AAA (Arrange, Act, Assert) :** * *Arrange* : Je prépare mes données (ex: je crée une tâche).
  * *Act* : Je lance l'action (ex: j'appelle la méthode `deleteTask`).
  * *Assert* : Je vérifie le résultat (ex: `expect(tasks.length).toBe(0)`).
* **Mocks & Spies :** Le **Mock** est une doublure (un faux service qui ne fait rien), alors que le **Spy** est un espion qui surveille si une fonction a bien été appelée par le composant.
* **detectChanges() :** C'est l'étape indispensable. Angular ne met pas à jour le HTML automatiquement dans les tests. Appeler cette méthode force le composant à rafraîchir son affichage.

#### 4. Exemples de tests implémentés

**Test d'une logique de service (Simple) :**
```typescript
it('doit vider la liste des tâches via clearAll()', () => {
  service.addTask({ title: 'Test' });
  service.clearAll();
  expect(service.tasks.length).toBe(0);
});
```
**Avec le résultat attendu :**
- Avant `clearAll()`, la liste contient 1 tâche.
- Après `clearAll()`, la liste est vide.
