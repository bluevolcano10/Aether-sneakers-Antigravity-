import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WalkersCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070707, 0.05);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Position camera to view walkers from a slightly low angle (cinematic feel)
    camera.position.set(0, 0, 12);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Materials
    // Body & Clothes: Matte, transparent, muted
    const clothesMaterial = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.95,
      metalness: 0.05,
      transparent: true,
      opacity: 0.16,
      depthWrite: false, // Prevents transparency overlap artifacts
    });

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0x242424,
      roughness: 0.9,
      metalness: 0.0,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    });

    // Premium Shoe Material: Highly detailed, metallic, reflective, glowing
    const shoeBaseMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.1,
      metalness: 0.9, // Metallic chrome body
      transparent: false,
      opacity: 1.0,
    });

    const shoeGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff, // Neon cyan active glow
    });

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Front directional key light (muted)
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.4);
    keyLight.position.set(0, 5, 10);
    scene.add(keyLight);

    // Back rim lights for premium glowing highlights on walkers' shoes and edges
    const rimLightBlue = new THREE.DirectionalLight(0x3b82f6, 1.5);
    rimLightBlue.position.set(-8, 3, -6);
    scene.add(rimLightBlue);

    const rimLightCyan = new THREE.DirectionalLight(0x00f0ff, 1.2);
    rimLightCyan.position.set(8, -3, -6);
    scene.add(rimLightCyan);

    // Walker creation function
    const walkers = [];
    const numWalkers = 4;

    const createWalker = (index) => {
      const walkerGroup = new THREE.Group();
      
      // Proportions and settings
      const isMale = index % 2 === 0;
      const heightScale = 0.85 + Math.random() * 0.25; // height variations
      const speedScale = 0.65 + Math.random() * 0.4;
      const laneDepth = -3.5 - index * 2.0; // staggered lanes for parallax
      const direction = index % 2 === 0 ? 1 : -1; // alternate walk direction
      const startX = direction === 1 ? -12 - index * 3 : 12 + index * 3;

      // Group scaling
      walkerGroup.scale.set(heightScale, heightScale, heightScale);
      walkerGroup.position.set(startX, -3.2, laneDepth);

      // Hierarchical bones
      const bones = {
        torso: null,
        head: null,
        leftThigh: null,
        leftShin: null,
        leftFoot: null,
        leftShoeGlow: null,
        rightThigh: null,
        rightShin: null,
        rightFoot: null,
        rightShoeGlow: null,
        leftUpperArm: null,
        leftForearm: null,
        rightUpperArm: null,
        rightForearm: null,
      };

      // Torso (Cylinder jacket shape)
      const torsoGeom = new THREE.CylinderGeometry(0.35, 0.28, 1.4, 16);
      const torso = new THREE.Mesh(torsoGeom, clothesMaterial);
      torso.position.y = 2.0;
      walkerGroup.add(torso);
      bones.torso = torso;

      // Neck & Head
      const headGeom = new THREE.SphereGeometry(0.2, 16, 16);
      const head = new THREE.Mesh(headGeom, skinMaterial);
      head.position.y = 0.95;
      torso.add(head);
      bones.head = head;

      // Hair or Hat details to make it feel casual/realistic
      const capGeom = new THREE.BoxGeometry(0.22, 0.08, 0.32);
      const cap = new THREE.Mesh(capGeom, clothesMaterial);
      cap.position.set(0, 0.18, 0.05);
      head.add(cap);

      // Legs Structure
      // Left Leg
      const leftThighGroup = new THREE.Group();
      leftThighGroup.position.set(-0.2, -0.65, 0);
      torso.add(leftThighGroup);
      bones.leftThigh = leftThighGroup;

      const leftThighMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.8, 12), clothesMaterial);
      leftThighMesh.position.y = -0.4;
      leftThighGroup.add(leftThighMesh);

      const leftShinGroup = new THREE.Group();
      leftShinGroup.position.set(0, -0.8, 0);
      leftThighGroup.add(leftShinGroup);
      bones.leftShin = leftShinGroup;

      const leftShinMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.8, 12), clothesMaterial);
      leftShinMesh.position.y = -0.4;
      leftShinGroup.add(leftShinMesh);

      // Right Leg
      const rightThighGroup = new THREE.Group();
      rightThighGroup.position.set(0.2, -0.65, 0);
      torso.add(rightThighGroup);
      bones.rightThigh = rightThighGroup;

      const rightThighMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.8, 12), clothesMaterial);
      rightThighMesh.position.y = -0.4;
      rightThighGroup.add(rightThighMesh);

      const rightShinGroup = new THREE.Group();
      rightShinGroup.position.set(0, -0.8, 0);
      rightThighGroup.add(rightShinGroup);
      bones.rightShin = rightShinGroup;

      const rightShinMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.8, 12), clothesMaterial);
      rightShinMesh.position.y = -0.4;
      rightShinGroup.add(rightShinMesh);

      // Shoes - Highly detailed, glowing footwear
      const createShoe = (parentShin, isLeft) => {
        const footGroup = new THREE.Group();
        footGroup.position.set(0, -0.8, 0.08); // ankle pivot
        parentShin.add(footGroup);

        // Sneaker Body (Detailed composite mesh)
        const shoeUpperGeom = new THREE.BoxGeometry(0.16, 0.18, 0.45);
        const shoeUpper = new THREE.Mesh(shoeUpperGeom, shoeBaseMaterial);
        shoeUpper.position.set(0, -0.06, 0.06);
        footGroup.add(shoeUpper);

        // Glowing Neon Stripe
        const stripeGeom = new THREE.BoxGeometry(0.17, 0.03, 0.35);
        const stripe = new THREE.Mesh(stripeGeom, shoeGlowMaterial);
        stripe.position.set(0, -0.07, 0.08);
        footGroup.add(stripe);

        // Sole (Chunkier design)
        const soleGeom = new THREE.BoxGeometry(0.18, 0.06, 0.48);
        const sole = new THREE.Mesh(soleGeom, shoeBaseMaterial);
        sole.position.set(0, -0.15, 0.06);
        footGroup.add(sole);

        return { footGroup, stripe };
      };

      const leftShoeData = createShoe(leftShinGroup, true);
      bones.leftFoot = leftShoeData.footGroup;
      bones.leftShoeGlow = leftShoeData.stripe;

      const rightShoeData = createShoe(rightShinGroup, false);
      bones.rightFoot = rightShoeData.footGroup;
      bones.rightShoeGlow = rightShoeData.stripe;

      // Arms Structure
      // Left Arm
      const leftArmGroup = new THREE.Group();
      leftArmGroup.position.set(-0.45, 0.5, 0);
      torso.add(leftArmGroup);
      bones.leftUpperArm = leftArmGroup;

      const leftArmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.7, 12), clothesMaterial);
      leftArmMesh.position.y = -0.35;
      leftArmGroup.add(leftArmMesh);

      const leftForearmGroup = new THREE.Group();
      leftForearmGroup.position.set(0, -0.7, 0);
      leftArmGroup.add(leftForearmGroup);
      bones.leftForearm = leftForearmGroup;

      const leftForearmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.6, 12), clothesMaterial);
      leftForearmMesh.position.y = -0.3;
      leftForearmGroup.add(leftForearmMesh);

      // Right Arm
      const rightArmGroup = new THREE.Group();
      rightArmGroup.position.set(0.45, 0.5, 0);
      torso.add(rightArmGroup);
      bones.rightUpperArm = rightArmGroup;

      const rightArmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.7, 12), clothesMaterial);
      rightArmMesh.position.y = -0.35;
      rightArmGroup.add(rightArmMesh);

      const rightForearmGroup = new THREE.Group();
      rightForearmGroup.position.set(0, -0.7, 0);
      rightArmGroup.add(rightForearmGroup);
      bones.rightForearm = rightForearmGroup;

      const rightForearmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.6, 12), clothesMaterial);
      rightForearmMesh.position.y = -0.3;
      rightForearmGroup.add(rightForearmMesh);

      // Set walker direction rotation
      if (direction === -1) {
        walkerGroup.rotation.y = Math.PI; // face left
      }

      scene.add(walkerGroup);

      walkers.push({
        group: walkerGroup,
        bones,
        speed: speedScale * 0.02 * direction,
        direction,
        startX,
        laneDepth,
        phaseOffset: Math.random() * Math.PI * 2, // stagger walk cycles
      });
    };

    // Spawn walkers
    for (let i = 0; i < numWalkers; i++) {
      createWalker(i);
    }

    // Animation Loop
    let startTime = performance.now();

    const animate = () => {
      const time = (performance.now() - startTime) / 1000;

      walkers.forEach((w) => {
        // Translate walker forward
        w.group.position.x += w.speed;

        // Reset if walk off bounds
        const boundary = 15;
        if (w.direction === 1 && w.group.position.x > boundary) {
          w.group.position.x = -boundary;
        } else if (w.direction === -1 && w.group.position.x < -boundary) {
          w.group.position.x = boundary;
        }

        // Apply parametric walking animations (joint angles)
        const t = time * 3.5 + w.phaseOffset; // scale walking frequency

        // Legs (opposite swing cycles)
        const leftLegCycle = Math.sin(t);
        const rightLegCycle = Math.sin(t + Math.PI);

        // Hips (Thighs) swing back and forth
        w.bones.leftThigh.rotation.x = leftLegCycle * 0.42;
        w.bones.rightThigh.rotation.x = rightLegCycle * 0.42;

        // Knees bend (Knees bend backwards, never forwards, so we use max(0, -sin))
        w.bones.leftShin.rotation.x = Math.max(0, -Math.sin(t - Math.PI / 4)) * 0.65;
        w.bones.rightShin.rotation.x = Math.max(0, -Math.sin(t + Math.PI - Math.PI / 4)) * 0.65;

        // Ankles (Foot flexion)
        w.bones.leftFoot.rotation.x = Math.sin(t - Math.PI / 3) * 0.15;
        w.bones.rightFoot.rotation.x = Math.sin(t + Math.PI - Math.PI / 3) * 0.15;

        // Arms swing in opposition to thighs
        w.bones.leftUpperArm.rotation.x = rightLegCycle * 0.35;
        w.bones.rightUpperArm.rotation.x = leftLegCycle * 0.35;

        // Elbows bend slightly
        w.bones.leftForearm.rotation.x = Math.max(0, Math.sin(t)) * 0.25;
        w.bones.rightForearm.rotation.x = Math.max(0, Math.sin(t + Math.PI)) * 0.25;

        // Head bobbing and side-to-side rotation (slight)
        w.bones.head.rotation.y = Math.sin(t) * 0.08;
        w.bones.head.position.y = 0.95 + Math.sin(t * 2) * 0.02; // bob up and down

        // Footwear pulsing scan animation: glow expands/contract slightly
        const glowPulse = 0.8 + Math.abs(Math.sin(time * 2.0 + w.phaseOffset)) * 0.45;
        if (w.bones.leftShoeGlow) {
          w.bones.leftShoeGlow.scale.set(1, 1, glowPulse);
        }
        if (w.bones.rightShoeGlow) {
          w.bones.rightShoeGlow.scale.set(1, 1, glowPulse);
        }
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="bg-canvas-container"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0, // Behind UI elements
      }}
    />
  );
}
