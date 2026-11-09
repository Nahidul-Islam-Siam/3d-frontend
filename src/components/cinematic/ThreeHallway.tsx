import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import { Footprints, ChevronLeft, ChevronRight, Sparkles, ArrowDown, X } from "lucide-react";

export interface ThreeDoorData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  plaque: string;
  href: string;
  side: "left" | "right";
  zPos: number;
  color: number;
}

export const THREE_DOORS: ThreeDoorData[] = [
  {
    id: "door-1",
    number: 1,
    title: "A Place at the Table",
    subtitle: "Sharing meals, listening, restoring human dignity",
    plaque: "Sometimes hope begins with a meal.",
    href: "/how-we-serve#place-at-the-table",
    side: "left",
    zPos: 0,
    color: 0x3d271d,
  },
  {
    id: "door-2",
    number: 2,
    title: "You Matter — Strong Foundations",
    subtitle: "Youth mentoring, school partnerships, and healthy relationship skills",
    plaque: "Sometimes hope begins when someone discovers their worth.",
    href: "/how-we-serve/you-matter",
    side: "right",
    zPos: -14,
    color: 0x2b382d,
  },
  {
    id: "door-3",
    number: 3,
    title: "Stories That Save Lives",
    subtitle: "Letters to Etcetera, suicide awareness stage production, and honest dialogues",
    plaque: "Sometimes hope begins with one conversation.",
    href: "/how-we-serve/stories-that-save-lives",
    side: "left",
    zPos: -28,
    color: 0x4a2a22,
  },
  {
    id: "door-4",
    number: 4,
    title: "Welcome Home",
    subtitle: "Dignified housing, moving assistance, and deep honor for our veterans",
    plaque: "Sometimes hope begins with a key.",
    href: "/how-we-serve#welcome-home",
    side: "right",
    zPos: -42,
    color: 0x1d2e42,
  },
  {
    id: "door-5",
    number: 5,
    title: "A New Beginning",
    subtitle: "Turning cold, empty spaces into warm, fully furnished homes",
    plaque: "Sometimes hope begins with a clean bed and a warm kitchen.",
    href: "/how-we-serve#a-new-beginning",
    side: "left",
    zPos: -58,
    color: 0x44301d,
  },
  {
    id: "door-6",
    number: 6,
    title: "Serve Beside Us",
    subtitle: "The volunteer family, joyful teamwork, and saving a seat",
    plaque: "Sometimes purpose begins with saying yes.",
    href: "/how-we-serve#serve-beside-us",
    side: "right",
    zPos: -72,
    color: 0x422d20,
  },
  {
    id: "door-7",
    number: 7,
    title: "Your Story",
    subtitle: "Discover how your life weaves into the unfolding movement",
    plaque: "Every story has the power to change another.",
    href: "/movement",
    side: "left",
    zPos: -84,
    color: 0x2d1d17,
  },
];

export interface ThreeHallwayProps {
  onScrollToOverview?: () => void;
  onClose?: () => void;
}

export default function ThreeHallway({ onScrollToOverview, onClose }: ThreeHallwayProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [activeDoorIndex, setActiveDoorIndex] = useState<number>(0);
  const [hoveredDoor, setHoveredDoor] = useState<ThreeDoorData | null>(null);
  const [cameraProgress, setCameraProgress] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const hoveredDoorRef = useRef<ThreeDoorData | null>(null);
  const targetZRef = useRef<number>(0);

  const enterRoom = useCallback((door: ThreeDoorData) => {
    setIsTransitioning(true);
    targetZRef.current = door.zPos + 1.5;
    setTimeout(() => {
      if (door.href.startsWith("/how-we-serve#")) {
        const hash = door.href.split("#")[1];
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setIsTransitioning(false);
          return;
        }
      }
      navigate(door.href);
      setIsTransitioning(false);
    }, 850);
  }, [navigate]);

  const enterRoomRef = useRef(enterRoom);
  enterRoomRef.current = enterRoom;

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentZRef = useRef<number>(0);
  const doorsMeshRef = useRef<{ mesh: THREE.Group; doorLeaf: THREE.Mesh; data: ThreeDoorData; light: THREE.PointLight }[]>([]);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  // Procedural wood floor texture
  const createWoodTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#251710";
      ctx.fillRect(0, 0, 512, 512);

      // Draw planks
      const plankWidth = 64;
      for (let x = 0; x < 512; x += plankWidth) {
        ctx.fillStyle = (x / plankWidth) % 2 === 0 ? "#2b1b13" : "#1f130d";
        ctx.fillRect(x, 0, plankWidth, 512);
        ctx.strokeStyle = "#140c07";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, 0, plankWidth, 512);

        // Wood grain streaks
        for (let i = 0; i < 40; i++) {
          ctx.fillStyle = "rgba(255, 230, 200, 0.025)";
          const y = Math.random() * 512;
          ctx.fillRect(x + 2, y, plankWidth - 4, Math.random() * 12 + 2);
        }
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 16);
    return texture;
  };

  // Procedural brass metal canvas texture
  const createBrassTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 256, 128);
      grad.addColorStop(0, "#dfb978");
      grad.addColorStop(0.5, "#c89d5c");
      grad.addColorStop(1, "#8e6727");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 128);
      ctx.strokeStyle = "#5f4116";
      ctx.lineWidth = 6;
      ctx.strokeRect(4, 4, 248, 120);
    }
    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0c0704);
    scene.fog = new THREE.FogExp2(0x140d08, 0.024);

    // Camera
    const camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 150);
    camera.position.set(0, 2.2, 2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Ambient light - gentle warm tone
    const ambientLight = new THREE.AmbientLight(0xffecd0, 0.55);
    scene.add(ambientLight);

    // Main Hallway Dimensions
    const hallWidth = 7.5;
    const hallHeight = 5.2;
    const hallLength = 110;

    // Floor (Walnut wood)
    const floorGeo = new THREE.PlaneGeometry(hallWidth, hallLength);
    const floorMat = new THREE.MeshStandardMaterial({
      map: createWoodTexture(),
      roughness: 0.35,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -hallLength / 2 + 5);
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling (Warm cream with wood beams)
    const ceilingGeo = new THREE.PlaneGeometry(hallWidth, hallLength);
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0x22160e, roughness: 0.9 });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, hallHeight, -hallLength / 2 + 5);
    scene.add(ceiling);

    // Ceiling Wooden Beams
    for (let z = 0; z > -hallLength; z -= 6) {
      const beamGeo = new THREE.BoxGeometry(hallWidth + 0.2, 0.4, 0.5);
      const beamMat = new THREE.MeshStandardMaterial({ color: 0x180f08, roughness: 0.7 });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(0, hallHeight - 0.2, z);
      scene.add(beam);
    }

    // Left & Right Plaster Walls
    const wallGeo = new THREE.PlaneGeometry(hallLength, hallHeight);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf3ece0, roughness: 0.85 });

    const leftWall = new THREE.Mesh(wallGeo, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-hallWidth / 2, hallHeight / 2, -hallLength / 2 + 5);
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(wallGeo, wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(hallWidth / 2, hallHeight / 2, -hallLength / 2 + 5);
    scene.add(rightWall);

    // Baseboards along walls
    const baseboardMat = new THREE.MeshStandardMaterial({ color: 0x1b110b, roughness: 0.5 });
    const leftBase = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, hallLength), baseboardMat);
    leftBase.position.set(-hallWidth / 2 + 0.08, 0.2, -hallLength / 2 + 5);
    scene.add(leftBase);

    const rightBase = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, hallLength), baseboardMat);
    rightBase.position.set(hallWidth / 2 - 0.08, 0.2, -hallLength / 2 + 5);
    scene.add(rightBase);

    // Build the 7 3D Doors & Wall Sconces
    doorsMeshRef.current = [];
    const brassMat = new THREE.MeshStandardMaterial({
      map: createBrassTexture(),
      roughness: 0.25,
      metalness: 0.8,
    });

    THREE_DOORS.forEach((doorData) => {
      const doorGroup = new THREE.Group();
      const isLeft = doorData.side === "left";
      const xPos = isLeft ? -hallWidth / 2 + 0.05 : hallWidth / 2 - 0.05;

      // Heavy Door Frame
      const frameGeo = new THREE.BoxGeometry(0.25, 3.8, 2.2);
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x180e07, roughness: 0.6 });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      doorGroup.add(frame);

      // Door Leaf (Pivoting Mesh)
      const doorLeafGeo = new THREE.BoxGeometry(0.1, 3.5, 1.8);
      const doorLeafMat = new THREE.MeshStandardMaterial({
        color: doorData.color,
        roughness: 0.35,
        metalness: 0.15,
      });
      const doorLeaf = new THREE.Mesh(doorLeafGeo, doorLeafMat);
      // Pivot offset
      doorLeaf.position.set(0, 0, 0);
      (doorLeaf as unknown as { doorData: ThreeDoorData }).doorData = doorData;
      doorGroup.add(doorLeaf);

      // Brass Plaque on Door
      const plaqueGeo = new THREE.BoxGeometry(0.12, 0.45, 1.1);
      const plaqueMesh = new THREE.Mesh(plaqueGeo, brassMat);
      plaqueMesh.position.set(isLeft ? 0.04 : -0.04, 0.6, 0);
      doorGroup.add(plaqueMesh);

      // Brass Knob / Handle
      const handleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.22, 16);
      const handle = new THREE.Mesh(handleGeo, brassMat);
      handle.rotation.z = Math.PI / 2;
      handle.position.set(isLeft ? 0.08 : -0.08, -0.1, isLeft ? 0.65 : -0.65);
      doorGroup.add(handle);

      // Brass Wall Sconce above Door
      const sconceArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8),
        brassMat
      );
      sconceArm.rotation.z = isLeft ? -Math.PI / 4 : Math.PI / 4;
      sconceArm.position.set(0, 2.25, 0);
      doorGroup.add(sconceArm);

      const sconceLight = new THREE.PointLight(0xffca7a, 1.8, 8, 1.6);
      sconceLight.position.set(isLeft ? 0.4 : -0.4, 2.4, 0);
      sconceLight.castShadow = true;
      doorGroup.add(sconceLight);

      // Amber Room Interior Glow behind Door
      const roomGlow = new THREE.PointLight(0xffaa44, 0.2, 7, 2);
      roomGlow.position.set(isLeft ? -1.5 : 1.5, 1.5, 0);
      doorGroup.add(roomGlow);

      doorGroup.position.set(xPos, 1.8, doorData.zPos);
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

    // Floating Warm Dust Motes Particles in Hallway
    const particlesCount = 350;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * (hallWidth - 1);
      particlePositions[i * 3 + 1] = Math.random() * hallHeight;
      particlePositions[i * 3 + 2] = -Math.random() * hallLength;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xdfb978,
      size: 0.05,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(particleGeo, particleMat);
    scene.add(dust);

    // Mouse Move Parallax & Raycasting
    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Raycast against doors
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const interactiveLeaves = doorsMeshRef.current.map((d) => d.doorLeaf);
      const intersects = raycasterRef.current.intersectObjects(interactiveLeaves);

      if (intersects.length > 0) {
        const hit = intersects[0].object as unknown as { doorData: ThreeDoorData };
        if (hit.doorData) {
          hoveredDoorRef.current = hit.doorData;
          setHoveredDoor(hit.doorData);
          container.style.cursor = "pointer";
        }
      } else {
        hoveredDoorRef.current = null;
        setHoveredDoor(null);
        container.style.cursor = "default";
      }
    };

    // Click on Door to Enter
    const onClick = () => {
      if (hoveredDoorRef.current) {
        enterRoomRef.current(hoveredDoorRef.current);
      }
    };

    // Scroll to walk down hallway
    const onWheel = (e: WheelEvent) => {
      // If we are at the top and wheeling up, or if user is trying to scroll past
      const delta = e.deltaY * 0.035;
      const nextZ = targetZRef.current - delta;
      
      // Stop wheel from bubbling only when navigating within corridor bounds
      if ((delta > 0 && targetZRef.current > -92) || (delta < 0 && targetZRef.current < 2)) {
        e.preventDefault();
        targetZRef.current = Math.max(-92, Math.min(2, nextZ));
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("click", onClick);
    container.addEventListener("wheel", onWheel, { passive: false });

    // Resize handler
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
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera translation
      currentZRef.current += (targetZRef.current - currentZRef.current) * 0.08;
      camera.position.z = currentZRef.current;

      // Calculate progress (0 to 100%)
      const progress = Math.max(0, Math.min(1, -currentZRef.current / 86));
      setCameraProgress(Math.round(progress * 100));

      // Active door tracking based on camera Z
      let closestIdx = 0;
      let minDistance = 999;
      THREE_DOORS.forEach((door, idx) => {
        const dist = Math.abs(currentZRef.current - door.zPos);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });
      setActiveDoorIndex(closestIdx);

      // Subtle breath / natural head-bobbing
      camera.position.y = 2.2 + Math.sin(elapsedTime * 1.5) * 0.03;
      // Mouse camera tilt
      camera.rotation.y = -mouseRef.current.x * 0.12;
      camera.rotation.x = mouseRef.current.y * 0.08;

      // Animate doors opening when hovered
      doorsMeshRef.current.forEach((doorItem) => {
        const isHovered = hoveredDoorRef.current?.id === doorItem.data.id;
        const targetRot = isHovered ? (doorItem.data.side === "left" ? 0.9 : -0.9) : 0;
        doorItem.doorLeaf.rotation.y += (targetRot - doorItem.doorLeaf.rotation.y) * 0.1;
        doorItem.light.intensity += ((isHovered ? 2.5 : 0.2) - doorItem.light.intensity) * 0.1;
      });

      // Animate dust motes drift
      dust.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
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

  const walkToDoor = (index: number) => {
    const door = THREE_DOORS[index];
    if (door) {
      targetZRef.current = door.zPos + 3.5;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0d0805] text-stone-200 overflow-hidden flex flex-col justify-between">
      {/* Cinematic HUD Header */}
      <div className="relative z-20 pt-24 sm:pt-28 px-4 sm:px-6 max-w-7xl mx-auto w-full pointer-events-none">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c89d5c]/20 border border-[#c89d5c]/40 text-[#dfb978] text-xs font-semibold uppercase tracking-widest backdrop-blur-md mb-2">
              <Footprints className="w-3.5 h-3.5" />
              <span>Realtime 3D Sanctuary Corridor</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
              The 3D Hallway
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 font-serif italic mt-1 max-w-lg">
              Scroll or use arrows to walk down the walnut floor. Hover over any door to see it open, or click to enter the room.
            </p>
          </div>

          {/* Quick HUD Navigation Dots & Overview Link */}
          <div className="pointer-events-auto flex flex-wrap items-center gap-2 bg-black/60 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-xl">
            {THREE_DOORS.map((door, idx) => (
              <button
                key={door.id}
                onClick={() => walkToDoor(idx)}
                className={`group relative px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeDoorIndex === idx
                    ? "bg-[#c89d5c] text-[#140d08] shadow-lg shadow-[#c89d5c]/40 font-bold scale-105"
                    : "text-stone-400 hover:text-white hover:bg-white/10"
                }`}
                title={`Walk to Door ${door.number}: ${door.title}`}
              >
                <span>D{door.number}</span>
              </button>
            ))}

            {onScrollToOverview && (
              <button
                onClick={onScrollToOverview}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#dfb978] bg-[#c89d5c]/10 hover:bg-[#c89d5c]/20 border border-[#c89d5c]/30 transition-all cursor-pointer ml-1"
                title="Scroll down to page overview"
              >
                <span>Overview</span>
                <ArrowDown className="w-3 h-3" />
              </button>
            )}

            {onClose && (
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer ml-1"
                title="Exit 3D Hallway"
              >
                <X className="w-3.5 h-3.5" />
                <span>Exit 3D View</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10 w-full h-full"
        style={{ touchAction: "none" }}
      />

      {/* Dark Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 z-15 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,5,3,0.75)_95%)]" />

      {/* Transition Door-Opening Flare Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 z-50 bg-[#dfb978] animate-[pulse_0.9s_ease-out_forwards] flex items-center justify-center">
          <div className="text-center text-[#140d08]">
            <Sparkles className="w-10 h-10 mx-auto animate-spin" />
            <h3 className="font-serif text-2xl font-bold mt-2">Entering Room...</h3>
          </div>
        </div>
      )}

      {/* Floating Bottom HUD with Active Door Details & Controls */}
      <div className="relative z-20 pb-8 sm:pb-10 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        {hoveredDoor || THREE_DOORS[activeDoorIndex] ? (
          <div className="bg-[#1c130d]/90 backdrop-blur-xl rounded-3xl border border-[#c89d5c]/40 p-5 sm:p-6 shadow-2xl transition-all duration-300">
            {(() => {
              const current = hoveredDoor || THREE_DOORS[activeDoorIndex];
              return (
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
                  <div className="space-y-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#c89d5c]/20 text-[#dfb978] border border-[#c89d5c]/40">
                        Door {current.number} • {current.side === "left" ? "Left Wing" : "Right Wing"}
                      </span>
                      <span className="text-xs text-stone-400">
                        Plaque: &ldquo;{current.plaque}&rdquo;
                      </span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      {current.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                      {current.subtitle}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => walkToDoor(Math.max(0, activeDoorIndex - 1))}
                      disabled={activeDoorIndex === 0}
                      className="p-3 rounded-full bg-white/5 border border-white/10 text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      title="Walk Back"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => enterRoom(current)}
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#140d08] bg-gradient-to-r from-[#dfb978] via-[#c89d5c] to-[#b88a44] shadow-lg hover:brightness-110 transition-all hover:scale-105 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 fill-[#140d08]" />
                      <span>Step Through Door</span>
                    </button>

                    <button
                      onClick={() => walkToDoor(Math.min(THREE_DOORS.length - 1, activeDoorIndex + 1))}
                      disabled={activeDoorIndex === THREE_DOORS.length - 1}
                      className="p-3 rounded-full bg-white/5 border border-white/10 text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      title="Walk Forward"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : null}

        {/* Corridor Distance Tracker */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-stone-400 uppercase tracking-widest font-mono">
          <span>Sanctuary Entrance</span>
          <div className="flex-1 mx-4 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#c89d5c] to-[#dfb978] transition-all duration-300"
              style={{ width: `${cameraProgress}%` }}
            />
          </div>
          <span>Corridor Progress {cameraProgress}%</span>
        </div>
      </div>
    </div>
  );
}

