import { Component, OnInit } from '@angular/core';

import { AmigoService } from '../amigo.service';
import { Amigo, Status_indicacao } from '../amigo';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  amigos: Amigo[] = [];
  status_indicacao: Status_indicacao[] = [];
  ngSelect = "1";
  form!: FormGroup;

  constructor(public amigoService: AmigoService, public dropdownService: DropdownService, private router: Router,) { }

  ngOnInit(): void {
    this.amigoService.getAll().subscribe((data: Amigo[]) => {
      this.amigos = data;
      console.log(this.amigos);
    });
  }

  deleteAmigo(id: number) {
    this.amigoService.delete(id).subscribe(res => {
      this.amigos = this.amigos.filter(item => item.id !== id);
      console.log(res);
      console.log('Indicacao deletada com sucesso!');
      alert('Indicacao deletada com sucesso!');
      this.router.navigateByUrl('amigo/index');
    })
  }
}
