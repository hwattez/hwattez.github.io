---
layout: page
permalink: /publications/
title: publications
description: publications by categories in reversed chronological order. generated by jekyll-scholar.
years: [2021,2020,2019,2018,2017]
nav: true
---

<div class="publications">

  <h1>International Conferences</h1>

  {% for y in page.years %}
    {%- capture citecount -%}
      {% bibliography_count -f papers --query @inproceedings[year={{y}} && langid = english && workshop != yes]* %}
    {%- endcapture -%}

    {% if citecount != "0"  %}
      <h2 class="year">{{y}}</h2>
      {% bibliography -f papers -q @inproceedings[year={{y}} && langid = english && workshop != yes]* %}
    {% endif %}
  {% endfor %}

  <h1>National Conferences</h1>

  {% for y in page.years %}
    {%- capture citecount -%}
      {% bibliography_count -f papers --query @inproceedings[year={{y}} && langid != english && workshop != yes]* %}
    {%- endcapture -%}

    {% if citecount != "0"  %}
      <h2 class="year">{{y}}</h2>
      {% bibliography -f papers -q @inproceedings[year={{y}} && langid != english && workshop != yes]* %}
    {% endif %}
  {% endfor %}

  <h1>International Workshops</h1>

  {% for y in page.years %}
    {%- capture citecount -%}
      {% bibliography_count -f papers --query @inproceedings[year={{y}} && langid = english && workshop = yes]* %}
    {%- endcapture -%}

    {% if citecount != "0"  %}
      <h2 class="year">{{y}}</h2>
      {% bibliography -f papers -q @inproceedings[year={{y}} && langid = english && workshop = yes]* %}
    {% endif %}
  {% endfor %}

  <h1>Manuscripts</h1>

  {% for y in page.years %}
    {%- capture citecount -%}
      {% bibliography_count -f papers --query @unpublished[year={{y}}]* %}
    {%- endcapture -%}

    {% if citecount != "0"  %}
      <h2 class="year">{{y}}</h2>
      {% bibliography -f papers -q @unpublished[year={{y}}]* %}
    {% endif %}
  {% endfor %}

</div>