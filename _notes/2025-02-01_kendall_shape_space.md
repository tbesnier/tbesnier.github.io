---
layout: post
title: "Kendall shape space: a working sketch"
date: 2025-02-01
categories: [Statistical Shape Analysis]
tags: [kendall shape space, procrustes analysis, landmarks, shape statistics, geometry]
keywords: [Kendall shape space, statistical shape analysis, Procrustes distance, landmark configurations, shape manifolds]
description: "A structured sketch of the main ideas behind Kendall shape space: from landmark configurations and pre-shapes to quotient geometry, distances, and statistical summaries."
preview_image: /assets/img/blog/kendall-shape-space-preview.svg
preview_alt: "Preview illustration for Kendall shape space with landmark constellations, a pre-shape sphere, and quotient geometry cues"
featured: true
reading_time: 12 min
difficulty: Advanced
series: Geometry for Learning
eyebrow: Kendall Shape Space
meta: working sketch
toc:
  sidebar: right
key_takeaways:
  - how landmark configurations become points on a quotient manifold once translation, scale, and rotation are removed
  - why the pre-shape sphere is the natural intermediate object in Kendall's construction
  - which geometric tools matter in practice: Procrustes distance, tangent spaces, means, and principal directions
---

This note is meant as a complete sketch rather than a finished tutorial. The goal is to collect the main definitions, mental pictures, and technical facts I want to use later when writing a fuller note on Kendall shape space.

## Why Kendall Shape Space Shows Up So Often

When shapes are represented by labeled landmarks, the raw coordinates still contain nuisance degrees of freedom:

- translation
- global scale
- rotation

Kendall's construction removes those transformations and asks us to study the geometry of what remains: shape itself.

That is the attractive part of the framework. It turns a messy collection of landmark configurations into a geometric object on which distances, means, geodesics, and statistics make sense.

<div class="comparison-grid">
  <div class="comparison-card">
    <h3>What is removed</h3>
    <p>Absolute position, overall size, and orientation.</p>
  </div>
  <div class="comparison-card">
    <h3>What remains</h3>
    <p>The relative arrangement of landmarks, which is what we usually want to call shape.</p>
  </div>
</div>

## The Starting Point: Landmark Configurations

Take \(k\) ordered landmarks in \(\mathbb{R}^m\). A configuration can be written as a matrix

\[
X \in \mathbb{R}^{k \times m}.
\]

Each row corresponds to a landmark. At this stage we are not yet in shape space. We are still in the ambient Euclidean space of all configurations.

The first two operations are straightforward:

1. center the configuration to remove translation
2. normalize its size to remove global scale

If \(H\) is the centering operator, then the centered and normalized configuration is

\[
Z = \frac{HX}{\|HX\|\_F}.
\]

This \(Z\) is called a **pre-shape**.

<div class="concept-grid">
  <div class="concept-card">
    <h3>Configuration space</h3>
    <p>All landmark coordinates, including translation, scale, and rotation.</p>
  </div>
  <div class="concept-card">
    <h3>Pre-shape space</h3>
    <p>Centered, unit-norm configurations. This is already a curved object: a sphere.</p>
  </div>
  <div class="concept-card">
    <h3>Shape space</h3>
    <p>Pre-shapes modulo rotation. This is Kendall's shape space.</p>
  </div>
</div>

## The Pre-shape Sphere

The normalization step places \(Z\) on a unit sphere in a linear subspace. For centered configurations, the dimension drops by \(m\), and the unit-norm constraint removes one more degree of freedom. So pre-shapes live on

\[
S^{m(k-1)-1}.
\]

This sphere is not the final answer, but it is the crucial intermediate object. Many formulas become cleaner once we realize that landmark shape analysis first passes through this spherical geometry.

<div class="technical-callout">
  <h3>Technical note</h3>
  <p>Calling pre-shape space a sphere is not just a visual analogy. The unit Frobenius norm constraint really defines a sphere inside the centered configuration subspace.</p>
</div>

## Quotienting Out Rotations

Two pre-shapes that differ only by a rotation should represent the same shape. So the final shape space is the quotient

\[
\Sigma_m^k = S^{m(k-1)-1} / SO(m).
\]

This is Kendall shape space for \(k\) landmarks in \(m\) dimensions.

That quotient notation is the compact way to say:

- start from normalized landmark configurations
- identify all rotated versions as equivalent
- treat each equivalence class as one shape

This is where the geometry becomes richer. We are no longer on an ordinary Euclidean space, and many statistics need to be defined intrinsically or through tangent approximations.

## The Famous Two-dimensional Case

For planar landmarks, the quotient has a particularly elegant form:

\[
\Sigma_2^k \cong \mathbb{CP}^{k-2}.
\]

So in 2D, Kendall shape space is complex projective space.

This is one reason the theory is so nice in the planar case: the quotient geometry can be written very compactly, and several quantities admit closed or well-studied expressions.

For 3D landmarks, the geometry is still meaningful and useful, but it is less algebraically neat than the planar setting.

## Distances: Procrustes Enters the Picture

One of the central quantities is the full Procrustes distance. On pre-shapes \(Z_1\) and \(Z_2\), the corresponding shape distance can be written through the optimal alignment over rotations:

\[
d([Z_1], [Z_2]) = \arccos \left( \max\_{R \in SO(m)} \langle Z_1, Z_2 R \rangle \right).
\]

This expression already reveals the structure of the problem:

- align the two pre-shapes as well as possible
- measure how close they are once only shape-relevant variation remains

The important point is that distances are not measured directly in raw coordinate space. They are measured after quotienting out nuisance transformations.

## Tangent Spaces and Linearization

Even though the geometry is nonlinear, local computations often happen in tangent spaces. Around a reference shape, one can:

- map nearby shapes to a tangent space
- perform linear statistics there
- map results back when needed

This is the basic logic behind many practical procedures:

- tangent PCA or principal geodesic analysis
- approximate means and covariances
- local regression and visualization

This is also where a lot of misuse can happen: once the data are spread too widely, tangent linearization may stop being a good approximation.

## Statistical Questions That Matter

Once shapes live on a manifold or quotient manifold, classical Euclidean statistics need reinterpretation.

The questions I want this note to keep in focus are:

1. what is the right notion of mean shape?
2. how do we describe principal directions of variation?
3. when is a tangent approximation good enough?
4. how much of the observed variability is geometric, and how much is due to landmarking noise?

The Fréchet mean becomes the natural replacement for the Euclidean average, and principal geodesic analysis becomes the curved analogue of PCA.

## Why This Matters For Modern Geometry Processing

Kendall shape space is not only a classical statistics object. It is also a useful conceptual bridge for current geometric learning problems.

It reminds us that:

- representation choices encode invariances
- quotient geometry often appears before learning does
- a good latent space should respect the symmetries of the data, not merely fit it

That is why Kendall's construction still matters even in deep learning contexts: it gives a clean example of how to separate nuisance transformations from intrinsic variation.

## A Minimal Computational Skeleton

```python
def preshape(X):
    Xc = X - X.mean(axis=0, keepdims=True)
    return Xc / frobenius_norm(Xc)


def kendall_distance(Z1, Z2):
    R = optimal_rotation(Z1, Z2)
    return arccos(inner_product(Z1, Z2 @ R))
```

This pseudocode hides several details, but it captures the logic:

1. center
2. normalize
3. align over rotations
4. measure distance on the quotient

## What I Still Want To Expand

This sketch is complete enough to orient the note, but the full version should still add:

- a clean derivation of the tangent space constraint
- the difference between full and partial Procrustes viewpoints
- more intuition for geodesics on the pre-shape sphere versus the quotient
- one concrete worked example with a tiny landmark dataset
- a short discussion of how Kendall geometry compares with diffeomorphic or correspondence-based shape spaces

## Keywords

Kendall shape space, statistical shape analysis, Procrustes analysis, landmark configurations, pre-shape sphere, quotient geometry, Fréchet mean, principal geodesic analysis.
