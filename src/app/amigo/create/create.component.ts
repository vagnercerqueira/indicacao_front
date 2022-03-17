import { Component, OnInit } from '@angular/core';

import { AmigoService, } from '../amigo.service';
import { Status_indicacao } from '../amigo';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DropdownService } from 'src/app/shared/services/dropdown.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  status_indicacao: Status_indicacao[] = [];

  form: FormGroup = new FormGroup({
    nome: new FormControl(''),
    cpf: new FormControl(''),
    telefone: new FormControl(''),
    email: new FormControl(''),
    status_indicacao_id: new FormControl(''),

  });
  submitted = false;

  constructor(
    public amigoService: AmigoService,
    private router: Router,
    public dropdownService: DropdownService
  ) { }

  ngOnInit(): void {

    this.dropdownService.getStatus('0').subscribe((data: Status_indicacao[]): void => {
      this.status_indicacao = data;
      console.log(this.status_indicacao);
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
        Validators.maxLength(255),
      ]),
      status_indicacao_id: new FormControl([null, Validators.required]),
    });

  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.amigoService.create(this.form.value).subscribe(res => {
      console.log(res);
      console.log('Indicacao criada com sucesso!');
      alert('Indicacao criada com sucesso!');
      this.router.navigateByUrl('amigo/index');
    })
  }

}
