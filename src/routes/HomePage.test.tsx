import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import HomePage from './HomePage';
import { experiences, profile, projects } from './portfolioData';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../app/i18n';

afterEach(cleanup);

describe('HomePage', () => {
  it('shows the portfolio sections and verified project links', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </I18nextProvider>,
    );

    expect(
      screen.getByRole('heading', { name: `${profile.firstName} ${profile.lastName}` }),
    ).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Approach' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Let’s make something thoughtful.' })).toBeTruthy();

    for (const project of projects) {
      expect(screen.getByRole('heading', { name: project.title })).toBeTruthy();
      expect(screen.getByRole('img', { name: project.screenshotAlt })).toBeTruthy();
      expect(screen.getByRole('link', { name: project.demoLabel }).getAttribute('href')).toBe(
        project.demoHref,
      );
    }

    expect(screen.getAllByRole('link', { name: 'GitHub' })).toHaveLength(projects.length);
    expect(screen.getByRole('link', { name: 'Request a copy' }).getAttribute('href')).toBe(
      `mailto:${profile.email}?subject=Request%20for%20resume`,
    );
    expect(screen.getByRole('heading', { name: experiences[0].company })).toBeTruthy();
  });
});
