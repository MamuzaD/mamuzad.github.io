import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

import { currentProfile, getIcons } from "../util/store";



export const ParticlesTest = () => {
  const [init, setInit] = useState(false);
  const [particleIcons, setParticleIcons] = useState<string[]>([]);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  useEffect(() => {
    const unsubscribe = currentProfile.subscribe((profile) => {
      const icons = getIcons();
      setParticleIcons(icons);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

  const options: ISourceOptions = useMemo(
    () => ({
      detectRetina: true,
      fpsLimit: 60,
      fullScreen: {
        enable: true,
        zIndex: 0, // or any value is good for you, if you use -1 set `interactivity.detectsOn` to `"window"` if you need mouse interactions
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "bubble",
          },
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 1,
            size: 20,
            speed: 3,
          },
          push: {
            quantity: 1,
          },
        },
      },
      particles: {
        rotate: {
          value: 0,
          random: true,
          direction: "clockwise",
          animation: {
            enable: true,
            speed: 5,
            sync: false,
          },
        },
        move: {
          enable: true,
          outMode: "out",
          speed: 1,
        },
        number: {
          value: 15,
        },
        opacity: {
          value: 0.8,
        },
        shape: {
          type: "image",
          options: {
            image: [
              {
                src: particleIcons[0],
                width: 32,
                height: 32,
                particles: {
                  move: {
                    direction: "none",
                  },
                },
              },
              {
                src: particleIcons[1],
                width: 32,
                height: 32,
                particles: {
                  move: {
                    direction: "none",
                  },
                },
              },
              {
                src: particleIcons[2],
                width: 32,
                height: 32,
                particles: {
                  move: {
                    direction: "none",
                  },
                },
              },
            ],
          },
        },
        size: {
          value: 16,
        },
      },
    }),
    [particleIcons]
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};
