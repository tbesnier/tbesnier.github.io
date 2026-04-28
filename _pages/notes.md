---
layout: default
permalink: /blog/
title: Blog
description: "Research notes on applied mathematics, geometry processing, and computer vision."
nav_title: blog
nav: true
nav_order: 1
---

{% assign notes = site.notes | sort: 'date' | reverse %}
{% assign latest_note = notes | first %}
{% assign note_count = notes | size %}

<div class="notes-page">
  <section class="notes-hero notes-archive-hero">
    <div class="notes-hero-copy">
      <p class="notes-kicker">Research notes</p>
      <h1>Applied mathematics, geometry processing, and computer vision.</h1>
      <p class="notes-deck">
        A curated archive of notes that build geometric intuition, connect it to algorithms, and keep the mathematical details close enough to be useful.
      </p>

      <div class="notes-actions">
        {% if latest_note %}
          <a class="notes-primary-action" href="{{ latest_note.url | relative_url }}">Read the latest note</a>
          <a class="notes-secondary-action" href="#notes-index">Browse the archive</a>
        {% endif %}
      </div>
    </div>

    <aside class="notes-index-panel" aria-label="Blog archive summary">
      <p class="notes-panel-label">Archive</p>
      {% if latest_note.preview_image %}
        <a class="notes-latest-preview" href="{{ latest_note.url | relative_url }}" aria-label="{{ latest_note.title | escape }}">
          <img src="{{ latest_note.preview_image | relative_url }}" alt="{{ latest_note.preview_alt | default: latest_note.title | escape }}" loading="eager">
        </a>
      {% endif %}
      <div class="notes-stat-grid">
        <div class="notes-stat">
          <strong>{{ note_count }}</strong>
          <span>published note{% unless note_count == 1 %}s{% endunless %}</span>
        </div>
        {% if latest_note %}
          <div class="notes-stat">
            <strong>{{ latest_note.date | date: '%Y' }}</strong>
            <span>latest update</span>
          </div>
        {% endif %}
      </div>

      <div class="notes-topic-cloud" aria-label="Main themes">
        <span>shape analysis</span>
        <span>geometry processing</span>
        <span>computer vision</span>
        <span>statistical modeling</span>
        <span>geometric learning</span>
      </div>
    </aside>

  </section>

{% if note_count > 0 %}

  <section id="notes-index" class="notes-section">
    <div class="notes-section-heading">
      <div>
        <p class="notes-section-kicker">Index</p>
        <h2>All notes</h2>
      </div>
      <p class="notes-section-copy">
        Entries are written as durable references: enough intuition to read them linearly, enough structure to return to a specific formula later.
      </p>
    </div>

    <div class="note-card-grid notes-archive-grid">
      {% for note in notes %}
        {% include note_card.liquid note=note %}
      {% endfor %}
    </div>

  </section>

{% endif %}

</div>
