import { Component, OnInit } from '@angular/core';

import { AmigoService } from '../amigo.service';
import { Status_indicacao } from '../amigo';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Amigo } from '../amigo';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  status_indicacao: Status_indicacao[] = [];

  id!: number;
  amigo: Amigo = {} as Amigo;
  form!: FormGroup;

  constructor(
    public amigoService: AmigoService,
    private route: ActivatedRoute,
    private router: Router,
    public dropdownService: DropdownService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['idAmigo'];

    this.dropdownService.getStatus(this.id).subscribe((data: Status_indicacao[]): void => {
      this.status_indicacao = data;
      console.log(this.status_indicacao);
    });

    this.amigoService.find(this.id).subscribe((data: Amigo) => {
      this.amigo = data;
      console.log(data.status_indicacao_id);
    });

    this.form = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'),
        Validators.maxLength(255)
      ]),

      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.maxLength(11),
        Validators.minLength(11)
      ]),

      telefone: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.maxLength(11),
        Validators.minLength(10)
      ]),
      email: new FormControl('', [
        Validators.required, Validators.email,
        //Validators.maxLength(255),
      ]),
      status_indicacao_id: new FormControl([null, Validators.required]),
    });

  }

  get f() {
    return this.form.controls;
  }


  submit() {
    console.log(this.form.value);
    this.amigoService.update(this.id, this.form.value).subscribe(res => {
      console.log(res);
      console.log('Indicacao alterada com sucesso!');
      alert('Indicacao alterada com sucesso!');
      this.router.navigateByUrl('amigo/index');
    })
  }

}
