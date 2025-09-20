import { useState } from "react";

function TiltImage({ src, alt }) {
  const [rotation, setRotation] = useState({ x: 10, y: 10 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = currentTarget;

    // Calculate position relative to center
    const x = ((clientX - offsetLeft) / offsetWidth - 0.5) * 30; // tilt max 30deg
    const y = ((clientY - offsetTop) / offsetHeight - 0.5) * -30;

    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className="w-full h-full flex justify-center items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        className="rounded-2xl max-w-full h-auto transition-transform duration-200"
        style={{
          transform: `rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
        }}
      />
    </div>
  );
}

export default TiltImage;
