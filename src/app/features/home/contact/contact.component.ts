// import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
// import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
// import { RevealDirective } from '../../../shared/directives/reveal.directive';
// import { IconComponent } from '../../../shared/components/icon/icon.component';
// @Component({
//   selector: 'app-contact',
//   standalone: true,
//   imports: [ReactiveFormsModule, RevealDirective, IconComponent],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   templateUrl: './contact.component.html',
//   styleUrl: './contact.component.css'
// })
// export class ContactComponent {
//   readonly loading = signal(false);
//   readonly success = signal(false);

//   readonly contactForm = new FormGroup({
//     name: new FormControl('', [Validators.required, Validators.minLength(2)]),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     phone: new FormControl(''),
//     service: new FormControl('', [Validators.required]),
//     message: new FormControl('', [Validators.required, Validators.minLength(10)])
//   });

//   onSubmit(): void {
//     if (this.contactForm.invalid) {
//       this.contactForm.markAllAsTouched();
//       return;
//     }
//     this.loading.set(true);
//     // Simulate submission
//     setTimeout(() => {
//       this.loading.set(false);
//       this.success.set(true);
//       this.contactForm.reset();
//       setTimeout(() => this.success.set(false), 4000);
//     }, 1500);
//   }

//   isInvalid(field: string): boolean {
//     const control = this.contactForm.get(field);
//     return !!(control && control.invalid && control.touched);
//   }
// }

import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  // =========================================================
  // GOOGLE APPS SCRIPT WEB APP URL
  // =========================================================

  private readonly googleSheetUrl =
    'https://script.google.com/macros/s/AKfycbzt3wZsgq1Vvoe7XI38UAfp7LB1ceNhaIfB1kgNHTpqJqOpoUdfC3EGL7SXD_zcrG-x/exec';

  // =========================================================
  // UI STATE
  // =========================================================

  readonly loading = signal(false);
  readonly success = signal(false);
  readonly errorMessage = signal('');

  // =========================================================
  // CONTACT FORM
  // =========================================================

  readonly contactForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    phone: new FormControl('', {
      nonNullable: true,
    }),
    service: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    message: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)],
      nonNullable: true,
    }),
  });

  // =========================================================
  // SUBMIT FORM
  // =========================================================

  onSubmit(): void {
    // Clear previous messages
    this.success.set(false);
    this.errorMessage.set('');

    // Validate Form
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // Start Loading
    this.loading.set(true);

    // Get Form Values
    const formValue = this.contactForm.getRawValue();

    // Create FormData for POST request
    const formData = new FormData();
    formData.append('name', formValue.name.trim());
    formData.append('email', formValue.email.trim());
    formData.append('phone', formValue.phone.trim());
    formData.append('service', formValue.service);
    formData.append('message', formValue.message.trim());

    // Send data to Google Apps Script via POST
    fetch(this.googleSheetUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        this.loading.set(false);

        if (data.status === 'success') {
          // Show success message
          this.success.set(true);

          // Reset form
          this.contactForm.reset();

          // Hide success message after 5 seconds
          setTimeout(() => {
            this.success.set(false);
          }, 5000);
        } else {
          // Show error from server
          this.errorMessage.set(data.message || 'Something went wrong. Please try again later.');
        }
      })
      .catch((error) => {
        console.error('Contact Form Submission Error:', error);
        this.loading.set(false);
        this.success.set(false);
        this.errorMessage.set('Unable to send your message. Please try again later.');
      });
  }

  // =========================================================
  // CHECK FIELD VALIDATION
  // =========================================================

  isInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && control.touched);
  }
}
