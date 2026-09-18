import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { PROFILE } from '../../core/content/profile';
import { Breadcrumb, SeoService } from '../../core/seo/seo.service';
import { absoluteUrl } from '../../core/seo/structured-data';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon';
import { PageHeader } from '../../shared/page-header';

export const CONTACT_SUBJECTS = [
  'Demande presse / interview',
  'Invitation à un événement',
  'Partenariat',
  'Message personnel',
  'Autre',
] as const;

type Status = 'idle' | 'sending' | 'success' | 'error';
type ValidatedField = 'name' | 'email' | 'message' | 'consent';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, Icon, PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
})
export class Contact {
  private readonly http = inject(HttpClient);

  protected readonly site = SITE;
  protected readonly subjects = CONTACT_SUBJECTS;
  protected readonly breadcrumbs: Breadcrumb[] = [{ name: 'Contact', path: '/contact' }];
  protected readonly status = signal<Status>('idle');
  protected readonly errorMessage = signal('');
  protected readonly submitted = signal(false);

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    subject: [CONTACT_SUBJECTS[0] as string, Validators.required],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
    consent: [false, Validators.requiredTrue],
    /** Pot de miel anti-spam : champ invisible que seuls les robots remplissent. */
    website: [''],
  });

  constructor() {
    inject(SeoService).update({
      title: 'Contact',
      description: `Contacter ${PROFILE.name} et son équipe : demandes presse, invitations, partenariats et messages.`,
      path: '/contact',
      breadcrumbs: this.breadcrumbs,
      schema: [
        {
          '@type': 'ContactPage',
          url: absoluteUrl('/contact'),
          name: `Contacter ${PROFILE.name}`,
        },
      ],
    });
  }

  protected showError(control: ValidatedField): boolean {
    const field = this.form.controls[control];
    return field.invalid && (field.touched || this.submitted());
  }

  protected async submit(): Promise<void> {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');
    try {
      await firstValueFrom(this.http.post('/api/contact', this.form.getRawValue()));
      this.status.set('success');
      this.form.reset();
      this.submitted.set(false);
    } catch (error) {
      const serverMessage = error instanceof HttpErrorResponse ? error.error?.message : undefined;
      this.errorMessage.set(
        serverMessage ?? `L’envoi a échoué. Vous pouvez nous écrire directement à ${SITE.contact.email}.`,
      );
      this.status.set('error');
    }
  }
}
