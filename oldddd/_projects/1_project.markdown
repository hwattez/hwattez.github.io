---
layout: page
title: Metrics
description: rEproducible sofTware peRformance analysIs in perfeCt Simplicity
img: /assets/img/metrics.PNG
importance: 1
category: work
---

[Github](https://github.com/crillab/metrics)

When developing a SAT solver, one of the most important parts is to perform experiments so as to evaluate its performance. Most of the time, this process remains the same, so that everybody collects almost the same statistics about the solver execution. However, how many scripts are there to retrieve experimental data and draw scatter or cactus plots? Probably as many as researchers in the domain. Based on this observation, this repository provides Metrics, a Python library, aiming to unify and make easier the analysis of solver experiments. The ambition of Metrics is to provide a complete toolchain from the execution of the solver to the analysis of its performance. In particular, this library simplifies the retrieval of experimental data from many different inputs (including the solver’s output), and provides a nice interface for drawing commonly used plots, computing statistics about the execution of the solver, and effortlessly organizing them (e.g., in Jupyter notebooks). In the end, the main purpose of Metrics is to favor the sharing and reproducibility of experimental results and their analysis.

<div class="col-sm-8 mt-3 mt-md-0">
    <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/metrics.PNG' | relative_url }}" alt="" title="example image"/>
</div>