# Octen Badge Lanyard (3D Interactive ID Card)

An interactive, high-fidelity 3D ID badge lanyard simulation with physical hot-stamped holographic foil effects and responsive motion physics.

## ✨ Features

- **Realistic Lanyard Physics**: Verlet rope & rigid-body physical simulation with hanging joints, spring dampening, wind breeze, toss, swing, and click-to-flip.
- **Holographic Sticker Optical Engine**: Faithfully inspired by [LAWTED/holographic-sticker](https://github.com/LAWTED/holographic-sticker) with:
  - Dual Caustic Refraction Lobes (`#ffa299` Coral ➔ `#33ff99` Mint ➔ `#6e9cf7` Sky Blue)
  - Diagonal -65° Glare Slit & Dynamic Spotlight
  - Satin Platinum-Silver Base Metal contrast
- **Interactive 3D Hover Tilt**: Subtle perspective card tilt dynamically driven by mouse position with smooth spring damping and anchored lanyard joint.
- **Customization Controls**: Real-time tweaking of card finish, holographic presets, colors, strap dimensions, and team member photo presets.

## 🛠️ Tech Stack

- **React 18** + **Vite**
- **Three.js** (Custom Physical Shaders & PMREM Environment Lighting)
- **Lucide React**

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 📄 License

MIT
