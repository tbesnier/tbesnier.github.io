---
layout: default
permalink: /notes/
title: blog
nav: true
nav_order: 1
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
  trail:
    before: 1 # The number of links before the current page
    after: 3 # The number of links after the current page
---

<div class="post">

{% assign blog_name_size = site.blog_name | size %}
{% assign blog_description_size = site.blog_description | size %}
{% assign notes_by_category = site.notes | group_by: "category" %}

{% if blog_name_size > 0 or blog_description_size > 0 %}

  <div class="header-bar">
    <h1>{{ site.blog_name }}</h1>
    <h2>{{ site.blog_description }}</h2>
  </div>
  {% endif %}

<div class="notes-container">
  {% for note in site.notes %}
    <div class="note-tile">
      <a href="{{ note.url }}">
        <div class="note-thumbnail">
          <img src="/assets/img/template_error.png" alt="No image available">
        </div>
        <div class="note-content">
          <h2 class="note-title">{{ note.title }}</h2>
          {% if note.description %}
            <p class="note-description">{{ note.description }}</p>
          {% endif %}
        </div>
      </a>
    </div>
  {% endfor %}
</div>

</div>
