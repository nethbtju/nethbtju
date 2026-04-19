import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { moonWorldX, moonWorldY } from '../../globals';
import { MOON_CAMERA_Z } from '../../data/planets';

const _target  = new THREE.Vector3();
const _lookAt  = new THREE.Vector3();
const _camPos  = new THREE.Vector3(0, 0, 35);
const _camLook = new THREE.Vector3(0, 0, 0);

export function CameraRig() {
  const { camera } = useThree();
  // Local working refs — never expose mutated Zustand state
  const posRef    = useRef(new THREE.Vector3(0, 0, 35));
  const lookRef   = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const { currentMoonTarget, cameraTarget, cameraLookAt } = useStore.getState();

    if (currentMoonTarget) {
      const wx = moonWorldX[currentMoonTarget];
      const wy = moonWorldY[currentMoonTarget];
      if (wx !== undefined && wy !== undefined) {
        _target.set(wx, wy, MOON_CAMERA_Z);
        _lookAt.set(wx, wy, 0);
      }
    } else {
      _target.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
      _lookAt.set(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z);
    }

    posRef.current.lerp(_target, 0.045);
    lookRef.current.lerp(_lookAt, 0.045);

    camera.position.copy(posRef.current);
    camera.lookAt(lookRef.current);

    // Keep internal matrices in sync (skip matrix autoUpdate)
    _camPos.copy(posRef.current);
    _camLook.copy(lookRef.current);
  });

  return null;
}
