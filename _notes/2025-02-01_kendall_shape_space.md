---
layout: post
title: "Kendall shape space: comparing shapes after removing pose and scale"
date: 2025-02-01
permalink: /blog/kendall-shape-space/
categories: [Statistical Shape Analysis]
tags: [kendall shape space, procrustes analysis, landmarks, shape statistics, quotient geometry]
keywords: [Kendall shape space, statistical shape analysis, Procrustes distance, landmark configurations, shape manifolds, quotient geometry]
description: "An intuitive note on Kendall shape space: how landmark configurations become shapes once translation, scale, and rotation have been removed, and how this leads to Procrustes distances, mean shapes, and tangent-space statistics."
preview_image: /assets/img/blog/kendall-shape-space-preview.svg
preview_alt: "Landmark configurations mapped to the pre-shape sphere and then to Kendall shape space"
featured: true
reading_time: 14 min
difficulty: Intermediate
series: Geometry for Learning
eyebrow: Kendall Shape Space
meta: didactic note
toc:
  sidebar: right
key_takeaways:
  - a shape is a landmark configuration after translation, global scale, and rotation have been removed
  - centering and normalization put configurations on the pre-shape sphere
  - Kendall shape space is the quotient of that sphere by rotations
  - Procrustes alignment turns the quotient definition into a practical distance and averaging procedure
---

Kendall shape space is a clean answer to a deceptively simple question:

> when two objects are represented by corresponding landmarks, what should count as the same shape?

If I draw a triangle on the left side of a page and you draw the same triangle on the right, we do not want their different positions to matter. If your drawing is twice as large, we still usually want to call it the same shape. If it is rotated by 30 degrees, same story. But if one angle becomes sharper, or one landmark moves relative to the others, then the shape has changed.

Kendall's construction turns this intuition into geometry. It says: start with landmark coordinates, remove translation, remove size, then identify configurations that differ only by rotation. The remaining object is a point in **shape space**.

## A First Example: Triangles

Take three labeled landmarks in the plane:

\[
X =
\begin{bmatrix}
0 & 0 \\
2 & 0 \\
0 & 1
\end{bmatrix}.
\]

This is a right triangle, with landmark 1 at the right angle. Now compare it with

\[
Y =
\begin{bmatrix}
5 & 4 \\
5 & 6 \\
4 & 4
\end{bmatrix}.
\]

The coordinates look different, but \(Y\) is just the same triangle after a translation, a rotation, and a change of scale. A Euclidean distance between the raw coordinate matrices would say they are far apart. Kendall shape space says their distance is zero, because their **relative landmark arrangement** is identical.

Now move the third landmark from \((0,1)\) to \((0.4,1)\). The triangle is no longer the same: one side changed relative to the others. That deformation should survive all alignment steps. Shape space is designed to keep exactly this kind of information.

<div class="comparison-grid">
  <div class="comparison-card">
    <h3>Nuisance variation</h3>
    <p>Position in the image, global size, and orientation. These usually depend on acquisition or display choices.</p>
  </div>
  <div class="comparison-card">
    <h3>Shape variation</h3>
    <p>Angles, relative lengths, and the arrangement of landmarks after the nuisance transformations are removed.</p>
  </div>
</div>

## From Coordinates to Configurations

Let \(k\) labeled landmarks live in \(\mathbb{R}^m\). A landmark configuration is a matrix

\[
X \in \mathbb{R}^{k \times m},
\]

where row \(i\) contains the coordinates of landmark \(i\). The landmarks are labeled: landmark 1 in one shape must correspond to landmark 1 in another. Kendall shape space does not solve correspondence; it assumes correspondence is already available.

For a face, the rows might be eye corners, nose tip, mouth corners, and chin. For a biological specimen, they might be anatomical points. For a silhouette, they might be consistently sampled boundary points.

The first step is to remove translation by subtracting the centroid:

\[
X_c = X - \mathbf{1}\bar{x}^\top,
\]

where \(\bar{x}\) is the average of the landmark coordinates. Equivalently, one can write \(X_c = HX\), with

\[
H = I_k - \frac{1}{k}\mathbf{1}\mathbf{1}^\top.
\]

The second step is to remove global scale by normalizing the Frobenius norm:

\[
Z = \frac{X_c}{\operatorname{Frob}(X_c)},
\qquad
\operatorname{Frob}(X_c) = \sqrt{\operatorname{trace}(X_c^\top X_c)}.
\]

This \(Z\) is called a **pre-shape**.

<div class="concept-grid">
  <div class="concept-card">
    <h3>Configuration</h3>
    <p>The original landmark coordinates. Translation, scale, and rotation are still present.</p>
  </div>
  <div class="concept-card">
    <h3>Pre-shape</h3>
    <p>The centered, unit-size configuration. Translation and scale have been removed.</p>
  </div>
  <div class="concept-card">
    <h3>Shape</h3>
    <p>An equivalence class of pre-shapes that differ only by rotation.</p>
  </div>
</div>

## Why the Pre-shapes Live on a Sphere

After centering, a configuration has \(m(k-1)\) degrees of freedom: one \(m\)-dimensional centroid has been removed. Normalizing by \(\operatorname{Frob}(X_c)=1\) imposes one more constraint, so pre-shapes lie on the unit sphere

\[
S^{m(k-1)-1}.
\]

This is not only a metaphor. The pre-shape sphere is literally the unit sphere inside the linear subspace of centered configurations.

For the triangle example, \(k=3\) and \(m=2\), so pre-shapes live on

\[
S^{2(3-1)-1} = S^3.
\]

That is already interesting: even very simple planar triangles become points on a curved space once translation and scale are removed.

<div class="technical-callout">
  <h3>Example</h3>
  <p>The triangle with rows \((0,0)\), \((2,0)\), \((0,1)\) has centroid \((2/3, 1/3)\). After centering, its squared Frobenius norm is \(10/3\). Dividing by \(\sqrt{10/3}\) puts it on the pre-shape sphere.</p>
</div>

## Rotation Is Still Left

Pre-shape removes translation and scale, but a rotated copy of a configuration is still a different matrix. If \(R \in SO(m)\) is a rotation matrix, then \(Z\) and \(ZR\) should represent the same shape.

Kendall shape space is therefore the quotient

\[
\Sigma_m^k = S^{m(k-1)-1}/SO(m).
\]

This notation says that a point of \(\Sigma_m^k\) is not a single pre-shape. It is the whole orbit

\[
[Z] = \{ZR : R \in SO(m)\}.
\]

In words: a shape is the collection of every rotated version of the same centered and normalized landmark configuration.

There is one modeling choice hidden here. Quotienting by \(SO(m)\) removes rotations but not reflections. If mirror images should also be considered identical, one quotients by \(O(m)\) instead. In many vision and anatomy settings, orientation matters, so keeping reflections distinct is the right choice.

## The Planar Case Is Especially Nice

For landmarks in the plane, Kendall shape space has a beautiful closed form:

\[
\Sigma_2^k \cong \mathbb{CP}^{k-2}.
\]

So planar shape space is complex projective space. For triangles, \(k=3\), and

\[
\Sigma_2^3 \cong \mathbb{CP}^1,
\]

which is a two-dimensional sphere.

This gives a useful mental picture: all oriented planar triangle shapes live on a sphere. Collinear triangles form an equator. The two poles correspond to the two orientations of an equilateral triangle. Moving over the sphere continuously changes the triangle shape.

The higher-dimensional cases remain geometrically meaningful, but the planar case is the one where the quotient has the most compact algebraic description.

## Distances Come from Alignment

The quotient definition is elegant, but it also gives a practical recipe: to compare two shapes, align their pre-shapes as well as possible, then measure the remaining discrepancy.

Given two pre-shapes \(Z_1\) and \(Z_2\), the Kendall angular distance is

\[
d([Z_1], [Z_2]) =
\arccos\left(
\underset{R \in SO(m)}{\max}
\operatorname{trace}(Z_1^\top Z_2R)
\right),
\]

where the trace term is the usual Frobenius inner product after rotating \(Z_2\).

The maximization is the familiar orthogonal Procrustes problem. In practice, one computes an SVD of a small \(m \times m\) matrix, obtains the best rotation, and then evaluates the angle on the pre-shape sphere.

<div class="technical-callout">
  <h3>Concrete check</h3>
  <p>If \(Z_2\) is exactly \(Z_1R_0\) for some rotation \(R_0\), the maximum inner product is 1 and the distance is \(\arccos(1)=0\). If no rotation makes the two pre-shapes coincide, the maximum is smaller than 1 and the distance is positive.</p>
</div>

Some papers use related chordal or full Procrustes distances instead of the angular Riemannian distance. The alignment idea is the same, but the final scalar formula changes. It is worth checking which convention a method uses before comparing numerical values.

## Means: Averaging Shapes Is Not Averaging Coordinates

Suppose we have several annotated hand shapes, face shapes, or triangles. A naive coordinate-wise average depends on how the objects were positioned and oriented. Kendall geometry suggests a better procedure:

1. center and normalize every configuration,
2. choose a current estimate of the mean shape,
3. optimally rotate each pre-shape toward that estimate,
4. average the aligned pre-shapes,
5. normalize again and repeat until stable.

This gives a Procrustes mean, which is a practical version of a Fréchet mean on shape space:

\[
\bar{s} = \arg\min_s \sum_i d(s, s_i)^2.
\]

The important lesson is not the algorithmic detail. It is the order of operations. First respect the invariances, then compute statistics.

## Tangent Spaces: When Linear Tools Become Useful Again

Shape space is curved, so a global PCA directly on raw coordinates is usually the wrong object. Locally, however, one can linearize.

After estimating a mean shape \(\bar{s}\), nearby shapes can be mapped to the tangent space at \(\bar{s}\). In that tangent space, ordinary linear tools become meaningful approximations:

- principal component analysis describes dominant local modes of shape variation,
- regression can relate shape variation to external variables,
- covariance estimates can quantify landmark variability.

For example, in a face dataset, a leading tangent direction might open the mouth, widen the jaw, or move the eyebrows. These are not rigid motions; those have already been quotiented out. They are actual deformations of the landmark arrangement.

The caution is equally important: tangent-space statistics are local. If the data cover a large region of shape space, or lie near singular configurations such as collinear planar landmarks, the linear approximation can become misleading.

## A Minimal Computational Recipe

The core mechanics fit in a few lines of pseudocode:

```python
import numpy as np


def preshape(X):
    Xc = X - X.mean(axis=0, keepdims=True)
    return Xc / np.linalg.norm(Xc)


def optimal_rotation(W, Z):
    # Align W to Z by solving max_R <Z, W R>.
    U, _, Vt = np.linalg.svd(W.T @ Z)
    R = U @ Vt
    if np.linalg.det(R) < 0:
        U[:, -1] *= -1
        R = U @ Vt
    return R


def kendall_distance(X, Y):
    Zx = preshape(X)
    Zy = preshape(Y)
    R = optimal_rotation(Zy, Zx)
    cosine = np.sum(Zx * (Zy @ R))
    return np.arccos(np.clip(cosine, -1.0, 1.0))
```

This is only the skeleton. Real implementations need to handle degenerate configurations, reflection conventions, numerical tolerances, and the distinction between different Procrustes distances. But the main pipeline is there:

\[
\text{coordinates}
\rightarrow
\text{centered coordinates}
\rightarrow
\text{pre-shapes}
\rightarrow
\text{shapes modulo rotation}.
\]

## Why It Matters in Geometry Processing and Vision

Kendall shape space is classical, but the idea behind it is very modern: do not ask a learning algorithm to rediscover invariances that can be built into the representation.

In computer vision, this appears whenever objects are detected with different positions, scales, or camera orientations. In medical or biological shape analysis, it appears when comparing anatomical landmark sets across subjects. In geometry processing, it gives a small but rigorous model of a broader theme: many useful spaces are quotient spaces, because we care about geometry after removing nuisance transformations.

That is why Kendall shape space remains a useful mental model. It separates three questions that are often mixed together:

- what data representation do we start from?
- which transformations should be ignored?
- what geometry remains after those transformations are removed?

Once those choices are explicit, distances, averages, variability, and learning objectives become much easier to reason about.

## Summary

Kendall shape space takes labeled landmarks and removes translation, scale, and rotation in a principled order. Centering and normalization produce pre-shapes on a sphere. Quotienting by rotations turns each rotation orbit into one shape. The resulting geometry supports Procrustes distances, mean shapes, and tangent-space statistics.

The construction is small enough to understand through triangles, but broad enough to guide practical work with faces, anatomical landmarks, outlines, and geometric data. Its main message is simple: before measuring variation, decide which variation is real shape variation.
