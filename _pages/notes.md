---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 1
---

{% assign notes = site.notes | sort: 'date' | reverse %}
{% assign featured_notes = notes | where: 'featured', true %}

<div class="notes-page">
  <section class="notes-hero">
    <div class="notes-hero-copy">
      <p class="notes-kicker">Research Blog</p>
      <h1>Visual explanations for geometry, motion, and learning.</h1>
      <p class="notes-deck">
        This space is where I unpack ideas behind shape analysis, deformation modeling, and 3D generative methods.
        The goal is to keep the intuition visible without hiding the technical details.
      </p>

      <div class="notes-actions">
        <a class="notes-primary-action" href="#featured-notes">Start with featured notes</a>
        <a class="notes-secondary-action" href="#recent-notes">Browse the full archive</a>
      </div>

      <div class="notes-stat-grid">
        <div class="notes-stat-card">
          <span class="notes-stat-value">{{ notes | size }}</span>
          <span class="notes-stat-label">Research notes</span>
        </div>
        <div class="notes-stat-card">
          <span class="notes-stat-value">3D</span>
          <span class="notes-stat-label">Geometry-first topics</span>
        </div>
        <div class="notes-stat-card">
          <span class="notes-stat-value">Code + Math</span>
          <span class="notes-stat-label">Implementation-oriented explanations</span>
        </div>
      </div>
    </div>

    <div class="notes-hero-panel">
      <div class="notes-panel">
        <p class="notes-panel-label">What to expect</p>
        <ul class="notes-panel-list">
          <li>step-by-step intuition before formalism</li>
          <li>small diagrams, tables, and structured comparisons</li>
          <li>technical bridges from equations to implementation choices</li>
        </ul>
      </div>
      <div class="notes-panel signal">
        <p class="notes-panel-label">Current themes</p>
        <div class="notes-topic-cloud">
          <span>shape correspondence</span>
          <span>deformation priors</span>
          <span>localized control</span>
          <span>3D talking heads</span>
          <span>spectral geometry</span>
          <span>motion synthesis</span>
        </div>
      </div>
    </div>

  </section>

  <section class="notes-principles">
    <article class="principle-card">
      <h2>Didactic by design</h2>
      <p>
        Each note is structured to move from a visual mental model to the relevant mathematics, then to concrete modeling or
        engineering decisions.
      </p>
    </article>
    <article class="principle-card">
      <h2>Technical without shortcuts</h2>
      <p>
        I keep the derivations, assumptions, and failure modes explicit, especially when discussing geometry processing and
        learned deformation models.
      </p>
    </article>
    <article class="principle-card">
      <h2>Connected to research practice</h2>
      <p>
        The examples are grounded in the kinds of questions that appear in papers, reviews, implementations, and day-to-day
        debugging.
      </p>
    </article>
  </section>

  <section id="featured-notes" class="notes-section">
    <div class="notes-section-heading">
      <div>
        <p class="notes-section-kicker">Featured</p>
        <h2>Entry points into the blog</h2>
      </div>
      <p class="notes-section-copy">
        A few notes to start with if you want a quick sense of the tone and level of detail.
      </p>
    </div>

    <div class="note-card-grid">
      {% for note in featured_notes limit: 3 %}
        {% include note_card.liquid note=note %}
      {% endfor %}
    </div>

  </section>

  <section class="notes-section">
    <div class="notes-section-heading">
      <div>
        <p class="notes-section-kicker">Format</p>
        <h2>How the notes are written</h2>
      </div>
    </div>

    <div class="notes-format-grid">
      <article class="format-card">
        <h3>Visual intuition</h3>
        <p>Compact diagrams and comparisons that make the geometry legible before introducing notation.</p>
      </article>
      <article class="format-card">
        <h3>Equation walkthroughs</h3>
        <p>Short mathematical sections focused on the quantities that actually matter for modeling and optimization.</p>
      </article>
      <article class="format-card">
        <h3>Implementation notes</h3>
        <p>Practical remarks about representations, regularization, numerical stability, and failure cases.</p>
      </article>
    </div>

  </section>

  <section id="recent-notes" class="notes-section">
    <div class="notes-section-heading">
      <div>
        <p class="notes-section-kicker">Archive</p>
        <h2>Recent notes</h2>
      </div>
      <p class="notes-section-copy">A growing collection of essays around geometric learning, motion, and 3D representation.</p>
    </div>

    <div class="note-card-grid">
      {% for note in notes %}
        {% include note_card.liquid note=note compact=true %}
      {% endfor %}
    </div>

  </section>
</div>
