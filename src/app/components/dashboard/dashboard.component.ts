import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  todos: Todo[] = [];
  kpis = [
    { color: "!bg-green-500", icon: "event", title: "today", tasks: 0 },
    { color: "!bg-orange-400", icon: "av_timer", title: "in delay", tasks: 0 },
    { color: "!bg-red-600", icon: "warning", title: "urgent", tasks: 0 },
  ];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.fetchTodo();
  }

  fetchTodo() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
      const now = new Date();
      const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      let today: number = 0, delay: number = 0, urgent: number = 0; // number est optional

      // filtrer si priorité =1 et date auj ==> aujourd'hui
      today = this.todos.filter(todo => {
        if (!todo.dueDate) return false; // ignore les tâches sans date (= null)
        const dueDate = new Date(todo.dueDate);
        return todo.priority === 1 &&
          dueDate.getFullYear() === todayDate.getFullYear() && // objets: (date == date) pas utilisable, ne marche que sur string pas Date
          dueDate.getMonth() === todayDate.getMonth() && // obligé de découper année mois et jour
          dueDate.getDate() === todayDate.getDate();
      }).length;
       this.kpis[0].tasks = today;

      // si priorité null ou >1 et date date auj ==> delay 
      delay = this.todos.filter(todo => {
        if (!todo.dueDate) return false;
        const dueDate = new Date(todo.dueDate);
        return (todo.priority === null || todo.priority > 1) &&
          dueDate.getFullYear() === todayDate.getFullYear() &&
          dueDate.getMonth() === todayDate.getMonth() &&
          dueDate.getDate() === todayDate.getDate();
      }).length;
          this.kpis[1].tasks = delay;

      // si priorité null ou >1 et date dépassée  ==> urgent 
      urgent = this.todos.filter(todo => {
        if (!todo.dueDate) return false; 
        const dueDate = new Date(todo.dueDate);
        return (todo.priority === null || todo.priority > 1) &&
          dueDate < todayDate;
      }).length;
        this.kpis[2].tasks = urgent;
    })
  }
}

/******* CORRECTION TAREK *****/
/*
 * In memory data : convertir Date en string (changer dans model, etc) avec .toISOString()
 * 
 * let today = new Date(2025,5,10); : rentrer la date d'auj sinon pb av hours mins ...
 * 
   let countUrgent = 0, countToday = 0, countLate = 0;
      countUrgent = this.todos.filter(c=>
        c.priority == '1' &&
        new Date(c.dueDate).toDateString() == today.toDateString()).length;   => convertir en date
  this.kpis[2].value = countUrgent;

Boucle for (let of ):
      for(let item of this.todos) {
     if (new Date(item.dueDate).toDateString() == today.toDateString() )
     countToday++;
      }
  this.kpis[0].value = countToday; 

Boucle for:
      for (let i=0; i<this.todos.length; i ++) {
     if (new Date(this.todos[i].dueDate) < today) 
     countLate = countLate + 1  (ou countLate+= 1)
     }
  this.kpis[1].value = countLate; 

  ==> résultat de son dashboard : affiche sans les priorités donc tâches à aujourd'hui s'affichent dans plusieurs cartes: 2, 2 et 1
  */

