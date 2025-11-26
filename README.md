## Séquence 2 – Logique réactive du flux de données
### 1. Structure du flux
- Le service `TaskService` utilise un **BehaviorSubject** pour stocker et diffuser la liste des tâches.
- Le composant `Home` s’abonne à ce flux via `tasks$` et le **pipe async**.
### 2. Mise à jour des données
- La méthode `addTask()` ajoute une tâche puis appelle `next()` pour émettre la nouvelle liste.
- La méthode `removeTask()` supprime une tâche puis émet à nouveau la liste mise à jour.
- La vue est automatiquement réactualisée sans rechargement.
### 3. Points clés retenus
- Pas besoin d’appeler `getTasks()` à chaque fois : la donnée est **vivante**.
- `| async` gère l’abonnement et le désabonnement automatiquement.
- Le flux reste cohérent entre le service et la vue.
_________________________________________
## Concepts compris
- Flux réactif centralisé : le service expose un observable `tasks$` contenant l'état partagé.
- La vue s'abonne via le pipe `| async` ; le composant n'a pas à gérer manuellement les abonnements.
- Les modifications d'état se propagent automatiquement du service vers la template.

## Ce que fait `BehaviorSubject`
- Conserve la dernière valeur émise et la fournit immédiatement aux nouveaux abonnés.
- Permet de lire l'état courant de manière synchrone via `.value` et d'émettre des mises à jour avec `.next()`.

## Ce que fait `| async`
- Opérateur de template Angular qui s'abonne à un observable/Promise et rend sa valeur dans la vue.
- Gère automatiquement l'abonnement et le désabonnement pour éviter les fuites mémoire.

## Flux `service` → `composant` → `template`
- Le service (`TaskService`) maintient l'état dans un `BehaviorSubject` et expose un observable public (ex : `tasks$`).
- Le composant (`Home`) consomme cet observable (propriété `tasks$`) sans s'abonner manuellement.
- La template utilise `tasks$ | async` pour afficher la valeur actuelle ; lorsque le service appelle `.next()`, la nouvelle valeur est poussée et la vue se met à jour automatiquement.
