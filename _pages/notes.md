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

{% for category in notes_by_category %}
  <h2>{{ category.name }}</h2>
  <ul>
    {% for note in category.items %}
      <li>
        <a href="{{ note.url }}">{{ note.title }}</a> - <small>{{ note.date | date: "%B %d, %Y" }}</small>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

</div>
