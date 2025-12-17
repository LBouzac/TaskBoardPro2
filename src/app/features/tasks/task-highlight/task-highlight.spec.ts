import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {TasksPage} from '../tasks-page/tasks-page';
import { Task as TaskService } from '../../../core/service/task';

describe('TasksPage Component - Rendu', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;
  let service: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPage],
      providers: [
        provideRouter([]),
        TaskService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    service = TestBed.inject(TaskService);

    // Ne pas vider les tâches pour garder les tâches par défaut
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher 3 tâches par défaut', async () => {
    // ARRANGE : Les tâches par défaut sont déjà dans le service

    // ACT
    fixture.detectChanges();
    await fixture.whenStable();

    // ASSERT : Compter les éléments <li> dans le DOM
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(3);
  });

  it('devrait afficher le titre des tâches', async () => {
    // ARRANGE : Les tâches par défaut

    // ACT
    fixture.detectChanges();
    await fixture.whenStable();

    // ASSERT
    const element = fixture.nativeElement;
    const text = element.textContent;

    expect(text).toContain('Faire le ménage');
    expect(text).toContain('Faire les devoirs');
    expect(text).toContain('Faire les courses');
  });

  it('devrait afficher 0 tâche quand le service est vide', async () => {
    // ARRANGE : Vider les tâches
    service.clearTasks();

    // ACT
    fixture.detectChanges();
    await fixture.whenStable();

    // ASSERT
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(0);
  });

  it('devrait ajouter une nouvelle tâche via addTask()', async () => {
    // ARRANGE : Vider les tâches d'abord
    service.clearTasks();
    fixture.detectChanges();
    await fixture.whenStable();

    // ACT : Ajouter une tâche via la méthode du composant
    component.addTask('Nouvelle tâche');
    fixture.detectChanges();
    await fixture.whenStable();

    // ASSERT
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Nouvelle tâche');
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(1);
  });

  it('devrait supprimer une tâche via deleteTask()', async () => {
    // ARRANGE : Vider et ajouter deux tâches
    service.clearTasks();
    fixture.detectChanges();
    await fixture.whenStable();

    component.addTask('Tâche 1');
    component.addTask('Tâche 2');
    fixture.detectChanges();
    await fixture.whenStable();

    // ACT : Supprimer la première tâche (id: 1)
    component.deleteTask(1);
    fixture.detectChanges();
    await fixture.whenStable();

    // ASSERT
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(1);
    expect(fixture.nativeElement.textContent).not.toContain('Tâche 1');
    expect(fixture.nativeElement.textContent).toContain('Tâche 2');
  });

  it('devrait marquer une tâche comme complétée via terminateTask()', async () => {
    // ARRANGE : Vider et ajouter une tâche
    service.clearTasks();
    fixture.detectChanges();
    await fixture.whenStable();

    component.addTask('Tâche à compléter');
    fixture.detectChanges();
    await fixture.whenStable();

    // ACT : Marquer comme terminée
    component.terminateTask(1);
    fixture.detectChanges();
    await fixture.whenStable();

    // ASSERT : Vérifier que l'affichage contient toujours la tâche
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Tâche à compléter');
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(1);
  });

  it('devrait ajouter plusieurs tâches dans l\'ordre', async () => {
    // ARRANGE : Vider les tâches
    service.clearTasks();
    fixture.detectChanges();
    await fixture.whenStable();

    const tasks = ['Task A', 'Task B', 'Task C'];

    // ACT
    tasks.forEach(task => component.addTask(task));
    fixture.detectChanges();
    await fixture.whenStable();

    // ASSERT
    const element = fixture.nativeElement;
    const text = element.textContent;
    tasks.forEach(task => {
      expect(text).toContain(task);
    });
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(3);
  });

  it('devrait afficher un titre pour la liste des tâches', async () => {
    // ACT
    fixture.detectChanges();
    await fixture.whenStable();

    // ASSERT
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Liste des tâches');
  });

  it('devrait afficher les boutons d\'action pour chaque tâche', async () => {
    // ARRANGE : Vider et ajouter une tâche
    service.clearTasks();
    fixture.detectChanges();
    await fixture.whenStable();

    component.addTask('Test');
    fixture.detectChanges();
    await fixture.whenStable();

    // ACT & ASSERT
    const buttons = fixture.nativeElement.querySelectorAll('button');
    // 3 boutons par tâche : Mettre en avant, marquer complet, supprimer + 1 bouton Ajouter = 4
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('devrait gérer l\'ajout et la suppression alternativement', async () => {
    // ARRANGE : Vider les tâches
    service.clearTasks();
    fixture.detectChanges();
    await fixture.whenStable();

    // ACT
    component.addTask('Tâche 1');
    fixture.detectChanges();
    await fixture.whenStable();

    component.deleteTask(1);
    fixture.detectChanges();
    await fixture.whenStable();

    component.addTask('Tâche 2');
    fixture.detectChanges();
    await fixture.whenStable();

    // ASSERT
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('Tâche 2');
    expect(fixture.nativeElement.textContent).not.toContain('Tâche 1');
  });
});
