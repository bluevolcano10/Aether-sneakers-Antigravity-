import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ProductCanvas({ primaryColor = 0x3b82f6, glowColor = 0x00f0ff }) {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 280;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // Renderer (Alpha true, no antialias for performance if needed, but let's keep it clean)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Group
    const shoeGroup = new THREE.Group();
    scene.add(shoeGroup);

    // Procedural simple shoe geometry
    const soleMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
    const upperMat = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.8 });
    const metallicMat = new THREE.MeshStandardMaterial({ color: primaryColor, metalness: 0.8, roughness: 0.2 });
    const glowMat = new THREE.MeshBasicMaterial({ color: glowColor });

    // Sole
    const soleGeo = new THREE.BoxGeometry(2.2, 0.22, 0.8);
    const sole = new THREE.Mesh(soleGeo, soleMat);
    sole.position.y = -0.4;
    shoeGroup.add(sole);

    // Sole Pods
    const podGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.9, 12);
    podGeo.rotateX(Math.PI / 2);
    const pods = [-0.7, -0.2, 0.3, 0.7];
    pods.forEach((x) => {
      const pod = new THREE.Mesh(podGeo, metallicMat);
      pod.position.set(x, -0.45, 0);
      shoeGroup.add(pod);
    });

    // Upper
    const upperGeo = new THREE.BoxGeometry(1.8, 0.6, 0.76);
    // Taper front toe
    const pos = upperGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      if (x > 0) {
        y -= (x * 0.15);
      }
      pos.setY(i, y);
    }
    upperGeo.computeVertexNormals();
    const upper = new THREE.Mesh(upperGeo, upperMat);
    upper.position.set(-0.1, -0.1, 0);
    shoeGroup.add(upper);

    // Metallic Heel Cap
    const heelGeo = new THREE.BoxGeometry(0.4, 0.7, 0.82);
    const heel = new THREE.Mesh(heelGeo, metallicMat);
    heel.position.set(-0.8, -0.05, 0);
    shoeGroup.add(heel);

    // Glowing stripe
    const stripeGeo = new THREE.BoxGeometry(1.4, 0.03, 0.78);
    const stripe = new THREE.Mesh(stripeGeo, glowMat);
    stripe.position.set(-0.1, -0.15, 0);
    shoeGroup.add(stripe);

    // Adjust starting rotation to present shoe beautifully
    shoeGroup.rotation.y = -Math.PI / 5;
    shoeGroup.rotation.x = Math.PI / 16;

    // Soft Shadow Plane
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(0,0,0,0.6)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,64,64);

    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowGeo = new THREE.PlaneGeometry(3, 1.5);
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI/2;
    shadowMesh.position.y = -0.9;
    scene.add(shadowMesh);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(2, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(primaryColor, 0.95);
    dirLight2.position.set(-3, -2, -1);
    scene.add(dirLight2);

    let speed = 0.012;
    const animate = () => {
      // Rotate shoe gently
      shoeGroup.rotation.y += speed;

      // Adjust rotation speed depending on hover state
      if (hovered) {
        speed += (0.045 - speed) * 0.1;
      } else {
        speed += (0.012 - speed) * 0.1;
      }

      // Small bounce/float animation
      const time = Date.now() * 0.0025;
      shoeGroup.position.y = Math.sin(time) * 0.08;

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanups
    return () => {
      cancelAnimationFrame(animationRef.current);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [hovered, primaryColor, glowColor]);

  return (
    <div 
      ref={containerRef} 
      className="product-3d-preview" 
      style={{ opacity: hovered ? 1 : 0 }} // Managed via CSS transition but hook matches state
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
}
