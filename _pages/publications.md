---
layout: page
permalink: /publications/
title: publications
description: Peer-reviewed articles.
start_year: 2015
nav: true
---
<!-- _pages/publications.md -->

<script async src="https://badge.dimensions.ai/badge.js" charset="utf-8"></script>

<div class="publications">

{% assign now = 'now' | date: "%Y" %}
{% for y in (page.start_year..now) reversed %}
  {% capture bib_count %}{% bibliography_count -f papers -q @*[year={{y}}]* %}{% endcapture %}
  {% assign bib_count = bib_count | to_integer %}
  {% if bib_count > 0 %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
  {% endif %}
{% endfor %}

</div>

<!---
# talks

<div class="publications">

{% assign now = 'now' | date: "%Y" %}
{% for y in (page.start_year..now) reversed %}
  {% capture bib_count %}{% bibliography_count -f talks -q @*[year={{y}}]* %}{% endcapture %}
  {% assign bib_count = bib_count | to_integer %}
  {% if bib_count > 0 %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f talks -q @*[year={{y}}]* %}
  {% endif %}
{% endfor %}

</div>
--->
