---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

<h2>Preprints</h2>
{% for post in site.publications reversed %}
  {% if post.pubtype == 'preprint' %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}

<h2>Journal Articles</h2>
{% for post in site.publications reversed %}
  {% if post.pubtype == 'journal' %}
      {% include archive-single.html %}
  {% endif %}
{% endfor %}

<h2>Conference Papers</h2>
{% for post in site.publications reversed %}
  {% if post.pubtype == 'conference' %}
      {% include archive-single.html %}
  {% endif %}
{% endfor %}

<h2>Workshop communications</h2>
{% for post in site.publications reversed %}
  {% if post.pubtype == 'workshop' %}
      {% include archive-single.html %}
  {% endif %}
{% endfor %}

<div class="column right" style="background-color:ffff;">
					<p><b>Fully Convolutional Mesh Autoencoder Using Efficient Spacially Varying Kernals</b>
						<br><b>Yi Zhou</b>, Chenglei Wu, Zimo Li, Chen Cao, Yuting Ye, Jason Saragih, Hao Li, Yaser Sheikh
						<br><em>Neurips 2020</em> [<a href="https://arxiv.org/pdf/2006.04325.pdf">paper</a>]  [<a href="project_vcmeshcnn/vcmeshcnn.html">project page</a>] 
				</div>
