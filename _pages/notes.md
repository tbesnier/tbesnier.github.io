---
layout: default
permalink: /blog/
title: Research Notes
nav_title: Blog
nav: true
nav_order: 1
---

{% assign notes = site.notes | sort: 'date' | reverse %}
{% assign current_note = notes | first %}

<div class="notes-page">
  <section class="notes-hero">
    <div class="notes-hero-copy">
      <p class="notes-kicker">Research Blog</p>
      <h1>Research notes on geometry, deformation, and learning.</h1>
      <p class="notes-deck">
        A small space for technical notes around shape analysis and 3D generative modeling, written visually and kept close to the underlying math.
      </p>

      <div class="notes-actions">
        {% if current_note %}
          <a class="notes-primary-action" href="{{ current_note.url | relative_url }}">Read the current note</a>
        {% endif %}
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

{% if current_note %}

<section id="current-note" class="notes-section">
<div class="notes-section-heading simple">
<div>
<p class="notes-section-kicker">Current note</p>
<h2>One note to build on</h2>
</div>
</div>

      <div class="note-card-grid single-note-grid">
        {% include note_card.liquid note=current_note %}
      </div>
    </section>

{% endif %}

</div>
