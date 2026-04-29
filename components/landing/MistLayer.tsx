export default function MistLayer() {
  const particles = [
    { w: 300, h: 250, l: '10%', d: '6s', delay: '0s' },
    { w: 200, h: 180, l: '50%', d: '8s', delay: '2s' },
    { w: 400, h: 300, l: '75%', d: '7s', delay: '1s' },
    { w: 150, h: 130, l: '30%', d: '9s', delay: '3s' },
    { w: 250, h: 200, l: '65%', d: '6.5s', delay: '4s' },
  ];
  return (
    <div className="mist" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          style={{
            width: p.w,
            height: p.h,
            left: p.l,
            ['--d' as string]: p.d,
            ['--delay' as string]: p.delay,
          }}
        />
      ))}
    </div>
  );
}
