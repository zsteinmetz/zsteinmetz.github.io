---
layout: page
permalink: /publications/
title: publications
description: >
  <a href='#peer-reviewed-journal-articles'>Peer-reviewed journal articles</a>,
  <a href='#preprints-and-non-peer-reviewed-papers'>preprints and non peer-reviewed papers</a>,
  <a href='#selected-conference-contributions'>selected conference contributions</a>,
  <a href='#journalistic-articles'>journalistic articles</a>, and
  my <a href='#referee'>reviewing activity for scientific journals</a>.
start_year: 2015
nav: true
nav_order: 3
---
<script async src="https://badge.dimensions.ai/badge.js" charset="utf-8"></script>

## peer-reviewed journal articles

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

## preprints and non peer-reviewed papers

<div class="publications">

{% assign now = 'now' | date: "%Y" %}
{% for y in (page.start_year..now) reversed %}
  {% capture bib_count %}{% bibliography_count -f preprints -q @*[year={{y}}]* %}{% endcapture %}
  {% assign bib_count = bib_count | to_integer %}
  {% if bib_count > 0 %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f preprints -q @*[year={{y}}]* %}
  {% endif %}
{% endfor %}

</div>

## selected conference contributions

<div class="publications">

{% assign now = 'now' | date: "%Y" %}
{% for y in (page.start_year..now) reversed %}
  {% capture bib_count %}{% bibliography_count -f conferences -q @*[year={{y}}]* %}{% endcapture %}
  {% assign bib_count = bib_count | to_integer %}
  {% if bib_count > 0 %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f conferences -q @*[year={{y}}]* %}
  {% endif %}
{% endfor %}

</div>

## invited speaker

<div class="publications">

{% assign now = 'now' | date: "%Y" %}
{% for y in (page.start_year..now) reversed %}
  {% capture bib_count %}{% bibliography_count -f invited -q @*[year={{y}}]* %}{% endcapture %}
  {% assign bib_count = bib_count | to_integer %}
  {% if bib_count > 0 %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f invited -q @*[year={{y}}]* %}
  {% endif %}
{% endfor %}

</div>

## journalistic articles

<div class="publications">

{% assign now = 'now' | date: "%Y" %}
{% for y in (page.start_year..now) reversed %}
  {% capture bib_count %}{% bibliography_count -f journalistic -q @*[year={{y}}]* %}{% endcapture %}
  {% assign bib_count = bib_count | to_integer %}
  {% if bib_count > 0 %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f journalistic -q @*[year={{y}}]* %}
  {% endif %}
{% endfor %}

</div>

## referee

Reviewer for
*Nature Sustainability*,
*Science of the Total Environment*,
*Journal of Analytical and Applied Pyrolysis*,
*Journal of Plant Nutrition and Soil Science*,
*Environmental Pollution*,
*Polymers*, and
*Frontiers in Environmental Science*

Advisor for the *F1000Research* Gateway "Agriculture, Food and Nutrition"