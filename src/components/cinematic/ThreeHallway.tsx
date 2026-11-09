import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";

export interface ThreeDoorData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  quote: string;
  href: string;
  side: "left" | "right";
  zPos: number;
  color: number;
}

// 5 Dedicated Doors matching the 5 pages of the "How We Serve" dropdown
export const THREE_DOORS: ThreeDoorData[] = [
  {
    id: "door-1",
    number: 1,
    title: "A Place at the Table",
    subtitle: "Sharing meals, listening, restoring human dignity",
    quote: "Sometimes hope begins\nwith a meal.",
    href: "/how-we-serve/a-place-at-the-table",
    side: "left",
    zPos: 0,
    color: 0x18100a,
  },
  {
    id: "door-2",
    number: 2,
    title: "You Matter — Strong Foundations",
    subtitle: "Youth mentoring, school partnerships, and healthy relationship skills",
    quote: "Sometimes hope begins\nwith guidance.",
    href: "/how-we-serve/you-matter",
    side: "right",
    zPos: -14,
    color: 0x160f09,
  },
  {
    id: "door-3",
    number: 3,
    title: "Stories That Save Lives",
    subtitle: "Letters to Etcetera, suicide awareness stage production, and honest dialogues",
    quote: "Sometimes hope begins\nwith one conversation.",
    href: "/how-we-serve/stories-that-save-lives",
    side: "left",
    zPos: -28,
    color: 0x1a120c,
  },
  {
    id: "door-4",
    number: 4,
    title: "Welcome Home",
    subtitle: "Dignified housing, moving assistance, and deep honor for our veterans",
    quote: "Sometimes hope begins\nwith a key.",
    href: "/how-we-serve/welcome-home",
    side: "right",
    zPos: -42,
    color: 0x140e08,
  },
  {
    id: "door-5",
    number: 5,
    title: "Serve Beside Us",
    subtitle: "The volunteer family, joyful teamwork, and saving a seat",
    quote: "Sometimes purpose begins\nwith saying yes.",
    href: "/how-we-serve",
    side: "left",
    zPos: -56,
    color: 0x170f09,
  },
];

export interface ThreeHallwayProps {
  onScrollToOverview?: () => void;
  onClose?: () => void;
}

export default function ThreeHallway({ onClose, onScrollToOverview }: ThreeHallwayProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDoorIndex, setActiveDoorIndex] = useState<number>(0);
  const [hoveredDoor, setHoveredDoor] = useState<ThreeDoorData | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const hoveredDoorRef = useRef<ThreeDoorData | null>(null);
  // Natural corridor entrance view (starts at the beginning of hallway looking forward)
  const targetZRef = useRef<number>(5.5);

  const enterRoom = useCallback((door: ThreeDoorData) => {
    setIsTransitioning(true);
    targetZRef.current = door.zPos + 0.8;
    setTimeout(() => {
      // If already on /how-we-serve, smoothly scroll to top video section (HowWeServeHero)
      if (location.pathname === "/how-we-serve" && door.href === "/how-we-serve") {
        if (onScrollToOverview) {
          onScrollToOverview();
        } else {
          const overviewEl = document.getElementById("how-we-serve-overview");
          if (overviewEl) {
            overviewEl.scrollIntoView({ behavior: "smooth" });
          }
        }
        setIsTransitioning(false);
        if (onClose) onClose();
        return;
      }

      // Always start at top video section of destination page
      window.scrollTo(0, 0);
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }

      navigate(door.href);
      setIsTransitioning(false);
      if (onClose) onClose();
    }, 700);
  }, [navigate, onClose, location.pathname, onScrollToOverview]);

  const enterRoomRef = useRef(enterRoom);
  enterRoomRef.current = enterRoom;

  // Three.js State References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentZRef = useRef<number>(targetZRef.current);
  const doorsMeshRef = useRef<{
    mesh: THREE.Group;
    doorLeaf: THREE.Mesh;
    data: ThreeDoorData;
    light: THREE.PointLight;
  }[]>([]);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  // Procedural horizontal plank wood floor texture matching screenshot
  const createFloorTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#22160e";
      ctx.fillRect(0, 0, 512, 512);

      // Horizontal wood planks
      const plankHeight = 32;
      for (let y = 0; y < 512; y += plankHeight) {
        ctx.fillStyle = (y / plankHeight) % 2 === 0 ? "#2a1b12" : "#1f130c";
        ctx.fillRect(0, y, 512, plankHeight);
        ctx.strokeStyle = "#120a06";
        ctx.lineWidth = 2.5;
        ctx.strokeRect(0, y, 512, plankHeight);

        // Wood grain streaks
        for (let i = 0; i < 24; i++) {
          ctx.fillStyle = "rgba(255, 230, 200, 0.03)";
          const x = Math.random() * 512;
          ctx.fillRect(x, y + 2, Math.random() * 30 + 8, plankHeight - 4);
        }
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 20);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  // Procedural Door Leaf texture with classic recessed panels matching screenshot
  const createDoorLeafTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 2048;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();

    // Deep rich dark espresso walnut wood
    ctx.fillStyle = "#18100a";
    ctx.fillRect(0, 0, 1024, 2048);

    // Subtle grain streaks
    for (let i = 0; i < 700; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(35, 22, 14, 0.22)" : "rgba(8, 4, 2, 0.22)";
      const x = Math.random() * 1024;
      ctx.fillRect(x, 0, Math.random() * 3 + 1, 2048);
    }

    // Outer beveled frame border
    ctx.strokeStyle = "#281910";
    ctx.lineWidth = 28;
    ctx.strokeRect(20, 20, 984, 2008);
    ctx.strokeStyle = "#0d0704";
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, 944, 1968);

    // Top recessed panel
    ctx.fillStyle = "#130b06";
    ctx.fillRect(72, 80, 880, 880);
    ctx.strokeStyle = "#2a1b12";
    ctx.lineWidth = 14;
    ctx.strokeRect(72, 80, 880, 880);
    ctx.strokeStyle = "#080402";
    ctx.lineWidth = 6;
    ctx.strokeRect(82, 90, 860, 860);

    // Bottom recessed panel
    ctx.fillStyle = "#130b06";
    ctx.fillRect(72, 1040, 880, 880);
    ctx.strokeStyle = "#2a1b12";
    ctx.lineWidth = 14;
    ctx.strokeRect(72, 1040, 880, 880);
    ctx.strokeStyle = "#080402";
    ctx.lineWidth = 6;
    ctx.strokeRect(82, 1050, 860, 860);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  };

  // High-DPI Crisp Serif Quote Texture (Bright White)
  const createQuoteTexture = (quote: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();

    ctx.clearRect(0, 0, 1024, 512);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 60px 'Playfair Display', Georgia, 'Times New Roman', serif";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 3;

    const lines = quote.split("\n");
    const lineSpacing = 84;
    const startY = 256 - ((lines.length - 1) * lineSpacing) / 2;
    lines.forEach((line, idx) => {
      ctx.fillText(line.trim(), 512, startY + idx * lineSpacing);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
    return texture;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene with deep warm atmospheric fog
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0604);
    scene.fog = new THREE.FogExp2(0x0a0604, 0.026);

    // Camera at eye height (y = 2.05)
    const camera = new THREE.PerspectiveCamera(54, width / height, 0.1, 160);
    camera.position.set(0, 2.05, targetZRef.current);
    cameraRef.current = camera;

    // High performance WebGL renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Subtle warm ambient light
    const ambientLight = new THREE.AmbientLight(0xfff1de, 0.45);
    scene.add(ambientLight);

    // Hallway Dimensions (5 Doors corridor)
    const hallWidth = 6.4;
    const hallHeight = 4.8;
    const hallLength = 90;

    // Walnut Plank Wood Floor
    const floorGeo = new THREE.PlaneGeometry(hallWidth, hallLength);
    const floorMat = new THREE.MeshStandardMaterial({
      map: createFloorTexture(),
      roughness: 0.38,
      metalness: 0.08,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -hallLength / 2 + 6);
    floor.receiveShadow = true;
    scene.add(floor);

    // Dark Timber Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(hallWidth, hallLength);
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0x140d08, roughness: 0.95 });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, hallHeight, -hallLength / 2 + 6);
    scene.add(ceiling);

    // Heavy Horizontal Wooden Beams spanning across ceiling (Exact screenshot match)
    for (let z = 6; z > -hallLength; z -= 5) {
      const beamGeo = new THREE.BoxGeometry(hallWidth + 0.2, 0.42, 0.65);
      const beamMat = new THREE.MeshStandardMaterial({ color: 0x120a06, roughness: 0.85 });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(0, hallHeight - 0.21, z);
      scene.add(beam);
    }

    // Warm Plaster Walls (Exact beige/linen tone from screenshot)
    const wallGeo = new THREE.PlaneGeometry(hallLength, hallHeight);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xd8d1c5, roughness: 0.82 });

    const leftWall = new THREE.Mesh(wallGeo, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-hallWidth / 2, hallHeight / 2, -hallLength / 2 + 6);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(wallGeo, wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(hallWidth / 2, hallHeight / 2, -hallLength / 2 + 6);
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Dark Walnut Baseboards along floor line
    const baseboardMat = new THREE.MeshStandardMaterial({ color: 0x120a06, roughness: 0.6 });
    const leftBase = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.42, hallLength), baseboardMat);
    leftBase.position.set(-hallWidth / 2 + 0.06, 0.21, -hallLength / 2 + 6);
    scene.add(leftBase);

    const rightBase = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.42, hallLength), baseboardMat);
    rightBase.position.set(hallWidth / 2 - 0.06, 0.21, -hallLength / 2 + 6);
    scene.add(rightBase);

    // Build the 7 3D Doors & Upward Tulip Sconces
    doorsMeshRef.current = [];
    const doorLeafTexture = createDoorLeafTexture();
    const moldingMat = new THREE.MeshStandardMaterial({
      color: 0x140c07,
      roughness: 0.65,
      metalness: 0.05,
    });
    const knobMat = new THREE.MeshStandardMaterial({
      color: 0xc89d5c,
      metalness: 0.85,
      roughness: 0.2,
    });

    THREE_DOORS.forEach((doorData) => {
      const doorGroup = new THREE.Group();
      const isLeft = doorData.side === "left";
      const xPos = isLeft ? -hallWidth / 2 + 0.04 : hallWidth / 2 - 0.04;

      // ─── Architectural Door Frame Casing Molding (Hollow center) ───
      // Top Lintel Beam
      const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 2.06), moldingMat);
      lintel.position.set(0, 1.805, 0);
      doorGroup.add(lintel);

      // Back Jamb (-Z)
      const backJamb = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.45, 0.14), moldingMat);
      backJamb.position.set(0, 0, -0.96);
      doorGroup.add(backJamb);

      // Front Jamb (+Z)
      const frontJamb = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.45, 0.14), moldingMat);
      frontJamb.position.set(0, 0, 0.96);
      doorGroup.add(frontJamb);

      // ─── Door Leaf (Pivoting Mesh) ───
      const doorLeafGeo = new THREE.BoxGeometry(0.06, 3.45, 1.78);
      const doorLeafMat = new THREE.MeshStandardMaterial({
        map: doorLeafTexture,
        roughness: 0.38,
        metalness: 0.08,
      });
      const doorLeaf = new THREE.Mesh(doorLeafGeo, doorLeafMat);
      doorLeaf.position.set(0, 0, 0);
      (doorLeaf as unknown as { doorData: ThreeDoorData }).doorData = doorData;

      // ─── Dedicated Crisp White Quote Plane (Always Visible) ───
      const quoteGeo = new THREE.PlaneGeometry(1.45, 0.65);
      const quoteTexture = createQuoteTexture(doorData.quote);
      const quoteMat = new THREE.MeshBasicMaterial({
        map: quoteTexture,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const quoteMesh = new THREE.Mesh(quoteGeo, quoteMat);
      // Sits 3mm proud of front door leaf surface (x = 0.03 + 0.003 = 0.033)
      quoteMesh.position.set(0.033, 0.72, 0);
      quoteMesh.rotation.y = Math.PI / 2;
      doorLeaf.add(quoteMesh);

      // ─── Brass Doorknob with Rose Backplate ───
      const knobPlate = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.015, 16),
        knobMat
      );
      knobPlate.rotation.z = Math.PI / 2;
      knobPlate.position.set(0.038, -0.15, 0.68);
      doorLeaf.add(knobPlate);

      const knobBall = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 16, 16),
        knobMat
      );
      knobBall.position.set(0.075, -0.15, 0.68);
      doorLeaf.add(knobBall);

      doorGroup.add(doorLeaf);

      // ─── Upward Tulip Wall Sconce (Centered directly above door) ───
      const sconceGroup = new THREE.Group();

      // Brass Wall Backplate
      const sconcePlate = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16),
        knobMat
      );
      sconcePlate.rotation.z = Math.PI / 2;
      sconcePlate.position.set(0.01, 2.18, 0);
      sconceGroup.add(sconcePlate);

      // Curved Brass Arm
      const sconceArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 0.18, 12),
        knobMat
      );
      sconceArm.position.set(0.06, 2.15, 0);
      sconceGroup.add(sconceArm);

      // Upward Frosted Glass Tulip Shade
      const shadeGeo = new THREE.CylinderGeometry(0.09, 0.045, 0.18, 16);
      const shadeMat = new THREE.MeshStandardMaterial({
        color: 0xffe8ba,
        emissive: 0xffaa44,
        emissiveIntensity: 0.95,
        roughness: 0.2,
      });
      const shade = new THREE.Mesh(shadeGeo, shadeMat);
      shade.position.set(0.1, 2.25, 0);
      sconceGroup.add(shade);

      // Warm Sconce Light Illuminating Wall & Corridor Directly Above Door
      const sconceLight = new THREE.PointLight(0xffbe6b, 3.2, 9, 1.8);
      sconceLight.position.set(0.22, 2.28, 0);
      sconceLight.castShadow = true;
      sconceGroup.add(sconceLight);

      doorGroup.add(sconceGroup);

      // Ambient Warm Room Interior Spill
      const roomGlow = new THREE.PointLight(0xff9933, 0.25, 7, 2);
      roomGlow.position.set(isLeft ? -1.5 : 1.5, 1.5, 0);
      doorGroup.add(roomGlow);

      doorGroup.position.set(xPos, 1.75, doorData.zPos);
      if (!isLeft) {
        doorGroup.rotation.y = Math.PI;
      }
      scene.add(doorGroup);

      doorsMeshRef.current.push({
        mesh: doorGroup,
        doorLeaf,
        data: doorData,
        light: roomGlow,
      });
    });

    // Golden Floating Dust Motes (Matches Screenshot Atmosphere)
    const particlesCount = 260;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * (hallWidth - 0.8);
      particlePositions[i * 3 + 1] = Math.random() * (hallHeight - 0.5) + 0.3;
      particlePositions[i * 3 + 2] = -Math.random() * hallLength + 8;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe8c17e,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(particleGeo, particleMat);
    scene.add(dust);

    // Mouse Move Parallax & Door Raycasting
    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const interactiveLeaves = doorsMeshRef.current.map((d) => d.doorLeaf);
      const intersects = raycasterRef.current.intersectObjects(interactiveLeaves, true);

      if (intersects.length > 0) {
        let hitObj: THREE.Object3D | null = intersects[0].object;
        while (hitObj && !(hitObj as unknown as { doorData: ThreeDoorData }).doorData && hitObj.parent) {
          hitObj = hitObj.parent;
        }
        const hitData = (hitObj as unknown as { doorData: ThreeDoorData })?.doorData;
        if (hitData) {
          hoveredDoorRef.current = hitData;
          setHoveredDoor(hitData);
          container.style.cursor = "pointer";
        }
      } else {
        hoveredDoorRef.current = null;
        setHoveredDoor(null);
        container.style.cursor = "default";
      }
    };

    // Click on Door to Enter Room
    const onClick = () => {
      if (hoveredDoorRef.current) {
        enterRoomRef.current(hoveredDoorRef.current);
      }
    };

    // Smooth scroll to walk forward/back down corridor
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.032;
      targetZRef.current = Math.max(-64, Math.min(5.8, targetZRef.current - delta));
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("click", onClick);
    container.addEventListener("wheel", onWheel, { passive: false });

    // Window Resize
    const onResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      currentZRef.current += (targetZRef.current - currentZRef.current) * 0.075;
      camera.position.z = currentZRef.current;

      // Active door tracking based on closest distance
      let closestIdx = 0;
      let minDist = 999;
      THREE_DOORS.forEach((door, idx) => {
        const dist = Math.abs(currentZRef.current - (door.zPos + 4));
        if (dist < minDist) {
          minDist = dist;
          closestIdx = idx;
        }
      });
      setActiveDoorIndex(closestIdx);

      // Subtle human breathing movement
      camera.position.y = 2.05 + Math.sin(elapsedTime * 1.4) * 0.02;
      camera.rotation.y = -mouseRef.current.x * 0.08;
      camera.rotation.x = mouseRef.current.y * 0.05;

      // Animate doors opening smoothly on hover
      doorsMeshRef.current.forEach((doorItem) => {
        const isHovered = hoveredDoorRef.current?.id === doorItem.data.id;
        const targetAngle = isHovered ? (doorItem.data.side === "left" ? 0.78 : -0.78) : 0;
        doorItem.doorLeaf.rotation.y += (targetAngle - doorItem.doorLeaf.rotation.y) * 0.09;
        doorItem.light.intensity += ((isHovered ? 2.8 : 0.25) - doorItem.light.intensity) * 0.09;
      });

      // Dust motes drift
      dust.rotation.y = elapsedTime * 0.012;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("click", onClick);
      container.removeEventListener("wheel", onWheel);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#0a0604] text-stone-200 overflow-hidden select-none">
      {/* ─── Top-Left Breadcrumb (Matches Screenshot "A PLACE AT THE TABLE" or "YOU MATTER") ─── */}
      <div className="absolute top-7 left-7 z-20 pointer-events-none flex items-center gap-3">
        <span className="text-stone-400/80 text-xs tracking-[0.28em] font-serif uppercase font-medium">
          {THREE_DOORS[activeDoorIndex]?.title.toUpperCase()}
        </span>
      </div>

      {/* ─── Optional Top-Right Close Button ─── */}
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          aria-label="Exit 3D Hallway"
          className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-stone-300 hover:text-white transition-all cursor-pointer backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* ─── Main Three.js Canvas Container ─── */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10 w-full h-full cursor-default"
        style={{ touchAction: "none" }}
      />

      {/* ─── Dark Vignette Overlay ─── */}
      <div className="pointer-events-none absolute inset-0 z-15 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,5,3,0.85)_95%)]" />

      {/* ─── Bottom-Right Sparkle Diamond Icon (Exact Screenshot Match) ─── */}
      <div className="absolute bottom-8 right-8 z-20 pointer-events-none opacity-70">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="#dfb978" className="animate-pulse drop-shadow-[0_0_12px_rgba(223,185,120,0.6)]">
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
        </svg>
      </div>

      {/* ─── Seamless Door-Entering Flare ─── */}
      {isTransitioning && (
        <div className="absolute inset-0 z-50 bg-[#dfb978]/90 animate-[pulse_0.8s_ease-out_forwards] flex items-center justify-center">
          <p className="font-serif text-3xl font-bold text-[#140d08] tracking-wider animate-pulse">
            Entering Room...
          </p>
        </div>
      )}

      {/* ─── Minimalist Floating Hint (Fades Out Naturally) ─── */}
      {hoveredDoor && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
          <div className="px-5 py-2 rounded-full bg-black/60 border border-[#dfb978]/30 backdrop-blur-md text-xs tracking-widest uppercase text-[#dfb978]">
            Click to enter {hoveredDoor.title}
          </div>
        </div>
      )}
    </div>
  );
}
