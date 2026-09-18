import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Affiche une liste de paragraphes. Une entrée commençant par `## ` devient un intertitre H2.
 * Le texte est interpolé (jamais injecté en HTML) : aucun risque XSS.
 */
@Component({
  selector: 'app-rich-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'prose-site block' },
  template: `
    @for (block of blocks(); track $index) {
      @if (block.startsWith('## ')) {
        <h2>{{ block.slice(3) }}</h2>
      } @else {
        <p>{{ block }}</p>
      }
    }
  `,
})
export class RichText {
  readonly blocks = input.required<string[]>();
}
