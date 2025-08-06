import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Contact } from '../../models/contact.model';
import { Project } from '../../models/project.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-todo-detail',
  standalone: false,
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})

export class TodoDetailComponent implements OnInit {
  todo!: Todo;
  formGroup!: FormGroup;

  listPriority = [
    { priority: 1, value: 1 },
    { priority: 2, value: 2 },
    { priority: 3, value: 3 },
  ]

  // contacts
  currentContact = new FormControl('');
  allContactsFirstNames: Contact[] = [];
  selectedContacts: Contact[] = [];
  filteredContacts: Contact[] = [];

  project: Project[] = [];
  userConnected: User[] = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.todoService.getTodo(id).subscribe(data => {
      this.todo = data;

      // user connected :
      this.userService.getAllUsers().subscribe((users) => {
        this.userConnected = users;

        this.formGroup = this.fb.group({
          id: [this.todo.id],
          title: [this.todo.title, Validators.required],
          priority: [this.todo.priority],
          dueDate: [this.todo.dueDate],
          completed: [this.todo.completed],
          description: [this.todo.description],
          memberIds: [this.todo.memberIds || []],
          projectId: [this.todo.projectId],
          userConnectedId: [this.todo.userConnectedId],
        });

        //members :
        this.selectedContacts = this.allContactsFirstNames.filter(c => this.todo.memberIds.includes(c.id))
      });

      this.todoService.getAllContacts().subscribe((contacts) => {
        this.allContactsFirstNames = contacts;
        this.filteredContacts = [...this.allContactsFirstNames];
      });

      //project :
      this.todoService.getAllProjects().subscribe((projects) => {
        this.project = projects;
      })

    });
  }

  onSubmitTodo() {
    if (this.formGroup.value.dueDate){
    this.formGroup.value.dueDate = this.toLocalIsoString(this.formGroup.value.dueDate);
    this.formGroup.get('memberIds')?.setValue(this.selectedContacts.map(c => c.id));
    }

    if (this.formGroup.valid) {
      //console.log(this.formGroup.value); 
      this.todoService.updateTodo(this.formGroup.value).subscribe(data => {
        this.snackBar.open('Saved !', "", { duration: 2000 });
        this.router.navigateByUrl('');
      })
    }
  }

  // changement date pour éviter fuseau horaire différent
  toLocalIsoString(dateString: Date): string {
    const dateObject = new Date(dateString);
    const local = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
    return new Date(local.getTime() - local.getTimezoneOffset() * 60000).toISOString();
  }
  /* Correction : toLocalDateString(date: Date): string {
       const year = date.getFullYear();
       const month = String(date.getMonth() + 1).padStart(2, '0');
       const day = String(date.getDate()).padStart(2, '0');
       return `${year}-${month}-${day}`; //  format LocalDate
 }*/

  // enlever membres
  remove(idContact: number | null): void {
    this.selectedContacts = this.selectedContacts.filter(c => c.id !== idContact);
    this.formGroup.markAsDirty();
  }
  // fonction filtrage par lettre
  onCurrentContactChange(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredContacts = this.allContactsFirstNames.filter(contact =>
      contact.name?.toLowerCase().includes(filterValue)
    );
  }
  // sélection des membres
  selected(event: MatAutocompleteSelectedEvent): void {
    let selectedC = this.allContactsFirstNames.find(c => c.id == event.option.value);
    if (selectedC != null) {
      this.selectedContacts = [...this.selectedContacts, selectedC];
      this.currentContact.setValue('');
      event.option.deselect();
      this.formGroup.markAsDirty();
    }
  }

}
