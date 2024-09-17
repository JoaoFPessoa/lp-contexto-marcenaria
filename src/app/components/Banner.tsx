export default function Banner() {
  return (
    <div className="w-full h-[95vh] parallax relative">
      <video
        className="w-full h-full object-cover"
        src="/Banner_Video.MOV"
        autoPlay
        loop
        muted
        playsInline
        poster="/Video_Cover.png"
      />
    </div>
  );
}
