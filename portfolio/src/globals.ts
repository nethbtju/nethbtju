// Shared mutable state for moon world positions.
// Updated 60fps by MoonMesh components via useFrame — NOT React state.
// Read by CameraRig to smoothly follow the focused moon's orbit.
export const moonWorldX: Record<string, number> = {};
export const moonWorldY: Record<string, number> = {};
