import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroSneakerCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070707, 0.12);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // Create Procedural Sneaker Group
    const sneakerGroup = new THREE.Group();
    scene.add(sneakerGroup);

    // Materials
    const matteMeshMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.85,
      metalness: 0.1,
    });

    const soleMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.5,
      metalness: 0.2,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.15,
      metalness: 0.9,
    });

    const neonMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    const whiteTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.4,
    });

    // 1. Sole Base (Curved wedge shape)
    const soleGeometry = new THREE.BoxGeometry(3.5, 0.4, 1.2);
    // Deform sole geometry to make it curved/futuristic
    const pos = soleGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);
      
      // Curve toe upwards
      if (x > 0) {
        y += Math.pow(x, 2) * 0.15;
      }
      // Curve heel upwards slightly
      if (x < 0) {
        y += Math.pow(Math.abs(x), 2) * 0.05;
      }
      // Add heel width taper
      if (x < -1) {
        z *= 0.85;
      }
      pos.setXYZ(i, x, y, z);
    }
    soleGeometry.computeVertexNormals();
    const soleMesh = new THREE.Mesh(soleGeometry, soleMaterial);
    soleMesh.position.y = -0.6;
    soleMesh.castShadow = true;
    soleMesh.receiveShadow = true;
    sneakerGroup.add(soleMesh);

    // 2. Sole Pods (Futuristic cylinder tubes like On Running)
    const podGeom = new THREE.CylinderGeometry(0.2, 0.2, 1.3, 16);
    podGeom.rotateX(Math.PI / 2);
    const podPositions = [
      { x: -1.2, y: -0.7 },
      { x: -0.6, y: -0.72 },
      { x: 0, y: -0.74 },
      { x: 0.6, y: -0.7 },
      { x: 1.2, y: -0.6 },
    ];
    podPositions.forEach((posInfo) => {
      const pod = new THREE.Mesh(podGeom, chromeMaterial);
      pod.position.set(posInfo.x, posInfo.y, 0);
      pod.castShadow = true;
      sneakerGroup.add(pod);
    });

    // 3. Main Upper Body (Sleek aerodynamic shape)
    const upperGeometry = new THREE.BoxGeometry(2.8, 0.9, 1.15);
    const posUpper = upperGeometry.attributes.position;
    for (let i = 0; i < posUpper.count; i++) {
      let x = posUpper.getX(i);
      let y = posUpper.getY(i);
      let z = posUpper.getZ(i);
      
      // Slope down towards the toe
      if (x > 0) {
        y -= (x * 0.28);
      }
      // Slant ankle collar upwards at the back
      if (x < 0) {
        y += (Math.abs(x) * 0.2);
      }
      posUpper.setXYZ(i, x, y, z);
    }
    upperGeometry.computeVertexNormals();
    const upperMesh = new THREE.Mesh(upperGeometry, matteMeshMaterial);
    upperMesh.position.set(-0.2, -0.15, 0);
    upperMesh.castShadow = true;
    upperMesh.receiveShadow = true;
    sneakerGroup.add(upperMesh);

    // 4. Toe Overlay (Cap on the toe front)
    const toeGeom = new THREE.SphereGeometry(0.55, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    toeGeom.scale(1, 0.7, 1.1);
    toeGeom.rotateZ(-Math.PI / 3);
    const toeMesh = new THREE.Mesh(toeGeom, chromeMaterial);
    toeMesh.position.set(1.18, -0.4, 0);
    toeMesh.castShadow = true;
    sneakerGroup.add(toeMesh);

    // 5. Heel Counter (Chrome backing wrap)
    const heelGeom = new THREE.BoxGeometry(0.7, 1.0, 1.25);
    const heelMesh = new THREE.Mesh(heelGeom, chromeMaterial);
    heelMesh.position.set(-1.3, -0.1, 0);
    heelMesh.castShadow = true;
    sneakerGroup.add(heelMesh);

    // 6. Sock/Collar (Where the foot enters)
    const collarGeom = new THREE.CylinderGeometry(0.42, 0.48, 0.8, 24);
    collarGeom.rotateZ(Math.PI / 8);
    const collarMesh = new THREE.Mesh(collarGeom, soleMaterial);
    collarMesh.position.set(-0.6, 0.5, 0);
    collarMesh.castShadow = true;
    sneakerGroup.add(collarMesh);

    // 7. Glowing LED Accent Line (Futuristic stripe along the side)
    const ledGeom = new THREE.BoxGeometry(2.2, 0.05, 1.18);
    const ledMesh = new THREE.Mesh(ledGeom, neonMaterial);
    ledMesh.position.set(-0.1, -0.22, 0);
    sneakerGroup.add(ledMesh);

    const ledGeom2 = new THREE.BoxGeometry(1.2, 0.04, 1.2);
    const ledMesh2 = new THREE.Mesh(ledGeom2, neonMaterial);
    ledMesh2.position.set(-0.4, 0.1, 0);
    ledMesh2.rotation.z = -Math.PI / 6;
    sneakerGroup.add(ledMesh2);

    // 8. White Trim Details
    const trimGeom = new THREE.BoxGeometry(0.8, 0.08, 1.18);
    const trimMesh = new THREE.Mesh(trimGeom, whiteTrimMaterial);
    trimMesh.position.set(0.4, -0.05, 0);
    trimMesh.rotation.z = -Math.PI / 12;
    sneakerGroup.add(trimMesh);

    // Center the shoe pivot
    sneakerGroup.position.set(0.2, 0.2, 0);
    sneakerGroup.rotation.y = -Math.PI / 5;
    sneakerGroup.rotation.x = Math.PI / 12;

    // Soft Shadow Plane under the shoe
    // Create a procedural soft radial shadow texture using HTML Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    gradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.45)');
    gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.12)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    const shadowTexture = new THREE.CanvasTexture(canvas);
    const shadowGeo = new THREE.PlaneGeometry(5, 2.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.8;
    scene.add(shadowMesh);

    // Floating subtle background particle field
    const particlesCount = 80;
    const particlesGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    
    particlesGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleTextureCanvas = document.createElement('canvas');
    particleTextureCanvas.width = 16;
    particleTextureCanvas.height = 16;
    const ptCtx = particleTextureCanvas.getContext('2d');
    const ptGrad = ptCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    ptGrad.addColorStop(0, 'rgba(0, 240, 255, 0.8)');
    ptGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.3)');
    ptGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ptCtx.fillStyle = ptGrad;
    ptCtx.fillRect(0, 0, 16, 16);

    const particleTexture = new THREE.CanvasTexture(particleTextureCanvas);
    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeom, particleMat);
    scene.add(particles);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
    keyLight.position.set(5, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Dynamic Electric Blue Rim Light
    const blueRimLight = new THREE.DirectionalLight(0x3b82f6, 1.8);
    blueRimLight.position.set(-6, 2, -3);
    scene.add(blueRimLight);

    // Soft warm fill light
    const fillLight = new THREE.DirectionalLight(0xffddaa, 0.4);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // Mouse interaction tracking
    let targetXRotation = Math.PI / 12;
    let targetYRotation = -Math.PI / 5;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      // Map coordinates to small rotation offsets
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
      
      targetYRotation = -Math.PI / 5 + mouseX * 0.95;
      targetXRotation = Math.PI / 12 + mouseY * 0.7;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let startTime = performance.now();

    const animate = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;

      // 1. Slow floating animation (sine wave)
      const floatOffsetY = Math.sin(elapsedTime * 1.5) * 0.18;
      sneakerGroup.position.y = 0.2 + floatOffsetY;
      
      // Shadow scales slightly as sneaker floats
      const shadowScale = 1.0 - Math.abs(floatOffsetY) * 0.2;
      shadowMesh.scale.set(shadowScale, shadowScale, 1);
      shadowMesh.material.opacity = 0.8 - Math.abs(floatOffsetY) * 0.3;

      // 2. Slow base rotation
      const baseRotationY = elapsedTime * 0.12;

      // 3. Smoothly interpolate mouse rotation
      sneakerGroup.rotation.y += (targetYRotation + baseRotationY - sneakerGroup.rotation.y) * 0.05;
      sneakerGroup.rotation.x += (targetXRotation - sneakerGroup.rotation.x) * 0.05;

      // 4. Animate particles drifting
      const positions = particles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(elapsedTime + i) * 0.002; // slow vertical drift
      }
      particles.geometry.attributes.position.needsUpdate = true;

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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-canvas-container">
      {/* Light glow behind the shoe */}
      <div 
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent-glow)',
          filter: 'blur(100px)',
          zIndex: 0,
          pointerEvents: 'none',
          top: '25%',
          left: '25%',
        }}
      />
    </div>
  );
}
