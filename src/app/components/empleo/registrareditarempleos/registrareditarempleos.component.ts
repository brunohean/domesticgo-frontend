import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmpleoService } from '../../../services/empleo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Empleo } from '../../../models/empleo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registrareditarempleos',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './registrareditarempleos.component.html',
  styleUrl: './registrareditarempleos.component.css',
})
export class RegistrareditarempleosComponent implements OnInit {
  // Este componente se encargará de registrar o editar un empleo (si se recibe un ID en la ruta o no)
  form: FormGroup = new FormGroup({});
  empleo: Empleo = new Empleo(); // Variable de tipo empleo par aobtener sus atributos
  estado: boolean = true; // Variable para controlar el estado del formulario

  /*
  // Lista de opciones para el campo de tipo de empleo
  nomEmpleo: { value: string; viewValue: string }[] = [
    { value: 'Gasfitero', viewValue: 'GASFITERO' }, // El value es lo que guardo en BD y el viewValue es lo que se muestra al usuario
    { value: 'Electricista', viewValue: 'ELECTRICISTA' },
    { value: 'Servicios de Aseo', viewValue: 'ASEO' },
    { value: 'Carpintero', viewValue: 'CARPINTERO' },
  ];
*/
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private empSer: EmpleoService,
    private formBuilder: FormBuilder,
    private router: Router, // Router es de @angular/router ayuda a volver a empleos/listartodos luego de registrar o editar
    private route: ActivatedRoute // ActivatedRoute  permite acceder a los parámetros de la ruta actual
  ) {
    // Aquí se pueden inyectar servicios si es necesario
  }

  ngOnInit(): void {
    // Aquí se puede inicializar el componente, por ejemplo, cargar datos
    // Se usa para configurar el formulario: versión registrar o versión actualizar un empleo
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init(); // Si hay parametros en la dirección ip: muestra el form Actualizar en lugar de Registrar al iniciar el componente
    });

    // Aqui se nombran los elementos del formulario, son diferentes de los de el modelo aplicacion. nombreAppcito: ... ; y va dentro de ngOnInit
    this.form = this.formBuilder.group({
      // Se pueden agregar validaciones, por ejemplo: Validators.required , max, min, long
      // Las comillas simples son para indicar que es un string vacio
      codigo: [''],
      nameEmpleo: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.empleo.idEmpleo = this.form.value.codigo;
      this.empleo.nombreEmpleo = this.form.value.nameEmpleo;

      // Define cuando 'actualiza' ó ...
      if (this.edicion) {
        this.empSer.update(this.empleo).subscribe(() => {
          this.empSer.listAll().subscribe((data) => {
            this.empSer.setList(data);
          });
        });
      }
      // ... cuando 'registra'
      else {
        this.empSer.insertOne(this.empleo).subscribe(() => {
          this.empSer.listAll().subscribe((data) => {
            this.empSer.setList(data);
          });
        });
      }

      this.router.navigate(['empleos']); // Redirige a la lista de empleos después de registrar o editar
    }
  }

  init() {
    if (this.edicion) {
      this.empSer.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idEmpleo),
          nombreEmpleo: new FormControl(data.nombreEmpleo),
        });
      });
    }
  }
}
