// Static transition label between major sections (no animations)
function Warp({ label = "HYPERSPACE · JUMP" }) {
  return (
    <div className="warp warp--static">
      <div className="warp__msg">{label}</div>
    </div>
  );
}

window.Warp = Warp;
