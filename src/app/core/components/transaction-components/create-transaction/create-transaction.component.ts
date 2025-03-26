import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DialogModule,
  ],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.scss'
})
export class CreateTransactionComponent implements OnInit {

  @Input() isDialogVisible: boolean = false;

  createTransactionAdminForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

  }

  createTransactionForm() {
    return this.formBuilder.group({
      description: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      total: new FormControl<number>(0, {
        validators: [Validators.required],
      }),
      date: new FormControl<Date>(new Date(), {
        validators: [Validators.required],
      }),
      transactionType: new FormControl<string>('', {
        validators: [Validators.required],
      }),
    });
  }
}
