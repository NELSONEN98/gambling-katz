import "../assets/scss/ui/_warp.scss";

export default function Warp({ label = "· HYPERSPACE JUMP ·" }) {
  return (
    <div className="warp">
      <div className="warp__msg">{label}</div>
    </div>
  );
}
