---
layout: default
permalink: /blog/
title: Research Notes
nav_title: Blog
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
      <p class="notes-deck">Shape analysis, deformation modeling, and 3D generative methods, written with diagrams, equations, and implementation detail.</p>

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
      <figure class="notes-hero-figure">
        <img
          src="{{ '/assets/img/blog/applied-geometry-hero.svg' | relative_url }}"
          alt="Abstract applied geometry illustration with wireframes, contours, and point samples"
          loading="eager"
        >
      </figure>
      <div class="notes-theme-strip">
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

  <section id="featured-notes" class="notes-section">
    <div class="notes-section-heading">
      <div>
        <p class="notes-section-kicker">Featured</p>
        <h2>Featured notes</h2>
      </div>
      <p class="notes-section-copy">Three entry points into the kinds of geometric problems explored here.</p>
    </div>

    <div class="note-card-grid">
      {% for note in featured_notes limit: 3 %}
        {% include note_card.liquid note=note %}
      {% endfor %}
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
